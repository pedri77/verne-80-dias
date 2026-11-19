"""Peticiones a la API de Commons con caché, reintentos y User-Agent genérico."""
from __future__ import annotations

import hashlib
import json
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path

UA = "verne-80-dias/1.0 (static portfolio site)"
RAIZ = Path(__file__).resolve().parent.parent
CACHE = RAIZ / "datos-crudos" / "cache"
COMMONS = "https://commons.wikimedia.org/w/api.php"
LIBRES = ("CC BY-SA 4.0", "CC BY-SA 3.0", "Public domain", "CC BY 4.0", "CC BY 3.0", "CC BY 2.0", "CC0")


def get_json(params: dict, pausa: float = 1.0, api: str = COMMONS) -> dict:
    url = f"{api}?{urllib.parse.urlencode(params)}"
    CACHE.mkdir(parents=True, exist_ok=True)
    fc = CACHE / (hashlib.sha1(url.encode()).hexdigest() + ".json")
    if fc.exists():
        return json.loads(fc.read_text())
    for intento in range(6):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=30) as r:
                d = json.load(r)
            fc.write_text(json.dumps(d))
            time.sleep(pausa)
            return d
        except Exception as e:  # noqa: BLE001
            ra = getattr(e, "headers", None) and e.headers.get("Retry-After")
            espera = int(ra) if ra and ra.isdigit() else 15 * (intento + 1)
            print(f"  aviso {e!r}, reintento en {espera}s", file=sys.stderr)
            time.sleep(espera)
    raise RuntimeError(url)


def info(ficheros: list[str], ancho: int = 500) -> dict[str, dict]:
    """Licencia, autor/atribución, tamaño y URL de cada fichero (sin el prefijo File:)."""
    salida = {}
    for i in range(0, len(ficheros), 40):
        d = get_json({"action": "query", "format": "json", "titles": "|".join("File:" + f for f in ficheros[i:i + 40]), "prop": "imageinfo",
                      "iiprop": "size|url|extmetadata", "iiurlwidth": ancho, "iiextmetadatafilter": "LicenseShortName|Artist|Credit|Attribution|AttributionRequired|DateTimeOriginal"})
        norm = {n["to"]: n["from"] for n in d["query"].get("normalized", [])}
        for p in d["query"]["pages"].values():
            nombre = norm.get(p["title"], p["title"])[5:]
            ii = (p.get("imageinfo") or [None])[0]
            if not ii:
                salida[nombre] = {"falta": True}
                continue
            em = ii.get("extmetadata", {})
            salida[nombre] = {"w": ii["width"], "h": ii["height"], "url": ii["url"], "thumb": ii.get("thumburl", ii["url"]), "pagina": ii["descriptionurl"],
                              **{k: em.get(k, {}).get("value", "") for k in ("LicenseShortName", "Artist", "Credit", "Attribution", "AttributionRequired")}}
    return salida


def buscar(q: str, n: int = 8) -> list[str]:
    d = get_json({"action": "query", "format": "json", "list": "search", "srsearch": q, "srnamespace": 6, "srlimit": n})
    return [r["title"][5:] for r in d["query"]["search"]]
