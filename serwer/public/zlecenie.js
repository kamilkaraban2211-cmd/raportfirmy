"use strict";
const form = document.getElementById("zlecenie");
form.addEventListener("submit", async ev => {
  ev.preventDefault();
  form.querySelectorAll("[data-blad]").forEach(p => { p.textContent = ""; });
  const f = new FormData(form);
  const dane = {
    sklep: f.get("sklep"), miejscowosc: f.get("miejscowosc"), nip: f.get("nip"),
    imie: f.get("imie"), telefon: f.get("telefon"), opis: f.get("opis"), zgoda: f.get("zgoda") === "on",
  };
  const btn = form.querySelector("button");
  btn.disabled = true;
  try {
    const r = await fetch("/api/zlecenia", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(dane) });
    const j = await r.json();
    if (r.status === 201) {
      const a = document.getElementById("link");
      a.href = j.link;
      a.textContent = location.origin + j.link;
      form.hidden = true;
      document.getElementById("gotowe").hidden = false;
      return;
    }
    if (j.bledy) for (const [k, v] of Object.entries(j.bledy)) { const p = form.querySelector(`[data-blad="${k}"]`); if (p) p.textContent = v; }
    else form.querySelector('[data-blad="ogolny"]').textContent = j.blad || "Nie udało się wysłać.";
  } catch {
    form.querySelector('[data-blad="ogolny"]').textContent = "Brak połączenia. Spróbuj ponownie.";
  } finally { btn.disabled = false; }
});
