"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CtaBand from "@/components/CtaBand";
import { Button } from "@/components/ui/Button";
import { useLang } from "@/lib/lang";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease, delay },
});

// Même check que SolutionPage — coche fine et discrète, cohérente sur tout le site.
function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      className={`mt-0.5 shrink-0 ${className}`}
      aria-hidden="true"
    >
      <path
        d="M3 8l3.5 3.5L13 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FeatureItem({ label, muted = false }: { label: string; muted?: boolean }) {
  return (
    <li className="flex items-start gap-3 text-[14px] leading-relaxed text-[#111110]">
      <CheckIcon className={muted ? "text-[#ADADAA]" : "text-[#6B6A67]"} />
      <span>{label}</span>
    </li>
  );
}

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
  const { t, lang } = useLang();
  const openContact = () => window.dispatchEvent(new CustomEvent("open-contact-modal"));

  const offer = t.pricing.offer;
  const partner = t.pricing.partnerOption;

  // Purement des labels de structure pour la nouvelle section de comparaison —
  // aucune offre, prix ou avantage inventé : le contenu ci-dessous ne fait que
  // réafficher offer.features / partner.features déjà définis dans lib/lang.
  const compareCopy =
    lang === "fr"
      ? { heading: "Tout ce qui est inclus", galleryOsCol: "Gallery OS", partnerCol: "+ Partner" }
      : { heading: "Everything included", galleryOsCol: "Gallery OS", partnerCol: "+ Partner" };

  return (
    <main className="relative bg-white">
      <Nav />

      {/* Hero — minimal et espacé (inspiré de x.ai/pricing), titre/sous-titre Vitreen inchangés */}
      <section className="overflow-hidden px-4 pb-16 pt-32 md:px-6 md:pb-24 md:pt-44">
        <motion.div {...fadeUp(0)} className="mx-auto max-w-7xl">
          <h1 className="font-display text-[30px] font-normal leading-[1.3] tracking-[-0.04em] text-[#111110]">
            {t.pricing.hero.title}
          </h1>
          <p className="mt-2 max-w-4xl text-[30px] leading-[1.35] tracking-[-0.02em] text-[#6B6A67]">
            {t.pricing.hero.subtitle}
          </p>
        </motion.div>
      </section>

      {/* Cards d'offres — Gallery OS mis en avant (surface pleine, comme sur la home),
          Partner en option secondaire (bordure fine). Nom, prix, description,
          éléments inclus, CTA — dans cet ordre, par carte. */}
      <section className="px-6 pb-16 md:px-12 md:pb-24 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-4 md:grid-cols-2 md:gap-6">
            <motion.article
              {...fadeUp(0.05)}
              className="flex flex-col rounded-[12px] bg-[#F5F5F3] p-6 md:p-10"
            >
              <h2 className="font-display text-[22px] font-normal tracking-[-0.02em] text-[#111110] md:text-[24px]">
                {offer.title}
              </h2>

              <div className="mt-5">
                <p className="font-display text-[28px] leading-none tracking-[-0.02em] text-[#111110] md:text-[32px]">
                  {offer.price}
                </p>
                <p className="mt-2 text-[13px] text-[#6B6A67]">{offer.priceDetail}</p>
              </div>

              <p className="mt-6 text-[14px] leading-relaxed text-[#6B6A67]">{offer.description}</p>

              <ul className="mt-6 flex flex-col gap-3 border-t border-dashed border-[#E1E1DE] pt-6">
                {offer.features.map((feature) => (
                  <FeatureItem key={feature} label={feature} />
                ))}
              </ul>

              <p className="mt-5 text-[12px] text-[#ADADAA]">{offer.deliveryNote}</p>

              <div className="mt-8 flex flex-1 flex-col justify-end">
                <Button
                  size="lg"
                  variant="inverse"
                  onClick={openContact}
                  className="w-full border border-[#C4C4C0] !bg-transparent hover:!border-[#C4C4C0] hover:!bg-[#E5E5E2] hover:!text-black"
                >
                  {t.pricing.cta}
                </Button>
              </div>
            </motion.article>

            <motion.article
              {...fadeUp(0.1)}
              className="flex flex-col rounded-[12px] border border-[#E8E8E6] bg-white p-6 md:p-10"
            >
              <h2 className="font-display text-[22px] font-normal tracking-[-0.02em] text-[#111110] md:text-[24px]">
                {partner.title}
              </h2>

              <div className="mt-5">
                <p className="font-display text-[28px] leading-none tracking-[-0.02em] text-[#111110] md:text-[32px]">
                  {partner.price}
                </p>
                <p className="mt-2 text-[13px] text-[#6B6A67]">{partner.qualifier}</p>
              </div>

              <p className="mt-6 text-[14px] leading-relaxed text-[#6B6A67]">
                {partner.description}
              </p>

              <ul className="mt-6 flex flex-col gap-3 border-t border-dashed border-[#E1E1DE] pt-6">
                {partner.features.map((feature) => (
                  <FeatureItem key={feature} label={feature} muted />
                ))}
              </ul>

              <div className="mt-8 flex flex-1 flex-col justify-end">
                <Button size="lg" onClick={openContact} className="w-full">
                  {partner.cta}
                </Button>
              </div>
            </motion.article>
          </div>

          <motion.p
            {...fadeUp(0.16)}
            className="mt-6 max-w-3xl text-[13px] leading-relaxed text-[#6B6A67]"
          >
            {offer.note}
          </motion.p>
        </div>
      </section>

      {/* Comparaison lisible — réaffiche uniquement offer.features / partner.features déjà
          définis ci-dessus. Tableau à deux colonnes sur desktop, empilé sur mobile. */}
      <section className="px-4 pb-16 md:px-6 md:pb-24">
        <div className="mx-auto max-w-7xl">
          <motion.h2
            {...fadeUp(0)}
            className="font-display text-[26px] font-normal leading-[1.2] tracking-[-0.02em] text-[#111110]"
          >
            {compareCopy.heading}
          </motion.h2>

          {/* Desktop : deux colonnes côte à côte dans un même cadre */}
          <motion.div
            {...fadeUp(0.05)}
            className="mt-8 hidden overflow-hidden rounded-[12px] border border-[#E8E8E6] md:grid md:grid-cols-2"
          >
            <div className="p-8">
              <p className="font-display text-[16px] font-normal tracking-[-0.01em] text-[#111110]">
                {compareCopy.galleryOsCol}
              </p>
              <p className="mt-1 text-[12px] text-[#6B6A67]">
                {offer.price} · {offer.priceDetail}
              </p>
              <ul className="mt-6 flex flex-col gap-3 border-t border-[#E8E8E6] pt-6">
                {offer.features.map((feature) => (
                  <FeatureItem key={feature} label={feature} />
                ))}
              </ul>
            </div>
            <div className="border-t border-[#E8E8E6] p-8 md:border-l md:border-t-0">
              <p className="font-display text-[16px] font-normal tracking-[-0.01em] text-[#111110]">
                {compareCopy.partnerCol}
              </p>
              <p className="mt-1 text-[12px] text-[#6B6A67]">
                {partner.price} · {partner.qualifier}
              </p>
              <ul className="mt-6 flex flex-col gap-3 border-t border-[#E8E8E6] pt-6">
                {partner.features.map((feature) => (
                  <FeatureItem key={feature} label={feature} muted />
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Mobile : format vertical empilé, un bloc par offre */}
          <div className="mt-8 flex flex-col gap-6 md:hidden">
            <motion.div
              {...fadeUp(0.05)}
              className="rounded-[12px] border border-[#E8E8E6] bg-[#F5F5F3] p-6"
            >
              <p className="font-display text-[16px] font-normal tracking-[-0.01em] text-[#111110]">
                {compareCopy.galleryOsCol}
              </p>
              <p className="mt-1 text-[12px] text-[#6B6A67]">
                {offer.price} · {offer.priceDetail}
              </p>
              <ul className="mt-5 flex flex-col gap-3 border-t border-dashed border-[#E1E1DE] pt-5">
                {offer.features.map((feature) => (
                  <FeatureItem key={feature} label={feature} />
                ))}
              </ul>
            </motion.div>
            <motion.div
              {...fadeUp(0.1)}
              className="rounded-[12px] border border-[#E8E8E6] bg-white p-6"
            >
              <p className="font-display text-[16px] font-normal tracking-[-0.01em] text-[#111110]">
                {compareCopy.partnerCol}
              </p>
              <p className="mt-1 text-[12px] text-[#6B6A67]">
                {partner.price} · {partner.qualifier}
              </p>
              <ul className="mt-5 flex flex-col gap-3 border-t border-dashed border-[#E1E1DE] pt-5">
                {partner.features.map((feature) => (
                  <FeatureItem key={feature} label={feature} muted />
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 md:px-6 md:pb-24">
        <div className="mx-auto max-w-7xl">
          <motion.h2
            {...fadeUp(0)}
            className="font-display text-[26px] font-normal leading-[1.2] tracking-[-0.02em] text-[#111110]"
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

      <section id="pilot" className="px-4 pb-16 md:px-6 md:pb-24">
        <motion.div
          {...fadeUp(0)}
          className="mx-auto grid max-w-7xl gap-8 rounded-[12px] bg-[#F5F5F3] p-6 md:grid-cols-[1fr_auto] md:items-end md:p-10"
        >
          <div>
            <p className="text-[11px] uppercase tracking-[0.12em] text-[#ADADAA]">
              {t.pricing.pilot.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-[26px] font-normal leading-[1.2] tracking-[-0.02em] text-[#111110]">
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

      <section className="px-4 pb-16 md:px-6 md:pb-24">
        <motion.div {...fadeUp(0)} className="mx-auto max-w-7xl">
          <h2 className="font-display text-[26px] font-normal leading-[1.2] tracking-[-0.02em] text-[#111110]">
            {t.pricing.faq.title}
          </h2>
          <div className="mt-8">
            {t.pricing.faq.items.map((item) => (
              <PricingFaqItem key={item.q} question={item.q} answer={item.a} />
            ))}
          </div>
        </motion.div>
      </section>

      <CtaBand />
      <Footer />
    </main>
  );
}
