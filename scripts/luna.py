# /// script
# dependencies = ["pillow"]
# ///
"""Recorta el grabado «Feu !» de la página escaneada de De la Terre à la Lune (1866) y prepara la foto del Apolo 8."""
import json
from pathlib import Path
from PIL import Image, ImageOps

RAIZ = Path(__file__).resolve().parent.parent
D = RAIZ / "datos-crudos/luna"
meta = json.loads((D / "meta.json").read_text())
salida = {}
im = Image.open(D / "140548336.jpg")
ox, oy = im.width / 1290 * 1.0, im.height / 2000 * 1.0
im = im.crop((int(270 * ox), int(330 * oy), int(842 * ox), int(1170 * oy))).convert("L")
im = ImageOps.autocontrast(im, cutoff=0.5)
im.thumbnail((700, 1000), Image.LANCZOS)
im.save(RAIZ / "public/img/luna-fuego.webp", "WEBP", quality=55, method=6)
salida["luna-fuego"] = {"w": im.width, "h": im.height, "fichero": meta["140548336"]["fichero"], "licencia": meta["140548336"]["licencia"]}
im = Image.open(D / "earthrise.jpg").convert("RGB")
im.thumbnail((1000, 1000), Image.LANCZOS)
im.save(RAIZ / "public/img/luna-apolo8.webp", "WEBP", quality=70, method=6)
salida["luna-apolo8"] = {"w": im.width, "h": im.height, "fichero": meta["earthrise"]["fichero"], "licencia": meta["earthrise"]["licencia"]}
f = RAIZ / "src/datos/laminas.json"
d = json.loads(f.read_text()); d.update(salida); f.write_text(json.dumps(d, ensure_ascii=False, indent=1))
print(salida)
