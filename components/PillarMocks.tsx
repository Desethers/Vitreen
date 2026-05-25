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

function ChevronDown({ muted = false }: { muted?: boolean }) {
  return (
    <svg width="7" height="7" viewBox="0 0 12 12" fill="none" stroke={muted ? "#ADADAA" : "#6B6A67"} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 5 L6 8 L9 5" />
    </svg>
  );
}
function FolderClosed() {
  return (
    <svg width="11" height="8" viewBox="0 0 16 12" fill="#C8C7C2" stroke="#A8A7A2" strokeWidth="0.4">
      <path d="M1 3.5 V10 a1 1 0 0 0 1 1 h12 a1 1 0 0 0 1-1 V5 a1 1 0 0 0-1-1 H7 L5.5 2.5 a1 1 0 0 0-.7-.3 H2 a1 1 0 0 0-1 1 Z" />
    </svg>
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
      {/* ── Background: folder tree (gallery's real file system) ── */}
      <div className="absolute inset-0 px-6 py-6">
        <div className="flex flex-col gap-[11px]">
          {/* Document header */}
          <div className="flex items-center gap-2.5 border-b border-[#E8E8E6] pb-3">
            <span className="block h-[13px] w-[13px] rounded-[3px] border border-[#ADADAA]" />
            <span className="text-[13px] font-medium text-[#111110]">Document</span>
            <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="#6B6A67" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 3 v6 m-3 -3 3 3 3 -3" />
            </svg>
          </div>
          {/* Folder 1 */}
          <div className="flex items-center gap-2.5">
            <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="#6B6A67" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 5 L6 8 L9 5" />
            </svg>
            <svg width="15" height="11" viewBox="0 0 16 12" fill="#C8C7C2" stroke="#A8A7A2" strokeWidth="0.4">
              <path d="M1 3.5 V10 a1 1 0 0 0 1 1 h12 a1 1 0 0 0 1-1 V5 a1 1 0 0 0-1-1 H7 L5.5 2.5 a1 1 0 0 0-.7-.3 H2 a1 1 0 0 0-1 1 Z" />
            </svg>
            <span className="text-[13px] font-medium text-[#111110]">01 — Inventory 2026</span>
            <span className="text-[13px] text-[#ADADAA]">· 42 files</span>
          </div>
          {/* Subfolder */}
          <div className="flex items-center gap-2.5 pl-7">
            <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="#6B6A67" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 5 L6 8 L9 5" />
            </svg>
            <svg width="15" height="11" viewBox="0 0 16 12" fill="#C8C7C2" stroke="#A8A7A2" strokeWidth="0.4">
              <path d="M1 3.5 V10 a1 1 0 0 0 1 1 h12 a1 1 0 0 0 1-1 V5 a1 1 0 0 0-1-1 H7 L5.5 2.5 a1 1 0 0 0-.7-.3 H2 a1 1 0 0 0-1 1 Z" />
            </svg>
            <span className="text-[13px] font-medium text-[#111110]">01.1 Warhol</span>
            <span className="text-[13px] text-[#ADADAA]">· 6 files</span>
          </div>
          {/* Files inside */}
          <div className="flex items-center gap-2.5 pl-16">
            <FilePdf />
            <span className="text-[12.5px] text-[#111110]">Marilyn 1967 — provenance.pdf</span>
          </div>
          <div className="flex items-center gap-2.5 pl-16">
            <FileXlsx />
            <span className="text-[12.5px] text-[#111110]">Inventory Q1 2026.xlsx</span>
          </div>
          <div className="flex items-center gap-2.5 pl-16">
            <FileDoc />
            <span className="text-[12.5px] text-[#111110]">M. Tanaka — collector notes.docx</span>
          </div>
          <div className="flex items-center gap-2.5 pl-16">
            <FilePdf />
            <span className="text-[12.5px] text-[#111110]">EXH-005 — Basel ’26 brief.pdf</span>
          </div>
        </div>
      </div>

      {/* ── Foreground: mail inquiry with rich metadata ── */}
      <div className="absolute" style={{ bottom: 22, right: 22, width: 252 }}>
        <div className="rounded-[6px] border border-[#E8E8E6] bg-white shadow-[0_14px_32px_rgba(0,0,0,0.08)]">
          {/* Mail toolbar */}
          <div className="flex items-center justify-between border-b border-[#E8E8E6] px-2.5 py-1.5">
            <div className="flex items-center gap-1.5">
              <span className="block h-[6px] w-[6px] rounded-full bg-[#FF5F57]" />
              <span className="block h-[6px] w-[6px] rounded-full bg-[#FEBC2E]" />
              <span className="block h-[6px] w-[6px] rounded-full bg-[#28C840]" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[8.5px] text-[#6B6A67]">Inbox · Collectors</span>
              <span className="block h-[3px] w-[3px] rounded-full bg-[#ADADAA]" />
              <span className="text-[8.5px] text-[#ADADAA]">3 / 412</span>
            </div>
          </div>

          {/* Top bar: avatar + subject + star */}
          <div className="flex items-start gap-2 border-b border-[#E8E8E6] px-3 py-2.5">
            <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#111110]">
              <span className="text-[9px] font-semibold tracking-wide text-white">MT</span>
            </div>
            <div className="flex min-w-0 flex-1 flex-col leading-tight">
              <div className="flex items-center justify-between">
                <span className="text-[10.5px] font-semibold text-[#111110]">M. Tanaka</span>
                <span className="text-[8.5px] text-[#ADADAA]">14:32</span>
              </div>
              <span className="text-[9.5px] text-[#6B6A67]">Re: Available Warhol works</span>
            </div>
          </div>

          {/* Metadata grid */}
          <div className="grid grid-cols-[44px_1fr] gap-y-[3px] gap-x-2 border-b border-[#E8E8E6] px-3 py-2.5">
            <span className="text-[8.5px] uppercase tracking-[0.12em] text-[#ADADAA]">From</span>
            <span className="truncate text-[9.5px] text-[#111110]">
              m.tanaka@tanaka-collection.jp
            </span>
            <span className="text-[8.5px] uppercase tracking-[0.12em] text-[#ADADAA]">To</span>
            <span className="truncate text-[9.5px] text-[#111110]">
              maria@vitreen.gallery
            </span>
            <span className="text-[8.5px] uppercase tracking-[0.12em] text-[#ADADAA]">Cc</span>
            <span className="truncate text-[9.5px] text-[#6B6A67]">studio@vitreen.gallery</span>
            <span className="text-[8.5px] uppercase tracking-[0.12em] text-[#ADADAA]">Date</span>
            <span className="text-[9.5px] text-[#6B6A67]">
              25 May 2026 · 14:32 <span className="text-[#ADADAA]">(JST)</span>
            </span>
          </div>

          {/* Body excerpt */}
          <div className="border-b border-[#E8E8E6] px-3 py-2.5">
            <p className="text-[9.5px] leading-[1.55] text-[#6B6A67]">
              Dear Maria, thank you — please find attached the curated selection
              for our conversation last week.
            </p>
            <p className="mt-1.5 text-[9.5px] leading-[1.55] text-[#ADADAA]">
              —<br />
              M. Tanaka · Tokyo Contemporary Collection
            </p>
          </div>

          {/* Attachment row */}
          <div className="flex flex-col gap-1.5 px-3 py-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[8.5px] uppercase tracking-[0.12em] text-[#ADADAA]">
                1 attachment
              </span>
              <span className="text-[8.5px] text-[#ADADAA]">4.2 MB</span>
            </div>
            <div className="flex items-center gap-2 rounded-[4px] border border-[#E8E8E6] bg-[#FAFAF8] px-2 py-1.5">
              <FilePdf />
              <div className="flex min-w-0 flex-1 flex-col leading-tight">
                <span className="truncate text-[10px] font-medium text-[#111110]">
                  Warhol_Selection_May_2026.pdf
                </span>
                <span className="text-[8.5px] text-[#ADADAA]">
                  6 works · 12 pages · v3
                </span>
              </div>
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="#6B6A67" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 2 v9 m-3 -3 3 3 3 -3" />
                <path d="M3 14 h10" />
              </svg>
            </div>
            {/* Tag/label row */}
            <div className="mt-0.5 flex items-center gap-1">
              <span className="rounded-full bg-[#FFE08A]/70 px-1.5 py-[1px] text-[8px] text-[#111110]">
                Tier 1
              </span>
              <span className="rounded-full border border-[#E8E8E6] px-1.5 py-[1px] text-[8px] text-[#6B6A67]">
                Warhol
              </span>
              <span className="rounded-full border border-[#E8E8E6] px-1.5 py-[1px] text-[8px] text-[#6B6A67]">
                Basel ’26
              </span>
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
