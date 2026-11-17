# Struktura dochodowa: liczby z kalkulatora

Wygenerowane przez `struktura.py` z `struktura.json`. Kwoty netto w zł. Zysk jest liczony przed wynagrodzeniem właściciela i przed podatkiem dochodowym, dlatego obok stoi liczba godzin pracy i zysk na godzinę. Ostatnia kolumna odejmuje czas właściciela jako koszt: godziny razy `stawka_godziny_wlasciciela` z pliku wejściowego.

## Rok 1 (12 miesięcy od startu)

| Scenariusz | Przychód | Zysk | Po wydatkach startowych | Godziny pracy | Zysk na godzinę | Zysk po koszcie czasu właściciela (60 zł/h) |
|---|---:|---:|---:|---:|---:|---:|
| A. Plan startu, wszystko ręcznie | 4 762 | 106 | -1 594 | 197 | 1 zł | -11 731 |
| B. Plan startu z agentami | 4 762 | -906 | -2 606 | 87 | -10 zł | -6 155 |
| C. Pełna struktura, ręcznie | 12 879 | 8 141 | 6 441 | 355 | 23 zł | -13 133 |
| D. Pełna struktura z agentami | 12 879 | 6 815 | 5 115 | 176 | 39 zł | -3 748 |
| E. Pełna struktura z agentami, jedno nowe biuro co miesiąc | 19 913 | 13 482 | 11 782 | 264 | 51 zł | -2 353 |

## Miesiąc 12 (stan docelowy pierwszego roku)

| Scenariusz | Naprawy | Trudne sprawy | Opieka | Biura | Przychód | Koszty zmienne | Koszty stałe | Zysk | Godziny | Zysk na godzinę | Przychód powtarzalny | Zysk po koszcie czasu właściciela |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| A. Plan startu, wszystko ręcznie | 235 | 161 | 0 | 0 | 397 | 8 | 380 | 9 | 16,4 | 1 zł | 0% | -978 |
| B. Plan startu z agentami | 235 | 161 | 0 | 0 | 397 | 12 | 460 | -75 | 7,3 | -10 zł | 0% | -513 |
| C. Pełna struktura, ręcznie | 432 | 296 | 234 | 894 | 1 856 | 21 | 380 | 1 455 | 42,1 | 35 zł | 61% | -1 071 |
| D. Pełna struktura z agentami | 432 | 296 | 234 | 894 | 1 856 | 76 | 460 | 1 320 | 21,9 | 60 zł | 61% | 9 |
| E. Pełna struktura z agentami, jedno nowe biuro co miesiąc | 526 | 360 | 234 | 1 788 | 2 909 | 124 | 460 | 2 324 | 26,0 | 89 zł | 70% | 766 |

## A. Plan startu, wszystko ręcznie: miesiąc po miesiącu

| Mies. | Sprawdzenia | Zlecenia | Klienci opieki | Biura | Przychód | Zysk | Narastająco po starcie | Godziny |
|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | 30 | 2,7 | 0,0 | 0 | 397 | 9 | -1 691 | 16,4 |
| 2 | 30 | 2,7 | 0,0 | 0 | 397 | 9 | -1 682 | 16,4 |
| 3 | 30 | 2,7 | 0,0 | 0 | 397 | 9 | -1 673 | 16,4 |
| 4 | 30 | 2,7 | 0,0 | 0 | 397 | 9 | -1 665 | 16,4 |
| 5 | 30 | 2,7 | 0,0 | 0 | 397 | 9 | -1 656 | 16,4 |
| 6 | 30 | 2,7 | 0,0 | 0 | 397 | 9 | -1 647 | 16,4 |
| 7 | 30 | 2,7 | 0,0 | 0 | 397 | 9 | -1 638 | 16,4 |
| 8 | 30 | 2,7 | 0,0 | 0 | 397 | 9 | -1 629 | 16,4 |
| 9 | 30 | 2,7 | 0,0 | 0 | 397 | 9 | -1 620 | 16,4 |
| 10 | 30 | 2,7 | 0,0 | 0 | 397 | 9 | -1 611 | 16,4 |
| 11 | 30 | 2,7 | 0,0 | 0 | 397 | 9 | -1 603 | 16,4 |
| 12 | 30 | 2,7 | 0,0 | 0 | 397 | 9 | -1 594 | 16,4 |

## B. Plan startu z agentami: miesiąc po miesiącu

| Mies. | Sprawdzenia | Zlecenia | Klienci opieki | Biura | Przychód | Zysk | Narastająco po starcie | Godziny |
|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | 30 | 2,7 | 0,0 | 0 | 397 | -75 | -1 775 | 7,3 |
| 2 | 30 | 2,7 | 0,0 | 0 | 397 | -75 | -1 851 | 7,3 |
| 3 | 30 | 2,7 | 0,0 | 0 | 397 | -75 | -1 926 | 7,3 |
| 4 | 30 | 2,7 | 0,0 | 0 | 397 | -75 | -2 002 | 7,3 |
| 5 | 30 | 2,7 | 0,0 | 0 | 397 | -75 | -2 077 | 7,3 |
| 6 | 30 | 2,7 | 0,0 | 0 | 397 | -75 | -2 153 | 7,3 |
| 7 | 30 | 2,7 | 0,0 | 0 | 397 | -75 | -2 228 | 7,3 |
| 8 | 30 | 2,7 | 0,0 | 0 | 397 | -75 | -2 304 | 7,3 |
| 9 | 30 | 2,7 | 0,0 | 0 | 397 | -75 | -2 379 | 7,3 |
| 10 | 30 | 2,7 | 0,0 | 0 | 397 | -75 | -2 455 | 7,3 |
| 11 | 30 | 2,7 | 0,0 | 0 | 397 | -75 | -2 530 | 7,3 |
| 12 | 30 | 2,7 | 0,0 | 0 | 397 | -75 | -2 606 | 7,3 |

## C. Pełna struktura, ręcznie: miesiąc po miesiącu

| Mies. | Sprawdzenia | Zlecenia | Klienci opieki | Biura | Przychód | Zysk | Narastająco po starcie | Godziny |
|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | 45 | 4,0 | 0,6 | 1 | 619 | 227 | -1 473 | 33,4 |
| 2 | 30 | 2,9 | 1,2 | 1 | 471 | 81 | -1 392 | 18,2 |
| 3 | 30 | 2,9 | 1,8 | 1 | 493 | 103 | -1 289 | 18,4 |
| 4 | 45 | 4,2 | 2,3 | 2 | 713 | 318 | -971 | 35,3 |
| 5 | 30 | 3,1 | 2,8 | 2 | 561 | 170 | -802 | 20,2 |
| 6 | 45 | 4,4 | 3,3 | 3 | 1 227 | 830 | 28 | 37,1 |
| 7 | 30 | 3,2 | 3,8 | 3 | 1 074 | 680 | 708 | 21,9 |
| 8 | 45 | 4,6 | 4,2 | 4 | 1 439 | 1 041 | 1 750 | 38,8 |
| 9 | 30 | 3,4 | 4,7 | 4 | 1 285 | 890 | 2 639 | 23,6 |
| 10 | 45 | 4,8 | 5,1 | 5 | 1 649 | 1 250 | 3 889 | 40,4 |
| 11 | 30 | 3,6 | 5,5 | 5 | 1 493 | 1 097 | 4 986 | 25,3 |
| 12 | 45 | 4,9 | 5,9 | 6 | 1 856 | 1 455 | 6 441 | 42,1 |

## D. Pełna struktura z agentami: miesiąc po miesiącu

| Mies. | Sprawdzenia | Zlecenia | Klienci opieki | Biura | Przychód | Zysk | Narastająco po starcie | Godziny |
|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | 45 | 4,0 | 0,6 | 1 | 619 | 133 | -1 567 | 18,0 |
| 2 | 30 | 2,9 | 1,2 | 1 | 471 | -12 | -1 579 | 8,1 |
| 3 | 30 | 2,9 | 1,8 | 1 | 493 | 10 | -1 569 | 8,1 |
| 4 | 45 | 4,2 | 2,3 | 2 | 713 | 215 | -1 354 | 18,8 |
| 5 | 30 | 3,1 | 2,8 | 2 | 561 | 69 | -1 285 | 8,9 |
| 6 | 45 | 4,4 | 3,3 | 3 | 1 227 | 719 | -566 | 19,6 |
| 7 | 30 | 3,2 | 3,8 | 3 | 1 074 | 571 | 5 | 9,7 |
| 8 | 45 | 4,6 | 4,2 | 4 | 1 439 | 922 | 928 | 20,3 |
| 9 | 30 | 3,4 | 4,7 | 4 | 1 285 | 773 | 1 700 | 10,4 |
| 10 | 45 | 4,8 | 5,1 | 5 | 1 649 | 1 123 | 2 823 | 21,1 |
| 11 | 30 | 3,6 | 5,5 | 5 | 1 493 | 972 | 3 794 | 11,2 |
| 12 | 45 | 4,9 | 5,9 | 6 | 1 856 | 1 320 | 5 115 | 21,9 |

## E. Pełna struktura z agentami, jedno nowe biuro co miesiąc: miesiąc po miesiącu

| Mies. | Sprawdzenia | Zlecenia | Klienci opieki | Biura | Przychód | Zysk | Narastająco po starcie | Godziny |
|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | 45 | 4,0 | 0,6 | 1 | 619 | 133 | -1 567 | 18,0 |
| 2 | 45 | 4,2 | 1,2 | 2 | 669 | 173 | -1 394 | 18,7 |
| 3 | 45 | 4,4 | 1,8 | 3 | 718 | 213 | -1 181 | 19,5 |
| 4 | 45 | 4,6 | 2,3 | 4 | 766 | 252 | -929 | 20,2 |
| 5 | 45 | 4,8 | 2,8 | 5 | 813 | 290 | -639 | 20,9 |
| 6 | 45 | 4,9 | 3,3 | 6 | 1 753 | 1 221 | 582 | 21,6 |
| 7 | 45 | 5,1 | 3,8 | 7 | 1 947 | 1 407 | 1 989 | 22,4 |
| 8 | 45 | 5,3 | 4,2 | 8 | 2 141 | 1 592 | 3 581 | 23,1 |
| 9 | 45 | 5,5 | 4,7 | 9 | 2 334 | 1 776 | 5 356 | 23,8 |
| 10 | 45 | 5,7 | 5,1 | 10 | 2 526 | 1 959 | 7 316 | 24,5 |
| 11 | 45 | 5,8 | 5,5 | 11 | 2 718 | 2 142 | 9 458 | 25,3 |
| 12 | 45 | 6,0 | 5,9 | 12 | 2 909 | 2 324 | 11 782 | 26,0 |
