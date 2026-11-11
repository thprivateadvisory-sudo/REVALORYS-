/* =========================================================
   REVALORYS — interactions
   ---------------------------------------------------------
   CONFIG : coordonnées affichées sur le site et destinataire
   du formulaire. À compléter avant la mise en ligne.
   ========================================================= */
const CONFIG = {
  email: "contact@revalorys.fr",        // TODO : adresse e-mail définitive
  phone: "",                            // TODO : ex. "03 83 00 00 00"
  address: "Meurthe-et-Moselle · Grand Est" // TODO : adresse (si local) ou zone d'intervention
};

(() => {
  const doc = document.documentElement;
  doc.classList.remove("no-js");

  /* ---------- Coordonnées ---------- */
  document.querySelectorAll('[data-config="email"]').forEach((el) => {
    el.textContent = CONFIG.email;
    el.href = `mailto:${CONFIG.email}`;
  });
  document.querySelectorAll('[data-config="phone"]').forEach((el) => {
    if (CONFIG.phone) {
      el.textContent = CONFIG.phone;
      el.href = `tel:${CONFIG.phone.replace(/[^\d+]/g, "")}`;
    } else {
      el.closest("li")?.remove();
    }
  });
  document.querySelectorAll('[data-config="address"]').forEach((el) => { el.textContent = CONFIG.address; });
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Header au scroll ---------- */
  const header = document.querySelector(".header");
  const fab = document.querySelector(".fab");
  const contact = document.getElementById("contact");
  let contactVisible = false;
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 40);
    if (fab) fab.classList.toggle("is-visible", y > window.innerHeight * 0.8 && !contactVisible);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Menu mobile ---------- */
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");
  const setMenu = (open) => {
    document.body.classList.toggle("nav-open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
  };
  burger.addEventListener("click", () => setMenu(burger.getAttribute("aria-expanded") !== "true"));
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  /* ---------- Apparition au scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal, .cycle__track");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach((el) => io.observe(el));

    /* Lien actif dans la navigation */
    const links = [...nav.querySelectorAll('a[href^="#"]:not(.btn)')];
    const sections = links.map((l) => document.querySelector(l.getAttribute("href"))).filter(Boolean);
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === `#${entry.target.id}`));
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((s) => spy.observe(s));

    /* Masquer le bouton flottant quand le formulaire est visible */
    if (contact) {
      new IntersectionObserver(([e]) => { contactVisible = e.isIntersecting; onScroll(); }, { threshold: 0.05 }).observe(contact);
    }
  } else {
    revealEls.forEach((el) => el.classList.add("is-in"));
  }

  /* ---------- Partage ---------- */
  document.querySelectorAll("[data-share]").forEach((btn) => btn.addEventListener("click", async () => {
    const data = { title: document.title, text: "REVALORYS recherche un utilitaire en don pour sauver des meubles de la déchèterie.", url: location.href };
    try {
      if (navigator.share) { await navigator.share(data); return; }
      await navigator.clipboard.writeText(location.href);
      btn.textContent = "Lien copié !";
    } catch (e) { /* partage annulé */ }
  }));

  /* ---------- Formulaire ---------- */
  const form = document.getElementById("contactForm");
  if (!form) return;
  const status = document.getElementById("formStatus");
  const orgField = document.getElementById("orgField");
  const labels = {
    don: "Don / demande de collecte", rachat: "Proposition de rachat", pro: "Demande professionnelle", boutique: "Achat d'une pièce", autre: "Autre demande",
    restaurateur: "Candidature artisan restaurateur", visibilite: "Abonnement artisan visibilité", lesdeux: "Candidature restaurateur + visibilité",
    "vehicule-particulier": "Don de véhicule (particulier)", "vehicule-entreprise": "Don de véhicule (entreprise)", "vehicule-contact": "Mise en relation pour un don de véhicule"
  };
  const fieldLabels = { metier: "Métier / savoir-faire", statut: "Statut", experience: "Expérience", web: "Site / réseaux", vehicule: "Véhicule", annee: "Année", km: "Kilométrage" };

  const selectType = (type) => {
    const input = form.querySelector(`input[name="type"][value="${type}"]`);
    if (input) { input.checked = true; input.dispatchEvent(new Event("change", { bubbles: true })); }
  };
  document.querySelectorAll("[data-subject]").forEach((el) => el.addEventListener("click", () => selectType(el.dataset.subject)));

  form.addEventListener("change", (e) => {
    if (e.target.name === "type" && orgField) {
      orgField.querySelector("label").textContent = e.target.value === "pro" ? "Organisation *" : "Organisation";
      orgField.querySelector("input").required = e.target.value === "pro";
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    status.className = "form__status";
    let valid = true;
    form.querySelectorAll("[required]").forEach((input) => {
      const ok = input.type === "checkbox" ? input.checked : input.value.trim() !== "" && input.checkValidity();
      (input.closest(".field") || input.closest(".consent")).classList.toggle("has-error", !ok);
      if (!ok) valid = false;
    });
    if (!valid) {
      status.textContent = "Merci de compléter les champs obligatoires.";
      status.classList.add("is-error");
      form.querySelector(".has-error input, .has-error textarea")?.focus();
      return;
    }

    const d = Object.fromEntries(new FormData(form));
    const subject = `[REVALORYS] ${labels[d.type] || "Demande"} — ${d.name}${d.org ? " (" + d.org + ")" : ""}`;
    const body = [
      `Type de demande : ${labels[d.type]}`,
      `Nom : ${d.name}`,
      d.org ? `Organisation : ${d.org}` : null,
      `E-mail : ${d.email}`,
      d.phone ? `Téléphone : ${d.phone}` : null,
      d.city ? `Commune : ${d.city}` : null,
      ...Object.keys(fieldLabels).filter((k) => d[k]).map((k) => `${fieldLabels[k]} : ${d[k]}`),
      "",
      d.message,
      "",
      "(Pensez à joindre vos photos à ce message.)"
    ].filter((l) => l !== null).join("\n");

    window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    status.textContent = "Votre messagerie s'ouvre avec votre demande pré-remplie. Il ne reste plus qu'à l'envoyer !";
    status.classList.add("is-ok");
  });

  form.addEventListener("input", (e) => {
    const wrap = e.target.closest(".field, .consent");
    if (wrap) wrap.classList.remove("has-error");
  });
})();
