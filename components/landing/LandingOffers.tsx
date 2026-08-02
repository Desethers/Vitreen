"use client";

import { Button } from "@/components/ui/Button";
import { openContact } from "@/components/landing/LandingNav";
import { BODY_SM, CONTAINER, EYEBROW, H2, H2_SUB, SECTION } from "@/components/landing/styles";

const SEND_FEATURES = [
  "Gmail and WhatsApp add-ins",
  "Natural-language search across your inventory",
  "Private selections and PDF export",
  "Your artwork data connected — Artlogic exports, spreadsheets or existing database",
];

const AGENT_FEATURES = [
  "Collector replies drafted from the incoming email",
  "Alternatives proposed when a work is sold",
  "Price-on-request discretion handled for you",
  "Answers in the collector’s language",
];

function CheckIcon() {
  return (
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
  );
}

function FeatureList({ items }: { items: readonly string[] }) {
  return (
    <ul className="m-0 flex list-none flex-col gap-3 p-0">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <CheckIcon />
          <span className="text-[14px] leading-[1.45] tracking-[-0.01em] text-[#111110]">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Two rungs of one ladder, not a catalogue: Send is the base (open card),
 * Agent is the same product with the AI doing the writing (filled card,
 * recommended). Website and Coaching sit below as services — deliberately
 * small, so they never compete with the ladder for attention.
 */
export default function LandingOffers() {
  return (
    <section id="services" className={`${SECTION} border-t border-[#E8E8E6] bg-white`}>
      <div className={CONTAINER}>
        <h2 className={`${H2} max-w-2xl`}>One inventory, two levels of help.</h2>
        <p className={`${H2_SUB} max-w-2xl`}>One helps you work faster. The other does the work.</p>

        <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-2 md:gap-8">
          {/* Send — the base rung */}
          <div className="flex flex-col rounded-[12px] border border-[#E8E8E6] bg-white p-6 md:p-8">
            <h3 className="font-display text-[20px] font-normal leading-snug tracking-[-0.01em] text-[#111110] md:text-[22px]">
              Vitreen Send
            </h3>
            <p className="mt-1.5 max-w-sm text-[14px] leading-[1.5] text-[#6B6A67] md:text-[15px]">
              Your artworks, ready to send from Gmail and WhatsApp.
            </p>

            <div className="mt-6">
              <p className="font-display text-[18px] font-normal tracking-[-0.01em] text-[#111110] md:text-[20px]">
                €450/month
              </p>
            </div>

            <div className="my-6 border-t border-dashed border-[#E1E1DE]" aria-hidden />

            <FeatureList items={SEND_FEATURES} />

            <Button
              size="md"
              variant="inverse"
              onClick={openContact}
              className="mt-6 w-full border border-[#E8E8E6]"
            >
              Book a demo
            </Button>
          </div>

          {/* Agent — the recommended rung */}
          <div className="flex flex-col rounded-[12px] bg-[#F5F5F3] p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display text-[20px] font-normal leading-snug tracking-[-0.01em] text-[#111110] md:text-[22px]">
                Vitreen Agent
              </h3>
              <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#E1E1DE] bg-white px-2.5 py-1 text-[11px] font-normal leading-none text-[#6B6A67]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#168044]" aria-hidden />
                Recommended
              </span>
            </div>
            <p className="mt-1.5 max-w-sm text-[14px] leading-[1.5] text-[#6B6A67] md:text-[15px]">
              The reply is already drafted when you open the email.
            </p>

            <div className="mt-6">
              <p className="font-display text-[18px] font-normal tracking-[-0.01em] text-[#111110] md:text-[20px]">
                €950/month
              </p>
            </div>

            <div className="my-6 border-t border-dashed border-[#E1E1DE]" aria-hidden />

            <p className="mb-3 text-[13px] text-[#6B6A67]">Everything in Send, plus:</p>
            <FeatureList items={AGENT_FEATURES} />

            <p className="mt-5 text-[12px] text-[#ADADAA]">Nothing sends without your click.</p>

            <Button size="md" variant="primary" onClick={openContact} className="mt-6 w-full">
              Book a demo
            </Button>
          </div>
        </div>

        <p className="mt-6 text-[13px] leading-[1.5] text-[#6B6A67]">
          Both include a €4,500 one-time onboarding — we structure your inventory so everything else
          stays accurate. 12-month partnership, hosting and support included.
        </p>

        {/* Services — below the ladder, deliberately small */}
        <div className="mt-12 border-t border-[#E8E8E6] pt-8 md:mt-16 md:pt-10">
          <p className={EYEBROW}>Also available</p>
          <div className="mt-4 grid gap-6 md:grid-cols-2 md:gap-10">
            <div>
              <h3 className="font-display text-[16px] font-normal tracking-[-0.01em] text-[#111110] md:text-[17px]">
                Connected Website
              </h3>
              <p className={`${BODY_SM} mt-1 max-w-sm`}>
                A website built on the same inventory, for galleries that need one. Fixed scope,
                quoted after a first conversation. Already have a site? Vitreen works alongside it.
              </p>
            </div>
            <div>
              <h3 className="font-display text-[16px] font-normal tracking-[-0.01em] text-[#111110] md:text-[17px]">
                AI Coaching
              </h3>
              <p className={`${BODY_SM} mt-1 max-w-sm`}>
                Hands-on sessions bringing AI into your gallery’s daily work — taught by the team
                that builds AI for galleries. From €400 per session.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
