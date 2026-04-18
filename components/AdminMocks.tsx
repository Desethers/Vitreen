"use client";

import React from "react";

function AdminShell({
  children,
  title,
  action,
}: {
  active?: string;
  children: React.ReactNode;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="w-full h-full flex flex-col bg-white text-[#111110] font-sans text-[12px]">
      <header className="flex items-center justify-between px-3 h-9 border-b border-[#E8E8E6] shrink-0">
        <h4 className="font-display text-[13px] font-normal tracking-[-0.01em] m-0">{title}</h4>
        {action}
      </header>
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

function StatusDot({ color }: { color: string }) {
  return (
    <span
      className="inline-block w-1.5 h-1.5 rounded-full"
      style={{ background: color }}
    />
  );
}

export function InquiryInboxMock() {
  const inquiries = [
    {
      initials: "EM",
      name: "Elena Marchetti",
      artwork: "Sacha Elron — Untitled (Horizon), 2024",
      excerpt: "I'd like to know the current availability and price…",
      time: "2h",
      status: "New",
      statusColor: "#111110",
    },
    {
      initials: "DK",
      name: "David Kessler",
      artwork: "Clémence Rivière — Other Rooms, 1959",
      excerpt: "Could we arrange a private viewing next week?",
      time: "5h",
      status: "Replied",
      statusColor: "#6B6A67",
    },
    {
      initials: "SA",
      name: "Sofia Almeida",
      artwork: "Jonas Mehler — Vetiver (Shanghai)",
      excerpt: "Interested. Is the work still available?",
      time: "1d",
      status: "New",
      statusColor: "#111110",
    },
    {
      initials: "RN",
      name: "Rafael Nowak",
      artwork: "Sacha Elron — Dawn Study No. 7, 2023",
      excerpt: "Confirming the wire transfer on Monday.",
      time: "2d",
      status: "Sold",
      statusColor: "#1F7A4A",
    },
    {
      initials: "MH",
      name: "Margaux Hébert",
      artwork: "Sacha Elron — Evening Field, 2023",
      excerpt: "Thank you for the catalogue — one follow-up…",
      time: "3d",
      status: "Replied",
      statusColor: "#6B6A67",
    },
  ];

  return (
    <AdminShell
      active="Inquiries"
      title="Inquiries"
      action={
        <div className="flex items-center gap-2 text-[10px] text-[#6B6A67]">
          <span>All · New · Replied · Sold</span>
        </div>
      }
    >
      <div className="h-full overflow-y-auto">
        {inquiries.map((q, i) => (
          <div
            key={i}
            className="flex items-start gap-3 px-4 md:px-6 py-3 border-b border-[#EFEFEB] hover:bg-[#FAFAF8]"
          >
            <div className="w-7 h-7 rounded-full bg-[#F2F2EE] text-[#6B6A67] text-[10px] font-medium flex items-center justify-center shrink-0">
              {q.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-medium truncate">{q.name}</span>
                <span className="text-[9px] uppercase tracking-[0.1em] text-[#ADADAA] shrink-0">
                  {q.time}
                </span>
              </div>
              <p className="text-[10px] text-[#6B6A67] truncate mt-0.5">{q.artwork}</p>
              <p className="text-[11px] text-[#6B6A67] truncate mt-1">{q.excerpt}</p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
              <StatusDot color={q.statusColor} />
              <span className="text-[10px] text-[#6B6A67]">{q.status}</span>
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}

export function ExhibitionSchedulerMock() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const shows = [
    { title: "Sacha Elron — Your friends", start: 1, end: 2.5, color: "#111110", room: "Turenne" },
    { title: "Clémence Rivière — Other Rooms", start: 2.5, end: 4.5, color: "#6B6A67", room: "Turenne" },
    { title: "Jonas Mehler — Vetiver (Shanghai)", start: 4, end: 6, color: "#1F7A4A", room: "Marais" },
    { title: "Group show — Paper Works", start: 6.5, end: 8.5, color: "#B88442", room: "Turenne" },
    { title: "Lena Ohta — Solo", start: 9, end: 11, color: "#4A4E9A", room: "Marais" },
  ];

  return (
    <AdminShell
      active="Exhibitions"
      title="Exhibitions · 2026"
      action={
        <button className="text-[10px] border border-[#E8E8E6] rounded-full px-3 py-1 text-[#111110]">
          + New
        </button>
      }
    >
      <div className="h-full p-4 md:p-6 overflow-auto">
        <div className="grid grid-cols-12 gap-0 text-[9px] uppercase tracking-[0.12em] text-[#ADADAA] mb-2">
          {months.map((m) => (
            <div key={m} className="border-l border-[#EFEFEB] px-1.5 py-1 first:border-l-0">
              {m}
            </div>
          ))}
        </div>
        <div className="relative flex flex-col gap-2">
          {shows.map((s, i) => {
            const leftPct = (s.start / 12) * 100;
            const widthPct = ((s.end - s.start) / 12) * 100;
            return (
              <div key={i} className="relative h-7 md:h-8">
                <div className="absolute inset-0 grid grid-cols-12">
                  {Array.from({ length: 12 }).map((_, j) => (
                    <div key={j} className="border-l border-[#EFEFEB] first:border-l-0" />
                  ))}
                </div>
                <div
                  className="absolute top-0 bottom-0 rounded flex items-center px-2 text-white"
                  style={{ left: `${leftPct}%`, width: `${widthPct}%`, background: s.color }}
                >
                  <span className="text-[9px] md:text-[10px] truncate">{s.title}</span>
                </div>
                <div
                  className="absolute -bottom-3 text-[8px] uppercase tracking-[0.12em] text-[#ADADAA]"
                  style={{ left: `${leftPct}%` }}
                >
                  {s.room}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-8 pt-4 border-t border-[#EFEFEB] flex gap-6 text-[10px] text-[#6B6A67]">
          <span>5 scheduled</span>
          <span>2 rooms</span>
          <span>11 artworks linked</span>
        </div>
      </div>
    </AdminShell>
  );
}

export function InventoryMock() {
  const artworks = [
    {
      title: "Untitled (Horizon)",
      artist: "Sacha Elron",
      year: "2024",
      medium: "Oil on canvas",
      dims: "152 × 122 cm",
      price: "€ 18 000",
      status: "Available",
      statusColor: "#1F7A4A",
    },
    {
      title: "Dawn Study No. 7",
      artist: "Sacha Elron",
      year: "2023",
      medium: "Oil on canvas",
      dims: "183 × 152 cm",
      price: "€ 22 000",
      status: "Reserved",
      statusColor: "#B88442",
    },
    {
      title: "Evening Field",
      artist: "Sacha Elron",
      year: "2023",
      medium: "Oil on canvas",
      dims: "122 × 91 cm",
      price: "€ 14 000",
      status: "Sold",
      statusColor: "#ADADAA",
    },
    {
      title: "Other Rooms, Works from 1959",
      artist: "Clémence Rivière",
      year: "1959",
      medium: "Paper, gouache",
      dims: "60 × 42 cm",
      price: "€ 9 500",
      status: "Available",
      statusColor: "#1F7A4A",
    },
    {
      title: "Vetiver (Shanghai)",
      artist: "Jonas Mehler",
      year: "2026",
      medium: "Pigment on linen",
      dims: "200 × 160 cm",
      price: "€ 28 000",
      status: "Available",
      statusColor: "#1F7A4A",
    },
  ];

  return (
    <AdminShell
      active="Artworks"
      title="Artworks"
      action={
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1.5 border border-[#E8E8E6] rounded-full px-2.5 py-1 text-[10px] text-[#ADADAA]">
            <span>⌕</span>
            <span>Search inventory</span>
          </div>
          <button className="text-[10px] bg-[#111110] text-white rounded-full px-3 py-1">
            + New
          </button>
        </div>
      }
    >
      <div className="h-full overflow-auto">
        <div className="hidden md:grid grid-cols-[48px_1.6fr_1fr_0.6fr_0.9fr_0.8fr] px-4 md:px-6 py-2 text-[9px] uppercase tracking-[0.12em] text-[#ADADAA] border-b border-[#EFEFEB]">
          <span />
          <span>Work</span>
          <span>Artist</span>
          <span>Year</span>
          <span>Price</span>
          <span>Status</span>
        </div>
        {artworks.map((a, i) => (
          <div
            key={i}
            className="grid grid-cols-[40px_1fr_auto] md:grid-cols-[48px_1.6fr_1fr_0.6fr_0.9fr_0.8fr] items-center gap-x-2 px-3 md:px-6 py-2.5 border-b border-[#EFEFEB] hover:bg-[#FAFAF8]"
          >
            <div className="w-8 h-8 rounded bg-[#F2F2EE]" />
            <div className="min-w-0">
              <p className="text-[11px] font-medium truncate">{a.title}</p>
              <p className="text-[9px] text-[#ADADAA] truncate">
                <span className="md:hidden">{a.artist} · {a.price}</span>
                <span className="hidden md:inline">{a.medium} · {a.dims}</span>
              </p>
            </div>
            <span className="hidden md:block text-[11px] text-[#6B6A67] truncate">{a.artist}</span>
            <span className="hidden md:block text-[11px] text-[#6B6A67]">{a.year}</span>
            <span className="hidden md:block text-[11px] text-[#111110]">{a.price}</span>
            <span className="flex items-center gap-1.5 text-[10px] text-[#6B6A67] shrink-0">
              <StatusDot color={a.statusColor} />
              <span className="hidden md:inline">{a.status}</span>
            </span>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
