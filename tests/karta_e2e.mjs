// Test zakładki „Test 30 sklepów” w panelu opiekuna: node tests/karta_e2e.mjs  (wymaga pakietu playwright i Chromium)
import { chromium } from "playwright";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import fs from "node:fs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const url = pathToFileURL(path.join(root, "index.html")).href;
let pass = 0, fail = 0;
const ok = (cond, name) => { if (cond) pass++; else { fail++; console.log("FAIL:", name); } };

const browser = await chromium.launch();
for (const width of [390, 1100]) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 }, acceptDownloads: true });
  const page = await ctx.newPage();
  const jsErrors = [];
  page.on("pageerror", e => jsErrors.push(String(e)));
  page.on("console", m => { if (m.type() === "error" && !/fonts\.g|ERR_|Failed to load resource/.test(m.text())) jsErrors.push(m.text()); });
  page.on("dialog", d => d.accept());
  const text = () => page.locator("main").innerText();
  const noHScroll = async name => ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), `[${width}] brak przewijania poziomego: ${name}`);
  const W = s => `[${width}] ${s}`;

  await page.goto(url + "#test");
  ok((await text()).includes("Test 30 sklepów"), W("hash #test otwiera zakładkę testu"));
  ok((await text()).includes("Test w toku: 0 z 30"), W("werdykt w toku na starcie"));
  ok(await page.locator('[data-act="check-csv"]').isDisabled(), W("CSV wyłączony bez danych"));
  await noHScroll("test pusty");

  // 0. szybki start: 3 kroki, walidacja i zapis danych opiekuna
  ok((await text()).includes("Szybki start: 3 kroki"), W("szybki start widoczny"));
  await page.click('[data-form="caretaker"] button[type=submit]');
  ok((await text()).includes("Podaj imię i nazwisko oraz 9 cyfr"), W("walidacja danych opiekuna"));
  await page.fill('[data-form="caretaker"] input[name="name"]', "Jan Testowy");
  await page.fill('[data-form="caretaker"] input[name="phone"]', "+48 600-100-200");
  await page.click('[data-form="caretaker"] button[type=submit]');
  ok((await text()).includes("Jan Testowy, tel. 600 100 200"), W("dane opiekuna zapisane i sformatowane"));

  // 1. sprawdzenie z rozbieżnością: walidacja, potem zapis
  await page.click('[data-act="check-start"]');
  ok(await page.locator("#stoper").count() === 1, W("stoper widoczny"));
  await page.click('[data-form="check"] button[type=submit]');
  ok((await text()).includes("Wpisz nazwę sklepu"), W("walidacja nazwy"));
  ok((await text()).includes("Zaznacz wynik dla tego pola"), W("walidacja 12 pól"));
  await page.fill("#ck-shop", "Sklep Pod Lipą");
  await page.fill("#ck-town", "Łódź, ul. Lipowa 3");
  await page.selectOption("#ck-segment", "pod szyldem sieci");
  const keys = ["dup","status","name","addr","phone","hours","sun","xmas","cat","www","fbex","fbdata"];
  for (const k of keys) await page.check(`input[name="r-${k}"][value="ok"]`);
  await page.check('input[name="r-xmas"][value="diff"]');
  await page.click('[data-form="check"] button[type=submit]');
  ok((await text()).includes("Napisz, co dokładnie widzi klient"), W("rozbieżność wymaga opisu"));
  ok(await page.inputValue("#ck-shop") === "Sklep Pod Lipą", W("wpisane dane zostają po błędzie"));
  await page.fill('input[name="n-xmas"]', "Google: 24.12 otwarte 6–22");
  await page.check('input[name="r-hours"][value="chain"]');
  await page.fill("#ck-min", "4,5");
  await page.click('[data-form="check"] button[type=submit]');
  ok((await text()).includes("Cena na karcie: 149 zł"), W("pierwsza karta z rozbieżnością dostaje 149 zł"));
  ok((await text()).includes("Sprawdzenia\n1/30") || (await text()).includes("1/30"), W("licznik sprawdzeń"));
  ok((await text()).includes("100%"), W("odsetek z rozbieżnością 100%"));
  ok((await text()).includes("4,5 min"), W("czas ręczny 4,5 min"));

  // 2. sprawdzenie bez rozbieżności, czas ze stopera
  await page.click('[data-act="check-start"]');
  await page.fill("#ck-shop", "Księgarnia Róg");
  await page.fill("#ck-town", "Łódź, ul. Rogowa 1");
  for (const k of keys) await page.check(`input[name="r-${k}"][value="ok"]`);
  await page.click('[data-form="check"] button[type=submit]');
  ok((await text()).includes("Wszystko się zgadza."), W("zapis sprawdzenia bez rozbieżności"));
  ok((await text()).includes("50%"), W("odsetek z rozbieżnością 50%"));

  // 3. drugi sklep z rozbieżnością dostaje 179 zł (rotacja cen)
  await page.click('[data-act="check-start"]');
  await page.fill("#ck-shop", "Zoologiczny Azor");
  await page.fill("#ck-town", "Łódź, ul. Psia 9");
  for (const k of keys) await page.check(`input[name="r-${k}"][value="ok"]`);
  await page.check('input[name="r-phone"][value="diff"]');
  await page.fill('input[name="n-phone"]', "Google: numer 42 000 00 00 nie odpowiada");
  await page.check('input[name="r-dup"][value="hard"]');
  await page.fill('input[name="n-dup"]', "Dwie wizytówki pod różnymi adresami");
  await page.click('[data-form="check"] button[type=submit]');
  ok((await text()).includes("Cena na karcie: 179 zł"), W("druga karta z rozbieżnością dostaje 179 zł"));

  // 4. wizyta: walidacja opłaty, potem zapis opłaconego zlecenia
  const lipa = page.locator("details", { hasText: "Sklep Pod Lipą" });
  await lipa.locator("summary").click();
  await lipa.locator('input[name="paid"]').check();
  await lipa.locator('button[type=submit]').click();
  ok((await text()).includes("Opłacone zlecenie wymaga"), W("opłata wymaga pełnej ścieżki"));
  const lipa2 = page.locator("details", { hasText: "Sklep Pod Lipą" });
  if (!(await lipa2.evaluate(d => d.open))) await lipa2.locator("summary").click();
  await lipa2.locator('input[name="shown"]').check();
  await lipa2.locator('select[name="decision"]').selectOption("order");
  await lipa2.locator('select[name="manager"]').selectOption("yes");
  await lipa2.locator('input[name="repairMin"]').fill("40");
  await lipa2.locator('input[name="paid"]').check();
  await lipa2.locator('button[type=submit]').click();
  ok((await text()).includes("Wizyta zapisana"), W("zapis wizyty"));
  ok((await text()).includes("1/1"), W("opłacone / pokazane 1/1"));
  ok(/Minuty na opłacone zlecenie\n[\d,]+ min/.test(await text()), W("minuty na opłacone zlecenie policzone"));
  ok((await text()).includes("bez VAT"), W("wkład z VAT i bez VAT"));
  await noHScroll("test z danymi");

  // 5. karta wyniku
  const lipa3 = page.locator("details", { hasText: "Sklep Pod Lipą" });
  if (!(await lipa3.evaluate(d => d.open))) await lipa3.locator("summary").click();
  await lipa3.locator('[data-act="check-card"]').click();
  const card = await text();
  ok(card.includes("Wynik sprawdzenia: Sklep Pod Lipą"), W("karta: tytuł"));
  ok(card.includes("Google: 24.12 otwarte 6–22"), W("karta: co widzi klient"));
  ok(card.includes("149 zł brutto"), W("karta: cena"));
  ok(card.includes("nie płacisz"), W("karta: gwarancja"));
  ok(card.includes("centralę sieci"), W("karta: pole centrali"));
  ok(card.includes("za darmo"), W("karta: opcja poprawię sam"));
  ok(card.includes("Jan Testowy") && card.includes("600 100 200"), W("karta: imię i telefon opiekuna z szybkiego startu"));
  ok(!card.includes("Szybki start"), W("karta bez szybkiego startu"));
  await page.emulateMedia({ media: "print" });
  ok(await page.locator(".testbar").isHidden(), W("druk: bez paska testowego"));
  ok(await page.locator('[data-act="print"]').isHidden(), W("druk: bez przycisków"));
  await page.emulateMedia({ media: "screen" });
  await noHScroll("karta");

  // 6. CSV
  await page.click('a[href="#test"]');
  const [dl] = await Promise.all([page.waitForEvent("download"), page.click('[data-act="check-csv"]')]);
  const csv = fs.readFileSync(await dl.path(), "utf8");
  await page.goto(url + "#test");
  ok(!(await text()).includes("Szybki start"), W("szybki start znika po 3 krokach"));
  ok(csv.startsWith("﻿\"id\""), W("CSV z BOM i nagłówkiem"));
  ok(csv.split("\r\n").length === 4, W("CSV: nagłówek + 3 wiersze"));
  ok(csv.includes('"Sklep Pod Lipą"') && csv.includes('"tak"'), W("CSV: dane wizyty"));
  ok(!/nip/i.test(csv), W("CSV bez NIP"));

  // 7. „Wyczyść dane testowe” nie usuwa sprawdzeń; widok klienta nie pokazuje testu
  await page.click('[data-act="reset"]');
  ok((await text()).includes("Sprawdzenia z testu zostały"), W("reset zachowuje sprawdzenia"));
  await page.goto(url + "#test");
  ok((await text()).includes("3/30"), W("sprawdzenia przetrwały reset i przeładowanie"));
  ok(!(await text()).includes("Szybki start"), W("reset nie przywraca szybkiego startu"));
  await page.click('[data-act="mode"]');
  ok(!(await text()).includes("Test 30 sklepów"), W("widok klienta bez zakładki testu"));
  await page.goto(url + "#test");
  await page.click('[data-act="check-wipe"]');
  ok((await text()).includes("Wszystkie sprawdzenia usunięte"), W("usunięcie wszystkich sprawdzeń"));

  ok(jsErrors.length === 0, W("brak błędów JS: " + jsErrors.join(" | ")));
  await ctx.close();
}
await browser.close();
console.log(`karta_e2e: ${pass} ok, ${fail} błędów`);
process.exit(fail ? 1 : 0);
