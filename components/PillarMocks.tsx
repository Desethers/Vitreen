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

function AuditMock() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease }}
      className="relative h-full w-full overflow-hidden rounded-lg bg-[#FAFAF8]"
    >
      {/* Finder window — pokes out from top-left edge */}
      <div
        className={`absolute ${cardSurface} overflow-hidden`}
        style={{ top: 36, left: -28, width: 200, transform: "rotate(-2.5deg)" }}
      >
        <div className="flex items-center justify-between border-b border-[#E8E8E6] bg-[#ECECEC] px-2 py-[5px]">
          <div className="flex items-center gap-[4px]">
            <span className="block h-[7px] w-[7px] rounded-full bg-[#FF5F57]" />
            <span className="block h-[7px] w-[7px] rounded-full bg-[#FEBC2E]" />
            <span className="block h-[7px] w-[7px] rounded-full bg-[#28C840]" />
          </div>
          <span className="text-[7px] font-medium text-[#6B6A67]">Artworks 2024</span>
        </div>
        <div className="flex flex-col gap-[5px] px-2 py-2">
          {[
            { name: "Exhibitions", date: "Mar 4" },
            { name: "Inventory.xlsx", date: "Feb 28" },
            { name: "Invoices_Q1", date: "Feb 12" },
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <svg width="11" height="8" viewBox="0 0 16 12" fill="#7FB5F5" stroke="#4A8FD8" strokeWidth="0.4">
                <path d="M1 3.5 V10 a1 1 0 0 0 1 1 h12 a1 1 0 0 0 1-1 V5 a1 1 0 0 0-1-1 H7 L5.5 2.5 a1 1 0 0 0-.7-.3 H2 a1 1 0 0 0-1 1 Z" />
              </svg>
              <span className="flex-1 truncate text-[7px] text-[#111110]">{f.name}</span>
              <span className="text-[6px] text-[#ADADAA]">{f.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Spreadsheet corner — pokes from bottom-right */}
      <div
        className={`absolute ${cardSurface} overflow-hidden`}
        style={{ bottom: -38, right: -24, width: 180, transform: "rotate(3deg)" }}
      >
        <div className="h-[4px] w-full bg-[#107C41]" />
        <div className="flex border-b border-[#E8E8E6] bg-[#F3F3F1]">
          <span className="w-[14px] border-r border-[#E8E8E6] py-[2px] text-center text-[6px] text-[#ADADAA]" />
          {["A", "B", "C"].map((c) => (
            <span
              key={c}
              className="flex-1 border-r border-[#E8E8E6] py-[2px] text-center text-[6.5px] font-medium text-[#6B6A67] last:border-0"
            >
              {c}
            </span>
          ))}
        </div>
        {[
          ["Picasso", "1972", "120K"],
          ["Calder", "1965", "85K"],
          ["Mitchell", "1958", "—"],
          ["Doig", "2018", "240K"],
        ].map((r, ri) => (
          <div key={ri} className="flex border-b border-[#E8E8E6] last:border-0">
            <span className="flex w-[14px] items-center justify-center border-r border-[#E8E8E6] bg-[#F3F3F1] py-[2px] text-[6px] text-[#ADADAA]">
              {ri + 1}
            </span>
            {r.map((cell, ci) => (
              <div
                key={ci}
                className="flex flex-1 items-center border-r border-[#E8E8E6] px-1 py-[2px] text-[6.5px] text-[#111110] last:border-0"
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Cropped artwork image — center-ish */}
      <div
        className={`absolute ${cardSurface} overflow-hidden`}
        style={{ top: 116, left: 200, width: 90, height: 112, transform: "rotate(-4deg)", padding: 4 }}
      >
        <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-[#D4C5B0] via-[#B8A48A] to-[#8A7560]">
          {/* Abstract painted form */}
          <div className="absolute left-[18%] top-[14%] h-[55%] w-[42%] rounded-[40%] bg-[#3A2F25]/70 blur-[1px]" />
          <div className="absolute bottom-[10%] right-[12%] h-[18%] w-[40%] bg-[#5B4A3A]/55" />
          <div className="absolute left-[8%] bottom-[8%] h-[2px] w-[30%] bg-[#EAD9BF]/60" />
        </div>
      </div>

      {/* Timestamp — top-right, floating */}
      <div
        className="absolute"
        style={{ top: 26, right: 22, transform: "rotate(1.5deg)" }}
      >
        <span className="block text-[8px] font-medium uppercase tracking-[0.18em] text-[#ADADAA]">
          Wed · 25 May · 14:32
        </span>
      </div>

      {/* Collector initial chip */}
      <div
        className={`absolute ${cardSurface} flex items-center gap-2 px-2 py-1.5`}
        style={{ bottom: 64, left: 38, transform: "rotate(-1.5deg)" }}
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#111110]">
          <span className="text-[9px] font-semibold tracking-wide text-white">MT</span>
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-[7.5px] font-medium text-[#111110]">M. Tanaka</span>
          <span className="text-[6.5px] text-[#ADADAA]">Collector · Tokyo</span>
        </div>
      </div>

      {/* Tiny WhatsApp bubble peek — top-right corner */}
      <div
        className="absolute rounded-[3px] bg-[#DCF8C6] shadow-[0_0_2px_rgba(0,0,0,0.08)]"
        style={{ top: 64, right: -14, padding: "4px 6px", transform: "rotate(2deg)" }}
      >
        <div className="flex items-center gap-1">
          <span className="text-[6.5px] text-[#111110]">Yes, sold</span>
          <svg width="8" height="5" viewBox="0 0 12 6" fill="none" stroke="#34B7F1" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="m1 3 2 2 4-4" />
            <path d="m5 5 4-4" />
          </svg>
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
