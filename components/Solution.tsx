"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const ease = [0.16, 1, 0.3, 1] as const;

const row1 = [
  {
    title: "Exhibition Pages",
    desc: "Des pages d'exposition claires et structurées, avec textes, images et liste d'œuvres.",
    mock: "exhibition",
  },
  {
    title: "Artist Pages",
    desc: "Pages artistes complètes. Biographie, œuvres et expositions réunies.",
    mock: "artist",
  },
  {
    title: "Email Diffusion",
    desc: "Diffusion par email. Partagez facilement expositions et œuvres à vos contacts.",
    mock: "email",
  },
];

const row2 = [
  {
    title: "Online Inquire",
    desc: "Achat direct depuis la page œuvre.",
    mock: "artwork",
  },
  {
    title: "Private Viewing",
    desc: "Envoyez facilement une sélection à vos collectionneurs.",
    mock: "viewing",
  },
  {
    title: "Shareable moment",
    desc: "Contact direct depuis chaque œuvre.",
    mock: "inquiry",
  },
];

/* ── Fake UI mocks ── */

function ExhibitionMock() {
  return (
    <div className="flex gap-3 h-full">
      {/* Left: artwork image placeholder */}
      <div className="w-[45%] bg-[#1a1a2e] rounded-lg flex items-end p-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#111]/40 to-transparent" />
        <div className="w-5 h-5 rounded-full border border-white/40 flex items-center justify-center relative z-10">
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </div>
      </div>

      {/* Right: details */}
      <div className="flex-1 flex flex-col gap-2.5 py-1">
        <div>
          <p className="text-[11px] font-medium text-[#111110]">Untitled, 2018</p>
          <p className="text-[9px] text-[#ADADAA]">Acrylic on canvas</p>
          <p className="text-[9px] text-[#ADADAA]">220 × 120 cm</p>
        </div>
        <p className="text-[11px] font-medium text-[#111110]">$16,500</p>
        <div className="border border-[#E8E8E6] rounded-md py-1.5 text-center transition-all duration-500 delay-300 group-hover:bg-[#111110] group-hover:border-[#111110]">
          <span className="text-[9px] uppercase tracking-[0.08em] text-[#111110] transition-colors duration-500 delay-300 group-hover:text-white">Add to cart</span>
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

function ArtistMock() {
  return (
    <div className="flex flex-col h-full">
      {/* Hero: Artist photo + info side by side */}
      <div className="flex gap-3 mb-3">
        {/* Artist portrait — realistic with gradient layers */}
        <div className="w-[90px] h-[110px] rounded-lg shrink-0 overflow-hidden relative">
          {/* Sky */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#D4A070] via-[#C8956A] to-[#4A5568]" />
          {/* Horizon glow */}
          <div className="absolute bottom-[35%] left-0 right-0 h-[20%] bg-gradient-to-t from-[#E8B86D]/60 to-transparent" />
          {/* Silhouette - person shape */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[40px] h-[70px]">
            {/* Head */}
            <div className="w-[14px] h-[14px] rounded-full bg-[#2D3748] mx-auto" />
            {/* Cap */}
            <div className="w-[16px] h-[6px] bg-[#1A202C] mx-auto -mt-[5px] rounded-t-sm" />
            {/* Body */}
            <div className="w-[24px] h-[50px] bg-[#2D3748] mx-auto mt-[2px] rounded-t-md" />
          </div>
          {/* Power lines — subtle */}
          <div className="absolute top-[18%] left-0 right-0 h-px bg-[#1A202C]/20" />
          <div className="absolute top-[22%] left-0 right-0 h-px bg-[#1A202C]/15" />
        </div>

        {/* Artist info */}
        <div className="flex-1 flex flex-col gap-0.5 py-0.5 min-w-0">
          <p className="text-[12px] font-medium text-[#111110] tracking-[-0.01em]">Sun Dog</p>
          <p className="text-[7px] text-[#ADADAA] leading-[1.3]">Born 1960, Oklahoma, USA — Lives and works in New York</p>
          <div className="mt-1">
            <p className="text-[6.5px] text-[#6B6A67] leading-[1.45] line-clamp-4">
              Sun Dog explores the boundaries of landscape and abstraction through a deeply personal visual vocabulary. His paintings, often rendered in rich, saturated color fields, evoke a contemplative stillness.
            </p>
          </div>
          <div className="mt-auto border border-[#E8E8E6] rounded-md px-2.5 py-1 w-fit transition-all duration-500 delay-300 group-hover:bg-[#111110] group-hover:border-[#111110]">
            <span className="text-[7px] text-[#111110] transition-colors duration-500 delay-300 group-hover:text-white">read full biography</span>
          </div>
        </div>
      </div>

      {/* Tabs row — switches on hover */}
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-[7px] uppercase tracking-[0.1em] text-[#ADADAA] transition-opacity duration-500 group-hover:opacity-0">Selected Works</span>
        <span className="text-[7px] uppercase tracking-[0.1em] text-[#ADADAA] absolute transition-opacity duration-500 opacity-0 group-hover:opacity-100">Exhibitions</span>
        <div className="flex gap-1">
          {["Selected Works", "Exhibitions", "News", "Press", "Biography"].map((tab, i) => (
            <span
              key={tab}
              className={`text-[6.5px] px-1.5 py-0.5 rounded-full transition-all duration-500 ${
                i === 0
                  ? "bg-[#111110] text-white group-hover:bg-transparent group-hover:text-[#6B6A67] group-hover:border group-hover:border-[#E8E8E6]"
                  : i === 1
                  ? "border border-[#E8E8E6] text-[#6B6A67] group-hover:bg-[#111110] group-hover:text-white group-hover:border-[#111110]"
                  : "border border-[#E8E8E6] text-[#6B6A67]"
              }`}
            >
              {tab}
            </span>
          ))}
        </div>
      </div>

      {/* Content area — relative for stacking */}
      <div className="relative flex-1 min-h-0">
        {/* Selected Works — visible by default, hidden on hover */}
        <div className="absolute inset-0 grid grid-cols-3 gap-2 transition-all duration-500 opacity-100 group-hover:opacity-0 group-hover:translate-y-2">
          {[
            { gradient: "linear-gradient(180deg, #E8D020 0%, #E2C818 40%, #D4B810 100%)", title: "Untitled (Horizon)", year: "2024", dim: "152 × 122 cm" },
            { gradient: "linear-gradient(180deg, #C8D8F0 0%, #B0C4E8 50%, #A8BCE0 100%)", title: "Dawn Study No. 7", year: "2023", dim: "183 × 152 cm" },
            { gradient: "linear-gradient(180deg, #1a1a4e 0%, #141240 40%, #0E0E30 100%)", title: "Evening Field", year: "2023", dim: "122 × 91 cm" },
          ].map((work) => (
            <div key={work.title} className="flex flex-col gap-0.5">
              <div className="aspect-[4/5] rounded-md overflow-hidden relative" style={{ background: work.gradient }}>
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.1) 1px, rgba(0,0,0,0.1) 2px), repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(0,0,0,0.1) 1px, rgba(0,0,0,0.1) 2px)" }} />
              </div>
              <p className="text-[6px] text-[#ADADAA] mt-0.5">Sun Dog</p>
              <p className="text-[7px] text-[#111110] leading-tight font-medium">{work.title}, <span className="font-normal">{work.year}</span></p>
              <p className="text-[6px] text-[#ADADAA] italic">Oil on canvas</p>
            </div>
          ))}
        </div>

        {/* Exhibitions — hidden by default, visible on hover */}
        <div className="absolute inset-0 grid grid-cols-3 gap-2 transition-all duration-500 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
          {[
            {
              title: "Recent Studies",
              location: "Paris, Turenne",
              date: "Jan 12 — Feb 22, 2026",
              wall: "#F5F3F0",
              floor: "#9CA3AF",
              paintings: [{ color: "#4ADE80", w: "38%", h: "55%" }, { color: "#C8D8F0", w: "35%", h: "50%" }],
            },
            {
              title: "Your friends",
              location: "London",
              date: "Oct 05 — Nov 28, 2025",
              wall: "#F0EFED",
              floor: "#8B95A0",
              paintings: [{ color: "#1E40AF", w: "18%", h: "45%" }, { color: "#6B7C3F", w: "16%", h: "40%" }, { color: "#1A1A1A", w: "14%", h: "42%" }, { color: "#9CA3AF", w: "15%", h: "38%" }, { color: "#EA580C", w: "14%", h: "36%" }],
            },
            {
              title: "Quiet Paintings",
              location: "New York",
              date: "Mar 10 — Apr 30, 2025",
              wall: "#F5F3F0",
              floor: "#9CA3AF",
              paintings: [{ color: "#22D3EE", w: "35%", h: "52%" }, { color: "#D1FAE5", w: "32%", h: "48%" }],
            },
          ].map((expo) => (
            <div key={expo.title} className="flex flex-col gap-0.5">
              {/* Gallery room */}
              <div className="aspect-[4/3] rounded-md overflow-hidden relative" style={{ background: expo.wall }}>
                {/* Ceiling line */}
                <div className="absolute top-[8%] left-[10%] right-[10%] h-[2px] bg-white/60 rounded-full" />
                {/* Floor */}
                <div className="absolute bottom-0 left-0 right-0 h-[25%] rounded-b-md" style={{ background: `linear-gradient(180deg, ${expo.floor}40 0%, ${expo.floor}80 100%)` }} />
                {/* Paintings on wall */}
                <div className="absolute top-[15%] left-[5%] right-[5%] bottom-[28%] flex items-center justify-center gap-[4%]">
                  {expo.paintings.map((p, j) => (
                    <div key={j} className="rounded-sm shadow-sm" style={{ background: p.color, width: p.w, height: p.h }} />
                  ))}
                </div>
              </div>
              <p className="text-[7px] text-[#111110] font-medium mt-0.5">{expo.title}</p>
              <p className="text-[6px] text-[#ADADAA]">{expo.location} — {expo.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EmailMock() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="mb-3">
        <span className="text-[9px] uppercase tracking-[0.12em] text-[#ADADAA]">Artists</span>
      </div>

      {/* Grid of artist photos */}
      <div className="grid grid-cols-2 gap-2 flex-1">
        {[
          { name: "Artiste A 1", color: "#8B7355" },
          { name: "Artiste B 2", color: "#C4956A" },
          { name: "Artiste E 5", color: "#D4A534" },
          { name: "Artiste F 6", color: "#A08060" },
        ].map((artist) => (
          <div key={artist.name} className="flex flex-col gap-1.5">
            <div
              className="aspect-[4/5] rounded-lg"
              style={{ background: artist.color }}
            />
            <span className="text-[9px] text-[#111110]">{artist.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Step 2 row mocks */

type Artwork = {
  id: string;
  artist: string;
  title: string;
  year: string;
  medium: string;
  dimensions: string;
  image: string;
  slug: string;
};

const shareableMomentArtwork: Artwork = {
  id: "untitled-horizon",
  artist: "Sun Dog",
  title: "Untitled (Horizon)",
  year: "2024",
  medium: "Oil on canvas",
  dimensions: "152 × 122 cm",
  image: "/artworks/painting-02.png",
  slug: "/artwork/untitled-horizon",
};

function ShareIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19V5" />
      <path d="M7 10l5-5 5 5" />
      <path d="M5 21h14" />
    </svg>
  );
}

async function generateOGImage(artwork: Artwork) {
  // Mock: on génère une image carrée (1:1) en canvas.
  // Objectif: simuler un “artifact visuel” sans introduire d’UI supplémentaire.
  if (typeof window === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const w = canvas.width;
  const h = canvas.height;

  // Fond blanc + cadre très discret.
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = "rgba(17,17,16,0.06)";
  ctx.fillRect(96, 96, w - 192, h - 192);

  // Image artwork (si chargée) + overlay texte minimal.
  try {
    await new Promise<void>((resolve) => {
      // Évite le conflit avec l’import `Image` de `next/image`.
      const img = document.createElement("img");
      img.crossOrigin = "anonymous";
      img.onload = () => {
        // Cover: calcul simple pour “remplir” sans casser.
        const imgAR = img.width / img.height;
        const targetAR = w / h;
        let drawW = w;
        let drawH = h;
        if (imgAR > targetAR) {
          drawH = h;
          drawW = h * imgAR;
        } else {
          drawW = w;
          drawH = w / imgAR;
        }
        const dx = (w - drawW) / 2;
        const dy = (h - drawH) / 2;
        ctx.save();
        ctx.globalAlpha = 1;
        ctx.drawImage(img, dx, dy, drawW, drawH);
        ctx.restore();
        resolve();
      };
      img.onerror = () => resolve();
      img.src = artwork.image;
    });
  } catch {
    // Mock tolerant: même si l'image ne charge pas, on renvoie quand même.
  }

  ctx.fillStyle = "#111110";
  ctx.font = "bold 56px sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";

  // Texte overlay discret (bas).
  const padX = 96;
  const baseY = 900;
  ctx.fillText(artwork.artist.toUpperCase(), padX, baseY);

  ctx.font = "normal 42px sans-serif";
  ctx.fillText(`${artwork.title}`, padX, baseY + 70);

  ctx.font = "normal 36px sans-serif";
  ctx.fillStyle = "rgba(17,17,16,0.65)";
  ctx.fillText(artwork.year, padX, baseY + 120);

  return canvas.toDataURL("image/png");
}

async function handleShare(artwork: Artwork) {
  const shareUrl = window.location.origin + artwork.slug;

  // Mock OG image generation.
  await generateOGImage(artwork);

  // Deep link (best-effort).
  try {
    await navigator.clipboard.writeText(shareUrl);
  } catch {
    // Clipboard peut échouer (permissions). On garde quand même la trace.
  }

  console.log("Shared to Instagram:", shareUrl);
}

function ShareableMomentMock() {
  const rootRef = useRef<HTMLDivElement>(null);
  const imageShareBtnRef = useRef<HTMLButtonElement>(null);
  const panelShareBtnRef = useRef<HTMLButtonElement>(null);

  const [storyState, setStoryState] = useState<"sending" | "shared" | null>(null);
  const [token, setToken] = useState<null | { id: number; left: number; top: number; dx: number; dy: number }>(null);
  const [storyModalOpen, setStoryModalOpen] = useState(false);
  const [storyModalKey, setStoryModalKey] = useState(0);

  const closeStoryModal = useCallback(() => {
    setStoryModalOpen(false);
  }, []);

  useEffect(() => {
    if (!storyModalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeStoryModal();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const autoClose = window.setTimeout(() => closeStoryModal(), 6200);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      clearTimeout(autoClose);
    };
  }, [storyModalOpen, closeStoryModal]);

  const bubbleSize = 48;
  const bubbleTop = 12;
  const bubbleRight = 12;

  const triggerAnimation = (origin: "image" | "panel") => {
    const root = rootRef.current;
    const originEl = origin === "image" ? imageShareBtnRef.current : panelShareBtnRef.current;
    if (!root || !originEl) return;

    const rootRect = root.getBoundingClientRect();
    const iconRect = originEl.getBoundingClientRect();

    const left = iconRect.left - rootRect.left + iconRect.width / 2;
    const top = iconRect.top - rootRect.top + iconRect.height / 2;

    const targetX = rootRect.width - bubbleRight - bubbleSize / 2;
    const targetY = bubbleTop + bubbleSize / 2;

    const id = Date.now();
    setToken({ id, left, top, dx: targetX - left, dy: targetY - top });
    setStoryState("sending");

    window.setTimeout(() => setToken(null), 900);
    window.setTimeout(() => setStoryState("shared"), 650);
    window.setTimeout(() => setStoryState(null), 2300);
  };

  const onShare = async (origin: "image" | "panel") => {
    triggerAnimation(origin);
    setStoryModalKey((k) => k + 1);
    window.setTimeout(() => setStoryModalOpen(true), 120);
    await handleShare(shareableMomentArtwork);
  };

  return (
    <div ref={rootRef} className="relative flex h-full overflow-hidden" style={{ gap: 10 }}>
      {/* “Artwork view” mock */}
      <div className="relative shrink-0 h-full overflow-hidden group" style={{ width: "48%" }}>
        <Image
          src={shareableMomentArtwork.image}
          alt=""
          fill
          quality={92}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 50vw, 400px"
        />

        {/* Discret Share icon (hover image) */}
        <button
          ref={imageShareBtnRef}
          type="button"
          title="Share"
          onClick={(e) => {
            e.stopPropagation();
            void onShare("image");
          }}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{
            width: 26,
            height: 26,
            borderRadius: 9999,
            border: "1px solid #E8E8E6",
            background: "rgba(255,255,255,0.92)",
            color: "#111110",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <ShareIcon size={14} />
        </button>
      </div>

      <div className="flex-1 flex flex-col" style={{ gap: 8 }}>
        <div
          style={{
            padding: "16px 14px 12px",
            flex: "1 1 auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <p
            style={{
              fontSize: 9,
              fontWeight: 400,
              color: "#111110",
              marginBottom: 4,
              letterSpacing: "normal",
              textAlign: "left",
            }}
          >
            {shareableMomentArtwork.artist}
          </p>

          <p
            style={{
              fontSize: 12,
              fontWeight: 400,
              fontStyle: "italic",
              color: "#111110",
              marginBottom: 8,
              textAlign: "left",
              lineHeight: 1.12,
            }}
          >
            {shareableMomentArtwork.title},{" "}
            <span style={{ fontStyle: "normal", fontWeight: 400 }}>{shareableMomentArtwork.year}</span>
          </p>

          <p style={{ fontSize: 10, color: "#ADADAA", marginBottom: 2, textAlign: "left" }}>{shareableMomentArtwork.medium}</p>
          <p style={{ fontSize: 10, color: "#ADADAA", marginBottom: 22, textAlign: "left" }}>{shareableMomentArtwork.dimensions}</p>

          {/* Primary CTA */}
          <button
            type="button"
            className="rounded-full text-center"
            onClick={() => {
              // Mock: “Inquire” reste une action visuelle, sans nouvelle logique.
              console.log("Inquire:", shareableMomentArtwork.slug);
            }}
            style={{
              border: "0.1px solid #111110",
              background: "#fff",
              color: "#111110",
              padding: "6px 26px",
              fontSize: 10,
              fontWeight: 500,
              borderRadius: 5,
              width: "fit-content",
              alignSelf: "flex-start",
            }}
          >
            Inquire
          </button>

          {/* Secondary actions row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 20,
              fontWeight: 300,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#111110" }}>
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#111110"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1.5 12s4.5-7.5 10.5-7.5S22.5 12 22.5 12s-4.5 7.5-10.5 7.5S1.5 12 1.5 12Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <span style={{ fontSize: 10, color: "#111110", fontWeight: 300, whiteSpace: "nowrap", lineHeight: 1 }}>View in room</span>
            </div>

            <button
              ref={panelShareBtnRef}
              type="button"
              title="Share"
              onClick={(e) => {
                e.stopPropagation();
                void onShare("panel");
              }}
              className="transition-opacity"
              style={{
                border: "none",
                background: "transparent",
                padding: 0,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                color: "#111110",
              }}
            >
              <ShareIcon size={10} />
              <span style={{ fontSize: 9, color: "#111110", fontWeight: 400, whiteSpace: "nowrap", lineHeight: 1 }}>
                Share
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Instagram story mock */}
      {storyState && (
        <motion.div
          key="story-bubble"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="absolute"
          style={{
            top: bubbleTop,
            right: bubbleRight,
            width: bubbleSize,
            height: bubbleSize,
            borderRadius: 9999,
            border: "1px solid #E8E8E6",
            background: "rgba(255,255,255,0.95)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
          }}
        >
          {storyState === "sending" ? (
            <div style={{ width: 30, height: 30, borderRadius: 9999, background: "#111110", opacity: 0.08 }} />
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111110" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          )}
        </motion.div>
      )}

      {/* Icon token animating towards the story bubble */}
      {token && (
        <motion.div
          key={token.id}
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 0.85, x: token.dx, y: token.dy }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute",
            left: token.left,
            top: token.top,
            width: 26,
            height: 26,
            borderRadius: 9999,
            border: "1px solid rgba(232,232,230,0.9)",
            background: "rgba(255,255,255,0.96)",
            color: "#111110",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 60,
            pointerEvents: "none",
          }}
        >
          <ShareIcon size={14} />
        </motion.div>
      )}

      {/* Story Instagram — s'affiche dans le mock (position absolute inset-0) */}
      <AnimatePresence mode="wait">
        {storyModalOpen && (
          <motion.div
            key={storyModalKey}
            className="absolute inset-0 z-50 overflow-hidden bg-black"
            style={{ borderRadius: "inherit" }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={closeStoryModal}
          >
            {/* ── Image full-bleed (absolute → pas de collapse flex) ── */}
            <div className="absolute inset-0">
              <Image
                src={shareableMomentArtwork.image}
                alt=""
                fill
                className="object-cover object-center"
                sizes="(max-width: 600px) 600px, 800px"
                quality={95}
                priority
              />
            </div>

            {/* Dégradés */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.45) 100%)" }}
            />

            {/* ── Barres de progression ── */}
            <div className="absolute left-0 right-0 top-0 z-30 flex gap-[3px] px-2 pt-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={`${storyModalKey}-bar-${i}`}
                  className="h-[2px] flex-1 overflow-hidden rounded-full"
                  style={{ background: "rgba(255,255,255,0.28)" }}
                >
                  {i === 0 ? (
                    <motion.div
                      className="h-full rounded-full bg-white"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 5, ease: "linear" }}
                    />
                  ) : (
                    <div className="h-full w-0 rounded-full bg-white" />
                  )}
                </div>
              ))}
            </div>

            {/* ── Header : avatar + pseudo + fermer ── */}
            <div
              className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between px-2.5 pt-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex min-w-0 items-center gap-1.5">
                {/* Avatar avec halo Instagram */}
                <div
                  className="shrink-0 rounded-full p-[1.5px]"
                  style={{
                    background: "linear-gradient(45deg,#f9ce34,#ee2a7b,#6228d7)",
                    width: 26, height: 26,
                  }}
                >
                  <div
                    className="flex h-full w-full items-center justify-center rounded-full"
                    style={{ background: "#111", border: "1.5px solid #000" }}
                  >
                    <span style={{ fontSize: 8, fontWeight: 800, color: "#fff", letterSpacing: 0 }}>V</span>
                  </div>
                </div>
                <div className="min-w-0">
                  <p style={{ fontSize: 9, fontWeight: 600, color: "#fff", lineHeight: 1.2, textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}>
                    vitreen_studio
                  </p>
                  <p style={{ fontSize: 7.5, color: "rgba(255,255,255,0.65)", lineHeight: 1.2 }}>
                    Il y a 2 min
                  </p>
                </div>
              </div>
              {/* Actions header */}
              <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  style={{
                    width: 22, height: 22, borderRadius: 9999,
                    background: "rgba(0,0,0,0.3)", border: "none",
                    color: "#fff", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  {/* More (⋯) */}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/>
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={closeStoryModal}
                  style={{
                    width: 22, height: 22, borderRadius: 9999,
                    background: "rgba(0,0,0,0.3)", border: "none",
                    color: "#fff", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* ── Artwork card (slide-up depuis le bas) ── */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 z-30 px-2 pb-2"
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.22, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Card artwork */}
              <div
                className="overflow-hidden rounded-[10px]"
                style={{ background: "rgba(255,255,255,0.97)", backdropFilter: "blur(16px)" }}
              >
                <div className="flex gap-2.5 p-2.5">
                  {/* Thumbnail */}
                  <div className="relative shrink-0 overflow-hidden rounded-lg" style={{ width: 48, height: 56 }}>
                    <Image
                      src={shareableMomentArtwork.image}
                      alt=""
                      fill
                      className="object-cover object-center"
                      sizes="96px"
                      quality={90}
                    />
                  </div>

                  {/* Infos */}
                  <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
                    <div>
                      <p style={{ fontSize: 7.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "#ADADAA", lineHeight: 1.2, marginBottom: 2 }}>
                        {shareableMomentArtwork.artist}
                      </p>
                      <p style={{ fontSize: 10, fontWeight: 500, fontStyle: "italic", color: "#111110", lineHeight: 1.2 }}>
                        {shareableMomentArtwork.title},&nbsp;
                        <span style={{ fontStyle: "normal", fontWeight: 400 }}>{shareableMomentArtwork.year}</span>
                      </p>
                      <p style={{ fontSize: 7.5, color: "#6B6A67", lineHeight: 1.3, marginTop: 1 }}>
                        {shareableMomentArtwork.medium} · {shareableMomentArtwork.dimensions}
                      </p>
                    </div>
                    <div className="mt-1.5 flex items-center justify-between">
                      <span style={{ fontSize: 9.5, fontWeight: 600, color: "#111110" }}>Sur demande</span>
                      <span
                        style={{
                          borderRadius: 9999, background: "#111110", color: "#fff",
                          fontSize: 7, fontWeight: 700, letterSpacing: "0.1em",
                          textTransform: "uppercase", padding: "3px 9px", whiteSpace: "nowrap",
                        }}
                      >
                        Inquire
                      </span>
                    </div>
                  </div>
                </div>

                {/* Swipe up */}
                <div
                  className="flex items-center justify-center gap-1 py-1.5"
                  style={{ borderTop: "1px solid #F0F0EE" }}
                >
                  <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="#ADADAA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 19V5M5 12l7-7 7 7" />
                  </svg>
                  <span style={{ fontSize: 6.5, textTransform: "uppercase", letterSpacing: "0.14em", color: "#ADADAA" }}>
                    Swipe up to view
                  </span>
                </div>
              </div>

              {/* Reply bar façon Instagram */}
              <div
                className="mt-1.5 flex items-center gap-2 rounded-full px-3 py-1.5"
                style={{ background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.22)" }}
              >
                <div
                  className="shrink-0 rounded-full"
                  style={{ width: 18, height: 18, background: "rgba(255,255,255,0.25)" }}
                />
                <p style={{ fontSize: 8, color: "rgba(255,255,255,0.6)", flex: 1 }}>
                  Envoyer un message…
                </p>
                {/* Like + Share */}
                <div className="flex items-center gap-2">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ArtworkMock() {
  const [cartOpen, setCartOpen] = useState(false);
  const [addHover, setAddHover] = useState(false);

  // Animation loop: hover → open cart → close → replay
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    let cancelled = false;

    function play() {
      if (cancelled) return;
      // Reset
      setCartOpen(false);
      setAddHover(false);

      // t=800ms : hover sur le bouton
      timers.push(setTimeout(() => { if (!cancelled) setAddHover(true); }, 800));
      // t=1700ms : click → ouvre le volet
      timers.push(setTimeout(() => { if (!cancelled) { setCartOpen(true); setAddHover(false); } }, 1700));
      // t=4200ms : fermeture du volet
      timers.push(setTimeout(() => { if (!cancelled) setCartOpen(false); }, 4200));
      // t=5400ms : rejoue
      timers.push(setTimeout(() => { if (!cancelled) play(); }, 5400));
    }

    // Délai initial avant le premier play
    const init = setTimeout(play, 600);
    return () => {
      cancelled = true;
      clearTimeout(init);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="relative flex h-full overflow-hidden" style={{ gap: 10 }}>

      {/* LEFT — white wall + painting */}
      <div className="relative shrink-0 flex items-center justify-center transition-all duration-400"
        style={{ width: "48%", background: "#fff" }}>
        {cartOpen && <div className="absolute inset-0 bg-black/10 z-10 transition-opacity duration-400" />}
        <div style={{ width: "68%", height: "90%", background: "#1C1D2E", boxShadow: "2px 2px 16px rgba(0,0,0,0.18)" }} />
        <span className="absolute text-[#ADADAA] select-none" style={{ right: 5, fontSize: 11 }}>›</span>
      </div>

      {/* RIGHT — 3 stacked bordered cards */}
      <div className="flex-1 flex flex-col" style={{ gap: 5 }}>

        {/* Card 1 — main info */}
        <div style={{ border: "1px solid #E4E4E0", borderRadius: 7, padding: "10px 10px 8px", flex: "1 1 auto", display: "flex", flexDirection: "column" }}>
          <p style={{ fontSize: 10.5, fontWeight: 500, color: "#111110", marginBottom: 1 }}>Untitled, 2018</p>
          <p style={{ fontSize: 7.5, color: "#888", marginBottom: 0 }}>Acrylic on canvas</p>
          <p style={{ fontSize: 7.5, color: "#888", marginBottom: 8 }}>220 × 120 cm</p>
          <p style={{ fontSize: 10.5, fontWeight: 500, color: "#111110", marginBottom: 7 }}>$16,500</p>

          {/* Add to cart — cliquable */}
          <button
            onClick={() => setCartOpen(true)}
            onMouseEnter={() => setAddHover(true)}
            onMouseLeave={() => setAddHover(false)}
            style={{
              border: "0.5px solid #111110",
              borderRadius: 5,
              height: 24,
              marginBottom: 7,
              cursor: "pointer",
              background: addHover ? "#111110" : "transparent",
              transition: "background 0.2s",
              display: "flex", alignItems: "center", justifyContent: "center", width: "100%"
            }}
          >
            <span style={{ fontSize: 6.5, textTransform: "uppercase", letterSpacing: "0.12em", color: addHover ? "#fff" : "#111110", transition: "color 0.2s" }}>
              Add to cart
            </span>
          </button>

          <div style={{ height: 1, background: "#EEEEED", marginBottom: 7 }} />
          <p style={{ fontSize: 6.5, color: "#555", lineHeight: 1.6, marginBottom: 5 }} className="line-clamp-3">
            This monochromatic, large-scale painting explores color, surface, and minimalism.
          </p>
          <p style={{ fontSize: 6.5, color: "#555", lineHeight: 1.6, marginBottom: "auto" }} className="line-clamp-2">
            The paintings are not the centre of the discussion; rather, it is the relationship in which they are entwined.
          </p>
          <p style={{ fontSize: 6, color: "#ADADAA", lineHeight: 1.4, marginTop: 6 }}>
            Request details about shipping and availability through the contact form.
          </p>
        </div>

        {/* Card 2 — Shipping */}
        <div className="flex items-center justify-between" style={{ border: "1px solid #E4E4E0", borderRadius: 7, padding: "7px 10px", flexShrink: 0 }}>
          <span style={{ fontSize: 6.5, textTransform: "uppercase", letterSpacing: "0.1em", color: "#111110" }}>Shipping and taxes</span>
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#ADADAA" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
        </div>

        {/* Card 3 — FAQ */}
        <div className="flex items-center justify-between" style={{ border: "1px solid #E4E4E0", borderRadius: 7, padding: "7px 10px", flexShrink: 0 }}>
          <span style={{ fontSize: 6.5, textTransform: "uppercase", letterSpacing: "0.1em", color: "#111110" }}>FAQ</span>
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#ADADAA" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
        </div>
      </div>

      {/* CART PANEL — slide in from right */}
      <div
        className="absolute inset-y-0 right-0 bg-white flex flex-col"
        style={{
          width: "58%",
          borderLeft: "1px solid #E8E8E6",
          transform: cartOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.65s cubic-bezier(0.16,1,0.3,1)",
          padding: "10px 10px 8px",
          zIndex: 20,
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between" style={{ marginBottom: 6 }}>
          <div>
            <p style={{ fontSize: 6, textTransform: "uppercase", letterSpacing: "0.1em", color: "#888", marginBottom: 1 }}>Your selection</p>
            <p style={{ fontSize: 11, fontWeight: 500, color: "#111110" }}>1 piece</p>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="flex items-center justify-center"
            style={{ width: 16, height: 16, borderRadius: "50%", border: "1px solid #E4E4E0", background: "white", cursor: "pointer", flexShrink: 0 }}
          >
            <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Separator */}
        <div style={{ height: 1, background: "#EEEEED", marginBottom: 8 }} />

        {/* Item row */}
        <div className="flex items-start" style={{ gap: 7, marginBottom: "auto" }}>
          {/* Thumbnail */}
          <div style={{ width: 26, height: 32, background: "#1C1D2E", borderRadius: 3, flexShrink: 0 }} />
          {/* Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <p style={{ fontSize: 8, fontWeight: 600, color: "#111110" }}>Untitled, 2018</p>
              <p style={{ fontSize: 8, fontWeight: 600, color: "#111110" }}>$16 500</p>
            </div>
            <p style={{ fontSize: 6.5, color: "#888", marginTop: 1 }}>Acrylic on canvas</p>
            <p style={{ fontSize: 6.5, color: "#888" }}>220 × 120</p>
            <p style={{ fontSize: 6.5, color: "#ADADAA", marginTop: 3 }}>Remove</p>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: "auto" }}>
          <div style={{ height: 1, background: "#EEEEED", marginBottom: 6 }} />
          <div className="flex items-center justify-between" style={{ marginBottom: 7 }}>
            <span style={{ fontSize: 7.5, fontWeight: 500, color: "#111110" }}>Total</span>
            <span style={{ fontSize: 10, fontWeight: 500, color: "#111110" }}>$16 500</span>
          </div>
          {/* Proceed to checkout */}
          <div
            className="flex items-center justify-center transition-colors duration-200 hover:bg-[#2F4FE0]"
            style={{ background: "#111110", borderRadius: 5, height: 22, marginBottom: 5 }}
          >
            <span style={{ fontSize: 6, textTransform: "uppercase", letterSpacing: "0.12em", color: "#fff" }}>
              Proceed to checkout
            </span>
          </div>
          <div className="text-center" style={{ marginBottom: 5 }}>
            <span style={{ fontSize: 6, color: "#ADADAA" }}>Clear cart</span>
          </div>
          <p style={{ fontSize: 5.5, color: "#ADADAA", lineHeight: 1.4, textAlign: "center" }}>
            Secure payment via Stripe. The studio will confirm your commission within 2–3 days.
          </p>
        </div>
      </div>

    </div>
  );
}

const viewingArtworks = [
  { img: "/artworks/painting-10.jpg", artist: "Sun Dog", title: "Sun Dog 02", year: "2025", medium: "Acrylic on canvas", dims: "80 × 80 cm" },
  { img: "/artworks/painting-05.jpg", artist: "Sun Dog", title: "Night Garden IV", year: "2024", medium: "Oil on linen", dims: "120 × 90 cm" },
  { img: "/artworks/painting-06.png", artist: "Sun Dog", title: "Untitled (Bloom)", year: "2023", medium: "Watercolour", dims: "60 × 45 cm" },
  { img: "/artworks/painting-09.png", artist: "Sun Dog", title: "Soft Power I", year: "2025", medium: "Mixed media", dims: "100 × 100 cm" },
];

function ViewingMock() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="w-full h-full font-sans flex flex-col overflow-hidden text-[#111110]">
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#E8E8E6] shrink-0">
        <div className="flex items-center gap-1.5">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span className="font-medium" style={{ fontSize: "0.55rem", letterSpacing: "-0.01em" }}>Private Viewing</span>
        </div>
        <div className="flex items-center gap-2">
          <span style={{ fontSize: "0.38rem", color: "#ADADAA" }}>Expires Apr 10</span>
          <span className="uppercase tracking-[0.12em] font-medium" style={{ fontSize: "0.38rem" }}>Galerie</span>
        </div>
      </div>

      {/* Intro */}
      <div className="shrink-0 mb-3">
        <p className="uppercase tracking-[0.15em] text-[#ADADAA] mb-0.5" style={{ fontSize: "0.35rem" }}>Selection — Spring 2026</p>
        <p className="font-medium leading-snug" style={{ fontSize: "0.7rem" }}>A curated selection<br/>prepared for you.</p>
        <p className="mt-0.5 text-[#6B6A67] leading-relaxed" style={{ fontSize: "0.38rem" }}>
          4 works — available on request. Accessible only via your personal link.
        </p>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-hidden grid grid-cols-2 gap-x-3 gap-y-3 content-start">
        {viewingArtworks.map((aw, i) => (
          <div
            key={i}
            className="flex flex-col gap-1 cursor-pointer group/item"
            onClick={() => setSelected(selected === i ? null : i)}
          >
            <div className="relative overflow-hidden rounded-sm bg-[#f5f3f0]" style={{ aspectRatio: "4/5" }}>
              <Image
                src={aw.img}
                alt=""
                fill
                quality={92}
                className="object-cover transition-transform duration-500 group-hover/item:scale-[1.03]"
                sizes="(max-width: 768px) 45vw, 320px"
              />
              <div className="absolute inset-0 flex items-end p-1.5 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200">
                <span className="inline-flex items-center gap-0.5 rounded-full bg-white/90 text-[#111110] font-medium" style={{ fontSize: "0.32rem", padding: "2px 6px" }}>
                  Inquire
                  <svg width="4" height="4" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M2 10 10 2M4 2h6v6" /></svg>
                </span>
              </div>
            </div>
            <p className="font-normal leading-tight" style={{ fontSize: "0.48rem" }}>{aw.artist}</p>
            <p className="italic text-[#6B6A67] leading-tight" style={{ fontSize: "0.43rem" }}>{aw.title}, {aw.year}</p>
            <p className="text-[#ADADAA]" style={{ fontSize: "0.35rem" }}>{aw.medium}, {aw.dims}</p>
            {selected === i && (
              <div className="rounded p-1.5 flex flex-col gap-1" style={{ background: "#F9FAFD", border: "1px solid #E8E8E6" }}>
                <p className="text-[#6B6A67]" style={{ fontSize: "0.35rem" }}>Price on request</p>
                <button className="self-start rounded-full bg-[#111110] text-white font-medium" style={{ fontSize: "0.33rem", padding: "2px 7px" }}>
                  Send enquiry
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="shrink-0 pt-2 mt-2 border-t border-[#E8E8E6] flex items-center justify-between">
        <p className="text-[#ADADAA]" style={{ fontSize: "0.33rem" }}>Confidential — do not share.</p>
        <span className="uppercase tracking-[0.12em] font-medium" style={{ fontSize: "0.33rem" }}>Vitreen</span>
      </div>
    </div>
  );
}

function InquiryMock() {
  return <ShareableMomentMock />;
}

const mocks: Record<string, () => React.JSX.Element> = {
  exhibition: ExhibitionMock,
  artist: ArtistMock,
  email: EmailMock,
  artwork: ArtworkMock,
  viewing: ViewingMock,
  inquiry: InquiryMock,
};

function CardRow({ cards }: { cards: { title: string; desc: string; mock: string }[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {cards.map((card, i) => {
        const MockComponent = mocks[card.mock];
        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease, delay: i * 0.1 }}
            className="group rounded-[10px] bg-[#F9FAFD] p-[20px] flex flex-col"
            style={{ border: "0.1px solid #D4D4D0" }}
          >
            <h3 className="font-medium text-[#111110] text-base tracking-[-0.01em] mb-0">
              {card.title}
            </h3>
            <p className="text-[#6B6A67] text-sm leading-[1.55] mb-5">
              {card.desc}
            </p>
            <div className="w-full max-w-[400px] h-[430px] mx-auto bg-white rounded-[10px] p-4 overflow-hidden">
              <MockComponent />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function Solution() {
  return (
    <section className="py-20 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-8"
        >
          <h2 className="font-display text-[26px] md:text-[26px] font-normal text-[#111110] leading-[1.2] tracking-[-0.02em] max-w-2xl">
            Faciliter les échanges autour des œuvres
          </h2>
          <p className="mt-0.5 text-[#6B6A67] text-[26px] font-normal max-w-xl leading-[1.2] tracking-[-0.02em]">
            Interactions ciblées et simples. Renforcez votre visibilité et vos relations.
          </p>
        </motion.div>

        {/* Row 2 Cards */}
        <CardRow cards={row2} />
      </div>
    </section>
  );
}
