"use client";

import {
  BODY_SM,
  CONTAINER,
  EYEBROW,
  H2,
  H2_SUB,
  H3,
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

export default function LandingProduct() {
  return (
    <div id="product">
      {/* Gmail add-in */}
      <section className={`${SECTION} bg-white`}>
        <div className={CONTAINER}>
          <p className={EYEBROW}>Vitreen for Gmail</p>
          <h2 className={`${H2} mt-4 max-w-2xl`}>Prepare the reply without leaving the email.</h2>
          <p className={`${H2_SUB} max-w-2xl`}>
            Search artworks, verify availability and insert images, details, prices, documents or a
            private selection directly into the message you are writing.
          </p>

          <ol className="mt-10 grid list-none gap-0 p-0 md:mt-12 md:grid-cols-3 md:gap-10">
            {GMAIL_FLOW.map((item, index) => (
              <li
                key={item.step}
                className="border-t border-[#E8E8E6] py-5 last:border-b md:border-b-0 md:py-0 md:pt-6 md:last:border-b-0"
              >
                <span className="text-[11px] tabular-nums text-[#ADADAA]">0{index + 1}</span>
                <p className={`${H3} mt-2`}>{item.step}</p>
                <p className={`${BODY_SM} mt-2 max-w-sm`}>{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* WhatsApp assistant */}
      <section className={`${SECTION} bg-[#F5F5F3]`}>
        <div className={CONTAINER}>
          <p className={EYEBROW}>Vitreen for WhatsApp</p>
          <h2 className={`${H2} mt-4 max-w-xl`}>Turn a message into a presentation.</h2>
          <p className={`${H2_SUB} max-w-xl`}>
            Find matching works, control what the collector sees and share a clean private link or
            PDF without downloading images or rebuilding a document.
          </p>

          <ul className="mt-8 flex list-none flex-col gap-2 p-0 md:max-w-xl">
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
      </section>
    </div>
  );
}
