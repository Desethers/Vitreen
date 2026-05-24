"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

/* ─────────────────────────────────────────
   Pillar 1 — Artworks & Archives
   Mini artwork database / inventory table
───────────────────────────────────────── */
export function ArchiveMock() {
  const rows = [
    { title: "Untitled (Horizon)", artist: "Claire Fontaine", year: "2024", medium: "Oil on canvas", status: "Available", color: "#4CAF50" },
    { title: "Composition No. 7", artist: "Claire Fontaine", year: "2024", medium: "Mixed media", status: "Reserved", color: "#FF9800" },
    { title: "Dawn Study No. 7", artist: "Sacha Elron", year: "2023", medium: "Oil on canvas", status: "Sold", color: "#ADADAA" },
    { title: "Evening Field", artist: "Sacha Elron", year: "2023", medium: "Gouache on paper", status: "Available", color: "#4CAF50" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.38, ease }}
      className="flex h-full flex-col overflow-hidden rounded-lg border border-[#E8E8E6] bg-white"
    >
      {/* Toolbar */}
      <div className="flex items-center gap-2 border-b border-[#F0F0EE] px-3 py-2.5">
        <div className="flex h-6 flex-1 items-center gap-1.5 rounded-md border border-[#E8E8E6] bg-[#FAFAF8] px-2">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#ADADAA" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <span className="text-[9px] text-[#ADADAA]">Search artworks…</span>
        </div>
        <div className="flex h-6 items-center gap-1 rounded-md bg-[#111110] px-2">
          <span className="text-[9px] font-medium text-white">+ New</span>
        </div>
      </div>
      {/* Header row */}
      <div className="grid grid-cols-[1fr_auto] border-b border-[#F0F0EE] px-3 py-1.5">
        <span className="text-[9px] font-medium uppercase tracking-[0.08em] text-[#ADADAA]">Artwork</span>
        <span className="text-[9px] font-medium uppercase tracking-[0.08em] text-[#ADADAA]">Status</span>
      </div>
      {/* Rows */}
      {rows.map((row, i) => (
        <motion.div
          key={row.title}
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.06, duration: 0.3, ease }}
          className="grid grid-cols-[auto_1fr_auto] items-center gap-2.5 border-b border-[#F8F8F6] px-3 py-2 last:border-0"
        >
          <div className="h-8 w-8 shrink-0 rounded-[3px] bg-[#F0F0EE]" style={{ background: `hsl(${i * 40 + 20}, 18%, ${88 - i * 3}%)` }} />
          <div className="min-w-0">
            <p className="truncate text-[10.5px] font-medium leading-tight text-[#111110]">{row.title}</p>
            <p className="truncate text-[9px] leading-tight text-[#8A8A86]">{row.artist} · {row.year} · {row.medium}</p>
          </div>
          <span className="shrink-0 text-[8.5px] font-medium" style={{ color: row.color }}>{row.status}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Pillar 2 — Public & Private Publishing
   Side-by-side: website grid + private OVR
───────────────────────────────────────── */
export function PublishingMock() {
  const [tab, setTab] = useState<"public" | "private">("public");
  useEffect(() => {
    const id = setInterval(() => setTab((t) => t === "public" ? "private" : "public"), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.38, ease }}
      className="flex h-full flex-col overflow-hidden rounded-lg border border-[#E8E8E6] bg-white"
    >
      {/* Browser bar */}
      <div className="flex items-center gap-2 border-b border-[#F0F0EE] px-3 py-2">
        <div className="flex gap-1">
          <div className="h-2 w-2 rounded-full bg-[#E8E8E6]" />
          <div className="h-2 w-2 rounded-full bg-[#E8E8E6]" />
          <div className="h-2 w-2 rounded-full bg-[#E8E8E6]" />
        </div>
        <div className="flex h-5 flex-1 items-center rounded border border-[#E8E8E6] px-2">
          <span className="text-[8.5px] text-[#ADADAA]">galerie-fontaine.com</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#F0F0EE]">
        {(["public", "private"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className="flex-1 py-1.5 text-[9px] font-medium capitalize transition-colors"
            style={{ color: tab === t ? "#111110" : "#ADADAA", borderBottom: tab === t ? "1px solid #111110" : "1px solid transparent" }}>
            {t === "public" ? "🌐 Public site" : "🔒 Private link"}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {tab === "public" ? (
          <motion.div key="public"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex-1 p-3"
          >
            <p className="mb-2 text-[9px] font-semibold text-[#111110]">Galerie Fontaine — Works</p>
            <div className="grid grid-cols-3 gap-1.5">
              {[0.85, 0.7, 0.9, 0.75, 0.8, 0.65].map((o, i) => (
                <div key={i} className="aspect-square rounded-[3px]" style={{ background: `hsl(${i * 35 + 15}, 15%, ${85 + i}%)`, opacity: o }} />
              ))}
            </div>
            <div className="mt-2 flex items-center gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-[#4CAF50]" />
              <span className="text-[8px] text-[#6B6A67]">Live — updated 3 min ago</span>
            </div>
          </motion.div>
        ) : (
          <motion.div key="private"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex-1 p-3 flex flex-col gap-2"
          >
            <div className="rounded-md border border-[#E8E8E6] p-2.5">
              <div className="mb-1.5 flex items-center gap-1.5">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#6B6A67" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <span className="text-[9px] font-medium text-[#111110]">Private Viewing · Spring 2026</span>
              </div>
              <p className="text-[8.5px] text-[#ADADAA]">4 works — link expires in 7 days</p>
            </div>
            <div className="rounded-md border border-[#E8E8E6] p-2.5">
              <div className="mb-1 flex items-center gap-1.5">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#6B6A67" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                <span className="text-[9px] font-medium text-[#111110]">Collector PDF ready</span>
              </div>
              <p className="text-[8.5px] text-[#ADADAA]">3 artworks — auto-generated</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Pillar 3 — Collector Relationships
   Inquiry thread linked to artworks
───────────────────────────────────────── */
export function CollectorMock() {
  const conversations = [
    {
      name: "Marc Durand",
      initials: "MD",
      msg: "Interested in Untitled (Horizon) — is it still available?",
      time: "09:24",
      artwork: "Untitled (Horizon)",
      status: "Follow-up sent",
      statusColor: "#4CAF50",
      active: true,
    },
    {
      name: "Sophie Veil",
      initials: "SV",
      msg: "Could you send more information about the dimensions?",
      time: "Yesterday",
      artwork: "Dawn Study No. 7",
      status: "Awaiting reply",
      statusColor: "#FF9800",
      active: false,
    },
    {
      name: "James Howell",
      initials: "JH",
      msg: "We'd like to reserve Composition No. 7.",
      time: "Mon",
      artwork: "Composition No. 7",
      status: "Reserved",
      statusColor: "#ADADAA",
      active: false,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.38, ease }}
      className="flex h-full overflow-hidden rounded-lg border border-[#E8E8E6] bg-white"
    >
      {/* List */}
      <div className="flex w-[140px] shrink-0 flex-col border-r border-[#F0F0EE]">
        <div className="border-b border-[#F0F0EE] px-3 py-2">
          <p className="text-[9px] font-semibold text-[#111110]">Inquiries</p>
          <p className="text-[8px] text-[#ADADAA]">3 active</p>
        </div>
        {conversations.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08, duration: 0.3, ease }}
            className="flex items-start gap-2 border-b border-[#F8F8F6] px-3 py-2 last:border-0"
            style={{ background: c.active ? "#F8F8F6" : "transparent" }}
          >
            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#111110] text-[8px] font-bold text-white">
              {c.initials}
            </div>
            <div className="min-w-0">
              <p className="truncate text-[9.5px] font-medium text-[#111110]">{c.name}</p>
              <p className="truncate text-[8px] text-[#ADADAA]">{c.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Detail */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="border-b border-[#F0F0EE] px-3 py-2">
          <p className="text-[10px] font-semibold text-[#111110]">{conversations[0].name}</p>
          <p className="text-[8.5px] text-[#ADADAA]">Re: {conversations[0].artwork}</p>
        </div>
        <div className="flex flex-1 flex-col gap-2 overflow-hidden p-3">
          <div className="self-start rounded-lg rounded-tl-none bg-[#F0F0EE] px-2.5 py-2 text-[9.5px] leading-relaxed text-[#111110]">
            {conversations[0].msg}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.35 }}
            className="self-end rounded-lg rounded-tr-none bg-[#111110] px-2.5 py-2 text-[9.5px] leading-relaxed text-white"
          >
            Yes — still available. I'll send you the full dossier.
          </motion.div>
          <div className="mt-auto flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full" style={{ background: conversations[0].statusColor }} />
            <span className="text-[8px]" style={{ color: conversations[0].statusColor }}>{conversations[0].status}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Pillar 4 — Gallery Assistants
   AI assistant with gallery context
───────────────────────────────────────── */
export function AssistantMock() {
  const [typing, setTyping] = useState(false);
  const [done, setDone] = useState(false);
  const response = "Dear Marc, following our conversation about Untitled (Horizon) — I'm happy to confirm the work is still available. I've attached a full documentation dossier including dimensions, provenance and condition report. Please don't hesitate to get in touch if you'd like to arrange a viewing.";
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    const t1 = setTimeout(() => setTyping(true), 600);
    const t2 = setTimeout(() => {
      setTyping(false);
      let i = 0;
      const interval = setInterval(() => {
        setDisplayed(response.slice(0, i));
        i += 3;
        if (i > response.length) { clearInterval(interval); setDone(true); }
      }, 18);
      return () => clearInterval(interval);
    }, 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.38, ease }}
      className="flex h-full flex-col overflow-hidden rounded-lg border border-[#E8E8E6] bg-white"
    >
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-[#F0F0EE] px-3 py-2.5">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#111110]">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6v6l4 2"/></svg>
        </div>
        <div>
          <p className="text-[10px] font-semibold text-[#111110]">Gallery Assistant</p>
          <p className="text-[8px] text-[#ADADAA]">Galerie Fontaine context</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex flex-1 flex-col gap-2.5 overflow-hidden p-3">
        {/* User prompt */}
        <div className="flex justify-end">
          <div className="max-w-[85%] rounded-lg rounded-tr-none bg-[#111110] px-2.5 py-2 text-[9.5px] leading-relaxed text-white">
            Draft a follow-up email for Marc Durand about Untitled (Horizon), 2024.
          </div>
        </div>

        {/* Assistant response */}
        <div className="flex items-start gap-2">
          <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F0F0EE]">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#6B6A67" strokeWidth="2" strokeLinecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          </div>
          <div className="flex-1 rounded-lg rounded-tl-none bg-[#F8F8F6] px-2.5 py-2 text-[9.5px] leading-relaxed text-[#111110]">
            {typing && (
              <span className="flex gap-0.5">
                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0 }} className="inline-block h-1.5 w-1.5 rounded-full bg-[#ADADAA]" />
                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} className="inline-block h-1.5 w-1.5 rounded-full bg-[#ADADAA]" />
                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} className="inline-block h-1.5 w-1.5 rounded-full bg-[#ADADAA]" />
              </span>
            )}
            {!typing && (
              <>
                {displayed}
                {!done && <span className="ml-px inline-block h-3 w-px animate-pulse bg-[#111110]" />}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Input bar */}
      <div className="flex items-center gap-2 border-t border-[#F0F0EE] px-3 py-2">
        <div className="flex h-7 flex-1 items-center rounded-full border border-[#E8E8E6] px-3">
          <span className="text-[9px] text-[#ADADAA]">Ask anything about your gallery…</span>
        </div>
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#111110]">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Pillar data (static, EN)
───────────────────────────────────────── */
export const PILLARS = [
  {
    number: "01",
    title: "Artworks & Archives",
    desc: "Organise artworks, exhibitions and archives across existing gallery systems — without replacing existing tools.",
    Mock: ArchiveMock,
  },
  {
    number: "02",
    title: "Public & Private Publishing",
    desc: "Move seamlessly between public presentation and private distribution while maintaining consistency around artworks.",
    Mock: PublishingMock,
  },
  {
    number: "03",
    title: "Collector Relationships",
    desc: "Keep collector inquiries, follow-ups and sales conversations connected to the right artworks.",
    Mock: CollectorMock,
  },
  {
    number: "04",
    title: "Gallery Assistants",
    desc: "Reduce repetitive operational work so galleries can focus on artists, exhibitions and collectors.",
    Mock: AssistantMock,
  },
];
