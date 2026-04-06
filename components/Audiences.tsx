"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;
const bgImage = "/allen14.jpg-preview3.jpg";

type GalleryPage = "home" | "exhibitions" | "artists";

const NAV_ITEMS = ["Exhibitions", "Artists", "Fairs", "News", "About"];

function SearchIcon({ stroke, size = 7 }: { stroke: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.5">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function GallerySocialFooterIcons() {
  const linkClass =
    "text-[#111110] hover:opacity-60 transition-opacity inline-flex items-center justify-center";
  const svgClass = "h-[14px] w-[14px] shrink-0";
  return (
    <div className="flex items-center gap-3.5">
      <a
        href="https://www.instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className={linkClass}
      >
        <svg className={svgClass} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      </a>
      <a
        href="https://x.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="X"
        className={linkClass}
      >
        <svg className={svgClass} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>
    </div>
  );
}

function GalleryNavbar({
  page,
  onNavigate,
  dark = false,
  isMobile = false,
}: {
  page: GalleryPage;
  onNavigate: (p: GalleryPage) => void;
  dark?: boolean;
  isMobile?: boolean;
}) {
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const textColor = dark ? "#fff" : "#000";
  const navColor = dark ? "rgba(255,255,255,0.8)" : "#333";
  const activeColor = dark ? "#fff" : "#000";
  const iconStroke = dark ? "rgba(255,255,255,0.6)" : "#555";
  const iconBorder = dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)";
  const burgerColor = dark ? "rgba(255,255,255,0.7)" : "#555";
  const inputBg = dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.04)";
  const inputBorder = dark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.15)";
  const inputColor = dark ? "#fff" : "#111";

  const openSearch = () => {
    setSearchOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };
  const closeSearch = () => setSearchOpen(false);

  const searchBtnSize = isMobile ? 16 : 18;
  const searchBarH = isMobile ? 16 : 18;
  const searchExpandW = isMobile ? 108 : 120;
  const iconSize = isMobile ? 6 : 7;

  const SearchBox = (
    <div
      className="flex items-center overflow-hidden transition-all duration-300"
      style={{
        width: searchOpen ? searchExpandW : searchBarH,
        height: searchBarH,
        borderRadius: searchBarH / 2,
        border: `1px solid ${searchOpen ? inputBorder : iconBorder}`,
        background: searchOpen ? inputBg : "transparent",
      }}
    >
      <button
        className="shrink-0 flex items-center justify-center cursor-pointer"
        style={{ width: searchBtnSize, height: searchBtnSize, background: "none", border: "none", padding: 0 }}
        onClick={searchOpen ? closeSearch : openSearch}
      >
        <SearchIcon stroke={iconStroke} size={iconSize} />
      </button>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search…"
        onBlur={closeSearch}
        className="bg-transparent outline-none border-none flex-1 min-w-0 pr-1.5"
        style={{
          fontSize: isMobile ? "0.42rem" : "0.46rem",
          color: inputColor,
          opacity: searchOpen ? 1 : 0,
          pointerEvents: searchOpen ? "auto" : "none",
        }}
      />
    </div>
  );

  if (isMobile) {
    const burgerSize = 16;
    const burgerIcon = 6;
    return (
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 pt-3 pb-2.5">
        <span
          className="font-medium uppercase cursor-pointer"
          style={{ fontSize: "0.5rem", letterSpacing: "0.12em", color: textColor }}
          onClick={() => onNavigate("home")}
        >
          Galerie
        </span>
        <div className="flex items-center gap-2">
          {SearchBox}
          {/* Burger */}
          <div
            className="rounded-full flex items-center justify-center shrink-0 cursor-pointer"
            style={{ width: burgerSize, height: burgerSize, border: `1px solid ${iconBorder}` }}
          >
            <svg width={burgerIcon} height={burgerIcon} viewBox="0 0 20 20" fill="none" stroke={burgerColor} strokeWidth="2.2" strokeLinecap="round">
              <line x1="3" y1="6" x2="17" y2="6" />
              <line x1="3" y1="10" x2="17" y2="10" />
              <line x1="3" y1="14" x2="17" y2="14" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-10 pt-5 pb-4">
      <span
        className="font-medium uppercase cursor-pointer"
        style={{ fontSize: "0.52rem", letterSpacing: "0.12em", color: textColor }}
        onClick={() => onNavigate("home")}
      >
        Galerie
      </span>
      <div className="flex items-center gap-5">
        <div className="flex gap-5" style={{ fontSize: "0.54rem", color: navColor }}>
          {NAV_ITEMS.map((n) => {
            const isActive =
              (n === "Exhibitions" && page === "exhibitions") ||
              (n === "Artists" && page === "artists");
            return (
              <span
                key={n}
                className="cursor-pointer transition-all"
                style={{
                  color: isActive ? activeColor : navColor,
                  fontWeight: isActive ? 500 : 400,
                  borderBottom: isActive ? `1px solid ${activeColor}` : "none",
                  paddingBottom: isActive ? "1px" : "0",
                }}
                onClick={() => {
                  if (n === "Exhibitions") onNavigate("exhibitions");
                  else if (n === "Artists") onNavigate("artists");
                }}
              >
                {n}
              </span>
            );
          })}
        </div>
        {SearchBox}
      </div>
    </div>
  );
}

function HomeView({ onNavigate, isMobile = false }: { onNavigate: (p: GalleryPage) => void; isMobile?: boolean }) {
  const pastExhibitions = [
    { img: "/gallery hero mock/artwork-02.png", title: "Clémence Rivière", subtitle: "Other Rooms, Works from 1959–2017", dates: "Jan 10 — Mar 14, 2026" },
    { img: "/gallery hero mock/judd-wall-stack.png", title: "Jonas Mehler", subtitle: "Vetiver (Shanghai)", dates: "Jan 15 — Mar 7, 2026" },
    { img: "/gallery hero mock/sofia castellanos.png", title: "Sofia Castellanos", subtitle: "The Pulse of Ink, Paper, and Fire", dates: "Jan 21 — Mar 7, 2026" },
  ];

  const newsItems = [
    { img: "/gallery hero mock/shoes-exhibition.png", venue: "Museum Voorlinden, Wassenaar, Netherlands", title: "Amélie Corbin", subtitle: "Weaving Waters, Weaving Gestures", dates: "Jan 31 — May 25, 2026" },
    { img: "/gallery hero mock/judd-floor-boxes.png", venue: "Mambo – Museo d'Arte Moderna di Bologna, Italy", title: "Jonas Mehler", subtitle: "The Performative Word", dates: "Feb 5 — May 3, 2026" },
    { img: "/gallery hero mock/frieze-newyork-booth.png", venue: "New York", title: "Frieze New York", subtitle: "", dates: "Feb 27 — Mar 1, 2026" },
  ];

  if (isMobile) {
    return (
      <div className="w-full h-full font-sans overflow-y-auto overflow-x-hidden bg-white" style={{ scrollbarWidth: "none" }}>
        <GalleryNavbar page="home" onNavigate={onNavigate} isMobile dark={false} />

        {/* Hero image — ratio naturel (px mobile pour respirer sur les bords) */}
        <div className="overflow-hidden px-[10px] rounded-[10px]" style={{ marginTop: "2.2rem" }}>
          <Image src="/exhibition page/Exhibition1.png" alt="" width={900} height={560} className="w-full h-auto" sizes="500px" priority />
        </div>

        {/* Exhibition intro */}
        <div className="px-5 pt-4 pb-5 border-b border-[#F0EFED]">
          <p className="uppercase tracking-[0.18em] text-[#ADADAA] mb-1" style={{ fontSize: "0.38rem" }}>
            Paris · Feb 12 — Mar 22, 2026
          </p>
          <h1 className="font-normal text-[#111110] leading-[1.05]" style={{ fontSize: "1rem" }}>Sun Dog</h1>
          <p className="italic text-[#555] leading-[1.2] mt-0.5" style={{ fontSize: "0.72rem" }}>Your friends</p>
          <button
            className="mt-2 bg-[#111110] rounded-full px-4 py-1 text-white"
            style={{ fontSize: "0.45rem" }}
            onClick={() => onNavigate("exhibitions")}
          >
            Learn more
          </button>
        </div>

        {/* Past Exhibitions — 1 col */}
        <div className="px-5 pt-5 pb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="uppercase tracking-[0.18em] text-[#111110]" style={{ fontSize: "0.5rem" }}>Past Exhibitions</span>
            <span className="text-[#ADADAA] cursor-pointer" style={{ fontSize: "0.5rem" }}>view all</span>
          </div>
          <div className="flex flex-col gap-4">
            {pastExhibitions.map((ex, i) => (
              <div key={i} className="flex gap-3 cursor-pointer group">
                <div className="relative overflow-hidden rounded-sm shrink-0" style={{ width: 88, aspectRatio: "4/3" }}>
                  <Image src={ex.img} alt="" fill className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" sizes="128px" />
                </div>
                <div className="flex-1 min-w-0">
                  <span
                    className="inline-block rounded-sm px-1 py-[1px] text-[#ADADAA] uppercase tracking-wider border border-solid border-[#ADADAA]"
                    style={{ fontSize: "0.33rem", borderWidth: "0.1px" }}
                  >
                    Paris
                  </span>
                  <p className="font-normal mt-1 leading-tight" style={{ fontSize: "0.62rem", color: "#111110" }}>{ex.title}</p>
                  <p className="italic leading-tight" style={{ fontSize: "0.52rem", color: "#555" }}>{ex.subtitle}</p>
                  <p className="uppercase tracking-[0.1em] mt-1" style={{ fontSize: "0.37rem", color: "#ADADAA" }}>{ex.dates}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* News — 1 col */}
        <div className="mx-4 mb-4 rounded-[10px] p-4" style={{ background: "#F8F7F5" }}>
          <div className="flex items-center justify-between mb-3">
            <span className="uppercase tracking-[0.18em] text-[#111110]" style={{ fontSize: "0.5rem" }}>News</span>
            <span className="text-[#ADADAA] cursor-pointer" style={{ fontSize: "0.5rem" }}>view all</span>
          </div>
          <div className="flex flex-col gap-4">
            {newsItems.map((item, i) => (
              <div key={i} className="flex gap-3 cursor-pointer group">
                <div className="relative overflow-hidden rounded-sm shrink-0" style={{ width: 88, aspectRatio: "4/3" }}>
                  <Image src={item.img} alt="" fill className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" sizes="128px" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="uppercase tracking-[0.08em] text-[#ADADAA] mb-0.5 leading-snug" style={{ fontSize: "0.33rem" }}>{item.venue}</p>
                  <p className="font-normal leading-tight" style={{ fontSize: "0.6rem", color: "#111110" }}>{item.title}</p>
                  {item.subtitle && <p className="italic leading-tight" style={{ fontSize: "0.5rem", color: "#555" }}>{item.subtitle}</p>}
                  <p className="text-[#ADADAA] mt-0.5" style={{ fontSize: "0.37rem" }}>{item.dates}</p>
                  <span className="text-[#111110] mt-1 inline-block" style={{ fontSize: "0.42rem" }}>Learn more →</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="mx-4 mb-4 rounded-[10px] px-5 py-6 flex flex-col gap-2" style={{ background: "#111110" }}>
          <p className="text-white font-medium" style={{ fontSize: "0.65rem" }}>Be the first to know</p>
          <p className="text-white/50 leading-snug" style={{ fontSize: "0.45rem" }}>
            Join our mailing list to never miss upcoming exhibitions, art fairs, news, events, films & more.
          </p>
          <button className="self-start mt-1 border border-white/30 rounded-full px-4 py-1.5 text-white" style={{ fontSize: "0.5rem" }}>
            Subscribe
          </button>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 flex items-center justify-between border-t" style={{ borderColor: "#F0EFED" }}>
          <span className="uppercase tracking-[0.15em] font-medium text-[#111110]" style={{ fontSize: "0.45rem" }}>Galerie</span>
          <span className="text-[#ADADAA]" style={{ fontSize: "0.38rem" }}>© 2026</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full font-sans overflow-y-auto overflow-x-hidden bg-white" style={{ scrollbarWidth: "none" }}>
      {/* Hero — légèrement moins haut que 200/123 (~−8px) */}
      <div className="relative w-full" style={{ aspectRatio: "400/243" }}>
        <Image src="/exhibition page/Exhibition1.png" alt="" fill className="object-cover" sizes="(max-width: 1400px) 100vw, 1400px" priority />
        <GalleryNavbar page="home" onNavigate={onNavigate} isMobile={false} />
        <div
          className="absolute bottom-0 left-0 right-0 px-10 pb-[29px] pt-20"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)" }}
        >
          <p className="uppercase tracking-[0.18em] text-white/70 mb-1" style={{ fontSize: "0.5rem" }}>Paris</p>
          <h1 className="font-normal text-white leading-[1.05]" style={{ fontSize: "1.9rem" }}>Sun Dog</h1>
          <p className="italic text-white/90 leading-[1.15] -mt-0.5" style={{ fontSize: "1.4rem" }}>Your friends</p>
          <p className="text-white/55 mt-1.5" style={{ fontSize: "0.58rem" }}>Feb 12 — Mar 22, 2026</p>
          <button
            className="mt-3 border border-white/40 rounded-full px-4 py-1 text-white"
            style={{ fontSize: "0.58rem" }}
            onClick={() => onNavigate("exhibitions")}
          >
            Learn more
          </button>
        </div>
      </div>

      {/* Past Exhibitions */}
      <div className="px-8 pt-7 pb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="uppercase tracking-[0.18em] text-[#111110]" style={{ fontSize: "0.5rem" }}>Past Exhibitions</span>
          <span className="text-[#ADADAA] cursor-pointer" style={{ fontSize: "0.5rem" }}>view all</span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {pastExhibitions.map((ex, i) => (
            <div key={i} className="flex flex-col gap-2 cursor-pointer group">
              <div className="relative overflow-hidden rounded-sm" style={{ aspectRatio: "4/3" }}>
                <Image src={ex.img} alt="" fill className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" sizes="200px" />
              </div>
              <div>
                <span
                  className="inline-block rounded-sm px-1 py-[1px] text-[#ADADAA] uppercase tracking-wider border border-solid border-[#ADADAA]"
                  style={{ fontSize: "0.35rem", borderWidth: "0.1px" }}
                >
                  Paris
                </span>
                <p className="font-normal mt-1 leading-tight" style={{ fontSize: "0.6rem", color: "#111110" }}>{ex.title}</p>
                <p className="italic leading-tight" style={{ fontSize: "0.52rem", color: "#333" }}>{ex.subtitle}</p>
                <p className="uppercase tracking-[0.1em] mt-1" style={{ fontSize: "0.37rem", color: "#ADADAA" }}>{ex.dates}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* News */}
      <div className="mx-6 mb-6 rounded-[10px] p-5" style={{ background: "#F8F7F5" }}>
        <div className="flex items-center justify-between mb-4">
          <span className="uppercase tracking-[0.18em] text-[#111110]" style={{ fontSize: "0.5rem" }}>News</span>
          <span className="text-[#ADADAA] cursor-pointer" style={{ fontSize: "0.5rem" }}>view all</span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {newsItems.map((item, i) => (
            <div key={i} className="flex flex-col gap-2 cursor-pointer group">
              <div className="relative overflow-hidden rounded-sm" style={{ aspectRatio: "4/3" }}>
                <Image src={item.img} alt="" fill className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" sizes="200px" />
              </div>
              <div>
                <p className="uppercase tracking-[0.08em] text-[#ADADAA] mb-0.5 leading-snug" style={{ fontSize: "0.35rem" }}>{item.venue}</p>
                <p className="font-normal leading-tight" style={{ fontSize: "0.58rem", color: "#111110" }}>{item.title}</p>
                {item.subtitle && (
                  <p className="italic leading-tight" style={{ fontSize: "0.48rem", color: "#555" }}>{item.subtitle}</p>
                )}
                <p className="text-[#ADADAA] mt-0.5" style={{ fontSize: "0.37rem" }}>{item.dates}</p>
                <span className="text-[#111110] mt-1 inline-block" style={{ fontSize: "0.42rem" }}>Learn more →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div
        className="mx-6 mb-6 rounded-[10px] px-6 py-8 grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 items-center"
        style={{ background: "#111110" }}
      >
        <div className="min-w-0">
          <p className="text-white font-medium mb-1" style={{ fontSize: "0.65rem" }}>Be the first to know</p>
          <p className="text-white/50 leading-snug" style={{ fontSize: "0.45rem", maxWidth: 420 }}>
            Join our mailing list to never miss upcoming exhibitions, art fairs, news, events, films & more.
          </p>
        </div>
        <button className="shrink-0 border border-white/30 rounded-full px-4 py-1.5 text-white" style={{ fontSize: "0.5rem" }}>
          Subscribe
        </button>
      </div>

      {/* Footer */}
      <div className="px-8 py-4 flex items-center justify-between border-t" style={{ borderColor: "#F0EFED" }}>
        <span className="uppercase tracking-[0.15em] font-medium text-[#111110]" style={{ fontSize: "0.48rem" }}>Galerie</span>
        <GallerySocialFooterIcons />
        <div className="flex items-center gap-2 text-[#ADADAA]" style={{ fontSize: "0.38rem" }}>
          {["The Gallery", "Jobs", "Terms", "Privacy", "Accessibility"].map((l) => (
            <span key={l} className="cursor-pointer">{l}</span>
          ))}
          <span>| © 2026</span>
        </div>
      </div>
    </div>
  );
}

function ExhibitionsView({ onNavigate, isMobile = false }: { onNavigate: (p: GalleryPage) => void; isMobile?: boolean }) {
  const [tab, setTab] = useState<"current" | "upcoming" | "past">("current");

  const exhibitions = {
    current: [
      { img: "/exhibition page/Exhibition1.png", title: "Sun Dog", subtitle: "Your friends", dates: "Feb 12 — Mar 22, 2026" },
      { img: "/exhibition page/Exhibition2.png", title: "Claire Tabouret", subtitle: "Night Garden", dates: "Jan 8 — Feb 5, 2026" },
    ],
    upcoming: [
      { img: "/exhibition page/painting-01.png", title: "Rashid Johnson", subtitle: "Anxious Men", dates: "Apr 3 — May 17, 2026" },
      { img: "/exhibition page/painting-02.png", title: "Nina Beier", subtitle: "Soft Power", dates: "May 28 — Jul 4, 2026" },
    ],
    past: [
      { img: "/exhibition page/Exhibition6.png", title: "Kehinde Wiley", subtitle: "New Republic", dates: "Oct 2 — Nov 30, 2025" },
      { img: "/exhibition page/Exhibition8.png", title: "Loie Hollowell", subtitle: "Point of Entry", dates: "Aug 14 — Sep 20, 2025" },
    ],
  };

  const shown = exhibitions[tab];

  const px = isMobile ? "px-4" : "px-10";

  return (
    <div className="w-full h-full relative font-sans bg-white overflow-hidden flex flex-col">
      <GalleryNavbar page="exhibitions" onNavigate={onNavigate} isMobile={isMobile} />

      <div className="flex-1 flex flex-col overflow-hidden pt-[3.2rem]">
        {/* Tabs */}
        <div className={`flex items-center gap-2 ${px} pt-4 pb-3`}>
          {(["current", "upcoming", "past"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="rounded-full transition-all"
              style={{
                fontSize: "0.55rem",
                padding: "3px 10px",
                background: tab === t ? "#111110" : "transparent",
                color: tab === t ? "#fff" : "#6B6A67",
                border: tab === t ? "none" : "1px solid #E8E8E6",
                fontWeight: tab === t ? 500 : 400,
                textTransform: "capitalize",
              }}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        <p className={`${px} uppercase tracking-[0.18em] text-[#ADADAA] mb-3`} style={{ fontSize: "0.45rem" }}>
          {tab} exhibitions
        </p>

        {/* Exhibition list */}
        <div className={`flex-1 overflow-hidden ${px} flex flex-col gap-4`}>
          {shown.map((ex, i) => (
            <div key={i} className="flex flex-col gap-1.5 cursor-pointer group">
              <div className="overflow-hidden rounded-sm relative" style={{ aspectRatio: "16/7" }}>
                <Image
                  src={ex.img}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="600px"
                />
              </div>
              <div>
                <p className="font-normal leading-tight" style={{ fontSize: isMobile ? "0.65rem" : "0.75rem", color: "#111110" }}>
                  {ex.title}
                </p>
                <p className="italic leading-tight" style={{ fontSize: "0.6rem", color: "#111110" }}>
                  {ex.subtitle}
                </p>
                <p className="uppercase tracking-[0.1em] mt-0.5" style={{ fontSize: "0.4rem", color: "#ADADAA" }}>
                  {ex.dates}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ArtistsView({ onNavigate, isMobile = false }: { onNavigate: (p: GalleryPage) => void; isMobile?: boolean }) {
  const artists = [
    { img: "/artist page/sundog.png", name: "Sun Dog", origin: "Oklahoma, USA" },
    { img: "/artworks/painting-03.jpg", name: "Claire Tabouret", origin: "Paris, France" },
    { img: "/artworks/painting-05.jpg", name: "Rashid Johnson", origin: "Chicago, USA" },
    { img: "/artworks/painting-07.jpg", name: "Nina Beier", origin: "Copenhagen, DK" },
    { img: "/artworks/painting-04.jpg", name: "Loie Hollowell", origin: "Woodland, USA" },
    { img: "/artworks/painting-08.jpg", name: "Kehinde Wiley", origin: "Los Angeles, USA" },
  ];

  const px = isMobile ? "px-4" : "px-10";
  const cols = isMobile ? "grid-cols-2" : "grid-cols-3";

  return (
    <div className="w-full h-full relative font-sans bg-white overflow-hidden flex flex-col">
      <GalleryNavbar page="artists" onNavigate={onNavigate} isMobile={isMobile} />

      <div className="flex-1 flex flex-col overflow-hidden pt-[3.2rem]">
        <div className={`flex items-center justify-between ${px} pt-4 pb-3`}>
          <p className="uppercase tracking-[0.18em] text-[#ADADAA]" style={{ fontSize: "0.45rem" }}>
            6 artists
          </p>
          <div className="flex gap-3" style={{ fontSize: "0.5rem", color: "#6B6A67" }}>
            <span className="cursor-pointer">A–Z</span>
            <span className="cursor-pointer text-[#111110] font-medium border-b border-[#111110]" style={{ paddingBottom: "1px" }}>
              Recent
            </span>
          </div>
        </div>

        {/* Artist grid */}
        <div className={`flex-1 overflow-hidden ${px} grid ${cols} gap-x-4 gap-y-5 content-start`}>
          {artists.map((a, i) => (
            <div key={i} className="flex flex-col gap-1.5 cursor-pointer group">
              <div className="overflow-hidden rounded-sm bg-[#f5f3f0] relative" style={{ aspectRatio: "3/4" }}>
                <Image
                  src={a.img}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="200px"
                />
              </div>
              <div>
                <p className="font-normal leading-tight" style={{ fontSize: "0.6rem", color: "#111110" }}>
                  {a.name}
                </p>
                <p style={{ fontSize: "0.45rem", color: "#ADADAA" }}>{a.origin}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PrivateViewingMock() {
  const [selected, setSelected] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mockWidth, setMockWidth] = useState(800);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setMockWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const isMobile = mockWidth < 440;

  const artworks = [
    { img: "/artworks/painting-10.jpg", artist: "Sun Dog", title: "Sun Dog 02", year: "2025", medium: "Acrylic on canvas", dims: "80 × 80 cm" },
    { img: "/artworks/painting-02.png", artist: "Sun Dog", title: "Night Garden IV", year: "2024", medium: "Oil on linen", dims: "120 × 90 cm" },
    { img: "/artworks/painting-06.png", artist: "Sun Dog", title: "Untitled (Bloom)", year: "2023", medium: "Watercolour", dims: "60 × 45 cm" },
    { img: "/artworks/painting-09.png", artist: "Sun Dog", title: "Soft Power I", year: "2025", medium: "Mixed media", dims: "100 × 100 cm" },
  ];

  const gridCols = isMobile ? "grid-cols-2" : "grid-cols-2";
  const px = isMobile ? "px-4" : "px-8";

  return (
    <div ref={containerRef} className="w-full h-full font-sans overflow-y-auto overflow-x-hidden bg-white">
      {/* Header */}
      <div
        className={`sticky top-0 z-10 flex items-center justify-between border-b ${px} py-2`}
        style={{ background: "#fff", borderColor: "#E8E8E6" }}
      >
        <div className="flex items-center gap-2">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#111110" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span className="font-medium tracking-tight" style={{ fontSize: isMobile ? "0.5rem" : "0.55rem", color: "#111110" }}>
            Private Viewing
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span style={{ fontSize: "0.4rem", color: "#ADADAA" }}>Expires Apr 10, 2026</span>
          <span
            className="uppercase tracking-[0.12em] font-medium"
            style={{ fontSize: "0.4rem", color: "#111110", letterSpacing: "0.15em" }}
          >
            Galerie
          </span>
        </div>
      </div>

      {/* Intro */}
      <div className={`${px} pt-5 pb-4`}>
        <p className="uppercase tracking-[0.18em] text-[#ADADAA] mb-1" style={{ fontSize: "0.38rem" }}>
          Selection — Spring 2026
        </p>
        <p className="font-medium leading-snug" style={{ fontSize: isMobile ? "0.65rem" : "0.8rem", color: "#111110", maxWidth: 320 }}>
          A curated selection prepared for you.
        </p>
        <p className="mt-1 leading-relaxed text-[#6B6A67]" style={{ fontSize: "0.45rem", maxWidth: 280 }}>
          4 works — available on request. This page is private and accessible only via your personal link.
        </p>
      </div>

      {/* Artwork grid */}
      <div className={`${px} pb-6 grid ${gridCols} gap-x-4 gap-y-6`}>
        {artworks.map((aw, i) => (
          <div
            key={i}
            className="flex flex-col gap-1.5 cursor-pointer group"
            onClick={() => setSelected(selected === i ? null : i)}
          >
            <div
              className="relative overflow-hidden bg-[#f5f3f0] rounded-sm"
              style={{ aspectRatio: "4/5" }}
            >
              <Image
                src={aw.img}
                alt=""
                fill
                quality={92}
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 45vw, 400px"
              />
              {/* Overlay inquire button on hover */}
              <div className="absolute inset-0 flex items-end justify-start opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2">
                <span
                  className="inline-flex items-center gap-1 rounded-full bg-white/90 text-[#111110] font-medium"
                  style={{ fontSize: "0.38rem", padding: "3px 8px" }}
                >
                  Inquire
                  <svg width="5" height="5" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M2 10 10 2M4 2h6v6" />
                  </svg>
                </span>
              </div>
            </div>
            <div>
              <p className="font-normal leading-tight" style={{ fontSize: "0.55rem", color: "#111110" }}>
                {aw.artist}
              </p>
              <p className="italic leading-tight text-[#6B6A67]" style={{ fontSize: "0.5rem" }}>
                {aw.title}, {aw.year}
              </p>
              <p className="mt-0.5 text-[#ADADAA]" style={{ fontSize: "0.38rem" }}>
                {aw.medium}, {aw.dims}
              </p>
            </div>
            {/* Expanded detail */}
            {selected === i && (
              <div
                className="rounded-md p-2 flex flex-col gap-1.5"
                style={{ background: "#F9FAFD", border: "1px solid #E8E8E6" }}
              >
                <p className="text-[#6B6A67] leading-relaxed" style={{ fontSize: "0.38rem" }}>
                  Price on request
                </p>
                <button
                  className="self-start rounded-full bg-[#111110] text-white font-medium"
                  style={{ fontSize: "0.38rem", padding: "3px 9px" }}
                >
                  Send enquiry
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div
        className={`${px} py-3 border-t flex items-center justify-between`}
        style={{ borderColor: "#E8E8E6" }}
      >
        <p className="text-[#ADADAA]" style={{ fontSize: "0.38rem" }}>
          This selection is confidential — please do not share.
        </p>
        <span
          className="uppercase tracking-[0.15em] font-medium text-[#111110]"
          style={{ fontSize: "0.38rem" }}
        >
          Vitreen
        </span>
      </div>
    </div>
  );
}

const artistWorks = [
  { src: "/artworks/painting-01.png", title: "Vermillion Study III, 2025", medium: "Acrylic on canvas", dims: "160 × 160 cm" },
  { src: "/artworks/painting-02.png", title: "Ochre Field 07, 2025",       medium: "Acrylic on canvas", dims: "80 × 80 cm"  },
  { src: "/artworks/painting-03.jpg", title: "Deep Green (Silence), 2024", medium: "Acrylic on canvas", dims: "124 × 124 cm" },
  { src: "/artworks/painting-04.jpg", title: "Sienna Plane IV, 2024",      medium: "Acrylic on canvas", dims: "104 × 104 cm" },
  { src: "/artworks/painting-06.png", title: "Rose Ground I, 2025",        medium: "Acrylic on canvas", dims: "123 × 92,5 cm" },
  { src: "/artworks/painting-05.jpg", title: "Celadon Mass II, 2025",       medium: "Acrylic on canvas", dims: "100 × 100 cm" },
];

const pastExhibitions = [
  { src: "/artworks/painting-01.png", title: "Soft Geometry",          venue: "Galerie Veld, Oslo",          date: "3 sept. – 12 oct. 2024" },
  { src: "/artworks/painting-03.jpg", title: "Neither Here Nor There", venue: "Halle Sievert, Munich",       date: "6 oct. – 18 nov. 2023" },
  { src: "/artworks/painting-05.jpg", title: "The Weight of Light",    venue: "Espace Aurore, Paris",        date: "14 jan. – 3 mars 2024" },
  { src: "/artworks/painting-07.jpg", title: "Quiet Figures",          venue: "Galerie Fenn, New York",      date: "2 fév. – 14 avr. 2023" },
  { src: "/artworks/painting-08.jpg", title: "Interior Distance",      venue: "Kunsthaus Morgen, Zurich",    date: "9 mai – 28 juil. 2023" },
  { src: "/artworks/painting-09.png", title: "Held Still",             venue: "Galerie Solin, Vienne",       date: "18 oct. – 20 déc. 2022" },
];

const galleryWorks = [
  { srcs: ["/artworks/painting-01.png", "/artworks/painting-02.png"], title: "Vermillion Study III, 2025", medium: "Acrylic on canvas", dims: "180 × 180 cm", price: "€2 600" },
  { srcs: ["/artworks/painting-06.png"],                               title: "Rose Ground I, 2025",        medium: "Acrylic on canvas", dims: "123 × 92,5 cm",   price: "€1 800" },
  { srcs: ["/artworks/painting-04.jpg"],                               title: "Sienna Plane IV, 2024",      medium: "Acrylic on canvas", dims: "104 × 104 cm",    price: "€1 900" },
  { srcs: ["/artworks/painting-03.jpg"],                               title: "Deep Green (Silence), 2024", medium: "Acrylic on canvas", dims: "123 × 123 cm",    price: "€2 200" },
  { srcs: ["/artworks/painting-02.png"],                               title: "Ochre Field 07, 2025",       medium: "Acrylic on canvas", dims: "80 × 80 cm",      price: "€1 300" },
  { srcs: ["/artworks/painting-05.jpg"],                               title: "Celadon Mass II, 2025",      medium: "Acrylic on canvas", dims: "100 × 100 cm",    price: "Sur demande" },
  { srcs: ["/artworks/painting-07.jpg"],                               title: "Cobalt Threshold, 2023",     medium: "Acrylic on canvas", dims: "60 × 45 cm",      price: "€850" },
  { srcs: ["/artworks/painting-09.png"],                               title: "Pale Form V, 2024",          medium: "Mixed media",        dims: "90 × 90 cm",     price: "€1 100" },
];
type ArtistPage = "home" | "past-exhibitions" | "gallery" | "artwork-detail";

const HOME_WORKS_SLIDES = 2;

function ArtistPortfolioMock() {
  const [page, setPage] = useState<ArtistPage>("home");
  const [selectedWork, setSelectedWork] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [worksSlide, setWorksSlide] = useState(0);
  const bodyRef = useRef<HTMLDivElement>(null);
  const detailScrollRef = useRef<HTMLDivElement>(null);

  const goTo = (p: ArtistPage) => {
    setPage(p);
    if (bodyRef.current) bodyRef.current.scrollTop = 0;
  };

  const openWork = (idx: number) => {
    setSelectedWork(idx);
    setSelectedImage(0);
    goTo("artwork-detail");
    setTimeout(() => { if (detailScrollRef.current) detailScrollRef.current.scrollTop = 0; }, 0);
  };

  const navItems: { label: string; page: ArtistPage | null }[] = [
    { label: "Past exhibitions", page: "past-exhibitions" },
    { label: "Gallery", page: "gallery" as ArtistPage },
    { label: "About", page: null },
  ];

  return (
    <div className="w-full h-full font-sans bg-white flex flex-col overflow-hidden">
      <style>{`.mock-btn:hover{background:#111110!important;color:#fff!important;border-color:#111110!important}.buy-btn{background:transparent;color:#111110;border:0.5px solid #111110}.buy-btn:hover{background:#111110!important;color:#fff!important;border-color:#111110!important}`}</style>
      {/* Navbar */}
      <div className="flex items-center justify-between flex-shrink-0" style={{ padding: "16px 50px" }}>
        <span
          onClick={() => goTo("home")}
          style={{ fontSize: "0.75rem", fontWeight: 400, color: "#111110", letterSpacing: "-0.01em", cursor: "pointer" }}
        >
          Sun Dog
        </span>
        <div className="flex gap-5">
          {navItems.map(item => (
            <span
              key={item.label}
              onClick={() => item.page && goTo(item.page)}
              style={{
                fontSize: "0.75rem",
                color: page === item.page ? "#111110" : "#6B6A67",
                fontWeight: page === item.page ? 600 : 400,
                cursor: item.page ? "pointer" : "default",
                textDecoration: page === item.page ? "underline" : "none",
                textUnderlineOffset: 2,
              }}
            >
              {item.label}
            </span>
          ))}
        </div>
      </div>

      {/* Scrollable body */}
      <div ref={bodyRef} className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>

        {/* ── HOME PAGE ── */}
        {page === "home" && (
          <>
            <div className="w-full" style={{ padding: "10px 50px 0" }}>
              <div className="relative w-full overflow-hidden" style={{ borderRadius: 3, aspectRatio: "16/7.5" }}>
                <Image src="/artworks/v2-warm.png" alt="" fill className="object-cover" sizes="800px" />
              </div>
            </div>
            <div className="flex flex-col" style={{ padding: "14px 50px 10px", gap: 4 }}>
              <p style={{ fontSize: "1rem", fontWeight: 500, color: "#111110", lineHeight: 1.1, letterSpacing: "-0.025em", marginBottom: -1 }}>Your friends</p>
              <p style={{ fontSize: "0.66rem", color: "#6B6A67" }}>Galerie</p>
              <p style={{ fontSize: "0.66rem", color: "#6B6A67", marginTop: -4 }}>13 juin - 4 juillet 2025</p>
              <button className="mock-btn" style={{ display: "inline-flex", alignSelf: "flex-start", border: "0.5px solid #111110", borderRadius: 5, padding: "7px 16px", fontSize: "0.61rem", background: "transparent", color: "#111110", marginTop: 10, cursor: "pointer" }}>
                Explore more exhibitions
              </button>
            </div>
            <div style={{ padding: "24px 50px 36px" }}>
              <div style={{ marginBottom: 12 }}>
                <motion.div
                  key={worksSlide}
                  initial={{ opacity: 0.72 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.22, ease }}
                  style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 8 }}
                >
                  {artistWorks.slice(worksSlide * 2, worksSlide * 2 + 4).map((aw) => (
                    <div
                      key={`${worksSlide}-${aw.title}`}
                      className="flex flex-col min-w-0"
                      style={{ gap: 5, background: "#F9F9F8", borderRadius: 6, padding: 6 }}
                    >
                      <div className="relative overflow-hidden bg-[#EDEDE9]" style={{ borderRadius: 3, aspectRatio: "4/5" }}>
                        <Image src={aw.src} alt="" fill className="object-cover" sizes="150px" />
                      </div>
                      <p style={{ fontSize: "0.7rem", fontWeight: 500, color: "#111110", lineHeight: 1.3 }}>{aw.title}</p>
                      <p style={{ fontSize: "0.55rem", color: "#6B6A67" }}>{aw.medium}</p>
                      <p style={{ fontSize: "0.55rem", color: "#6B6A67" }}>{aw.dims}</p>
                    </div>
                  ))}
                </motion.div>
                <div className="flex items-center justify-center gap-3" style={{ marginTop: 10 }}>
                  <button
                    type="button"
                    aria-label="Œuvres précédentes"
                    onClick={() => setWorksSlide((s) => Math.max(0, s - 1))}
                    disabled={worksSlide === 0}
                    className="flex items-center justify-center rounded-full border border-[#E8E8E6] bg-white text-[#111110] disabled:opacity-35 disabled:cursor-not-allowed"
                    style={{ width: 22, height: 22, fontSize: "0.65rem", lineHeight: 1 }}
                  >
                    ‹
                  </button>
                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: HOME_WORKS_SLIDES }, (_, i) => (
                      <button
                        key={i}
                        type="button"
                        aria-label={`Vue ${i + 1} sur ${HOME_WORKS_SLIDES}`}
                        aria-current={worksSlide === i ? "true" : undefined}
                        onClick={() => setWorksSlide(i)}
                        className="rounded-full p-0 border-0 cursor-pointer"
                        style={{
                          width: 6,
                          height: 6,
                          background: worksSlide === i ? "#111110" : "#E8E8E6",
                        }}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    aria-label="Œuvres suivantes"
                    onClick={() => setWorksSlide((s) => Math.min(HOME_WORKS_SLIDES - 1, s + 1))}
                    disabled={worksSlide >= HOME_WORKS_SLIDES - 1}
                    className="flex items-center justify-center rounded-full border border-[#E8E8E6] bg-white text-[#111110] disabled:opacity-35 disabled:cursor-not-allowed"
                    style={{ width: 22, height: 22, fontSize: "0.65rem", lineHeight: 1 }}
                  >
                    ›
                  </button>
                </div>
              </div>
              <p style={{ fontSize: "1rem", fontWeight: 500, color: "#111110", lineHeight: 1.1, letterSpacing: "-0.025em", marginBottom: 4 }}>Last artworks</p>
              <p style={{ fontSize: "0.61rem", color: "#6B6A67", marginBottom: 4 }}>New pieces from the studio</p>
              <button className="mock-btn" onClick={() => goTo("gallery")} style={{ display: "inline-flex", border: "0.5px solid #111110", borderRadius: 5, padding: "7px 16px", fontSize: "0.61rem", background: "transparent", color: "#111110", cursor: "pointer", marginTop: 10 }}>
                Explore more artworks
              </button>
            </div>
          </>
        )}

        {/* ── PAST EXHIBITIONS PAGE ── */}
        {page === "past-exhibitions" && (
          <div style={{ padding: "18px 50px 24px" }}>
            <p style={{ fontSize: "1.3rem", fontWeight: 500, color: "#111110", letterSpacing: "-0.025em", marginBottom: 18 }}>
              Past exhibitions
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {pastExhibitions.map((ex) => (
                <div key={ex.title} className="flex flex-col" style={{ gap: 6 }}>
                  <div className="relative overflow-hidden bg-[#F5F3F0]" style={{ borderRadius: 3, aspectRatio: "4/3" }}>
                    <Image src={ex.src} alt="" fill className="object-cover" sizes="200px" />
                  </div>
                  <div className="flex flex-col">
                    <p style={{ fontSize: "0.7rem", fontWeight: 500, color: "#111110", lineHeight: 1.3 }}>{ex.title}</p>
                    <p style={{ fontSize: "0.55rem", color: "#6B6A67", marginTop: 6 }}>{ex.venue}</p>
                    <p style={{ fontSize: "0.55rem", color: "#6B6A67", marginTop: 2 }}>{ex.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── GALLERY PAGE ── */}
        {page === "gallery" && (
          <div style={{ padding: "18px 50px 24px" }}>
            {/* Header: title left, description right */}
            <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
              <div style={{ flex: "0 0 38%" }}>
                <p style={{ fontSize: "1.5rem", fontWeight: 500, color: "#111110", letterSpacing: "-0.025em", lineHeight: 1.1, marginBottom: 6 }}>Gallery</p>
                <p style={{ fontSize: "0.71rem", color: "#6B6A67" }}>New pieces from the studio</p>
              </div>
              <div style={{ flex: "0 0 42%", paddingTop: 29, marginLeft: "auto" }}>
                <p style={{ fontSize: "0.68rem", color: "#6B6A67", lineHeight: 1.65, marginBottom: 6 }}>
                  The Gallery is the straight line from my studio to you—no intermediates. You're plugged straight into my production. Each piece—painting, collage, collectible—comes out of my hands.
                </p>
                <p style={{ fontSize: "0.68rem", color: "#6B6A67", lineHeight: 1.65 }}>
                  Questions, commissions, or thoughts on a piece? Hit me up directly.
                </p>
              </div>
            </div>
            {/* Paintings section */}
            <p style={{ fontSize: "0.68rem", fontWeight: 400, color: "#111110", marginBottom: 12 }}>Paintings</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
              {galleryWorks.map((aw, idx) => (
                <div key={aw.title} onClick={() => openWork(idx)} className="flex flex-col" style={{ gap: 5, background: "#F9F9F8", borderRadius: 6, padding: 6, cursor: "pointer" }}>
                  <div className="relative overflow-hidden bg-[#EDEDE9]" style={{ borderRadius: 3, aspectRatio: "1/1" }}>
                    <Image src={aw.srcs[0]} alt="" fill className="object-cover" sizes="150px" />
                  </div>
                  <p style={{ fontSize: "0.7rem", fontWeight: 500, color: "#111110", lineHeight: 1.3 }}>{aw.title}</p>
                  <p style={{ fontSize: "0.55rem", color: "#6B6A67" }}>{aw.medium}</p>
                  <p style={{ fontSize: "0.55rem", color: "#6B6A67" }}>{aw.dims}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── ARTWORK DETAIL PAGE ── */}
        {page === "artwork-detail" && (() => {
          const aw = galleryWorks[selectedWork];
          const srcs = aw?.srcs;
          if (!aw || !srcs?.length) {
            return (
              <div style={{ padding: "24px 50px" }}>
                <p style={{ fontSize: "0.72rem", color: "#6B6A67", marginBottom: 12 }}>Œuvre introuvable.</p>
                <span onClick={() => goTo("gallery")} style={{ fontSize: "0.75rem", color: "#6B6A67", cursor: "pointer" }}>← Back to Gallery</span>
              </div>
            );
          }
          return (
            <div style={{ display: "flex", height: "100%", overflow: "hidden", gap: 50, padding: "16px 50px" }}>
              {/* Left: image */}
              <div className="relative flex-shrink-0" style={{ width: "66%", position: "relative", overflow: "hidden", borderRadius: 3 }}>
                <Image src={srcs[selectedImage % srcs.length]} alt="" fill className="object-cover" sizes="400px" style={{ padding: "12px 12px 12px 0" }} />
                {srcs.length > 1 && (
                  <>
                    <button onClick={() => setSelectedImage((selectedImage - 1 + srcs.length) % srcs.length)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-white border border-[#E8E8E6]"
                      style={{ width: 16, height: 16, fontSize: "0.55rem", color: "#111110" }}>‹</button>
                    <button onClick={() => setSelectedImage((selectedImage + 1) % srcs.length)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-white border border-[#E8E8E6]"
                      style={{ width: 16, height: 16, fontSize: "0.55rem", color: "#111110" }}>›</button>
                  </>
                )}
              </div>
              {/* Right: details */}
              <div ref={detailScrollRef} className="flex-1 overflow-y-auto" style={{ padding: "16px 0", scrollbarWidth: "none" }}>
                <p style={{ fontSize: "1.15rem", fontWeight: 500, color: "#111110", lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: 5 }}>{aw.title}</p>
                <p style={{ fontSize: "0.78rem", color: "#6B6A67", marginBottom: 2 }}>{aw.medium}</p>
                <p style={{ fontSize: "0.78rem", color: "#6B6A67", marginBottom: 10 }}>{aw.dims}</p>
                <p style={{ fontSize: "1.03rem", fontWeight: 500, color: "#111110", marginBottom: 10 }}>{aw.price}</p>
                <button className="buy-btn" style={{ width: "100%", borderRadius: 6, padding: "9px 0", fontSize: "0.82rem", fontWeight: 500, cursor: "pointer", marginBottom: 12 }}>
                  Buy this painting
                </button>
                <p style={{ fontSize: "0.75rem", color: "#6B6A67", lineHeight: 1.65, marginBottom: 6, marginTop: 16 }}>
                  A single field of vermillion, dense and warm. The surface holds variations in pressure and direction — a record of repeated gestures across several weeks. The red is not chosen for drama but for its weight.
                </p>
                <p style={{ fontSize: "0.75rem", color: "#6B6A67", lineHeight: 1.65, marginBottom: 20 }}>
                  This work belongs to a series of monochromes in which colour is treated as subject rather than support. Each painting begins with a single pigment and ends when the surface has nothing left to give.
                </p>
                {/* Request more information */}
                <div style={{ borderTop: "0.5px solid #F0F0EE", paddingTop: 12, marginBottom: 8 }}>
                  <p style={{ fontSize: "0.85rem", fontWeight: 500, color: "#111110", marginBottom: 4 }}>Request more information</p>
                  <p style={{ fontSize: "0.72rem", color: "#6B6A67", marginBottom: 10 }}>To learn more about this artwork or shipping method, please provide your contact information.</p>
                  {["First name", "Last name", "Email address"].map(ph => (
                    <div key={ph} style={{ border: "0.5px solid #D8D8D5", borderRadius: 4, padding: "6px 10px", marginBottom: 6 }}>
                      <p style={{ fontSize: "0.72rem", color: "#ADADAA" }}>{ph}</p>
                    </div>
                  ))}
                  <button style={{ background: "#111110", color: "white", border: "none", borderRadius: 5, padding: "6px 14px", fontSize: "0.75rem", fontWeight: 600, cursor: "pointer", marginTop: 2, marginBottom: 12 }}>
                    Submit
                  </button>
                </div>
                <span onClick={() => goTo("gallery")} style={{ fontSize: "0.75rem", color: "#6B6A67", cursor: "pointer" }}>← Back to Gallery</span>
              </div>
            </div>
          );
        })()}

        {/* Footer */}
        <div className="border-t border-[#F0F0EE]" style={{ padding: "16px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.44rem", color: "#ADADAA" }}>© 2025 Sun Dog</span>
            <div style={{ display: "flex", gap: 12 }}>
              {["Instagram", "LinkedIn"].map(s => (
                <span key={s} style={{ fontSize: "0.44rem", color: "#ADADAA" }}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GalleryHeroMock() {
  const [page, setPage] = useState<GalleryPage>("home");
  const [mockWidth, setMockWidth] = useState(800);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setMockWidth(entry.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const isMobile = mockWidth < 440;

  return (
    <div ref={containerRef} className="w-full h-full relative font-sans overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={page}
          className="w-full h-full absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.08 }}
        >
          {page === "home" && <HomeView onNavigate={setPage} isMobile={isMobile} />}
          {page === "exhibitions" && <ExhibitionsView onNavigate={setPage} isMobile={isMobile} />}
          {page === "artists" && <ArtistsView onNavigate={setPage} isMobile={isMobile} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

type Audience = {
  label: string;
  title: string;
  description: string;
  features: string[];
  video?: string;
  mock?: React.ComponentType;
};

const audiences: Audience[] = [
  {
    label: "Galeries",
    title: "Une vitrine à la hauteur de votre programme.",
    description:
      "Présentez vos artistes, archivez vos expositions, gérez votre catalogue en ligne — sans compétences techniques.",
    features: [
      "Catalogue d'œuvres",
      "Pages artistes",
      "Archives d'expositions",
      "Formulaire de contact",
    ],
    mock: GalleryHeroMock,
  },
  {
    label: "Artistes",
    title: "Votre œuvre mérite un espace à elle.",
    description:
      "Un portfolio conçu pour vous — biographie, CV d'exposition, séries d'œuvres — mis à jour par vous, sans intermédiaire.",
    features: [
      "Portfolio en ligne",
      "Séries et œuvres",
      "CV d'exposition",
      "Prise de contact directe",
    ],
    mock: ArtistPortfolioMock,
  },
  {
    label: "Art Advisors",
    title: "Partagez des sélections, pas des fichiers.",
    description:
      "Présentez vos recommandations à vos clients dans un espace professionnel, confidentiel et facile à naviguer.",
    features: [
      "Partage de sélections",
      "Espaces clients",
      "Fiches d'œuvres détaillées",
      "Interface confidentielle",
    ],
    mock: PrivateViewingMock,
  },
  {
    label: "Collection Privée",
    title: "Votre collection, organisée et accessible.",
    description:
      "Centralisez l'ensemble de vos œuvres dans un espace privé : fiches, documents, historique — tout en un lieu.",
    features: [
      "Inventaire complet",
      "Fiches détaillées",
      "Documents associés",
      "Accès sécurisé",
    ],
    video: "/demo-vitreen.mp4",
  },
];

export default function Audiences() {
  const [active, setActive] = useState(0);
  const current = audiences[active];
  const [mockWidthPct, setMockWidthPct] = useState(100);
  const [mockHeightPct, setMockHeightPct] = useState(100);
  const mockContainerRef = useRef<HTMLDivElement>(null);


  const handleVideoEnd = useCallback(() => {
    setActive((prev) => (prev + 1) % audiences.length);
  }, []);

  // Resize latéral (bord droit) — largeur uniquement
  const startResizeX = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const containerW = mockContainerRef.current?.offsetWidth ?? 800;
    const startX = e.clientX;
    const startPct = mockWidthPct;
    const onMove = (ev: MouseEvent) => {
      const deltaPct = ((ev.clientX - startX) / containerW) * 100;
      setMockWidthPct(Math.max(20, Math.min(100, startPct + deltaPct)));
    };
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  // Resize vertical (bord bas) — hauteur uniquement
  const startResizeY = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const containerH = mockContainerRef.current?.offsetHeight ?? 400;
    const startY = e.clientY;
    const startPct = mockHeightPct;
    const onMove = (ev: MouseEvent) => {
      const deltaPct = ((ev.clientY - startY) / containerH) * 100;
      setMockHeightPct(Math.max(20, Math.min(100, startPct + deltaPct)));
    };
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  return (
    <section className="pt-2 pb-4 md:pt-4 md:pb-[50px] px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-8 md:mb-6"
        >
          <div className="flex flex-nowrap gap-1 md:flex-wrap md:gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {audiences.map((a, i) => {
              const isDisabled =
                a.label === "Art Advisors" || a.label === "Collection Privée";

              return (
                <span key={a.label} className="relative inline-flex">
                  <button
                    type="button"
                    aria-disabled={isDisabled}
                    tabIndex={isDisabled ? -1 : undefined}
                    onClick={(e) => {
                      if (isDisabled) {
                        e.preventDefault();
                        return;
                      }
                      setActive(i);
                    }}
                    className="inline-flex items-center whitespace-nowrap px-3 py-1 rounded-full text-xs md:px-4 md:py-1.5 md:text-sm transition-all duration-200"
                    style={
                      isDisabled
                        ? {
                            border: "1px solid #E8E8E6",
                            color: "#ADADAA",
                            background: "transparent",
                            letterSpacing: "-0.01em",
                            cursor: "not-allowed",
                            opacity: 0.9,
                          }
                        : i === active
                        ? {
                            background: "#111110",
                            color: "#fff",
                            fontWeight: 500,
                            letterSpacing: "-0.01em",
                          }
                        : {
                            border: "1px solid #E8E8E6",
                            color: "#6B6A67",
                            background: "transparent",
                            letterSpacing: "-0.01em",
                          }
                    }
                    onMouseEnter={(e) => {
                      if (i === active) return;
                      e.currentTarget.style.borderColor = "#111110";
                      e.currentTarget.style.color = "#111110";
                      if (isDisabled) e.currentTarget.style.opacity = "1";
                    }}
                    onMouseLeave={(e) => {
                      if (i === active) return;
                      if (isDisabled) {
                        e.currentTarget.style.borderColor = "#E8E8E6";
                        e.currentTarget.style.color = "#ADADAA";
                        e.currentTarget.style.opacity = "0.9";
                        return;
                      }
                      e.currentTarget.style.borderColor = "#E8E8E6";
                      e.currentTarget.style.color = "#6B6A67";
                    }}
                  >
                    {a.label}
                  </button>
                  {isDisabled && (
                    <span
                      className="pointer-events-none absolute -right-1 -top-1 z-10 rounded-full border border-[#E8E8E6] bg-white px-1.5 py-px text-[9px] font-medium uppercase tracking-[0.12em] text-[#ADADAA] shadow-sm"
                      aria-hidden
                    >
                      Soon
                    </span>
                  )}
                </span>
              );
            })}
          </div>
        </motion.div>

        {/* Carte mock : ne pas modifier le rendu desktop (md+) — évolutions mobile uniquement via max-md: */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease, delay: 0.08 }}
          className="rounded-[5px] overflow-hidden px-4 py-[10px] md:px-28 md:py-[21px] [background-size:cover] [background-repeat:no-repeat] md:[background-size:140%]"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundPosition: "center 40%",
          }}
        >
          <div
            ref={mockContainerRef}
            className="relative w-full aspect-[2922/4800] md:aspect-[2922/1770]"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="rounded-[10px] overflow-hidden relative select-none"
                style={{ width: `${mockWidthPct}%`, height: `${mockHeightPct}%` }}
              >
                {current.mock ? (
                  <current.mock />
                ) : (
                  <video
                    key={active}
                    src={current.video}
                    autoPlay
                    muted
                    playsInline
                    loop
                    onEnded={handleVideoEnd}
                    className="w-full h-full object-contain"
                  />
                )}
                {/* Right-edge handle — largeur */}
                <div
                  className="absolute top-0 right-0 bottom-0 z-30 cursor-ew-resize flex items-center justify-center"
                  style={{ width: 14 }}
                  onMouseDown={startResizeX}
                >
                  <div className="w-[2.5px] h-8 rounded-full bg-white/40" />
                </div>
                {/* Bottom-edge handle — hauteur */}
                <div
                  className="absolute bottom-0 left-0 right-0 z-30 cursor-ns-resize flex items-end justify-center"
                  style={{ height: 14 }}
                  onMouseDown={startResizeY}
                >
                  <div className="h-[2.5px] w-8 rounded-full bg-white/40 mb-1" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
