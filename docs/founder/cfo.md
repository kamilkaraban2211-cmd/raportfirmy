# Notatka CFO: Skaner raportu z kasy jako płatny SaaS (15.11.2026)

Wszystkie kwoty są w zł. „Sprzedaż” to cena netto: 49 zł brutto miesięcznie, przy założeniu, że raportfirmy.pl jest czynnym podatnikiem VAT (49 / 1,23 = 39,84 zł). Jednostka to klient-miesiąc, czyli jedna opłacona subskrypcja przez miesiąc. Tabela „rok 1” liczy aktywnych klientów w każdym miesiącu. Cena 49 zł to hipoteza do testu, nie ustalenie. Źródła i szacunki są w `cfo-sources.md`.

**Zdjęcia nie są przechowywane.** Dlatego koszt przechowywania zdjęć wynosi 0 zł i nie ma go w żadnej tabeli. Zapisywane są tylko odczytane kwoty (kilka kB na raport). Odczytane dane sprzedaży nadal mogą być danymi osobowymi przedsiębiorcy prowadzącego jednoosobową firmę, więc umowa powierzenia jest potrzebna.

## Marża

| | wyjściowo (jak prototyp) | po optymalizacji |
|---|---:|---:|
| Koszty zmienne na klienta-miesiąc | 17,30 zł | 5,10 zł |
| Wkład na pokrycie kosztów stałych (z 39,84 zł) | 22,54 zł (57%) | 34,74 zł (87%) |
| Próg rentowności | 15 klientów | 10 klientów |
| Marża przy 100 klientach | 48% | 79% |
| Zysk operacyjny w 1. roku (ramp 3 → 50 klientów) | 2 554 zł | 6 080 zł |
| Gotówka potrzebna, zanim zacznie się zwracać | 2 409 zł | 2 154 zł |

## Gdzie naprawdę jest koszt

AI jest najmniejszym problemem. Odczyt raportu przez Haiku 5.5 kosztuje ok. 0,003 zł, a przez Sonnet 5.5 ok. 0,14 zł (kurs 4,00 zł/USD). Największe koszty to **czas człowieka na pomoc klientowi** (10 min miesięcznie to 10 zł, czyli 58% kosztów zmiennych w wersji wyjściowej) i **stałe koszty firmy przy małej liczbie klientów** (księgowość 300 zł miesięcznie to 91% kosztów stałych).

## Dźwignie (każdą sprawdziłem osobno, od wersji wyjściowej)

| Dźwignia | Wkład na klienta | Próg | Zysk w 1. roku |
|---|---:|---:|---:|
| Wyjściowo | 22,54 zł | 15 | 2 554 zł |
| 1. Odczyt Haiku 5.5 + zmniejszenie zdjęcia w telefonie + komentarz z szablonu, AI tylko na żądanie | 27,64 zł | 12 | 4 028 zł |
| 2. Abonament roczny zamiast miesięcznego (1 prowizja w roku) | 23,64 zł | 14 | 2 872 zł |
| 3. Wsparcie 4 zamiast 10 min/mies. (kontrola sum, samodzielne poprawki, instrukcja zdjęcia) | 28,54 zł | 12 | 4 288 zł |
| 4. Księgowość 150 zamiast 300 zł/mies. | 22,54 zł | 8 | 4 354 zł |

Co zrobić w praktyce:
1. **Model:** Haiku 5.5 do odczytu, Sonnet 5.5 tylko wtedy, gdy kontrola sum się nie zgadza (drugie podejście dotyczy niewielu skanów). Zanim zapadnie decyzja, trzeba porównać jakość odczytu obu modeli na 50 prawdziwych wydrukach.
2. **Zdjęcie:** zmniejszać w telefonie do ok. 1100×1450 px (ok. 2 000 tokenów zamiast do 4 784). Najlepiej kadrować tylko podsumowanie raportu, czyli stawki, PTU, należność i liczbę paragonów, a nie cały wydruk.
3. **Komentarz:** stałe zdania z szablonu (rozkład zmiany, porównywalność) bez AI. AI tylko na przycisk, z limitem w planie.
4. **Nie wołać AI drugi raz:** ponowne otwarcie wyniku czyta zapis z bazy, a poprawki robi użytkownik w formularzu.
5. **Płatności:** zachęta do abonamentu rocznego. Przy miesięcznym warto porównać PayU (1,49% + 0,30 zł, ok. 1,03 zł) ze Stripe (1,5% + 1 zł + 0,7% Billing, ok. 2,08 zł).

## Na co patrzeć najbardziej

**Tempo pozyskiwania klientów.** Przy 20% mniejszej liczbie klientów zysk w 1. roku spada z 6 080 do 4 072 zł (wersja zoptymalizowana). Przy cenie niższej o 10% spada do 4 928 zł. Ramp 3 → 50 płacących klientów w 12 miesięcy to mój szacunek, nie dane. Symulowane panele dały 0–2% chętnych przy sprzedaży bez pośrednika, więc tak szybki wzrost jest realny raczej tylko przez kanał (biuro rachunkowe, serwis kas).

**Cena:** przy 29 zł brutto (23,58 zł netto) próg rośnie do 18 klientów, a startowe wydatki nie zwracają się w 1. roku. Przy 79 zł brutto próg spada do 6 klientów.

## Gotówka

Potrzeba ok. **2 150 zł**, zanim przychody pokryją koszty: 1 720 zł na start (głównie dokumenty prawne, szacunek 1 500 zł) i straty pierwszych 3 miesięcy. To ponad dziesięć razy więcej niż budżet eksperymentów 200 zł. Przed startem trzeba zdecydować, skąd będą te pieniądze, albo obniżyć koszty dokumentów i księgowości.

Nie było posiedzenia zarządu z warunkami finansowymi (`board.md` nie istnieje), więc nie ma czego sprawdzić. Nie wliczałem czasu założycieli na rozwój produktu i sprzedaż: to koszt, który trzeba ustalić osobno. To nie jest porada podatkowa ani prawna. Status VAT, formę rozliczeń z Anthropic (płatność w USD, import usług), umowę powierzenia i regulamin powinien sprawdzić księgowy lub prawnik.

---

# Unit economics: Skaner raportu z kasy (raportfirmy.pl), płatny SaaS. Konfiguracja zoptymalizowana

Every number below comes from the input file. Nothing is looked up or guessed.

## One klient-miesiąc

| line | per klient-miesiąc |
| --- | ---: |
| Price | 39.84 |
| AI: odczyt ~32 zdjęć/mies. (Haiku 5.5, zdjęcie zmniejszone w telefonie do ok. 2 000 tokenów) | -0.11 |
| AI: komentarz z szablonu (0 zł) + 2 komentarze AI/mies. na żądanie (Haiku 5.5) | -0.01 |
| Płatność: abonament roczny (Stripe, 1 transakcja/rok, w przeliczeniu na miesiąc) | -0.98 |
| Wsparcie: 4 min/mies. x 60 zł/h (samodzielne poprawki, kontrola sum, instrukcja zdjęcia) | -4.00 |
| **Contribution** (what each klient-miesiąc leaves to pay the fixed costs) | **34.74** (87%) |

## The margin that matters

Fixed costs: 330 a month (Hosting MyDevil MD1 (szacunek, do podania) 20, Domena i poczta (szacunek) 10, Księgowość raportfirmy.pl (szacunek, do podania) 300).

- **Break-even: 10 aktywnych klientów w miesiącu.** Below that you lose money every month.
- **Profit margin at your plan** (100 (aktywnych klientów w miesiącu)): **79%** of every sale, after every cost.

## Year 1, month by month

| month | aktywnych klientów w miesiącu | revenue | profit | cumulative (after 1,720 startup) |
| ---: | ---: | ---: | ---: | ---: |
| 1 | 3 | 120 | -226 | -1,946 |
| 2 | 5 | 199 | -156 | -2,102 |
| 3 | 8 | 319 | -52 | -2,154 |
| 4 | 12 | 478 | 87 | -2,067 |
| 5 | 16 | 637 | 226 | -1,841 |
| 6 | 20 | 797 | 365 | -1,477 |
| 7 | 25 | 996 | 539 | -938 |
| 8 | 30 | 1,195 | 712 | -226 |
| 9 | 35 | 1,394 | 886 | 660 |
| 10 | 40 | 1,594 | 1,060 | 1,720 |
| 11 | 45 | 1,793 | 1,233 | 2,953 |
| 12 | 50 | 1,992 | 1,407 | 4,360 |

- **Year 1 operating profit: 6,080** on 11,514 of revenue.
- After the 1,720 startup spend: 4,360.
- Startup money earned back: month 9.
- Cash you need before it pays for itself: **2,154**.

## What if

| scenario | margin at plan | break-even (aktywnych klientów w miesiącu) | year 1 profit |
| --- | ---: | ---: | ---: |
| Base plan | 79% | 10 | 6,080 |
| Price -10% | 77% | 11 | 4,928 |
| Volume -20% | 77% | 10 | 4,072 |
| Unit costs +15% | 77% | 10 | 5,859 |

No red flags in these numbers. They are only as good as the inputs: check every cost against a real quote.
