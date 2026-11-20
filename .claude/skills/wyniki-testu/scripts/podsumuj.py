#!/usr/bin/env python3
"""Liczy wyniki testu A/B/C z plików CSV wyeksportowanych z teren/index.html.

Użycie: python3 -I podsumuj.py sklepy.csv [biura.csv] [platnosci.csv]
Wypisuje JSON z liczbami i werdyktem według reguł z docs/founder/launch.md.
Te same reguły co w funkcji verdict() w teren/index.html.
"""
import csv
import json
import sys

TARGET = 30
SHOP_COLS = {"id", "nazwa", "data_sprawdzenia", "bledy_do_naprawy", "bledy_centrali", "trudna_sprawa",
             "karta_pokazana", "oplacone", "kwota", "dostep_min", "utknal", "wybor_zamowien"}
OFFICE_COLS = {"id", "nazwa", "zgoda", "kwota_mies", "komunikacja_koszt", "list_intencyjny"}
PAY_COLS = {"nr_potwierdzenia", "data_platnosci", "sklep_id", "kwota", "metoda"}


def read(path, required):
    with open(path, encoding="utf-8-sig", newline="") as f:
        first = f.readline()
        f.seek(0)
        sep = ";" if first.count(";") > first.count(",") else ","
        rows = list(csv.DictReader(f, delimiter=sep))
    cols = set(rows[0].keys()) if rows else set(first.strip().split(sep))
    missing = required - cols
    if missing:
        sys.exit(f"{path}: brak kolumn {sorted(missing)}. To nie jest eksport z narzędzia terenowego.")
    return rows


def num(x):
    try:
        return float(str(x).replace(",", "."))
    except ValueError:
        return 0.0


def main(argv):
    if not argv:
        sys.exit(__doc__)
    files = {"sklepy": None, "biura": None, "platnosci": None}
    for p in argv:
        name = p.replace("\\", "/").rsplit("/", 1)[-1]
        key = next((k for k in files if name.startswith(k)), None)
        if not key:
            sys.exit(f"Nie rozpoznaję pliku {p}: nazwa ma zaczynać się od sklepy, biura albo platnosci.")
        files[key] = p
    if not files["sklepy"]:
        sys.exit("Potrzebny jest co najmniej sklepy.csv.")

    shops = read(files["sklepy"], SHOP_COLS)
    offices = read(files["biura"], OFFICE_COLS) if files["biura"] else []
    pays = read(files["platnosci"], PAY_COLS) if files["platnosci"] else None

    checked = [s for s in shops if s["data_sprawdzenia"]]
    with_issue = [s for s in checked if num(s["bledy_do_naprawy"]) > 0]
    paid = [s for s in shops if s["oplacone"] == "1"]
    a = len(with_issue) / len(checked) if checked else 0.0
    m = {
        "sklepy_wszystkie": len(shops),
        "sprawdzone": len(checked),
        "z_bledem_do_naprawy": len(with_issue),
        "A_odsetek": round(a, 3),
        "z_trudna_sprawa": sum(1 for s in checked if s["trudna_sprawa"] == "1"),
        "tylko_pola_centrali": sum(1 for s in checked if num(s["bledy_do_naprawy"]) == 0 and num(s["bledy_centrali"]) > 0),
        "karty_pokazane": sum(1 for s in shops if s["karta_pokazana"] == "1"),
        "oplacone": len(paid),
        "przychod_zl": round(sum(num(s["kwota"]) for s in paid), 2),
        "dostep_testowany": sum(1 for s in shops if s["dostep_min"] != ""),
        "dostep_utknelo": sum(1 for s in shops if s["utknal"] == "1"),
        "wybor_zamowien": {k: sum(1 for s in shops if s["wybor_zamowien"] == k) for k in ("braki", "faktury", "oba", "zadne")},
        "rozmowy_biura": len(offices),
        "partnerzy_na_pismie": sum(1 for o in offices if o["zgoda"] == "pisemnie"),
        "biura_komunikacja_koszt": sum(1 for o in offices if o["komunikacja_koszt"] == "1"),
        "biura_z_kwota": sum(1 for o in offices if num(o["kwota_mies"]) > 0),
        "biura_list_intencyjny": sum(1 for o in offices if o["list_intencyjny"] == "1"),
    }

    warnings = []
    if pays is not None:
        m["platnosci_suma_zl"] = round(sum(num(p["kwota"]) for p in pays), 2)
        if len(pays) != len(paid) or abs(m["platnosci_suma_zl"] - m["przychod_zl"]) > 0.005:
            warnings.append("platnosci.csv nie zgadza się ze sklepy.csv (liczba albo suma płatności). Sprawdź eksport z tego samego dnia.")
        nos = [p["nr_potwierdzenia"] for p in pays]
        if len(set(nos)) != len(nos):
            warnings.append("Powtórzony numer potwierdzenia zapłaty.")

    if len(checked) < TARGET:
        v = ("w_toku", f"Test w toku: sprawdzono {len(checked)} z {TARGET}.")
    elif a < 0.15:
        v = ("brak_startu", "Poniżej 15% sklepów z błędem: brak startu, powrót do oferty.")
    elif a >= 0.30 and m["oplacone"] >= 3 and m["karty_pokazane"] >= 10:
        v = ("start", "Warunki A i B spełnione: start 18.01.2027.")
    elif a >= 0.30 and m["oplacone"] < 1:
        v = ("zaufanie_oferta", "Błędy są, ale nikt nie zapłacił: problem w zaufaniu albo ofercie.")
    else:
        v = ("posredni", "Wynik pośredni: decyzja CEO.")
    m["werdykt"] = {"kod": v[0], "opis": v[1]}
    m["warunki_zarzadu"] = {
        "A_co_najmniej_30proc": a >= 0.30 and len(checked) >= TARGET,
        "B_3_oplacone_z_10_kart": m["oplacone"] >= 3 and m["karty_pokazane"] >= 10,
        "C_partner_na_pismie": m["partnerzy_na_pismie"] >= 1,
        "dostep_testowany_na_5": m["dostep_testowany"] >= 5,
        "komunikacja_2_z_5_biur": m["biura_komunikacja_koszt"] >= 2,
    }
    m["ostrzezenia"] = warnings
    print(json.dumps(m, ensure_ascii=False, indent=1))


if __name__ == "__main__":
    main(sys.argv[1:])
