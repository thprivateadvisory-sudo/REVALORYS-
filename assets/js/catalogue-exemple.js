/* =========================================================
   REVALORYS — EXEMPLE de catalogue (non utilisé par le site)
   Modèle à recopier dans catalogue.js pour remplir la boutique.
   ---------------------------------------------------------
   Une entrée = un objet unique. Pour ajouter un objet :
   copier un bloc, changer la « ref » (unique), les textes,
   le prix, et la personne qui l'a remis en état.
   Le QR code de l'objet pointe vers : produit.html?ref=REF
   (à générer avec tools/qr.py, voir README).

   photo   : chemin d'une photo (facultatif, ex. "assets/img/boutique/rv-0001.jpg")
   statut  : "disponible" | "reserve" | "vendu"
   paiement: lien de paiement en ligne (Stripe, SumUp…) — facultatif
   ========================================================= */
window.REVALORYS_CATALOGUE = {
  /* Les personnes qui remettent les objets en état */
  personnes: {
    "michel-d": {
      nom: "Michel D.", initiales: "MD", profil: "Artisan retraité",
      metier: "Ébéniste", ville: "Lunéville",
      bio: "40 ans de métier, un atelier au fond du jardin et l'envie de transmettre. Michel restaure le mobilier en bois massif confié à REVALORYS."
    },
    "karim-b": {
      nom: "Karim B.", initiales: "KB", profil: "Parcours de réinsertion",
      metier: "Électroménager", ville: "Nancy",
      bio: "Après deux ans sans emploi, Karim s'est formé à la réparation d'électroménager dans l'atelier REVALORYS. Chaque appareil qu'il remet en état est testé avant la vente."
    },
    "sylvie-r": {
      nom: "Sylvie R.", initiales: "SR", profil: "Bénévole",
      metier: "Tapissière", ville: "Toul",
      bio: "Ancienne tapissière d'ameublement, Sylvie donne de son temps chaque semaine pour refaire assises, garnitures et tissus."
    },
    "jean-paul-m": {
      nom: "Jean-Paul M.", initiales: "JM", profil: "Artisan retraité",
      metier: "Électricien", ville: "Pont-à-Mousson",
      bio: "Électricien pendant 35 ans, Jean-Paul contrôle et remet aux normes les luminaires et petits appareils avant leur remise en vente."
    },
    "atelier": {
      nom: "L'atelier REVALORYS", initiales: "R", profil: "Équipe en insertion",
      metier: "Remise en état", ville: "Meurthe-et-Moselle",
      bio: "Notre équipe d'atelier, accompagnée par des encadrants techniques, nettoie, répare et contrôle chaque objet avant sa seconde vie."
    }
  },

  categories: {
    mobilier: "Mobilier",
    electromenager: "Électroménager",
    assises: "Assises",
    luminaires: "Luminaires & déco",
    outillage: "Outillage"
  },

  produits: [
    {
      ref: "RV-0001", categorie: "mobilier", statut: "disponible",
      titre: "Buffet en chêne massif, années 1950",
      resume: "Décapé, réparé, ciré à l'ancienne. Poignées en laiton d'origine conservées.",
      prix: 350, personne: "michel-d", heures: 18,
      etat: "Restauré",
      reparations: [
        "Décapage complet de l'ancien vernis",
        "Recollage des assemblages et du piètement",
        "Ajustage des tiroirs et des portes",
        "Ponçage, teinte et finition à la cire d'abeille",
        "Nettoyage et conservation des poignées en laiton"
      ],
      specs: { "Dimensions": "L 160 × P 48 × H 92 cm", "Matériau": "Chêne massif", "Finition": "Cire d'abeille", "Retrait": "Sur rendez-vous ou livraison" },
      histoire: "Donné lors du vidage d'une maison familiale à Lunéville. Plutôt que la déchèterie, il a été confié à Michel, qui lui a redonné son éclat d'origine."
    },
    {
      ref: "RV-0002", categorie: "electromenager", statut: "disponible",
      titre: "Lave-linge 8 kg, classe A",
      resume: "Révisé, testé sur plusieurs cycles complets, nettoyé en profondeur.",
      prix: 190, personne: "karim-b", heures: 6,
      etat: "Reconditionné",
      reparations: [
        "Remplacement du joint de hublot",
        "Remplacement de la pompe de vidange",
        "Détartrage et désinfection du tambour et de la cuve",
        "Contrôle électrique et test sur 3 cycles complets"
      ],
      specs: { "Capacité": "8 kg", "Essorage": "1 400 tr/min", "Contrôle": "Testé en atelier", "Garantie": "Garantie légale de conformité" },
      histoire: "Collecté lors du vidage d'un appartement pour un bailleur social. Il ne fonctionnait plus : Karim a trouvé la panne et l'a remis en service."
    },
    {
      ref: "RV-0003", categorie: "assises", statut: "disponible",
      titre: "Paire de fauteuils bridge",
      resume: "Garnitures refaites à l'ancienne, tissu velours neuf.",
      prix: 280, personne: "sylvie-r", heures: 14,
      etat: "Restauré",
      reparations: [
        "Dégarnissage complet des deux assises",
        "Sanglage et ressorts remis en place",
        "Nouvelle garniture crin et ouate",
        "Pose d'un velours neuf et du galon",
        "Ravivage du bois des pieds"
      ],
      specs: { "Lot": "2 fauteuils", "Tissu": "Velours côtelé", "Structure": "Hêtre", "Retrait": "Sur rendez-vous ou livraison" },
      histoire: "Récupérés dans un EHPAD qui renouvelait son mobilier. Sylvie les a entièrement regarnis."
    },
    {
      ref: "RV-0004", categorie: "electromenager", statut: "reserve",
      titre: "Réfrigérateur combiné 300 L",
      resume: "Nettoyé, contrôlé, joints remplacés. Froid vérifié sur 48 h.",
      prix: 220, personne: "atelier", heures: 4,
      etat: "Reconditionné",
      reparations: [
        "Remplacement des joints de porte",
        "Nettoyage et désinfection complets",
        "Contrôle de la température sur 48 heures",
        "Contrôle électrique"
      ],
      specs: { "Volume": "300 L", "Type": "Combiné congélateur bas", "Contrôle": "Testé en atelier", "Garantie": "Garantie légale de conformité" },
      histoire: "Remplacé lors d'une rénovation de cuisine en parfait état de marche. Notre atelier l'a remis à neuf."
    },
    {
      ref: "RV-0005", categorie: "luminaires", statut: "disponible",
      titre: "Lampe d'atelier articulée, années 1960",
      resume: "Recâblée et remise aux normes, métal décapé et verni.",
      prix: 95, personne: "jean-paul-m", heures: 3,
      etat: "Restauré",
      reparations: [
        "Recâblage complet avec câble textile",
        "Remplacement de la douille et de l'interrupteur",
        "Décapage et vernis du métal",
        "Contrôle électrique"
      ],
      specs: { "Hauteur": "Jusqu'à 75 cm", "Matériau": "Acier", "Ampoule": "E27 (non fournie)", "Contrôle": "Testée en atelier" },
      histoire: "Trouvée dans un garage lors d'un débarras. Jean-Paul l'a entièrement remise en état."
    },
    {
      ref: "RV-0006", categorie: "mobilier", statut: "disponible",
      titre: "Table de ferme en chêne et 4 chaises",
      resume: "Plateau poncé et huilé, chaises recollées.",
      prix: 420, personne: "michel-d", heures: 22,
      etat: "Restauré",
      reparations: [
        "Ponçage et huilage du plateau",
        "Recollage et renfort des 4 chaises",
        "Remplacement de deux traverses",
        "Traitement du bois"
      ],
      specs: { "Dimensions": "L 200 × l 90 × H 76 cm", "Matériau": "Chêne", "Lot": "Table + 4 chaises", "Retrait": "Sur rendez-vous ou livraison" },
      histoire: "Donnée par une famille qui déménageait. Michel lui a rendu son plateau d'origine."
    },
    {
      ref: "RV-0007", categorie: "outillage", statut: "disponible",
      titre: "Établi d'atelier en bois massif",
      resume: "Plateau dressé, presse remise en état.",
      prix: 160, personne: "atelier", heures: 5,
      etat: "Remis en état",
      reparations: [
        "Dressage du plateau",
        "Démontage, nettoyage et graissage de la presse",
        "Resserrage de la structure"
      ],
      specs: { "Dimensions": "L 150 × P 60 × H 88 cm", "Matériau": "Hêtre", "Équipement": "Presse avant", "Retrait": "Sur rendez-vous" },
      histoire: "Issu d'une fin de bail d'un artisan. L'atelier REVALORYS l'a remis en service."
    },
    {
      ref: "RV-0008", categorie: "electromenager", statut: "vendu",
      titre: "Lave-vaisselle 12 couverts",
      resume: "Révisé et testé.",
      prix: 170, personne: "karim-b", heures: 5,
      etat: "Reconditionné",
      reparations: [
        "Remplacement de la résistance",
        "Nettoyage des bras de lavage et du filtre",
        "Test sur 3 cycles complets"
      ],
      specs: { "Capacité": "12 couverts", "Contrôle": "Testé en atelier", "Garantie": "Garantie légale de conformité" },
      histoire: "Collecté chez un particulier. Karim a remplacé la pièce défectueuse."
    }
  ]
};
