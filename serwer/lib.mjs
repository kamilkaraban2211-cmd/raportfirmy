// Kryptografia i walidacja. Tylko wbudowany moduł node:crypto.
import crypto from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(crypto.scrypt);
const SCRYPT = { N: 1 << 15, r: 8, p: 1, maxmem: 64 * 1024 * 1024 };

export async function hashPassword(pw) {
  const salt = crypto.randomBytes(16);
  const h = await scrypt(pw, salt, 32, SCRYPT);
  return ["scrypt", SCRYPT.N, SCRYPT.r, SCRYPT.p, salt.toString("base64"), h.toString("base64")].join("$");
}

export async function verifyPassword(pw, stored) {
  const [alg, N, r, p, salt, hash] = String(stored).split("$");
  if (alg !== "scrypt") return false;
  const expected = Buffer.from(hash, "base64");
  const got = await scrypt(pw, Buffer.from(salt, "base64"), expected.length, { N: +N, r: +r, p: +p, maxmem: SCRYPT.maxmem });
  return crypto.timingSafeEqual(got, expected);
}

// TOTP (RFC 6238): 6 cyfr, krok 30 s, tolerancja ±1 krok.
const B32 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
export function base32(buf) {
  let bits = 0, val = 0, out = "";
  for (const b of buf) {
    val = ((val << 8) | b) & 0xffff; bits += 8;
    while (bits >= 5) { out += B32[(val >>> (bits - 5)) & 31]; bits -= 5; }
  }
  if (bits > 0) out += B32[(val << (5 - bits)) & 31];
  return out;
}

export function totpAt(secret, step) {
  const msg = Buffer.alloc(8);
  msg.writeBigUInt64BE(BigInt(step));
  const h = crypto.createHmac("sha1", secret).update(msg).digest();
  const o = h[19] & 15;
  return String((h.readUInt32BE(o) & 0x7fffffff) % 1e6).padStart(6, "0");
}

// Zwraca użyty krok albo null. Kod z kroku <= lastStep jest odrzucany (brak ponownego użycia).
export function checkTotp(secret, code, lastStep, now = Date.now()) {
  if (!/^\d{6}$/.test(code)) return null;
  const cur = Math.floor(now / 30000);
  for (const s of [cur - 1, cur, cur + 1]) {
    if (s <= lastStep) continue;
    if (crypto.timingSafeEqual(Buffer.from(totpAt(secret, s)), Buffer.from(code))) return s;
  }
  return null;
}

export function validNip(nip) {
  if (!/^\d{10}$/.test(nip)) return false;
  const w = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  const sum = w.reduce((a, x, i) => a + x * +nip[i], 0) % 11;
  return sum !== 10 && sum === +nip[9];
}

// AES-256-GCM: iv(12) | tag(16) | szyfrogram
export function encrypt(key, text) {
  const iv = crypto.randomBytes(12);
  const c = crypto.createCipheriv("aes-256-gcm", key, iv);
  const ct = Buffer.concat([c.update(text, "utf8"), c.final()]);
  return Buffer.concat([iv, c.getAuthTag(), ct]);
}

export function decrypt(key, buf) {
  const d = crypto.createDecipheriv("aes-256-gcm", key, buf.subarray(0, 12));
  d.setAuthTag(buf.subarray(12, 28));
  return Buffer.concat([d.update(buf.subarray(28)), d.final()]).toString("utf8");
}

export const sha256 = s => crypto.createHash("sha256").update(s).digest();
export const newToken = () => crypto.randomBytes(32).toString("base64url");
export const TOKEN_RE = /^[A-Za-z0-9_-]{43}$/;
