import { NextRequest, NextResponse } from 'next/server'
import { writeClient } from '@/lib/ovr/sanityClient'
import type { Block, BlockSlot, ImageItem, VrSetup } from '@/lib/ovr/buildTypes'

function generateToken() {
  return Math.random().toString(36).substring(2, 10) +
    Math.random().toString(36).substring(2, 10)
}

async function uploadDataUrl(dataUrl: string): Promise<string | null> {
  try {
    const [header, base64] = dataUrl.split(',')
    const mime = header.match(/:(.*?);/)?.[1] ?? 'image/jpeg'
    const buffer = Buffer.from(base64, 'base64')
    const asset = await writeClient.assets.upload('image', buffer, { contentType: mime })
    return asset._id
  } catch (e) {
    console.error('Image upload failed:', e)
    return null
  }
}

export async function POST(req: NextRequest) {
  try {
    const { blocks, images, setup } = await req.json() as {
      blocks: Block[]; images: ImageItem[]; setup: VrSetup | null
    }

    // Upload all images to Sanity and build an id → assetId map
    const assetMap: Record<string, string> = {}
    await Promise.all(images.map(async img => {
      if (img.dataUrl) {
        const assetId = await uploadDataUrl(img.dataUrl)
        if (assetId) assetMap[img.id] = assetId
      }
    }))

    const processedBlocks = await Promise.all(blocks.map(async (block, i) => ({
      _key: `block${i}${Date.now()}`,
      blockType: block.type,
      quoteText: block.quoteText,
      quoteAuthor: block.quoteAuthor,
      slots: block.slots.map((slot: BlockSlot, j: number) => {
        const img = images.find(im => im.id === slot.imageId)
        const assetId = slot.imageId ? assetMap[slot.imageId] : null
        return {
          _key: `slot${j}`,
          title: img?.title ?? '',
          artist: img?.artist ?? '',
          year: img?.year ?? '',
          medium: img?.medium ?? '',
          dimensions: img?.dimensions ?? '',
          price: img?.price ?? '',
          showPrice: img?.showPrice ?? false,
          ...(assetId ? { image: { _type: 'image', asset: { _type: 'reference', _ref: assetId } } } : {}),
        }
      }),
    })))

    const token = generateToken()
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 30)

    const doc = {
      _type: 'viewingRoom',
      title: setup?.title ?? 'Viewing Room',
      headline: setup?.headline ?? 'Viewing Room',
      galleryName: setup?.galleryName ?? '',
      recipientName: setup?.recipientName ?? '',
      recipientEmail: setup?.recipientEmail ?? '',
      introText: setup?.introText ?? '',
      token,
      status: 'active',
      expiresAt: expiresAt.toISOString().split('T')[0],
      viewCount: 0,
      blocks: processedBlocks,
    }

    const created = await writeClient.create(doc)
    return NextResponse.json({ _id: created._id, token }, { status: 201 })
  } catch (err) {
    console.error('Create viewing room error:', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
