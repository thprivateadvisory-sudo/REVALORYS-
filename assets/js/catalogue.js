/* =========================================================
   REVALORYS — Catalogue de la boutique
   ---------------------------------------------------------
   Tant que « produits » est vide, la boutique s'affiche en
   mode « ouverture prochaine ».

   Pour ajouter un objet : voir le modèle complet dans
   assets/js/catalogue-exemple.js (objets et personnes),
   recopier un bloc ici, puis générer son QR code avec
   tools/qr.py (voir README).
   ========================================================= */
window.REVALORYS_CATALOGUE = {
  /* Les personnes qui remettent les objets en état (avec leur accord) */
  personnes: {},

  categories: {
    mobilier: "Mobilier",
    electromenager: "Électroménager",
    assises: "Assises",
    luminaires: "Luminaires & déco",
    outillage: "Outillage"
  },

  /* Les objets en vente */
  produits: []
};
