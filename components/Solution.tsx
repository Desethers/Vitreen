"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { useLang } from "@/lib/lang";

const ease = [0.16, 1, 0.3, 1] as const;

const row2 = [
  {
    title: "Online Inquire",
    desc: "Demande d’information depuis chaque œuvre.",
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
  artist: "Sacha Elron",
  title: "Untitled (Horizon)",
  year: "2024",
  medium: "Oil on canvas",
  dimensions: "152 × 122 cm",
  image: "/artworks/painting-02.png",
  slug: "/artwork/untitled-horizon",
};

function ShareIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
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
  const { t } = useLang();
  const rootRef = useRef<HTMLDivElement>(null);
  const imageShareBtnRef = useRef<HTMLButtonElement>(null);
  const panelShareBtnRef = useRef<HTMLButtonElement>(null);

  const [storyState, setStoryState] = useState<"sending" | "shared" | null>(null);
  const [token, setToken] = useState<null | {
    id: number;
    left: number;
    top: number;
    dx: number;
    dy: number;
  }>(null);
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
    const autoClose = setTimeout(() => closeStoryModal(), 6200);
    return () => {
      document.removeEventListener("keydown", onKey);
      clearTimeout(autoClose);
    };
  }, [storyModalOpen, closeStoryModal]);

  // Auto-play loop
  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    function play() {
      if (cancelled) return;
      setStoryState("sending");
      timers.push(
        setTimeout(() => {
          if (!cancelled) setStoryState("shared");
        }, 650)
      );
      timers.push(
        setTimeout(() => {
          if (!cancelled) setStoryState(null);
        }, 2300)
      );
      setStoryModalKey((k) => k + 1);
      timers.push(
        setTimeout(() => {
          if (!cancelled) setStoryModalOpen(true);
        }, 120)
      );
      // Replay after story closes + pause
      timers.push(setTimeout(() => play(), 6200 + 2500));
    }

    timers.push(setTimeout(play, 1200));
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

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

    setTimeout(() => setToken(null), 900);
    setTimeout(() => setStoryState("shared"), 650);
    setTimeout(() => setStoryState(null), 2300);
  };

  const onShare = async (origin: "image" | "panel") => {
    triggerAnimation(origin);
    setStoryModalKey((k) => k + 1);
    setTimeout(() => setStoryModalOpen(true), 120);
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
            <span style={{ fontStyle: "normal", fontWeight: 400 }}>
              {shareableMomentArtwork.year}
            </span>
          </p>

          <p style={{ fontSize: 10, color: "#ADADAA", marginBottom: 2, textAlign: "left" }}>
            {t.solution.mock.medium}
          </p>
          <p style={{ fontSize: 10, color: "#ADADAA", marginBottom: 22, textAlign: "left" }}>
            {shareableMomentArtwork.dimensions}
          </p>

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
              borderRadius: 4,
              width: "fit-content",
              alignSelf: "flex-start",
            }}
          >
            {t.solution.mock.inquire}
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
              <span
                style={{
                  fontSize: 10,
                  color: "#111110",
                  fontWeight: 300,
                  whiteSpace: "nowrap",
                  lineHeight: 1,
                }}
              >
                View in room
              </span>
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
              <span
                style={{
                  fontSize: 9,
                  color: "#111110",
                  fontWeight: 400,
                  whiteSpace: "nowrap",
                  lineHeight: 1,
                }}
              >
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
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 9999,
                background: "#111110",
                opacity: 0.08,
              }}
            />
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#111110"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
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
              style={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.45) 100%)",
              }}
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
                    width: 26,
                    height: 26,
                  }}
                >
                  <div
                    className="flex h-full w-full items-center justify-center rounded-full"
                    style={{ background: "#111", border: "1.5px solid #000" }}
                  >
                    <span style={{ fontSize: 8, fontWeight: 800, color: "#fff", letterSpacing: 0 }}>
                      V
                    </span>
                  </div>
                </div>
                <div className="min-w-0">
                  <p
                    style={{
                      fontSize: 9,
                      fontWeight: 600,
                      color: "#fff",
                      lineHeight: 1.2,
                      textShadow: "0 1px 3px rgba(0,0,0,0.5)",
                    }}
                  >
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
                    width: 22,
                    height: 22,
                    borderRadius: 9999,
                    background: "rgba(0,0,0,0.3)",
                    border: "none",
                    color: "#fff",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* More (⋯) */}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="5" cy="12" r="2" />
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="19" cy="12" r="2" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={closeStoryModal}
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 9999,
                    background: "rgba(0,0,0,0.3)",
                    border: "none",
                    color: "#fff",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* ── Link Sticker flottant sur la photo ── */}
            <motion.div
              className="absolute z-30"
              style={{ bottom: 120, left: "50%", transform: "translateX(-50%)", width: "70%" }}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0,
                  background: "rgba(255,255,255,0.95)",
                  borderRadius: 4,
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                }}
              >
                <div style={{ position: "relative", width: 30, height: 30, flexShrink: 0 }}>
                  <Image
                    src={shareableMomentArtwork.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="30px"
                  />
                </div>
                <div style={{ flex: 1, padding: "3px 6px", overflow: "hidden" }}>
                  <p
                    style={{
                      fontSize: 5,
                      color: "#ADADAA",
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      lineHeight: 1.2,
                      marginBottom: 1,
                    }}
                  >
                    galerie-fontaine.com
                  </p>
                  <p
                    style={{
                      fontSize: 6.5,
                      fontWeight: 600,
                      color: "#111110",
                      lineHeight: 1.2,
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {shareableMomentArtwork.title}
                  </p>
                </div>
                <div style={{ padding: "0 6px", flexShrink: 0 }}>
                  <svg
                    width="7"
                    height="7"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ADADAA"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                </div>
              </div>
            </motion.div>

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
                className="overflow-hidden rounded"
                style={{ background: "rgba(255,255,255,0.97)", backdropFilter: "blur(16px)" }}
              >
                <div className="flex gap-2.5 p-2.5">
                  {/* Thumbnail */}
                  <div
                    className="relative shrink-0 overflow-hidden rounded-lg"
                    style={{ width: 48, height: 56 }}
                  >
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
                      <p
                        style={{
                          fontSize: 7.5,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: "#ADADAA",
                          lineHeight: 1.2,
                          marginBottom: 2,
                        }}
                      >
                        {shareableMomentArtwork.artist}
                      </p>
                      <p
                        style={{
                          fontSize: 10,
                          fontWeight: 500,
                          fontStyle: "italic",
                          color: "#111110",
                          lineHeight: 1.2,
                        }}
                      >
                        {shareableMomentArtwork.title},&nbsp;
                        <span style={{ fontStyle: "normal", fontWeight: 400 }}>
                          {shareableMomentArtwork.year}
                        </span>
                      </p>
                      <p style={{ fontSize: 7.5, color: "#6B6A67", lineHeight: 1.3, marginTop: 1 }}>
                        {t.solution.mock.medium} · {shareableMomentArtwork.dimensions}
                      </p>
                    </div>
                    <div className="mt-1.5 flex items-center justify-between">
                      <span style={{ fontSize: 9.5, fontWeight: 600, color: "#111110" }}>
                        {t.solution.mock.onRequest}
                      </span>
                      <span
                        style={{
                          borderRadius: 9999,
                          background: "#111110",
                          color: "#fff",
                          fontSize: 7,
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          padding: "3px 9px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {t.solution.mock.inquire}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reply bar façon Instagram */}
              <div
                className="mt-1.5 flex items-center gap-2 rounded-full px-3 py-1.5"
                style={{
                  background: "rgba(255,255,255,0.14)",
                  border: "1px solid rgba(255,255,255,0.22)",
                }}
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
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(255,255,255,0.8)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(255,255,255,0.8)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
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

const libraryRows = [
  { title: "Untitled (Horizon)", meta: "Sacha Elron · 2024", img: "/artworks/painting-02.png" },
  { title: "Night Garden IV", meta: "Sacha Elron · 2024", img: "/artworks/painting-05.jpg" },
  { title: "Soft Power I", meta: "Sacha Elron · 2025", img: "/artworks/painting-09.png" },
];

function ArtworkMock({ active }: { active: boolean }) {
  const { t } = useLang();
  const total = libraryRows.length;
  const [synced, setSynced] = useState(0);

  useEffect(() => {
    if (!active) {
      setSynced(0);
      return;
    }

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    function run() {
      if (cancelled) return;
      setSynced(0);
      for (let i = 1; i <= total; i++) {
        timers.push(setTimeout(() => !cancelled && setSynced(i), 600 + (i - 1) * 750));
      }
      timers.push(setTimeout(run, 600 + total * 750 + 1700));
    }
    const init = setTimeout(run, 350);
    return () => {
      cancelled = true;
      clearTimeout(init);
      timers.forEach(clearTimeout);
    };
  }, [active, total]);

  const done = synced >= total;

  return (
    <div className="flex h-full items-center justify-center font-sans text-[#111110]">
      <div
        className="w-full overflow-hidden rounded-xl bg-white"
        style={{
          maxWidth: 264,
          border: "1px solid #ECECEA",
          boxShadow: "0 10px 30px rgba(17,17,16,0.06)",
        }}
      >
        {/* Source header */}
        <div
          className="flex items-center justify-between"
          style={{ padding: "9px 12px", borderBottom: "1px solid #F2F2F0" }}
        >
          <div>
            <p style={{ fontSize: 10, fontWeight: 500, color: "#111110", lineHeight: 1.3 }}>
              {t.solution.mock.artworkManagement}
            </p>
            <p style={{ fontSize: 8, color: "#ADADAA", lineHeight: 1.3 }}>inventaire-2025.csv</p>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            {done ? (
              <motion.span
                key="done"
                className="flex items-center"
                style={{ gap: 4, fontSize: 8.5, fontWeight: 500, color: "#1F8A4C" }}
                initial={{ opacity: 0, y: 2 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -2 }}
                transition={{ duration: 0.25 }}
              >
                <span
                  className="rounded-full"
                  style={{ width: 5, height: 5, background: "#28C840" }}
                />
                {t.solution.mock.synced}
              </motion.span>
            ) : (
              <motion.span
                key="progress"
                className="flex items-center"
                style={{
                  gap: 4,
                  fontSize: 8.5,
                  fontWeight: 500,
                  color: "#6B6A67",
                  letterSpacing: "0.04em",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <motion.span
                  className="rounded-full"
                  style={{ width: 5, height: 5, background: "#F5A623" }}
                  animate={active ? { opacity: [1, 0.35, 1] } : { opacity: 1 }}
                  transition={
                    active
                      ? { duration: 1.1, repeat: Infinity, ease: "easeInOut" }
                      : { duration: 0 }
                  }
                />
                {t.solution.mock.importing} {synced}/{total}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Rows */}
        <div className="flex flex-col" style={{ padding: "4px 0" }}>
          {libraryRows.map((row, i) => {
            const isSynced = i < synced;
            return (
              <div
                key={row.title}
                className="flex items-center"
                style={{ gap: 9, padding: "7px 12px" }}
              >
                <div
                  className="relative shrink-0 overflow-hidden rounded"
                  style={{
                    width: 26,
                    height: 26,
                    background: "#F0F0EE",
                    opacity: isSynced ? 1 : 0.4,
                    transition: "opacity 0.45s ease",
                  }}
                >
                  <Image
                    src={row.img}
                    alt=""
                    fill
                    quality={80}
                    className="object-cover"
                    sizes="32px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className="truncate"
                    style={{
                      fontSize: 9.5,
                      fontWeight: 500,
                      color: isSynced ? "#111110" : "#B6B6B2",
                      lineHeight: 1.25,
                      transition: "color 0.45s ease",
                    }}
                  >
                    {row.title}
                  </p>
                  <p
                    style={{
                      fontSize: 8,
                      color: isSynced ? "#ADADAA" : "#CFCFCB",
                      lineHeight: 1.25,
                      transition: "color 0.45s ease",
                    }}
                  >
                    {row.meta}
                  </p>
                </div>

                {/* Status — empty ring until the row's record syncs in */}
                <span
                  className="relative flex shrink-0 items-center justify-center rounded-full"
                  style={{ width: 16, height: 16 }}
                >
                  <span
                    className="absolute inset-0 rounded-full"
                    style={{
                      border: "1.5px solid #E4E4E0",
                      opacity: isSynced ? 0 : 1,
                      transition: "opacity 0.3s ease",
                    }}
                  />
                  <AnimatePresence>
                    {isSynced && (
                      <motion.span
                        key="check"
                        className="absolute inset-0 flex items-center justify-center rounded-full"
                        style={{ background: "#111110", color: "#fff" }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 520, damping: 24 }}
                      >
                        <svg
                          width="9"
                          height="9"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <motion.path
                            d="M20 6 9 17l-5-5"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.3, delay: 0.08, ease: "easeOut" }}
                          />
                        </svg>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ViewingMock({ active }: { active: boolean }) {
  // Cursor drifts in from outside, hovers over INQUIRE, button fills, cursor leaves.
  // 0: cursor offscreen  1: cursor approaching  2: hovering (button lit)  3: cursor leaving
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0);

  useEffect(() => {
    if (!active) {
      setPhase(0);
      return;
    }

    let cancelled = false;
    const t: ReturnType<typeof setTimeout>[] = [];
    function run() {
      if (cancelled) return;
      setPhase(0);
      t.push(setTimeout(() => !cancelled && setPhase(1), 600));
      t.push(setTimeout(() => !cancelled && setPhase(2), 1300));
      t.push(setTimeout(() => !cancelled && setPhase(3), 2600));
      t.push(setTimeout(() => !cancelled && setPhase(0), 3400));
      t.push(setTimeout(run, 5000));
    }
    const init = setTimeout(run, 800);
    return () => {
      cancelled = true;
      clearTimeout(init);
      t.forEach(clearTimeout);
    };
  }, [active]);

  const hovering = phase === 2;

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-white font-sans text-[#111110]">
      {/* Gmail header */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-[#EFEFED] shrink-0">
        <Image
          src="/logos/icon-gmail-96.png"
          alt="Gmail"
          width={16}
          height={12}
          unoptimized
          className="shrink-0"
        />
        <div className="min-w-0 flex-1">
          <p className="font-medium leading-tight truncate" style={{ fontSize: "0.42rem" }}>
            Galerie
          </p>
          <p className="text-[#ADADAA] leading-tight" style={{ fontSize: "0.38rem" }}>
            to Jean Dupond
          </p>
        </div>
        <span className="text-[#ADADAA] shrink-0" style={{ fontSize: "0.38rem" }}>
          10:24
        </span>
      </div>

      {/* Email body */}
      <div className="flex-1 overflow-hidden px-4 pt-3">
        {/* Headline + View online */}
        <div className="flex items-start justify-between">
          <div className="min-w-0">
            <p className="font-medium leading-tight" style={{ fontSize: "0.74rem" }}>
              Exhibition Selection
            </p>
            <p className="text-[#ADADAA] leading-tight" style={{ fontSize: "0.62rem" }}>
              Work from the show
            </p>
          </div>
          <span
            className="shrink-0 underline"
            style={{ fontSize: "0.4rem", color: "#5B7CC2", textUnderlineOffset: "1.5px" }}
          >
            View online
          </span>
        </div>

        <p className="text-[#6B6A67] mt-2 leading-relaxed" style={{ fontSize: "0.4rem" }}>
          For Jean Dupond — following the exhibition, here is a selection of remaining works.
        </p>

        <div className="mt-3 mb-3 border-t border-[#EFEFED]" />

        {/* Artwork */}
        <div
          className="relative w-full overflow-hidden bg-[#f5f3f0]"
          style={{ aspectRatio: "16/9" }}
        >
          <Image
            src="/artworks/painting-10.jpg"
            alt=""
            fill
            quality={92}
            className="object-cover"
            sizes="340px"
          />
        </div>

        {/* Caption + INQUIRE */}
        <div className="flex items-end justify-between mt-2">
          <div className="min-w-0">
            <p className="font-normal leading-tight" style={{ fontSize: "0.46rem" }}>
              Sacha Elron
            </p>
            <p className="italic text-[#6B6A67] leading-tight" style={{ fontSize: "0.42rem" }}>
              Painting 10, 2025
            </p>
            <p className="text-[#ADADAA] leading-tight mt-0.5" style={{ fontSize: "0.38rem" }}>
              180 × 180 cm
            </p>
          </div>

          {/* INQUIRE + cursor overlay */}
          <div className="relative shrink-0">
            <motion.span
              className="inline-flex items-center justify-center font-medium tracking-[0.12em]"
              animate={{
                background: hovering ? "#111110" : "#ffffff",
                color: hovering ? "#ffffff" : "#111110",
              }}
              transition={{ duration: 0.18, ease: "easeInOut" }}
              style={{
                fontSize: "0.4rem",
                padding: "3px 10px",
                border: "0.5px solid #111110",
                display: "inline-flex",
              }}
            >
              INQUIRE
            </motion.span>

            {/* cursor */}
            <motion.div
              className="absolute pointer-events-none"
              initial={false}
              animate={
                phase === 0
                  ? { x: 28, y: 28, opacity: 0 }
                  : phase === 1
                    ? { x: 10, y: 10, opacity: 1 }
                    : phase === 2
                      ? { x: 6, y: 6, opacity: 1 }
                      : { x: 22, y: 20, opacity: 0 }
              }
              transition={{ duration: phase === 1 ? 0.65 : 0.22, ease }}
              style={{ bottom: 0, right: 0 }}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 12 12"
                fill="#111110"
                stroke="#fff"
                strokeWidth="0.75"
                strokeLinejoin="round"
              >
                <path d="M1 1l3.4 9 1.3-3.6L9.4 5 1 1z" />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex items-center" style={{ gap: 3 }}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="rounded-full"
          style={{ width: 4, height: 4, background: "#9B9B98", display: "inline-block" }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: i * 0.18 }}
        />
      ))}
    </span>
  );
}

function InquiryMock({ active }: { active: boolean }) {
  // Only the last two messages animate: "building" bubble, then the PDF card.
  const [step, setStep] = useState(0); // 0: none · 1: building · 2: pdf

  useEffect(() => {
    if (!active) {
      setStep(0);
      return;
    }

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    function run() {
      if (cancelled) return;
      setStep(0);
      timers.push(setTimeout(() => !cancelled && setStep(1), 700));
      timers.push(setTimeout(() => !cancelled && setStep(2), 1900));
      timers.push(setTimeout(run, 5400));
    }
    const init = setTimeout(run, 500);
    return () => {
      cancelled = true;
      clearTimeout(init);
      timers.forEach(clearTimeout);
    };
  }, [active]);

  return (
    <div className="flex h-full flex-col overflow-hidden font-sans text-[#111110]">
      {/* Minimal conversation header */}
      <div
        className="flex items-center border-b border-[#F2F2F0]"
        style={{ gap: 7, paddingBottom: 9 }}
      >
        <div
          className="relative flex shrink-0 items-center justify-center rounded-full"
          style={{ width: 22, height: 22, background: "#111110" }}
        >
          <span style={{ fontSize: 8.5, fontWeight: 600, color: "#fff" }}>V</span>
          <span
            className="absolute rounded-full"
            style={{
              width: 6,
              height: 6,
              right: -1,
              bottom: -1,
              background: "#28C840",
              border: "1.5px solid #fff",
            }}
          />
        </div>
        <div className="min-w-0">
          <p style={{ fontSize: 9.5, fontWeight: 500, lineHeight: 1.2 }}>Vitreen · Sélection</p>
          <p style={{ fontSize: 7.5, color: "#ADADAA", lineHeight: 1.2 }}>WhatsApp</p>
        </div>
      </div>

      {/* Chat — top-aligned, static; only the typing indicator animates */}
      <div className="flex flex-col" style={{ gap: 7, paddingTop: 10 }}>
        {/* outgoing artwork media card */}
        <div
          className="self-end overflow-hidden rounded-[10px] rounded-tr-sm"
          style={{
            maxWidth: "82%",
            background: "#E7FCE3",
            border: "1px solid #D6F2CF",
          }}
        >
          <div style={{ height: 70, background: "linear-gradient(135deg,#1E3FD6,#2A4FE8)" }} />
          <p style={{ fontSize: 8.5, color: "#111110", lineHeight: 1.35, padding: "6px 8px 7px" }}>
            Sacha Elron · <span style={{ fontStyle: "italic" }}>Blue Painting</span>
            <br />
            2025 · 180 × 180 cm · 5 000 €
          </p>
        </div>

        {/* incoming confirmation */}
        <div
          className="self-start rounded-[10px] rounded-tl-sm bg-white"
          style={{
            maxWidth: "86%",
            border: "1px solid #ECECEA",
            padding: "6px 9px",
            fontSize: 8.5,
            lineHeight: 1.4,
            color: "#111110",
          }}
        >
          Reçu. «&nbsp;Blue Painting&nbsp;» ajoutée à votre Sélection.
        </div>

        {/* outgoing command */}
        <div
          className="self-end rounded-[10px] rounded-tr-sm"
          style={{ background: "#E7FCE3", padding: "6px 10px" }}
        >
          <span style={{ fontSize: 9, fontWeight: 500, color: "#0F6B3A", letterSpacing: "0.01em" }}>
            /pdf
          </span>
        </div>

        {/* Animated — last two messages reveal in sequence */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.div
              key="building"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease }}
              className="self-start flex items-center rounded-[10px] rounded-tl-sm bg-white"
              style={{ gap: 7, border: "1px solid #ECECEA", padding: "6px 9px" }}
            >
              <span style={{ fontSize: 8.5, color: "#6B6A67" }}>
                Constitution de votre sélection
              </span>
              <TypingDots />
            </motion.div>
          )}

          {step >= 2 && (
            <motion.div
              key="pdf"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease }}
              className="self-start"
              style={{ maxWidth: "86%" }}
            >
              <div
                className="flex items-center rounded-[10px] rounded-tl-sm bg-white"
                style={{ gap: 8, border: "1px solid #ECECEA", padding: "7px 9px" }}
              >
                <div
                  className="flex shrink-0 items-center justify-center rounded"
                  style={{ width: 24, height: 28, background: "#E8443B" }}
                >
                  <span
                    style={{ fontSize: 6, fontWeight: 700, color: "#fff", letterSpacing: "0.04em" }}
                  >
                    PDF
                  </span>
                </div>
                <div className="min-w-0">
                  <p
                    className="truncate"
                    style={{ fontSize: 8.5, fontWeight: 500, color: "#111110", lineHeight: 1.3 }}
                  >
                    spring-selection.pdf
                  </p>
                  <p style={{ fontSize: 7.5, color: "#ADADAA", lineHeight: 1.3 }}>44 Ko · pdf</p>
                </div>
              </div>
              <p
                className="flex items-center"
                style={{ gap: 4, fontSize: 7.5, color: "#1F8A4C", paddingLeft: 2, paddingTop: 4 }}
              >
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                Sélection prête · 1 page
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

const mocks: Record<string, (props: { active: boolean }) => React.JSX.Element> = {
  artwork: ArtworkMock,
  viewing: ViewingMock,
  inquiry: InquiryMock,
};

function CardRow({ cards }: { cards: { title: string; desc: string; mock: string }[] }) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  // On touch devices there is no hover, so the mocks would never play. Autoplay
  // them when the row scrolls into view instead.
  const rowRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rowRef, { amount: 0.25 });
  const [coarsePointer, setCoarsePointer] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(hover: none)");
    const update = () => setCoarsePointer(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <div ref={rowRef} className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {cards.map((card, i) => {
        const MockComponent = mocks[card.mock];
        const active = hoveredCard === i || (coarsePointer && inView);
        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease, delay: i * 0.1 }}
            onMouseEnter={() => setHoveredCard(i)}
            onMouseLeave={() => setHoveredCard(null)}
            onFocus={() => setHoveredCard(i)}
            onBlur={() => setHoveredCard(null)}
            className="group rounded bg-[#1C1C1A] p-[15px] flex flex-col"
            style={{ border: "0.1px solid #1C1C1A" }}
            tabIndex={0}
          >
            <h3 className="font-normal text-white text-sm md:text-base tracking-[-0.01em] mb-0">
              {card.title}
            </h3>
            <p className="mt-0 text-[#ADADAA] text-sm leading-[1.55] mb-4">{card.desc}</p>
            <div
              className={`mx-auto h-[360px] w-full max-w-[400px] overflow-hidden bg-white md:h-[430px] ${
                card.mock === "viewing" ? "" : "rounded p-4"
              }`}
            >
              <MockComponent active={active} />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function Solution() {
  const { t } = useLang();
  return (
    <section id="tools" className="pt-14 md:pt-[72px] pb-14 md:pb-[72px] px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-8 md:mb-10"
        >
          <h2 className="font-display text-[20px] md:text-[26px] font-normal text-[#111110] leading-[1.2] tracking-[-0.02em] max-w-2xl">
            {t.solution.title}
          </h2>
          <p className="mt-0 text-[#6B6A67] text-[20px] md:text-[26px] font-normal max-w-xl leading-[1.2] tracking-[-0.02em]">
            {t.solution.subtitle}
          </p>
        </motion.div>

        <CardRow
          cards={row2.map((card, i) => ({
            ...card,
            title: t.solution.cards[i].title,
            desc: t.solution.cards[i].desc,
          }))}
        />
      </div>
    </section>
  );
}
