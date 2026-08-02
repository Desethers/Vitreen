"use client";

type Work = {
  title: string;
  meta: string;
  image: string;
};

function SearchIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#ADADAA"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

/**
 * The hero artifact: one question in, grounded works and a drafted reply out.
 * It carries both rungs of the offer in a single panel — the question and the
 * artwork cards are what Send does, the drafted reply and the send button are
 * what Agent adds — so the hero sells the whole ladder without splitting into
 * two competing visuals.
 */
export default function AskAgentPanel({
  channelLabel,
  question,
  resultsLabel,
  works,
  draftLabel,
  draftText,
  footnote,
  ctaLabel,
}: {
  channelLabel: string;
  question: string;
  resultsLabel: string;
  works: Work[];
  draftLabel: string;
  draftText: string;
  footnote: string;
  ctaLabel: string;
}) {
  return (
    <div className="w-full max-w-[420px] overflow-hidden rounded-[12px] border border-[#E8E8E6] bg-white shadow-[0_24px_60px_rgba(0,0,0,0.08)]">
      <div className="flex items-center gap-2 border-b border-[#E8E8E6] px-4 py-2.5">
        <span className="text-[13px] font-medium text-[#111110]">Vitreen</span>
        <span className="text-[12px] text-[#ADADAA]">·</span>
        <span className="text-[12px] text-[#6B6A67]">{channelLabel}</span>
      </div>

      <div className="p-3.5">
        <div className="flex items-center gap-2 rounded-full border border-[#DCDCD8] px-3.5 py-2.5">
          <SearchIcon />
          <span className="text-[13px] leading-tight text-[#111110]">{question}</span>
        </div>
      </div>

      <div className="px-3.5 pb-3.5">
        <p className="mb-2 text-[11px] text-[#ADADAA]">{resultsLabel}</p>
        <div className="grid grid-cols-2 gap-2.5">
          {works.map((work) => (
            <div key={work.title} className="overflow-hidden rounded-[8px] border border-[#E8E8E6]">
              <img src={work.image} alt="" className="h-[78px] w-full object-cover" />
              <div className="px-2.5 py-2">
                <p className="text-[12px] font-medium leading-tight text-[#111110]">{work.title}</p>
                <p className="mt-0.5 text-[11px] leading-tight text-[#6B6A67]">{work.meta}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-dashed border-[#E1E1DE] p-3.5">
        <p className="mb-1.5 text-[11px] text-[#ADADAA]">{draftLabel}</p>
        <p className="text-[13px] leading-[1.55] text-[#111110]">{draftText}</p>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-[#E8E8E6] px-3.5 py-3">
        <span className="text-[11px] text-[#ADADAA]">{footnote}</span>
        <span className="shrink-0 rounded-full border border-[#DCDCD8] px-3.5 py-1.5 text-[12px] font-medium text-[#111110]">
          {ctaLabel}
        </span>
      </div>
    </div>
  );
}
