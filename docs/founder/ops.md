# Operacje: „Sklep w porządku” (20.11.2026)

Usługę robi jedna osoba (CEO, opiekun). Nie ma towaru, lokalu ani dostawców w zwykłym sensie. Jedyny prawdziwy koszt to czas, a kalkulator pokazał, że to on decyduje o całym biznesie (`cfo.md`). Ten plan ma więc jeden cel: **zejść z 242,5 do ok. 95 minut na opłacone zlecenie** i nie zgubić przy tym jakości. Narzędzie do mierzenia jest w aplikacji: panel opiekuna → „Test 30 sklepów” (`index.html#test`).

## 1. Cykl dnia

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

## 2. Procedury (każda na jedną stronę)

### A. Sprawdzenie w 5 minut (12 pól z aplikacji)

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

### A2. Test telefonu (ok. 1 min na sklep, seriami)
Dzwonimy pod numer z Google, a jeśli jest inny, także pod numer z Facebooka, **w godzinach otwarcia podanych w Google**. W aplikacji zapisujemy tylko to, co usłyszał dzwoniący: odebrał sklep, nikt nie odbiera (30 s), poczta głosowa, zajęte, abonent niedostępny, numer nie istnieje, inna firma albo osoba prywatna. Zły wynik sam dopisuje się do rozbieżności i trafia na kartę wyniku („dzwoniący usłyszał komunikat, że numer nie istnieje”).

**Maksimum prywatności:** nie nagrywamy rozmów, nie zapisujemy ich treści, tego, kto odebrał, ani samego numeru. Jeśli ktoś odbierze: „Dzień dobry, sprawdzam, czy numer z Google działa. Działa, dziękuję, do widzenia.” Nie udajemy klienta i nie składamy oferty, bo to nie jest kontakt handlowy (art. 398 PKE). **Nie analizujemy głosu ani emocji** (zasada 9 z `ZARYS-APLIKACJI.md`, AI Act art. 50 ust. 3; głos to dane biometryczne, RODO art. 9).

### B. Wizyta z kartą wyniku
1. Wydruk karty z aplikacji („Karta wyniku dla sklepu”). Cena na karcie zmienia się sama (149, 179, 149, 199 zł) na potrzeby testu cen.
2. Przy ladzie, gdy nie ma klientów: „Dzień dobry, sprawdzam, co klienci widzą o sklepach na tej ulicy w Google. U Pana/Pani wyszło jedno: [zdanie z karty]. Zostawiam kartkę.”
3. Bez naciskania. „Poprawię sam” to dobra odpowiedź: mówimy jak, za darmo.
4. Jeśli właściciel chce zlecić: umawiamy telefon w wybranej porze. Zgody na kontakt nie bierzemy w ciemno (art. 398 PKE). Właściciel sam podaje numer i porę.
5. W aplikacji: „Wynik pokazany”, decyzja.

### C. Naprawa
1. Telefon (cel 10 min): właściciel dodaje opiekuna jako **menedżera** w Profilu Firmy w Google (Profil → „Osoby i dostęp”) i daje dostęp do strony na Facebooku (Meta Business Suite). Haseł nie bierzemy.
2. Zrzut ekranu „przed” z datą.
3. Zmiany: godziny specjalne na konkretne dni (Google zaleca godziny niestandardowe przy zamknięciu do 7 dni, [pomoc Google](https://support.google.com/business/answer/14368911?hl=pl)), telefon, adres, opis. Na Facebooku to samo.
4. ✱ Zmiany do akceptacji w aplikacji klienta, a po akceptacji publikacja.
5. ✱ Teczka: zrzut „po” z datą i instrukcja, jak nas usunąć z profilu.
6. Rejestr: typ błędu, źródło, metoda, minuty. Termin kontroli za 30 dni.

### D. Trudna sprawa (duplikat, przejęty profil, zmiany wprowadzane przez Google)
Cena stała przed startem (`pricing.md`). Zgłoszenia wysyłamy przez oficjalne formularze pomocy Google. Termin jest po stronie Google, więc mówimy o tym klientowi wprost. Jeśli przekroczymy 6 h pracy, ryzyko jest nasze. Nie udało się = 0 zł.

### E. Reklamacja
1. Telefon oddzwaniamy w ciągu 2 h (godziny pracy).
2. Jeśli to nasz błąd: poprawka bez dopłaty. Jeśli Google cofnął zmianę: poprawka bez dopłaty i wpis w rejestrze, bo to argument za opieką.
3. Jeśli klient jest niezadowolony mimo poprawnego wykonania: przy pierwszym zleceniu zwrot pieniędzy. Taniej niż zła opinia u partnera.

### F. Zamknięcie dnia i tygodnia
- **Dzień:** CSV, kopia w chmurze. Zlecenia czekające na akceptację najdłużej: przypomnienie w aplikacji, nie telefon.
- **Poniedziałek:** wskaźniki z aplikacji (odsetek rozbieżności, mediana sprawdzenia, minuty na opłacone zlecenie, dostęp menedżera). Porównanie z warunkami zarządu (`board.md`). Kontrole po 30 dniach na ten tydzień.

## 3. Ludzie

| | Test (grudzień) | Po starcie, 10 zleceń/mies. przy celu 95 min |
|---|---|---|
| Sprawdzenia | 30 × 5–15 min = 2,5–7,5 h | 50 × 5 min = 4,2 h |
| Wizyty i telefony | ok. 10 × 15 min = 2,5 h (nie mierzone, szacunek) | partner zastępuje wizyty |
| Naprawy, kontrola | zależnie od zleceń | 10 × 70 min = 11,7 h |
| **Razem** | **ok. 5–10 h + naprawy** | **ok. 16 h/mies.** |

**Stawka.** Paczka liczy godzinę CEO po 60 zł (`cfo-sources.md`). Dla porównania minimalna stawka godzinowa w 2026 r. to 31,40 zł brutto, a minimalne wynagrodzenie 4 806 zł ([zielonalinia.gov.pl](https://zielonalinia.gov.pl/wynagrodzenie-minimalne-w-2026-1/), [money.pl](https://www.money.pl/gospodarka/placa-minimalna-i-stawka-godzinowa-w-polsce-oto-kwoty-na-rok-2026-7238666721393152a.html)). Wariant gotówkowy przy dzisiejszym czasie daje ok. 30 zł/h, czyli **mniej niż minimalna stawka godzinowa**. Zatrudnienie drugiej osoby ma sens dopiero wtedy, gdy zlecenie trwa krócej niż ok. 95 min. Koszty pracodawcy ponad wynagrodzenie zależą od formy umowy, więc trzeba je sprawdzić z księgowym.

## 4. Narzędzia

| Do czego | Narzędzie | Cena | Dlaczego |
|---|---|---|---|
| Sprawdzenie, wizyta, rejestr, karta | ta aplikacja, zakładka „Test 30 sklepów” | 0 zł | mierzy dokładnie to, czego wymaga zarząd |
| Zmiany w profilach | Profil Firmy w Google, Meta Business Suite | 0 zł | rola menedżera, bez haseł |
| Faktury | Aplikacja Podatnika KSeF (Ministerstwo Finansów) | 0 zł | obowiązek KSeF w B2B: od 1.04.2026; przy sprzedaży fakturowej ≤ 10 000 zł brutto miesięcznie od 1.01.2027 ([ksef.podatki.gov.pl](https://ksef.podatki.gov.pl/informacje-ogolne-ksef-20/zakres-obowiazkowego-ksef/), [infor.pl](https://ksiegowosc.infor.pl/wiadomosci/7577102,ksef-w-2026-roku-obowiazkowy-jakie-obowiazki-ksef-i-dla-kogo-w-2027.html)) |
| Płatność | przelew albo BLIK na telefon | opłaty zależne od banku (do sprawdzenia) | płatność po wykonaniu, bez terminala |
| Druk kart | własna drukarka albo punkt ksero | do sprawdzenia | ok. 10–30 kart w miesiącu |
| Hosting strony | MyDevil (już opłacony) | 20 zł/mies. (szacunek z CFO) | `index.html` jest statyczny |

## 5. Formalności (do potwierdzenia z księgowym i prawnikiem, to nie jest porada prawna)

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

## 6. Rejestr ryzyk

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

## 7. Liczby do CFO

Ten plan nie zmienia `numbers.json`, bo czas pracy trzeba zmierzyć, a nie założyć. Po teście wpisz do `numbers.json` zmierzone wartości: medianę sprawdzenia, liczbę sprawdzeń na opłacone zlecenie i medianę naprawy. Wszystkie trzy pokazuje zakładka „Test 30 sklepów”. Potem uruchom ponownie `/founder-cfo` i `/founder-plan`.
