import type { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import { client } from '@/lib/ovr/sanityClient'
import { urlFor } from '@/lib/ovr/sanityClient'

interface Slot {
  image?: { asset?: { _ref: string } }
  title?: string
  artist?: string
  year?: string
  medium?: string
  dimensions?: string
  price?: string
  showPrice?: boolean
}

interface Block {
  _key: string
  blockType: string
  slots?: Slot[]
  quoteText?: string
  quoteAuthor?: string
  textStyle?: string
  showInquire?: boolean
  sideTextType?: string
}

interface VR {
  _id: string
  title: string
  headline?: string
  galleryName?: string
  galleryAddress?: string
  galleryContact?: string
  recipientName?: string
  introText?: string
  status: string
  expiresAt: string
  blocks: Block[]
}

async function getVR(token: string): Promise<VR | null> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (client as any).fetch(
    `*[_type == "viewingRoom" && token == $token && status == "active"][0]{
      _id, title, headline, galleryName, galleryAddress, galleryContact,
      recipientName, introText, status, expiresAt,
      blocks[]{ _key, blockType, quoteText, quoteAuthor, textStyle, showInquire, sideTextType,
        slots[]{ image{ asset }, title, artist, year, medium, dimensions, price, showPrice }
      }
    }`,
    { token },
  )
}

function slotImgUrl(slot: Slot): string | null {
  const ref = slot.image?.asset?._ref
  if (!ref) return null
  return urlFor(slot.image as Parameters<typeof urlFor>[0]).width(1800).fit('max').url()
}

/** Aligné sur PreviewSlot — légende sous l’image */
function CaptionMeta({ slot, showInquire }: { slot: Slot; showInquire?: boolean }) {
  return (
    <div className="pt-[10px] flex items-start justify-between gap-4">
      <div className="space-y-0.5">
        {slot.artist ? <p className="text-[12px] font-normal text-gray-900">{slot.artist}</p> : null}
        {(slot.title || slot.year) ? (
          <p className="text-[12px] font-normal text-gray-900">
            {slot.title ? <em>{slot.title}</em> : null}
            {slot.year ? (
              <>
                {slot.title ? ', ' : ''}
                {slot.year}
              </>
            ) : null}
          </p>
        ) : null}
        {slot.medium ? <p className="text-[12px] font-normal text-gray-400">{slot.medium}</p> : null}
        {slot.dimensions ? <p className="text-[12px] font-normal text-gray-400">{slot.dimensions}</p> : null}
        {slot.showPrice && slot.price ? (
          <p className="text-[12px] font-normal text-gray-900 mt-1">{slot.price}</p>
        ) : null}
      </div>
      {showInquire ? (
        <span className="shrink-0 border border-gray-900 text-gray-900 text-[11px] tracking-widest uppercase px-[31px] py-1.5 inline-block">
          Inquire
        </span>
      ) : null}
    </div>
  )
}

/**
 * Variantes alignées sur ViewingRoomApp PreviewSlot :
 * - natural : pleine largeur, hauteur auto (bloc full / quotefull)
 * - cover43 : aspect 4/3 + object-cover (pair, trio)
 * - cover34 : aspect 3/4 + object-cover (side, imgbio)
 */
function PublishedSlot({
  slot,
  imageVariant,
  showInquire,
}: {
  slot: Slot
  imageVariant: 'natural' | 'cover43' | 'cover34'
  showInquire?: boolean
}) {
  const imgUrl = slotImgUrl(slot)

  let media: ReactNode
  if (imageVariant === 'natural') {
    media = imgUrl ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={imgUrl} alt={slot.title ?? ''} className="w-full h-auto" />
    ) : (
      <div className="bg-gray-100 aspect-[4/3]" />
    )
  } else {
    const aspect = imageVariant === 'cover43' ? 'aspect-[4/3]' : 'aspect-[3/4]'
    media = (
      <div className={`${aspect} overflow-hidden bg-gray-100`}>
        {imgUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imgUrl} alt={slot.title ?? ''} className="w-full h-full object-cover" />
        ) : null}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-0">
      {media}
      <CaptionMeta slot={slot} showInquire={showInquire} />
    </div>
  )
}

function PublishedBlock({ block }: { block: Block }) {
  const si = !!block.showInquire
  const slotsFilled = (block.slots ?? []).filter(s => !!slotImgUrl(s))

  if (block.blockType === 'quote') {
    const asText = block.textStyle === 'text'
    const bodyCls = asText
      ? 'font-sans text-base leading-relaxed mb-3 text-gray-800'
      : 'font-sans text-xl italic leading-relaxed mb-3 text-gray-700'
    const authorCls = 'text-[10px] tracking-widest uppercase text-gray-400'
    return (
      <div className={asText ? 'py-10 px-6 max-w-2xl mx-auto' : 'py-12 px-6 text-center max-w-lg mx-auto'}>
        {block.quoteText ? <p className={bodyCls}>{block.quoteText}</p> : null}
        {!asText && block.quoteAuthor ? <p className={authorCls}>{block.quoteAuthor}</p> : null}
      </div>
    )
  }

  if (block.blockType === 'full') {
    const s = block.slots?.[0]
    return s ? (
      <div className="w-full">
        <PublishedSlot slot={s} imageVariant="natural" showInquire={si} />
      </div>
    ) : null
  }

  if (block.blockType === 'pair') {
    if (slotsFilled.length === 1) {
      return (
        <div className="w-full">
          <PublishedSlot slot={slotsFilled[0]} imageVariant="natural" showInquire={si} />
        </div>
      )
    }
    return (
      <div className="grid grid-cols-2 gap-6">
        {slotsFilled.map((s, i) => (
          <PublishedSlot key={`${block._key}-p-${i}`} slot={s} imageVariant="cover43" showInquire={si} />
        ))}
      </div>
    )
  }

  if (block.blockType === 'trio') {
    const filled = slotsFilled
    const cols = filled.length >= 3 ? 'grid-cols-3' : filled.length === 2 ? 'grid-cols-2' : ''
    if (!cols) {
      return filled[0] ? (
        <div className="w-full">
          <PublishedSlot slot={filled[0]} imageVariant="cover43" showInquire={si} />
        </div>
      ) : null
    }
    return (
      <div className={`grid ${cols} gap-4`}>
        {filled.map((s, i) => (
          <PublishedSlot key={`${block._key}-t-${i}`} slot={s} imageVariant="cover43" showInquire={si} />
        ))}
      </div>
    )
  }

  if (block.blockType === 'side') {
    const s = block.slots?.[0]
    const asText = block.textStyle === 'text'
    const textCls = asText
      ? 'font-sans text-base text-gray-800 leading-relaxed'
      : 'font-sans text-base text-gray-700 italic leading-relaxed'
    return (
      <div className="grid grid-cols-2 gap-8 items-center">
        <div>{s ? <PublishedSlot slot={s} imageVariant="cover34" showInquire={si} /> : null}</div>
        <div>
          {block.quoteText ? <p className={textCls}>{block.quoteText}</p> : null}
        </div>
      </div>
    )
  }

  if (block.blockType === 'quotefull') {
    const s = block.slots?.[0]
    return (
      <div className="space-y-8">
        <div className="text-center max-w-lg mx-auto px-4">
          {block.quoteText ? (
            <p className="font-sans text-xl text-gray-700 italic leading-relaxed mb-3">{block.quoteText}</p>
          ) : null}
          {block.quoteAuthor ? (
            <p className="text-[10px] text-gray-400 tracking-widest uppercase">{block.quoteAuthor}</p>
          ) : null}
        </div>
        <div className="w-full">{s ? <PublishedSlot slot={s} imageVariant="natural" showInquire={si} /> : null}</div>
      </div>
    )
  }

  if (block.blockType === 'imgbio') {
    const s = block.slots?.[0]
    const imgUrl = s ? slotImgUrl(s) : null
    return (
      <div className="grid grid-cols-2 gap-12 items-start max-w-3xl mx-auto">
        <div className="aspect-[3/4] overflow-hidden bg-gray-100">
          {imgUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imgUrl} alt={s?.title ?? ''} className="w-full h-full object-cover" />
          ) : null}
        </div>
        <div className="pt-4 space-y-4">
          {s?.artist ? <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">{s.artist}</p> : null}
          {(s?.title || s?.year) ? (
            <p className="font-sans text-sm text-gray-700 italic">
              {s?.title ? <em>{s.title}</em> : null}
              {s?.year ? `${s?.title ? ', b. ' : ''}${s.year}` : ''}
            </p>
          ) : null}
          {block.quoteText ? (
            <p className="text-sm text-gray-600 leading-relaxed">{block.quoteText}</p>
          ) : null}
        </div>
      </div>
    )
  }

  return null
}

export default async function VRPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const vr = await getVR(token)

  if (!vr) notFound()

  const expired = new Date(vr.expiresAt) < new Date()
  if (expired) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-sm text-gray-400">Ce viewing room a expiré.</p>
        </div>
      </div>
    )
  }

  const headline = vr.headline?.trim() || 'Viewing Room'

  return (
    <div className="min-h-full bg-gray-50 py-8 px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-[0_2px_40px_rgba(0,0,0,0.06)] rounded-sm overflow-hidden">
        {/* Cover — même hiérarchie que ViewingRoomPreview */}
        <div className="py-16 px-10 text-left">
          {vr.galleryName ? (
            <p className="text-[9px] uppercase tracking-[0.3em] text-gray-400 mb-6">{vr.galleryName}</p>
          ) : null}
          <h1 className="font-sans text-[24px] leading-tight text-gray-900 mb-1">{headline}</h1>
          {vr.title ? (
            <p className="font-sans text-[24px] leading-tight text-gray-400 mb-4">{vr.title}</p>
          ) : null}
          {vr.recipientName ? (
            <p className="text-xs text-gray-500 mb-3">For {vr.recipientName}</p>
          ) : null}
          {vr.introText ? (
            <p className="text-sm text-gray-900 leading-relaxed mt-4 whitespace-pre-wrap">{vr.introText}</p>
          ) : null}
        </div>

        <div className="mx-10 border-t border-gray-100" />

        <div className="px-10 py-8">
          {vr.blocks?.map(block => (
            <div key={block._key} className="py-6">
              <PublishedBlock block={block} />
            </div>
          ))}
        </div>

        {(vr.galleryName || vr.galleryAddress || vr.galleryContact) ? (
          <div>
            <div className="mx-10 border-t border-gray-100" />
            <div className="py-8 px-10 text-center space-y-0.5">
              {vr.galleryName ? (
                <p className="text-[12px] text-gray-400">{vr.galleryName}</p>
              ) : null}
              {vr.galleryAddress ? (
                <p className="text-[12px] text-gray-400">{vr.galleryAddress}</p>
              ) : null}
              {vr.galleryContact ? (
                <p className="text-[12px] text-gray-400">{vr.galleryContact}</p>
              ) : null}
            </div>
          </div>
        ) : null}

        <div className="py-4 text-center border-t border-gray-50">
          <p className="text-[12px] text-gray-300 tracking-wide">
            Designed with care by <span className="font-medium">Vitreen</span>
          </p>
        </div>
      </div>
    </div>
  )
}
