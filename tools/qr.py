#!/usr/bin/env python3
"""Génère le QR code SVG de chaque objet du catalogue de la boutique.

Usage :  pip install qrcode
         python3 tools/qr.py [URL_DU_SITE]

Chaque QR pointe vers  <URL_DU_SITE>/produit.html?ref=<REF>  et est écrit dans
assets/img/qr/<REF>.svg. Relancer le script après chaque ajout au catalogue,
et avec la nouvelle adresse le jour où le site passe sur son nom de domaine.
"""
import re
import sys
from pathlib import Path

import qrcode

ROOT = Path(__file__).resolve().parent.parent
BASE = (sys.argv[1] if len(sys.argv) > 1 else "https://thprivateadvisory-sudo.github.io/REVALORYS-").rstrip("/")
refs = re.findall(r'ref:\s*"([^"]+)"', (ROOT / "assets/js/catalogue.js").read_text(encoding="utf-8"))
out = ROOT / "assets/img/qr"
out.mkdir(parents=True, exist_ok=True)

for ref in refs:
    qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_M, border=2)
    qr.add_data(f"{BASE}/produit.html?ref={ref}")
    qr.make(fit=True)
    m = qr.get_matrix()
    n = len(m)
    path = "".join(f"M{x},{y}h1v1h-1z" for y, row in enumerate(m) for x, on in enumerate(row) if on)
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {n} {n}" shape-rendering="crispEdges">'
           f'<rect width="{n}" height="{n}" fill="#fff"/><path fill="#0E2A47" d="{path}"/></svg>\n')
    (out / f"{ref}.svg").write_text(svg, encoding="utf-8")
    print(f"{ref} -> {BASE}/produit.html?ref={ref}")
