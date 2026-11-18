# raportfirmy.pl — zarys kompletnej aplikacji

Wersja ostateczna z 16.11.2026. Zbiera decyzje i wnioski z prac od 6 do 16.11.2026. Szczegóły i dowody są w `docs/founder/` oraz w dokumentach projektu.

> **Jednym zdaniem:** raportfirmy.pl sprawdza, co klienci widzą o Twoim sklepie w internecie, poprawia to za Ciebie i odzywa się tylko wtedy, gdy coś naprawdę wymaga Twojej uwagi, żebyś wieczorem miał czas dla siebie.

**Wizja:** jedna aplikacja, która ułatwia rozwój małym przedsiębiorcom. Wejściem jest darmowy portret firmy, który uwiarygadnia nas i prowadzi za rękę do konkretnych działań, a nie do pustego panelu. Pieniądze przynoszą produkty jednorazowe. Abonament utrzymuje klienta: synchronizuje dane sprzedażowe i marketingowe całej firmy i pilnuje jej zdrowia.

---

## 1. Dla kogo i którędy

| | |
|---|---|
| **Klient** | Właściciel małego sklepu stacjonarnego: niezależny spożywczy (ok. 40%), pod szyldem sieci (ok. 30%), specjalistyczny niespożywczy (ok. 30%). Pracuje 12 godzin za ladą, ma księgową i mało czasu. |
| **Kanał** | Partner, któremu sklep już ufa: **biuro rachunkowe** (najczęstszy warunek zakupu w każdym panelu), hurtownia, centrala sieci. Do tego wizyty osobiste i list. Bez zimnych e-maili, telefonów i SMS-ów. |
| **Płacący** | Właściciel za naprawy; w planie „Biuro” biuro rachunkowe albo podział kosztu z klientem. |

## 2. Zasady produktu (zapisane w kodzie, nie tylko w treści)

1. **„Wszystko się zgadza” to pełnoprawny wynik.** Wtedy nie ma oferty.
2. **Każda informacja ma źródło i datę.** Czego nie wiemy, oznaczamy jako niewiadomą.
3. **Jedna cena w pierwszym kontakcie.** Abonament pojawia się dopiero po odebranym zleceniu i tylko z konkretnym powodem.
4. **Płatność po wykonaniu.** „Nie udało się = nie płacisz.”
5. **Pól ustalanych przez centralę sieci nie zmieniamy.** Zamiast tego przygotowujemy zgłoszenie do centrali.
6. **Bez straszenia i fałszywej pilności.** Pilność tylko prawdziwa: termin, limit zleceń jednej osoby.
7. **Klient nie zarządza projektem, tylko go widzi.** Od niego wymagamy jednej decyzji: „akceptuję”.
8. **Minimum danych.** NIP nie trafia do adresu strony, pamięci przeglądarki, analityki ani wiadomości do AI. Zdjęć nie przechowujemy. Google Analytics jest wyłączone.
9. **AI zawsze się przedstawia** (AI Act art. 50). Przycisk „porozmawiaj z człowiekiem” jest dostępny zawsze.
10. **Nastrój klienta nigdy nie służy do sprzedaży.** Przy frustracji albo w trudnym okresie propozycje handlowe są zablokowane w kodzie.
11. **Nie obiecujemy wzrostu sprzedaży ani pozycji w Google.**

## 3. Ścieżka klienta

```
 Sprawdzenie ──► Wynik ──► „Popraw za mnie” ──► Status ──► Odbiór i teczka ──► Opieka
 (portret,        (Znaleźliśmy  (jedna cena,      (Znaleźliśmy /   (przed / po,       (abonament
  bez NIP-u)      / Wszystko    zgoda, rola       Robimy /         z datą; kontrola   z powodem;
                  się zgadza)   menedżera)        Gotowe)          po 30 dniach)      momenty)
```

1. **Sprawdzenie (portret).** Nazwa sklepu i miejscowość, bez konta i bez NIP-u. Portret pokazuje fakty, deklaracje, rozbieżności i niewiadome, każde ze źródłem i datą. Rozróżnia podmiot, placówkę i szyld.
2. **Wynik.** Lista rozbieżności, np. „Google pokazuje otwarte 24.12, a Wigilia jest dniem wolnym”. Do tego opcja „poprawię sam” z bezpłatną instrukcją.
3. **Zlecenie.** Jedna cena. Trudna sprawa ma stałą cenę podaną przed startem. NIP i zgoda na rolę menedżera pojawiają się dopiero tu. Opiekun dzwoni i przeprowadza przez dodanie menedżera.
4. **Status.** Link w SMS-ie zamiast konta i hasła. Jeden ekran w trzech stanach. Akceptacja jednym przyciskiem.
5. **Odbiór.** Teczka zmian (zrzut przed i po, z datą), instrukcja usunięcia nas z profilu, kontrola po 30 dniach, płatność.
6. **Opieka (abonament).** Proponowana tylko wtedy, gdy jest powód: Google sam zmienia dane, sieć często zmienia godziny, w sklepie są zmiany sezonowe. Od tego momentu działają momenty agenta (rozdział 6).

## 4. Moduły i etapy

| Etap | Moduł | Co robi | Stan w repo |
|---|---|---|---|
| **1. Start (18.01.2027)** | Sprawdzenie / portret | Ręczne sprawdzenie przez opiekuna wspierane formularzem i listą kontrolną; później półautomatyczne | `index.html`: makieta na 4 sklepach testowych |
| | Zlecenia | Kolejka, wycena trudnych spraw, limit w miesiącu, lista oczekujących | `index.html`: panel opiekuna (makieta) |
| | Status i teczka | Link z SMS-a, 3 stany, akceptacja, potwierdzenia zmian | `index.html`: makieta |
| | Rejestr metod | Typ błędu, źródło, metoda, czas. Zasób, którego konkurencja nie skopiuje | `index.html`: makieta |
| | Płatności i faktury | Po wykonaniu: Przelewy24 (BLIK, Apple Pay, Google Pay, karta, przelew); faktura VAT FA(3) do KSeF automatycznie po płatności | `platnosci/` (bramka + KSeF) + ekran „Gotowe” w `index.html`; do wdrożenia konto Przelewy24, token KSeF, adres bramki |
| **2. Po pilocie** | Opieka (abonament) | Pilnowanie zmian w Google i na Facebooku, kontrola okresowa, sezonowe godziny | brak |
| | Agent momentów | Proaktywne powiadomienia M1–M5, najwyżej 2 w tygodniu, dopasowane do nastroju | brak (opis w `docs/founder/marketing.md`) |
| | Raport firmy | Produkt jednorazowy: przepisy dotyczące firmy (z zatwierdzonej biblioteki notek), rynek w liczbach GUS, widoczność w sieci | brak |
| | Plan „Biuro” | Biuro rachunkowe widzi swoich klientów, zamawia sprawdzenia hurtem | brak |
| **3. Dane firmy** | Kasa | Odczyt raportu fiskalnego (zdjęcie lub chmura producenta kasy), kontrola sum, porównania | `skaner/index.html` (działa jako artefakt Claude) |
| | Kasa + Zakupy | Faktury zakupowe z KSeF zestawione ze sprzedażą: przybliżona marża i podpowiedź, co zamówić | brak |
| | Zdrowie firmy | Jeden widok: widoczność, sprzedaż, zakupy, terminy | brak |
| **Hipoteza** | Grafik pracowników | Najczęściej wskazywany „złodziej wieczorów” obok zamówień; do sprawdzenia w rozmowach przed budową | brak |

**Dlaczego taka kolejność:** panele pokazały, że właściciel płaci za konkretny błąd naprawiony za niego, a nie za narzędzia i liczby, które już ma. Dane firmy (etap 3) mają sens dopiero wtedy, gdy oszczędzają czas na zamówieniach albo pieniądze u księgowej.

## 5. Produkty i ceny

| Produkt | Typ | Cena | Status |
|---|---|---|---|
| Sprawdzenie (portret) | wejście | 0 zł | **Do decyzji CEO** (wyjątek od zasady „Nic za darmo” z 10.11) |
| Naprawa danych w Google i na Facebooku | jednorazowo | 149 zł brutto | akceptowalna dla 19 z 20 w panelu; test na prawdziwych sklepach do 20.12.2026 |
| Trudna sprawa (duplikat, przejęty profil, odzyskanie dostępu) | jednorazowo | stała cena przed startem | widełki do ustalenia |
| Raport firmy | jednorazowo | 49 zł (hipoteza) | panel: 2/100 przy 49 zł |
| Opieka | abonament | 49–99 zł/mies. (hipoteza) | 99 zł dało 0/20; wraca tylko z powodem |
| Kasa | abonament | 29 zł/mies. albo 290 zł/rok (hipoteza) | 0/20; sens tylko przez biuro |
| Kasa + Zakupy | abonament | 49 zł/mies. (hipoteza) | niezbudowane |
| Biuro rachunkowe | abonament B2B | do ustalenia z pierwszym partnerem | rozmowy w grudniu 2026 |

## 6. Agenci

| Agent | Robi sam | Nie robi | Zatwierdza człowiek |
|---|---|---|---|
| Rozpoznanie | Dane z rejestrów: branża, forma, powiat | Nie zgaduje braków | — |
| Widoczność | Porównuje Google, Facebook i stronę; lista rozbieżności i projekt poprawek | Nie publikuje w profilu klienta | Każdą zmianę akceptuje klient |
| Przepisy | Dobiera notki do profilu firmy | Nie pisze notek do raportu sam | Każdą notkę w bibliotece, raz |
| Rynek | Dane GUS, zmiany rok do roku | Nie prognozuje sprzedaży | — |
| Opiekun zleceń | Status, przypomnienia, kolejka, teczka | Nie ustala cen, nie dzwoni | Ceny trudnych spraw |
| Kontrola | Sprawdza, czy każde zdanie ma źródło i datę | Nie poprawia sam | Incydenty |
| Momenty | M1 raport dla księgowej, M2 rozbieżność w sieci, M3 termin w przepisach, M4 trwała zmiana sprzedaży, M5 sprawa zamknięta | Nie nazywa emocji, nie sprzedaje przy frustracji, nie pisze po 21:00 | Nowe treści momentów, przed włączeniem |

**Dopasowanie do nastroju** opiera się wyłącznie na jawnych sygnałach: „Nie teraz”, wybór „mam urwanie głowy”, styl „konkretnie” lub „po ludzku”, trwały spadek sprzedaży, słowa frustracji. Nie używamy twarzy, głosu ani danych biometrycznych, więc agent nie jest systemem rozpoznawania emocji w rozumieniu AI Act. Przechowujemy tylko ustawienia klienta, nie etykiety nastroju.

## 7. Ekrany

| Kto | Ekrany |
|---|---|
| **Właściciel (przed zleceniem)** | Sprawdzenie → Wynik (dwa stany) → Zlecenie. Bez konta. |
| **Właściciel (klient)** | Jeden ekran sprawy w trzech stanach, teczka, ustawienia powiadomień i stylu, „co o mnie wiecie” (eksport, usunięcie). Później: Kasa, Zakupy, Zdrowie firmy. |
| **Biuro rachunkowe** | Lista klientów, status sprawdzeń, zestawienia kasowe, zamówienie hurtowe. |
| **Opiekun (my)** | Kolejka, wycena, limit, rejestr metod, płatności, incydenty, dziennik. |

## 8. Model danych

`Firma` (podmiot, NIP tylko po stronie serwera) → `Placówka` (adres, godziny, w tym sezonowe) → `Szyld/sieć` (pola centrali oznaczone).
`Źródło` (Google, Facebook, strona, rejestr; data odczytu) → `Rozbieżność` (pole, wartość u nas, wartość w źródle, data).
`Zlecenie` (cena, stan: znaleźliśmy / robimy / gotowe / nie udało się) → `Zmiana` (przed, po, data, dowód) → `Metoda` (rejestr: typ błędu, źródło, sposób, czas).
`Użytkownik` i `Rola` (właściciel, biuro, opiekun) · `Zgoda` (powiadomienia o sprawie / propozycje handlowe / KSeF; data i treść) · `Ustawienia` (styl, okno godzin, „wstrzymaj do”).
Etap 3: `RaportKasowy` (tylko kwoty, daty, nr kasy) · `FakturaZakupowa` (pola z KSeF potrzebne do marży) · `DziennikDostępu` (kto, kiedy, co; bez treści).

## 9. Technologia i bezpieczeństwo

| Etap | Rozwiązanie |
|---|---|
| **1. Start** | Serwer w Polsce lub UE, PostgreSQL z Row-Level Security (separacja firm), TLS 1.2+, szyfrowanie dysku i kopii, sekrety poza repozytorium, logowanie linkiem z SMS-a i drugi składnik dla biura i opiekuna, codzienna kopia w innej lokalizacji w UE z **comiesięczną próbą odtworzenia**, dziennik dostępu, skanowanie zależności, procedura incydentu (UODO 72 h, CRA 24 h). |
| **2. Setki klientów** | AI w UE (Amazon Bedrock, Frankfurt), Zero Data Retention, pseudonimizacja analiz, test penetracyjny raz w roku, strona „Bezpieczeństwo” dla biur, automatyczne usuwanie danych po rezygnacji. |
| **3. Postęp** | Odczyt w telefonie (do serwera trafiają same liczby), KSeF i chmury kas zamiast zdjęć, passkeys, hybrydowe TLS z ML-KEM, gdy obsłużą je biblioteki, przegląd przepisów i zagrożeń co pół roku. |

Statyczne makiety (`index.html`, `pilot/`, `skaner/`) pokazują proces. Produkcja wymaga serwera, kont, płatności i umów.

## 10. Prawo (sprawdzić z prawnikiem przed startem; to nie jest porada prawna)

- **RODO:** umowa powierzenia, rejestr czynności, minimalizacja, prawo sprzeciwu wobec profilowania (momenty).
- **PKE art. 398:** zgoda na informację handlową, także w B2B. Osobny przełącznik w aplikacji, rejestr zgód.
- **AI Act:** art. 50 (informacja o AI, od 2.08.2026) i art. 5 (zakaz manipulacji).
- **Cyber Resilience Act:** zgłaszanie aktywnie wykorzystywanych podatności od 11.09.2026; pełne wymagania od 11.12.2027.
- **KSC/NIS2:** samoidentyfikacja i zapisany wynik.
- **KSeF:** uprawnienia nadaje podatnik. Do odczytu faktur zakupowych: dostęp tylko do odczytu. Do wystawiania naszych faktur: osobny token z uprawnieniem do wystawiania (`platnosci/README.md`).
- **Usługi w profilach klientów:** pisemne upoważnienie, zakres zmian, usunięcie nas po zleceniu.
- **Przekazanie danych do USA (API Claude):** DPA z klauzulami standardowymi; do AI wysyłamy bez NIP-u i nazwy firmy.

## 11. Mapa drogowa

| Kiedy | Co | Warunek przejścia dalej |
|---|---|---|
| 17.11–20.12.2026 | Test: 30 ręcznych sprawdzeń, wizyty, zlecenia przed niedzielami handlowymi i 24–27.12, rozmowy z biurami | ≥ 30% rozbieżności, ≥ 3 opłacone zlecenia z ≥ 10 pokazanych wyników, 1 partner |
| 21.12.2026 | Werdykt testu | Poniżej 15% rozbieżności: powrót do oferty, bez startu |
| 4–17.01.2027 | Strona startowa z prawdziwym zgłoszeniem, konsultacja prawna, umowa z partnerem, kampania od T−14 | Partner gotowy do 8.01 |
| **18.01.2027** | **Start z partnerem** | — |
| 25.01 / 1.02 / 17.02.2027 | Przeglądy 7, 14 i 30 dni | Około 3 zlecenia miesięcznie pokrywają koszty stałe |
| II kw. 2027 | Etap 1 na serwerze (konta, płatności, RLS), opieka dla klientów z powodem | Powtarzalne zlecenia, czas opiekuna < 120 min |
| II półrocze 2027 | Plan „Biuro”, momenty agenta, raport firmy | Co najmniej 2 biura płacą |
| 2028 | Kasa + Zakupy (KSeF), zdrowie firmy, ewentualnie grafik | Rozmowy potwierdzają oszczędność czasu na zamówieniach |

## 12. Decyzje otwarte (CEO)

1. Darmowe sprawdzenie jako wyjątek od zasady „Nic za darmo”.
2. Okolica i 30 sklepów do testu; limit zleceń w miesiącu.
3. Widełki cen trudnych spraw.
4. Czy opiekun występuje z imieniem, nazwiskiem i telefonem (rekomendacja: tak).
5. Co znaczy „rozwój” dla klienta w pierwszej wersji, czyli który wskaźnik pokazujemy jako sukces.
6. Zakres synchronizacji danych w abonamencie w pierwszej wersji.
7. Repozytorium jest publiczne: przełączyć na prywatne (zawiera ceny, koszty i plany).

---

**Źródła w repozytorium:** `docs/founder/launch.md` (plan startu), `offer.md`, `marketing.md` (momenty, nastrój, pozycjonowanie), `sposoby-i-bezpieczenstwo.md`, `cfo.md`, `pricing.md`, `czas-dla-siebie.md`, panele `panel*/`. Wyniki paneli to symulacja: pokazują obiekcje, nie przewidują sprzedaży.
