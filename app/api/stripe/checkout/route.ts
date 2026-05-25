import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  if (process.env.NEXT_PUBLIC_CLERK_ENABLED !== 'true') {
    return NextResponse.json({ error: 'auth_not_configured' }, { status: 503 })
  }

  const stripeSecret = process.env.STRIPE_SECRET_KEY
  const monthlyPriceId = process.env.STRIPE_PRICE_ID
  if (!stripeSecret || !monthlyPriceId) {
    return NextResponse.json({ error: 'stripe_not_configured' }, { status: 503 })
  }

  const [{ auth }, { default: Stripe }] = await Promise.all([
    import('@clerk/nextjs/server'),
    import('stripe'),
  ])

  const { userId, sessionClaims } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  let billing: 'monthly' | 'yearly' = 'monthly'
  try {
    const raw = await req.text()
    if (raw) {
      const j = JSON.parse(raw) as { billing?: string }
      if (j.billing === 'yearly') billing = 'yearly'
    }
  } catch {
    /* garde mensuel */
  }

  const yearlyPriceId = process.env.STRIPE_PRICE_ID_YEARLY
  if (billing === 'yearly' && !yearlyPriceId) {
    return NextResponse.json({ error: 'yearly_not_configured' }, { status: 400 })
  }

  const stripe = new Stripe(stripeSecret, { apiVersion: '2026-04-22.dahlia' as const })
  const priceId = billing === 'yearly' && yearlyPriceId ? yearlyPriceId : monthlyPriceId
  const email = (sessionClaims?.email as string) ?? undefined
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'http://localhost:3001'

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    customer_email: email,
    line_items: [{ price: priceId, quantity: 1 }],
    metadata: { clerkUserId: userId },
    success_url: `${siteUrl}/editor?subscribed=1`,
    cancel_url: `${siteUrl}/room`,
  })

  return NextResponse.json({ url: session.url })
}
