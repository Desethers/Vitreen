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
    week: "SEMAINE 2",
  },
];

// Timings : step s'active, puis la ligne se remplit, puis step suivant
const STEP_TIMINGS = [0, 900, 1800]; // ms où chaque cercle s'allume
const LINE_TIMINGS = [300, 1200];    // ms où chaque ligne commence à se remplir

export default function ProcessFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeStep, setActiveStep] = useState(-1);
  const [activeLine, setActiveLine] = useState(-1);

  useEffect(() => {
    if (!isInView) return;
    const timers: ReturnType<typeof setTimeout>[] = [];

    STEP_TIMINGS.forEach((t, i) => {
      timers.push(setTimeout(() => setActiveStep(i), t));
    });
    LINE_TIMINGS.forEach((t, i) => {
      timers.push(setTimeout(() => setActiveLine(i), t));
    });

    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  return (
    <section className="py-20 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div {...fadeUp(0)} className="mb-14">
          <h2 className="font-display text-[26px] font-normal text-[#111110] leading-[1.3] tracking-[-0.02em]">
            Passez à une nouvelle génération de site galerie.
          </h2>
          <p className="mt-0.5 text-[#6B6A67] text-[26px] font-normal leading-[1.3] tracking-[-0.02em]">
            Site livré en 2 semaines.
          </p>
        </motion.div>

        {/* Mobile */}
        <motion.ol {...fadeUp(0.1)} className="flex list-none flex-col gap-10 p-0 m-0 md:hidden">
          {steps.map((step) => (
            <li key={step.number} className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#111110] bg-white text-xs font-semibold tracking-[-0.02em] text-[#111110]">
                {step.number}
              </div>
              <div className="min-w-0 pt-0.5">
                <p className="font-medium text-base text-[#111110] tracking-[-0.02em]">{step.title}</p>
                <p className="mt-2 text-[14px] leading-[1.6] text-[#6B6A67]">{step.desc}</p>
                <p className="mt-3 text-[11px] uppercase tracking-[0.08em] text-[#ADADAA]">{step.week}</p>
              </div>
            </li>
          ))}
        </motion.ol>

        {/* Desktop */}
        <div ref={ref} className="hidden md:block">
          {/* Circles + connectors */}
          <div className="mb-8 grid w-full grid-cols-3 items-center">
            {steps.map((step, i) => {
              const isActive = activeStep >= i;
              return (
                <div key={step.number} className="flex min-w-0 items-center">
                  {/* Circle */}
                  <motion.div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xs font-semibold tracking-[-0.02em]"
                    animate={{
                      backgroundColor: isActive ? "#111110" : "#ffffff",
                      color: isActive ? "#ffffff" : "#111110",
                      borderColor: "#111110",
                      scale: isActive && activeStep === i ? [1, 1.12, 1] : 1,
                    }}
                    transition={{
                      backgroundColor: { duration: 0.4, ease: "easeOut" },
                      color: { duration: 0.3 },
                      scale: { duration: 0.35, ease: [0.34, 1.56, 0.64, 1] },
                    }}
                    style={{ border: "1px solid #111110" }}
                  >
                    {step.number}
                  </motion.div>

                  {/* Connector line */}
                  {i < steps.length - 1 && (
                    <div className="ml-4 h-px min-w-0 flex-1 relative bg-[#111110]/12 overflow-hidden">
                      <motion.div
                        className="absolute inset-y-0 bg-[#111110]"
                        initial={{ x: "-100%" }}
                        animate={{ x: activeLine > i ? "260%" : "-100%" }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        style={{ left: 0, width: "35%" }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Text columns */}
          <ol className="m-0 grid list-none grid-cols-3 gap-10 p-0">
            {steps.map((step, i) => (
              <motion.li
                key={step.number}
                className="min-w-0"
                initial={{ opacity: 0.35 }}
                animate={{ opacity: activeStep >= i ? 1 : 0.35 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <p className="font-medium text-base text-[#111110] tracking-[-0.02em] mb-0">{step.title}</p>
                <p className="mt-2 text-[14px] leading-[1.6] text-[#6B6A67]">{step.desc}</p>
                <p className="mt-4 text-[11px] uppercase tracking-[0.08em] text-[#ADADAA]">{step.week}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
