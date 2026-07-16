"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Nav from "@/components/Nav";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { useLang } from "@/lib/lang";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease, delay },
});

function PricingFaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#E8E8E6]">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        className="group flex w-full items-center justify-between gap-8 py-6 text-left"
      >
        <span className="text-base font-medium text-[#111110] transition-colors group-hover:text-[#3A3A38]">
          {question}
        </span>
        <span
          aria-hidden="true"
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#E8E8E6] text-[#6B6A67] transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path d="M6 1v10M1 6h10" />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-6 text-sm leading-relaxed text-[#6B6A67]">{answer}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function PricingPage() {
  const { t } = useLang();
  const openContact = () => window.dispatchEvent(new CustomEvent("open-contact-modal"));

  return (
    <main className="relative bg-white">
      <Nav />

      <section className="px-4 pb-12 pt-32 md:px-6 md:pb-[72px] md:pt-40">
        <motion.div {...fadeUp(0)} className="mx-auto max-w-7xl">
          <h1 className="max-w-4xl font-display text-[30px] font-normal leading-[1.2] tracking-[-0.03em] text-[#111110] md:text-[44px]">
            {t.pricing.hero.title}
          </h1>
          <p className="mt-0 max-w-4xl text-[30px] font-normal leading-[1.2] tracking-[-0.03em] text-[#6B6A67] md:text-[44px]">
            {t.pricing.hero.subtitle}
          </p>
        </motion.div>
      </section>

      <section className="px-4 py-12 md:px-6 md:py-[72px]">
        <div className="mx-auto max-w-7xl">
          <motion.p
            {...fadeUp(0)}
            className="mb-4 text-[11px] uppercase tracking-[0.12em] text-[#ADADAA]"
          >
            {t.pricing.offer.eyebrow}
          </motion.p>
          <div className="grid gap-4 md:grid-cols-2">
            {t.pricing.offer.cards.map((card, index) => (
              <motion.article
                key={card.title}
                {...fadeUp(0.05 + index * 0.05)}
                className="flex min-h-[430px] flex-col rounded-lg border border-[#E8E8E6] bg-white p-6 md:p-8"
              >
                <div>
                  <h2 className="font-display text-[24px] font-normal tracking-[-0.02em] text-[#111110]">
                    {card.title}
                  </h2>
                  <p className="mt-8 font-display text-[30px] leading-none tracking-[-0.03em] text-[#111110] md:text-[36px]">
                    {card.price}
                  </p>
                  <p className="mt-2 text-[12px] text-[#6B6A67]">{card.qualifier}</p>
                </div>

                <ul className="mt-10 flex flex-col gap-4 border-t border-[#E8E8E6] pt-6">
                  {card.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-[14px] leading-relaxed text-[#111110]"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[3px] flex h-4 w-4 shrink-0 items-center justify-center text-[11px] text-[#6B6A67]"
                      >
                        ✓
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
          <motion.article
            {...fadeUp(0.12)}
            className="mt-4 rounded-lg border border-[#E8E8E6] bg-white p-6 md:p-8"
          >
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-start md:gap-10">
              <div>
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#ADADAA]">
                  {t.pricing.partnerOption.eyebrow}
                </p>
                <h2 className="mt-2 font-display text-[24px] font-normal tracking-[-0.02em] text-[#111110]">
                  {t.pricing.partnerOption.title}
                </h2>
                <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-[#6B6A67]">
                  {t.pricing.partnerOption.description}
                </p>
                <ul className="mt-6 flex flex-col gap-x-8 gap-y-3 md:flex-row md:flex-wrap">
                  {t.pricing.partnerOption.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-[14px] leading-relaxed text-[#111110]"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[3px] flex h-4 w-4 shrink-0 items-center justify-center text-[11px] text-[#6B6A67]"
                      >
                        ✓
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:text-right">
                <p className="font-display text-[30px] leading-none tracking-[-0.03em] text-[#111110] md:text-[36px]">
                  {t.pricing.partnerOption.price}
                </p>
                <p className="mt-2 text-[12px] text-[#6B6A67]">
                  {t.pricing.partnerOption.qualifier}
                </p>
              </div>
            </div>
          </motion.article>
          <motion.p
            {...fadeUp(0.14)}
            className="mt-5 max-w-3xl text-[13px] leading-relaxed text-[#6B6A67]"
          >
            {t.pricing.offer.note}
          </motion.p>
        </div>
      </section>

      <section id="pilot" className="px-4 py-12 md:px-6 md:py-[72px]">
        <motion.div
          {...fadeUp(0)}
          className="mx-auto grid max-w-7xl gap-8 rounded-lg bg-[#F5F5F3] p-6 md:grid-cols-[1fr_auto] md:items-end md:p-10"
        >
          <div>
            <p className="text-[11px] uppercase tracking-[0.12em] text-[#ADADAA]">
              {t.pricing.pilot.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-[26px] font-normal tracking-[-0.02em] text-[#111110]">
              {t.pricing.pilot.title}
            </h2>
            <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-[#6B6A67]">
              {t.pricing.pilot.body}
            </p>
            <div className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-2">
              <span className="text-[14px] text-[#ADADAA] line-through">
                {t.pricing.pilot.referencePrice}
              </span>
              <span className="rounded-full border border-[#E8E8E6] bg-white px-2.5 py-1 text-[11px] font-medium text-[#111110]">
                {t.pricing.pilot.discount}
              </span>
              <span className="font-display text-[30px] tracking-[-0.03em] text-[#111110]">
                {t.pricing.pilot.price}
              </span>
            </div>
            <p className="mt-3 text-[12px] text-[#6B6A67]">{t.pricing.pilot.availability}</p>
          </div>
          <Button size="md" onClick={openContact} className="w-fit">
            {t.pricing.pilot.cta}
          </Button>
        </motion.div>
      </section>

      <section className="px-4 py-12 md:px-6 md:py-[72px]">
        <div className="mx-auto max-w-7xl">
          <motion.h2
            {...fadeUp(0)}
            className="font-display text-[26px] font-normal tracking-[-0.02em] text-[#111110]"
          >
            {t.pricing.costAnchor.title}
          </motion.h2>
          <motion.div {...fadeUp(0.05)} className="mt-8 border-t border-[#E8E8E6]">
            {t.pricing.costAnchor.items.map((item) => (
              <div
                key={item.title}
                className="grid gap-2 border-b border-[#E8E8E6] py-6 md:grid-cols-[0.8fr_1fr_1.3fr] md:items-baseline md:gap-8"
              >
                <h3 className="font-display text-[16px] text-[#111110]">{item.title}</h3>
                <p className="text-[14px] text-[#111110]">{item.cost}</p>
                <p className="text-[13px] leading-relaxed text-[#6B6A67]">{item.description}</p>
              </div>
            ))}
          </motion.div>
          <motion.p {...fadeUp(0.1)} className="mt-6 font-display text-[20px] text-[#111110]">
            {t.pricing.costAnchor.conclusion}
          </motion.p>
        </div>
      </section>

      <section className="px-4 py-12 md:px-6 md:py-[72px]">
        <motion.div {...fadeUp(0)} className="mx-auto max-w-7xl">
          <h2 className="font-display text-[26px] font-normal tracking-[-0.02em] text-[#111110]">
            {t.pricing.faq.title}
          </h2>
          <div className="mt-8">
            {t.pricing.faq.items.map((item) => (
              <PricingFaqItem key={item.q} question={item.q} answer={item.a} />
            ))}
          </div>
        </motion.div>
      </section>

      <section className="px-4 py-12 md:px-6 md:py-[72px]">
        <div className="mx-auto flex max-w-7xl justify-center border-y border-[#E8E8E6] py-12">
          <Button size="lg" onClick={openContact}>
            {t.pricing.cta}
          </Button>
        </div>
      </section>

      <CtaBand />
      <Footer />
    </main>
  );
}
