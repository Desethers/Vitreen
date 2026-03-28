"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.6, ease, delay },
});

const steps = [
  {
    title: "Discovery",
    body: "Nous commençons par comprendre vos contenus et votre fonctionnement. Artistes, œuvres, expositions : tout est structuré avant de concevoir.",
    label: "Semaine 1",
  },
  {
    title: "Design & intégration.",
    body: "Un design précis, adapté à votre identité et propulsé par un CMS intuitif, conçu pour engager durablement collectionneurs et professionnels.",
    label: "Semaine 2",
  },
  {
    title: "Mise en ligne.",
    body: "Site livré, formation à l'outil incluse. Vous êtes autonome dès le premier jour. Un système simple et durable pour faire évoluer vos contenus en toute indépendance.",
    label: "Semaine 2",
  },
];

function StepCircle({ n }: { n: number }) {
  return (
    <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-[1px] border-solid border-[#000000] bg-white text-xs font-semibold tracking-[-0.02em] text-[#000000]">
      {String(n).padStart(2, "0")}
    </div>
  );
}

export default function Process() {
  return (
    <section id="processus" className="py-16 md:py-24 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp(0)} className="mb-12 md:mb-16 max-w-3xl">
          <h2 className="font-display text-[26px] md:text-[26px] font-normal text-[#111110] leading-[1.3] tracking-[-0.02em]">
            Passez à une nouvelle génération de site galerie.
          </h2>
          <p className="mt-0.5 text-[#6B6A67] text-[26px] font-normal max-w-xl leading-[1.3] tracking-[-0.02em]">
            Site livré en 2 semaines.
          </p>
        </motion.div>

        {/* Mobile : empilement avec pastille à gauche */}
        <motion.ol
          {...fadeUp(0.1)}
          className="flex list-none flex-col gap-10 p-0 m-0 md:hidden"
        >
          {steps.map((step, i) => (
            <li key={step.title} className="flex gap-4">
              <StepCircle n={i + 1} />
              <div className="min-w-0 pt-0.5">
                <p
                  className={`font-display text-base text-[#000000] tracking-[-0.02em] ${
                    step.title === "Mise en ligne."
                      ? "font-medium"
                      : "font-semibold"
                  }`}
                >
                  {step.title}
                </p>
                <p className="mt-2 text-[15px] leading-[1.65] text-[#000000]/80 tracking-[-0.01em]">
                  {step.body}
                </p>
                <p className="mt-3 text-xs font-medium uppercase tracking-[0.06em] text-[#000000]/45">
                  {step.label}
                </p>
              </div>
            </li>
          ))}
        </motion.ol>

        {/* Desktop : rail horizontal + grille de textes */}
        <motion.div {...fadeUp(0.1)} className="hidden md:block">
          <div className="mb-10 grid w-full grid-cols-3 gap-6 lg:gap-10 items-center">
            <div className="flex min-w-0 items-center">
              <StepCircle n={1} />
              <div
                className="ml-4 h-px min-w-0 flex-1 bg-[#000000]/12"
                aria-hidden
              />
            </div>
            <div className="flex min-w-0 items-center">
              <StepCircle n={2} />
              <div
                className="ml-4 h-px min-w-0 flex-1 bg-[#000000]/12"
                aria-hidden
              />
            </div>
            <div className="flex min-w-0 items-center">
              <StepCircle n={3} />
            </div>
          </div>

          <ol className="m-0 grid list-none grid-cols-3 gap-6 lg:gap-10 p-0">
            {steps.map((step) => (
              <li key={step.title} className="min-w-0">
                <p
                  className={`font-display text-base lg:text-lg text-[#000000] tracking-[-0.02em] ${
                    step.title === "Mise en ligne."
                      ? "font-medium"
                      : "font-semibold"
                  }`}
                >
                  {step.title}
                </p>
                <p className="mt-3 text-[15px] lg:text-base leading-[1.65] text-[#000000]/80 tracking-[-0.01em]">
                  {step.body}
                </p>
                <p className="mt-4 text-xs font-medium uppercase tracking-[0.06em] text-[#000000]/45">
                  {step.label}
                </p>
              </li>
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  );
}
