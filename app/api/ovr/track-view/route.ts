import { NextRequest, NextResponse } from 'next/server'
import { client, getSanityConfigError, writeClient } from '@/lib/ovr/sanityClient'

const VIEW_COOKIE_MAX_AGE = 6 * 60 * 60

type TrackViewPayload = {
  token?: string
}

type TrackableRoom = {
  _id: string
}

function cookieName(token: string) {
  return `ovr_view_${token.replace(/[^a-z0-9_-]/gi, '').slice(0, 64)}`
}

export async function POST(req: NextRequest) {
  try {
    const sanityConfigError = getSanityConfigError({ requireWriteToken: true })
    if (sanityConfigError) {
      return NextResponse.json({ error: sanityConfigError }, { status: 500 })
    }

    const body = await req.json() as TrackViewPayload
    const token = body.token?.trim()
    if (!token) return NextResponse.json({ error: 'Missing viewing room token.' }, { status: 400 })

    const name = cookieName(token)
    if (req.cookies.get(name)?.value === '1') {
      return NextResponse.json({ ok: true, tracked: false, reason: 'deduped' })
    }

    const room = await (client as any).fetch(
      `*[_type == "viewingRoom" && token == $token && status == "active"][0]{ _id }`,
      { token },
    ) as TrackableRoom | null

    if (!room) return NextResponse.json({ error: 'Viewing room not found.' }, { status: 404 })

    await writeClient
      .patch(room._id)
      .setIfMissing({ viewCount: 0 })
      .inc({ viewCount: 1 })
      .commit()

    const res = NextResponse.json({ ok: true, tracked: true })
    res.cookies.set(name, '1', {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: VIEW_COOKIE_MAX_AGE,
      path: '/',
    })
    return res
  } catch (err) {
    console.error('Track viewing room view error:', err)
    const message = err instanceof Error ? err.message : 'Error tracking view.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
