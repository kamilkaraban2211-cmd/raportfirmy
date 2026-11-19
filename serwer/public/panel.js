"use strict";
const NAZWY = { znalezlismy: "Znaleźliśmy", robimy: "Robimy", gotowe: "Gotowe", nie_udalo_sie: "Nie udało się" };
const $ = id => document.getElementById(id);
const td = text => { const c = document.createElement("td"); c.textContent = text; return c; };
const post = (url, body) => fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });

async function wczytaj() {
  const r = await fetch("/api/opiekun/zlecenia");
  if (r.status === 401) { $("lista").hidden = true; $("logowanie").hidden = false; return; }
  const zlecenia = await r.json();
  const tb = $("wiersze");
  tb.replaceChildren();
  for (const z of zlecenia) {
    const tr = document.createElement("tr");
    const sel = document.createElement("select");
    for (const [k, v] of Object.entries(NAZWY)) sel.append(new Option(v, k, false, k === z.stan));
    sel.addEventListener("change", async () => {
      const rr = await post(`/api/opiekun/zlecenia/${z.id}/stan`, { stan: sel.value });
      $("blad-listy").textContent = rr.ok ? "" : "Nie udało się zmienić stanu zlecenia " + z.id + ".";
      if (!rr.ok) sel.value = z.stan; else z.stan = sel.value;
    });
    const stan = document.createElement("td");
    stan.append(sel);
    tr.append(td(z.id), td(`${z.sklep}, ${z.miejscowosc}`), td(`${z.imie}, ${z.telefon}`), td(z.nip), td(z.opis),
      td(new Date(z.utworzono).toLocaleString("pl-PL")), stan);
    tb.append(tr);
  }
  $("logowanie").hidden = true;
  $("lista").hidden = false;
}

$("logowanie").addEventListener("submit", async ev => {
  ev.preventDefault();
  const f = new FormData(ev.target);
  const r = await post("/api/opiekun/logowanie", { login: f.get("login"), haslo: f.get("haslo"), kod: f.get("kod") });
  if (!r.ok) { $("blad-logowania").textContent = (await r.json()).blad; return; }
  ev.target.reset();
  $("blad-logowania").textContent = "";
  wczytaj();
});

$("wyloguj").addEventListener("click", async () => { await post("/api/opiekun/wyloguj", {}); wczytaj(); });

wczytaj();
