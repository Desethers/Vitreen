import { redirect } from 'next/navigation'
import { DashboardClient } from '@/components/dashboard/DashboardClient'
import { requireDashboardUser } from '@/lib/ovr/authAccess'
import { client } from '@/lib/ovr/sanityClient'

export const dynamic = 'force-dynamic'

type Room = {
  _id: string
  title?: string
  headline?: string
  recipientName?: string
  recipientEmail?: string
  token: string
  status?: string
  expiresAt?: string
  viewCount?: number
  createdAt?: string
  inquiryCount?: number
}

type Inquiry = {
  _id: string
  viewingRoomToken?: string
  viewingRoomTitle?: string
  artworkArtist?: string
  artworkTitle?: string
  artworkYear?: string
  collectorName?: string
  collectorEmail?: string
  message?: string
  status?: string
  createdAt?: string
}

async function getDashboardData(userId: string) {
  const [rooms, inquiries] = await Promise.all([
    client.fetch<Room[]>(
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
      { userId },
    ),
    client.fetch<Inquiry[]>(
      `*[_type == "viewingRoomInquiry" && ownerId == $userId] | order(createdAt desc)[0...100]{
        _id,
        viewingRoomToken,
        viewingRoomTitle,
        artworkArtist,
        artworkTitle,
        artworkYear,
        collectorName,
        collectorEmail,
        message,
        status,
        createdAt
      }`,
      { userId },
    ),
  ])
  return { rooms, inquiries }
}

export default async function DashboardPage() {
  const gate = await requireDashboardUser()
  if (!gate.ok) redirect('/viewing-room-studio/sign-in?redirect_url=/dashboard')

  const { rooms, inquiries } = await getDashboardData(gate.user.userId)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || ''
  return <DashboardClient rooms={rooms} inquiries={inquiries} baseUrl={baseUrl} />
}
