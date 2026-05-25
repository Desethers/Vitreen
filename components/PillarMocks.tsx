"use client";

import { motion } from "framer-motion";
import {
  StepTwoSharingFlow,
  DeployCardStack,
} from "@/components/ProcessFlow";

const ease = [0.16, 1, 0.3, 1] as const;

/* ─── Step 01 — Audit ─── */
/* Captured traces of a real gallery environment quietly analyzed.
   Fragments float without containers. Formats deliberately inconsistent
   (date styles, casing, separators) to suggest multiple coexisting habits
   and systems already in use. */

type Frag = {
  el: React.ReactNode;
  style: React.CSSProperties;
};

const FRAGMENTS: Frag[] = [
  // ── Top band ───────────────────────────────────────
  {
    el: <span className="font-mono text-[9px] text-[#111110]">INV-2410-A</span>,
    style: { top: 32, left: 56, transform: "rotate(-2deg)" },
  },
  {
    el: <span className="font-mono text-[8px] text-[#6B6A67]">WARHOL_1967_FINAL.tiff</span>,
    style: { top: 52, left: 48, transform: "rotate(-1.5deg)" },
  },
  {
    el: (
      <span className="font-mono text-[7.5px] text-[#ADADAA] line-through decoration-[#ADADAA]/60">
        warhol_v3_final.tif
      </span>
    ),
    style: { top: 70, left: 66, transform: "rotate(-2deg)" },
  },
  {
    el: <span className="font-mono text-[8px] text-[#6B6A67]">25.05.26 — 14:32</span>,
    style: { top: 34, right: 60, transform: "rotate(1deg)" },
  },
  {
    el: (
      <span className="text-[7.5px] uppercase tracking-[0.16em] text-[#ADADAA]">
        last touched · Maria
      </span>
    ),
    style: { top: 52, right: 56, transform: "rotate(1deg)" },
  },

  // ── Middle band ────────────────────────────────────
  {
    el: (
      <div className="leading-tight">
        <span className="block text-[9.5px] text-[#111110]">Andy Warhol</span>
        <span className="block text-[8px] italic text-[#6B6A67]">Marilyn, 1967</span>
      </div>
    ),
    style: { top: 138, left: 180, transform: "rotate(-0.5deg)" },
  },
  {
    el: (
      <span className="text-[8px] text-[#111110]">
        91 × 91 cm <span className="text-[#ADADAA]">— acrylic/silkscreen</span>
      </span>
    ),
    style: { top: 178, left: 184, transform: "rotate(-0.5deg)" },
  },
  {
    el: (
      <span
        className="text-[8.5px] text-[#111110]"
        style={{
          background: "linear-gradient(transparent 58%, #FFE08A 58%)",
          padding: "0 2px",
        }}
      >
        Reserved until 06/06
      </span>
    ),
    style: { top: 116, right: 64, transform: "rotate(2deg)" },
  },
  {
    el: <span className="text-[7.5px] text-[#6B6A67]">Updated after Basel</span>,
    style: { top: 144, right: 70, transform: "rotate(1.5deg)" },
  },
  {
    el: (
      <span className="text-[8px] italic text-[#111110] underline decoration-[#6B6A67] decoration-dotted underline-offset-[2px]">
        need dimensions
      </span>
    ),
    style: { top: 200, right: 88, transform: "rotate(-1.5deg)" },
  },

  // ── Bottom band ────────────────────────────────────
  {
    el: <span className="text-[8.5px] text-[#111110]">M. Tanaka — Tokyo</span>,
    style: { bottom: 132, left: 90, transform: "rotate(-1deg)" },
  },
  {
    el: (
      <span className="text-[7px] uppercase tracking-[0.16em] text-[#ADADAA]">
        Tier 1 · since 2018
      </span>
    ),
    style: { bottom: 116, left: 96, transform: "rotate(-1deg)" },
  },
  {
    el: <span className="text-[8px] text-[#111110]">→ cc Maria</span>,
    style: { bottom: 86, left: 280, transform: "rotate(1deg)" },
  },
  {
    el: <span className="text-[7.5px] text-[#6B6A67]">via WhatsApp · 14:32</span>,
    style: { bottom: 70, left: 286, transform: "rotate(1deg)" },
  },
  {
    el: (
      <span className="font-mono text-[7px] text-[#ADADAA]">
        /Vol/Gallery_2024/Warhol/
      </span>
    ),
    style: { bottom: 46, left: 60, transform: "rotate(-0.5deg)" },
  },
  {
    el: (
      <span className="font-mono text-[7.5px] text-[#6B6A67]">
        EXH-005 · BASEL ’26
      </span>
    ),
    style: { bottom: 42, right: 70, transform: "rotate(1.5deg)" },
  },
];

function AuditMock() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease }}
      className="relative h-full w-full overflow-hidden rounded-lg bg-white"
    >
      {/* Artwork thumb — the lone visual anchor, deliberately off-center */}
      <div
        className="absolute overflow-hidden bg-white"
        style={{
          top: 122,
          left: 78,
          width: 78,
          height: 96,
          padding: 3,
          transform: "rotate(-3deg)",
          boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
        }}
      >
        <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-[#D4C5B0] via-[#B8A48A] to-[#8A7560]">
          <div className="absolute left-[18%] top-[14%] h-[55%] w-[42%] rounded-[40%] bg-[#3A2F25]/70 blur-[1px]" />
          <div className="absolute bottom-[10%] right-[12%] h-[18%] w-[40%] bg-[#5B4A3A]/55" />
          <div className="absolute left-[8%] bottom-[8%] h-[2px] w-[30%] bg-[#EAD9BF]/60" />
        </div>
      </div>

      {/* Floating text fragments */}
      {FRAGMENTS.map((f, i) => (
        <div key={i} className="absolute" style={f.style}>
          {f.el}
        </div>
      ))}
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
