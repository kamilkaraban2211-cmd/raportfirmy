# Źródła liczb: „Sklep w porządku” (CFO, 20.11.2026)

| Liczba | Wartość | Źródło / sposób |
|---|---|---|
| Cena | 149 zł brutto = 121,14 zł netto | `launch.md` (oferta v3); zakłada VAT 23% |
| Sprawdzeń na 1 opłacone zlecenie | 10 | linia sukcesu testu w `launch.md`: ≥ 3 zlecenia z 30 sprawdzeń |
| Czas sprawdzenia | 15 min | `launch.md` („ok. 15 min na sklep”) |
| Naprawa (element B) | 45–90 min, przyjęte 67,5 | `offer.md`, tabela elementów (szacunek CEO) |
| Telefon przy dodaniu menedżera (M) | 10 min | `offer.md` |
| Kontrola po 30 dniach (F) | 15 min | `offer.md` |
| 5 odpowiedzi na pytania (G), porównanie z 3 sklepami (H) | nie wliczone | nie ma ich w ofercie v3 (`launch.md`) |
| Wizyty osobiste | nie wliczone | czas niezmierzony; wynik będzie przez to gorszy |
| Stawka godziny CEO | 60 zł/h | ta sama co w CFO Skanera (szacunek, `numbers-skaner.json`) |
| Płatność BLIK / przelew | 0 zł | szacunek; sprawdzić opłaty konta firmowego |
| Koszty stałe | 330 zł/mies. | jak w CFO Skanera (szacunki do podania) |
| Start | 1 500 zł prawne + 200 zł marketing | jak w CFO Skanera (szacunki) |
| Limit / pojemność | 10 zleceń w miesiącu | `launch.md` („np. 10”) |
| Rampa | 3, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10 | szacunek między linią przejścia (3) a limitem (10) |

---

# Źródła liczb: Skaner raportu z kasy (CFO, 15.11.2026)

| Liczba | Wartość | Źródło / sposób |
|---|---|---|
| Kurs USD/PLN | 4,00 | Podany przez CEO 15.11.2026 (NBP 23.10.2026: 3,9247). |
| Claude Haiku 5.5 | 0,10 USD / mln tokenów wejścia, 0,50 USD / mln wyjścia (do 100 tys.) | platform.claude.com/docs/en/about-claude/pricing |
| Claude Sonnet 5.5 | 2 USD / 10 USD za mln tokenów | jw. |
| Tokeny zdjęcia | ⌈szer./28⌉ × ⌈wys./28⌉; limit 4 784 (wysoka rozdzielczość) | platform.claude.com/docs/en/build-with-claude/vision |
| Zdjęcie po zmniejszeniu 1092×1456 | 2 028 tokenów | wyliczone wzorem powyżej |
| Prompt odczytu | 900 tokenów | szacunek (długość promptu w prototypie) |
| Wyjście odczytu | 700 (Haiku) / 1 500 (Sonnet, z myśleniem) tokenów | szacunek |
| Skany na klienta-miesiąc | 27 raportów (26 dobowych + 1 miesięczny) × 1,2 na powtórki ≈ 32 | szacunek |
| Komentarze | 8/mies. (wyjściowo), 2/mies. (po optymalizacji) | szacunek |
| Stripe karta (PL) | 1,5% + 1 zł; Stripe Billing 0,7% | quasa.io, cennik Stripe dla Polski cytowany w artykule |
| PayU karta | 1,49% + 0,30 zł | jw. |
| Wsparcie | 60 zł/h; 10 min → 4 min / klient-miesiąc | szacunek, do zmierzenia w pilocie |
| Hosting MD1 | 20 zł/mies. | szacunek; hosting jest już opłacony, potrzebny faktyczny koszt |
| Domena i poczta | 10 zł/mies. | szacunek |
| Księgowość raportfirmy.pl | 300 zł/mies. | szacunek; potrzebna faktyczna oferta |
| Dokumenty prawne | 1 500 zł jednorazowo | szacunek |
| Ramp klientów | 3, 5, 8, 12, 16, 20, 25, 30, 35, 40, 45, 50 | szacunek; brak danych sprzedażowych |
| Cena | 49 zł brutto = 39,84 zł netto | hipoteza; zakłada VAT 23% |
| Przechowywanie zdjęć | 0 zł | zdjęcia nie są zapisywane (decyzja CEO) |
