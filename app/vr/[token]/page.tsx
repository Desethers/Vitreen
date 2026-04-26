import { notFound } from 'next/navigation'
import { client } from '@/lib/ovr/sanityClient'
import { urlFor } from '@/lib/ovr/sanityClient'

interface Slot {
  image?: { asset?: { _ref: string } }
  title?: string; artist?: string; year?: string
  medium?: string; dimensions?: string; price?: string; showPrice?: boolean
}
interface Block {
  _key: string; blockType: string
  slots?: Slot[]; quoteText?: string; quoteAuthor?: string
}
interface VR {
  _id: string; title: string; galleryName?: string
  recipientName?: string; introText?: string
  status: string; expiresAt: string
  blocks: Block[]
}

async function getVR(token: string): Promise<VR | null> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (client as any).fetch(
    `*[_type == "viewingRoom" && token == $token && status == "active"][0]{
      _id, title, galleryName, recipientName, introText, status, expiresAt,
      blocks[]{ _key, blockType, quoteText, quoteAuthor,
        slots[]{ image{ asset }, title, artist, year, medium, dimensions, price, showPrice }
      }
    }`,
    { token }
  )
}

function SlotView({ slot }: { slot: Slot }) {
  const imgUrl = slot.image?.asset?._ref
    ? urlFor(slot.image as Parameters<typeof urlFor>[0]).width(800).fit('max').url()
    : null
  return (
    <div className="flex flex-col gap-3">
      <div className="bg-gray-50 aspect-[3/4] flex items-center justify-center overflow-hidden">
        {imgUrl
          // eslint-disable-next-line @next/next/no-img-element
          ? <img src={imgUrl} alt={slot.title ?? ''} className="max-w-full max-h-full object-contain" />
          : <div className="w-full h-full bg-gray-100" />}
      </div>
      <div className="border-t border-gray-100 pt-3 space-y-0.5">
        {slot.artist && <p className="text-[10px] uppercase tracking-[0.15em] text-gray-400">{slot.artist}</p>}
        {slot.title && (
          <p className="font-serif text-sm text-gray-900">
            <em>{slot.title}</em>{slot.year ? `, ${slot.year}` : ''}
          </p>
        )}
        {slot.medium && <p className="text-[11px] text-gray-500">{slot.medium}</p>}
        {slot.dimensions && <p className="text-[11px] text-gray-500">{slot.dimensions}</p>}
        {slot.showPrice && slot.price && <p className="text-[11px] text-gray-900 mt-1">{slot.price}</p>}
      </div>
    </div>
  )
}

function BlockView({ block }: { block: Block }) {
  if (block.blockType === 'quote') {
    return (
      <div className="py-20 px-8 text-center max-w-xl mx-auto">
        <p className="font-serif text-2xl text-gray-700 italic leading-relaxed mb-4">{block.quoteText}</p>
        {block.quoteAuthor && (
          <p className="text-xs text-gray-400 tracking-widest uppercase">{block.quoteAuthor}</p>
        )}
      </div>
    )
  }
  if (block.blockType === 'full') {
    const s = block.slots?.[0]
    return s ? <div className="max-w-lg mx-auto"><SlotView slot={s} /></div> : null
  }
  if (block.blockType === 'pair') {
    return (
      <div className="grid grid-cols-2 gap-8 max-w-3xl mx-auto">
        {block.slots?.map((s, i) => <SlotView key={i} slot={s} />)}
      </div>
    )
  }
  if (block.blockType === 'trio') {
    return (
      <div className="grid grid-cols-3 gap-6">
        {block.slots?.map((s, i) => <SlotView key={i} slot={s} />)}
      </div>
    )
  }
  if (block.blockType === 'side') {
    const s = block.slots?.[0]
    return (
      <div className="grid grid-cols-2 gap-12 items-center max-w-4xl mx-auto">
        <div className="max-w-xs mx-auto w-full">{s && <SlotView slot={s} />}</div>
        <div className="space-y-4">
          {block.quoteText && (
            <p className="font-serif text-lg text-gray-700 italic leading-relaxed">{block.quoteText}</p>
          )}
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-gray-400">Ce viewing room a expiré.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Cover */}
      <div className="py-24 px-8 text-center border-b border-gray-100">
        {vr.galleryName && (
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-8">{vr.galleryName}</p>
        )}
        <h1 className="font-serif text-4xl text-gray-900 mb-6">Viewing Room</h1>
        {vr.recipientName && <p className="text-sm text-gray-500 mb-4">Pour {vr.recipientName}</p>}
        {vr.introText && (
          <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed mt-6 italic">
            {vr.introText}
          </p>
        )}
      </div>

      {/* Blocks */}
      <div className="px-8 py-16 max-w-5xl mx-auto space-y-20">
        {vr.blocks?.map(block => (
          <BlockView key={block._key} block={block} />
        ))}
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 text-center">
        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-300">{vr.galleryName}</p>
      </footer>
    </div>
  )
}
