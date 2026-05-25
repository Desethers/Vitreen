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
            <span className="block h-[9px] w-[9px] rounded-[3px] border border-[#ADADAA]" />
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
      <div className="absolute" style={{ bottom: 16, right: 28, width: 320 }}>
        <div className="overflow-hidden rounded-[7px] border border-[#E8E8E6] bg-white">
          {/* Sender row — Outlook logo avatar + name + "to me" + time */}
          <div className="flex items-center gap-2.5 px-3.5 py-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#F3F3F1]">
              <img
                src="/logos/Microsoft_Office_Outlook_Logo.svg"
                alt=""
                aria-hidden="true"
                className="h-[22px] w-[22px] object-contain"
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col leading-tight">
              <div className="flex items-baseline justify-between gap-2">
                <span className="truncate text-[13px] font-semibold text-[#111110]">
                  M. Tanaka
                </span>
                <span className="flex-shrink-0 text-[10.5px] text-[#ADADAA]">Tue 14:32</span>
              </div>
              <span className="truncate text-[10.5px] text-[#ADADAA]">to me</span>
            </div>
          </div>

          {/* Subject */}
          <div className="border-t border-[#E8E8E6] px-3.5 py-2.5">
            <span className="block text-[13px] font-semibold leading-tight text-[#111110]">
              Re: Available Warhol works
            </span>
          </div>

          {/* Body */}
          <div className="border-t border-[#E8E8E6] px-3.5 py-3">
            <p className="text-[11px] leading-[1.55] text-[#6B6A67]">
              Dear Maria, thank you — please find attached the curated selection
              for our conversation last week.
            </p>
          </div>

          {/* Attachment */}
          <div className="border-t border-[#E8E8E6] px-3.5 py-3">
            <div className="flex items-center gap-2 rounded-[4px] border border-[#E8E8E6] bg-[#FAFAF8] px-2.5 py-2">
              <FilePdf />
              <div className="flex min-w-0 flex-1 flex-col leading-tight">
                <span className="truncate text-[11.5px] font-medium text-[#111110]">
                  Warhol_Selection_May_2026.pdf
                </span>
                <span className="text-[10px] text-[#ADADAA]">4.2 MB · 6 works</span>
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

/* ── Real app icons ── */

/* Outlook (Microsoft Fluent): official logo from /public/logos/. */
function AppOutlook() {
  return (
    <img
      src="/logos/Microsoft_Office_Outlook_Logo.svg"
      alt=""
      aria-hidden="true"
      className="h-[11px] w-[11px] flex-shrink-0 object-contain"
    />
  );
}

/* Legacy hand-drawn fallback (kept for reference, unused). */
function _AppOutlookFallback() {
  return (
    <svg viewBox="0 0 32 32" width="11" height="11" className="flex-shrink-0 overflow-visible">
      <defs>
        <linearGradient id="ot-back" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5BB1F0" />
          <stop offset="100%" stopColor="#1F78D5" />
        </linearGradient>
        <linearGradient id="ot-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2580D8" />
          <stop offset="100%" stopColor="#0E4B95" />
        </linearGradient>
        <linearGradient id="ot-purple" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#B5A8E2" />
          <stop offset="100%" stopColor="#6B58B0" />
        </linearGradient>
        <clipPath id="ot-clip">
          <rect width="32" height="32" rx="6" />
        </clipPath>
      </defs>
      <g clipPath="url(#ot-clip)">
        <rect width="32" height="32" fill="url(#ot-back)" />
        <path d="M18 0 L32 0 L32 14 L24 18 Z" fill="url(#ot-purple)" />
        <path d="M0 0 L18 0 L14 12 L0 16 Z" fill="white" opacity="0.08" />
        <path d="M0 11 L32 11 L32 32 L0 32 Z" fill="url(#ot-front)" />
        <path d="M0 11 L16 22 L32 11" stroke="rgba(0,0,0,0.18)" strokeWidth="0.6" fill="none" />
        <ellipse cx="10.5" cy="20.5" rx="5" ry="5.8" fill="white" />
        <ellipse cx="10.5" cy="20.5" rx="2.4" ry="3.3" fill="url(#ot-front)" />
      </g>
    </svg>
  );
}

/* WhatsApp: official app icon from /public/logos/. */
function AppWhatsapp() {
  return (
    <img
      src="/logos/Android_App_Icon_2026.png"
      alt=""
      aria-hidden="true"
      className="h-[11px] w-[11px] flex-shrink-0 rounded-[2px] object-contain"
    />
  );
}

/* Apple Calendar (macOS): white card, red top bar with day, bold black date. */
function AppCalendar() {
  return (
    <svg viewBox="0 0 32 32" width="11" height="11" className="flex-shrink-0">
      <defs>
        <clipPath id="cal-clip">
          <rect width="32" height="32" rx="6" />
        </clipPath>
      </defs>
      <g clipPath="url(#cal-clip)">
        {/* White body */}
        <rect width="32" height="32" fill="white" />
        {/* Red top bar */}
        <rect width="32" height="9" fill="#FF3B30" />
        {/* Day label */}
        <text
          x="16"
          y="6.5"
          fontSize="4"
          fontWeight="700"
          fill="white"
          textAnchor="middle"
          fontFamily="-apple-system, system-ui, sans-serif"
          letterSpacing="0.3"
        >
          TUE
        </text>
        {/* Date number */}
        <text
          x="16"
          y="25"
          fontSize="14"
          fontWeight="700"
          fill="#111110"
          textAnchor="middle"
          fontFamily="-apple-system, system-ui, sans-serif"
        >
          25
        </text>
        {/* Outline */}
        <rect x="0.25" y="0.25" width="31.5" height="31.5" rx="5.75" fill="none" stroke="#E0E0DD" strokeWidth="0.5" />
      </g>
    </svg>
  );
}

const darkSurface: React.CSSProperties = {
  border: "0.5px solid rgba(255,255,255,0.08)",
  background: "#18181A",
};

function DeployPill({
  label,
  time,
  app,
  tone,
}: {
  label: string;
  time: string;
  app: "outlook" | "whatsapp" | "calendar";
  tone: "blue" | "green" | "amber";
}) {
  const dotColor = {
    blue: "#4EA3FF",
    green: "#36D37E",
    amber: "#F2C94C",
  }[tone];

  return (
    <div
      className="flex items-center justify-between rounded-[3px] py-[7px] pl-[5px] pr-1"
      style={darkSurface}
    >
      <span className="flex min-w-0 items-center gap-1 text-[5px] leading-none text-white">
        <span
          className="h-[3px] w-[3px] shrink-0 rounded-full"
          style={{ backgroundColor: dotColor, boxShadow: `0 0 0 1.5px ${dotColor}24` }}
          aria-hidden="true"
        />
        <span className="truncate">{label}</span>
      </span>
      <div className="flex items-center gap-1.5">
        <span className="text-[4px] leading-none tabular-nums text-white/45">{time}</span>
        {app === "outlook" && <AppOutlook />}
        {app === "whatsapp" && <AppWhatsapp />}
        {app === "calendar" && <AppCalendar />}
      </div>
    </div>
  );
}

function DeployJourney() {
  return (
    <div className="flex flex-col">
      {/* Main request card — Outlook-style layout (icon · sender · time / divider / body) */}
      <div className="rounded-[4px] bg-white px-1.5 py-1.5" style={hairline}>
        {/* Header row */}
        <div className="flex items-start gap-1.5">
          {/* Outlook avatar */}
          <div className="flex h-[12px] w-[12px] flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
            <AppOutlook />
          </div>
          <div className="flex flex-1 flex-col leading-tight">
            <div className="flex items-baseline justify-between">
              <span className="text-[5.5px] font-semibold text-[#111110]">M. Tanaka</span>
              <span className="text-[4px] text-[#ADADAA]">Tue 14:32</span>
            </div>
            <span className="text-[4.5px] text-[#ADADAA]">to maria</span>
          </div>
        </div>

        {/* Divider */}
        <div className="my-1 h-px w-full bg-[#E8E8E6]" />

        {/* Body */}
        <p className="text-[5px] leading-[1.5] text-[#111110]">
          Could we have the Warhol <em className="italic">Marilyn, 1967</em> selection
          ahead of Tuesday’s preview? Please include:
        </p>
        <ul className="mt-[3px] flex flex-col gap-[1px]">
          <li className="text-[5px] leading-[1.4] text-[#111110]">— 6 high-res images</li>
          <li className="text-[5px] leading-[1.4] text-[#111110]">— Provenance documents</li>
          <li className="text-[5px] leading-[1.4] text-[#111110]">— Auction comparables (2018–24)</li>
        </ul>
      </div>

      {/* Reply-thread connector + indented dark pill stack */}
      <div className="relative pl-4 pt-1">
        {/* Vertical thread line on the left */}
        <div
          className="absolute"
          style={{
            left: 7,
            top: 0,
            bottom: 4,
            width: 0.5,
            background: "rgba(17,17,16,0.18)",
          }}
        />
        {/* Small horizontal tick into the first pill */}
        <div
          className="absolute"
          style={{
            left: 7,
            top: 9,
            width: 7,
            height: 0.5,
            background: "rgba(17,17,16,0.18)",
          }}
        />

        {/* Stacked pills */}
        <div className="relative" style={{ height: 23 + 2 * 18 }}>
          {[
            { label: "Selection requested", time: "14:32", app: "outlook" as const, tone: "blue" as const },
            { label: "PDF selection generated", time: "14:38", app: "whatsapp" as const, tone: "green" as const },
            { label: "Follow-up scheduled", time: "Mon · 09:00", app: "calendar" as const, tone: "amber" as const },
          ].map((p, i, arr) => (
            <div
              key={p.label}
              className="absolute"
              style={{
                top: i * 18,
                left: i * 5,
                right: 8 + i * 8,
                zIndex: arr.length - i,
                transform: `scale(${1 - i * 0.025})`,
                transformOrigin: "top center",
              }}
            >
              <DeployPill label={p.label} time={p.time} app={p.app} tone={p.tone} />
            </div>
          ))}
        </div>
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
