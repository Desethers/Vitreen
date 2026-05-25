"use client";

import { motion } from "framer-motion";
import {
  StepTwoSharingFlow,
  DeployCardStack,
} from "@/components/ProcessFlow";

const ease = [0.16, 1, 0.3, 1] as const;

/* ─── Step 01 — Audit ─── */
const LANES = [
  { label: "Email",       dots: [12, 28, 48, 71] },
  { label: "Files",       dots: [8,  22, 55, 82] },
  { label: "CRM",         dots: [18, 44, 62, 78] },
  { label: "Spreadsheet", dots: [6,  34, 58, 88] },
  { label: "Calendar",    dots: [15, 38, 52, 74] },
];
const SCAN_PCT = 52; // scan line position in %

function AuditMock() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease }}
      className="relative h-full w-full overflow-hidden rounded-lg bg-white"
    >
      <div className="absolute inset-0 flex flex-col justify-center px-10 gap-0">

        {LANES.map((lane, li) => (
          <div key={lane.label} className="flex items-center" style={{ height: 56 }}>
            {/* Label */}
            <span className="w-20 shrink-0 text-[8px] uppercase tracking-[0.12em] text-[#6B6A67]">
              {lane.label}
            </span>

            {/* Timeline track */}
            <div className="relative flex-1">
              {/* Base line */}
              <div className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 bg-[#E8E8E6]" />

              {/* Dots */}
              {lane.dots.map((pct, di) => {
                const isScanned = pct < SCAN_PCT;
                return (
                  <motion.div
                    key={di}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: li * 0.06 + di * 0.04, duration: 0.3 }}
                    className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{
                      left: `${pct}%`,
                      width: isScanned ? 5 : 4,
                      height: isScanned ? 5 : 4,
                      backgroundColor: isScanned ? "#111110" : "#BFBFBC",
                    }}
                  />
                );
              })}
            </div>
          </div>
        ))}

        {/* Vertical scan line */}
        <div
          className="pointer-events-none absolute top-[12%] bottom-[12%] w-px bg-[#111110] opacity-25"
          style={{ left: `calc(2.5rem + 5rem + (100% - 5rem - 5rem) * ${SCAN_PCT / 100})` }}
          aria-hidden="true"
        />

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
