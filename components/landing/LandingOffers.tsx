"use client";

import { OfferCard } from "@/components/landing/OfferCard";
import { CONTAINER, H2, H2_SUB, SECTION } from "@/components/landing/styles";

const INCLUDED = [
  "Unlimited users",
  "Inventory import from your spreadsheets or Artlogic exports",
  "Gmail add-in",
  "WhatsApp assistant",
  "AI assistant, grounded in your records",
  "Conversations: each collector’s history in one place",
  "Private selections and PDFs",
  "Team onboarding",
];

const FOUNDING = [...INCLUDED, "Early access to WhatsApp conversation capture"];

export default function LandingOffers() {
  return (
    <section id="services" className={`${SECTION} bg-white`}>
      <div className={CONTAINER}>
        <h2 className={`${H2} max-w-2xl`}>Choose how to work with Vitreen.</h2>
        <p className={`${H2_SUB} max-w-2xl`}>Three founding places, then one public price.</p>

        <div className="mt-10 grid gap-6 px-8 md:mt-14 md:grid-cols-2 md:gap-8 md:px-20">
          <OfferCard
            label="Founding galleries · 3 places"
            title="Founding gallery"
            price="€149/month"
            subline="3-month minimum, then no commitment · Setup included"
            description="For the first three galleries. Your price stays the same for as long as you stay — in return, you help shape the product."
            items={FOUNDING}
            clarification="In return: 20 minutes of feedback every two weeks during the first three months."
            cta="Apply as a founding gallery"
            featured
          />
          <OfferCard
            title="Vitreen"
            price="€249/month"
            priceMonthly="or €199/month billed yearly"
            subline="No commitment · Setup included"
            description="The public price, once the founding places are taken."
            items={INCLUDED}
            clarification="Set up in about a week."
            cta="Talk to us"
          />
        </div>
      </div>
    </section>
  );
}
