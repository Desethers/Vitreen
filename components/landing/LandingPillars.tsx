"use client";

import { BODY, CONTAINER, H2, SECTION } from "@/components/landing/styles";

export type PillarsCopy = {
  title: string;
  pillars: { verb: string; title: string; body: string; link: string; href: string }[];
};

export const PILLARS_EN: PillarsCopy = {
  title: "Two things, one product.",
  pillars: [
    {
      verb: "Sell",
      title: "Your artworks, ready in Gmail and WhatsApp.",
      body: "Find a work, its price and availability, and send it where the collector wrote.",
      link: "See the sales tools",
      href: "#sell",
    },
    {
      verb: "Remember",
      title: "Every collector, remembered.",
      body: "Who asked, what you sent, who is waiting. The CRM fills in as you work.",
      link: "See the memory",
      href: "#remember",
    },
  ],
};

/** The page's map: the two halves of Vitreen, each linking to its section below. */
export function PillarsSection({ copy }: { copy: PillarsCopy }) {
  return (
    <section className={`${SECTION} bg-white`}>
      <div className={CONTAINER}>
        <h2 className={H2}>{copy.title}</h2>
        <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-2 md:gap-6">
          {copy.pillars.map((pillar) => (
            <a
              key={pillar.verb}
              href={pillar.href}
              className="group flex flex-col rounded-[12px] bg-[#F5F5F3] p-7 transition-colors duration-200 hover:bg-[#EFEFEC] md:p-9"
            >
              <span className="font-display text-[32px] font-medium leading-[1.1] tracking-[-0.03em] text-[#111110] md:text-[44px]">
                {pillar.verb}
              </span>
              <span className="mt-4 font-display text-[19px] font-medium leading-[1.3] tracking-[-0.02em] text-[#111110] md:text-[22px]">
                {pillar.title}
              </span>
              <span className={`${BODY} mt-2 max-w-md`}>{pillar.body}</span>
              <span className="mt-6 text-[14px] text-[#6B6A67] transition-colors group-hover:text-[#111110]">
                {pillar.link} ↓
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function LandingPillars() {
  return <PillarsSection copy={PILLARS_EN} />;
}
