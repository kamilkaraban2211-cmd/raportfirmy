// Test przejścia całej ścieżki: node tests/e2e.mjs  (wymaga pakietu playwright i przeglądarki Chromium)
import { chromium } from "playwright";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const url = pathToFileURL(path.join(root, "index.html")).href;
let pass = 0, fail = 0;
const ok = (cond, name) => { if (cond) pass++; else { fail++; console.log("FAIL:", name); } };

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 800 } });
const page = await ctx.newPage();
const jsErrors = [];
page.on("pageerror", e => jsErrors.push(String(e)));
page.on("console", m => { if (m.type() === "error" && !/fonts\.g|ERR_|Failed to load resource/.test(m.text())) jsErrors.push(m.text()); });
const text = () => page.locator("main").innerText();
const noHScroll = async name => ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), "brak przewijania poziomego: " + name);
const op = async () => { await page.click('[data-act="mode"]'); };

await page.goto(url);
ok((await text()).includes("Sprawdź za darmo"), "ekran startowy");
ok(!(await text()).includes("NIP-u,") || (await text()).includes("Bez NIP-u"), "start nie prosi o NIP");
ok(await page.locator('input[name="nip"]').count() === 0, "brak pola NIP");
ok(!/99 zł|abonament/i.test(await text()), "start bez abonamentu");
await noHScroll("start");

// walidacja i brak danych
await page.click('[data-form="search"] button[type=submit]');
ok((await text()).includes("co najmniej 3 znaki"), "walidacja pustego zapytania");
await page.fill("#q", "Piekarnia Nieznana Gdynia");
await page.click('[data-form="search"] button[type=submit]');
ok((await text()).includes("Nie mamy jeszcze danych"), "nieznany sklep: brak wymyślonych danych");

// sklep bez problemu: nic nie sprzedajemy
await page.fill("#q", "ksiegarnia krakow");
await page.click('[data-form="search"] button[type=submit]');
ok((await text()).includes("Wszystko się zgadza"), "wynik bez problemu");
ok(await page.locator('[data-form="order"]').count() === 0, "bez problemu nie ma oferty");

// prosty przypadek: 149 zł
await page.goto(url + "#start");
await page.click('[data-act="pick-shop"][data-id="kwadrat"]');
ok((await text()).includes("Znaleźliśmy 2 rzeczy"), "kwadrat: 2 znaleziska");
ok((await text()).includes("149 zł brutto"), "kwadrat: jedna cena");
ok(!/99 zł|abonament/i.test(await text()), "wynik bez abonamentu");
await noHScroll("wynik");
await page.click('[data-form="order"] button[type=submit]');
let t = await text();
ok(t.includes("Zaznacz, która wersja") && t.includes("Podaj imię") && t.includes("9 cyfr") && t.includes("zgody"), "walidacja zamówienia");
await page.check('input[name="pick-godziny"][value="pn–pt 8:00–20:00, sob 9:00–14:00"]');
await page.check('input[name="pick-telefon"][value="__other"]');
await page.fill('[data-other="telefon"]', "+48 22 000 00 55");
await page.click('[data-act="self"]');
ok((await text()).includes("Jak poprawić to samemu"), "instrukcja samodzielna");
await page.fill("#c-name", "Anna");
await page.fill("#c-phone", "600 100 200");
await page.check('input[name="consent"]');
await page.click('[data-form="order"] button[type=submit]');
t = await text();
ok(t.includes("opiekun do Ciebie zadzwoni"), "zlecenie utworzone");
ok(await page.locator(".stage.on").innerText() === "Znaleźliśmy", "etap 1");
ok(t.includes("+48 22 000 00 55"), "własna wartość w zakresie");
await noHScroll("zlecenie");

// niedozwolone przejście jest odrzucane
ok(await page.evaluate(() => { const o = S.orders[0]; return move(o, "paid", "x") === false && o.status === "new"; }), "maszyna stanów odrzuca skok do opłacone");

await op();
ok((await text()).includes("Panel opiekuna"), "panel opiekuna");
await page.click('[data-act="op-called"]');
await page.click('[data-act="op-access"]');
await page.click('[data-act="op-propose"]');
await op();
await page.goto(url + "#zlecenie");
ok((await text()).includes("sprawdź i zaakceptuj"), "zmiany do akceptacji");
ok(await page.locator(".stage.on").innerText() === "Robimy", "etap 2");
await page.fill("#rej", "sobota do 15");
await page.click('[data-form="reject"] button[type=submit]');
ok((await text()).includes("przygotowujemy zmiany"), "odesłane do poprawy");
await op(); await page.click('[data-act="op-propose"]'); await op();
await page.goto(url + "#zlecenie");
await page.click('[data-act="accept"]');
ok((await text()).includes("wprowadzamy zmiany"), "zaakceptowane");
await op();
await page.click('[data-form="done"] button[type=submit]');
ok((await text()).includes("Podaj czas pracy"), "walidacja rejestru");
await page.fill('[data-form="done"] input[name="minutes"]', "45");
await page.fill('[data-form="done"] input[name="method"]', "edycja profilu Google");
await page.click('[data-form="done"] button[type=submit]');
ok((await text()).includes("Średni czas pracy na zlecenie: 45 min"), "rejestr rozwiązanych spraw");
await op(); await page.goto(url + "#zlecenie");
t = await text();
ok(t.includes("Zostało tylko zapłacić") && t.includes("Teczka zmian") && t.includes("Jak usunąć nas"), "gotowe + teczka");
ok(await page.locator(".stage.on").innerText() === "Gotowe", "etap 3");
await op(); await page.click('[data-act="op-paid"]'); await op(); await page.goto(url + "#zlecenie");
ok((await text()).includes("Gotowe i opłacone"), "opłacone");

// stan przetrwa przeładowanie
await page.reload();
ok((await text()).includes("Gotowe i opłacone"), "stan po przeładowaniu");

// trudna sprawa: cena po rozmowie, zgoda klienta, potem niepowodzenie = 0 zł
await page.goto(url + "#start");
await page.click('[data-act="pick-shop"][data-id="zoo"]');
t = await text();
ok(t.includes("trudna sprawa") && t.includes("Stała cena podana przed startem") && !t.includes("149 zł"), "zoo: trudna sprawa bez ceny 149");
await page.fill("#c-name", "Marek"); await page.fill("#c-phone", "+48 601202303"); await page.check('input[name="consent"]');
await page.click('[data-form="order"] button[type=submit]');
await op();
await page.click('[data-form="quote"] button[type=submit]');
ok((await text()).includes("Podaj cenę"), "walidacja wyceny");
await page.fill('[data-form="quote"] input[name="price"]', "390");
await page.click('[data-form="quote"] button[type=submit]');
await op(); await page.goto(url + "#zlecenie");
ok((await text()).includes("390 zł brutto"), "cena do akceptacji klienta");
await page.click('[data-act="accept-price"]');
await op(); await page.click('[data-act="op-fail"]'); await op(); await page.goto(url + "#zlecenie");
ok((await text()).includes("Nic nie płacisz"), "niepowodzenie = brak opłaty");
ok(await page.evaluate(() => S.orders[0].price === 0), "cena wyzerowana po niepowodzeniu");

// sklep sieci + limit pojemności -> lista oczekujących
await op(); await page.fill("#lim", "1"); await page.click('[data-form="limit"] button[type=submit]'); await op();
await page.goto(url + "#start");
await page.click('[data-act="pick-shop"][data-id="siec"]');
t = await text();
ok(t.includes("ustala centrala") && t.includes("nie zmieniamy"), "sieć: pola centrali oznaczone");
await page.check('input[name="pick-niedziela"][value="niedziela: zamknięte"]');
await page.fill("#c-name", "Ewa"); await page.fill("#c-phone", "602303404"); await page.check('input[name="consent"]');
await page.click('[data-form="order"] button[type=submit]');
t = await text();
ok(t.includes("liście oczekujących"), "limit: lista oczekujących");
ok(t.includes("zgłaszamy centrali"), "sieć: zmiana w polu centrali to zgłoszenie");
await page.click('[data-act="cancel"]');
ok((await text()).includes("Zlecenie anulowane"), "rezygnacja");

// XSS w polach tekstowych
await page.goto(url + "#start");
await page.click('[data-act="pick-shop"][data-id="kwadrat"]');
ok((await text()).includes("Masz już zlecenie"), "drugie zlecenie dla tego samego sklepu zablokowane");
await page.evaluate(() => { window.__x = 0; S.orders[0].contact.name = '<img src=x onerror="window.__x=1">'; });
await op(); await page.waitForTimeout(200);
ok(await page.evaluate(() => window.__x === 0), "dane klienta są escapowane");
await op();

// pilot nadal się ładuje
await page.goto(pathToFileURL(path.join(root, "pilot", "index.html")).href);
ok((await page.locator("body").innerText()).includes("Sprawdź, co klienci wiedzą"), "pilot W01–W14 ładuje się");

ok(jsErrors.length === 0, "0 błędów JS: " + jsErrors.join(" | "));
await browser.close();
console.log(`${pass} asercji OK, ${fail} błędów`);
process.exit(fail ? 1 : 0);
