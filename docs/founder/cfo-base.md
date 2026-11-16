# Unit economics: Skaner raportu z kasy (raportfirmy.pl), płatny SaaS. Konfiguracja wyjściowa: jak w prototypie

Every number below comes from the input file. Nothing is looked up or guessed.

## One klient-miesiąc

| line | per klient-miesiąc |
| --- | ---: |
| Price | 39.84 |
| AI: odczyt ~32 zdjęć/mies. (Sonnet 5.5, pełna rozdzielczość, 2 zdjęcia/raport) | -4.66 |
| AI: 8 komentarzy/mies. (Sonnet 5.5) | -0.56 |
| Płatność kartą co miesiąc (Stripe 1,5% + 1 zł + Billing 0,7%) | -2.08 |
| Wsparcie i poprawki: 10 min/mies. x 60 zł/h (szacunek) | -10.00 |
| **Contribution** (what each klient-miesiąc leaves to pay the fixed costs) | **22.54** (57%) |

## The margin that matters

Fixed costs: 330 a month (Hosting MyDevil MD1 (szacunek, do podania) 20, Domena i poczta (szacunek) 10, Księgowość raportfirmy.pl (szacunek, do podania) 300).

- **Break-even: 15 aktywnych klientów w miesiącu.** Below that you lose money every month.
- **Profit margin at your plan** (100 (aktywnych klientów w miesiącu)): **48%** of every sale, after every cost.

## Year 1, month by month

| month | aktywnych klientów w miesiącu | revenue | profit | cumulative (after 1,720 startup) |
| ---: | ---: | ---: | ---: | ---: |
| 1 | 3 | 120 | -262 | -1,982 |
| 2 | 5 | 199 | -217 | -2,200 |
| 3 | 8 | 319 | -150 | -2,349 |
| 4 | 12 | 478 | -60 | -2,409 |
| 5 | 16 | 637 | 31 | -2,378 |
| 6 | 20 | 797 | 121 | -2,257 |
| 7 | 25 | 996 | 234 | -2,024 |
| 8 | 30 | 1,195 | 346 | -1,678 |
| 9 | 35 | 1,394 | 459 | -1,219 |
| 10 | 40 | 1,594 | 572 | -647 |
| 11 | 45 | 1,793 | 684 | 37 |
| 12 | 50 | 1,992 | 797 | 834 |

- **Year 1 operating profit: 2,554** on 11,514 of revenue.
- After the 1,720 startup spend: 834.
- Startup money earned back: month 11.
- Cash you need before it pays for itself: **2,409**.

## What if

| scenario | margin at plan | break-even (aktywnych klientów w miesiącu) | year 1 profit |
| --- | ---: | ---: | ---: |
| Base plan | 48% | 15 | 2,554 |
| Price -10% | 43% | 18 | 1,403 |
| Volume -20% | 46% | 15 | 1,251 |
| Unit costs +15% | 42% | 17 | 1,804 |

No red flags in these numbers. They are only as good as the inputs: check every cost against a real quote.
