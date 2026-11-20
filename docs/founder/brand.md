# Marka: RaportFirmy.pl · „Sklep w porządku” (20.11.2026)

Ta marka wyrasta z pozycjonowania w `marketing.md` (część A). Ma być przeciwieństwem „firm od wizytówek”: osobiście, z nazwiskiem, płatne po wykonaniu, bez obietnic. W panelu ludzie odmawiali z braku zaufania, a nie przez cenę, więc marka ma przede wszystkim budzić zaufanie.

## 1. Nazwa

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

## 2. Obietnica i głos

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

## 3. Wygląd (brief)

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
