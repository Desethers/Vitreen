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
];

function GalleryOsDashboard() {
  return (
    <div className="overflow-hidden rounded-[10px] border border-[#E8E8E6] bg-white shadow-[0_24px_60px_rgba(0,0,0,0.15)]">
      <div className="flex">
        {/* Sidebar */}
        <div
          className="flex flex-col gap-1 border-r border-[#E8E8E6] bg-[#FAFAF8] px-3 py-4"
          style={{ width: "26%" }}
        >
          {/* Logo */}
          <div className="mb-3 flex items-center gap-2 px-1">
            <div className="flex h-5 w-5 items-center justify-center rounded-[4px] bg-[#111110]">
              <span className="text-[8px] leading-none text-white">▤</span>
            </div>
            <span className="text-[10px] font-semibold text-[#111110]">Gallery OS</span>
          </div>
          {SIDEBAR_ITEMS.map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-2 rounded-[4px] px-2 py-[5px] text-[9px] ${
                item.active ? "bg-white text-[#111110]" : "text-[#6B6A67]"
              }`}
              style={item.active ? { boxShadow: "0 0 0 0.5px #E8E8E6 inset" } : undefined}
            >
              <span className="text-[10px] leading-none text-[#ADADAA]">{item.icon}</span>
              <span className="flex-1 truncate">{item.label}</span>
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
        <div className="flex-1 px-5 py-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-display text-[15px] leading-tight text-[#111110]">Œuvres</h3>
              <p className="mt-0.5 text-[9px] text-[#6B6A67]">
                3 au total · 3 disponibles · 0 vendue
              </p>
            </div>
            <button className="rounded-[5px] bg-[#111110] px-2.5 py-[5px] text-[9px] text-white">
              + Ajouter
            </button>
          </div>

          {/* Search */}
          <div className="mt-3 flex items-center gap-2 rounded-[5px] border border-[#E8E8E6] bg-[#FAFAF8] px-2 py-1.5">
            <span className="text-[9px] text-[#ADADAA]">⌕</span>
            <span className="flex-1 text-[8.5px] text-[#ADADAA]">
              Rechercher titre, artiste, année, médium…
            </span>
            <span className="rounded border border-[#E8E8E6] px-1 py-[1px] text-[7px] text-[#6B6A67]">
              ⌘K
            </span>
          </div>

          {/* Filter pills */}
          <div className="mt-2.5 flex flex-wrap items-center gap-1">
            {["Disponibles", "Réservées", "Vendues", "Consignées", "En prêt"].map((p) => (
              <span
                key={p}
                className="rounded-full border border-[#E8E8E6] px-2 py-[2px] text-[7.5px] text-[#6B6A67]"
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
          <div className="mt-3 grid grid-cols-[1fr_120px_60px_90px_80px] items-center gap-2 border-b border-[#E8E8E6] pb-1.5 text-[7.5px] uppercase tracking-[0.06em] text-[#ADADAA]">
            <span>Titre</span>
            <span>Artiste</span>
            <span>Année</span>
            <span className="text-right">Prix</span>
            <span>Statut</span>
          </div>

          {/* Rows */}
          <div className="flex flex-col">
            {ARTWORK_ROWS.map((row) => (
              <div
                key={row.title}
                className="grid grid-cols-[1fr_120px_60px_90px_80px] items-center gap-2 border-b border-[#F1F1ED] py-2 text-[9px] text-[#111110]"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="h-6 w-7 flex-shrink-0 overflow-hidden rounded-[2px] bg-white"
                    style={{ border: "0.5px solid #E8E8E6" }}
                  >
                    <div className="h-[68%] w-full" style={{ background: row.color }} />
                    <div className="h-[32%] w-full bg-[#E8E8E6]" />
                  </div>
                  <span className="truncate font-medium">{row.title}</span>
                </div>
                <span className="text-[#6B6A67]">{SAMPLE_ARTIST.fullName}</span>
                <span className="text-[#6B6A67]">{row.year}</span>
                <span className="text-right tabular-nums">{row.price}</span>
                <span>
                  <span className="rounded-full border border-[#1FA854]/40 bg-[#1FA854]/[0.06] px-1.5 py-[1px] text-[7.5px] text-[#1FA854]">
                    Available
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

/* ─── Floating: Gmail compose with Vitreen inserter ─────────────── */

function GmailMock() {
  return (
    <div className="overflow-hidden rounded-[8px] border border-[#E8E8E6] bg-white shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
      {/* Title bar */}
      <div className="flex items-center justify-between bg-[#F1F3F4] px-3 py-1.5">
        <span className="text-[10px] font-semibold text-[#202124]">New Message</span>
        <div className="flex items-center gap-1.5 text-[#5F6368]">
          <span className="text-[10px]">_</span>
          <span className="text-[10px]">⤢</span>
          <span className="text-[10px]">✕</span>
        </div>
      </div>

      {/* Fields */}
      <div className="border-b border-[#E8E8E6] px-3 py-1.5 text-[9px] text-[#5F6368]">
        To <span className="float-right">Cc Bcc</span>
      </div>
      <div className="border-b border-[#E8E8E6] px-3 py-1.5 text-[9px] text-[#5F6368]">Subject</div>

      {/* Body */}
      <div className="px-3 py-3 text-[9px] leading-[1.5] text-[#202124]">
        <p>—</p>
        <p className="mt-0.5">Raphaël Rossi</p>
        <p className="mt-0.5">+33 6 45 64 28 43</p>
        <p className="mt-0.5 text-[#1A73E8] underline">raphaelrossi.com</p>
      </div>

      {/* Vitreen inserter (floating sub-card) */}
      <div className="border-t border-[#E8E8E6] bg-white px-3 py-2.5">
        <div className="rounded-[5px] border border-[#E8E8E6] bg-white px-2.5 py-2 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-[7.5px] uppercase tracking-[0.14em] text-[#ADADAA]">Vitreen</span>
            <span className="text-[8px] text-[#ADADAA]">✕</span>
          </div>
          <div className="border-b border-[#E8E8E6] pb-1.5 text-[8.5px] text-[#111110]">eve</div>
          <div className="mt-1.5 flex items-center gap-1">
            <span className="rounded-full bg-[#111110] px-1.5 py-[1px] text-[7px] text-white">
              Tout
            </span>
            <span className="rounded-full border border-[#E8E8E6] px-1.5 py-[1px] text-[7px] text-[#6B6A67]">
              Disponibles
            </span>
            <span className="rounded-full border border-[#E8E8E6] px-1.5 py-[1px] text-[7px] text-[#6B6A67]">
              Vendues
            </span>
          </div>
          {/* Selected result */}
          <div
            className="mt-2 flex items-center gap-2 rounded-[4px] bg-[#E8F0FE] px-1.5 py-1.5"
            style={{ border: "0.5px solid #1A73E8" }}
          >
            <span className="flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-[2px] bg-[#1A73E8] text-[7px] text-white">
              ✓
            </span>
            <div
              className="h-7 w-9 flex-shrink-0 overflow-hidden rounded-[2px]"
              style={{ border: "0.5px solid #E8E8E6" }}
            >
              <div className="h-[68%] w-full bg-[#1B2A4A]" />
              <div className="h-[32%] w-full bg-[#E8E8E6]" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col leading-tight">
              <span className="text-[7px] uppercase tracking-[0.1em] text-[#6B6A67]">Sun Dog</span>
              <span className="truncate text-[8.5px] italic text-[#111110]">
                Evening Field, 2023
              </span>
              <span className="text-[8px] text-[#6B6A67]">8 000 €</span>
            </div>
            <span className="rounded-full border border-[#1FA854]/40 bg-[#1FA854]/[0.06] px-1.5 py-[1px] text-[7px] text-[#1FA854]">
              Available
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[7.5px] text-[#6B6A67]">1 œuvre sélectionnée</span>
            <button className="rounded-full bg-[#111110] px-2.5 py-1 text-[8px] font-medium text-white">
              Insérer
            </button>
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
            <p>Raphael Rossi — sans titres — 2025</p>
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
          className="relative overflow-hidden rounded-2xl"
          style={{
            aspectRatio: "16 / 10",
            background:
              "radial-gradient(120% 80% at 80% 30%, #5A2326 0%, #3A1A1C 45%, #1F0F11 100%)",
          }}
        >
          {/* Subtle grain overlay */}
          <div
            className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-30"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.16) 0.4px, transparent 0.5px)",
              backgroundSize: "3.5px 3.5px",
            }}
          />

          {/* Soft warm glow top-right */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(50% 40% at 88% 12%, rgba(244,168,96,0.18) 0%, rgba(244,168,96,0) 100%)",
            }}
          />

          {/* Central: Gallery OS */}
          <div
            className="absolute"
            style={{ top: "6%", left: "10%", width: "62%", transform: "rotate(-0.6deg)" }}
          >
            <GalleryOsDashboard />
          </div>

          {/* Right: Gmail composer */}
          <div
            className="absolute"
            style={{ top: "8%", right: "3%", width: "26%", transform: "rotate(2.5deg)" }}
          >
            <GmailMock />
          </div>

          {/* Bottom-left: WhatsApp */}
          <div
            className="absolute"
            style={{ bottom: "4%", left: "3%", width: "16%", transform: "rotate(-3deg)" }}
          >
            <WhatsappBotMock />
          </div>

          {/* Floating action pills (Comet-style) */}
          <div
            className="absolute flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-[0_6px_20px_rgba(0,0,0,0.18)]"
            style={{ bottom: "32%", left: "20%", transform: "rotate(-2deg)" }}
          >
            <span className="text-[10px] text-[#111110]">✉</span>
            <span className="text-[10px] font-medium text-[#111110]">Insert in Gmail</span>
          </div>
          <div
            className="absolute flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-[0_6px_20px_rgba(0,0,0,0.18)]"
            style={{ bottom: "18%", left: "22%", transform: "rotate(1deg)" }}
          >
            <span className="text-[10px] text-[#1FA854]">●</span>
            <span className="text-[10px] font-medium text-[#111110]">Generate PDF</span>
          </div>
          <div
            className="absolute flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-[0_6px_20px_rgba(0,0,0,0.18)]"
            style={{ top: "62%", right: "30%", transform: "rotate(2deg)" }}
          >
            <span className="text-[10px] text-[#111110]">🔗</span>
            <span className="text-[10px] font-medium text-[#111110]">Private link</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
