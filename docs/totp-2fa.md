# Drugi składnik logowania: kod z aplikacji w telefonie (TOTP)

Specyfikacja z 17.11.2026. Rozwija zapis z `ZARYS-APLIKACJI.md` (rozdz. 9: „drugi składnik dla biura i opiekuna”) i z `docs/founder/sposoby-i-bezpieczenstwo.md` (etap 1: „logowanie z drugim składnikiem: aplikacja lub passkey”). To jest projekt, bez kodu.

> **Jednym zdaniem:** biuro rachunkowe i opiekun po zalogowaniu podają 6-cyfrowy kod z dowolnej aplikacji uwierzytelniającej w telefonie; własnej aplikacji nie budujemy.

## 1. Warunek wstępny: serwer

TOTP ma sens tylko tam, gdzie sekret i sprawdzenie kodu są po stronie serwera. Obecne makiety (`index.html`, `pilot/`, `skaner/`) są statyczne: kod sprawdzany w przeglądarce da się obejść w narzędziach deweloperskich, a sekret byłby widoczny w źródle strony. Dlatego:

- w makietach **nie** wdrażamy TOTP (dawałoby fałszywe poczucie ochrony);
- TOTP wchodzi razem z „Etapem 1 na serwerze” (konta, RLS), przed pierwszym prawdziwym kontem biura lub opiekuna.

## 2. Kto i kiedy podaje kod

| Rola | Pierwszy składnik | TOTP | Uzasadnienie |
|---|---|---|---|
| **Opiekun (my)** | hasło | **obowiązkowy**, bez zapamiętywania urządzenia | Widzi dane wielu firm, wycenia, zamyka sprawy. |
| **Biuro rachunkowe** | hasło | **obowiązkowy**; zapamiętanie urządzenia do 30 dni (decyzja nr 1) | Widzi dane wielu swoich klientów. |
| **Właściciel sklepu** | link z SMS-a | **nie przy logowaniu**; dobrowolny, a wymagany dopiero przy danych z etapu 3 (KSeF, Kasa) | Zasada 7: klient nie zarządza, tylko widzi. Ekran statusu jednej sprawy nie uzasadnia dodatkowego kroku dla osoby, która stoi 12 godzin za ladą. |

**Dodatkowe potwierdzenie kodem** (nawet w trwającej sesji, jeśli ostatni kod jest starszy niż 10 minut):

- eksport lub usunięcie danych firmy,
- zmiana numeru telefonu, hasła, ról i uprawnień,
- dodanie lub zmiana dostępu do KSeF,
- wyłączenie TOTP i wygenerowanie nowych kodów zapasowych.

## 3. Aplikacje w telefonie

Trzymamy się standardu RFC 6238, więc działa każda aplikacja uwierzytelniająca. W instrukcji wymieniamy trzy, żeby użytkownik nie musiał wybierać sam:

| Aplikacja | System | Dlaczego na liście |
|---|---|---|
| Google Authenticator | Android, iOS | Najbardziej znana; kopia w koncie Google. |
| Microsoft Authenticator | Android, iOS | Biura często mają ją już przez Microsoft 365. |
| 2FAS | Android, iOS | Darmowa, otwarty kod, prosta kopia zapasowa. |

Działają też menedżery haseł (1Password, Bitwarden) i Aegis. **Własnej aplikacji mobilnej nie budujemy:** nie daje użytkownikowi nic ponad gotowe, a przynosi koszt utrzymania w dwóch sklepach i dodatkowe pytania o Cyber Resilience Act (punkt 14 w `sposoby-i-bezpieczenstwo.md`).

## 4. Parametry

| Parametr | Wartość | Uwaga |
|---|---|---|
| Algorytm | HMAC-SHA1 | Część aplikacji po cichu ignoruje inne ustawienia, więc SHA-256 dawałby błędne kody. SHA-1 w HMAC pozostaje bezpieczny w tym zastosowaniu. |
| Długość kodu | 6 cyfr | Jak wyżej: jedyna wartość obsługiwana wszędzie. |
| Okres | 30 s | |
| Sekret | 160 bitów z generatora kryptograficznego, zapis Base32 | Długość zalecana w RFC 4226. |
| Tolerancja zegara | ±1 okres (kod poprzedni, bieżący, następny) | Zegar serwera z NTP. |
| Wystawca | `raportfirmy.pl` | Tak nazywa się wpis w aplikacji. |

Adres w kodzie QR:

```
otpauth://totp/raportfirmy.pl:{login}?secret={BASE32}&issuer=raportfirmy.pl&algorithm=SHA1&digits=6&period=30
```

Kod QR powstaje u nas (na serwerze albo w przeglądarce użytkownika). **Nigdy przez zewnętrzną usługę generującą QR**, bo sekret trafiłby do obcego serwera.

## 5. Przebiegi

### 5.1 Włączenie (pierwsze logowanie biura lub opiekuna)

1. Użytkownik loguje się hasłem. Konto bez TOTP ma dostęp wyłącznie do ekranu włączenia.
2. Ekran pokazuje kod QR, ten sam sekret tekstem (do wpisania ręcznie) i trzy aplikacje z punktu 3.
3. Użytkownik wpisuje pierwszy kod. Dopiero poprawny kod włącza TOTP; do tego czasu sekret ma stan „oczekujący” i wygasa po 15 minutach.
4. Pokazujemy **10 kodów zapasowych**, raz, z przyciskami „pobierz” i „drukuj”. Przejście dalej wymaga zaznaczenia „zapisałem kody”.
5. Wpis w dzienniku i e-mail „włączono logowanie dwuetapowe”.

### 5.2 Logowanie

1. Hasło poprawne → ekran „Wpisz kod z aplikacji”. Do tego momentu sesja nie ma żadnych uprawnień.
2. Serwer liczy kody dla okresów T−1, T, T+1 i porównuje w stałym czasie.
3. **Jeden kod działa raz:** zapisujemy numer ostatniego przyjętego okresu i odrzucamy każdy kod z okresu tego samego lub wcześniejszego (RFC 6238, pkt 5.2).
4. Pod polem link „Nie mam telefonu”: kod zapasowy.

### 5.3 Ograniczenie prób

- 5 błędnych kodów → blokada drugiego kroku na 15 minut; kolejne serie wydłużają blokadę (15 min, 1 h, 24 h).
- Licznik na konto i osobno na adres IP.
- Po blokadzie e-mail do właściciela konta. Ta sama treść błędu dla złego kodu i dla kodu już użytego.

Przy 5 próbach i 3 ważnych kodach szansa odgadnięcia w jednej serii to ok. 0,0015%.

### 5.4 Kody zapasowe

- 10 kodów, każdy jednorazowy, po 10 znaków z alfabetu bez znaków mylących (bez 0/O, 1/I/l).
- W bazie tylko skróty (SHA-256 wystarcza, bo kody są losowe i długie).
- Użycie kodu zapasowego: e-mail do użytkownika i licznik „zostało N”. Przy 3 pozostałych zachęta do wygenerowania nowych (stare tracą ważność).

### 5.5 Utrata telefonu

| Sytuacja | Postępowanie |
|---|---|
| Są kody zapasowe | Logowanie kodem zapasowym → natychmiastowe ustawienie TOTP od nowa. Stary sekret przestaje działać. |
| Biuro, brak kodów | Zgłoszenie do opiekuna. Opiekun **oddzwania na numer z umowy** (nie na numer podany w zgłoszeniu), potwierdza tożsamość i zeruje TOTP. Reset zaczyna działać po 24 godzinach, a na adres e-mail konta idzie powiadomienie z przyciskiem „to nie ja”. |
| Opiekun, brak kodów | Reset wykonuje druga osoba (CEO), nigdy sam zainteresowany. Ten sam dziennik i powiadomienie. |

Reset nigdy nie odbywa się na podstawie samego e-maila ani SMS-a: wtedy drugi składnik byłby tak silny jak skrzynka pocztowa.

### 5.6 Wyłączenie

Biuro i opiekun nie mogą wyłączyć TOTP, mogą go tylko wymienić (nowy telefon). Właściciel, który włączył dobrowolnie, może wyłączyć po podaniu bieżącego kodu.

## 6. Dane i przechowywanie

Uzupełnienie modelu z rozdz. 8 zarysu:

`DrugiSkładnik` (użytkownik, sekret zaszyfrowany, stan: oczekujący / aktywny, data włączenia, ostatni przyjęty okres, licznik błędów, blokada do)
`KodZapasowy` (użytkownik, skrót, data użycia)
`ZaufaneUrządzenie` (użytkownik, skrót losowego identyfikatora z ciasteczka, ważne do): tylko jeśli decyzja nr 1 brzmi „tak”

Zasady:

- Sekretu TOTP nie da się przechowywać jako skrótu (serwer musi go znać, żeby policzyć kod). Dlatego: **szyfrowanie AES-256-GCM kluczem spoza bazy** (ten sam magazyn sekretów co klucz API i tokeny KSeF). Sama kopia bazy nie wystarcza do wyliczenia kodów.
- Sekret i kody zapasowe nie trafiają do logów, dziennika, analityki, wiadomości do AI ani do zrzutów błędów.
- Sekret pokazujemy tylko raz, przy włączeniu. Potem nie da się go odczytać z panelu, można jedynie ustawić nowy.
- RLS: rekord `DrugiSkładnik` widzi wyłącznie proces logowania, nie rola opiekuna.
- Kopie zapasowe bazy zawierają zaszyfrowane sekrety; próba odtworzenia raz w miesiącu obejmuje sprawdzenie, że logowanie z TOTP działa po odtworzeniu.

Zdarzenia w `DziennikDostępu` (kto, kiedy, co; bez kodów): włączenie, poprawne i błędne potwierdzenie, blokada, użycie kodu zapasowego, nowe kody zapasowe, reset (kto zlecił, kto wykonał), wymiana, wyłączenie.

## 7. Ekrany i teksty

| Ekran | Treść |
|---|---|
| Włączenie | „Zabezpiecz konto kodem z telefonu. 1. Zainstaluj aplikację (Google Authenticator, Microsoft Authenticator albo 2FAS). 2. Zeskanuj kod. 3. Wpisz 6 cyfr, które pokaże aplikacja.” Link: „Nie mogę zeskanować” → sekret tekstem. |
| Kody zapasowe | „Zapisz te kody. Przydadzą się, gdy zgubisz telefon. Każdy działa raz. Nie pokażemy ich ponownie.” |
| Logowanie | „Wpisz kod z aplikacji.” Pole na 6 cyfr z klawiaturą numeryczną (`inputmode="numeric"`, `autocomplete="one-time-code"`); wysyłka po szóstej cyfrze. |
| Błąd | „Kod się nie zgadza. Sprawdź, czy telefon ma włączony automatyczny czas, i wpisz nowy kod.” |
| Blokada | „Za dużo prób. Spróbuj ponownie o 14:35 albo użyj kodu zapasowego.” (konkretna godzina, bez licznika) |

Teksty trzymają zasadę 6: bez straszenia, bez fałszywej pilności.

## 8. Czego TOTP nie załatwia

- **Phishing.** Kod wpisany na fałszywej stronie atakujący przekaże dalej w ciągu 30 sekund. Ograniczamy to jednorazowością kodu, e-mailem o logowaniu z nowego urządzenia i dodatkowym kodem przed operacjami z punktu 2. Pełną odporność dają dopiero passkeys.
- **Przejęty telefon lub komputer.** Poza zakresem; skraca to krótka sesja opiekuna (wylogowanie po 30 minutach bezczynności).
- **SMS jako drugi składnik.** Nie stosujemy: SMS jest już pierwszym składnikiem właściciela, a przejęcie numeru (duplikat karty SIM) jest realnym atakiem.

**Passkeys (etap 3 zarysu):** gdy staną się domyślne, TOTP zostaje jako metoda zapasowa dla osób bez zgodnego urządzenia. Model danych z punktu 6 tego nie blokuje: passkey to kolejny rodzaj drugiego składnika przy tym samym użytkowniku.

## 9. Wykonanie

- Gotowa, utrzymywana biblioteka TOTP dla wybranego języka serwera (np. `otplib` w Node, `pyotp` w Pythonie). Żadnej własnej kryptografii.
- Koszt licencji: 0 zł. Brak opłat za wiadomość, w odróżnieniu od SMS-ów.

**Testy przed włączeniem:**

1. Wektory testowe z RFC 6238 (dodatek B) dają oczekiwane kody.
2. Kod z okresu T−1 i T+1 przechodzi, z T−2 i T+2 nie.
3. Ten sam kod użyty drugi raz jest odrzucony.
4. Szósta błędna próba trafia na blokadę, także z innego adresu IP.
5. Kod zapasowy działa raz; po wygenerowaniu nowych stare nie działają.
6. Konto bez aktywnego TOTP nie otwiera niczego poza ekranem włączenia (w tym bezpośrednio przez API).
7. Sekret nie występuje w logach ani w odpowiedziach API po zakończeniu włączenia.
8. Ręcznie: włączenie i logowanie w trzech aplikacjach z punktu 3 na Androidzie i iOS, szerokość 390 px.

**Kolejność:** szyfrowany magazyn sekretów → włączenie i logowanie → blokady i dziennik → kody zapasowe → procedura resetu (jedna strona, obok procedury incydentu) → dodatkowe potwierdzenie operacji wrażliwych.

## 10. Decyzje otwarte (CEO)

1. **Zapamiętanie urządzenia w biurze na 30 dni.** Rekomendacja: tak dla biura (księgowa loguje się codziennie z tego samego komputera), nie dla opiekuna.
2. **TOTP dla właściciela przy KSeF i Kasie:** obowiązkowy czy dobrowolny. Rekomendacja: obowiązkowy od chwili podłączenia KSeF, bo wtedy konto daje dostęp do faktur zakupowych.
3. **Kto resetuje TOTP opiekuna,** gdy firma to dwie osoby: potwierdzić, że robi to zawsze ta druga, i zapisać w procedurze.
4. **Passkey od razu obok TOTP** czy dopiero w etapie 3. Rekomendacja: TOTP teraz, passkey przy pierwszym biurze, które o to zapyta.
