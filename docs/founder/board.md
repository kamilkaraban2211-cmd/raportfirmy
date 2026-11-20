# Posiedzenie zarządu: „Sklep w porządku” (20.11.2026)

Trzy soczewki to streszczenia opublikowanych ram (Offers, Monopoly, Product), a nie głosy ich autorów. Memo są w `board/`, a materiał wejściowy w `board/brief.md`.

## 1. Głosowanie

**3 × FUND IF, średnia 4,3/10** (Offers 4, Monopoly 4, Product 5). Nikt nie głosował „pass”, ale nikt też nie dał więcej niż 5. Zarząd mówi: „jeszcze nie wiadomo, sprawdźcie to w grudniu”.

## 2. Ryzyka wskazane przez więcej niż jedną soczewkę

| Ryzyko | Kto je wskazał | Liczba z paczki |
|---|---|---|
| **Czas pracy zjada marżę.** 242,5 min na opłacone zlecenie, w tym 150 min darmowych sprawdzeń | wszystkie trzy | −121,36 zł na zleceniu przy 60 zł/h; ok. 30 zł/h bez wyceny czasu |
| **Ból jest rzadki, dopóki właściciel nie zobaczy błędu.** Wszystko zależy od odsetka prawdziwych rozbieżności | wszystkie trzy | 0/20 kupuje; 10/20 „sam poprawię w kwadrans”; 15/20 zapłaci, gdy zobaczy błąd |
| **Zaufanie i łatwość kopiowania.** Kategoria ma złą opinię, a usługę łatwo powtórzyć | Offers, Monopoly | 7/20 odmawia z braku zaufania; nie ma technologii ani efektu sieci |
| **Sklepy sieciowe dostają mniej.** Część pól ustala centrala | Monopoly, Product | ok. 30% grupy docelowej; 3/20 „centrala to robi” |

Tylko soczewka Product wskazała **liczbę przekazań na ścieżce** (partner → karta → dodanie menedżera → zmiany → akceptacja → kontrola). Każde przejście gubi klientów, a nikt nie mierzy, ilu.

## 3. Warunki: lista do odhaczenia

| # | Warunek | Kto | Termin | Kto to sprawdza | Stan na 20.11 |
|---|---|---|---|---|---|
| 1 | ≥ 30% z 30 sprawdzeń ma realną rozbieżność; ≥ 3 opłacone zlecenia z ≥ 10 pokazanych wyników. Poniżej 15%: brak startu | wszyscy | 20.12.2026 | test (`launch.md`) | w toku |
| 2 | Zmierzony medianowy czas na opłacone zlecenie, razem ze sprawdzeniami, ≤ 120 min **albo** cena, przy której zlecenie przy 60 zł/h nie traci (warunek najostrzejszy, z soczewki Product; Offers: 125, Monopoly: 150 w ciągu 90 dni) | wszyscy | 21.12.2026 | `/founder-cfo` z czasami z testu | ✗ dziś 242,5 min (szacunek) |
| 3 | ≥ 5 pokazanych wyników dostaje ofertę za 199 zł; konwersja porównana ze 149 zł | Offers | 20.12.2026 | test, `pricing.md` | dodane do testu |
| 4 | ≥ 50% właścicieli, którym pokazano błąd, nadaje uprawnienia menedżera; dla każdego kroku zapisane, ilu odpadło | Product | 20.12.2026 | rejestr testu (karta sprawdzenia w aplikacji) | narzędzie gotowe |
| 5 | Stałe ceny trudnych spraw opublikowane | Offers, Product | 18.01.2027 | `pricing.md` | propozycja w `pricing.md` |
| 6 | Podpisany partner: ≥ 50 sklepów-klientów w jednej okolicy, wyłączność lub pierwszeństwo na ≥ 12 mies., prowizja ustalona w zł | Monopoly (Offers: koszty partnera ustalone) | 18.01.2027 | CEO | ✗ |
| 7 | Mapa konkurencji pokazująca konkretną różnicę | Monopoly | 18.01.2027 | `competitors.md` | ✓ jest (ceny do sprawdzenia na stronach) |
| 8 | W ciągu 90 dni od startu: ≥ 20% sklepów partnera sprawdzonych, ≥ 5% opłaconych | Monopoly | 18.04.2027 | przegląd 90 dni | — |
| 9 | Abonament, raport firmy, plan „Biuro” i KSeF poza zakresem do 20 opłaconych napraw | Product | stale | CEO | do decyzji |

## 4. Gdzie się różnią

- **Cena.** Offers uważa, że 149 zł to za mało, i chce testu 199 zł, bo mediana „za drogo” to 225 zł. Monopoly i Product nie traktują ceny jako głównej dźwigni. Dla nich liczą się kanał i skupienie.
- **Fosa.** Monopoly widzi jedyną trwałą przewagę w wyłącznym partnerze i rejestrze metod, który z czasem skraca sprawdzenie. Offers szuka jej w ofercie (gwarancja, bonusy), a Product w rzemiośle i doświadczeniu.
- **Zakres.** Product chce wyciąć wszystko poza naprawą (warunek 9). Offers proponuje coś dołożyć tanim kosztem, np. kartę godzin świątecznych na drzwi albo przypomnienie przed kolejnymi świętami.

## 5. Najmocniejsza wersja tego biznesu, jaką widzi zarząd

To nie jest dokładnie to, co jest w pitchu. **Produktem jest sprawdzenie, a nie naprawa.** Biuro rachunkowe albo hurtownia z co najmniej 50 sklepami w jednej okolicy pokazuje swoim klientom wynik sprawdzenia: konkretną rozbieżność ze źródłem i datą albo „wszystko się zgadza”. Sprawdzenie trwa 5 minut, bo robi je lista kontrolna z narzędziem, a nie 15 minut ręcznej pracy. Płatna naprawa kosztuje tyle, żeby przy wycenionym czasie się opłacała (prawdopodobnie 199 zł). Pieniądze robią trudne sprawy, których właściciel sam nie załatwi (duplikat, przejęty profil, odzyskanie dostępu), za stałe, opublikowane ceny. Wszystko inne, czyli abonament, raport i KSeF, czeka na 20 opłaconych napraw. W tej wersji fosą jest kanał i rejestr metod, a nie technologia.
