"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/lang";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.65, ease, delay },
});

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

const bioText = [
  "Sacha Elron (né en 1960 à Oklahoma City, Oklahoma) est un peintre américain reconnu pour ses paysages méditatifs à grande échelle. Formé à la peinture figurative à l'Art Students League de New York, il développe rapidement un langage visuel personnel, oscillant entre représentation et abstraction pure.",
  "Son œuvre prend racine dans la contemplation de la nature — ciels vastess, horizons lumineux, arbres solitaires — qu'il distille en champs de couleur saturés, denses et silencieux. Travaillant principalement à l'huile sur toile, Sacha Elron construit ses tableaux par couches successives de pigments, laissant parfois transparaître les strates sous-jacentes comme autant de traces du temps.",
  "Ses expositions personnelles se sont tenues dans des galeries majeures à New York, Los Angeles, Paris et Berlin. Ses œuvres figurent dans de nombreuses collections publiques et privées, notamment au Whitney Museum of American Art, au Musée d'Art Moderne de Paris, et dans plusieurs fondations européennes dédiées à la peinture contemporaine.",
  "En 2008, il reçoit le Prix de la Fondation Pollock-Krasner, récompense majeure du monde de l'art américain. En 2015, une rétrospective lui est consacrée à la Fondation Beyeler à Bâle, rassemblant plus de 80 œuvres couvrant trente ans de pratique.",
  "Sacha Elron vit et travaille à Brooklyn, New York, dans un atelier qu'il occupe depuis 1994.",
];

function ArtistPageMock({ isMobile = false }: { isMobile?: boolean }) {
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

export function ExhibitionPageMock({ isMobile = false, onBack }: { isMobile?: boolean; onBack?: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => setScrolled(el.scrollTop > 24);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  if (isMobile) return (
    <div ref={scrollRef} className="w-full h-full overflow-y-auto bg-white relative" style={{ scrollbarWidth: "none" }}>
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
        {/* Mobile body */}
        <div className="px-5 pt-5 pb-5">
          {onBack && (
            <button onClick={onBack} className="text-[11px] text-[#888] mb-4 flex items-center gap-1">← Back</button>
          )}
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#ADADAA] mb-4">
            <span className="text-[#555] underline underline-offset-2">Exhibitions</span>{" — "}Your friends
          </p>
          <h1 className="text-[17px] font-normal tracking-[-0.03em] leading-[1.1] mb-6">
            Sacha Elron — <em>Your friends</em>
          </h1>
          <div className="flex flex-col gap-3 mb-6 pb-6" style={{ borderBottom: "0.5px solid rgba(0,0,0,0.08)" }}>
            <div><p className="text-[10px] uppercase tracking-[0.1em] text-[#ADADAA]">Artist</p><p className="text-[13px] font-medium text-[#111110]">Sacha Elron</p></div>
            <div><p className="text-[10px] uppercase tracking-[0.1em] text-[#ADADAA]">Dates</p><p className="text-[13px] text-[#333]">Feb 12 — Mar 22, 2026</p></div>
            <div><p className="text-[10px] uppercase tracking-[0.1em] text-[#ADADAA]">Location</p><p className="text-[13px] text-[#333]">Galerie, Paris — Turenne</p></div>
          </div>
          <p className="text-[14px] text-[#333] leading-[1.7] mb-3">
            A presentation of recent paintings and works on paper exploring friendship, memory, and shared light.
          </p>
          <p className="text-[14px] text-[#888] leading-[1.7] mb-7">
            Private viewing and availability: contact the gallery.
          </p>
          <div className="flex flex-col gap-2 mb-7">
            <button className="bg-[#111110] text-white rounded-full px-5 py-3 text-[12px] text-center w-full">Artwork Inquiry</button>
            <button className="border border-[#D8D4CF] text-[#333] rounded-full px-5 py-3 text-[12px] text-center w-full">View artist</button>
          </div>
          <div className="relative rounded overflow-hidden bg-[#E8E4DF] mb-8" style={{ height: 300 }}>
            <Image src="/exhibition page/Exhibition2.png" alt="Installation view" fill className="object-cover" sizes="400px" />
          </div>

          {/* Exhibition Text */}
          <div className="mb-8 text-center">
            <p className="text-[10px] uppercase tracking-[0.14em] text-[#ADADAA] mb-4">Exhibition Text</p>
            <p className="text-[14px] text-[#555] leading-[1.7]">
              Presented as one continuous sequence, the works below extend the show&apos;s themes — friendship, memory, and light — into individual canvases and works on paper.
            </p>
          </div>

          {/* Selected Works */}
          <p className="text-[10px] uppercase tracking-[0.14em] text-[#ADADAA] mb-5">Selected Works</p>
          <div className="flex flex-col gap-6">
            {[
              { title: "Untitled (Blue)", year: "2025", medium: "Acrylic on canvas", size: "120 × 120 cm", img: "/exhibition page/portrait2.jpg" },
              { title: "Untitled (Lavender)", year: "2024", medium: "Oil on canvas", size: "100 × 80 cm", img: "/exhibition page/painting-02.png" },
            ].map((work) => (
              <div key={work.title} className="flex flex-col gap-2">
                <div className="rounded overflow-hidden bg-[#E8E4DF]" style={{ height: 260 }}>
                  <img src={work.img} alt={work.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-0.5">
                    <p className="text-[13px] font-medium text-[#111110]">{work.title}, {work.year}</p>
                    <p className="text-[12px] text-[#888] italic">{work.medium}</p>
                    <p className="text-[12px] text-[#888]">{work.size}</p>
                  </div>
                  <button className="border border-[#D8D4CF] rounded px-6 py-1.5 text-[12px] text-[#111110] shrink-0">Inquire</button>
                </div>
              </div>
            ))}
          </div>
          {/* Quote */}
          <blockquote className="mt-10 mb-4 text-[14px] italic text-[#999] leading-[1.7] text-center">
            &ldquo;Shared light is the simplest form of friendship—what falls on the wall falls on us both.&rdquo;
            <footer className="mt-2 text-[10px] uppercase tracking-[0.12em] text-[#ADADAA] not-italic">Sacha Elron</footer>
          </blockquote>
          <p className="mt-4 text-[12px] text-[#ADADAA] underline underline-offset-2 cursor-pointer text-center pb-4">All exhibitions</p>
        </div>
      </div>
    </div>
  );

  return (
    <div ref={scrollRef} className="w-full h-full overflow-y-auto bg-white relative" style={{ scrollbarWidth: "none" }}>
      <div
        className="mock-scale font-sans text-[#111110]"
      >

        {/* Nav — glass pill on scroll */}
        <div
          className="sticky top-0 z-10 flex justify-center"
          style={{
            paddingTop: scrolled ? "0.5rem" : "1.25rem",
            paddingLeft: "2.5rem",
            paddingRight: "2.5rem",
            transition: "padding 0.48s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <div
            className="flex items-center justify-between w-full"
            style={{
              maxWidth: scrolled ? "min(800px, calc(100% - 3rem))" : "1280px",
              padding: scrolled ? "0.65rem 1.25rem" : "0.9rem 0",
              gap: scrolled ? "0.75rem" : "1.25rem",
              borderRadius: scrolled ? "4px" : "0",
              background: scrolled
                ? "linear-gradient(135deg, rgba(255,255,255,0.72), rgba(252,250,247,0.65))"
                : "transparent",
              backdropFilter: scrolled ? "blur(40px) saturate(2) brightness(1.05) contrast(0.98)" : "none",
              WebkitBackdropFilter: scrolled ? "blur(40px) saturate(2) brightness(1.05) contrast(0.98)" : "none",
              boxShadow: scrolled
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
                gap: scrolled ? "1rem" : "1.75rem",
                fontSize: "0.82rem",
                transition: "gap 0.48s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              {["Exhibitions", "Artists", "Fairs", "News", "About"].map((n) => (
                <span
                  key={n}
                  className={n === "Exhibitions" ? "text-[#111110] font-medium" : "hover:underline underline-offset-[3px] cursor-pointer"}
                >
                  {n}
                </span>
              ))}
            </div>
            <div
              className="rounded-full flex items-center justify-center shrink-0"
              style={{
                width: 26,
                height: 26,
                border: "0.5px solid rgba(0,0,0,0.2)",
              }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex gap-14 px-10 pt-10 pb-12">
          {/* Sidebar */}
          <div className="w-[200px] shrink-0 flex flex-col gap-5">
            {onBack && (
              <button onClick={onBack} className="text-[11px] text-[#888] flex items-center gap-1 self-start">← Back</button>
            )}
            <p className="text-[10px] uppercase tracking-[0.12em] text-[#ADADAA]">
              <span className="text-[#555] underline underline-offset-2">Exhibitions</span>
              {" — "}Your friends
            </p>
            <div className="flex flex-col gap-1">
              <p className="text-[10px] uppercase tracking-[0.1em] text-[#ADADAA]">Artist</p>
              <p className="text-[13px] font-medium text-[#111110] underline underline-offset-2 cursor-pointer">Sacha Elron</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-[10px] uppercase tracking-[0.1em] text-[#ADADAA]">Dates</p>
              <p className="text-[13px] text-[#333]">Feb 12 — Mar 22, 2026</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-[10px] uppercase tracking-[0.1em] text-[#ADADAA]">Location</p>
              <p className="text-[13px] text-[#333]">Galerie, Paris — Turenne</p>
            </div>
            <button className="mt-2 bg-[#111110] text-white rounded-full px-5 py-2.5 text-[12px] text-center">
              Artwork Inquiry
            </button>
            <button className="border border-[#D8D4CF] text-[#333] rounded-full px-5 py-2.5 text-[12px] text-center">
              View artist
            </button>
            <p className="text-[12px] text-[#ADADAA] underline underline-offset-2 cursor-pointer">All exhibitions</p>
          </div>

          {/* Main */}
          <div className="flex-1 min-w-0">
            <h1 className="text-[28px] font-normal tracking-[-0.03em] leading-[1.1] mb-5">
              Sacha Elron — <em>Your friends</em>
            </h1>
            <p className="text-[14px] text-[#333] leading-[1.7] max-w-[560px] mb-3">
              A presentation of recent paintings and works on paper exploring friendship, memory, and shared light. The exhibition brings together a focused selection of pieces conceived as a single environment.
            </p>
            <p className="text-[14px] text-[#333] leading-[1.7] max-w-[560px] mb-3">
              Arranged as a sequence of rooms, the works invite a slow reading: color fields, soft gradients, and restrained surfaces echo the quiet of the gallery itself.
            </p>
            <p className="text-[14px] text-[#888] leading-[1.7] max-w-[540px] mb-3">
              Private viewing and availability: contact the gallery.
            </p>
          </div>
        </div>

        {/* Installation view 1 */}
        <div className="mx-10 relative rounded overflow-hidden bg-[#E8E4DF]" style={{ height: 440 }}>
          <Image
            src="/exhibition page/Exhibition2.png"
            alt="Installation view — cool room"
            fill
            className="object-cover"
            sizes="700px"
          />
        </div>
        <p className="mx-10 mt-2 text-[11px] text-[#ADADAA] italic">
          Installation view, Sacha Elron : <em>Your friends</em>, Galerie, Paris, 2026
        </p>

        {/* Exhibition text */}
        <div className="mx-10 mt-14 mb-6 text-center">
          <p className="text-[10px] uppercase tracking-[0.14em] text-[#ADADAA] mb-4">Exhibition Text</p>
          <p className="text-[14px] text-[#555] leading-[1.7] max-w-[480px] mx-auto">
            Presented as one continuous sequence, the works below extend the show&apos;s themes — friendship, memory, and light — into individual canvases and works on paper.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="mt-5 border border-[#D8D4CF] rounded-full px-6 py-2.5 text-[12px] text-[#333] transition-all duration-150 hover:bg-[#111110] hover:border-[#111110] hover:text-white"
          >
            read full exhibition text
          </button>
        </div>

        {/* Installation view 2 */}
        <div className="mx-10 mt-10 rounded overflow-hidden bg-[#E8E4DF] relative" style={{ height: 440 }}>
          <Image
            src="/exhibition page/painting-02.png"
            alt="Sacha Elron — Untitled (Yellow)"
            fill
            className="object-contain"
            sizes="900px"
          />
        </div>
        <p className="mx-10 mt-2 text-[11px] text-[#ADADAA] italic">
          Installation view, Sacha Elron : <em>Your friends</em>, Galerie, Paris, 2026
        </p>

        {/* Artwork detail */}
        <div className="mx-10 mt-14 pb-14 flex gap-8">
          <div className="w-[50%] shrink-0 flex flex-col gap-2">
            <div className="rounded overflow-hidden bg-[#E8E4DF] relative" style={{ height: 440 }}>
              <Image src="/exhibition page/portrait2.jpg" alt="Sacha Elron — Untitled (Blue), 2025" fill className="object-cover" sizes="500px" />
            </div>
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-0.5">
                <p className="text-[12px] text-[#888]">Sacha Elron</p>
                <p className="text-[13px] font-medium text-[#111110]">Untitled, 2025</p>
                <p className="text-[12px] text-[#888] italic">Acrylic on canvas</p>
                <p className="text-[12px] text-[#888]">120 × 120 cm</p>
              </div>
              <button className="border border-[#D8D4CF] rounded px-8 py-1.5 text-[12px] text-[#111110] shrink-0 transition-colors duration-150 hover:border-[#111110] hover:text-[#111110]">
                Inquire
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center py-2 flex-1">
            <blockquote className="text-[15px] italic text-[#999] leading-[1.7] max-w-[280px] text-center transition-colors duration-200 hover:text-[#111110] cursor-default">
              &ldquo;Shared light is the simplest form of friendship—what falls on the wall falls on us both.&rdquo;
              <footer className="mt-3 text-[10px] uppercase tracking-[0.12em] text-[#ADADAA] not-italic">Sacha Elron</footer>
            </blockquote>
          </div>
        </div>

        {/* Exhibition text modal */}
        {showModal && (
          <div
            className="absolute inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
            onClick={() => setShowModal(false)}
          >
            <div
              className="bg-white rounded overflow-y-auto"
              style={{ maxWidth: 480, width: "calc(100% - 48px)", maxHeight: "72%", padding: "28px 28px 32px", scrollbarWidth: "none" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-5">
                <p className="text-[10px] uppercase tracking-[0.14em] text-[#ADADAA]">Exhibition Text</p>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-[#ADADAA] hover:text-[#111110] transition-colors leading-none"
                  style={{ fontSize: 18 }}
                >
                  &times;
                </button>
              </div>
              <h2 className="text-[16px] font-normal tracking-[-0.02em] text-[#111110] mb-5">
                Sacha Elron — <em>Your friends</em>
              </h2>
              <div className="flex flex-col gap-4" style={{ fontSize: 13, color: "#555", lineHeight: 1.75 }}>
                <p>The works gathered in <em>Your friends</em> do not announce themselves. They arrive quietly — through colour, through stillness, through the peculiar way light describes a surface without explaining it.</p>
                <p>Sacha Elron has spent the last three years returning to the same question: what remains of a landscape once it has been absorbed into the body? The paintings in this exhibition are not records of places. They are the residue of looking — the sensation that persists after the eye has moved on.</p>
                <p>Working in oil on large-format canvases, he builds each surface through repeated acts of application and erasure. Colours that should not coexist find ways to hold together. Forms that suggest horizon, water, or canopy resist naming. The work hovers in the interval between recognition and abstraction.</p>
                <p><em>Your friends</em> takes its title from a phrase that appeared in a notebook during the making of these paintings. It refers, obliquely, to the things we carry with us without knowing we carry them — the images, the light conditions, the half-remembered atmospheres that constitute a private visual life.</p>
                <p>The exhibition presents sixteen works made between 2023 and 2025.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DraggableMockWindow({
  children,
  initialWidthPct = 85,
}: {
  children: React.ReactNode | ((widthPx: number) => React.ReactNode);
  initialWidthPct?: number;
}) {
  const [posX, setPosX] = useState(0);
  const [widthPct, setWidthPct] = useState(initialWidthPct);
  const containerRef = useRef<HTMLDivElement>(null);
  const parentWRef = useRef(0);

  // 20px (inset B&W) + 30px gap
  const [PAD_H, setPAD_H] = useState(80);
  const [PAD_V, setPAD_V] = useState(45);

  // Merge both effects so padH is correct when computing widthPct
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const padH = isMobile ? 35 : 80;
    const padV = isMobile ? 25 : 45;
    setPAD_H(padH);
    setPAD_V(padV);

    const parent = containerRef.current?.parentElement;
    if (!parent) return;
    const parentW = parent.offsetWidth;
    parentWRef.current = parentW;
    const maxMockW = parentW - 2 * padH;
    const finalPct = Math.max(28, (maxMockW / parentW) * 100);
    setWidthPct(finalPct);
    setPosX(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clampX = (x: number, mockW?: number) => {
    const parent = containerRef.current?.parentElement;
    if (!parent) return 0;
    const cW = parent.offsetWidth;
    const w = mockW ?? containerRef.current?.offsetWidth ?? 0;
    const limit = cW / 2 - w / 2 - PAD_H;
    return Math.max(-limit, Math.min(limit, x));
  };

  const startDrag = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX - posX;
    const onMove = (ev: MouseEvent) => setPosX(clampX(ev.clientX - startX));
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  // Resize latéral uniquement (bord droit) — hauteur CSS fixe
  const startResize = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const parentW = parentWRef.current || (containerRef.current?.parentElement?.offsetWidth ?? 600);
    const maxMockW = parentW - 2 * PAD_H;
    const maxPct = (maxMockW / parentW) * 100;
    const startX = e.clientX;
    const startPct = widthPct;
    const onMove = (ev: MouseEvent) => {
      const deltaPct = ((ev.clientX - startX) / parentW) * 100;
      const newPct = Math.max(28, Math.min(maxPct, startPct + deltaPct));
      const newMockW = (newPct / 100) * parentW;
      setWidthPct(newPct);
      setPosX((x) => clampX(x, newMockW));
    };
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const currentWidthPx = (widthPct / 100) * (parentWRef.current || 600);
  const content = typeof children === "function" ? children(currentWidthPx) : children;

  return (
    <div
      ref={containerRef}
      className="z-10 bg-white rounded select-none overflow-hidden isolate"
      style={{
        position: "absolute",
        width: `${widthPct}%`,
        top: PAD_V,
        bottom: PAD_V,
        left: "50%",
        transform: `translateX(calc(-50% + ${posX}px))`,
      }}
    >
      {/* Barre de drag — en haut */}
      <div
        className="absolute top-0 left-0 right-0 z-30 flex items-center justify-center cursor-grab active:cursor-grabbing rounded-t"
        style={{ height: 20 }}
        onMouseDown={startDrag}
      >
        <div className="w-7 h-[2.5px] rounded-full bg-[#C8C4C0]" />
      </div>

      {/* Contenu du mock */}
      <div className="w-full h-full overflow-hidden">{content}</div>

      {/* Poignée de redimensionnement — bord droit uniquement */}
      <div
        className="absolute top-0 right-0 bottom-0 z-30 cursor-ew-resize flex items-center justify-center"
        style={{ width: 14 }}
        onMouseDown={startResize}
      >
        <div className="w-[2.5px] h-8 rounded-full bg-[#C8C4C0]" />
      </div>
    </div>
  );
}

/** Première partie avant « : », reste après saut de ligne (espace insécable avant le deux-points). */
function ShowcaseDescText({ text }: { text: string }) {
  const i = text.indexOf(":");
  if (i === -1) return <>{text}</>;
  const before = text.slice(0, i).trimEnd();
  const after = text.slice(i + 1).trimStart();
  return (
    <>
      {before}
      {"\u202F"}:
      <br />
      {after}
    </>
  );
}

function ShowcaseCard({
  title,
  desc,
  reverse = false,
  delay = 0,
  mockImage,
  mockScale = 1,
  bgImage = "/colin de land.jpg",
  MockComponent,
}: {
  title: string;
  desc: string;
  reverse?: boolean;
  delay?: number;
  mockImage?: string;
  mockScale?: number;
  bgImage?: string;
  MockComponent?: React.ComponentType<{ isMobile?: boolean }>;
}) {
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  useEffect(() => {
    const check = () => setIsMobileViewport(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const imageCol = (
    <div className="relative overflow-hidden h-[420px] md:min-h-[720px]">
      <div
        className="absolute inset-[15px] rounded bg-cover bg-center"
        style={{ backgroundImage: `url('${bgImage}')` }}
      />
      <DraggableMockWindow initialWidthPct={mockScale * (isMobileViewport ? 95 : 85)}>
        {(widthPx) => MockComponent ? (
          <MockComponent isMobile={isMobileViewport || widthPx < 420} />
        ) : mockImage === "/artist page.png" ? (
          <ArtistPageMock isMobile={isMobileViewport || widthPx < 420} />
        ) : mockImage ? (
          <div className="w-full h-full p-[20px]">
            <div className="relative w-full h-full">
              <Image src={mockImage} alt={title} fill className="object-cover object-top" sizes="700px" />
            </div>
          </div>
        ) : (
          <ExhibitionPageMock isMobile={isMobileViewport || widthPx < 420} />
        )}
      </DraggableMockWindow>
    </div>
  );

  const textCol = (
    <div className="flex flex-col justify-center px-[15px] md:px-10 pt-[15px] pb-4 md:py-12 order-first md:order-none">
      <div className="text-[14px] md:text-[18px] leading-[1.3] w-full">
        <h3 className="font-display font-normal text-[#111110] tracking-[-0.02em] m-0 p-0 leading-[inherit]">
          {title}
        </h3>
        <p className="text-[#6B6A67] font-normal tracking-[-0.02em] m-0 p-0 leading-[inherit]">
          <ShowcaseDescText text={desc} />
        </p>
      </div>
    </div>
  );

  return (
    <motion.div
      {...fadeUp(delay)}
      className="rounded overflow-hidden bg-[#F9FAFD]"
      style={{ border: "0.1px solid #D4D4D0" }}
    >
      <div
        className={`grid ${
          reverse ? "md:grid-cols-[1fr_2fr]" : "md:grid-cols-[2fr_1fr]"
        }`}
      >
        {reverse ? (
          <>
            {textCol}
            {imageCol}
          </>
        ) : (
          <>
            {imageCol}
            {textCol}
          </>
        )}
      </div>
    </motion.div>
  );
}

const INTERVAL = 4500;
const bgImage = "/colin deland.jpeg";

/* Step 1 — Branded admin interface */
function AdminMock() {
  const { t } = useLang();
  const m = t.stepper.mock.admin;
  const isFr = m.workspace === "Mon espace galerie";

  const sidebarItems = [
    { label: isFr ? "Vue d'ensemble" : "Overview", active: false },
    { label: isFr ? "Œuvres" : "Artworks", active: true },
    { label: isFr ? "Artistes" : "Artists", active: false },
    { label: isFr ? "Expositions" : "Exhibitions", active: false },
    { label: isFr ? "Demandes" : "Inquiries", active: false },
    { label: "OVR", active: false },
    { label: isFr ? "Collectionneurs" : "Collectors", active: false },
  ];

  const statusPills = [
    isFr ? "Disponible" : "Available",
    isFr ? "Réservé" : "Reserved",
    isFr ? "Vendu" : "Sold",
    "NFS",
    "Consignment",
  ];

  const tabIcons = [
    /* Overview */
    <svg key="ov" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
    /* Artworks */
    <svg key="art" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>,
    /* Artists */
    <svg key="ar" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>,
    /* Exhibitions */
    <svg key="ex" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
    /* Inquiries */
    <svg key="inq" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    /* OVR */
    <svg key="ovr" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
    /* Collectors */
    <svg key="col" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease }}
      className="absolute inset-0 flex overflow-hidden rounded"
    >
      {/* ── Desktop sidebar ── */}
      <div className="hidden md:flex w-[130px] shrink-0 bg-white border-r border-[#EBEBEA] flex-col py-4 px-3">
        <div className="flex items-center gap-2 mb-5 px-1">
          <div className="w-5 h-5 rounded bg-[#111110] flex items-center justify-center shrink-0">
            <span className="text-white text-[7px] font-bold">GOS</span>
          </div>
          <span className="text-[10px] font-semibold text-[#111110] tracking-[-0.01em]">Gallery OS</span>
        </div>
        <div className="flex flex-col gap-0.5 flex-1">
          {sidebarItems.map(({ label, active }) => (
            <div key={label} className={`text-[10px] px-2.5 py-1.5 rounded-md tracking-[-0.01em] ${active ? "bg-[#F0F0EE] text-[#111110] font-medium" : "text-[#888886]"}`}>
              {label}
            </div>
          ))}
        </div>
        <p className="text-[8px] text-[#ADADAA] px-1">Powered by Vitreen</p>
      </div>

      {/* ── Mobile header ── */}
      <div className="md:hidden absolute top-0 left-0 right-0 h-9 bg-white border-b border-[#EBEBEA] flex items-center px-3 gap-2 z-10">
        <div className="w-5 h-5 rounded bg-[#111110] flex items-center justify-center shrink-0">
          <span className="text-white text-[7px] font-bold">GOS</span>
        </div>
        <span className="text-[11px] font-semibold text-[#111110] tracking-[-0.01em] flex-1">Gallery OS</span>
        <div className="w-5 h-5 rounded-full bg-[#F0F0EE]" />
      </div>

      {/* ── Main content ── */}
      <div className="flex-1 bg-[#FAFAF8] overflow-hidden flex flex-col pt-9 md:pt-0 pb-10 md:pb-0">
        <div className="flex-1 overflow-y-auto p-3 md:p-5 flex flex-col gap-2.5 md:gap-3">
          {/* Breadcrumb + title */}
          <div>
            <p className="text-[9px] md:text-[9px] text-[#ADADAA] mb-0.5">← {isFr ? "Retour aux œuvres" : "Back to artworks"}</p>
            <p className="text-[14px] md:text-[13px] font-semibold text-[#111110] tracking-[-0.02em]">{m.newArtwork}</p>
            <p className="text-[10px] md:text-[9px] text-[#888886] mt-0.5">{isFr ? "Publié instantanément sur votre site." : "Saved directly — visible on your site immediately."}</p>
          </div>

          {/* Desktop: side-by-side / Mobile: stacked fields */}
          <div className="flex gap-3 flex-1 overflow-hidden">
            <div className="flex-1 flex flex-col gap-2 overflow-hidden">

              {/* Title */}
              <div>
                <p className="text-[9px] md:text-[8.5px] font-medium text-[#111110] mb-1">{m.titleField} <span className="text-red-400">*</span></p>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                  className="h-7 md:h-6 bg-white rounded border border-[#E0E0DE] flex items-center px-2.5">
                  <span className="text-[11px] md:text-[10px] text-[#111110]">Untitled (Horizon), 2024</span>
                </motion.div>
              </div>

              {/* Artist */}
              <div>
                <p className="text-[9px] md:text-[8.5px] font-medium text-[#111110] mb-1">{m.artistField}</p>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                  className="h-7 md:h-6 bg-white rounded border border-[#E0E0DE] flex items-center px-2.5">
                  <span className="text-[11px] md:text-[10px] text-[#111110]">Claire Fontaine</span>
                </motion.div>
              </div>

              {/* Year + Medium */}
              <div className="flex gap-2">
                <div className="flex-1">
                  <p className="text-[9px] md:text-[8.5px] font-medium text-[#111110] mb-1">{isFr ? "Année" : "Year"}</p>
                  <div className="h-7 md:h-6 bg-white rounded border border-[#E0E0DE] flex items-center px-2.5">
                    <span className="text-[11px] md:text-[10px] text-[#111110]">2024</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-[9px] md:text-[8.5px] font-medium text-[#111110] mb-1">{isFr ? "Technique" : "Medium"}</p>
                  <div className="h-7 md:h-6 bg-white rounded border border-[#E0E0DE] flex items-center px-2.5">
                    <span className="text-[11px] md:text-[10px] text-[#111110]">{isFr ? "Huile sur toile" : "Oil on canvas"}</span>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div>
                <p className="text-[9px] md:text-[8.5px] font-medium text-[#111110] mb-1">Status</p>
                <div className="flex flex-wrap gap-1.5">
                  {statusPills.map((s, i) => (
                    <div key={s} className={`text-[9px] md:text-[8.5px] px-2.5 py-1 md:py-0.5 rounded-full border ${i === 0 ? "bg-[#111110] text-white border-[#111110]" : "bg-white text-[#555] border-[#E0E0DE]"}`}>
                      {s}
                    </div>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <p className="text-[9px] md:text-[8.5px] font-medium text-[#111110] mb-1">{m.priceField}</p>
                <div className="flex gap-1.5">
                  <div className="h-7 md:h-6 flex-1 bg-white rounded border border-[#E0E0DE] flex items-center px-2.5">
                    <span className="text-[11px] md:text-[10px] text-[#ADADAA]">e.g. 4500</span>
                  </div>
                  <div className="h-7 md:h-6 w-14 md:w-12 bg-white rounded border border-[#E0E0DE] flex items-center px-2.5">
                    <span className="text-[11px] md:text-[10px] text-[#111110]">EUR</span>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-2 mt-auto pt-1">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                  className="text-[10px] md:text-[9.5px] px-4 md:px-3 py-2 md:py-1.5 rounded-md bg-[#111110] text-white font-medium cursor-pointer">
                  {m.publish}
                </motion.div>
                <div className="text-[10px] md:text-[9.5px] px-4 md:px-3 py-2 md:py-1.5 rounded-md border border-[#E0E0DE] text-[#555] cursor-pointer">
                  {isFr ? "Annuler" : "Cancel"}
                </div>
              </div>
            </div>

            {/* Image upload — hidden on mobile to save space */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="hidden md:flex w-[38%] shrink-0 bg-white rounded border border-dashed border-[#D0D0CE] flex-col items-center justify-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ADADAA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <p className="text-[8.5px] text-[#ADADAA] text-center leading-tight">{m.dragClick}<br />{isFr ? "ou cliquer" : "or click to browse"}</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Mobile bottom tab bar ── */}
      <div className="md:hidden absolute bottom-0 left-0 right-0 h-10 bg-white border-t border-[#EBEBEA] flex items-center justify-around px-1 z-10">
        {sidebarItems.map(({ label, active }, i) => (
          <div key={label} className={`flex flex-col items-center gap-0.5 flex-1 ${active ? "text-[#111110]" : "text-[#ADADAA]"}`}>
            {tabIcons[i]}
            <span className="text-[6.5px] font-medium leading-none">{label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* Step 2 — Live site preview showing the artwork */
function LiveSiteMock() {
  const { t } = useLang();
  const m = t.stepper.mock.livesite;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease }}
      className="absolute inset-0 p-5 md:p-6 flex flex-col"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#E8E8E6]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#E8E8E6]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#E8E8E6]" />
        </div>
        <div className="flex-1 h-6 bg-white rounded-md border border-[#E8E8E6] flex items-center px-3">
          <span className="text-[9px] text-[#ADADAA] truncate">galerie-fontaine.com/oeuvres/composition-no-7</span>
        </div>
      </div>

      <div className="flex-1 bg-white rounded border border-[#E8E8E6] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#F0F0EE]">
          <span className="text-[11px] font-medium text-[#111110] tracking-[-0.01em]">
            Galerie Fontaine
          </span>
          <div className="flex gap-4">
            {m.navItems.map((item) => (
              <span key={item} className="text-[9px] text-[#6B6A67]">
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Mobile: vertical stack — Desktop: side by side */}
        <div className="flex-1 flex flex-col md:flex-row gap-0 md:gap-4 md:p-4 overflow-hidden">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5, ease }}
            className="w-full md:flex-1 bg-[#F7F7F5] flex items-center justify-center"
            style={{ minHeight: 0, flex: "1 1 0" }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#CCCCC9" strokeWidth="1">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m21 15-5-5L5 21" />
            </svg>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.4, ease }}
            className="shrink-0 md:w-44 flex flex-col gap-2 p-4 md:p-0 md:py-0"
          >
            <div>
              <p className="text-[13px] md:text-[12px] font-medium text-[#111110]">Composition No. 7</p>
              <p className="text-[11px] md:text-[10px] text-[#6B6A67]">Claire Fontaine, 2024</p>
            </div>
            <div className="h-px bg-[#F0F0EE]" />
            <div className="space-y-1.5 md:space-y-1">
              <div className="flex justify-between">
                <span className="text-[10px] md:text-[9px] text-[#ADADAA]">{m.technique}</span>
                <span className="text-[10px] md:text-[9px] text-[#6B6A67]">{m.techniqueValue}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[10px] md:text-[9px] text-[#ADADAA]">{m.dimensions}</span>
                <span className="text-[10px] md:text-[9px] text-[#6B6A67]">120 × 80 cm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[10px] md:text-[9px] text-[#ADADAA]">{m.price}</span>
                <span className="text-[10px] md:text-[9px] text-[#6B6A67]">{m.priceValue}</span>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.3 }}
              className="mt-auto text-[11px] md:text-[10px] px-3 py-2 md:py-1.5 rounded-full bg-[#111110] text-white font-medium text-center"
            >
              {m.inquire}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.4 }}
        className="mt-3 flex items-center gap-2 justify-center"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-2 h-2 rounded-full bg-[#4CAF50]"
        />
        <span className="text-[10px] text-[#6B6A67]">{m.liveStatus}</span>
      </motion.div>
    </motion.div>
  );
}

/* Step 3 — Share viewing room via email */
function ShareMock() {
  const { t } = useLang();
  const m = t.stepper.mock.share;
  const [sent, setSent] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setSent(true), 1600);
    return () => clearTimeout(id);
  }, []);

  const fields = [
    { label: m.from,    value: "galerie@fontaine.com" },
    { label: m.to,      value: "marc.durand@collection.fr" },
    { label: m.subject, value: "Sélection Printemps 2026 — Viewing Room" },
  ];

  const isFr = m.from === "De";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease }}
      className="absolute inset-0 flex overflow-hidden"
    >
      {/* Left panel — collector list */}
      <div className="hidden md:flex w-[200px] shrink-0 bg-[#FAFAF8] border-r border-[#EBEBEA] flex-col">
        {/* Header */}
        <div className="px-4 pt-4 pb-3 border-b border-[#EBEBEA]">
          <p className="text-[11px] font-semibold text-[#111110] tracking-[-0.01em]">{m.notifyCollector}</p>
          <p className="text-[9px] text-[#ADADAA] mt-0.5">{m.recipientsCount}</p>
        </div>
        {/* Collector rows */}
        {[
          { name: "Marc Durand", tag: isFr ? "Collectionneur" : "Collector", selected: true },
          { name: "Sophie Veil", tag: isFr ? "Art Advisor" : "Art Advisor", selected: false },
          { name: "James Howell", tag: isFr ? "Collectionneur" : "Collector", selected: false },
        ].map(({ name, tag, selected }) => (
          <div key={name} className={`flex items-center gap-2.5 px-3 py-2.5 ${selected ? "bg-white border-r-2 border-[#111110]" : ""}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 ${selected ? "bg-[#111110] text-white" : "bg-[#E8E8E6] text-[#6B6A67]"}`}>
              {name[0]}
            </div>
            <div className="min-w-0">
              <p className={`text-[10px] font-medium truncate ${selected ? "text-[#111110]" : "text-[#6B6A67]"}`}>{name}</p>
              <p className="text-[8.5px] text-[#ADADAA]">{tag}</p>
            </div>
            <div className={`ml-auto w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 ${selected ? "bg-[#111110] border-[#111110]" : "border-[#D0D0CE]"}`}>
              {selected && <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
            </div>
          </div>
        ))}
      </div>

      {/* Right panel — compose */}
      <div className="flex-1 bg-white flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[#F0F0EE]">
          <p className="text-[12px] font-semibold text-[#111110] tracking-[-0.01em] flex-1">{m.newMessage}</p>
          <div className="flex gap-1.5">
            <div className="w-5 h-5 rounded-md bg-[#F4F4F2] flex items-center justify-center">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#6B6A67" strokeWidth="2" strokeLinecap="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
            </div>
            <div className="w-5 h-5 rounded-md bg-[#F4F4F2] flex items-center justify-center">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#6B6A67" strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </div>
          </div>
        </div>

        {/* Fields */}
        <div className="flex flex-col divide-y divide-[#F4F4F2]">
          {fields.map(({ label, value }) => (
            <div key={label} className="flex items-center gap-3 px-4 py-2">
              <span className="text-[9.5px] text-[#ADADAA] w-10 shrink-0">{label}</span>
              <span className="text-[10.5px] text-[#111110] truncate">{value}</span>
            </div>
          ))}
        </div>

        {/* Viewing Room attachment */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.35 }}
          className="mx-4 mt-3 rounded-xl bg-[#F7F7F5] border border-[#EBEBEA] overflow-hidden"
        >
          {/* OVR preview image strip */}
          <div className="flex gap-px h-16 bg-[#E8E8E6]">
            {[0.15, 0.25, 0.2, 0.4].map((o, i) => (
              <div key={i} className="flex-1 bg-[#D4D4D0]" style={{ opacity: o + 0.5 }} />
            ))}
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5">
            <div className="w-7 h-7 rounded-lg bg-white border border-[#E8E8E6] flex items-center justify-center shrink-0 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#6B6A67" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10.5px] font-medium text-[#111110] leading-tight">Private Viewing · Spring 2026</p>
              <p className="text-[9px] text-[#ADADAA] mt-0.5">4 {isFr ? "œuvres" : "works"} — galerie-fontaine.com</p>
            </div>
            <div className="text-[8.5px] px-2 py-1 rounded-full bg-[#111110] text-white font-medium shrink-0">
              {isFr ? "Voir" : "View"}
            </div>
          </div>
        </motion.div>

        {/* Body lines */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="mx-4 mt-3 flex flex-col gap-[6px]"
        >
          <div className="h-[6px] rounded-full bg-[#F0F0EE] w-[88%]" />
          <div className="h-[6px] rounded-full bg-[#F0F0EE] w-[72%]" />
          <div className="h-[6px] rounded-full bg-[#F0F0EE] w-[48%]" />
        </motion.div>

        {/* Send bar */}
        <div className="flex items-center justify-between px-4 py-3 mt-auto border-t border-[#F0F0EE]">
          <motion.button
            className="flex items-center gap-1.5 text-[10.5px] px-4 py-[7px] rounded-full bg-[#111110] text-white font-medium tracking-[-0.01em]"
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.span key="sent" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1.5">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {m.sent}
                </motion.span>
              ) : (
                <motion.span key="send" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{m.send}</motion.span>
              )}
            </AnimatePresence>
          </motion.button>
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-md bg-[#F4F4F2] flex items-center justify-center">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#6B6A67" strokeWidth="2" strokeLinecap="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
            </div>
            <span className="text-[9px] text-[#ADADAA]">{m.recipientsCount}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const MOCKS = [AdminMock, LiveSiteMock, ShareMock];

const STEP_POSITIONS: React.CSSProperties[] = [
  { top: 60, right: "calc(22% - 140px)" },
  { bottom: 60, left: "calc(22% - 140px)" },
  { top: 60, left: "calc(22% - 140px)" },
];

export default function Showcase() {
  const { t } = useLang();
  const stepData = t.stepper.steps;

  const [active, setActive] = useState(0);
  const [revealed, setRevealed] = useState<Set<number>>(new Set([0]));

  const advance = useCallback(() => {
    setActive((prev) => {
      const next = (prev + 1) % MOCKS.length;
      if (next === 0) {
        setRevealed(new Set([0]));
      } else {
        setRevealed((r) => new Set([...r, next]));
      }
      return next;
    });
  }, []);

  useEffect(() => {
    const id = setInterval(advance, INTERVAL);
    return () => clearInterval(id);
  }, [advance]);

  const Mock = MOCKS[active];

  return (
    <section id="blog" className="pt-12 md:pt-[60px] pb-12 md:pb-[60px] px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col gap-4 md:gap-[48px]">
        <motion.div {...fadeUp(0)}>
          <h2 className="font-display text-[20px] md:text-[26px] font-normal text-[#111110] leading-[1.2] tracking-[-0.02em] max-w-2xl">
            {t.showcase.title}
          </h2>
          <p className="mt-0 mb-0 text-[20px] md:text-[26px] text-[#6B6A67] font-normal max-w-5xl leading-[1.2] tracking-[-0.02em]">
            {t.showcase.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease }}
          className="rounded overflow-hidden relative"
          style={{ border: "0.1px solid #D4D4D0" }}
        >
          <div className="relative overflow-hidden h-[500px] md:h-[720px]">
            <div
              className="absolute inset-0 bg-cover"
              style={{ backgroundImage: `url('${bgImage}')`, backgroundPosition: "25% center" }}
            />

            <div
              className="absolute bg-white rounded overflow-hidden top-6 bottom-6 left-[4%] right-[4%] md:top-[70px] md:bottom-[70px] md:left-[22%] md:right-[22%]"
              style={{
                zIndex: 10,
                boxShadow: "0 8px 40px rgba(0,0,0,0.14)",
              }}
            >
              <AnimatePresence mode="sync">
                <motion.div
                  key={active}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 1 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0"
                >
                  <Mock />
                </motion.div>
              </AnimatePresence>
            </div>

            {stepData.map((step, i) => {
              const isActive = active === i;
              const isRevealed = revealed.has(i);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: isRevealed ? 1 : 0,
                    scale: isRevealed ? 1 : 0.9,
                    boxShadow: isActive
                      ? "0 8px 32px rgba(0,0,0,0.16)"
                      : "0 2px 10px rgba(0,0,0,0.06)",
                  }}
                  transition={{ duration: 0.4, ease }}
                  className="hidden md:block absolute bg-white rounded-xl px-5 py-3"
                  style={{ ...STEP_POSITIONS[i], zIndex: 20, width: 300 }}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-colors duration-300 ${
                        isActive ? "bg-[#111110] text-white" : "bg-[#F0F0EE] text-[#111110]"
                      }`}
                    >
                      {i + 1}
                    </div>
                    <span className="text-[14px] font-medium leading-tight text-[#111110]">
                      {step.title}
                    </span>
                  </div>
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: isRevealed ? 1 : 0, height: isRevealed ? "auto" : 0 }}
                    transition={{ duration: 0.35, delay: isRevealed ? 0.15 : 0 }}
                    className="text-[12px] text-[#6B6A67] leading-[1.5] mt-1.5 pl-[38px] overflow-hidden truncate"
                  >
                    {step.desc}
                  </motion.p>
                </motion.div>
              );
            })}
          </div>

          <div className="block md:hidden px-[15px] py-4" style={{ borderTop: "0.5px solid #E8E8E6" }}>
            {stepData.map((step, i) => {
              const isActive = active === i;
              return (
                <div key={i} className={`flex items-start gap-3 py-3 ${i > 0 ? "border-t border-[#F4F4F2]" : ""}`}>
                  <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold mt-0.5 transition-colors duration-300 ${isActive ? "bg-[#111110] text-white" : "bg-[#F0F0EE] text-[#ADADAA]"}`}>
                    {i + 1}
                  </div>
                  <div>
                    <p className={`text-[13px] font-medium leading-tight transition-colors duration-300 ${isActive ? "text-[#111110]" : "text-[#ADADAA]"}`}>
                      {step.title}
                    </p>
                    {isActive && (
                      <p className="text-[12px] text-[#6B6A67] leading-[1.45] mt-0.5">
                        {step.desc}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
