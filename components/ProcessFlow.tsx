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

export default function ProcessFlow() {
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
        <motion.div {...fadeUp(0.1)} className="hidden md:block">
          {/* Circles + connectors */}
          <div className="mb-8 grid w-full grid-cols-3 items-center">
            {steps.map((step, i) => (
              <div key={step.number} className="flex min-w-0 items-center">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#111110] bg-white text-xs font-semibold tracking-[-0.02em] text-[#111110]">
                  {step.number}
                </div>
                {i < steps.length - 1 && (
                  <div className="ml-4 h-px min-w-0 flex-1 bg-[#111110]/12" aria-hidden />
                )}
              </div>
            ))}
          </div>

          {/* Text columns */}
          <ol className="m-0 grid list-none grid-cols-3 gap-10 p-0">
            {steps.map((step) => (
              <li key={step.number} className="min-w-0">
                <p className="font-medium text-base text-[#111110] tracking-[-0.02em] mb-0">{step.title}</p>
                <p className="mt-2 text-[14px] leading-[1.6] text-[#6B6A67]">{step.desc}</p>
                <p className="mt-4 text-[11px] uppercase tracking-[0.08em] text-[#ADADAA]">{step.week}</p>
              </li>
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  );
}
