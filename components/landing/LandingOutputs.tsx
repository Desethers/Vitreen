"use client";

import { IntegrationsFrame } from "@/components/GalleryAssistantProductPage";
import { WhatsAppPdfMockup } from "@/components/shared/ArtworkAddInMocks";
import { BODY, CONTAINER, EYEBROW, H2, SECTION } from "@/components/landing/styles";

function ArtworkPageMockup() {
  return (
    <div className="h-full w-full bg-white p-5 text-left">
      <p className="text-[9px] text-[#ADADAA]">‹ Artworks</p>
      <div className="mt-1.5 flex items-start justify-between gap-3">
        <div>
          <h4 className="text-[14px] font-medium text-[#111110]">Evening field</h4>
          <p className="mt-0.5 flex items-center gap-1.5 text-[9px] text-[#ADADAA]">
            Sacha Elron, 2023
            <span className="h-1 w-1 rounded-full bg-[#E8A93A]" aria-hidden="true" />
            Changes not on the site yet
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <span className="rounded-[5px] border border-[#D8D8D5] px-2 py-1 text-[9px] text-[#6B6A67]">
            Cancel
          </span>
          <span className="rounded-[5px] bg-[#111110] px-2.5 py-1 text-[9px] text-white">
            Save draft
          </span>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-[1fr_1fr] gap-4 border-t border-[#E8E8E6] pt-3">
        <div>
          <p className="text-[8px] uppercase tracking-[0.1em] text-[#ADADAA]">Details</p>
          <div className="mt-2 space-y-2">
            <label className="block">
              <span className="mb-1 block text-[8px] text-[#6B6A67]">Title</span>
              <span className="block rounded-[5px] border border-[#D8D8D5] px-2 py-1.5 text-[9px] text-[#111110]">
                Evening field
              </span>
            </label>
            <label className="block">
              <span className="mb-1 block text-[8px] text-[#6B6A67]">Artist</span>
              <span className="block rounded-[5px] border border-[#D8D8D5] px-2 py-1.5 text-[9px] text-[#111110]">
                Sacha Elron
                <span className="ml-1 text-[#168044]">✓ Linked</span>
              </span>
            </label>
          </div>

          <p className="mt-4 text-[8px] uppercase tracking-[0.1em] text-[#ADADAA]">
            Dimensions &amp; status
          </p>
          <div className="mt-2 grid grid-cols-[1fr_auto_1fr_0.7fr] items-center gap-1.5">
            <span className="rounded-[5px] border border-[#D8D8D5] py-1.5 text-center text-[9px] text-[#111110]">
              120
            </span>
            <span className="text-[#ADADAA]">×</span>
            <span className="rounded-[5px] border border-[#D8D8D5] py-1.5 text-center text-[9px] text-[#111110]">
              120
            </span>
            <span className="rounded-[5px] border border-[#D8D8D5] py-1.5 text-center text-[9px] text-[#111110]">
              cm
            </span>
          </div>
          <div className="mt-2 flex flex-wrap gap-1">
            {["Available", "Reserved", "Sold"].map((status) => (
              <span
                key={status}
                className={`rounded-full border px-2 py-1 text-[8px] ${
                  status === "Available"
                    ? "border-[#111110] bg-[#111110] text-white"
                    : "border-[#D8D8D5] text-[#6B6A67]"
                }`}
              >
                {status}
              </span>
            ))}
          </div>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden rounded-[6px] border border-[#D8D8D5] bg-[#F5F5F3]">
          <img
            src="/artworks/painting-05.jpg"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
          <span className="absolute bottom-2 left-2 rounded-full bg-white/90 px-2 py-1 text-[8px] text-[#168044]">
            ✓ Principale
          </span>
        </div>
      </div>
    </div>
  );
}

function PrivateSelectionMockup() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <img
        src="/screenshot-viewingroom.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-white/55" />
      <div className="relative p-4 text-left">
        <p className="text-[9px] uppercase tracking-[0.1em] text-[#6B6A67]">Selection privée</p>
        <h4 className="mt-1 text-[13px] font-medium text-[#111110]">Selection — Sacha Elron</h4>
        <p className="mt-0.5 text-[9px] text-[#6B6A67]">Pour Marie Beaumont</p>
        <p className="mt-0.5 text-[8px] text-[#ADADAA]">
          Cette sélection est disponible jusqu&rsquo;au 24 juillet 2026
        </p>
      </div>
    </div>
  );
}

const OUTPUTS = [
  { label: "Database", node: <ArtworkPageMockup /> },
  { label: "Gmail", node: <IntegrationsFrame /> },
  { label: "Private Selection editor", node: <PrivateSelectionMockup /> },
  {
    label: "WhatsApp Add-ins",
    node: (
      <div className="flex h-full items-center justify-center">
        <WhatsAppPdfMockup />
      </div>
    ),
  },
];

export default function LandingOutputs() {
  return (
    <section className={`${SECTION} border-t border-[#E8E8E6] bg-white`}>
      <div className={CONTAINER}>
        <p className={EYEBROW}>Ready to send</p>
        <h2 className={`${H2} mt-4 max-w-2xl`}>One artwork card, ready for every sales format.</h2>
        <p className={`${BODY} mt-5 max-w-2xl`}>
          The same verified artwork information moves into the channel your collector already uses.
        </p>

        <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-2">
          {OUTPUTS.map((item) => (
            <article
              key={item.label}
              aria-label={item.label}
              className="relative h-[300px] overflow-hidden rounded-[12px] border border-[#E8E8E6] bg-[#F8F8F6] md:h-[360px]"
            >
              <div className="absolute inset-0 overflow-hidden">{item.node}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
