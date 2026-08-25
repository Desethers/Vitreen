import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/components.css";
import "./styles/sections.css";
import { BadgeCheck, BadgeEuro, createIcons, Database, Files, Monitor, Plug, Search } from "lucide";

/* The two locales share one build, so every string the page renders at runtime
 * has to exist in both. Pages declare their language on <html lang>. */
const LANG = document.documentElement.lang === "fr" ? "fr" : "en";

/* Prices read "€120" in English and "120 €" in French. */
const price = (amount) => (LANG === "fr" ? `${amount}\u00a0€` : `€${amount}`);

const TASK_COPY = {
  en: {
    "publish-exhibition": {
      label: "Website",
      title: "Publish an exhibition",
      description: "Text, images and dates turned into a published exhibition page.",
    },
    "opening-website": {
      label: "Website",
      title: "Prepare for an opening",
      description: "Homepage, exhibition and artist pages refreshed and ready before opening.",
    },
    "artist-page": {
      label: "Website",
      title: "Add an artist page",
      description: "Biography, works, images and basic metadata added to the gallery website.",
    },
    "update-artworks": {
      label: "Website",
      title: "Update 10 artworks",
      description: "Update images, captions, availability or other artwork information.",
    },
    "fix-website-issue": {
      label: "Website",
      title: "Fix a website issue",
      description:
        "Something looks wrong or stopped working? We investigate and fix one defined issue.",
    },
    "organise-database": {
      label: "Database",
      title: "Organise your database",
      description: "Clean categories, fields and structure.",
    },
    "import-artworks": {
      label: "Database",
      title: "Import 50 artworks",
      description: "Clean and import your spreadsheet or export.",
    },
    "clean-records": {
      label: "Database",
      title: "Clean 50 artwork records",
      description: "Fix inconsistent artwork information.",
    },
    "artlogic-check": {
      label: "Database",
      title: "Clean up your Artlogic database",
      description:
        "Remove duplicates, complete missing records and make your database reliable again.",
    },
    "collector-pdf": {
      label: "Sales material",
      title: "Collector PDF",
      description: "A clean, gallery-ready PDF prepared from selected artworks.",
    },
    "viewing-room": {
      label: "Sales material",
      title: "Private viewing room",
      description: "Prepare and publish a private online artwork selection for a collector.",
    },
    "seo-check": {
      label: "Visibility",
      title: "Artist SEO check",
      description: "Find the main issues.",
    },
    "fix-google": {
      label: "Visibility",
      title: "Google indexing",
      description: "Get new pages discovered.",
    },
  },
  fr: {
    "publish-exhibition": {
      label: "Site web",
      title: "Publier une exposition",
      description: "Textes, images et dates transformés en page d’exposition publiée.",
    },
    "opening-website": {
      label: "Site web",
      title: "Préparer un vernissage",
      description: "Accueil, exposition et pages artistes actualisés et prêts avant l’ouverture.",
    },
    "artist-page": {
      label: "Site web",
      title: "Ajouter une page artiste",
      description:
        "Biographie, œuvres, images et informations de base ajoutées au site de la galerie.",
    },
    "update-artworks": {
      label: "Site web",
      title: "Mettre à jour 10 œuvres",
      description: "Images, légendes, disponibilités ou autres informations d’œuvres mises à jour.",
    },
    "fix-website-issue": {
      label: "Site web",
      title: "Corriger un problème sur le site",
      description:
        "Quelque chose s’affiche mal ou ne fonctionne plus ? Nous cherchons et corrigeons un problème défini.",
    },
    "organise-database": {
      label: "Base de données",
      title: "Organiser votre base de données",
      description: "Catégories, champs et structure remis au propre.",
    },
    "import-artworks": {
      label: "Base de données",
      title: "Importer 50 œuvres",
      description: "Nettoyage et import de votre tableur ou de votre export.",
    },
    "clean-records": {
      label: "Base de données",
      title: "Nettoyer 50 fiches d’œuvres",
      description: "Correction des informations d’œuvres incohérentes.",
    },
    "artlogic-check": {
      label: "Base de données",
      title: "Nettoyer votre base Artlogic",
      description:
        "Doublons supprimés, fiches incomplètes complétées, et une base à nouveau fiable.",
    },
    "collector-pdf": {
      label: "Supports de vente",
      title: "PDF collectionneur",
      description: "Un PDF net, prêt à envoyer, préparé à partir des œuvres sélectionnées.",
    },
    "viewing-room": {
      label: "Supports de vente",
      title: "Viewing room privée",
      description:
        "Préparation et mise en ligne d’une sélection privée d’œuvres pour un collectionneur.",
    },
    "seo-check": {
      label: "Visibilité",
      title: "Audit SEO artiste",
      description: "Identification des principaux problèmes.",
    },
    "fix-google": {
      label: "Visibilité",
      title: "Indexation Google",
      description: "Faire découvrir vos nouvelles pages.",
    },
  },
};

const UI = {
  en: {
    add: "Add task",
    added: "Added",
    remove: "Remove task",
    preview: (title) => `Preview ${title}`,
    taskCount: (n) => `${n} task${n === 1 ? "" : "s"}`,
    estimated: (total) => `${price(total)} estimated`,
    moreTasks: (n) => `+${n} more task${n === 1 ? "" : "s"}`,
    exampleTask: "Example task",
    dateLocale: "en-GB",
    mailSubject: "Vitreen task request",
    mailBody: (lines, total) =>
      `Hello Vitreen,\n\nI would like to request:\n${lines}\n\nEstimated total: ${price(total)}`,
  },
  fr: {
    add: "Ajouter",
    added: "Ajoutée",
    remove: "Retirer",
    preview: (title) => `Aperçu : ${title}`,
    taskCount: (n) => `${n} tâche${n === 1 ? "" : "s"}`,
    estimated: (total) => `${price(total)} estimés`,
    moreTasks: (n) => `+${n} autre${n === 1 ? "" : "s"} tâche${n === 1 ? "" : "s"}`,
    exampleTask: "Tâche exemple",
    dateLocale: "fr-FR",
    mailSubject: "Demande de tâche Vitreen",
    mailBody: (lines, total) =>
      `Bonjour Vitreen,\n\nJe souhaiterais demander :\n${lines}\n\nTotal estimé : ${price(total)}`,
  },
};

const t = UI[LANG];

/* Copy shown inside the preview mockups. Same reason as UI above: one bundle,
 * two locales. */
const PREVIEW = {
  en: {
    recordsHeading: "Artwork records",
    recordsReady: "Clean &amp; ready",
    colArtist: "Artist",
    colTitle: "Title",
    colYear: "Year",
    colStatus: "Status",
    available: "Available",
    reserved: "Reserved",
    rowTitles: ["Untitled", "Blue Study", "Movement"],
    galleryName: "Gallery name",
    selectedWorks: "Selected works",
    privateSelection: "Private selection for a collector",
    collectorTitle: "Autumn Selection",
    collectorSubtitle: "Four recent paintings for a private collector",
    inquire: "Inquire",
    duplicateHeading: "Duplicate artist records",
    primaryRecord: "Primary record",
    possibleDuplicate: "Possible duplicate",
    artworksCount: (n) => `${n} artworks`,
    lastUpdated: "Last updated Feb 2026",
    missingBio: "Missing biography",
    resolveDuplicate: "Resolve duplicate",
    oneArtistRecord: "1 artist record",
    artworksConnected: (n) => `${n} artworks connected`,
    databaseCleaned: "Database cleaned",
    medium: "Medium",
    recordCount: (n) => `${n} records`,
    mergeValues: ["Oil", "Oil painting", "Oil on canvas"],
    mergeFields: "Merge fields",
    artworksUpdated: (n) => `${n} artworks updated`,
    fieldsMerged: (n) => `${n} fields merged`,
    imageFailed: "Image failed to load",
    fileMissing: "404 — file missing from server",
    bugCaption: "Sacha Elron — Oil on canvas, 150 × 150 cm",
    searchRanking: "Google · Search ranking",
    otherResults: "Page 1 — other results",
    rankingTitle: "Sacha Elron — Gallery Name",
    rankingDesc: "Biography, selected works, exhibitions and available artworks.",
    pageTwo: "Page 2",
    gauges: ["Performance", "Accessibility", "Best Practices", "SEO"],
    collectorArtwork: "Untitled (Cadmium Red)",
    collectorMedium: "Oil on canvas",
    bugUrl: "galleryname.com/artworks/paradise",
    rankingUrl: "galleryname.com › artists › sacha-elron",
    lighthouseUrl: "galleryname.com/artists/artist-name",
    searchQuery: '"sacha elron gallery paris"',
    previewAlt: {
      home: "Homepage preview",
      artist: "Artist page preview",
      artworks: "Artworks page preview",
      exhibition: "Exhibition preview",
    },
  },
  fr: {
    recordsHeading: "Fiches d’œuvres",
    recordsReady: "Propres et prêtes",
    colArtist: "Artiste",
    colTitle: "Titre",
    colYear: "Année",
    colStatus: "Statut",
    available: "Disponible",
    reserved: "Réservée",
    rowTitles: ["Sans titre", "Étude bleue", "Mouvement"],
    galleryName: "Nom de la galerie",
    selectedWorks: "Œuvres sélectionnées",
    privateSelection: "Sélection privée pour un collectionneur",
    collectorTitle: "Sélection d’automne",
    collectorSubtitle: "Quatre peintures récentes pour un collectionneur privé",
    inquire: "Demander",
    duplicateHeading: "Fiches artistes en double",
    primaryRecord: "Fiche principale",
    possibleDuplicate: "Doublon possible",
    artworksCount: (n) => `${n} œuvres`,
    lastUpdated: "Dernière mise à jour février 2026",
    missingBio: "Biographie manquante",
    resolveDuplicate: "Fusionner le doublon",
    oneArtistRecord: "1 fiche artiste",
    artworksConnected: (n) => `${n} œuvres rattachées`,
    databaseCleaned: "Base nettoyée",
    medium: "Technique",
    recordCount: (n) => `${n} fiches`,
    mergeValues: ["Huile", "Peinture à l’huile", "Huile sur toile"],
    mergeFields: "Fusionner les champs",
    artworksUpdated: (n) => `${n} œuvres mises à jour`,
    fieldsMerged: (n) => `${n} champs fusionnés`,
    imageFailed: "L’image ne s’est pas chargée",
    fileMissing: "404 — fichier absent du serveur",
    bugCaption: "Sacha Elron — Huile sur toile, 150 × 150 cm",
    searchRanking: "Google · Positionnement",
    otherResults: "Page 1 — autres résultats",
    rankingTitle: "Sacha Elron — Nom de la galerie",
    rankingDesc: "Biographie, œuvres sélectionnées, expositions et œuvres disponibles.",
    pageTwo: "Page 2",
    gauges: ["Performance", "Accessibilité", "Bonnes pratiques", "SEO"],
    collectorArtwork: "Sans titre (rouge de cadmium)",
    collectorMedium: "Huile sur toile",
    bugUrl: "nomdegalerie.com/oeuvres/paradise",
    rankingUrl: "nomdegalerie.com › artistes › sacha-elron",
    lighthouseUrl: "nomdegalerie.com/artistes/nom-artiste",
    searchQuery: "« sacha elron galerie paris »",
    previewAlt: {
      home: "Aperçu de la page d’accueil",
      artist: "Aperçu de la page artiste",
      artworks: "Aperçu de la page œuvres",
      exhibition: "Aperçu de l’exposition",
    },
  },
};

const pv = PREVIEW[LANG];

/* Ids, categories and prices are shared; only the wording differs per locale. */
const tasks = [
  { id: "publish-exhibition", category: "website", price: 120 },
  { id: "opening-website", category: "website", price: 220 },
  { id: "artist-page", category: "website", price: 90 },
  { id: "update-artworks", category: "website", price: 90 },
  { id: "fix-website-issue", category: "website", price: 90 },
  { id: "organise-database", category: "database", price: 150 },
  { id: "import-artworks", category: "database", price: 220 },
  { id: "clean-records", category: "database", price: 180 },
  { id: "artlogic-check", category: "database", price: 120 },
  { id: "collector-pdf", category: "sales-material", price: 80 },
  { id: "viewing-room", category: "sales-material", price: 120 },
  { id: "seo-check", category: "visibility", price: 120 },
  { id: "fix-google", category: "visibility", price: 90 },
].map((task) => ({ ...task, ...TASK_COPY[LANG][task.id] }));

const grid = document.querySelector("#task-grid");
const summary = document.querySelector("#request-summary");
const modal = document.querySelector("#task-modal");
const invoiceDate = document.querySelector("#invoice-date");
const selected = new Set();
let activeFilter = "all";
let previewedTask = null;

if (invoiceDate) {
  invoiceDate.textContent = new Intl.DateTimeFormat(t.dateLocale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date());
}

function renderTasks() {
  const visibleTasks =
    activeFilter === "all" ? tasks : tasks.filter((task) => task.category === activeFilter);
  grid.innerHTML = visibleTasks
    .map(
      (task) => `
    <article class="task-card" data-preview-id="${task.id}" tabindex="0" role="button" aria-label="${t.preview(task.title)}">
      <p class="task-category">${task.label}</p><h3>${task.title}</h3><p class="task-price">${price(task.price)}</p><p class="task-description">${task.description}</p>
      <button class="task-add ${selected.has(task.id) ? "is-selected" : ""}" type="button" data-task-id="${task.id}" aria-pressed="${selected.has(task.id)}">${selected.has(task.id) ? t.added : t.add}</button>
    </article>`
    )
    .join("");
}

function updateSummary() {
  const selectedTasks = tasks.filter((task) => selected.has(task.id));
  const total = selectedTasks.reduce((sum, task) => sum + task.price, 0);
  const wasVisible = !summary.hidden;
  const requestItems = document.querySelector("#request-items");
  document.querySelector("#task-count").textContent = t.taskCount(selectedTasks.length);
  document.querySelector("#task-total").textContent = t.estimated(total);
  document.querySelector("#request-total").textContent = price(total);
  requestItems.replaceChildren();
  selectedTasks.slice(0, 2).forEach((task) => {
    const item = document.createElement("div");
    item.className = "request-summary__item";
    const title = document.createElement("span");
    const amount = document.createElement("strong");
    title.textContent = task.title;
    amount.textContent = price(task.price);
    item.append(title, amount);
    requestItems.append(item);
  });
  if (selectedTasks.length > 2) {
    const more = document.createElement("div");
    more.className = "request-summary__item request-summary__item--more";
    const label = document.createElement("span");
    label.textContent = t.moreTasks(selectedTasks.length - 2);
    more.append(label, document.createElement("span"));
    requestItems.append(more);
  }
  const lines = selectedTasks.map((task) => `- ${task.title} (${price(task.price)})`).join("\n");
  document.querySelector("#request-tasks").href =
    `mailto:studio@vitreen.art?subject=${encodeURIComponent(t.mailSubject)}&body=${encodeURIComponent(t.mailBody(lines, total))}`;
  if (!selectedTasks.length) {
    summary.classList.remove("is-visible", "is-updated");
    summary.hidden = true;
  } else {
    summary.hidden = false;
    if (!wasVisible) {
      requestAnimationFrame(() => summary.classList.add("is-visible"));
    } else {
      summary.classList.remove("is-updated");
      requestAnimationFrame(() => {
        summary.classList.add("is-updated");
        window.setTimeout(() => summary.classList.remove("is-updated"), 280);
      });
    }
  }
  updateInvoice(selectedTasks, total);
}

function updateInvoice(selectedTasks, total) {
  const invoiceItems = document.querySelector("#invoice-items");
  const displayedTasks = selectedTasks.length ? selectedTasks : [tasks[0]];
  const displayedTotal = selectedTasks.length ? total : tasks[0].price;
  invoiceItems.innerHTML = displayedTasks
    .map(
      (task) =>
        `<div class="invoice-row invoice-row--item"><div><strong>${task.title}</strong><small>${selectedTasks.length ? task.label : t.exampleTask}</small></div><span>1</span><span>${price(task.price)}</span><strong>${price(task.price)}</strong></div>`
    )
    .join("");
  document.querySelector("#invoice-subtotal").textContent = price(displayedTotal);
  document.querySelector("#invoice-total").textContent = price(displayedTotal);
}

const websitePreviewImages = {
  "opening-website": { src: "home-page.png", alt: pv.previewAlt.home },
  "artist-page": { src: "artist-page.png", alt: pv.previewAlt.artist },
  "update-artworks": { src: "artworks-page.png", alt: pv.previewAlt.artworks },
};
const defaultWebsitePreviewImage = { src: "exhibition-page.png", alt: pv.previewAlt.exhibition };

function previewMarkup(task) {
  if (task.category === "website") {
    if (task.id === "fix-website-issue") return bugMarkup();
    const image = websitePreviewImages[task.id] || defaultWebsitePreviewImage;
    return `<div class="preview-fullbleed"><img src="/studio/images/${image.src}" alt="${image.alt}" /></div>`;
  }
  if (task.category === "database") {
    if (task.id === "artlogic-check") return dedupeMarkup();
    if (task.id === "organise-database") return mergeFieldsMarkup();
    return `<div class="preview-table"><div class="preview-table__heading">${pv.recordsHeading} <span>${pv.recordsReady}</span></div><div class="preview-row preview-row--head"><b>${pv.colArtist}</b><b>${pv.colTitle}</b><b>${pv.colYear}</b><b>${pv.colStatus}</b></div><div class="preview-row"><span>A. Martin</span><span>${pv.rowTitles[0]}</span><span>2024</span><span>${pv.available}</span></div><div class="preview-row"><span>J. Smith</span><span>${pv.rowTitles[1]}</span><span>2023</span><span>${pv.reserved}</span></div><div class="preview-row"><span>L. Chen</span><span>${pv.rowTitles[2]}</span><span>2022</span><span>${pv.available}</span></div></div>`;
  }
  if (task.category === "sales-material") {
    if (task.id === "collector-pdf") return collectorPdfMarkup();
    return `<div class="preview-pdf"><div><small>${pv.galleryName}</small><h3>${pv.selectedWorks}</h3><p>${pv.privateSelection}</p></div><div class="preview-pdf__art"></div><span>01 — 12</span></div>`;
  }
  if (task.category === "visibility" && task.id === "seo-check") return rankingMarkup();
  const gauges = [58, 96, 87, 71].map((score, i) => ({ label: pv.gauges[i], score }));
  return `<div class="preview-lighthouse"><div class="preview-lighthouse__head"><span class="preview-lighthouse__logo">Lighthouse report</span><span class="preview-lighthouse__url">${pv.lighthouseUrl}</span></div><div class="preview-lighthouse__grid">${gauges.map((gauge) => lighthouseGauge(gauge.label, gauge.score)).join("")}</div></div>`;
}

function collectorPdfMarkup() {
  return `<div class="preview-collector">
      <div class="preview-collector__head">
        <p class="preview-collector__eyebrow">Sacha Elron</p>
        <h3>${pv.collectorTitle}</h3>
        <p class="preview-collector__subtitle">${pv.collectorSubtitle}</p>
      </div>
      <div class="preview-collector__media"><img src="/studio/images/collector-pdf-artwork.jpg" alt="${pv.collectorArtwork}" /></div>
      <div class="preview-collector__meta">
        <div>
          <p class="preview-collector__artist">Sacha Elron</p>
          <p class="preview-collector__title"><em>${pv.collectorArtwork}</em>, 2024</p>
          <p class="preview-collector__detail">${pv.collectorMedium}</p>
          <p class="preview-collector__detail">190 × 170 cm</p>
        </div>
        <span class="preview-collector__inquire">${pv.inquire}</span>
      </div>
    </div>`;
}

function dedupeMarkup() {
  return `<div class="preview-dedupe" aria-hidden="true">
      <div class="preview-dedupe__panel">
        <div class="preview-dedupe__field"><span>${pv.duplicateHeading}</span></div>
        <div class="preview-dedupe__stack">
          <div class="preview-dedupe__card preview-dedupe__card--primary">
            <div class="preview-dedupe__card-head"><b>Sacha Elron</b><span class="preview-dedupe__status preview-dedupe__status--primary">${pv.primaryRecord}</span></div>
            <small>${pv.artworksCount(12)}</small>
            <small>${pv.lastUpdated}</small>
          </div>
          <div class="preview-dedupe__card preview-dedupe__card--duplicate">
            <div class="preview-dedupe__card-head"><b>Sacha&nbsp; Elron</b><span class="preview-dedupe__status preview-dedupe__status--duplicate">${pv.possibleDuplicate}</span></div>
            <small>${pv.artworksCount(4)}</small>
            <small>${pv.missingBio}</small>
          </div>
        </div>
        <div class="preview-dedupe__action"><span class="preview-dedupe__action-btn">${pv.resolveDuplicate}</span></div>
        <div class="preview-dedupe__result">
          <span class="preview-dedupe__check">✓</span>
          <div><b>${pv.oneArtistRecord}</b><small>${pv.artworksConnected(16)}</small></div>
        </div>
        <p class="preview-dedupe__status-line"><i class="preview-dedupe__dot"></i>${pv.databaseCleaned}</p>
      </div>
    </div>`;
}

const mergeRows = ["Paradise, 2019", "Reverie, 2021", "Coastline, 2020"].map((title, i) => ({
  title,
  value: pv.mergeValues[i],
}));

function mergeFieldsMarkup() {
  const rows = mergeRows
    .map(
      (row) =>
        `<li class="preview-merge__row"><div><b>Sacha Elron</b><small>${row.title}</small></div><span class="preview-merge__tag">${row.value}</span></li>`
    )
    .join("");
  return `<div class="preview-merge" aria-hidden="true">
      <div class="preview-merge__panel">
        <div class="preview-merge__field"><span>${pv.medium}</span><span>${pv.recordCount(3)}</span></div>
        <ul class="preview-merge__list">${rows}</ul>
        <div class="preview-merge__action"><span class="preview-merge__action-btn">${pv.mergeFields}</span></div>
        <div class="preview-merge__result">
          <div><b>Sacha Elron</b><small>${pv.artworksUpdated(3)}</small></div>
          <span class="preview-merge__tag preview-merge__tag--pass">${pv.mergeValues[2]}</span>
        </div>
        <p class="preview-merge__status"><i class="preview-merge__dot"></i>${pv.fieldsMerged(3)}</p>
      </div>
    </div>`;
}

function bugMarkup() {
  return `<div class="preview-bug"><div class="preview-bug__bar"><i></i><i></i><i></i><span>${pv.bugUrl}</span></div><div class="preview-bug__page"><small>${pv.galleryName}</small><div class="preview-bug__broken"><span class="preview-bug__pin">1</span><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="40" height="40" rx="4" /><circle cx="16" cy="16" r="4" /><path d="M4 32L16 22L26 30L34 20L44 30" /><line x1="2" y1="2" x2="46" y2="46" /></svg><span class="preview-bug__code">404</span></div><h3>Paradise, 2019</h3><p>${pv.bugCaption}</p></div><div class="preview-bug__note"><span class="preview-bug__note-pin">1</span><div><b>${pv.imageFailed}</b><small>${pv.fileMissing}</small></div></div></div>`;
}

function rankingMarkup() {
  const skeletonRows = Array.from({ length: 4 })
    .map(
      () =>
        `<div class="preview-ranking__row"><span class="preview-ranking__bar preview-ranking__bar--url"></span><span class="preview-ranking__bar preview-ranking__bar--title"></span><span class="preview-ranking__bar preview-ranking__bar--body"></span></div>`
    )
    .join("");
  const pages = [1, 2, 3, 4, 5]
    .map((page) => `<span class="${page === 2 ? "is-current" : ""}">${page}</span>`)
    .join("");
  return `<div class="preview-ranking"><div class="preview-ranking__head"><span class="preview-ranking__label">${pv.searchRanking}</span><span class="preview-ranking__query">${pv.searchQuery}</span></div><div class="preview-ranking__page1"><span class="preview-ranking__page1-label">${pv.otherResults}</span>${skeletonRows}</div><div class="preview-ranking__pagination">${pages}</div><div class="preview-ranking__result"><span class="preview-ranking__position">14</span><div><p class="preview-ranking__url">${pv.rankingUrl}</p><h3>${pv.rankingTitle}</h3><p class="preview-ranking__desc">${pv.rankingDesc}</p></div><span class="preview-ranking__flag">${pv.pageTwo}</span></div></div>`;
}

const LIGHTHOUSE_RADIUS = 34;
const LIGHTHOUSE_CIRCUMFERENCE = 2 * Math.PI * LIGHTHOUSE_RADIUS;

function lighthouseTier(score) {
  if (score >= 90) return "green";
  if (score >= 50) return "orange";
  return "red";
}

function lighthouseGauge(label, score) {
  const offset = LIGHTHOUSE_CIRCUMFERENCE * (1 - score / 100);
  return `<div class="preview-lighthouse__gauge preview-lighthouse__gauge--${lighthouseTier(score)}"><div class="preview-lighthouse__ring"><svg viewBox="0 0 80 80"><circle class="track" cx="40" cy="40" r="${LIGHTHOUSE_RADIUS}" /><circle class="value" cx="40" cy="40" r="${LIGHTHOUSE_RADIUS}" style="stroke-dasharray:${LIGHTHOUSE_CIRCUMFERENCE};stroke-dashoffset:${offset}" /></svg><span class="preview-lighthouse__score">${score}</span></div><p>${label}</p></div>`;
}

function openPreview(task) {
  previewedTask = task;
  document.querySelector("#modal-category").textContent = task.label;
  document.querySelector("#modal-task-title").textContent = task.title;
  document.querySelector("#modal-price").textContent = price(task.price);
  document.querySelector("#modal-description").textContent = task.description;
  const previewEl = document.querySelector("#modal-preview");
  previewEl.innerHTML = previewMarkup(task);
  previewEl.classList.toggle(
    "modal-preview--fullbleed",
    task.category === "website" ||
      task.category === "visibility" ||
      task.id === "artlogic-check" ||
      task.id === "organise-database" ||
      task.id === "collector-pdf"
  );
  const mergeEl = previewEl.querySelector(".preview-merge");
  if (mergeEl) requestAnimationFrame(() => mergeEl.classList.add("is-inview"));
  const dedupeEl = previewEl.querySelector(".preview-dedupe");
  if (dedupeEl) requestAnimationFrame(() => dedupeEl.classList.add("is-inview"));
  document.querySelector("#modal-add").textContent = selected.has(task.id) ? t.remove : t.add;
  modal.showModal();
}

document.querySelector(".task-filters").addEventListener("click", (event) => {
  const filter = event.target.closest(".filter");
  if (!filter) return;
  activeFilter = filter.dataset.filter;
  document
    .querySelectorAll(".filter")
    .forEach((item) => item.classList.toggle("is-active", item === filter));
  renderTasks();
});
document.querySelector(".category-strip").addEventListener("click", (event) => {
  const link = event.target.closest(".category-link");
  if (!link) return;
  activeFilter = link.dataset.category;
  document
    .querySelectorAll(".filter")
    .forEach((item) => item.classList.toggle("is-active", item.dataset.filter === activeFilter));
  renderTasks();
});
grid.addEventListener("click", (event) => {
  const button = event.target.closest(".task-add");
  if (!button) {
    const card = event.target.closest(".task-card");
    if (card) openPreview(tasks.find((task) => task.id === card.dataset.previewId));
    return;
  }
  const { taskId } = button.dataset;
  selected.has(taskId) ? selected.delete(taskId) : selected.add(taskId);
  renderTasks();
  updateSummary();
});
grid.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const card = event.target.closest(".task-card");
  if (!card) return;
  event.preventDefault();
  openPreview(tasks.find((task) => task.id === card.dataset.previewId));
});
document.querySelector(".modal-close").addEventListener("click", () => modal.close());
document.querySelector("#modal-add").addEventListener("click", () => {
  selected.has(previewedTask.id)
    ? selected.delete(previewedTask.id)
    : selected.add(previewedTask.id);
  renderTasks();
  updateSummary();
  modal.close();
});
modal.addEventListener("click", (event) => {
  if (event.target === modal) modal.close();
});

renderTasks();
updateSummary();
createIcons({ icons: { BadgeCheck, BadgeEuro, Database, Files, Monitor, Plug, Search } });

// Drag the estimate ticket down to collapse it to a peeking strip, or up to reopen it.
const dragZone = summary.querySelector(".request-summary__drag-zone");
if (dragZone) {
  const PEEK = 56;
  let dragging = false;
  let startY = 0;
  let startOffset = 0;
  let cardHeight = 0;
  let moved = 0;

  const setCollapsed = (collapsed) => summary.classList.toggle("is-collapsed", collapsed);

  dragZone.addEventListener("pointerdown", (event) => {
    dragging = true;
    moved = 0;
    startY = event.clientY;
    cardHeight = summary.getBoundingClientRect().height;
    startOffset = summary.classList.contains("is-collapsed") ? cardHeight - PEEK : 0;
    summary.classList.add("is-dragging");
    dragZone.setPointerCapture(event.pointerId);
  });

  dragZone.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    const delta = event.clientY - startY;
    moved = Math.abs(delta);
    const next = Math.min(Math.max(startOffset + delta, 0), cardHeight - PEEK);
    summary.style.transform = `translate(-50%, ${next}px)`;
  });

  const endDrag = (event) => {
    if (!dragging) return;
    dragging = false;
    summary.classList.remove("is-dragging");
    summary.style.transform = "";
    if (moved < 6) {
      setCollapsed(!summary.classList.contains("is-collapsed"));
    } else {
      const delta = event.clientY - startY;
      const finalOffset = Math.min(Math.max(startOffset + delta, 0), cardHeight - PEEK);
      setCollapsed(finalOffset > (cardHeight - PEEK) / 2);
    }
  };
  dragZone.addEventListener("pointerup", endDrag);
  dragZone.addEventListener("pointercancel", endDrag);
}
