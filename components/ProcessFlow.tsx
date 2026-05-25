"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/lib/lang";

/* ─── Visual sub-components (used in ProcessFlow + ArtworkSourceSection) ─── */

const stepTwoLogos = [
  { src: "/logos/google-gmail-svgrepo-com.svg", alt: "Gmail" },
  { src: "/logos/Microsoft_Office_Outlook_Logo.svg", alt: "Outlook" },
  { src: "/logos/pdf-svgrepo-com.svg", alt: "PDF" },
  { src: "/logos/Microsoft_Office_Excel_Logo.svg", alt: "Excel" },
  { src: "/logos/Android_App_Icon_2026.png", alt: "WhatsApp" },
];

export function StepOnePillIcon({ tag }: { tag: string }) {
  const normalized = tag.toLowerCase();
  const commonProps = {
    className: "h-3 w-3 shrink-0",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.7,
    viewBox: "0 0 16 16",
    "aria-hidden": true,
  };
  if (normalized.includes("artwork") || normalized.includes("oeuvre")) return <svg {...commonProps}><rect x="3" y="3" width="10" height="10" rx="1.5" /><path d="M5.5 10.5 7.1 8.9l1.2 1.2 1.9-2.4 1.3 2.8" /></svg>;
  if (normalized.includes("artist")) return <svg {...commonProps}><path d="M8 8.2a2.3 2.3 0 1 0 0-4.6 2.3 2.3 0 0 0 0 4.6Z" /><path d="M3.8 13c.7-1.9 2.1-3 4.2-3s3.5 1.1 4.2 3" /></svg>;
  if (normalized.includes("collector")) return <svg {...commonProps}><path d="M5.2 7.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" /><path d="M10.8 7.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" /><path d="M2.5 12.8c.5-1.8 1.4-2.7 2.7-2.7s2.2.9 2.7 2.7" /><path d="M8.1 12.8c.5-1.8 1.4-2.7 2.7-2.7s2.2.9 2.7 2.7" /></svg>;
  if (normalized.includes("exhibition")) return <svg {...commonProps}><path d="M3 4h10" /><path d="M4 4v7.5h8V4" /><path d="M6.2 11.5 8 8.8l1.8 2.7" /></svg>;
  if (normalized.includes("crm")) return <svg {...commonProps}><rect x="3" y="3.5" width="10" height="9" rx="1.5" /><path d="M5.5 6.2h5" /><path d="M5.5 8h5" /><path d="M5.5 9.8h3" /></svg>;
  return <svg {...commonProps}><rect x="2.8" y="4.2" width="10.4" height="7.6" rx="1.4" /><path d="m3.2 5 4.8 3.6L12.8 5" /></svg>;
}

export function StepTwoSharingFlow() {
  const [gmail, outlook, , excel, whatsApp] = stepTwoLogos;
  const pdf = stepTwoLogos[2];
  const cardLeft = 104, cardRight = 176, cardTop = 8, cardBottom = 116;
  const cardMidY = (cardTop + cardBottom) / 2;
  const leftIcons = [
    { src: gmail.src, alt: gmail.alt, y: 10 },
    { src: outlook.src, alt: outlook.alt, y: cardMidY },
    { src: excel.src, alt: excel.alt, y: 114 },
  ];
  const rightIcons = [
    { src: pdf.src, alt: pdf.alt, y: 20 },
    { src: whatsApp.src, alt: whatsApp.alt, y: 104 },
  ];
  return (
    <div className="relative h-[124px] w-full">
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 280 124" fill="none" aria-hidden="true">
        {leftIcons.map((icon, i) => {
          const endY = cardMidY + (icon.y - cardMidY) * 0.35;
          const cx = (22 + cardLeft) / 2;
          return <path key={`l-${i}`} d={`M22 ${icon.y} C${cx} ${icon.y} ${cx} ${endY} ${cardLeft} ${endY}`} stroke="rgba(17,17,16,0.16)" strokeWidth="0.75" strokeLinecap="round" />;
        })}
        {rightIcons.map((icon, i) => {
          const startY = cardMidY + (icon.y - cardMidY) * 0.35;
          const cx = (cardRight + 258) / 2;
          return <path key={`r-${i}`} d={`M${cardRight} ${startY} C${cx} ${startY} ${cx} ${icon.y} 258 ${icon.y}`} stroke="rgba(17,17,16,0.16)" strokeWidth="0.75" strokeLinecap="round" />;
        })}
      </svg>
      {leftIcons.map((icon) => (
        <div key={`li-${icon.alt}`} className="absolute flex h-4 w-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center" style={{ left: `${(22/280)*100}%`, top: `${(icon.y/124)*100}%` }}>
          <img src={icon.src} alt={icon.alt} className="h-4 w-4 object-contain" loading="lazy" />
        </div>
      ))}
      <div className="absolute z-10 flex flex-col overflow-hidden rounded-[3px] bg-white shadow-[0_10px_24px_rgba(17,17,16,0.06)]"
        style={{
          left:`${(cardLeft/280)*100}%`,
          right:`${((280-cardRight)/280)*100}%`,
          top:`${(cardTop/124)*100}%`,
          bottom:`${((124-cardBottom)/124)*100}%`,
          border: "0.5px solid #E3E3DF",
        }}>
        <div
          className="relative flex-shrink-0 overflow-hidden"
          style={{ flexBasis: "62%", background: "#FCFCFB" }}
        >
          {/* Wall — slight gradient + ambient occlusion */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, #FBFAF8 0%, #F6F5F2 70%, #ECEBE7 100%)",
            }}
          />
          {/* Painting on the wall — centered */}
          <div
            className="absolute"
            style={{
              top: "14%",
              left: "26%",
              width: "48%",
              height: "60%",
              background: "linear-gradient(160deg, #C9D2EE 0%, #B8C3E6 100%)",
              boxShadow:
                "0 0.4px 0.6px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.10)",
            }}
          />
          {/* Floor strip */}
          <div
            className="absolute inset-x-0 bottom-0"
            style={{
              height: "18%",
              background:
                "linear-gradient(180deg, #B8B5AE 0%, #A6A39C 55%, #908D86 100%)",
            }}
          />
          {/* Floor reflection of painting */}
          <div
            className="absolute"
            style={{
              bottom: "12%",
              left: "26%",
              width: "48%",
              height: "5%",
              background:
                "linear-gradient(180deg, rgba(184,195,230,0.45) 0%, rgba(184,195,230,0) 100%)",
              filter: "blur(0.3px)",
            }}
          />
          {/* Skirting line between wall and floor */}
          <div
            className="absolute inset-x-0"
            style={{
              bottom: "18%",
              height: "0.3px",
              background: "rgba(0,0,0,0.08)",
            }}
          />
        </div>
        <div className="flex flex-1 flex-col gap-[1px] px-1.5 pt-[2px] pb-[2px]">
          <span className="truncate text-[4.5px] leading-tight text-[#6B6A67]">Sacha Elron</span>
          <span className="truncate text-[5.5px] leading-tight text-[#111110]">
            <span className="font-semibold">Dawn Study No. 7</span>
            <span className="text-[#ADADAA]">, 2023</span>
          </span>
          <div className="mt-[1px] flex justify-end">
            <span
              className="rounded-full px-[3px] py-[0.5px] text-[3.5px] leading-none text-[#1A8F4B]"
              style={{ border: "0.3px solid #1A8F4B" }}
            >
              Available
            </span>
          </div>
        </div>
      </div>
      {rightIcons.map((icon) => (
        <div key={`ri-${icon.alt}`} className="absolute flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center" style={{ left:`${(258/280)*100}%`, top:`${(icon.y/124)*100}%` }}>
          <img src={icon.src} alt={icon.alt} className="h-5 w-5 object-contain" loading="lazy" />
        </div>
      ))}
    </div>
  );
}

export function DeployCardStack({ lang }: { lang: "fr" | "en" }) {
  const events = [
    { label: "Private PDF shared", meta: "VIP collectors · Opening preview", time: "09:18" },
    { label: "Interested in Untitled, 2024", meta: "Availability requested", time: "09:24" },
    { label: "Collector follow-up", meta: "Assigned internally", time: "09:30" },
  ];
  return (
    <div className="relative h-[80px]">
      {events.map((event, index) => (
        <div key={event.label} className="absolute inset-x-0 grid grid-cols-[auto_1fr_auto] items-center gap-2.5 rounded-[6px] border border-[#EFEFEB] bg-white px-2.5 py-2 shadow-[0_4px_14px_rgba(17,17,16,0.06)]"
          style={{ zIndex: events.length - index, top: index * 14, left: index * 10, right: index * 10, opacity: 1 - index * 0.2, transform: `scale(${1 - index * 0.04})`, transformOrigin: "top center" }}>
          <span className="h-2 w-2 rounded-full bg-[#111110]" aria-hidden="true" />
          <div className="min-w-0">
            <p className="truncate text-[12px] leading-none text-[#111110]">{event.label}</p>
            <p className="mt-1 truncate text-[10px] leading-none text-[#8A8A86]">{event.meta}</p>
          </div>
          <span className="text-[10px] leading-none text-[#ADADAA] tabular-nums">{event.time}</span>
        </div>
      ))}
    </div>
  );
}

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.6, ease, delay },
});


// Séquence (continuité maximale) :
// t=0ms    → cercle 01 s'allume
// t=200ms  → segment entre dans la ligne 1 (durée 900ms)
// t=938ms  → bord droit touche cercle 02 → absorption (scaleX→0) → cercle 02 s'allume
//            → ligne 2 démarre immédiatement (continuité)
// t=1676ms → bord droit touche cercle 03 → absorption → cercle 03 s'allume
// t=3400ms → reset & boucle
//
// Note : x="150%" = translateX(150% de la largeur propre de l'élément = 60% du container)
// → bord droit = 60% + 40% = 100% du container = exactement sur le cercle suivant
// Vertical (mobile) : même logique avec y / scaleY et transformOrigin bottom

const T_CIRCLE_2 = 1060;
const T_CIRCLE_3 = 1920;
const T_LINE_1   = 200;
const T_LINE_2   = 1060;  // démarre exactement quand le segment touche cercle 02
const LINE_DUR   = 1.05;  // secondes
const ARRIVE_AT  = 0.82;  // fraction de LINE_DUR où le bord droit touche le cercle
const LOOP_MS    = 3600;

export default function ProcessFlow() {
  const { t } = useLang();
  const steps = t.processFlow.steps;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [loopKey, setLoopKey]         = useState(0);
  const [activeCircle, setActiveCircle] = useState(-1);
  const [activeLine, setActiveLine]   = useState(-1);

  useEffect(() => {
    if (!isInView) return;

    // Cercle 01 s'allume immédiatement, lignes et cercles suivants via timers
    setActiveCircle(0);
    setActiveLine(-1);

    const timers: ReturnType<typeof setTimeout>[] = [];

    timers.push(setTimeout(() => setActiveLine(0),    T_LINE_1));
    timers.push(setTimeout(() => setActiveCircle(1),  T_CIRCLE_2));
    timers.push(setTimeout(() => setActiveLine(1),    T_LINE_2));
    timers.push(setTimeout(() => setActiveCircle(2),  T_CIRCLE_3));
    timers.push(setTimeout(() => setLoopKey((k) => k + 1), LOOP_MS));

    return () => timers.forEach(clearTimeout);
  }, [isInView, loopKey]);

  return (
    <section id="solutions" className="pt-12 md:pt-[60px] pb-12 md:pb-[60px] px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div {...fadeUp(0)} className="mb-8 md:mb-14">
          <h2 className="font-display text-[20px] md:text-[26px] font-normal text-[#111110] leading-[1.2] tracking-[-0.02em]">
            {t.processFlow.title}
          </h2>
          <p className="mt-0 text-[#6B6A67] text-[20px] md:text-[26px] font-normal leading-[1.2] tracking-[-0.02em]">
            {t.processFlow.subtitle}
          </p>
        </motion.div>

        <div ref={ref}>
          {/* Mobile — même séquence que le stepper horizontal, connecteurs verticaux */}
          <motion.ol
            {...fadeUp(0.1)}
            className="m-0 flex list-none flex-col gap-0 p-0 md:hidden"
          >
            {steps.map((step, i) => (
              <li key={step.number} className="flex gap-4">
                <div className="flex w-9 shrink-0 flex-col items-center self-stretch">
                  <motion.div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-normal tracking-[-0.02em]"
                    animate={{
                      backgroundColor: activeCircle >= i ? "#111110" : "#ffffff",
                      color: activeCircle >= i ? "#ffffff" : "#111110",
                    }}
                    transition={{
                      backgroundColor: { duration: 0.28, ease: "easeIn" },
                      color: { duration: 0.2 },
                    }}
                    style={{ border: "1px solid #111110" }}
                  >
                    {step.number}
                  </motion.div>
                  {i < steps.length - 1 && (
                    <div className="relative mx-auto min-h-[48px] w-px flex-1 bg-[#111110]/12 overflow-hidden">
                      <motion.div
                        key={`seg-v-${loopKey}-${i}`}
                        className="absolute inset-x-0 bg-[#111110]"
                        style={{
                          top: 0,
                          height: "40%",
                          transformOrigin: "bottom center",
                        }}
                        initial={{ y: "-100%", scaleY: 1 }}
                        animate={
                          activeLine >= i
                            ? {
                                y: ["-100%", "150%", "150%"],
                                scaleY: [1, 1, 0],
                              }
                            : { y: "-100%", scaleY: 1 }
                        }
                        transition={{
                          duration: LINE_DUR,
                          times: [0, ARRIVE_AT, 1],
                          ease: [0.35, 0, 0.65, 1],
                        }}
                      />
                    </div>
                  )}
                </div>
                <motion.div
                  className={
                    i < steps.length - 1
                      ? "min-w-0 flex-1 pt-0.5 pb-10"
                      : "min-w-0 flex-1 pt-0.5"
                  }
                  initial={{ opacity: 0.35 }}
                  animate={{ opacity: activeCircle >= i ? 1 : 0.35 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <p className="font-normal text-base text-[#111110] tracking-[-0.02em]">
                    {step.title}
                  </p>
                  <p className="mt-2 text-[14px] leading-[1.6] text-[#425466]">{step.desc}</p>
                  <p className="mt-3 text-[11px] uppercase tracking-[0.08em] text-[#ADADAA]">
                    {step.week}
                  </p>
                </motion.div>
              </li>
            ))}
          </motion.ol>

          {/* Desktop */}
          <div className="hidden md:block">
          {/* Cercles + connecteurs */}
          <div className="mb-8 grid w-full grid-cols-3 items-center">
            {steps.map((step, i) => (
              <div key={step.number} className="flex min-w-0 items-center">
                {/* Cercle */}
                <motion.div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xs font-normal tracking-[-0.02em]"
                  animate={{
                    backgroundColor: activeCircle >= i ? "#111110" : "#ffffff",
                    color:           activeCircle >= i ? "#ffffff" : "#111110",
                  }}
                  transition={{
                    backgroundColor: { duration: 0.28, ease: "easeIn" },
                    color:           { duration: 0.2 },
                  }}
                  style={{ border: "1px solid #111110" }}
                >
                  {step.number}
                </motion.div>

                {/* Ligne connectrice avec segment voyageur */}
                {i < steps.length - 1 && (
                  <div className="ml-4 h-px min-w-0 flex-1 relative bg-[#111110]/12 overflow-hidden">
                    <motion.div
                      // La clé force un remount du segment à chaque boucle
                      key={`seg-${loopKey}-${i}`}
                      className="absolute inset-y-0 bg-[#111110]"
                      // transformOrigin: right → le bord droit reste fixé sur le cercle pendant l'absorption
                      style={{ left: 0, width: "40%", transformOrigin: "right center" }}
                      // x="150%" : translateX(150% de la largeur propre 40%) = 60% du container
                      //   → bord droit = 60% + 40% = 100% = exactement sur le cercle
                      // scaleX 1→0 : la queue rattrape le bord droit (absorption dans le cercle)
                      initial={{ x: "-100%", scaleX: 1 }}
                      animate={
                        activeLine >= i
                          ? {
                              x:      ["-100%", "150%", "150%"],
                              scaleX: [1,       1,      0],
                            }
                          : { x: "-100%", scaleX: 1 }
                      }
                      transition={{
                        duration: LINE_DUR,
                        times:    [0, ARRIVE_AT, 1],
                        ease:     [0.35, 0, 0.65, 1],
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Colonnes de texte */}
          <ol className="m-0 grid list-none grid-cols-3 gap-10 p-0">
            {steps.map((step, i) => (
              <motion.li
                key={step.number}
                className="min-w-0"
                initial={{ opacity: 0.35 }}
                animate={{ opacity: activeCircle >= i ? 1 : 0.35 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <p className="font-normal text-base text-[#111110] tracking-[-0.02em] mb-0">{step.title}</p>
                <p className="mt-2 text-[14px] leading-[1.6] text-[#425466]">{step.desc}</p>
                <p className="mt-4 text-[11px] uppercase tracking-[0.08em] text-[#ADADAA]">{step.week}</p>
              </motion.li>
            ))}
          </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
