# REVALORYS — Site vitrine

Site statique (HTML / CSS / JS, sans dépendance ni build) de REVALORYS — ressourcerie, valorisation, réemploi.

## Structure
- `index.html` — page unique : accueil, dons, rachat de lots, professionnels, boutique, engagement, FAQ, contact
- `mentions-legales.html` — mentions légales et données personnelles (champs à compléter surlignés)
- `assets/css/style.css` — design system (couleurs du logo : marine `#0E2A47`, ocre `#C17C30`)
- `assets/js/main.js` — menu, animations, formulaire
- `assets/img/` — logo (versions couleur et blanche, fond transparent), photos

## À compléter avant la mise en ligne
1. `assets/js/main.js` → objet `CONFIG` : e-mail, téléphone, adresse de l'atelier-boutique
2. `mentions-legales.html` → forme juridique, SIRET, siège, hébergeur
3. `index.html` → URL canonique (`https://www.revalorys.fr/` par défaut)

Le formulaire ouvre la messagerie du visiteur avec la demande pré-remplie (aucun serveur requis).
Pour une réception directe, brancher un service de formulaire (Formspree, Netlify Forms…).

## Aperçu local
```
python3 -m http.server 8000
```
puis ouvrir http://localhost:8000
