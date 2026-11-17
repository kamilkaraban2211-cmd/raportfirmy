# Struktura dochodowa raportfirmy.pl (17.11.2026)

Ten dokument odpowiada na pytanie, którego nie liczył dotąd żaden plik: **z czego firma ma żyć**, gdy policzy się wszystkie linie przychodu razem i czas pracy właściciela. Opiera się wyłącznie na tym, co już jest w repozytorium: ofercie v3, cenach z `ZARYS-APLIKACJI.md`, liniach sukcesu z `launch.md` i kosztach z `cfo-sources.md`.

Liczby: [`struktura-liczby.md`](struktura-liczby.md), wygenerowane przez `struktura.py` z `struktura.json`. Kwoty netto, zysk przed wynagrodzeniem właściciela i podatkiem dochodowym.

## 1. Wynik

| Scenariusz (rok 1) | Zysk | Godziny pracy | Zysk na godzinę | Zysk w 12. miesiącu |
|---|---:|---:|---:|---:|
| A. Plan startu (`launch.md`), ręcznie | 106 zł | 197 | 1 zł | 9 zł |
| B. Plan startu z agentami | −906 zł | 87 | −10 zł | −75 zł |
| C. Pełna struktura, ręcznie | 8 141 zł | 355 | 23 zł | 1 455 zł |
| D. Pełna struktura z agentami | 6 815 zł | 176 | 39 zł | 1 320 zł |
| **E. Pełna struktura z agentami, jedno nowe biuro co miesiąc** | **13 482 zł** | 264 | **51 zł** | **2 324 zł** (89 zł/h) |

Trzy wnioski:

1. **Sama naprawa za 149 zł nie jest firmą.** Przy 30 sprawdzeniach miesięcznie i liniach sukcesu z testu (30% rozbieżności, 30% zleceń) wychodzi 2,7 zlecenia i 397 zł przychodu miesięcznie. To pokrywa koszty stałe i nic więcej. Próg „ok. 3 zlecenia” z `launch.md` jest prawdziwy, ale oznacza zero, nie zysk.
2. **Agenci sami nie dają zysku, dają czas.** Scenariusz B zarabia mniej niż A, bo dochodzi serwer, a zleceń jest tyle samo. Wąskim gardłem nie są godziny, tylko liczba sklepów, do których docieramy przez kogoś zaufanego. Agenci mają sens dopiero wtedy, gdy zwolniony czas idzie na pozyskiwanie biur (D → E: te same narzędzia, dwa razy więcej biur, dwa razy większy zysk, o połowę więcej godzin).
3. **Zysk robi przychód powtarzalny od biur.** W scenariuszu E w 12. miesiącu 70% przychodu to abonamenty (biura 1 788 zł, opieka 234 zł), a naprawy i trudne sprawy to 886 zł. Naprawa jest produktem wejściowym, który płaci za własne pozyskanie.

Skala jest na razie mała: około 2 300 zł miesięcznie po roku przy 26 godzinach pracy. To dochód dodatkowy, nie etat. Etatem staje się przy kilkudziesięciu biurach albo wyższej cenie planu „Biuro” (punkt 4).

## 2. Struktura: cztery linie, każda z jedną rolą

| Linia | Cena | Rola w strukturze | Kto wykonuje |
|---|---|---|---|
| **Sprawdzenie** | 0 zł | Narzędzie sprzedaży. Kosztuje czas, więc musi być robione przez agenta (3 min kontroli zamiast 15 min pracy). | Agent Widoczność, opiekun zatwierdza |
| **Naprawa** | 149 zł brutto | Pierwsza płatność i dowód dla biura. Ma się zwracać, nie zarabiać. | Agent przygotowuje zmiany i teczkę, opiekun wprowadza |
| **Trudna sprawa** | 490 zł brutto (hipoteza) | Marża z jednorazowych zleceń: 20% zleceń daje 40% przychodu jednorazowego. | Opiekun, agent prowadzi status |
| **Opieka** | 49 zł brutto/mies. | Utrzymanie klienta z własnego kanału, tylko z powodem. | Agent pilnuje, opiekun 5 min/mies. |
| **Biuro** | 149 zł netto/mies. za biuro, do 25 sklepów (hipoteza) | **Główne źródło zysku i jedyny skalowalny kanał.** Biuro płaci za pilnowanie swoich klientów i dostarcza sklepy do napraw. | Agent pilnuje, opiekun 30 min/mies. na biuro |

Skaner kasy i „Kasa + Zakupy” zostają tam, gdzie są w `ZARYS-APLIKACJI.md`: jako późniejsze rozszerzenie planu „Biuro”, nie osobny produkt dla właściciela (panele: 0/20).

## 3. Gdzie AI zastępuje pracę człowieka

Różnica między C i D to wyłącznie minuty z `struktura.json`: te same przychody, 355 godzin zamiast 176.

| Czynność | Ręcznie | Z agentem | Co robi agent |
|---|---:|---:|---|
| Sprawdzenie sklepu | 15 min | 3 min | Porównuje Google, Facebook i stronę, wypełnia kartę wyniku ze źródłem i datą |
| Naprawa | 105 min | 40 min | Projekt zmian, teczka przed/po, status, kontrola po 30 dniach |
| Trudna sprawa | 240 min | 150 min | Pisma i formularze do Google, pilnowanie terminów |
| Opieka, na klienta miesięcznie | 20 min | 5 min | Cykliczne porównanie, powiadomienie tylko przy zmianie |
| Biuro, miesięcznie | 60 min | 30 min | Zestawienie dla biura, lista rozbieżności u klientów |

Minuty „z agentem” to szacunki. Zmierzyć je trzeba w grudniowym teście: stoper przy każdym sprawdzeniu i zleceniu, wpis do rejestru metod.

Ta sama logika jest tym, co sprzedajemy biuru: biuro płaci za kontrolę, którą dziś robi człowiek albo nikt (zgodność danych klienta, później raporty kasowe i KSeF). Cena planu „Biuro” powinna być liczona od godzin, które biuro przestaje na to wydawać. Tę liczbę dają rozmowy z 3–5 biurami zaplanowane na listopad i grudzień.

## 4. Dźwignie (zysk w roku 1, scenariusz E = 13 482 zł)

| Zmiana | Zysk w roku 1 | Różnica |
|---|---:|---:|
| Plan „Biuro” 249 zł zamiast 149 zł | 19 782 zł | +6 300 |
| Plan „Biuro” 99 zł | 10 332 zł | −3 150 |
| Biuro płaci od 1. miesiąca, nie od 6. | 15 717 zł | +2 235 |
| Zwolnienie z VAT (jeśli przysługuje) | 15 903 zł | +2 421 |
| Trudna sprawa 790 zł zamiast 490 zł | 15 654 zł | +2 172 |
| Księgowość 150 zł zamiast 300 zł | 15 282 zł | +1 800 |
| Rozbieżności u 15% sklepów zamiast 30% | 9 207 zł | −4 275 |
| Zlecenia z 15% pokazanych wyników zamiast 30% | 8 355 zł | −5 127 |

Najwięcej zależy od **ceny i terminu planu „Biuro”** oraz od **liczby biur**. Słabszy lejek napraw boli, ale nie zabija struktury, bo naprawy to mniejsza część przychodu.

Zwolnienie z VAT: przy tej skali firma mieści się w limicie zwolnienia podmiotowego (do potwierdzenia z księgowym, razem z tym, czy usługa nie jest z niego wyłączona). Dla właścicieli sklepów na VAT cena brutto przestaje wtedy być w części odliczalna, więc to decyzja, nie oczywistość.

## 5. Co z tego wynika dla planu

Plan z `launch.md` zostaje. Zmieniają się trzy rzeczy:

1. **Test C (partner) jest ważniejszy niż test B (płatne zlecenia).** W rozmowach z biurami w listopadzie i grudniu zapytać wprost o płatny plan: ile sklepów obsługują, ile czasu tracą na błędy w danych klientów, czy zapłacą 149–249 zł miesięcznie za pilnowanie i listę rozbieżności. Nowa linia sukcesu: **1 biuro deklaruje zapłatę, nie tylko polecenie.**
2. **Plan „Biuro” przesunąć z II półrocza 2027 na start.** W modelu biuro płaci od 6. miesiąca. Każdy miesiąc wcześniej to ok. 450 zł w roku 1. Pierwsza wersja nie wymaga panelu: wystarczy comiesięczne zestawienie PDF wysyłane biuru.
3. **Agent sprawdzający jest pierwszą rzeczą do zbudowania po werdykcie 21.12**, przed kontami i płatnościami. Bez niego każde nowe biuro to 15 sklepów × 15 minut ręcznej pracy na wejściu i 60 minut miesięcznie potem.

Decyzje do podjęcia przez CEO (dopisane do listy w `ZARYS-APLIKACJI.md` §12):
- cena trudnej sprawy (model: 490 zł brutto),
- cena i zakres planu „Biuro” (model: 149 zł netto za biuro do 25 sklepów),
- status VAT.

## 6. Założenia i ich źródła

| Założenie | Wartość | Źródło |
|---|---|---|
| Ceny naprawy i opieki | 149 zł, 49 zł brutto | `ZARYS-APLIKACJI.md` §5 |
| Rozbieżności, zlecenia na wynik | 30%, 30% | linie sukcesu testu A i B, `launch.md` |
| Sprawdzenie ręczne | 15 min | `launch.md` |
| Naprawa ręczna | 105 min | `offer.md`: 1,5–2,5 h łącznie, minus sprawdzenie |
| Koszty stałe, wydatki startowe | 380 zł/mies., 1 700 zł | `cfo-sources.md` plus dojazdy 50 zł z `marketing.md` |
| Prowizja płatności | 1,49% + 0,30 zł | `cfo-sources.md` (PayU) |
| Własne sprawdzenia | 30 miesięcznie | skala testu z `launch.md` |
| Cena trudnej sprawy, cena planu „Biuro” | 490 zł brutto, 149 zł netto | **hipotezy tego dokumentu** |
| Udział trudnych spraw, nieopłacone, przejście do opieki, rezygnacje, sklepy na biuro, nowe rozbieżności u pilnowanych | 20%, 10%/25%, 25%, 4%, 15, 4% | **szacunki bez danych** |
| Minuty z agentami, koszt AI, serwer | patrz `struktura.json` | **szacunki bez danych** |
| Liczba biur | 6 po roku (D), 12 po roku (E) | **szacunek**; roadmapa zakłada 1 partnera na start |

Po werdykcie 21.12 wpisać do `struktura.json` zmierzone wartości i uruchomić ponownie:

```bash
python3 docs/founder/struktura.py docs/founder/struktura.json --out docs/founder/struktura-liczby.md
```

Ograniczenia: model nie liczy podatku dochodowego, ZUS ani czasu na budowę oprogramowania. Nie jest to porada podatkowa ani prawna; formę działalności, VAT i umowy z biurami sprawdza księgowy i prawnik.
