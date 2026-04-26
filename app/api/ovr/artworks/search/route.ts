import { NextRequest, NextResponse } from 'next/server'
import { searchArtworks } from '@/lib/ovr/sanityClient'

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') || ''
  const results = await searchArtworks(q)
  return NextResponse.json(results)
}
