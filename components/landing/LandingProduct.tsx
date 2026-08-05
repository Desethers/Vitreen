"use client";

import { BODY_SM, CONTAINER, H2, H2_SUB, H3, SECTION } from "@/components/landing/styles";

const ITEMS = [
  {
    title: "Artwork database",
    text: "Keep the artwork information needed for sales in one clear place.",
  },
  {
    title: "AI assistant",
    text: "Search the inventory, prepare replies and generate PDFs from verified data.",
  },
  {
    title: "Gmail add-in",
    text: "Find works and prepare a response without leaving the email.",
  },
  {
    title: "WhatsApp add-in",
    text: "Create mobile-ready material directly from the conversation.",
  },
];

export default function LandingProduct() {
  return (
    <section className={`${SECTION} bg-white`}>
      <div className={CONTAINER}>
        <h2 className={`${H2} max-w-2xl`}>What you receive</h2>
        <p className={`${H2_SUB} max-w-2xl`}>
          Your artwork database, AI assistant, and add-ins for Gmail and WhatsApp.
        </p>

        <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-2">
          {ITEMS.map((item) => (
            <article
              key={item.title}
              className="group flex cursor-pointer gap-4 rounded-[12px] bg-[#F5F5F3] p-6 md:gap-5 md:p-8"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 16 16"
                fill="none"
                stroke="#ADADAA"
                strokeWidth="1.5"
                aria-hidden="true"
                className="mt-1 shrink-0"
              >
                <path d="M3 8l3.5 3.5L13 4" />
              </svg>
              <div>
                <h3 className={H3}>{item.title}</h3>
                <p className={`${BODY_SM} mt-2 max-w-md`}>{item.text}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-[13px] font-normal leading-none tracking-[-0.01em] text-[#ADADAA] transition-colors duration-200 group-hover:text-[#111110]">
                  Explore
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M2.5 6.5h8" />
                    <path d="m7.25 3.25 3.25 3.25-3.25 3.25" />
                  </svg>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
