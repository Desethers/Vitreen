import { auth } from '@clerk/nextjs/server'
import { clerkClient } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { galleryName, contactEmail } = await req.json()

  if (!galleryName?.trim()) {
    return NextResponse.json({ error: 'galleryName required' }, { status: 400 })
  }

  const clerk = await clerkClient()
  await clerk.users.updateUserMetadata(userId, {
    publicMetadata: {
      galleryName: galleryName.trim(),
      contactEmail: contactEmail?.trim() || null,
      onboardingComplete: true,
    },
  })

  return NextResponse.json({ ok: true })
}
