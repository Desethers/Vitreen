"use client";

import { BODY_SM, CONTAINER, EYEBROW, H2, H2_SUB, SECTION } from "@/components/landing/styles";

const GUARANTEES = [
  "Grounded in your artwork records",
  "Human approval, always",
  "Replies in the collector’s language",
  "Your data stays yours",
];

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
      className="shrink-0"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

/**
 * The engine behind Product, not a fifth offer — deliberately more sober
 * than the Gmail/WhatsApp mockups (no shadow, no color): a plain bordered
 * strip showing incoming message → AI draft → a disabled send button,
 * making "human approval, always" visible rather than just claimed.
 */
export default function LandingAi() {
  return (
    <section className={`${SECTION} border-t border-[#E8E8E6] bg-white`}>
      <div className={CONTAINER}>
        <p className={EYEBROW}>Vitreen AI</p>
        <h2 className={`${H2} mt-4 max-w-2xl`}>
          Behind every reply, an AI that has read your entire inventory.
        </h2>
        <p className={`${H2_SUB} max-w-2xl`}>
          When a collector writes, Vitreen already has a draft ready: the right works, the right
          price, the right language. It can only answer from your records — and nothing is sent
          without your click.
        </p>

        <div className="mt-10 flex flex-col gap-6 md:mt-12 md:flex-row md:items-center md:justify-between md:gap-10">
          <ul className="flex flex-col gap-3 md:gap-4">
            {GUARANTEES.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <CheckIcon />
                <span className={BODY_SM}>{item}</span>
              </li>
            ))}
          </ul>

          <div className="w-full max-w-sm rounded-[12px] border border-[#E8E8E6] bg-white p-4 md:p-5">
            <p className="text-[11px] text-[#ADADAA]">Incoming — collector</p>
            <p className="mt-1 text-[13px] leading-[1.5] text-[#111110]">
              “Do you still have works by Marina Perez available?”
            </p>
            <div className="my-4 border-t border-dashed border-[#E1E1DE]" aria-hidden />
            <p className="text-[11px] text-[#ADADAA]">Vitreen AI — draft</p>
            <p className="mt-1 text-[13px] leading-[1.5] text-[#111110]">
              Two works available — “Evening Field” and “Low Tide”, both on request. Sending details
              now.
            </p>
            <button
              disabled
              className="mt-4 w-full cursor-not-allowed rounded-full border border-[#E8E8E6] py-2 text-[12px] font-medium text-[#ADADAA]"
            >
              Review &amp; send
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
