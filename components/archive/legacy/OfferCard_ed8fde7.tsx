"use client";

import { Button } from "@/components/ui/Button";
import { openContact } from "@/components/landing/LandingNav";
import { BODY_SM, EYEBROW } from "@/components/landing/styles";

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

export function OfferCard({
  label,
  title,
  price,
  priceMonthly,
  subline,
  description,
  items,
  clarification,
  cta,
  featured = false,
}: {
  label?: string;
  title: string;
  price: string;
  priceMonthly?: string;
  subline?: string;
  description: string;
  items: readonly string[];
  clarification?: string;
  cta: string;
  featured?: boolean;
}) {
  return (
    <article
      className={`flex flex-col rounded-[12px] p-6 md:p-8 ${featured ? "bg-[#F5F5F3]" : "border border-[#E8E8E6] bg-white"}`}
    >
      {label ? <p className={EYEBROW}>{label}</p> : null}
      <h3
        className={`font-display text-[22px] font-normal tracking-[-0.02em] text-[#111110] md:text-[26px] ${label ? "mt-4" : ""}`}
      >
        {title}
      </h3>
      <p className="mt-3 font-display text-[22px] tracking-[-0.01em] text-[#111110] md:text-[24px]">
        {price}
      </p>
      {priceMonthly ? (
        <p className="mt-1 font-display text-[17px] tracking-[-0.01em] text-[#6B6A67] md:text-[18px]">
          {priceMonthly}
        </p>
      ) : null}
      {subline ? <p className="mt-1 text-[13px] text-[#6B6A67]">{subline}</p> : null}
      <p className={`${BODY_SM} mt-5 max-w-md`}>{description}</p>

      <ul className="my-6 flex list-none flex-col gap-3 pl-0">
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

      <div className="mt-auto">
        {clarification ? (
          <p className="mb-4 text-[12px] leading-[1.5] text-[#6B6A67]">{clarification}</p>
        ) : null}
        <Button
          size="md"
          variant={featured ? "primary" : "inverse"}
          onClick={openContact}
          className="w-full border border-[#E8E8E6]"
        >
          {cta}
        </Button>
      </div>
    </article>
  );
}
