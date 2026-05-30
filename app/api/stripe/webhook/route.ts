import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";

export async function POST(req: NextRequest) {
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (process.env.NEXT_PUBLIC_CLERK_ENABLED !== "true" || !stripeSecret || !webhookSecret) {
    return NextResponse.json({ error: "stripe_not_configured" }, { status: 503 });
  }

  const [{ default: StripeClient }, { clerkClient }] = await Promise.all([
    import("stripe"),
    import("@clerk/nextjs/server"),
  ]);

  const stripe = new StripeClient(stripeSecret, { apiVersion: "2026-04-22.dahlia" as const });
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "Missing signature" }, { status: 400 });

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
