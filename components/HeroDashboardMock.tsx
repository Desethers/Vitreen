"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { GalleryOsDashboard } from "@/components/ConnectedTools";

const ease = [0.16, 1, 0.3, 1] as const;

function HeroWorkflowAnimation() {
  const [dashboardWidth, setDashboardWidth] = useState(84);
  const [dashboardPosition, setDashboardPosition] = useState({ x: 50, y: 52 });
  // Half the dashboard height expressed as % of the stage — measured at
  // runtime so vertical clamping accounts for the real card height.
  const [dashboardHalfHeight, setDashboardHalfHeight] = useState(40);
  // Narrative sequence: type "evening" → result card appears → click → insert.
  const [typed, setTyped] = useState("");
  const [step, setStep] = useState(0); // 0 idle · 1 result shown · 2 inserted
  // Curtain: % of the dashboard hidden from the right edge while dragging the
  // handle. Only clips the view — the inner layout is never reflowed.
  const [curtain, setCurtain] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  // Plays the insert sequence once, when the hero scrolls into view.
  const started = useInView(stageRef, { once: true, margin: "-15%" });

  // Drive the typing + step timeline once the hero is in view.
  useEffect(() => {
    if (!started) return;
    const word = "evening";
    const typeStart = 500; // ms before typing begins
    const charDelay = 95; // ms per character
    const typeEnd = typeStart + word.length * charDelay;

    let typeInterval: ReturnType<typeof setInterval>;
    const startTyping = setTimeout(() => {
      let i = 0;
      typeInterval = setInterval(() => {
        i += 1;
        setTyped(word.slice(0, i));
        if (i >= word.length) clearInterval(typeInterval);
      }, charDelay);
    }, typeStart);

    const showResult = setTimeout(() => setStep(1), typeEnd + 350);
    const insert = setTimeout(() => setStep(2), typeEnd + 1250);

    return () => {
      clearTimeout(startTyping);
      clearTimeout(showResult);
      clearTimeout(insert);
      clearInterval(typeInterval);
    };
  }, [started]);

  // Measure the real dashboard height and keep it inside the stage vertically.
  useEffect(() => {
    const measure = () => {
      const stage = stageRef.current;
      const dash = dashboardRef.current;
      if (!stage || !dash || !stage.offsetHeight) return;
      const half = ((dash.offsetHeight / stage.offsetHeight) * 100) / 2;
      setDashboardHalfHeight(half);
      setDashboardPosition((p) => clampDashboardPosition(p.x, p.y, dashboardWidth, half));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboardWidth]);

  const clampDashboardPosition = (
    x: number,
    y: number,
    width = dashboardWidth,
    halfHeight = dashboardHalfHeight
  ) => {
    const halfWidth = width / 2;
    // If the card is taller than the stage, pin it to the centre.
    const minY = Math.min(50, halfHeight);
    const maxY = Math.max(50, 100 - halfHeight);
    return {
      x: Math.max(halfWidth, Math.min(100 - halfWidth, x)),
      y: Math.max(minY, Math.min(maxY, y)),
    };
  };

  const startDashboardDrag = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const stage = stageRef.current;
    if (!stage) return;

    const rect = stage.getBoundingClientRect();
    const startX = event.clientX;
    const startY = event.clientY;
    const startPosition = dashboardPosition;

    const onMove = (moveEvent: MouseEvent) => {
      const deltaX = ((moveEvent.clientX - startX) / rect.width) * 100;
      const deltaY = ((moveEvent.clientY - startY) / rect.height) * 100;
      setDashboardPosition(
        clampDashboardPosition(startPosition.x + deltaX, startPosition.y + deltaY)
      );
    };

    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const startDashboardResize = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    // Drag the handle to draw a curtain across the dashboard: reduces its
    // visible width from the right edge without reflowing the inner layout.
    const dashWidth = dashboardRef.current?.offsetWidth ?? 1;
    const startX = event.clientX;
    const startCurtain = curtain;

    const onMove = (moveEvent: MouseEvent) => {
      const deltaPct = ((startX - moveEvent.clientX) / dashWidth) * 100;
      setCurtain(Math.max(0, Math.min(72, startCurtain + deltaPct)));
    };

    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  return (
    <motion.div
      ref={stageRef}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease }}
      className="absolute inset-0 overflow-visible bg-transparent"
    >
      <motion.div
        ref={dashboardRef}
        className="absolute"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease, delay: 0.05 }}
        style={{
          top: `${dashboardPosition.y}%`,
          left: `${dashboardPosition.x}%`,
          width: `${dashboardWidth}%`,
          transform: "translate(-50%, -50%)",
          transformOrigin: "center",
          zIndex: 1,
        }}
      >
        <div style={{ width: `${100 - curtain}%`, overflow: "hidden" }}>
          <div style={{ width: `${(100 / (100 - curtain)) * 100}%` }}>
            <GalleryOsDashboard glass />
          </div>
        </div>
        <div
          className="absolute left-0 right-0 top-0 hidden h-7 cursor-move items-center justify-center rounded-t-[10px] md:flex"
          onMouseDown={startDashboardDrag}
          aria-hidden="true"
        >
          <div className="h-[3px] w-8 rounded-full bg-[#111110]/18 shadow-[0_0_0_1px_rgba(255,255,255,0.45)]" />
        </div>
        <div
          className="absolute bottom-0 top-0 hidden w-4 cursor-ew-resize items-center justify-center md:flex"
          style={{ right: `${curtain}%` }}
          onMouseDown={startDashboardResize}
          aria-hidden="true"
        >
          <div className="h-9 w-[3px] rounded-full bg-[#111110]/20 shadow-[0_0_0_1px_rgba(255,255,255,0.55)]" />
        </div>
        <div
          className="absolute bottom-2 hidden h-5 w-5 cursor-ew-resize items-center justify-center rounded-full border border-white/50 bg-white/60 text-[10px] text-[#111110]/45 shadow-[0_8px_20px_rgba(0,0,0,0.08)] backdrop-blur-sm md:flex"
          style={{ right: `calc(${curtain}% + 0.5rem)` }}
          onMouseDown={startDashboardResize}
          aria-hidden="true"
        >
          ↔
        </div>
      </motion.div>

      <motion.div
        drag
        dragConstraints={stageRef}
        dragMomentum={false}
        dragElastic={0.08}
        whileDrag={{ cursor: "grabbing" }}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease, delay: 0.22 }}
        className="absolute cursor-grab overflow-hidden rounded-[8px] border border-[#E8E8E6] bg-white shadow-[0_24px_60px_rgba(0,0,0,0.14)]"
        style={{ bottom: "4%", right: "8%", width: "30%", zIndex: 10 }}
      >
        <div className="flex items-center justify-between bg-[#F0F4F9] px-3 py-2">
          <span className="text-[11px] font-semibold text-[#202124]">New Message</span>
          <div className="flex items-center gap-2 text-[10px] text-[#5F6368]">
            <span>_</span>
            <span>↗</span>
            <span>×</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 border-b border-[#E8E8E6] px-3 py-2 text-[10px]">
          <span className="text-[#9AA0A6]">À</span>
          <span className="flex items-center gap-1 rounded-full bg-[#E8F0FE] px-2 py-0.5 text-[#1A73E8]">
            <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#1A73E8] text-[7px] font-semibold text-white">
              E
            </span>
            Eve Bertrand
          </span>
        </div>
        <div className="border-b border-[#E8E8E6] px-3 py-2 text-[10px] text-[#202124]">
          Disponibilité — Sacha Elron, « Evening Field »
        </div>
        <div className="relative min-h-[178px] px-3 pt-3 pb-2">
          {/* Empty draft placeholder — fades out as the artwork lands */}
          <motion.div
            className="absolute inset-x-3 top-3 space-y-1.5"
            initial={{ opacity: 0.7 }}
            animate={step >= 2 ? { opacity: 0 } : {}}
            transition={{ duration: 0.4, ease }}
          >
            <div className="h-2 w-3/4 rounded-full bg-[#EDEDEA]" />
            <div className="h-2 w-1/2 rounded-full bg-[#EDEDEA]" />
          </motion.div>
          {/* Inserted artwork — revealed by a soft vertical wipe */}
          <motion.div
            className="relative"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={step >= 2 ? { clipPath: "inset(0 0 0% 0)" } : {}}
            transition={{ duration: 0.7, ease, delay: 0.15 }}
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[3px]">
              <img
                src="/artworks/painting-05.jpg"
                alt="Evening field, 2023"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="flex items-start justify-between gap-2 pt-2.5">
              <div className="min-w-0">
                <p className="text-[10px] leading-tight text-[#202124]">Sun Dog</p>
                <p className="text-[10px] font-semibold italic leading-tight text-[#111110]">
                  Evening field, 2023
                </p>
                <p className="mt-1 text-[9px] leading-tight text-[#9AA0A6]">Acrylic on canvas</p>
                <p className="text-[9px] leading-tight text-[#9AA0A6]">120 × 120 cm</p>
                <p className="mt-1.5 text-[10px] leading-tight text-[#202124]">8 000 €</p>
              </div>
              <button className="shrink-0 rounded-[4px] border border-[#D4D4D0] px-2.5 py-1 text-[9px] text-[#111110] transition-colors hover:border-[#111110] hover:bg-[#111110] hover:text-white">
                Inquire
              </button>
            </div>
          </motion.div>
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
              initial={{ boxShadow: "0 0 0 0 rgba(17,17,16,0)" }}
              animate={
                started
                  ? {
                      scale: [1, 1.16, 1],
                      boxShadow: [
                        "0 0 0 0 rgba(17,17,16,0)",
                        "0 0 0 6px rgba(17,17,16,0.10)",
                        "0 0 0 0 rgba(17,17,16,0)",
                      ],
                    }
                  : {}
              }
              transition={{ duration: 0.7, ease, delay: 0.1 }}
            >
              V
            </motion.span>
          </div>
        </div>
      </motion.div>

      <motion.div
        drag
        dragConstraints={stageRef}
        dragMomentum={false}
        dragElastic={0.08}
        whileDrag={{ cursor: "grabbing" }}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease, delay: 0.38 }}
        className="absolute cursor-grab overflow-hidden rounded-[12px] border border-[#E8E8E6] bg-white pb-1 shadow-[0_18px_50px_rgba(0,0,0,0.16)]"
        style={{ bottom: "8%", right: "2%", width: "29%", zIndex: 20 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#EDEDEA] px-4 pb-1.5 pt-2.5">
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#8A8A86]">Vitreen</p>
          <span className="text-[14px] leading-none text-[#ADADAA]">×</span>
        </div>

        {/* Search */}
        <div className="flex items-center border-b border-[#EDEDEA] px-4 py-1.5 text-[12px] text-[#111110]">
          {typed.length === 0 && step === 0 ? (
            <span className="text-[#ADADAA]">Rechercher une œuvre…</span>
          ) : (
            <span>{typed}</span>
          )}
          {step < 1 && (
            <motion.span
              className="ml-px inline-block h-[14px] w-px bg-[#111110]"
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
            />
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-1.5 px-4 pt-2">
          {["Tout", "Disponibles", "Réservées", "Vendues", "NFS"].map((tag, i) => (
            <span
              key={tag}
              className={`rounded-full border px-2.5 py-[3px] text-[8.5px] ${
                i === 0
                  ? "border-[#111110] bg-[#111110] text-white"
                  : "border-[#E2E2DF] text-[#5F5E5B]"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Result card */}
        {step >= 1 && (
          <motion.div
            className="mx-4 mt-2 rounded-[10px] border border-[#6DA1FF] bg-[#F3F7FF] p-2"
            initial={{ opacity: 0, y: 6, boxShadow: "0 0 0 0 rgba(109,161,255,0)" }}
            animate={{
              opacity: 1,
              y: 0,
              boxShadow: [
                "0 0 0 0 rgba(109,161,255,0)",
                "0 0 0 6px rgba(109,161,255,0.14)",
                "0 0 0 0 rgba(109,161,255,0)",
              ],
            }}
            transition={{ duration: 0.55, ease }}
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] bg-[#2F6FE4] text-[8px] leading-none text-white">
                ✓
              </div>
              <div className="h-9 w-10 shrink-0 overflow-hidden rounded-[3px] border border-[#E2E2DF] bg-white p-[3px]">
                <img
                  src="/artworks/painting-05.jpg"
                  alt="Evening field"
                  className="h-full w-full rounded-[1px] object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[8.5px] font-semibold uppercase tracking-[0.12em] text-[#8A8A86]">
                  Sun Dog
                </p>
                <p className="truncate text-[11px] font-medium italic leading-tight text-[#111110]">
                  Evening field, 2023
                </p>
                <p className="mt-0.5 text-[9px] leading-tight text-[#3D3D3A]">8 000 €</p>
              </div>
              <span className="shrink-0 rounded-full border border-[#A8DDB5] bg-[#EAF8EE] px-2 py-0.5 text-[7.5px] uppercase tracking-[0.08em] text-[#4FA766]">
                Available
              </span>
            </div>
          </motion.div>
        )}

        {/* Footer */}
        {step >= 1 && (
          <motion.div
            className="mt-2 flex items-center justify-between border-t border-[#EDEDEA] px-4 py-1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease, delay: 0.1 }}
          >
            <span className="text-[9px] text-[#6B6A67]">1 œuvre sélectionnée</span>
            <div className="flex items-center gap-2">
              <button
                aria-label="Réinitialiser"
                className="flex h-6 w-6 items-center justify-center rounded-full border border-[#E2E2DF] text-[11px] leading-none text-[#6B6A67]"
              >
                ↺
              </button>
              <motion.button
                className="rounded-full bg-[#111110] px-3.5 py-1.5 text-[10px] font-medium text-white"
                initial={{ boxShadow: "0 0 0 0 rgba(17,17,16,0)" }}
                animate={
                  step >= 2
                    ? {
                        scale: [1, 0.94, 1.05, 1],
                        boxShadow: [
                          "0 0 0 0 rgba(17,17,16,0)",
                          "0 0 0 5px rgba(17,17,16,0.16)",
                          "0 0 0 0 rgba(17,17,16,0)",
                        ],
                      }
                    : {}
                }
                transition={{ duration: 0.6, ease }}
              >
                Insérer
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function HeroDashboardMock() {
  return (
    <section className="bg-white px-4 pb-12 md:px-6 md:pb-[60px]">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease, delay: 0.1 }}
          className="relative h-[420px] overflow-hidden rounded md:h-[720px]"
          style={{ border: "0.1px solid #D4D4D0" }}
        >
          <div
            className="absolute inset-0 bg-cover"
            style={{
              backgroundImage: "url('/colin deland.jpeg')",
              backgroundPosition: "25% center",
            }}
          />
          <HeroWorkflowAnimation />
        </motion.div>
      </div>
    </section>
  );
}
