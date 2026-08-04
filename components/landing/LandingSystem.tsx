"use client";

import { BODY, BODY_SM, CONTAINER, EYEBROW, H2, H3, SECTION } from "@/components/landing/styles";

const BENEFITS = [
  {
    title: "Import your inventory",
    text: "CSV, Excel or Artlogic.",
  },
  {
    title: "Organise each artwork",
    text: "Images, details, prices and availability in one reusable card.",
  },
  {
    title: "Use it everywhere",
    text: "Email, WhatsApp and collector PDFs.",
  },
];

export function SourceNotes() {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 md:gap-x-4">
      <div className="flex shrink-0 items-center gap-1.5 md:gap-2">
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#111110"
          strokeWidth="1.9"
          aria-hidden="true"
        >
          <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          <path d="m8.2 12.2 2.4 2.4 5.2-5.2" />
        </svg>
        <p className="whitespace-nowrap text-[10px] font-normal leading-[1.25] tracking-[-0.01em] text-[#111110] md:text-[12px]">
          Migration included
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-1.5 md:gap-2">
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#111110"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <path d="M12 3 20 6v6c0 4.8-3.2 7.8-8 9-4.8-1.2-8-4.2-8-9V6l8-3Z" />
          <path d="M9.2 12.2 11 14l3.8-4" />
        </svg>
        <p className="whitespace-nowrap text-[10px] font-normal leading-[1.25] tracking-[-0.01em] text-[#111110] md:text-[12px]">
          Your data stays confidential
        </p>
      </div>
    </div>
  );
}

export default function LandingSystem() {
  return (
    <section className={`${SECTION} bg-white`}>
      <div className={CONTAINER}>
        <p className={EYEBROW}>THE SYSTEM</p>
        <h2 className={`${H2} mt-4 max-w-3xl`}>Bring your artwork inventory into Vitreen.</h2>

        <p className={`${BODY} mt-5 max-w-2xl`}>
          Import from CSV, Excel or Artlogic. Vitreen organises each work into a reusable artwork
          card with its images, details, price, availability and documents.
        </p>
        <SourceNotes />

        <ol className="mt-10 grid list-none gap-4 p-0 md:mt-12 md:grid-cols-3 md:gap-5">
          {BENEFITS.map((benefit, index) => (
            <li
              key={benefit.title}
              className="min-h-[150px] rounded-[12px] border border-[#E8E8E6] bg-white p-5 md:min-h-[170px] md:py-6 md:pl-6 md:pr-4"
            >
              <span className="text-[14px] tabular-nums text-[#D0D0CD]">0{index + 1}</span>
              <h3 className={`${H3} mt-6`}>{benefit.title}</h3>
              <p className={`${BODY_SM} mt-3`}>{benefit.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
