import { NextRequest, NextResponse } from 'next/server'
import { generateBlocksPDF } from '@/lib/ovr/pdfTemplate'
import type { Block, ImageItem, VrSetup } from '@/lib/ovr/buildTypes'

export async function POST(req: NextRequest) {
  const { blocks, images, setup } = await req.json() as {
    blocks: Block[]
    images: ImageItem[]
    setup: VrSetup | null
  }

  const html = generateBlocksPDF({ blocks, images, setup })

  try {
    const puppeteer = await import('puppeteer')
    const browser = await puppeteer.default.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })
    const page = await browser.newPage()
    await page.setContent(html, { waitUntil: 'networkidle0' })
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    })
    await browser.close()

    return new NextResponse(pdf as unknown as BodyInit, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="viewing-room.pdf"`,
      },
    })
  } catch (err) {
    console.error('PDF error:', err)
    return NextResponse.json({ error: 'PDF generation failed' }, { status: 500 })
  }
}
