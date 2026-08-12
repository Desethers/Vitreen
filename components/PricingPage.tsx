"use client";

import LandingNav, { openContact } from "@/components/landing/LandingNav";
import LandingCta from "@/components/landing/LandingCta";
import { OfferCard } from "@/components/landing/OfferCard";
import { PricingFaqItem } from "@/components/landing/PricingFaqItem";
import { Button } from "@/components/ui/Button";
import { BODY_SM, CONTAINER, EYEBROW, H2, H2_SUB } from "@/components/landing/styles";

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

const REPLACES = [
  {
    title: "Inventory tool",
    cost: "Around €200–300/month",
    description: "To store and maintain artwork records.",
  },
  {
    title: "Website agency or provider",
    cost: "Around €4,000–8,000 + fees for each change",
    description: "To build the website, then intervene whenever content changes.",
  },
  {
    title: "Team data entry",
    cost: "Several hours every week",
    description: "To copy the same information into the website, PDFs and collector emails.",
  },
];

const WEBSITE_FEATURES = [
  {
    title: "Always in sync",
    description: "Straight from your inventory.",
  },
  {
    title: "No developer needed",
    description: "Update it yourself, anytime.",
  },
  {
    title: "Your own design",
    description: "Not a generic template.",
  },
  {
    title: "Ranks on Google",
    description: "Built to be found.",
  },
  {
    title: "Inquiries in Gmail",
    description: "No extra tool needed.",
  },
  {
    title: "From €4,500",
    description: "A project after Setup.",
    dark: true,
  },
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

const FAQ = [
  {
    q: "Who owns my data?",
    a: "You do. A complete export is available at any time.",
  },
  {
    q: "Can I start with Partner directly?",
    a: "No. Partner is available once Setup is delivered — it's what keeps Vitreen involved afterward.",
  },
  {
    q: "What happens if I stop?",
    a: "You keep your data and your Vitreen system. A complete export is available at any time.",
  },
  {
    q: "How long does setup take?",
    a: "Around three weeks, from the first conversation to your team using the Gmail and WhatsApp add-ins.",
  },
  {
    q: "Who keeps the system running day to day?",
    a: "Your team, using Vitreen independently. If you'd rather have hands-on support, Partner includes a monthly working session and direct access to the founder.",
  },
];

export default function PricingPage() {
  return (
    <main className="relative bg-white">
      <LandingNav />

      <section className="px-4 pt-32 md:px-6 md:pt-40">
        <div className={CONTAINER}>
          <div className="mx-auto max-w-2xl text-center">
            <p className={EYEBROW}>Pricing</p>
            <h1 className={`${H2} mt-4`}>Clear costs, no surprise.</h1>
            <p className={H2_SUB}>Start with the system your gallery needs today.</p>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 pt-[120px] md:px-6 md:pt-[120px]">
        <div className={CONTAINER}>
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-6 md:grid-cols-2 md:gap-8">
              <OfferCard
                title="Vitreen Sales"
                price="€390/month"
                subline="12-month commitment · Setup included"
                description="We install the system your gallery needs today with artwork database and collector sales tools."
                items={SETUP}
                clarification="Delivered in ~3 weeks."
                cta="Start with Vitreen"
                featured
              />
              <OfferCard
                title="Vitreen Partner"
                price="€590/month"
                subline="12-month commitment · Ongoing guidance included"
                description="Keep Vitreen involved to improve the system as your gallery, team and collector workflows evolve."
                items={PARTNER}
                cta="Work with Vitreen"
              />
            </div>

            <p className="mt-6 max-w-3xl text-[13px] leading-relaxed text-[#6B6A67]">
              The exact scope is defined during a first conversation — that scope determines the
              final quote.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 pt-[120px] md:px-6 md:pt-[120px]">
        <div className={CONTAINER}>
          <div className="grid gap-8 md:grid-cols-[5fr_7fr] md:items-start md:gap-12">
            <div>
              <p className={EYEBROW}>Expand Vitreen</p>
              <h3 className="mt-3 font-display text-[24px] leading-[1.2] tracking-[-0.01em] text-[#111110] md:text-[28px]">
                Why wait for a developer to <br className="hidden md:block" />
                update your gallery website?
              </h3>
              <p className={`${BODY_SM} mt-4 max-w-sm`}>
                Update your gallery website directly from your artwork database. Keep artists,
                exhibitions and artworks current without developer dependency.
              </p>
              <Button
                size="md"
                onClick={openContact}
                className="mt-6 w-full border border-[#E8E8E6] md:w-fit"
              >
                Discuss website project
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {WEBSITE_FEATURES.map((item) => (
                <div
                  key={item.title}
                  className={`flex items-start gap-3 rounded-[12px] p-5 ${item.dark ? "bg-[#111110]" : "bg-[#F5F5F3]"}`}
                >
                  <CheckIcon />
                  <div>
                    <h4
                      className={`font-display text-[15px] ${item.dark ? "text-white" : "text-[#111110]"}`}
                    >
                      {item.title}
                    </h4>
                    <p
                      className={`mt-1.5 text-[13px] leading-[1.5] ${item.dark ? "text-[#ADADAA]" : "text-[#6B6A67]"}`}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 pt-[120px] md:px-6 md:pt-[120px]">
        <div className={CONTAINER}>
          <h2 className={`${H2} max-w-2xl`}>What Vitreen replaces</h2>
          <div className="mt-8 border-t border-[#E8E8E6]">
            {REPLACES.map((item) => (
              <div
                key={item.title}
                className="grid gap-2 border-b border-[#E8E8E6] py-6 md:grid-cols-[0.8fr_1fr_1.3fr] md:items-baseline md:gap-8"
              >
                <h3 className="font-display text-[16px] text-[#111110]">{item.title}</h3>
                <p className="text-[14px] text-[#111110]">{item.cost}</p>
                <p className={BODY_SM}>{item.description}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 font-display text-[20px] text-[#111110]">
            One system, one point of contact.
          </p>
        </div>
      </section>

      <section className="bg-white px-4 pt-[120px] md:px-6 md:pt-[120px]">
        <div className={CONTAINER}>
          <h2 className={`${H2} max-w-2xl`}>Questions about the offer</h2>
          <div className="mt-8">
            {FAQ.map((item) => (
              <PricingFaqItem key={item.q} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </section>

      <LandingCta />
    </main>
  );
}
