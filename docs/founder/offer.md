# Oferta „Porządek w sieci” — RaportFirmy.pl

6 listopada 2026. Metoda: soczewka Offers (streszczenie ramy z *$100M Offers* A. Hormoziego, nie jego słowa). Materiał wejściowy: panel 20 symulowanych właścicieli sklepów (`panel-v1`), dokumenty projektu 01-PRODUKT, Katalog-produktów-i-obsługa-Google v0.1, Badanie potrzeb v0.1. Brak `numbers.json` (CFO nie był uruchamiany) — koszty poniżej to szacunki minut pracy CEO, nie wyliczenia.

## 1. Wynik

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

## 2. Lista problemów kupującego (słowami kupującego)

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

## 3. Rozwiązania, ocena i decyzja

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

## 4. Stos oferty v2 (testowany)

- **Nazwa:** „Porządek w sieci”.
- **Rdzeń (rezultat):** klient, który szuka sklepu w Google lub na Facebooku, widzi prawdziwe godziny, adres, telefon, ofertę i sposób zamówienia. Darmowy portret → 149 zł brutto jednorazowo za wykonanie poprawek przez nas, akceptacja w telefonie.
- **Bonusy:** 5 odpowiedzi na pytania z telefonu; porównanie z 3 sklepami z okolicy; kontrola po 30 dniach.
- **Gwarancja:** płatność po zatwierdzeniu i wprowadzeniu zmian; poprawka błędu bez dopłaty; brak problemu = brak oferty.
- **Pilność (prawdziwa):** pilot z ograniczoną liczbą sklepów w miesiącu, bo zmiany robi jedna osoba. Liczbę ustala CEO (wewnętrzny limit przyjmowania spraw z 01-PRODUKT §6).
- **Kontynuacja:** opcjonalna opieka za 99 zł brutto/mies. (cena CEO bez zmian), rezygnacja w każdej chwili.

### Koszt i gwarancja — co trzeba policzyć (CFO)

- Praca na jedno zlecenie: szacunek 1,5–2,5 h CEO (portret + poprawki + FAQ + porównanie + kontrola po 30 dniach). Przy 149 zł brutto to ok. 60–100 zł brutto za godzinę przed podatkami i prowizją — do potwierdzenia pomiarem w pilocie.
- Ryzyko gwarancji „płacisz po”: koszt = odsetek nieopłaconych zleceń × czas pracy. Bez danych nie podaję liczby; w pilocie mierzyć od pierwszego zlecenia.
- Zasady zwrotu i umowy z jednoosobowym przedsiębiorcą trzeba sprawdzić pod kątem przepisów o „przedsiębiorcy na prawach konsumenta”. To nie jest porada prawna.

## 5. Równanie wartości (1–10)

| Element | v1 | v2 | Co przesuwa ocenę |
|---|---:|---:|---|
| Wymarzony rezultat | 4 | 6 | Rezultat opisany językiem klienta („nie idzie do sklepu obok”); porównanie z 3 sklepami |
| Postrzegane prawdopodobieństwo | 2 | 4 | Płatność po wykonaniu, osoba z nazwiskiem. Nadal brak dowodu i polecenia — **najsłabszy element** |
| Czas do rezultatu | 4 | 7 | Jedno zlecenie zamiast miesięcznego cyklu |
| Wysiłek i poświęcenie | 2 | 7 | Robimy za klienta, 5 min akceptacji; nowy koszt: oddanie dostępu menedżera |

## 6. Wnioski

1. **Problemem nie jest już cena ani format.** 149 zł jednorazowo mieści się w akceptowalnym zakresie u 18 z 20 osób. Abonament 99 zł jako pierwszy produkt odpadł wyraźniej niż usługa jednorazowa.
2. **O sprzedaży decyduje moment po portrecie.** Ofertę trzeba pokazywać dopiero na ekranie z wynikiem konkretnego sklepu („u Ciebie Google pokazuje 8–16, a Facebook 7–18”), a nie w pitchu ogólnym. Panel ocenia pitch bez tej wiedzy, więc z natury zaniża ten wariant — to trzeba zmierzyć na prawdziwych sklepach.
3. **Zaufanie przyjdzie kanałem, nie stroną.** Sieci, hurtownie i biura rachunkowe pojawiają się jako „to by mnie przekonało” w obu wersjach.
4. **Wyróżnik na v3:** sprawy, których właściciel nie załatwi sam w kwadrans — duplikaty, przejęte wizytówki, automatyczne zmiany Google, odzyskanie dostępu. Tu „zrobię to sam” przestaje działać.

## 7. Następny krok do decyzji CEO

- Prawdziwy test zamiast trzeciego panelu: 10–20 realnych sklepów, darmowy portret i oferta 149 zł na ekranie wyniku. Mierzyć: u ilu portret znajduje rzeczywistą rozbieżność; ilu po jej zobaczeniu zamawia; ilu dodaje menedżera; czas pracy na zlecenie.
- Decyzje: (1) czy element H (porównanie z 3 sklepami) wchodzi do części płatnej; (2) czy CEO występuje z imieniem i telefonem; (3) limit sklepów w pilocie; (4) czy pierwszym produktem ma być usługa jednorazowa zamiast abonamentu — jest to zgodne z kolejnością proponowaną w Katalogu §7 (raport informacyjny → uporządkowanie profilu → opieka), ale zmienia nacisk z abonamentu z 01-PRODUKT §6.

Pliki: `founder/pitch-v1.md` (abonament), `founder/pitch.md` (v2), `founder/panel-v1/` i `founder/panel/` (odpowiedzi obu prób, seed 483380).
