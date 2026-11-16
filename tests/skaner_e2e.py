"""Test przejścia skanera raportu z kasy (Playwright, Python) na atrapie Claude.
Uruchom: pip install playwright && playwright install chromium && python3 tests/skaner_e2e.py
"""
import pathlib, struct, tempfile, zlib
ROOT = pathlib.Path(__file__).resolve().parent.parent
PAGE = (ROOT / "skaner" / "index.html").as_uri()
def _png(w, h):
    raw = b"".join(b"\x00" + b"\xff\xff\xff" * w for _ in range(h))
    c = lambda t, d: struct.pack(">I", len(d)) + t + d + struct.pack(">I", zlib.crc32(t + d) & 0xffffffff)
    return b"\x89PNG\r\n\x1a\n" + c(b"IHDR", struct.pack(">IIBBBBB", w, h, 8, 2, 0, 0, 0)) + c(b"IDAT", zlib.compress(raw)) + c(b"IEND", b"")
IMG = pathlib.Path(tempfile.gettempdir()) / "raport-test.png"
IMG.write_bytes(_png(60, 160))
from playwright.sync_api import sync_playwright
MOCK = r"""
(()=>{
 const store = new Map(); const subs = [];
 function emit(){ for (const s of subs){ const docs=[...store.entries()].filter(([k])=>k.startsWith(s.path+'/')).map(([k,v])=>({id:k.split('/').pop(),exists:true,data:()=>v})); s.cb({docs,size:docs.length,empty:!docs.length,metadata:{fromCache:false,hasPendingWrites:false},docChanges:()=>[]}); } }
 const db = { collection(path){ return { path, doc(id){ id = id || ('d'+Math.random().toString(36).slice(2,8)); const full=path+'/'+id; return { id, path:full,
     async set(d){ store.set(full, JSON.parse(JSON.stringify(d))); setTimeout(emit,10); },
     async update(d){ store.set(full, Object.assign({}, store.get(full), d)); setTimeout(emit,10); },
     async delete(){ store.delete(full); setTimeout(emit,10); } }; },
   onSnapshot(cb, err){ subs.push({path, cb}); setTimeout(emit, 20); return ()=>{}; } }; } };
 const MODEL = {czy_raport_fiskalny:true, rodzaj:"dobowy", numer_raportu:"0325", data_od:"2026-11-21", data_do:"2026-11-21", nr_unikatowy_kasy:"BCA123",
   stawki:[{litera:"A",stawka_proc:23,zwolniona:false,kwota:1310.00,kwota_rodzaj:"brutto",ptu:244.96},{litera:"B",stawka_proc:8,zwolniona:false,kwota:600.00,kwota_rodzaj:"brutto",ptu:44.44},{litera:"C",stawka_proc:5,zwolniona:false,kwota:2100.00,kwota_rodzaj:"brutto",ptu:100.00}],
   laczna_naleznosc:4010.00, laczna_ptu:389.40, liczba_paragonow:null, liczba_anulowanych:1, wartosc_anulowanych:9.99, nieczytelne:["liczba_paragonow"], uwagi:""};
 const sample = async (input, opts)=>{ const t="## Co się zmieniło\nSprzedaż spadła o 1,0%.\n## Co to wyjaśnia\nMniej paragonów.\n## Co może za tym stać (do sprawdzenia)\n- Hipoteza A\n## Jedno pytanie na teraz\nCzy w sobotę było krócej otwarte?"; await new Promise(r=>setTimeout(r,50)); opts && opts.onText && opts.onText({text:t.slice(0,20),delta:t.slice(0,20)}); window.__lastPrompt = input; return {text:t, truncated:false}; };
 sample.json = async (input, opts)=>{ window.__imgs = opts.images.length; return MODEL; };
 sample.limits = async ()=>({maxPromptBytes:262144, images:{maxCount:3,maxInputBytes:2e7,mediaTypes:["image/jpeg","image/png","image/webp"]}});
 const user = { id: async()=>"u_test" };
 window.claude = { use: async (n)=> ({sample, db, user})[n] ?? null };
})();
"""
errs=[]
with sync_playwright() as p:
    b=p.chromium.launch()
    for w in (390, 1100):
        pg=b.new_page(viewport={"width":w,"height":900})
        pg.on("pageerror", lambda e: errs.append(str(e)))
        pg.add_init_script(MOCK)
        pg.goto(PAGE); pg.wait_for_timeout(400)
        assert pg.is_visible("#exFlag"), "example flag"
        assert "4090,20" in pg.inner_text("#tiles").replace(" "," "), pg.inner_text("#tiles")
        br = pg.inner_text("#bridge"); print("BRIDGE:", br.replace(" "," ")[:220])
        pg.set_input_files("#file", str(IMG))
        assert not pg.is_disabled("#read")
        pg.click("#read"); pg.wait_for_selector("#check:not([hidden])")
        checks = pg.inner_text("#checks"); print("CHECKS:", checks.replace(" "," "))
        assert pg.evaluate("document.getElementById('f-rcpt').classList.contains('flag')")
        assert pg.is_disabled("#save")==False
        pg.fill("#f-rcpt","168")
        pg.fill("#r2-vat","100,00")
        pg.click("#save"); pg.wait_for_timeout(200)
        assert pg.is_hidden("#exFlag"), "example gone"
        t = pg.inner_text("#tiles").replace(" "," "); print("TILES:", t.replace("\n"," | "))
        print("PERIOD:", pg.inner_text("#periodNote"))
        print("HIST rows:", pg.locator("#hist tbody tr").count())
        pg.click("#ask"); pg.wait_for_timeout(300)
        print("COMMENT:", pg.inner_text("#comment")[:120].replace("\n"," / "))
        # manual second report for comparison
        pg.click("#manual"); pg.fill("#f-from","2026-11-14"); pg.fill("#r0-amount","1198,20"); pg.fill("#r0-vat","224,05")
        pg.fill("#f-total","1198,20"); pg.fill("#f-vat","224,05"); pg.fill("#f-rcpt","100")
        print("MANUAL CHECKS:", pg.inner_text("#checks").replace("\n"," | ")[:300])
        pg.click("#save"); pg.wait_for_timeout(200)
        print("HIST rows after:", pg.locator("#hist tbody tr").count(), "| base:", pg.input_value("#selBase"), "| period:", pg.inner_text("#periodNote")[:120])
        sw = pg.evaluate("document.documentElement.scrollWidth"); print(w, "scrollWidth", sw)
        assert sw == w, "przewijanie w poziomie"
        pg.close()
    b.close()
print("ERRORS:", errs)
assert not errs, errs
print("OK")
