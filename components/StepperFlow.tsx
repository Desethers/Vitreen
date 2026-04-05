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
    action: "Publier une œuvre",
    result:
      "Ajoutez une œuvre ou une exposition → elle apparaît instantanément sur votre site.",
  },
  {
    number: "02",
    action: "Partager",
    result:
      "Partagez instantanément : liens publics, Viewing Rooms privés ou emails ciblés.",
  },
  {
    number: "03",
    action: "Convertir & Fidéliser",
    result:
      "Les demandes arrivent directement, sans intermédiaire. Vous créez des relations de confiance et préparez les ventes de demain.",
  },
];

function StepCircle({ n }: { n: string }) {
  return (
    <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#111110] bg-white text-xs font-semibold tracking-[-0.02em] text-[#111110]">
      {n}
    </div>
  );
}

export default function StepperFlow() {
  return (
    <section className="py-20 px-4 md:px-6 bg-white border-t border-[#E8E8E6]">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp(0)} className="mb-12 md:mb-16 max-w-3xl">
          <h2 className="font-display text-[20px] md:text-[26px] font-normal text-[#111110] leading-[1.3] tracking-[-0.02em]">
            Du contenu à la diffusion.
          </h2>
          <p className="mt-0.5 text-[#6B6A67] text-[20px] md:text-[26px] font-normal max-w-xl leading-[1.3] tracking-[-0.02em]">
            Un flux simple et stratégique.
          </p>
        </motion.div>

        {/* Mobile */}
        <motion.ol
          {...fadeUp(0.1)}
          className="flex list-none flex-col gap-10 p-0 m-0 md:hidden"
        >
          {steps.map((step, i) => (
            <li key={step.number} className="flex gap-4">
              <StepCircle n={step.number} />
              <div className="min-w-0 pt-0.5">
                <p className="font-semibold text-base text-[#111110] tracking-[-0.02em]">
                  {step.action}
                </p>
                <p className="mt-2 text-[15px] leading-[1.65] text-[#111110]/80 tracking-[-0.01em]">
                  {step.result}
                </p>
              </div>
            </li>
          ))}
        </motion.ol>

        {/* Desktop */}
        <motion.div {...fadeUp(0.1)} className="hidden md:block">
          <div className="mb-10 grid w-full grid-cols-3 gap-6 lg:gap-10 items-center">
            <div className="flex min-w-0 items-center">
              <StepCircle n="01" />
              <div className="ml-4 h-px min-w-0 flex-1 bg-[#111110]/12" aria-hidden />
            </div>
            <div className="flex min-w-0 items-center">
              <StepCircle n="02" />
              <div className="ml-4 h-px min-w-0 flex-1 bg-[#111110]/12" aria-hidden />
            </div>
            <div className="flex min-w-0 items-center">
              <StepCircle n="03" />
            </div>
          </div>

          <ol className="m-0 grid list-none grid-cols-3 gap-6 lg:gap-10 p-0">
            {steps.map((step) => (
              <li key={step.number} className="min-w-0">
                <p className="font-semibold text-base lg:text-lg text-[#111110] tracking-[-0.02em]">
                  {step.action}
                </p>
                <p className="mt-3 text-[15px] lg:text-base leading-[1.65] text-[#111110]/80 tracking-[-0.01em]">
                  {step.result}
                </p>
              </li>
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  );
}
