"use client";

import { IntegrationsFrame } from "@/components/GalleryAssistantProductPage";
import { WhatsAppShareWorksMock } from "@/components/shared/ArtworkAddInMocks";
import { CONTAINER } from "@/components/landing/styles";

/* Same card-caption pattern as ServicesGrid (components/Services.tsx on main):
 * bottom gradient bar, title + "Explore" with an arrow that darkens on hover. */
function CardCaption({ title, action = "Explore" }: { title: string; action?: string }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-white/75 via-white/20 to-transparent px-4 pb-1.5 pt-1.5 backdrop-blur-[2px]">
      <div className="flex items-center justify-between gap-4">
        <h3 className="truncate font-display text-[13px] font-normal leading-none tracking-[-0.01em] text-[#111110]">
          {title}
        </h3>
        <span className="inline-flex shrink-0 items-center gap-1 text-[13px] font-normal leading-none tracking-[-0.01em] text-[#ADADAA] transition-colors duration-200 group-hover:text-[#111110]">
          {action}
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
    </div>
  );
}

function ArtworkPageMockup() {
  return (
    <div className="h-full w-full bg-white px-6 py-4 text-left">
      <p className="text-[9px] text-[#ADADAA]">‹ Artworks</p>
      <div className="mt-1.5">
        <h4 className="text-[13px] font-medium text-[#111110]">Evening field</h4>
        <p className="mt-0.5 text-[9px] text-[#ADADAA]">Sacha Elron, 2023</p>
      </div>

      <div className="mt-2 grid grid-cols-[1fr_1fr] gap-3 border-t border-[#E8E8E6] pt-1.5">
        <div>
          <p className="text-[8px] tracking-[0.1em] text-[#ADADAA]">Details</p>
          <div className="mt-1.5 space-y-1">
            <label className="block">
              <span className="mb-0.5 block text-[8px] text-[#6B6A67]">Title</span>
              <span className="block rounded-[5px] border border-[#D8D8D5] px-1.5 py-0.5 text-[9px] text-[#111110]">
                Evening field
              </span>
            </label>
            <label className="block">
              <span className="mb-0.5 block text-[8px] text-[#6B6A67]">Artist</span>
              <span className="block rounded-[5px] border border-[#D8D8D5] px-1.5 py-0.5 text-[9px] text-[#111110]">
                Sacha Elron
                <span className="ml-1 text-[#168044]">✓ Linked</span>
              </span>
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              <label className="block">
                <span className="mb-0.5 block text-[8px] text-[#6B6A67]">Year</span>
                <span className="block rounded-[5px] border border-[#D8D8D5] px-1.5 py-0.5 text-[9px] text-[#111110]">
                  2023
                </span>
              </label>
              <label className="block">
                <span className="mb-0.5 block text-[8px] text-[#6B6A67]">Medium</span>
                <span className="block truncate rounded-[5px] border border-[#D8D8D5] px-1.5 py-0.5 text-[9px] text-[#111110]">
                  Acrylic
                </span>
              </label>
            </div>
          </div>

          <p className="mt-1.5 text-[8px] tracking-[0.1em] text-[#ADADAA]">
            Dimensions &amp; status
          </p>
          <div className="mt-1.5 grid w-fit grid-cols-[auto_auto_auto_auto] items-center gap-1.5">
            <span className="rounded-[5px] border border-[#D8D8D5] px-1.5 py-0.5 text-center text-[9px] text-[#111110]">
              120
            </span>
            <span className="text-[#ADADAA]">×</span>
            <span className="rounded-[5px] border border-[#D8D8D5] px-1.5 py-0.5 text-center text-[9px] text-[#111110]">
              120
            </span>
            <span className="rounded-[5px] border border-[#D8D8D5] px-1.5 py-0.5 text-center text-[9px] text-[#111110]">
              cm
            </span>
          </div>
          <div className="mt-1.5 flex flex-wrap gap-1">
            {["Available", "Reserved", "Sold", "NFS"].map((status) => (
              <span
                key={status}
                className={`rounded-full border px-1.5 py-0.5 text-[8px] ${
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

        <div>
          <div className="flex items-center justify-between">
            <p className="text-[8px] tracking-[0.1em] text-[#ADADAA]">Images</p>
            <span className="text-[8px] text-[#ADADAA]">1</span>
          </div>
          <div className="relative mx-auto mt-1.5 aspect-[4/5] w-[78%] overflow-hidden rounded-[6px] border border-[#D8D8D5] bg-[#F5F5F3]">
            <img
              src="/artworks/painting-05.jpg"
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover"
            />
            <span className="absolute bottom-2 left-2 rounded-full bg-white/90 px-2 py-1 text-[8px] text-[#168044]">
              ★ Principale
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PrivateSelectionMockup() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-white text-left">
      <div>
        <div className="px-12 pt-4">
          <p className="text-[8px] tracking-[0.1em] text-[#ADADAA]">Sélection privée</p>
          <h4 className="mt-1 text-[14px] font-medium text-[#111110]">
            Spring selection — Sacha Elron
          </h4>
          <p className="mt-1 text-[9px] text-[#6B6A67]">Pour Marie Beaumont</p>
          <p className="mt-2 text-[9px] italic leading-[1.5] text-[#6B6A67]">
            A short selection from our autumn program — four recent canvases from Sacha
            Elron&rsquo;s chromatic studies, on view by appointment ahead of the fair.
          </p>
          <p className="mt-2 text-[8px] text-[#ADADAA]">
            Cette sélection est disponible jusqu&rsquo;au 24 août 2026
          </p>
        </div>
        <div className="relative mt-3 px-12">
          <div className="relative h-[150px] w-full overflow-hidden bg-[#F5F5F3]">
            <img
              src="/artworks/painting-05.jpg"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="flex items-start justify-between gap-3 px-12 py-3">
          <div>
            <p className="text-[10px] font-medium text-[#111110]">Sacha Elron</p>
            <p className="text-[9px] italic text-[#111110]">Evening field, 2023</p>
            <p className="mt-1 text-[8px] text-[#6B6A67]">Acrylic on canvas</p>
            <p className="text-[8px] text-[#6B6A67]">120 × 120 cm</p>
            <p className="mt-1 text-[10px] font-medium text-[#111110]">€10,000</p>
          </div>
          <span className="shrink-0 border border-[#D8D8D5] px-2.5 py-1.5 text-[8px] text-[#111110]">
            Inquire
          </span>
        </div>
      </div>
    </div>
  );
}

/** Mockups partagés EN/FR — seuls les libellés changent, via `labels`. */
const OUTPUT_NODES = [
  <ArtworkPageMockup key="database" />,
  <IntegrationsFrame key="gmail" />,
  <WhatsAppShareWorksMock key="whatsapp" />,
  <PrivateSelectionMockup key="selection" />,
];

export type OutputsCopy = {
  /** Un libellé par mockup, dans l'ordre : base, Gmail, WhatsApp, sélections. */
  labels: readonly [string, string, string, string];
  action?: string;
  /** Lien optionnel par carte, même ordre que `labels`. */
  hrefs?: readonly [string?, string?, string?, string?];
};

const EN_COPY: OutputsCopy = {
  labels: ["Database", "Gmail", "WhatsApp Add-ins", "Private Selection editor"],
  hrefs: [
    "/tools/artwork-inventory",
    "/tools/custom-operations",
    "/tools/custom-operations",
    "/tools/viewing-rooms",
  ],
};

export function OutputsSection({ copy }: { copy: OutputsCopy }) {
  return (
    <section className="bg-white px-4 pb-16 pt-0 md:px-6 md:pb-20 md:pt-2">
      <div className={CONTAINER}>
        <div className="grid gap-4 md:grid-cols-2">
          {OUTPUT_NODES.map((node, index) => {
            const href = copy.hrefs?.[index];
            const Wrapper = href ? "a" : "article";
            return (
              <Wrapper
                key={copy.labels[index]}
                {...(href ? { href } : {})}
                className="group relative overflow-hidden rounded-[12px] border border-[#E8E8E6] bg-white transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-[#111110]/20"
              >
                <div className="pointer-events-none relative h-[300px] overflow-hidden bg-[#F8F8F6] md:h-[360px]">
                  <div className="h-full transition-transform duration-300 ease-out group-hover:scale-[1.018]">
                    {node}
                  </div>
                </div>
                <CardCaption title={copy.labels[index]} action={copy.action} />
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function LandingOutputs() {
  return <OutputsSection copy={EN_COPY} />;
}
