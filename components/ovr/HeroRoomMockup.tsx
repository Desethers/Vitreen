"use client";

import { motion, useReducedMotion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

type Work = {
  src: string;
  artist: string;
  title: string;
  year: string;
  medium: string;
  dimensions: string;
  price: string;
  status?: "available" | "reserved";
};

const HERO: Work = {
  src: "/artworks/painting-03.jpg",
  artist: "Sacha Elron",
  title: "Evening Field",
  year: "2023",
  medium: "Oil on linen",
  dimensions: "180 × 180 cm",
  price: "8 000 €",
  status: "available",
};

const GRID: Work[] = [
  {
    src: "/artworks/painting-05.jpg",
    artist: "Sacha Elron",
    title: "Dawn Study No. 7",
    year: "2024",
    medium: "Acrylic on canvas",
    dimensions: "120 × 90 cm",
    price: "5 400 €",
    status: "available",
  },
  {
    src: "/artworks/painting-07.jpg",
    artist: "Sacha Elron",
    title: "Northern Light",
    year: "2024",
    medium: "Oil on canvas",
    dimensions: "150 × 120 cm",
    price: "6 800 €",
    status: "reserved",
  },
];

function StatusPill({ status }: { status: NonNullable<Work["status"]> }) {
  const available = status === "available";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-[3px] text-[10px] font-medium tracking-tight ${
        available ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${available ? "bg-emerald-500" : "bg-amber-500"}`}
      />
      {available ? "Available" : "Reserved"}
    </span>
  );
}

export function HeroRoomMockup() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative px-4 pb-16 pt-2 md:px-8 md:pb-24">
      {/* Ambient studio backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[-40px] -z-10 mx-auto h-[420px] max-w-4xl rounded-[80px] opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 30%, rgba(17,17,16,0.06), rgba(17,17,16,0) 70%)",
        }}
      />

      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease, delay: 0.05 }}
        className="relative mx-auto max-w-5xl"
      >
        {/* Browser window — realistic layered shadow + hairline border */}
        <div className="relative overflow-hidden rounded-[14px] border border-black/[0.08] bg-white shadow-[0_2px_4px_rgba(0,0,0,0.04),0_14px_28px_rgba(0,0,0,0.06),0_44px_88px_rgba(0,0,0,0.14)]">
          {/* Chrome / title bar */}
          <div className="flex items-center gap-3 border-b border-black/[0.06] bg-gradient-to-b from-[#FBFBFA] to-[#F4F4F2] px-4 py-3">
            <div className="flex gap-2">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.12)]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.12)]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.12)]" />
            </div>
            <div className="mx-auto flex max-w-sm flex-1 items-center justify-center gap-2 rounded-md border border-black/[0.05] bg-white px-3 py-1 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]">
              <svg
                width="10"
                height="10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="text-black/30"
                aria-hidden
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              <span className="truncate text-[11px] tracking-tight text-black/45">
                meridian-gallery.com/viewing-room/private
              </span>
            </div>
            <div className="hidden w-[52px] sm:block" />
          </div>

          {/* Screen — finished collector-facing viewing room */}
          <div className="relative bg-[#FBFBFA]">
            {/* Subtle screen glare */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-b from-white/30 via-transparent to-transparent"
            />

            {/* Gallery bar */}
            <div className="flex items-center justify-between border-b border-black/[0.05] px-6 py-4 md:px-10">
              <span className="font-display text-[12px] uppercase tracking-[0.22em] text-[#111110]">
                Meridian
              </span>
              <nav className="hidden items-center gap-6 text-[11px] tracking-tight text-[#6B6A67] sm:flex">
                <span>Works</span>
                <span>Exhibition</span>
                <span className="rounded-full bg-[#111110] px-3 py-1 text-white">Inquire</span>
              </nav>
            </div>

            {/* Room body */}
            <div className="mx-auto max-w-3xl px-6 pb-12 pt-9 md:px-10 md:pb-16 md:pt-12">
              {/* Header */}
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#ADADAA]">
                Private viewing room · prepared for Eve Bertrand
              </p>
              <h3 className="mt-3 font-display text-[26px] font-normal leading-[1.1] tracking-tight text-[#111110] md:text-[34px]">
                Sacha Elron — Evening Field
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-[#6B6A67]">
                12 March – 20 April 2025 · A suite of new paintings, available by private
                appointment.
              </p>

              {/* Hero artwork */}
              <figure className="mt-8">
                <div className="overflow-hidden rounded-sm bg-[#EFEFEC] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_18px_50px_rgba(0,0,0,0.10)]">
                  <img
                    src={HERO.src}
                    alt={`${HERO.artist}, ${HERO.title}`}
                    className="aspect-[4/3] w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <figcaption className="mt-3 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[13px] text-[#111110]">
                      <span className="font-medium">{HERO.artist}</span>,{" "}
                      <span className="italic">{HERO.title}</span>, {HERO.year}
                    </p>
                    <p className="mt-0.5 text-[12px] text-[#6B6A67]">
                      {HERO.medium} · {HERO.dimensions}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1.5">
                    {HERO.status && <StatusPill status={HERO.status} />}
                    <span className="text-[13px] tabular-nums text-[#111110]">{HERO.price}</span>
                  </div>
                </figcaption>
              </figure>

              {/* Two-up grid */}
              <div className="mt-10 grid grid-cols-2 gap-5 md:gap-7">
                {GRID.map((w) => (
                  <figure key={w.title}>
                    <div className="overflow-hidden rounded-sm bg-[#EFEFEC] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_34px_rgba(0,0,0,0.08)]">
                      <img
                        src={w.src}
                        alt={`${w.artist}, ${w.title}`}
                        className="aspect-[3/4] w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <figcaption className="mt-2.5">
                      <p className="text-[12px] text-[#111110]">
                        <span className="italic">{w.title}</span>, {w.year}
                      </p>
                      <p className="mt-0.5 text-[11px] text-[#6B6A67]">{w.dimensions}</p>
                      <div className="mt-1.5 flex items-center justify-between gap-2">
                        {w.status && <StatusPill status={w.status} />}
                        <span className="text-[12px] tabular-nums text-[#111110]">{w.price}</span>
                      </div>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
