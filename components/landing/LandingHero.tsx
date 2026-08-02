"use client";

import AskAgentPanel from "@/components/shared/AskAgentPanel";
import { Button } from "@/components/ui/Button";
import { openContact } from "@/components/landing/LandingNav";

const WORKS = [
  { title: "Evening Field", meta: "2023 · €18,000", image: "/artworks/painting-03.jpg" },
  { title: "Low Tide", meta: "2024 · €16,500", image: "/artworks/painting-06.png" },
];

/**
 * Asymmetric hero: copy on the left, the ask-agent panel on the right — one
 * question in, works from the inventory and a drafted reply out. The panel is
 * the whole product in a single artifact, so the hero never has to show two
 * competing integrations.
 */
export default function LandingHero() {
  return (
    <section className="relative flex flex-col overflow-hidden bg-white px-4 pb-14 pt-36 md:px-6 md:pb-20 md:pt-44">
      <div className="relative mx-auto grid w-full max-w-7xl gap-10 md:grid-cols-[1.05fr_1fr] md:items-center md:gap-12">
        <div className="text-[22px] leading-[1.3] md:text-[30px]">
          <p className="hero-fade-up mb-3 text-[12px] font-medium uppercase tracking-[0.14em] text-[#ADADAA] md:mb-4">
            Sales tools for contemporary galleries
          </p>

          <h1
            className="hero-fade-up m-0 max-w-xl text-balance leading-[inherit] tracking-[-0.04em] font-display"
            style={{ color: "#111110" }}
          >
            Give your gallery superpowers.
          </h1>

          <p className="hero-fade-up hero-fade-up-delay mt-[16px] max-w-lg leading-[inherit] tracking-[-0.02em] text-[#6B6A67]">
            Connect AI agents to your artwork inventory and turn existing data into collector-ready
            emails, selections and PDFs for Gmail and WhatsApp.
          </p>

          <div className="hero-fade-up hero-fade-up-delay mt-[18px] flex flex-wrap items-center gap-3 md:mt-[22px]">
            <Button size="lg" onClick={openContact}>
              Book a demo
            </Button>
            <Button
              size="lg"
              href="#how-it-works"
              variant="inverse"
              className="border border-[#E8E8E6]"
            >
              See how it works
            </Button>
          </div>

          <p className="hero-fade-up hero-fade-up-delay mt-5 text-[13px] leading-[1.5] tracking-[-0.01em] text-[#ADADAA] md:text-[14px]">
            Works with Artlogic, spreadsheets and existing artwork databases.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <AskAgentPanel
            channelLabel="Gmail"
            question="Available works by Marina Perez under €20,000"
            resultsLabel="2 works · from your inventory"
            works={WORKS}
            draftLabel="Drafted reply"
            draftText="Dear Marie, two works by Marina Perez are currently available in that range. I’ve included both below — happy to arrange a viewing this week."
            footnote="Nothing sends without you"
            ctaLabel="Review & send"
          />
          <p className="mt-4 text-[12px] leading-[1.5] text-[#ADADAA]">
            Works in Gmail and WhatsApp Business
          </p>
        </div>
      </div>
    </section>
  );
}
