# REVALORYS — Site vitrine

Site statique (HTML / CSS / JS, sans dépendance ni build) de REVALORYS — ressourcerie, valorisation, réemploi.

## Structure
- `index.html` — page unique : accueil, dons, rachat de lots, professionnels, boutique, engagement, FAQ, contact
- `artisans.html` — Les Mains REVALORYS : devenir artisan partenaire (formules, partage 50/50, candidature)
- `boutique.html` — la boutique : catalogue filtrable, « Ceux qui réparent », panier et commande
- `produit.html?ref=RV-0001` — fiche d'un objet (personne qui l'a réparé, réparations, histoire, QR code)
- `assets/js/catalogue.js` — **le catalogue** : objets et personnes (vide = boutique en mode « ouverture prochaine »)
- `assets/js/catalogue-exemple.js` — modèle complet de catalogue à recopier (non utilisé par le site)
- `assets/js/boutique.js` — affichage du catalogue, des fiches et du panier
- `assets/img/qr/` — QR code de chaque objet (généré par `tools/qr.py`)
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

## Boutique
1. **Ajouter un objet** : copier un bloc de `assets/js/catalogue-exemple.js` dans `assets/js/catalogue.js`, lui donner une nouvelle `ref` (ex. `RV-0009`), et indiquer la personne qui l'a réparé (`personne`). Photo facultative : `photo: "assets/img/boutique/RV-0009.jpg"`.
2. **Vendu / réservé** : passer `statut` à `"vendu"` ou `"reserve"`.
3. **QR codes** : `pip install qrcode` puis `python3 tools/qr.py` (ou `python3 tools/qr.py https://www.revalorys.fr` une fois le nom de domaine actif). Imprimer `assets/img/qr/<REF>.svg` et le coller sur l'objet.
4. **Commande** : le panier envoie la commande par e-mail (pré-remplie) ; aucun paiement n'est encaissé sur le site. Pour un paiement en ligne, créer un lien de paiement (Stripe, SumUp…) et l'ajouter à l'objet : `paiement: "https://…"`.
5. Tant que le catalogue est vide, la page affiche « Ouverture très bientôt ». Ne publier que des personnes réelles, avec leur accord (nom, photo, vidéo).

## Aperçu local
```
python3 -m http.server 8000
```
puis ouvrir http://localhost:8000
