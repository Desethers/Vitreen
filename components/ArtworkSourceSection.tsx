"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/lang";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease, delay },
});

const SLIDE_DURATION = 5000;

/* ─── Mockup 1 : Gallery OS Dashboard ─── */
function DashboardMock() {
  const navItems = [
    { label: "Overview", active: true },
    { label: "Artworks", active: false },
    { label: "Artists", active: false },
    { label: "Exhibitions", active: false },
    { label: "Inquiries", active: false },
    { label: "Sales drafts", active: false, badge: 2 },
    { label: "Private Selection", active: false },
    { label: "Collectors", active: false },
    { label: "Tools", active: false },
  ];

  const artworkColors = [
    "#1A3BBF", "#1A3BBF", "#1A3BBF",
    "#1A2A4A", "#B8D0EC", "#F0C830",
  ];

  return (
    <div className="flex h-full w-full overflow-hidden rounded-xl border border-[#E8E8E6] bg-white shadow-[0_24px_60px_rgba(0,0,0,0.08)]">
      {/* Sidebar */}
      <div className="flex w-40 shrink-0 flex-col border-r border-[#F0F0EE] bg-[#FAFAF8] px-2.5 py-4">
        {/* Logo */}
        <div className="mb-5 flex items-center gap-2 px-1">
          <div className="flex h-5 w-5 items-center justify-center rounded-[4px] bg-[#111110]">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <rect x="1.5" y="1.5" width="3" height="3" rx="0.5" fill="white" opacity="0.9" />
              <rect x="5.5" y="1.5" width="3" height="3" rx="0.5" fill="white" opacity="0.5" />
              <rect x="1.5" y="5.5" width="3" height="3" rx="0.5" fill="white" opacity="0.5" />
              <rect x="5.5" y="5.5" width="3" height="3" rx="0.5" fill="white" opacity="0.3" />
            </svg>
          </div>
          <span className="font-display text-[12px] font-medium tracking-tight text-[#111110]">Gallery OS</span>
        </div>
        {/* Nav */}
        <div className="flex flex-col gap-[1px]">
          {navItems.map((item) => (
            <div
              key={item.label}
              className={`flex items-center justify-between rounded-[5px] px-2 py-[5px] ${
                item.active ? "bg-[#111110]" : "hover:bg-[#F0F0EE]"
              }`}
            >
              <span
                className={`text-[10.5px] leading-none ${
                  item.active ? "text-white" : "text-[#6B6A67]"
                }`}
              >
                {item.label}
              </span>
              {item.badge && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#22C55E] text-[8px] font-bold text-white">
                  {item.badge}
                </span>
              )}
            </div>
          ))}
        </div>
        {/* Footer */}
        <div className="mt-auto pt-4 text-[9px] text-[#ADADAA]">
          Powered by Vitreen
        </div>
      </div>

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden px-5 py-4">
        <div className="mb-4">
          <h2 className="font-display text-[15px] font-semibold text-[#111110]">Overview</h2>
          <p className="text-[11px] text-[#6B6A67]">Aperçu de votre galerie</p>
        </div>

        {/* Stats */}
        <div className="mb-4 grid grid-cols-4 gap-2">
          {[
            { label: "ŒUVRES", value: "6", sub: "6 disponibles" },
            { label: "VENDUES", value: "0", sub: "depuis le début" },
            { label: "INQUIRIES", value: "2", sub: "2 nouvelles" },
            { label: "COLLECTIONNEURS", value: "1", sub: "" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-[6px] border border-[#E8E8E6] px-2.5 py-2">
              <p className="text-[8px] uppercase tracking-wider text-[#ADADAA]">{stat.label}</p>
              <p className="mt-1 font-display text-[20px] font-light leading-none text-[#111110]">
                {stat.value}
              </p>
              {stat.sub && (
                <p className="mt-1 text-[9px] text-[#ADADAA]">{stat.sub}</p>
              )}
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="grid flex-1 grid-cols-2 gap-3 min-h-0">
          {/* Inquiries */}
          <div className="flex flex-col overflow-hidden rounded-[6px] border border-[#E8E8E6] px-3 py-2.5">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[11px] font-medium text-[#111110]">Dernières inquiries</p>
              <span className="text-[9px] text-[#6B6A67]">Voir tout</span>
            </div>
            {[
              { name: "Rr", work: "Evening field", date: "20 mai" },
              { name: "Test Collector", work: "Evening field", date: "17 mai" },
            ].map((inq) => (
              <div key={inq.name} className="flex items-center gap-2 py-1.5 border-t border-[#F0F0EE] first:border-t-0">
                <div className="h-6 w-6 shrink-0 rounded bg-[#E8E8E6]" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[10px] font-medium text-[#111110]">{inq.name}</p>
                  <p className="truncate text-[9px] text-[#6B6A67]">{inq.work}</p>
                </div>
                <span className="shrink-0 rounded-full bg-[#EFF6FF] px-1.5 py-0.5 text-[8px] font-medium text-[#2563EB]">
                  New
                </span>
              </div>
            ))}
          </div>

          {/* Artwork grid */}
          <div className="flex flex-col overflow-hidden rounded-[6px] border border-[#E8E8E6] px-3 py-2.5">
            <p className="mb-2 text-[11px] font-medium text-[#111110]">Œuvres récentes</p>
            <div className="grid grid-cols-3 gap-1.5">
              {artworkColors.map((color, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-[3px]"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Mockup 2 : Share / Email + Viewing Room ─── */
function ShareMock() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl">
      {/* Background photo (grayscale) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/gallery hero mock/shoes-exhibition.png')",
          filter: "grayscale(100%) brightness(0.55)",
        }}
      />
      <div className="absolute inset-0 bg-black/20" />

      {/* Step cards */}
      {/* Card 3 — Share (top left) */}
      <div className="absolute left-5 top-5 flex items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#111110] text-[11px] font-medium text-white">
          3
        </div>
        <div>
          <p className="text-[12px] font-medium leading-tight text-[#111110]">Share</p>
          <p className="text-[10px] leading-tight text-[#6B6A67]">Link, private Viewing Room, collector…</p>
        </div>
      </div>

      {/* Card 1 — Add artwork (top right) */}
      <div className="absolute right-5 top-5 flex items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#111110] text-[11px] font-medium text-white">
          1
        </div>
        <div>
          <p className="text-[12px] font-medium leading-tight text-[#111110]">Add an artwork</p>
          <p className="text-[10px] leading-tight text-[#6B6A67]">Simple form, published in one click.</p>
        </div>
      </div>

      {/* Card 2 — Site updated (bottom left) */}
      <div className="absolute bottom-5 left-5 flex items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#111110] text-[11px] font-medium text-white">
          2
        </div>
        <div>
          <p className="text-[12px] font-medium leading-tight text-[#111110]">Site updated</p>
          <p className="text-[10px] leading-tight text-[#6B6A67]">The artwork appears instantly.</p>
        </div>
      </div>

      {/* Email composer (center) */}
      <div className="absolute inset-x-20 top-20 bottom-20 flex flex-col overflow-hidden rounded-xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
        {/* Header */}
        <div className="border-b border-[#E8E8E6] px-4 py-3">
          <p className="text-[13px] font-medium text-[#111110]">New message</p>
        </div>

        {/* Fields */}
        <div className="space-y-0 border-b border-[#E8E8E6]">
          {[
            ["From", "galerie@fontaine.com"],
            ["To", "marc.durand@collection.fr"],
            ["Subject", "Sélection Printemps 2026 — Viewing Room"],
          ].map(([label, val]) => (
            <div
              key={label}
              className="flex items-center gap-3 border-b border-[#F5F5F3] px-4 py-2 last:border-b-0"
            >
              <span className="w-12 shrink-0 text-[11px] text-[#6B6A67]">{label}</span>
              <span className="truncate text-[11px] text-[#111110]">{val}</span>
            </div>
          ))}
        </div>

        {/* Artwork thumbnails placeholder */}
        <div className="grid grid-cols-4 gap-1.5 px-4 pt-3">
          {["#1A2A4A", "#B8D0EC", "#F0C830", "#7A1F18"].map((c, i) => (
            <div key={i} className="aspect-video rounded-[3px]" style={{ backgroundColor: c }} />
          ))}
        </div>

        {/* Viewing Room card */}
        <div className="mx-4 mt-3 flex items-center justify-between rounded-lg bg-[#F5F5F3] px-3 py-2.5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded border border-[#E8E8E6] bg-white">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <rect x="1.5" y="1.5" width="7" height="7" rx="1" stroke="#111110" strokeWidth="0.8" />
                <path d="M3 5h4M5 3v4" stroke="#111110" strokeWidth="0.8" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] font-medium text-[#111110]">Private Viewing · Spring 2026</p>
              <p className="text-[9px] text-[#6B6A67]">4 works — galerie-fontaine.com</p>
            </div>
          </div>
          <div className="rounded-full bg-[#111110] px-2.5 py-1 text-[10px] font-medium text-white">
            View
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-1.5 rounded-full bg-[#111110] px-3.5 py-1.5">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 5l2.5 2.5L8 2.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[11px] font-medium text-white">Sent</span>
          </div>
          <span className="text-[11px] text-[#6B6A67]">1 of 3 collectors</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Slides config ─── */
const SLIDES = [
  { label: "Dashboard", Mock: DashboardMock },
  { label: "Share", Mock: ShareMock },
];

export default function ArtworkSourceSection() {
  const { t } = useLang();
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((i: number) => {
    setCurrent(i);
    setProgress(0);
  }, []);

  useEffect(() => {
    if (paused) return;
    setProgress(0);
    const start = Date.now();
    const raf = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / SLIDE_DURATION, 1);
      setProgress(p);
      if (p < 1) {
        handle = requestAnimationFrame(raf);
      } else {
        setCurrent((c) => (c + 1) % SLIDES.length);
        setProgress(0);
      }
    };
    let handle = requestAnimationFrame(raf);
    return () => cancelAnimationFrame(handle);
  }, [current, paused]);

  const { Mock } = SLIDES[current];

  return (
    <section id="inventory-source" className="bg-white px-4 pb-12 pt-0 md:px-6 md:pb-[60px]">
      <div className="mx-auto max-w-7xl">
        <motion.div
          {...fadeUp(0)}
          className="grid gap-8 md:grid-cols-[0.78fr_1.22fr] md:items-start md:gap-14"
        >
          {/* Left — text */}
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.12em] text-[#ADADAA]">
              {t.artworkSource.kicker}
            </p>
            <h2 className="font-display text-[20px] font-normal leading-[1.2] tracking-[-0.02em] text-[#111110] md:text-[26px]">
              {t.artworkSource.title}
            </h2>
            <p className="mt-4 max-w-xl text-[14px] leading-[1.6] tracking-[-0.01em] text-[#6B6A67] md:text-[15px]">
              {t.artworkSource.body}
            </p>
          </div>

          {/* Right — stepper */}
          <div
            className="md:self-start md:justify-self-end"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Mockup */}
            <div className="relative h-[380px] w-full overflow-hidden rounded-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  className="h-full w-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease }}
                >
                  <Mock />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress bar + labels */}
            <div className="mt-4 flex gap-2">
              {SLIDES.map((slide, i) => (
                <button
                  key={slide.label}
                  type="button"
                  onClick={() => goTo(i)}
                  className="flex flex-1 flex-col gap-1.5"
                  aria-label={slide.label}
                >
                  <div className="h-px w-full overflow-hidden bg-[#E8E8E6]">
                    <motion.div
                      className="h-full bg-[#111110]"
                      style={{
                        width: i === current ? `${progress * 100}%` : i < current ? "100%" : "0%",
                      }}
                    />
                  </div>
                  <span
                    className={`text-[11px] tracking-[-0.01em] transition-colors ${
                      i === current ? "text-[#111110]" : "text-[#ADADAA]"
                    }`}
                  >
                    {slide.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
