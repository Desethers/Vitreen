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
      transition={{ duration: 0.6, ease }}
      className="relative h-full w-full overflow-hidden rounded-lg bg-white"
    >
      {/* Thin connecting line — Vitreen reading the gallery */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        <line x1="11%" y1="54%" x2="79%" y2="22%" stroke="#111110" strokeWidth="0.5" opacity="0.14" />
      </svg>

      {/* 1. Artwork thumbnail — top right */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="absolute overflow-hidden rounded-[2px] border border-[#E8E8E6] bg-[#F5F5F3]"
        style={{ top: "13%", right: "16%", width: 54, height: 54 }}
      >
        <div className="absolute left-0 top-0 h-[55%] w-[62%] bg-[#111110] opacity-[0.08]" />
        <div className="absolute bottom-0 right-0 h-[40%] w-[48%] bg-[#111110] opacity-[0.05]" />
        <div className="absolute left-[24%] top-[30%] h-[34%] w-[28%] bg-[#111110] opacity-[0.14]" />
      </motion.div>

      {/* 2. Email line — left mid-upper */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="absolute flex flex-col gap-[5px]"
        style={{ top: "27%", left: "10%" }}
      >
        <div className="flex items-center gap-2">
          <span className="text-[7.5px] tracking-[0.08em] text-[#ADADAA]">from</span>
          <div className="h-px w-24 bg-[#E8E8E6]" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[7.5px] tracking-[0.08em] text-[#ADADAA]">to</span>
          <div className="h-px w-32 bg-[#E8E8E6]" />
        </div>
      </motion.div>

      {/* 3. Collector initials — center */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.5 }}
        className="absolute flex h-7 w-7 items-center justify-center rounded-full border border-[#111110]"
        style={{ top: "46%", left: "36%", opacity: 0.35 }}
      >
        <span className="text-[8px] font-medium tracking-widest text-[#111110]">MD</span>
      </motion.div>

      {/* 4. PDF — right mid */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="absolute overflow-hidden rounded-[2px] border border-[#E8E8E6] bg-white"
        style={{ top: "52%", right: "13%", width: 38, height: 48 }}
      >
        <div
          className="absolute right-0 top-0 bg-[#F5F5F3]"
          style={{ width: 10, height: 10, clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
        />
        <div className="flex flex-col gap-[4px] px-1.5 pt-3.5">
          {[80, 58, 72, 50].map((w, i) => (
            <div key={i} className="h-px bg-[#E8E8E6]" style={{ width: `${w}%` }} />
          ))}
        </div>
      </motion.div>

      {/* 5. Exhibition note — lower left */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="absolute flex flex-col gap-1.5"
        style={{ bottom: "20%", left: "11%" }}
      >
        <span className="text-[7.5px] uppercase tracking-[0.12em] text-[#ADADAA]">Winter Expo · 2024</span>
        <div className="h-px w-16 bg-[#E8E8E6]" />
      </motion.div>

      {/* 6. Spreadsheet row — bottom center */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="absolute flex overflow-hidden rounded-[1px] border border-[#E8E8E6]"
        style={{ bottom: "13%", left: "34%" }}
      >
        {[52, 38, 30].map((w, i) => (
          <div
            key={i}
            className="flex items-center border-r border-[#F0F0EE] px-1.5 py-[5px] last:border-r-0"
            style={{ width: w }}
          >
            <div className="h-px w-full bg-[#E8E8E6]" />
          </div>
        ))}
      </motion.div>
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
