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

function slotImgUrl(slot: PublishedSlot, width = 900): string | null {
  const ref = slot.image?.asset?._ref
  if (!ref) return null
  return urlFor(slot.image as Parameters<typeof urlFor>[0]).width(width).fit('max').url()
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

/** Gmail / Apple Mail : éviter `<p>` (styles parfois ignorés ou « premier paragraphe » en gras) ; largeurs en attributs pour Outlook. */
function captionHtml(
  slot: PublishedSlot,
  showInquire: boolean | undefined,
  inquireHref: string,
  inquirePlacement: 'split' | 'stacked' = 'split',
): string {
  const artist = slotField(slot.artist)
  const title = slotField(slot.title)
  const year = slotField(slot.year)
  const medium = slotField(slot.medium)
  const dimensions = slotField(slot.dimensions)
  const price = slotField(slot.price)

  const textBase =
    'margin:0 0 2px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.45;color:#171717;'
  const metaMuted = 'margin:0 0 2px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.45;color:#737373;'
  const dimMuted = 'margin:0 0 2px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.45;color:#a3a3a3;'

  const lines: string[] = []
  if (artist) {
    lines.push(
      `<div style="${textBase}font-weight:normal !important;"><span style="font-weight:normal !important;">${escapeHtml(artist)}</span></div>`,
    )
  }
  if (title || year) {
    const titlePart = title ? `<em style="font-style:italic;font-weight:400;">${escapeHtml(title)}</em>` : ''
    const yearPart = year ? `${title ? ', ' : ''}${escapeHtml(year)}` : ''
    lines.push(`<div style="${textBase}font-weight:400;">${titlePart}${yearPart}</div>`)
  }
  if (medium) {
    lines.push(`<div style="${metaMuted}font-weight:400;">${escapeHtml(medium)}</div>`)
  }
  if (dimensions) {
    lines.push(`<div style="${dimMuted}font-weight:400;">${escapeHtml(dimensions)}</div>`)
  }
  if (slot.showPrice && price) {
    lines.push(
      `<div style="margin:8px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.45;font-weight:400;color:#171717;">${escapeHtml(price)}</div>`,
    )
  }

  const inquireHrefSafe = inquireHref.trim() || '#'
  const inquireBtn = `<a class="vr-inquire-hvr" href="${escapeHtml(inquireHrefSafe)}" style="display:inline-block;border:1px solid #111111;background-color:#ffffff;color:#111111;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;padding:8px 22px;text-decoration:none;line-height:1.2;mso-line-height-rule:exactly;">INQUIRE</a>`

  if (lines.length === 0 && !showInquire) return ''

  if (showInquire && inquirePlacement === 'stacked') {
    return `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:10px;table-layout:fixed;">
  <tr><td align="left" valign="top" style="padding:0;">${lines.join('')}</td></tr>
  <tr><td align="center" valign="top" style="padding:10px 0 0;">${inquireBtn}</td></tr>
</table>`
  }

  if (!showInquire) {
    return `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:10px;table-layout:fixed;">
  <tr><td valign="top" align="left" style="padding:0;word-wrap:break-word;">${lines.join('')}</td></tr>
</table>`
  }

  return `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:10px;table-layout:fixed;">
  <tr>
    <td width="70%" valign="top" align="left" style="width:70%;padding:0;word-wrap:break-word;overflow-wrap:break-word;">${lines.join('')}</td>
    <td width="30%" valign="top" align="right" nowrap="nowrap" style="width:30%;vertical-align:top;padding:0 0 0 8px;mso-padding-alt:0 0 0 8px;">
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
  const src = slotImgUrl(slot)
  if (!src) return `<div style="background:#f4f4f4;height:200px;max-width:100%;"></div>`
  const alt = escapeHtml(slot.title ?? '')
  return `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="table-layout:fixed;width:100%;max-width:600px;">
  <tr><td style="line-height:0;font-size:0;mso-line-height-rule:exactly;">
    <img class="vr-email-fluid" src="${escapeHtml(src)}" alt="${alt}" width="560" style="display:block;width:100%;max-width:100%;height:auto;border:0;outline:none;vertical-align:top;" />
  </td></tr>
</table>`
}

/** Image pleine largeur type grille pair/trio (aperçu cover 4:3). */
function imgCoverCell(slot: PublishedSlot): string {
  const src = slotImgUrl(slot)
  if (!src) return `<div style="background:#f4f4f4;height:180px;width:100%;max-width:280px;"></div>`
  const alt = escapeHtml(slot.title ?? '')
  return `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="table-layout:fixed;width:100%;max-width:280px;">
  <tr><td style="line-height:0;font-size:0;mso-line-height-rule:exactly;width:100%;max-width:280px;">
    <img class="vr-email-fluid" src="${escapeHtml(src)}" alt="${alt}" width="280" style="display:block;width:100%;max-width:280px;height:auto;border:0;outline:none;vertical-align:top;-ms-interpolation-mode:bicubic;" />
  </td></tr>
</table>`
}

function pairCell(slot: PublishedSlot, showInquire: boolean, gutter: 'left' | 'right' | 'none', inquireHref: string): string {
  const pad = gutter === 'left' ? 'padding-left:12px;' : gutter === 'right' ? 'padding-right:12px;' : ''
  return `
<td width="50%" valign="top" style="width:50%;max-width:50%;box-sizing:border-box;${pad}">
  ${imgCoverCell(slot)}
  ${captionHtml(slot, showInquire, inquireHref, 'stacked')}
</td>`
}

function slotPublishedNatural(slot: PublishedSlot, showInquire: boolean | undefined, inquireHref: string): string {
  return `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;table-layout:fixed;">
  <tr><td style="max-width:100%;">${imgNatural(slot)}${captionHtml(slot, showInquire, inquireHref, 'split')}</td></tr>
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
    const maxW = asText ? '560px' : '420px'
    const quoteCls = asText
      ? 'font-family:Arial,sans-serif;font-size:16px;line-height:1.6;color:#333333;margin:0 0 12px;'
      : 'font-family:Georgia,serif;font-size:20px;line-height:1.55;font-style:italic;color:#444444;margin:0 0 12px;'
    const author =
      !asText && block.quoteAuthor
        ? `<p style="font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#888888;margin:0;">${escapeHtml(block.quoteAuthor)}</p>`
        : ''
    const body = block.quoteText ? `<p style="${quoteCls}">${escapeHtml(block.quoteText)}</p>` : ''
    return `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:8px;">
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
    return `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;table-layout:fixed;">
  <tr>
    ${pairCell(a, si, 'right', inquireHref)}
    ${pairCell(b, si, 'left', inquireHref)}
  </tr>
</table>`
  }

  if (block.blockType === 'trio') {
    const filled = slotsFilled(block.slots)
    if (filled.length === 0) return ''
    if (filled.length === 1) return slotPublishedNatural(filled[0], si, inquireHref)
    const cols = filled.length >= 3 ? 3 : 2
    const cells = filled.slice(0, cols).map(s => `
<td width="${Math.floor(100 / cols)}%" valign="top" style="width:${Math.floor(100 / cols)}%;max-width:${Math.floor(100 / cols)}%;box-sizing:border-box;padding:0 6px;">
  ${imgCoverCell(s)}
  ${captionHtml(s, si, inquireHref, 'stacked')}
</td>`).join('')
    return `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;table-layout:fixed;">
  <tr>${cells}</tr>
</table>`
  }

  if (block.blockType === 'side') {
    const s = block.slots?.[0]
    const asText = block.textStyle === 'text'
    const textCls = asText
      ? 'font-family:Arial,sans-serif;font-size:16px;line-height:1.55;color:#333333;margin:0;'
      : 'font-family:Arial,sans-serif;font-size:16px;line-height:1.55;font-style:italic;color:#444444;margin:0;'
    const imgSide = s
      ? `${imgCoverCell(s)}${captionHtml(s, si, inquireHref)}`
      : ''
    const txt = block.quoteText ? `<p style="${textCls}">${escapeHtml(block.quoteText)}</p>` : ''
    return `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
  <tr>
    <td width="50%" valign="middle" style="padding-right:16px;">${imgSide}</td>
    <td width="50%" valign="middle" style="padding-left:16px;">${txt}</td>
  </tr>
</table>`
  }

  if (block.blockType === 'quotefull') {
    const s = block.slots?.[0]
    const quoteTop =
      block.quoteText || block.quoteAuthor
        ? `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr><td align="center" style="padding:0 16px 24px;">
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
      ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="table-layout:fixed;max-width:240px;"><tr><td style="line-height:0;font-size:0;">
<img class="vr-email-fluid" src="${escapeHtml(src)}" alt="${escapeHtml(title)}" width="240" style="display:block;width:100%;max-width:240px;height:auto;border:0;vertical-align:top;" />
</td></tr></table>`
      : `<div style="background:#f4f4f4;max-width:240px;width:100%;height:320px;"></div>`
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
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
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

  const linkTopRight = `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr><td style="padding:16px 24px 0;text-align:right;">
    <a href="${escapeHtml(shareUrl)}" style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#6b7280;text-decoration:none;word-break:break-all;display:inline-flex;align-items:flex-start;gap:4px;">
      <span>${escapeHtml(shareUrl)}</span>
      <span style="font-size:11px;line-height:1;position:relative;top:-1px;">↗</span>
    </a>
  </td></tr>
</table>`

  return `
<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<style type="text/css">
  img.vr-email-fluid { max-width:100% !important; height:auto !important; }
  a.vr-inquire-hvr { transition: background-color .15s ease, color .15s ease; }
  a.vr-inquire-hvr:hover { background-color:#111111 !important; color:#ffffff !important; border-color:#111111 !important; }
</style>
</head>
<body style="margin:0;padding:0;background:#f6f6f6;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background:#f6f6f6;">
  <tr><td align="center" style="padding:0;margin:0;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:0;overflow:hidden;box-shadow:none;">
      <tr><td style="padding:48px 24px 24px;text-align:left;">
        ${galleryLine}
        <h1 style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:24px;line-height:1.2;font-weight:400;color:#111111;">${headline}</h1>
        ${subtitle}
        ${recipientLine}
        ${introLine}
      </td></tr>
      ${linkTopRight}
      <tr><td style="border-top:1px solid #eeeeee;"></td></tr>
      <tr><td style="padding:28px 24px 16px;">
        ${blocksInner}
      </td></tr>
      ${footer}
    </table>
  </td></tr>
</table>
</body></html>`
}
