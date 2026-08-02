"use client";

/**
 * One cheap, text-only diagram — source → layer → outputs. No pixel-level
 * Gmail/WhatsApp compositions: keeps the landing minimal and keeps the
 * component light to build and to render.
 */
export function ConnectedFlowDiagram({
  sources = ["Artlogic", "CSV / spreadsheets", "Existing database"],
  layerTitle = "Vitreen artwork layer",
  layerSubtitle = "Artworks, artists, images, dimensions, prices, availability, documents",
  outputs = ["Gmail", "WhatsApp", "Private links", "PDFs"],
}: {
  sources?: string[];
  layerTitle?: string;
  layerSubtitle?: string;
  outputs?: string[];
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex w-full flex-wrap justify-center gap-2">
        {sources.map((source) => (
          <span
            key={source}
            className="rounded-full border border-[#E8E8E6] bg-white px-4 py-2 text-[12px] text-[#6B6A67] md:text-[13px]"
          >
            {source}
          </span>
        ))}
      </div>

      <span aria-hidden="true" className="text-[16px] leading-none text-[#ADADAA]">
        ↓
      </span>

      <div className="w-full rounded-[12px] border border-[#111110] bg-[#111110] px-5 py-4 text-center md:px-8 md:py-5">
        <p className="font-display text-[16px] tracking-[-0.02em] text-white md:text-[20px]">
          {layerTitle}
        </p>
        <p className="mt-1 text-[12px] text-white/60 md:text-[13px]">{layerSubtitle}</p>
      </div>

      <span aria-hidden="true" className="text-[16px] leading-none text-[#ADADAA]">
        ↓
      </span>

      <div className="flex w-full flex-wrap justify-center gap-2">
        {outputs.map((output) => (
          <span
            key={output}
            className="rounded-full border border-[#E8E8E6] bg-white px-4 py-2 text-[12px] text-[#111110] md:text-[13px]"
          >
            {output}
          </span>
        ))}
      </div>
    </div>
  );
}
