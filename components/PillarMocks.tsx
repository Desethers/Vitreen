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
  const files = [
    { name: "Artworks 2024", date: "Mar 4" },
    { name: "Exhibitions", date: "Feb 28" },
    { name: "Inventory.xlsx", date: "Feb 12" },
  ];
  return (
    <div className="flex h-full w-full flex-col bg-white">
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-[#E8E8E6] bg-[#ECECEC] px-1.5 py-[3px]">
        <div className="flex items-center gap-[3px]">
          <span className="block h-[5px] w-[5px] rounded-full bg-[#FF5F57]" />
          <span className="block h-[5px] w-[5px] rounded-full bg-[#FEBC2E]" />
          <span className="block h-[5px] w-[5px] rounded-full bg-[#28C840]" />
        </div>
        <span className="text-[5px] font-medium text-[#6B6A67]">Documents</span>
        <span className="block w-[10px]" />
      </div>
      {/* File rows */}
      <div className="flex flex-1 flex-col justify-center gap-[3px] px-1.5 py-1">
        {files.map((f, i) => (
          <div key={i} className="flex items-center gap-1">
            <svg width="9" height="7" viewBox="0 0 16 12" fill="#7FB5F5" stroke="#4A8FD8" strokeWidth="0.4">
              <path d="M1 3.5 V10 a1 1 0 0 0 1 1 h12 a1 1 0 0 0 1-1 V5 a1 1 0 0 0-1-1 H7 L5.5 2.5 a1 1 0 0 0-.7-.3 H2 a1 1 0 0 0-1 1 Z" />
            </svg>
            <span className="flex-1 truncate text-[5px] text-[#111110]">{f.name}</span>
            <span className="text-[4.5px] text-[#ADADAA]">{f.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function WhatsappFragment() {
  return (
    <div className="flex h-full w-full flex-col bg-[#ECE5DD]">
      {/* Header */}
      <div className="flex items-center gap-1 border-b border-black/5 bg-[#075E54] px-1.5 py-[3px]">
        <span className="block h-[6px] w-[6px] rounded-full bg-white/30" />
        <span className="text-[5px] font-medium text-white">Mrs. Tanaka</span>
      </div>
      {/* Messages */}
      <div className="flex flex-1 flex-col justify-center gap-[3px] px-1.5 py-1">
        <div className="self-start rounded-[3px] bg-white px-1 py-[2px] shadow-[0_0_1px_rgba(0,0,0,0.15)]">
          <span className="text-[5px] text-[#111110]">Confirmed?</span>
        </div>
        <div className="self-end rounded-[3px] bg-[#DCF8C6] px-1 py-[2px] shadow-[0_0_1px_rgba(0,0,0,0.15)]">
          <div className="flex items-center gap-[2px]">
            <span className="text-[5px] text-[#111110]">Yes, sold</span>
            <svg width="7" height="4" viewBox="0 0 12 6" fill="none" stroke="#34B7F1" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="m1 3 2 2 4-4" />
              <path d="m5 5 4-4" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExcelFragment() {
  const rows = [
    ["Picasso", "1972", "120K"],
    ["Calder", "1965", "85K"],
    ["Mitchell", "1958", "—"],
  ];
  return (
    <div className="flex h-full w-full flex-col bg-white">
      {/* Excel green top strip */}
      <div className="h-[3px] w-full bg-[#107C41]" />
      {/* Column header */}
      <div className="flex border-b border-[#E8E8E6] bg-[#F3F3F1]">
        <span className="w-[10px] border-r border-[#E8E8E6] py-[1.5px] text-center text-[4.5px] text-[#ADADAA]"></span>
        {["A", "B", "C"].map((c) => (
          <span
            key={c}
            className="flex-1 border-r border-[#E8E8E6] py-[1.5px] text-center text-[5px] font-medium text-[#6B6A67] last:border-0"
          >
            {c}
          </span>
        ))}
      </div>
      {/* Cells */}
      <div className="flex flex-1 flex-col">
        {rows.map((r, ri) => (
          <div key={ri} className="flex flex-1 border-b border-[#E8E8E6] last:border-0">
            <span className="flex w-[10px] items-center justify-center border-r border-[#E8E8E6] bg-[#F3F3F1] text-[4.5px] text-[#ADADAA]">
              {ri + 1}
            </span>
            {r.map((cell, ci) => (
              <div
                key={ci}
                className="flex flex-1 items-center border-r border-[#E8E8E6] px-1 text-[4.5px] text-[#111110] last:border-0"
              >
                {cell}
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
    <div className="flex h-full w-full flex-col gap-[3px] bg-[#FFFBEA] px-2 py-1.5">
      <span className="text-[7px] font-semibold leading-tight text-[#111110]">Studio visit</span>
      <span className="text-[4.5px] text-[#ADADAA]">25 May 2026</span>
      <div className="mt-[2px] flex flex-col gap-[3px]">
        <div className="flex items-start gap-1">
          <span className="mt-[3px] block h-[2px] w-[2px] rounded-full bg-[#111110]" />
          <span className="text-[5px] leading-[1.2] text-[#111110]">3 new paintings</span>
        </div>
        <div className="flex items-start gap-1">
          <span className="mt-[3px] block h-[2px] w-[2px] rounded-full bg-[#111110]" />
          <span className="text-[5px] leading-[1.2] text-[#111110]">Frame quotes Mon</span>
        </div>
        <div className="flex items-start gap-1">
          <span className="mt-[3px] block h-[2px] w-[2px] rounded-full bg-[#111110]" />
          <span className="text-[5px] leading-[1.2] text-[#111110]">Send to Maria</span>
        </div>
      </div>
    </div>
  );
}

function GmailFragment() {
  const emails = [
    { from: "Maria Tanaka", subj: "Artwork inquiry", unread: true },
    { from: "Studio Doig", subj: "Invoice #2410", unread: false },
    { from: "Art Basel", subj: "Booth layout", unread: false },
  ];
  return (
    <div className="flex h-full w-full flex-col bg-white">
      {/* Gmail logo bar */}
      <div className="flex items-center gap-1 border-b border-[#E8E8E6] px-1.5 py-[3px]">
        <svg width="9" height="7" viewBox="0 0 16 12" fill="none">
          <path d="M1 2 v8 a1 1 0 0 0 1 1 h2 V6 L8 9 L12 6 v5 h2 a1 1 0 0 0 1-1 V2 a1 1 0 0 0-1-1 L8 5.5 L2 1 a1 1 0 0 0-1 1 Z" fill="#EA4335" />
        </svg>
        <span className="text-[5px] font-semibold text-[#6B6A67]">Inbox</span>
      </div>
      {/* Email rows */}
      <div className="flex flex-1 flex-col">
        {emails.map((e, i) => (
          <div
            key={i}
            className="flex flex-1 items-center gap-1 border-b border-[#E8E8E6] px-1.5 last:border-0"
          >
            <span
              className={`flex-shrink-0 text-[5px] ${e.unread ? "font-bold text-[#111110]" : "text-[#6B6A67]"}`}
              style={{ width: 24 }}
            >
              {e.from.split(" ")[0]}
            </span>
            <span
              className={`flex-1 truncate text-[5px] ${e.unread ? "text-[#111110]" : "text-[#ADADAA]"}`}
            >
              {e.subj}
            </span>
          </div>
        ))}
      </div>
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
                className="overflow-hidden rounded-[4px] border border-[#E8E8E6] bg-white"
                style={{
                  width: CARD_W,
                  height: CARD_H,
                  marginTop: i % 2 === 0 ? 0 : 60,
                  transform: `rotate(${i % 2 === 0 ? -3 : 3}deg)`,
                }}
              >
                <Render />
              </div>
            );
          })}
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
