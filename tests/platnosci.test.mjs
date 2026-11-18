// Testy bramki: node --test tests/platnosci.test.mjs  (bez sieci; Przelewy24 i KSeF to atrapy)
// Atrapa KSeF odszyfrowuje token i fakturę własnym kluczem prywatnym, sprawdza skróty i (jeśli jest xmllint) schemat FA(3).
import test from "node:test";
import assert from "node:assert/strict";
import { createHash, generateKeyPairSync, privateDecrypt, createDecipheriv, constants } from "node:crypto";
import { execFileSync } from "node:child_process";
import { writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import worker, { p24Sign, parseBuyer } from "../platnosci/worker.js";
import { buildInvoiceXml, nipValid, vatSplit, spkiFromCertDer, Ksef } from "../platnosci/ksef.js";

const XSD = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../platnosci/xsd/fa3.xsd");
const hasXmllint = (() => { try { execFileSync("xmllint", ["--version"], { stdio: "ignore" }); return true; } catch { return false; } })();
function xsdValid(xml) {
  const f = path.join(mkdtempSync(path.join(tmpdir(), "fa3-")), "f.xml"); writeFileSync(f, xml);
  try { execFileSync("xmllint", ["--noout", "--schema", XSD, f], { stdio: "pipe" }); return true; } catch (e) { console.log(String(e.stderr)); return false; }
}

/* ---------- Środowisko ---------- */
const CRC = "crc-test", MERCHANT = 111111;
const SELLER = { SELLER_NIP: "5260250274", SELLER_NAME: "RaportFirmy Sp. z o.o.", SELLER_ADDR1: "ul. Testowa 1", SELLER_ADDR2: "00-001 Warszawa", VAT_RATE: "23", KSEF_TOKEN: "ksef-token-123", KSEF_ENV: "test" };
const BUYER = { nip: "774-000-14-54", name: "Sklep Kwadrat Anna Nowak", addr1: "ul. Lipowa 12", addr2: "00-002 Warszawa" };
function makeEnv(extra = {}) {
  const store = new Map();
  return {
    P24_MERCHANT_ID: String(MERCHANT), P24_POS_ID: String(MERCHANT), P24_CRC: CRC, P24_API_KEY: "api-key", P24_SANDBOX: "1",
    OPERATOR_TOKEN: "op-secret", ALLOWED_ORIGIN: "https://raportfirmy.pl", RETURN_URL: "https://raportfirmy.pl/", MAX_AMOUNT_GROSZ: "500000",
    PAYMENTS_KV: {
      get: async k => store.get(k) ?? null, put: async (k, v) => { store.set(k, v); }, delete: async k => { store.delete(k); },
      list: async ({ prefix }) => ({ keys: [...store.keys()].filter(k => k.startsWith(prefix)).map(name => ({ name })) })
    },
    _store: store, ...extra
  };
}

/* ---------- Atrapa Przelewy24 ---------- */
let calls = [];
const p24Mock = async (url, init) => {
  const body = JSON.parse(init.body);
  calls.push({ url, init, body });
  if (url.endsWith("/api/v1/transaction/register")) return new Response(JSON.stringify({ data: { token: "TOK" + calls.length }, responseCode: 0 }));
  if (url.endsWith("/api/v1/transaction/verify")) {
    const ok = body.sign === await p24Sign({ sessionId: body.sessionId, orderId: body.orderId, amount: body.amount, currency: "PLN", crc: CRC });
    return new Response(JSON.stringify({ data: { status: ok ? "success" : "error" }, responseCode: 0 }), { status: ok ? 200 : 400 });
  }
  return new Response("{}", { status: 404 });
};
globalThis.fetch = p24Mock;
const withKsef = fetchImpl => { globalThis.fetch = (url, init) => String(url).startsWith("https://api-test.ksef.mf.gov.pl") ? fetchImpl(url, init) : p24Mock(url, init); };
const fastTimers = () => { const o = globalThis.setTimeout; globalThis.setTimeout = f => o(f, 0); return () => { globalThis.setTimeout = o; }; };

const ctx = () => { const jobs = []; return { waitUntil: p => jobs.push(p), jobs }; };
const call = (env, method, p, { body, headers = {}, c } = {}) =>
  worker.fetch(new Request("https://pay.raportfirmy.pl" + p, { method, headers: { origin: "https://raportfirmy.pl", ...headers }, body: body === undefined ? undefined : typeof body === "string" ? body : JSON.stringify(body) }), env, c || ctx());
const due = (env, orderId, amount, token = "op-secret") => call(env, "POST", "/due", { body: { orderId, amount }, headers: { authorization: "Bearer " + token } });
const status = async (env, id) => (await call(env, "GET", "/status?zlecenie=" + id)).json();
async function notification(sessionId, amount, { crc = CRC, orderId = 987654 } = {}) {
  const n = { merchantId: MERCHANT, posId: MERCHANT, sessionId, amount, originAmount: amount, currency: "PLN", orderId, methodId: 181, statement: "p24-X" };
  n.sign = await p24Sign({ ...n, crc });
  return n;
}

/* ---------- Płatność ---------- */
test("podpis Przelewy24 (SHA-384) to skrót JSON-a w ustalonej kolejności pól", async () => {
  const fields = { sessionId: "Z-A1B2C3-1", merchantId: 1, amount: 14900, currency: "PLN", crc: "x" };
  assert.equal(await p24Sign(fields), createHash("sha384").update('{"sessionId":"Z-A1B2C3-1","merchantId":1,"amount":14900,"currency":"PLN","crc":"x"}').digest("hex"));
});

test("bez wykonania nie ma płatności (płatność po wykonaniu)", async () => {
  const env = makeEnv(); calls = [];
  const r = await call(env, "POST", "/checkout", { body: { orderId: "Z-A1B2C3", email: "a@b.pl" } });
  assert.equal(r.status, 404);
  assert.equal(calls.length, 0);
});

test("/due wymaga klucza opiekuna i poprawnej kwoty", async () => {
  const env = makeEnv();
  assert.equal((await due(env, "Z-A1B2C3", 14900, "zly")).status, 401);
  assert.equal((await due(env, "Z-A1B2C3", 50)).status, 400);
  assert.equal((await due(env, "Z-A1B2C3", 149.5)).status, 400);
  assert.equal((await due(env, "../etc", 14900)).status, 400);
  const ok = await due(env, "Z-A1B2C3", 14900);
  assert.equal((await ok.json()).payLink, "https://pay.raportfirmy.pl/zaplac/Z-A1B2C3");
});

test("rejestracja w Przelewy24: kwota z serwera, PLN, podpis, adresy powrotu i powiadomień, bez NIP-u", async () => {
  const env = makeEnv(); calls = [];
  await due(env, "Z-A1B2C3", 14900);
  const r = await call(env, "POST", "/checkout", { body: { orderId: "Z-A1B2C3", amount: 1, email: "anna@example.pl", invoice: BUYER } });
  assert.equal(r.status, 200);
  assert.equal(r.headers.get("access-control-allow-origin"), "https://raportfirmy.pl");
  assert.equal((await r.json()).url, "https://sandbox.przelewy24.pl/trnRequest/TOK1");
  const { url, init, body } = calls[0];
  assert.equal(url, "https://sandbox.przelewy24.pl/api/v1/transaction/register");
  assert.equal(init.headers.authorization, "Basic " + btoa(`${MERCHANT}:api-key`));
  assert.equal(body.amount, 14900, "kwota od klienta jest ignorowana");
  assert.equal(body.currency, "PLN");
  assert.equal(body.sessionId, "Z-A1B2C3-1");
  assert.equal(body.sign, await p24Sign({ sessionId: "Z-A1B2C3-1", merchantId: MERCHANT, amount: 14900, currency: "PLN", crc: CRC }));
  assert.equal(body.urlStatus, "https://pay.raportfirmy.pl/p24/status");
  assert.match(body.urlReturn, /platnosc=powrot&zlecenie=Z-A1B2C3#zlecenie$/);
  assert.equal(body.language, "pl");
  assert.ok(!/7740001454|Kwadrat|Lipowa/.test(init.body), "NIP i dane nabywcy nie idą do Przelewy24");
  assert.ok(!env._store.get("order:Z-A1B2C3").includes("anna@example.pl"), "e-mail nie jest zapisywany");
});

test("walidacja e-maila i danych do faktury", async () => {
  const env = makeEnv();
  await due(env, "Z-A1B2C3", 14900);
  assert.equal((await call(env, "POST", "/checkout", { body: { orderId: "Z-A1B2C3", email: "zly" } })).status, 400);
  const bad = await call(env, "POST", "/checkout", { body: { orderId: "Z-A1B2C3", email: "a@b.pl", invoice: { ...BUYER, nip: "1234567890" } } });
  assert.equal(bad.status, 400);
  assert.match((await bad.json()).error, /NIP/);
  assert.equal((await call(env, "POST", "/checkout", { body: { orderId: "Z-A1B2C3", email: "a@b.pl", invoice: { want: false } } })).status, 200, "bez faktury na firmę też można zapłacić");
  assert.equal(parseBuyer({ ...BUYER, nip: "PL 7740001454" }).nip, "7740001454");
});

test("CORS tylko dla własnej domeny", async () => {
  const r = await worker.fetch(new Request("https://pay.raportfirmy.pl/status?zlecenie=Z-A1B2C3", { headers: { origin: "https://zla.example" } }), makeEnv(), ctx());
  assert.equal(r.headers.get("access-control-allow-origin"), null);
});

test("link z SMS-a: formularz, błąd z zachowaniem pól, przekierowanie do Przelewy24", async () => {
  const env = makeEnv();
  await due(env, "Z-A1B2C3", 39000);
  const page = await (await call(env, "GET", "/zaplac/Z-A1B2C3")).text();
  assert.match(page, /Zapłać 390 zł/);
  assert.match(page, /BLIK, Apple Pay, Google Pay/);
  assert.match(page, /Nie doliczamy opłat/);
  const post = body => worker.fetch(new Request("https://pay.raportfirmy.pl/zaplac/Z-A1B2C3", { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(body).toString() }), env, ctx());
  const bt = await (await post({ email: "a@b.pl", nip: "1234567891", name: "<b>X</b>" })).text();
  assert.match(bt, /NIP do faktury jest nieprawidłowy/);
  assert.ok(bt.includes("&lt;b&gt;X&lt;/b&gt;") && !bt.includes("<b>X</b>"), "pola są escapowane");
  const ok = await post({ email: "a@b.pl", ...BUYER });
  assert.equal(ok.status, 303);
  assert.match(ok.headers.get("location"), /^https:\/\/sandbox\.przelewy24\.pl\/trnRequest\//);
  assert.equal((await call(env, "GET", "/zaplac/Z-FFFFFF")).status, 404);
});

test("powiadomienie: podpis, znana sesja, zgodna kwota, verify; idempotencja", async () => {
  const env = makeEnv(); calls = [];
  await due(env, "Z-B1B2C3", 14900);
  await call(env, "POST", "/checkout", { body: { orderId: "Z-B1B2C3", email: "a@b.pl" } });
  assert.equal((await call(env, "POST", "/p24/status", { body: await notification("Z-B1B2C3-1", 14900, { crc: "zly" }) })).status, 400, "zły podpis");
  assert.equal((await call(env, "POST", "/p24/status", { body: await notification("Z-B1B2C3-9", 14900) })).status, 400, "nieznana sesja");
  assert.equal((await status(env, "Z-B1B2C3")).status, "due");
  assert.equal((await call(env, "POST", "/p24/status", { body: await notification("Z-B1B2C3-1", 14900) })).status, 200);
  const v = calls.find(c => c.url.endsWith("/transaction/verify"));
  assert.ok(v && v.init.method === "PUT" && v.body.orderId === 987654, "verify wywołane");
  const st = await status(env, "Z-B1B2C3");
  assert.equal(st.status, "paid");
  assert.equal(st.invoice, null, "bez NIP-u nie ma faktury na firmę");
  const n = calls.length;
  await call(env, "POST", "/p24/status", { body: await notification("Z-B1B2C3-1", 14900) });
  assert.equal(calls.length, n, "powtórzone powiadomienie nie wywołuje verify");
  assert.equal((await call(env, "POST", "/checkout", { body: { orderId: "Z-B1B2C3", email: "a@b.pl" } })).status, 409);
  assert.equal((await due(env, "Z-B1B2C3", 14900)).status, 409);
});

test("rozbieżna kwota: bez verify (Przelewy24 zwróci środki), blokada kolejnych płatności", async () => {
  const env = makeEnv(); calls = [];
  await due(env, "Z-C1B2C3", 14900);
  await call(env, "POST", "/checkout", { body: { orderId: "Z-C1B2C3", email: "a@b.pl" } });
  await call(env, "POST", "/p24/status", { body: await notification("Z-C1B2C3-1", 100) });
  assert.ok(!calls.some(c => c.url.endsWith("/verify")));
  assert.equal((await status(env, "Z-C1B2C3")).status, "review");
  assert.equal((await call(env, "POST", "/checkout", { body: { orderId: "Z-C1B2C3", email: "a@b.pl" } })).status, 409);
});

test("błąd Przelewy24 -> komunikat z alternatywą (przelew), bez szczegółów technicznych", async () => {
  const env = makeEnv();
  await due(env, "Z-D1B2C3", 14900);
  globalThis.fetch = async () => new Response(JSON.stringify({ error: "secret detail" }), { status: 500 });
  const origErr = console.error; console.error = () => {};
  const r = await call(env, "POST", "/checkout", { body: { orderId: "Z-D1B2C3", email: "a@b.pl" } });
  console.error = origErr; globalThis.fetch = p24Mock;
  assert.equal(r.status, 502);
  const t = await r.text();
  assert.match(t, /przelewem/);
  assert.doesNotMatch(t, /secret detail/);
});

/* ---------- Faktura FA(3) ---------- */
const INV = { seller: { nip: "5260250274", name: "RaportFirmy & Sp. <z o.o.>", addr1: "ul. Testowa 1", addr2: "00-001 Warszawa" }, buyer: { nip: "7740001454", name: "Sklep \"Kwadrat\"", addr1: "ul. Lipowa 12", addr2: "" },
  number: "RF/2026/11/0001", issueDate: "2026-11-18", serviceDate: "2026-11-17", paidDate: "2026-11-18", grossGrosz: 14900, description: "Naprawa danych sklepu" };

test("NIP: suma kontrolna; VAT liczony od kwoty brutto", () => {
  assert.ok(nipValid("5260250274") && nipValid("774-000-14-54"));
  assert.ok(!nipValid("1234567890") && !nipValid("0000000000") && !nipValid("526025027"));
  assert.deepEqual(vatSplit(14900, "23"), { net: 12114, vat: 2786 });
  assert.deepEqual(vatSplit(14900, "zw"), { net: 14900, vat: 0 });
});

test("faktura VAT 23%: kwoty, zapłacono, escapowanie; zgodna z XSD FA(3)", { skip: !hasXmllint && "brak xmllint" }, () => {
  const xml = buildInvoiceXml({ ...INV, rate: "23" });
  assert.match(xml, /<P_13_1>121\.14<\/P_13_1><P_14_1>27\.86<\/P_14_1><P_15>149\.00<\/P_15>/);
  assert.match(xml, /<P_12>23<\/P_12>/);
  assert.match(xml, /<Zaplacono>1<\/Zaplacono><DataZaplaty>2026-11-18<\/DataZaplaty>/);
  assert.match(xml, /RaportFirmy &amp; Sp\. &lt;z o\.o\.&gt;/);
  assert.ok(xsdValid(xml));
});

test("faktura ze zwolnieniem (art. 113): P_13_7, P_19, podstawa prawna; zgodna z XSD FA(3)", { skip: !hasXmllint && "brak xmllint" }, () => {
  const xml = buildInvoiceXml({ ...INV, rate: "zw", exemptBasis: "Art. 113 ust. 1 ustawy o VAT", buyer: { nip: "7740001454", name: "Sklep" } });
  assert.match(xml, /<P_13_7>149\.00<\/P_13_7><P_15>149\.00<\/P_15>/);
  assert.match(xml, /<P_19>1<\/P_19><P_19A>Art\. 113 ust\. 1 ustawy o VAT<\/P_19A>/);
  assert.ok(xsdValid(xml));
  assert.throws(() => buildInvoiceXml({ ...INV, rate: "zw" }), /podstawę prawną/);
  assert.throws(() => buildInvoiceXml({ ...INV, rate: "23", buyer: { ...INV.buyer, nip: "1234567891" } }), /NIP nabywcy/);
});

/* ---------- Atrapa KSeF z prawdziwym szyfrowaniem ---------- */
function der(tag, ...parts) {
  const body = Buffer.concat(parts.map(p => Buffer.from(p)));
  const len = body.length < 128 ? Buffer.from([body.length]) : (() => { const b = []; let n = body.length; while (n) { b.unshift(n & 255); n >>= 8; } return Buffer.from([0x80 | b.length, ...b]); })();
  return Buffer.concat([Buffer.from([tag]), len, body]);
}
function fakeCert(spki) { // Certificate { tbs { [0]{v3} serial alg issuer validity subject spki } alg sig }
  const alg = der(0x30, der(0x06, [0x2a, 0x86, 0x48, 0x86, 0xf7, 0x0d, 0x01, 0x01, 0x0b]), der(0x05));
  const name = der(0x30, der(0x31, der(0x30, der(0x06, [0x55, 0x04, 0x03]), der(0x0c, Buffer.from("Ministerstwo Finansów")))));
  const validity = der(0x30, der(0x17, Buffer.from("250101000000Z")), der(0x17, Buffer.from("350101000000Z")));
  const tbs = der(0x30, der(0xa0, der(0x02, [2])), der(0x02, [1]), alg, name, validity, name, spki);
  return der(0x30, tbs, alg, der(0x03, [0, 1, 2, 3]));
}
function fakeKsef({ invoiceCode = 200 } = {}) {
  const { publicKey, privateKey } = generateKeyPairSync("rsa", { modulusLength: 2048 });
  const cert = fakeCert(publicKey.export({ type: "spki", format: "der" })).toString("base64");
  const st = { log: [], challenge: "CH-1", ts: 1763460000000, access: "ACCESS" };
  const dec = b64 => privateDecrypt({ key: privateKey, padding: constants.RSA_PKCS1_OAEP_PADDING, oaepHash: "sha256" }, Buffer.from(b64, "base64"));
  const fetchImpl = async (url, init) => {
    const p = url.replace("https://api-test.ksef.mf.gov.pl/v2", ""), b = init.body ? JSON.parse(init.body) : null, auth = init.headers.authorization;
    st.log.push(init.method + " " + p);
    const ok = (o, s = 200) => new Response(JSON.stringify(o), { status: s });
    if (p === "/security/public-key-certificates") return ok(["KsefTokenEncryption", "SymmetricKeyEncryption"].map((u, i) => ({ certificate: cert, certificateId: "c" + i, publicKeyId: "k" + i, validFrom: "2025-01-01T00:00:00Z", validTo: "2035-01-01T00:00:00Z", usage: [u] })));
    if (p === "/auth/challenge") return ok({ challenge: st.challenge, timestamp: new Date(st.ts).toISOString(), timestampMs: st.ts, clientIp: "1.1.1.1" });
    if (p === "/auth/ksef-token") {
      st.tokenPlain = dec(b.encryptedToken).toString();
      assert.deepEqual(b.contextIdentifier, { type: "Nip", value: "5260250274" });
      assert.equal(b.challenge, st.challenge);
      assert.equal(b.publicKeyId, "k0");
      return ok({ referenceNumber: "AUTH-1", authenticationToken: { token: "AUTHTOK", validUntil: "2099-01-01T00:00:00Z" } }, 202);
    }
    if (p === "/auth/rev2/AUTH-1") { assert.equal(auth, "Bearer AUTHTOK"); st.polls = (st.polls || 0) + 1; return ok({ status: { code: st.polls < 2 ? 100 : 200, description: "x" } }); }
    if (p === "/auth/token/redeem") return ok({ accessToken: { token: st.access, validUntil: "2099-01-01T00:00:00Z" }, refreshToken: { token: "R", validUntil: "2099-01-01T00:00:00Z" } });
    assert.equal(auth, "Bearer " + st.access);
    if (p === "/sessions/online") {
      assert.deepEqual(b.formCode, { systemCode: "FA (3)", schemaVersion: "1-0E", value: "FA" });
      assert.equal(b.encryption.publicKeyId, "k1");
      st.aes = dec(b.encryption.encryptedSymmetricKey); st.iv = Buffer.from(b.encryption.initializationVector, "base64");
      assert.equal(st.aes.length, 32); assert.equal(st.iv.length, 16);
      return ok({ referenceNumber: "SES-1", validUntil: "2099-01-01T00:00:00Z" }, 201);
    }
    if (p === "/sessions/online/SES-1/invoices") {
      const enc = Buffer.from(b.encryptedInvoiceContent, "base64");
      const d = createDecipheriv("aes-256-cbc", st.aes, st.iv); const plain = Buffer.concat([d.update(enc), d.final()]);
      assert.equal(b.invoiceHash, createHash("sha256").update(plain).digest("base64"));
      assert.equal(b.invoiceSize, plain.length);
      assert.equal(b.encryptedInvoiceHash, createHash("sha256").update(enc).digest("base64"));
      assert.equal(b.encryptedInvoiceSize, enc.length);
      st.xml = plain.toString("utf8");
      return ok({ referenceNumber: "INV-1" }, 202);
    }
    if (p === "/sessions/online/SES-1/close") return new Response(null, { status: 204 });
    if (p === "/sessions/SES-1/invoices/INV-1") return ok({ ordinalNumber: 1, referenceNumber: "INV-1", ksefNumber: invoiceCode === 200 ? "5260250274-20261118-0100A0B1C2D3-4E" : undefined, invoiceHash: "x", invoicingDate: "2026-11-18T10:00:00Z", status: { code: invoiceCode, description: invoiceCode === 200 ? "Sukces" : "Błąd weryfikacji semantyki dokumentu faktury", details: [] } });
    return ok({ error: "?" }, 404);
  };
  return { st, fetchImpl };
}

test("SPKI wyciągnięty z certyfikatu DER", () => {
  const { publicKey } = generateKeyPairSync("rsa", { modulusLength: 1024 });
  const spki = publicKey.export({ type: "spki", format: "der" });
  assert.deepEqual(Buffer.from(spkiFromCertDer(new Uint8Array(fakeCert(spki)))), spki);
});

test("KSeF: token|timestampMs RSA-OAEP, sesja AES-256-CBC, skróty, numer KSeF", async () => {
  const { st, fetchImpl } = fakeKsef();
  const k = new Ksef({ env: "test", nip: "5260250274", token: "ksef-token-123", fetchImpl, sleep: async () => {} });
  const xml = buildInvoiceXml({ ...INV, rate: "23" });
  const r = await k.sendInvoice(xml);
  assert.equal(st.tokenPlain, "ksef-token-123|1763460000000");
  assert.equal(st.xml, xml, "faktura odszyfrowana bez zmian");
  assert.ok(st.log.includes("POST /sessions/online/SES-1/close"), "sesja zamknięta");
  assert.deepEqual(await k.invoiceStatus(r.sessionRef, r.invoiceRef), { state: "issued", ksefNumber: "5260250274-20261118-0100A0B1C2D3-4E", code: 200, description: "Sukces" });
});

test("pełna ścieżka: płatność na NIP -> faktura w KSeF z kolejnym numerem -> status bez NIP-u", async () => {
  const env = makeEnv({ ...SELLER, INVOICE_SERIES: "RF" });
  const { st, fetchImpl } = fakeKsef();
  await due(env, "Z-E1B2C3", 14900);
  await call(env, "POST", "/checkout", { body: { orderId: "Z-E1B2C3", email: "a@b.pl", invoice: BUYER } });
  withKsef(fetchImpl); const restore = fastTimers();
  const c = ctx();
  await call(env, "POST", "/p24/status", { body: await notification("Z-E1B2C3-1", 14900), c });
  assert.equal(c.jobs.length, 1, "faktura startuje po płatności");
  await Promise.all(c.jobs);
  restore(); globalThis.fetch = p24Mock;
  const s = await status(env, "Z-E1B2C3");
  assert.equal(s.status, "paid");
  assert.match(s.invoice.number, /^RF\/\d{4}\/\d{2}\/0001$/);
  assert.equal(s.invoice.state, "issued");
  assert.equal(s.invoice.ksefNumber, "5260250274-20261118-0100A0B1C2D3-4E");
  assert.ok(!JSON.stringify(s).includes("7740001454"), "status nie zawiera NIP-u nabywcy");
  assert.match(st.xml, /<NIP>7740001454<\/NIP><Nazwa>Sklep Kwadrat Anna Nowak<\/Nazwa>/);
  if (hasXmllint) assert.ok(xsdValid(st.xml), "faktura wysłana do KSeF zgodna z XSD");
  assert.equal(env._store.has("invq:Z-E1B2C3"), false, "kolejka wyczyszczona");
  const x = await call(env, "GET", "/faktura/Z-E1B2C3.xml", { headers: { authorization: "Bearer op-secret" } });
  assert.equal(x.status, 200);
  assert.equal(await x.text(), st.xml, "XML dla księgowej");
  assert.equal((await call(env, "GET", "/faktura/Z-E1B2C3.xml")).status, 401);
});

test("KSeF odrzuca fakturę -> błąd dla opiekuna; brak konfiguracji KSeF -> faktura ręczna", async () => {
  const env = makeEnv({ ...SELLER });
  const { fetchImpl } = fakeKsef({ invoiceCode: 450 });
  await due(env, "Z-F1B2C3", 14900);
  await call(env, "POST", "/checkout", { body: { orderId: "Z-F1B2C3", email: "a@b.pl", invoice: BUYER } });
  withKsef(fetchImpl); const restore = fastTimers();
  const c = ctx();
  await call(env, "POST", "/p24/status", { body: await notification("Z-F1B2C3-1", 14900), c });
  await Promise.all(c.jobs);
  restore(); globalThis.fetch = p24Mock;
  assert.equal((await status(env, "Z-F1B2C3")).invoice.state, "error");

  const env2 = makeEnv();
  await due(env2, "Z-F2B2C3", 14900);
  await call(env2, "POST", "/checkout", { body: { orderId: "Z-F2B2C3", email: "a@b.pl", invoice: BUYER } });
  const c2 = ctx();
  await call(env2, "POST", "/p24/status", { body: await notification("Z-F2B2C3-1", 14900), c: c2 });
  assert.equal(c2.jobs.length, 0);
  assert.equal((await status(env2, "Z-F2B2C3")).invoice.state, "manual");
});

test("KSeF niedostępny: faktura czeka w kolejce, harmonogram kończy ją tym samym numerem", async () => {
  const env = makeEnv({ ...SELLER });
  await due(env, "Z-0A0B0C", 14900);
  await call(env, "POST", "/checkout", { body: { orderId: "Z-0A0B0C", email: "a@b.pl", invoice: BUYER } });
  withKsef(async () => new Response("{}", { status: 503 }));
  const origErr = console.error; console.error = () => {};
  const c = ctx();
  await call(env, "POST", "/p24/status", { body: await notification("Z-0A0B0C-1", 14900), c });
  await Promise.all(c.jobs);
  console.error = origErr;
  let s = await status(env, "Z-0A0B0C");
  assert.equal(s.invoice.state, "queued");
  const num = s.invoice.number;
  assert.ok(num && env._store.has("invq:Z-0A0B0C"));
  withKsef(fakeKsef().fetchImpl); const restore = fastTimers();
  await worker.scheduled({}, env);
  restore(); globalThis.fetch = p24Mock;
  s = await status(env, "Z-0A0B0C");
  assert.equal(s.invoice.state, "issued");
  assert.equal(s.invoice.number, num, "bez nowego numeru przy ponowieniu");
});
