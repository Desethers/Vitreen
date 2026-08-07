"use client";

import { OfferCard } from "@/components/landing/OfferCard";
import { CONTAINER, H2, SECTION } from "@/components/landing/styles";

const SETUP = [
  "Inventory import",
  "AI assistant setup",
  "Gmail and WhatsApp configuration",
  "Email and PDF formats",
  "Team training",
  "Technical maintenance",
];

const PARTNER = [
  "Everything in Setup",
  "Monthly working session",
  "Direct founder support",
  "Workflow improvements",
  "New formats and use cases",
  "Ongoing product evolution",
];

export default function LandingOffers() {
  return (
    <section id="services" className={`${SECTION} bg-white`}>
      <div className={CONTAINER}>
        <h2 className={`${H2} max-w-2xl`}>Choose how you want to work with Vitreen.</h2>

        <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-2 md:gap-8">
          <OfferCard
            label="One-time project"
            title="Vitreen Setup"
            price="€3,000 one-time"
            description="A complete, stable Vitreen system installed for your gallery."
            items={SETUP}
            clarification="The delivered system remains stable. New features and workflow changes are not included."
            cta="Choose Setup"
          />
          <OfferCard
            label="Ongoing partnership"
            title="Vitreen Partner"
            price="€950/month"
            subline="6-month minimum"
            description="Vitreen stays involved to support your team and improve the system over time."
            items={PARTNER}
            cta="Choose Partner"
            featured
          />
        </div>
      </div>
    </section>
  );
}
