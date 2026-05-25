import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-04-22.dahlia" as const,
});

export async function POST(req: Request) {
  const { userId, sessionClaims } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let billing: "monthly" | "yearly" = "monthly";
  try {
    const raw = await req.text();
    if (raw) {
      const j = JSON.parse(raw) as { billing?: string };
      if (j.billing === "yearly") billing = "yearly";
    }
  } catch {
    /* garde mensuel */
  }

  const yearlyPriceId = process.env.STRIPE_PRICE_ID_YEARLY;
  if (billing === "yearly" && !yearlyPriceId) {
    return NextResponse.json({ error: "yearly_not_configured" }, { status: 400 });
  }

  const priceId =
    billing === "yearly" && yearlyPriceId ? yearlyPriceId : process.env.STRIPE_PRICE_ID!;

  const email = (sessionClaims?.email as string) ?? undefined;

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer_email: email,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    metadata: { clerkUserId: userId },
    success_url: `https://room.vitreen.art/editor?subscribed=1`,
    cancel_url: `https://vitreen.art/ovr`,
  });

  return NextResponse.json({ url: session.url });
}
