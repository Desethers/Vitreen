"use client";

import { GalleryOsSearchWidget, WhatsAppPdfMockup } from "@/components/shared/ArtworkAddInMocks";
import {
  BODY_SM,
  CONTAINER,
  EYEBROW,
  H2,
  H2_SUB,
  LINE_INK,
  SECTION,
} from "@/components/landing/styles";

const GMAIL_FLOW = [
  { step: "Search", text: "Find works by artist, title, year, availability or price." },
  { step: "Select", text: "Choose the works and information appropriate for the collector." },
  { step: "Insert", text: "Add artwork cards, a private link or a PDF to the email." },
];

const WHATSAPP_QUERIES = [
  "Available works by Marina Perez under €20,000",
  "Create a selection with these four works",
  "Prepare a PDF without visible prices",
];

/**
 * Two alternating image+text rows — the real Gmail and WhatsApp mockups
 * from ArtworkAddInMocks, not a numbered list. Row 1 puts the mockup on the
 * right, row 2 flips it to the left, so the section reads as a demonstration
 * rather than a stacked description.
 */
export default function LandingProduct() {
  return (
    <div id="product">
      {/* Gmail add-in */}
      <section className={`${SECTION} border-t border-[#E8E8E6] bg-white`}>
        <div className={CONTAINER}>
          <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
            <div>
              <p className={EYEBROW}>Vitreen for Gmail</p>
              <h2 className={`${H2} mt-4 max-w-md`}>
                Prepare the reply without leaving the email.
              </h2>
              <p className={`${H2_SUB} max-w-md`}>
                Search artworks, verify availability and insert images, details, prices, documents
                or a private selection directly into the message you are writing.
              </p>

              <ul className="mt-8 flex list-none flex-col gap-5 p-0">
                {GMAIL_FLOW.map((item, index) => (
                  <li key={item.step} className="flex items-start gap-4">
                    <span className="mt-[3px] text-[11px] tabular-nums text-[#ADADAA]">
                      0{index + 1}
                    </span>
                    <span>
                      <span className="font-display text-[15px] tracking-[-0.01em] text-[#111110] md:text-[16px]">
                        {item.step}
                      </span>
                      <p className={`${BODY_SM} mt-0.5 max-w-xs`}>{item.text}</p>
                    </span>
                  </li>
                ))}
              </ul>

              <p className={`${LINE_INK} mt-6 max-w-md`}>
                Or let Vitreen draft the full reply from the incoming email.
              </p>
            </div>

            <div className="relative mx-auto flex w-full max-w-sm items-center justify-center overflow-hidden rounded-[16px] bg-[#F5F5F3] px-6 py-10 md:max-w-none md:px-10 md:py-16">
              <div className="w-full max-w-[280px] rounded-[12px] border border-[#E8E8E6] bg-white p-5 shadow-[0_24px_60px_rgba(0,0,0,0.08)]">
                <GalleryOsSearchWidget />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp assistant */}
      <section className={`${SECTION} border-t border-[#E8E8E6] bg-[#F5F5F3]`}>
        <div className={CONTAINER}>
          <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
            <div className="order-2 relative mx-auto flex w-full max-w-sm items-center justify-center overflow-hidden rounded-[16px] bg-white px-6 py-10 md:order-1 md:max-w-none md:px-10 md:py-16">
              <div className="w-full max-w-[280px] rounded-[16px] border border-[#E8E8E6] bg-white p-5 shadow-[0_24px_60px_rgba(0,0,0,0.08)]">
                <WhatsAppPdfMockup />
              </div>
            </div>

            <div className="order-1 md:order-2">
              <p className={EYEBROW}>Vitreen for WhatsApp · AI assistant</p>
              <h2 className={`${H2} mt-4 max-w-sm`}>Turn a message into a presentation.</h2>
              <p className={`${H2_SUB} max-w-sm`}>
                Find matching works, control what the collector sees and share a clean private link
                or PDF without downloading images or rebuilding a document.
              </p>

              <ul className="mt-8 flex list-none flex-col gap-2 p-0">
                {WHATSAPP_QUERIES.map((query) => (
                  <li
                    key={query}
                    className="rounded-[8px] border border-[#DCDCD8] bg-white px-4 py-3 text-[13px] leading-[1.45] tracking-[-0.01em] text-[#111110] md:text-[14px]"
                  >
                    “{query}”
                  </li>
                ))}
              </ul>

              <p className={`${LINE_INK} mt-8 max-w-md`}>
                Vitreen prepares the material. Your gallery reviews and sends it.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
