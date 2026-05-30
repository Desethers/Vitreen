"use client";

import { motion } from "framer-motion";
import { SAMPLE_ARTIST, SAMPLE_ARTWORK } from "@/lib/mocks/sampleData";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease, delay },
});

/* ─── Central: Gallery OS dashboard ─────────────────────────────── */

const SIDEBAR_ITEMS = [
  { icon: "▦", label: "Overview" },
  { icon: "▤", label: "Artworks", active: true },
  { icon: "◔", label: "Artists" },
  { icon: "⛁", label: "Exhibitions" },
  { icon: "▭", label: "Inquiries" },
  { icon: "✉", label: "Sales drafts", badge: 2 },
  { icon: "▢", label: "Private Selection" },
  { icon: "◉", label: "Collectors" },
  { icon: "⚙", label: "Tools" },
];

const ARTWORK_ROWS = [
  { title: "Evening Field", year: "2023", price: "8 000 €", color: "#1B2A4A" },
  { title: SAMPLE_ARTWORK.title, year: SAMPLE_ARTWORK.year, price: "6 000 €", color: "#C8D2EE" },
  { title: "Untitled (Horizon)", year: "2024", price: "8 000 €", color: "#E8D34A" },
  { title: "Sun Dog", year: "2024", price: "12 000 €", color: "#7A1F18" },
  { title: "Studio Notebook", year: "2022", price: "4 500 €", color: "#3E4A60" },
  { title: "Solstice", year: "2024", price: "14 000 €", color: "#D4A574" },
  { title: "Rivière", year: "2023", price: "9 200 €", color: "#2D5043" },
  { title: "Northern Light", year: "2022", price: "11 500 €", color: "#4A6B7A" },
  { title: "Quiet Interval", year: "2023", price: "7 400 €", color: "#9A8C6E" },
  { title: "Untitled (Drift)", year: "2024", price: "10 800 €", color: "#5C3A52" },
  { title: "Morning Tide", year: "2021", price: "6 800 €", color: "#A8BCC4" },
  { title: "Cobalt Study", year: "2024", price: "13 200 €", color: "#243E8C" },
];

export function GalleryOsDashboard({
  glass = false,
  compact = false,
}: {
  glass?: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[10px] border-[0.5px] ${
        glass
          ? "border-white/55 bg-white/72 shadow-[0_24px_60px_rgba(0,0,0,0.1)] backdrop-blur-md"
          : "border-[#E8E8E6] bg-white shadow-[0_24px_60px_rgba(0,0,0,0.15)]"
      }`}
    >
      <div className="flex">
        {/* Sidebar */}
        <div
          className={`${compact ? "hidden" : "flex"} flex-col gap-1 border-r-[0.5px] px-3 py-4 ${
            glass ? "border-white/45 bg-white/38" : "border-[#E8E8E6] bg-[#FAFAF8]"
          }`}
          style={{ width: "26%" }}
        >
          {/* Logo */}
          <div className="mb-3 flex items-center gap-2 px-1">
            <div className="flex h-5 w-5 items-center justify-center rounded-[4px] bg-[#111110]">
              <span className="text-[8px] leading-none text-white">▤</span>
            </div>
            <span className="text-[10px] font-medium text-[#111110]">Gallery OS</span>
          </div>
          {SIDEBAR_ITEMS.map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-2 rounded-[4px] px-2 py-[5px] text-[9px] ${
                item.active
                  ? glass
                    ? "bg-white/45 text-[#111110]"
                    : "bg-white text-[#111110]"
                  : "text-[#6B6A67]"
              }`}
              style={item.active ? { boxShadow: "0 0 0 0.5px #E8E8E6 inset" } : undefined}
            >
              <span className="text-[10px] leading-none text-[#ADADAA]">{item.icon}</span>
              <span className="flex-1 truncate font-medium">{item.label}</span>
              {item.badge !== undefined && (
                <span className="rounded-full bg-[#1FA854] px-1.5 py-[1px] text-[7.5px] font-medium text-white">
                  {item.badge}
                </span>
              )}
            </div>
          ))}
          <div className="mt-auto pt-3 text-[7.5px] text-[#ADADAA]">Powered by Vitreen</div>
        </div>

        {/* Main */}
        <div
          className={
            glass
              ? `flex-1 bg-white/28 ${compact ? "px-3 py-3" : "min-h-[600px] px-5 py-4"}`
              : `flex-1 ${compact ? "px-3 py-3" : "min-h-[600px] px-5 py-4"}`
          }
        >
          {compact && (
            <div className="mb-3 flex items-center justify-between border-b-[0.5px] border-[#E8E8E6] pb-2">
              <div className="flex items-center gap-2">
                <button
                  className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-[#111110] text-[11px] leading-none text-white"
                  aria-label="Open menu"
                >
                  ☰
                </button>
                <span className="text-[10px] font-medium text-[#111110]">Gallery OS</span>
              </div>
              <span className="rounded-full bg-[#1FA854] px-1.5 py-[1px] text-[7.5px] font-medium text-white">
                2
              </span>
            </div>
          )}
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3
                className={`font-display font-medium leading-tight text-[#111110] ${
                  compact ? "text-[13px]" : "text-[15px]"
                }`}
              >
                Œuvres
              </h3>
              <p className={`mt-0.5 text-[#6B6A67] ${compact ? "text-[8px]" : "text-[9px]"}`}>
                12 au total · 12 disponibles · 0 vendue
              </p>
            </div>
            <button
              className={`rounded-[5px] bg-[#111110] text-white ${
                compact ? "px-2 py-[4px] text-[8px]" : "px-2.5 py-[5px] text-[9px]"
              }`}
            >
              + Ajouter
            </button>
          </div>

          {/* Search */}
          <div
            className={`flex items-center gap-2 rounded-[5px] border-[0.5px] border-[#E8E8E6] bg-[#FAFAF8] px-2 py-1.5 ${
              compact ? "mt-2" : "mt-3"
            }`}
          >
            <span className="text-[9px] text-[#ADADAA]">⌕</span>
            <span className="flex-1 text-[8.5px] text-[#ADADAA]">
              {compact ? "Rechercher…" : "Rechercher titre, artiste, année, médium…"}
            </span>
            <span
              className={`rounded border-[0.5px] border-[#E8E8E6] px-1 py-[1px] text-[7px] text-[#6B6A67] ${
                compact ? "hidden" : ""
              }`}
            >
              ⌘K
            </span>
          </div>

          {/* Filter pills */}
          <div className={`mt-2.5 flex flex-wrap items-center gap-1 ${compact ? "hidden" : ""}`}>
            {["Disponibles", "Réservées", "Vendues", "Consignées", "En prêt"].map((p) => (
              <span
                key={p}
                className="rounded-full border-[0.5px] border-[#E8E8E6] px-2 py-[2px] text-[7.5px] text-[#6B6A67]"
              >
                {p}
              </span>
            ))}
            <span className="ml-1 h-3 w-px bg-[#E8E8E6]" />
            <span className="rounded-full bg-[#111110] px-2 py-[2px] text-[7.5px] text-white">
              {SAMPLE_ARTIST.fullName}
            </span>
          </div>

          {/* Table header */}
          <div
            className={`mt-3 grid items-center gap-2 border-b-[0.5px] border-[#E8E8E6] pb-1.5 text-[7.5px] uppercase tracking-[0.06em] text-[#ADADAA] ${
              compact ? "grid-cols-[1fr_58px]" : "grid-cols-[1fr_120px_60px_90px_80px]"
            }`}
          >
            <span>Titre</span>
            {!compact && <span>Artiste</span>}
            {!compact && <span>Année</span>}
            {!compact && <span className="text-right">Prix</span>}
            <span>Statut</span>
          </div>

          {/* Rows */}
          <div className="flex flex-col">
            {ARTWORK_ROWS.map((row) => (
              <div
                key={row.title}
                className={`grid items-center gap-2 border-b-[0.5px] border-[#F1F1ED] py-2 text-[9px] text-[#111110] ${
                  compact ? "grid-cols-[1fr_58px]" : "grid-cols-[1fr_120px_60px_90px_80px]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`flex-shrink-0 overflow-hidden rounded-[2px] bg-white ${
                      compact ? "h-8 w-8" : "h-6 w-7"
                    }`}
                    style={{ border: "0.5px solid #E8E8E6" }}
                  >
                    <div className="h-[68%] w-full" style={{ background: row.color }} />
                    <div className="h-[32%] w-full bg-[#E8E8E6]" />
                  </div>
                  <span className="truncate font-medium">{row.title}</span>
                </div>
                {!compact && <span className="text-[#6B6A67]">{SAMPLE_ARTIST.fullName}</span>}
                {!compact && <span className="text-[#6B6A67]">{row.year}</span>}
                {!compact && <span className="text-right tabular-nums">{row.price}</span>}
                <span>
                  <span className="rounded-full border-[0.5px] border-[#1FA854]/40 bg-[#1FA854]/[0.06] px-1.5 py-[1px] text-[7.5px] text-[#1FA854]">
                    {compact ? "Live" : "Available"}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Floating: Gmail compose + Vitreen inserter popover ─────────── */
/* Faithful to the user-supplied reference: full New Message composer
 * with the artwork inserted in the body, and the Vitreen popover
 * floating over the bottom-right of the email body. */

export function GmailMock() {
  return (
    <div className="relative">
      {/* Gmail composer window */}
      <div className="overflow-hidden rounded-[8px] border border-[#E8E8E6] bg-white shadow-[0_24px_60px_rgba(0,0,0,0.12)]">
        {/* Title bar */}
        <div className="flex items-center justify-between bg-[#F0F4F9] px-3 py-2">
          <span className="text-[11px] font-semibold text-[#202124]">New Message</span>
          <div className="flex items-center gap-2 text-[10px] text-[#5F6368]">
            <span>_</span>
            <span>⤢</span>
            <span>✕</span>
          </div>
        </div>

        {/* Recipients */}
        <div className="border-b border-[#E8E8E6] px-3 py-2 text-[10px] text-[#6B6A67]">
          Recipients
        </div>
        {/* Subject */}
        <div className="border-b border-[#E8E8E6] px-3 py-2 text-[10px] text-[#6B6A67]">
          Subject
        </div>

        {/* Body */}
        <div className="px-3 pt-3 pb-2">
          {/* Inserted artwork — gallery wall photo */}
          <div
            className="relative overflow-hidden rounded-[2px] bg-[#F5F0E8]"
            style={{ aspectRatio: "16 / 11" }}
          >
            {/* Wall */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(180deg, #F5F0E8 0%, #EDE6DA 70%, #DCD3C2 100%)",
              }}
            />
            {/* Painting */}
            <div
              className="absolute"
              style={{
                top: "20%",
                left: "32%",
                width: "36%",
                height: "52%",
                background: "linear-gradient(135deg, #2540B8 0%, #1A3088 60%, #15276F 100%)",
                boxShadow: "0 1px 2px rgba(0,0,0,0.12), 0 0.5px 1px rgba(0,0,0,0.08)",
              }}
            />
            {/* Floor */}
            <div
              className="absolute inset-x-0 bottom-0"
              style={{
                height: "22%",
                background: "linear-gradient(180deg, #B8B0A2 0%, #9C9486 100%)",
              }}
            />
            {/* Floor reflection of painting */}
            <div
              className="absolute"
              style={{
                bottom: "18%",
                left: "32%",
                width: "36%",
                height: "6%",
                background:
                  "linear-gradient(180deg, rgba(37,64,184,0.32) 0%, rgba(37,64,184,0) 100%)",
                filter: "blur(0.3px)",
              }}
            />
            {/* Ceiling track lights */}
            <div
              className="absolute inset-x-[10%] top-0 h-[6%]"
              style={{
                background: "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 100%)",
              }}
            />
          </div>
          {/* Artwork metadata */}
          <div className="mt-2 flex flex-col gap-[1px] leading-tight">
            <span className="text-[10px] font-semibold text-[#202124]">Sun Dog</span>
            <span className="text-[9.5px] italic text-[#202124]">Evening field, 2023</span>
            <span className="text-[9px] text-[#6B6A67]">Acrylic on canvas</span>
            <span className="text-[9px] text-[#6B6A67]">120 × 120 cm</span>
            <span className="mt-0.5 text-[9px] text-[#202124]">8 000 €</span>
          </div>
        </div>

        {/* Bottom action bar */}
        <div className="flex items-center gap-2 border-t border-[#E8E8E6] px-3 py-2">
          <div className="flex items-center overflow-hidden rounded-[18px]">
            <button className="bg-[#0B57D0] px-3 py-1 text-[10px] font-medium text-white">
              Send
            </button>
            <button className="bg-[#0B57D0] px-1.5 py-1 text-[10px] text-white">▾</button>
          </div>
          <span className="text-[10px] text-[#5F6368]">𝐀</span>
          <span className="text-[10px] text-[#5F6368]">📎</span>
          <span className="text-[10px] text-[#5F6368]">🔗</span>
          <span className="text-[10px] text-[#5F6368]">🙂</span>
          <span className="ml-auto text-[10px] text-[#5F6368]">🗑</span>
        </div>
      </div>

      {/* Vitreen popover — overlaps bottom-right of the composer */}
      <div
        className="absolute rounded-[10px] border border-[#E8E8E6] bg-white shadow-[0_18px_42px_rgba(0,0,0,0.12)]"
        style={{ right: "-10%", bottom: "16%", width: "84%" }}
      >
        <div className="px-3 pt-2.5 pb-3">
          <div className="flex items-center justify-between">
            <span className="text-[9px] uppercase tracking-[0.22em] text-[#ADADAA]">Vitreen</span>
            <span className="text-[10px] text-[#ADADAA]">✕</span>
          </div>
          <div className="mt-2 border-b border-[#E8E8E6] pb-1.5 text-[10px] text-[#111110]">
            eve
          </div>
          <div className="mt-2 flex items-center gap-1">
            <span className="rounded-full bg-[#111110] px-2 py-[2px] text-[8px] font-medium text-white">
              Tout
            </span>
            <span className="rounded-full border border-[#E8E8E6] px-2 py-[2px] text-[8px] text-[#6B6A67]">
              Disponibles
            </span>
            <span className="rounded-full border border-[#E8E8E6] px-2 py-[2px] text-[8px] text-[#6B6A67]">
              Réservées
            </span>
            <span className="rounded-full border border-[#E8E8E6] px-2 py-[2px] text-[8px] text-[#6B6A67]">
              Vendues
            </span>
            <span className="rounded-full border border-[#E8E8E6] px-2 py-[2px] text-[8px] text-[#6B6A67]">
              NFS
            </span>
          </div>
          {/* Selected result */}
          <div
            className="mt-2 flex items-center gap-2 rounded-[6px] bg-[#EAF3FF] px-2 py-2"
            style={{ border: "1px solid #4F8EE6" }}
          >
            <span className="flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-[3px] bg-[#0B57D0] text-[8px] text-white">
              ✓
            </span>
            <div
              className="relative h-7 w-9 flex-shrink-0 overflow-hidden rounded-[3px] bg-[#F5F0E8]"
              style={{ border: "0.5px solid #E8E8E6" }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[#F5F0E8] via-[#EDE6DA] to-[#C8C0B2]" />
              <div
                className="absolute"
                style={{
                  top: "20%",
                  left: "30%",
                  width: "40%",
                  height: "50%",
                  background: "linear-gradient(135deg, #2540B8 0%, #1A3088 100%)",
                }}
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col leading-tight">
              <span className="text-[7.5px] uppercase tracking-[0.16em] text-[#6B6A67]">
                Sun Dog
              </span>
              <span className="truncate text-[9.5px] italic text-[#111110]">
                Evening field, 2023
              </span>
              <span className="text-[8.5px] text-[#6B6A67]">8 000 €</span>
            </div>
            <span className="rounded-full border border-[#1FA854]/40 bg-[#1FA854]/[0.08] px-1.5 py-[1px] text-[7.5px] uppercase tracking-[0.1em] text-[#1FA854]">
              Available
            </span>
          </div>
          {/* Footer */}
          <div className="mt-2.5 flex items-center justify-between">
            <span className="text-[8.5px] text-[#6B6A67]">1 œuvre sélectionnée</span>
            <div className="flex items-center gap-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#E8E8E6] text-[8px] text-[#6B6A67]">
                ↺
              </span>
              <button className="rounded-full bg-[#111110] px-3 py-1.5 text-[9px] font-medium text-white">
                Insérer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Floating: WhatsApp bot conversation ───────────────────────── */

function WhatsappBotMock() {
  return (
    <div className="overflow-hidden rounded-[14px] bg-[#1F1F1B] shadow-[0_24px_60px_rgba(0,0,0,0.32)]">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-white/5 bg-[#1F1F1B] px-3 py-2.5">
        <span className="text-[10px] text-white/80">‹</span>
        <span className="text-[9px] text-white/60">3</span>
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2D8F8C]">
          <span className="text-[10px] text-white">◔</span>
        </div>
        <span className="text-[11px] font-semibold text-white">Test</span>
      </div>

      {/* Messages */}
      <div className="flex flex-col gap-2 px-2.5 py-3">
        {/* Image bubble */}
        <div
          className="self-end overflow-hidden rounded-[6px] bg-[#005C4B]"
          style={{ maxWidth: "78%" }}
        >
          <div className="relative h-[72px] w-full bg-gradient-to-br from-[#F0EEE9] via-[#E8E5DD] to-[#D5D0C5]">
            {/* Wall + painting */}
            <div
              className="absolute"
              style={{
                top: "18%",
                left: "32%",
                width: "36%",
                height: "44%",
                background: "linear-gradient(135deg, #2540B8 0%, #1A3088 100%)",
                boxShadow: "0 0.5px 1px rgba(0,0,0,0.15)",
              }}
            />
            <div className="absolute inset-x-0 bottom-0 h-[22%] bg-gradient-to-b from-[#C8C0B2] to-[#A89E8C]" />
          </div>
          <div className="px-2 py-1.5 text-[8px] text-white">
            <p>Sun Dog — Evening field, 2023</p>
            <p className="mt-0.5 text-right text-[7px] text-white/55">15:53 ✓✓</p>
          </div>
        </div>

        {/* Bot reply */}
        <div
          className="self-start rounded-[6px] bg-[#262624] px-2 py-1.5 text-[8.5px] text-white/90"
          style={{ maxWidth: "82%" }}
        >
          📩 Reçu. “sans titres” ajoutée à votre Sélection.
          <p className="mt-0.5 text-right text-[7px] text-white/45">15:53</p>
        </div>

        {/* User command */}
        <div className="self-end rounded-[6px] bg-[#005C4B] px-2 py-1.5 text-[8.5px] text-white">
          /pdf
          <p className="mt-0.5 text-right text-[7px] text-white/55">15:54 ✓✓</p>
        </div>

        {/* PDF result */}
        <div
          className="self-start rounded-[6px] bg-[#262624] px-2 py-1.5 text-[8.5px] text-white/90"
          style={{ maxWidth: "82%" }}
        >
          <div>Constitution de votre Sélection…</div>
          <div
            className="mt-1.5 flex items-center gap-1.5 rounded-[4px] bg-white/[0.04] px-1.5 py-1.5"
            style={{ border: "0.5px solid rgba(255,255,255,0.08)" }}
          >
            <div className="flex h-7 w-[16px] flex-shrink-0 items-end justify-center overflow-hidden rounded-[1.5px] bg-[#EA4335]">
              <span className="mb-[1px] text-[4px] font-bold leading-none text-white">PDF</span>
            </div>
            <div className="flex min-w-0 flex-1 flex-col leading-tight">
              <span className="truncate text-[7.5px] text-white">selection-2p.pdf</span>
              <span className="text-[6.5px] text-white/55">44 Ko · pdf</span>
            </div>
          </div>
          <p className="mt-1 text-[8px] text-white/70">Sélection prête · 2 pages</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Comet-style floating action pill ─────────────────────────── */

function ActionPill({
  label,
  icon,
  style,
}: {
  label: string;
  icon: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className="absolute flex items-center gap-3 rounded-full bg-white py-2.5 pl-2.5 pr-6 shadow-[0_18px_40px_rgba(0,0,0,0.08),0_4px_10px_rgba(0,0,0,0.04)]"
      style={style}
    >
      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#F5F5F3]">
        {icon}
      </div>
      <span className="text-[15px] font-medium tracking-tight text-[#111110]">{label}</span>
    </div>
  );
}

/* ─── Section ───────────────────────────────────────────────────── */

export default function ConnectedTools() {
  return (
    <section className="bg-white px-4 pt-12 pb-12 md:px-6 md:pt-[80px] md:pb-[80px]">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div {...fadeUp(0)} className="mb-10 md:mb-14">
          <p className="mb-3 text-[11px] uppercase tracking-[0.12em] text-[#ADADAA]">
            Connected tools
          </p>
          <h2 className="font-display text-[20px] leading-[1.2] tracking-[-0.02em] text-[#111110] md:text-[26px]">
            Your gallery, wherever you already work.
          </h2>
          <p className="mt-1 font-display text-[20px] leading-[1.2] tracking-[-0.02em] text-[#6B6A67] md:text-[26px]">
            Inside Gmail, inside WhatsApp, on your phone.
          </p>
        </motion.div>

        {/* Composition */}
        <motion.div
          {...fadeUp(0.1)}
          className="relative overflow-hidden rounded-2xl bg-white"
          style={{ aspectRatio: "16 / 13" }}
        >
          {/* Central: Gallery OS — dominant background */}
          <div className="absolute" style={{ top: "5%", left: "3%", width: "80%" }}>
            <GalleryOsDashboard />
          </div>

          {/* Right: Gmail composer + Vitreen popover */}
          <div className="absolute" style={{ top: "8%", right: "14%", width: "22%" }}>
            <GmailMock />
          </div>

          {/* Floating action pills — Comet style */}
          <ActionPill
            label="Insert in Gmail"
            icon={
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#111110"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
            }
            style={{ bottom: "32%", left: "20%" }}
          />
          <ActionPill
            label="Generate PDF"
            icon={
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#111110"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <path d="M8 14h8M8 18h5" />
              </svg>
            }
            style={{ bottom: "18%", left: "22%" }}
          />
          <ActionPill
            label="Private link"
            icon={
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#111110"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 13a5 5 0 0 0 7.07 0l3.54-3.54a5 5 0 0 0-7.07-7.07l-1.41 1.41" />
                <path d="M14 11a5 5 0 0 0-7.07 0l-3.54 3.54a5 5 0 0 0 7.07 7.07l1.41-1.41" />
              </svg>
            }
            style={{ top: "62%", right: "30%" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
