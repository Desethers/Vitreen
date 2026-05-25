import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import {
  buildPlainTextFallback,
  buildViewingRoomEmailHtml,
  extractTokenFromShareUrl,
  fetchPublishedViewingRoom,
  galleryFooterEmailSection,
  mergePublishedVrFooterFromPayload,
} from '@/lib/ovr/viewingRoomEmailHtml'

type ShareEmailPayload = {
  recipientEmail?: string
  recipientName?: string
  galleryName?: string
  galleryAddress?: string
  galleryContact?: string
  introText?: string
  shareUrl?: string
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

const OVR_FROM_FORMAT_HINT =
  'In Vercel, the OVR_EMAIL_FROM variable must be either a single address (for example noreply.com), or "Name <address@domain>" with ASCII angle brackets < >, no smart quotes, no &lt;…&gt;, and no line breaks.'

/** Valide / normalise l’expéditeur attendu par Resend (`email@x` ou `Name <email@x>`). */
function normalizeResendFrom(raw: string): { ok: true; from: string } | { ok: false } {
  let s = raw.trim()
  if (!s) return { ok: false }

  s = s.replace(/\u00a0/g, ' ')
  s = s.replace(/[＜﹤‹«]/g, '<').replace(/[＞﹥›»]/g, '>')
  s = s.replace(/&lt;/gi, '<').replace(/&gt;/gi, '>').replace(/&amp;/gi, '&')
  s = s.replace(/\r?\n/g, ' ').replace(/\s+/g, ' ')

  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    s = s.slice(1, -1).trim()
  }

  const simpleEmail = (e: string) => {
    const t = e.trim()
    if (!t || /\s/.test(t)) return false
    const parts = t.split('@')
    if (parts.length !== 2 || !parts[0] || !parts[1] || !parts[1].includes('.')) return false
    return true
  }

  if (!s.includes('<')) {
    if (simpleEmail(s)) return { ok: true, from: s }
    return { ok: false }
  }

  const m = /^(.+?)\s*<\s*([^>]+)\s*>\s*$/.exec(s)
  if (!m) return { ok: false }
  const displayName = m[1].trim().replace(/^["'«»]+|["'«»]+$/g, '')
  const email = m[2].trim()
  if (!simpleEmail(email)) return { ok: false }
  if (!displayName) return { ok: true, from: email }
  return { ok: true, from: `${displayName} <${email}>` }
}

export async function POST(req: NextRequest) {
  try {
    const key = process.env.RESEND_API_KEY
    if (!key) {
      return NextResponse.json({ error: 'Email service not configured.' }, { status: 500 })
    }

    const body = (await req.json()) as ShareEmailPayload
    const recipientEmail = body.recipientEmail?.trim()
    const shareUrl = body.shareUrl?.trim()
    const recipientName = body.recipientName?.trim() || ''
    const galleryName = body.galleryName?.trim() || 'Viewing Room Studio'
    const introText = body.introText?.trim() || ''

    if (!recipientEmail || !recipientEmail.includes('@')) {
      return NextResponse.json({ error: 'A valid recipient email is required.' }, { status: 400 })
    }
    if (!shareUrl) {
      return NextResponse.json({ error: 'Share link is required.' }, { status: 400 })
    }

    const token = extractTokenFromShareUrl(shareUrl)
    let vrPublished = null as Awaited<ReturnType<typeof fetchPublishedViewingRoom>>
    if (token) {
      try {
        vrPublished = await fetchPublishedViewingRoom(token)
      } catch (fetchErr) {
        // Ne bloque pas l'envoi mail si Sanity est indisponible ponctuellement.
        console.error('Share email fetchPublishedViewingRoom error:', fetchErr)
      }
    }

    const greeting = `Hello${recipientName ? ` ${recipientName}` : ''},`

    let htmlBody: string
    let textBody: string
    let subjectBrand = galleryName

    const footerPayload = {
      galleryName: body.galleryName,
      galleryAddress: body.galleryAddress,
      galleryContact: body.galleryContact,
    }

    if (vrPublished) {
      const vrMerged = mergePublishedVrFooterFromPayload(vrPublished, footerPayload)
      subjectBrand = vrMerged.galleryName?.trim() || galleryName
      htmlBody = buildViewingRoomEmailHtml(vrMerged, shareUrl)
      textBody = buildPlainTextFallback(vrMerged, shareUrl, recipientName)
    } else {
      const footLines = [body.galleryName, body.galleryAddress, body.galleryContact]
        .map(s => s?.trim())
        .filter(Boolean)
        .join('\n')
      textBody = `${greeting}

${introText ? `${introText}

` : ''}View the viewing room:
${shareUrl}${footLines ? `\n\n${footLines}` : ''}

Designed with care by Viewing Room Studio`

      htmlBody = `
<!DOCTYPE html>
<html lang="fr"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<style type="text/css">
  html, body { width: 100% !important; min-width: 100% !important; margin: 0 !important; padding: 0 !important; }
  #MessageViewBody, #MessageWebViewDiv { width: 100% !important; max-width: 100% !important; }
  .ExternalClass { width: 100%; }
</style>
</head>
<body style="margin:0 !important;padding:0 !important;width:100% !important;min-width:100% !important;background:#f6f6f6;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100% !important;min-width:100% !important;background:#f6f6f6;border-collapse:collapse;">
  <tr>
    <td width="100%" align="left" valign="top" style="width:100% !important;min-width:100% !important;padding:0;margin:0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100% !important;min-width:100% !important;background:#ffffff;border-collapse:collapse;">
      <tr><td style="padding:40px 24px;">
        <p style="margin:0 0 12px;font-family:Arial,sans-serif;font-size:14px;color:#111111;">${escapeHtml(greeting)}</p>
        ${introText ? `<p style="margin:0 0 16px;font-family:Arial,sans-serif;font-size:14px;color:#333333;">${escapeHtml(introText).replaceAll('\n', '<br>')}</p>` : ''}
        <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:13px;color:#555555;">Viewing room link:</p>
        <p style="margin:0;"><a href="${escapeHtml(shareUrl)}" style="font-family:Arial,sans-serif;font-size:13px;color:#111111;text-decoration:underline;word-break:break-all;">${escapeHtml(shareUrl)}</a></p>
      </td></tr>
      ${galleryFooterEmailSection(body.galleryName, body.galleryAddress, body.galleryContact)}
      </table>
    </td>
  </tr>
</table>
</body></html>`
    }

    const fromEnv = process.env.OVR_EMAIL_FROM?.trim()
    const defaultFrom = 'Viewing Room Studio <onboarding@resend.dev>'
    const usesResendSandboxSender =
      !fromEnv || /onboarding@resend\.dev/i.test(fromEnv)

    if (usesResendSandboxSender && process.env.VERCEL_ENV === 'production') {
      return NextResponse.json(
        {
          error:
            'Production: add the Vercel OVR_EMAIL_FROM variable (for example Viewing Room Studio <noreply.com>) with an address on a domain already verified in Resend (resend.com/domains). Without it, Resend cannot send to external recipients.',
        },
        { status: 503 },
      )
    }

    let from = defaultFrom
    if (fromEnv) {
      const normalized = normalizeResendFrom(fromEnv)
      if (!normalized.ok) {
        return NextResponse.json({ error: OVR_FROM_FORMAT_HINT }, { status: 400 })
      }
      from = normalized.from
    }

    const resend = new Resend(key)
    const subject = `Viewing Room — ${subjectBrand}`

    const { error } = await resend.emails.send({
      from,
      to: recipientEmail,
      subject,
      text: textBody,
      html: htmlBody,
    })

    if (error) {
      console.error('Resend share-email error:', error)
      let message = error.message || 'Email sending failed.'
      if (/invalid `from`|invalid from field/i.test(message)) {
        message = OVR_FROM_FORMAT_HINT
      } else if (/testing emails|only send|verify a domain|resend\.com\/domains/i.test(message)) {
        message =
          'Resend is in test mode: it can only send to your Resend account email, or verify a domain on resend.com and set OVR_EMAIL_FROM with an address @yourdomain.com.'
      }
      return NextResponse.json({ error: message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Share email route error:', err)
    return NextResponse.json({ error: 'Server error while sending email.' }, { status: 500 })
  }
}
