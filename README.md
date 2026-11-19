# RaportFirmy.pl — „Sklep w porządku”

**Zarys kompletnej aplikacji (ścieżka, moduły, ceny, agenci, dane, bezpieczeństwo, prawo, mapa drogowa): [`ZARYS-APLIKACJI.md`](ZARYS-APLIKACJI.md).** Plan startu: [`docs/founder/launch.md`](docs/founder/launch.md).

Statyczna aplikacja (bez serwera i bez budowania). Wersja testowa na przykładowych danych.

## Co jest w repozytorium

| Ścieżka | Co to jest |
|---|---|
| `index.html` | Ścieżka klienta: darmowe sprawdzenie sklepu po nazwie (bez NIP-u) → wynik ze źródłem i datą → „Popraw za mnie” za jedną cenę → status zlecenia w trzech etapach (Znaleźliśmy / Robimy / Gotowe) → teczka zmian. W tym samym pliku lekki panel opiekuna: kolejka zleceń, wycena trudnych spraw, limit zleceń w miesiącu, rejestr rozwiązanych spraw. |
| `skaner/index.html` | Skaner raportu z kasy (15.11.2026): zdjęcie raportu fiskalnego dobowego lub miesięcznego → odczyt kwot przez Claude → kontrola sum (PTU, łączna należność) → porównanie z podobnym okresem, rozkład zmiany na liczbę i wartość paragonów → komentarz AI na żądanie. Zdjęcia nie są zapisywane, NIP nie jest odczytywany. Odczyt AI i zapis na koncie działają, gdy strona jest otwarta jako artefakt Claude; poza nim zostaje wpisywanie ręczne. |
| `docs/founder/` | Prace analityczne z 6–16.11.2026: profil klienta, panele symulowanych kupujących (`panel*`), oferta, kalkulacja CFO, cena, marketing, przeszkody i bezpieczeństwo danych. Wyniki paneli to symulacja, nie opinie klientów. |
| `pilot/index.html` | Wcześniejsza aplikacja pilota W01–W14 (NIP, portret, cele, import sprzedaży, płatności testowe, panel operatora). Bez zmian. |
| `serwer/` | **MVP z bazą danych** (19.11.2026): zgłoszenie „Popraw za mnie” zapisywane w PostgreSQL, status sprawy dla klienta pod prywatnym linkiem, panel opiekuna z logowaniem hasłem i kodem z aplikacji. Opis niżej. |
| `tests/e2e.mjs` | Test przejścia całej ścieżki „Sklep w porządku” w przeglądarce (Playwright). |
| `tests/skaner_e2e.py` | Test skanera na atrapie Claude (Playwright, Python): odczyt, kontrola sum, zapis, porównanie, komentarz; szerokość 390 i 1100 px. |
| `.github/workflows/pages.yml` | Publikacja na GitHub Pages po każdym wypchnięciu na `main`. |

## Licencja

Licencja zastrzeżona: wszelkie prawa zastrzeżone, usługa udostępniana tylko jako SaaS. Szczegóły w [`LICENSE`](LICENSE).

## Serwer MVP z bazą danych (`serwer/`)

Node.js (bez frameworka, jedna zależność: `pg`) i PostgreSQL. Adresy: `/` zgłoszenie, `/sprawa#…` status dla klienta, `/panel` opiekun.

**Jak chronione są dane**

- **Row-Level Security w PostgreSQL.** Aplikacja łączy się jako osobny użytkownik, który nie jest właścicielem tabel; serwer odmawia startu, jeśli tak nie jest. Klient widzi tylko swoje zlecenie (po skrócie SHA-256 swojego linku), bez kontekstu zapytanie nie zwraca nic.
- **Najmniejsze uprawnienia.** Aplikacja nie może usuwać zleceń, zmieniać danych klienta (tylko stan) ani poprawiać dziennika.
- **NIP zaszyfrowany** (AES-256-GCM) kluczem z `NIP_KEY`, który nie trafia do bazy. Klient nie dostaje z powrotem NIP-u ani telefonu.
- **Link klienta** ma 256 bitów losowości, w bazie leży tylko jego skrót. Token jest w części `#…` adresu, więc nie trafia do logów serwera.
- **Opiekun:** hasło (scrypt) + kod z aplikacji TOTP, ten sam kod nie działa drugi raz, sesja 8 h w ciasteczku `__Host-` (HttpOnly, Secure, SameSite=Strict), limit 10 prób na 15 minut.
- **Dziennik dostępu:** kto, kiedy, co (utworzenie, odczyt, logowanie, nieudane logowanie, zmiana stanu), bez treści danych.
- **Przeglądarka:** ścisłe CSP (bez skryptów inline), HSTS, `frame-ancestors 'none'`, `no-referrer`; żądania zmieniające stan muszą mieć `Origin` naszej strony (CSRF); limit zgłoszeń 10 na godzinę z jednego adresu.

**Uruchomienie** (serwer w UE, np. MyDevil; baza z TLS)

1. Utwórz dwóch użytkowników bazy: właściciela (migracje) i aplikacji (np. `rf_app`).
2. `psql "$DATABASE_URL_OWNER" -v ON_ERROR_STOP=1 -v app_role=rf_app -f serwer/schema.sql`
3. `DATABASE_URL_OWNER=… node serwer/dodaj-opiekuna.mjs <login>`: wypisze jednorazowo hasło i klucz do aplikacji z kodami.
4. Skopiuj `serwer/.env.example` do `.env` poza repozytorium, uzupełnij (`NIP_KEY` wygeneruj poleceniem z pliku) i uruchom `npm ci && npm start` za proxy z HTTPS.

**Testy** (11, w tym RLS sprawdzane bezpośrednio w bazie). Baza testowa jest czyszczona, jej nazwa musi kończyć się na `_test`:

```bash
TEST_DB_OWNER_URL=postgres://rf_owner@localhost/rf_test TEST_DB_APP_URL=postgres://rf_app@localhost/rf_test npm run test:serwer
```

**Czego MVP jeszcze nie ma** (z `ZARYS-APLIKACJI.md`, sekcja 9): SMS-ów i kont klientów (link zastępuje logowanie), płatności, usuwania danych na żądanie (RODO), automatycznych kopii z próbą odtworzenia, sprzątania wygasłych sesji. Limity żądań działają w pamięci jednego procesu. RLS chroni przed błędem w zapytaniu aplikacji, ale nie przed przejęciem samego serwera: wtedy chroni szyfrowanie NIP-u, o ile klucz nie leży na tym samym dysku co kopia bazy.

## Uruchomienie

Otwórz `index.html` w przeglądarce. Nic nie trzeba instalować.

## Testy

```bash
npm i -D playwright && npx playwright install chromium
node tests/e2e.mjs

pip install playwright && playwright install chromium
python3 tests/skaner_e2e.py
```

## Wdrożenie na GitHub Pages

1. W repozytorium: Settings → Pages → Source: **GitHub Actions**.
2. Wypchnij na `main`. Workflow opublikuje stronę.

Na darmowym planie GitHub Pages działa tylko dla repozytoriów publicznych.

## Czego ta wersja nie robi

- Nie sprawdza prawdziwych sklepów. Zna cztery sklepy testowe; dla innych mówi wprost, że nie ma danych.
- Nie ma serwera: stan żyje w pamięci jednej przeglądarki, więc klient i opiekun nie widzą się między urządzeniami.
- Nie wysyła SMS-ów, nie przyjmuje płatności, nie łączy się z Google ani Facebookiem.
- Dopóki `CARETAKER` w `index.html` jest pusty, przy formularzu i na ekranie zlecenia widać informację, że to wersja testowa: zgłoszenie nie trafia do nikogo i nikt nie zadzwoni.

## Zasady produktu zapisane w kodzie

- „Wszystko się zgadza” to pełnoprawny wynik: wtedy nie ma oferty.
- W pierwszym kontakcie jest jedna cena. Nie ma abonamentu.
- Płatność po wykonaniu. Niepowodzenie zeruje cenę.
- Pól, które ustala centrala sieci, nie zmieniamy.
- Trudna sprawa startuje dopiero po zgodzie klienta na stałą cenę.
