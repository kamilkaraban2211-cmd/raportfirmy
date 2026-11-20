# Na każdą przeszkodę sposób + bezpieczne utrzymanie danych (16.11.2026)

Zestawienie przeszkód, które wyszły w panelach, w kalkulacji CFO i w przepisach, z konkretnym sposobem na każdą. Do tego architektura danych w trzech etapach, nadążająca za rozwojem technologii. Stan prawny na 16.11.2026; **to nie jest porada prawna** — przed startem jedna konsultacja z prawnikiem (RODO, PKE, AI Act, CRA) i z księgowym (VAT, rozliczenie API w USD).

---

## Część 1. Przeszkoda → sposób

### Popyt i zaufanie

| # | Przeszkoda | Skąd wiemy | Sposób |
|---|---|---|---|
| 1 | „Te liczby już mam” (wydruk, Subiekt, centrala) | 13/20 odmów, panel 16.11 | Agent milczy o tym, co jest na wydruku. Odzywa się tylko z rzeczą niewidoczną gołym okiem: rozbieżność w sieci, termin, trend kilku tygodni (momenty M1–M5 w `marketing.md`). |
| 2 | Brak zysku i marży w raporcie z kasy | 11/20, panel 16.11 | **KSeF.** Odbieranie faktur w KSeF jest obowiązkowe od 1.02.2026, więc faktury zakupowe z hurtowni są już w ustrukturyzowanym XML. Za zgodą właściciela (uprawnienie nadane w KSeF) agent czyta faktury zakupowe i zestawia je ze sprzedażą z kasy: przybliżona marża według stawek, koszyki zakupowe, „co zamówić”. To zmienia skaner z „ładniejszych liczb” w jedyne miejsce, gdzie właściciel widzi sprzedaż i zakupy razem. |
| 3 | Codzienne zdjęcie to dodatkowa praca | „10 min przy stole o 22:00” (P011) | Trzy kroki: (a) teraz — tylko raport miesięczny + dowolne dobowe; (b) zdjęcie robi się raz, kadrowanie i obrót automatycznie; (c) później — dane bez zdjęć: eksport z chmury producenta kasy (np. NoviCloud) za zgodą właściciela i faktury z KSeF. Zdjęcie zostaje tylko dla kas bez chmury. |
| 4 | Nieufność do nieznanej firmy | najczęstszy powód w kilku panelach | Wejście przez biuro rachunkowe; pełne dane firmy, osoba z nazwiskiem; w aplikacji jawna lista „co wiemy o Tobie i skąd”; eksport i usunięcie wszystkich danych jednym przyciskiem. |
| 5 | „Mam od tego księgową” | ~77/100 (10.11), 12/20 (16.11) | Księgowa nie jest konkurentem, tylko klientem i kanałem: plan „Biuro”, w którym biuro dostaje raporty kasowe i faktury klientów w jednym miejscu. |
| 6 | Cena 49 zł za wysoka | zakres 9–35 zł (16.11) | 29 zł / 290 zł rocznie; w planie „Biuro” płaci biuro albo dzieli koszt z klientem. |
| 7 | Sklepy sieciowe: „centrala to ustala” | panele 6.11–16.11 | Pola centrali oznaczone i nietykalne; później pakiet dla centrali (raporty z wielu sklepów sieci). |
| 8 | Telefony od AI odbierane jako natręctwo | ~66/100 (10.11) | Brak telefonów. Powiadomienia w aplikacji; SMS tylko jako link do sprawy, za zgodą, z limitem. |

### Prawo

| # | Przeszkoda | Sposób |
|---|---|---|
| 9 | **AI Act art. 50** — trzeba informować, że to AI (od 2.08.2026) | Pierwsza wiadomość agenta: „Pisze asystent AI raportfirmy.pl. Możesz poprosić o człowieka.” Oznaczenie przy każdym komentarzu AI. Przycisk „porozmawiaj z człowiekiem” prowadzi do CEO. |
| 10 | **AI Act art. 5** — zakaz technik manipulacyjnych | Spisane zasady powiadomień (bez fałszywej pilności, liczników, straszenia); każda nowa treść momentu przechodzi przegląd człowieka przed włączeniem. |
| 11 | **PKE art. 398** — zgoda na informację handlową także w B2B | Pozyskiwanie: wizyty, listy papierowe, wydarzenia, strona z formularzem (inbound). W aplikacji dwa osobne przełączniki: „powiadomienia o mojej sprawie” (część usługi) i „propozycje nowych planów” (zgoda, domyślnie wyłączone). Rejestr zgód z datą i treścią. |
| 12 | **RODO** — dane JDG to często dane osobowe; profilowanie sprzedaży | Umowa powierzenia z biurami i klientami; minimalizacja (bez NIP w odczycie, bez zdjęć, bez imion w danych do AI); opis, jak agent decyduje, kiedy się odezwać; prawo sprzeciwu wobec momentu M4; rejestr czynności przetwarzania. |
| 13 | **Przekazanie danych do USA** (API Claude) | DPA i standardowe klauzule umowne są włączone do warunków komercyjnych Anthropic; dane z API nie służą do trenowania modeli. Dodatkowo: wysyłamy do AI tylko zdjęcie raportu (bez NIP, bez nazwy) albo same liczby; zapytanie o Zero Data Retention; w etapie 2 przetwarzanie w UE przez Amazon Bedrock (Frankfurt). |
| 14 | **Cyber Resilience Act** — od 11.09.2026 zgłaszanie aktywnie wykorzystywanych podatności (24 h / 72 h / 14 dni), pełne wymagania od 11.12.2027 | Do ustalenia z prawnikiem, czy aplikacja mobilna jest „produktem z elementami cyfrowymi” (czysty SaaS w przeglądarce zwykle mniej). Niezależnie od wyniku: polityka zgłaszania podatności, adres security@, lista zależności (SBOM), procedura 24 h — koszt niski, a biura i tak o to zapytają. |
| 15 | **KSC / NIS2** (nowelizacja w mocy od 3.04.2026) | Mikroprzedsiębiorca raczej nie będzie podmiotem kluczowym ani ważnym, ale ustawa wymaga samoidentyfikacji: sprawdzić załączniki i zapisać wynik. Biura rachunkowe, które same mogą podlegać przepisom, będą pytać dostawców o zabezpieczenia — dokument z części 2 to odpowiedź. |
| 16 | **KSeF jako źródło danych** — uprawnienia | Uprawnienie nadaje podatnik w KSeF (token do końca 2026, potem certyfikat KSeF). Zakres tylko do odczytu faktur zakupowych; cofnięcie uprawnienia w KSeF zatrzymuje pobieranie. |

### Pieniądze

| # | Przeszkoda | Sposób |
|---|---|---|
| 17 | Gotówka ~2 150 zł vs budżet 200 zł | Dokumenty prawne z wzorców + 1–2 h konsultacji zamiast pełnej usługi; księgowość tańsza (dźwignia 4 w `cfo-skaner.md`); pierwsze płatności od biur na pilotażu przed budową reszty. |
| 18 | Koszt czasu na wsparcie | Kontrola sum w aplikacji, samodzielne poprawki, krótka instrukcja zdjęcia (dźwignia 3: 4 zamiast 10 min). |

---

## Część 2. Bezpieczne utrzymanie danych w trzech etapach

Zasada nadrzędna: **przechowujemy tylko to, czego potrzebujemy, a to, co przechowujemy, jest zaszyfrowane, oddzielone między klientami i odtwarzalne po awarii.**

### Etap 1 — pilotaż (teraz, 2 osoby, mały budżet)

| Obszar | Rozwiązanie |
|---|---|
| Co przechowujemy | Odczytane kwoty raportów, daty, nr unikatowy kasy, ustawienia i zgody. **Nie:** zdjęć, NIP-u w odczycie, haseł do Google/Facebooka, treści faktur poza potrzebnymi polami. |
| Hosting | Serwer w Polsce/UE (MyDevil MD1 po sprawdzeniu zgodności); baza PostgreSQL. |
| Separacja klientów | Każdy rekord ma firmę i placówkę; Row-Level Security w bazie, żeby błąd w kodzie nie pokazał danych innej firmy. Testy, które próbują odczytać cudze dane. |
| Szyfrowanie | TLS 1.2+ w ruchu; szyfrowanie dysku i kopii; sekrety (klucz API, tokeny KSeF) w osobnym magazynie, nigdy w repozytorium. |
| Konta | Logowanie z drugim składnikiem (aplikacja lub passkey); osobne role: właściciel, biuro, operator; operator widzi dane tylko w ramach zgłoszonej sprawy. |
| Kopie | Codzienna kopia zaszyfrowana w innej lokalizacji w UE; **raz w miesiącu próba odtworzenia** (kopia, której nikt nie odtwarzał, nie istnieje). |
| Ślady | Dziennik dostępu do danych (kto, kiedy, co) bez treści; przechowywanie dzienników ograniczone w czasie. |
| AI | Do API trafia zdjęcie raportu albo liczby, bez nazwy i NIP; odpowiedź wraca jako dane; prompty bez danych osobowych. |
| Incydenty | Jedna strona procedury: kto decyduje, zgłoszenie do UODO w 72 h (RODO), ewentualnie 24 h (CRA), informacja dla klientów. |
| Zależności | Automatyczne skanowanie bibliotek (np. Dependabot), aktualizacje co tydzień. |

### Etap 2 — pierwsze setki klientów

- Przetwarzanie AI w UE (Amazon Bedrock, Frankfurt) i Zero Data Retention.
- Pseudonimizacja: dane do analiz trzymane pod identyfikatorem, nie nazwą firmy.
- Test penetracyjny raz w roku; program zgłaszania podatności.
- Strona „Bezpieczeństwo” dla biur: gdzie są dane, kto ma dostęp, jak usunąć.
- Automatyczne usuwanie danych po rezygnacji (po okresie uzgodnionym w regulaminie).

### Etap 3 — nadążanie za postępem technologicznym

- **Mniej danych w ruchu:** odczyt raportu częściowo w telefonie (lokalny model OCR), do serwera trafiają tylko liczby.
- **Dane bez zdjęć:** bezpośrednie połączenia z KSeF i chmurami producentów kas zamiast fotografii.
- **Logowanie bez haseł** (passkeys) jako domyślne.
- **Kryptografia odporna na komputery kwantowe:** włączyć hybrydowe szyfrowanie TLS (np. z ML-KEM), gdy obsłużą je biblioteki serwera i przeglądarki — bez własnych eksperymentów kryptograficznych.
- **Przegląd co pół roku:** nowe przepisy (AI Act, CRA, RODO po Digital Omnibus), nowe modele (taniej i w UE), nowe zagrożenia.

---

## Część 3. Kolejność

**30 dni:** konsultacja prawna (punkty 9–16) • samoidentyfikacja KSC • umowa powierzenia i regulamin z wzorców • etap 1 bezpieczeństwa w aplikacji (RLS, 2FA, kopie z próbą odtworzenia) • rozmowy z 3–5 biurami (w tym pytanie o KSeF i o wymagania bezpieczeństwa).
**60 dni:** pilotaż z biurami (`marketing.md`) • test odczytu na 50 prawdziwych raportach • prototyp odczytu faktur zakupowych z KSeF w środowisku testowym.
**90 dni:** decyzja o planie „Kasa + Zakupy” (marża z KSeF) • etap 2 dla przetwarzania AI w UE, jeśli biura o to poproszą.
