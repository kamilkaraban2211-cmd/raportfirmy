/* RaportFirmy.pl — faktura VAT w KSeF 2.0 (schemat FA(3), sesja interaktywna, logowanie tokenem KSeF).
 *
 * Źródło: oficjalna dokumentacja MF (github.com/CIRFMF/ksef-docs, open-api.json, schemat_FA(3)_v1-0E.xsd).
 * Przebieg:
 *   GET  /security/public-key-certificates            klucze MF (KsefTokenEncryption, SymmetricKeyEncryption)
 *   POST /auth/challenge -> POST /auth/ksef-token      token KSeF|timestampMs zaszyfrowany RSA-OAEP SHA-256
 *   GET  /auth/rev2/{ref} (100 -> 200) -> POST /auth/token/redeem   accessToken
 *   POST /sessions/online                              klucz AES-256 zaszyfrowany RSA-OAEP, IV 16 B
 *   POST /sessions/online/{ref}/invoices               faktura AES-256-CBC/PKCS#7 + skróty SHA-256 i rozmiary
 *   POST /sessions/online/{ref}/close
 *   GET  /sessions/{ref}/invoices/{invRef}             200 + ksefNumber = faktura w KSeF
 */

export const KSEF_HOSTS = {
  test: "https://api-test.ksef.mf.gov.pl/v2",
  demo: "https://api-demo.ksef.mf.gov.pl/v2",
  prod: "https://api.ksef.mf.gov.pl/v2"
};
const FORM_CODE = { systemCode: "FA (3)", schemaVersion: "1-0E", value: "FA" };
const FA3_NS = "http://crd.gov.pl/wzor/2025/06/25/13775/";

/* ---------- Dane i kwoty ---------- */
export function nipValid(nip) {
  const d = String(nip || "").replace(/[\s-]/g, "");
  if (!/^\d{10}$/.test(d) || /^0+$/.test(d)) return false;
  const w = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  const sum = w.reduce((s, x, i) => s + x * Number(d[i]), 0);
  return sum % 11 !== 10 && sum % 11 === Number(d[9]);
}
export const cleanNip = nip => String(nip || "").replace(/[\s-]/g, "").replace(/^PL/i, "");

/** Brutto (grosze) -> netto i VAT dla stawki („23”, „8”, „5”) albo „zw”. Kwota brutto zostaje dokładnie taka, jaką zapłacił klient. */
export function vatSplit(grossGrosz, rate) {
  if (rate === "zw") return { net: grossGrosz, vat: 0 };
  const r = Number(rate);
  const net = Math.round(grossGrosz * 100 / (100 + r));
  return { net, vat: grossGrosz - net };
}
const amt = g => (g / 100).toFixed(2);
export const warsawDate = (d = new Date()) => new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Warsaw" }).format(d);
const x = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" }[c]))
  // znaki niedozwolone w XML 1.0 i niezalecane przez KSeF
  .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u0084\u0086-\u009F﷐-﷯￾￿]/g, "");

/**
 * Faktura VAT FA(3). seller/buyer: { nip, name, addr1, addr2 }.
 * rate: "23" | "8" | "5" | "zw"; exemptBasis: przepis (P_19A), wymagany przy „zw”.
 */
export function buildInvoiceXml({ seller, buyer, number, issueDate, serviceDate, paidDate, grossGrosz, rate, exemptBasis, description, paymentNote, createdAt = new Date().toISOString() }) {
  if (!nipValid(seller.nip)) throw new Error("NIP sprzedawcy jest nieprawidłowy.");
  if (!nipValid(buyer.nip)) throw new Error("NIP nabywcy jest nieprawidłowy.");
  if (rate === "zw" && !exemptBasis) throw new Error("Przy zwolnieniu z VAT podaj podstawę prawną.");
  if (!["23", "8", "5", "zw"].includes(rate)) throw new Error("Nieobsługiwana stawka VAT.");
  const { net, vat } = vatSplit(grossGrosz, rate);
  const totals = rate === "zw" ? `<P_13_7>${amt(net)}</P_13_7>`
    : { "23": `<P_13_1>${amt(net)}</P_13_1><P_14_1>${amt(vat)}</P_14_1>`, "8": `<P_13_2>${amt(net)}</P_13_2><P_14_2>${amt(vat)}</P_14_2>`, "5": `<P_13_3>${amt(net)}</P_13_3><P_14_3>${amt(vat)}</P_14_3>` }[rate];
  const addr = a => `<Adres><KodKraju>PL</KodKraju><AdresL1>${x(a.addr1)}</AdresL1>${a.addr2 ? `<AdresL2>${x(a.addr2)}</AdresL2>` : ""}</Adres>`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<Faktura xmlns="${FA3_NS}" xmlns:etd="http://crd.gov.pl/xml/schematy/dziedzinowe/mf/2022/01/05/eD/DefinicjeTypy/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
<Naglowek><KodFormularza kodSystemowy="FA (3)" wersjaSchemy="1-0E">FA</KodFormularza><WariantFormularza>3</WariantFormularza><DataWytworzeniaFa>${x(createdAt.replace(/\.\d+Z$/, "Z"))}</DataWytworzeniaFa><SystemInfo>RaportFirmy.pl</SystemInfo></Naglowek>
<Podmiot1><DaneIdentyfikacyjne><NIP>${cleanNip(seller.nip)}</NIP><Nazwa>${x(seller.name)}</Nazwa></DaneIdentyfikacyjne>${addr(seller)}</Podmiot1>
<Podmiot2><DaneIdentyfikacyjne><NIP>${cleanNip(buyer.nip)}</NIP><Nazwa>${x(buyer.name)}</Nazwa></DaneIdentyfikacyjne>${buyer.addr1 ? addr(buyer) : ""}<JST>2</JST><GV>2</GV></Podmiot2>
<Fa><KodWaluty>PLN</KodWaluty><P_1>${issueDate}</P_1><P_2>${x(number)}</P_2><P_6>${serviceDate}</P_6>${totals}<P_15>${amt(grossGrosz)}</P_15>
<Adnotacje><P_16>2</P_16><P_17>2</P_17><P_18>2</P_18><P_18A>2</P_18A><Zwolnienie>${rate === "zw" ? `<P_19>1</P_19><P_19A>${x(exemptBasis)}</P_19A>` : "<P_19N>1</P_19N>"}</Zwolnienie><NoweSrodkiTransportu><P_22N>1</P_22N></NoweSrodkiTransportu><P_23>2</P_23><PMarzy><P_PMarzyN>1</P_PMarzyN></PMarzy></Adnotacje>
<RodzajFaktury>VAT</RodzajFaktury>
<FaWiersz><NrWierszaFa>1</NrWierszaFa><P_7>${x(description)}</P_7><P_8A>usł.</P_8A><P_8B>1</P_8B><P_9A>${amt(net)}</P_9A><P_11>${amt(net)}</P_11><P_12>${rate}</P_12></FaWiersz>
<Platnosc><Zaplacono>1</Zaplacono><DataZaplaty>${paidDate}</DataZaplaty><PlatnoscInna>1</PlatnoscInna><OpisPlatnosci>${x(paymentNote || "Płatność online Przelewy24")}</OpisPlatnosci></Platnosc>
</Fa>
</Faktura>
`;
}

/* ---------- Kryptografia ---------- */
const b64 = buf => { let s = ""; const a = new Uint8Array(buf); for (let i = 0; i < a.length; i += 0x8000) s += String.fromCharCode(...a.subarray(i, i + 0x8000)); return btoa(s); };
const unb64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));
const sha256b64 = async data => b64(await crypto.subtle.digest("SHA-256", data));

/** SubjectPublicKeyInfo z certyfikatu X.509 (DER): Certificate -> tbsCertificate -> [version] serial sigAlg issuer validity subject SPKI. */
export function spkiFromCertDer(der) {
  const read = (buf, off) => {
    const tag = buf[off]; let len = buf[off + 1], hdr = 2;
    if (len & 0x80) { const n = len & 0x7f; len = 0; for (let i = 0; i < n; i++) len = len * 256 + buf[off + 2 + i]; hdr = 2 + n; }
    return { tag, start: off, contentStart: off + hdr, end: off + hdr + len };
  };
  const cert = read(der, 0);
  const tbs = read(der, cert.contentStart);
  let p = tbs.contentStart, idx = 0;
  const fields = [];
  while (p < tbs.end && fields.length < 7) { const el = read(der, p); fields.push(el); p = el.end; idx++; }
  const off = fields[0].tag === 0xa0 ? 1 : 0; // opcjonalna wersja [0]
  const spki = fields[off + 5];
  if (!spki || spki.tag !== 0x30) throw new Error("Nie znaleziono klucza publicznego w certyfikacie KSeF.");
  return der.slice(spki.start, spki.end);
}

async function rsaEncrypt(cert, data) {
  const key = await crypto.subtle.importKey("spki", spkiFromCertDer(unb64(cert.certificate)), { name: "RSA-OAEP", hash: "SHA-256" }, false, ["encrypt"]);
  return b64(await crypto.subtle.encrypt({ name: "RSA-OAEP" }, key, data));
}

/* ---------- Klient KSeF ---------- */
export class Ksef {
  constructor({ env = "test", nip, token, fetchImpl = (...a) => fetch(...a), sleep = ms => new Promise(r => setTimeout(r, ms)) }) {
    if (!KSEF_HOSTS[env]) throw new Error("KSEF_ENV: test, demo albo prod.");
    Object.assign(this, { host: KSEF_HOSTS[env], nip: cleanNip(nip), token, fetchImpl, sleep, accessToken: null, keys: null });
  }
  async call(method, path, { body, bearer } = {}) {
    const res = await this.fetchImpl(this.host + path, {
      method,
      headers: { accept: "application/json", ...(body ? { "content-type": "application/json" } : {}), ...(bearer ? { authorization: "Bearer " + bearer } : {}) },
      body: body ? JSON.stringify(body) : undefined
    });
    const text = await res.text();
    const data = text ? JSON.parse(text) : {};
    if (!res.ok) { const e = new Error(`KSeF ${method} ${path}: ${res.status}`); e.status = res.status; e.data = data; throw e; }
    return data;
  }
  async publicKeys() {
    if (this.keys) return this.keys;
    const list = await this.call("GET", "/security/public-key-certificates");
    const now = Date.now();
    const pick = usage => list.filter(c => [].concat(c.usage).includes(usage) && Date.parse(c.validFrom) <= now && now < Date.parse(c.validTo))
      .sort((a, b) => Date.parse(b.validFrom) - Date.parse(a.validFrom))[0];
    this.keys = { token: pick("KsefTokenEncryption"), symmetric: pick("SymmetricKeyEncryption") };
    if (!this.keys.token || !this.keys.symmetric) throw new Error("Brak ważnych kluczy publicznych KSeF.");
    return this.keys;
  }
  async authenticate() {
    if (this.accessToken) return this.accessToken;
    const keys = await this.publicKeys();
    const ch = await this.call("POST", "/auth/challenge");
    const encryptedToken = await rsaEncrypt(keys.token, new TextEncoder().encode(`${this.token}|${ch.timestampMs}`));
    const init = await this.call("POST", "/auth/ksef-token", { body: { challenge: ch.challenge, contextIdentifier: { type: "Nip", value: this.nip }, encryptedToken, publicKeyId: keys.token.publicKeyId } });
    const authToken = init.authenticationToken.token;
    for (let i = 0; i < 20; i++) {
      const st = await this.call("GET", "/auth/rev2/" + encodeURIComponent(init.referenceNumber), { bearer: authToken });
      if (st.status.code === 200) break;
      if (st.status.code !== 100) throw new Error(`Logowanie do KSeF nieudane (${st.status.code}): ${st.status.description}`);
      if (i === 19) throw new Error("Logowanie do KSeF trwa zbyt długo.");
      await this.sleep(1000);
    }
    const t = await this.call("POST", "/auth/token/redeem", { bearer: authToken });
    this.accessToken = t.accessToken.token;
    return this.accessToken;
  }
  /** Wysyła jedną fakturę w sesji interaktywnej. Zwraca numery referencyjne sesji i faktury. */
  async sendInvoice(xml) {
    const access = await this.authenticate();
    const keys = await this.publicKeys();
    const aesRaw = crypto.getRandomValues(new Uint8Array(32)), iv = crypto.getRandomValues(new Uint8Array(16));
    const session = await this.call("POST", "/sessions/online", { bearer: access, body: { formCode: FORM_CODE, encryption: { encryptedSymmetricKey: await rsaEncrypt(keys.symmetric, aesRaw), initializationVector: b64(iv), publicKeyId: keys.symmetric.publicKeyId } } });
    const plain = new TextEncoder().encode(xml);
    const aes = await crypto.subtle.importKey("raw", aesRaw, { name: "AES-CBC" }, false, ["encrypt"]);
    const enc = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-CBC", iv }, aes, plain)); // PKCS#7 w Web Crypto
    let sent;
    try {
      sent = await this.call("POST", `/sessions/online/${encodeURIComponent(session.referenceNumber)}/invoices`, { bearer: access, body: {
        invoiceHash: await sha256b64(plain), invoiceSize: plain.length,
        encryptedInvoiceHash: await sha256b64(enc), encryptedInvoiceSize: enc.length,
        encryptedInvoiceContent: b64(enc), offlineMode: false
      } });
    } finally {
      await this.call("POST", `/sessions/online/${encodeURIComponent(session.referenceNumber)}/close`, { bearer: access }).catch(() => {});
    }
    return { sessionRef: session.referenceNumber, invoiceRef: sent.referenceNumber, invoiceHash: await sha256b64(plain) };
  }
  /** { state: "sent" | "issued" | "error", ksefNumber?, code, description } */
  async invoiceStatus(sessionRef, invoiceRef) {
    const access = await this.authenticate();
    const r = await this.call("GET", `/sessions/${encodeURIComponent(sessionRef)}/invoices/${encodeURIComponent(invoiceRef)}`, { bearer: access });
    const { code, description, extensions } = r.status;
    if (code === 200) return { state: "issued", ksefNumber: r.ksefNumber, code, description };
    if (code === 100 || code === 150) return { state: "sent", code, description };
    if (code === 440 && extensions?.originalKsefNumber) return { state: "issued", ksefNumber: extensions.originalKsefNumber, code, description: "Duplikat: faktura była już w KSeF." };
    return { state: "error", code, description: [description, ...(r.status.details || [])].join(" ") };
  }
}
