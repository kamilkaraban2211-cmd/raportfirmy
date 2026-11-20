# Cena: „Sklep w porządku” (20.11.2026)

Ceny brutto, chyba że zaznaczono „netto” (VAT 23%). Podstawy: odpowiedzi cenowe 20 symulowanych kupujących z panelu oferty za 149 zł (`panel-v2/answers`, wynik w `pricing-curve-uslugi.md`), ceny konkurencji (`competitors.md`) i kalkulator CFO (`numbers.json`). Symulowane odpowiedzi pokazują, co warto testować. Dowodem nie są. Cennik Skanera jest w `pricing-skaner.md`.

## 1. Cena: 149 zł zostaje w teście, a 179 zł testujemy obok

| | |
|---|---|
| Akceptowalny zakres (panel) | **40–179 zł** (PMC/OPP 40 zł, IPP 81 zł, PME 179 zł) |
| Mediany odpowiedzi | za tanio 30 zł · okazja 60 zł · zaczyna być drogo 149 zł · za drogo 225 zł (narzędzie podaje 250 zł, bo bierze wyższą z dwóch środkowych wartości) |
| Ile osób uznaje cenę za „za drogo” | 149 zł: **2/20** · 179 zł: **4/20** · 199 zł: **7/20** |
| Konkurencja, jednorazowa usługa | freelancer 300–800 zł, Lokal360 od 490 zł, Studio72 1 200 zł netto, agencje do 2 500 zł |

**Dlaczego nie 199 zł od razu.** Według panelu 199 zł leży powyżej granicy „za drogo” (PME 179 zł). Soczewka Offers w zarządzie chce jednak testu 199 zł (`board.md`, warunek 3). Prawdziwi kupujący rozstrzygną to lepiej niż panel, więc w teście grudniowym co drugi pokazany wynik dostaje cenę 179 zł albo 199 zł. Szczegóły w punkcie 4.

## 2. Ceny nie naprawią marży. Naprawi ją czas pracy

| Scenariusz czasu pracy (`cfo.md`) | Cena | Wkład na zlecenie | Próg | Zysk w 1. roku |
|---|---|---:|---:|---:|
| Dziś: 242,5 min na zlecenie | 149 zł | −121,36 zł | nigdy | −14 276 zł |
| Dziś | 179 zł | −96,97 zł | nigdy | −12 202 zł |
| Dziś | 199 zł | −80,71 zł | nigdy | −10 820 zł |
| Cel: 95 min (5 sprawdzeń × 5 min, naprawa 45 min, telefon 10, kontrola 15) | 149 zł | 26,14 zł | 13 / mies. | −1 738 zł |
| Cel | 169 zł | 42,40 zł | 8 / mies. | −356 zł |
| Cel | **179 zł** | **50,53 zł** | **7 / mies.** | **335 zł** |
| Cel | 199 zł | 66,79 zł | 5 / mies. | 1 717 zł |

Przy dzisiejszym czasie pracy cena musiałaby wynosić ok. 299 zł brutto (243,09 zł netto), żeby zlecenie przestało tracić. To daleko poza zakresem z panelu. **Najpierw trzeba skrócić czas (`ops.md`), a dopiero potem podnosić cenę.** W scenariuszu celu 179 zł to najniższa przetestowana cena, przy której 1. rok wychodzi na plus.

## 3. Drabinka

| Szczebel | Cena | Po co klient wchodzi wyżej |
|---|---|---|
| Sprawdzenie | 0 zł | Wynik ze źródłem i datą albo „wszystko się zgadza”. Także instrukcja „poprawię sam” za darmo |
| Naprawa | 149 zł (test 179/199 zł) | Nie robi tego sam, akceptuje w 5 min, dostaje teczkę przed/po i kontrolę po 30 dniach |
| **Trudna sprawa** (propozycja) | **349 zł**: duplikat wizytówki albo zmiana wprowadzona przez Google, która wraca · **449 zł**: odzyskanie dostępu albo przejęty profil | Sprawy, których właściciel sam nie załatwi. Cena stała przed startem; jeśli trwa dłużej, ryzyko jest nasze. Nie udało się = nie płacisz |
| Opieka (później) | 49 zł/mies., tylko z powodem | Wraca dopiero po 20 opłaconych naprawach (`board.md`, warunek 9) |

**Jak powstały ceny trudnych spraw.** 349 i 449 zł to ok. 4,7 i 6 h pracy przy 60 zł/h netto (283,74 i 365,04 zł netto). Obie ceny są poniżej typowych widełek freelancera (300–800 zł netto lub brutto, zależnie od oferty). To hipoteza do testu, nie zmierzony koszt. Warunek zarządu nr 5: ceny trzeba opublikować do 18.01.2027.

## 4. Oferta otwarcia i test

**Oferta otwarcia, bez rabatu i bez przekreślonej ceny:** pierwsze 10 sklepów od partnera dostaje do 31.01.2027 kartkę na drzwi z godzinami świątecznymi i przypomnienie przed Wielkanocą (28.03.2027; Wielka Sobota 27.03, handel do 14:00). Pilność jest prawdziwa: limit zleceń w miesiącu, bo pracuje jedna osoba.

**Test cen w grudniu.** Na karcie wyniku ceny zmieniają się na przemian: kolejne pokazane wyniki dostają 149 zł, 179 zł, 149 zł, 199 zł i tak dalej. Narzędzie „Karta sprawdzenia” w panelu opiekuna (`index.html`) zapisuje, jaką cenę pokazano i czy klient kupił. Reguła na 21.12: wybieramy najwyższą cenę, przy której konwersja nie spada o więcej niż połowę względem 149 zł. Przy małej próbie (≥ 10 wyników) to wskazówka, nie statystyka.

## 5. Obiekcje cenowe z panelu, dosłownie

1. „Darmowe sprawdzenie zrobię chętnie, bo nic nie kosztuje. Ale jak mi pokażecie, że godziny w Google i na Facebooku się różnią, to sam to poprawię wieczorem w kwadrans, a 149 zł zostanie w kasie.” (P003)
2. „149 zł za poprawki w Google, których efektu nie zobaczę w kasie, to dla mnie wydatek bez dowodu.” (P002)
3. „Najwyżej wpiszę ten NIP za darmo z ciekawości, ale 149 zł obcej firmie bez pytania centrali nie zapłacę.” (P007)

Odpowiedź marketingu (`marketing.md`, część „Sklep w porządku”): „poprawię sam” to uczciwa opcja, więc dajemy darmową instrukcję. Płatna jest robota, której nie chce się robić wieczorem, oraz sprawy, których nie da się zrobić w kwadrans.
