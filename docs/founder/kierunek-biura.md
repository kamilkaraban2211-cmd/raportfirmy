# Kierunek: biuro rachunkowe jako klient

Wersja z 18.11.2026. Dokument rozstrzyga jedno pytanie: **kto płaci.** Opiera się na pięciu panelach z `docs/founder/panel-*`, kalkulacji z `cfo.md`, cenniku z `pricing.md` i na danych rynkowych przytoczonych w rozdziale 3. Nie unieważnia `ZARYS-APLIKACJI.md` — zmienia w nim kolejność i adresata.

> **Jednym zdaniem:** biuro rachunkowe kupuje roczny dostęp, rozdaje aplikację swoim klientom handlowym za darmo i przestaje gonić ich o dokumenty; sklep nigdy nie staje przed ceną.

---

## 1. Dlaczego zmieniamy adresata

Pięć paneli, pięć zer. Ta sama dwudziestka osób (identyczny `personas.json`, seed 483380) pokazana pięć razy.

| Panel | Oferta | Cena | Kupuje |
|---|---|---|---:|
| `panel-v1` | Google + Facebook, abonament | 99 zł/mies. | **0/20** |
| `panel-v2` | Google + Facebook, naprawa | 149 zł jednorazowo | **0/20** |
| `panel-skaner49` | Skaner raportu z kasy | 49 zł/mies. | **0/20** |
| `panel-kontrola29` | Skaner raportu z kasy | 29 zł/mies. | **0/20** |
| `panel-czas` | „Kasa z głowy”, obietnica czasu | 29 zł/mies. | **0/20** |

Pięć różnych ofert, pięć różnych cen, dwie różne obietnice, jeden wynik. Przy takim rozkładzie przestajemy poprawiać ofertę i zmieniamy kupującego.

### 1.1. Strażnik bramy zależy od produktu

Policzone na wszystkich 100 plikach `answers/*.json`, pole `would_change_my_mind`:

| Panel | Produkt | księgowa / biuro | centrala / sieć | znajomy / hurtownia |
|---|---|---:|---:|---:|
| `panel-v1` | Google + FB | **2/20** | 4/20 | 5/20 |
| `panel-v2` | Google + FB | **2/20** | 5/20 | 4/20 |
| `panel-skaner49` | kasa | 13/20 | 4/20 | 4/20 |
| `panel-kontrola29` | kasa | 15/20 | 4/20 | 5/20 |
| `panel-czas` | kasa | **20/20** | 5/20 | 2/20 |

**Wniosek, który zmienia plan:** księgowa nie jest uniwersalnym strażnikiem bramy. Jest nim wyłącznie dla produktu kasowego, bo raport z kasy to dokument, który i tak ląduje na jej biurku. Dla Google i Facebooka strażnikiem jest **centrala sieci**.

To są dwa biznesy, nie jeden. „Wejdziemy przez biura rachunkowe” nie ratuje produktu z rozdziału 3 `ZARYS` i nie ratuje startu 18.01.2027 — to jest propozycja innej firmy, z produktem z etapu 3.

### 1.2. Czego te liczby nie dowodzą

`would_change_my_mind` to najsłabsze dane w całym panelu. Nikt nie zapłacił złotówki, a „musiałaby polecić mi księgowa” jest grzeczną formą odmowy, która nic nie kosztuje i przerzuca odpowiedzialność na osobę trzecią. To symulacja, nie opinie klientów.

Te liczby nie mówią „biura kupią”. Mówią **„decyzja nie należy do właściciela”** — i to jest fakt o procesie zakupowym, nie o popycie. Popyt trzeba sprawdzić (rozdział 10).

---

## 2. Kto kupuje

**Właściciel biura rachunkowego**, 2–10 osób, 50–200 obsługiwanych firm, pracuje na Comarch Optima lub Symfonii, sam podejmuje decyzje zakupowe o oprogramowaniu.

| | |
|---|---|
| **Płaci** | biuro, raz w roku, z faktury |
| **Decyduje** | właściciel biura (nie dział zakupów — to mikrofirma) |
| **Używa** | księgowa prowadząca klientów handlowych |
| **Dostaje za darmo** | właściciel sklepu, od swojej księgowej |
| **Nigdy nie widzi ceny** | właściciel sklepu |

---

## 3. Dlaczego teraz

Dane o kondycji branży z listopada 2026:

| Wskaźnik | Wartość | Źródło |
|---|---|---|
| Biura z trudnościami w rekrutacji | **61,6%** | Barometr księgowości, fillup |
| Biura, które nie planują zwiększać zatrudnienia | **51,4%** | Barometr księgowości, fillup |
| Samodzielny księgowy jako zawód deficytowy | **226 powiatów** | Barometr Zawodów 2026 |
| Księgowi zgłaszający drastyczny wzrost pracochłonności | **65,9%** | fillup |
| Wskazujący KSeF i nowe JPK jako obciążenie | **82,4%** | fillup |
| Indeks Nastrojów Księgowych (próg neutralny 50) | **38,3** | INK |
| Podwskaźnik dostępności kadr | **11,9** | INK |
| Mediana wynagrodzenia doświadczonej księgowej | **9 050 zł brutto** | Infor, 2026 |

Nagłówek branżowy, który streszcza całą tezę: *„Paradoks rentowności biur rachunkowych: obowiązków przybywa, ale przychodów — niekoniecznie.”*

**Wąskim gardłem biura nie są pieniądze, tylko moc przerobowa.** Nie może przyjąć kolejnego klienta, bo nie ma kogo zatrudnić. Księgowa nie jest za droga — jej po prostu nie ma.

Drugie okno: **KSeF**. 82,4% wskazuje go jako obciążenie, a biura są teraz w trakcie przestawiania procesów. Za rok procesy się ułożą i to wejście się zamknie.

---

## 4. Co kupuje

> **„Twoi klienci handlowi przestają być tymi, których trzeba ścigać o papiery.”**

Biuro płaci raz w roku i rozdaje aplikację swoim klientom detalicznym. Raporty fiskalne i zestawienia przychodzą same: odczytane, z kontrolą sum, w formacie, który biuro importuje. Biuro nie dzwoni, nie przypomina, nie przepisuje.

Co już istnieje w repozytorium: `skaner/index.html` — odczyt raportu fiskalnego, kontrola sum (PTU, łączna należność), porównanie okresów. Działa jako artefakt Claude; nie ma serwera, kont ani wielu firm na jednym koncie.

Czego brakuje do wersji dla biura:

| Element | Stan |
|---|---|
| Konto biura z wieloma firmami klientów | brak |
| Eksport w formacie przyjmowanym przez Optimę/Symfonię | brak, **do ustalenia w rozmowach** |
| Zaproszenie klienta przez biuro (bez samodzielnej rejestracji) | brak |
| Widok „czego brakuje w tym miesiącu” dla biura | brak |
| Serwer, RLS, 2FA, dziennik dostępu | opisane w `sposoby-i-bezpieczenstwo.md`, niezbudowane |

---

## 5. Dlaczego klient pójdzie za poleceniem

Bo **nie musi niczego kupić.** W stu symulowanych rozmowach przegrywaliśmy zawsze w tym samym punkcie — moment zapłaty. Tutaj ten moment znika: klient dostaje aplikację od księgowej, za darmo, skonfigurowaną przez nią.

Panele napisały ten scenariusz dosłownie:

> „Gdyby moja własna księgowa powiedziała, że z tym jej i mnie jest łatwiej i taniej, **i sama mi to ustawiła, tak żebym nie musiał nic konfigurować**.” — P014, `panel-czas`

> „Gdyby moja księgowa sama poprosiła o ten eksport.” — `panel-kontrola29`

Zastrzeżenie z 1.2 obowiązuje: to są deklarowane warunki, nie zakupy.

---

## 6. Cena

**Hipoteza: 4 900 zł netto rocznie za biuro, do 30 firm klienckich.** Próg schodkowy, nie cena płaska — tak wycenia cały rynek.

To nie jest nowa linia w budżecie biura, tylko istniejąca:

| Co biuro już kupuje | Cena |
|---|---|
| Symfonia eBiuro, do 10 klientów | 350–450 zł netto/mies. = **4 200–5 400 zł/rok** |
| Comarch Optima Biuro Rachunkowe, licencja | od **2 490 zł** za stanowisko; wariant do 10 podmiotów 2 950–5 900 zł |
| Comarch OCR, pakiet 6 000 stron | **2 320 zł** |

Ceny z serwisów poradnikowych, nie z oficjalnych cenników; traktować orientacyjnie.

**Argument sprzedażowy nie jest kosztowy, tylko przychodowy:** 15 klientów więcej bez zatrudniania to 15 × 300 zł × 12 = **54 000 zł rocznie** przeciwko 4 900 zł. Właściciel biura jest właścicielem — historie o przychodzie kupuje, historie o koszcie odkłada.

### 6.1. Dlaczego to bije sprzedaż właścicielom

| | 30 sklepów po 29 zł/mies. | 1 biuro, 30 firm |
|---|---:|---:|
| Przychód roczny | 10 440 zł brutto | 4 900 zł netto |
| Liczba sprzedaży | 30 | **1** |
| Punkty rezygnacji | 30 | 1 |
| Relacje wsparcia | 30 | **biuro przejmuje** |
| Zmierzona konwersja | **0/20** | niezmierzona |

Wsparcie to 58% kosztów zmiennych wg `cfo.md`. W modelu przez biuro przejmuje je biuro. Połowa przychodu przy ułamku kosztu obsługi — i, co ważniejsze, przy konwersji 0/20 u właścicieli 4 900 zł od jednego biura jest nieskończenie więcej niż zero od trzydziestu sklepów.

---

## 7. Pozycjonowanie: wąska maszyna, nie pracownik AI

W maju 2026 warszawsko-monachijski **Viktor** wziął wg doniesień 75 mln USD od Accela na „AI coworkera” w Slacku i Teams, pozycjonowanego jako pracownik, nie chatbot. To potwierdza kategorię i **nie jest konkurencją** — polskie biuro rachunkowe pracuje na Optimie i mailu, Slacka nie ma i mieć nie będzie.

Ale pokazuje zarzut, który nas dotyczy: **agent z szerokim dostępem wyprowadza dane z firmy, a nikt nie potrafi tego sprawdzić.** U biura rachunkowego ten zarzut jest prawny, nie emocjonalny: biuro ma umowę powierzenia z każdym klientem, obowiązkowe OC i to ono odpowiada przed klientem, nie my.

Panel powiedział to najcelniej:

> „‚zdjęć nie przechowujemy’ to tylko zdanie na stronie, **nie umiem tego sprawdzić**.” — P017

**Problemem nie jest nasze bezpieczeństwo. Problemem jest brak możliwości weryfikacji.** Stąd pozycja odwrotna do Viktora:

1. **AI nie dostaje danych identyfikujących.** Nie może wynieść tożsamości, której nie otrzymała. Architektura, nie polityka prywatności.
2. **Zero dostępu ogólnego.** Odmawiamy dostępu, którego nie potrzebujemy, i piszemy to w ofercie jako funkcję.
3. **Dziennik dostępu, który biuro eksportuje i pokazuje klientowi.** Zamiast „zaufaj nam” — log.
4. **Biuro zostaje administratorem.** My jesteśmy podprocesorem.

### 7.1. Język: czego nigdy nie mówimy

Teza „AI przejmuje pracę compliance’ową” jest trafna jako strategia i samobójcza jako komunikat. Sprzedajemy księgowej; ocenia to księgowa; rekomenduje klientowi księgowa.

| Myślimy | Mówimy |
|---|---|
| AI zastępuje etat księgowej | „Rośniesz bez rekrutacji, której i tak nie domkniesz” |
| Redukcja kosztów osobowych | „Twoi ludzie przestają przepisywać i zaczynają doradzać” |
| Automatyzacja compliance | „Przestajesz gonić klientów o dokumenty” |

Zakazane w materiałach: „zastąpi”, „nie będziesz potrzebować”, „bez księgowej”, „pracownik AI”, „automatycznie za ciebie decyduje”.

---

## 8. Łańcuch powierzenia — luka do zamknięcia przed pierwszą rozmową

`sposoby-i-bezpieczenstwo.md` zakłada, że administratorem jest właściciel sklepu, a my procesorem. W modelu przez biuro łańcuch jest inny:

```
klient sklepu   →   biuro rachunkowe   →   my
(administrator)     (procesor)             (podprocesor)
```

Wchodzimy jako **podpowierzenie** (RODO art. 28 ust. 2 i 4). Konsekwencje:

1. **Biuro musi mieć zgodę swoich klientów na podpowierzenie** — albo ma ją w umowach, albo musi je zmienić. To pierwsze pytanie prawnika biura.
2. **Biuro odpowiada przed klientem za nas.** Potrzebuje dokumentu, który pokaże dalej, nie obietnicy.
3. **Separacja w bazie musi rozdzielać biura, nie tylko firmy.** RLS i `DziennikDostępu` są zaprojektowane na poziomie `Firma`/`Placówka`; dochodzi poziom wyżej.
4. **Usunięcie danych przy odejściu klienta od biura**, nie tylko przy rezygnacji z usługi.

### 8.1. Zasada dwóch kolumn

Polityka z `sposoby-i-bezpieczenstwo.md` jest solidna, ale napisana w trybie planu: „zapytanie o Zero Data Retention”, „w etapie 2 przetwarzanie w UE”, „do ustalenia z prawnikiem”, „po sprawdzeniu zgodności”. Etap 1 bezpieczeństwa (RLS, 2FA, kopie) jest na liście 30-dniowej, czyli niezbudowany.

W materiałach dla biura **nigdy jedna kolumna**:

| Co już działa | Co zrobimy, gdy o to poprosicie |
|---|---|
| Zdjęć nie przechowujemy | Przetwarzanie AI w UE (Bedrock, Frankfurt) |
| Do AI nie trafia NIP ani nazwa firmy | Zero Data Retention |
| Google Analytics wyłączone | Test penetracyjny |

Jedno zdanie w czasie teraźniejszym, które okaże się planem, kasuje nas u tego kupującego na zawsze — bo potwierdza dokładnie tę obawę, z którą przyszedł. Data w przyszłości jest dla księgowego normalną, wiarygodną odpowiedzią. Rozmyta obietnica nie jest.

---

## 9. Wejście na rynek

W kolejności siły:

| # | Kanał | Uwaga |
|---|---|---|
| 1 | **KSeF jako temat wejściowy** | 82,4% wskazuje go jako obciążenie. Praktyczna pomoc otwiera rozmowę z każdym biurem. Okno zamyka się, gdy procesy się ułożą. |
| 2 | **Sieć absolwencka ALK** | Pierwsze 3–5 biur ciepłych zamiast zimnych. Filtr na LinkedIn: uczelnia + „biuro rachunkowe”/„księgowość”/„właściciel”. Warszawa ma największe zagęszczenie biur w Polsce. |
| 3 | **Grupy branżowe na Facebooku** | Główny kanał wymiany opinii między księgowymi. **Nie wolno tam sprzedawać** — wyłącznie być użytecznym. Miesiące odpowiadania bez linku, potem jeden post. |
| 4 | **Stowarzyszenie Księgowych w Polsce** | Oddziały w każdym regionie, szkolenia. Webinar z oddziałem to dystrybucja z pieczątką instytucji, co rozwiązuje zarzut zaufania. |
| 5 | **Konferencje branżowe** | Regularne, siedzi tam dokładnie nasz kupujący. |
| 6 | **Wizyty bezpośrednie** | Ten sam plan co `launch.md`, lepszy cel: biuro ma adres, stronę i właściciela, który umawia spotkania. Sklepikarz stoi za ladą dwanaście godzin. |
| 7 | **Być narzędziem sprzedażowym biura** | Biura też walczą o klientów. „U nas nie przywozisz papierów” to ich argument. Wtedy jesteśmy po stronie ich przychodu, nie kosztu. |

**Zasada nadrzędna:** pierwsze trzy biura sprzedają następnych dziesięć. Branża jest ciasna i działa na polecenia. Trzy pierwsze prawie za darmo, w zamian za wspólne budowanie i jedną liczbę do materiału („minus X godzin miesięcznie na kliencie handlowym”). Dopiero tą liczbą sprzedajemy za 4 900 zł.

---

## 10. Test przed budową

Nie powtarzamy błędu ze sklepami. Nic nie budujemy, dopóki nie przeprowadzimy rozmów.

**5 rozmów z biurami rachunkowymi. Pytania w tej kolejności:**

1. Ile firm obsługujecie i ile z nich to handel detaliczny z kasą fiskalną?
2. Ile minut miesięcznie schodzi na jednego takiego klienta: raporty kasowe, gonienie o dokumenty, telefony z pytaniami?
3. Ile płacicie teraz za Comarch/Symfonię/Saldeo i kto podejmuje taką decyzję?
4. **Czy w ostatnich 12 miesiącach odmówiliście przyjęcia klienta, bo nie było mocy przerobowych?**
5. Gdyby narzędzie pozwoliło przyjąć 10 firm więcej bez zatrudniania, ile to jest warte?
6. Czy przyjęlibyście podpowierzenie danych waszych klientów i co musicie mieć, żeby to było możliwe?
7. W jakim formacie chcecie dostawać zestawienie, żeby weszło do waszego programu bez przepisywania?

Pytanie 1 testuje najgroźniejsze założenie w pierwszych minutach. Pytanie 4 testuje całą tezę o mocy przerobowej.

### 10.1. Bramka decyzyjna — 21.12.2026

Data jest już w `launch.md` jako dzień werdyktu testu. Nie przesuwamy jej; zmieniamy to, o czym rozstrzyga.

| Wynik | Decyzja |
|---|---|
| **3+ z 5 biur odpowiada „tak” na pytanie 4**, a klienci handlowi to realna część ich portfela | Kierunek potwierdzony. Start 18.01.2027 przesunięty, budujemy wersję dla biur. |
| Biura mają klientów, ale brakuje im marży, nie mocy | Teza o mocy przerobowej pada. Wracamy do argumentu kosztowego i konkurujemy z Comarchem na jego boisku. |
| Klienci handlowi to margines portfela (np. 12 ze 100) | Kierunek odrzucony. Wracamy do właściciela albo do centrali sieci. |

---

## 11. Ryzyka

| # | Ryzyko | Jak sprawdzamy |
|---|---|---|
| 1 | **Biuro ma za mało klientów handlowych z kasą fiskalną** — dotykamy 12% ich bólu | Pytanie 1, pierwsze minuty pierwszej rozmowy |
| 2 | Biura mają dość klientów i nie szukają mocy przerobowej | Pytanie 4 |
| 3 | Eksport nie wchodzi do Optimy/Symfonii bez przepisywania — cała oszczędność znika | Pytanie 7; prototyp eksportu przed sprzedażą |
| 4 | Biuro nie chce brać na siebie podpowierzenia | Pytanie 6; dokument z rozdziału 8 gotowy przed rozmową |
| 5 | Biuro nie zechce rozdawać aplikacji klientom (praca po jego stronie) | Zapytać wprost; rozważyć, że to my konfigurujemy klientów |
| 6 | **Brak kompetencji księgowej w zespole** | Wspólniczka albo doradczyni z praktyką w biurze — grudzień |
| 7 | Gotówka 2 154 zł, brak serwera | Pierwsze płatności od biur pilotażowych przed budową reszty (`sposoby-i-bezpieczenstwo.md` pkt 17) |
| 8 | Repozytorium jest publiczne i zawiera ceny, koszty i plany | Otwarta decyzja #7 w `ZARYS`; ten dokument ją zaostrza |

---

## 12. Co to zmienia w ZARYS-APLIKACJI.md

| `ZARYS` mówi | Ten dokument proponuje |
|---|---|
| Biuro rachunkowe to **kanał** (rozdz. 1) | Biuro to **płacący klient** |
| Plan „Biuro” w **II półroczu 2027** (rozdz. 11) | Plan „Biuro” jako **produkt pierwszy** |
| Start 18.01.2027 z naprawą Google/FB dla właścicieli | Start uzależniony od bramki 21.12; przy potwierdzeniu — przesunięty |
| Kasa w **etapie 3** | Kasa jako rdzeń produktu dla biura |
| Cena 29 zł/mies. od właściciela | 4 900 zł/rok od biura; właściciel dostaje za darmo |

Rozdziały `ZARYS` o zasadach produktu (2), bezpieczeństwie (9) i prawie (10) **obowiązują bez zmian**, z uzupełnieniem o łańcuch podpowierzenia z rozdziału 8 tutaj.

---

## 13. Czego ten dokument nie dowodzi

Żaden z pięciu paneli nie zapytał ani jednego biura rachunkowego. `pricing.md` stwierdza to wprost: *„Ceny za firmę klienta nie wyznaczam: panel nie pytał biur.”*

Wszystko powyżej jest hipotezą zbudowaną na strukturze rynku i na tym, czego odmówili właściciele — **nie na dowodzie popytu po stronie biur**. Cena 4 900 zł jest punktem odniesienia z cenników konkurencji, nie ustaleniem. Liczba 15 dodatkowych klientów jest ilustracją, nie prognozą.

Jedyną rzeczą, która zamienia ten dokument w decyzję, jest pięć rozmów z rozdziału 10.

---

**Źródła rynkowe:** Barometr księgowości (fillup) · Indeks Nastrojów Księgowych (Infor) · Barometr Zawodów 2026 · „Paradoks rentowności biur rachunkowych” (Infor) · zarobki księgowych 2026 (Infor) · cenniki Comarch Optima i Symfonia (zestawienia poradnikowe, orientacyjne) · doniesienia o rundzie Viktora (Fortune, maj 2026).

**Źródła wewnętrzne:** `panel-v1/`, `panel-v2/`, `panel-skaner49/`, `panel-kontrola29/`, `panel-czas/`, `wszyscy-P.md`, `cfo.md`, `pricing.md`, `czas-dla-siebie.md`, `sposoby-i-bezpieczenstwo.md`, `launch.md`, `../../ZARYS-APLIKACJI.md`.
