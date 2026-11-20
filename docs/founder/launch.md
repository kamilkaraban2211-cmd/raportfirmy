# Plan startu: „Sklep w porządku” — powrót do pierwotnej koncepcji (16.11.2026)

**Co startuje:** darmowe sprawdzenie, czy klient znajdzie sklep z prawdziwymi danymi w Google i na Facebooku (portret), a potem naprawa za właściciela w jednej cenie. Abonament (opieka) proponujemy dopiero po odbiorze zlecenia i tylko wtedy, gdy jest powód. To powrót do wizji z 6.11 i oferty v3 z 9.11. Skaner raportu z kasy zostaje w szufladzie.

**Oferta testowana na prawdziwych sklepach (v3):**
- Sprawdzenie: bezpłatne, po nazwie i adresie, bez NIP-u. „Wszystko się zgadza” mówimy wprost i nic nie sprzedajemy.
- Naprawa danych: **149 zł brutto jednorazowo**, płatność po wykonaniu. Trudne sprawy (duplikat, przejęty profil, odzyskanie dostępu) mają stałą cenę podaną przed startem.
- Gwarancja: nic nie znaleźliśmy = nic nie płacisz; nie udało się = nie płacisz.
- Jeden opiekun z imieniem, nazwiskiem i telefonem (CEO).

**Do decyzji CEO:** darmowe sprawdzenie stoi w sprzeczności z zasadą „Nic za darmo” z 10.11. Rekomenduję wyjątek: sprawdzenie to nasze narzędzie sprzedaży (ok. 15 min pracy), a płatna jest naprawa. Wszystkie panele mówią to samo: właściciel kupuje dopiero wtedy, gdy zobaczy konkretny błąd we własnym sklepie.

## Dlaczego teraz: prawdziwy powód w grudniu 2026

W grudniu 2026 handel jest dozwolony w trzy niedziele: 6, 13 i 20 grudnia. Wigilia (czwartek 24.12) jest dniem ustawowo wolnym, więc sklepy są zamknięte od 24 do 27 grudnia. Wiele małych sklepów ma w te dni inne godziny niż zwykle. Jeśli Google pokazuje „otwarte”, klient odbija się od zamkniętych drzwi. To konkretna, sprawdzalna rozbieżność z datą. Nie trzeba nikogo straszyć.

---

## Krok 1. Test przed wydaniem pieniędzy (17.11–20.12.2026)

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

## Krok 2. Odliczanie

Właściciele zadań: **CEO** (Ty) i **Claude** (przygotowanie materiałów, liczenie). ⚑ = ścieżka krytyczna: opóźnienie przesuwa start.

### Tydzień 1: 17–22.11 — przygotowanie i 30 sprawdzeń
| Zadanie | Kto | Termin |
|---|---|---|
| ✓ Lista kontrolna sprawdzenia (12 pól), stoper i arkusz wyników: panel opiekuna → „Test 30 sklepów” (`index.html#test`), eksport CSV | Claude | 20.11 |
| ✓ Karta wyniku dla sklepu do druku: rozbieżność, źródło, data, cena, gwarancja, dane opiekuna (z aplikacji) | Claude, akceptuje CEO | 20.11 |
| Potwierdzić formę działalności, konto firmowe, wystawianie faktur, płatność BLIK/przelew | CEO | 19.11 |
| Wzór zlecenia i upoważnienia do zmian (zgoda na rolę menedżera, zakres, usunięcie nas po zleceniu) | Claude, sprawdza CEO | 19.11 |
| ⚑ Wybór okolicy i 30 sklepów; sprawdzenie wszystkich (ok. 15 min na sklep, ok. 7,5 h) | CEO | 22.11 |

### Tydzień 2: 23–29.11 — wizyty i partner
| Zadanie | Kto | Termin |
|---|---|---|
| ⚑ Wizyty w sklepach z rozbieżnością, karta wyniku, propozycja zlecenia | CEO | 29.11 |
| Rozmowy z 3–5 biurami rachunkowymi i hurtownią (scenariusz rozmowy) | Claude przygotowuje, CEO prowadzi | 29.11 |
| Rejestr spraw: typ błędu, źródło, metoda, czas | CEO na bieżąco | stale |

### Tydzień 3: 30.11–6.12 — realizacja przed pierwszą niedzielą handlową
| Zadanie | Kto | Termin |
|---|---|---|
| ⚑ Wykonanie przyjętych zleceń, w tym godzin na 6, 13 i 20.12 | CEO | 5.12 |
| Teczka zmian dla klienta: zrzut przed i po, z datą | CEO | przy odbiorze |
| Przegląd dnia 14: ile sprawdzeń, rozbieżności, zleceń, minut na zlecenie | Claude liczy, CEO decyduje | 6.12 |

### Tydzień 4–5: 7–20.12 — godziny świąteczne, płatności, limit
| Zadanie | Kto | Termin |
|---|---|---|
| Godziny 24–27.12 ustawione u klientów; płatność po wykonaniu | CEO | 18.12 |
| Limit nowych zleceń (np. 10) i lista oczekujących na styczeń | CEO | 13.12 |
| ⚑ Werdykt testu według reguł z kroku 1 | CEO + Claude | 21.12 |

### 22.12.2026–3.01.2027 — przerwa
Właściciele sklepów mają najgorętszy okres. Ty masz czas dla siebie. Jedyne zadanie: **23.12 sprawdzić, czy u klientów Google pokazuje zamknięte 24–27.12**, i dopisać to do teczek.

### Tydzień 4–17.01.2027 — przygotowanie startu z partnerem
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

## Krok 3. Dzień startu: poniedziałek 18.01.2027

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

## Krok 4. Pierwsze 30 dni (18.01–17.02.2027)

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
