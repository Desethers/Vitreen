"use client";

import { IntegrationsFrame } from "@/components/GalleryAssistantProductPage";
import { WhatsAppPdfMockup } from "@/components/shared/ArtworkAddInMocks";
import { BODY, CONTAINER, EYEBROW, H2, SECTION } from "@/components/landing/styles";

function ExploreLink() {
  return (
    <span className="inline-flex items-center gap-1 text-[12px] font-normal leading-none tracking-[-0.01em] text-[#ADADAA] transition-colors duration-200 group-hover:text-[#111110]">
      Explore
      <svg
        width="12"
        height="12"
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
  );
}

function DatabaseMockup() {
  return (
    <div className="h-full w-full bg-white p-4 text-left">
      <p className="text-[9px] text-[#ADADAA]">‹ Artists</p>
      <h4 className="mt-1 text-[13px] font-medium text-[#111110]">Sacha Elron</h4>
      <p className="mt-0.5 text-[9px] text-[#ADADAA]">US — Born 1975 · 6 artworks</p>

      <div className="mt-3 flex gap-3 border-b border-[#E8E8E6] pb-2 text-[9px] text-[#ADADAA]">
        <span className="text-[#111110]">Identity</span>
        <span>Bio</span>
        <span>Works</span>
        <span>News &amp; press</span>
      </div>

      <div className="mt-3 grid grid-cols-[1fr_1fr_64px] gap-2">
        <label className="block">
          <span className="mb-1 block text-[8px] text-[#6B6A67]">First name</span>
          <span className="block rounded-[5px] border border-[#D8D8D5] px-2 py-1.5 text-[9px] text-[#111110]">
            Sacha
          </span>
        </label>
        <label className="block">
          <span className="mb-1 block text-[8px] text-[#6B6A67]">Last name</span>
          <span className="block rounded-[5px] border border-[#D8D8D5] px-2 py-1.5 text-[9px] text-[#111110]">
            Elron
          </span>
        </label>
        <div>
          <span className="mb-1 block text-[8px] text-[#6B6A67]">Portrait</span>
          <div className="h-[38px] w-[64px] overflow-hidden rounded-[5px] border border-[#D8D8D5]">
            <img
              src="/artworks/painting-05.jpg"
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover"
            />
          </div>
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
  { label: "Database", node: <DatabaseMockup /> },
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
              className="group overflow-hidden rounded-[12px] border border-[#E8E8E6] bg-[#F8F8F6]"
            >
              <div className="relative h-[220px] overflow-hidden md:h-[260px]">{item.node}</div>
              <div className="flex items-center justify-between border-t border-[#E8E8E6] bg-white px-5 py-4">
                <span className="text-[13px] text-[#6B6A67]">{item.label}</span>
                <ExploreLink />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
