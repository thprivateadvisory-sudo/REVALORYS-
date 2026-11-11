# REVALORYS — Site vitrine

Site statique (HTML / CSS / JS, sans dépendance ni build) de REVALORYS — ressourcerie, valorisation, réemploi.

## Structure
- `index.html` — page unique : accueil, dons, rachat de lots, professionnels, boutique, engagement, FAQ, contact
- `artisans.html` — Les Mains REVALORYS : devenir artisan partenaire (formules, partage 50/50, candidature)
- `piece-exemple.html` — modèle de fiche pièce restaurée (vidéo, artisan, QR code) — exemple, non indexé
- `mentions-legales.html` — mentions légales et données personnelles (champs à compléter surlignés)
- `assets/css/style.css` — design system (couleurs du logo : marine `#0E2A47`, ocre `#C17C30`)
- `assets/js/main.js` — menu, animations, formulaire
- `assets/img/` — logo (versions couleur et blanche, fond transparent), photos

## À compléter avant la mise en ligne
1. `assets/js/main.js` → objet `CONFIG` : e-mail, téléphone, adresse ou zone d'intervention
2. `mentions-legales.html` → forme juridique, SIRET, siège, hébergeur
3. `assets/img/qr-piece-exemple.svg` → QR code de démonstration (pointe vers `/piece-exemple.html` sur revalorys.fr) : à régénérer pour chaque vraie pièce
4. `index.html` → URL canonique (`https://www.revalorys.fr/` par défaut)

Le formulaire ouvre la messagerie du visiteur avec la demande pré-remplie (aucun serveur requis).
Pour une réception directe, brancher un service de formulaire (Formspree, Netlify Forms…).

## Aperçu local
```
python3 -m http.server 8000
```
puis ouvrir http://localhost:8000
