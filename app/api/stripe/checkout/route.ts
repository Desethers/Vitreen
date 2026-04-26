import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-04-22.dahlia' as const })

export async function POST() {
  const { userId, sessionClaims } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const email = (sessionClaims?.email as string) ?? undefined

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    customer_email: email,
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID!,
        quantity: 1,
      },
    ],
    metadata: { clerkUserId: userId },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/ovr/editor?subscribed=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/ovr`,
  })

  return NextResponse.json({ url: session.url })
}
