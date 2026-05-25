"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useLang } from "@/lib/lang";
import { ExhibitionPageMock } from "./ExhibitionPageMock";

const tabs = ["Selected Works", "Exhibitions", "News", "Press", "Biography"] as const;
type Tab = typeof tabs[number];

const artworks = [
  "/artist page/ChatGPT Image 26 mars 2026, 19_42_09.png",
  "/artist page/ChatGPT Image 26 mars 2026, 19_43_32.png",
  "/artist page/ChatGPT Image 26 mars 2026, 19_45_19.png",
] as const;

const artworkMeta = [
  { title: "Untitled (Horizon)", year: "2024", medium: "Oil on canvas", dims: "152 × 122 cm" },
  { title: "Dawn Study No. 7", year: "2023", medium: "Oil on canvas", dims: "183 × 152 cm" },
  { title: "Evening Field", year: "2023", medium: "Oil on canvas", dims: "122 × 91 cm" },
];

export function ArtistPageMock({ isMobile = false }: { isMobile?: boolean }) {
  const { t } = useLang();
  const [activeTab, setActiveTab] = useState<Tab>("Selected Works");
  const [bioOpen, setBioOpen] = useState(false);
  const [showExhibition, setShowExhibition] = useState(false);
  const artistScrollRef = useRef<HTMLDivElement>(null);
  const [artistScrolled, setArtistScrolled] = useState(true);

  if (showExhibition) {
    return <ExhibitionPageMock isMobile={isMobile} onBack={() => setShowExhibition(false)} />;
  }

  useEffect(() => {
    const el = artistScrollRef.current;
    if (!el) return;
    const update = () => setArtistScrolled(el.scrollTop > 24);
    update();
    el.addEventListener("scroll", update, { passive: true });
    return () => el.removeEventListener("scroll", update);
  }, []);

  if (isMobile) return (
    <div ref={artistScrollRef} className="w-full h-full overflow-y-auto bg-white relative" style={{ scrollbarWidth: "none" }}>
      <div className="font-sans text-[#111110]" style={{ zoom: 0.78 }}>
        {/* Mobile nav */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 rounded-t"
          style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(20px)", borderBottom: "0.5px solid rgba(0,0,0,0.06)" }}
        >
          <span className="font-medium uppercase" style={{ fontSize: "0.65rem", letterSpacing: "0.15em" }}>Galerie</span>
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
            <line x1="0" y1="1" x2="18" y2="1" stroke="#111110" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="0" y1="6" x2="18" y2="6" stroke="#111110" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="0" y1="11" x2="18" y2="11" stroke="#111110" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        {/* Photo with padding + rounded */}
        <div className="px-5 pt-4">
          <div className="bg-[#C8C0B8] relative rounded overflow-hidden" style={{ height: 300 }}>
            <Image src="/artist page/sundog.png" alt="Sacha Elron" fill className="object-cover object-top" sizes="600px" />
          </div>
        </div>
        {/* Body */}
        <div className="px-5 pt-5 pb-10">
          <h1 className="text-[28px] font-normal tracking-[-0.03em] leading-[1.1] mb-1">Sacha Elron</h1>
          <p className="text-[12px] text-[#888] mb-4">Born 1960, Oklahoma, USA — Lives and works in New York</p>
          <p className="text-[13px] text-[#444] leading-[1.65] mb-1">
            Sacha Elron explores the boundaries of landscape and abstraction through a deeply personal visual vocabulary.
          </p>
          <button
            onClick={() => setBioOpen(true)}
            className="mt-3 mb-6 text-[12px] text-[#555] underline underline-offset-2"
          >
            {t.showcase.readBio}
          </button>
          {/* Tabs horizontal scroll */}
          <div className="flex gap-2 overflow-x-auto pb-1 mb-5" style={{ scrollbarWidth: "none" }}>
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className="shrink-0 px-4 py-1.5 rounded-full text-[12px] border transition-colors"
                style={{
                  background: activeTab === t ? "#111110" : "transparent",
                  color: activeTab === t ? "#fff" : "#555",
                  borderColor: activeTab === t ? "#111110" : "#D8D4CF",
                }}
              >
                {t}
              </button>
            ))}
          </div>
          {/* Content */}
          {activeTab === "Selected Works" && (
            <div className="flex flex-col gap-6">
              {artworks.map((src, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="rounded overflow-hidden bg-[#E8E4DF] relative" style={{ height: 240 }}>
                    <Image src={src} alt={artworkMeta[i].title} fill className="object-cover" sizes="600px" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <p className="text-[11px] text-[#888]">Sacha Elron</p>
                    <p className="text-[13px]"><span className="font-normal">{artworkMeta[i].title},</span>{" "}<span className="text-[#555]">{artworkMeta[i].year}</span></p>
                    <p className="text-[11px] text-[#888] italic">{artworkMeta[i].medium}</p>
                    <p className="text-[11px] text-[#888]">{artworkMeta[i].dims}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === "Biography" && (
            <p className="text-[13px] text-[#444] leading-[1.7]">
              Sacha Elron (born 1960 in Oklahoma) is an American painter known for his large-scale, meditative landscapes. His work has been exhibited internationally and is held in numerous public and private collections.
            </p>
          )}
          {activeTab === "Exhibitions" && (
            <div className="flex flex-col gap-5">
              {[
                { img: "/artist page/exhibition5.jpg", title: "Recent Studies", location: "Paris, Turenne", dates: "Jan 12 — Feb 22, 2026" },
                { img: "/artist page/Exhibition6.png", title: "Your friends", location: "London", dates: "Oct 05 — Nov 28, 2025" },
              ].map((e) => (
                <div key={e.title} className="flex flex-col gap-2">
                  <div className="rounded overflow-hidden bg-[#E8E4DF] relative" style={{ height: 200 }}>
                    <Image src={e.img} alt={e.title} fill className="object-cover" sizes="600px" />
                  </div>
                  <p className="text-[13px] font-medium">{e.title}</p>
                  <p className="text-[11px] text-[#888]">{e.location} — {e.dates}</p>
                </div>
              ))}
            </div>
          )}
          {(activeTab === "News" || activeTab === "Press") && (
            <div className="flex flex-col divide-y divide-[#E8E4DF]">
              {["Artforum — February 2024", "The Art Newspaper — October 2023", "Frieze — September 2023"].map((n) => (
                <p key={n} className="text-[12px] text-[#333] py-3">{n}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    /* Outer container — scrollable, position:relative for modal */
    <div ref={artistScrollRef} className="w-full h-full overflow-y-auto bg-white relative" style={{ scrollbarWidth: "none" }}>

      {/* Biography modal — renders outside zoom */}
      {bioOpen && (
        <div
          className="absolute inset-0 z-50 flex items-start justify-center"
          style={{ background: "rgba(0,0,0,0.35)", paddingTop: 24, paddingLeft: 16, paddingRight: 16 }}
          onClick={() => setBioOpen(false)}
        >
          <div
            className="bg-white rounded w-full overflow-y-auto"
            style={{ maxWidth: 380, maxHeight: "88%", padding: "22px 22px 28px", scrollbarWidth: "none" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-[15px] font-semibold text-[#111110] leading-tight">Sacha Elron</h2>
                <p className="text-[10px] text-[#888] mt-0.5">Born 1960, Oklahoma, USA — Lives and works in New York</p>
              </div>
              <button
                onClick={() => setBioOpen(false)}
                className="flex items-center justify-center w-5 h-5 rounded-full border border-[#D8D4CF] text-[#888] hover:bg-[#F5F0EB] transition-colors shrink-0 ml-4 mt-0.5"
                style={{ fontSize: 10 }}
              >
                ✕
              </button>
            </div>
            <div className="h-px bg-[#E8E4DF] mb-4" />
            <div className="flex flex-col gap-2.5">
              {t.showcase.bio.map((p, i) => (
                <p key={i} className="text-[10px] text-[#444] leading-[1.7]">{p}</p>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Inner page at full width, zoomed down */}
      <div
        style={{ zoom: 0.58 }}
        className="font-sans text-[#111110]"
      >
        {/* Nav — glass pill on scroll */}
        <div
          className="sticky top-0 z-10 flex justify-center"
          style={{
            paddingTop: artistScrolled ? "0.5rem" : "1.25rem",
            paddingLeft: "2.5rem",
            paddingRight: "2.5rem",
            transition: "padding 0.48s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <div
            className="flex items-center justify-between w-full"
            style={{
              maxWidth: artistScrolled ? "min(800px, calc(100% - 3rem))" : "1280px",
              padding: artistScrolled ? "0.65rem 1.25rem" : "0.9rem 0",
              gap: artistScrolled ? "0.75rem" : "1.25rem",
              borderRadius: artistScrolled ? "4px" : "0",
              background: artistScrolled
                ? "linear-gradient(135deg, rgba(255,255,255,0.72), rgba(252,250,247,0.65))"
                : "transparent",
              backdropFilter: artistScrolled ? "blur(40px) saturate(2) brightness(1.05) contrast(0.98)" : "none",
              WebkitBackdropFilter: artistScrolled ? "blur(40px) saturate(2) brightness(1.05) contrast(0.98)" : "none",
              boxShadow: artistScrolled
                ? "0 8px 48px rgba(0,0,0,.08), 0 2px 16px rgba(0,0,0,.04)"
                : "none",
              transition: "all 0.48s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <span
              className="font-medium uppercase"
              style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: "#000" }}
            >
              Galerie
            </span>
            <div
              className="flex text-[#555]"
              style={{
                gap: artistScrolled ? "1rem" : "1.75rem",
                fontSize: "0.82rem",
                transition: "gap 0.48s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              {["Exhibitions", "Artists", "Fairs", "News", "About"].map((n) => (
                <span
                  key={n}
                  className={n === "Artists" ? "text-[#111110] font-medium" : "hover:underline underline-offset-[3px] cursor-pointer"}
                >
                  {n}
                </span>
              ))}
            </div>
            <div
              className="rounded-full flex items-center justify-center shrink-0"
              style={{ width: 26, height: 26, border: "0.5px solid rgba(0,0,0,0.2)" }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
            </div>
          </div>
        </div>

        {/* Hero: photo + bio */}
        <div className="flex gap-12 px-12 pt-10 pb-8">
          <div className="w-[300px] shrink-0 rounded overflow-hidden bg-[#C8C0B8] relative" style={{ height: 390 }}>
            <Image src="/artist page/sundog.png" alt="Sacha Elron" fill className="object-cover object-top" sizes="300px" />
          </div>
          <div className="flex flex-col gap-3 pt-2 min-w-0">
            <h1 className="text-[38px] font-normal tracking-[-0.03em] leading-[1.1]">Sacha Elron</h1>
            <p className="text-[13px] text-[#888]">Born 1960, Oklahoma, USA — Lives and works in New York</p>
            <p className="text-[14px] text-[#444] leading-[1.65] max-w-[520px] mt-1">
              Sacha Elron explores the boundaries of landscape and abstraction through a deeply personal visual vocabulary. His paintings, often rendered in rich, saturated color fields, evoke a contemplative stillness that hovers between representation and pure sensation.
            </p>
            <p className="text-[14px] text-[#444] leading-[1.65] max-w-[520px]">
              Working primarily with oil on canvas, his practice distills nature into its most essential forms — solitary trees, expansive skies, and luminous horizons emerge from layers of pigment with an almost meditative quality.
            </p>
            <button
              onClick={() => setBioOpen(true)}
              className="mt-2 self-start border border-[#C8C0B8] rounded-full px-5 py-2 text-[13px] text-[#333] hover:bg-[#111110] hover:text-white hover:border-[#111110] transition-colors"
            >
              {t.showcase.readBio}
            </button>
          </div>
        </div>

        {/* Tabs row */}
        <div className="border-t border-[#E8E4DF] mx-12 pt-5 pb-4 flex items-center justify-between">
          <p className="text-[11px] uppercase tracking-[0.12em] text-[#ADADAA] font-medium">Selected Works</p>
          <div className="flex gap-2">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className="px-4 py-1.5 rounded-full text-[12px] transition-colors border"
                style={{
                  background: activeTab === t ? "#111110" : "transparent",
                  color: activeTab === t ? "#fff" : "#555",
                  borderColor: activeTab === t ? "#111110" : "#D8D4CF",
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-12 pb-10">
          {activeTab === "Selected Works" && (
            <div className="grid grid-cols-3 gap-5">
              {artworks.map((src, i) => (
                <div key={i} className="flex flex-col gap-2 cursor-pointer group">
                  <div className="rounded overflow-hidden bg-[#E8E4DF] relative" style={{ height: 260 }}>
                    <Image src={src} alt={artworkMeta[i].title} fill className="object-cover group-hover:opacity-90 transition-opacity" sizes="300px" />
                  </div>
                  <p className="text-[12px] text-[#888]">Sacha Elron</p>
                  <p className="text-[13px]">
                    <span className="font-normal">{artworkMeta[i].title},</span>{" "}
                    <span className="text-[#555]">{artworkMeta[i].year}</span>
                  </p>
                  <p className="text-[12px] text-[#888] italic">{artworkMeta[i].medium}</p>
                  <p className="text-[12px] text-[#888]">{artworkMeta[i].dims}</p>
                </div>
              ))}
            </div>
          )}
          {activeTab === "Biography" && (
            <p className="text-[14px] text-[#444] leading-[1.7] max-w-2xl">
              Sacha Elron (born 1960 in Oklahoma) is an American painter known for his large-scale, meditative landscapes. His work has been exhibited internationally and is held in numerous public and private collections. He lives and works in New York City, where he maintains a studio in Brooklyn.
            </p>
          )}
          {activeTab === "Exhibitions" && (
            <div className="grid grid-cols-3 gap-5">
              {[
                { img: "/artist page/exhibition5.jpg", title: "Recent Studies", location: "Paris, Turenne", dates: "Jan 12 — Feb 22, 2026" },
                { img: "/artist page/Exhibition6.png", title: "Your friends", location: "London", dates: "Oct 05 — Nov 28, 2025" },
                { img: "/artist page/Exhibition8.png", title: "Quiet Paintings", location: "New York", dates: "Mar 10 — Apr 30, 2025" },
              ].map((e) => (
                <div key={e.title} className="flex flex-col gap-2 cursor-pointer group">
                  <div className="rounded overflow-hidden bg-[#E8E4DF] relative" style={{ height: 260 }}>
                    <Image src={e.img} alt={e.title} fill className="object-cover group-hover:opacity-90 transition-opacity" sizes="300px" />
                  </div>
                  <p className="text-[14px] font-medium text-[#111110]">{e.title}</p>
                  <p className="text-[12px] text-[#888]">{e.location} — {e.dates}</p>
                </div>
              ))}
            </div>
          )}
          {(activeTab === "News" || activeTab === "Press") && (
            <div className="flex flex-col divide-y divide-[#E8E4DF]">
              {["Artforum — February 2024", "The Art Newspaper — October 2023", "Frieze — September 2023"].map((n) => (
                <p key={n} className="text-[13px] text-[#333] py-3">{n}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

