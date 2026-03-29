"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const row1 = [
  {
    title: "Exhibition Pages",
    desc: "Des pages d'exposition claires et structurées, avec textes, images et liste d'œuvres.",
    mock: "exhibition",
  },
  {
    title: "Artist Pages",
    desc: "Pages artistes complètes. Biographie, œuvres et expositions réunies.",
    mock: "artist",
  },
  {
    title: "Email Diffusion",
    desc: "Diffusion par email. Partagez facilement expositions et œuvres à vos contacts.",
    mock: "email",
  },
];

const row2 = [
  {
    title: "Artwork Pages",
    desc: "Présentation claire et œuvres disponibles en ligne.",
    mock: "artwork",
  },
  {
    title: "Private Viewing",
    desc: "Envoyez facilement une sélection à vos collectionneurs.",
    mock: "viewing",
  },
  {
    title: "Direct Inquiry",
    desc: "Contact direct depuis chaque œuvre.",
    mock: "inquiry",
  },
];

/* ── Fake UI mocks ── */

function ExhibitionMock() {
  return (
    <div className="flex gap-3 h-full">
      {/* Left: artwork image placeholder */}
      <div className="w-[45%] bg-[#1a1a2e] rounded-lg flex items-end p-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#111]/40 to-transparent" />
        <div className="w-5 h-5 rounded-full border border-white/40 flex items-center justify-center relative z-10">
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </div>
      </div>

      {/* Right: details */}
      <div className="flex-1 flex flex-col gap-2.5 py-1">
        <div>
          <p className="text-[11px] font-medium text-[#111110]">Untitled, 2018</p>
          <p className="text-[9px] text-[#ADADAA]">Acrylic on canvas</p>
          <p className="text-[9px] text-[#ADADAA]">220 × 120 cm</p>
        </div>
        <p className="text-[11px] font-medium text-[#111110]">$16,500</p>
        <div className="border border-[#E8E8E6] rounded-md py-1.5 text-center transition-all duration-500 delay-300 group-hover:bg-[#111110] group-hover:border-[#111110]">
          <span className="text-[9px] uppercase tracking-[0.08em] text-[#111110] transition-colors duration-500 delay-300 group-hover:text-white">Add to cart</span>
        </div>
        <p className="text-[8px] text-[#ADADAA] leading-[1.5] line-clamp-4">
          This monochromatic, large-scale painting explores color, surface, and minimalism. The paintings are not the centre of the discussion; rather, it is the relationship in which they are entwined.
        </p>
        <div className="mt-auto space-y-1.5">
          <div className="flex items-center justify-between border-t border-[#E8E8E6] pt-1.5">
            <span className="text-[8px] uppercase tracking-[0.08em] text-[#111110]">Shipping and taxes</span>
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#ADADAA" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
          </div>
          <div className="flex items-center justify-between border-t border-[#E8E8E6] pt-1.5">
            <span className="text-[8px] uppercase tracking-[0.08em] text-[#111110]">FAQ</span>
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#ADADAA" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArtistMock() {
  return (
    <div className="flex flex-col h-full">
      {/* Hero: Artist photo + info side by side */}
      <div className="flex gap-3 mb-3">
        {/* Artist portrait — realistic with gradient layers */}
        <div className="w-[90px] h-[110px] rounded-lg shrink-0 overflow-hidden relative">
          {/* Sky */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#D4A070] via-[#C8956A] to-[#4A5568]" />
          {/* Horizon glow */}
          <div className="absolute bottom-[35%] left-0 right-0 h-[20%] bg-gradient-to-t from-[#E8B86D]/60 to-transparent" />
          {/* Silhouette - person shape */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[40px] h-[70px]">
            {/* Head */}
            <div className="w-[14px] h-[14px] rounded-full bg-[#2D3748] mx-auto" />
            {/* Cap */}
            <div className="w-[16px] h-[6px] bg-[#1A202C] mx-auto -mt-[5px] rounded-t-sm" />
            {/* Body */}
            <div className="w-[24px] h-[50px] bg-[#2D3748] mx-auto mt-[2px] rounded-t-md" />
          </div>
          {/* Power lines — subtle */}
          <div className="absolute top-[18%] left-0 right-0 h-px bg-[#1A202C]/20" />
          <div className="absolute top-[22%] left-0 right-0 h-px bg-[#1A202C]/15" />
        </div>

        {/* Artist info */}
        <div className="flex-1 flex flex-col gap-0.5 py-0.5 min-w-0">
          <p className="text-[12px] font-medium text-[#111110] tracking-[-0.01em]">Sun Dog</p>
          <p className="text-[7px] text-[#ADADAA] leading-[1.3]">Born 1960, Oklahoma, USA — Lives and works in New York</p>
          <div className="mt-1">
            <p className="text-[6.5px] text-[#6B6A67] leading-[1.45] line-clamp-4">
              Sun Dog explores the boundaries of landscape and abstraction through a deeply personal visual vocabulary. His paintings, often rendered in rich, saturated color fields, evoke a contemplative stillness.
            </p>
          </div>
          <div className="mt-auto border border-[#E8E8E6] rounded-md px-2.5 py-1 w-fit transition-all duration-500 delay-300 group-hover:bg-[#111110] group-hover:border-[#111110]">
            <span className="text-[7px] text-[#111110] transition-colors duration-500 delay-300 group-hover:text-white">read full biography</span>
          </div>
        </div>
      </div>

      {/* Tabs row — switches on hover */}
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-[7px] uppercase tracking-[0.1em] text-[#ADADAA] transition-opacity duration-500 group-hover:opacity-0">Selected Works</span>
        <span className="text-[7px] uppercase tracking-[0.1em] text-[#ADADAA] absolute transition-opacity duration-500 opacity-0 group-hover:opacity-100">Exhibitions</span>
        <div className="flex gap-1">
          {["Selected Works", "Exhibitions", "News", "Press", "Biography"].map((tab, i) => (
            <span
              key={tab}
              className={`text-[6.5px] px-1.5 py-0.5 rounded-full transition-all duration-500 ${
                i === 0
                  ? "bg-[#111110] text-white group-hover:bg-transparent group-hover:text-[#6B6A67] group-hover:border group-hover:border-[#E8E8E6]"
                  : i === 1
                  ? "border border-[#E8E8E6] text-[#6B6A67] group-hover:bg-[#111110] group-hover:text-white group-hover:border-[#111110]"
                  : "border border-[#E8E8E6] text-[#6B6A67]"
              }`}
            >
              {tab}
            </span>
          ))}
        </div>
      </div>

      {/* Content area — relative for stacking */}
      <div className="relative flex-1 min-h-0">
        {/* Selected Works — visible by default, hidden on hover */}
        <div className="absolute inset-0 grid grid-cols-3 gap-2 transition-all duration-500 opacity-100 group-hover:opacity-0 group-hover:translate-y-2">
          {[
            { gradient: "linear-gradient(180deg, #E8D020 0%, #E2C818 40%, #D4B810 100%)", title: "Untitled (Horizon)", year: "2024", dim: "152 × 122 cm" },
            { gradient: "linear-gradient(180deg, #C8D8F0 0%, #B0C4E8 50%, #A8BCE0 100%)", title: "Dawn Study No. 7", year: "2023", dim: "183 × 152 cm" },
            { gradient: "linear-gradient(180deg, #1a1a4e 0%, #141240 40%, #0E0E30 100%)", title: "Evening Field", year: "2023", dim: "122 × 91 cm" },
          ].map((work) => (
            <div key={work.title} className="flex flex-col gap-0.5">
              <div className="aspect-[4/5] rounded-md overflow-hidden relative" style={{ background: work.gradient }}>
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.1) 1px, rgba(0,0,0,0.1) 2px), repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(0,0,0,0.1) 1px, rgba(0,0,0,0.1) 2px)" }} />
              </div>
              <p className="text-[6px] text-[#ADADAA] mt-0.5">Sun Dog</p>
              <p className="text-[7px] text-[#111110] leading-tight font-medium">{work.title}, <span className="font-normal">{work.year}</span></p>
              <p className="text-[6px] text-[#ADADAA] italic">Oil on canvas</p>
            </div>
          ))}
        </div>

        {/* Exhibitions — hidden by default, visible on hover */}
        <div className="absolute inset-0 grid grid-cols-3 gap-2 transition-all duration-500 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
          {[
            {
              title: "Recent Studies",
              location: "Paris, Turenne",
              date: "Jan 12 — Feb 22, 2026",
              wall: "#F5F3F0",
              floor: "#9CA3AF",
              paintings: [{ color: "#4ADE80", w: "38%", h: "55%" }, { color: "#C8D8F0", w: "35%", h: "50%" }],
            },
            {
              title: "Your friends",
              location: "London",
              date: "Oct 05 — Nov 28, 2025",
              wall: "#F0EFED",
              floor: "#8B95A0",
              paintings: [{ color: "#1E40AF", w: "18%", h: "45%" }, { color: "#6B7C3F", w: "16%", h: "40%" }, { color: "#1A1A1A", w: "14%", h: "42%" }, { color: "#9CA3AF", w: "15%", h: "38%" }, { color: "#EA580C", w: "14%", h: "36%" }],
            },
            {
              title: "Quiet Paintings",
              location: "New York",
              date: "Mar 10 — Apr 30, 2025",
              wall: "#F5F3F0",
              floor: "#9CA3AF",
              paintings: [{ color: "#22D3EE", w: "35%", h: "52%" }, { color: "#D1FAE5", w: "32%", h: "48%" }],
            },
          ].map((expo) => (
            <div key={expo.title} className="flex flex-col gap-0.5">
              {/* Gallery room */}
              <div className="aspect-[4/3] rounded-md overflow-hidden relative" style={{ background: expo.wall }}>
                {/* Ceiling line */}
                <div className="absolute top-[8%] left-[10%] right-[10%] h-[2px] bg-white/60 rounded-full" />
                {/* Floor */}
                <div className="absolute bottom-0 left-0 right-0 h-[25%] rounded-b-md" style={{ background: `linear-gradient(180deg, ${expo.floor}40 0%, ${expo.floor}80 100%)` }} />
                {/* Paintings on wall */}
                <div className="absolute top-[15%] left-[5%] right-[5%] bottom-[28%] flex items-center justify-center gap-[4%]">
                  {expo.paintings.map((p, j) => (
                    <div key={j} className="rounded-sm shadow-sm" style={{ background: p.color, width: p.w, height: p.h }} />
                  ))}
                </div>
              </div>
              <p className="text-[7px] text-[#111110] font-medium mt-0.5">{expo.title}</p>
              <p className="text-[6px] text-[#ADADAA]">{expo.location} — {expo.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EmailMock() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="mb-3">
        <span className="text-[9px] uppercase tracking-[0.12em] text-[#ADADAA]">Artists</span>
      </div>

      {/* Grid of artist photos */}
      <div className="grid grid-cols-2 gap-2 flex-1">
        {[
          { name: "Artiste A 1", color: "#8B7355" },
          { name: "Artiste B 2", color: "#C4956A" },
          { name: "Artiste E 5", color: "#D4A534" },
          { name: "Artiste F 6", color: "#A08060" },
        ].map((artist) => (
          <div key={artist.name} className="flex flex-col gap-1.5">
            <div
              className="aspect-[4/5] rounded-lg"
              style={{ background: artist.color }}
            />
            <span className="text-[9px] text-[#111110]">{artist.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Step 2 row mocks */

function ArtworkMock() {
  return (
    <div className="flex gap-3 h-full">
      {/* Left: artwork image */}
      <div className="w-[45%] bg-[#1a1a2e] rounded-lg flex items-end p-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#111]/40 to-transparent" />
        <div className="w-5 h-5 rounded-full border border-white/40 flex items-center justify-center relative z-10">
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </div>
      </div>
      {/* Right: details */}
      <div className="flex-1 flex flex-col gap-2.5 py-1">
        <div>
          <p className="text-[11px] font-medium text-[#111110]">Untitled, 2018</p>
          <p className="text-[9px] text-[#ADADAA]">Acrylic on canvas</p>
          <p className="text-[9px] text-[#ADADAA]">220 × 120 cm</p>
        </div>
        <p className="text-[11px] font-medium text-[#111110]">$16,500</p>
        <div className="border border-[#E8E8E6] rounded-md py-1.5 text-center transition-all duration-500 delay-300 group-hover:bg-[#111110] group-hover:border-[#111110]">
          <span className="text-[9px] uppercase tracking-[0.08em] text-[#111110] transition-colors duration-500 delay-300 group-hover:text-white">Add to cart</span>
        </div>
        <p className="text-[8px] text-[#ADADAA] leading-[1.5] line-clamp-3">
          This monochromatic, large-scale painting explores color, surface, and minimalism.
        </p>
        <div className="mt-auto space-y-1.5">
          <div className="flex items-center justify-between border-t border-[#E8E8E6] pt-1.5">
            <span className="text-[8px] uppercase tracking-[0.08em] text-[#111110]">Shipping and taxes</span>
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#ADADAA" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
          </div>
          <div className="flex items-center justify-between border-t border-[#E8E8E6] pt-1.5">
            <span className="text-[8px] uppercase tracking-[0.08em] text-[#111110]">FAQ</span>
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#ADADAA" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function ViewingMock() {
  return (
    <div className="flex flex-col h-full">
      {/* Image placeholder — exhibition/artist photo */}
      <div className="flex-1 bg-[#E8E5E0] rounded-lg overflow-hidden flex items-center justify-center relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-14 mx-auto rounded bg-[#D4522A]/20 flex items-center justify-center">
              <span className="text-[#D4522A] text-[18px] font-bold italic leading-none tracking-tight">Don DeLillo</span>
            </div>
          </div>
        </div>
      </div>
      {/* Caption */}
      <div className="flex items-center justify-between mt-3">
        <div>
          <p className="text-[10px] text-[#111110]">Don DeLillo 02, 2025</p>
          <p className="text-[9px] text-[#ADADAA]">Acrylic on canvas, 80 × 80 cm</p>
        </div>
        <div className="border border-[#E8E8E6] rounded-md px-3 py-1.5 transition-all duration-500 delay-300 group-hover:bg-[#111110] group-hover:border-[#111110]">
          <span className="text-[9px] text-[#111110] transition-colors duration-500 delay-300 group-hover:text-white">Inquire</span>
        </div>
      </div>
    </div>
  );
}

function InquiryMock() {
  return (
    <div className="flex flex-col h-full">
      <div className="mb-3">
        <span className="text-[9px] uppercase tracking-[0.12em] text-[#ADADAA]">Artists</span>
      </div>
      <div className="grid grid-cols-2 gap-2 flex-1">
        {[
          { name: "Artiste A 1", color: "#8B7355" },
          { name: "Artiste B 2", color: "#C4956A" },
          { name: "Artiste E 5", color: "#D4A534" },
          { name: "Artiste F 6", color: "#A08060" },
        ].map((artist) => (
          <div key={artist.name} className="flex flex-col gap-1.5">
            <div className="aspect-[4/5] rounded-lg" style={{ background: artist.color }} />
            <span className="text-[9px] text-[#111110]">{artist.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const mocks: Record<string, () => React.JSX.Element> = {
  exhibition: ExhibitionMock,
  artist: ArtistMock,
  email: EmailMock,
  artwork: ArtworkMock,
  viewing: ViewingMock,
  inquiry: InquiryMock,
};

function CardRow({ cards }: { cards: { title: string; desc: string; mock: string }[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {cards.map((card, i) => {
        const MockComponent = mocks[card.mock];
        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease, delay: i * 0.1 }}
            className="group rounded-[10px] bg-[#FAF6F5] p-[20px] flex flex-col"
          >
            <h3 className="font-medium text-[#111110] text-base tracking-[-0.01em] mb-0">
              {card.title}
            </h3>
            <p className="text-[#6B6A67] text-sm leading-[1.55] mb-5">
              {card.desc}
            </p>
            <div className="w-full max-w-[400px] h-[430px] mx-auto bg-white rounded-[10px] p-4 overflow-hidden">
              <MockComponent />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function Solution() {
  return (
    <section className="py-20 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-8"
        >
          <h2 className="font-display text-[26px] md:text-[26px] font-normal text-[#111110] leading-[1.3] tracking-[-0.02em] max-w-2xl">
            Faciliter les échanges autour des œuvres
          </h2>
          <p className="mt-1 text-[#6B6A67] text-[26px] font-normal max-w-xl leading-[1.3] tracking-[-0.02em]">
            Interactions ciblées et simples. Renforcez votre visibilité et vos relations.
          </p>
        </motion.div>

        {/* Row 2 Cards */}
        <CardRow cards={row2} />
      </div>
    </section>
  );
}
