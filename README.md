# RaportFirmy.pl — „Sklep w porządku”

**Zarys kompletnej aplikacji (ścieżka, moduły, ceny, agenci, dane, bezpieczeństwo, prawo, mapa drogowa): [`ZARYS-APLIKACJI.md`](ZARYS-APLIKACJI.md).** Plan startu: [`docs/founder/launch.md`](docs/founder/launch.md).

Statyczna aplikacja (bez serwera i bez budowania). Wersja testowa na przykładowych danych.

## Co jest w repozytorium

| Ścieżka | Co to jest |
|---|---|
| `index.html` | Ścieżka klienta: darmowe sprawdzenie sklepu po nazwie (bez NIP-u) → wynik ze źródłem i datą → „Popraw za mnie” za jedną cenę → status zlecenia w trzech etapach (Znaleźliśmy / Robimy / Gotowe) → teczka zmian. W tym samym pliku lekki panel opiekuna: kolejka zleceń, wycena trudnych spraw, limit zleceń w miesiącu, rejestr rozwiązanych spraw. |
| `skaner/index.html` | Skaner raportu z kasy (15.11.2026): zdjęcie raportu fiskalnego dobowego lub miesięcznego → odczyt kwot przez Claude → kontrola sum (PTU, łączna należność) → porównanie z podobnym okresem, rozkład zmiany na liczbę i wartość paragonów → komentarz AI na żądanie. Zdjęcia nie są zapisywane, NIP nie jest odczytywany. Odczyt AI i zapis na koncie działają, gdy strona jest otwarta jako artefakt Claude; poza nim zostaje wpisywanie ręczne. |
| `platnosci/` | Bramka płatności (Cloudflare Worker + Stripe Checkout): BLIK, Apple Pay, Google Pay, karta. Płatność dopiero po wykonaniu, kwotę ustala opiekun, „opłacone” ustawia tylko podpisany webhook Stripe. Wdrożenie i lista zgodności z zasadami Apple, Google i BLIK: [`platnosci/README.md`](platnosci/README.md). |
| `docs/founder/` | Prace analityczne z 6–16.11.2026: profil klienta, panele symulowanych kupujących (`panel*`), oferta, kalkulacja CFO, cena, marketing, przeszkody i bezpieczeństwo danych. Wyniki paneli to symulacja, nie opinie klientów. |
| `pilot/index.html` | Wcześniejsza aplikacja pilota W01–W14 (NIP, portret, cele, import sprzedaży, płatności testowe, panel operatora). Bez zmian. |
| `tests/e2e.mjs` | Test przejścia całej ścieżki „Sklep w porządku” w przeglądarce (Playwright). |
| `tests/platnosci.test.mjs` | Testy bramki płatności na atrapie Stripe: podpis webhooka, kwota z serwera, BLIK + karta w PLN, brak danych osobowych, idempotencja. |
| `tests/skaner_e2e.py` | Test skanera na atrapie Claude (Playwright, Python): odczyt, kontrola sum, zapis, porównanie, komentarz; szerokość 390 i 1100 px. |
| `.github/workflows/pages.yml` | Publikacja na GitHub Pages po każdym wypchnięciu na `main`. |

## Uruchomienie

Otwórz `index.html` w przeglądarce. Nic nie trzeba instalować.

## Testy

```bash
npm i -D playwright && npx playwright install chromium
node tests/e2e.mjs
node --test tests/platnosci.test.mjs

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
- Nie wysyła SMS-ów, nie łączy się z Google ani Facebookiem.
- Płatności online działają dopiero po wdrożeniu bramki i ustawieniu `PAYMENTS_API` w `index.html` (`platnosci/README.md`). Do tego czasu płatność odnotowuje opiekun.
- Dopóki `CARETAKER` w `index.html` jest pusty, przy formularzu i na ekranie zlecenia widać informację, że to wersja testowa: zgłoszenie nie trafia do nikogo i nikt nie zadzwoni.

## Zasady produktu zapisane w kodzie

- „Wszystko się zgadza” to pełnoprawny wynik: wtedy nie ma oferty.
- W pierwszym kontakcie jest jedna cena. Nie ma abonamentu.
- Płatność po wykonaniu. Niepowodzenie zeruje cenę.
- Pól, które ustala centrala sieci, nie zmieniamy.
- Trudna sprawa startuje dopiero po zgodzie klienta na stałą cenę.
