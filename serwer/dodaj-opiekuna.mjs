// Dodaje opiekuna. Uruchamia właściciel bazy:
//   DATABASE_URL_OWNER=postgres://... node serwer/dodaj-opiekuna.mjs <login>
// Wypisuje jednorazowo hasło i klucz do aplikacji z kodami (np. Aegis, Google Authenticator).
import crypto from "node:crypto";
import pg from "pg";
import { hashPassword, base32 } from "./lib.mjs";

const login = String(process.argv[2] || "").trim().toLowerCase();
if (!/^[a-z0-9._-]{3,40}$/.test(login)) { console.error("Użycie: node serwer/dodaj-opiekuna.mjs <login>  (3–40 znaków: a-z 0-9 . _ -)"); process.exit(1); }

const haslo = crypto.randomBytes(18).toString("base64url");
const sekret = crypto.randomBytes(20);
const client = new pg.Client({ connectionString: process.env.DATABASE_URL_OWNER });
await client.connect();
try {
  await client.query("INSERT INTO opiekun (login, haslo_hash, totp_sekret) VALUES ($1, $2, $3)", [login, await hashPassword(haslo), sekret]);
} finally { await client.end(); }

const key = base32(sekret);
console.log(`Opiekun: ${login}`);
console.log(`Hasło (pokazane tylko teraz): ${haslo}`);
console.log(`Klucz do aplikacji z kodami: ${key}`);
console.log(`otpauth://totp/RaportFirmy.pl:${encodeURIComponent(login)}?secret=${key}&issuer=RaportFirmy.pl`);
