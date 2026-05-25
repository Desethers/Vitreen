"use client";

import { motion } from "framer-motion";
import {
  StepTwoSharingFlow,
  DeployCardStack,
} from "@/components/ProcessFlow";

const ease = [0.16, 1, 0.3, 1] as const;

/* ─── Step 01 — Audit ─── */
/* Mixed systems: micro-fragments of the real tools galleries currently juggle.
   No standardization — that is precisely the story. */

const CARD_W = 90;
const CARD_H = 76;
const CARD_GAP = 20;

function FinderFragment() {
  return (
    <div className="flex h-full w-full flex-col bg-white">
      {/* Title bar */}
      <div className="flex items-center gap-[3px] border-b border-[#E8E8E6] bg-[#F5F5F3] px-1.5 py-[3px]">
        <span className="block h-[5px] w-[5px] rounded-full bg-[#FF5F57]" />
        <span className="block h-[5px] w-[5px] rounded-full bg-[#FEBC2E]" />
        <span className="block h-[5px] w-[5px] rounded-full bg-[#28C840]" />
      </div>
      {/* File rows */}
      <div className="flex flex-1 flex-col justify-center gap-[5px] px-2 py-1.5">
        {[22, 16, 20].map((w, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <svg width="9" height="7" viewBox="0 0 16 12" fill="#9CC8FF" stroke="#5B9BD5" strokeWidth="0.5">
              <path d="M1 3.5 V10 a1 1 0 0 0 1 1 h12 a1 1 0 0 0 1-1 V5 a1 1 0 0 0-1-1 H7 L5.5 2.5 a1 1 0 0 0-.7-.3 H2 a1 1 0 0 0-1 1 Z" />
            </svg>
            <span className="block h-[2px] rounded-full bg-[#E8E8E6]" style={{ width: w }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function WhatsappFragment() {
  return (
    <div className="flex h-full w-full flex-col justify-center gap-[3px] bg-[#ECE5DD] px-1.5 py-2">
      <div className="self-start rounded-[3px] bg-white px-1.5 py-[3px] shadow-[0_0_1px_rgba(0,0,0,0.1)]">
        <span className="block h-[2px] w-9 rounded-full bg-[#6B6A67]/40" />
      </div>
      <div className="self-end rounded-[3px] bg-[#DCF8C6] px-1.5 py-[3px] shadow-[0_0_1px_rgba(0,0,0,0.1)]">
        <span className="mb-[2px] block h-[2px] w-8 rounded-full bg-[#6B6A67]/50" />
        <div className="flex items-center justify-end gap-[1px]">
          <span className="text-[5px] text-[#6B6A67]/60">14:32</span>
          <svg width="9" height="5" viewBox="0 0 12 6" fill="none" stroke="#34B7F1" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="m1 3 2 2 4-4" />
            <path d="m5 5 4-4" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ExcelFragment() {
  return (
    <div className="flex h-full w-full flex-col bg-white">
      {/* Column header */}
      <div className="flex border-b border-[#E8E8E6] bg-[#F5F5F3]">
        {["A", "B", "C"].map((c) => (
          <span
            key={c}
            className="flex-1 border-r border-[#E8E8E6] py-[2px] text-center text-[5px] font-medium text-[#6B6A67] last:border-0"
          >
            {c}
          </span>
        ))}
      </div>
      {/* Cells */}
      <div className="flex flex-1 flex-col">
        {[0, 1, 2].map((r) => (
          <div key={r} className="flex flex-1 border-b border-[#E8E8E6] last:border-0">
            {[12, 8, 14].map((w, c) => (
              <div
                key={c}
                className="flex flex-1 items-center border-r border-[#E8E8E6] px-1 last:border-0"
              >
                <span className="block h-[1.5px] rounded-full bg-[#E8E8E6]" style={{ width: w }} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function NotesFragment() {
  return (
    <div className="flex h-full w-full flex-col gap-1 bg-[#FFFDF4] px-2 py-2">
      <span className="block h-[3px] w-12 rounded-full bg-[#111110]" />
      <span className="block h-[2px] w-8 rounded-full bg-[#6B6A67]/40" />
      <div className="mt-0.5 flex flex-col gap-[3px]">
        {[18, 14, 20].map((w, i) => (
          <div key={i} className="flex items-center gap-1">
            <span className="block h-[3px] w-[3px] rounded-full bg-[#FEBC2E]" />
            <span className="block h-[2px] rounded-full bg-[#E8E8E6]" style={{ width: w }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function GmailFragment() {
  return (
    <div className="flex h-full w-full flex-col gap-[3px] bg-white px-1.5 py-1.5">
      {/* Header: envelope + sender */}
      <div className="flex items-center gap-1">
        <svg width="11" height="8" viewBox="0 0 16 11" fill="white" stroke="#EA4335" strokeWidth="0.7" strokeLinejoin="round">
          <path d="M1 2 v7 a1 1 0 0 0 1 1 h12 a1 1 0 0 0 1-1 V2 L8 7 Z" />
          <path d="M1 2 L8 7 L15 2" fill="none" />
        </svg>
        <span className="block h-[2px] flex-1 rounded-full bg-[#111110]" />
      </div>
      {/* Subject */}
      <span className="block h-[2px] w-14 rounded-full bg-[#6B6A67]/60" />
      {/* Preview */}
      <span className="block h-[2px] w-12 rounded-full bg-[#E8E8E6]" />
      <span className="block h-[2px] w-10 rounded-full bg-[#E8E8E6]" />
    </div>
  );
}

const AUDIT_FRAGMENTS: { label: string; render: () => React.ReactNode }[] = [
  { label: "Finder", render: FinderFragment },
  { label: "WhatsApp", render: WhatsappFragment },
  { label: "Excel", render: ExcelFragment },
  { label: "Notes", render: NotesFragment },
  { label: "Gmail", render: GmailFragment },
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
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="relative flex" style={{ gap: CARD_GAP }}>
          {AUDIT_FRAGMENTS.map((frag, i) => {
            const Render = frag.render;
            return (
              <div
                key={frag.label}
                className="flex flex-col items-center gap-2"
                style={{
                  marginTop: i % 2 === 0 ? 0 : 60,
                  transform: `rotate(${i % 2 === 0 ? -3 : 3}deg)`,
                }}
              >
                <div
                  className="overflow-hidden rounded-[4px] border border-[#E8E8E6] bg-white"
                  style={{ width: CARD_W, height: CARD_H }}
                >
                  <Render />
                </div>
                <span className="text-[7.5px] uppercase tracking-[0.1em] text-[#111110]">
                  {frag.label}
                </span>
              </div>
            );
          })}

          {/* Scanner */}
          <motion.div
            className="pointer-events-none absolute inset-y-0 flex items-stretch"
            style={{ width: 36, x: -36 }}
            animate={{ x: [-(36), (CARD_W + CARD_GAP) * AUDIT_FRAGMENTS.length] }}
            transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 0.6, ease: "linear" }}
            aria-hidden="true"
          >
            <div className="flex-1 bg-gradient-to-r from-transparent via-[#111110]/8 to-transparent" />
            <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-[#111110] opacity-30" />
          </motion.div>
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
