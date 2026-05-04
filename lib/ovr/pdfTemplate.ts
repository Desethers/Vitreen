import type { Block, ImageItem, VrSetup } from './buildTypes'

function escapePdfHtml(s: string): string {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function resolveImage(slot: { imageId: string | null }, images: ImageItem[]): ImageItem | null {
  if (!slot.imageId) return null
  return images.find(i => i.id === slot.imageId) ?? null
}

/** Aligné sur la preview : INQUIRE visible si la case « masquer » n’est pas active. */
function blockShowsInquire(block: Block): boolean {
  return !block.inquireHidden
}

function inquireLinkHtml(href: string): string {
  if (!href.trim()) return ''
  return `<div class="meta-inquire"><a href="${escapePdfHtml(href)}">INQUIRE</a></div>`
}

function metaHtml(
  img: ImageItem | null,
  opts: { showInquire?: boolean; inquireHref?: string } = {},
): string {
  if (!img) return ''
  const { showInquire = false, inquireHref = '' } = opts
  const inq = showInquire && inquireHref.trim() ? inquireLinkHtml(inquireHref) : ''
  return `
    <div class="slot-meta">
      ${img.artist ? `<p class="meta-artist">${escapePdfHtml(img.artist)}</p>` : ''}
      ${img.title ? `<p class="meta-title"><em>${escapePdfHtml(img.title)}</em>${img.year ? `, ${escapePdfHtml(img.year)}` : ''}</p>` : ''}
      ${img.medium ? `<p class="meta-detail">${escapePdfHtml(img.medium)}</p>` : ''}
      ${img.dimensions ? `<p class="meta-detail">${escapePdfHtml(img.dimensions)}</p>` : ''}
      ${img.showPrice && img.price ? `<p class="meta-price">${escapePdfHtml(img.price)}</p>` : ''}
      ${inq}
    </div>`
}

function imgHtml(img: ImageItem | null, cls = 'slot-img') {
  return img?.dataUrl
    ? `<img src="${img.dataUrl}" class="${cls}" />`
    : '<div class="slot-no-img"></div>'
}

function blockHtml(block: Block, images: ImageItem[], inquireHref: string): string {
  const inq = blockShowsInquire(block)
  const metaOpts = { showInquire: inq, inquireHref }

  if (block.type === 'quote') {
    return `
      <div class="page page-quote">
        <div class="quote-wrap">
          <p class="quote-text">${escapePdfHtml(block.quoteText)}</p>
          ${block.quoteAuthor ? `<p class="quote-author">${escapePdfHtml(block.quoteAuthor)}</p>` : ''}
        </div>
      </div>`
  }

  if (block.type === 'full') {
    const img = resolveImage(block.slots[0] ?? { imageId: null }, images)
    return `
      <div class="page page-full">
        <div class="slot-image">${imgHtml(img)}</div>
        ${metaHtml(img, metaOpts)}
      </div>`
  }

  if (block.type === 'pair') {
    const imgs = block.slots.map(s => resolveImage(s, images))
    return `
      <div class="page page-grid page-pair">
        ${imgs.map(img => `<div class="grid-slot"><div class="slot-image">${imgHtml(img)}</div>${metaHtml(img, metaOpts)}</div>`).join('')}
      </div>`
  }

  if (block.type === 'trio') {
    const imgs = block.slots.map(s => resolveImage(s, images))
    return `
      <div class="page page-grid page-trio">
        ${imgs.map(img => `<div class="grid-slot"><div class="slot-image">${imgHtml(img)}</div>${metaHtml(img, metaOpts)}</div>`).join('')}
      </div>`
  }

  if (block.type === 'side') {
    const img = resolveImage(block.slots[0] ?? { imageId: null }, images)
    return `
      <div class="page page-side">
        <div class="side-image">${imgHtml(img)}</div>
        <div class="side-text">
          ${metaHtml(img, metaOpts)}
          ${block.quoteText ? `<p class="side-quote">${escapePdfHtml(block.quoteText)}</p>` : ''}
        </div>
      </div>`
  }

  return ''
}

export function generateBlocksPDF({
  blocks,
  images,
  setup,
  inquireHref = '',
}: {
  blocks: Block[]
  images: ImageItem[]
  setup: VrSetup | null
  inquireHref?: string
}): string {
  const cover = `
    <div class="page page-cover">
      <div class="cover-inner">
        <p class="cover-gallery">${escapePdfHtml(setup?.galleryName ?? 'Viewing Room')}</p>
        <h1 class="cover-title">Viewing Room</h1>
        ${setup?.recipientName ? `<p class="cover-recipient">Pour ${escapePdfHtml(setup.recipientName)}</p>` : ''}
        ${setup?.introText ? `<p class="cover-intro">${escapePdfHtml(setup.introText)}</p>` : ''}
      </div>
    </div>`

  const pages = [cover, ...blocks.map(b => blockHtml(b, images, inquireHref))].join('\n')

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  @page { size: A4; margin: 0; }
  body { font-family: 'Georgia', serif; background: white; color: #1a1a1a; }

  .page { width: 210mm; min-height: 297mm; page-break-after: always; background: white; overflow: hidden; }

  /* Cover */
  .page-cover { display: flex; align-items: center; justify-content: center; padding: 40mm; }
  .cover-inner { text-align: center; max-width: 120mm; }
  .cover-gallery { font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 9pt; letter-spacing: 0.25em; text-transform: uppercase; color: #999; margin-bottom: 14mm; }
  .cover-title { font-family: 'Georgia', serif; font-size: 30pt; font-weight: normal; color: #1a1a1a; margin-bottom: 10mm; }
  .cover-recipient { font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 10pt; color: #666; margin-bottom: 8mm; }
  .cover-intro { font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 10pt; color: #777; line-height: 1.6; }

  /* Full */
  .page-full { display: flex; flex-direction: column; padding: 18mm 18mm 14mm; }
  .page-full .slot-image { flex: 1; display: flex; align-items: center; justify-content: center; margin-bottom: 10mm; }

  /* Grid */
  .page-grid { display: flex; flex-direction: row; gap: 8mm; padding: 18mm; align-items: flex-start; }
  .grid-slot { flex: 1; }
  .page-grid .slot-image { aspect-ratio: 3/4; display: flex; align-items: center; justify-content: center; margin-bottom: 5mm; }

  /* Side */
  .page-side { display: flex; flex-direction: row; min-height: 297mm; }
  .side-image { flex: 1; display: flex; align-items: center; justify-content: center; background: #fafaf8; padding: 14mm; }
  .side-text { width: 80mm; padding: 20mm 14mm; display: flex; flex-direction: column; justify-content: center; gap: 8mm; border-left: 0.5px solid #eee; }
  .side-quote { font-family: 'Georgia', serif; font-size: 11pt; color: #444; line-height: 1.7; font-style: italic; }

  /* Quote */
  .page-quote { display: flex; align-items: center; justify-content: center; padding: 30mm 40mm; }
  .quote-wrap { text-align: center; }
  .quote-text { font-family: 'Georgia', serif; font-size: 18pt; font-weight: normal; font-style: italic; color: #2a2a2a; line-height: 1.6; margin-bottom: 8mm; }
  .quote-author { font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 9pt; letter-spacing: 0.1em; color: #999; }

  /* Shared */
  .slot-img { max-width: 100%; max-height: 100%; object-fit: contain; }
  .slot-no-img { width: 100%; height: 100%; background: #f5f5f0; min-height: 60mm; }
  .slot-meta { border-top: 0.5px solid #e8e8e0; padding-top: 4mm; }
  .meta-artist { font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 8pt; letter-spacing: 0.15em; text-transform: uppercase; color: #999; margin-bottom: 2mm; }
  .meta-title { font-family: 'Georgia', serif; font-size: 11pt; color: #1a1a1a; margin-bottom: 1.5mm; }
  .meta-detail { font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 8.5pt; color: #777; margin-bottom: 1mm; }
  .meta-price { font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 9pt; color: #1a1a1a; margin-top: 2mm; }
  /* Lien cliquable dans le PDF (annotations), style bouton */
  .meta-inquire { margin-top: 4mm; }
  .meta-inquire a {
    display: inline-block;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-size: 7.5pt;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #111111;
    text-decoration: none;
    border: 0.35pt solid #111111;
    padding: 2.2mm 5mm;
  }
</style>
</head>
<body>${pages}</body>
</html>`
}
