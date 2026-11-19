# /// script
# dependencies = ["pillow"]
# ///
"""Convierte los grabados elegidos (datos-crudos/raw/NN.jpg) a WebP en gris y escribe src/datos/laminas.json."""
import json
from pathlib import Path
from PIL import Image, ImageOps

RAIZ = Path(__file__).resolve().parent.parent
ELEGIDAS = ["01", "02", "06", "09", "10", "12", "18", "22", "16", "29", "33", "34", "37-bw", "28", "40", "42", "45", "48", "52", "53", "54", "55", "58", "59"]
meta = {}
for t, w, h, lic, _ in json.loads((RAIZ / "datos-crudos/vuelta.json").read_text()):
    n = t.split("Benett ")[-1].rsplit(".", 1)[0].replace(" ", "-").replace("&", "")
    meta[n] = {"fichero": t[5:], "licencia": lic}
salida = {}
(RAIZ / "public/img").mkdir(parents=True, exist_ok=True)
for k in ELEGIDAS:
    im = Image.open(RAIZ / f"datos-crudos/raw/{k}.jpg").convert("L")
    im = ImageOps.autocontrast(im, cutoff=0.5)
    im.thumbnail((700, 1000), Image.LANCZOS)
    im.save(RAIZ / f"public/img/{k}.webp", "WEBP", quality=50, method=6)
    salida[k] = {"w": im.width, "h": im.height, **meta[k]}
(RAIZ / "src/datos/laminas.json").write_text(json.dumps(salida, ensure_ascii=False, indent=1))
print(len(salida), "láminas")
