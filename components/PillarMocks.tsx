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
      <div className="absolute inset-0 px-6 py-5 opacity-[0.55]">
        <div className="flex flex-col gap-[7px]">
          {/* Document header */}
          <div className="flex items-center gap-2 border-b border-[#E8E8E6] pb-2">
            <span className="block h-[10px] w-[10px] rounded-[2px] border border-[#ADADAA]" />
            <span className="text-[10px] font-medium text-[#111110]">Document</span>
            <svg width="7" height="7" viewBox="0 0 12 12" fill="none" stroke="#6B6A67" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 3 v6 m-3 -3 3 3 3 -3" />
            </svg>
          </div>
          {/* Folder 1 */}
          <div className="flex items-center gap-2">
            <ChevronDown />
            <FolderClosed />
            <span className="text-[10px] font-medium text-[#111110]">01 — Inventory 2026</span>
            <span className="text-[10px] text-[#ADADAA]">· 42 files</span>
          </div>
          {/* Subfolder */}
          <div className="flex items-center gap-2 pl-5">
            <ChevronDown />
            <FolderClosed />
            <span className="text-[10px] font-medium text-[#111110]">01.1 Warhol</span>
            <span className="text-[10px] text-[#ADADAA]">· 6 files</span>
          </div>
          {/* Files inside */}
          <div className="flex items-center gap-2 pl-12">
            <FilePdf />
            <span className="text-[10px] text-[#111110]">Marilyn 1967 — provenance.pdf</span>
          </div>
          <div className="flex items-center gap-2 pl-12">
            <FileXlsx />
            <span className="text-[10px] text-[#111110]">Inventory Q1 2026.xlsx</span>
          </div>
          <div className="flex items-center gap-2 pl-12">
            <FileDoc />
            <span className="text-[10px] text-[#111110]">M. Tanaka — collector notes.docx</span>
          </div>
          <div className="flex items-center gap-2 pl-12">
            <FilePdf />
            <span className="text-[10px] text-[#111110]">EXH-005 — Basel ’26 brief.pdf</span>
          </div>
        </div>
      </div>

      {/* ── Foreground: Image exports card (macOS dark) ── */}
      <div className="absolute" style={{ top: 22, left: 22, width: 252 }}>
        <div className="rounded-[10px] bg-[#111110] p-3 shadow-[0_14px_36px_rgba(0,0,0,0.22)]">
          <div className="px-1 pb-2.5">
            <h4 className="text-[11.5px] font-semibold leading-tight text-white">
              1 — Image exports
            </h4>
            <p className="mt-[2px] text-[9.5px] text-white/55">For Basel ’26 — print + web</p>
          </div>
          <div className="flex flex-col gap-[6px]">
            {["WARHOL_1967_300dpi.tiff", "install-view-03.tiff", "web-crop-final.png"].map((f) => (
              <div
                key={f}
                className="flex items-center justify-between rounded-full bg-white/[0.06] py-[5px] pl-3 pr-2.5"
              >
                <span className="font-mono text-[9px] text-white">{f}</span>
                <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="5" width="9" height="9" rx="1" />
                  <path d="M3 11 V4 a1 1 0 0 1 1 -1 H11" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Foreground: timeline card ── */}
      <div className="absolute" style={{ right: 24, bottom: 24, width: 296 }}>
        <div className="rounded-[6px] border border-[#E8E8E6] bg-white px-4 py-3.5 shadow-[0_12px_32px_rgba(0,0,0,0.08)]">
          {/* Step 1 */}
          <div className="flex items-start gap-2.5">
            <div className="flex flex-col items-center">
              <CheckDot />
              <span className="mt-1 block h-3 w-px bg-[#E8E8E6]" />
            </div>
            <div className="flex items-center gap-1.5 pt-[1px]">
              <span className="text-[11px] font-semibold leading-none text-[#111110]">
                Scanned inventory
              </span>
              <svg width="10" height="9" viewBox="0 0 16 14" fill="none" stroke="#ADADAA" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="8" cy="3" rx="6" ry="1.5" />
                <path d="M2 3 v4 c0 .8 2.7 1.5 6 1.5 s6 -.7 6 -1.5 V3" />
                <path d="M2 7 v4 c0 .8 2.7 1.5 6 1.5 s6 -.7 6 -1.5 V7" />
              </svg>
              <span className="text-[10.5px] leading-none text-[#ADADAA]">Vitreen Gallery</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="mt-1.5 flex items-start gap-2.5">
            <div className="flex flex-col items-center self-stretch">
              <CheckDot />
              <span className="mt-1 block w-px flex-1 bg-[#E8E8E6]" />
            </div>
            <div className="flex flex-col gap-[7px] pb-2.5">
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

          {/* Step 3 */}
          <div className="flex items-center gap-2.5">
            <PendingDot />
            <span className="text-[11px] leading-none text-[#ADADAA]">Generating audit</span>
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
