// Test narzędzia terenowego: node tests/teren_e2e.mjs  (wymaga pakietu playwright i przeglądarki Chromium)
import { chromium } from "playwright";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import fs from "node:fs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const url = pathToFileURL(path.join(root, "teren", "index.html")).href;
let pass = 0, fail = 0;
const ok = (cond, name) => { if (cond) pass++; else { fail++; console.log("FAIL:", name); } };

const TODAY = new Date().toISOString().slice(0, 10), CONF = `PZ/${TODAY.slice(0, 4)}/001`;
const browser = await chromium.launch();
for (const width of [390, 1100]) {
  const ctx = await browser.newContext({ viewport: { width, height: 800 }, acceptDownloads: true });
  const page = await ctx.newPage();
  const jsErrors = [];
  page.on("pageerror", e => jsErrors.push(String(e)));
  const text = () => page.locator("main").innerText();
  const tick = () => page.waitForTimeout(60);
  const go = async h => { await page.goto(url + h); await tick(); };
  const tap = async sel => { await page.click(sel); await tick(); };
  const noHScroll = async n => ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), `${width}px brak przewijania poziomego: ${n}`);
  const addShop = async (name, place, seg) => {
    await go("#sklepy");
    await page.fill('[data-form="addShop"] [name=name]', name);
    await page.fill('[data-form="addShop"] [name=place]', place);
    await page.selectOption('[data-form="addShop"] [name=segment]', seg);
    await tap('[data-form="addShop"] button[type=submit]');
  };
  const setAll = async st => { for (const r of await page.locator(`input[type=radio][value="${st}"]`).all()) await r.check(); };

  await page.goto(url);
  ok((await text()).includes("Sprawdzono 0 z 30"), "start: licznik 0 z 30");
  await noHScroll("start");

  // Sklep bez błędów: karta bez oferty.
  await addShop("Sklep Pod Lipą", "Kolno, ul. Lipowa 1", "niezalezny");
  await setAll("ok");
  await tap('[data-act="finish"]');
  ok((await text()).includes("Sprawdzono"), "sprawdzenie zakończone");
  await tap('a[href^="#karta/"]');
  ok((await text()).includes("Uzupełnij imię, nazwisko i telefon opiekuna"), "karta: brak opiekuna blokuje");
  ok(await page.locator('[data-act="print"]').isDisabled(), "karta: druk zablokowany bez opiekuna");
  await go("#ustawienia");
  await page.fill('[data-fc="name"]', "Jan Testowy");
  await page.fill('[data-fc="phone"]', "500 000 000");
  await go("#sklepy");
  await tap("text=Sklep Pod Lipą");
  await tap('a[href^="#karta/"]');
  const card1 = await page.locator("#card").innerText();
  ok(card1.includes("Wszystko się zgadza"), "karta: wszystko się zgadza");
  ok(!card1.includes("149"), "karta: bez błędów nie ma ceny");
  ok(card1.includes("Jan Testowy"), "karta: dane opiekuna");
  ok(!(await page.locator('[data-act="print"]').isDisabled()), "karta: druk odblokowany");

  // Sklep z błędem do naprawy i trudną sprawą.
  await addShop("Delikatesy Róg", "Kolno, ul. Rynek 3", "niezalezny");
  await setAll("ok");
  await page.locator('input[name="f-closed"][value="bad"]').check();
  await page.fill('[data-ff="closed.google"]', "Otwarte 24.12, 7–15");
  await page.fill('[data-ff="closed.real"]', "Zamknięte 24–27.12");
  await page.selectOption('[data-ff="closed.src"]', "tabliczka na drzwiach");
  await page.locator('input[name="f-dup"][value="bad"]').check();
  await page.check('[data-ff="dup.hard"]');
  await tap('[data-act="finish"]');
  ok((await text()).includes("2 do naprawy"), "status: 2 do naprawy");
  await page.check('[data-fv="paid"]'); await tick();
  ok(await page.inputValue('[data-fv="amount"]') === "149", "opłacone: kwota domyślna 149");
  ok(await page.inputValue('[data-fv="payDate"]') === TODAY, "opłacone: data zapłaty dzisiaj");
  await page.selectOption('[data-fv="payMethod"]', "blik");
  ok((await text()).includes(`Drukuj potwierdzenie ${CONF}`), "opłacone: numer potwierdzenia");
  await page.fill('[data-fv="accMin"]', "12");
  await page.check('[data-fv="stuck"]');
  await page.fill('[data-fv="qBook"]', 'Ciągle dzwoni o faktury, "pilne"');
  await page.selectOption('[data-fv="qOrdPick"]', "braki");
  await tap('a[href^="#karta/"]');
  const card2 = await page.locator("#card").innerText();
  ok(card2.includes("Znaleźliśmy 2 rzeczy"), "karta: 2 rzeczy");
  ok(card2.includes("Otwarte 24.12") && card2.includes("tabliczka na drzwiach"), "karta: źródło i wartości");
  ok(card2.includes("149 zł") && card2.includes("trudna sprawa"), "karta: cena i trudna sprawa");
  ok(card2.includes("nie płacą Państwo nic"), "karta: gwarancja");
  await noHScroll("karta");
  await page.click('[data-act="markShown"]');

  // Sklep sieciowy: błąd tylko w polu centrali, bez ceny.
  await addShop("Sieć Lokalna 12", "Kolno, ul. Polna 5", "siec");
  await setAll("ok");
  await page.locator('input[name="f-hours"][value="bad"]').check();
  await page.check('[data-ff="hours.hq"]');
  await tap('[data-act="finish"]');
  ok((await text()).includes("tylko centrala"), "sieć: status tylko centrala");
  await tap('a[href^="#karta/"]');
  const card3 = await page.locator("#card").innerText();
  ok(card3.includes("Ustala centrala sieci") && !card3.includes("149"), "sieć: zgłoszenie do centrali bez ceny");

  // Biuro.
  await go("#biura");
  await page.fill('[data-form="addOffice"] [name=name]', "Biuro Rachmistrz");
  await tap('[data-form="addOffice"] button[type=submit]');
  await page.selectOption('[data-fo="agree"]', "pisemnie");
  await page.check('[data-fo="pain"]');
  await page.fill('[data-fo="amount"]', "200");

  // Zestawienie.
  await go("#zestawienie");
  const sum = await text();
  ok(sum.includes("Test w toku: sprawdzono 3 z 30"), "zestawienie: test w toku");
  ok(sum.includes("33%"), "zestawienie: A liczone bez pól centrali (1 z 3)");
  ok(sum.includes("149 zł"), "zestawienie: przychód");
  ok(sum.includes("1 z 1"), "zestawienie: biura z kosztem komunikacji");
  ok(sum.includes("Wspólna lista braków: 1"), "zestawienie: wybór zamówień");
  await noHScroll("zestawienie");

  // Eksport CSV do systemu.
  await go("#druk");
  const grab = async act => { const [d] = await Promise.all([page.waitForEvent("download"), page.click(`[data-act="${act}"]`)]); return fs.readFileSync(await d.path(), "utf8"); };
  const csv = await grab("csvShops");
  ok(csv.startsWith("id,nazwa,miejsce,rodzaj,"), "CSV sklepy: bez BOM, nazwy kolumn, przecinek");
  ok(csv.includes('"Ciągle dzwoni o faktury, ""pilne"""'), "CSV sklepy: cytowanie RFC 4180");
  ok(csv.includes(`,1,149.00,${TODAY},blik,${CONF},`), "CSV sklepy: płatność w formacie systemowym");
  ok(csv.includes("closed|dup") || csv.includes("dup|closed"), "CSV sklepy: kody pól");
  ok(csv.endsWith("\r\n") && csv.split("\r\n").length === 5, "CSV sklepy: CRLF, 3 wiersze danych");
  const pay = await grab("csvPayments");
  ok(pay === `nr_potwierdzenia,data_platnosci,sklep_id,sklep,miejsce,kwota,metoda\r\n${CONF},${TODAY},` + pay.split("\r\n")[1].split(",")[2] + `,Delikatesy Róg,"Kolno, ul. Rynek 3",149.00,blik\r\n`, "CSV płatności");
  const off = await grab("csvOffices");
  ok(off.includes(",pisemnie,") && off.includes(",200.00,1,0,"), "CSV biura");

  // Potwierdzenia zapłaty.
  await tap('a[href="#potw/wszystkie"]');
  ok((await text()).includes("Uzupełnij dane przyjmującego zapłatę"), "potwierdzenie: brak danych sprzedawcy");
  ok(await page.locator('[data-act="print"]').isDisabled(), "potwierdzenie: druk zablokowany");
  await go("#ustawienia");
  await page.fill('[data-fs="name"]', "Jan Testowy Usługi");
  await page.fill('[data-fs="address"]', "ul. Próbna 1, 00-001 Kolno");
  await go("#potw/wszystkie");
  const doc = await page.locator(".doc").innerText();
  ok(await page.locator(".doc").count() === 1, "potwierdzenie: jedno opłacone zlecenie");
  ok(doc.includes(CONF) && doc.includes("Delikatesy Róg") && doc.includes("Jan Testowy Usługi"), "potwierdzenie: numer i strony");
  ok(doc.includes("149,00 zł") && doc.includes("sto czterdzieści dziewięć złotych 00/100") && doc.includes("BLIK"), "potwierdzenie: kwota słownie i forma");
  ok(doc.includes("Nie jest fakturą"), "potwierdzenie: nie jest fakturą");
  ok(!(await page.locator('[data-act="print"]').isDisabled()), "potwierdzenie: druk odblokowany");
  await noHScroll("potwierdzenie");
  await page.emulateMedia({ media: "print" });
  ok(!(await page.locator("header").isVisible()) && !(await page.locator('[data-act="print"]').isVisible()) && await page.locator(".doc").isVisible(), "druk potwierdzenia: tylko dokument");
  await page.emulateMedia({ media: "screen" });
  const words = await page.evaluate(() => [0, 1, 2, 5, 12, 22, 149, 1000, 2149.5, 12345].map(plWords));
  ok(JSON.stringify(words) === JSON.stringify(["zero złotych 00/100","jeden złoty 00/100","dwa złote 00/100","pięć złotych 00/100","dwanaście złotych 00/100","dwadzieścia dwa złote 00/100","sto czterdzieści dziewięć złotych 00/100","tysiąc złotych 00/100","dwa tysiące sto czterdzieści dziewięć złotych 50/100","dwanaście tysięcy trzysta czterdzieści pięć złotych 00/100"]), "kwota słownie: " + words.join(" | "));

  // Trwałość po przeładowaniu i kopia zapasowa.
  await page.reload(); await tick();
  ok((await text()).includes("Sprawdzono 3 z 30") || (await go("#sklepy"), (await text()).includes("Sprawdzono 3 z 30")), "dane po przeładowaniu");
  await go("#ustawienia");
  const [bk] = await Promise.all([page.waitForEvent("download"), page.click('[data-act="backup"]')]);
  const backupPath = await bk.path();
  page.once("dialog", d => d.accept());
  await page.click('[data-act="wipe"]');
  await go("#sklepy");
  ok((await text()).includes("Nie ma jeszcze sklepów"), "usunięcie danych");
  await go("#ustawienia");
  page.once("dialog", d => d.accept());
  await page.setInputFiles('[data-act="restore"]', backupPath);
  await page.waitForSelector("text=Wczytano kopię.");
  await go("#sklepy");
  ok((await text()).includes("Delikatesy Róg"), "kopia: odtworzenie");

  // Druk: tylko karta.
  await go("#sklepy");
  await tap("text=Delikatesy Róg");
  await tap('a[href^="#karta/"]');
  await page.emulateMedia({ media: "print" });
  ok(!(await page.locator("header").isVisible()) && await page.locator("#card").isVisible(), "druk: tylko karta");
  await page.emulateMedia({ media: "screen" });

  ok(jsErrors.length === 0, `${width}px brak błędów JS: ${jsErrors.join(" | ")}`);
  await ctx.close();
}
await browser.close();
console.log(`${pass} ok, ${fail} fail`);
process.exit(fail ? 1 : 0);
