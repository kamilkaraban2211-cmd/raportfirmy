---
name: testy
description: Uruchamia testy przeglądarkowe repozytorium raportfirmy (narzędzie terenowe teren/index.html, ścieżka klienta index.html, skaner) i raportuje wynik. Użyj po każdej zmianie w plikach HTML, przed commitem, albo gdy użytkownik pyta „czy działa”, „puść testy”.
---

# Testy

Testy to skrypty Playwright w `tests/`. Każdy wypisuje `N ok, M fail` i kończy się kodem 1 przy błędzie.

## Kroki

1. Playwright jest zwykle zainstalowany globalnie. Testy `.mjs` importują `playwright` jako moduł ES, a ESM nie czyta `NODE_PATH`, więc podlinkuj go na czas testu:
   ```bash
   G=$(npm root -g); mkdir -p node_modules && ln -sfn "$G/playwright" node_modules/playwright
   ```
   Jeśli globalnego nie ma: `npm i -D playwright` (przeglądarkę instaluj tylko, gdy środowisko jej nie ma).
2. Uruchom, odpowiednio do tego, co się zmieniło (przy wątpliwości wszystkie):
   ```bash
   node tests/teren_e2e.mjs
   node tests/e2e.mjs
   python3 tests/skaner_e2e.py
   ```
3. Usuń link: `rm -rf node_modules` (jest w `.gitignore`, ale nie zostawiaj śmieci).
4. Zgłoś wynik dosłownie: liczby `ok`/`fail` i linie `FAIL:`. Nie wyłączaj ani nie osłabiaj testu, żeby przeszedł; napraw kod albo powiedz, czego nie umiesz naprawić.

## Uwagi

- Nawigacja po hashu renderuje się asynchronicznie: w nowych testach po `page.goto(url + "#...")` i kliknięciu linku używaj helperów `go()` / `tap()` z `tests/teren_e2e.mjs` (krótkie oczekiwanie), inaczej test czyta starą treść.
- Testy sprawdzają szerokość 390 i 1100 px oraz brak przewijania poziomego. Nowy ekran dodaj do obu.
