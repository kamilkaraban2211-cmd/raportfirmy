# Posiedzenie zarządu: raportfirmy.pl — „Sklep w porządku” (20.11.2026)

**Głos: 2 × FUND IF, 1 × PASS. Średnia ocena: 4,3/10.**

| Soczewka | Ocena | Głos | Memo |
|---|---:|---|---|
| Oferty | 4/10 | FUND IF | `board/oferta.md` |
| Monopolu | 3/10 | PASS | `board/monopol.md` |
| Produktu | 6/10 | FUND IF | `board/produkt.md` |

To symulowany zarząd, a nie prawdziwi inwestorzy. Każdy członek stosuje jedną opublikowaną ramę oceny (Oferty, Monopolu, Produktu) i nie mówi w imieniu jej autora. Brief, który zarząd dostał, jest w `board/brief.md`. Wyniki paneli kupujących, na których się opiera, też pochodzą z symulacji.

## Ryzyka wskazane przez więcej niż jednego członka

1. **Jednorazowe 149 zł bez powtarzalności (wszyscy trzej).** Opieka, skaner i raport dały w panelach 0–2%. Każdego klienta trzeba zdobywać od nowa, a sprawdzenie i naprawa to ręczna praca, która nie tanieje z liczbą klientów.
2. **„Zrobię to sam” (Oferta, Monopol).** Błąd pokazany za darmo właściciel może poprawić sam w godzinę. Agencja dzwoniąca co tydzień może dodać „darmowy audyt godzin” w tydzień. Nikt nie wskazał, co powstrzyma kopię.
3. **Kanał to wciąż hipoteza (wszyscy trzej).** Nie ma jeszcze ani jednego biura ani hurtowni, a nikt nie wie, co pośrednik miałby z tego mieć. Wizyty osobiste jednego założyciela nie skalują się do 100 klientów.
4. **Ekonomii naprawy za 149 zł nikt nie policzył (wszyscy trzej).** `cfo.md` dotyczy skanera z kasy. Brakuje marży na zleceniu, kosztu pozyskania klienta z czasem założyciela i cen trudnych spraw.
5. **Częstość prawdziwych błędów (Oferta, Produkt).** W ok. 30% sklepów (sieciowych) pól centrali nie wolno ruszać. Jeśli test A wyjdzie poniżej 15%, nie ma czego sprzedawać.
6. **Brak skupienia (Monopol, Produkt).** Cztery zmiany koncepcji w listopadzie i rozrośnięta wizja (agent momentów, KSeF, „czas dla siebie”) odciągają uwagę od jedynej rzeczy, która ma działać.

Tylko jedna soczewka (Produkt) wskazała **przekazanie dostępu do profilu**: klient, który nie chce podać NIP-u, ma oddać rolę menedżera. Często nie pamięta loginu, więc prosta sprawa zamienia się w trudną.

## Warunki (lista do odhaczenia)

**Test do 21.12.2026 (prawdziwe sklepy, nie panel):**
- [ ] A: ≥ 30% sklepów z realną rozbieżnością, **liczoną poza polami centrali sieci**. Przy A < 15% Oferta zmienia głos na PASS i nie ma startu.
- [ ] B: ≥ 3 opłacone zlecenia po 149 zł z ≥ 10 pokazanych wyników. Przy B = 0 Oferta zmienia głos na PASS.
- [ ] C: ≥ 1 biuro lub hurtownia z **pisemną** zgodą i jasno określonym interesem dla siebie (prowizja, usługa dla jego klientów, wyłączność).
- [ ] Przekazanie dostępu sprawdzone na ≥ 5 sklepach: kroki, minuty, miejsca, w których klient utknął. Jeśli utknie ponad połowa, przeprojektować ten krok (np. naprawa na miejscu przy telefonie właściciela).

**Przed startem 18.01.2027:**
- [ ] `/founder-cfo` dla naprawy za 149 zł i trudnych spraw: marża na zleceniu, koszt pozyskania z testu (z czasem założyciela), przychód z klienta w 12 miesięcy.
- [ ] Widełki cen trudnych spraw ustalone z góry.
- [ ] `/founder-competitors`: kto i za ile sprzedaje to samo właścicielowi małego sklepu (agencje, narzędzia do wizytówek, centrale, sam Google) i jaka luka zostaje.
- [ ] Odpowiedź na pytanie „co powstrzyma kopię w 6. miesiącu”, np. rejestr metod i baza typów błędów, które z każdym zleceniem robią sprawdzenie tańszym i szybszym.
- [ ] `/founder-offer`: co dołożyć, żeby cena mogła rosnąć zamiast spadać (np. kontrola przed każdym świętem, zgłoszenie do centrali jako pełna usługa).

**Dyscyplina:**
- [ ] Zakres zamrożony do 21.12: tylko sprawdzenie i naprawa w Google (godziny, adres, telefon, status). Facebook, abonament, raport, skaner i „czas dla siebie” usunięte z komunikacji.
- [ ] Żadnej nowej zmiany koncepcji do końca pilotażu. Wynik negatywny oznacza powrót do oferty, a nie nowy produkt.
- [ ] Repozytorium z cenami i planami przełączone na prywatne.

## Gdzie zarząd się nie zgadza

- **Monopol** ocenia, że bez trwałej przewagi to zwykła usługa, którą każdy może skopiować, i głosuje PASS. **Produkt** uważa, że prostota i uczciwość ścieżki wystarczą na start, a przewaga może przyjść później (6/10).
- **Oferta** chce rozbudować pakiet i podnieść cenę. **Produkt** chce wyciąć wszystko poza Google. Obie rzeczy da się pogodzić tylko wtedy, gdy dodatki dotyczą tej samej jednej rzeczy, czyli poprawnych danych w Google, a nie nowych produktów.
- Monopol widzi w „uczciwości wobec naciągaczy” zalążek marki. Oferta widzi w tym ryzyko: 149 zł może wyglądać jak najtańsza oferta w kategorii, której klient nie ufa.

## Najmocniejsza wersja, jaką widzi zarząd

To nie jest dokładnie to, co jest w briefie. Najmocniejsza wersja to **usługa sprzedawana przez biuro rachunkowe, a nie właścicielowi bezpośrednio**. Biuro co kwartał i przed każdym świętem dostaje dla swoich klientów listę „u kogo Google pokazuje złe dane”. Sklep płaci za naprawę tylko wtedy, gdy jest błąd, a biuro ma usługę dodaną dla klientów bez własnej pracy. Powtarzalność bierze się z kalendarza (święta, niedziele handlowe, zmiany godzin), a nie z abonamentu właściciela, który w panelach dał 0/20. Przewagą jest wyłączność z biurami w regionie i rejestr typów błędów, który z czasem robi sprawdzenie prawie automatycznym. Zakres: tylko Google, tylko kilka pól. Wszystko inne z wizji (KSeF, kasa, agent momentów) czeka, aż ta jedna rzecz zacznie zarabiać. Najbliższa decyzja zostaje bez zmian: 21.12, na podstawie prawdziwych wyników A, B i C.
