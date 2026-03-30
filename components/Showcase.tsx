"use client";

import { useState, useRef, useEffect } from "react";
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

function ArtistPageMock() {
  const [activeTab, setActiveTab] = useState<Tab>("Selected Works");
  const [bioOpen, setBioOpen] = useState(false);

  return (
    /* Outer container — scrollable, position:relative for modal */
    <div className="w-full h-full overflow-y-auto overflow-x-hidden bg-white relative" style={{ scrollbarWidth: "none" }}>

      {/* Biography modal — renders outside zoom */}
      {bioOpen && (
        <div
          className="absolute inset-0 z-50 flex items-start justify-center"
          style={{ background: "rgba(0,0,0,0.35)", paddingTop: 24, paddingLeft: 16, paddingRight: 16 }}
          onClick={() => setBioOpen(false)}
        >
          <div
            className="bg-white rounded-2xl w-full overflow-y-auto"
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
        {/* Hero: photo + bio */}
        <div className="flex gap-12 px-12 pt-10 pb-8">
          <div className="w-[300px] shrink-0 rounded-[6px] overflow-hidden bg-[#C8C0B8]" style={{ height: 390 }}>
            <img src="/artist page/sundog.png" alt="Sun Dog" className="w-full h-full object-cover object-top" />
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
                  <div className="rounded-[6px] overflow-hidden bg-[#E8E4DF]" style={{ height: 260 }}>
                    <img src={src} alt={artworkMeta[i].title} className="w-full h-full object-cover group-hover:opacity-90 transition-opacity" />
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
                { img: "/artist page/Exhibition2.png", title: "Recent Studies", location: "Paris, Turenne", dates: "Jan 12 — Feb 22, 2026" },
                { img: "/artist page/Exhibition6.png", title: "Your friends", location: "London", dates: "Oct 05 — Nov 28, 2025" },
                { img: "/artist page/Exhibition2.png", title: "Quiet Paintings", location: "New York", dates: "Mar 10 — Apr 30, 2025" },
              ].map((e) => (
                <div key={e.title} className="flex flex-col gap-2 cursor-pointer group">
                  <div className="rounded-[6px] overflow-hidden bg-[#E8E4DF]" style={{ height: 260 }}>
                    <img src={e.img} alt={e.title} className="w-full h-full object-cover group-hover:opacity-90 transition-opacity" />
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

function ExhibitionPageMock() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => setScrolled(el.scrollTop > 24);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

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
              style={{ fontSize: "0.78rem", letterSpacing: "0.15em", color: "#000" }}
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
            <h1 className="text-[42px] font-normal tracking-[-0.03em] leading-[1.1] mb-5">
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
        <div className="mx-10 rounded-[8px] overflow-hidden bg-[#E8E4DF]" style={{ height: 440 }}>
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
          <button className="mt-5 border border-[#D8D4CF] rounded-full px-6 py-2.5 text-[12px] text-[#333]">
            read full exhibition text
          </button>
        </div>

        {/* Installation view 2 */}
        <div className="mx-10 mt-10 rounded-[8px] overflow-hidden bg-[#E8E4DF]" style={{ height: 440 }}>
          <img
            src="/exhibition page/painting-02.png"
            alt="Sun Dog — Untitled (Yellow)"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="mx-10 mt-2 text-[11px] text-[#ADADAA] italic">
          Installation view, Sun Dog : <em>Your friends</em>, Galerie, Paris, 2026
        </p>

        {/* Artwork detail */}
        <div className="mx-10 mt-14 pb-14 flex gap-8">
          <div className="w-[50%] shrink-0 flex flex-col gap-2">
            <div className="rounded-[6px] overflow-hidden bg-[#E8E4DF]" style={{ height: 440 }}>
              <img src="/exhibition page/portrait2.jpg" alt="Sun Dog — Untitled (Blue), 2025" className="w-full h-full object-cover" />
            </div>
            <p className="text-[12px] text-[#888]">Sun Dog</p>
            <p className="text-[13px] font-medium text-[#111110]">Untitled, 2025</p>
            <p className="text-[12px] text-[#888] italic">Acrylic on canvas</p>
            <p className="text-[12px] text-[#888]">120 × 120 cm</p>
          </div>
          <div className="flex flex-col justify-between py-2 flex-1">
            <button className="border border-[#D8D4CF] rounded-[4px] px-6 py-2 text-[12px] text-[#111110] self-start">
              Inquire
            </button>
            <blockquote className="text-[15px] italic text-[#999] leading-[1.7] max-w-[280px]">
              &ldquo;Shared light is the simplest form of friendship—what falls on the wall falls on us both.&rdquo;
              <footer className="mt-3 text-[10px] uppercase tracking-[0.12em] text-[#ADADAA] not-italic">Sun Dog</footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShowcaseCard({
  title,
  desc,
  reverse = false,
  delay = 0,
  mockImage,
}: {
  title: string;
  desc: string;
  reverse?: boolean;
  delay?: number;
  mockImage?: string;
}) {
  const imageCol = (
    <div className="relative flex items-center justify-center overflow-hidden min-h-[480px] px-[10px] py-[50px]">
      <div
        className="absolute inset-[10px] rounded-[8px] bg-cover bg-center"
        style={{ backgroundImage: "url('/colin de land.jpg')", filter: "grayscale(100%)" }}
      />
      <div className="absolute inset-[10px] rounded-[8px] bg-[#FAF6F5]/20" />
      <div
        className="relative z-10 bg-white rounded-[8px] shadow-2xl overflow-hidden w-[85%]"
        style={{ aspectRatio: "766 / 523" }}
      >
        {mockImage === "/artist page.png" ? (
          <ArtistPageMock />
        ) : mockImage ? (
          <img src={mockImage} alt={title} className="w-full h-full object-cover object-top" />
        ) : (
          <ExhibitionPageMock />
        )}
      </div>
    </div>
  );

  const textCol = (
    <div className="flex flex-col justify-center px-8 md:px-10 py-10 md:py-12">
      <h3 className="font-display text-[18px] font-medium text-[#111110] tracking-[-0.02em] mb-3">
        {title}
      </h3>
      <p className="text-[#6B6A67] text-[18px] font-normal leading-[1.3] tracking-[-0.02em]">
        {desc}
      </p>
    </div>
  );

  return (
    <motion.div
      {...fadeUp(delay)}
      className="rounded-2xl overflow-hidden bg-[#F9FAFD]"
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
    <section className="pt-20 pb-6 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col gap-[30px]">
        <motion.div {...fadeUp(0)}>
          <h2 className="font-display text-[26px] font-normal text-[#111110] leading-[1.3] tracking-[-0.02em] max-w-2xl">
            Des interfaces pensées pour le monde de l&apos;art.
          </h2>
          <p className="mt-1 text-[#6B6A67] text-[26px] font-normal max-w-xl leading-[1.3] tracking-[-0.02em]">
            Galeries, artistes, advisors ou collections privées : publiez et diffusez vos œuvres simplement.
          </p>
        </motion.div>

        <ShowcaseCard
          title="Exhibition Pages"
          desc="Des pages d'exposition claires et structurées, avec textes, images et liste d'œuvres."
          delay={0}
        />
        <ShowcaseCard
          title="Artist Pages"
          desc="Pages artistes complètes. Biographie, œuvres et expositions réunies."
          mockImage="/artist page.png"
          reverse
          delay={0.1}
        />
      </div>
    </section>
  );
}
