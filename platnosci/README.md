# Płatności: BLIK, Apple Pay, Google Pay, karta

Bramka `worker.js` (Cloudflare Worker) tworzy płatność w **Stripe Checkout**. Klient płaci na stronie `checkout.stripe.com`, a nie u nas. Dzięki temu Stripe odpowiada za przyciski Apple Pay i Google Pay, weryfikację domeny Apple Pay, silne uwierzytelnienie (3-D Secure / SCA), pole kodu BLIK i dane kart (PCI DSS). Do nas trafia tylko potwierdzenie.

```
Opiekun: „Wprowadzono” ──POST /due (klucz opiekuna, kwota w groszach)──► bramka (KV)
Klient:  „Zapłać 149 zł” albo link z SMS-a /zaplac/Z-XXXXXX ──► bramka ──► Stripe Checkout
                                                   BLIK · Apple Pay · Google Pay · karta
Stripe ──webhook (podpisany)──► bramka: status „opłacone”
Klient wraca na stronę ──GET /status──► „Gotowe i opłacone”
```

## Zasady zapisane w kodzie

| Zasada | Gdzie |
|---|---|
| Płatność dopiero po wykonaniu. Bez wpisu `/due` od opiekuna nie da się otworzyć płatności. | `sessionFor()` |
| Kwotę ustala serwer. Przeglądarka klienta wysyła tylko numer zlecenia. | `/checkout`, test „klient wysyła tylko numer zlecenia” |
| Ta sama kwota dla każdej metody, bez dopłat. Komunikat na stronie i przy przycisku Stripe. | `NO_SURCHARGE`, `payBox()` |
| „Opłacone” ustawia tylko podpisany webhook Stripe (HMAC SHA-256, okno 5 min) przy zgodnej kwocie i walucie PLN. Sam powrót ze Stripe niczego nie przesądza. | `handleWebhook()`, `handlePayReturn()` |
| Rozbieżna kwota blokuje kolejne płatności do decyzji opiekuna (`review`). | `handleWebhook()` |
| Brak podwójnych sesji: drugi klik otwiera tę samą sesję; klucz idempotencji dla Stripe. | `openSession()` |
| Do Stripe nie idzie NIP, nazwa sklepu ani telefon. | test „bez danych osobowych” |
| CORS tylko dla własnej domeny; `/due` tylko z kluczem opiekuna. Klucz w panelu trzymany w `sessionStorage`, nie w `localStorage`. | `cors()`, `opkey` |
| Gdy bramka nie działa, klient widzi przelew jako drogę zastępczą. | `pay()`, odpowiedź 502 |

## Wdrożenie (kolejno)

1. **Konto Stripe** dla firmy z siedzibą w Polsce (dane firmy, rachunek PLN, beneficjent rzeczywisty). Ustaw w profilu publiczną nazwę firmy, tak jak na fakturze: Apple Pay i BLIK pokazują ją klientowi przy płatności.
2. **Metody płatności** w panelu Stripe (Settings → Payment methods):
   - **BLIK**: włącz. Działa tylko w PLN; konto Stripe musi być w EOG.
   - **Karty** i w nich **Apple Pay** oraz **Google Pay**: włącz. Akceptujesz przy tym [warunki Apple Pay dla sprzedawców](https://stripe.com/apple-pay/legal) i [warunki Google Pay API](https://payments.developers.google.com/terms/sellertos).
   - Weryfikacji domeny Apple Pay **nie trzeba**: płatność odbywa się na domenie Stripe. Trzeba by ją dodać dopiero przy przejściu na formularz osadzony na naszej stronie (Payment Element); wtedy plik `/.well-known/apple-developer-merchantid-domain-association` z panelu Stripe musi być na każdej domenie z płatnością.
3. **Bramka** (z katalogu `platnosci/`):
   ```bash
   npx wrangler kv namespace create PAYMENTS_KV
   ```
   Wpisz zwrócone `id` w `wrangler.toml`, ustaw `ALLOWED_ORIGIN` i `RETURN_URL` na adres strony klienta, potem:
   ```bash
   npx wrangler secret put STRIPE_SECRET_KEY
   ```
   ```bash
   npx wrangler secret put OPERATOR_TOKEN
   ```
   ```bash
   npx wrangler deploy
   ```
4. **Webhook** w Stripe (Developers → Webhooks): adres `https://<bramka>/webhook`, zdarzenia `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `checkout.session.async_payment_failed`, `checkout.session.expired`. Sekret podpisu:
   ```bash
   npx wrangler secret put STRIPE_WEBHOOK_SECRET
   ```
5. **Strona**: w `index.html` ustaw `PAYMENTS_API = "https://<bramka>"`. Opiekun wpisuje `OPERATOR_TOKEN` w panelu („Płatności online”).
6. **Próba w trybie testowym** (klucz `sk_test_…`): BLIK z kodem testowym z dokumentacji Stripe, karta `4242 4242 4242 4242`, Apple Pay na iPhonie z Safari, Google Pay w Chrome z dodaną kartą. Dopiero potem klucze produkcyjne.

## Zasady marek i przepisy: lista kontrolna przed startem

**Apple Pay** ([Apple Pay Marketing Guidelines](https://developer.apple.com/apple-pay/marketing/), [HIG](https://developer.apple.com/design/human-interface-guidelines/apple-pay))
- [x] Nazwa zawsze „Apple Pay”, nie tłumaczona, nie odmieniana w środku nazwy („przez Apple Pay”).
- [x] Na naszej stronie bez logo Apple Pay i bez własnego przycisku; oficjalny przycisk pokazuje Stripe tylko na obsługiwanych urządzeniach.
- [x] Apple Pay nie jest gorzej traktowane od innych metod i nie ma dopłaty.
- [ ] Nazwa firmy w Stripe zgodna z tą, którą klient zna (paragon, SMS).

**Google Pay** ([zasady marki](https://developers.google.com/pay/api/web/guides/brand-guidelines), [Acceptable Use Policy](https://payments.developers.google.com/terms/aup))
- [x] Nazwa „Google Pay”, bez logo na naszej stronie; przycisk i dostępność ocenia Stripe.
- [x] Usługa (naprawa danych w profilach) nie należy do kategorii zakazanych w AUP.

**BLIK** ([Polski Standard Płatności](https://www.blik.com))
- [x] Nazwa „BLIK” wielkimi literami.
- [x] Instrukcja: 6-cyfrowy kod z aplikacji banku, potwierdzenie w aplikacji, ważny 2 minuty.
- [x] Tylko PLN. Kwota w groszach, minimum 2 zł (Stripe).
- [ ] Limit transakcji BLIK ustala bank klienta; przy trudnych sprawach powyżej limitu zaproponuj kartę albo przelew.

**Przepisy** (sprawdzić z prawnikiem; to nie jest porada prawna)
- [x] Cena brutto podana przed zgodą i przed płatnością; płatność po wykonaniu.
- [x] Bez opłat za metodę płatności (art. 38a ustawy o usługach płatniczych / PSD2).
- [x] SCA po stronie Stripe i portfeli.
- [ ] **Faktura**: Stripe nie wystawia faktur w KSeF. Fakturę wystawia księgowość w KSeF po potwierdzeniu płatności (numer zlecenia jest w `metadata.order_id` płatności Stripe).
- [ ] Regulamin usługi z informacją o metodach płatności, operatorze (Stripe Payments Europe, Limited) i zwrotach; link w Stripe (Settings → Public details).
- [ ] Polityka prywatności: Stripe jako odrębny administrator danych płatniczych.
- [ ] Zwroty: z panelu Stripe, na tę samą metodę (BLIK na rachunek, Apple Pay i Google Pay na kartę). Terminy zwrotów sprawdzić w dokumentacji Stripe dla BLIK.
