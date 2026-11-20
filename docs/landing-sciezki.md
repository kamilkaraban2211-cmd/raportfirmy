# Ścieżki użytkownika: landing raportfirmy.pl

Stan: 17.11.2026. Mapa dla `index.html`. Treść bierze się z `docs/founder/offer.md`, `docs/founder/launch.md` i `ZARYS-APLIKACJI.md`.

## Widoki

| Hash | Widok | Kto | Stan |
|---|---|---|---|
| `#start` | Sprawdzenie, sklepy testowe, „Kto za tym stoi”, „Co płacisz”, FAQ | Właściciel, każdy z ulicy | działa |
| `#biuro` | Dla biur rachunkowych i hurtowni | Partner polecający | działa |
| `#wynik` | Portret, rozbieżności, „Popraw za mnie” / instrukcja | Właściciel po sprawdzeniu | działa |
| `#zlecenie` | Status w trzech etapach, akceptacja, teczka | Właściciel po zleceniu | działa |
| `#operator` | Panel opiekuna | Opiekun | działa, bez logowania (etap 1 zarysu) |

## Ścieżka A: właściciel bez zlecenia

1. `#start`: wpisuje nazwę i miejscowość albo wybiera sklep testowy.
2. Widzi wynik w `#wynik`: „Wszystko się zgadza” (koniec, bez oferty) albo listę rozbieżności.
3. Przy „Jak poprawić to samemu” dostaje bezpłatną instrukcję i wychodzi.

## Ścieżka B: właściciel, który zleca

1. `#wynik` → „Popraw za mnie” (149 zł brutto; trudne sprawy: cena po rozmowie).
2. Zlecenie trafia do `#zlecenie` (stan `new` albo `waitlist`, gdy limit wyczerpany).
3. Opiekun dzwoni → `quoted` (trudna sprawa: zgoda na cenę) → `called` → `working` → `proposed` (akceptacja zmian) → `accepted` → `done` → `paid`.
4. Każdy etap ma „Co się działo” i możliwość rezygnacji tam, gdzie NEXT to dopuszcza.

## Ścieżka C: właściciel, który nie wie, czy to dla niego

1. `#start` → sekcja „Najczęstsze pytania” (FAQ): koszt, NIP, hasła, AI, centrala, abonament.
2. „Kto za tym stoi” i „Co płacisz i kiedy” przed wpisaniem czegokolwiek.

## Ścieżka D: biuro rachunkowe / hurtownia

1. Link z `#start` do `#biuro`.
2. Trzy kroki współpracy; wskazanie klienta bez NIP-u.
3. Zasady partnerskie: do uzupełnienia (placeholder).

## Brakujące dane (oznaczone `[UZUPEŁNIJ]` w kodzie)

| Pole | Gdzie | Źródło |
|---|---|---|
| Imię, nazwisko, telefon opiekuna | `CARETAKER` w `index.html`, sekcja „Kto za tym stoi” | CEO (decyzja nr 4 zarysu) |
| Nazwa podmiotu, forma prawna, NIP, adres | `ENTITY` w `index.html`, stopka sekcji „Kto za tym stoi” | CEO |
| Polityka prywatności | Brak linku w stopce (usunięty: test e2e zabrania tekstów zastępczych na stronie). Dodać po przygotowaniu dokumentu | Pliki wskazane przez użytkownika nie zostały znalezione w repozytorium ani w `/root` |
| Umowa partnerska i warunki polecenia | `#biuro` | Rozmowy z biurami (grudzień 2026) |

## Zasady treści (z zarysu, rozdz. 2)

- Każde zdanie o cenie zgodne z `launch.md`: 149 zł brutto, płatność po wykonaniu.
- Bez obietnic wzrostu sprzedaży ani pozycji w Google (zasada 11).
- Bez fałszywej pilności i liczników (zasada 6).
- AI przedstawia się jako AI (zasada 9).

## Weryfikacja

- `node tests/e2e.mjs` — przejście ścieżki klienta: 47 asercji, 0 błędów (17.11.2026).
- Ręcznie: `#start`, `#biuro`, `#wynik`, `#zlecenie` przy szerokości 390 px bez przewijania poziomego.
- Sprawdzić, że w tekście nie ma danych testowych wydanych za prawdziwe i że `[UZUPEŁNIJ]` widać tam, gdzie brakuje danych.
