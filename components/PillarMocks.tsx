"use client";

import { motion } from "framer-motion";
import {
  StepTwoSharingFlow,
  DeployCardStack,
} from "@/components/ProcessFlow";

const ease = [0.16, 1, 0.3, 1] as const;

/* ─── Audit objects ─── */

function ArtworkThumb() {
  return (
    <div className="relative h-[72px] w-[72px] overflow-hidden rounded-[3px] border border-[#E8E8E6] bg-[#F5F5F3]">
      <div className="absolute left-0 top-0 h-[58%] w-[62%] bg-[#111110] opacity-[0.10]" />
      <div className="absolute bottom-0 right-0 h-[42%] w-[50%] bg-[#111110] opacity-[0.07]" />
      <div className="absolute left-[22%] top-[28%] h-[36%] w-[32%] bg-[#111110] opacity-[0.18]" />
      <div className="absolute inset-0 border border-[#E8E8E6]" />
    </div>
  );
}

function EmailStrip() {
  return (
    <div className="flex h-[44px] w-[220px] flex-col justify-center gap-[5px] rounded-[3px] border border-[#E8E8E6] bg-white px-3">
      <div className="flex items-center gap-2">
        <div className="h-[1.5px] w-6 bg-[#ADADAA]" />
        <div className="h-[1.5px] flex-1 bg-[#F0F0EE]" />
      </div>
      <div className="flex items-center gap-2">
        <div className="h-[1.5px] w-10 bg-[#ADADAA]" />
        <div className="h-[1.5px] flex-1 bg-[#F0F0EE]" />
      </div>
      <div className="flex items-center gap-2">
        <div className="h-[1.5px] w-16 bg-[#111110] opacity-20" />
        <div className="h-[1.5px] flex-1 bg-[#F0F0EE]" />
      </div>
    </div>
  );
}

function SpreadsheetLine() {
  const cols = [52, 40, 36, 32];
  return (
    <div className="overflow-hidden rounded-[3px] border border-[#E8E8E6] bg-white">
      <div className="flex border-b border-[#E8E8E6] bg-[#F5F5F3]">
        {cols.map((w, i) => (
          <div key={i} className="border-r border-[#E8E8E6] px-2 py-[5px] last:border-r-0" style={{ width: w }}>
            <div className="h-[1.5px] rounded-full bg-[#ADADAA]" />
          </div>
        ))}
      </div>
      {[0, 1].map((row) => (
        <div key={row} className="flex border-b border-[#F5F5F3] last:border-b-0">
          {cols.map((w, i) => (
            <div key={i} className="border-r border-[#F5F5F3] px-2 py-[5px] last:border-r-0" style={{ width: w }}>
              <div className="h-[1.5px] rounded-full bg-[#E8E8E6]" style={{ width: `${65 + i * 8}%` }} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function CollectorCard() {
  return (
    <div className="flex w-[180px] items-center gap-3 rounded-[3px] border border-[#E8E8E6] bg-white px-3 py-2.5">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#111110]">
        <div className="h-2.5 w-2.5 rounded-full bg-white opacity-30" />
      </div>
      <div className="flex flex-1 flex-col gap-[5px]">
        <div className="h-[2px] w-20 rounded-full bg-[#111110] opacity-[0.18]" />
        <div className="h-[2px] w-12 rounded-full bg-[#E8E8E6]" />
      </div>
      <div className="h-[18px] w-10 rounded-full border border-[#E8E8E6] bg-[#F5F5F3]" />
    </div>
  );
}

function PDFObject() {
  return (
    <div className="relative overflow-hidden rounded-[3px] border border-[#E8E8E6] bg-white" style={{ width: 68, height: 88 }}>
      <div className="absolute right-0 top-0 h-5 w-5 bg-[#F5F5F3]" style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }} />
      <div className="absolute right-0 top-0 border-b border-l border-[#E8E8E6]" style={{ width: 20, height: 20, clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }} />
      <div className="flex flex-col gap-[5px] px-2.5 pt-7">
        {[80, 65, 80, 55, 70].map((w, i) => (
          <div key={i} className="h-[1.5px] rounded-full bg-[#E8E8E6]" style={{ width: `${w}%` }} />
        ))}
      </div>
    </div>
  );
}

/* ─── Step 01 — Audit ─── */
function AuditMock() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.38, ease }}
      className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-white"
    >
      {/* Scattered layout */}
      <div className="flex flex-col gap-4 px-8">
        {/* Row 1 */}
        <div className="flex items-end gap-5" style={{ transform: "translateX(-12px)" }}>
          <div style={{ transform: "rotate(-1.5deg)" }}><ArtworkThumb /></div>
          <div style={{ transform: "rotate(1deg) translateY(-4px)" }}><EmailStrip /></div>
        </div>
        {/* Row 2 */}
        <div className="flex items-start gap-5" style={{ transform: "translateX(16px)" }}>
          <div style={{ transform: "rotate(-0.5deg) translateY(2px)" }}><SpreadsheetLine /></div>
          <div style={{ transform: "rotate(1.5deg)" }}><PDFObject /></div>
        </div>
        {/* Row 3 */}
        <div style={{ transform: "translateX(-4px) rotate(0.5deg)" }}>
          <CollectorCard />
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
