"use client";

import { Button } from "@/components/ui/Button";
import { openContact } from "@/components/landing/LandingNav";
import { BODY_SM, CONTAINER, EYEBROW, H2, H2_SUB, SECTION } from "@/components/landing/styles";

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

function OfferCard({
  label,
  title,
  price,
  subline,
  description,
  items,
  clarification,
  cta,
  featured = false,
}: {
  label: string;
  title: string;
  price: string;
  subline?: string;
  description: string;
  items: readonly string[];
  clarification?: string;
  cta: string;
  featured?: boolean;
}) {
  return (
    <article
      className={`flex flex-col rounded-[12px] border bg-white p-6 md:p-8 ${featured ? "border-[#111110]/20" : "border-[#E8E8E6]"}`}
    >
      <p className={EYEBROW}>{label}</p>
      <h3 className="mt-4 font-display text-[22px] font-normal tracking-[-0.02em] text-[#111110] md:text-[26px]">
        {title}
      </h3>
      <p className="mt-3 font-display text-[18px] tracking-[-0.01em] text-[#111110] md:text-[20px]">
        {price}
      </p>
      {subline ? <p className="mt-1 text-[13px] text-[#6B6A67]">{subline}</p> : null}
      <p className={`${BODY_SM} mt-5 max-w-md`}>{description}</p>

      <ul className="my-6 flex list-none flex-col gap-3 border-y border-[#E1E1DE] py-6 pl-0">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-[14px] leading-[1.45] tracking-[-0.01em] text-[#111110]"
          >
            <CheckIcon />
            {item}
          </li>
        ))}
      </ul>

      {clarification ? (
        <p className="text-[12px] leading-[1.5] text-[#6B6A67]">{clarification}</p>
      ) : null}
      <Button
        size="md"
        variant={featured ? "primary" : "inverse"}
        onClick={openContact}
        className="mt-6 w-full border border-[#E8E8E6]"
      >
        {cta}
      </Button>
    </article>
  );
}

export default function LandingOffers() {
  return (
    <section id="services" className={`${SECTION} bg-white`}>
      <div className={CONTAINER}>
        <h2 className={`${H2} max-w-2xl`}>Choose how you want to work with Vitreen.</h2>

        <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-2 md:gap-8">
          <OfferCard
            label="ONE-TIME PROJECT"
            title="Vitreen Setup"
            price="€3,000 one-time"
            description="A complete, stable Vitreen system installed for your gallery."
            items={SETUP}
            clarification="The delivered system remains stable. New features and workflow changes are not included."
            cta="Choose Setup"
          />
          <OfferCard
            label="ONGOING PARTNERSHIP"
            title="Vitreen Partner"
            price="€950/month"
            subline="6-month minimum"
            description="Vitreen stays involved to support your team and improve the system over time."
            items={PARTNER}
            cta="Choose Partner"
            featured
          />
        </div>

        <div className="mt-14 border-t border-[#E8E8E6] pt-14 text-center md:mt-20 md:pt-20">
          <h2 className="mx-auto max-w-3xl font-display text-[30px] font-normal leading-[1.15] tracking-[-0.03em] text-[#111110] md:text-[44px]">
            Improve the way your gallery responds to collectors.
          </h2>
          <p className={`${H2_SUB} mx-auto max-w-3xl`}>
            See how Vitreen can turn your artwork inventory into practical sales workflows for Gmail
            and WhatsApp.
          </p>
          <Button size="lg" onClick={openContact} className="mt-8">
            Book a demo
          </Button>
          <p className="mt-4 text-[13px] leading-[1.5] text-[#ADADAA] md:text-[14px]">
            A 30-minute walkthrough based on your current workflow.
          </p>
        </div>
      </div>
    </section>
  );
}
