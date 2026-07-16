"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/lang";
import { GalleryOsDashboard } from "@/components/ConnectedTools";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.65, ease, delay },
});

import { ArtistPageMock } from "./showcase/ArtistPageMock";
import { ExhibitionPageMock } from "./showcase/ExhibitionPageMock";

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
        {(widthPx) =>
          MockComponent ? (
            <MockComponent isMobile={isMobileViewport || widthPx < 420} />
          ) : mockImage === "/artist page.png" ? (
            <ArtistPageMock isMobile={isMobileViewport || widthPx < 420} />
          ) : mockImage ? (
            <div className="w-full h-full p-[20px]">
              <div className="relative w-full h-full">
                <Image
                  src={mockImage}
                  alt={title}
                  fill
                  className="object-cover object-top"
                  sizes="700px"
                />
              </div>
            </div>
          ) : (
            <ExhibitionPageMock isMobile={isMobileViewport || widthPx < 420} />
          )
        }
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
      <div className={`grid ${reverse ? "md:grid-cols-[1fr_2fr]" : "md:grid-cols-[2fr_1fr]"}`}>
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

const bgImage = "/colin deland.jpeg";

function GalleryWorkflowMock() {
  const [scene, setScene] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    function play() {
      setScene(0);
      timers.push(setTimeout(() => !cancelled && setScene(1), 1200));
      timers.push(setTimeout(() => !cancelled && setScene(2), 2600));
      timers.push(setTimeout(() => !cancelled && setScene(3), 3900));
      timers.push(setTimeout(() => !cancelled && setScene(4), 5400));
      timers.push(setTimeout(() => !cancelled && play(), 8200));
    }

    play();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  const mailVisible = scene >= 1;
  const panelVisible = scene >= 3;
  const inserted = scene >= 4;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease }}
      className="absolute inset-0 overflow-visible bg-transparent"
    >
      <div
        className="absolute"
        style={{
          bottom: -10,
          left: "0%",
          width: "94%",
          transform: "scaleY(1.08)",
          transformOrigin: "bottom left",
        }}
      >
        <GalleryOsDashboard glass />
      </div>
      <AnimatePresence>
        {mailVisible && (
          <motion.div
            key="gmail"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.45, ease }}
            className="absolute overflow-hidden rounded-[8px] border border-[#E8E8E6] bg-white shadow-[0_24px_60px_rgba(0,0,0,0.14)]"
            style={{ top: "7%", right: "0%", width: "34%" }}
          >
            <div className="flex items-center justify-between bg-[#F0F4F9] px-3 py-2">
              <span className="text-[11px] font-semibold text-[#202124]">New Message</span>
              <div className="flex items-center gap-2 text-[10px] text-[#5F6368]">
                <span>_</span>
                <span>↗</span>
                <span>×</span>
              </div>
            </div>
            <div className="border-b border-[#E8E8E6] px-3 py-2 text-[10px] text-[#6B6A67]">
              Recipients
            </div>
            <div className="border-b border-[#E8E8E6] px-3 py-2 text-[10px] text-[#6B6A67]">
              Subject
            </div>
            <div className="relative min-h-[178px] px-3 pt-3 pb-2">
              <AnimatePresence>
                {inserted && (
                  <motion.div
                    key="inserted-artwork"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.38, ease }}
                    className="overflow-hidden rounded-[3px] bg-[#F5F0E8]"
                  >
                    <div className="relative aspect-[16/10]">
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(180deg, #F5F0E8 0%, #EDE6DA 70%, #DCD3C2 100%)",
                        }}
                      />
                      <div
                        className="absolute"
                        style={{
                          top: "20%",
                          left: "32%",
                          width: "36%",
                          height: "52%",
                          background:
                            "linear-gradient(135deg, #2540B8 0%, #1A3088 60%, #15276F 100%)",
                          boxShadow: "0 1px 2px rgba(0,0,0,0.12), 0 0.5px 1px rgba(0,0,0,0.08)",
                        }}
                      />
                      <div
                        className="absolute inset-x-0 bottom-0"
                        style={{
                          height: "22%",
                          background: "linear-gradient(180deg, #B8B0A2 0%, #9C9486 100%)",
                        }}
                      />
                    </div>
                    <div className="px-2.5 py-2">
                      <p className="text-[10px] font-semibold leading-tight text-[#202124]">
                        Evening Field
                      </p>
                      <p className="mt-0.5 text-[9px] leading-tight text-[#6B6A67]">
                        Sacha Elron · Acrylic on canvas · 120 × 120 cm
                      </p>
                      <p className="mt-0.5 text-[9px] leading-tight text-[#202124]">8 000 €</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="flex items-center justify-between border-t border-[#E8E8E6] px-3 py-2">
              <button className="rounded-full bg-[#0B57D0] px-3 py-1 text-[10px] font-medium text-white">
                Send
              </button>
              <div className="flex items-center gap-2 text-[12px] text-[#5F6368]">
                <span>A</span>
                <span>⌘</span>
                <span>🔗</span>
                <motion.span
                  className="flex h-5 w-5 items-center justify-center rounded-full border border-[#E8E8E6] bg-white text-[8px] font-semibold text-[#111110]"
                  animate={
                    scene === 2
                      ? {
                          scale: [1, 1.18, 1],
                          boxShadow: [
                            "0 0 0 rgba(17,17,16,0)",
                            "0 0 0 8px rgba(17,17,16,0.08)",
                            "0 0 0 rgba(17,17,16,0)",
                          ],
                        }
                      : { scale: 1 }
                  }
                  transition={{ duration: 0.55, ease }}
                >
                  V
                </motion.span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {panelVisible && (
          <motion.div
            key="vitreen-panel"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.38, ease }}
            className="absolute rounded-[12px] border border-[#E8E8E6] bg-white p-4 shadow-[0_18px_50px_rgba(0,0,0,0.13)]"
            style={{ top: "27%", right: "-3%", width: "31%", zIndex: 20 }}
          >
            <div className="flex items-center justify-between">
              <p className="text-[9px] uppercase tracking-[0.18em] text-[#ADADAA]">Vitreen</p>
              <span className="text-[14px] text-[#ADADAA]">×</span>
            </div>
            <div className="mt-3 border-b border-[#E8E8E6] pb-2 text-[12px] text-[#111110]">
              eve
            </div>
            <div className="mt-3 flex gap-1.5">
              {["Tout", "Disponibles", "Réservées"].map((tag, i) => (
                <span
                  key={tag}
                  className={`rounded-full border px-2 py-1 text-[8px] ${
                    i === 0
                      ? "border-[#111110] bg-[#111110] text-white"
                      : "border-[#E8E8E6] text-[#6B6A67]"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
            <motion.div
              className="mt-3 rounded-[8px] border border-[#6DA1FF] bg-[#EEF4FF] p-2"
              initial={{ opacity: 0.65 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded bg-[#2F6FE4] text-[10px] text-white">
                  ✓
                </div>
                <div className="h-7 w-8 rounded-sm bg-[#1B2A4A]" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[9px] font-semibold uppercase tracking-[0.12em] text-[#8A8A86]">
                    Sun Dog
                  </p>
                  <p className="truncate text-[10px] font-medium italic leading-tight text-[#111110]">
                    Evening Field
                  </p>
                  <p className="text-[8px] text-[#6B6A67]">8 000 €</p>
                </div>
                <span className="rounded-full border border-[#A8DDB5] bg-[#EAF8EE] px-2 py-0.5 text-[8px] uppercase tracking-[0.08em] text-[#4FA766]">
                  Available
                </span>
              </div>
            </motion.div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[9px] text-[#6B6A67]">1 œuvre sélectionnée</span>
              <button className="rounded-full bg-[#111110] px-3 py-1.5 text-[10px] font-medium text-white">
                Insérer
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {scene === 2 && (
          <motion.div
            key="cursor"
            className="absolute z-30 text-[#111110]"
            style={{ top: "55%", right: "7%" }}
            initial={{ opacity: 0, x: -18, y: -14 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.38, ease }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="white"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M4 3l14 9-6.2 1.3L8.2 20 4 3Z" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* Step 1 — Branded admin interface */
export function AdminMock() {
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
    <svg
      key="ov"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>,
    /* Artworks */
    <svg
      key="art"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="m21 15-5-5L5 21" />
    </svg>,
    /* Artists */
    <svg
      key="ar"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>,
    /* Exhibitions */
    <svg
      key="ex"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>,
    /* Inquiries */
    <svg
      key="inq"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>,
    /* OVR */
    <svg
      key="ovr"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>,
    /* Collectors */
    <svg
      key="col"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>,
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
            <span className="text-white text-[7px] font-bold">AS</span>
          </div>
          <span className="text-[10px] font-semibold text-[#111110] tracking-[-0.01em]">
            Archive
          </span>
        </div>
        <div className="flex flex-col gap-0.5 flex-1">
          {sidebarItems.map(({ label, active }) => (
            <div
              key={label}
              className={`text-[10px] px-2.5 py-1.5 rounded-md tracking-[-0.01em] ${active ? "bg-[#F0F0EE] text-[#111110] font-medium" : "text-[#888886]"}`}
            >
              {label}
            </div>
          ))}
        </div>
        <p className="text-[8px] text-[#ADADAA] px-1">Powered by Vitreen</p>
      </div>

      {/* ── Mobile header ── */}
      <div className="md:hidden absolute top-0 left-0 right-0 h-9 bg-white border-b border-[#EBEBEA] flex items-center px-3 gap-2 z-10">
        <div className="w-5 h-5 rounded bg-[#111110] flex items-center justify-center shrink-0">
          <span className="text-white text-[7px] font-bold">AS</span>
        </div>
        <span className="text-[11px] font-semibold text-[#111110] tracking-[-0.01em] flex-1">
          Archive
        </span>
        <div className="w-5 h-5 rounded-full bg-[#F0F0EE]" />
      </div>

      {/* ── Main content ── */}
      <div className="flex-1 bg-[#FAFAF8] overflow-hidden flex flex-col pt-9 md:pt-0 pb-10 md:pb-0">
        <div className="flex-1 overflow-y-auto p-3 md:p-5 flex flex-col gap-2.5 md:gap-3">
          {/* Breadcrumb + title */}
          <div>
            <p className="text-[9px] md:text-[9px] text-[#ADADAA] mb-0.5">
              ← {isFr ? "Retour aux œuvres" : "Back to artworks"}
            </p>
            <p className="text-[14px] md:text-[13px] font-semibold text-[#111110] tracking-[-0.02em]">
              {m.newArtwork}
            </p>
            <p className="text-[10px] md:text-[9px] text-[#888886] mt-0.5">
              {isFr
                ? "Publié instantanément sur votre site."
                : "Saved directly — visible on your site immediately."}
            </p>
          </div>

          {/* Desktop: side-by-side / Mobile: stacked fields */}
          <div className="flex gap-3 flex-1 overflow-hidden">
            <div className="flex-1 flex flex-col gap-2 overflow-hidden">
              {/* Title */}
              <div>
                <p className="text-[9px] md:text-[8.5px] font-medium text-[#111110] mb-1">
                  {m.titleField} <span className="text-red-400">*</span>
                </p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="h-7 md:h-6 bg-white rounded border border-[#E0E0DE] flex items-center px-2.5"
                >
                  <span className="text-[11px] md:text-[10px] text-[#111110]">
                    Untitled (Horizon), 2024
                  </span>
                </motion.div>
              </div>

              {/* Artist */}
              <div>
                <p className="text-[9px] md:text-[8.5px] font-medium text-[#111110] mb-1">
                  {m.artistField}
                </p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="h-7 md:h-6 bg-white rounded border border-[#E0E0DE] flex items-center px-2.5"
                >
                  <span className="text-[11px] md:text-[10px] text-[#111110]">Claire Fontaine</span>
                </motion.div>
              </div>

              {/* Year + Medium */}
              <div className="flex gap-2">
                <div className="flex-1">
                  <p className="text-[9px] md:text-[8.5px] font-medium text-[#111110] mb-1">
                    {isFr ? "Année" : "Year"}
                  </p>
                  <div className="h-7 md:h-6 bg-white rounded border border-[#E0E0DE] flex items-center px-2.5">
                    <span className="text-[11px] md:text-[10px] text-[#111110]">2024</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-[9px] md:text-[8.5px] font-medium text-[#111110] mb-1">
                    {isFr ? "Technique" : "Medium"}
                  </p>
                  <div className="h-7 md:h-6 bg-white rounded border border-[#E0E0DE] flex items-center px-2.5">
                    <span className="text-[11px] md:text-[10px] text-[#111110]">
                      {isFr ? "Huile sur toile" : "Oil on canvas"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div>
                <p className="text-[9px] md:text-[8.5px] font-medium text-[#111110] mb-1">Status</p>
                <div className="flex flex-wrap gap-1.5">
                  {statusPills.map((s, i) => (
                    <div
                      key={s}
                      className={`text-[9px] md:text-[8.5px] px-2.5 py-1 md:py-0.5 rounded-full border ${i === 0 ? "bg-[#111110] text-white border-[#111110]" : "bg-white text-[#555] border-[#E0E0DE]"}`}
                    >
                      {s}
                    </div>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <p className="text-[9px] md:text-[8.5px] font-medium text-[#111110] mb-1">
                  {m.priceField}
                </p>
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
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-[10px] md:text-[9.5px] px-4 md:px-3 py-2 md:py-1.5 rounded-md bg-[#111110] text-white font-medium cursor-pointer"
                >
                  {m.publish}
                </motion.div>
                <div className="text-[10px] md:text-[9.5px] px-4 md:px-3 py-2 md:py-1.5 rounded-md border border-[#E0E0DE] text-[#555] cursor-pointer">
                  {isFr ? "Annuler" : "Cancel"}
                </div>
              </div>
            </div>

            {/* Image upload — hidden on mobile to save space */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="hidden md:flex w-[38%] shrink-0 bg-white rounded border border-dashed border-[#D0D0CE] flex-col items-center justify-center gap-1.5"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ADADAA"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <p className="text-[8.5px] text-[#ADADAA] text-center leading-tight">
                {m.dragClick}
                <br />
                {isFr ? "ou cliquer" : "or click to browse"}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Mobile bottom tab bar ── */}
      <div className="md:hidden absolute bottom-0 left-0 right-0 h-10 bg-white border-t border-[#EBEBEA] flex items-center justify-around px-1 z-10">
        {sidebarItems.map(({ label, active }, i) => (
          <div
            key={label}
            className={`flex flex-col items-center gap-0.5 flex-1 ${active ? "text-[#111110]" : "text-[#ADADAA]"}`}
          >
            {tabIcons[i]}
            <span className="text-[6.5px] font-medium leading-none">{label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* Step 2 — Live site preview showing the artwork */
export function LiveSiteMock() {
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
          <span className="text-[9px] text-[#ADADAA] truncate">
            galerie-fontaine.com/oeuvres/composition-no-7
          </span>
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
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#CCCCC9"
              strokeWidth="1"
            >
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
              <p className="text-[13px] md:text-[12px] font-medium text-[#111110]">
                Composition No. 7
              </p>
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
export function ShareMock() {
  const { t } = useLang();
  const m = t.stepper.mock.share;
  const [sent, setSent] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setSent(true), 1600);
    return () => clearTimeout(id);
  }, []);

  const fields = [
    { label: m.from, value: "galerie@fontaine.com" },
    { label: m.to, value: "marc.durand@collection.fr" },
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
          <p className="text-[11px] font-semibold text-[#111110] tracking-[-0.01em]">
            {m.notifyCollector}
          </p>
          <p className="text-[9px] text-[#ADADAA] mt-0.5">{m.recipientsCount}</p>
        </div>
        {/* Collector rows */}
        {[
          { name: "Marc Durand", tag: isFr ? "Collectionneur" : "Collector", selected: true },
          { name: "Sophie Veil", tag: isFr ? "Art Advisor" : "Art Advisor", selected: false },
          { name: "James Howell", tag: isFr ? "Collectionneur" : "Collector", selected: false },
        ].map(({ name, tag, selected }) => (
          <div
            key={name}
            className={`flex items-center gap-2.5 px-3 py-2.5 ${selected ? "bg-white border-r-2 border-[#111110]" : ""}`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 ${selected ? "bg-[#111110] text-white" : "bg-[#E8E8E6] text-[#6B6A67]"}`}
            >
              {name[0]}
            </div>
            <div className="min-w-0">
              <p
                className={`text-[10px] font-medium truncate ${selected ? "text-[#111110]" : "text-[#6B6A67]"}`}
              >
                {name}
              </p>
              <p className="text-[8.5px] text-[#ADADAA]">{tag}</p>
            </div>
            <div
              className={`ml-auto w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 ${selected ? "bg-[#111110] border-[#111110]" : "border-[#D0D0CE]"}`}
            >
              {selected && (
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Right panel — compose */}
      <div className="flex-1 bg-white flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[#F0F0EE]">
          <p className="text-[12px] font-semibold text-[#111110] tracking-[-0.01em] flex-1">
            {m.newMessage}
          </p>
          <div className="flex gap-1.5">
            <div className="w-5 h-5 rounded-md bg-[#F4F4F2] flex items-center justify-center">
              <svg
                width="9"
                height="9"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6B6A67"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            </div>
            <div className="w-5 h-5 rounded-md bg-[#F4F4F2] flex items-center justify-center">
              <svg
                width="9"
                height="9"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6B6A67"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
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
          className="mx-4 mt-3 rounded-[20px] bg-[#F7F7F5] border border-[#EBEBEA] overflow-hidden"
        >
          {/* OVR preview image strip */}
          <div className="flex gap-px h-16 bg-[#E8E8E6]">
            {[0.15, 0.25, 0.2, 0.4].map((o, i) => (
              <div key={i} className="flex-1 bg-[#D4D4D0]" style={{ opacity: o + 0.5 }} />
            ))}
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5">
            <div className="w-7 h-7 rounded-lg bg-white border border-[#E8E8E6] flex items-center justify-center shrink-0 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6B6A67"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10.5px] font-medium text-[#111110] leading-tight">
                Private Viewing · Spring 2026
              </p>
              <p className="text-[9px] text-[#ADADAA] mt-0.5">
                4 {isFr ? "œuvres" : "works"} — galerie-fontaine.com
              </p>
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
          <motion.button className="flex items-center gap-1.5 text-[10.5px] px-4 py-[7px] rounded-full bg-[#111110] text-white font-medium tracking-[-0.01em]">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.span
                  key="sent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-1.5"
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
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {m.sent}
                </motion.span>
              ) : (
                <motion.span key="send" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {m.send}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-md bg-[#F4F4F2] flex items-center justify-center">
              <svg
                width="9"
                height="9"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6B6A67"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
              </svg>
            </div>
            <span className="text-[9px] text-[#ADADAA]">{m.recipientsCount}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Showcase() {
  const { t } = useLang();

  return (
    <section id="blog" className="pt-14 md:pt-[72px] pb-14 md:pb-[72px] px-4 md:px-6 bg-white">
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
              className="absolute top-6 bottom-6 left-[4%] right-[4%] overflow-visible md:top-[60px] md:bottom-[70px] md:left-[8%] md:right-[8%]"
              style={{ zIndex: 10 }}
            >
              <GalleryWorkflowMock />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
