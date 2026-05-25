import { notFound } from 'next/navigation'
import { InquiryForm } from '@/components/dashboard/InquiryForm'
import { client } from '@/lib/ovr/sanityClient'

export const dynamic = 'force-dynamic'

type InquireSlot = {
  _key?: string
  title?: string
  artist?: string
  year?: string
  medium?: string
  dimensions?: string
}

type InquireVR = {
  title?: string
  headline?: string
  galleryName?: string
  blocks?: Array<{
    _key?: string
    slots?: InquireSlot[]
  }>
}

function artworkLabel(slot: InquireSlot) {
  return [slot.artist, slot.title, slot.year].map(v => v?.trim()).filter(Boolean).join(', ') || 'Selected work'
}

async function getInquiryContext(token: string, blockKey: string, slotKey: string) {
  const vr = await (client as any).fetch(
    `*[_type == "viewingRoom" && token == $token && status == "active"][0]{
      title,
      headline,
      galleryName,
      blocks[]{ _key, slots[]{ _key, title, artist, year, medium, dimensions } }
    }`,
    { token },
  ) as InquireVR | null
  if (!vr) return null
  const block = (vr.blocks ?? []).find(item => item._key === blockKey)
  const slot = block?.slots?.find(item => item._key === slotKey)
  if (!slot) return null
  return { vr, slot }
}

export default async function InquiryPage({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>
  searchParams: Promise<{ block?: string; slot?: string }>
}) {
  const { token } = await params
  const { block, slot } = await searchParams
  if (!block || !slot) notFound()

  const context = await getInquiryContext(token, block, slot)
  if (!context) notFound()

  return (
    <main className="min-h-screen bg-[#f6f6f4] px-5 py-8 text-gray-950">
      <div className="mx-auto max-w-xl">
        <div className="mb-8">
          {context.vr.galleryName ? (
            <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-gray-400">{context.vr.galleryName}</p>
          ) : null}
          <h1 className="text-3xl font-normal tracking-tight">Send an inquiry</h1>
          <p className="mt-2 text-sm leading-6 text-gray-500">
            Your request will be sent directly to the gallery.
          </p>
        </div>
        <InquiryForm token={token} blockKey={block} slotKey={slot} artworkLabel={artworkLabel(context.slot)} />
      </div>
    </main>
  )
}
