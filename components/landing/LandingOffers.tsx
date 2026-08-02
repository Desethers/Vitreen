"use client";

import { Button } from "@/components/ui/Button";
import { openContact } from "@/components/landing/LandingNav";
import { CONTAINER, EYEBROW, H2, H2_SUB, SECTION } from "@/components/landing/styles";

type Tier = {
  name: string;
  tagline: string;
  price: string;
  cta: string;
  featured?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "Vitreen Build",
    tagline: "Full installation, run it yourselves after. 6–8 weeks.",
    price: "From €4,500",
    cta: "Start a project",
  },
  {
    name: "Vitreen Partner",
    tagline: "We build it, then stay on as your product partner. 12 months.",
    price: "From €950/month",
    cta: "Book a demo",
    featured: true,
  },
  {
    name: "AI Session",
    tagline: "One workflow, solved in a single 90-minute session.",
    price: "€400",
    cta: "Book a session",
  },
];

export default function LandingOffers() {
  return (
    <section id="services" className={`${SECTION} bg-[#F5F5F3]`}>
      <div className={CONTAINER}>
        <h2 className={`${H2} max-w-2xl`}>Two ways to work with Vitreen.</h2>
        <p className={`${H2_SUB} max-w-2xl`}>
          Install the system and run it independently, or keep Vitreen involved as your gallery’s
          long-term product partner.
        </p>
        <p className="mt-4 max-w-2xl text-[15px] leading-[1.6] tracking-[-0.01em] text-[#111110] md:text-[17px]">
          <span className="font-medium">Goal:</span> turn your artwork records into a working sales
          system your gallery keeps running — with or without us.
        </p>

        <div className="mt-10 overflow-hidden rounded-[12px] border border-[#E8E8E6] bg-white md:mt-14">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`flex flex-col gap-3 border-b border-[#E8E8E6] p-6 last:border-b-0 md:flex-row md:items-center md:justify-between md:gap-6 md:p-8 ${
                tier.featured ? "bg-[#FAFAF8]" : ""
              }`}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2.5">
                  <h3 className="font-display text-[19px] font-normal tracking-[-0.02em] text-[#111110] md:text-[22px]">
                    {tier.name}
                  </h3>
                  {tier.featured ? (
                    <span className="rounded-full bg-[#111110] px-2.5 py-1 text-[10px] font-medium leading-none text-white">
                      Recommended
                    </span>
                  ) : null}
                </div>
                <p className="mt-1.5 max-w-md text-[14px] leading-[1.5] tracking-[-0.01em] text-[#6B6A67] md:text-[15px]">
                  {tier.tagline}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-4 md:gap-6">
                <span className="font-display text-[17px] leading-none tracking-[-0.02em] text-[#111110] md:text-[19px]">
                  {tier.price}
                </span>
                <Button
                  size="md"
                  onClick={openContact}
                  variant={tier.featured ? "primary" : "inverse"}
                  className={tier.featured ? "" : "border border-[#E8E8E6]"}
                >
                  {tier.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <p className={`${EYEBROW} mt-4`}>
          Vitreen Build includes workflow audit, artwork data connection, Gmail and WhatsApp tools,
          team training and handover. Vitreen Partner adds ongoing support, monthly workflow review
          and priority development.
        </p>
      </div>
    </section>
  );
}
