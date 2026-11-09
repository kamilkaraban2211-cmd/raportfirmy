# RaportFirmy.pl — „Sklep w porządku”

Statyczna aplikacja (bez serwera i bez budowania). Wersja testowa na przykładowych danych.

## Co jest w repozytorium

| Ścieżka | Co to jest |
|---|---|
| `index.html` | Ścieżka klienta: darmowe sprawdzenie sklepu po nazwie (bez NIP-u) → wynik ze źródłem i datą → „Popraw za mnie” za jedną cenę → status zlecenia w trzech etapach (Znaleźliśmy / Robimy / Gotowe) → teczka zmian. W tym samym pliku lekki panel opiekuna: kolejka zleceń, wycena trudnych spraw, limit zleceń w miesiącu, rejestr rozwiązanych spraw. |
| `pilot/index.html` | Wcześniejsza aplikacja pilota W01–W14 (NIP, portret, cele, import sprzedaży, płatności testowe, panel operatora). Bez zmian. |
| `tests/e2e.mjs` | Test przejścia całej ścieżki w przeglądarce (Playwright). |
| `.github/workflows/pages.yml` | Publikacja na GitHub Pages po każdym wypchnięciu na `main`. |

## Uruchomienie

Otwórz `index.html` w przeglądarce. Nic nie trzeba instalować.

## Testy

```bash
npm i -D playwright && npx playwright install chromium
node tests/e2e.mjs
```

## Wdrożenie na GitHub Pages

1. W repozytorium: Settings → Pages → Source: **GitHub Actions**.
2. Wypchnij na `main`. Workflow opublikuje stronę.

Na darmowym planie GitHub Pages działa tylko dla repozytoriów publicznych.

## Czego ta wersja nie robi

- Nie sprawdza prawdziwych sklepów. Zna cztery sklepy testowe; dla innych mówi wprost, że nie ma danych.
- Nie ma serwera: stan żyje w pamięci jednej przeglądarki, więc klient i opiekun nie widzą się między urządzeniami.
- Nie wysyła SMS-ów, nie przyjmuje płatności, nie łączy się z Google ani Facebookiem.
- Dane opiekuna (`CARETAKER` w `index.html`) są do uzupełnienia.

## Zasady produktu zapisane w kodzie

- „Wszystko się zgadza” to pełnoprawny wynik: wtedy nie ma oferty.
- W pierwszym kontakcie jest jedna cena. Nie ma abonamentu.
- Płatność po wykonaniu. Niepowodzenie zeruje cenę.
- Pól, które ustala centrala sieci, nie zmieniamy.
- Trudna sprawa startuje dopiero po zgodzie klienta na stałą cenę.
