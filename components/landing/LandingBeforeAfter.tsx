"use client";

import { BODY, CONTAINER, H2, H2_SUB, SECTION } from "@/components/landing/styles";

export type BeforeAfterCopy = {
  title: string;
  subtitle: string;
  before: { label: string; items: string[] };
  after: { label: string; items: string[] };
};

export const BEFORE_AFTER_EN: BeforeAfterCopy = {
  title: "Your gallery, before and after Vitreen.",
  subtitle: "Same collectors. Same works. Less digging.",
  before: {
    label: "Before",
    items: [
      "“Is it still available?” You dig through folders, spreadsheets and old emails.",
      "The price is in one file, the image in another.",
      "Nobody remembers what Marie received last month.",
      "Your CRM is empty. Again.",
      "A colleague leaves. Their collectors leave with them.",
    ],
  },
  after: {
    label: "After",
    items: [
      "The work, its price and availability, right where you reply.",
      "Every request linked to the collector and to the artwork.",
      "You see who received what, and who opened it.",
      "Each morning: who is waiting, who to follow up with.",
      "The gallery remembers, even when one person doesn’t.",
    ],
  },
};

/** Two plain lists side by side: the day today, and the day with Vitreen. */
export function BeforeAfterSection({ copy }: { copy: BeforeAfterCopy }) {
  return (
    <section className={`${SECTION} bg-white`}>
      <div className={CONTAINER}>
        <h2 className={H2}>{copy.title}</h2>
        <p className={H2_SUB}>{copy.subtitle}</p>

        <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-2 md:gap-6">
          <div className="rounded-[12px] border-[0.5px] border-[#DCDCD8] p-7 md:p-9">
            <p className="text-[13px] font-medium text-[#ADADAA]">{copy.before.label}</p>
            <ul className="mt-5 space-y-4">
              {copy.before.items.map((item) => (
                <li key={item} className={`${BODY} flex gap-3`}>
                  <span aria-hidden="true" className="text-[#ADADAA]">
                    —
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[12px] bg-[#111110] p-7 md:p-9">
            <p className="text-[13px] font-medium text-white/50">{copy.after.label}</p>
            <ul className="mt-5 space-y-4">
              {copy.after.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-[15px] leading-[1.65] tracking-[-0.01em] text-white md:text-[17px]"
                >
                  <span aria-hidden="true" className="text-white/50">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function LandingBeforeAfter() {
  return <BeforeAfterSection copy={BEFORE_AFTER_EN} />;
}
