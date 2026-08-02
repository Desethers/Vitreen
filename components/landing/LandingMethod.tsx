"use client";

import { Button } from "@/components/ui/Button";
import { openContact } from "@/components/landing/LandingNav";
import { BODY_SM, CONTAINER, H2, H3, SECTION } from "@/components/landing/styles";

const STEPS = [
  {
    title: "Audit",
    text: "We review how your gallery stores artwork information, handles requests and prepares collector material.",
  },
  {
    title: "Connect",
    text: "We connect the fields, images and documents required for your workflow.",
  },
  {
    title: "Configure",
    text: "We adapt Gmail, WhatsApp and presentation outputs to your gallery.",
  },
  {
    title: "Improve",
    text: "Your team uses the system independently or continues working with Vitreen through the Partner offer.",
  },
];

const SCENARIO = [
  "A collector asks for available works by an artist.",
  "The gallery searches from Gmail.",
  "Vitreen shows current works, prices and availability.",
  "The gallery selects four works.",
  "A private presentation is inserted into the reply.",
];

export default function LandingMethod() {
  return (
    <div id="how-it-works">
      {/* Method */}
      <section className={`${SECTION} bg-white`}>
        <div className={CONTAINER}>
          <h2 className={`${H2} max-w-2xl`}>Built around the way your gallery already works.</h2>

          <ol className="mt-8 grid list-none gap-0 p-0 md:mt-12 md:grid-cols-4 md:gap-10">
            {STEPS.map((step, index) => (
              <li
                key={step.title}
                className="border-t border-[#E8E8E6] py-5 last:border-b md:border-b-0 md:py-0 md:pt-6 md:last:border-b-0"
              >
                <span className="text-[11px] tabular-nums text-[#ADADAA]">0{index + 1}</span>
                <h3 className={`${H3} mt-2`}>{step.title}</h3>
                <p className={`${BODY_SM} mt-2.5`}>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Walkthrough of one request */}
      <section className={`${SECTION} bg-[#F5F5F3]`}>
        <div className={CONTAINER}>
          <h2 className={`${H2} max-w-2xl`}>
            See a collector request handled from start to finish.
          </h2>

          <ol className="mt-8 flex list-none flex-col gap-0 p-0 md:mt-10 md:max-w-3xl">
            {SCENARIO.map((line, index) => (
              <li
                key={line}
                className="flex items-start gap-4 border-t border-[#DCDCD8] py-4 last:border-b md:gap-6 md:py-5"
              >
                <span className="mt-[3px] shrink-0 text-[11px] tabular-nums text-[#ADADAA]">
                  0{index + 1}
                </span>
                <span className="text-[15px] leading-[1.5] tracking-[-0.01em] text-[#111110] md:text-[17px]">
                  {line}
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-8 md:mt-10">
            <Button size="lg" onClick={openContact}>
              Book a live demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
