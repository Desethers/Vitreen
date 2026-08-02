"use client";

import { Button } from "@/components/ui/Button";
import { openContact } from "@/components/landing/LandingNav";
import { BODY_SM, CONTAINER, EYEBROW, H2, H2_SUB, SECTION } from "@/components/landing/styles";

const CONVERSATIONS_FEATURES = [
  "AI-drafted collector replies — grounded in your inventory, always sent by your team",
  "Gmail and WhatsApp add-ins",
  "Your artwork data connected — Artlogic, spreadsheets or existing database",
  "Private selections and PDF export",
];

/**
 * Conversations is the product: filled card, full width of its column, price
 * shown as setup + monthly (mirrors main's PricingBand base-card pattern).
 * Website and Coaching are secondary — open rows, no card, smaller type —
 * so the page never reads as three equal-weight tiers.
 */
export default function LandingOffers() {
  return (
    <section id="services" className={`${SECTION} border-t border-[#E8E8E6] bg-white`}>
      <div className={CONTAINER}>
        <h2 className={`${H2} max-w-2xl`}>What you get.</h2>
        <p className={`${H2_SUB} max-w-2xl`}>
          One product. Two extensions for galleries that need them.
        </p>

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-[1.2fr_1fr] md:gap-12">
          {/* Conversations — the offer, filled card */}
          <div className="flex flex-col rounded-[12px] bg-[#F5F5F3] p-6 md:p-10">
            <div className="flex items-start justify-between gap-6">
              <h3 className="font-display text-[20px] font-normal leading-snug tracking-[-0.01em] text-[#111110] md:text-[22px]">
                Vitreen Conversations
              </h3>
              <span className="hidden shrink-0 items-center gap-2 rounded-full border border-[#E1E1DE] bg-white px-2.5 py-1 text-[11px] font-normal leading-none text-[#6B6A67] md:inline-flex">
                <span className="h-1.5 w-1.5 rounded-full bg-[#168044]" aria-hidden />
                Pilot pricing available
              </span>
            </div>
            <p className="mt-1.5 max-w-md text-[14px] leading-[1.5] text-[#6B6A67] md:text-[15px]">
              Your artworks, ready to sell in Gmail and WhatsApp.
            </p>

            <div className="mt-6">
              <p className="font-display text-[18px] font-normal tracking-[-0.01em] text-[#111110] md:text-[20px]">
                €950/month
              </p>
              <p className="mt-1 text-[13px] text-[#6B6A67]">
                Plus a €4,500 one-time onboarding. 12-month partnership, hosting and support
                included.
              </p>
            </div>

            <div className="my-6 border-t border-dashed border-[#E1E1DE]" aria-hidden />

            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {CONVERSATIONS_FEATURES.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ADADAA"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="mt-[3px] shrink-0"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span className="text-[14px] leading-[1.45] tracking-[-0.01em] text-[#111110]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <Button size="md" variant="primary" onClick={openContact} className="mt-6 w-full">
              Book a demo
            </Button>
          </div>

          {/* Extensions — open, lighter, subordinate to the offer above */}
          <div className="flex flex-col gap-8 md:gap-10">
            <div>
              <p className={EYEBROW}>Extension</p>
              <h3 className="mt-1.5 font-display text-[17px] font-normal leading-snug tracking-[-0.01em] text-[#111110] md:text-[19px]">
                Connected Website
              </h3>
              <p className={`${BODY_SM} mt-1.5 max-w-sm`}>
                For galleries that need one: a website built on the same connected artwork records.
                Fixed scope, quoted after a first conversation.
              </p>
              <p className="mt-2 text-[13px] leading-[1.5] text-[#ADADAA]">
                Already have a site? Vitreen works alongside it.
              </p>
            </div>

            <div className="border-t border-[#E8E8E6] pt-8 md:pt-10">
              <p className={EYEBROW}>Extension</p>
              <h3 className="mt-1.5 font-display text-[17px] font-normal leading-snug tracking-[-0.01em] text-[#111110] md:text-[19px]">
                AI Coaching
              </h3>
              <p className={`${BODY_SM} mt-1.5 max-w-sm`}>
                Bring AI into your gallery’s daily work — taught by the team that builds AI for
                galleries. Hands-on sessions on your real workflows, not a course. From €400 per
                session.
              </p>
            </div>

            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                openContact();
              }}
              className="text-[13px] text-[#6B6A67] underline-offset-4 transition-colors hover:text-[#111110] hover:underline"
            >
              Ask about Website or Coaching →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
