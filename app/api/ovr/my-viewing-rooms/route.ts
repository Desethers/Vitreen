import { NextResponse } from 'next/server'
import { requireDashboardUser } from '@/lib/ovr/authAccess'
import { client, getSanityConfigError } from '@/lib/ovr/sanityClient'

export async function GET() {
  const gate = await requireDashboardUser()
  if (!gate.ok) return NextResponse.json({ error: gate.error }, { status: gate.status })

  const sanityConfigError = getSanityConfigError()
  if (sanityConfigError) {
    return NextResponse.json({ error: sanityConfigError }, { status: 500 })
  }

  const rooms = await client.fetch(
    `*[_type == "viewingRoom" && ownerId == $userId] | order(coalesce(createdAt, _createdAt) desc)[0...100]{
      _id,
      title,
      headline,
      recipientName,
      recipientEmail,
      token,
      status,
      expiresAt,
      viewCount,
      "createdAt": coalesce(createdAt, _createdAt),
      "inquiryCount": count(*[_type == "viewingRoomInquiry" && ownerId == $userId && viewingRoomToken == ^.token])
    }`,
    { userId: gate.user.userId },
  )

  return NextResponse.json({ rooms })
}
