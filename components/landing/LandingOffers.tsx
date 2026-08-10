"use client";

import { OfferCard } from "@/components/landing/OfferCard";
import { CONTAINER, H2, SECTION } from "@/components/landing/styles";

const SETUP = [
  "Artwork database migration",
  "Artists, artworks, images, prices and availability",
  "Gmail add-in",
  "WhatsApp sales tools",
  "Gmail and WhatsApp configuration",
  "AI assistant setup",
  "Viewing room editor and follow-up",
  "Team onboarding",
];

const PARTNER = [
  "Monthly working session",
  "Workflow improvements",
  "New email and PDF formats",
  "Team training and support",
  "AI assistant configuration",
  "Inventory and data support",
  "Priority technical assistance",
];

export default function LandingOffers() {
  return (
    <section id="services" className={`${SECTION} bg-white`}>
      <div className={CONTAINER}>
        <h2 className={`${H2} max-w-2xl`}>Choose how you want to work with Vitreen.</h2>

        <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-2 md:gap-8">
          <OfferCard
            title="Vitreen"
            price="From €1,500 setup"
            priceMonthly="+ €149/month"
            description="We install the system your gallery needs today with artwork database and collector sales tools."
            items={SETUP}
            clarification="Delivered in ~3 weeks."
            cta="Start with Vitreen"
          />
          <OfferCard
            title="Vitreen Partner"
            price="+ €350/month"
            subline="Available after Setup"
            description="Keep Vitreen involved to improve the system as your gallery, team and collector workflows evolve."
            items={PARTNER}
            cta="Work with Vitreen"
            featured
          />
        </div>
      </div>
    </section>
  );
}
