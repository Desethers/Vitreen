"use client";

import { useState } from "react";
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
];

function ArtistPageMock() {
  const [activeTab, setActiveTab] = useState<Tab>("Selected Works");

  return (
    <div className="w-full h-full flex flex-col bg-[#F5F0EB] text-[#111110] overflow-hidden select-none" style={{ fontFamily: "inherit" }}>
      {/* Top: photo + bio */}
      <div className="flex gap-3 px-4 pt-4 pb-3">
        {/* Photo */}
        <div className="w-[38%] shrink-0 rounded-[4px] overflow-hidden bg-[#B8B0A4]" style={{ aspectRatio: "3/4" }}>
          <img src="/artist page/sundog.png" alt="Sun Dog" className="w-full h-full object-cover object-top" />
        </div>
        {/* Bio */}
        <div className="flex flex-col gap-1.5 min-w-0 pt-0.5">
          <p className="text-[11px] font-semibold tracking-[-0.01em] leading-tight">Sun Dog</p>
          <p className="text-[8px] text-[#888] leading-tight">Born 1960, Oklahoma, USA — Lives and works in New York</p>
          <p className="text-[7.5px] text-[#555] leading-[1.55] mt-0.5 line-clamp-5">
            Sun Dog explores the boundaries of landscape and abstraction through a deeply personal visual vocabulary. His paintings, often rendered in rich, saturated color fields, evoke a contemplative stillness.
          </p>
          <button className="mt-1.5 self-start border border-[#C0B9B0] rounded-full px-2.5 py-[3px] text-[7px] tracking-[0.03em] text-[#444] hover:bg-[#EAE4DC] transition-colors">
            read full biography
          </button>
        </div>
      </div>

      {/* Divider + tabs */}
      <div className="border-t border-[#DDD8D0] mx-4" />
      <div className="flex items-center justify-between px-4 py-1.5">
        <p className="text-[7px] uppercase tracking-[0.1em] text-[#ADADAA] font-medium">Selected Works</p>
        <div className="flex gap-0.5">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className="px-2 py-1 rounded-full text-[7px] transition-colors"
              style={{
                background: activeTab === t ? "#111110" : "transparent",
                color: activeTab === t ? "#fff" : "#888",
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 pb-4 overflow-hidden">
        {activeTab === "Selected Works" && (
          <div className="grid grid-cols-3 gap-2 h-full">
            {artworks.map((src, i) => (
              <div
                key={i}
                className="rounded-[4px] overflow-hidden cursor-pointer hover:opacity-90 transition-opacity bg-[#E0DBD5]"
                style={{ minHeight: "60px" }}
              >
                <img src={src} alt={`Artwork ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}
        {activeTab === "Biography" && (
          <p className="text-[7.5px] text-[#555] leading-[1.6]">
            Sun Dog (born 1960 in Oklahoma) is an American painter known for his large-scale, meditative landscapes. His work has been exhibited internationally and is held in numerous public and private collections. He lives and works in New York City, where he maintains a studio in Brooklyn.
          </p>
        )}
        {activeTab === "Exhibitions" && (
          <div className="flex flex-col gap-2">
            {["Solo — Galerie Vitreen, Paris, 2024", "Group — Art Basel Miami Beach, 2023", "Solo — White Cube, London, 2022"].map((e) => (
              <div key={e} className="border-b border-[#DDD8D0] pb-1.5">
                <p className="text-[7.5px] text-[#333]">{e}</p>
              </div>
            ))}
          </div>
        )}
        {(activeTab === "News" || activeTab === "Press") && (
          <div className="flex flex-col gap-2">
            {["Artforum — February 2024", "The Art Newspaper — October 2023", "Frieze — September 2023"].map((n) => (
              <div key={n} className="border-b border-[#DDD8D0] pb-1.5">
                <p className="text-[7.5px] text-[#333]">{n}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ExhibitionMock() {
  return (
    <div className="flex gap-3 h-full">
      <div className="w-[45%] bg-[#1a1a2e] rounded-lg flex items-end p-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#111]/40 to-transparent" />
        <div className="w-5 h-5 rounded-full border border-white/40 flex items-center justify-center relative z-10">
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-2.5 py-1">
        <div>
          <p className="text-[11px] font-medium text-[#111110]">Untitled, 2018</p>
          <p className="text-[9px] text-[#ADADAA]">Acrylic on canvas</p>
          <p className="text-[9px] text-[#ADADAA]">220 × 120 cm</p>
        </div>
        <p className="text-[11px] font-medium text-[#111110]">$16,500</p>
        <div className="border border-[#E8E8E6] rounded-md py-1.5 text-center">
          <span className="text-[9px] uppercase tracking-[0.08em] text-[#111110]">Add to cart</span>
        </div>
        <p className="text-[8px] text-[#ADADAA] leading-[1.5] line-clamp-4">
          This monochromatic, large-scale painting explores color, surface, and minimalism. The paintings are not the centre of the discussion; rather, it is the relationship in which they are entwined.
        </p>
        <div className="mt-auto space-y-1.5">
          <div className="flex items-center justify-between border-t border-[#E8E8E6] pt-1.5">
            <span className="text-[8px] uppercase tracking-[0.08em] text-[#111110]">Shipping and taxes</span>
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#ADADAA" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
          </div>
          <div className="flex items-center justify-between border-t border-[#E8E8E6] pt-1.5">
            <span className="text-[8px] uppercase tracking-[0.08em] text-[#111110]">FAQ</span>
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#ADADAA" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
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
          <div className="px-4 py-[20px] h-full">
            <ExhibitionMock />
          </div>
        )}
      </div>
    </div>
  );

  const textCol = (
    <div className="flex flex-col justify-center px-8 md:px-10 py-10 md:py-12">
      <h3 className="font-display text-[22px] font-medium text-[#111110] tracking-[-0.02em] mb-3">
        {title}
      </h3>
      <p className="text-[#6B6A67] text-[22px] font-normal leading-[1.3] tracking-[-0.02em]">
        {desc}
      </p>
    </div>
  );

  return (
    <motion.div
      {...fadeUp(delay)}
      className="rounded-2xl overflow-hidden bg-[#FAF6F5]"
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
