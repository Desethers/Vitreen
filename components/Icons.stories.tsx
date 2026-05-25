"use client";

import type { Story } from "@ladle/react";

/* ─── File-type badges (mirrors the inline components in PillarMocks) ─── */

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

/* ─── App icons (real assets) ─── */

function AppOutlook() {
  return (
    <img
      src="/logos/Microsoft_Office_Outlook_Logo.svg"
      alt=""
      aria-hidden="true"
      className="h-[24px] w-[24px] flex-shrink-0 object-contain"
    />
  );
}
function AppWhatsapp() {
  return (
    <img
      src="/logos/Android_App_Icon_2026.png"
      alt=""
      aria-hidden="true"
      className="h-[24px] w-[24px] flex-shrink-0 rounded-[5px] object-contain"
    />
  );
}
function AppCalendar() {
  return (
    <svg viewBox="0 0 32 32" width="24" height="24" className="flex-shrink-0">
      <defs>
        <clipPath id="cal-clip-story">
          <rect width="32" height="32" rx="6" />
        </clipPath>
      </defs>
      <g clipPath="url(#cal-clip-story)">
        <rect width="32" height="32" fill="white" />
        <rect width="32" height="9" fill="#FF3B30" />
        <text x="16" y="6.5" fontSize="4" fontWeight="700" fill="white" textAnchor="middle" fontFamily="-apple-system, system-ui, sans-serif">TUE</text>
        <text x="16" y="25" fontSize="14" fontWeight="700" fill="#111110" textAnchor="middle" fontFamily="-apple-system, system-ui, sans-serif">25</text>
        <rect x="0.25" y="0.25" width="31.5" height="31.5" rx="5.75" fill="none" stroke="#E0E0DD" strokeWidth="0.5" />
      </g>
    </svg>
  );
}

export default {
  title: "Icons",
};

function Cell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-[#E8E8E6] p-6">
      <div className="flex h-16 w-16 items-center justify-center">{children}</div>
      <span className="text-[11px] uppercase tracking-[0.12em] text-[#6B6A67]">{label}</span>
    </div>
  );
}

export const FileBadges: Story = () => (
  <div className="grid min-h-screen grid-cols-3 gap-6 bg-white p-10" style={{ maxWidth: 720 }}>
    <Cell label="PDF"><FilePdf /></Cell>
    <Cell label="XLSX"><FileXlsx /></Cell>
    <Cell label="DOC"><FileDoc /></Cell>
  </div>
);
FileBadges.storyName = "File badges";

export const AppIcons: Story = () => (
  <div className="grid min-h-screen grid-cols-3 gap-6 bg-white p-10" style={{ maxWidth: 720 }}>
    <Cell label="Outlook"><AppOutlook /></Cell>
    <Cell label="WhatsApp"><AppWhatsapp /></Cell>
    <Cell label="Calendar"><AppCalendar /></Cell>
  </div>
);
AppIcons.storyName = "App icons";
