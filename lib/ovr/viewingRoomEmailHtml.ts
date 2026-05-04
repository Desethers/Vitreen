import { client, urlFor } from '@/lib/ovr/sanityClient'

export interface PublishedSlot {
  image?: { asset?: { _ref: string } }
  title?: string
  artist?: string
  year?: string
  medium?: string
  dimensions?: string
  price?: string
  showPrice?: boolean
}

export interface PublishedBlock {
  _key: string
  blockType: string
  slots?: PublishedSlot[]
  quoteText?: string
  quoteAuthor?: string
  textStyle?: string
  showInquire?: boolean
  sideTextType?: string
}

export interface PublishedVR {
  title: string
  headline?: string
  galleryName?: string
  galleryAddress?: string
  galleryContact?: string
  recipientName?: string
  introText?: string
  blocks: PublishedBlock[]
}

const VR_QUERY = `*[_type == "viewingRoom" && token == $token && status == "active"][0]{
  title, headline, galleryName, galleryAddress, galleryContact,
  recipientName, introText,
  blocks[]{ _key, blockType, quoteText, quoteAuthor, textStyle, showInquire, sideTextType,
    slots[]{ image{ asset }, title, artist, year, medium, dimensions, price, showPrice }
  }
}`

export async function fetchPublishedViewingRoom(token: string): Promise<PublishedVR | null> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vr = await (client as any).fetch(VR_QUERY, { token })
  if (!vr) return null
  return {
    ...(vr as PublishedVR),
    blocks: Array.isArray(vr.blocks) ? vr.blocks : [],
  }
}

/** Pied de page tel que dans l’éditeur : priorité au payload client si les clés sont envoyées. */
export function mergePublishedVrFooterFromPayload(
  vr: PublishedVR,
  payload: { galleryName?: string; galleryAddress?: string; galleryContact?: string }
): PublishedVR {
  return {
    ...vr,
    galleryName:
      payload.galleryName !== undefined ? normalizeText(payload.galleryName) : normalizeText(vr.galleryName),
    galleryAddress:
      payload.galleryAddress !== undefined ? normalizeText(payload.galleryAddress) : normalizeText(vr.galleryAddress),
    galleryContact:
      payload.galleryContact !== undefined ? normalizeText(payload.galleryContact) : normalizeText(vr.galleryContact),
  }
}

function galleryFooterLinesHtml(galleryName: string, galleryAddress: string, galleryContact: string): string {
  const lines = [galleryName, galleryAddress, galleryContact].filter(Boolean)
  return lines
    .map(
      line =>
        `<p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.55;color:#94a3b8;text-transform:lowercase;font-weight:400;">${escapeHtml(line)}</p>`
    )
    .join('')
}

/** Bloc pied de page galerie + Vitreen (réutilisable si pas de doc Sanity). */
export function galleryFooterEmailSection(galleryName?: string, galleryAddress?: string, galleryContact?: string): string {
  const gn = normalizeText(galleryName)
  const ga = normalizeText(galleryAddress)
  const gc = normalizeText(galleryContact)
  const linesHtml = galleryFooterLinesHtml(gn, ga, gc)
  const gap = linesHtml ? `<p style="margin:0;line-height:18px;font-size:18px;">&nbsp;</p>` : ''

  return `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr><td style="border-top:1px solid #f1f5f9;padding:32px 24px 28px;text-align:center;background:#ffffff;">
    ${linesHtml}
    ${gap}
    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#d4d4d4;">Designed with care by <span style="font-weight:600;color:#a3a3a3;">Vitreen</span></p>
  </td></tr>
</table>`
}

export function extractTokenFromShareUrl(shareUrl: string): string | null {
  const trimmed = shareUrl.trim()
  if (!trimmed) return null
  try {
    const withProto = trimmed.includes('://') ? trimmed : `https://${trimmed}`
    const path = new URL(withProto).pathname
    const m = path.match(/\/vr\/([^/?#]+)/)
    return m?.[1] ?? null
  } catch {
    const m = trimmed.match(/\/vr\/([^/?#\s]+)/)
    return m?.[1] ?? null
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

/** Champs Sanity parfois non-string ; évite un footer vide silencieux. */
function normalizeText(value: unknown): string {
  if (value == null) return ''
  if (typeof value === 'string') return value.trim()
  return String(value).trim()
}

/** Largeur Sanity pour crops net sur écrans larges (l’affichage reste fluide en `width:100%`). */
const EMAIL_IMAGE_CROP_PAIR = 900
const EMAIL_IMAGE_CROP_TRIO = 600
const EMAIL_IMAGE_CROP_SIDE = 900

function slotImgUrl(
  slot: PublishedSlot,
  width = 900,
  height?: number,
  mode: 'max' | 'crop' = 'max',
): string | null {
  const ref = slot.image?.asset?._ref
  if (!ref) return null
  let builder = urlFor(slot.image as Parameters<typeof urlFor>[0]).width(width)
  if (height) builder = builder.height(height)
  if (mode === 'crop' && height) builder = builder.fit('crop').crop('center')
  else builder = builder.fit('max')
  return builder.url()
}

/** Métadonnées œuvre (Sanity peut renvoyer des types imprévus). */
function slotField(v: unknown): string {
  if (v == null) return ''
  if (typeof v === 'string') return v.trim()
  if (typeof v === 'number' && Number.isFinite(v)) return String(v)
  return String(v).trim()
}

function slotHasRenderableContent(slot: PublishedSlot): boolean {
  if (slotImgUrl(slot)) return true
  if (slotField(slot.artist)) return true
  if (slotField(slot.title)) return true
  if (slotField(slot.year)) return true
  if (slotField(slot.medium)) return true
  if (slotField(slot.dimensions)) return true
  return !!slot.showPrice && !!slotField(slot.price)
}

/**
 * Légende : `split` = une ligne (texte | INQUIRE) pour blocs pleine largeur ;
 * `stackInquireRight` = texte puis INQUIRE aligné à droite (colonnes trio/paire étroites, ProtonMail).
 */
function captionHtml(
  slot: PublishedSlot,
  showInquire: boolean | undefined,
  inquireHref: string,
  layout: 'split' | 'stackInquireRight' = 'split',
  /** Largeur explicite des légendes en colonnes étroites (évite les débordements Gmail). */
  columnInnerWidthPx?: number,
): string {
  const artist = slotField(slot.artist)
  const title = slotField(slot.title)
  const year = slotField(slot.year)
  const medium = slotField(slot.medium)
  const dimensions = slotField(slot.dimensions)
  const price = slotField(slot.price)

  const textBase =
    'padding:0 0 2px 0;margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.45;color:#171717;'
  const metaMuted =
    'padding:0 0 2px 0;margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.45;color:#737373;'
  const dimMuted =
    'padding:0 0 2px 0;margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.45;color:#a3a3a3;'

  const lineRows: string[] = []
  if (artist) {
    lineRows.push(
      `<tr><td align="left" valign="top" style="${textBase}font-weight:400;">${escapeHtml(artist)}</td></tr>`,
    )
  }
  if (title || year) {
    const titlePart = title ? `<em style="font-style:italic;font-weight:400;">${escapeHtml(title)}</em>` : ''
    const yearPart = year ? `${title ? ', ' : ''}${escapeHtml(year)}` : ''
    lineRows.push(`<tr><td align="left" valign="top" style="${textBase}font-weight:400;">${titlePart}${yearPart}</td></tr>`)
  }
  if (medium) {
    lineRows.push(`<tr><td align="left" valign="top" style="${metaMuted}font-weight:400;">${escapeHtml(medium)}</td></tr>`)
  }
  if (dimensions) {
    lineRows.push(`<tr><td align="left" valign="top" style="${dimMuted}font-weight:400;">${escapeHtml(dimensions)}</td></tr>`)
  }
  if (slot.showPrice && price) {
    lineRows.push(
      `<tr><td align="left" valign="top" style="padding:8px 0 0 0;margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.45;font-weight:400;color:#171717;">${escapeHtml(price)}</td></tr>`,
    )
  }

  const inquireHrefSafe = inquireHref.trim() || '#'
  const inquireBtn = `<a class="vr-inquire-hvr" href="${escapeHtml(inquireHrefSafe)}" style="display:inline-block;border:1px solid #111111;background-color:#ffffff;color:#111111;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;padding:8px 22px;text-decoration:none;line-height:1.2;mso-line-height-rule:exactly;">INQUIRE</a>`

  if (lineRows.length === 0 && !showInquire) return ''

  const linesTableHtml =
    columnInnerWidthPx != null
      ? `<table role="presentation" width="${columnInnerWidthPx}" cellpadding="0" cellspacing="0" border="0" style="margin:0;padding:0;table-layout:fixed;width:${columnInnerWidthPx}px;max-width:100%;">${lineRows.join('')}</table>`
      : `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0;padding:0;table-layout:fixed;">${lineRows.join('')}</table>`

  const wrapWAttr = columnInnerWidthPx != null ? `width="${columnInnerWidthPx}"` : 'width="100%"'
  const wrapStyleBase =
    columnInnerWidthPx != null
      ? `table-layout:fixed;width:${columnInnerWidthPx}px;max-width:100%;`
      : 'table-layout:fixed;width:100%;'

  if (!showInquire) {
    return `
<table role="presentation" ${wrapWAttr} cellpadding="0" cellspacing="0" border="0" style="margin-top:14px;${wrapStyleBase}">
  <tr><td valign="top" align="left" style="padding:0;word-wrap:break-word;">${linesTableHtml}</td></tr>
</table>`
  }

  if (layout === 'stackInquireRight') {
    return `
<table role="presentation" ${wrapWAttr} cellpadding="0" cellspacing="0" border="0" style="margin:0;${wrapStyleBase}">
  <tr><td valign="top" align="left" style="padding:0;word-wrap:break-word;">${lineRows.length ? linesTableHtml : '&nbsp;'}</td></tr>
  <tr><td valign="top" align="right" style="padding:12px 0 0;">${inquireBtn}</td></tr>
</table>`
  }

  return `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:14px;table-layout:fixed;width:100%;">
  <tr>
    <td valign="top" align="left" style="padding:0;padding-right:12px;word-wrap:break-word;">${lineRows.length ? linesTableHtml : '&nbsp;'}</td>
    <td width="140" valign="top" align="right" nowrap="nowrap" style="width:140px;vertical-align:top;padding:0;mso-padding-alt:0;">
  ${inquireBtn}
</td>
  </tr>
</table>`
}

function slotPlainCaption(slot: PublishedSlot): string {
  const artist = slotField(slot.artist)
  const title = slotField(slot.title)
  const year = slotField(slot.year)
  const medium = slotField(slot.medium)
  const dimensions = slotField(slot.dimensions)
  const price = slotField(slot.price)
  const bits: string[] = []
  if (artist) bits.push(artist)
  let ty = ''
  if (title) ty += title
  if (year) ty += (ty ? ', ' : '') + year
  if (ty) bits.push(ty)
  if (medium) bits.push(medium)
  if (dimensions) bits.push(dimensions)
  if (slot.showPrice && price) bits.push(price)
  return bits.join(' · ')
}

function worksPlainTextAppendix(vr: PublishedVR): string {
  const lines: string[] = []
  for (const block of vr.blocks) {
    if (!block.slots?.length) continue
    for (const slot of block.slots) {
      const line = slotPlainCaption(slot)
      if (line) lines.push(`• ${line}`)
    }
  }
  if (!lines.length) return ''
  return `\n\nLégendes\n${lines.join('\n')}`
}

function imgNatural(slot: PublishedSlot): string {
  const src = slotImgUrl(slot, 1600, undefined, 'max')
  if (!src)
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="table-layout:fixed;"><tr><td style="background:#f4f4f4;height:200px;line-height:0;">&nbsp;</td></tr></table>`
  const alt = escapeHtml(slot.title ?? '')
  return `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0;table-layout:fixed;width:100%;">
  <tr><td width="100%" align="center" style="width:100%;line-height:0;font-size:0;mso-line-height-rule:exactly;text-align:center;padding:0;">
    <img class="vr-email-fluid" src="${escapeHtml(src)}" alt="${alt}" width="1200" style="display:block;width:100%;max-width:100%;height:auto;border:0;outline:none;vertical-align:top;" />
  </td></tr>
</table>`
}

/**
 * Vignette 4:3 (crop Sanity).
 * `fluid` : largeur 100 % (hero / side) ; `false` : px fixes (grilles Gmail).
 */
function imgCoverCell(slot: PublishedSlot, width = 280, height = 210, fluid = true): string {
  const src = slotImgUrl(slot, width, height, 'crop')
  if (!src) {
    const wAttr = fluid ? 'width="100%" style="width:100%;table-layout:fixed;"' : `width="${width}" style="width:${width}px;table-layout:fixed;"`
    return `<table role="presentation" ${wAttr} cellpadding="0" cellspacing="0" border="0"><tr><td style="background:#f4f4f4;height:${height}px;line-height:0;font-size:0;">&nbsp;</td></tr></table>`
  }
  const alt = escapeHtml(slot.title ?? '')
  if (fluid) {
    return `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;table-layout:fixed;width:100%;max-width:${width}px;">
  <tr><td align="center" style="line-height:0;font-size:0;mso-line-height-rule:exactly;text-align:center;padding:0;">
    <img src="${escapeHtml(src)}" alt="${alt}" width="${width}" height="${height}" style="display:block;width:100%;max-width:${width}px;height:${height}px;border:0;outline:none;vertical-align:top;-ms-interpolation-mode:bicubic;" />
  </td></tr>
</table>`
  }
  return `
<table role="presentation" width="${width}" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;width:${width}px;table-layout:fixed;">
  <tr><td width="${width}" align="center" style="width:${width}px;line-height:0;font-size:0;mso-line-height-rule:exactly;text-align:center;padding:0;">
    <img src="${escapeHtml(src)}" alt="${alt}" width="${width}" height="${height}" style="display:block;width:${width}px;height:${height}px;border:0;outline:none;vertical-align:top;-ms-interpolation-mode:bicubic;" />
  </td></tr>
</table>`
}

/** Image 4:3 crop qui remplit la colonne (largeur du conteneur Gmail / client). */
function imgCoverCellColumnFluid(slot: PublishedSlot, cropW: number, cropH: number): string {
  const src = slotImgUrl(slot, cropW, cropH, 'crop')
  if (!src) {
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;table-layout:fixed;"><tr><td style="background:#f4f4f4;min-height:120px;line-height:0;font-size:0;">&nbsp;</td></tr></table>`
  }
  const alt = escapeHtml(slot.title ?? '')
  return `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0;width:100%;table-layout:fixed;">
  <tr><td align="center" style="line-height:0;font-size:0;mso-line-height-rule:exactly;text-align:center;padding:0;">
    <img src="${escapeHtml(src)}" alt="${alt}" width="${cropW}" height="${cropH}" style="display:block;width:100%;max-width:100%;height:auto;border:0;outline:none;vertical-align:top;-ms-interpolation-mode:bicubic;" />
  </td></tr>
</table>`
}

function pairBlockHtml(a: PublishedSlot, b: PublishedSlot, showInquire: boolean, inquireHref: string): string {
  const col = (slot: PublishedSlot) => `
<td width="50%" valign="top" style="width:50%;vertical-align:top;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;table-layout:fixed;margin:0 auto;">
    <tr><td align="center" style="padding:0;line-height:0;font-size:0;">${imgCoverCellColumnFluid(slot, EMAIL_IMAGE_CROP_PAIR, Math.round((EMAIL_IMAGE_CROP_PAIR * 3) / 4))}</td></tr>
    <tr><td align="left" style="padding:18px 0 0;">${captionHtml(slot, showInquire, inquireHref, 'stackInquireRight')}</td></tr>
  </table>
</td>`
  return `
<table role="presentation" width="100%" align="center" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:100%;table-layout:fixed;margin:0 auto 48px auto;">
  <tr>
    ${col(a)}
    <td width="12" style="width:12px;min-width:12px;font-size:0;line-height:0;">&nbsp;</td>
    ${col(b)}
  </tr>
</table>`
}

function trioThreeColCell(slot: PublishedSlot, showInquire: boolean, inquireHref: string, colIndex: number): string {
  const cropW = EMAIL_IMAGE_CROP_TRIO
  const cropH = Math.round((cropW * 3) / 4)
  const pad =
    colIndex === 0 ? 'padding:0 8px 0 0' : colIndex === 1 ? 'padding:0 4px' : 'padding:0 0 0 8px'
  return `
<td width="33%" valign="top" style="width:33%;vertical-align:top;${pad};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;table-layout:fixed;margin:0 auto;">
    <tr><td align="center" style="padding:0;line-height:0;font-size:0;">${imgCoverCellColumnFluid(slot, cropW, cropH)}</td></tr>
    <tr><td align="left" style="padding:18px 0 0;">${captionHtml(slot, showInquire, inquireHref, 'stackInquireRight')}</td></tr>
  </table>
</td>`
}

function trioTwoColCell(slot: PublishedSlot, showInquire: boolean, inquireHref: string): string {
  return `
<td width="50%" valign="top" style="width:50%;vertical-align:top;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;table-layout:fixed;margin:0 auto;">
    <tr><td align="center" style="padding:0;line-height:0;font-size:0;">${imgCoverCellColumnFluid(slot, EMAIL_IMAGE_CROP_PAIR, Math.round((EMAIL_IMAGE_CROP_PAIR * 3) / 4))}</td></tr>
    <tr><td align="left" style="padding:18px 0 0;">${captionHtml(slot, showInquire, inquireHref, 'stackInquireRight')}</td></tr>
  </table>
</td>`
}

function slotPublishedNatural(slot: PublishedSlot, showInquire: boolean | undefined, inquireHref: string): string {
  return `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 56px auto;table-layout:fixed;width:100%;">
  <tr><td style="padding:0;">${imgNatural(slot)}</td></tr>
  <tr><td style="padding:20px 0 0;">${captionHtml(slot, showInquire, inquireHref, 'split')}</td></tr>
</table>`
}

function slotsFilled(slots: PublishedSlot[] | undefined): PublishedSlot[] {
  return (slots ?? []).filter(slotHasRenderableContent)
}

function blockHtml(block: PublishedBlock, inquireHref: string): string {
  const si = !!block.showInquire

  if (block.blockType === 'quote') {
    const asText = block.textStyle === 'text'
    const pad = asText ? '40px 24px' : '48px 24px'
    const align = asText ? 'left' : 'center'
    const maxW = '100%'
    const quoteCls = asText
      ? 'font-family:Arial,sans-serif;font-size:16px;line-height:1.6;color:#333333;margin:0 0 12px;'
      : 'font-family:Georgia,serif;font-size:20px;line-height:1.55;font-style:italic;color:#444444;margin:0 0 12px;'
    const author =
      !asText && block.quoteAuthor
        ? `<p style="font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#888888;margin:0;">${escapeHtml(block.quoteAuthor)}</p>`
        : ''
    const body = block.quoteText ? `<p style="${quoteCls}">${escapeHtml(block.quoteText)}</p>` : ''
    return `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;">
  <tr><td align="${align}" style="padding:${pad};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:${maxW};margin:0 auto;">
      <tr><td align="${align}">${body}${author}</td></tr>
    </table>
  </td></tr>
</table>`
  }

  if (block.blockType === 'full') {
    const s = block.slots?.[0]
    return s ? slotPublishedNatural(s, si, inquireHref) : ''
  }

  if (block.blockType === 'pair') {
    const filled = slotsFilled(block.slots)
    if (filled.length <= 1) {
      return filled[0] ? slotPublishedNatural(filled[0], si, inquireHref) : ''
    }
    const [a, b] = filled
    return pairBlockHtml(a, b, si, inquireHref)
  }

  if (block.blockType === 'trio') {
    const filled = slotsFilled(block.slots)
    if (filled.length === 0) return ''
    if (filled.length === 1) return slotPublishedNatural(filled[0], si, inquireHref)
    const cols: 2 | 3 = filled.length >= 3 ? 3 : 2
    const slots = filled.slice(0, cols)
    const rowInner =
      cols === 3
        ? slots.map((s, i) => trioThreeColCell(s, si, inquireHref, i)).join('')
        : `${trioTwoColCell(slots[0]!, si, inquireHref)}<td width="12" style="width:12px;font-size:0;line-height:0;">&nbsp;</td>${trioTwoColCell(slots[1]!, si, inquireHref)}`
    return `
<table role="presentation" width="100%" align="center" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:100%;table-layout:fixed;margin:0 auto 48px auto;">
  <tr>${rowInner}</tr>
</table>`
  }

  if (block.blockType === 'side') {
    const s = block.slots?.[0]
    const asText = block.textStyle === 'text'
    const textCls = asText
      ? 'font-family:Arial,sans-serif;font-size:16px;line-height:1.55;color:#333333;margin:0;'
      : 'font-family:Arial,sans-serif;font-size:16px;line-height:1.55;font-style:italic;color:#444444;margin:0;'
    const imgSide = s
      ? `<table role="presentation" width="100%" align="center" cellpadding="0" cellspacing="0" border="0" style="width:100%;table-layout:fixed;margin:0 auto;">
  <tr><td align="center" style="padding:0;line-height:0;font-size:0;">${imgCoverCellColumnFluid(s, EMAIL_IMAGE_CROP_SIDE, Math.round((EMAIL_IMAGE_CROP_SIDE * 3) / 4))}</td></tr>
  <tr><td align="left" style="padding:18px 0 0;">${captionHtml(s, si, inquireHref, 'stackInquireRight')}</td></tr>
</table>`
      : ''
    const txt = block.quoteText ? `<p style="${textCls}">${escapeHtml(block.quoteText)}</p>` : ''
    return `
<table role="presentation" width="100%" align="center" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:100%;table-layout:fixed;margin:0 auto 48px auto;">
  <tr>
    <td width="50%" valign="middle" style="width:50%;padding:0 16px 0 0;vertical-align:middle;">${imgSide}</td>
    <td width="16" style="width:16px;min-width:16px;font-size:0;line-height:0;">&nbsp;</td>
    <td width="50%" valign="middle" style="width:50%;vertical-align:middle;">${txt}</td>
  </tr>
</table>`
  }

  if (block.blockType === 'quotefull') {
    const s = block.slots?.[0]
    const quoteTop =
      block.quoteText || block.quoteAuthor
        ? `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr><td align="center" style="padding:0 16px 40px;">
    ${block.quoteText ? `<p style="font-family:Arial,sans-serif;font-size:20px;line-height:1.45;font-style:italic;color:#444444;margin:0 0 12px;">${escapeHtml(block.quoteText)}</p>` : ''}
    ${block.quoteAuthor ? `<p style="font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#888888;margin:0;">${escapeHtml(block.quoteAuthor)}</p>` : ''}
  </td></tr>
</table>`
        : ''
    const imgPart = s ? slotPublishedNatural(s, si, inquireHref) : ''
    return `${quoteTop}${imgPart}`
  }

  if (block.blockType === 'imgbio') {
    const s = block.slots?.[0]
    const src = s ? slotImgUrl(s) : null
    const title = s ? slotField(s.title) : ''
    const year = s ? slotField(s.year) : ''
    const artist = s ? slotField(s.artist) : ''
    const medium = s ? slotField(s.medium) : ''
    const dimensions = s ? slotField(s.dimensions) : ''
    const price = s ? slotField(s.price) : ''
    const imgBio = src
      ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="table-layout:fixed;width:100%;"><tr><td style="line-height:0;font-size:0;">
<img class="vr-email-fluid" src="${escapeHtml(src)}" alt="${escapeHtml(title)}" width="480" style="display:block;width:100%;max-width:100%;height:auto;border:0;vertical-align:top;" />
</td></tr></table>`
      : `<div style="background:#f4f4f4;width:100%;min-height:200px;"></div>`
    const meta = [
      artist
        ? `<p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#888888;">${escapeHtml(artist)}</p>`
        : '',
      title || year
        ? `<p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-style:italic;color:#444444;">${title ? `<em>${escapeHtml(title)}</em>` : ''}${year ? `${title ? ', b. ' : ''}${escapeHtml(year)}` : ''}</p>`
        : '',
      medium
        ? `<p style="margin:0 0 2px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.45;color:#737373;">${escapeHtml(medium)}</p>`
        : '',
      dimensions
        ? `<p style="margin:0 0 12px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.45;color:#a3a3a3;">${escapeHtml(dimensions)}</p>`
        : '',
      s?.showPrice && price
        ? `<p style="margin:0 0 12px;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#171717;">${escapeHtml(price)}</p>`
        : '',
      block.quoteText
        ? `<p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.55;color:#666666;">${escapeHtml(block.quoteText)}</p>`
        : '',
    ].join('')
    return `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:48px;">
  <tr>
    <td width="50%" valign="top" style="padding-right:24px;">${imgBio}</td>
    <td width="50%" valign="top" style="padding-top:16px;">${meta}</td>
  </tr>
</table>`
  }

  return ''
}

export function buildPlainTextFallback(vr: PublishedVR, shareUrl: string, recipientName: string): string {
  const greeting = recipientName.trim() ? `Hello ${recipientName.trim()},` : 'Hello,'
  const intro = normalizeText(vr.introText) ? `\n\n${normalizeText(vr.introText)}\n` : ''
  const legends = worksPlainTextAppendix(vr)
  const foot = [normalizeText(vr.galleryName), normalizeText(vr.galleryAddress), normalizeText(vr.galleryContact)]
    .filter(Boolean)
    .join('\n')
  const footBlock = foot ? `\n\n${foot}` : ''
  return `${greeting}${intro}\n\nVoir la viewing room en ligne :\n${shareUrl}${legends}${footBlock}\n\nDesigned with care by Vitreen`
}

/** Corps HTML — mise en page proche du preview / page publique (tables + styles inline pour clients mail). */
export function buildViewingRoomEmailHtml(vr: PublishedVR, shareUrl: string): string {
  const galleryName = normalizeText(vr.galleryName)
  const galleryAddress = normalizeText(vr.galleryAddress)
  const galleryContact = normalizeText(vr.galleryContact)

  const headline = escapeHtml(normalizeText(vr.headline) || 'Viewing Room')
  const title = normalizeText(vr.title)
  const subtitle = title
    ? `<p style="margin:0 0 16px;font-family:Arial,sans-serif;font-size:24px;line-height:1.2;color:#999999;">${escapeHtml(title)}</p>`
    : ''
  const galleryLine = galleryName
    ? `<p style="margin:0 0 24px;font-family:Arial,sans-serif;font-size:9px;letter-spacing:0.3em;text-transform:uppercase;color:#888888;">${escapeHtml(galleryName)}</p>`
    : ''
  const recipient = normalizeText(vr.recipientName)
  const recipientLine = recipient
    ? `<p style="margin:0 0 12px;font-family:Arial,sans-serif;font-size:12px;color:#777777;">For ${escapeHtml(recipient)}</p>`
    : ''
  const intro = normalizeText(vr.introText)
  const introLine = intro
    ? `<p style="margin:16px 0 0;font-family:Arial,sans-serif;font-size:14px;line-height:1.55;color:#111111;white-space:pre-wrap;">${escapeHtml(intro)}</p>`
    : ''

  const blocksInner = vr.blocks.map(b => blockHtml(b, shareUrl)).join('\n')

  const footer = galleryFooterEmailSection(galleryName, galleryAddress, galleryContact)

  const shareRoomCta = `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td align="center" style="padding:28px 24px 8px;text-align:center;">
      <p style="margin:0 0 14px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.45;color:#64748b;">
        Ouvrez la viewing room en plein navigateur pour une expérience optimale.
      </p>
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin:0 auto;">
        <tr>
          <td align="center" bgcolor="#111111" style="border-radius:2px;background-color:#111111;mso-padding-alt:0;">
            <a class="vr-room-cta" href="${escapeHtml(shareUrl)}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:16px 36px;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:#ffffff;text-decoration:none;line-height:1.25;mso-line-height-rule:exactly;border:1px solid #111111;">
              Ouvrir en pleine page
            </a>
          </td>
        </tr>
      </table>
      <p style="margin:16px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.4;color:#94a3b8;word-break:break-all;">
        <a href="${escapeHtml(shareUrl)}" target="_blank" rel="noopener noreferrer" style="color:#64748b;text-decoration:underline;">${escapeHtml(shareUrl)}</a>
      </p>
    </td>
  </tr>
</table>`

  return `
<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<style type="text/css">
  /* Gmail / WebView : le conteneur message a parfois une largeur implicite ; on force l’usage de toute la zone. */
  html, body { width: 100% !important; min-width: 100% !important; margin: 0 !important; padding: 0 !important; }
  #MessageViewBody, #MessageWebViewDiv { width: 100% !important; max-width: 100% !important; }
  .ExternalClass { width: 100%; }
  img.vr-email-fluid { max-width: 100% !important; height: auto !important; }
  a.vr-inquire-hvr { transition: background-color .15s ease, color .15s ease; }
  a.vr-inquire-hvr:hover { background-color: #111111 !important; color: #ffffff !important; border-color: #111111 !important; }
  a.vr-room-cta { transition: background-color .15s ease, color .15s ease, border-color .15s ease; }
  a.vr-room-cta:hover { background-color: #000000 !important; border-color: #000000 !important; color: #ffffff !important; }
</style>
</head>
<body class="vr-mail-body" style="margin:0 !important;padding:0 !important;width:100% !important;min-width:100% !important;background:#ffffff;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100% !important;min-width:100% !important;background:#ffffff;border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;">
  <tr>
    <td width="100%" align="left" valign="top" style="width:100% !important;min-width:100% !important;padding:0;margin:0;background:#ffffff;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100% !important;min-width:100% !important;background:#ffffff;border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;">
      <tr><td style="padding:48px 24px 24px;text-align:left;">
        ${galleryLine}
        <h1 style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:24px;line-height:1.2;font-weight:400;color:#111111;">${headline}</h1>
        ${subtitle}
        ${recipientLine}
        ${introLine}
      </td></tr>
      ${shareRoomCta}
      <tr><td style="border-top:1px solid #eeeeee;"></td></tr>
      <tr><td style="padding:40px 24px 32px;">
        ${blocksInner}
      </td></tr>
      ${footer}
      </table>
    </td>
  </tr>
</table>
</body></html>`
}
