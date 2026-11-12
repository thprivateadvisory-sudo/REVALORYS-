/* =========================================================
   REVALORYS — Boutique : catalogue, fiche produit, panier
   Site statique : la commande est envoyée par e-mail
   (pré-remplie). Paiement en ligne possible par objet via
   le champ « paiement » du catalogue (lien Stripe, SumUp…).
   ========================================================= */
(() => {
  const DATA = window.REVALORYS_CATALOGUE;
  if (!DATA) return;
  const EMAIL = (typeof CONFIG !== "undefined" && CONFIG.email) || "contact@revalorys.fr";

  const ICONS = {
    mobilier: '<path d="M8 26v-6a4 4 0 0 1 4-4h24a4 4 0 0 1 4 4v6M6 26h36v8H6zM10 34v4M38 34v4M14 26v-4h20v4"/>',
    electromenager: '<rect x="11" y="5" width="26" height="38" rx="3"/><path d="M11 13h26"/><circle cx="24" cy="28" r="8"/><circle cx="24" cy="28" r="3.5"/><path d="M16 9h2M21 9h2"/>',
    assises: '<path d="M14 22V12a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v10M10 22h28v8H10zM12 30v10M36 30v10M10 22a3 3 0 0 1 0 6M38 22a3 3 0 0 0 0 6"/>',
    luminaires: '<path d="M24 6v6M16 12h16l4 14H12zM24 26v12M16 42h16"/>',
    outillage: '<path d="M6 18h36v6H6zM10 24v18M38 24v18M10 34h28M30 10h8v8"/>'
  };
  const STATUTS = { disponible: "Disponible", reserve: "Réservé", vendu: "Vendu" };
  const euros = (n) => n.toLocaleString("fr-FR") + " €";
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const byRef = (ref) => DATA.produits.find((p) => p.ref === ref);
  const person = (p) => DATA.personnes[p.personne] || DATA.personnes.atelier;

  const visual = (p, big) => p.photo
    ? `<img src="${esc(p.photo)}" alt="${esc(p.titre)}" loading="lazy">`
    : `<div class="pvis pvis--${p.categorie}${big ? " pvis--big" : ""}" aria-hidden="true"><svg viewBox="0 0 48 48">${ICONS[p.categorie] || ICONS.mobilier}</svg><span>${esc(DATA.categories[p.categorie] || "")}</span></div>`;

  /* ---------- Panier (stockage local, facultatif) ---------- */
  const KEY = "revalorys-panier";
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem(KEY) || "[]").filter((r) => byRef(r) && byRef(r).statut === "disponible"); } catch (e) { cart = []; }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) { /* stockage indisponible */ } };

  const drawer = document.getElementById("cart");
  const countEls = document.querySelectorAll("[data-cart-count]");

  const renderCart = () => {
    countEls.forEach((el) => { el.textContent = cart.length; el.hidden = cart.length === 0; });
    if (!drawer) return;
    const list = drawer.querySelector(".cart__items");
    const total = cart.reduce((s, r) => s + byRef(r).prix, 0);
    list.innerHTML = cart.length ? cart.map((r) => {
      const p = byRef(r);
      return `<li class="cart__item">
        <div class="cart__thumb">${visual(p)}</div>
        <div><strong>${esc(p.titre)}</strong><span>Réparé par ${esc(person(p).nom)} · ${esc(p.ref)}</span><b>${euros(p.prix)}</b></div>
        <button type="button" class="cart__remove" data-remove="${esc(r)}" aria-label="Retirer ${esc(p.titre)}">×</button>
      </li>`;
    }).join("") : `<li class="cart__empty">Votre panier est vide.<br><a href="boutique.html#catalogue">Découvrir les objets</a></li>`;
    drawer.querySelector("[data-cart-total]").textContent = euros(total);
    drawer.querySelector(".cart__checkout").hidden = cart.length === 0;
    document.querySelectorAll("[data-add]").forEach((b) => syncAddButton(b));
  };

  const syncAddButton = (btn) => {
    const inCart = cart.includes(btn.dataset.add);
    btn.classList.toggle("is-added", inCart);
    btn.querySelector("span").textContent = inCart ? "Dans le panier" : (btn.dataset.label || "Ajouter au panier");
  };

  const openCart = (open) => {
    if (!drawer) return;
    drawer.classList.toggle("is-open", open);
    drawer.setAttribute("aria-hidden", String(!open));
    document.body.classList.toggle("cart-open", open);
    if (open) drawer.querySelector(".cart__close").focus();
  };

  document.addEventListener("click", (e) => {
    const add = e.target.closest("[data-add]");
    if (add) {
      e.preventDefault();
      const ref = add.dataset.add;
      if (!cart.includes(ref)) { cart.push(ref); save(); }
      renderCart(); openCart(true); return;
    }
    const rm = e.target.closest("[data-remove]");
    if (rm) { cart = cart.filter((r) => r !== rm.dataset.remove); save(); renderCart(); return; }
    if (e.target.closest("[data-cart-open]")) { e.preventDefault(); openCart(true); return; }
    if (e.target.closest("[data-cart-close]")) { openCart(false); }
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") openCart(false); });

  /* ---------- Commande ---------- */
  const form = document.getElementById("orderForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const status = form.querySelector(".form__status");
      let ok = true;
      form.querySelectorAll("[required]").forEach((i) => {
        const good = i.type === "checkbox" ? i.checked : i.value.trim() !== "" && i.checkValidity();
        (i.closest(".field") || i.closest(".consent")).classList.toggle("has-error", !good);
        if (!good) ok = false;
      });
      if (!ok) { status.textContent = "Merci de compléter les champs obligatoires."; status.className = "form__status is-error"; return; }
      const d = Object.fromEntries(new FormData(form));
      const items = cart.map((r) => { const p = byRef(r); return `- ${p.ref} · ${p.titre} · ${euros(p.prix)} (réparé par ${person(p).nom})`; });
      const total = cart.reduce((s, r) => s + byRef(r).prix, 0);
      const body = [
        "Bonjour, je souhaite commander :", "", ...items, "", `Total : ${euros(total)}`, "",
        `Nom : ${d.name}`, `E-mail : ${d.email}`, d.phone ? `Téléphone : ${d.phone}` : null,
        `Réception : ${d.reception === "livraison" ? "Livraison (sur devis)" : "Retrait sur rendez-vous"}`,
        d.city ? `Commune : ${d.city}` : null, d.message ? `\n${d.message}` : null
      ].filter((l) => l !== null).join("\n");
      const subject = `[REVALORYS] Commande boutique — ${cart.join(", ")} — ${d.name}`;
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      status.textContent = "Votre messagerie s'ouvre avec la commande pré-remplie. Nous vous recontactons sous 48 h pour confirmer la disponibilité, le paiement et la remise.";
      status.className = "form__status is-ok";
    });
    form.addEventListener("input", (e) => e.target.closest(".field, .consent")?.classList.remove("has-error"));
  }

  /* ---------- Catalogue ---------- */
  const grid = document.getElementById("productGrid");
  if (grid && DATA.produits.length === 0) {
    /* Ouverture prochaine : aucun objet encore en ligne */
    document.getElementById("filters")?.remove();
    document.querySelector(".shop__notice")?.remove();
    document.querySelectorAll(".cart-btn").forEach((b) => b.remove());
    document.querySelector(".shop__head")?.classList.add("shop__head--center");
    const h = document.querySelector("#catalogue .h2");
    if (h) h.innerHTML = 'Ouverture <span class="accent">très bientôt.</span>';
    grid.outerHTML = `<div class="opening">
      <div class="opening__icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 8h16l-1 12H5L4 8zM8 8V6a4 4 0 0 1 8 0v2"/></svg></div>
      <h3>Les premiers objets arrivent.</h3>
      <p>Nos artisans et notre atelier remettent en état les premières pièces. Chacune sera présentée ici avec le nom de la personne qui l'a réparée, la liste des réparations et son QR code.</p>
      <div class="opening__ctas">
        <a href="index.html#contact" class="btn btn--accent">Être prévenu de l'ouverture</a>
        <a href="index.html#donner" class="btn btn--line">Donner un objet</a>
      </div>
    </div>`;
    const people = document.getElementById("peopleGrid");
    if (people && Object.keys(DATA.personnes).length === 0) {
      const profils = [
        ["AR", "Artisans retraités", "Ébénistes, tapissiers, électriciens : ils transmettent un savoir-faire de toute une vie."],
        ["RI", "Personnes en réinsertion", "L'atelier REVALORYS leur permet d'apprendre un métier et de retrouver un emploi."],
        ["BP", "Bénévoles passionnés", "Ils donnent un peu de leur temps pour redonner vie aux objets."],
        ["AL", "Artisans locaux", "Des professionnels du territoire, rémunérés à chaque vente."]
      ];
      people.innerHTML = profils.map(([i, t, d]) => `<article class="person">
        <span class="avatar avatar--lg">${i}</span>
        <h3>${t}</h3>
        <p class="person__bio">${d}</p>
      </article>`).join("");
    }
  } else if (grid) {
    const filters = document.getElementById("filters");
    const used = [...new Set(DATA.produits.map((p) => p.categorie))];
    filters.innerHTML = `<button type="button" class="chip is-active" data-cat="all">Tout <span>${DATA.produits.length}</span></button>` +
      used.map((c) => `<button type="button" class="chip" data-cat="${c}">${esc(DATA.categories[c])} <span>${DATA.produits.filter((p) => p.categorie === c).length}</span></button>`).join("");

    const order = { disponible: 0, reserve: 1, vendu: 2 };
    const card = (p) => {
      const who = person(p);
      const href = `produit.html?ref=${encodeURIComponent(p.ref)}`;
      return `<article class="pcard pcard--${p.statut}" data-cat="${p.categorie}">
        <a href="${href}" class="pcard__media">${visual(p)}
          <span class="pcard__status pcard__status--${p.statut}">${STATUTS[p.statut]}</span>
          <span class="pcard__qr" title="QR code de traçabilité"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h3v3h-3zM18 18h3v3h-3zM14 20h2M20 14v2"/></svg>QR</span>
        </a>
        <div class="pcard__body">
          <p class="pcard__cat">${esc(DATA.categories[p.categorie])} · ${esc(p.etat)}</p>
          <h3><a href="${href}">${esc(p.titre)}</a></h3>
          <div class="pcard__who"><span class="avatar">${esc(who.initiales)}</span><div><small>Réparé par</small><strong>${esc(who.nom)}</strong><em>${esc(who.profil)}</em></div></div>
          <div class="pcard__foot">
            <b>${euros(p.prix)}</b>
            ${p.statut === "disponible"
              ? `<button type="button" class="btn btn--primary btn--sm" data-add="${esc(p.ref)}" data-label="Ajouter"><span>Ajouter</span></button>`
              : `<a href="${href}" class="btn btn--line btn--sm">Voir la fiche</a>`}
          </div>
        </div>
      </article>`;
    };
    grid.innerHTML = [...DATA.produits].sort((a, b) => order[a.statut] - order[b.statut]).map(card).join("");

    filters.addEventListener("click", (e) => {
      const chip = e.target.closest(".chip");
      if (!chip) return;
      filters.querySelectorAll(".chip").forEach((c) => c.classList.toggle("is-active", c === chip));
      grid.querySelectorAll(".pcard").forEach((c) => { c.hidden = chip.dataset.cat !== "all" && c.dataset.cat !== chip.dataset.cat; });
    });

    const people = document.getElementById("peopleGrid");
    if (people) {
      people.innerHTML = Object.entries(DATA.personnes).map(([id, w]) => {
        const n = DATA.produits.filter((p) => p.personne === id).length;
        return `<article class="person">
          <span class="avatar avatar--lg">${esc(w.initiales)}</span>
          <p class="person__profil">${esc(w.profil)}</p>
          <h3>${esc(w.nom)}</h3>
          <p class="person__metier">${esc(w.metier)} · ${esc(w.ville)}</p>
          <p class="person__bio">${esc(w.bio)}</p>
          <p class="person__count">${n} objet${n > 1 ? "s" : ""} remis en état</p>
        </article>`;
      }).join("");
    }
  }

  /* ---------- Référencement de la fiche (balises dynamiques) ---------- */
  const SITE = "https://revalorys.fr";
  const setMeta = (attr, key, value) => {
    let m = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!m) { m = document.createElement("meta"); m.setAttribute(attr, key); document.head.appendChild(m); }
    m.setAttribute("content", value);
  };
  const setCanonical = (href) => {
    let l = document.head.querySelector('link[rel="canonical"]');
    if (!l) { l = document.createElement("link"); l.rel = "canonical"; document.head.appendChild(l); }
    l.href = href;
  };
  const seoProduct = (p, who) => {
    const url = `${SITE}/produit.html?ref=${encodeURIComponent(p.ref)}`;
    const img = p.photo ? `${SITE}/${p.photo.replace(/^\//, "")}` : `${SITE}/assets/img/og-revalorys.jpg`;
    const desc = `${p.titre} — ${p.etat || "remis en état"}, réparé à la main par ${who.nom.replace(/\.$/, "")}. ${p.resume || ""}`.trim().slice(0, 158);
    setCanonical(url);
    setMeta("name", "description", desc);
    setMeta("property", "og:type", "product");
    setMeta("property", "og:url", url);
    setMeta("property", "og:title", `${p.titre} — Boutique REVALORYS`);
    setMeta("property", "og:description", desc);
    setMeta("property", "og:image", img);
    setMeta("name", "twitter:title", `${p.titre} — Boutique REVALORYS`);
    setMeta("name", "twitter:description", desc);
    setMeta("name", "twitter:image", img);
    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Product", name: p.titre, sku: p.ref, url, image: [img],
          description: [p.resume, p.histoire].filter(Boolean).join(" "),
          category: DATA.categories[p.categorie] || undefined,
          brand: { "@type": "Brand", name: "REVALORYS" },
          itemCondition: "https://schema.org/RefurbishedCondition",
          offers: {
            "@type": "Offer", url, priceCurrency: "EUR", price: Number(p.prix) || undefined,
            itemCondition: "https://schema.org/RefurbishedCondition",
            availability: p.statut === "disponible" ? "https://schema.org/InStock"
              : p.statut === "reserve" ? "https://schema.org/LimitedAvailability" : "https://schema.org/SoldOut",
            seller: { "@type": "Organization", name: "REVALORYS", url: SITE + "/" }
          }
        },
        {
          "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: SITE + "/" },
            { "@type": "ListItem", position: 2, name: "Boutique", item: SITE + "/boutique.html" },
            { "@type": "ListItem", position: 3, name: p.titre, item: url }
          ]
        }
      ]
    });
    document.head.appendChild(ld);
  };

  /* ---------- Fiche produit ---------- */
  const sheet = document.getElementById("productSheet");
  if (sheet) {
    const ref = new URLSearchParams(location.search).get("ref");
    const p = byRef(ref);
    if (!p) {
      setMeta("name", "robots", "noindex, follow");
      sheet.innerHTML = `<div class="notfound"><h1>Objet introuvable</h1><p>Cette référence n'existe pas ou a été retirée de la boutique.</p><a href="boutique.html" class="btn btn--primary">Retour à la boutique</a></div>`;
    } else {
      const who = person(p);
      document.title = `${p.titre} — Boutique REVALORYS`;
      seoProduct(p, who);
      const qr = `assets/img/qr/${p.ref}.svg`;
      const cta = p.statut === "disponible"
        ? `<button type="button" class="btn btn--accent btn--lg btn--block" data-add="${esc(p.ref)}"><span>Ajouter au panier</span></button>
           ${p.paiement ? `<a href="${esc(p.paiement)}" class="btn btn--primary btn--lg btn--block" rel="noopener">Payer en ligne</a>` : ""}`
        : `<p class="sold-note">${p.statut === "vendu" ? "Cet objet a trouvé preneur. Découvrez les autres pièces de la boutique." : "Cet objet est réservé. Il peut redevenir disponible : contactez-nous."}</p>
           <a href="boutique.html#catalogue" class="btn btn--primary btn--lg btn--block">Voir les objets disponibles</a>`;
      sheet.innerHTML = `
        <p class="crumbs"><a href="index.html">Accueil</a> / <a href="boutique.html">Boutique</a> / ${esc(DATA.categories[p.categorie])} / ${esc(p.ref)}</p>
        <div class="piece__grid">
          <div class="pgallery">
            <div class="pgallery__main">${visual(p, true)}<span class="pcard__status pcard__status--${p.statut}">${STATUTS[p.statut]}</span></div>
            <div class="pgallery__video"><span class="play"><svg viewBox="0 0 24 24"><path d="M6 4l14 8-14 8z"/></svg></span><div><b>La vidéo de remise en état</b>L'avant / après raconté par ${esc(who.nom)}</div></div>
          </div>
          <div class="piece__info">
            <p class="eyebrow">${esc(p.etat)} · ${esc(DATA.categories[p.categorie])}</p>
            <h1>${esc(p.titre)}</h1>
            <p class="piece__sub">${esc(p.resume)}</p>
            <div class="piece__price"><b>${euros(p.prix)}</b><span>Pièce unique · Réf. ${esc(p.ref)}</span></div>
            <div class="artisan-card">
              <div class="artisan-card__avatar">${esc(who.initiales)}</div>
              <div>
                <small>Remis en état par</small>
                <strong>${esc(who.nom)} — ${esc(who.metier)}</strong>
                <p><span class="tagpill">${esc(who.profil)}</span> ${esc(who.bio)}</p>
                ${p.heures ? `<p class="artisan-card__hours">${p.heures} heures de travail sur cet objet</p>` : ""}
              </div>
            </div>
            ${cta}
            <ul class="reassure">
              <li>Contrôlé avant la vente</li>
              <li>Retrait sur rendez-vous ou livraison</li>
              <li>Chaque achat rémunère la personne qui l'a réparé</li>
            </ul>
          </div>
        </div>
        <div class="psections">
          <section class="repairs">
            <p class="eyebrow">Ce qui a été fait</p>
            <h2 class="h3">Réparations effectuées</h2>
            <ol>${p.reparations.map((r) => `<li>${esc(r)}</li>`).join("")}</ol>
          </section>
          <section>
            <p class="eyebrow">Caractéristiques</p>
            <h2 class="h3">L'objet en détail</h2>
            <dl class="specs">${Object.entries(p.specs).map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
          </section>
        </div>
        <div class="story">
          <div class="story__text">
            <p class="eyebrow">L'histoire de l'objet</p>
            <h2 class="h2">Du débarras à chez vous.</h2>
            <p>${esc(p.histoire)}</p>
            <ol class="story__steps">
              <li><b>01</b><span>Don ou collecte par REVALORYS</span></li>
              <li><b>02</b><span>Confié à ${esc(who.nom)}</span></li>
              <li><b>03</b><span>Remise en état${p.heures ? ` : ${p.heures} heures de travail` : ""}</span></li>
              <li><b>04</b><span>Contrôle, photos, QR code et mise en vente</span></li>
            </ol>
          </div>
          <aside class="qr-panel">
            <img src="${qr}" alt="QR code de l'objet ${esc(p.ref)}" width="180" height="180">
            <h3>Le QR code livré avec l'objet</h3>
            <p>Il est apposé sur l'objet. En le scannant, vous retrouvez cette page : la personne qui l'a remis en état, les réparations et la vidéo.</p>
          </aside>
        </div>`;
    }
  }

  renderCart();
})();
