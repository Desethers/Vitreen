"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/lib/lang";

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
// t=1060ms → bord droit touche cercle 02 → absorption (scaleX→0) → cercle 02 s'allume
//            → ligne 2 démarre immédiatement comme une continuité de flux
// t=1920ms → bord droit touche cercle 03 → absorption → cercle 03 s'allume
// t=3600ms → reset & boucle
//
// Note : x="150%" = translateX(150% de la largeur propre de l'élément = 60% du container)
// → bord droit = 60% + 40% = 100% du container = exactement sur le cercle suivant
// Vertical (mobile) : même logique avec y / scaleY et transformOrigin bottom

const T_CIRCLE_2 = 1060;
const T_CIRCLE_3 = 1920;
const T_LINE_1   = 200;
const T_LINE_2   = 1060;  // démarre quand le flux traverse le cercle 02
const LINE_DUR   = 1.05;  // secondes
const ARRIVE_AT  = 0.82;  // fraction de LINE_DUR où le bord droit touche le cercle
const LOOP_MS    = 3600;

const stepTwoLogos = [
  { src: "/logos/google-gmail-svgrepo-com.svg", alt: "Gmail", className: "h-7 w-7" },
  { src: "/logos/Microsoft_Office_Outlook_Logo.svg", alt: "Outlook", className: "h-7 w-7" },
  { src: "/logos/pdf-svgrepo-com.svg", alt: "PDF", className: "h-7 w-7" },
  { src: "/logos/Microsoft_Office_Excel_Logo.svg", alt: "Excel", className: "h-7 w-7" },
  { src: "/logos/Android_App_Icon_2026.png", alt: "WhatsApp", className: "h-7 w-7" },
];

function StepTwoLogoStrip() {
  return (
    <div className="mt-4 flex items-center gap-5">
      {stepTwoLogos.map((logo) => (
        <span
          key={logo.src}
          className="flex h-7 w-7 shrink-0 items-center justify-center"
        >
          <img
            src={logo.src}
            alt={logo.alt}
            className={`object-contain ${logo.className}`}
            loading="lazy"
          />
        </span>
      ))}
    </div>
  );
}

function CollectorReplySnippet({ lang }: { lang: "fr" | "en" }) {
  const copy =
    lang === "fr"
      ? {
          name: "James Collector",
          meta: "Gmail · il y a 2 h",
          message: "Intéressé par Untitled, 2024.",
        }
      : {
          name: "James Collector",
          meta: "Gmail · 2h ago",
          message: "Interested in Untitled, 2024.",
        };

  return (
    <div className="mt-4 max-w-sm rounded-[8px] border border-[#E8E8E6] bg-white p-3 shadow-[0_10px_24px_rgba(17,17,16,0.04)]">
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F4F4F2] text-[11px] font-medium text-[#6B6A67]">
          JC
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <p className="truncate text-[13px] font-medium leading-none tracking-[-0.01em] text-[#111110]">
              {copy.name}
            </p>
            <span className="flex shrink-0 items-center gap-1.5 text-[10px] leading-none text-[#ADADAA]">
              <img
                src="/logos/google-gmail-svgrepo-com.svg"
                alt="Gmail"
                className="h-3.5 w-3.5 object-contain"
                loading="lazy"
              />
              {copy.meta}
            </span>
          </div>
          <p className="mt-2 text-[13px] leading-[1.45] tracking-[-0.01em] text-[#425466]">
            {copy.message}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ProcessFlow() {
  const { lang, t } = useLang();
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
    <section className="pt-12 md:pt-[60px] pb-12 md:pb-[60px] px-4 md:px-6 bg-white">
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
                  {"tags" in step && step.tags && i === 0 ? (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {step.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[#E1E1DE] bg-white px-2.5 py-1 text-[11px] font-medium leading-none text-[#111110]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <p className="mt-2 text-[14px] leading-[1.6] text-[#425466]">{step.desc}</p>
                  {i === 1 ? (
                    <StepTwoLogoStrip />
                  ) : null}
                  {i === 2 ? (
                    <CollectorReplySnippet lang={lang} />
                  ) : null}
                  <p
                    className={
                      "tags" in step && step.tags
                        ? "mt-3 text-[14px] leading-[1.55] text-[#6B6A67]"
                        : "mt-3 text-[11px] uppercase tracking-[0.08em] text-[#ADADAA]"
                    }
                  >
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
                  <motion.div
                    className="ml-4 h-px min-w-0 flex-1 relative overflow-hidden"
                    animate={{
                      backgroundColor:
                        i === 0 || activeCircle >= i
                          ? "rgba(17, 17, 16, 0.12)"
                          : "rgba(17, 17, 16, 0)",
                    }}
                    transition={{ duration: 0.24, ease: "easeOut" }}
                  >
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
                  </motion.div>
                )}
                {i === steps.length - 1 && (
                  <div className="ml-4 h-px min-w-0 flex-1 relative overflow-visible">
                    <motion.div
                      key={`seg-out-${loopKey}`}
                      className="absolute inset-y-0 left-0"
                      style={{
                        background:
                          "linear-gradient(90deg, #111110 0%, #111110 52%, rgba(17,17,16,0.5) 74%, rgba(255,255,255,0) 100%)",
                      }}
                      initial={{ width: "0%", opacity: 0 }}
                      animate={
                        activeCircle >= i
                          ? {
                              width: ["0%", "100%", "100%"],
                              opacity: [0, 1, 0],
                            }
                          : { width: "0%", opacity: 0 }
                      }
                      transition={{
                        duration: 1.45,
                        times: [0, 0.56, 1],
                        ease: [0.35, 0, 0.65, 1],
                      }}
                    />
                    <motion.div
                      key={`seg-out-glow-${loopKey}`}
                      className="pointer-events-none absolute right-[-34px] top-1/2 h-14 w-24 -translate-y-1/2"
                      style={{
                        background:
                          "radial-gradient(circle at center, rgba(255,255,255,1) 0%, rgba(255,255,255,0.98) 42%, rgba(255,255,255,0) 76%)",
                      }}
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={
                        activeCircle >= i
                          ? {
                              opacity: [0, 1, 1, 0],
                              scale: [0.7, 1, 1.12, 1.22],
                            }
                          : { opacity: 0, scale: 0.7 }
                      }
                      transition={{
                        duration: 1.45,
                        times: [0, 0.44, 0.76, 1],
                        ease: [0.35, 0, 0.65, 1],
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
                {"tags" in step && step.tags && i === 0 ? (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {step.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[#E1E1DE] bg-white px-2.5 py-1 text-[11px] font-medium leading-none text-[#111110]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
                <p className="mt-2 text-[14px] leading-[1.6] text-[#425466]">{step.desc}</p>
                {i === 1 ? (
                  <StepTwoLogoStrip />
                ) : null}
                {i === 2 ? (
                  <CollectorReplySnippet lang={lang} />
                ) : null}
                <p
                  className={
                    "tags" in step && step.tags
                      ? "mt-3 text-[14px] leading-[1.55] text-[#6B6A67]"
                      : "mt-4 text-[11px] uppercase tracking-[0.08em] text-[#ADADAA]"
                  }
                >
                  {step.week}
                </p>
              </motion.li>
            ))}
          </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
