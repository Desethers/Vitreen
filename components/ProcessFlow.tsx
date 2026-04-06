"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.6, ease, delay },
});

const steps = [
  {
    number: "01",
    title: "Discovery",
    desc: "Nous commençons par comprendre vos contenus et votre fonctionnement. Artistes, œuvres, expositions : tout est structuré avant de concevoir.",
    week: "SEMAINE 1",
  },
  {
    number: "02",
    title: "Design & intégration.",
    desc: "Un design précis, adapté à votre identité et propulsé par un CMS intuitif, conçu pour engager durablement collectionneurs et professionnels.",
    week: "SEMAINE 2",
  },
  {
    number: "03",
    title: "Mise en ligne.",
    desc: "Site livré, formation à l'outil incluse. Vous êtes autonome dès le premier jour. Un système simple et durable pour faire évoluer vos contenus en toute indépendance.",
    week: "SEMAINE 3",
  },
];

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
            Passez à une nouvelle génération de site galerie
          </h2>
          <p className="mt-0 text-[#6B6A67] text-[20px] md:text-[26px] font-normal leading-[1.2] tracking-[-0.02em]">
            Site livré en 3 semaines
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
