// Testy bramki płatności: node --test tests/platnosci.test.mjs  (bez sieci; Stripe jest atrapą)
import test from "node:test";
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import worker, { formEncode, verifyStripeSignature } from "../platnosci/worker.js";

const WHSEC = "whsec_test123";
function makeEnv() {
  const store = new Map();
  return {
    STRIPE_SECRET_KEY: "sk_test_x", STRIPE_WEBHOOK_SECRET: WHSEC, OPERATOR_TOKEN: "op-secret",
    ALLOWED_ORIGIN: "https://raportfirmy.pl", RETURN_URL: "https://raportfirmy.pl/", MAX_AMOUNT_GROSZ: "500000",
    PAYMENTS_KV: { get: async k => store.get(k) ?? null, put: async (k, v) => { store.set(k, v); } },
    _store: store
  };
}
let stripeCalls = [];
globalThis.fetch = async (url, init) => {
  stripeCalls.push({ url, init, params: new URLSearchParams(init.body) });
  const n = stripeCalls.length;
  return new Response(JSON.stringify({ id: "cs_test_" + n, url: "https://checkout.stripe.com/c/pay/cs_test_" + n, expires_at: Math.floor(Date.now() / 1000) + 1800 }), { status: 200 });
};
const call = (env, method, path, { body, headers = {} } = {}) =>
  worker.fetch(new Request("https://pay.raportfirmy.pl" + path, { method, headers: { origin: "https://raportfirmy.pl", ...headers }, body: body === undefined ? undefined : typeof body === "string" ? body : JSON.stringify(body) }), env);
const due = (env, orderId, amount, token = "op-secret") => call(env, "POST", "/due", { body: { orderId, amount }, headers: { authorization: "Bearer " + token } });
function signed(event, secret = WHSEC, t = Math.floor(Date.now() / 1000)) {
  const body = JSON.stringify(event);
  return { body, headers: { "stripe-signature": `t=${t},v1=${createHmac("sha256", secret).update(`${t}.${body}`).digest("hex")}` } };
}
const sessionEvent = (type, orderId, extra = {}) => ({ type, data: { object: { id: "cs_test_1", metadata: { order_id: orderId }, amount_total: 14900, currency: "pln", payment_status: "paid", ...extra } } });

test("formEncode koduje zagnieżdżone parametry jak Stripe", () => {
  const s = formEncode({ a: 1, b: ["card", "blik"], c: { d: { e: "x y" } }, z: undefined });
  assert.equal(decodeURIComponent(s), "a=1&b[0]=card&b[1]=blik&c[d][e]=x y");
});

test("podpis webhooka: poprawny, zły sekret, za stary", async () => {
  const { body, headers } = signed({ a: 1 });
  assert.equal(await verifyStripeSignature(body, headers["stripe-signature"], WHSEC), true);
  assert.equal(await verifyStripeSignature(body, headers["stripe-signature"], "whsec_inny"), false);
  assert.equal(await verifyStripeSignature(body + " ", headers["stripe-signature"], WHSEC), false);
  const old = signed({ a: 1 }, WHSEC, Math.floor(Date.now() / 1000) - 600);
  assert.equal(await verifyStripeSignature(old.body, old.headers["stripe-signature"], WHSEC), false);
});

test("bez wykonania nie ma płatności (płatność po wykonaniu)", async () => {
  const env = makeEnv(); stripeCalls = [];
  const r = await call(env, "POST", "/checkout", { body: { orderId: "Z-A1B2C3" } });
  assert.equal(r.status, 404);
  assert.equal(stripeCalls.length, 0);
});

test("/due wymaga klucza opiekuna i poprawnej kwoty", async () => {
  const env = makeEnv();
  assert.equal((await due(env, "Z-A1B2C3", 14900, "zly")).status, 401);
  assert.equal((await due(env, "Z-A1B2C3", 100)).status, 400);
  assert.equal((await due(env, "Z-A1B2C3", 149.5)).status, 400);
  assert.equal((await due(env, "../etc", 14900)).status, 400);
  const ok = await due(env, "Z-A1B2C3", 14900);
  assert.equal(ok.status, 200);
  assert.equal((await ok.json()).payLink, "https://pay.raportfirmy.pl/zaplac/Z-A1B2C3");
});

test("sesja Stripe: PLN, BLIK + karta (Apple Pay, Google Pay), kwota z serwera, bez danych osobowych", async () => {
  const env = makeEnv(); stripeCalls = [];
  await due(env, "Z-A1B2C3", 14900);
  const r = await call(env, "POST", "/checkout", { body: { orderId: "Z-A1B2C3", amount: 1 } }); // kwota od klienta jest ignorowana
  assert.equal(r.status, 200);
  assert.equal(r.headers.get("access-control-allow-origin"), "https://raportfirmy.pl");
  assert.match((await r.json()).url, /^https:\/\/checkout\.stripe\.com\//);
  const p = stripeCalls[0].params;
  assert.equal(stripeCalls[0].url, "https://api.stripe.com/v1/checkout/sessions");
  assert.equal(p.get("payment_method_types[0]"), "card");
  assert.equal(p.get("payment_method_types[1]"), "blik");
  assert.equal(p.get("line_items[0][price_data][currency]"), "pln");
  assert.equal(p.get("line_items[0][price_data][unit_amount]"), "14900");
  assert.equal(p.get("locale"), "pl");
  assert.equal(p.get("mode"), "payment");
  assert.match(p.get("custom_text[submit][message]"), /Nie doliczamy opłat/);
  assert.equal(stripeCalls[0].init.headers["idempotency-key"], "checkout-Z-A1B2C3-1");
  assert.match(p.get("success_url"), /platnosc=ok&zlecenie=Z-A1B2C3#zlecenie$/);
  assert.ok(![...p.keys()].some(k => /customer_email|phone|tax_id|nip/i.test(k)), "bez danych osobowych");
  // drugi klik: ta sama otwarta sesja, bez nowego wywołania Stripe
  await call(env, "POST", "/checkout", { body: { orderId: "Z-A1B2C3" } });
  assert.equal(stripeCalls.length, 1);
});

test("CORS tylko dla własnej domeny", async () => {
  const env = makeEnv();
  const r = await worker.fetch(new Request("https://pay.raportfirmy.pl/status?zlecenie=Z-A1B2C3", { headers: { origin: "https://zla.example" } }), env);
  assert.equal(r.headers.get("access-control-allow-origin"), null);
});

test("link z SMS-a przekierowuje do strony płatności", async () => {
  const env = makeEnv(); stripeCalls = [];
  await due(env, "Z-A1B2C3", 39000);
  const r = await call(env, "GET", "/zaplac/Z-A1B2C3");
  assert.equal(r.status, 303);
  assert.match(r.headers.get("location"), /^https:\/\/checkout\.stripe\.com\//);
  const none = await call(env, "GET", "/zaplac/Z-FFFFFF");
  assert.equal(none.status, 404);
  assert.match(await none.text(), /Płacisz dopiero po wykonaniu/);
});

test("webhook: tylko podpisane zdarzenie oznacza opłacone; zgodność kwoty; idempotencja", async () => {
  const env = makeEnv();
  await due(env, "Z-A1B2C3", 14900);
  await call(env, "POST", "/checkout", { body: { orderId: "Z-A1B2C3" } });
  const fake = await call(env, "POST", "/webhook", { body: JSON.stringify(sessionEvent("checkout.session.completed", "Z-A1B2C3")), headers: { "stripe-signature": "t=1,v1=00" } });
  assert.equal(fake.status, 400);
  assert.equal((await (await call(env, "GET", "/status?zlecenie=Z-A1B2C3")).json()).status, "due");

  const wrong = signed(sessionEvent("checkout.session.completed", "Z-A1B2C3", { amount_total: 100 }));
  await call(env, "POST", "/webhook", wrong);
  assert.equal((await (await call(env, "GET", "/status?zlecenie=Z-A1B2C3")).json()).status, "review");
  assert.equal((await call(env, "POST", "/checkout", { body: { orderId: "Z-A1B2C3" } })).status, 409, "rozbieżna kwota blokuje kolejną płatność");

  await due(env, "Z-B1B2C3", 14900);
  const ok = signed(sessionEvent("checkout.session.completed", "Z-B1B2C3"));
  assert.equal((await call(env, "POST", "/webhook", ok)).status, 200);
  const st = await (await call(env, "GET", "/status?zlecenie=Z-B1B2C3")).json();
  assert.equal(st.status, "paid");
  assert.ok(st.paidAt);
  // powtórzone zdarzenie i próba ponownej płatności
  assert.equal((await call(env, "POST", "/webhook", signed(sessionEvent("checkout.session.async_payment_failed", "Z-B1B2C3")))).status, 200);
  assert.equal((await (await call(env, "GET", "/status?zlecenie=Z-B1B2C3")).json()).status, "paid");
  assert.equal((await call(env, "POST", "/checkout", { body: { orderId: "Z-B1B2C3" } })).status, 409);
  assert.equal((await due(env, "Z-B1B2C3", 14900)).status, 409);
});

test("webhook: płatność asynchroniczna w toku, potem odrzucona -> można ponowić", async () => {
  const env = makeEnv();
  await due(env, "Z-C1B2C3", 14900);
  await call(env, "POST", "/webhook", signed(sessionEvent("checkout.session.completed", "Z-C1B2C3", { payment_status: "unpaid" })));
  assert.equal((await (await call(env, "GET", "/status?zlecenie=Z-C1B2C3")).json()).status, "pending");
  assert.equal((await call(env, "POST", "/checkout", { body: { orderId: "Z-C1B2C3" } })).status, 409);
  await call(env, "POST", "/webhook", signed(sessionEvent("checkout.session.async_payment_failed", "Z-C1B2C3")));
  assert.equal((await (await call(env, "GET", "/status?zlecenie=Z-C1B2C3")).json()).status, "due");
  assert.equal((await call(env, "POST", "/checkout", { body: { orderId: "Z-C1B2C3" } })).status, 200);
});

test("błąd Stripe -> komunikat z alternatywą (przelew), bez szczegółów technicznych", async () => {
  const env = makeEnv();
  await due(env, "Z-D1B2C3", 14900);
  const saved = globalThis.fetch;
  globalThis.fetch = async () => new Response(JSON.stringify({ error: { message: "secret detail" } }), { status: 500 });
  const origErr = console.error; console.error = () => {};
  const r = await call(env, "POST", "/checkout", { body: { orderId: "Z-D1B2C3" } });
  console.error = origErr; globalThis.fetch = saved;
  assert.equal(r.status, 502);
  const t = await r.text();
  assert.match(t, /przelewem/);
  assert.doesNotMatch(t, /secret detail/);
});
