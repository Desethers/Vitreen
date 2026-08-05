"use client";

import { BODY, BODY_SM, CONTAINER, H2, H3, SECTION } from "@/components/landing/styles";

const COLUMNS = [
  {
    title: "Review your current setup",
    description:
      "We review how artworks, collector requests and daily replies are currently handled.",
    points: [
      "Review your existing tools and records",
      "Identify repeated work and missing connections",
    ],
  },
  {
    title: "Connect and build",
    description:
      "We organise your artwork information and connect the Gmail and WhatsApp workflows your gallery needs.",
    points: [
      "Configure Vitreen around your workflow",
      "Connect artwork records to Gmail and WhatsApp",
    ],
  },
  {
    title: "Launch and support",
    description:
      "Once the system is live, we stay involved to support the gallery and improve it as its needs evolve.",
    points: ["Ongoing updates and support", "Add new workflows when needed"],
  },
];

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      className="mt-0.5 shrink-0 text-[#ADADAA]"
      aria-hidden="true"
    >
      <path
        d="M3 8l3.5 3.5L13 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function LandingMethod() {
  return (
    <section id="how-it-works" className={`${SECTION} bg-white`}>
      <div className={CONTAINER}>
        <p className="text-[11px] tracking-[0.14em] text-[#ADADAA]">The process</p>
        <h2 className={`${H2} mt-4 max-w-3xl`}>How we work with your gallery</h2>
        <p className={`${BODY} mt-5 max-w-2xl`}>
          A personal installation from day one — not a generic rollout.
        </p>

        <div className="mt-12 md:mt-16 md:grid md:grid-cols-3 md:gap-10 lg:gap-12">
          {COLUMNS.map((column) => (
            <article key={column.title} className="py-6 first:pt-0 last:pb-0 md:py-0">
              <h3 className={H3}>{column.title}</h3>
              <p className={`${BODY_SM} mt-3 max-w-sm`}>{column.description}</p>

              <ul className="mt-3 flex list-none flex-col gap-3 p-0 md:mt-8">
                {column.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckIcon />
                    <span className="text-[13px] leading-[1.5] tracking-[-0.01em] text-[#111110] md:text-[14px]">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
