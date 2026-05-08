"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { translations, useLang } from "@/lib/lang";
import { Button } from "@/components/ui/Button";

const ease = [0.16, 1, 0.3, 1] as const;

type StepperStep = {
  eyebrow: string;
  title: string;
  image: string;
};

function StepperVisual({ steps }: { steps: readonly StepperStep[] }) {
  const [active, setActive] = useState(0);
  const step = steps[active];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % steps.length);
    }, 2800);
    return () => window.clearInterval(timer);
  }, [steps.length]);

  return (
    <div className="relative min-h-[520px] overflow-hidden bg-[#111110] text-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={step.image}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.01 }}
          transition={{ duration: 0.7, ease }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${step.image})` }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/10" />

      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
        <div className="max-w-[28rem]">
          <p className="text-[12px] text-white/60">{step.eyebrow}</p>
          <h3 className="mt-2 font-display text-[36px] leading-[1.02] tracking-[-0.04em] text-white md:text-[52px]">
            {step.title}
          </h3>
        </div>

        <div className="mt-9 grid grid-cols-4 gap-2">
          {steps.map((item, index) => (
            <button
              key={item.title}
              type="button"
              onClick={() => setActive(index)}
              className="group text-left"
              aria-label={item.title}
            >
              <span className="block h-[3px] bg-white/25">
                <span
                  className={`block h-full bg-white transition-all duration-500 ${
                    active === index ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </span>
              <span className={`mt-3 block truncate text-[12px] ${active === index ? "text-white" : "text-white/45"}`}>
                {item.eyebrow}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ViewingRoomStudioOptions() {
  const { lang, t } = useLang();
  const content = t.viewingRoomStudioOptions ?? translations[lang].viewingRoomStudioOptions;
  const entryOption = content.option;

  return (
    <section id="viewing-room-studio" className="bg-white px-4 py-12 md:px-6 md:py-[60px]">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-8 md:mb-[48px]"
        >
          <p className="mb-4 text-[12px] text-[#ADADAA]">{content.kicker}</p>
          <h2 className="max-w-3xl font-display text-[24px] font-normal leading-[1.15] tracking-[-0.02em] text-[#111110] md:text-[32px]">
            {content.title}
          </h2>
          <p className="mt-1 max-w-2xl text-[20px] font-normal leading-[1.2] tracking-[-0.02em] text-[#6B6A67] md:text-[26px]">
            {content.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1">
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease, delay: 0.08 }}
            className="grid overflow-hidden border border-[#E8E8E6] bg-white lg:grid-cols-[0.82fr_1.18fr]"
          >
            <div className="flex flex-col justify-between px-5 py-6 md:px-8 md:py-8 lg:min-h-[520px]">
              <div>
                <p className="text-[12px] text-[#ADADAA]">{entryOption.label}</p>
                <h3 className="mt-5 max-w-[12ch] font-display text-[38px] leading-[1.02] tracking-[-0.04em] text-[#111110] md:text-[54px]">
                  {entryOption.title}
                </h3>
                <p className="mt-6 max-w-[34ch] text-[16px] leading-relaxed text-[#6B6A67]">
                  {entryOption.body}
                </p>
              </div>

              <div className="mt-10">
                <div className="grid grid-cols-3 border-y border-[#E8E8E6] text-[12px] text-[#6B6A67]">
                  {content.stepper.stats.map((stat) => (
                    <div key={stat} className="border-r border-[#E8E8E6] px-3 py-4 last:border-r-0">
                      {stat}
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Button href="/room" size="md">
                    {entryOption.cta}
                  </Button>
                  <span className="text-[13px] text-[#6B6A67]">{entryOption.price}</span>
                </div>
              </div>
            </div>

            <StepperVisual steps={content.stepper.steps} />
          </motion.article>
        </div>
      </div>
    </section>
  );
}
