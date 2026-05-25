"use client";

import { motion } from "framer-motion";
import {
  StepTwoSharingFlow,
  DeployCardStack,
} from "@/components/ProcessFlow";

const ease = [0.16, 1, 0.3, 1] as const;

/* ─── Step 01 — Audit ─── */
/* Desktop clutter: hyperreal fragments of a working environment.
   Never fully visible — pieces of context bleed past the frame. */

const cardSurface =
  "rounded-[3px] border border-[#E8E8E6] bg-white shadow-[0_4px_14px_rgba(0,0,0,0.05)]";

function MetaLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="block text-[6px] uppercase tracking-[0.16em] text-[#ADADAA]">
      {children}
    </span>
  );
}

function MetaValue({ children, mono = false }: { children: React.ReactNode; mono?: boolean }) {
  return (
    <span className={`block text-[8px] leading-[1.3] text-[#111110] ${mono ? "font-mono" : ""}`}>
      {children}
    </span>
  );
}

function AuditMock() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease }}
      className="relative h-full w-full overflow-hidden rounded-lg bg-white"
    >
      {/* Artwork thumb */}
      <div
        className={`absolute ${cardSurface} overflow-hidden`}
        style={{ top: 90, left: 90, width: 84, height: 104, transform: "rotate(-3deg)", padding: 4 }}
      >
        <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-[#D4C5B0] via-[#B8A48A] to-[#8A7560]">
          <div className="absolute left-[18%] top-[14%] h-[55%] w-[42%] rounded-[40%] bg-[#3A2F25]/70 blur-[1px]" />
          <div className="absolute bottom-[10%] right-[12%] h-[18%] w-[40%] bg-[#5B4A3A]/55" />
          <div className="absolute left-[8%] bottom-[8%] h-[2px] w-[30%] bg-[#EAD9BF]/60" />
        </div>
      </div>

      {/* Artwork metadata record */}
      <div
        className={`absolute ${cardSurface} px-3 py-2`}
        style={{ top: 80, left: 190, width: 200, transform: "rotate(-0.5deg)" }}
      >
        <div className="flex items-baseline justify-between">
          <MetaValue>Pablo Picasso</MetaValue>
          <span className="text-[7px] tabular-nums text-[#6B6A67]">INV-2410</span>
        </div>
        <span className="block text-[7px] italic text-[#6B6A67]">Mousquetaire, 1972</span>
        <div className="mt-1 grid grid-cols-2 gap-x-2 gap-y-[3px]">
          <MetaLabel>Medium</MetaLabel>
          <MetaLabel>Dimensions</MetaLabel>
          <span className="text-[7px] text-[#111110]">Oil on canvas</span>
          <span className="text-[7px] tabular-nums text-[#111110]">162 × 130 cm</span>
          <MetaLabel>Provenance</MetaLabel>
          <MetaLabel>Price</MetaLabel>
          <span className="text-[7px] text-[#111110]">Pace, NY · 2014</span>
          <span className="text-[7px] tabular-nums text-[#111110]">€ 120,000</span>
        </div>
      </div>

      {/* Status pill */}
      <div
        className="absolute flex items-center gap-1.5 rounded-full border border-[#111110] bg-[#111110] px-2 py-[3px]"
        style={{ top: 200, left: 290, transform: "rotate(2deg)" }}
      >
        <span className="block h-[5px] w-[5px] rounded-full bg-[#FEBC2E]" />
        <span className="text-[7px] font-medium uppercase tracking-[0.14em] text-white">
          Reserved · Hold 06.06.26
        </span>
      </div>

      {/* Collector chip */}
      <div
        className={`absolute ${cardSurface} flex items-center gap-2 px-2 py-1.5`}
        style={{ bottom: 70, left: 90, transform: "rotate(-1.5deg)" }}
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#111110]">
          <span className="text-[9px] font-semibold tracking-wide text-white">MT</span>
        </div>
        <div className="flex flex-col leading-tight">
          <MetaValue>M. Tanaka</MetaValue>
          <span className="text-[6.5px] uppercase tracking-[0.14em] text-[#ADADAA]">
            Tokyo · Tier 1 · Since 2018
          </span>
        </div>
      </div>

      {/* File path strip */}
      <div
        className="absolute flex items-center gap-1 rounded-[3px] border border-[#E8E8E6] bg-[#F5F5F3] px-1.5 py-[3px]"
        style={{ top: 46, left: 110, transform: "rotate(1deg)" }}
      >
        <svg width="8" height="8" viewBox="0 0 16 16" fill="none" stroke="#6B6A67" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 4 V12 a1 1 0 0 0 1 1 h10 a1 1 0 0 0 1-1 V6 a1 1 0 0 0-1-1 H8 L6 3 H4 a1 1 0 0 0-1 1 Z" />
        </svg>
        <span className="font-mono text-[7px] text-[#6B6A67]">
          /Gallery/Artworks/Picasso_1972.tiff
        </span>
        <span className="ml-1 text-[6.5px] text-[#ADADAA]">· 4.2 MB</span>
      </div>

      {/* Tags row */}
      <div
        className="absolute flex items-center gap-1"
        style={{ bottom: 56, right: 60, transform: "rotate(1.5deg)" }}
      >
        {["#picasso", "#blue-period", "#sold-2024"].map((t) => (
          <span
            key={t}
            className="rounded-full border border-[#E8E8E6] bg-white px-1.5 py-[2px] text-[6.5px] text-[#6B6A67]"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Timestamp — floating */}
      <div
        className="absolute"
        style={{ top: 30, right: 60, transform: "rotate(1.5deg)" }}
      >
        <MetaLabel>2026-05-25 · 14:32:08 UTC</MetaLabel>
      </div>
    </motion.div>
  );
}

/* ─── Step 02 — Connect & build ─── */
// Scale 2× : pre-scale width = 50%, post-scale fills 100% of container
function ConnectMock() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.38, ease }}
      className="flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-white"
    >
      <div
        style={{
          width: "50%",
          transform: "scale(2)",
          transformOrigin: "center center",
        }}
      >
        <StepTwoSharingFlow />
      </div>
    </motion.div>
  );
}

/* ─── Step 03 — Deploy ─── */
// Scale 2.2× : pre-scale width = 45%, post-scale fills ~100% of container
function DeployMock() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.38, ease }}
      className="flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-white"
    >
      <div
        style={{
          width: "45%",
          transform: "scale(2.2)",
          transformOrigin: "center center",
        }}
      >
        <DeployCardStack lang="en" />
      </div>
    </motion.div>
  );
}

/* ─── Pillars config ─── */
export const PILLARS = [
  {
    number: "01",
    title: "Audit",
    desc: "We review how artworks and information already move across the gallery.",
    Mock: AuditMock,
  },
  {
    number: "02",
    title: "Connect & build",
    desc: "Vitreen connects artwork files, selections and collector communication into one flow.",
    Mock: ConnectMock,
  },
  {
    number: "03",
    title: "Deploy",
    desc: "Operational infrastructure installed around your existing gallery environment.",
    Mock: DeployMock,
  },
];
