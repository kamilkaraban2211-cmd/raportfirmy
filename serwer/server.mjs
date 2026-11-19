// Serwer MVP: zgłoszenie „Popraw za mnie”, status sprawy dla klienta, panel opiekuna.
// Zależności: node:http + pg. Konfiguracja w zmiennych środowiskowych (patrz .env.example).
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";
import { hashPassword, verifyPassword, checkTotp, validNip, encrypt, decrypt, sha256, newToken, TOKEN_RE } from "./lib.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const STANY = ["znalezlismy", "robimy", "gotowe", "nie_udalo_sie"];
const ZGODA = "Zgadzam się na kontakt telefoniczny RaportFirmy.pl w sprawie tego zlecenia i na przetwarzanie podanych danych w tym celu.";
const COOKIE = "__Host-rf_sesja";
const SESJA_H = 8;

const SEC_HEADERS = {
  "Content-Security-Policy": "default-src 'none'; script-src 'self'; style-src 'self'; connect-src 'self'; img-src 'self'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "no-referrer",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Cache-Control": "no-store",
};

const STATIC = {
  "/": ["index.html", "text/html; charset=utf-8"],
  "/sprawa": ["sprawa.html", "text/html; charset=utf-8"],
  "/panel": ["panel.html", "text/html; charset=utf-8"],
  "/styl.css": ["styl.css", "text/css; charset=utf-8"],
  "/zlecenie.js": ["zlecenie.js", "text/javascript; charset=utf-8"],
  "/sprawa.js": ["sprawa.js", "text/javascript; charset=utf-8"],
  "/panel.js": ["panel.js", "text/javascript; charset=utf-8"],
};

class HttpError extends Error { constructor(status, body) { super("http"); this.status = status; this.body = body; } }

export async function createServer(cfg) {
  const nipKey = Buffer.from(cfg.nipKey || "", "base64");
  if (nipKey.length !== 32) throw new Error("NIP_KEY musi mieć 32 bajty zapisane w base64");
  if (!cfg.origin) throw new Error("Brak APP_ORIGIN");

  const pool = new pg.Pool({ connectionString: cfg.databaseUrl, max: 10 });
  await assertRlsApplies(pool);

  const files = Object.fromEntries(Object.entries(STATIC).map(([p, [f, type]]) =>
    [p, { body: fs.readFileSync(path.join(here, "public", f)), type }]));
  const dummyHash = await hashPassword("brak-uzytkownika");

  // Limity żądań w pamięci procesu (jedna instancja w MVP).
  const hits = new Map();
  const limited = (key, max, ms) => {
    const now = Date.now();
    let e = hits.get(key);
    if (!e || e.reset < now) { e = { n: 0, reset: now + ms }; hits.set(key, e); }
    return ++e.n > max;
  };
  const sweep = setInterval(() => { const now = Date.now(); for (const [k, e] of hits) if (e.reset < now) hits.delete(k); }, 60000);
  sweep.unref();

  async function tx(rola, tokenHash, fn) {
    const c = await pool.connect();
    try {
      await c.query("BEGIN");
      await setCtx(c, rola, tokenHash);
      const r = await fn(c);
      await c.query("COMMIT");
      return r;
    } catch (e) {
      await c.query("ROLLBACK").catch(() => {});
      throw e;
    } finally { c.release(); }
  }
  const setCtx = (c, rola, tokenHash) => c.query(
    "SELECT set_config('app.rola', $1, true), set_config('app.token', $2, true)",
    [rola, tokenHash ? tokenHash.toString("hex") : ""]);
  const log = (c, kto, akcja, id = null) =>
    c.query("INSERT INTO dziennik (kto, akcja, zlecenie_id) VALUES ($1, $2, $3)", [kto, akcja, id]);

  const ipOf = req => cfg.trustProxy
    ? String(req.headers["x-forwarded-for"] || "").split(",").pop().trim() || req.socket.remoteAddress
    : req.socket.remoteAddress;

  async function readJson(req) {
    if (!String(req.headers["content-type"] || "").startsWith("application/json")) throw new HttpError(415, { blad: "Oczekiwano JSON." });
    let size = 0; const chunks = [];
    for await (const ch of req) {
      size += ch.length;
      if (size > 16 * 1024) throw new HttpError(413, { blad: "Za duże żądanie." });
      chunks.push(ch);
    }
    try { const v = JSON.parse(Buffer.concat(chunks).toString("utf8")); if (v && typeof v === "object") return v; } catch {}
    throw new HttpError(400, { blad: "Niepoprawny JSON." });
  }

  async function opiekunId(req) {
    const t = cookies(req)[COOKIE];
    if (!t || !TOKEN_RE.test(t)) return null;
    const th = sha256(t);
    const r = await tx("sesja", th, c => c.query("SELECT opiekun_id FROM sesja WHERE token_hash = $1 AND wygasa > now()", [th]));
    return r.rows[0]?.opiekun_id ?? null;
  }

  const routes = {
    "POST /api/zlecenia": async (req, res, ip) => {
      if (limited("z:" + ip, 10, 3600e3)) throw new HttpError(429, { blad: "Za dużo zgłoszeń. Spróbuj za godzinę." });
      const b = await readJson(req);
      const v = {
        sklep: str(b.sklep), miejscowosc: str(b.miejscowosc), imie: str(b.imie), opis: str(b.opis),
        telefon: String(b.telefon ?? "").replace(/\D/g, "").replace(/^48(?=\d{9}$)/, ""),
        nip: String(b.nip ?? "").replace(/[\s-]/g, ""),
      };
      const bledy = {};
      if (v.sklep.length < 3 || v.sklep.length > 120) bledy.sklep = "Podaj nazwę sklepu (3–120 znaków).";
      if (v.miejscowosc.length < 2 || v.miejscowosc.length > 80) bledy.miejscowosc = "Podaj miejscowość.";
      if (v.imie.length < 1 || v.imie.length > 60) bledy.imie = "Podaj imię.";
      if (!/^\d{9}$/.test(v.telefon)) bledy.telefon = "Numer telefonu ma 9 cyfr.";
      if (!validNip(v.nip)) bledy.nip = "NIP jest niepoprawny (10 cyfr z prawidłową sumą kontrolną).";
      if (v.opis.length > 1000) bledy.opis = "Opis może mieć najwyżej 1000 znaków.";
      if (b.zgoda !== true) bledy.zgoda = "Bez zgody na kontakt nie możemy przyjąć zlecenia.";
      if (Object.keys(bledy).length) throw new HttpError(400, { bledy });

      const token = newToken(), th = sha256(token);
      await tx("anon", th, async c => {
        const r = await c.query(
          `INSERT INTO zlecenie (token_hash, sklep, miejscowosc, imie, telefon, nip_szyfr, opis, zgoda_tresc)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
          [th, v.sklep, v.miejscowosc, v.imie, v.telefon, encrypt(nipKey, v.nip), v.opis, ZGODA]);
        const id = r.rows[0].id;
        await c.query("INSERT INTO historia_stanu (zlecenie_id, stan) VALUES ($1, 'znalezlismy')", [id]);
        await log(c, "klient", "utworzenie", id);
      });
      json(res, 201, { link: "/sprawa#" + token });
    },

    "GET /api/sprawa": async (req, res, ip) => {
      if (limited("s:" + ip, 60, 60e3)) throw new HttpError(429, { blad: "Za dużo zapytań." });
      const t = String(req.headers.authorization || "").replace(/^Bearer /, "");
      if (!TOKEN_RE.test(t)) throw new HttpError(404, { blad: "Nie ma takiej sprawy." });
      const th = sha256(t);
      const out = await tx("klient", th, async c => {
        const r = await c.query("SELECT id, sklep, miejscowosc, stan, utworzono FROM zlecenie WHERE token_hash = $1", [th]);
        const z = r.rows[0];
        if (!z) return null;
        const h = await c.query("SELECT stan, kiedy FROM historia_stanu WHERE zlecenie_id = $1 ORDER BY kiedy, id", [z.id]);
        await log(c, "klient", "odczyt", z.id);
        return { sklep: z.sklep, miejscowosc: z.miejscowosc, stan: z.stan, utworzono: z.utworzono, historia: h.rows };
      });
      if (!out) throw new HttpError(404, { blad: "Nie ma takiej sprawy." });
      json(res, 200, out);
    },

    "POST /api/opiekun/logowanie": async (req, res, ip) => {
      if (limited("l:" + ip, 10, 15 * 60e3)) throw new HttpError(429, { blad: "Za dużo prób logowania. Spróbuj za 15 minut." });
      const b = await readJson(req);
      const login = str(b.login).toLowerCase(), haslo = String(b.haslo ?? ""), kod = String(b.kod ?? "");
      const token = await tx("logowanie", null, async c => {
        const r = await c.query("SELECT id, haslo_hash, totp_sekret, totp_krok FROM opiekun WHERE login = $1 AND aktywny", [login]);
        const u = r.rows[0];
        const pwOk = await verifyPassword(haslo, u ? u.haslo_hash : dummyHash);
        const step = u && pwOk ? checkTotp(u.totp_sekret, kod, Number(u.totp_krok)) : null;
        if (step === null) { await log(c, "nieznany", "logowanie_nieudane"); return null; }
        await c.query("UPDATE opiekun SET totp_krok = $2 WHERE id = $1", [u.id, step]);
        const t = newToken();
        await c.query(`INSERT INTO sesja (token_hash, opiekun_id, wygasa) VALUES ($1, $2, now() + interval '${SESJA_H} hours')`, [sha256(t), u.id]);
        await log(c, "opiekun:" + u.id, "logowanie");
        return t;
      });
      if (!token) throw new HttpError(401, { blad: "Nieprawidłowy login, hasło lub kod." });
      res.setHeader("Set-Cookie", `${COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESJA_H * 3600}`);
      json(res, 200, { ok: true });
    },

    "POST /api/opiekun/wyloguj": async (req, res) => {
      const t = cookies(req)[COOKIE];
      if (t && TOKEN_RE.test(t)) await tx("sesja", sha256(t), c => c.query("DELETE FROM sesja WHERE token_hash = $1", [sha256(t)]));
      res.setHeader("Set-Cookie", `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`);
      json(res, 200, { ok: true });
    },

    "GET /api/opiekun/zlecenia": async (req, res) => {
      const oid = await opiekunId(req);
      if (!oid) throw new HttpError(401, { blad: "Zaloguj się." });
      const rows = await tx("opiekun", null, async c => {
        const r = await c.query(
          `SELECT id, sklep, miejscowosc, imie, telefon, nip_szyfr, opis, stan, utworzono, zmieniono
           FROM zlecenie ORDER BY utworzono DESC LIMIT 200`);
        await log(c, "opiekun:" + oid, "odczyt_listy");
        return r.rows;
      });
      json(res, 200, rows.map(({ nip_szyfr, ...z }) => ({ ...z, nip: decrypt(nipKey, nip_szyfr) })));
    },
  };

  async function zmienStan(req, res, id) {
    const oid = await opiekunId(req);
    if (!oid) throw new HttpError(401, { blad: "Zaloguj się." });
    const b = await readJson(req);
    if (!STANY.includes(b.stan)) throw new HttpError(400, { blad: "Nieznany stan." });
    const ok = await tx("opiekun", null, async c => {
      const r = await c.query("UPDATE zlecenie SET stan = $2, zmieniono = now() WHERE id = $1 RETURNING id", [id, b.stan]);
      if (!r.rowCount) return false;
      await c.query("INSERT INTO historia_stanu (zlecenie_id, stan) VALUES ($1, $2)", [id, b.stan]);
      await log(c, "opiekun:" + oid, "stan:" + b.stan, id);
      return true;
    });
    if (!ok) throw new HttpError(404, { blad: "Nie ma takiego zlecenia." });
    json(res, 200, { ok: true });
  }

  const server = http.createServer(async (req, res) => {
    for (const [k, v] of Object.entries(SEC_HEADERS)) res.setHeader(k, v);
    try {
      const p = new URL(req.url, "http://x").pathname;
      if (req.method === "GET" && files[p]) {
        res.writeHead(200, { "Content-Type": files[p].type });
        return res.end(files[p].body);
      }
      // Ochrona przed CSRF: każde żądanie zmieniające stan musi przyjść z naszej strony.
      if (req.method !== "GET" && req.headers.origin !== cfg.origin) throw new HttpError(403, { blad: "Niedozwolone źródło żądania." });
      const ip = ipOf(req);
      const route = routes[req.method + " " + p];
      if (route) return await route(req, res, ip);
      const m = req.method === "POST" && p.match(/^\/api\/opiekun\/zlecenia\/(\d{1,15})\/stan$/);
      if (m) return await zmienStan(req, res, m[1]);
      throw new HttpError(404, { blad: "Nie znaleziono." });
    } catch (e) {
      if (e instanceof HttpError) return json(res, e.status, e.body);
      console.error(new Date().toISOString(), req.method, req.url.split("?")[0], e.code || "", e.message);
      json(res, 500, { blad: "Błąd serwera. Spróbuj ponownie później." });
    }
  });
  server.on("close", () => pool.end());
  return server;
}

// Serwer odmawia startu, jeśli łączy się jako właściciel tabel albo rola omijająca RLS.
async function assertRlsApplies(pool) {
  const r = await pool.query(
    `SELECT rolsuper OR rolbypassrls AS omija,
            (SELECT count(*) FROM pg_tables WHERE schemaname = 'public' AND tableowner = current_user) AS wlasne
     FROM pg_roles WHERE rolname = current_user`);
  const { omija, wlasne } = r.rows[0];
  if (omija || Number(wlasne) > 0) {
    await pool.end();
    throw new Error("DATABASE_URL musi wskazywać użytkownika aplikacji (nie właściciela tabel, bez BYPASSRLS), inaczej RLS nie działa.");
  }
}

const str = v => String(v ?? "").trim();
function cookies(req) {
  const out = {};
  for (const part of String(req.headers.cookie || "").split(";")) {
    const i = part.indexOf("=");
    if (i > 0) out[part.slice(0, i).trim()] = part.slice(i + 1).trim();
  }
  return out;
}
function json(res, status, body) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(body));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const server = await createServer({
    databaseUrl: process.env.DATABASE_URL,
    nipKey: process.env.NIP_KEY,
    origin: process.env.APP_ORIGIN,
    trustProxy: process.env.TRUST_PROXY === "1",
  });
  const port = Number(process.env.PORT || 3000);
  server.listen(port, () => console.log(`RaportFirmy.pl MVP: port ${port}`));
}
