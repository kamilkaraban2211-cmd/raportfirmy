# Cena: Skaner raportu z kasy (16.11.2026)

Podstawa: panel 20 symulowanych właścicieli sklepów (seed 483380) z ofertą skanera za 49 zł brutto/mies. (`panel/`, `pricing-curve.md`), ceny zamienników z publicznych cenników i kalkulator CFO (`numbers-opt.json`, konfiguracja zoptymalizowana). Odpowiedzi symulowanych kupujących pokazują, co testować. Nie są dowodem.

## 1. Co powiedzieli kupujący

**0 kupuje · 20 rezygnuje.** Powody: brak potrzeby 13, przyzwyczajenie 4, zaufanie 2, wygoda 1.

| Punkt | Cena brutto/mies. | Znaczenie |
|---|---:|---|
| PMC | 9 zł | poniżej: „za tanio, żeby było dobre” |
| OPP | 9 zł | najmniejszy opór |
| IPP | 19 zł | tyle samo osób mówi „okazja”, co „drogo” |
| PME | 35 zł | powyżej: zbyt wielu nie kupi wcale |

**Akceptowalny zakres: 9–35 zł brutto miesięcznie.** Mediany: za tanio 5 zł, okazja 15 zł, zaczyna być drogo 30 zł, za drogo 49 zł. **Obecne 49 zł jest powyżej zakresu.**

Cena nie jest jednak główną blokadą. Kupujący odmawiają, bo te same liczby widzą już na wydruku, w programie sklepowym albo w systemie centrali, a codzienne zdjęcie to dodatkowa praca. **12 z 20 osób pisze, że zmieniłoby zdanie, gdyby księgowa przyjmowała eksport z aplikacji i dzięki temu taniej lub prościej je obsługiwała.** 11 z 20 osób brakuje zysku i marży, których raport z kasy nie zawiera.

## 2. Zamienniki i ich ceny

| Zamiennik | Cena | Co daje |
|---|---|---|
| Raporty w samej kasie i wydruk dobowy | 0 zł (w cenie kasy) | sprzedaż, paragony; bez porównań i wyjaśnień |
| Zeszyt / arkusz właściciela | 0 zł + czas | porównanie tydzień do tygodnia |
| Księgowa | w cenie obsługi biura | rozliczenie, nie analiza |
| Fakturowo (fakturowanie online) | 15 zł brutto/mies., 100 zł/rok | punkt odniesienia dla małego SaaS dla firm |
| Comarch OCR&KSeF dla firm, pakiet Mikro | 130 zł/mies. za 250 stron | odczyt dokumentów, kupowany głównie przez księgowość |
| Shopify Basic | 79 zł/mies. (rocznie) lub 109 zł | inna kategoria: sklep internetowy, górna granica dla małej firmy |

Dla właściciela najbliższym zamiennikiem jest darmowy wydruk z kasy. Stąd niski akceptowalny zakres.

## 3. Marża przy różnych cenach (kalkulator CFO, konfiguracja zoptymalizowana)

| Cena brutto/mies. | Netto | Wkład na klienta | Próg rentowności | Zysk w 1. roku (ramp 3 → 50) | Zwrot startu |
|---:|---:|---:|---:|---:|---|
| 19 zł | 15,45 zł | 10,35 zł | 32 klientów | −969 zł | nie w 1. roku |
| 29 zł | 23,58 zł | 18,48 zł | 18 klientów | 1 381 zł | nie w 1. roku |
| 39 zł | 31,71 zł | 26,61 zł | 13 klientów | 3 730 zł | 10. miesiąc |
| 49 zł | 39,84 zł | 34,74 zł | 10 klientów | 6 080 zł | 9. miesiąc |

Prowizję za płatność przyjąłem stałą (0,98 zł/mies.); przy niższej cenie jest nieco niższa, więc te wyniki są lekko zaniżone.

## 4. Decyzja

**Plan właściciela: 29 zł brutto miesięcznie albo 290 zł rocznie (dwa miesiące w cenie płatności rocznej).**

- To najniższa cena w akceptowalnym zakresie, przy której firma w 1. roku nie traci na działalności operacyjnej (19 zł daje stratę).
- Leży poniżej progu „za drogo” (35 zł) i blisko mediany „zaczyna być drogo” (30 zł). Kupujący odczują ją jako wyraźną, ale nie odrzucą jej z samego powodu ceny.
- Słabość: próg rentowności to 18 klientów, a wydatki startowe nie zwracają się w 1. roku przy moim rampie. Plan właściciela sam nie utrzyma firmy.

**Główny produkt do sprawdzenia to plan dla biura rachunkowego.** Księgowa jest jednocześnie powodem odmowy („księgowa i tak to dostaje”) i najczęstszym warunkiem zakupu. Skaner powinien skracać biuru pracę z raportami kasowymi klientów i wtedy to biuro kupuje albo poleca. Ceny za firmę klienta nie wyznaczam: panel nie pytał biur. Trzeba ją ustalić w rozmowach z 3–5 biurami. Punkt odniesienia z rynku: Comarch OCR&KSeF Mikro kosztuje 130 zł miesięcznie za 250 stron.

## 5. Drabina

| Plan | Cena | Co zawiera | Powód, żeby wejść wyżej |
|---|---|---|---|
| **Kasa** | 29 zł/mies. lub 290 zł/rok | raporty fiskalne, kontrola sum, porównania, eksport dla księgowej | wejście |
| **Kasa + Towary** | 49 zł/mies. (dopiero gdy funkcja będzie gotowa) | dodatkowo raport sprzedaży towarów: co się sprzedaje lepiej i gorzej, co zamówić | to jest pytanie, które kupujący zadawali („co zamówić”) |
| **Biuro rachunkowe** | do ustalenia z biurami, za firmę klienta | wiele firm na jednym koncie, raporty klientów bez papieru | oszczędność czasu biura |

## 6. Oferta na start

**Pierwszy miesiąc za 9 zł, do 31 marca 2027 r.** Jest płatny, więc zgadza się z decyzją „nic za darmo”. Odpowiada na prośby o miesiąc próbny na własnych raportach (3 z 20 osób). Data końcowa jest prawdziwa, po niej cena wraca do 29 zł. Bez przekreślonych cen, których nigdy nie było.

## 7. Co przetestować z prawdziwymi ludźmi

1. **Cena właściciela: 29 zł i 35 zł**, oba w zakresie. Dwie strony z ceną i płatnością (albo przedsprzedaż), ruch z tego samego źródła; mierzymy liczbę zapłat, nie deklaracji.
2. **Biuro rachunkowe:** 3–5 rozmów. Ile czasu biuro traci na raporty kasowe klienta miesięcznie, czy przyjęłoby eksport z aplikacji, ile zapłaciłoby za firmę klienta i czy obniżyłoby klientowi opłatę.
3. **Wysiłek:** ile osób robi zdjęcie raportu przez 2 tygodnie z rzędu. Jeśli mało, w planie właściciela zostaje tylko raport miesięczny i kilka dobowych.

## 8. Obiekcje cenowe słowami kupujących (dla marketingu)

1. „Za 49 zł miesięcznie, czyli prawie 600 zł rocznie, dostaję coś, co i tak już mam, i nadal nie wiem, ile zarabiam.” (P010)
2. „Robienie zdjęć i poprawianie tego, co aplikacja zaznaczy, to kolejne 10 minut przy kuchennym stole o 22:00, a za 49 zł miesięcznie dostaję głównie to, co już wiem.” (P011)
3. „Raport z kasy i tak oddaję księgowej, a ile sprzedałam, widzę w szufladzie i w zeszycie, więc nie wiem, za co miałabym płacić 49 zł co miesiąc.” (P006)

To symulowani kupujący, a nie klienci. Cytatów nie wolno używać jako opinii klientów.
