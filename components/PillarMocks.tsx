"use client";

import { motion } from "framer-motion";
import {
  StepTwoSharingFlow,
  DeployCardStack,
} from "@/components/ProcessFlow";

const ease = [0.16, 1, 0.3, 1] as const;

/* ─── Step 01 — Audit ─── */
/* Clean composition: a research bar + three aligned cards.
   Artwork · Collector · Status. */

const auditCard = "rounded-[4px] border border-[#E8E8E6] bg-white";

function AuditMock() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease }}
      className="relative h-full w-full overflow-hidden rounded-lg bg-white"
    >
      <div className="absolute inset-0 flex flex-col items-stretch justify-center gap-3 px-6">
        {/* Search / research bar */}
        <div className="flex items-center gap-2 rounded-[4px] border border-[#E8E8E6] bg-white px-3 py-2">
          <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="#6B6A67" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="7" cy="7" r="5" />
            <path d="m14 14-3-3" />
          </svg>
          <span className="text-[9px] text-[#111110]">Warhol</span>
          <span className="h-[10px] w-px bg-[#E8E8E6]" />
          <span className="text-[9px] text-[#ADADAA]">Search artworks, collectors, exhibitions…</span>
          <span className="ml-auto rounded-[2px] border border-[#E8E8E6] px-1 py-[1px] text-[7px] font-mono text-[#6B6A67]">
            ⌘K
          </span>
        </div>

        {/* Three aligned cards */}
        <div className="grid grid-cols-3 gap-3">
          {/* ── Card 1 — Artwork ─────────────────────── */}
          <div className={`${auditCard} flex flex-col overflow-hidden`}>
            {/* Thumb */}
            <div className="relative h-[88px] w-full overflow-hidden bg-gradient-to-br from-[#D4C5B0] via-[#B8A48A] to-[#8A7560]">
              <div className="absolute left-[18%] top-[14%] h-[55%] w-[42%] rounded-[40%] bg-[#3A2F25]/70 blur-[1px]" />
              <div className="absolute bottom-[10%] right-[12%] h-[18%] w-[40%] bg-[#5B4A3A]/55" />
              <div className="absolute left-[8%] bottom-[8%] h-[2px] w-[30%] bg-[#EAD9BF]/60" />
            </div>
            <div className="flex flex-col gap-[2px] px-2 py-2">
              <span className="font-mono text-[7px] text-[#ADADAA]">INV-2410-A</span>
              <span className="text-[9px] leading-tight text-[#111110]">Andy Warhol</span>
              <span className="text-[8px] italic leading-tight text-[#6B6A67]">Marilyn, 1967</span>
              <span className="mt-1 text-[7.5px] text-[#111110]">91 × 91 cm</span>
              <span className="text-[7.5px] text-[#6B6A67]">acrylic/silkscreen</span>
            </div>
          </div>

          {/* ── Card 2 — Collector ───────────────────── */}
          <div className={`${auditCard} flex flex-col px-2 py-2.5`}>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#111110]">
                <span className="text-[10px] font-semibold tracking-wide text-white">MT</span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[9px] text-[#111110]">M. Tanaka</span>
                <span className="text-[7.5px] text-[#6B6A67]">Tokyo · Tier 1</span>
              </div>
            </div>
            <div className="mt-2 flex flex-col gap-[2px] border-t border-[#E8E8E6] pt-2">
              <div className="flex justify-between text-[7.5px]">
                <span className="text-[#ADADAA]">Since</span>
                <span className="text-[#111110]">2018</span>
              </div>
              <div className="flex justify-between text-[7.5px]">
                <span className="text-[#ADADAA]">Last contact</span>
                <span className="text-[#111110]">14:32</span>
              </div>
              <div className="flex justify-between text-[7.5px]">
                <span className="text-[#ADADAA]">Channel</span>
                <span className="text-[#111110]">WhatsApp</span>
              </div>
              <div className="flex justify-between text-[7.5px]">
                <span className="text-[#ADADAA]">Owner</span>
                <span className="text-[#111110]">Maria</span>
              </div>
            </div>
          </div>

          {/* ── Card 3 — Status / file ───────────────── */}
          <div className={`${auditCard} flex flex-col px-2 py-2.5`}>
            <div className="flex items-center gap-1.5">
              <span className="block h-[6px] w-[6px] rounded-full bg-[#FEBC2E]" />
              <span className="text-[8px] font-medium uppercase tracking-[0.14em] text-[#111110]">
                Reserved
              </span>
            </div>
            <span className="mt-1 text-[7.5px] text-[#6B6A67]">Hold until 06.06.26</span>

            <div className="mt-2 flex flex-col gap-[3px] border-t border-[#E8E8E6] pt-2">
              <span className="text-[6.5px] uppercase tracking-[0.16em] text-[#ADADAA]">File</span>
              <span className="font-mono text-[7px] text-[#111110]">WARHOL_1967_FINAL.tiff</span>
              <span className="font-mono text-[7px] text-[#ADADAA]">/Vol/Gallery_2024/Warhol/</span>
            </div>

            <div className="mt-2 flex flex-col gap-[3px] border-t border-[#E8E8E6] pt-2">
              <span className="text-[6.5px] uppercase tracking-[0.16em] text-[#ADADAA]">Show</span>
              <span className="font-mono text-[7.5px] text-[#111110]">EXH-005 · Basel ’26</span>
            </div>
          </div>
        </div>
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
