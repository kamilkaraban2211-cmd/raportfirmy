# Notatka CFO: „Sklep w porządku” (20.11.2026)

Wszystkie kwoty w zł, netto. 149 zł brutto to 121,14 zł netto przy VAT 23%. Jednostka to jedno opłacone zlecenie. Kalkulator (`numbers.json`, wejścia w `cfo-sources.md`) działa w miesiącach: tam, gdzie wynik narzędzia mówi „w miesiącu”, chodzi o zlecenia w miesiącu. Liczby Skanera z 15.11 są w `cfo-skaner.md` (Skaner jest odłożony, patrz `launch.md`).

**Jedyny koszt tej usługi to Twój czas.** Dlatego liczę dwa warianty. W pierwszym godzina CEO kosztuje 60 zł, tak jak w CFO Skanera. Drugi to sama gotówka, bez wyceny czasu.

## Marża

| | z wyceną czasu (60 zł/h) | sama gotówka |
|---|---:|---:|
| Minuty CEO na 1 opłacone zlecenie | 242,5 | 242,5 |
| Wkład na pokrycie kosztów stałych | **−121,36 zł** | 121,14 zł |
| Próg rentowności | nigdy | 3 zlecenia w miesiącu |
| Marża przy 10 zleceniach w miesiącu (limit) | −127% | 73% |
| Zysk operacyjny w 1. roku (3 → 10 zleceń w miesiącu) | **−14 276 zł** | 6 337 zł |
| Gotówka potrzebna, zanim zacznie się zwracać | 15 976 zł | 1 700 zł |

**Co to znaczy:** w wariancie gotówkowym próg z `launch.md` się zgadza: 3 zlecenia w miesiącu pokrywają 330 zł kosztów stałych. Ale przy limicie 10 zleceń w miesiącu (ok. 40 h pracy) zysk wynosi 881 zł, czyli **ok. 30 zł za godzinę pracy przed podatkiem** (121,14 zł za 242,5 min). To nie wystarcza, żeby z tego żyć. Usługa w tej postaci jest sposobem na poznanie klientów, a nie biznesem.

## Gdzie naprawdę jest koszt

**Darmowe sprawdzenia: 150 z 242,5 minut (62%).** Według linii sukcesu testu (30 sprawdzeń → 3 zlecenia) na jedno płatne zlecenie przypada 10 darmowych sprawdzeń po 15 min. Sama naprawa z telefonem i kontrolą po 30 dniach to 92,5 min. Wizyt osobistych w sklepach nie wliczyłem, bo nikt nie zmierzył ich czasu. Z nimi wynik będzie gorszy.

## Na co patrzeć najbardziej

**Minuty na sprawdzenie i ile sprawdzeń przypada na zlecenie.** To mierzy grudniowy test (A i B w `launch.md`), więc mierz czas każdego sprawdzenia i każdego zlecenia stoperem od pierwszego sklepu.

## Dźwignie (każda liczona osobno w kalkulatorze, od wariantu z wyceną czasu)

| Dźwignia | Wkład na zlecenie | Próg | Zysk w 1. roku |
|---|---:|---:|---:|
| Wyjściowo | −121,36 zł | nigdy | −14 276 zł |
| 1. Sprawdzenie 5 min zamiast 15 (lista kontrolna, półautomat z ZARYS etap 1) | −21,36 zł | nigdy | −5 776 zł |
| 2. 5 sprawdzeń na zlecenie zamiast 10 (sklepy z polecenia partnera) | −46,36 zł | nigdy | −7 901 zł |
| 3. Naprawa 45 min zamiast 67,5 | −98,86 zł | nigdy | −12 363 zł |
| 4. Cena 299 zł brutto (243,09 zł netto) | 0,59 zł | 560 | −3 910 zł |
| 1 + 2 + 3 razem (149 zł) | 26,14 zł | 13 (ponad limit 10) | −1 738 zł |
| 1 + 2 + 3 i cena 199 zł brutto (161,79 zł netto) | 66,79 zł | 5 | 1 717 zł |

Żadna dźwignia sama nie wystarcza. Na plus wychodzi dopiero połączenie: szybkie sprawdzenie, klienci z polecenia, krótka naprawa i wyższa cena. Cenę 199 zł trzeba sprawdzić. Panel v2 dał medianę „za drogo” 225 zł (`offer.md`), ale to symulacja.

## Gotówka

W wariancie gotówkowym potrzeba **1 700 zł**: 1 500 zł na dokumenty prawne (szacunek) i 200 zł na marketing. Miesiące są na plus od pierwszego, jeśli będą 3 zlecenia. Budżet eksperymentów to 200 zł, więc trzeba zdecydować, skąd wziąć 1 500 zł, albo zastąpić pełną usługę prawną wzorcami i 1–2 h konsultacji (`sposoby-i-bezpieczenstwo.md`, punkt 17).

Nie ma `board.md`, więc nie ma warunków zarządu do sprawdzenia. Rampa 3 → 10 zleceń to mój szacunek między linią przejścia z `launch.md` (3) a przykładowym limitem (10). Nie wpływa na znak wyniku, bo w wariancie z wyceną czasu każde zlecenie traci. To nie jest porada podatkowa ani prawna. Formę działalności, VAT i umowy powinien sprawdzić księgowy.

---

# Unit economics: Sklep w porządku (raportfirmy.pl): naprawa danych sklepu w Google i na Facebooku

Every number below comes from the input file. Nothing is looked up or guessed.

## One zlecenie

| line | per zlecenie |
| --- | ---: |
| Price | 121.14 zł |
| Bezpłatne sprawdzenia: 10 na 1 opłacone zlecenie x 15 min x 60 zł/h (linia sukcesu testu: 3 zlecenia z 30 sprawdzeń) | -150.00 zł |
| Naprawa w Google i na Facebooku: 67,5 min (środek z 45–90 min) x 60 zł/h | -67.50 zł |
| Telefon: przeprowadzenie przez dodanie menedżera, 10 min x 60 zł/h | -10.00 zł |
| Bezpłatna kontrola po 30 dniach, 15 min x 60 zł/h | -15.00 zł |
| Płatność BLIK lub przelew (przyjęte 0 zł, do sprawdzenia w banku) | -0.00 zł |
| **Contribution** (what each zlecenie leaves to pay the fixed costs) | **-121.36 zł** (-100%) |

## The margin that matters

Fixed costs: 330 zł a month (Hosting MyDevil MD1 (szacunek, do podania) 20, zł Domena i poczta (szacunek) 10, zł Księgowość raportfirmy.pl (szacunek, do podania) 300 zł).

- **Break-even: never (each unit loses money) zleceń w miesiącu.** Below that you lose money every month.
- **Profit margin at your plan** (10 w miesiącu): **-127%** of every sale, after every cost.
- Capacity: 10 w miesiącu.

## Year 1, month by month

| month | zleceń w miesiącu | revenue | profit | cumulative (after 1,700 zł startup) |
| ---: | ---: | ---: | ---: | ---: |
| 1 | 3 | 363 zł | -694 zł | -2,394 zł |
| 2 | 3 | 363 zł | -694 zł | -3,088 zł |
| 3 | 4 | 485 zł | -815 zł | -3,904 zł |
| 4 | 5 | 606 zł | -937 zł | -4,840 zł |
| 5 | 6 | 727 zł | -1,058 zł | -5,899 zł |
| 6 | 7 | 848 zł | -1,180 zł | -7,078 zł |
| 7 | 8 | 969 zł | -1,301 zł | -8,379 zł |
| 8 | 9 | 1,090 zł | -1,422 zł | -9,801 zł |
| 9 | 10 | 1,211 zł | -1,544 zł | -11,345 zł |
| 10 | 10 | 1,211 zł | -1,544 zł | -12,888 zł |
| 11 | 10 | 1,211 zł | -1,544 zł | -14,432 zł |
| 12 | 10 | 1,211 zł | -1,544 zł | -15,976 zł |

- **Year 1 operating profit: -14,276 zł** on 10,297 zł of revenue.
- After the 1,700 zł startup spend: -15,976 zł.
- Startup money earned back: not within year 1.
- Cash you need before it pays for itself: **15,976 zł**.

## What if

| scenario | margin at plan | break-even w miesiącu | year 1 profit |
| --- | ---: | ---: | ---: |
| Base plan | -127% | never | -14,276 zł |
| Price -10% | -153% | never | -15,305 zł |
| Volume -20% | -134% | never | -12,212 zł |
| Unit costs +15% | -157% | never | -17,367 zł |

## Red flags

- Each unit loses money before rent and salaries: the price is below the variable cost.
- Break-even needs inf zleceń w miesiącu but capacity is 10.
- Year 1 loses money on operations (-14,276 zł).
- The startup spend is not earned back within year 1.

---

## Wariant gotówkowy (`numbers-gotowka.json`)


Every number below comes from the input file. Nothing is looked up or guessed.

## One zlecenie

| line | per zlecenie |
| --- | ---: |
| Price | 121.14 zł |
| Płatność BLIK lub przelew (przyjęte 0 zł, do sprawdzenia w banku) | -0.00 zł |
| **Contribution** (what each zlecenie leaves to pay the fixed costs) | **121.14 zł** (100%) |

## The margin that matters

Fixed costs: 330 zł a month (Hosting MyDevil MD1 (szacunek, do podania) 20, zł Domena i poczta (szacunek) 10, zł Księgowość raportfirmy.pl (szacunek, do podania) 300 zł).

- **Break-even: 3 zleceń w miesiącu.** Below that you lose money every month.
- **Profit margin at your plan** (10 w miesiącu): **73%** of every sale, after every cost.
- Capacity: 10 w miesiącu.

## Year 1, month by month

| month | zleceń w miesiącu | revenue | profit | cumulative (after 1,700 zł startup) |
| ---: | ---: | ---: | ---: | ---: |
| 1 | 3 | 363 zł | 33 zł | -1,667 zł |
| 2 | 3 | 363 zł | 33 zł | -1,633 zł |
| 3 | 4 | 485 zł | 155 zł | -1,479 zł |
| 4 | 5 | 606 zł | 276 zł | -1,203 zł |
| 5 | 6 | 727 zł | 397 zł | -806 zł |
| 6 | 7 | 848 zł | 518 zł | -288 zł |
| 7 | 8 | 969 zł | 639 zł | 351 zł |
| 8 | 9 | 1,090 zł | 760 zł | 1,111 zł |
| 9 | 10 | 1,211 zł | 881 zł | 1,993 zł |
| 10 | 10 | 1,211 zł | 881 zł | 2,874 zł |
| 11 | 10 | 1,211 zł | 881 zł | 3,756 zł |
| 12 | 10 | 1,211 zł | 881 zł | 4,637 zł |

- **Year 1 operating profit: 6,337 zł** on 10,297 zł of revenue.
- After the 1,700 zł startup spend: 4,637 zł.
- Startup money earned back: month 7.
- Cash you need before it pays for itself: **1,700 zł**.

## What if

| scenario | margin at plan | break-even w miesiącu | year 1 profit |
| --- | ---: | ---: | ---: |
| Base plan | 73% | 3 | 6,337 zł |
| Price -10% | 70% | 4 | 5,307 zł |
| Volume -20% | 66% | 3 | 4,278 zł |
| Unit costs +15% | 73% | 3 | 6,337 zł |

No red flags in these numbers. They are only as good as the inputs: check every cost against a real quote.
