"use client";

import { motion } from "framer-motion";
import {
  StepTwoSharingFlow,
  DeployCardStack,
} from "@/components/ProcessFlow";

const ease = [0.16, 1, 0.3, 1] as const;

/* ─── Step 01 — Audit ─── */
function AuditMock() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease }}
      className="relative h-full w-full overflow-hidden rounded-lg bg-white"
    >
      {/* Thin connecting line */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        <line x1="8%" y1="50%" x2="92%" y2="50%" stroke="#111110" strokeWidth="0.6" opacity="0.18" />
      </svg>

      {/* Fragments — 3 horizontal rows, centre-aligned */}
      <div className="absolute inset-0 flex flex-col items-start justify-center gap-8 px-10">

        {/* Row 1 : Artwork thumb + Email strip */}
        <div className="flex items-center gap-6">
          {/* Artwork thumb */}
          <div
            className="relative shrink-0 overflow-hidden rounded-[2px] border border-[#BFBFBC] bg-[#F0F0EE]"
            style={{ width: 48, height: 48 }}
          >
            <div className="absolute left-0 top-0 h-[55%] w-[60%] bg-[#111110] opacity-[0.18]" />
            <div className="absolute bottom-0 right-0 h-[42%] w-[50%] bg-[#111110] opacity-[0.10]" />
            <div className="absolute left-[22%] top-[28%] h-[32%] w-[30%] bg-[#111110] opacity-[0.28]" />
          </div>

          {/* Email strip */}
          <div className="flex flex-col gap-[6px]">
            <div className="flex items-center gap-2">
              <span className="w-7 text-[8px] tracking-[0.06em] text-[#6B6A67]">from</span>
              <div className="h-px w-40 bg-[#BFBFBC]" />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-7 text-[8px] tracking-[0.06em] text-[#6B6A67]">to</span>
              <div className="h-px w-32 bg-[#BFBFBC]" />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-7 text-[8px] tracking-[0.06em] text-[#6B6A67]">re</span>
              <div className="h-px w-48 bg-[#111110] opacity-25" />
            </div>
          </div>
        </div>

        {/* Row 2 : Collector initials + Spreadsheet row */}
        <div className="flex items-center gap-6">
          {/* Collector initials */}
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#111110] opacity-60">
            <span className="text-[9px] font-semibold tracking-wider text-[#111110]">MD</span>
          </div>

          {/* Spreadsheet row */}
          <div className="flex overflow-hidden rounded-[2px] border border-[#BFBFBC]">
            {[72, 52, 44, 36].map((w, i) => (
              <div
                key={i}
                className="border-r border-[#BFBFBC] last:border-r-0"
                style={{ width: w }}
              >
                <div className="border-b border-[#BFBFBC] px-2 py-[4px]">
                  <div className="h-[1.5px] rounded-full bg-[#BFBFBC]" />
                </div>
                <div className="px-2 py-[4px]">
                  <div className="h-[1.5px] rounded-full bg-[#E8E8E6]" style={{ width: `${70 + i * 8}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 3 : PDF + Exhibition note */}
        <div className="flex items-center gap-6">
          {/* PDF */}
          <div
            className="relative shrink-0 overflow-hidden rounded-[2px] border border-[#BFBFBC] bg-white"
            style={{ width: 36, height: 46 }}
          >
            <div
              className="absolute right-0 top-0 bg-[#E8E8E6]"
              style={{ width: 10, height: 10, clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
            />
            <div className="flex flex-col gap-[4px] px-1.5 pt-3">
              {[80, 55, 75, 45, 65].map((w, i) => (
                <div key={i} className="h-[1.5px] rounded-full bg-[#BFBFBC]" style={{ width: `${w}%` }} />
              ))}
            </div>
          </div>

          {/* Exhibition note */}
          <div className="flex flex-col gap-[5px]">
            <span className="text-[8px] uppercase tracking-[0.14em] text-[#6B6A67]">Winter Expo · 2024</span>
            <div className="h-px w-28 bg-[#BFBFBC]" />
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
