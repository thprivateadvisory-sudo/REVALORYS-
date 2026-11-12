#!/usr/bin/env python3
"""Régénère sitemap.xml (pages du site + une fiche par objet du catalogue).

Usage :  python3 tools/sitemap.py
Relancer après chaque ajout ou retrait d'objet dans assets/js/catalogue.js,
puis prévenir les moteurs (voir REFERENCEMENT.md, « IndexNow »).
"""
import re
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BASE = "https://revalorys.fr"
PAGES = [("/", "weekly", "1.0"), ("/boutique.html", "daily", "0.9"),
         ("/artisans.html", "monthly", "0.8"), ("/don-vehicule.html", "monthly", "0.7")]

today = date.today().isoformat()
cat = (ROOT / "assets/js/catalogue.js").read_text(encoding="utf-8")
blocks = re.findall(r'ref:\s*"([^"]+)"(.*?)(?=ref:\s*"|\Z)', cat, re.S)
urls = [(BASE + p, f, pr) for p, f, pr in PAGES]
for ref, rest in blocks:
    if re.search(r'statut:\s*"vendu"', rest):
        continue  # les objets vendus restent consultables (QR code) mais ne sont plus poussés
    urls.append((f"{BASE}/produit.html?ref={ref}", "weekly", "0.6"))

lines = ['<?xml version="1.0" encoding="UTF-8"?>',
         '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
for loc, freq, prio in urls:
    lines += ["  <url>", f"    <loc>{loc.replace('&', '&amp;')}</loc>", f"    <lastmod>{today}</lastmod>",
              f"    <changefreq>{freq}</changefreq>", f"    <priority>{prio}</priority>", "  </url>"]
lines.append("</urlset>")
(ROOT / "sitemap.xml").write_text("\n".join(lines) + "\n", encoding="utf-8")
print(f"sitemap.xml : {len(urls)} URL")
