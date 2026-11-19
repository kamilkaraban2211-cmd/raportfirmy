// Testy serwera na prawdziwym PostgreSQL. Baza testowa jest czyszczona, dlatego jej nazwa musi kończyć się na _test.
//   TEST_DB_OWNER_URL=postgres://wlasciciel@localhost/rf_test TEST_DB_APP_URL=postgres://rf_app@localhost/rf_test \
//   TEST_APP_ROLE=rf_app npm run test:serwer
import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import crypto from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";
import { createServer } from "../server.mjs";
import { hashPassword, totpAt, validNip, checkTotp } from "../lib.mjs";

const OWNER = process.env.TEST_DB_OWNER_URL, APP = process.env.TEST_DB_APP_URL, ROLE = process.env.TEST_APP_ROLE || "rf_app";
const ORIGIN = "https://raportfirmy.test";
const NIP = "5260250274"; // poprawna suma kontrolna
const schema = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "schema.sql");

test("lib: NIP i TOTP", () => {
  assert.equal(validNip(NIP), true);
  assert.equal(validNip("5260250275"), false);
  assert.equal(validNip("12345"), false);
  // Wektor testowy RFC 6238 (SHA-1, T = 59 s): 94287082 → ostatnie 6 cyfr
  assert.equal(totpAt(Buffer.from("12345678901234567890"), 1), "287082");
  const s = crypto.randomBytes(20), step = Math.floor(Date.now() / 30000);
  assert.equal(checkTotp(s, totpAt(s, step), 0), step);
  assert.equal(checkTotp(s, totpAt(s, step), step), null, "ponowne użycie kodu");
});

test("serwer i baza", { skip: !(OWNER && APP) && "brak TEST_DB_OWNER_URL / TEST_DB_APP_URL" }, async t => {
  assert.match(new URL(OWNER).pathname, /_test$/, "baza testowa musi kończyć się na _test");
  execFileSync("psql", [OWNER, "-q", "-v", "ON_ERROR_STOP=1", "-c", "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"]);
  execFileSync("psql", [OWNER, "-q", "-v", "ON_ERROR_STOP=1", "-v", "app_role=" + ROLE, "-f", schema]);

  const owner = new pg.Client({ connectionString: OWNER });
  await owner.connect();
  t.after(() => owner.end());
  const sekret = crypto.randomBytes(20);
  await owner.query("INSERT INTO opiekun (login, haslo_hash, totp_sekret) VALUES ('ola', $1, $2)", [await hashPassword("tajne-haslo-1"), sekret]);

  await assert.rejects(createServer({ databaseUrl: OWNER, nipKey: crypto.randomBytes(32).toString("base64"), origin: ORIGIN }),
    /użytkownika aplikacji/, "serwer nie startuje jako właściciel tabel");

  const server = await createServer({ databaseUrl: APP, nipKey: crypto.randomBytes(32).toString("base64"), origin: ORIGIN });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  t.after(() => new Promise(r => server.close(r)));
  const base = `http://127.0.0.1:${server.address().port}`;
  const call = (p, { method = "GET", body, headers = {} } = {}) => fetch(base + p, {
    method, body: body && JSON.stringify(body),
    headers: { ...(body ? { "Content-Type": "application/json" } : {}), ...(method !== "GET" ? { Origin: ORIGIN } : {}), ...headers },
  });
  const dobre = { sklep: "Sklep Kwadrat", miejscowosc: "Łódź", imie: "Anna", telefon: "+48 600 100 200", nip: "526-025-02-74", opis: "Złe godziny", zgoda: true };

  await t.test("nagłówki bezpieczeństwa na stronie", async () => {
    const r = await call("/");
    assert.equal(r.status, 200);
    assert.match(r.headers.get("content-security-policy"), /default-src 'none'/);
    assert.match(r.headers.get("content-security-policy"), /frame-ancestors 'none'/);
    assert.equal(r.headers.get("x-content-type-options"), "nosniff");
    assert.ok(r.headers.get("strict-transport-security"));
  });

  await t.test("walidacja zlecenia", async () => {
    const r = await call("/api/zlecenia", { method: "POST", body: { ...dobre, nip: "1234567890", zgoda: false, telefon: "12" } });
    assert.equal(r.status, 400);
    const j = await r.json();
    assert.ok(j.bledy.nip && j.bledy.zgoda && j.bledy.telefon);
  });

  await t.test("POST bez naszego Origin jest odrzucany (CSRF)", async () => {
    const r = await fetch(base + "/api/zlecenia", { method: "POST", headers: { "Content-Type": "application/json", Origin: "https://zly.example" }, body: JSON.stringify(dobre) });
    assert.equal(r.status, 403);
  });

  let link, token;
  await t.test("zlecenie i status sprawy dla klienta", async () => {
    const r = await call("/api/zlecenia", { method: "POST", body: dobre });
    assert.equal(r.status, 201);
    link = (await r.json()).link;
    token = link.split("#")[1];
    const s = await call("/api/sprawa", { headers: { Authorization: "Bearer " + token } });
    assert.equal(s.status, 200);
    const j = await s.json();
    assert.equal(j.stan, "znalezlismy");
    assert.equal(j.sklep, "Sklep Kwadrat");
    assert.equal(j.historia.length, 1);
    const tekst = JSON.stringify(j);
    assert.ok(!tekst.includes(NIP) && !tekst.includes("600100200"), "klient nie dostaje NIP-u ani telefonu");
    const zly = await call("/api/sprawa", { headers: { Authorization: "Bearer " + "A".repeat(43) } });
    assert.equal(zly.status, 404);
  });

  await t.test("w bazie NIP jest zaszyfrowany, link tylko jako skrót", async () => {
    const r = await owner.query("SELECT nip_szyfr, token_hash, telefon FROM zlecenie");
    assert.equal(r.rows[0].telefon, "600100200");
    assert.ok(!r.rows[0].nip_szyfr.toString("latin1").includes(NIP));
    assert.ok(!r.rows[0].token_hash.toString("latin1").includes(token));
  });

  await t.test("panel wymaga logowania z drugim składnikiem", async () => {
    assert.equal((await call("/api/opiekun/zlecenia")).status, 401);
    const bezKodu = await call("/api/opiekun/logowanie", { method: "POST", body: { login: "ola", haslo: "tajne-haslo-1", kod: "000000" } });
    assert.equal(bezKodu.status, 401);
    const zleHaslo = await call("/api/opiekun/logowanie", { method: "POST", body: { login: "ola", haslo: "zle", kod: totpAt(sekret, Math.floor(Date.now() / 30000)) } });
    assert.equal(zleHaslo.status, 401);
  });

  await t.test("opiekun: lista z NIP-em, zmiana stanu, kod nie działa drugi raz", async () => {
    const kod = totpAt(sekret, Math.floor(Date.now() / 30000));
    const r = await call("/api/opiekun/logowanie", { method: "POST", body: { login: "ola", haslo: "tajne-haslo-1", kod } });
    assert.equal(r.status, 200);
    const setCookie = r.headers.get("set-cookie");
    assert.match(setCookie, /^__Host-rf_sesja=/);
    assert.match(setCookie, /HttpOnly/);
    assert.match(setCookie, /Secure/);
    assert.match(setCookie, /SameSite=Strict/);
    const cookie = setCookie.split(";")[0];

    const powtorka = await call("/api/opiekun/logowanie", { method: "POST", body: { login: "ola", haslo: "tajne-haslo-1", kod } });
    assert.equal(powtorka.status, 401, "ten sam kod drugi raz");

    const lista = await (await call("/api/opiekun/zlecenia", { headers: { Cookie: cookie } })).json();
    assert.equal(lista.length, 1);
    assert.equal(lista[0].nip, NIP);

    const zly = await call(`/api/opiekun/zlecenia/${lista[0].id}/stan`, { method: "POST", body: { stan: "usuniete" }, headers: { Cookie: cookie } });
    assert.equal(zly.status, 400);
    const z = await call(`/api/opiekun/zlecenia/${lista[0].id}/stan`, { method: "POST", body: { stan: "robimy" }, headers: { Cookie: cookie } });
    assert.equal(z.status, 200);
    const s = await (await call("/api/sprawa", { headers: { Authorization: "Bearer " + token } })).json();
    assert.equal(s.stan, "robimy");
    assert.deepEqual(s.historia.map(h => h.stan), ["znalezlismy", "robimy"]);

    const out = await call("/api/opiekun/wyloguj", { method: "POST", body: {}, headers: { Cookie: cookie } });
    assert.equal(out.status, 200);
    assert.equal((await call("/api/opiekun/zlecenia", { headers: { Cookie: cookie } })).status, 401, "sesja usunięta");
  });

  await t.test("RLS i uprawnienia bezpośrednio w bazie (jako użytkownik aplikacji)", async () => {
    const app = new pg.Client({ connectionString: APP });
    await app.connect();
    try {
      assert.equal((await app.query("SELECT count(*)::int AS n FROM zlecenie")).rows[0].n, 0, "bez kontekstu nic nie widać");
      assert.equal((await app.query("SELECT count(*)::int AS n FROM opiekun")).rows[0].n, 0);
      assert.equal((await app.query("SELECT count(*)::int AS n FROM dziennik")).rows[0].n, 0);
      await app.query("BEGIN");
      await app.query("SELECT set_config('app.rola', 'klient', true), set_config('app.token', $1, true)", ["00".repeat(32)]);
      assert.equal((await app.query("SELECT count(*)::int AS n FROM zlecenie")).rows[0].n, 0, "obcy link nic nie widzi");
      assert.equal((await app.query("UPDATE zlecenie SET stan = 'gotowe'")).rowCount, 0, "klient nie zmienia stanu");
      await app.query("ROLLBACK");
      await assert.rejects(app.query("DELETE FROM zlecenie"), /permission denied/);
      await assert.rejects(app.query("UPDATE dziennik SET akcja = 'x'"), /permission denied/);
      await assert.rejects(app.query("UPDATE zlecenie SET telefon = '000000000'"), /permission denied/);
    } finally { await app.end(); }
    const dz = await owner.query("SELECT akcja FROM dziennik ORDER BY id");
    assert.ok(dz.rows.some(r => r.akcja === "utworzenie") && dz.rows.some(r => r.akcja === "stan:robimy") && dz.rows.some(r => r.akcja === "logowanie_nieudane"));
  });

  await t.test("limit prób logowania", async () => {
    let last;
    for (let i = 0; i < 12; i++) last = await call("/api/opiekun/logowanie", { method: "POST", body: { login: "ola", haslo: "x", kod: "000000" } });
    assert.equal(last.status, 429);
  });
});
