"use client";

import { BODY, CONTAINER, EYEBROW, H2, H2_SUB, SECTION } from "@/components/landing/styles";

type Step = { title: string; body: string };

export type HowItWorksCopy = { eyebrow: string; title: string; subtitle: string; steps: Step[] };

export const HOW_IT_WORKS_EN: HowItWorksCopy = {
  eyebrow: "How it works",
  title: "One loop. Each reply makes the next one easier.",
  subtitle: "Set up with you in about a week.",
  steps: [
    {
      title: "You reply",
      body: "From Gmail or WhatsApp, with the work, its price and availability.",
    },
    {
      title: "Vitreen remembers",
      body: "What was asked, what you sent and whether they opened it, on the collector’s record.",
    },
    {
      title: "You know what’s next",
      body: "Each morning, who is waiting for a reply and who to follow up with.",
    },
  ],
};

/** The mechanism behind the promise, in three plain steps. */
export function HowItWorksSection({ copy }: { copy: HowItWorksCopy }) {
  return (
    <section id="how-it-works" className={`${SECTION} scroll-mt-20 bg-white`}>
      <div className={CONTAINER}>
        <p className={EYEBROW}>{copy.eyebrow}</p>
        <h2 className={`${H2} mt-4`}>{copy.title}</h2>
        <p className={H2_SUB}>{copy.subtitle}</p>

        <ol className="mt-12 grid gap-8 md:mt-16 md:grid-cols-3 md:gap-10">
          {copy.steps.map((step, index) => (
            <li key={step.title} className="border-t border-[#111110] pt-5">
              <span className="font-display text-[15px] text-[#ADADAA]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-[22px] font-medium leading-[1.25] tracking-[-0.02em] text-[#111110]">
                {step.title}
              </h3>
              <p className={`${BODY} mt-2 max-w-sm`}>{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default function LandingHowItWorks() {
  return <HowItWorksSection copy={HOW_IT_WORKS_EN} />;
}
