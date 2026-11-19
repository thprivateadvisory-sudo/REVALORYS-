"""Génère le flyer REVALORYS (PDF imprimeur + aperçus PNG).

Usage : python3 build.py
Modifier les coordonnées ci-dessous AVANT d'imprimer.
"""
import pathlib, re
import qrcode
from qrcode.image.svg import SvgPathImage

# ---------- À VÉRIFIER AVANT IMPRESSION ----------
EMAIL = "contact@revalorys.fr"
PHONE = ""            # ex. "06 12 34 56 78" — fortement conseillé
SITE = "revalorys.fr"
QR_URL = "https://www.revalorys.fr/?utm_source=flyer&utm_medium=print&utm_campaign=lancement"
PRINTER = ""          # ex. "Imprimé par Exaprint, 34000 Montpellier"
# --------------------------------------------------

HERE = pathlib.Path(__file__).parent

q = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_M, border=0)
q.add_data(QR_URL)
q.make(fit=True)
svg = q.make_image(image_factory=SvgPathImage).to_string().decode()
d = re.search(r'<path d="([^"]+)"', svg).group(1)
n = q.modules_count
qr_svg = f'<svg viewBox="0 0 {n} {n}" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges"><path d="{d}" fill="#0E2A47"/></svg>'

html = (HERE / "flyer-template.html").read_text()
html = (html.replace("{{EMAIL}}", EMAIL)
            .replace("{{SITE}}", SITE)
            .replace("{{QR}}", qr_svg)
            .replace("{{PHONE_LINE}}", f"<strong>{PHONE}</strong><br>" if PHONE else "")
            .replace("{{PHONE_INLINE}}", f" · {PHONE}" if PHONE else "")
            .replace("{{PRINTER}}", f" {PRINTER}" if PRINTER else ""))
out = HERE / "flyer.html"
out.write_text(html)

import subprocess
subprocess.run(["node", str(HERE / "render.js")], check=True)
