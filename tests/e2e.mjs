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
const noHScrollOn = async (p, name) => ok(await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), "brak przewijania poziomego: " + name);
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
ok((await text()).includes("Nikt nie zadzwoni"), "oferta: jasna informacja, że to wersja testowa");
ok(!(await text()).includes("do uzupełnienia"), "brak tekstów zastępczych na stronie");
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
ok(t.includes("To jest wersja testowa"), "zlecenie: informacja o wersji testowej");
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
ok(t.includes("nie przyjmujemy płatności") && await page.locator('[data-form="pay"]').count() === 0, "wersja testowa: bez przycisku płatności online");
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

// płatności online: BLIK, Apple Pay, Google Pay, karta przez bramkę (atrapa) i Przelewy24; faktura VAT w KSeF
{
  const pctx = await browser.newContext({ viewport: { width: 390, height: 800 } });
  await pctx.addInitScript(() => { window.RF_CONFIG = { paymentsApi: "https://pay.test" }; });
  const pp = await pctx.newPage();
  pp.on("pageerror", e => jsErrors.push(String(e)));
  const gw = { due: {}, checkoutBodies: [], dueAuth: [] };
  await pctx.route("https://pay.test/**", async route => {
    const req = route.request(), u = new URL(req.url());
    const cors = { "access-control-allow-origin": "*", "content-type": "application/json" };
    if (u.pathname === "/due"){ gw.dueAuth.push(req.headers()["authorization"]); const b = JSON.parse(req.postData()); gw.due[b.orderId] = { amount: b.amount, status: "due" }; return route.fulfill({ status: 200, headers: cors, body: JSON.stringify({ status: "due", payLink: "https://pay.test/zaplac/" + b.orderId }) }); }
    if (u.pathname === "/checkout"){ const b = JSON.parse(req.postData()); gw.checkoutBodies.push(b); return route.fulfill({ status: 200, headers: cors, body: JSON.stringify({ url: "https://sandbox.przelewy24.pl/trnRequest/TOK1" }) }); }
    if (u.pathname === "/status"){ const r = gw.due[u.searchParams.get("zlecenie")]; return route.fulfill({ status: 200, headers: cors, body: JSON.stringify({ status: r ? r.status : "none", invoice: r && r.invoice || null }) }); }
    if (/^\/faktura\/.+\.xml$/.test(u.pathname)) return route.fulfill({ status: req.headers()["authorization"] === "Bearer klucz-opiekuna" ? 200 : 401, headers: { ...cors, "content-type": "application/xml" }, body: "<Faktura/>" });
    return route.fulfill({ status: 404, headers: cors, body: "{}" });
  });
  await pctx.route("https://sandbox.przelewy24.pl/**", route => route.fulfill({ status: 200, contentType: "text/html", body: "<p>Przelewy24 (atrapa)</p>" }));
  const ptext = () => pp.locator("main").innerText();
  await pp.goto(url + "#start");
  ok((await pp.locator(".testbar").innerText()).includes("bramki płatności"), "pasek testowy mówi, co jest wysyłane");
  await pp.click('[data-act="pick-shop"][data-id="kwadrat"]');
  await pp.check('input[name="pick-godziny"][value="pn–pt 8:00–20:00, sob 9:00–14:00"]');
  await pp.check('input[name="pick-telefon"][value="+48 22 000 00 01"]');
  await pp.fill("#c-name", "Anna"); await pp.fill("#c-phone", "600100200"); await pp.check('input[name="consent"]');
  await pp.click('[data-form="order"] button[type=submit]');
  ok(await pp.locator('[data-form="pay"]').count() === 0, "brak przycisku płatności przed wykonaniem");
  await pp.click('[data-act="mode"]');
  ok((await ptext()).includes("Płatności online"), "panel: sekcja płatności online");
  await pp.fill("#opk", "klucz-opiekuna"); await pp.click('[data-form="opkey"] button[type=submit]');
  ok(await pp.evaluate(() => localStorage.getItem("rf-sklep-v1").includes("klucz-opiekuna") === false), "klucz opiekuna nie trafia do localStorage");
  await pp.click('[data-act="op-called"]'); await pp.click('[data-act="op-access"]'); await pp.click('[data-act="op-propose"]');
  await pp.click('[data-act="mode"]'); await pp.goto(url + "#zlecenie"); await pp.click('[data-act="accept"]');
  await pp.click('[data-act="mode"]');
  await pp.fill('[data-form="done"] input[name="minutes"]', "30");
  await pp.fill('[data-form="done"] input[name="method"]', "edycja profilu");
  await pp.click('[data-form="done"] button[type=submit]');
  await pp.waitForSelector("text=Link do płatności");
  const oid = await pp.evaluate(() => S.orders[0].id);
  ok(gw.due[oid] && gw.due[oid].amount === 14900, "kwota do bramki w groszach: 14900");
  ok(gw.dueAuth[0] === "Bearer klucz-opiekuna", "opiekun autoryzuje kwotę kluczem");
  ok((await ptext()).includes("https://pay.test/zaplac/" + oid), "link do płatności dla SMS-a");
  await pp.click('[data-act="mode"]'); await pp.goto(url + "#zlecenie");
  let pt = await ptext();
  ok(/BLIK/.test(pt) && pt.includes("Apple Pay") && pt.includes("Google Pay") && /kartą/.test(pt), "metody: BLIK, Apple Pay, Google Pay, karta");
  ok(pt.includes("Nie doliczamy opłat"), "bez dopłat za metodę");
  ok(pt.includes("6-cyfrowy kod") && pt.includes("2 minuty"), "instrukcja BLIK");
  ok(pt.includes("Zapłać 149 zł"), "przycisk z kwotą");
  ok(pt.includes("Przelewy24") && pt.includes("KSeF"), "operator płatności i KSeF nazwane");
  await noHScrollOn(pp, "płatność");
  // walidacja: e-mail i dane do faktury (domyślnie faktura na firmę)
  await pp.click('[data-form="pay"] button[type=submit]');
  pt = await ptext();
  ok(pt.includes("Podaj adres e-mail") && pt.includes("Sprawdź NIP") && pt.includes("Podaj nazwę firmy") && pt.includes("Podaj ulicę"), "walidacja e-maila i danych do faktury");
  ok(gw.checkoutBodies.length === 0, "bez poprawnych danych nic nie idzie do bramki");
  await pp.fill("#pay-email", "anna@example.pl");
  await pp.fill("#pay-nip", "123-456-78-91");
  await pp.click('[data-form="pay"] button[type=submit]');
  ok((await ptext()).includes("Sprawdź NIP"), "NIP z błędną sumą kontrolną odrzucony");
  ok(await pp.inputValue("#pay-email") === "anna@example.pl", "pola zostają po błędzie");
  await pp.fill("#pay-nip", "774-000-14-54"); await pp.fill("#pay-name", "Sklep Kwadrat Anna Nowak");
  await pp.fill("#pay-addr1", "ul. Lipowa 12"); await pp.fill("#pay-addr2", "00-002 Warszawa");
  await pp.click('[data-form="pay"] button[type=submit]');
  await pp.waitForURL(/sandbox\.przelewy24\.pl\/trnRequest\//);
  const cb = gw.checkoutBodies[0];
  ok(gw.checkoutBodies.length === 1 && cb.orderId === oid && cb.amount === undefined, "klient wysyła numer zlecenia, nie kwotę");
  ok(cb.email === "anna@example.pl" && cb.invoice.want === true && cb.invoice.nip === "774-000-14-54" && cb.invoice.name === "Sklep Kwadrat Anna Nowak", "dane do faktury idą do bramki");
  // powrót z Przelewy24 bez potwierdzenia: nadal do zapłaty (adres powrotu niczego nie przesądza)
  await pp.goto(url.replace("index.html", "index.html?platnosc=powrot&zlecenie=" + oid) + "#zlecenie");
  ok(await pp.evaluate(() => !JSON.stringify(localStorage).includes("7740001454") && !JSON.stringify(localStorage).includes("774-000") && !JSON.stringify(localStorage).includes("anna@example.pl")), "NIP i e-mail nie trafiają do pamięci przeglądarki");
  await pp.waitForSelector("text=Nie mamy jeszcze potwierdzenia", { timeout: 20000 });
  ok((await ptext()).includes("Jeśli przerwałeś płatność, nic nie zostało pobrane"), "przerwana płatność: jasny komunikat");
  ok(await pp.evaluate(() => S.orders[0].status === "done"), "sam powrót z Przelewy24 nie oznacza opłacenia");
  ok(!pp.url().includes("platnosc="), "parametry płatności usunięte z adresu");
  // bramka potwierdziła; faktura w drodze do KSeF, potem w KSeF
  gw.due[oid].status = "paid"; gw.due[oid].invoice = { state: "sent", number: "RF/2026/11/0001", ksefNumber: null };
  await pp.goto(url.replace("index.html", "index.html?platnosc=powrot&zlecenie=" + oid) + "#zlecenie");
  await pp.waitForSelector("text=Gotowe i opłacone");
  pt = await ptext();
  ok(pt.includes("Płatność potwierdzona"), "potwierdzona płatność online");
  ok(await pp.evaluate(() => S.orders[0].paidVia === "online"), "źródło płatności: online");
  ok(pt.includes("w trakcie przetwarzania") && pt.includes("RF/2026/11/0001"), "faktura: numer i stan w KSeF");
  gw.due[oid].invoice = { state: "issued", number: "RF/2026/11/0001", ksefNumber: "5260250274-20261118-0100A0B1C2D3-4E" };
  await pp.click('[data-act="check-inv"]');
  await pp.waitForSelector("text=Faktura VAT jest w KSeF.");
  ok((await ptext()).includes("5260250274-20261118-0100A0B1C2D3-4E"), "faktura: numer KSeF");
  await noHScrollOn(pp, "opłacone z fakturą");
  await pp.click('[data-act="mode"]');
  ok((await ptext()).includes("Faktura VAT jest w KSeF") && await pp.locator('[data-act="op-inv-xml"]').count() === 1, "panel opiekuna: faktura i XML dla księgowej");
  const dl = pp.waitForEvent("download");
  await pp.click('[data-act="op-inv-xml"]');
  ok((await dl).suggestedFilename() === "RF-2026-11-0001.xml", "pobranie XML faktury");
  await pctx.close();
}

// pilot nadal się ładuje
await page.goto(pathToFileURL(path.join(root, "pilot", "index.html")).href);
ok((await page.locator("body").innerText()).includes("Sprawdź, co klienci wiedzą"), "pilot W01–W14 ładuje się");

ok(jsErrors.length === 0, "0 błędów JS: " + jsErrors.join(" | "));
await browser.close();
console.log(`${pass} asercji OK, ${fail} błędów`);
process.exit(fail ? 1 : 0);
