import type { Block, ImageItem, VrSetup } from "./buildTypes";

function escapePdfHtml(s: string): string {
  return String(s ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function parseDimCm(s: string): [string, string] {
  const m = s.trim().match(/^(\d+(?:[.,]\d+)?)\s*[×xX]\s*(\d+(?:[.,]\d+)?)(?:\s*cm\b)?/i);
  return m ? [m[1], m[2]] : ["", ""];
}

function formatDimensionsWithInches(value: string): string {
  if (!value.trim()) return value;
  if (/\bin\b/i.test(value)) return value;

  const [w, h] = parseDimCm(value);
  if (!w || !h) return value;

  const toIn = (cm: string) => (parseFloat(cm.replace(",", ".")) / 2.54).toFixed(1);
  return `${w} × ${h} cm (${toIn(w)} × ${toIn(h)} in)`;
}

function resolveImage(slot: { imageId: string | null }, images: ImageItem[]): ImageItem | null {
  if (!slot.imageId) return null;
  return images.find((i) => i.id === slot.imageId) ?? null;
}

function resolveBlockImages(block: Block, images: ImageItem[]): ImageItem[] {
  return (block.slots ?? [])
    .map((slot) => resolveImage(slot, images))
    .filter((img): img is ImageItem => !!img);
}

function blockShowsInquire(block: Block): boolean {
  return !block.inquireHidden;
}

function inquireLinkHtml(href: string): string {
  if (!href.trim()) return "";
  return `<a class="meta-inquire" href="${escapePdfHtml(href)}">INQUIRE</a>`;
}

function isLikelyTechnicalTitle(value: string): boolean {
  const t = value.trim();
  if (!t) return false;
  if (/\.(jpe?g|png|webp|gif|avif|heic)$/i.test(t)) return true;
  const compact = t.replace(/[\s_-]/g, "");
  return compact.length >= 18 && /^[a-f0-9]+$/i.test(compact);
}

function metaLine(value: string, className: string): string {
  const clean = value.trim();
  if (!clean) return "";
  const weight = className === "meta-artist" ? ' style="font-weight:600 !important;"' : "";
  return `<p class="${className}"${weight}>${escapePdfHtml(clean)}</p>`;
}

function metaHtml(
  img: ImageItem | null,
  opts: { showInquire?: boolean; inquireHref?: string; compact?: boolean; tiny?: boolean } = {}
): string {
  if (!img) return "";
  const { showInquire = false, inquireHref = "", compact = false, tiny = false } = opts;
  const title = isLikelyTechnicalTitle(img.title) ? "" : img.title.trim();
  const year = img.year.trim();
  const titleLine =
    title || year
      ? `<p class="meta-title">${title ? `<em>${escapePdfHtml(title)}</em>` : ""}${year ? `${title ? ", " : ""}${escapePdfHtml(year)}` : ""}</p>`
      : "";
  const inq = showInquire && inquireHref.trim() ? inquireLinkHtml(inquireHref) : "";
  const meta = [
    metaLine(img.artist, "meta-artist"),
    titleLine,
    metaLine(img.medium, "meta-detail"),
    metaLine(img.dimensions ? formatDimensionsWithInches(img.dimensions) : "", "meta-detail"),
    metaLine(img.price, "meta-price"),
  ]
    .filter(Boolean)
    .join("");
  if (!meta && !inq) return "";

  return `
    <div class="slot-meta ${compact ? "slot-meta-compact" : ""} ${tiny ? "slot-meta-tiny" : ""}">
      <div class="meta-copy">
        ${meta}
      </div>
      ${inq}
    </div>`;
}

function imgHtml(img: ImageItem | null, cls = "slot-img-natural") {
  return img?.dataUrl
    ? `<img src="${img.dataUrl}" class="${cls}" alt="${escapePdfHtml(img.title || img.artist || "")}" />`
    : '<div class="slot-no-img"></div>';
}

function fullArtworkHtml(
  img: ImageItem | null,
  block: Block,
  inquireHref: string,
  extraClass = ""
): string {
  return `
    <div class="page page-full ${extraClass}">
      <div class="full-media">${imgHtml(img)}</div>
      ${metaHtml(img, { showInquire: blockShowsInquire(block), inquireHref })}
    </div>`;
}

function gridArtworkHtml(block: Block, imgs: ImageItem[], inquireHref: string): string {
  if (imgs.length <= 1) return fullArtworkHtml(imgs[0] ?? null, block, inquireHref);
  const count = Math.min(imgs.length, 3);
  const isTrio = count >= 3;
  return `
    <div class="page page-grid ${isTrio ? "page-trio" : "page-pair"}">
      <div class="grid-inner grid-${count}">
        ${imgs
          .slice(0, count)
          .map(
            (img) => `
          <div class="grid-slot">
            <div class="grid-media">${imgHtml(img, "slot-img-cover")}</div>
            ${metaHtml(img, {
              showInquire: blockShowsInquire(block),
              inquireHref,
              compact: true,
              tiny: isTrio,
            })}
          </div>
        `
          )
          .join("")}
      </div>
    </div>`;
}

function blockHtml(block: Block, images: ImageItem[], inquireHref: string): string {
  if (block.type === "quote") {
    const isText = block.textStyle === "text";
    return `
      <div class="page page-quote ${isText ? "page-text" : ""}">
        <div class="quote-wrap">
          <p class="quote-text">${escapePdfHtml(block.quoteText)}</p>
          ${!isText && block.quoteAuthor ? `<p class="quote-author">${escapePdfHtml(block.quoteAuthor)}</p>` : ""}
        </div>
      </div>`;
  }

  if (block.type === "full") {
    return fullArtworkHtml(resolveBlockImages(block, images)[0] ?? null, block, inquireHref);
  }

  if (block.type === "pair" || block.type === "trio") {
    return gridArtworkHtml(block, resolveBlockImages(block, images), inquireHref);
  }

  if (block.type === "side") {
    const img = resolveBlockImages(block, images)[0] ?? null;
    const isText = block.textStyle === "text";
    return `
      <div class="page page-side">
        <div class="side-media">
          <div class="side-image-frame">${imgHtml(img, "slot-img-cover")}</div>
          ${metaHtml(img, { showInquire: blockShowsInquire(block), inquireHref, compact: true })}
        </div>
        <div class="side-text">
          ${block.quoteText ? `<p class="${isText ? "side-copy" : "side-quote"}">${escapePdfHtml(block.quoteText)}</p>` : ""}
          ${!isText && block.quoteAuthor ? `<p class="quote-author">${escapePdfHtml(block.quoteAuthor)}</p>` : ""}
        </div>
      </div>`;
  }

  if (block.type === "quotefull") {
    const img = resolveBlockImages(block, images)[0] ?? null;
    return `
      <div class="page page-quote-full">
        <div class="quote-full-text">
          ${block.quoteText ? `<p class="quote-text">${escapePdfHtml(block.quoteText)}</p>` : ""}
          ${block.quoteAuthor ? `<p class="quote-author">${escapePdfHtml(block.quoteAuthor)}</p>` : ""}
        </div>
        <div class="quote-full-artwork">
          <div class="quote-full-media">${imgHtml(img)}</div>
          ${metaHtml(img, { showInquire: blockShowsInquire(block), inquireHref })}
        </div>
      </div>`;
  }

  if (block.type === "imgbio") {
    const img = resolveBlockImages(block, images)[0] ?? null;
    return `
      <div class="page page-bio">
        <div class="bio-media">${imgHtml(img, "slot-img-cover")}</div>
        <div class="bio-copy">
          ${img?.artist ? `<p class="bio-artist" style="font-weight:600 !important;">${escapePdfHtml(img.artist)}</p>` : ""}
          ${img?.title || img?.year ? `<p class="bio-title">${img?.title ? escapePdfHtml(img.title) : ""}${img?.year ? `${img?.title ? ", b. " : "b. "}${escapePdfHtml(img.year)}` : ""}</p>` : ""}
          ${block.quoteText ? `<p class="bio-text">${escapePdfHtml(block.quoteText)}</p>` : ""}
        </div>
      </div>`;
  }

  return "";
}

export function generateBlocksPDF({
  blocks,
  images,
  setup,
  inquireHref = "",
}: {
  blocks: Block[];
  images: ImageItem[];
  setup: VrSetup | null;
  inquireHref?: string;
}): string {
  const coverTitle = setup?.headline?.trim() || "Viewing Room";
  const coverSubtitle = setup?.title?.trim();
  const cover = `
    <div class="page page-cover">
      <div class="cover-inner">
        <p class="cover-gallery">${escapePdfHtml(setup?.galleryName?.trim() || "Viewing Room Studio")}</p>
        <h1 class="cover-title">${escapePdfHtml(coverTitle)}</h1>
        ${coverSubtitle ? `<p class="cover-subtitle">${escapePdfHtml(coverSubtitle)}</p>` : ""}
        ${setup?.recipientName ? `<p class="cover-recipient">For ${escapePdfHtml(setup.recipientName)}</p>` : ""}
        ${setup?.introText ? `<p class="cover-intro">${escapePdfHtml(setup.introText)}</p>` : ""}
      </div>
    </div>`;

  const pages = [
    cover,
    ...blocks.map((b) => blockHtml(b, images, inquireHref)).filter(Boolean),
  ].join("\n");

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<style>
  @font-face {
    font-family: 'Inter';
    src: local('Inter'), local('Inter Regular');
    font-weight: 100 900;
    font-style: normal;
  }
  @font-face {
    font-family: 'Inter';
    src: local('Inter Italic'), local('Inter Italic Regular');
    font-weight: 100 900;
    font-style: italic;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  @page { size: A4; margin: 0; }
  body {
    font-family: 'Inter', Arial, Helvetica, sans-serif;
    background: white;
    color: #111827;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .page {
    width: 210mm;
    height: 297mm;
    min-height: 297mm;
    page-break-after: always;
    background: white;
    overflow: hidden;
  }
  .page:last-child { page-break-after: auto; }

  .page-cover {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 36mm;
  }
  .cover-inner { width: 130mm; text-align: left; }
  .cover-gallery {
    font-size: 8pt;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: #9ca3af;
    margin-bottom: 12mm;
  }
  .cover-title {
    font-size: 32px;
    line-height: 1.08;
    letter-spacing: -0.02em;
    font-weight: 400;
    color: #111111;
    margin-bottom: 2mm;
  }
  .cover-subtitle {
    font-size: 32px;
    line-height: 1.08;
    color: #9ca3af;
    margin-bottom: 9mm;
  }
  .cover-recipient {
    font-size: 12px;
    line-height: 1.65;
    font-weight: 400;
    color: #4b5563;
  }
  .cover-intro {
    font-size: 14px;
    line-height: 1.65;
    font-weight: 400;
    color: #4b5563;
  }
  .cover-recipient { margin-bottom: 5mm; }

  .page-full {
    display: block;
    padding: 14mm 18mm 15mm;
  }
  .full-media {
    max-height: 228mm;
    overflow: hidden;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    margin-bottom: 4mm;
  }

  .page-full > .slot-meta {
    max-height: 32mm;
    overflow: hidden;
  }

  .page-grid {
    height: 297mm;
    padding: 17mm 18mm 15mm;
  }
  .grid-inner {
    display: grid;
    width: 100%;
    height: 100%;
    align-items: start;
  }
  .grid-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8mm; }
  .grid-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 5mm; }
  .grid-slot { min-width: 0; }
  .grid-media {
    width: 100%;
    aspect-ratio: 3 / 4;
    overflow: hidden;
    background: #f4f4f2;
    margin-bottom: 4mm;
  }

  .page-side {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 80mm;
    gap: 13mm;
    padding: 20mm 18mm;
    align-items: center;
  }
  .side-image-frame,
  .bio-media {
    width: 100%;
    aspect-ratio: 3 / 4;
    overflow: hidden;
    background: #f4f4f2;
    margin-bottom: 4mm;
  }
  .side-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .side-quote {
    font-size: 14pt;
    line-height: 1.5;
    color: #374151;
    font-style: italic;
  }
  .side-copy {
    font-size: 13pt;
    line-height: 1.65;
    color: #374151;
  }

  .page-quote {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30mm 38mm;
  }
  .quote-wrap { max-width: 130mm; text-align: center; }
  .quote-text {
    font-size: 22pt;
    line-height: 1.6;
    font-weight: 400;
    font-style: italic;
    color: #6b7280;
    margin-bottom: 7mm;
  }
  .page-text .quote-wrap { text-align: left; }
  .page-text .quote-text {
    font-size: 14pt;
    font-style: normal;
    color: #374151;
  }
  .quote-author {
    margin-top: 3mm;
    font-size: 8pt;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #9ca3af;
  }

  .page-quote-full {
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);
    height: 297mm;
    padding: 18mm;
  }
  .quote-full-text {
    max-width: 120mm;
    margin: 0 auto 12mm;
    text-align: center;
  }
  .quote-full-text .quote-text { font-size: 16pt; }
  .quote-full-artwork {
    min-height: 0;
    display: block;
  }
  .quote-full-media {
    min-height: 0;
    max-height: 192mm;
    overflow: hidden;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    margin-bottom: 4mm;
  }
  .quote-full-artwork > .slot-meta {
    max-height: 32mm;
    overflow: hidden;
  }

  .page-bio {
    display: grid;
    grid-template-columns: 75mm minmax(0, 1fr);
    gap: 14mm;
    padding: 26mm 24mm;
    align-items: start;
  }
  .bio-artist {
    font-size: 8pt;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #9ca3af;
    font-weight: 600;
    margin-bottom: 5mm;
  }
  .bio-title {
    font-size: 11pt;
    line-height: 1.45;
    color: #374151;
    font-style: italic;
    margin-bottom: 8mm;
  }
  .bio-text {
    font-size: 10pt;
    line-height: 1.7;
    color: #4b5563;
  }

  .slot-img-natural {
    display: block;
    max-width: 100%;
    max-height: 228mm;
    width: auto;
    height: auto;
    object-fit: contain;
  }
  .quote-full-media .slot-img-natural { max-height: 192mm; }
  .slot-img-cover {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .slot-no-img {
    width: 100%;
    height: 100%;
    min-height: 60mm;
    background: #f4f4f2;
  }

  .slot-meta {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 8mm;
    width: 100%;
  }
  .meta-copy { min-width: 0; }
  .meta-artist,
  .meta-title,
  .meta-detail,
  .meta-price {
    font-size: 10pt;
    line-height: 1.25;
    color: #111827;
  }
  .meta-detail { color: #9ca3af; }
  .meta-artist { font-weight: 600 !important; }
  .meta-price { margin-top: 2mm; }
  .slot-meta-compact {
    display: block;
  }
  .slot-meta-compact .meta-artist,
  .slot-meta-compact .meta-title,
  .slot-meta-compact .meta-detail,
  .slot-meta-compact .meta-price {
    font-size: 9pt;
  }
  .slot-meta-tiny .meta-artist,
  .slot-meta-tiny .meta-title,
  .slot-meta-tiny .meta-detail,
  .slot-meta-tiny .meta-price {
    font-size: 8pt;
    line-height: 1.22;
  }
  .meta-inquire {
    display: inline-block;
    flex: 0 0 auto;
    font-size: 7pt;
    letter-spacing: 0.16em;
    color: #111111;
    text-decoration: none;
    border-bottom: 0.35pt solid #111111;
    padding-bottom: 0.5mm;
    margin-top: 1mm;
  }
  .slot-meta-compact .meta-inquire { margin-top: 2mm; }
</style>
</head>
<body>${pages}</body>
</html>`;
}
