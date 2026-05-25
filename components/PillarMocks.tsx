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
/* One continuous collector interaction across email + WhatsApp + calendar:
   request → PDF selection generated → follow-up scheduled. */

const hairline: React.CSSProperties = { border: "0.5px solid #EFEFEB" };

function AppOutlook() {
  return (
    <div className="flex h-[11px] w-[11px] flex-shrink-0 items-center justify-center rounded-[2px] bg-[#0078D4]">
      <span className="text-[6px] font-bold leading-none text-white">O</span>
    </div>
  );
}
function AppWhatsapp() {
  return (
    <div className="flex h-[11px] w-[11px] flex-shrink-0 items-center justify-center rounded-[2px] bg-[#25D366]">
      <svg width="7" height="7" viewBox="0 0 16 16" fill="white">
        <path d="M8 1.3 a6.7 6.7 0 0 0 -5.7 10.2 L1.5 14.5 l3 -.8 A6.7 6.7 0 1 0 8 1.3 Z m-2.3 3.5 c.2 -.3 .5 -.3 .8 -.2 l.6 1.1 c.1 .2 0 .4 -.1 .5 l-.4 .4 c-.1 .1 -.1 .3 0 .4 c.4 .7 1 1.2 1.7 1.6 c.1 .1 .3 .1 .4 0 l.4 -.4 c.1 -.2 .3 -.2 .5 -.1 l1 .6 c.2 .1 .3 .4 .2 .6 c-.3 .8 -1.1 1.1 -1.8 .9 c-1.9 -.5 -3.4 -2 -4 -3.9 c-.2 -.7 0 -1.5 .7 -1.5 Z" />
      </svg>
    </div>
  );
}
function AppCalendar() {
  return (
    <div className="flex h-[11px] w-[11px] flex-shrink-0 items-center justify-center rounded-[2px] bg-white" style={hairline}>
      <svg width="7" height="7" viewBox="0 0 12 12" fill="none" stroke="#111110" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1.5" y="2.5" width="9" height="7.5" rx="1" />
        <path d="M1.5 5 h9" />
        <path d="M4 1.2 v2 M8 1.2 v2" />
      </svg>
    </div>
  );
}

function DeployPill({
  label,
  time,
  app,
}: {
  label: string;
  time: string;
  app: "outlook" | "whatsapp" | "calendar";
}) {
  return (
    <div
      className="flex items-center justify-between rounded-[4px] bg-white pl-2.5 pr-[5px] py-[3px]"
      style={hairline}
    >
      <span className="text-[7.5px] leading-none text-[#111110]">{label}</span>
      <div className="flex items-center gap-1.5">
        <span className="text-[6.5px] leading-none text-[#ADADAA] tabular-nums">{time}</span>
        {app === "outlook" && <AppOutlook />}
        {app === "whatsapp" && <AppWhatsapp />}
        {app === "calendar" && <AppCalendar />}
      </div>
    </div>
  );
}

function DeployJourney() {
  return (
    <div className="flex flex-col gap-[6px]">
      {/* Main request card */}
      <div className="rounded-[5px] bg-white px-2.5 py-2" style={hairline}>
        <div className="flex items-baseline justify-between">
          <span className="text-[8.5px] font-semibold leading-none text-[#111110]">
            M. Tanaka — Tokyo
          </span>
          <span className="text-[6.5px] leading-none text-[#ADADAA]">Tue · 14:32</span>
        </div>
        <p className="mt-1.5 text-[7.5px] leading-[1.45] text-[#6B6A67]">
          Re: Available Warhol works — could you share the Marilyn 1967 selection
          for our preview?
        </p>
      </div>

      {/* Three sequential pills */}
      <div className="flex flex-col gap-[4px]">
        <DeployPill label="Selection requested" time="14:32" app="outlook" />
        <DeployPill label="PDF selection generated" time="14:38" app="whatsapp" />
        <DeployPill label="Follow-up scheduled" time="Mon · 09:00" app="calendar" />
      </div>
    </div>
  );
}

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
          width: "42%",
          transform: "scale(2.2)",
          transformOrigin: "center center",
        }}
      >
        <DeployJourney />
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
