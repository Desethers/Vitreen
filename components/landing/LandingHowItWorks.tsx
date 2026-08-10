"use client";

import { CONTAINER, EYEBROW, H2, H3, SECTION } from "@/components/landing/styles";

const STEPS = [
  {
    number: "01",
    title: "Import your inventory",
    text: "From CSV, Excel or Artlogic. We import everything and keep your data confidential.",
  },
  {
    number: "02",
    title: "Access",
    text: "Find works, images, prices and availability inside Gmail and WhatsApp.",
  },
  {
    number: "03",
    title: "Send",
    text: "Send professional materials via Gmail, WhatsApp, PDF or private selections in a few clicks.",
  },
];

export default function LandingHowItWorks() {
  return (
    <section id="how-it-works" className={`${SECTION} bg-white`}>
      <div className={CONTAINER}>
        <p className={EYEBROW}>How it works</p>
        <h2 className={`${H2} mt-4 max-w-2xl`}>From artwork inventory to collector reply.</h2>

        <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-3">
          {STEPS.map((step) => (
            <article
              key={step.number}
              className="rounded-[12px] border border-[#E8E8E6] p-6 md:p-7"
            >
              <p className="text-[13px] text-[#ADADAA]">{step.number}</p>
              <h3 className={`${H3} mt-3`}>{step.title}</h3>
              <p className="mt-2 text-[15px] leading-[1.6] tracking-[-0.01em] text-[#6B6A67]">
                {step.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
