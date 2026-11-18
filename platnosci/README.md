# Płatności (Przelewy24) i faktura VAT w KSeF

Bramka `worker.js` (Cloudflare Worker) robi dwie rzeczy:

1. **Płatność przez Przelewy24.** Klient płaci na stronie `secure.przelewy24.pl`: BLIK, Apple Pay, Google Pay, karta albo szybki przelew. Przyciski portfeli, weryfikację domeny Apple Pay, silne uwierzytelnienie (3-D Secure), pole kodu BLIK i dane kart obsługuje Przelewy24 (PayPro S.A.). Do nas trafia tylko podpisane powiadomienie.
2. **Faktura VAT w KSeF** (`ksef.js`). Po potwierdzonej płatności bramka wystawia fakturę FA(3) na NIP podany przez klienta i wysyła ją do KSeF 2.0. Nabywca dostaje ją w KSeF; jego księgowa pobiera ją stamtąd.

```
Opiekun: „Wprowadzono” ──POST /due (klucz opiekuna, kwota w groszach)──► bramka (KV)
Klient:  „Zapłać 149 zł” (e-mail + dane do faktury) albo link z SMS-a /zaplac/Z-XXXXXX
         ──► bramka ──POST /transaction/register──► Przelewy24: BLIK · Apple Pay · Google Pay · karta · przelew
Przelewy24 ──powiadomienie (podpis SHA-384)──► bramka ──PUT /transaction/verify──► „opłacone”
bramka ──► numer RF/RRRR/MM/0001 ──► XML FA(3) ──► KSeF (token, sesja interaktywna) ──► numer KSeF
Klient wraca na stronę ──GET /status──► „Gotowe i opłacone”, numer faktury i numer KSeF
```

## Zasady zapisane w kodzie

| Zasada | Gdzie |
|---|---|
| Płatność dopiero po wykonaniu. Bez wpisu `/due` od opiekuna nie da się zarejestrować transakcji. | `startPayment()` |
| Kwotę ustala serwer. Przeglądarka klienta wysyła tylko numer zlecenia, e-mail i dane do faktury. | `/checkout` |
| Ta sama kwota dla każdej metody, bez dopłat. | `NO_SURCHARGE`, `payBox()` |
| „Opłacone” tylko po powiadomieniu z poprawnym podpisem SHA-384, znanej sesji, zgodnej kwocie i udanym `verify`. Sam powrót z Przelewy24 niczego nie przesądza. | `handleNotification()`, `handlePayReturn()` |
| Rozbieżna kwota: bez `verify` (Przelewy24 zwraca środki płacącemu), blokada kolejnych płatności do decyzji opiekuna. | `handleNotification()` |
| Faktura tylko dla opłaconego zlecenia; numer kolejny w serii miesięcznej, nadawany raz i zapisywany przed wysyłką, więc ponowienie nie tworzy drugiego numeru. Duplikat w KSeF (440) jest traktowany jako faktura już przyjęta. | `processInvoice()` |
| KSeF chwilowo niedostępny: faktura czeka w kolejce, harmonogram (co 10 min) kończy wysyłkę. Odrzucona faktura: opiekun widzi błąd i może wysłać ponownie. | `scheduled()`, `/faktura/<id>/ponow` |
| NIP i dane nabywcy trafiają tylko do bramki i do KSeF. Nie idą do Przelewy24, do adresu strony ani do pamięci przeglądarki. `/status` ich nie zwraca. E-mail idzie tylko do Przelewy24 i nie jest zapisywany. | testy „bez NIP-u”, e2e „pamięć przeglądarki” |
| CORS tylko dla własnej domeny; `/due` i XML faktury tylko z kluczem opiekuna (trzymanym w `sessionStorage`). | `cors()`, `isOperator()` |
| Gdy bramka nie działa, klient widzi przelew jako drogę zastępczą. | odpowiedź 502 |

Faktura FA(3) z generatora jest sprawdzana w testach oficjalnym schematem MF (`xsd/fa3.xsd`, `schemat_FA(3)_v1-0E`) dla VAT 23% i dla zwolnienia z art. 113. Atrapa KSeF w testach naprawdę odszyfrowuje token (RSA-OAEP SHA-256) i fakturę (AES-256-CBC) i sprawdza skróty SHA-256 i rozmiary.

## Wdrożenie (kolejno)

### 1. Przelewy24
1. Konto firmowe w Przelewy24. Przed aktywacją Przelewy24 sprawdza stronę: regulamin, dane firmy i kontakt, ceny brutto, czas realizacji, reklamacje (lista na dole).
2. W panelu Przelewy24 włącz **BLIK**, **Apple Pay**, **Google Pay** i karty. Apple Pay i Google Pay włącza się osobno; Przelewy24 prowadzi przez akceptację warunków Apple i Google. Weryfikacji domeny Apple Pay po naszej stronie **nie trzeba**: płatność odbywa się na domenie Przelewy24.
3. Z panelu (Moje dane → Dane API i konfiguracja) przepisz: ID sprzedawcy, ID sklepu, **klucz CRC** i **klucz do raportów** (to `P24_API_KEY`). Najpierw konto **sandbox**.

### 2. KSeF
1. Właściciel firmy loguje się do Aplikacji Podatnika KSeF i generuje **token KSeF** z uprawnieniem **wystawianie faktur** (`InvoiceWrite`). Token to `KSEF_TOKEN`.
2. Najpierw środowisko `test` (dowolny NIP testowy), potem `demo`, na końcu `prod`.
3. Ustal z księgową: **stawka VAT** (`23` albo `zw`), podstawę zwolnienia, serię numerów (`INVOICE_SERIES`) i to, czy faktury z bramki to jedyna seria dla tej usługi.

### 3. Bramka (katalog `platnosci/`)
```bash
npx wrangler kv namespace create PAYMENTS_KV
```
Wpisz `id` w `wrangler.toml`, uzupełnij `[vars]` (Przelewy24, dane sprzedawcy, `VAT_RATE`, `KSEF_ENV`), potem sekrety:
```bash
npx wrangler secret put P24_CRC
```
```bash
npx wrangler secret put P24_API_KEY
```
```bash
npx wrangler secret put OPERATOR_TOKEN
```
```bash
npx wrangler secret put KSEF_TOKEN
```
```bash
npx wrangler deploy
```
Adres powiadomień (`/p24/status`) bramka podaje Przelewy24 przy każdej transakcji; w panelu nic nie trzeba ustawiać. Harmonogram co 10 minut (`[triggers]`) dokańcza faktury.

### 4. Strona
W `index.html` ustaw `PAYMENTS_API = "https://<bramka>"`. Opiekun wpisuje `OPERATOR_TOKEN` w panelu („Płatności online”).

### 5. Próba
Sandbox Przelewy24 + KSeF `test`: zlecenie → „Wprowadzono” → płatność BLIK testowa → status „opłacone” → faktura z numerem KSeF. Potem produkcja z jednym prawdziwym zleceniem.

Bez `KSEF_TOKEN` i danych sprzedawcy bramka przyjmuje płatności, a faktura ma stan „manual”: wystawia ją księgowa.

## Lista kontrolna przed startem

**Apple Pay** ([zasady marketingowe](https://developer.apple.com/apple-pay/marketing/))
- [x] Nazwa „Apple Pay”, nietłumaczona; bez logo i własnego przycisku na naszej stronie; przycisk pokazuje Przelewy24 tylko na obsługiwanych urządzeniach.
- [x] Bez dopłaty i bez gorszego traktowania niż inne metody.

**Google Pay** ([zasady marki](https://developers.google.com/pay/api/web/guides/brand-guidelines), [Acceptable Use Policy](https://payments.developers.google.com/terms/aup))
- [x] Nazwa „Google Pay”, bez logo na naszej stronie.
- [x] Usługa nie należy do kategorii zakazanych.

**BLIK**
- [x] Nazwa „BLIK”; instrukcja: 6-cyfrowy kod z aplikacji banku, potwierdzenie w aplikacji, ważny 2 minuty; tylko PLN.
- [ ] Limit transakcji BLIK ustala bank klienta; przy wysokich kwotach trudnych spraw zaproponuj kartę albo przelew.

**Przelewy24** (wymagania przy aktywacji konta; sprawdzić aktualną listę w umowie)
- [ ] Regulamin usługi na stronie: dane firmy, opis usługi, cena brutto, metody płatności, operator płatności (PayPro S.A.), termin realizacji, reklamacje i zwroty.
- [ ] Dane kontaktowe i firmowe widoczne na stronie.
- [x] Cena brutto przed płatnością; płatność po wykonaniu.

**Faktura i KSeF** (sprawdzić z księgową)
- [x] FA(3) zgodna ze schematem MF; NIP sprzedawcy i nabywcy z sumą kontrolną; data wystawienia, data wykonania usługi (P_6), data zapłaty, „zapłacono”.
- [x] Kwota brutto na fakturze równa zapłaconej; VAT wyliczony od brutto (149 zł = 121,14 zł netto + 27,86 zł VAT).
- [ ] Stawka VAT i ewentualna podstawa zwolnienia potwierdzone przez księgową.
- [ ] Faktury dla płatności przelewem (poza bramką) wystawia księgowa w tej samej lub osobnej serii.
- [ ] Korekty faktur: ręcznie w programie księgowej / Aplikacji Podatnika (bramka nie robi korekt).
- [ ] Polityka prywatności: Przelewy24 (PayPro S.A.) jako odrębny administrator danych płatniczych; NIP i dane nabywcy przetwarzane do faktury.
