"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

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
  "Sun Dog (né en 1960 à Oklahoma City, Oklahoma) est un peintre américain reconnu pour ses paysages méditatifs à grande échelle. Formé à la peinture figurative à l'Art Students League de New York, il développe rapidement un langage visuel personnel, oscillant entre représentation et abstraction pure.",
  "Son œuvre prend racine dans la contemplation de la nature — ciels vastess, horizons lumineux, arbres solitaires — qu'il distille en champs de couleur saturés, denses et silencieux. Travaillant principalement à l'huile sur toile, Sun Dog construit ses tableaux par couches successives de pigments, laissant parfois transparaître les strates sous-jacentes comme autant de traces du temps.",
  "Ses expositions personnelles se sont tenues dans des galeries majeures à New York, Los Angeles, Paris et Berlin. Ses œuvres figurent dans de nombreuses collections publiques et privées, notamment au Whitney Museum of American Art, au Musée d'Art Moderne de Paris, et dans plusieurs fondations européennes dédiées à la peinture contemporaine.",
  "En 2008, il reçoit le Prix de la Fondation Pollock-Krasner, récompense majeure du monde de l'art américain. En 2015, une rétrospective lui est consacrée à la Fondation Beyeler à Bâle, rassemblant plus de 80 œuvres couvrant trente ans de pratique.",
  "Sun Dog vit et travaille à Brooklyn, New York, dans un atelier qu'il occupe depuis 1994.",
];

function ArtistPageMock({ isMobile = false }: { isMobile?: boolean }) {
  const [activeTab, setActiveTab] = useState<Tab>("Selected Works");
  const [bioOpen, setBioOpen] = useState(false);
  const artistScrollRef = useRef<HTMLDivElement>(null);
  const [artistScrolled, setArtistScrolled] = useState(true);

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
      <div className="font-sans text-[#111110]" style={{ zoom: 0.58 }}>
        {/* Mobile nav */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 rounded-t-[8px]"
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
          <div className="bg-[#C8C0B8] relative rounded-[10px] overflow-hidden" style={{ height: 300 }}>
            <Image src="/artist page/sundog.png" alt="Sun Dog" fill className="object-cover object-top" sizes="600px" />
          </div>
        </div>
        {/* Body */}
        <div className="px-5 pt-5 pb-10">
          <h1 className="text-[28px] font-normal tracking-[-0.03em] leading-[1.1] mb-1">Sun Dog</h1>
          <p className="text-[12px] text-[#888] mb-4">Born 1960, Oklahoma, USA — Lives and works in New York</p>
          <p className="text-[13px] text-[#444] leading-[1.65] mb-1">
            Sun Dog explores the boundaries of landscape and abstraction through a deeply personal visual vocabulary.
          </p>
          <button
            onClick={() => setBioOpen(true)}
            className="mt-3 mb-6 text-[12px] text-[#555] underline underline-offset-2"
          >
            read full biography
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
                  <div className="rounded-[6px] overflow-hidden bg-[#E8E4DF] relative" style={{ height: 240 }}>
                    <Image src={src} alt={artworkMeta[i].title} fill className="object-cover" sizes="600px" />
                  </div>
                  <p className="text-[11px] text-[#888]">Sun Dog</p>
                  <p className="text-[13px]"><span className="font-semibold">{artworkMeta[i].title},</span>{" "}<span className="text-[#555]">{artworkMeta[i].year}</span></p>
                  <p className="text-[11px] text-[#888] italic">{artworkMeta[i].medium}</p>
                  <p className="text-[11px] text-[#888]">{artworkMeta[i].dims}</p>
                </div>
              ))}
            </div>
          )}
          {activeTab === "Biography" && (
            <p className="text-[13px] text-[#444] leading-[1.7]">
              Sun Dog (born 1960 in Oklahoma) is an American painter known for his large-scale, meditative landscapes. His work has been exhibited internationally and is held in numerous public and private collections.
            </p>
          )}
          {activeTab === "Exhibitions" && (
            <div className="flex flex-col gap-5">
              {[
                { img: "/artist page/exhibition5.jpg", title: "Recent Studies", location: "Paris, Turenne", dates: "Jan 12 — Feb 22, 2026" },
                { img: "/artist page/Exhibition6.png", title: "Your friends", location: "London", dates: "Oct 05 — Nov 28, 2025" },
              ].map((e) => (
                <div key={e.title} className="flex flex-col gap-2">
                  <div className="rounded-[6px] overflow-hidden bg-[#E8E4DF] relative" style={{ height: 200 }}>
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
            className="bg-white rounded-[10px] w-full overflow-y-auto"
            style={{ maxWidth: 380, maxHeight: "88%", padding: "22px 22px 28px", scrollbarWidth: "none" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-[15px] font-semibold text-[#111110] leading-tight">Sun Dog</h2>
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
              {bioText.map((p, i) => (
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
              borderRadius: artistScrolled ? "18px" : "0",
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
          <div className="w-[300px] shrink-0 rounded-[6px] overflow-hidden bg-[#C8C0B8] relative" style={{ height: 390 }}>
            <Image src="/artist page/sundog.png" alt="Sun Dog" fill className="object-cover object-top" sizes="300px" />
          </div>
          <div className="flex flex-col gap-3 pt-2 min-w-0">
            <h1 className="text-[38px] font-normal tracking-[-0.03em] leading-[1.1]">Sun Dog</h1>
            <p className="text-[13px] text-[#888]">Born 1960, Oklahoma, USA — Lives and works in New York</p>
            <p className="text-[14px] text-[#444] leading-[1.65] max-w-[520px] mt-1">
              Sun Dog explores the boundaries of landscape and abstraction through a deeply personal visual vocabulary. His paintings, often rendered in rich, saturated color fields, evoke a contemplative stillness that hovers between representation and pure sensation.
            </p>
            <p className="text-[14px] text-[#444] leading-[1.65] max-w-[520px]">
              Working primarily with oil on canvas, his practice distills nature into its most essential forms — solitary trees, expansive skies, and luminous horizons emerge from layers of pigment with an almost meditative quality.
            </p>
            <button
              onClick={() => setBioOpen(true)}
              className="mt-2 self-start border border-[#C8C0B8] rounded-full px-5 py-2 text-[13px] text-[#333] hover:bg-[#F5F0EB] transition-colors"
            >
              read full biography
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
                  <div className="rounded-[6px] overflow-hidden bg-[#E8E4DF] relative" style={{ height: 260 }}>
                    <Image src={src} alt={artworkMeta[i].title} fill className="object-cover group-hover:opacity-90 transition-opacity" sizes="300px" />
                  </div>
                  <p className="text-[12px] text-[#888]">Sun Dog</p>
                  <p className="text-[13px]">
                    <span className="font-semibold">{artworkMeta[i].title},</span>{" "}
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
              Sun Dog (born 1960 in Oklahoma) is an American painter known for his large-scale, meditative landscapes. His work has been exhibited internationally and is held in numerous public and private collections. He lives and works in New York City, where he maintains a studio in Brooklyn.
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
                  <div className="rounded-[6px] overflow-hidden bg-[#E8E4DF] relative" style={{ height: 260 }}>
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

function ExhibitionPageMock({ isMobile = false }: { isMobile?: boolean }) {
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
      <div className="font-sans text-[#111110]" style={{ zoom: 0.58 }}>
        {/* Mobile nav */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 rounded-t-[8px]"
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
        <div className="px-5 pt-6 pb-10">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#ADADAA] mb-4">
            <span className="text-[#555] underline underline-offset-2">Exhibitions</span>{" — "}Your friends
          </p>
          <h1 className="text-[26px] font-normal tracking-[-0.03em] leading-[1.1] mb-6">
            Sun Dog — <em>Your friends</em>
          </h1>
          <div className="flex flex-col gap-3 mb-6 pb-6" style={{ borderBottom: "0.5px solid rgba(0,0,0,0.08)" }}>
            <div><p className="text-[10px] uppercase tracking-[0.1em] text-[#ADADAA]">Artist</p><p className="text-[13px] font-medium text-[#111110]">Sun Dog</p></div>
            <div><p className="text-[10px] uppercase tracking-[0.1em] text-[#ADADAA]">Dates</p><p className="text-[13px] text-[#333]">Feb 12 — Mar 22, 2026</p></div>
            <div><p className="text-[10px] uppercase tracking-[0.1em] text-[#ADADAA]">Location</p><p className="text-[13px] text-[#333]">Galerie, Paris — Turenne</p></div>
          </div>
          <div className="flex flex-col gap-2 mb-7">
            <button className="bg-[#111110] text-white rounded-full px-5 py-3 text-[12px] text-center w-full">Artwork Inquiry</button>
            <button className="border border-[#D8D4CF] text-[#333] rounded-full px-5 py-3 text-[12px] text-center w-full">View artist</button>
          </div>
          <div className="rounded-[10px] overflow-hidden bg-[#E8E4DF] mb-6" style={{ height: 300 }}>
            <img src="/exhibition page/Exhibition2.png" alt="Installation view" className="w-full h-full object-cover" />
          </div>
          <p className="text-[14px] text-[#333] leading-[1.7] mb-3">
            A presentation of recent paintings and works on paper exploring friendship, memory, and shared light.
          </p>
          <p className="text-[14px] text-[#888] leading-[1.7] mb-10">
            Private viewing and availability: contact the gallery.
          </p>

          {/* Selected Works */}
          <p className="text-[10px] uppercase tracking-[0.14em] text-[#ADADAA] mb-5">Selected Works</p>
          <div className="flex flex-col gap-6">
            {[
              { title: "Untitled (Blue)", year: "2025", medium: "Acrylic on canvas", size: "120 × 120 cm", img: "/exhibition page/portrait2.jpg" },
              { title: "Untitled (Lavender)", year: "2024", medium: "Oil on canvas", size: "100 × 80 cm", img: "/exhibition page/painting-02.png" },
            ].map((work) => (
              <div key={work.title} className="flex flex-col gap-2">
                <div className="rounded-[10px] overflow-hidden bg-[#E8E4DF]" style={{ height: 260 }}>
                  <img src={work.img} alt={work.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-0.5">
                    <p className="text-[13px] font-medium text-[#111110]">{work.title}, {work.year}</p>
                    <p className="text-[12px] text-[#888] italic">{work.medium}</p>
                    <p className="text-[12px] text-[#888]">{work.size}</p>
                  </div>
                  <button className="border border-[#D8D4CF] rounded-[4px] px-6 py-1.5 text-[12px] text-[#111110] shrink-0">Inquire</button>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-[12px] text-[#ADADAA] underline underline-offset-2 cursor-pointer text-center pb-4">All exhibitions</p>
        </div>
      </div>
    </div>
  );

  return (
    <div ref={scrollRef} className="w-full h-full overflow-y-auto bg-white relative" style={{ scrollbarWidth: "none" }}>
      <div
        className="font-sans text-[#111110]"
        style={{ zoom: 0.58 }}
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
              borderRadius: scrolled ? "18px" : "0",
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
            <p className="text-[10px] uppercase tracking-[0.12em] text-[#ADADAA]">
              <span className="text-[#555] underline underline-offset-2">Exhibitions</span>
              {" — "}Your friends
            </p>
            <div className="flex flex-col gap-1">
              <p className="text-[10px] uppercase tracking-[0.1em] text-[#ADADAA]">Artist</p>
              <p className="text-[13px] font-medium text-[#111110] underline underline-offset-2 cursor-pointer">Sun Dog</p>
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
            <h1 className="text-[34px] font-normal tracking-[-0.03em] leading-[1.1] mb-5">
              Sun Dog — <em>Your friends</em>
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
        <div className="mx-10 rounded-[10px] overflow-hidden bg-[#E8E4DF]" style={{ height: 440 }}>
          <img
            src="/exhibition page/Exhibition2.png"
            alt="Installation view — cool room"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="mx-10 mt-2 text-[11px] text-[#ADADAA] italic">
          Installation view, Sun Dog : <em>Your friends</em>, Galerie, Paris, 2026
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
        <div className="mx-10 mt-10 rounded-[10px] overflow-hidden bg-[#E8E4DF] relative" style={{ height: 440 }}>
          <Image
            src="/exhibition page/painting-02.png"
            alt="Sun Dog — Untitled (Yellow)"
            fill
            className="object-contain"
            sizes="900px"
          />
        </div>
        <p className="mx-10 mt-2 text-[11px] text-[#ADADAA] italic">
          Installation view, Sun Dog : <em>Your friends</em>, Galerie, Paris, 2026
        </p>

        {/* Artwork detail */}
        <div className="mx-10 mt-14 pb-14 flex gap-8">
          <div className="w-[50%] shrink-0 flex flex-col gap-2">
            <div className="rounded-[6px] overflow-hidden bg-[#E8E4DF] relative" style={{ height: 440 }}>
              <Image src="/exhibition page/portrait2.jpg" alt="Sun Dog — Untitled (Blue), 2025" fill className="object-cover" sizes="500px" />
            </div>
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-0.5">
                <p className="text-[12px] text-[#888]">Sun Dog</p>
                <p className="text-[13px] font-medium text-[#111110]">Untitled, 2025</p>
                <p className="text-[12px] text-[#888] italic">Acrylic on canvas</p>
                <p className="text-[12px] text-[#888]">120 × 120 cm</p>
              </div>
              <button className="border border-[#D8D4CF] rounded-[4px] px-8 py-1.5 text-[12px] text-[#111110] shrink-0 transition-colors duration-150 hover:border-[#111110] hover:text-[#111110]">
                Inquire
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center py-2 flex-1">
            <blockquote className="text-[15px] italic text-[#999] leading-[1.7] max-w-[280px] text-center transition-colors duration-200 hover:text-[#111110] cursor-default">
              &ldquo;Shared light is the simplest form of friendship—what falls on the wall falls on us both.&rdquo;
              <footer className="mt-3 text-[10px] uppercase tracking-[0.12em] text-[#ADADAA] not-italic">Sun Dog</footer>
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
              className="bg-white rounded-[10px] overflow-y-auto shadow-2xl"
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
              <h2 className="text-[18px] font-normal tracking-[-0.02em] text-[#111110] mb-5">
                Sun Dog — <em>Your friends</em>
              </h2>
              <div className="flex flex-col gap-4" style={{ fontSize: 13, color: "#555", lineHeight: 1.75 }}>
                <p>The works gathered in <em>Your friends</em> do not announce themselves. They arrive quietly — through colour, through stillness, through the peculiar way light describes a surface without explaining it.</p>
                <p>Sun Dog has spent the last three years returning to the same question: what remains of a landscape once it has been absorbed into the body? The paintings in this exhibition are not records of places. They are the residue of looking — the sensation that persists after the eye has moved on.</p>
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
  const PAD_H = 80;
  const PAD_V = 45;

  // Set initial width from parent — height is CSS-driven (top/bottom: PAD_V)
  useEffect(() => {
    const parent = containerRef.current?.parentElement;
    if (!parent) return;
    const parentW = parent.offsetWidth;
    parentWRef.current = parentW;
    const maxMockW = parentW - 2 * PAD_H;
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
      className="z-10 bg-white rounded-[10px] shadow-2xl select-none overflow-hidden isolate"
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
        className="absolute top-0 left-0 right-0 z-30 flex items-center justify-center cursor-grab active:cursor-grabbing rounded-t-[8px]"
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
}: {
  title: string;
  desc: string;
  reverse?: boolean;
  delay?: number;
  mockImage?: string;
  mockScale?: number;
}) {
  const imageCol = (
    <div className="relative overflow-hidden min-h-[720px]">
      <div
        className="absolute inset-[20px] rounded-[10px] bg-cover bg-center"
        style={{ backgroundImage: "url('/colin de land.jpg')" }}
      />
      <DraggableMockWindow initialWidthPct={mockScale * 85}>
        {(widthPx) => mockImage === "/artist page.png" ? (
          <ArtistPageMock isMobile={widthPx < 500} />
        ) : mockImage ? (
          <div className="w-full h-full p-[20px]">
            <div className="relative w-full h-full">
              <Image src={mockImage} alt={title} fill className="object-cover object-top" sizes="700px" />
            </div>
          </div>
        ) : (
          <ExhibitionPageMock isMobile={widthPx < 500} />
        )}
      </DraggableMockWindow>
    </div>
  );

  const textCol = (
    <div className="flex flex-col justify-center px-8 md:px-10 py-10 md:py-12 gap-3">
      <h3 className="font-display text-[18px] font-medium text-[#111110] tracking-[-0.02em] m-0">
        {title}
      </h3>
      <p className="text-[#6B6A67] text-[18px] font-normal leading-[1.3] tracking-[-0.02em] m-0">
        <ShowcaseDescText text={desc} />
      </p>
    </div>
  );

  return (
    <motion.div
      {...fadeUp(delay)}
      className="rounded-[10px] overflow-hidden bg-[#F9FAFD]"
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

export default function Showcase() {
  return (
    <section id="blog" className="pt-20 pb-6 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col gap-[96px]">
        <motion.div {...fadeUp(0)} className="-mb-12">
          <h2 className="font-display text-[26px] font-normal text-[#111110] leading-[1.2] tracking-[-0.02em] max-w-2xl">
            Des interfaces conçues pour l&apos;économie de l&apos;art.
          </h2>
          <p
            className="mt-0.5 mb-0 text-[#6B6A67] font-normal max-w-5xl leading-[1.2] tracking-[-0.02em]"
            style={{ fontSize: "clamp(0.9375rem, 1.05vw + 0.72rem, 1.625rem)" }}
          >
            <span className="block min-[480px]:whitespace-nowrap">
              Galeries, artistes, advisors ou collections privées{"\u202F"}:
            </span>
            <span className="block">
              publiez et diffusez vos œuvres simplement.
            </span>
          </p>
        </motion.div>

        <ShowcaseCard
          title="Exhibition Pages"
          desc="Des pages d'exposition claires et structurées : avec textes, images et liste d'œuvres."
          delay={0}
          mockScale={0.9}
        />
        <ShowcaseCard
          title="Artist Pages"
          desc="Pages artistes complètes : biographie, œuvres et expositions réunies."
          mockImage="/artist page.png"
          reverse
          delay={0.1}
          mockScale={0.9}
        />
      </div>
    </section>
  );
}
