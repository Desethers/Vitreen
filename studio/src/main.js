import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/components.css";
import "./styles/sections.css";
import { BadgeCheck, BadgeEuro, createIcons, Database, Files, Monitor, Plug, Search } from "lucide";

const tasks = [
  {
    id: "publish-exhibition",
    category: "website",
    label: "Website",
    title: "Publish an exhibition",
    price: 120,
    description: "Text, images and dates turned into a published exhibition page.",
  },
  {
    id: "opening-website",
    category: "website",
    label: "Website",
    title: "Prepare for an opening",
    price: 220,
    description: "Homepage, exhibition and artist pages refreshed and ready before opening.",
  },
  {
    id: "artist-page",
    category: "website",
    label: "Website",
    title: "Add an artist page",
    price: 90,
    description: "Biography, works, images and basic metadata added to the gallery website.",
  },
  {
    id: "update-artworks",
    category: "website",
    label: "Website",
    title: "Update 10 artworks",
    price: 90,
    description: "Update images, captions, availability or other artwork information.",
  },
  {
    id: "fix-website-issue",
    category: "website",
    label: "Website",
    title: "Fix a website issue",
    price: 90,
    description:
      "Something looks wrong or stopped working? We investigate and fix one defined issue.",
  },
  {
    id: "organise-database",
    category: "database",
    label: "Database",
    title: "Organise your database",
    price: 150,
    description: "Clean categories, fields and structure.",
  },
  {
    id: "import-artworks",
    category: "database",
    label: "Database",
    title: "Import 50 artworks",
    price: 220,
    description: "Clean and import your spreadsheet or export.",
  },
  {
    id: "clean-records",
    category: "database",
    label: "Database",
    title: "Clean 50 artwork records",
    price: 180,
    description: "Fix inconsistent artwork information.",
  },
  {
    id: "artlogic-check",
    category: "database",
    label: "Database",
    title: "Clean up your Artlogic database",
    price: 120,
    description:
      "Remove duplicates, complete missing records and make your database reliable again.",
  },
  {
    id: "collector-pdf",
    category: "sales-material",
    label: "Sales material",
    title: "Collector PDF",
    price: 80,
    description: "A clean, gallery-ready PDF prepared from selected artworks.",
  },
  {
    id: "viewing-room",
    category: "sales-material",
    label: "Sales material",
    title: "Private viewing room",
    price: 120,
    description: "Prepare and publish a private online artwork selection for a collector.",
  },
  {
    id: "seo-check",
    category: "visibility",
    label: "Visibility",
    title: "Artist SEO check",
    price: 120,
    description: "Find the main issues.",
  },
  {
    id: "fix-google",
    category: "visibility",
    label: "Visibility",
    title: "Google indexing",
    price: 90,
    description: "Get new pages discovered.",
  },
];

const grid = document.querySelector("#task-grid");
const summary = document.querySelector("#request-summary");
const modal = document.querySelector("#task-modal");
const invoiceDate = document.querySelector("#invoice-date");
const selected = new Set();
let activeFilter = "all";
let previewedTask = null;

if (invoiceDate) {
  invoiceDate.textContent = new Intl.DateTimeFormat("en-GB", {
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
    <article class="task-card" data-preview-id="${task.id}" tabindex="0" role="button" aria-label="Preview ${task.title}">
      <p class="task-category">${task.label}</p><h3>${task.title}</h3><p class="task-price">€${task.price}</p><p class="task-description">${task.description}</p>
      <button class="task-add ${selected.has(task.id) ? "is-selected" : ""}" type="button" data-task-id="${task.id}" aria-pressed="${selected.has(task.id)}">${selected.has(task.id) ? "Added" : "Add task"}</button>
    </article>`
    )
    .join("");
}

function updateSummary() {
  const selectedTasks = tasks.filter((task) => selected.has(task.id));
  const total = selectedTasks.reduce((sum, task) => sum + task.price, 0);
  const wasVisible = !summary.hidden;
  const requestItems = document.querySelector("#request-items");
  document.querySelector("#task-count").textContent =
    `${selectedTasks.length} task${selectedTasks.length === 1 ? "" : "s"}`;
  document.querySelector("#task-total").textContent = `€${total} estimated`;
  document.querySelector("#request-total").textContent = `€${total}`;
  requestItems.replaceChildren();
  selectedTasks.slice(0, 2).forEach((task) => {
    const item = document.createElement("div");
    item.className = "request-summary__item";
    const title = document.createElement("span");
    const price = document.createElement("strong");
    title.textContent = task.title;
    price.textContent = `€${task.price}`;
    item.append(title, price);
    requestItems.append(item);
  });
  if (selectedTasks.length > 2) {
    const more = document.createElement("div");
    more.className = "request-summary__item request-summary__item--more";
    const label = document.createElement("span");
    label.textContent = `+${selectedTasks.length - 2} more task${selectedTasks.length === 3 ? "" : "s"}`;
    more.append(label, document.createElement("span"));
    requestItems.append(more);
  }
  document.querySelector("#request-tasks").href =
    `mailto:hello@vitreen.studio?subject=${encodeURIComponent("Vitreen task request")}&body=${encodeURIComponent(`Hello Vitreen,\n\nI would like to request:\n${selectedTasks.map((task) => `- ${task.title} (€${task.price})`).join("\n")}\n\nEstimated total: €${total}`)}`;
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
        `<div class="invoice-row invoice-row--item"><div><strong>${task.title}</strong><small>${selectedTasks.length ? task.label : "Example task"}</small></div><span>1</span><span>€${task.price}</span><strong>€${task.price}</strong></div>`
    )
    .join("");
  document.querySelector("#invoice-subtotal").textContent = `€${displayedTotal}`;
  document.querySelector("#invoice-total").textContent = `€${displayedTotal}`;
}

const websitePreviewImages = {
  "opening-website": { src: "home-page.png", alt: "Homepage preview" },
  "artist-page": { src: "artist-page.png", alt: "Artist page preview" },
  "update-artworks": { src: "artworks-page.png", alt: "Artworks page preview" },
};
const defaultWebsitePreviewImage = { src: "exhibition-page.png", alt: "Exhibition preview" };

function previewMarkup(task) {
  if (task.category === "website") {
    if (task.id === "fix-website-issue") return bugMarkup();
    const image = websitePreviewImages[task.id] || defaultWebsitePreviewImage;
    return `<div class="preview-fullbleed"><img src="/studio/images/${image.src}" alt="${image.alt}" /></div>`;
  }
  if (task.category === "database") {
    if (task.id === "artlogic-check") return dedupeMarkup();
    if (task.id === "organise-database") return mergeFieldsMarkup();
    return `<div class="preview-table"><div class="preview-table__heading">Artwork records <span>Clean &amp; ready</span></div><div class="preview-row preview-row--head"><b>Artist</b><b>Title</b><b>Year</b><b>Status</b></div><div class="preview-row"><span>A. Martin</span><span>Untitled</span><span>2024</span><span>Available</span></div><div class="preview-row"><span>J. Smith</span><span>Blue Study</span><span>2023</span><span>Reserved</span></div><div class="preview-row"><span>L. Chen</span><span>Movement</span><span>2022</span><span>Available</span></div></div>`;
  }
  if (task.category === "sales-material") {
    if (task.id === "collector-pdf") return collectorPdfMarkup();
    return `<div class="preview-pdf"><div><small>Gallery name</small><h3>Selected works</h3><p>Private selection for a collector</p></div><div class="preview-pdf__art"></div><span>01 — 12</span></div>`;
  }
  if (task.category === "visibility" && task.id === "seo-check") return rankingMarkup();
  const gauges = [
    { label: "Performance", score: 58 },
    { label: "Accessibility", score: 96 },
    { label: "Best Practices", score: 87 },
    { label: "SEO", score: 71 },
  ];
  return `<div class="preview-lighthouse"><div class="preview-lighthouse__head"><span class="preview-lighthouse__logo">Lighthouse report</span><span class="preview-lighthouse__url">galleryname.com/artists/artist-name</span></div><div class="preview-lighthouse__grid">${gauges.map((gauge) => lighthouseGauge(gauge.label, gauge.score)).join("")}</div></div>`;
}

function collectorPdfMarkup() {
  return `<div class="preview-collector">
      <div class="preview-collector__head">
        <p class="preview-collector__eyebrow">Sacha Elron</p>
        <h3>Autumn Selection</h3>
        <p class="preview-collector__subtitle">Four recent paintings for a private collector</p>
      </div>
      <div class="preview-collector__media"><img src="/studio/images/collector-pdf-artwork.jpg" alt="Untitled (Cadmium Red)" /></div>
      <div class="preview-collector__meta">
        <div>
          <p class="preview-collector__artist">Sacha Elron</p>
          <p class="preview-collector__title"><em>Untitled (Cadmium Red)</em>, 2024</p>
          <p class="preview-collector__detail">Oil on canvas</p>
          <p class="preview-collector__detail">190 × 170 cm</p>
        </div>
        <span class="preview-collector__inquire">Inquire</span>
      </div>
    </div>`;
}

function dedupeMarkup() {
  return `<div class="preview-dedupe" aria-hidden="true">
      <div class="preview-dedupe__panel">
        <div class="preview-dedupe__field"><span>Duplicate artist records</span></div>
        <div class="preview-dedupe__stack">
          <div class="preview-dedupe__card preview-dedupe__card--primary">
            <div class="preview-dedupe__card-head"><b>Sacha Elron</b><span class="preview-dedupe__status preview-dedupe__status--primary">Primary record</span></div>
            <small>12 artworks</small>
            <small>Last updated Feb 2026</small>
          </div>
          <div class="preview-dedupe__card preview-dedupe__card--duplicate">
            <div class="preview-dedupe__card-head"><b>Sacha&nbsp; Elron</b><span class="preview-dedupe__status preview-dedupe__status--duplicate">Possible duplicate</span></div>
            <small>4 artworks</small>
            <small>Missing biography</small>
          </div>
        </div>
        <div class="preview-dedupe__action"><span class="preview-dedupe__action-btn">Resolve duplicate</span></div>
        <div class="preview-dedupe__result">
          <span class="preview-dedupe__check">✓</span>
          <div><b>1 artist record</b><small>16 artworks connected</small></div>
        </div>
        <p class="preview-dedupe__status-line"><i class="preview-dedupe__dot"></i>Database cleaned</p>
      </div>
    </div>`;
}

const mergeRows = [
  { title: "Paradise, 2019", value: "Oil" },
  { title: "Reverie, 2021", value: "Oil painting" },
  { title: "Coastline, 2020", value: "Oil on canvas" },
];

function mergeFieldsMarkup() {
  const rows = mergeRows
    .map(
      (row) =>
        `<li class="preview-merge__row"><div><b>Sacha Elron</b><small>${row.title}</small></div><span class="preview-merge__tag">${row.value}</span></li>`
    )
    .join("");
  return `<div class="preview-merge" aria-hidden="true">
      <div class="preview-merge__panel">
        <div class="preview-merge__field"><span>Medium</span><span>3 records</span></div>
        <ul class="preview-merge__list">${rows}</ul>
        <div class="preview-merge__action"><span class="preview-merge__action-btn">Merge fields</span></div>
        <div class="preview-merge__result">
          <div><b>Sacha Elron</b><small>3 artworks updated</small></div>
          <span class="preview-merge__tag preview-merge__tag--pass">Oil on canvas</span>
        </div>
        <p class="preview-merge__status"><i class="preview-merge__dot"></i>3 fields merged</p>
      </div>
    </div>`;
}

function bugMarkup() {
  return `<div class="preview-bug"><div class="preview-bug__bar"><i></i><i></i><i></i><span>galleryname.com/artworks/paradise</span></div><div class="preview-bug__page"><small>Gallery name</small><div class="preview-bug__broken"><span class="preview-bug__pin">1</span><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="40" height="40" rx="4" /><circle cx="16" cy="16" r="4" /><path d="M4 32L16 22L26 30L34 20L44 30" /><line x1="2" y1="2" x2="46" y2="46" /></svg><span class="preview-bug__code">404</span></div><h3>Paradise, 2019</h3><p>Sacha Elron — Oil on canvas, 150 × 150 cm</p></div><div class="preview-bug__note"><span class="preview-bug__note-pin">1</span><div><b>Image failed to load</b><small>404 — file missing from server</small></div></div></div>`;
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
  return `<div class="preview-ranking"><div class="preview-ranking__head"><span class="preview-ranking__label">Google · Search ranking</span><span class="preview-ranking__query">"sacha elron gallery paris"</span></div><div class="preview-ranking__page1"><span class="preview-ranking__page1-label">Page 1 — other results</span>${skeletonRows}</div><div class="preview-ranking__pagination">${pages}</div><div class="preview-ranking__result"><span class="preview-ranking__position">14</span><div><p class="preview-ranking__url">galleryname.com › artists › sacha-elron</p><h3>Sacha Elron — Gallery Name</h3><p class="preview-ranking__desc">Biography, selected works, exhibitions and available artworks.</p></div><span class="preview-ranking__flag">Page 2</span></div></div>`;
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
  document.querySelector("#modal-price").textContent = `€${task.price}`;
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
  document.querySelector("#modal-add").textContent = selected.has(task.id)
    ? "Remove task"
    : "Add task";
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
