"use client";

import { motion, useReducedMotion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const INSTALL = "/gallery%20hero%20mock/judd-wall-stack.png";
const INSTALL_2 = "/gallery%20hero%20mock/judd-floor-boxes.png";

export function HeroRoomMockup() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative px-4 pb-16 pt-2 md:px-8 md:pb-24">
      {/* Ambient backdrop */}
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
        className="relative mx-auto max-w-7xl"
      >
        {/* Editor frame */}
        <div className="relative overflow-hidden rounded-[16px] border border-black/[0.08] bg-[#F6F6F5]">
          {/* ── Floating editor UI ───────────────────────────── */}
          {/* Progress ring (top-left) */}
          <div className="absolute left-4 top-4 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_6px_20px_rgba(0,0,0,0.10)]">
            <svg width="40" height="40" viewBox="0 0 40 40" className="-rotate-90" aria-hidden>
              <circle cx="20" cy="20" r="17" fill="none" stroke="#ECECEA" strokeWidth="3" />
              <circle
                cx="20"
                cy="20"
                r="17"
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="106.8"
                strokeDashoffset="0"
              />
            </svg>
            <span className="absolute text-[10px] font-semibold tracking-tight text-emerald-600">
              100%
            </span>
          </div>

          {/* Toolbar (top-center) */}
          <div className="absolute left-1/2 top-4 z-30 hidden -translate-x-1/2 items-stretch overflow-hidden rounded-[8px] border border-black/[0.06] bg-white shadow-[0_6px_20px_rgba(0,0,0,0.10)] sm:flex">
            <button
              type="button"
              className="my-1 ml-1 flex items-center rounded-[6px] px-4 text-[14px] tracking-tight text-[#3A3A38] transition-colors hover:bg-[#F5F5F3]"
            >
              + Images
            </button>
            <span className="my-3 w-px bg-black/[0.08]" />
            <button
              type="button"
              className="my-1 ml-1 flex items-center rounded-[6px] px-4 text-[14px] tracking-tight text-[#3A3A38] transition-colors hover:bg-[#F5F5F3]"
            >
              + Text
            </button>
            <button
              type="button"
              className="m-1 flex items-center gap-2 rounded-[6px] bg-[#111110] px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-black"
            >
              Send to Jean dupond
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Account controls (top-right) */}
          <div className="absolute right-4 top-4 z-30 flex items-center gap-2.5">
            <span className="rounded-full bg-[#111110] px-4 py-2 text-[12.5px] font-medium text-white shadow-[0_6px_20px_rgba(0,0,0,0.10)]">
              Sign in
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.06] bg-white text-[#6B6A67] shadow-[0_6px_20px_rgba(0,0,0,0.10)]">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                aria-hidden
              >
                <path
                  d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>

          {/* ── Document canvas ──────────────────────────────── */}
          <div className="relative max-h-[640px] overflow-hidden px-4 pb-10 pt-[78px] md:px-10 md:pt-[92px]">
            <div className="mx-auto max-w-5xl bg-white px-7 py-9 md:px-16 md:py-14">
              {/* Header */}
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#ADADAA]">
                Galerie du Jour
              </p>
              <h3 className="mt-5 font-display text-[28px] font-normal leading-[1.1] tracking-[-0.01em] text-[#111110] md:text-[34px]">
                Exhibition Selection
              </h3>
              <p className="font-display text-[24px] font-normal leading-[1.15] tracking-[-0.01em] text-[#ADADAA] md:text-[30px]">
                Works from the show
              </p>

              <p className="mt-7 text-[14px] tracking-tight text-[#6B6A67]">For Jean Dupond</p>
              <p className="mt-5 max-w-xl text-[15px] leading-[1.7] text-[#111110]">
                Following the exhibition, here is a selection of remaining works.
                <br />
                Let me know if you’d like further material.
              </p>

              <div className="mt-9 h-px w-full bg-[#ECECEA]" />

              {/* Artwork 1 — install shot */}
              <figure className="mt-9">
                <div className="overflow-hidden bg-[#EFEFEC]">
                  <img
                    src={INSTALL}
                    alt="Sacha Elron, Painting 10 — installation view"
                    className="aspect-[16/10] w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <figcaption className="mt-4 flex items-start justify-between gap-6">
                  <div>
                    <p className="text-[14px] tracking-tight text-[#111110]">Sacha Elron</p>
                    <p className="text-[14px] tracking-tight text-[#111110]">
                      <span className="italic">Painting 10</span>, 2024
                    </p>
                    <p className="mt-2 text-[13px] leading-snug text-[#ADADAA]">
                      Acrylic on canvas
                      <br />
                      180 × 180 cm
                    </p>
                    <p className="mt-2 text-[14px] tabular-nums text-[#111110]">8000 €</p>
                  </div>
                  <button
                    type="button"
                    className="shrink-0 rounded-md border border-[#E6B0B0] px-5 py-2 text-[13px] tracking-tight text-[#111110] transition-colors hover:bg-[#FBF3F3]"
                  >
                    Inquire
                  </button>
                </figcaption>
              </figure>

              {/* Artwork 2 — teased below the fold */}
              <figure className="mt-10">
                <div className="overflow-hidden bg-[#EFEFEC]">
                  <img
                    src={INSTALL_2}
                    alt="Installation view"
                    className="aspect-[16/9] w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </figure>
            </div>

            {/* Fade the document into the frame at the bottom */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#F6F6F5] to-transparent"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
