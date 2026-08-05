"use client";

import { BODY, BODY_SM, CONTAINER, EYEBROW, H2, H3, SECTION } from "@/components/landing/styles";

const STEPS = [
  {
    title: "Audit",
    text: "We review how exchanges happen with collectors and between teams (if any).",
  },
  {
    title: "Configure",
    text: "Set up the formats and workflows your team needs.",
  },
  {
    title: "Connect",
    text: "Make the system practical for daily collector conversations.",
  },
  {
    title: "Support",
    text: "Keep the foundation reliable as your gallery keeps moving.",
  },
];

export default function LandingMethod() {
  return (
    <section id="how-it-works" className={`${SECTION} bg-white`}>
      <div className={CONTAINER}>
        <div className="grid gap-6 md:grid-cols-2 md:items-start md:gap-16">
          <div>
            <p className={EYEBROW}>HOW WE WORK</p>
            <h2 className={`${H2} mt-4 max-w-lg`}>
              Built with your gallery. Powered by one shared Vitreen system.
            </h2>
          </div>
          <p className={`${BODY} md:mt-1`}>
            We work directly with your team to import the inventory, configure the workflows,
            prepare the formats and train the people who will use the system.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-4">
          {STEPS.map((step, index) => (
            <div key={step.title} className="rounded-[12px] bg-[#F5F5F3] p-6">
              <span className="text-[11px] tabular-nums text-[#ADADAA]">0{index + 1}</span>
              <h3 className={`${H3} mt-2`}>{step.title}</h3>
              <p className={`${BODY_SM} mt-1.5`}>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
