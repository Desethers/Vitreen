"use client";

import { motion } from "framer-motion";
import {
  StepTwoSharingFlow,
  DeployCardStack,
} from "@/components/ProcessFlow";

const ease = [0.16, 1, 0.3, 1] as const;

/* ─── Step 01 — Audit ─── */
/* Agent timeline aesthetic: a quiet checklist of the audit happening in
   real time — scanning inventory, reading records, generating a synthesis.
   File icons (PDF, XLSX, DOC) carry recognition. */

function FilePdf() {
  return (
    <div className="relative flex h-4 w-[14px] flex-shrink-0 items-end justify-center overflow-hidden rounded-[1.5px] bg-[#EA4335]">
      <span className="mb-[1px] text-[4.5px] font-bold leading-none text-white">PDF</span>
      <div className="absolute right-0 top-0 h-0 w-0 border-b-[4px] border-l-[4px] border-b-white/40 border-l-transparent" />
    </div>
  );
}
function FileXlsx() {
  return (
    <div className="relative flex h-4 w-[14px] flex-shrink-0 items-end justify-center overflow-hidden rounded-[1.5px] bg-[#107C41]">
      <span className="mb-[1px] text-[5px] font-bold leading-none text-white">X</span>
      <div className="absolute right-0 top-0 h-0 w-0 border-b-[4px] border-l-[4px] border-b-white/40 border-l-transparent" />
    </div>
  );
}
function FileDoc() {
  return (
    <div className="relative flex h-4 w-[14px] flex-shrink-0 items-end justify-center overflow-hidden rounded-[1.5px] bg-[#2A6DF4]">
      <span className="mb-[1px] text-[4.5px] font-bold leading-none text-white">DOC</span>
      <div className="absolute right-0 top-0 h-0 w-0 border-b-[4px] border-l-[4px] border-b-white/40 border-l-transparent" />
    </div>
  );
}

function CheckDot() {
  return (
    <div className="flex h-[14px] w-[14px] flex-shrink-0 items-center justify-center rounded-full bg-[#111110]">
      <svg width="8" height="8" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6.5 5 8.5 9 4" />
      </svg>
    </div>
  );
}
function PendingDot() {
  return (
    <div className="flex h-[14px] w-[14px] flex-shrink-0 items-center justify-center rounded-full border border-[#E8E8E6] bg-white">
      <span className="block h-[3px] w-[3px] rounded-full bg-[#ADADAA]" />
    </div>
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
      <div className="absolute inset-0 flex flex-col justify-center px-10">
        {/* Step 1 — Scanned inventory */}
        <div className="flex items-start gap-3">
          <div className="flex flex-col items-center">
            <CheckDot />
            <span className="mt-1 block h-3 w-px bg-[#E8E8E6]" />
          </div>
          <div className="flex items-center gap-2 pt-[1px]">
            <span className="text-[11px] font-semibold leading-none text-[#111110]">
              Scanned inventory
            </span>
            <svg width="11" height="10" viewBox="0 0 16 14" fill="none" stroke="#ADADAA" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <ellipse cx="8" cy="3" rx="6" ry="1.5" />
              <path d="M2 3 v4 c0 .8 2.7 1.5 6 1.5 s6 -.7 6 -1.5 V3" />
              <path d="M2 7 v4 c0 .8 2.7 1.5 6 1.5 s6 -.7 6 -1.5 V7" />
            </svg>
            <span className="text-[11px] leading-none text-[#ADADAA]">Vitreen Gallery</span>
          </div>
        </div>

        {/* Step 2 — Read records */}
        <div className="mt-2 flex items-start gap-3">
          <div className="flex flex-col items-center self-stretch">
            <CheckDot />
            <span className="mt-1 block w-px flex-1 bg-[#E8E8E6]" />
          </div>
          <div className="flex flex-col gap-2 pb-3">
            <span className="text-[11px] font-semibold leading-none text-[#111110]">
              Read 3 records
            </span>
            <div className="flex items-center gap-2">
              <FilePdf />
              <span className="text-[10px] text-[#111110]">Andy Warhol — Marilyn, 1967</span>
            </div>
            <div className="flex items-center gap-2">
              <FileXlsx />
              <span className="text-[10px] text-[#111110]">Inventory Q1 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <FileDoc />
              <span className="text-[10px] text-[#111110]">M. Tanaka — collector notes</span>
            </div>
          </div>
        </div>

        {/* Step 3 — Generating */}
        <div className="flex items-start gap-3">
          <PendingDot />
          <span className="pt-[1px] text-[11px] leading-none text-[#ADADAA]">
            Generating audit
          </span>
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
