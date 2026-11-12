# Référencement de revalorys.fr — guide d'action

Ce qui est **déjà fait dans le site** (technique) est en bas de page. Tout le reste se fait
en dehors du code : c'est ce qui fera la différence, surtout **Google Business Profile**.

---

## 1. Google Search Console (≈ 15 min)

1. https://search.google.com/search-console → **Ajouter une propriété** → type **Domaine** → `revalorys.fr`
   (vérification par un enregistrement TXT chez le registrar du nom de domaine).
2. Menu **Sitemaps** → saisir `sitemap.xml` → Envoyer.
3. **Inspection d'URL** → coller chaque URL ci-dessous → **Demander l'indexation** :
   - `https://revalorys.fr/`
   - `https://revalorys.fr/boutique.html`
   - `https://revalorys.fr/artisans.html`
   - `https://revalorys.fr/don-vehicule.html`
4. Vérifier après quelques jours : **Pages** (indexées), **Améliorations** (FAQ, fil d'Ariane, produits).

> Domaine principal = `https://revalorys.fr` (sans www). Dans GitHub → Settings → Pages, cocher
> **Enforce HTTPS**. Chez le registrar, faire pointer `www` (CNAME) vers
> `thprivateadvisory-sudo.github.io` : GitHub redirigera automatiquement `www` vers `revalorys.fr`.

## 2. Google Business Profile — **priorité n°1** (≈ 20 min)

C'est ce qui fait apparaître REVALORYS sur **Google Maps** et dans le bloc local
(« ressourcerie Nancy », « débarras gratuit près de moi », « don meubles 54 »).

1. https://business.google.com → **Ajouter votre entreprise** → nom : `REVALORYS`.
2. Catégorie principale : **Ressourcerie** (sinon « Centre de recyclage »).
   Catégories secondaires : *Magasin d'articles d'occasion*, *Service de débarras*, *Magasin de meubles d'occasion*.
3. **Pas de local ouvert au public** → choisir « Je livre/me déplace chez mes clients » et **masquer l'adresse**,
   puis zones desservies : Nancy, Lunéville, Toul, Pont-à-Mousson, Vandœuvre-lès-Nancy, Briey, Longwy, Meurthe-et-Moselle.
4. Site web : `https://revalorys.fr` · e-mail / téléphone · horaires (même « sur rendez-vous »).
5. Description (750 caractères max) — à coller :
   > REVALORYS est une ressourcerie solidaire en Meurthe-et-Moselle. Nous collectons gratuitement vos meubles,
   > électroménager, équipements et matériaux réemployables, nous les faisons remettre en état par des artisans
   > locaux et nous leur donnons une seconde vie. Débarras, rachat de lots, vidage de logements pour les bailleurs,
   > biens sinistrés pour les assurances, mobilier réformé des entreprises et collectivités. Chaque objet vendu
   > porte le nom de la personne qui l'a réparé. Là où le déchet devient ressource.
6. Ajouter **10 photos minimum** (logo, camion, collectes, avant/après, artisans avec leur accord) et
   **1 publication par semaine** (nouvel objet, collecte réalisée, appel au don de véhicule).
7. **Avis clients** : après chaque collecte ou vente, envoyer le lien « Demander des avis ». C'est le
   1er facteur de classement local. Répondre à chaque avis.

## 3. Bing, Yahoo, DuckDuckGo, Ecosia, Qwant, ChatGPT search (≈ 5 min)

Bing alimente Yahoo, DuckDuckGo, Ecosia, Qwant et la recherche de ChatGPT / Copilot.

1. https://www.bing.com/webmasters → **Importer depuis Google Search Console** (1 clic, une fois la GSC validée).
2. Envoyer `https://revalorys.fr/sitemap.xml`.
3. **IndexNow** (indexation quasi immédiate sur Bing, Yandex, Seznam, Naver) : le fichier clé est déjà en
   ligne (`/13c0d6782f820b8f5b54095b5ad97340.txt`). Après chaque mise à jour du site, lancer :
   ```
   curl "https://api.indexnow.org/indexnow?url=https://revalorys.fr/&key=13c0d6782f820b8f5b54095b5ad97340"
   ```
   (remplacer l'URL par la page modifiée, ex. `https://revalorys.fr/boutique.html`).
4. **Bing Places** (https://www.bingplaces.com) : importer la fiche Google Business Profile.
5. **Apple Business Connect** (https://businessconnect.apple.com) : fiche sur Plans / Siri / iPhone.

## 4. Annuaires et plateformes — « être partout »

Chaque fiche = un lien vers le site + une présence là où les gens cherchent. Utiliser **exactement** le même
nom, la même zone, le même e-mail/téléphone partout (cohérence = confiance pour Google).

| Priorité | Où | Pourquoi |
|---|---|---|
| ★★★ | **Que faire de mes objets / Longue vie aux objets** (ADEME) — https://longuevieauxobjets.gouv.fr | Carte officielle des acteurs du réemploi, très consultée |
| ★★★ | **Réseau des Ressourceries et Recycleries** — https://ressourceries.info | Annuaire national de référence |
| ★★★ | **Métropole du Grand Nancy / Conseil départemental 54 / mairies** | Demander l'ajout dans leurs pages « réemploi / encombrants / déchetteries » (lien très puissant) |
| ★★★ | **Leboncoin** (compte pro) | 1re plateforme de seconde main ; chaque annonce renvoie vers le site |
| ★★ | **PagesJaunes** (fiche gratuite) | Annuaire historique, bien référencé |
| ★★ | **CRESS Grand Est** / annuaire ESS — https://www.cress-grand-est.org | Économie sociale et solidaire |
| ★★ | **Facebook** (page + Marketplace) et **Instagram** | Avant/après, portraits d'artisans, collectes |
| ★★ | **Geev**, **Label Emmaüs**, **Selency** (pièces de caractère) | Visibilité seconde main |
| ★★ | **Societe.com / Pappers** | Automatique dès l'immatriculation (vérifier les infos) |
| ★ | **TikTok / YouTube Shorts** | Vidéos avant/après : très partagées, apparaissent dans Google |
| ★ | **LinkedIn** (page entreprise) | Bailleurs, assurances, collectivités, RSE |
| ★ | Presse locale : **L'Est Républicain**, France 3 Grand Est, radios locales | Un article = un lien fort + notoriété (l'appel au don de véhicule est un bon angle) |

Une fois les pages réseaux sociaux créées, envoyer les liens : ils seront ajoutés au site
(champ `sameAs` des données structurées) pour relier toutes les fiches entre elles.

## 5. À faire régulièrement

- **Chaque objet mis en boutique** : `python3 tools/qr.py` puis `python3 tools/sitemap.py`, publier, puis
  ping IndexNow (ci-dessus). Une photo réelle par objet (`photo:` dans le catalogue) aide Google Images.
- **Avis Google** : en demander après chaque intervention.
- **Mentions légales** : compléter SIRET, siège, hébergeur (`mentions-legales.html`), puis retirer la ligne
  `<meta name="robots" content="noindex">` de cette page.
- Suivre dans la Search Console les requêtes qui amènent du monde et créer du contenu dessus.

---

## Ce qui est déjà en place dans le site

- Titres et descriptions optimisés par page (ressourcerie, Meurthe-et-Moselle, collecte gratuite, débarras, seconde main…).
- URL canoniques sur `https://revalorys.fr` (au lieu de `www`, qui n'est pas le domaine actif).
- Balises Open Graph / Twitter complètes avec image absolue (aperçus propres sur Facebook, WhatsApp, LinkedIn, SMS).
- Données structurées schema.org : entreprise locale (RecyclingCenter), zones desservies, services, site web,
  FAQ (9 questions), fils d'Ariane, et fiches **Produit** dynamiques (prix, état « reconditionné », disponibilité).
- `robots.txt`, `sitemap.xml` (+ `tools/sitemap.py` pour le régénérer), `llms.txt` (assistants IA),
  `site.webmanifest`, page **404** personnalisée, clé **IndexNow**.
- Fiches produit inexistantes en `noindex` (évite les pages vides dans Google).
- QR codes : adresse par défaut passée sur `https://revalorys.fr`.
- Accueil : 2 nouvelles questions FAQ ciblant les recherches courantes et zone détaillée (Nancy, Lunéville, Toul…).
