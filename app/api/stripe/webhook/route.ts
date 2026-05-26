import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { clerkClient } from "@clerk/nextjs/server";

/** Lazy Stripe client — see /api/stripe/checkout for rationale. */
let _stripe: Stripe | null = null;
function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  if (!_stripe) {
    _stripe = new Stripe(key, { apiVersion: "2026-04-22.dahlia" as const });
  }
  return _stripe;
}

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !webhookSecret) {
    return NextResponse.json({ error: "stripe_not_configured" }, { status: 500 });
  }

  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature error:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const clerk = await clerkClient();

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const clerkUserId = session.metadata?.clerkUserId;
    const customerId = session.customer as string;

    if (clerkUserId) {
      await clerk.users.updateUserMetadata(clerkUserId, {
        publicMetadata: { isPro: true, stripeCustomerId: customerId },
        privateMetadata: { exportCount: 0 },
      });
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const sub = event.data.object as Stripe.Subscription;
    const customerId = sub.customer as string;

    // Find user by stripeCustomerId in Clerk
    const users = await clerk.users.getUserList({ limit: 100 });
    const user = users.data.find((u) => u.publicMetadata?.stripeCustomerId === customerId);
    if (user) {
      await clerk.users.updateUserMetadata(user.id, {
        publicMetadata: { isPro: false, stripeCustomerId: customerId },
      });
    }
  }

  return NextResponse.json({ received: true });
}
