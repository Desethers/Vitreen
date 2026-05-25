"use client";

import { motion } from "framer-motion";
import { StepTwoSharingFlow } from "@/components/ProcessFlow";

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

      {/* ── Foreground: Outlook mail ── */}
      <div className="absolute" style={{ bottom: 8, right: 24, width: 248 }}>
        <div className="overflow-hidden rounded-[6px] border border-[#E8E8E6] bg-white">
          {/* Outlook title bar */}
          <div className="flex items-center gap-1.5 bg-[#0078D4] px-2.5 py-[6px]">
            <div className="flex h-3.5 w-3.5 items-center justify-center rounded-[2px] bg-white">
              <span className="text-[8px] font-bold leading-none text-[#0078D4]">O</span>
            </div>
            <span className="text-[9px] font-semibold text-white">Outlook</span>
            <span className="ml-auto text-[8.5px] text-white/75">Inbox · Collectors</span>
          </div>

          {/* Sender row */}
          <div className="flex items-center gap-2 px-3 py-2.5">
            <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#0078D4]">
              <span className="text-[9px] font-semibold tracking-wide text-white">MT</span>
            </div>
            <div className="flex min-w-0 flex-1 flex-col leading-tight">
              <div className="flex items-baseline justify-between gap-2">
                <span className="truncate text-[10.5px] font-semibold text-[#111110]">
                  M. Tanaka
                </span>
                <span className="flex-shrink-0 text-[8.5px] text-[#6B6A67]">Tue 14:32</span>
              </div>
              <span className="truncate text-[9px] text-[#6B6A67]">
                m.tanaka@tanaka-collection.jp
              </span>
            </div>
          </div>

          {/* Subject */}
          <div className="border-t border-[#E8E8E6] px-3 py-2">
            <span className="block text-[11px] font-semibold leading-tight text-[#111110]">
              Re: Available Warhol works
            </span>
            <span className="mt-[2px] block text-[8.5px] text-[#ADADAA]">
              To: maria@vitreen.gallery
            </span>
          </div>

          {/* Body */}
          <div className="border-t border-[#E8E8E6] px-3 py-2.5">
            <p className="text-[9.5px] leading-[1.55] text-[#6B6A67]">
              Dear Maria, thank you — please find attached the curated selection
              for our conversation last week.
            </p>
          </div>

          {/* Attachment */}
          <div className="border-t border-[#E8E8E6] px-3 py-2.5">
            <div className="flex items-center gap-2 rounded-[3px] border border-[#E8E8E6] bg-[#FAFAF8] px-2 py-1.5">
              <FilePdf />
              <div className="flex min-w-0 flex-1 flex-col leading-tight">
                <span className="truncate text-[10px] font-medium text-[#111110]">
                  Warhol_Selection_May_2026.pdf
                </span>
                <span className="text-[8.5px] text-[#ADADAA]">4.2 MB · 6 works</span>
              </div>
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
/* Local pixel-perfect stack: smaller cards, 0.5px hairline borders. */
function DeployPile() {
  const events = [
    { label: "Private PDF shared", meta: "VIP collectors · Opening preview", time: "09:18" },
    { label: "Interested in Untitled, 2024", meta: "Availability requested", time: "09:24" },
    { label: "Collector follow-up", meta: "Assigned internally", time: "09:30" },
  ];
  return (
    <div className="relative h-[52px]">
      {events.map((event, index) => (
        <div
          key={event.label}
          className="absolute inset-x-0 grid grid-cols-[auto_1fr_auto] items-center gap-1.5 rounded-[4px] bg-white px-1.5 py-[4px] shadow-[0_2px_6px_rgba(17,17,16,0.04)]"
          style={{
            zIndex: events.length - index,
            top: index * 9,
            left: index * 6,
            right: index * 6,
            opacity: 1 - index * 0.2,
            transform: `scale(${1 - index * 0.04})`,
            transformOrigin: "top center",
            border: "0.5px solid #EFEFEB",
          }}
        >
          <span className="h-[5px] w-[5px] rounded-full bg-[#111110]" aria-hidden="true" />
          <div className="min-w-0">
            <p className="truncate text-[8.5px] leading-none text-[#111110]">{event.label}</p>
            <p className="mt-[2px] truncate text-[7px] leading-none text-[#8A8A86]">{event.meta}</p>
          </div>
          <span className="text-[7px] leading-none text-[#ADADAA] tabular-nums">{event.time}</span>
        </div>
      ))}
    </div>
  );
}

// Scale 2.4× a 40% width container — keeps borders visually crisp at 0.5px source.
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
          width: "40%",
          transform: "scale(2.4)",
          transformOrigin: "center center",
        }}
      >
        <DeployPile />
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
