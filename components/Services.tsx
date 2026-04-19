"use client";

import { motion } from "framer-motion";
import { useLang } from "@/lib/lang";
import { Button } from "@/components/ui/Button";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease, delay },
});

export default function Services() {
  const { t } = useLang();
  const services = t.services.items;
  return (
    <section id="offre" className="pt-12 md:pt-[60px] pb-12 md:pb-[60px] px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div {...fadeUp(0)} className="mb-8 md:mb-[48px]">
          <h2 className="font-display text-[20px] md:text-[26px] font-normal text-[#111110] leading-[1.2] tracking-[-0.02em]">
            {t.services.title}
          </h2>
          <p className="mt-0 text-[#6B6A67] text-[20px] md:text-[26px] font-normal max-w-xl leading-[1.2] tracking-[-0.02em]">
            {t.services.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <motion.article
              key={service.tier}
              {...fadeUp(i * 0.1)}
              className="relative rounded p-7 flex flex-col justify-between min-h-[420px] bg-[#F7F7F5]"
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 min-h-[clamp(7rem,9vw,11rem)]">
                  <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
                    <span className="text-[10px] tracking-[0.15em] uppercase text-[#ADADAA]">
                      {service.tier}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl tracking-tight text-[#111110]">
                    {service.name}
                  </h3>
                  <p className="text-sm leading-relaxed whitespace-pre-line text-[#6B6A67]">
                    {service.description}
                  </p>
                </div>

                <div className="h-px w-full bg-[#E8E8E6]" />

                {service.featuresHeading ? (
                  <p className="text-xs font-medium uppercase tracking-[0.08em] text-[#ADADAA]">
                    {service.featuresHeading}
                  </p>
                ) : null}

                <ul className="flex flex-col gap-2">
                  {service.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-[#111110]"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="mt-0.5 shrink-0 text-[#ADADAA]"
                      >
                        <path
                          d="M3 8l3.5 3.5L13 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-4 mt-8">
                <div className="flex flex-col gap-1.5">
                  <p className="text-sm font-medium text-[#111110]">
                    {service.price}
                  </p>
                  {service.priceNote ? (
                    <p className="text-xs leading-relaxed min-h-[2.5rem] text-[#6B6A67]">
                      {service.priceNote}
                    </p>
                  ) : null}
                </div>
                <Button
                  size="md"
                  variant={service.highlight ? "primary" : "tertiary"}
                  onClick={() => window.dispatchEvent(new CustomEvent("open-contact-modal"))}
                  className="w-full"
                >
                  {service.cta}
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
