/* RaportFirmy.pl — bramka płatności i faktur (Cloudflare Worker + Przelewy24 REST API v1 + KSeF 2.0).
 *
 * Płatność: BLIK, Apple Pay, Google Pay, karta i szybki przelew na stronie Przelewy24 (secure.przelewy24.pl).
 * Przyciski portfeli, weryfikację domeny Apple Pay, 3-D Secure (SCA) i kod BLIK obsługuje Przelewy24 (PayPro S.A.).
 * Faktura: po potwierdzonej płatności faktura VAT FA(3) trafia do KSeF (platnosci/ksef.js).
 *
 * Zasady zapisane w kodzie:
 *  - Kwotę ustala serwer (opiekun przez /due), nigdy przeglądarka klienta.
 *  - Płatność dopiero po wykonaniu: bez wpisu /due nie ma transakcji.
 *  - Ta sama kwota dla każdej metody. Bez dopłat za metodę (PSD2 / art. 38a ustawy o usługach płatniczych).
 *  - „Opłacone” ustawia wyłącznie powiadomienie Przelewy24 z poprawnym podpisem SHA-384, zgodną kwotą
 *    i udanym /transaction/verify. Powrót przeglądarki niczego nie przesądza.
 *  - Faktura powstaje tylko dla opłaconego zlecenia, z kolejnym numerem w serii miesięcznej.
 *  - Do Przelewy24 idzie numer zlecenia, opis usługi i e-mail płacącego (wymagany przez Przelewy24); e-maila nie zapisujemy.
 *    NIP i dane nabywcy trafiają tylko do bramki i do KSeF, nigdy do przeglądarki, adresu strony ani Przelewy24.
 *
 * Zmienne (wrangler.toml / sekrety): patrz platnosci/README.md.
 */
import { Ksef, buildInvoiceXml, nipValid, cleanNip, warsawDate } from "./ksef.js";

const ORDER_RE = /^Z-[0-9A-F]{6}$/; // format numeru zlecenia z index.html
const EMAIL_RE = /^[^\s@<>"']{1,64}@[^\s@<>"']{1,190}\.[a-z]{2,}$/i;
const MIN_AMOUNT = 100; // 1 zł
const TIME_LIMIT_MIN = 15; // czas na opłacenie transakcji (Przelewy24: 0–99 min)
const SERVICE_NAME = "Naprawa danych sklepu w Google i na Facebooku";
const NO_SURCHARGE = "Kwota jest taka sama dla każdej metody płatności. Nie doliczamy opłat.";

const p24Host = env => (env.P24_SANDBOX === "1" ? "https://sandbox.przelewy24.pl" : "https://secure.przelewy24.pl");
const intEnv = (env, k) => Number.parseInt(env[k], 10);
export const ksefConfigured = env => !!(env.KSEF_TOKEN && env.SELLER_NIP && env.SELLER_NAME && env.SELLER_ADDR1 && env.VAT_RATE);

/* ---------- Pomocnicze ---------- */
function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...headers } });
}
function html(body, status = 200) {
  return new Response(`<!doctype html><html lang="pl"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Płatność · RaportFirmy.pl</title>
<style>body{font:16px/1.5 system-ui,sans-serif;max-width:560px;margin:40px auto;padding:0 16px;color:#1d2330;background:#fbfaf7}label{display:block;margin-top:12px;font-weight:500}input[type=text],input[type=email]{font:inherit;padding:10px 12px;border-radius:8px;border:1px solid #c9ccd3;width:100%;box-sizing:border-box}button{font:inherit;padding:12px;border-radius:8px;border:0;background:#1f5f8b;color:#fff;width:100%;margin-top:16px;cursor:pointer}fieldset{border:1px solid #c9ccd3;border-radius:8px;margin-top:16px}.m{color:#5a6070;font-size:.9rem}@media (prefers-color-scheme:dark){body{background:#15181e;color:#e7e9ee}input[type=text],input[type=email]{background:#1d2129;color:#e7e9ee}.m{color:#a3a9b6}}</style>
<body>${body}</body></html>`, { status, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store", "x-frame-options": "DENY" } });
}
const escHtml = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

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
const isOperator = (env, req) => !!env.OPERATOR_TOKEN && timingSafeEqual(req.headers.get("authorization") || "", "Bearer " + env.OPERATOR_TOKEN);

/** Podpis Przelewy24: SHA-384 z JSON-a o ustalonej kolejności pól (bez escapowania „/” i Unicode, jak JSON.stringify). */
export async function p24Sign(fields) {
  const digest = await crypto.subtle.digest("SHA-384", new TextEncoder().encode(JSON.stringify(fields)));
  return Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, "0")).join("");
}
async function p24(env, method, path, body) {
  const res = await fetch(p24Host(env) + "/api/v1" + path, {
    method,
    headers: { authorization: "Basic " + btoa(`${env.P24_POS_ID}:${env.P24_API_KEY}`), "content-type": "application/json" },
    body: JSON.stringify(body)
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || (data.responseCode !== undefined && data.responseCode !== 0)) throw new Error("p24 " + res.status + ": " + (data.error || "błąd"));
  return data;
}

const kvKey = id => "order:" + id;
async function getRec(env, id) { const raw = await env.PAYMENTS_KV.get(kvKey(id)); return raw ? JSON.parse(raw) : null; }
async function putRec(env, rec) { rec.updatedAt = new Date().toISOString(); await env.PAYMENTS_KV.put(kvKey(rec.orderId), JSON.stringify(rec)); }

function returnUrl(env, id) {
  const u = new URL(env.RETURN_URL);
  u.searchParams.set("platnosc", "powrot"); // Przelewy24 wraca tu po udanej i po przerwanej płatności
  u.searchParams.set("zlecenie", id);
  u.hash = "zlecenie";
  return u.toString();
}

/* ---------- Dane nabywcy do faktury ---------- */
/** {nip,name,addr1,addr2} albo null (bez faktury na firmę). Rzuca błąd z komunikatem dla klienta. */
export function parseBuyer(inv) {
  if (!inv || inv.want === false || inv.want === "0") return null;
  const nip = cleanNip(inv.nip), name = String(inv.name || "").trim(), addr1 = String(inv.addr1 || "").trim(), addr2 = String(inv.addr2 || "").trim();
  if (!nipValid(nip)) throw new Error("NIP do faktury jest nieprawidłowy. Sprawdź 10 cyfr.");
  if (name.length < 2 || name.length > 200) throw new Error("Podaj nazwę firmy do faktury.");
  if (!addr1 || addr1.length > 200 || addr2.length > 200) throw new Error("Podaj adres firmy do faktury (ulica i numer, kod i miejscowość).");
  return { nip, name, addr1, addr2 };
}

/* ---------- Rejestracja transakcji ---------- */
async function register(env, rec, email, origin) {
  const attempt = (rec.attempts || 0) + 1;
  const sessionId = `${rec.orderId}-${attempt}`;
  const merchantId = intEnv(env, "P24_MERCHANT_ID"), posId = intEnv(env, "P24_POS_ID");
  const sign = await p24Sign({ sessionId, merchantId, amount: rec.amount, currency: "PLN", crc: env.P24_CRC });
  const { data } = await p24(env, "POST", "/transaction/register", {
    merchantId, posId, sessionId,
    amount: rec.amount, currency: "PLN",
    description: `${rec.description} (zlecenie ${rec.orderId})`.slice(0, 1024),
    email, country: "PL", language: "pl",
    urlReturn: returnUrl(env, rec.orderId),
    urlStatus: new URL("/p24/status", origin).toString(),
    timeLimit: TIME_LIMIT_MIN,
    waitForResult: true,
    regulationAccept: false, // klient akceptuje regulamin Przelewy24 na ich stronie
    transferLabel: `Zlecenie ${rec.orderId}`,
    sign
  });
  Object.assign(rec, { attempts: attempt, sessionIds: [...(rec.sessionIds || []), sessionId].slice(-20) });
  await putRec(env, rec);
  return `${p24Host(env)}/trnRequest/${encodeURIComponent(data.token)}`;
}

async function startPayment(env, id, email, invoice, origin) {
  if (!ORDER_RE.test(id || "")) return { status: 400, error: "Nieprawidłowy numer zlecenia." };
  const rec = await getRec(env, id);
  if (!rec) return { status: 404, error: "Płatność za to zlecenie nie jest jeszcze dostępna. Płacisz dopiero po wykonaniu." };
  if (rec.status === "paid") return { status: 409, error: "To zlecenie jest już opłacone.", state: "paid" };
  if (rec.status === "review") return { status: 409, error: "Płatność wymaga sprawdzenia przez opiekuna. Nic więcej nie płać.", state: "review" };
  if (!EMAIL_RE.test(email || "") || email.length > 50) return { status: 400, error: "Podaj poprawny adres e-mail (do 50 znaków). Przelewy24 wyśle na niego potwierdzenie płatności." };
  try { rec.buyer = parseBuyer(invoice); } catch (e) { return { status: 400, error: e.message }; }
  return { url: await register(env, rec, email, origin) };
}

/* ---------- Faktura VAT w KSeF ---------- */
async function nextInvoiceNumber(env, date) {
  const ym = date.slice(0, 7), key = "invseq:" + ym;
  const n = Number(await env.PAYMENTS_KV.get(key) || 0) + 1;
  await env.PAYMENTS_KV.put(key, String(n));
  return `${env.INVOICE_SERIES || "RF"}/${ym.replace("-", "/")}/${String(n).padStart(4, "0")}`;
}

/**
 * Prowadzi fakturę zlecenia do końca: queued -> (numer, XML) -> sent -> issued | error.
 * Wywoływana po płatności (waitUntil) i z harmonogramu co 10 minut. Numer i XML zapisujemy przed wysłaniem,
 * więc ponowienie nigdy nie tworzy drugiego numeru; duplikat w KSeF (440) oznacza fakturę już przyjętą.
 */
export async function processInvoice(env, id, ksef) {
  const rec = await getRec(env, id);
  if (!rec?.invoice || !["queued", "sent"].includes(rec.invoice.state)) { await env.PAYMENTS_KV.delete?.("invq:" + id); return rec?.invoice || null; }
  if (!ksefConfigured(env)) return rec.invoice;
  const lock = "lock:inv:" + id;
  if (await env.PAYMENTS_KV.get(lock)) return rec.invoice;
  await env.PAYMENTS_KV.put(lock, "1", { expirationTtl: 120 });
  try {
    ksef = ksef || new Ksef({ env: env.KSEF_ENV || "test", nip: env.SELLER_NIP, token: env.KSEF_TOKEN });
    const inv = rec.invoice;
    if (inv.state === "queued") {
      if (!inv.number) {
        inv.issueDate = warsawDate();
        inv.number = await nextInvoiceNumber(env, inv.issueDate);
        inv.xml = buildInvoiceXml({
          seller: { nip: env.SELLER_NIP, name: env.SELLER_NAME, addr1: env.SELLER_ADDR1, addr2: env.SELLER_ADDR2 || "" },
          buyer: rec.buyer, number: inv.number, issueDate: inv.issueDate,
          serviceDate: warsawDate(new Date(rec.createdAt)), paidDate: warsawDate(new Date(rec.paidAt)),
          grossGrosz: rec.amount, rate: env.VAT_RATE, exemptBasis: env.VAT_EXEMPT_BASIS,
          description: `${rec.description} (zlecenie ${rec.orderId})`, paymentNote: "Płatność online Przelewy24"
        });
        await putRec(env, rec); // numer zapisany przed wysyłką
      }
      const r = await ksef.sendInvoice(inv.xml);
      Object.assign(inv, { state: "sent", sessionRef: r.sessionRef, invoiceRef: r.invoiceRef, sentAt: new Date().toISOString() });
      await putRec(env, rec);
    }
    if (inv.state === "sent") {
      const st = await ksef.invoiceStatus(inv.sessionRef, inv.invoiceRef);
      if (st.state === "issued") Object.assign(inv, { state: "issued", ksefNumber: st.ksefNumber, issuedAt: new Date().toISOString(), error: null });
      else if (st.state === "error") Object.assign(inv, { state: "error", error: `${st.code}: ${st.description}` });
      await putRec(env, rec);
    }
    if (inv.state !== "sent") await env.PAYMENTS_KV.delete?.("invq:" + id);
    return inv;
  } catch (e) {
    console.error("faktura", id, e.message);
    rec.invoice.lastError = String(e.message).slice(0, 300);
    await putRec(env, rec);
    return rec.invoice; // zostaje w kolejce, harmonogram ponowi
  } finally {
    await env.PAYMENTS_KV.delete?.(lock);
  }
}

/* ---------- Powiadomienie Przelewy24 (urlStatus) ---------- */
async function handleNotification(env, req, ctx) {
  const n = await req.json().catch(() => null);
  if (!n) return json({ error: "bad request" }, 400);
  const merchantId = intEnv(env, "P24_MERCHANT_ID"), posId = intEnv(env, "P24_POS_ID");
  const expected = await p24Sign({ merchantId: n.merchantId, posId: n.posId, sessionId: n.sessionId, amount: n.amount, originAmount: n.originAmount, currency: n.currency, orderId: n.orderId, methodId: n.methodId, statement: n.statement, crc: env.P24_CRC });
  if (!timingSafeEqual(String(n.sign || ""), expected) || n.merchantId !== merchantId || n.posId !== posId) return json({ error: "bad signature" }, 400);
  const id = String(n.sessionId || "").replace(/-\d+$/, "");
  const rec = ORDER_RE.test(id) ? await getRec(env, id) : null;
  if (!rec || !(rec.sessionIds || []).includes(n.sessionId)) return json({ error: "unknown session" }, 400);
  if (rec.status === "paid") return json({ received: true }); // powtórzone powiadomienie
  if (n.amount !== rec.amount || n.currency !== "PLN") {
    // Bez verify Przelewy24 nie zaksięguje transakcji i zwróci środki płacącemu.
    rec.status = "review"; rec.note = "Kwota w Przelewy24 różni się od kwoty zlecenia."; await putRec(env, rec);
    return json({ received: true });
  }
  const sign = await p24Sign({ sessionId: n.sessionId, orderId: n.orderId, amount: n.amount, currency: "PLN", crc: env.P24_CRC });
  const v = await p24(env, "PUT", "/transaction/verify", { merchantId, posId, sessionId: n.sessionId, amount: n.amount, currency: "PLN", orderId: n.orderId, sign });
  if (v.data?.status !== "success") throw new Error("verify failed"); // 502 => Przelewy24 ponowi powiadomienie
  Object.assign(rec, { status: "paid", paidAt: new Date().toISOString(), p24OrderId: n.orderId, p24MethodId: n.methodId });
  // Faktura: na NIP przez KSeF; bez konfiguracji KSeF zostaje dla księgowej („manual”).
  if (rec.buyer) rec.invoice = { state: ksefConfigured(env) ? "queued" : "manual" };
  await putRec(env, rec);
  if (rec.invoice?.state === "queued") {
    await env.PAYMENTS_KV.put("invq:" + id, "1");
    ctx?.waitUntil?.(processInvoice(env, id));
  }
  return json({ received: true });
}

/* ---------- Strona z linku SMS ---------- */
function payPage(rec, error = "", v = {}) {
  const zl = (rec.amount / 100).toLocaleString("pl-PL", { minimumFractionDigits: rec.amount % 100 ? 2 : 0 });
  return html(`<h1 style="font-size:1.4rem">Zapłać ${zl} zł</h1>
<p>${escHtml(rec.description)}, zlecenie <b>${escHtml(rec.orderId)}</b>.</p>
<p>BLIK, Apple Pay, Google Pay, karta albo szybki przelew. ${NO_SURCHARGE}</p>
${error ? `<p role="alert" style="color:#b3261e">${escHtml(error)}</p>` : ""}
<form method="post"><label for="e">E-mail do potwierdzenia płatności</label>
<input id="e" name="email" type="email" required maxlength="50" autocomplete="email" value="${escHtml(v.email)}">
<fieldset><legend>Faktura VAT na firmę (trafi do KSeF)</legend>
<label for="n">NIP</label><input id="n" name="nip" type="text" inputmode="numeric" maxlength="13" value="${escHtml(v.nip)}">
<label for="f">Nazwa firmy</label><input id="f" name="name" type="text" maxlength="200" autocomplete="organization" value="${escHtml(v.name)}">
<label for="a1">Ulica i numer</label><input id="a1" name="addr1" type="text" maxlength="200" autocomplete="address-line1" value="${escHtml(v.addr1)}">
<label for="a2">Kod pocztowy i miejscowość</label><input id="a2" name="addr2" type="text" maxlength="200" value="${escHtml(v.addr2)}">
<p class="m">Bez NIP-u nie wystawiamy faktury na firmę. Zostaw puste, jeśli jej nie potrzebujesz.</p></fieldset>
<button type="submit">Przejdź do płatności</button></form>
<p class="m">Płatność obsługuje Przelewy24 (PayPro S.A.) na stronie secure.przelewy24.pl. Nie widzimy danych karty ani kodu BLIK. E-mail trafia tylko do Przelewy24; my go nie zapisujemy.</p>`);
}

/* ---------- Router ---------- */
export default {
  async fetch(req, env, ctx) {
    const url = new URL(req.url);
    const h = cors(env, req);
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: h });
    try {
      // Opiekun: zlecenie wykonane, kwota do zapłaty (grosze).
      if (req.method === "POST" && url.pathname === "/due") {
        if (!isOperator(env, req)) return json({ error: "Brak uprawnień." }, 401, h);
        const b = await req.json().catch(() => ({}));
        const max = Number(env.MAX_AMOUNT_GROSZ) || 500000;
        if (!ORDER_RE.test(b.orderId || "")) return json({ error: "Nieprawidłowy numer zlecenia." }, 400, h);
        if (!Number.isInteger(b.amount) || b.amount < MIN_AMOUNT || b.amount > max) return json({ error: `Kwota w groszach: od ${MIN_AMOUNT} do ${max}.` }, 400, h);
        const prev = await getRec(env, b.orderId);
        if (prev?.status === "paid") return json({ error: "Zlecenie jest już opłacone.", status: "paid" }, 409, h);
        if (prev && prev.amount !== b.amount && (prev.sessionIds || []).length) return json({ error: "Klient rozpoczął już płatność na inną kwotę. Wyjaśnij sprawę w panelu Przelewy24." }, 409, h);
        const description = typeof b.description === "string" && b.description.trim() ? b.description.trim().slice(0, 120) : SERVICE_NAME;
        await putRec(env, { ...(prev || {}), orderId: b.orderId, amount: b.amount, description, status: "due", createdAt: prev?.createdAt || new Date().toISOString() });
        return json({ status: "due", payLink: new URL("/zaplac/" + b.orderId, url.origin).toString() }, 200, h);
      }
      // Klient na stronie: rejestracja transakcji, zwrot adresu strony płatności.
      if (req.method === "POST" && url.pathname === "/checkout") {
        const b = await req.json().catch(() => ({}));
        const r = await startPayment(env, b.orderId, String(b.email || "").trim(), b.invoice, url.origin);
        return r.url ? json({ url: r.url }, 200, h) : json({ error: r.error, status: r.state }, r.status, h);
      }
      // Link z SMS-a od opiekuna: /zaplac/<id> (formularz) -> Przelewy24.
      const m = url.pathname.match(/^\/zaplac\/(Z-[0-9A-F]{6})$/);
      if (m && (req.method === "GET" || req.method === "POST")) {
        const rec = await getRec(env, m[1]);
        if (!rec) return html(`<p>Płatność za to zlecenie nie jest jeszcze dostępna. Płacisz dopiero po wykonaniu.</p>`, 404);
        if (rec.status === "paid") return html(`<p>To zlecenie jest już opłacone. Dziękujemy.</p>`, 409);
        if (req.method === "GET") return payPage(rec);
        const f = await req.formData().catch(() => null);
        const v = Object.fromEntries(["email", "nip", "name", "addr1", "addr2"].map(k => [k, String(f?.get(k) || "").trim()]));
        const r = await startPayment(env, m[1], v.email, { want: !!v.nip, ...v }, url.origin);
        return r.url ? Response.redirect(r.url, 303) : payPage(rec, r.error, v);
      }
      // Status dla klienta i opiekuna: bez NIP-u i danych nabywcy.
      if (req.method === "GET" && url.pathname === "/status") {
        const id = url.searchParams.get("zlecenie") || "";
        if (!ORDER_RE.test(id)) return json({ error: "Nieprawidłowy numer zlecenia." }, 400, h);
        const rec = await getRec(env, id);
        const inv = rec?.invoice ? { state: rec.invoice.state, number: rec.invoice.number || null, ksefNumber: rec.invoice.ksefNumber || null } : null;
        return json({ status: rec ? rec.status : "none", amount: rec?.amount ?? null, paidAt: rec?.paidAt ?? null, invoice: inv }, 200, h);
      }
      // Opiekun: XML faktury (dla księgowej) i ręczne ponowienie wysyłki do KSeF.
      const fx = url.pathname.match(/^\/faktura\/(Z-[0-9A-F]{6})(\.xml|\/ponow)$/);
      if (fx) {
        if (!isOperator(env, req)) return json({ error: "Brak uprawnień." }, 401, h);
        const rec = await getRec(env, fx[1]);
        if (!rec?.invoice) return json({ error: "To zlecenie nie ma faktury." }, 404, h);
        if (fx[2] === ".xml") return rec.invoice.xml ? new Response(rec.invoice.xml, { headers: { "content-type": "application/xml; charset=utf-8", "content-disposition": `attachment; filename="${rec.invoice.number.replace(/\//g, "-")}.xml"`, ...h } }) : json({ error: "Faktura nie ma jeszcze numeru." }, 409, h);
        if (req.method !== "POST") return json({ error: "Użyj POST." }, 405, h);
        if (rec.invoice.state === "error") { // ten sam numer i XML: odrzucona faktura nie zajęła numeru w KSeF
          Object.assign(rec.invoice, { state: "queued", sessionRef: null, invoiceRef: null, error: null });
          await putRec(env, rec); await env.PAYMENTS_KV.put("invq:" + rec.orderId, "1");
        }
        const inv = await processInvoice(env, rec.orderId);
        return json({ state: inv?.state, number: inv?.number || null, ksefNumber: inv?.ksefNumber || null, error: inv?.error || inv?.lastError || null }, 200, h);
      }
      if (req.method === "POST" && url.pathname === "/p24/status") return await handleNotification(env, req, ctx);
      return json({ error: "Nie znaleziono." }, 404, h);
    } catch (e) {
      console.error(e);
      return json({ error: "Płatność chwilowo niedostępna. Spróbuj za kilka minut albo zapłać przelewem." }, 502, h);
    }
  },
  // Harmonogram (wrangler.toml: crons): dokończenie faktur czekających na KSeF.
  async scheduled(_event, env) {
    const { keys } = await env.PAYMENTS_KV.list({ prefix: "invq:" });
    for (const k of keys) await processInvoice(env, k.name.slice(5));
  }
};
