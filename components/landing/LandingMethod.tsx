"use client";

import {
  BODY,
  BODY_SM,
  CONTAINER,
  EYEBROW,
  H2,
  H3,
  LINE_INK,
  SECTION,
} from "@/components/landing/styles";

const STEPS = ["Import", "Configure", "Train", "Support"];

export default function LandingMethod() {
  return (
    <section id="how-it-works" className={`${SECTION} bg-white`}>
      <div className={CONTAINER}>
        <p className={EYEBROW}>HOW WE WORK</p>
        <h2 className={`${H2} mt-4 max-w-3xl`}>
          Built with your gallery. Powered by one shared Vitreen system.
        </h2>
        <p className={`${BODY} mt-5 max-w-2xl`}>
          We work directly with your team to import the inventory, configure the workflows, prepare
          the formats and train the people who will use the system.
        </p>
        <p className={`${LINE_INK} mt-6 max-w-3xl`}>
          Personal implementation. Standardised product. No open-ended custom development.
        </p>

        <ol className="mt-10 grid list-none gap-0 border-t border-[#DCDCD8] p-0 md:mt-12 md:grid-cols-4 md:gap-8">
          {STEPS.map((step, index) => (
            <li key={step} className="border-b border-[#DCDCD8] py-4 md:py-5">
              <span className="text-[11px] tabular-nums text-[#ADADAA]">0{index + 1}</span>
              <h3 className={`${H3} mt-2`}>{step}</h3>
              <p className={`${BODY_SM} mt-1.5`}>
                {index === 0 && "Bring the artwork information into one reliable source."}
                {index === 1 && "Set up the formats and workflows your team needs."}
                {index === 2 && "Make the system practical for daily collector conversations."}
                {index === 3 && "Keep the foundation reliable as your gallery keeps moving."}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
