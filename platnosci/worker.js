/* RaportFirmy.pl — bramka płatności (Cloudflare Worker + Stripe Checkout).
 *
 * Metody: BLIK, Apple Pay, Google Pay, karta. Wszystkie na stronie płatności Stripe
 * (checkout.stripe.com), więc przyciski portfeli, weryfikację domeny Apple Pay,
 * 3-D Secure (SCA) i kod BLIK obsługuje Stripe zgodnie z zasadami Apple, Google i BLIK.
 *
 * Zasady zapisane w kodzie:
 *  - Kwotę ustala serwer (opiekun przez /due), nigdy przeglądarka klienta.
 *  - Płatność dopiero po wykonaniu: bez wpisu /due nie ma sesji płatności.
 *  - Ta sama kwota dla każdej metody. Bez dopłat za metodę (zakaz surcharge, PSD2 / art. 38a ustawy o usługach płatniczych).
 *  - „Opłacone” ustawia wyłącznie podpisany webhook Stripe, nie powrót przeglądarki.
 *  - Do Stripe nie wysyłamy NIP-u, nazwy sklepu ani telefonu: tylko id zlecenia i opis usługi.
 *
 * Zmienne (wrangler.toml / sekrety):
 *  STRIPE_SECRET_KEY (sekret), STRIPE_WEBHOOK_SECRET (sekret), OPERATOR_TOKEN (sekret),
 *  ALLOWED_ORIGIN (np. https://raportfirmy.pl), RETURN_URL (strona klienta),
 *  MAX_AMOUNT_GROSZ (opcjonalnie, domyślnie 500000 = 5000 zł).
 *  KV: PAYMENTS_KV.
 */

const STRIPE_API = "https://api.stripe.com/v1";
const ORDER_RE = /^Z-[0-9A-F]{6}$/; // format numeru zlecenia z index.html
const MIN_AMOUNT = 200; // 2 zł — minimum Stripe dla PLN
const SESSION_TTL_S = 30 * 60; // minimum Stripe dla expires_at
const SIG_TOLERANCE_S = 300;
const SERVICE_NAME = "Naprawa danych sklepu w Google i na Facebooku";
const NO_SURCHARGE = "Kwota jest taka sama dla każdej metody płatności. Nie doliczamy opłat.";

/* ---------- Pomocnicze ---------- */
export function formEncode(obj, prefix = "", out = []) {
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null) continue;
    const key = prefix ? `${prefix}[${k}]` : k;
    if (typeof v === "object") formEncode(v, key, out);
    else out.push(encodeURIComponent(key) + "=" + encodeURIComponent(String(v)));
  }
  return out.join("&");
}

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...headers } });
}

function cors(env, req) {
  const origin = req.headers.get("origin");
  if (!origin || origin !== env.ALLOWED_ORIGIN) return {};
  return { "access-control-allow-origin": origin, "access-control-allow-methods": "GET, POST, OPTIONS", "access-control-allow-headers": "content-type, authorization", "vary": "origin" };
}

function timingSafeEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

async function hmacHex(secret, payload) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return Array.from(new Uint8Array(sig), b => b.toString(16).padStart(2, "0")).join("");
}

/** Weryfikacja nagłówka Stripe-Signature (t=…,v1=…). */
export async function verifyStripeSignature(body, header, secret, nowS = Math.floor(Date.now() / 1000)) {
  if (!header || !secret) return false;
  const parts = Object.create(null), v1 = [];
  for (const p of header.split(",")) {
    const i = p.indexOf("=");
    if (i < 0) continue;
    const k = p.slice(0, i).trim(), v = p.slice(i + 1).trim();
    if (k === "v1") v1.push(v); else parts[k] = v;
  }
  const t = Number(parts.t);
  if (!Number.isInteger(t) || Math.abs(nowS - t) > SIG_TOLERANCE_S || !v1.length) return false;
  const expected = await hmacHex(secret, `${t}.${body}`);
  return v1.some(s => timingSafeEqual(s, expected));
}

async function stripe(env, path, params, idempotencyKey) {
  const res = await fetch(STRIPE_API + path, {
    method: "POST",
    headers: {
      authorization: "Bearer " + env.STRIPE_SECRET_KEY,
      "content-type": "application/x-www-form-urlencoded",
      ...(idempotencyKey ? { "idempotency-key": idempotencyKey } : {})
    },
    body: formEncode(params)
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error("stripe " + res.status + ": " + (data.error?.message || "błąd"));
  return data;
}

const kvKey = id => "order:" + id;
async function getRec(env, id) { const raw = await env.PAYMENTS_KV.get(kvKey(id)); return raw ? JSON.parse(raw) : null; }
async function putRec(env, rec) { rec.updatedAt = new Date().toISOString(); await env.PAYMENTS_KV.put(kvKey(rec.orderId), JSON.stringify(rec)); }

function returnUrl(env, id, result) {
  const u = new URL(env.RETURN_URL);
  u.searchParams.set("platnosc", result);
  u.searchParams.set("zlecenie", id);
  u.hash = "zlecenie";
  return u.toString();
}

/* ---------- Sesja płatności ---------- */
async function openSession(env, rec) {
  const now = Math.floor(Date.now() / 1000);
  if (rec.sessionUrl && rec.sessionExpires && rec.sessionExpires - now > 120) return rec.sessionUrl; // używamy otwartej sesji, bez duplikatów
  const attempt = (rec.attempts || 0) + 1;
  const session = await stripe(env, "/checkout/sessions", {
    mode: "payment",
    // card => Apple Pay i Google Pay (portfele włączone w panelu Stripe), blik => kod BLIK. Tylko PLN.
    payment_method_types: ["card", "blik"],
    line_items: [{ quantity: 1, price_data: { currency: "pln", unit_amount: rec.amount, product_data: { name: rec.description || SERVICE_NAME } } }],
    client_reference_id: rec.orderId,
    metadata: { order_id: rec.orderId },
    payment_intent_data: { description: `Zlecenie ${rec.orderId}`, metadata: { order_id: rec.orderId } },
    locale: "pl",
    submit_type: "pay",
    custom_text: { submit: { message: NO_SURCHARGE } },
    expires_at: now + SESSION_TTL_S,
    success_url: returnUrl(env, rec.orderId, "ok"),
    cancel_url: returnUrl(env, rec.orderId, "anulowana")
  }, `checkout-${rec.orderId}-${attempt}`);
  Object.assign(rec, { attempts: attempt, sessionId: session.id, sessionUrl: session.url, sessionExpires: session.expires_at || now + SESSION_TTL_S });
  await putRec(env, rec);
  return session.url;
}

async function sessionFor(env, id) {
  if (!ORDER_RE.test(id || "")) return { error: json({ error: "Nieprawidłowy numer zlecenia." }, 400) };
  const rec = await getRec(env, id);
  if (!rec) return { error: json({ error: "Płatność za to zlecenie nie jest jeszcze dostępna. Płacisz dopiero po wykonaniu." }, 404) };
  if (rec.status === "paid") return { error: json({ error: "To zlecenie jest już opłacone.", status: "paid" }, 409) };
  if (rec.status === "pending") return { error: json({ error: "Płatność jest w toku. Poczekaj na potwierdzenie.", status: "pending" }, 409) };
  if (rec.status === "review") return { error: json({ error: "Płatność wymaga sprawdzenia przez opiekuna. Nic więcej nie płać.", status: "review" }, 409) };
  return { url: await openSession(env, rec) };
}

/* ---------- Webhook ---------- */
async function handleWebhook(env, req) {
  const body = await req.text();
  if (!(await verifyStripeSignature(body, req.headers.get("stripe-signature"), env.STRIPE_WEBHOOK_SECRET))) return json({ error: "bad signature" }, 400);
  const event = JSON.parse(body);
  const s = event.data?.object || {};
  const id = s.metadata?.order_id || s.client_reference_id;
  if (!ORDER_RE.test(id || "")) return json({ received: true });
  const rec = await getRec(env, id);
  if (!rec || rec.status === "paid") return json({ received: true }); // idempotentnie
  // Starsza sesja opłacona później też się liczy, ale tylko przy zgodnej kwocie i walucie.
  const amountOk = s.amount_total === rec.amount && String(s.currency).toLowerCase() === "pln";
  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded":
      if (!amountOk) { rec.status = "review"; rec.note = "Kwota w Stripe różni się od kwoty zlecenia."; break; }
      if (s.payment_status === "paid") { rec.status = "paid"; rec.paidAt = new Date().toISOString(); rec.paymentIntent = s.payment_intent || null; }
      else rec.status = "pending";
      break;
    case "checkout.session.async_payment_failed":
      rec.status = "due"; rec.sessionUrl = null; rec.sessionExpires = null; rec.note = "Płatność odrzucona. Można spróbować ponownie.";
      break;
    case "checkout.session.expired":
      if (s.id === rec.sessionId) { rec.sessionUrl = null; rec.sessionExpires = null; }
      break;
    default:
      return json({ received: true });
  }
  await putRec(env, rec);
  return json({ received: true });
}

/* ---------- Router ---------- */
export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const h = cors(env, req);
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: h });
    try {
      // Opiekun: zlecenie wykonane, kwota do zapłaty (grosze). Wymaga OPERATOR_TOKEN.
      if (req.method === "POST" && url.pathname === "/due") {
        const auth = req.headers.get("authorization") || "";
        if (!env.OPERATOR_TOKEN || !timingSafeEqual(auth, "Bearer " + env.OPERATOR_TOKEN)) return json({ error: "Brak uprawnień." }, 401, h);
        const b = await req.json().catch(() => ({}));
        const max = Number(env.MAX_AMOUNT_GROSZ) || 500000;
        if (!ORDER_RE.test(b.orderId || "")) return json({ error: "Nieprawidłowy numer zlecenia." }, 400, h);
        if (!Number.isInteger(b.amount) || b.amount < MIN_AMOUNT || b.amount > max) return json({ error: `Kwota w groszach: od ${MIN_AMOUNT} do ${max}.` }, 400, h);
        const prev = await getRec(env, b.orderId);
        if (prev?.status === "paid") return json({ error: "Zlecenie jest już opłacone.", status: "paid" }, 409, h);
        if (prev && prev.amount !== b.amount && prev.sessionUrl) return json({ error: "Klient ma otwartą płatność na inną kwotę. Poczekaj 30 minut albo anuluj sesję w panelu Stripe." }, 409, h);
        const description = typeof b.description === "string" && b.description.trim() ? b.description.trim().slice(0, 120) : SERVICE_NAME;
        const rec = { ...(prev || {}), orderId: b.orderId, amount: b.amount, description, status: "due", createdAt: prev?.createdAt || new Date().toISOString() };
        await putRec(env, rec);
        const link = new URL("/zaplac/" + b.orderId, url.origin).toString();
        return json({ status: "due", payLink: link }, 200, h);
      }
      // Klient na stronie: utwórz sesję i zwróć adres strony płatności.
      if (req.method === "POST" && url.pathname === "/checkout") {
        const b = await req.json().catch(() => ({}));
        const r = await sessionFor(env, b.orderId);
        if (r.error) { for (const [k, v] of Object.entries(h)) r.error.headers.set(k, v); return r.error; }
        return json({ url: r.url }, 200, h);
      }
      // Link z SMS-a od opiekuna: /zaplac/<id> -> przekierowanie do strony płatności.
      const m = url.pathname.match(/^\/zaplac\/(Z-[0-9A-F]{6})$/);
      if (req.method === "GET" && m) {
        const r = await sessionFor(env, m[1]);
        if (r.error) {
          const msg = (await r.error.json()).error;
          return new Response(`<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Płatność</title><body style="font:16px system-ui;max-width:560px;margin:40px auto;padding:0 16px"><p>${msg.replace(/[<>&]/g, "")}</p></body>`, { status: r.error.status, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" } });
        }
        return Response.redirect(r.url, 303);
      }
      if (req.method === "GET" && url.pathname === "/status") {
        const id = url.searchParams.get("zlecenie") || "";
        if (!ORDER_RE.test(id)) return json({ error: "Nieprawidłowy numer zlecenia." }, 400, h);
        const rec = await getRec(env, id);
        return json({ status: rec ? rec.status : "none", amount: rec?.amount ?? null, paidAt: rec?.paidAt ?? null }, 200, h);
      }
      if (req.method === "POST" && url.pathname === "/webhook") return await handleWebhook(env, req);
      return json({ error: "Nie znaleziono." }, 404, h);
    } catch (e) {
      console.error(e);
      return json({ error: "Płatność chwilowo niedostępna. Spróbuj za kilka minut albo zapłać przelewem." }, 502, h);
    }
  }
};
