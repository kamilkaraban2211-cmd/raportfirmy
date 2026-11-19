"use strict";
const NAZWY = { znalezlismy: "Znaleźliśmy", robimy: "Robimy", gotowe: "Gotowe", nie_udalo_sie: "Nie udało się" };
const data = d => new Date(d).toLocaleString("pl-PL", { dateStyle: "medium", timeStyle: "short" });

(async () => {
  const token = location.hash.slice(1);
  const blad = document.getElementById("blad");
  if (!token) { blad.textContent = "Brak linku do sprawy. Otwórz link otrzymany po wysłaniu zlecenia."; return; }
  try {
    const r = await fetch("/api/sprawa", { headers: { Authorization: "Bearer " + token } });
    const j = await r.json();
    if (!r.ok) { blad.textContent = j.blad || "Nie udało się wczytać sprawy."; return; }
    document.getElementById("sklep").textContent = j.sklep;
    document.getElementById("miejscowosc").textContent = j.miejscowosc;
    const etapy = document.getElementById("etapy");
    const lista = j.stan === "nie_udalo_sie" ? ["znalezlismy", "robimy", "nie_udalo_sie"] : ["znalezlismy", "robimy", "gotowe"];
    for (const s of lista) {
      const li = document.createElement("li");
      li.textContent = NAZWY[s];
      if (s === j.stan) li.className = "teraz";
      etapy.append(li);
    }
    const hist = document.getElementById("historia");
    for (const h of j.historia) {
      const li = document.createElement("li");
      li.textContent = `${data(h.kiedy)}: ${NAZWY[h.stan] || h.stan}`;
      hist.append(li);
    }
    document.getElementById("sprawa").hidden = false;
  } catch {
    blad.textContent = "Brak połączenia. Spróbuj ponownie.";
  }
})();
