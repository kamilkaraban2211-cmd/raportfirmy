#!/usr/bin/env python3
"""Kalkulator struktury dochodowej raportfirmy.pl.

Użycie: python3 docs/founder/struktura.py docs/founder/struktura.json [--out plik.md]
Każda liczba wyniku pochodzi z pliku wejściowego. Nic nie jest zgadywane w kodzie.
"""
import json, sys


def netto(brutto, vat):
    return brutto / 1.23 if vat else brutto


def run(cfg, sc):
    vat = cfg["vat_payer"]
    L, t, ai, pay = cfg["lejek"], cfg["minuty"][sc["tryb"]], cfg["koszt_ai"], cfg["platnosc"]
    cb = cfg["ceny_brutto"]
    fee = lambda brutto: brutto * pay["procent"] + pay["stala"]
    fixed = sum(cfg["koszty_stale_mies"].values())
    if sc["tryb"] == "z_agentami":
        fixed += sum(cfg["koszty_stale_agenci_mies"].values())
    rows, opieka, prev_off, biuro_shops = [], 0.0, 0, 0.0
    for m in range(12):
        own = cfg["wlasne_sprawdzenia_mies"][m]
        off = sc.get("biura_narastajaco", cfg["biura_narastajaco"])[m] if sc["biura"] else 0
        new_off = off - prev_off
        new_shops = new_off * L["sklepow_na_biuro"]
        mon_disc = biuro_shops * L["nowe_rozbieznosci_u_pilnowanych_mies"]
        checks = own + new_shops
        disc_own = own * L["odsetek_rozbieznosci"]
        disc_biuro = new_shops * L["odsetek_rozbieznosci"] + mon_disc
        orders_own = disc_own * L["zlecenia_na_pokazany_wynik"]
        orders = orders_own + disc_biuro * L["zlecenia_na_pokazany_wynik"]
        std, hard = orders * (1 - L["udzial_trudnych_spraw"]), orders * L["udzial_trudnych_spraw"]
        p_std = std * (1 - L["nieoplacone_lub_nieudane_naprawa"])
        p_hard = hard * (1 - L["nieoplacone_lub_nieudane_trudna"])
        if sc["opieka"]:
            paid_own = orders_own * (1 - L["nieoplacone_lub_nieudane_naprawa"])
            opieka = opieka * (1 - L["opieka_rezygnacje_mies"]) + paid_own * L["opieka_po_zleceniu"]
        biuro_shops += new_shops
        paid_off = off if (sc["biura"] and m + 1 >= cfg["biuro_platne_od_miesiaca"]) else 0
        rev = {
            "naprawy": p_std * netto(cb["naprawa"], vat),
            "trudne": p_hard * netto(cb["trudna_sprawa"], vat),
            "opieka": opieka * netto(cb["opieka_mies"], vat),
            "biura": paid_off * cfg["biuro_netto_mies"],
        }
        var = (p_std * fee(cb["naprawa"]) + p_hard * fee(cb["trudna_sprawa"]) + opieka * fee(cb["opieka_mies"]))
        if sc["tryb"] == "z_agentami":
            var += checks * ai["sprawdzenie"] + orders * ai["zlecenie"] + (biuro_shops + opieka) * ai["pilnowanie_sklep_mies"]
        mins = (checks * t["sprawdzenie"] + disc_own * t["wizyta_z_wynikiem"] + std * t["naprawa"]
                + hard * t["trudna_sprawa"] + opieka * t["opieka_mies"] + off * t["biuro_mies"]
                + new_off * (t["pozyskanie_biura"] + t["wdrozenie_biura"]))
        revenue = sum(rev.values())
        rows.append({"m": m + 1, "checks": checks, "orders": orders, "opieka": opieka, "off": off,
                     "rev": rev, "revenue": revenue, "var": var, "fixed": fixed,
                     "profit": revenue - var - fixed, "hours": mins / 60})
        prev_off = off
    return rows


def f(x, d=0):
    return f"{x:,.{d}f}".replace(",", " ").replace(".", ",")


def report(cfg):
    out = ["# Struktura dochodowa: liczby z kalkulatora", "",
           "Wygenerowane przez `struktura.py` z `struktura.json`. Kwoty netto w zł. "
           "Zysk jest liczony przed wynagrodzeniem właściciela i przed podatkiem dochodowym, "
           "dlatego obok stoi liczba godzin pracy i zysk na godzinę.", ""]
    res = [(sc, run(cfg, sc)) for sc in cfg["scenariusze"]]
    start = sum(cfg["start"].values())
    out += ["## Rok 1 (12 miesięcy od startu)", "",
            "| Scenariusz | Przychód | Zysk | Po wydatkach startowych | Godziny pracy | Zysk na godzinę |",
            "|---|---:|---:|---:|---:|---:|"]
    for sc, r in res:
        R, P, H = (sum(x[k] for x in r) for k in ("revenue", "profit", "hours"))
        out.append(f"| {sc['nazwa']} | {f(R)} | {f(P)} | {f(P - start)} | {f(H)} | {f(P / H)} zł |")
    out += ["", "## Miesiąc 12 (stan docelowy pierwszego roku)", "",
            "| Scenariusz | Naprawy | Trudne sprawy | Opieka | Biura | Przychód | Koszty zmienne | Koszty stałe | Zysk | Godziny | Zysk na godzinę | Przychód powtarzalny |",
            "|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|"]
    for sc, r in res:
        x = r[-1]; v = x["rev"]
        rec = (v["opieka"] + v["biura"]) / x["revenue"] if x["revenue"] else 0
        out.append(f"| {sc['nazwa']} | {f(v['naprawy'])} | {f(v['trudne'])} | {f(v['opieka'])} | {f(v['biura'])} | "
                   f"{f(x['revenue'])} | {f(x['var'])} | {f(x['fixed'])} | {f(x['profit'])} | {f(x['hours'], 1)} | "
                   f"{f(x['profit'] / x['hours'])} zł | {f(rec * 100)}% |")
    for sc, r in res:
        out += ["", f"## {sc['nazwa']}: miesiąc po miesiącu", "",
                "| Mies. | Sprawdzenia | Zlecenia | Klienci opieki | Biura | Przychód | Zysk | Narastająco po starcie | Godziny |",
                "|---:|---:|---:|---:|---:|---:|---:|---:|---:|"]
        cum = -start
        for x in r:
            cum += x["profit"]
            out.append(f"| {x['m']} | {f(x['checks'])} | {f(x['orders'], 1)} | {f(x['opieka'], 1)} | {x['off']} | "
                       f"{f(x['revenue'])} | {f(x['profit'])} | {f(cum)} | {f(x['hours'], 1)} |")
    return "\n".join(out) + "\n"


if __name__ == "__main__":
    cfg = json.load(open(sys.argv[1], encoding="utf-8"))
    text = report(cfg)
    if "--out" in sys.argv:
        open(sys.argv[sys.argv.index("--out") + 1], "w", encoding="utf-8").write(text)
    else:
        print(text)
