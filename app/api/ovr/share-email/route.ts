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
    const galleryName = body.galleryName?.trim() || 'Vitreen'
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

` : ''}Voir la viewing room :
${shareUrl}${footLines ? `\n\n${footLines}` : ''}

Designed with care by Vitreen`

      htmlBody = `
<!DOCTYPE html>
<html lang="fr"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width"/></head>
<body style="margin:0;padding:0;background:#f6f6f6;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background:#f6f6f6;">
  <tr><td align="center" style="padding:0;margin:0;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background:#ffffff;">
      <tr><td style="padding:40px 24px;">
        <p style="margin:0 0 12px;font-family:Arial,sans-serif;font-size:14px;color:#111111;">${escapeHtml(greeting)}</p>
        ${introText ? `<p style="margin:0 0 16px;font-family:Arial,sans-serif;font-size:14px;color:#333333;">${escapeHtml(introText).replaceAll('\n', '<br>')}</p>` : ''}
        <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:13px;color:#555555;">Lien vers la viewing room :</p>
        <p style="margin:0;"><a href="${escapeHtml(shareUrl)}" style="font-family:Arial,sans-serif;font-size:13px;color:#111111;text-decoration:underline;word-break:break-all;">${escapeHtml(shareUrl)}</a></p>
      </td></tr>
      ${galleryFooterEmailSection(body.galleryName, body.galleryAddress, body.galleryContact)}
    </table>
  </td></tr>
</table>
</body></html>`
    }

    const resend = new Resend(key)
    const from = process.env.OVR_EMAIL_FROM || 'Vitreen <onboarding@resend.dev>'
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
      if (/testing emails|only send|verify a domain|resend\.com\/domains/i.test(message)) {
        message =
          'Resend est en mode test : n’envoie qu’à l’email de ton compte Resend, ou vérifie un domaine sur resend.com puis définis OVR_EMAIL_FROM avec une adresse @tondomaine.com.'
      }
      return NextResponse.json({ error: message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Share email route error:', err)
    return NextResponse.json({ error: 'Server error while sending email.' }, { status: 500 })
  }
}
