# Sklep w porządku (raportfirmy.pl) · Business plan

**Verdict: Not yet**

_Kwoty w zł netto; kalkulator liczy w miesiącach, więc „w miesiącu” zastępuje „a day” narzędzia. Werdykt i liczby bez zmian z `compile.py`._

- ✗ Each zlecenie LOSES 121.36 zł before fixed costs.
- ✗ Year 1 operating LOSS: 14,276 zł.
- ✗ Break-even is never reached zleceń w miesiącu against a capacity of 10.
- ✗ 0 of 20 simulated buyers buy (0%, the bar is 25%).

| key number | |
| --- | ---: |
| Price | 121.14 zł za zlecenie |
| Profit margin at plan | -127% per zlecenie |
| Break-even | never zleceń w miesiącu |
| Year 1 operating profit | -14,276 zł |
| Startup spend | 1,700 zł |
| Cash needed before it pays for itself | 15,976 zł |
| Startup money earned back | not in year 1 |
| Buyer panel | 0 buy · 20 pass |

## The idea

- **Co to jest:** darmowe sprawdzenie, co klienci widzą o małym sklepie stacjonarnym w Google i na Facebooku (12 pól, każde ze źródłem i datą), a jeśli coś się nie zgadza, naprawa za właściciela, płatna dopiero po wykonaniu.
- **Dla kogo:** właściciel małego sklepu stacjonarnego w Polsce: niezależny spożywczy, pod szyldem sieci albo specjalistyczny. Pracuje 12 godzin za ladą i ufa swojej księgowej.
- **Co i za ile:** sprawdzenie 0 zł; naprawa 149 zł brutto (test 179 i 199 zł); trudne sprawy w stałej cenie 349 / 449 zł (propozycja). Abonament dopiero po 20 opłaconych naprawach.
- **Gdzie i jak:** jedna okolica; klienci przychodzą przez partnera (biuro rachunkowe, hurtownia) i wizyty osobiste z kartą wyniku. Usługę robi jedna osoba z imieniem i telefonem, w roli menedżera profilu, bez haseł.
- **Budżet i ograniczenia:** 200 zł na eksperymenty; ok. 1 700 zł potrzebne przed startem; jedna osoba; test na 30 prawdziwych sklepach do 20.12.2026, start 18.01.2027. Pełny zarys: `ZARYS-APLIKACJI.md`.

## Summary

**Werdykt: Not yet.** Muszą się zmienić dwie rzeczy, a trzecią trzeba udowodnić:
1. **Czas pracy:** z 242,5 do ok. 95 minut na opłacone zlecenie. Sprawdzenie ma trwać 5 min zamiast 15, przypadać 5 na jedno zlecenie zamiast 10, a naprawa ma zająć 45 min. Procedura jest w `ops.md`, narzędzie w aplikacji.
2. **Forma działalności:** działalność nierejestrowana albo zwolnienie z VAT. Wtedy 149 zł zostaje w całości i nie ma kosztu biura rachunkowego. Decyzję podejmuje księgowy (`ops.md`, punkt 5).
3. **Prawdziwi kupujący zamiast panelu:** ≥ 3 opłacone zlecenia z ≥ 10 pokazanych wyników do 20.12.

Jeśli spełnione są punkty 1 i 2, kalkulator zalicza wszystkie trzy kontrole liczbowe: +54 zł na zlecenie, próg 1 zlecenie w miesiącu, +4 230 zł w 1. roku. Nie zalicza jedynie symulowanego panelu. Ten wynik obali tylko punkt 3.

**Co to jest.** RaportFirmy.pl za darmo sprawdza, co klienci widzą o małym sklepie w Google i na Facebooku. Jeśli coś się nie zgadza, poprawia to za właściciela za 149 zł, płatne po wykonaniu. Klient to właściciel małego sklepu stacjonarnego, do którego dochodzimy przez jego biuro rachunkowe albo hurtownię.

**Trzy liczby dzisiaj** (`cfo.md`, godzina CEO po 60 zł, z VAT): **−121,36 zł** na zlecenie (marża −127% przy limicie 10 w miesiącu), próg rentowności **nie istnieje**, 1. rok **−14 276 zł**.

**Zarząd, panel i rynek.** Zarząd głosował **3 × FUND IF, średnio 4,3/10**. Wszystkie trzy soczewki zgodziły się co do dwóch ryzyk: czas pracy zjada marżę, a sprzedaż zależy od tego, ile prawdziwych sklepów ma błąd. Różnią się co do ceny (Offers chce 199 zł, panel stawia granicę na 179 zł) i co do źródła przewagi (Monopoly widzi ją w wyłącznym partnerze, Product w zawężeniu oferty). W panelu kupiło **0 z 20**, ale tylko 2 z 20 uznało 149 zł za za drogo, a 15 z 20 zapłaciłoby po zobaczeniu błędu u siebie. Konkurencja (`competitors.md`) bierze 300–2 500 zł z góry i obiecuje klientów. Nikt nie sprzedaje „najpierw dowód, płatność po wykonaniu”. Luka jest jednak wąska, bo właściciel może poprawić błąd sam, za darmo.

**Największe ryzyko** to odsetek prawdziwych sklepów z rozbieżnością. Poniżej 15% nie ma startu. Zmierzy go test, a zakładka „Test 30 sklepów” w aplikacji liczy wszystkie warunki zarządu na bieżąco.

**Czego potrzebujesz, żeby zacząć:** ok. **1 700 zł** (1 500 zł na dokumenty prawne, szacunek; 200 zł na druk i spotkania), rozmowy z księgowym o formie i VAT oraz partnera z ≥ 50 sklepami w okolicy, z prowizją ≤ 25 zł za opłacone zlecenie (`marketing.md`, A5).

**W tym tygodniu:** do 22.11 zrób 30 sprawdzeń w zakładce „Test 30 sklepów” (`index.html#test`) ze stoperem i po każdym dniu pobierz CSV. Do tego jedno pytanie do księgowego: czy ta usługa może iść w działalności nierejestrowanej albo ze zwolnieniem z VAT.

_Panel to symulowani kupujący, a liczby to projekcje z wejść w `cfo-sources.md`. Potwierdzają je dopiero prawdziwi klienci i prawdziwe oferty. To nie jest porada finansowa, prawna ani podatkowa._

## What the board said

Trzy soczewki to streszczenia opublikowanych ram (Offers, Monopoly, Product), a nie głosy ich autorów. Memo są w `board/`, a materiał wejściowy w `board/brief.md`.

### 1. Głosowanie

**3 × FUND IF, średnia 4,3/10** (Offers 4, Monopoly 4, Product 5). Nikt nie głosował „pass”, ale nikt też nie dał więcej niż 5. Zarząd mówi: „jeszcze nie wiadomo, sprawdźcie to w grudniu”.

### 2. Ryzyka wskazane przez więcej niż jedną soczewkę

| Ryzyko | Kto je wskazał | Liczba z paczki |
|---|---|---|
| **Czas pracy zjada marżę.** 242,5 min na opłacone zlecenie, w tym 150 min darmowych sprawdzeń | wszystkie trzy | −121,36 zł na zleceniu przy 60 zł/h; ok. 30 zł/h bez wyceny czasu |
| **Ból jest rzadki, dopóki właściciel nie zobaczy błędu.** Wszystko zależy od odsetka prawdziwych rozbieżności | wszystkie trzy | 0/20 kupuje; 10/20 „sam poprawię w kwadrans”; 15/20 zapłaci, gdy zobaczy błąd |
| **Zaufanie i łatwość kopiowania.** Kategoria ma złą opinię, a usługę łatwo powtórzyć | Offers, Monopoly | 7/20 odmawia z braku zaufania; nie ma technologii ani efektu sieci |
| **Sklepy sieciowe dostają mniej.** Część pól ustala centrala | Monopoly, Product | ok. 30% grupy docelowej; 3/20 „centrala to robi” |

Tylko soczewka Product wskazała **liczbę przekazań na ścieżce** (partner → karta → dodanie menedżera → zmiany → akceptacja → kontrola). Każde przejście gubi klientów, a nikt nie mierzy, ilu.

### 3. Warunki: lista do odhaczenia

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

### 4. Gdzie się różnią

- **Cena.** Offers uważa, że 149 zł to za mało, i chce testu 199 zł, bo mediana „za drogo” to 225 zł. Monopoly i Product nie traktują ceny jako głównej dźwigni. Dla nich liczą się kanał i skupienie.
- **Fosa.** Monopoly widzi jedyną trwałą przewagę w wyłącznym partnerze i rejestrze metod, który z czasem skraca sprawdzenie. Offers szuka jej w ofercie (gwarancja, bonusy), a Product w rzemiośle i doświadczeniu.
- **Zakres.** Product chce wyciąć wszystko poza naprawą (warunek 9). Offers proponuje coś dołożyć tanim kosztem, np. kartę godzin świątecznych na drzwi albo przypomnienie przed kolejnymi świętami.

### 5. Najmocniejsza wersja tego biznesu, jaką widzi zarząd

To nie jest dokładnie to, co jest w pitchu. **Produktem jest sprawdzenie, a nie naprawa.** Biuro rachunkowe albo hurtownia z co najmniej 50 sklepami w jednej okolicy pokazuje swoim klientom wynik sprawdzenia: konkretną rozbieżność ze źródłem i datą albo „wszystko się zgadza”. Sprawdzenie trwa 5 minut, bo robi je lista kontrolna z narzędziem, a nie 15 minut ręcznej pracy. Płatna naprawa kosztuje tyle, żeby przy wycenionym czasie się opłacała (prawdopodobnie 199 zł). Pieniądze robią trudne sprawy, których właściciel sam nie załatwi (duplikat, przejęty profil, odzyskanie dostępu), za stałe, opublikowane ceny. Wszystko inne, czyli abonament, raport i KSeF, czeka na 20 opłaconych napraw. W tej wersji fosą jest kanał i rejestr metod, a nie technologia.

## The competition

**Ograniczenie, które trzeba znać.** Środowisko, w którym to powstało, blokowało pobieranie stron. Wszystkie fakty pochodzą więc z wyników wyszukiwarki (tytuł, adres i krótkie streszczenie), a nie z przeczytanych stron. Nie przeczytałem też żadnych opinii klientów konkurencji. Każdą cenę sprawdź na stronie, zanim się na nią powołasz. Pełna tabela jest w `competitors.csv`.

### 1. Kto już to robi

| Nazwa | Typ | Cena porównywalnej usługi | Co sprzedaje | Źródło |
|---|---|---|---|---|
| Właściciel sam, w Profilu Firmy w Google | substytut | 0 zł | edycja godzin, w tym świątecznych; odrzucanie zmian sugerowanych przez Google | [pomoc Google](https://support.google.com/business/answer/14368911?hl=pl) |
| Centrala lub opiekun sieci | substytut | 0 zł w ramach sieci | wizytówka szyldu | panel-v2 (symulacja, brak źródła publicznego) |
| Freelancerzy | bezpośredni | 300–800 zł jednorazowo (najniższe 100–500 zł) | założenie i optymalizacja | [konkurometr.pl](https://konkurometr.pl/blog/wizytowka-google-ile-kosztuje), [zuczkowski.com.pl](https://zuczkowski.com.pl/ile-kosztuje-wizytowka-google-cennik-2026/) |
| Lokal360 | bezpośredni | od 490 zł | profesjonalny setup | [lokal360.pl](https://lokal360.pl/przewodniki/wizytowka-google/) |
| Studio72 | bezpośredni | 1 200 zł netto | jednorazowa optymalizacja | [studio72.net](https://studio72.net/blog/pozycjonowanie-wizytowki-google-prawdy-i-mity/) |
| Agencje SEO lokalnego | bezpośredni | 500–2 500 zł jednorazowo, obsługa 300–1 500 zł/mies. | optymalizacja i stała obsługa | [kcmobile.pl](https://kcmobile.pl/artykuly/ile-kosztuje-wizytowka-google-cennik-2026/) |
| Ogłoszenia na Allegro Lokalnie | bezpośredni | nieznana (strona niedostępna) | „pozycjonowanie wizytówki” | [allegrolokalnie.pl](https://allegrolokalnie.pl/oferta/pozycjonowanie-wizytowki-google-moja-firma) |
| Localo | pośredni (narzędzie do samodzielnej pracy) | 39 USD/mies. rocznie, 49 USD miesięcznie | aplikacja do wizytówki i SEO lokalnego | [toolradar](https://toolradar.com/tools/localo/pricing), [frontdeskreview](https://frontdeskreview.com/software/local-seo-tools/localo/) |
| NapoleonCat (polska firma) | pośredni | od 89 USD/mies. rocznie (Pro) | opinie i posty dla wielu wizytówek | [napoleoncat.com](https://napoleoncat.com/pl/google-my-business/) |
| Semrush Local | pośredni | 30 USD/mies. (źródło nieoficjalne) | dane lokalne | [frontdeskreview](https://frontdeskreview.com/software/local-seo-tools/localo/) |
| Telefoniczni „sprzedawcy wizytówek” | psują zaufanie do całej kategorii | ok. 400 zł za „przedłużenie widoczności” | opłata za coś, co w Google jest darmowe | [antyweb.pl](https://antyweb.pl/google-moja-firma-oszusci), [telepolis.pl](https://www.telepolis.pl/wiadomosci/735816907-nieznany-numer-kto-dzwoni-google), [pro.rp.pl](https://pro.rp.pl/prawo-w-firmie/art1876651-umowa-zawarta-przez-telefon-moze-firme-sporo-kosztowac) |

### 2. Ceny jednorazowej usługi

- **Najniżej:** 100–500 zł, najtańsze oferty według poradników.
- **Typowo:** 300–800 zł u freelancera; konkretne oferty to 490 zł (Lokal360) i 1 200 zł netto (Studio72).
- **Najwyżej:** 2 500 zł w agencji.

**149 zł brutto plasuje się na samym dole rynku**, poniżej typowych widełek. W panelu-v2 mediana „za drogo” wyniosła 225 zł. Cena nie jest więc barierą. Raczej może wyglądać podejrzanie tanio, co przy złej reputacji kategorii jest ryzykiem.

### 3. Mapa pozycji

Dwie osie, które liczą się dla właściciela sklepu: **kto wykonuje pracę** (ja sam ↔ ktoś za mnie) i **co obiecują** (poprawne dane ↔ wyższa pozycja w Google i więcej klientów).

```
                    obiecują pozycję i klientów
                              │
       Localo, Semrush        │     agencje SEO (500–2 500 zł + abonament)
       (39–49 USD/mies.)      │     Studio72 (1 200 zł), Lokal360 (od 490 zł)
                              │     freelancerzy, Allegro (100–800 zł)
  ja sam ─────────────────────┼───────────────────────────── za mnie
                              │
       Google sam (0 zł)      │     ► Sklep w porządku (149 zł, płatne po wykonaniu,
       centrala sieci (0 zł)  │       „wszystko się zgadza” bez oferty)
                              │
                       obiecują poprawne dane
```

### 4. Na co narzekają kupujący

Opinii klientów konkurencji nie przeczytałem, bo strony były niedostępne. Ten punkt trzeba uzupełnić. Wyniki wyszukiwania pokazują jeden wyraźny i dobrze udokumentowany wątek:

1. **Telefony od firm, które podszywają się pod Google i każą płacić za darmową wizytówkę.** Wspomina o nich kilka niezależnych źródeł ([antyweb.pl](https://antyweb.pl/google-moja-firma-oszusci), [telepolis.pl](https://www.telepolis.pl/wiadomosci/735816907-nieznany-numer-kto-dzwoni-google), [pro.rp.pl](https://pro.rp.pl/prawo-w-firmie/art1876651-umowa-zawarta-przez-telefon-moze-firme-sporo-kosztowac)). Jest też [Interia](https://geekweek.interia.pl/bezpieczenstwo/news-jeden-numer-na-150-wizytowkach-oszusci-opanowali-mapy-google,nId,23550166) o fałszywych numerach telefonu podmienianych na wizytówkach. Część artykułów jest starsza. Ten wątek tłumaczy, skąd w panelu wzięło się zdanie „takich od wizytówek Google miałem już kilku”.
2. **Płacenie za „pozycjonowanie” bez mierzalnego efektu.** To tylko wątek z poradników, za mało źródeł. Do potwierdzenia w opiniach.

### 5. Luka

Na podstawie tego, co dało się znaleźć: **nikt nie sprzedaje „naprawy konkretnego błędu, płatnej po wykonaniu”, z darmową diagnozą, która potrafi powiedzieć „wszystko się zgadza”.** Konkurencja sprzedaje „optymalizację” albo „pozycjonowanie”, z góry i z obietnicą wyników. Sklep w porządku sprzedaje odwrotnie:

- dowód przed zapłatą: jest konkretna rozbieżność, ze źródłem i datą;
- zero ryzyka: płaci się po wykonaniu, a jak się nie uda, nie płaci się wcale;
- spójność Google i Facebooka, a nie tylko Google;
- dostęp przez kogoś, komu sklep już ufa (biuro rachunkowe, hurtownia), a nie przez telefon.

Ta luka jest jednak wąska. Właściciel, który zobaczy błąd, może go poprawić sam za darmo (substytut za 0 zł), co w panelu zrobiło 10 z 20 osób. **Wartość leży więc w diagnozie i w zdjęciu z głowy pracy, a nie w samej poprawce.** Najmocniejszy kawałek oferty to sprawy, których właściciel sam nie zrobi: duplikat, przejęty profil, odzyskanie dostępu, zmiany wprowadzane przez Google bez jego wiedzy.

### 6. Kto może skopiować najszybciej

- **Freelancerzy i agencje** mogą jutro wystawić pakiet „poprawa danych za 149 zł”. Nie mają jednak kanału przez biura rachunkowe ani zasady „płacisz po wykonaniu”. Obroną są partner, rejestr metod i reputacja jednej, podpisanej osoby.
- **Localo i podobne narzędzia** mogą zautomatyzować przypomnienie o godzinach świątecznych, bo API Profilu Firmy obsługuje godziny niestandardowe. To zagrożenie dla przyszłego abonamentu „Opieka”, nie dla jednorazowej naprawy.
- **Sam Google** może przypominać właścicielom o godzinach świątecznych. Nie sprawdzałem, czy i jak robi to w Polsce. To otwarte pytanie, które może zmniejszyć liczbę rozbieżności znalezionych w grudniowym teście.

_Źródła z dostępem tylko przez wyszukiwarkę. To nie jest porada prawna._

## The buyer panel

**0 buy · 20 pass** (0% buy) out of 20 simulated buyers. Seed 483380, so the same cards can be dealt again.

These are simulated buyers, not customers. Use this to find objections and weak spots, then confirm the big ones with real people before you spend.

### By segment

| group | buyers | buy rate |
| --- | ---: | ---: |
| Sklep pod szyldem sieci franczyzowej lub partnerskiej (np. sieć hurtowni) | 6 | 0%  (thin) |
| Specjalistyczny sklep niespożywczy (np. zoologiczny, papierniczy, ogrodniczy, odzieżowy) | 6 | 0%  (thin) |
| Niezależny sklep spożywczy (bez szyldu sieci) | 8 | 0% |

### By buying behaviour

| group | buyers | buy rate |
| --- | ---: | ---: |
| Sceptyk wobec abonamentów i AI | 3 | 0%  (thin) |
| Patrzy w program sklepowy | 2 | 0%  (thin) |
| Liczy każdy stały koszt | 3 | 0%  (thin) |
| Ufa księgowej i centrali | 3 | 0%  (thin) |
| Robię wszystko sam | 5 | 0%  (thin) |
| Kupuje z polecenia | 2 | 0%  (thin) |
| Sam ogarnia internet | 2 | 0%  (thin) |

### By income

| group | buyers | buy rate |
| --- | ---: | ---: |
| 71,000 zł to 102,000 zł | 7 | 0%  (thin) |
| 102,000 zł and up | 7 | 0%  (thin) |
| under 71,000 zł | 6 | 0%  (thin) |

### Why they pass

| reason | buyers | in their words |
| --- | ---: | --- |
| need | 10 | "Moi klienci to w większości stali bywalcy z okolicy, znają godziny i dzwonią, jak czegoś nie wiedzą. Może wpiszę ten NIP z ciekawości, ale 149 zł za poprawki w Google, których efektu nie zobaczę w kasie, to dla mnie wydatek bez dowodu." (P002) · "Darmowe sprawdzenie zrobię chętnie, bo nic nie kosztuje. Ale jak mi pokażecie, że godziny w Google i na Facebooku się różnią, to sam to poprawię wieczorem w kwadrans, a 149 zł zostanie w kasie. Sami piszecie, że nie obiecujecie więcej klientów, więc nie widzę, za co konkretnie mam zapłacić." (P003) |
| trust | 7 | "Takich od wizytówek Google miałem już kilku i każdy zaczynał od 'za darmo'. Do tego jestem pod szyldem sieci, więc profil i tak w dużej części ogarnia centrala; może wpiszę ten NIP z ciekawości, ale 149 zł i dawanie komuś obcemu dostępu menedżera do mojego Facebooka to nie w tym tygodniu." (P001) · "Nikt z moich znajomych sklepikarzy tego nie używał ani mi nie polecił, a ja nie wpuszczam obcej firmy jako menedżera do mojego Google i Facebooka tylko dlatego, że wyskoczyła mi reklama. Ewentualnie wieczorem wpiszę NIP w ten darmowy krok, ale za 149 zł na razie nie zapłacę." (P006) |
| habit | 3 | "U mnie takimi rzeczami jak wizytówka w Google zajmuje się centrala albo opiekun z sieci, i jak coś nie gra, to do nich dzwonię. Nie będę wpuszczać obcej firmy jako menedżera mojego profilu, póki opiekun mi tego nie poleci." (P004) · "Ja takie rzeczy załatwiam przez opiekuna z sieci, a centrala i tak pilnuje szyldu i wizytówki w Google. Najwyżej wpiszę ten NIP za darmo z ciekawości, ale 149 zł obcej firmie bez pytania centrali nie zapłacę." (P007) |

### Why they buy

| reason | buyers | in their words |
| --- | ---: | --- |

### What would flip a no

- Gdyby darmowy raport pokazał czarno na białym, że w Google mam złe godziny albo telefon i klienci przez to odchodzą, a centrala albo inny sklep z naszej sieci potwierdził, że z nimi współpracował.
- Gdyby darmowe sprawdzenie pokazało czarno na białym, że w Google mam złe godziny albo stary telefon i ludzie przez to odbijają się od zamkniętych drzwi, wtedy zapłaciłbym, żeby ktoś to za mnie załatwił.
- Gdyby sprawdzenie pokazało dużo więcej niż jedną złą godzinę, np. że klienci dzwonią pod stary numer albo Google pokazuje, że sklep jest zamknięty, i do tego konkretny przykład podobnego sklepu, któremu po poprawkach przybyło telefonów albo wyznaczeń trasy. Wtedy 149 zł płatne po zrobieniu bym rozważył.
- Gdyby to polecił mój opiekun z sieci albo centrala powiedziała, że to u nich sprawdzone i dozwolone.
- Gdyby darmowe sprawdzenie zajęło minutę i pokazało czarno na białym, że Google podaje złe godziny albo stary telefon, wtedy zapłaciłabym te 149 zł, żeby mieć to z głowy.
- Gdyby znajomy właściciel sklepu z okolicy powiedział mi, że mu to zrobili, było dobrze i nikt potem nie dzwonił z ofertami.
- Gdyby centrala albo moja księgowa poleciła tę usługę i potwierdziła, że mogę ją zlecić, a darmowe sprawdzenie pokazało czarno na białym, że klienci widzą u mnie złe godziny albo zły telefon.
- Gdyby polecił mi to ktoś znajomy, np. przedstawiciel z mojej hurtowni albo inny sklepikarz, który to zrobił i u którego nic złego się nie stało.
- Gdyby moja księgowa albo biuro rachunkowe to poleciło i powiedziało, że sprawdziło tych ludzi, i gdyby darmowe sprawdzenie pokazało czarno na białym, że w Google mam złe godziny i tracę przez to klientów.
- Gdyby darmowy raport pokazał rzeczy, których sama nie umiem znaleźć ani poprawić, np. że Google sam podmienia mi dane albo że jest zduplikowana wizytówka, której nie mogę usunąć.
- Gdyby darmowe sprawdzenie pokazało czarno na białym, że w Google stoją u mnie złe godziny albo stary numer i klienci przez to idą gdzie indziej, a centrala potwierdziła, że mogę to zlecić.
- Gdyby darmowe sprawdzenie pokazało czarno na białym, że w Google mam złe godziny albo stary telefon i ktoś przez to do mnie nie trafił, a ktoś znajomy z branży potwierdził, że z nimi robił i było uczciwie.

20 buyers gave all four price answers. Run founder-pricing's van_westendorp.py on the answers folder.

## Pricing

Ceny brutto, chyba że zaznaczono „netto” (VAT 23%). Podstawy: odpowiedzi cenowe 20 symulowanych kupujących z panelu oferty za 149 zł (`panel-v2/answers`, wynik w `pricing-curve-uslugi.md`), ceny konkurencji (`competitors.md`) i kalkulator CFO (`numbers.json`). Symulowane odpowiedzi pokazują, co warto testować. Dowodem nie są. Cennik Skanera jest w `pricing-skaner.md`.

### 1. Cena: 149 zł zostaje w teście, a 179 zł testujemy obok

| | |
|---|---|
| Akceptowalny zakres (panel) | **40–179 zł** (PMC/OPP 40 zł, IPP 81 zł, PME 179 zł) |
| Mediany odpowiedzi | za tanio 30 zł · okazja 60 zł · zaczyna być drogo 149 zł · za drogo 225 zł (narzędzie podaje 250 zł, bo bierze wyższą z dwóch środkowych wartości) |
| Ile osób uznaje cenę za „za drogo” | 149 zł: **2/20** · 179 zł: **4/20** · 199 zł: **7/20** |
| Konkurencja, jednorazowa usługa | freelancer 300–800 zł, Lokal360 od 490 zł, Studio72 1 200 zł netto, agencje do 2 500 zł |

**Dlaczego nie 199 zł od razu.** Według panelu 199 zł leży powyżej granicy „za drogo” (PME 179 zł). Soczewka Offers w zarządzie chce jednak testu 199 zł (`board.md`, warunek 3). Prawdziwi kupujący rozstrzygną to lepiej niż panel, więc w teście grudniowym co drugi pokazany wynik dostaje cenę 179 zł albo 199 zł. Szczegóły w punkcie 4.

### 2. Ceny nie naprawią marży. Naprawi ją czas pracy

| Scenariusz czasu pracy (`cfo.md`) | Cena | Wkład nza zlecenie | Próg | Zysk w 1. roku |
|---|---|---:|---:|---:|
| Dziś: 242,5 min nza zlecenie | 149 zł | −121,36 zł | nigdy | −14 276 zł |
| Dziś | 179 zł | −96,97 zł | nigdy | −12 202 zł |
| Dziś | 199 zł | −80,71 zł | nigdy | −10 820 zł |
| Cel: 95 min (5 sprawdzeń × 5 min, naprawa 45 min, telefon 10, kontrola 15) | 149 zł | 26,14 zł | 13 / mies. | −1 738 zł |
| Cel | 169 zł | 42,40 zł | 8 / mies. | −356 zł |
| Cel | **179 zł** | **50,53 zł** | **7 / mies.** | **335 zł** |
| Cel | 199 zł | 66,79 zł | 5 / mies. | 1 717 zł |

Przy dzisiejszym czasie pracy cena musiałaby wynosić ok. 299 zł brutto (243,09 zł netto), żeby zlecenie przestało tracić. To daleko poza zakresem z panelu. **Najpierw trzeba skrócić czas (`ops.md`), a dopiero potem podnosić cenę.** W scenariuszu celu 179 zł to najniższa przetestowana cena, przy której 1. rok wychodzi na plus.

### 3. Drabinka

| Szczebel | Cena | Po co klient wchodzi wyżej |
|---|---|---|
| Sprawdzenie | 0 zł | Wynik ze źródłem i datą albo „wszystko się zgadza”. Także instrukcja „poprawię sam” za darmo |
| Naprawa | 149 zł (test 179/199 zł) | Nie robi tego sam, akceptuje w 5 min, dostaje teczkę przed/po i kontrolę po 30 dniach |
| **Trudna sprawa** (propozycja) | **349 zł**: duplikat wizytówki albo zmiana wprowadzona przez Google, która wraca · **449 zł**: odzyskanie dostępu albo przejęty profil | Sprawy, których właściciel sam nie załatwi. Cena stała przed startem; jeśli trwa dłużej, ryzyko jest nasze. Nie udało się = nie płacisz |
| Opieka (później) | 49 zł/mies., tylko z powodem | Wraca dopiero po 20 opłaconych naprawach (`board.md`, warunek 9) |

**Jak powstały ceny trudnych spraw.** 349 i 449 zł to ok. 4,7 i 6 h pracy przy 60 zł/h netto (283,74 i 365,04 zł netto). Obie ceny są poniżej typowych widełek freelancera (300–800 zł netto lub brutto, zależnie od oferty). To hipoteza do testu, nie zmierzony koszt. Warunek zarządu nr 5: ceny trzeba opublikować do 18.01.2027.

### 4. Oferta otwarcia i test

**Oferta otwarcia, bez rabatu i bez przekreślonej ceny:** pierwsze 10 sklepów od partnera dostaje do 31.01.2027 kartkę na drzwi z godzinami świątecznymi i przypomnienie przed Wielkanocą (28.03.2027; Wielka Sobota 27.03, handel do 14:00). Pilność jest prawdziwa: limit zleceń w miesiącu, bo pracuje jedna osoba.

**Test cen w grudniu.** Na karcie wyniku ceny zmieniają się na przemian: kolejne pokazane wyniki dostają 149 zł, 179 zł, 149 zł, 199 zł i tak dalej. Narzędzie „Karta sprawdzenia” w panelu opiekuna (`index.html`) zapisuje, jaką cenę pokazano i czy klient kupił. Reguła na 21.12: wybieramy najwyższą cenę, przy której konwersja nie spada o więcej niż połowę względem 149 zł. Przy małej próbie (≥ 10 wyników) to wskazówka, nie statystyka.

### 5. Obiekcje cenowe z panelu, dosłownie

1. „Darmowe sprawdzenie zrobię chętnie, bo nic nie kosztuje. Ale jak mi pokażecie, że godziny w Google i na Facebooku się różnią, to sam to poprawię wieczorem w kwadrans, a 149 zł zostanie w kasie.” (P003)
2. „149 zł za poprawki w Google, których efektu nie zobaczę w kasie, to dla mnie wydatek bez dowodu.” (P002)
3. „Najwyżej wpiszę ten NIP za darmo z ciekawości, ale 149 zł obcej firmie bez pytania centrali nie zapłacę.” (P007)

Odpowiedź marketingu (`marketing.md`, część „Sklep w porządku”): „poprawię sam” to uczciwa opcja, więc dajemy darmową instrukcję. Płatna jest robota, której nie chce się robić wieczorem, oraz sprawy, których nie da się zrobić w kwadrans.

## The offer

### Oferta v3, obowiązująca (20.11.2026)

Powstała z v2 (niżej) po panelu, zarządzie (`board.md`), konkurencji (`competitors.md`), cenach (`pricing.md`) i operacjach (`ops.md`). Najważniejsza zmiana: **wartością jest dowód przed zapłatą i zdjęcie pracy z głowy, a nie sama poprawka.** Zmienia się też kolejność: najpierw darmowy wynik, potem cena.

| Element | Co klient dostaje | Koszt dla nas (cel z `ops.md`) | Status |
|---|---|---|---|
| **Sprawdzenie** | 12 pól w Google i na Facebooku, każde ze źródłem i datą; karta wyniku do ręki; „wszystko się zgadza” bez oferty | 5 min | rdzeń, 0 zł |
| **Naprawa** | zmiany za właściciela, akceptacja w 5 min, teczka przed/po | 45 min + 10 min telefonu | rdzeń, **149 zł** (test 179 i 199 zł) |
| **Gwarancja** | nic nie znaleźliśmy = nic nie płacisz; nie udało się = nie płacisz; płatność po wykonaniu | ryzyko po naszej stronie | rdzeń |
| **Kontrola po 30 dniach** | sprawdzamy, czy Google nie zmienił danych | 15 min | bonus |
| **Instrukcja „poprawię sam”** | za darmo, gdy właściciel woli sam | 0 (szablon) | bonus; odpowiedź na P003 |
| **Trudna sprawa** | duplikat, przejęty profil, odzyskanie dostępu; stała cena przed startem | do 6 h | **349 / 449 zł** (propozycja) |
| **Pola centrali** | nie zmieniamy, przygotowujemy zgłoszenie do centrali | 10 min | w cenie naprawy |
| **Oferta otwarcia** | pierwsze 10 sklepów od partnera: kartka na drzwi z godzinami świątecznymi i przypomnienie przed Wielkanocą (28.03.2027) | druk | do 31.01.2027 |
| Usunięte z v2 | 5 odpowiedzi na pytania klientów (G), porównanie z 3 sklepami (H) | 40 min | wycięte: za drogie w czasie, nikt w panelu o nie nie prosił |
| Odłożone | opieka (abonament), raport firmy, plan „Biuro”, KSeF | — | do 20 opłaconych napraw (`board.md`, warunek 9) |

**Nazwa i obietnica** (`brand.md`): „Sprawdzamy. Poprawiamy. Płacisz, gdy gotowe.”

**Pilność:** tylko prawdziwa. Limit zleceń w miesiącu (pracuje jedna osoba) i daty z kalendarza: 24–27.12, Wielka Sobota 27.03.2027 (handel do 14:00).

---

## Oferta v1–v2: „Porządek w sieci” (6.11.2026, archiwum)

6 listopada 2026. Metoda: soczewka Offers (streszczenie ramy z *100 złM Offers* A. Hormoziego, nie jego słowa). Materiał wejściowy: panel 20 symulowanych właścicieli sklepów (`panel-v1`), dokumenty projektu 01-PRODUKT, Katalog-produktów-i-obsługa-Google v0.1, Badanie potrzeb v0.1. Brak `numbers.json` (CFO nie był uruchamiany) — koszty poniżej to szacunki minut pracy CEO, nie wyliczenia.

### 1. Wynik

| | Pitch v1: abonament 99 zł/mies. | Pitch v2: „Porządek w sieci” 149 zł jednorazowo |
|---|---|---|
| Kupuje | **0 / 20** | **0 / 20** |
| Powody rezygnacji | potrzeba 10, zaufanie 6, nawyk 3, moment 1 | potrzeba 10, zaufanie 7, nawyk 3 |
| Mediana „za drogo” | 99 zł | 225 zł |
| Ile osób uznaje cenę oferty za „za drogo” | 11 z 20 przy 99 zł | 2 z 20 przy 149 zł |

**Oferta usunęła obiekcję ceny i obiekcję „robotę i tak robię sam” (12 wzmianek o publikacji → 0), ale nie zmieniła decyzji.** Blokada leży gdzie indziej: w poczuciu, że problemu nie ma („klienci to sąsiedzi, znają moje godziny”), i w braku zaufania do nieznanej firmy, której trzeba dać dostęp menedżera.

Najważniejsza obserwacja: **15 z 20 osób pisze, że zapłaciłoby, gdyby darmowy portret pokazał „czarno na białym” konkretny błąd** (złe godziny, stary telefon, „zamknięte” w Google, duplikat wizytówki). Kupujący oceniali pitch bez wiedzy o własnym sklepie, więc z założenia przyjmowali, że błędu nie ma. To znaczy, że o sprzedaży zdecyduje odsetek prawdziwych sklepów, u których portret rzeczywiście coś znajdzie — tego panel nie zmierzy, trzeba to sprawdzić na realnych NIP-ach.

Drugi warunek, powtarzany przez 9 osób: **polecenie przez kogoś zaufanego** — opiekuna z sieci, przedstawiciela hurtowni, księgowej, znajomego sklepikarza.

Ograniczenie: to symulowani kupujący. Dobrze pokazują obiekcje, słabo przewidują konwersję; modele są raczej ugodowe, więc 0% przy dwóch wersjach to mocny sygnał ostrzegawczy, nie ostateczny wynik.

### 2. Lista problemów kupującego (słowami kupującego)

Przed zakupem
1. „Nie wiem, czy w ogóle mam jakiś problem.”
2. „Moi klienci to sąsiedzi, znają godziny.”
3. „Znowu ktoś od wizytówek Google.”
4. „Nie podam NIP-u obcej firmie.”
5. „Kto za tym stoi?”
6. „99 zł co miesiąc za coś, co poprawia się raz.”
7. „Sam to poprawię w kwadrans, jak już będę wiedział co.”
8. „Nie obiecujecie więcej klientów — za co płacę?”
9. „Centrala i tak ustala moje dane / nie wiem, czy mi wolno.”
10. „Księgowa albo sieć zrobią to za darmo.”

W trakcie
11. „Po 12 godzinach w sklepie nie mam siły na kolejną aplikację.”
12. „Nie wiem, jak dodać kogoś jako menedżera.”
13. „Dam dostęp obcemu do mojego Google i Facebooka.”
14. „AI napisze ogólniki, które będę musiał poprawiać.”
15. „I tak sam muszę to wklejać w Google.”

Po zakupie
16. „Zaraz będą dzwonić z kolejnymi ofertami / wcisną abonament.”
17. „Google i tak sam podmieni dane.”
18. „Skąd będę wiedział, że to coś dało?”
19. „Co, jeśli coś zepsują?”
20. „Co, jeśli zapłacę, a nic nie zrobią?”
21. „Jak ich potem usunąć z profilu?”

### 3. Rozwiązania, ocena i decyzja

Wartość 1–5 = jak mocno usuwa obiekcję u panelu. Koszt 1–5 = szacunek pracy/ryzyka; brak danych CFO.

| # | Rozwiązanie | Obiekcje | Wartość | Koszt | Decyzja |
|---|---|---|---:|---:|---|
| A | Darmowy portret pokazuje konkretne rozbieżności, z datą i źródłem; „wszystko w porządku” mówimy wprost | 1, 2, 7, 18 | 5 | 2–3 (zależy od silnika rozpoznania) | **Rdzeń** |
| B | Wykonanie zmian za klienta w Google i na Facebooku przez rolę menedżera | 11, 15 | 4 | 3 (ok. 45–90 min ręcznie) | **Rdzeń** |
| C | Akceptacja gotowych zmian w telefonie, ok. 5 min | 11, 14 | 4 | 1 (W07/W08 są w specyfikacji) | **Rdzeń** |
| D | Jednorazowo, bez abonamentu | 6, 16 | 4 | 1 | **Rdzeń** |
| E | Płatność po zatwierdzeniu i wprowadzeniu zmian | 20, 3 | 4 | 2 (ryzyko nieopłacenia) | **Gwarancja** |
| F | Bezpłatna ponowna kontrola po 30 dniach | 17, 18 | 3 | 1 (ok. 15 min) | **Bonus** |
| G | 5 odpowiedzi na pytania zadawane przez telefon | 14, 8 | 3 | 1 (ok. 20 min, wariant 2 pilota) | **Bonus** |
| H | Jakie informacje podają 3 najbliższe sklepy z branży, a klient nie | 8, 1 | 3 | 2 (ok. 20 min ręcznie, tylko w części płatnej) | **Bonus, do decyzji CEO** |
| I | Najpierw sprawdzamy, co ustala centrala; zmieniamy tylko pola klienta | 9 | 3 | 1 | **Rdzeń** |
| J | Konkretna osoba z imieniem, nazwiskiem i telefonem | 3, 5, 13 | 4 | 1 (CEO) | **Rdzeń, do decyzji CEO** |
| K | „Nie dzwonimy z ofertami, nie przekazujemy danych” | 16, 4 | 3 | 1 | **Rdzeń** |
| L | Instrukcja usunięcia nas z profilu jednym kliknięciem | 21, 13 | 2 | 1 | **Rdzeń** |
| M | Telefoniczne przeprowadzenie przez dodanie menedżera (prośba P015) | 12, 13 | 4 | 2 (ok. 10 min rozmowy) | **Dodać w v3** |
| N | Pomoc przy problemach, których klient nie naprawi sam: duplikat, przejęta wizytówka, auto-zmiany Google (P010, P014, P016) | 7, 10 | 5 | 4 (procesy Google, bez gwarancji terminu) | **Dodać w v3 jako wyróżnik** |
| O | Polecenie przez sieć / hurtownię / biuro rachunkowe | 3, 5, 9, 10 | 5 | 3 (praca handlowa, nie funkcja) | **Kanał — `/founder-marketing`** |
| P | Gwarancja wzrostu sprzedaży lub pozycji w Google | 8 | 4 | — | **Odrzucone: niewykonalne, sprzeczne z zasadami projektu** |
| Q | Prawdziwe opinie innych sklepów | 3, 5 | 4 | — | **Dopiero po pilocie; nie wolno ich wymyślać** |

### 4. Stos oferty v2 (testowany)

- **Nazwa:** „Porządek w sieci”.
- **Rdzeń (rezultat):** klient, który szuka sklepu w Google lub na Facebooku, widzi prawdziwe godziny, adres, telefon, ofertę i sposób zamówienia. Darmowy portret → 149 zł brutto jednorazowo za wykonanie poprawek przez nas, akceptacja w telefonie.
- **Bonusy:** 5 odpowiedzi na pytania z telefonu; porównanie z 3 sklepami z okolicy; kontrola po 30 dniach.
- **Gwarancja:** płatność po zatwierdzeniu i wprowadzeniu zmian; poprawka błędu bez dopłaty; brak problemu = brak oferty.
- **Pilność (prawdziwa):** pilot z ograniczoną liczbą sklepów w miesiącu, bo zmiany robi jedna osoba. Liczbę ustala CEO (wewnętrzny limit przyjmowania spraw z 01-PRODUKT §6).
- **Kontynuacja:** opcjonalna opieka za 99 zł brutto/mies. (cena CEO bez zmian), rezygnacja w każdej chwili.

#### Koszt i gwarancja — co trzeba policzyć (CFO)

- Praca na jedno zlecenie: szacunek 1,5–2,5 h CEO (portret + poprawki + FAQ + porównanie + kontrola po 30 dniach). Przy 149 zł brutto to ok. 60–100 zł brutto za godzinę przed podatkami i prowizją — do potwierdzenia pomiarem w pilocie.
- Ryzyko gwarancji „płacisz po”: koszt = odsetek nieopłaconych zleceń × czas pracy. Bez danych nie podaję liczby; w pilocie mierzyć od pierwszego zlecenia.
- Zasady zwrotu i umowy z jednoosobowym przedsiębiorcą trzeba sprawdzić pod kątem przepisów o „przedsiębiorcy na prawach konsumenta”. To nie jest porada prawna.

### 5. Równanie wartości (1–10)

| Element | v1 | v2 | Co przesuwa ocenę |
|---|---:|---:|---|
| Wymarzony rezultat | 4 | 6 | Rezultat opisany językiem klienta („nie idzie do sklepu obok”); porównanie z 3 sklepami |
| Postrzegane prawdopodobieństwo | 2 | 4 | Płatność po wykonaniu, osoba z nazwiskiem. Nadal brak dowodu i polecenia — **najsłabszy element** |
| Czas do rezultatu | 4 | 7 | Jedno zlecenie zamiast miesięcznego cyklu |
| Wysiłek i poświęcenie | 2 | 7 | Robimy za klienta, 5 min akceptacji; nowy koszt: oddanie dostępu menedżera |

### 6. Wnioski

1. **Problemem nie jest już cena ani format.** 149 zł jednorazowo mieści się w akceptowalnym zakresie u 18 z 20 osób. Abonament 99 zł jako pierwszy produkt odpadł wyraźniej niż usługa jednorazowa.
2. **O sprzedaży decyduje moment po portrecie.** Ofertę trzeba pokazywać dopiero na ekranie z wynikiem konkretnego sklepu („u Ciebie Google pokazuje 8–16, a Facebook 7–18”), a nie w pitchu ogólnym. Panel ocenia pitch bez tej wiedzy, więc z natury zaniża ten wariant — to trzeba zmierzyć na prawdziwych sklepach.
3. **Zaufanie przyjdzie kanałem, nie stroną.** Sieci, hurtownie i biura rachunkowe pojawiają się jako „to by mnie przekonało” w obu wersjach.
4. **Wyróżnik na v3:** sprawy, których właściciel nie załatwi sam w kwadrans — duplikaty, przejęte wizytówki, automatyczne zmiany Google, odzyskanie dostępu. Tu „zrobię to sam” przestaje działać.

### 7. Następny krok do decyzji CEO

- Prawdziwy test zamiast trzeciego panelu: 10–20 realnych sklepów, darmowy portret i oferta 149 zł na ekranie wyniku. Mierzyć: u ilu portret znajduje rzeczywistą rozbieżność; ilu po jej zobaczeniu zamawia; ilu dodaje menedżera; czas pracy na zlecenie.
- Decyzje: (1) czy element H (porównanie z 3 sklepami) wchodzi do części płatnej; (2) czy CEO występuje z imieniem i telefonem; (3) limit sklepów w pilocie; (4) czy pierwszym produktem ma być usługa jednorazowa zamiast abonamentu — jest to zgodne z kolejnością proponowaną w Katalogu §7 (raport informacyjny → uporządkowanie profilu → opieka), ale zmienia nacisk z abonamentu z 01-PRODUKT §6.

Pliki: `founder/pitch-v1.md` (abonament), `founder/pitch.md` (v2), `founder/panel-v1/` i `founder/panel/` (odpowiedzi obu prób, seed 483380).

## The numbers

Wszystkie kwoty w zł, netto. 149 zł brutto to 121,14 zł netto przy VAT 23%. Jednostka to jedno opłacone zlecenie. Kalkulator (`numbers.json`, wejścia w `cfo-sources.md`) działa w miesiącach: tam, gdzie wynik narzędzia mówi „w miesiącu”, chodzi o zlecenia w miesiącu. Liczby Skanera z 15.11 są w `cfo-skaner.md` (Skaner jest odłożony, patrz `launch.md`).

**Jedyny koszt tej usługi to Twój czas.** Dlatego liczę dwa warianty. W pierwszym godzina CEO kosztuje 60 zł, tak jak w CFO Skanera. Drugi to sama gotówka, bez wyceny czasu.

### Marża

| | z wyceną czasu (60 zł/h) | sama gotówka |
|---|---:|---:|
| Minuty CEO na 1 opłacone zlecenie | 242,5 | 242,5 |
| Wkład na pokrycie kosztów stałych | **−121,36 zł** | 121,14 zł |
| Próg rentowności | nigdy | 3 zlecenia w miesiącu |
| Marża przy 10 zleceniach w miesiącu (limit) | −127% | 73% |
| Zysk operacyjny w 1. roku (3 → 10 zleceń w miesiącu) | **−14 276 zł** | 6 337 zł |
| Gotówka potrzebna, zanim zacznie się zwracać | 15 976 zł | 1 700 zł |

**Co to znaczy:** w wariancie gotówkowym próg z `launch.md` się zgadza: 3 zlecenia w miesiącu pokrywają 330 zł kosztów stałych. Ale przy limicie 10 zleceń w miesiącu (ok. 40 h pracy) zysk wynosi 881 zł, czyli **ok. 30 zł za godzinę pracy przed podatkiem** (121,14 zł za 242,5 min). To nie wystarcza, żeby z tego żyć. Usługa w tej postaci jest sposobem na poznanie klientów, a nie biznesem.

### Gdzie naprawdę jest koszt

**Darmowe sprawdzenia: 150 z 242,5 minut (62%).** Według linii sukcesu testu (30 sprawdzeń → 3 zlecenia) na jedno płatne zlecenie przypada 10 darmowych sprawdzeń po 15 min. Sama naprawa z telefonem i kontrolą po 30 dniach to 92,5 min. Wizyt osobistych w sklepach nie wliczyłem, bo nikt nie zmierzył ich czasu. Z nimi wynik będzie gorszy.

### Na co patrzeć najbardziej

**Minuty na sprawdzenie i ile sprawdzeń przypada na zlecenie.** To mierzy grudniowy test (A i B w `launch.md`), więc mierz czas każdego sprawdzenia i każdego zlecenia stoperem od pierwszego sklepu.

### Dźwignie (każda liczona osobno w kalkulatorze, od wariantu z wyceną czasu)

| Dźwignia | Wkład nza zlecenie | Próg | Zysk w 1. roku |
|---|---:|---:|---:|
| Wyjściowo | −121,36 zł | nigdy | −14 276 zł |
| 1. Sprawdzenie 5 min zamiast 15 (lista kontrolna, półautomat z ZARYS etap 1) | −21,36 zł | nigdy | −5 776 zł |
| 2. 5 sprawdzeń na zlecenie zamiast 10 (sklepy z polecenia partnera) | −46,36 zł | nigdy | −7 901 zł |
| 3. Naprawa 45 min zamiast 67,5 | −98,86 zł | nigdy | −12 363 zł |
| 4. Cena 299 zł brutto (243,09 zł netto) | 0,59 zł | 560 | −3 910 zł |
| 1 + 2 + 3 razem (149 zł) | 26,14 zł | 13 (ponad limit 10) | −1 738 zł |
| 1 + 2 + 3 i cena 199 zł brutto (161,79 zł netto) | 66,79 zł | 5 | 1 717 zł |
| 5. Działalność nierejestrowana albo zwolnienie z VAT (cała kwota 149 zł zostaje, bez księgowości 300 zł/mies.), czas dzisiejszy | −93,50 zł | nigdy | −8 308 zł |
| **5 + 1 + 2 + 3 (czas docelowy 95 min), cena 149 zł** | **54,00 zł** | **1** | **4 230 zł** |
| 5 + 1 + 2 + 3, cena 179 zł | 84,00 zł | 1 | 6 780 zł |

Żadna dźwignia sama nie wystarcza. **Najmocniejsze połączenie (dodane 20.11 po `ops.md`) to forma działalności i krótszy czas pracy.** Działalność nierejestrowana ma limit 10 813,50 zł przychodu na kwartał w 2026 r. Zwolnienie z VAT obowiązuje do 240 000 zł rocznie. Przy jednym i drugim 149 zł zostaje w całości i nie ma kosztu biura rachunkowego. Razem z czasem docelowym 95 min zlecenie zarabia nawet przy godzinie liczonej po 60 zł: +4 230 zł w 1. roku przy cenie 149 zł (`numbers-nierejestrowana.json` ze zmienionymi czasami). Oba warunki trzeba jednak sprawdzić: formę i VAT u księgowego, czas w teście. Do tego czasu `numbers.json` zostaje bez zmian.

**Luka w kosztach stałych.** W 330 zł miesięcznie nie ma składek ZUS ani zdrowotnej. Przy zarejestrowanej działalności to kilkaset zł miesięcznie, zależnie od ulg, więc wynik wariantu z VAT jest w tej kwestii zbyt optymistyczny.

Poza tym żadna z dźwigni 1–4 nie wystarcza sama. Na plus wychodzi dopiero połączenie: szybkie sprawdzenie, klienci z polecenia, krótka naprawa i wyższa cena. Cenę 199 zł trzeba sprawdzić. Panel v2 dał medianę „za drogo” 225 zł (`offer.md`), ale to symulacja.

### Gotówka

W wariancie gotówkowym potrzeba **1 700 zł**: 1 500 zł na dokumenty prawne (szacunek) i 200 zł na marketing. Miesiące są na plus od pierwszego, jeśli będą 3 zlecenia. Budżet eksperymentów to 200 zł, więc trzeba zdecydować, skąd wziąć 1 500 zł, albo zastąpić pełną usługę prawną wzorcami i 1–2 h konsultacji (`sposoby-i-bezpieczenstwo.md`, punkt 17).

Nie ma `board.md`, więc nie ma warunków zarządu do sprawdzenia. Rampa 3 → 10 zleceń to mój szacunek między linią przejścia z `launch.md` (3) a przykładowym limitem (10). Nie wpływa na znak wyniku, bo w wariancie z wyceną czasu każde zlecenie traci. To nie jest porada podatkowa ani prawna. Formę działalności, VAT i umowy powinien sprawdzić księgowy.

---

## Unit economics: Sklep w porządku (raportfirmy.pl): naprawa danych sklepu w Google i na Facebooku

Every number below comes from the input file. Nothing is looked up or guessed.

### One zlecenie

| line | per zlecenie |
| --- | ---: |
| Price | 121.14 zł |
| Bezpłatne sprawdzenia: 10 na 1 opłacone zlecenie x 15 min x 60 zł/h (linia sukcesu testu: 3 zlecenia z 30 sprawdzeń) | -150.00 zł |
| Naprawa w Google i na Facebooku: 67,5 min (środek z 45–90 min) x 60 zł/h | -67.50 zł |
| Telefon: przeprowadzenie przez dodanie menedżera, 10 min x 60 zł/h | -10.00 zł |
| Bezpłatna kontrola po 30 dniach, 15 min x 60 zł/h | -15.00 zł |
| Płatność BLIK lub przelew (przyjęte 0 zł, do sprawdzenia w banku) | -0.00 zł |
| **Contribution** (what each zlecenie leaves to pay the fixed costs) | **-121.36 zł** (-100%) |

### The margin that matters

Fixed costs: 330 zł a month (Hosting MyDevil MD1 (szacunek, do podania) 20, zł Domena i poczta (szacunek) 10, zł Księgowość raportfirmy.pl (szacunek, do podania) 300 zł).

- **Break-even: never (each unit loses money) zleceń w miesiącu.** Below that you lose money every month.
- **Profit margin at your plan** (10 w miesiącu): **-127%** of every sale, after every cost.
- Capacity: 10 w miesiącu.

### Year 1, month by month

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

### What if

| scenario | margin at plan | break-even w miesiącu | year 1 profit |
| --- | ---: | ---: | ---: |
| Base plan | -127% | never | -14,276 zł |
| Price -10% | -153% | never | -15,305 zł |
| Volume -20% | -134% | never | -12,212 zł |
| Unit costs +15% | -157% | never | -17,367 zł |

### Red flags

- Each unit loses money before rent and salaries: the price is below the variable cost.
- Break-even needs inf zleceń w miesiącu but capacity is 10.
- Year 1 loses money on operations (-14,276 zł).
- The startup spend is not earned back within year 1.

---

### Wariant gotówkowy (`numbers-gotowka.json`)


Every number below comes from the input file. Nothing is looked up or guessed.

### One zlecenie

| line | per zlecenie |
| --- | ---: |
| Price | 121.14 zł |
| Płatność BLIK lub przelew (przyjęte 0 zł, do sprawdzenia w banku) | -0.00 zł |
| **Contribution** (what each zlecenie leaves to pay the fixed costs) | **121.14 zł** (100%) |

### The margin that matters

Fixed costs: 330 zł a month (Hosting MyDevil MD1 (szacunek, do podania) 20, zł Domena i poczta (szacunek) 10, zł Księgowość raportfirmy.pl (szacunek, do podania) 300 zł).

- **Break-even: 3 zleceń w miesiącu.** Below that you lose money every month.
- **Profit margin at your plan** (10 w miesiącu): **73%** of every sale, after every cost.
- Capacity: 10 w miesiącu.

### Year 1, month by month

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

### What if

| scenario | margin at plan | break-even w miesiącu | year 1 profit |
| --- | ---: | ---: | ---: |
| Base plan | 73% | 3 | 6,337 zł |
| Price -10% | 70% | 4 | 5,307 zł |
| Volume -20% | 66% | 3 | 4,278 zł |
| Unit costs +15% | 73% | 3 | 6,337 zł |

No red flags in these numbers. They are only as good as the inputs: check every cost against a real quote.

## Marketing

**Część A: „Sklep w porządku”, usługa, która startuje 18.01.2027 (20.11.2026).** Część B (16.11.2026) dotyczy agenta momentów, abonamentu i Skanera, czyli etapów 2–3 z `ZARYS-APLIKACJI.md`.

### A1. Dowody, z których korzystam

- **Panel 149 zł** (`panel/` = `panel-v2`, symulacja): 0/20 kupuje. Powody odmowy: potrzeba 10, zaufanie 7, nawyk 3. 15/20 zapłaci, gdy zobaczy błąd we własnym sklepie; 9/20 chce polecenia od zaufanej osoby. Segmenty nie różnią się od siebie (0% wszędzie), więc pierwszą grupę wybieram po kanale: **sklepy, które obsługuje jeden partner w jednej okolicy**.
- **Konkurencja** (`competitors.md`): rynek sprzedaje „pozycjonowanie” i „optymalizację” z góry, za 300–2 500 zł, z obietnicą klientów. Kategorii szkodzą telefony od firm, które podszywają się pod Google.
- **Cena i liczby** (`pricing.md`, `cfo.md`): 149 zł, test 179 i 199 zł. Ile wolno wydać na pozyskanie klienta, wynika z punktu A5.

### A2. Pozycjonowanie

1. **Rekomendowane, dla właściciela:** *Dla właściciela małego sklepu, który nie ma czasu pilnować internetu, Sklep w porządku sprawdza za darmo, co klienci widzą o sklepie w Google i na Facebooku, i poprawia to za niego, płatne dopiero po wykonaniu. W przeciwieństwie do firm od „pozycjonowania wizytówek” nie bierzemy pieniędzy z góry i nie obiecujemy klientów.*
   Dlaczego: odpowiada na zaufanie (7/20), na „wydatek bez dowodu” (P002) i na złą reputację kategorii.
2. **Sezonowe, na grudzień i Wielkanoc:** *Zanim klient odbije się od zamkniętych drzwi: sprawdzamy, czy Google zna Twoje godziny świąteczne.* Dobre jako hook, za wąskie jako pozycja na cały rok.
3. **Dla partnera:** *Dla biura rachunkowego, które chce dać klientom coś pożytecznego bez dodatkowej pracy: darmowe sprawdzenie sklepu ze źródłem i datą, a naprawę robi podpisana osoba, płatna po wykonaniu.* Używamy go w rozmowie z partnerem, a nie wobec właściciela.

### A3. Kanały

| Kanał | Dlaczego | Koszt | Po czym poznamy, że działa |
|---|---|---|---|
| **Partner** (biuro rachunkowe, hurtownia) | 9/20 chce polecenia; warunek 6 zarządu | prowizja za opłacone zlecenie (A5) | ≥ 1 zgłoszenie tygodniowo od partnera |
| **Wizyty osobiste z kartą wyniku** | dowód przed ceną (15/20) i brak zimnego kontaktu (art. 398 PKE) | czas i druk | ≥ 30% opłaconych z pokazanych |
| **Polecenia klientów z grudnia** | najsilniejszy dowód w okolicy | 0 zł | ≥ 1 polecenie na 5 klientów |
| Profil Firmy raportfirmy.pl w Google | ktoś, kto nas sprawdza, musi nas znaleźć z prawdziwymi danymi | 0 zł | — |

**Czego nie robimy:** zimnych e-maili, telefonów i SMS-ów (art. 398 PKE i zła reputacja kategorii), reklam na Facebooku (kupujący nie ufa reklamie, P006: „tylko dlatego, że wyskoczyła mi reklama”), opinii z paneli w reklamach. Nie obiecujemy klientów ani pozycji w Google.

### A4. Kampania od T−14 do T+16 (4.01–3.02.2027)

| Data | Kanał | Co | Komunikat |
|---|---|---|---|
| pn 4.01 | partner | wysłanie partnerowi tekstu dla jego klientów (jego kanałem, tylko tam, gdzie klienci mają zgodę na kontakt) | pozycja 3 |
| wt 5.01 | Profil Firmy raportfirmy.pl | uzupełnienie: godziny, telefon, opis z ceną i gwarancją | pozycja 1 |
| śr 6.01 | — | karty wyniku i kartka dla partnera do druku (`index.html#test` → „Karta wyniku”) | — |
| pn 11.01 | klienci z grudnia | prośba o zgodę na pokazanie przykładu „przed/po” (bez nazwy, jeśli tak woli) | — |
| pt 15.01 | partner | dzień próbny: 3 sprawdzenia z poleceń partnera | — |
| **pn 18.01** | partner + wizyty | **start**: partner przekazuje informację; 5 wizyt z kartą | hooki 1, 3, 6 |
| 19–22.01 | wizyty | 5 wizyt dziennie, tylko w sklepach z rozbieżnością | hook według rozbieżności |
| pn 25.01 | — | przegląd 7 dni (`launch.md`) | — |
| 26–29.01 | partner | drugi tekst dla klientów partnera: prawdziwa liczba z testu („u X z 30 sklepów w okolicy coś się nie zgadzało”) | hook 9 |
| pn 1.02 | — | przegląd 14 dni | — |
| 2–3.02 | wizyty | sklepy z listy oczekujących | — |

Kiedy nie ma nic nowego do powiedzenia: jedno zdanie w Profilu Firmy raportfirmy.pl o tym, co sprawdzamy w tym tygodniu (np. „ferie zimowe: czy Twoje godziny się zmieniają?”).

#### Dziesięć hooków (każdy odpowiada na jedną obiekcję z panelu)

| # | Obiekcja | Hook (zdanie na karcie albo przy ladzie) |
|---|---|---|
| 1 | „klienci to sąsiedzi, znają godziny” (potrzeba) | „Sąsiedzi znają Pana godziny. Ktoś, kto szuka sklepu w telefonie, widzi to:” + zdanie z karty |
| 2 | „sam poprawię w kwadrans” | „Proszę bardzo, tu jest instrukcja za darmo. Jak zabraknie wieczoru, zrobimy to za Pana.” |
| 3 | „takich od wizytówek miałem kilku” | „Nie dzwonimy. Przychodzimy osobiście, z kartką i nazwiskiem.” |
| 4 | „Google za wizytówkę nie bierze” | „Zgadza się, Google nic nie bierze. My bierzemy tylko za wykonaną poprawkę.” |
| 5 | „nie wpuszczę obcego jako menedżera” | „Bez haseł. Usuwa nas Pan jednym kliknięciem, instrukcja jest w teczce.” |
| 6 | „wydatek bez dowodu” | „Nic nie znaleźliśmy, nic nie płacisz. Nie udało się, nie płacisz.” |
| 7 | „centrala to robi” | „Tego, co ustala centrala, nie ruszamy. Pokażemy, co należy do Pana.” |
| 8 | „nie mam czasu” | „5 minut przy ladzie na akceptację zamiast wieczoru przy komputerze.” |
| 9 | „nie wiem, czy mam problem” | „U [X] z 30 sklepów w tej okolicy coś się nie zgadzało.” **Tylko z prawdziwą liczbą z testu.** |
| 10 | moment (święta) | „Wielka Sobota 27.03.2027: handel do 14:00. Co pokaże Google?” (na marzec) |

**Oferta otwarcia** (`pricing.md`): pierwsze 10 sklepów od partnera dostaje do 31.01.2027 kartkę na drzwi z godzinami świątecznymi i przypomnienie przed Wielkanocą. Bez rabatów.

### A5. Budżet i liczby

**Budżet 200 zł:** 100 zł na druk (karty wyniku, kartka dla partnera), 50 zł na spotkania z partnerami, 50 zł rezerwy. Bez płatnych reklam.

**Ile wolno zapłacić za pozyskanie klienta.** Kupuje się raz, więc to wkład jednego zlecenia (`cfo.md`):

| Scenariusz | Wkład nza zlecenie | Maksymalny koszt pozyskania |
|---|---:|---:|
| dzisiejszy czas, z VAT | −121,36 zł | **0 zł**: każde zlecenie już traci |
| czas docelowy 95 min, z VAT | 26,14 zł | < 26 zł |
| czas docelowy, bez VAT (nierejestrowana / zwolnienie) | 54,00 zł | < 54 zł |

Wniosek dla umowy z partnerem (warunek 6 zarządu): **prowizja nie wyższa niż ok. 25 zł za opłacone zlecenie**, i to tylko wtedy, gdy czas pracy zejdzie do celu. Lepiej zaproponować partnerowi korzyść niepieniężną: darmowe sprawdzenia dla jego klientów i jego logo na karcie.

**Trzy liczby co tydzień:**
| Liczba | Poziom „zmień coś” | Co wtedy |
|---|---|---|
| Opłacone / pokazane wyniki | < 10% po 20 wynikach | `/founder-offer` z prawdziwymi odpowiedziami |
| Zgłoszenia od partnera | 0 przez 2 tygodnie | drugi partner |
| Minuty na opłacone zlecenie | > 120 | `ops.md`, procedura A; potem cena |

---

## Część B: agent, który odzywa się w ważnym momencie (16.11.2026)

Podstawa: panele symulowanych właścicieli sklepów (6.11–16.11: 20 osób w każdej próbie, raz 100), `pricing-skaner.md` (29 zł brutto/mies., 290 zł/rok, pierwszy miesiąc 9 zł do 31.03.2027), `cfo-skaner.md` i `numbers-opt.json`. Nie ma pliku `competitors.md`: konkurencji nie mapowaliśmy, więc pozycjonowanie opiera się na zamiennikach, które wskazali kupujący (wydruk z kasy, Subiekt, centrala sieci, księgowa, zeszyt). Panele to symulacja: dobrze pokazują obiekcje, słabo przewidują zakup. **Cytatów z paneli nie wolno używać w reklamach jako opinii klientów.** To nie jest porada prawna.

---

### 1. Czego potrzebuje przedsiębiorca, żeby proaktywny agent był dla niego wartością, a nie natrętem

Wszystkie panele mówią to samo. Agent wygrywa uwagę właściciela tylko wtedy, gdy spełnia pięć warunków:

| Warunek | Co mówiły panele | Co to znaczy dla agenta |
|---|---|---|
| **Konkret o moim sklepie** | 15 z 20 zapłaciłoby, gdyby zobaczyło „czarno na białym” konkretny błąd (panel 6.11) | Każdy komunikat zawiera nazwę sklepu, liczbę, datę i źródło. Nigdy „może warto sprawdzić…”. |
| **Coś, czego sam nie widzi** | 13 z 20 odmawia, bo „te liczby już mam” (panel 16.11) | Agent milczy o tym, co jest na wydruku. Odzywa się przy rozbieżności, terminie, zmianie, której nie widać gołym okiem. |
| **Zero dodatkowej pracy** | „10 minut przy kuchennym stole o 22:00” (P011, 16.11) | Jeden przycisk na komunikat. Akceptuj, odłóż, „nie dotyczy mnie”. |
| **Zaufany pośrednik** | 12 z 20 zmieniłoby zdanie przez księgową (16.11); ok. 77 ze 100 w panelu 10.11 | Pierwszy kontakt przez biuro rachunkowe, nie przez reklamę. |
| **Bez straszenia i natręctwa** | ~89 na 100 odebrało ukryte tematy „grozi kara” jako taktykę naciągaczy; ~66 na 100 negatywnie o telefonach od AI (10.11) | Żadnych zagadek, liczników, presji. Pełny tytuł sprawy od razu. Brak telefonów od AI. |

**„Połączenie z neuronami” w praktyce:** mózg zmęczonego właściciela odfiltrowuje wszystko, co wygląda jak reklama, i reaguje na trzy rzeczy: **własne dane** (nazwa mojego sklepu, moja liczba), **zamknięcie sprawy** (jedna rzecz, którą da się skończyć w 30 sekund) i **ulgę** (ktoś zrobił za mnie robotę). Strach i pilność działają krótko i w tej grupie od razu budzą skojarzenie z naciągaczami. Dlatego agent buduje zaufanie, nie napięcie.

### 2. Momenty, w których agent odzywa się na ekranie telefonu

Agent ma tylko pięć powodów, żeby się odezwać. Każdy wynika z danych klienta, a nie z kalendarza wysyłek.

| # | Moment | Wyzwalacz | Przykładowe powiadomienie (max ~90 znaków) | Jedno działanie |
|---|---|---|---|---|
| M1 | **Raport miesięczny dla księgowej** | 1.–5. dnia miesiąca, raport miesięczny jeszcze nie przesłany | „Sklep Pod Lipą: październik gotowy do wysłania księgowej. Wyślij jednym ruchem.” | Wyślij |
| M2 | **Rozbieżność w sieci** | Godziny lub telefon w Google różnią się od tych na Facebooku albo od deklaracji właściciela | „Google podaje dla Pod Lipą zamknięcie o 18:00, Facebook o 20:00. Która godzina jest dobra?” | Wybierz poprawną |
| M3 | **Termin w przepisach** | Notka z zatwierdzonej biblioteki, która dotyczy profilu firmy | „KSeF: od [data] Twoja firma wystawia faktury w nowym systemie. Sprawdź 3 kroki.” | Zobacz kroki |
| M4 | **Zmiana, której nie widać na wydruku** | Średni paragon albo liczba paragonów odbiega od tego samego dnia tygodnia o więcej niż ustalony próg przez 2 tygodnie z rzędu | „Średni paragon w soboty spada trzeci tydzień z rzędu (−9%). Chcesz zobaczyć, skąd?” | Zobacz |
| M5 | **Zamknięcie sprawy** | Poprawka wprowadzona albo kontrola po 30 dniach | „Godziny w Google poprawione i sprawdzone dziś. Nic więcej nie musisz robić.” | (brak, tylko ulga) |

Zasady wysyłki:
- **Najwyżej 2 powiadomienia w tygodniu.** Brak sprawy oznacza ciszę. Odrzucona sugestia nie wraca bez nowej podstawy (zgodnie z 01-PRODUKT §10).
- **Godzina wysyłki to hipoteza do testu**, nie ustalenie. Panele wskazują, że wieczór po zamknięciu jest najgorszy („22:00 przy kuchennym stole”). Do przetestowania: przed otwarciem (ok. 7:30) oraz w porze południowej.
- **Treść bez straszenia.** Słowo „kara” pada tylko wtedy, gdy jest w treści przepisu, z kwotą i źródłem, nigdy jako przynęta.
- **Każde powiadomienie da się wyłączyć w dwóch dotknięciach, osobno dla każdego rodzaju momentu.**

### 2a. Agent dopasowany do nastroju klienta

Agent ma wyczuwać, w jakim momencie jest właściciel, i do tego dopasować ton, długość i to, czy w ogóle się odzywa. Robi to **wyłącznie na podstawie tego, co klient sam napisze lub kliknie, i tego, co dzieje się w jego sprawach**. Nigdy na podstawie twarzy, głosu, sposobu pisania na klawiaturze ani innych danych biometrycznych.

| Sygnał (jawny) | Jak agent go rozumie | Co robi |
|---|---|---|
| Dwa razy „Nie teraz” w tygodniu albo wybór „Mam urwanie głowy” | Brak czasu | Wstrzymuje wszystko poza terminami w przepisach i raportem dla księgowej. Wraca po 7 dniach jednym zdaniem: „Wracam z 2 sprawami, gdy będziesz gotowy.” |
| Spadek sprzedaży kilka tygodni z rzędu (M4) | Trudny okres | Zaczyna od faktu bez oceny, daje jeden mały krok. **W tym czasie nie proponuje żadnego płatnego planu ani dodatku.** |
| Dobry tydzień (wzrost, zamknięta sprawa) | Dobry moment | Krótkie potwierdzenie. Dopiero wtedy, i tylko za zgodą na propozycje, może zapytać o próbę czegoś nowego. |
| Wiadomość w rodzaju „znowu to samo”, „nie działa”, wielkie litery | Frustracja | Jedno zdanie przeprosin bez tłumaczenia się, najkrótsza droga do rozwiązania i przycisk „połącz z człowiekiem”. Żadnej oferty. |
| Wybór stylu w ustawieniach: „konkretnie” albo „po ludzku” | Preferencja | Konkretnie: liczba, termin, przycisk. Po ludzku: jedno zdanie kontekstu przed liczbą. |
| Godzina, o której klient zwykle otwiera aplikację | Rytm dnia | Wysyła w tym oknie. Nigdy po 21:00. |

**Zasady:**
- Agent nie nazywa emocji klienta („widzę, że jesteś zły”). Dopasowuje działanie, nie diagnozuje.
- **Nastrój nigdy nie służy do sprzedaży.** W trudnym okresie i przy frustracji propozycje handlowe są blokowane w kodzie, a nie tylko w treści.
- Przechowujemy tylko ustawienia klienta (styl, „wstrzymaj do dnia X”), a nie etykiety nastroju. Klient widzi je i zmienia w jednym miejscu.
- Prawnie: system AI rozpoznawania emocji w AI Act to system oparty na danych biometrycznych, a jego używanie wymaga informowania osób (art. 50 ust. 3). Agent nie korzysta z takich danych, więc z założenia nie jest takim systemem. Mimo to zasady powyżej są potrzebne, bo wykorzystywanie słabości lub trudnej sytuacji do wpływania na decyzje to obszar zakazu z art. 5. Do potwierdzenia z prawnikiem.

### 3. Warunki prawne UE i Polski, które kształtują agenta

(Stan na 16.11.2026. Do potwierdzenia z prawnikiem przed startem.)

1. **Informacja, że to AI (AI Act, art. 50).** Obowiązek stosuje się od 2 sierpnia 2026 r., a Digital Omnibus go nie przesunął. Rozmowa z agentem w aplikacji zaczyna się od zdania „Pisze do Ciebie asystent AI raportfirmy.pl; możesz poprosić o człowieka”, a nie od zapisu w regulaminie.
2. **Zakaz technik manipulacyjnych (AI Act, art. 5).** System AI nie może stosować technik podprogowych ani manipulacyjnych, które istotnie zniekształcają decyzje i mogą wyrządzić poważną szkodę. „Połączenie z neuronami” oznacza więc trafność i ulgę, a nie fałszywą pilność, liczniki czy granie na lęku.
3. **Zgoda na informację handlową, także B2B (Prawo komunikacji elektronicznej, art. 398).** W Polsce zgoda jest wymagana również między przedsiębiorcami, a według UOKiK marketingiem bezpośrednim jest już kontakt w celu uzyskania takiej zgody. Skutki:
   - zimne e-maile, SMS-y i telefony do biur i sklepów odpadają;
   - w aplikacji trzeba rozdzielić **powiadomienia o usłudze** (M1–M5, wynikają z umowy) od **informacji handlowej** (np. propozycja planu „Towary”), która wymaga osobnej zgody.
4. **RODO.** Dane jednoosobowej działalności mogą być danymi osobowymi. Wyzwalacze M4 to profilowanie danych sprzedaży, więc trzeba: podstawy prawnej (wykonanie umowy), informacji o tym, jak agent decyduje, kiedy się odezwać, i możliwości sprzeciwu. Zdjęcia raportów nie są przechowywane, co upraszcza sprawę.
5. **Ceny i promocje.** Bez „przekreślonych cen”, których nigdy nie było (zasada z `pricing-skaner.md`). Jeśli plan trafi do przedsiębiorcy na prawach konsumenta, trzeba sprawdzić zasady informowania o obniżkach.

### 4. Pozycjonowanie

Trzy wersje:

**A. Dla biura rachunkowego (rekomendowana do pozyskiwania klientów)**
> Dla biur rachunkowych, które co miesiąc zbierają od sklepów papierowe raporty z kasy, raportfirmy.pl to aplikacja, w której klient robi zdjęcie raportu, a biuro dostaje gotowe, sprawdzone zestawienie, w przeciwieństwie do segregatora i ręcznego przepisywania.

**B. Dla właściciela (rekomendowana jako obietnica produktu)**
> Dla właściciela małego sklepu, który raport z kasy widzi codziennie, ale nie ma czasu się nad nim zastanawiać, raportfirmy.pl to asystent w telefonie, który odzywa się tylko wtedy, gdy jest coś konkretnego do zrobienia, w przeciwieństwie do kolejnej aplikacji z raportami.

**C. Ochrona**
> Dla właściciela małego sklepu, który boi się przeoczyć termin albo błąd w Google, raportfirmy.pl to strażnik, który pilnuje za niego, w przeciwieństwie do szukania informacji na własną rękę.

**Rekomendacja: A do pozyskiwania, B jako obietnica dla właściciela.** Dowody: księgowa to najczęstszy warunek zakupu (12 z 20, 16.11; ok. 77 ze 100, 10.11), a „te liczby już mam” to najczęstszy powód odmowy (13 z 20, 16.11), więc obietnica musi brzmieć „odzywa się tylko z czymś nowym”. Wersję C odradzam: ukryte zagrożenia odebrano jako metodę naciągaczy (~89 ze 100, 10.11).

**Test 16.11 (`czas-dla-siebie.md`): obietnica „czas dla siebie”.** Te same 20 osób, 29 zł: 0/20 kupuje w obu wersjach. Obietnica trafia, ale nie w raport z kasy: raport miesięczny zajmuje właścicielom 2–15 minut w miesiącu, a wieczory zabierają im **grafik pracowników i zamówienia** (6 z 20 mówi to samo z siebie, w wersji kontrolnej 3). 19 z 20 jako warunek zmiany zdania wskazuje księgową lub biuro, najczęściej polecenie połączone z niższą opłatą za biuro. **Wniosek: „czas dla siebie” to obietnica marki dla właściciela, przypięta do zamówień (KSeF + kasa) i ewentualnie grafiku; skaner sprzedajemy przez biuro jako oszczędność biura (wersja A).**

### 5. Kanały

| Kanał | Dlaczego pasuje | Koszt | Skąd wiemy, że działa |
|---|---|---|---|
| **1. Biura rachunkowe: osobiste wizyty i spotkania branżowe** | Najczęstszy warunek zakupu. Rozmowa twarzą w twarz nie podlega zakazowi z art. 398 PKE (bez telefonu i e-maila na zimno) | czas CEO + dojazdy ~50 zł | ≥3 biura zgadzają się na pilotaż z ≥5 klientami |
| **2. List lub ulotka do biur (poczta tradycyjna)** | Papierowa korespondencja nie wymaga uprzedniej zgody jak e-mail; biura i tak żyją z papieru | druk i znaczki ~100 zł na 50 listów | ≥5 biur samo się odzywa (formularz lub telefon przychodzący) |
| **3. Hurtownia albo serwis kas jako drugi partner** | Polecenie przez hurtownika lub centralę to drugi najczęstszy warunek (~49 ze 100, 10.11); serwisant ma regularny kontakt z właścicielem | czas + ~50 zł (materiały) | 1 partner przekazuje ulotkę lub zgodę na kontakt ≥20 sklepom |

**Czego nie robimy i dlaczego:**
- **Zimne e-maile, SMS-y, telefony, w tym telefony od AI:** art. 398 PKE dotyczy też B2B; ~66 ze 100 negatywnie o telefonach od AI.
- **Płatne reklamy do właścicieli (Meta, Google):** ludzie w tej grupie nie kupują z reklam od nieznanej firmy (najczęstszy powód „brak zaufania” w kilku panelach). Do sprawdzenia dopiero po pierwszych 20 klientach z polecenia.
- **Odliczanie, „ostatnie miejsca” i straszenie karą:** nieprawdziwa pilność, skojarzenie z naciągaczami, ryzyko zarzutu manipulacji.

### 6. Kampania 30 dni

Proponowany start (T): **poniedziałek 18 stycznia 2027 r.** (po świętach i rozliczeniu grudnia). Oferta: pierwszy miesiąc 9 zł do 31 marca 2027 r., potem 29 zł/mies. lub 290 zł/rok. Daty do potwierdzenia.

| Data | Kanał | Co wychodzi | Przekaz |
|---|---|---|---|
| pon 4.01 (T−14) | — | Lista 50 biur rachunkowych w 2 powiatach (z publicznych rejestrów i stron biur) | — |
| wt 5.01 | — | Strona dla biur: 1 ekran + formularz „chcę pilotaż” + zgoda na kontakt | Hook 1 |
| śr 6.01 | — | Ulotka/list A5 dla biur (druk) | Hook 1, 2 |
| czw 7.01 | Poczta | Wysyłka listów do 50 biur | Hook 1 |
| pt 8.01 | — | Przegląd aplikacji: powiadomienia M1–M5, przełączniki zgód, oznaczenie AI | — |
| pon 11.01 | Wizyty | 3 wizyty w biurach (osobiście) | Hook 2, 3 |
| wt 12.01 | Wizyty | 3 wizyty | Hook 3 |
| śr 13.01 | Spotkanie | Lokalne spotkanie przedsiębiorców lub księgowych (izba, cech) | Hook 4 |
| czw 14.01 | Wizyty | 2 wizyty + rozmowa z hurtownią | Hook 5 |
| pt 15.01 | — | Podsumowanie: ile biur na „tak”, ile list sklepów do zaproszenia | — |
| **pon 18.01 (T)** | Biura → sklepy | Biura wręczają klientom kartkę z kodem pilotażu (oferta 9 zł) | Hook 6 |
| wt 19.01 | Aplikacja | Pierwsze zdjęcia raportów; agent wysyła powitanie z oznaczeniem AI | — |
| śr 20.01 | Wizyty | Odwiedziny 5 sklepów z pilotażu: pomoc przy pierwszym zdjęciu | Hook 7 |
| czw 21.01 | Aplikacja | Pierwszy moment M2 (rozbieżność w sieci) tam, gdzie wykryty | — |
| pt 22.01 | — | Przegląd tygodnia: liczba zdjęć, poprawek, pytań | — |
| pon 25.01 | Biura | Telefon (za zgodą) do biur z pilotażu: co działa, co przeszkadza | — |
| wt 26.01 | Aplikacja | Moment M3 (termin w przepisach) dla pasujących profili | — |
| śr 27.01 | Poczta | Druga fala listów do 25 biur, które nie odpowiedziały | Hook 8 |
| czw 28.01 | Wizyty | 3 nowe biura | Hook 2 |
| pt 29.01 | — | Przegląd: ile sklepów robi zdjęcia drugi tydzień z rzędu | — |
| pon 1.02 | Aplikacja | Moment M1: raport miesięczny za styczeń do księgowej | Hook 9 |
| wt 2.02 | Biura | Biura dostają pierwsze zestawienie za styczeń bez papieru | Hook 10 |
| śr 3.02 (T+16) | — | Decyzja: rozszerzyć do kolejnych biur czy poprawić produkt | — |

**Gdy nie ma nic nowego do powiedzenia:** krótka notka dla biur, co zmieniło się w aplikacji („w tym tygodniu: odczyt raportu Elzab poprawiony”) i jedna historia z pilotażu, opisana za zgodą biura, prawdziwymi liczbami (czas zaoszczędzony na raportach), bez ozdobników.

#### Dziesięć hooków

Każdy odpowiada na obiekcję z paneli lub korzysta z powodu, dla którego ludzie mówili „tak”.

| # | Format | Tekst | Obiekcja / powód |
|---|---|---|---|
| 1 | Nagłówek listu do biura | „Raporty kasowe klientów bez segregatora. Klient robi zdjęcie, Ty dostajesz zestawienie.” | „Księgowa i tak to dostaje” → dajemy biuru korzyść |
| 2 | Pierwsze zdanie rozmowy w biurze | „Ile godzin w miesiącu przepisujecie raporty z kas klientów?” | Oszczędność czasu biura |
| 3 | Ulotka dla biura | „Sumy sprawdzone, zanim trafią do Ciebie. PTU i należność kontrolujemy przy każdym raporcie.” | Błędy przy przepisywaniu |
| 4 | Slajd na spotkaniu | „Agent, który milczy, dopóki nie ma czegoś ważnego.” | „Kolejna aplikacja, kolejne powiadomienia” |
| 5 | Rozmowa z hurtownią | „Twoi klienci dostają porządek w Google i w raportach. Ty nic nie robisz.” | Polecenie przez zaufanego partnera |
| 6 | Kartka od biura dla sklepu | „Twoja księgowa przyjmuje raporty z tej aplikacji. Pierwszy miesiąc 9 zł.” | Zaufanie: polecenie od księgowej |
| 7 | Zdanie przy pierwszym zdjęciu | „Jedno zdjęcie, 30 sekund. Resztę sprawdzamy my.” | „10 minut przy kuchennym stole” |
| 8 | Nagłówek drugiego listu | „3 biura w Twoim powiecie już nie przepisują raportów z kas.” (tylko jeśli to prawda) | Dowód społeczny, wyłącznie prawdziwy |
| 9 | Powiadomienie M1 | „Styczeń gotowy dla księgowej. Wyślij jednym ruchem.” | Zero dodatkowej pracy |
| 10 | E-mail do biura (za zgodą) | „Zestawienie za styczeń od 5 klientów jest w panelu. Bez papieru.” | Pierwsza namacalna korzyść |

### 7. Budżet i liczby

**Budżet:** 200 zł (budżet eksperymentów): listy i druk 100 zł, dojazdy 50 zł, materiały dla hurtowni lub serwisu 50 zł. Reklam płatnych nie ma.

**Ile można zapłacić za pozyskanie klienta:** wkład na klienta przy 29 zł brutto to 18,48 zł miesięcznie (kalkulator CFO). Panele dały 0 kupujących, więc nie da się wyliczyć kosztu pozyskania z liczby zakupów. Przyjmuję zasadę: koszt pozyskania ma się zwrócić w 3 miesiące, czyli **najwyżej ok. 55 zł na sklep** (3 × 18,48). Biuro, które przyprowadzi 5 sklepów, jest warte ok. 277 zł kosztu pozyskania. To górna granica nakładu czasu i pieniędzy na jedno biuro.

**Trzy liczby co tydzień:**

| Liczba | Próg „trzeba coś zmienić” |
|---|---|
| Biura na „tak” (pilotaż z ≥5 klientami) | mniej niż 1 na 10 odwiedzonych po 2 tygodniach |
| Sklepy robiące zdjęcie raportu przez 2 kolejne tygodnie | mniej niż 50% sklepów z pilotażu |
| Płatności po pierwszym miesiącu (po 9 zł → 29 zł) | mniej niż 30% sklepów z pilotażu |

### 8. Następny krok

`/founder-brand` (nazwa planu dla biur, ton agenta, wygląd powiadomień), potem `/founder-launch` (lista biur, materiały, przegląd prawny przed 4 stycznia).

## Brand

Ta marka wyrasta z pozycjonowania w `marketing.md` (część A). Ma być przeciwieństwem „firm od wizytówek”: osobiście, z nazwiskiem, płatne po wykonaniu, bez obietnic. W panelu ludzie odmawiali z braku zaufania, a nie przez cenę, więc marka ma przede wszystkim budzić zaufanie.

### 1. Nazwa

Nazwa firmy i domena już istnieją: **RaportFirmy.pl**. Usługa nazywa się **„Sklep w porządku”**. Oceniłem dziesięć kandydatów i rekomenduję zostawić ten układ: firma RaportFirmy.pl, produkt „Sklep w porządku”. Nazwa produktu mówi dokładnie, co klient dostaje, a zmiana nazwy firmy przed testem tylko by kosztowała.

| # | Nazwa | Styl | Co mówi | Na głos / na karcie | Ryzyko |
|---|---|---|---|---|---|
| 1 | **Sklep w porządku** | opisowa | wynik, którego chce właściciel | naturalnie, po polsku | słowa ogólne, trudniej o znak towarowy |
| 2 | RaportFirmy.pl | opisowa | raport, nie naprawa | dobrze | sugeruje papier, nie pracę za klienta |
| 3 | Dobre Godziny | obrazowa | godziny otwarcia | ładnie | za wąska: telefon, adres i duplikaty zostają poza nią |
| 4 | Drzwi Otwarte | obrazowa | klient trafia na otwarte drzwi | dobrze | kojarzy się z „dniem otwartym” |
| 5 | Zgadza się | obrazowa | spójność danych; „wszystko się zgadza” to też wynik | bardzo dobrze | potoczne zwroty trudno zastrzec |
| 6 | Wizytówka bez błędów | opisowa | dokładnie to, co robimy | długo | brzmi jak kategoria, na której ciąży zła opinia |
| 7 | Ladka | wymyślona | lada, mały sklep | krótko | nic nie mówi bez wyjaśnienia |
| 8 | Sklepomierz | wymyślona | pomiar sklepu | dobrze | sugeruje analitykę, nie pracę |
| 9 | [Imię] od sklepów | osoba | konkretny opiekun, zaufanie | ciepło | nie rośnie poza jedną osobę |
| 10 | Nasza Ulica | miejsce | lokalność | ciepło | brzmi jak portal osiedlowy |

**Krótka lista do sprawdzenia:** 1. Sklep w porządku · 5. Zgadza się · 2. RaportFirmy.pl.

**Kontrole, które trzeba zrobić samemu.** Tu ich nie zrobiłem, bo środowisko blokowało DNS i pobieranie stron:
- **Znak towarowy:** wyszukiwarka Urzędu Patentowego RP ([uprp.gov.pl](https://uprp.gov.pl)) i EUIPO eSearch ([euipo.europa.eu](https://euipo.europa.eu/eSearch/)). Klasy: **35** (reklama, zarządzanie informacją o firmach, aktualizacja danych w katalogach) i **42** (usługi informatyczne, jeśli aplikacja będzie sprzedawana osobno). Potoczne frazy jak „Zgadza się” czy „Sklep w porządku” mogą nie spełniać warunku odróżniającego. Rozważ znak słowno-graficzny z logo. Ostatecznie potwierdza to rzecznik patentowy, to nie jest porada prawna.
- **Domena:** sprawdź u rejestratora `sklepwporzadku.pl` i `zgadzasie.pl`. Najprostsze rozwiązanie to podstrona `raportfirmy.pl/sklep`.
- **Profile w serwisach:** Facebook (tu i tak jest klient), Instagram. TikTok i X nie są potrzebne dla tej grupy.
- **Pomylenie z konkurencją:** żadna z nazw nie jest bliska konkurentom z `competitors.md` (Lokal360, Localo, Studio72, NapoleonCat).

### 2. Obietnica i głos

**Obietnica w jednym zdaniu:** *Pokażemy Ci, co widzi klient, ze źródłem i datą. Jeśli coś jest nie tak, poprawimy to za Ciebie, a zapłacisz dopiero, gdy jest gotowe.*

**Hasło, trzy wersje:**
1. **„Sprawdzamy. Poprawiamy. Płacisz, gdy gotowe.”** (rekomendowane, bo mówi o gwarancji, która odpowiada na brak zaufania)
2. „Klient trafi na otwarte drzwi.”
3. „Wszystko się zgadza? Powiemy wprost.”

**Głos: trzy cechy.**
| Cecha | Tak | Nie |
|---|---|---|
| **Konkretny** | „Google pokazuje 24.12 otwarte 6–22.” | „Twoja widoczność w sieci wymaga optymalizacji.” |
| **Uczciwy** | „Wszystko się zgadza. Nie mamy czego sprzedać.” | „Tracisz klientów każdego dnia!” |
| **Sąsiedzki** | „Dzień dobry, zostawiam kartkę.” | „Szanowny Partnerze Biznesowy, …” |

**Przed i po (zdanie z `pitch-v2.md`):**
- Przed: „Cel: klient, który szuka Cię w Google albo na Facebooku, widzi prawdziwe godziny, adres, telefon, co sprzedajesz i jak zamówić, i nie idzie do sklepu obok tylko dlatego, że u Ciebie coś się nie zgadza.”
- Po: „Google pokazuje, że w Wigilię masz otwarte do 22. Poprawimy to za 149 zł. Płacisz, gdy będzie gotowe.”

### 3. Wygląd (brief)

**Kolory** są już w `index.html`. Kontrast policzyłem według wzoru WCAG:

| Rola | Kolor | Zadanie | Kontrast |
|---|---|---|---|
| Turkus (akcent) | `#0b6b63` | przyciski, „gotowe”, marka | biały na turkusie **6,37:1** (AA ✓) |
| Atrament | `#16222c` na papierze `#f3f5f4` | tekst | **14,76:1** (AAA ✓) |
| Bursztyn (ostrzeżenie) | `#94580a` na `#fbefd9` | „rozbieżność” | **5,04:1** (AA ✓) |
| Czerwień | `#ad2a20` na `#f8e2df` | „trudna sprawa”, błąd | **5,41:1** (AA ✓) |
| Szary pomocniczy | `#56646d` na białym | daty, źródła | **6,11:1** (AA ✓) |

**Krój pisma:** Literata (tytuły) i IBM Plex Sans / Plex Mono (tekst, liczby). Oba na licencji SIL Open Font License, dostępne w Google Fonts, już użyte w aplikacji.

**Logo (brief):** musi mówić „sprawdzone i w porządku”, a nie „marketing”. Działa jako znaczek 32 px w karcie przeglądarki, na wydruku czarno-białym (karta wyniku) i na naklejce na drzwi. Unikać pinezki z map i gwiazdek ocen, bo to język konkurencji i oszustów. Kierunek: znak „✓” połączony z kształtem drzwi albo lady. Jeśli powstaną projekty z generatora obrazów, to są koncepcje, a nie gotowe logo.

**Pierwszych pięć punktów styku:**
1. **Karta wyniku** (wydruk z aplikacji): pierwsze, co klient trzyma w ręku. Data, źródło, cena, gwarancja, nazwisko. Już zbudowana.
2. **Profil Firmy RaportFirmy.pl w Google:** prawdziwe godziny i telefon (sami musimy być „w porządku”).
3. **Potwierdzenie zlecenia:** ekran „Znaleźliśmy / Robimy / Gotowe” w aplikacji.
4. **Teczka zmian:** przed i po z datą oraz instrukcja, jak nas usunąć.
5. **Odpowiedź na pierwszą reklamację:** w ciągu 2 h, bez tłumaczenia się, z poprawką bez dopłaty (`ops.md`, procedura E).

## Operations

Usługę robi jedna osoba (CEO, opiekun). Nie ma towaru, lokalu ani dostawców w zwykłym sensie. Jedyny prawdziwy koszt to czas, a kalkulator pokazał, że to on decyduje o całym biznesie (`cfo.md`). Ten plan ma więc jeden cel: **zejść z 242,5 do ok. 95 minut na opłacone zlecenie** i nie zgubić przy tym jakości. Narzędzie do mierzenia jest w aplikacji: panel opiekuna → „Test 30 sklepów” (`index.html#test`).

### 1. Cykl dnia

✱ = krok, który widzi klient.

**Dzień testu (do 20.12.2026)**
1. 8:00. Plan dnia: 6–8 sklepów z jednej ulicy lub osiedla. Trasa pieszo, nie autem.
2. Pod sklepem: zdjęcie kartki z godzinami na drzwiach, potem sprawdzenie w aplikacji (procedura A, cel 5 min).
3. ✱ Jeśli jest rozbieżność: wizyta przy ladzie poza szczytem (10–12 albo 14–16), karta wyniku (procedura B).
4. ✱ Jeśli właściciel zleca: umówiony telefon i dodanie menedżera (procedura C).
5. 16:00–18:00. Naprawy przyjętych zleceń, zmiany wysłane do akceptacji ✱, teczka ✱.
6. 18:00. W aplikacji „Pobierz CSV”, kopia w chmurze. Rejestr metod.
7. 19:00 koniec. Nic po 21:00 (`marketing.md`).

**Dzień po starcie (od 18.01.2027).** Jak w `launch.md`, krok 3. Zmienia się tylko źródło sklepów: lista od partnera zamiast spaceru.

### 2. Procedury (każda na jedną stronę)

#### A. Sprawdzenie w 5 minut (12 pól z aplikacji)

Kolejność jest dobrana tak, żeby jedno otwarcie aplikacji dawało kilka pól naraz.

| Minuta | Gdzie | Pola w aplikacji |
|---|---|---|
| 0:00 | „Rozpocznij sprawdzenie”, wpisz nazwę z szyldu i ulicę | — |
| 0:30 | **Google Maps** na telefonie: nazwa + miejscowość. Jedno spojrzenie na kartę sklepu | status, nazwa, adres i pinezka, kategoria, telefon, link |
| 1:30 | Google Maps → godziny: dziś, najbliższa niedziela handlowa i 24.12. Porównanie ze zdjęciem kartki z drzwi | godziny zwykłe, niedziele 6/13/20.12, 24–27.12 i 31.12–1.01 |
| 2:30 | Google Maps: szukaj „nazwa” bez miejscowości; drugi wynik z tym samym szyldem w pobliżu to podejrzenie duplikatu | jedna wizytówka |
| 3:00 | **Facebook**: wyszukaj stronę sklepu, sprawdź datę ostatniego wpisu, godziny i telefon | Facebook istnieje, Facebook = Google |
| 4:00 | Przy każdej rozbieżności jedno zdanie: **co dokładnie widzi klient** („Google: 24.12 otwarte 6–22”). To trafia na kartę | opisy |
| 4:30 | Pola, które w sklepie sieciowym ustala centrala, oznacz „ustala centrala”. Niczego nie zgaduj: czego nie da się sprawdzić, oznacz „nie dotyczy” | — |
| 5:00 | „Zapisz sprawdzenie” | — |

Zasady: telefonu nie dzwonimy przy sprawdzeniu, bo to zabiera 2–3 minuty. Numer weryfikujemy przy wizycie albo porównując z kartką na drzwiach. Każdy wynik ma źródło i datę (zasada 2 z `ZARYS-APLIKACJI.md`).

#### B. Wizyta z kartą wyniku
1. Wydruk karty z aplikacji („Karta wyniku dla sklepu”). Cena na karcie zmienia się sama (149, 179, 149, 199 zł) na potrzeby testu cen.
2. Przy ladzie, gdy nie ma klientów: „Dzień dobry, sprawdzam, co klienci widzą o sklepach na tej ulicy w Google. U Pana/Pani wyszło jedno: [zdanie z karty]. Zostawiam kartkę.”
3. Bez naciskania. „Poprawię sam” to dobra odpowiedź: mówimy jak, za darmo.
4. Jeśli właściciel chce zlecić: umawiamy telefon w wybranej porze. Zgody na kontakt nie bierzemy w ciemno (art. 398 PKE). Właściciel sam podaje numer i porę.
5. W aplikacji: „Wynik pokazany”, decyzja.

#### C. Naprawa
1. Telefon (cel 10 min): właściciel dodaje opiekuna jako **menedżera** w Profilu Firmy w Google (Profil → „Osoby i dostęp”) i daje dostęp do strony na Facebooku (Meta Business Suite). Haseł nie bierzemy.
2. Zrzut ekranu „przed” z datą.
3. Zmiany: godziny specjalne na konkretne dni (Google zaleca godziny niestandardowe przy zamknięciu do 7 dni, [pomoc Google](https://support.google.com/business/answer/14368911?hl=pl)), telefon, adres, opis. Na Facebooku to samo.
4. ✱ Zmiany do akceptacji w aplikacji klienta, a po akceptacji publikacja.
5. ✱ Teczka: zrzut „po” z datą i instrukcja, jak nas usunąć z profilu.
6. Rejestr: typ błędu, źródło, metoda, minuty. Termin kontroli za 30 dni.

#### D. Trudna sprawa (duplikat, przejęty profil, zmiany wprowadzane przez Google)
Cena stała przed startem (`pricing.md`). Zgłoszenia wysyłamy przez oficjalne formularze pomocy Google. Termin jest po stronie Google, więc mówimy o tym klientowi wprost. Jeśli przekroczymy 6 h pracy, ryzyko jest nasze. Nie udało się = 0 zł.

#### E. Reklamacja
1. Telefon oddzwaniamy w ciągu 2 h (godziny pracy).
2. Jeśli to nasz błąd: poprawka bez dopłaty. Jeśli Google cofnął zmianę: poprawka bez dopłaty i wpis w rejestrze, bo to argument za opieką.
3. Jeśli klient jest niezadowolony mimo poprawnego wykonania: przy pierwszym zleceniu zwrot pieniędzy. Taniej niż zła opinia u partnera.

#### F. Zamknięcie dnia i tygodnia
- **Dzień:** CSV, kopia w chmurze. Zlecenia czekające na akceptację najdłużej: przypomnienie w aplikacji, nie telefon.
- **Poniedziałek:** wskaźniki z aplikacji (odsetek rozbieżności, mediana sprawdzenia, minuty na opłacone zlecenie, dostęp menedżera). Porównanie z warunkami zarządu (`board.md`). Kontrole po 30 dniach na ten tydzień.

### 3. Ludzie

| | Test (grudzień) | Po starcie, 10 zleceń/mies. przy celu 95 min |
|---|---|---|
| Sprawdzenia | 30 × 5–15 min = 2,5–7,5 h | 50 × 5 min = 4,2 h |
| Wizyty i telefony | ok. 10 × 15 min = 2,5 h (nie mierzone, szacunek) | partner zastępuje wizyty |
| Naprawy, kontrola | zależnie od zleceń | 10 × 70 min = 11,7 h |
| **Razem** | **ok. 5–10 h + naprawy** | **ok. 16 h/mies.** |

**Stawka.** Paczka liczy godzinę CEO po 60 zł (`cfo-sources.md`). Dla porównania minimalna stawka godzinowa w 2026 r. to 31,40 zł brutto, a minimalne wynagrodzenie 4 806 zł ([zielonalinia.gov.pl](https://zielonalinia.gov.pl/wynagrodzenie-minimalne-w-2026-1/), [money.pl](https://www.money.pl/gospodarka/placa-minimalna-i-stawka-godzinowa-w-polsce-oto-kwoty-na-rok-2026-7238666721393152a.html)). Wariant gotówkowy przy dzisiejszym czasie daje ok. 30 zł/h, czyli **mniej niż minimalna stawka godzinowa**. Zatrudnienie drugiej osoby ma sens dopiero wtedy, gdy zlecenie trwa krócej niż ok. 95 min. Koszty pracodawcy ponad wynagrodzenie zależą od formy umowy, więc trzeba je sprawdzić z księgowym.

### 4. Narzędzia

| Do czego | Narzędzie | Cena | Dlaczego |
|---|---|---|---|
| Sprawdzenie, wizyta, rejestr, karta | ta aplikacja, zakładka „Test 30 sklepów” | 0 zł | mierzy dokładnie to, czego wymaga zarząd |
| Zmiany w profilach | Profil Firmy w Google, Meta Business Suite | 0 zł | rola menedżera, bez haseł |
| Faktury | Aplikacja Podatnika KSeF (Ministerstwo Finansów) | 0 zł | obowiązek KSeF w B2B: od 1.04.2026; przy sprzedaży fakturowej ≤ 10 000 zł brutto miesięcznie od 1.01.2027 ([ksef.podatki.gov.pl](https://ksef.podatki.gov.pl/informacje-ogolne-ksef-20/zakres-obowiazkowego-ksef/), [infor.pl](https://ksiegowosc.infor.pl/wiadomosci/7577102,ksef-w-2026-roku-obowiazkowy-jakie-obowiazki-ksef-i-dla-kogo-w-2027.html)) |
| Płatność | przelew albo BLIK na telefon | opłaty zależne od banku (do sprawdzenia) | płatność po wykonaniu, bez terminala |
| Druk kart | własna drukarka albo punkt ksero | do sprawdzenia | ok. 10–30 kart w miesiącu |
| Hosting strony | MyDevil (już opłacony) | 20 zł/mies. (szacunek z CFO) | `index.html` jest statyczny |

### 5. Formalności (do potwierdzenia z księgowym i prawnikiem, to nie jest porada prawna)

| Sprawa | Co wiadomo | Gdzie sprawdzić |
|---|---|---|
| **Forma działalności** | Działalność nierejestrowana: limit **10 813,50 zł przychodu na kwartał** w 2026 r. (225% minimalnego wynagrodzenia). Po przekroczeniu jest 7 dni na rejestrację w CEIDG. Przy 149 zł to ok. 72 zlecenia na kwartał. Bez ZUS i bez biura rachunkowego. Warunek: brak własnej działalności w ostatnich 60 miesiącach | [podatki.gov.pl](https://podatki.gov.pl/poradniki-i-informatory/dzialalnosc-nierejestrowana), [money.pl](https://direct.money.pl/artykuly/porady/dzialalnosc-nierejestrowana-2026-limit-10-813,50-zl,-po-przekroczeniu-7-dni-na-ceidg) |
| **VAT** | Zwolnienie podmiotowe do **240 000 zł** sprzedaży rocznie od 1.01.2026 (art. 113 ust. 1). Przy rozpoczęciu w trakcie roku limit liczy się proporcjonalnie. Nie przysługuje przy czynnościach z art. 113 ust. 13; **trzeba potwierdzić, że ta usługa się tam nie mieści** | [podatki.gov.pl](https://podatki.gov.pl/podatki-firmowe/vat/poradniki-i-informatory/zwolnienie-podmiotowe-od-podatku-vat), [infor.pl](https://ksiegowosc.infor.pl/wiadomosci/6852348,nowy-limit-zwolnienia-z-vat-od-2026-roku-240-tys-zl-sejm-uchwalil-nowelizacje-ustawy-o-podatku-od-towarow-i-uslug.html) |
| **ZUS przy JDG** | Kalkulator nie zawiera składek ZUS ani zdrowotnej. Przy zarejestrowanej działalności to stały koszt rzędu kilkuset zł miesięcznie, zależny od ulg i innych tytułów ubezpieczenia | księgowy |
| KSeF | wyżej, w „Narzędziach” | [ksef.podatki.gov.pl](https://ksef.podatki.gov.pl/informacje-ogolne-ksef-20/zakres-obowiazkowego-ksef/) |
| RODO | Działamy w profilu klienta, więc potrzebna jest umowa powierzenia i rejestr czynności. Zapisujemy tylko dane publiczne sklepu | `sposoby-i-bezpieczenstwo.md` |
| Kontakt handlowy | art. 398 PKE: bez zimnych e-maili, telefonów i SMS-ów. Wizyty osobiste i partner | `launch.md` |
| Upoważnienie | Pisemne: zakres zmian, usunięcie nas po zleceniu | wzór: `launch.md`, tydzień 1 |
| Ubezpieczenie OC zawodowe | Nieobowiązkowe. Warto zapytać o cenę, zanim weźmiemy trudne sprawy | oferta ubezpieczyciela |

### 6. Rejestr ryzyk

| # | Ryzyko | Prawdopodobieństwo | Skutek | Plan |
|---|---|---|---|---|
| 1 | Mniej niż 15% sklepów ma rozbieżność | średnie | bardzo duży: brak startu | reguła 21.12 z `launch.md`; inna okolica albo segment |
| 2 | Sprawdzenie trwa dłużej niż 5 min | wysokie na początku | duży: marża | procedura A, mediana co tydzień w aplikacji |
| 3 | Właściciele nie dają dostępu menedżera (< 50%) | średnie | duży | partner jako poręczyciel, karta z danymi opiekuna, instrukcja „jak nas usunąć” |
| 4 | Google odrzuca albo cofa zmianę | średnie | średni | „nie udało się = 0 zł”, rejestr metod, kontrola po 30 dniach |
| 5 | Przekroczenie limitu działalności nierejestrowanej | niskie w 2027 | mały | licznik przychodu w kwartale; 7 dni na CEIDG |
| 6 | Usługa wpada w wyłączenie z art. 113 ust. 13 i trzeba doliczać VAT | nieznane | duży: −18,7% przychodu (149 zł brutto to 121,14 zł netto) | pytanie do księgowego przed pierwszą fakturą |
| 7 | Choroba CEO | średnie | średni | wstrzymanie przyjęć, informacja na stronie (`launch.md`) |
| 8 | Partner się wycofuje | średnie | duży | drugi partner z rozmów grudniowych |
| 9 | Pomyłka w danych klienta (np. złe godziny) | niskie | duży: reputacja | akceptacja przez właściciela przed publikacją, teczka przed/po |
| 10 | Utrata danych testu (dane w jednej przeglądarce) | średnie | średni | CSV codziennie, kopia w chmurze |

### 7. Liczby do CFO

Ten plan nie zmienia `numbers.json`, bo czas pracy trzeba zmierzyć, a nie założyć. Po teście wpisz do `numbers.json` zmierzone wartości: medianę sprawdzenia, liczbę sprawdzeń na opłacone zlecenie i medianę naprawy. Wszystkie trzy pokazuje zakładka „Test 30 sklepów”. Potem uruchom ponownie `/founder-cfo` i `/founder-plan`.

## Launch plan

**Co startuje:** darmowe sprawdzenie, czy klient znajdzie sklep z prawdziwymi danymi w Google i na Facebooku (portret), a potem naprawa za właściciela w jednej cenie. Abonament (opieka) proponujemy dopiero po odbiorze zlecenia i tylko wtedy, gdy jest powód. To powrót do wizji z 6.11 i oferty v3 z 9.11. Skaner raportu z kasy zostaje w szufladzie.

**Oferta testowana na prawdziwych sklepach (v3):**
- Sprawdzenie: bezpłatne, po nazwie i adresie, bez NIP-u. „Wszystko się zgadza” mówimy wprost i nic nie sprzedajemy.
- Naprawa danych: **149 zł brutto jednorazowo**, płatność po wykonaniu. Trudne sprawy (duplikat, przejęty profil, odzyskanie dostępu) mają stałą cenę podaną przed startem.
- Gwarancja: nic nie znaleźliśmy = nic nie płacisz; nie udało się = nie płacisz.
- Jeden opiekun z imieniem, nazwiskiem i telefonem (CEO).

**Do decyzji CEO:** darmowe sprawdzenie stoi w sprzeczności z zasadą „Nic za darmo” z 10.11. Rekomenduję wyjątek: sprawdzenie to nasze narzędzie sprzedaży (ok. 15 min pracy), a płatna jest naprawa. Wszystkie panele mówią to samo: właściciel kupuje dopiero wtedy, gdy zobaczy konkretny błąd we własnym sklepie.

### Dlaczego teraz: prawdziwy powód w grudniu 2026

W grudniu 2026 handel jest dozwolony w trzy niedziele: 6, 13 i 20 grudnia. Wigilia (czwartek 24.12) jest dniem ustawowo wolnym, więc sklepy są zamknięte od 24 do 27 grudnia. Wiele małych sklepów ma w te dni inne godziny niż zwykle. Jeśli Google pokazuje „otwarte”, klient odbija się od zamkniętych drzwi. To konkretna, sprawdzalna rozbieżność z datą. Nie trzeba nikogo straszyć.

---

### Krok 1. Test przed wydaniem pieniędzy (17.11–20.12.2026)

**Dodane 20.11:** przy każdym sprawdzeniu i zleceniu mierzymy też warunki zarządu (`board.md`): medianę czasu sprawdzenia (cel 5 min), minuty na opłacone zlecenie (cel ≤ 120), odsetek nadanych dostępów menedżera (cel ≥ 50%) i konwersję przy każdej cenie. Wszystko liczy zakładka „Test 30 sklepów” w aplikacji. Procedura sprawdzenia jest w `ops.md`.

Usługa, więc test to **płatne zlecenia pilotażowe w docelowej cenie**. Najpierw jednak mierzymy to, od czego zależy cały model (warunek zarządu z 6.11): **u ilu prawdziwych sklepów sprawdzenie znajduje realny błąd.**

| Test | Jak | Linia sukcesu (spisana przed startem) | Porównanie z panelem |
|---|---|---|---|
| A. Trafność sprawdzenia | Ręcznie 30 sklepów w jednej okolicy: godziny (w tym grudniowe niedziele i 24–27.12), adres, telefon, status, duplikaty, Facebook | **≥ 9 z 30 (30%) ma realną rozbieżność**, w tym ≥ 3 trudne sprawy | Panel nie umie tego zmierzyć: oceniał ofertę bez wyniku sklepu |
| B. Płatne zlecenia | Wynik sprawdzenia pokazany osobiście na karcie (papier lub telefon); cena na karcie na zmianę 149 / 179 / 149 / 199 zł (`pricing.md`) | **≥ 3 opłacone zlecenia po 149 zł z ≥ 10 pokazanych wyników** do 20.12 | Panel: 0/20 przy ogólnym opisie, ale ok. 15/20 „zapłaci, gdy zobaczy konkretny błąd” |
| C. Partner | Rozmowy z 3–5 biurami rachunkowymi i 1 hurtownią w tej samej okolicy | **1 partner zgadza się pokazać wyniki swoim klientom** od stycznia | Panele: polecenie księgowej to najczęstszy warunek zakupu |

**Reguły decyzji 21.12.2026:**
- A < 15% → darmowe sprawdzenie nie ma czego sprzedać. Wracamy do `/founder-offer` i nie ma startu w styczniu.
- A ≥ 30%, ale B < 1 → problem leży w zaufaniu albo ofercie, nie w potrzebie. Wtedy `/founder-offer` z prawdziwymi odpowiedziami właścicieli.
- A ≥ 30% i B ≥ 3 → start 18.01.2027.
- Jeśli prawdziwi właściciele kupują wyraźnie rzadziej, niż sugerował panel, ufamy prawdziwym.

**Zasady kontaktu w teście:** wyłącznie wizyty osobiste i karta na papierze. Bez zimnych e-maili, telefonów i SMS-ów, bo art. 398 PKE wymaga uprzedniej zgody, także w B2B. Sprawdzamy tylko dane publiczne, ręcznie.

---

### Krok 2. Odliczanie

Właściciele zadań: **CEO** (Ty) i **Claude** (przygotowanie materiałów, liczenie). ⚑ = ścieżka krytyczna: opóźnienie przesuwa start.

#### Tydzień 1: 17–22.11 — przygotowanie i 30 sprawdzeń
| Zadanie | Kto | Termin |
|---|---|---|
| ✓ Lista kontrolna sprawdzenia (12 pól), stoper i arkusz wyników: panel opiekuna → „Test 30 sklepów” (`index.html#test`), eksport CSV | Claude | 20.11 |
| ✓ Karta wyniku dla sklepu do druku: rozbieżność, źródło, data, cena, gwarancja, dane opiekuna (z aplikacji) | Claude, akceptuje CEO | 20.11 |
| Potwierdzić formę działalności, konto firmowe, wystawianie faktur, płatność BLIK/przelew | CEO | 19.11 |
| Wzór zlecenia i upoważnienia do zmian (zgoda na rolę menedżera, zakres, usunięcie nas po zleceniu) | Claude, sprawdza CEO | 19.11 |
| ⚑ Wybór okolicy i 30 sklepów; sprawdzenie wszystkich (ok. 15 min na sklep, ok. 7,5 h) | CEO | 22.11 |

#### Tydzień 2: 23–29.11 — wizyty i partner
| Zadanie | Kto | Termin |
|---|---|---|
| ⚑ Wizyty w sklepach z rozbieżnością, karta wyniku, propozycja zlecenia | CEO | 29.11 |
| Rozmowy z 3–5 biurami rachunkowymi i hurtownią (scenariusz rozmowy) | Claude przygotowuje, CEO prowadzi | 29.11 |
| Rejestr spraw: typ błędu, źródło, metoda, czas | CEO na bieżąco | stale |

#### Tydzień 3: 30.11–6.12 — realizacja przed pierwszą niedzielą handlową
| Zadanie | Kto | Termin |
|---|---|---|
| ⚑ Wykonanie przyjętych zleceń, w tym godzin na 6, 13 i 20.12 | CEO | 5.12 |
| Teczka zmian dla klienta: zrzut przed i po, z datą | CEO | przy odbiorze |
| Przegląd dnia 14: ile sprawdzeń, rozbieżności, zleceń, minut nza zlecenie | Claude liczy, CEO decyduje | 6.12 |

#### Tydzień 4–5: 7–20.12 — godziny świąteczne, płatności, limit
| Zadanie | Kto | Termin |
|---|---|---|
| Godziny 24–27.12 ustawione u klientów; płatność po wykonaniu | CEO | 18.12 |
| Limit nowych zleceń (np. 10) i lista oczekujących na styczeń | CEO | 13.12 |
| ⚑ Werdykt testu według reguł z kroku 1 | CEO + Claude | 21.12 |

#### 22.12.2026–3.01.2027 — przerwa
Właściciele sklepów mają najgorętszy okres. Ty masz czas dla siebie. Jedyne zadanie: **23.12 sprawdzić, czy u klientów Google pokazuje zamknięte 24–27.12**, i dopisać to do teczek.

#### Tydzień 4–17.01.2027 — przygotowanie startu z partnerem
| Zadanie | Kto | Termin |
|---|---|---|
| ⚑ Umowa lub uzgodnienie z partnerem: co pokazuje klientom i jakim kanałem (tylko tam, gdzie klienci partnera mają zgodę na kontakt) | CEO | 8.01 |
| Konsultacja prawna: regulamin, umowa powierzenia, upoważnienie (1–2 h) | CEO | 12.01 |
| Strona startowa: `index.html` z danymi opiekuna (`CARETAKER`), zgłoszenie sklepu przez telefon lub formularz, który naprawdę do Ciebie trafia | Claude buduje, CEO sprawdza | 14.01 |
| Prawdziwe przykłady (za zgodą klientów z grudnia) zamiast wymyślonych opinii | CEO | 15.01 |
| Kampania od T−14 (4.01) według `marketing.md`, z przekazem przestawionym ze skanera na „klient znajdzie Twój sklep” | Claude | 4.01 |
| Dzień próbny: 3 sprawdzenia z poleceń partnera | CEO | 15.01 |

**Ścieżka krytyczna:** 30 sprawdzeń (22.11) → wizyty (29.11) → zlecenia przed 6.12 → werdykt (21.12) → partner (8.01) → start (18.01).

---

### Krok 3. Dzień startu: poniedziałek 18.01.2027

| Godzina | Co | Kto |
|---|---|---|
| 7:30 | Kontrola: telefon, formularz zgłoszeń, arkusz, wzór faktury, karta wyniku | CEO |
| 8:00 | Partner przekazuje informację swoim klientom swoim kanałem | Partner |
| 9:00–12:00 | Wizyty w 5 sklepach z okolicy z kartą wyniku | CEO |
| 12:00 | Przegląd zgłoszeń; odpowiedź na każde w ciągu 2 h | CEO |
| 13:00–16:00 | Sprawdzenia zgłoszonych sklepów (15 min każde), telefon z wynikiem | CEO |
| 16:00–18:00 | Realizacja przyjętych zleceń | CEO |
| 18:00 | Liczby dnia: zgłoszenia, sprawdzenia, rozbieżności, zlecenia, minuty | CEO, Claude liczy |
| 19:00 | Koniec. Nic po 21:00, tak jak obiecujemy klientom. | — |

**Oferta otwarcia (prawdziwa pilność):** limit zleceń w miesiącu, bo prowadzi je jedna osoba. Bez fałszywych liczników.

**Gdy coś się psuje:**
| Ryzyko | Co robimy |
|---|---|
| Za dużo zgłoszeń | Limit, lista oczekujących z datą, uczciwa informacja na stronie |
| Google nie przyjmuje zmiany | „Nie udało się = nie płacisz”, wpis do rejestru metod, wyjaśnienie klientowi |
| Pole ustala centrala sieci | Nie zmieniamy, przygotowujemy zgłoszenie do centrali |
| Partner się wycofuje | Wizyty osobiste i drugi partner z listy rozmów grudniowych |
| Choroba CEO | Wstrzymanie przyjmowania zgłoszeń, informacja na stronie i SMS do klientów w toku |

---

### Krok 4. Pierwsze 30 dni (18.01–17.02.2027)

**Liczby co tydzień** (CFO dla usługi nie był jeszcze liczony, więc próg rentowności jest uproszczony):
- Koszty stałe ok. 330 zł miesięcznie (hosting 20, domena 10, księgowość 300 z `numbers.json`). 149 zł brutto to 121,14 zł netto, czyli **próg ok. 3 zlecenia w miesiącu**, bez wyceny Twojego czasu.
- Śledzimy: sprawdzenia; odsetek z rozbieżnością; zlecenia na pokazane wyniki; trudne sprawy; minuty na zlecenie; zgłoszenia od partnera; reklamacje.

| Liczba | Poziom, który uruchamia zmianę | Co wtedy |
|---|---|---|
| Rozbieżności w sprawdzeniach | < 15% | Zmienić okolicę lub segment; jeśli nadal źle, `/founder-offer` |
| Zlecenia / pokazane wyniki | < 10% po 20 wynikach | `/founder-offer` z prawdziwymi odpowiedziami |
| Średni czas zlecenia | > 120 min | Wyższa cena trudnych spraw, `/founder-pricing` |
| Zgłoszenia od partnera | 0 przez 2 tygodnie | Drugi partner |
| Zlecenia w miesiącu | < 3 | Próg rentowności nieosiągnięty; przegląd kanału |

**Przeglądy:**
- **Dzień 7 (25.01):** czy zgłoszenia przychodzą od partnera, czy tylko z wizyt? Ile trwa sprawdzenie i zlecenie w praktyce?
- **Dzień 14 (1.02):** czy odsetek rozbieżności trzyma się poziomu z grudnia? Które typy błędów są najczęstsze (rejestr)?
- **Dzień 30 (17.02):** czy jest powód do opieki płatnej co miesiąc (sklepy, którym Google sam zmienił dane, sieci często zmieniające godziny)? Następny partner albo następna okolica? Wtedy `/founder-plan`.

---

Ograniczenia: wyniki paneli to symulacja (górna granica, nie prognoza). Daty prawne pochodzą z publicznych źródeł z 16.11.2026. To nie jest porada prawna ani podatkowa: formę działalności, VAT i umowy sprawdza księgowy i prawnik przed pierwszym zleceniem.

_The panel is simulated buyers and the numbers are projections from your inputs. Confirm demand with real customers and costs with real quotes before you spend. Not financial, legal or tax advice._
