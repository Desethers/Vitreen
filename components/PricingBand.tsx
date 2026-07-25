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

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#ADADAA"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="mt-[3px] shrink-0"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function FeatureList({ items }: { items: readonly string[] }) {
  return (
    <ul className="m-0 flex list-none flex-col gap-3 p-0">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <CheckIcon />
          <span className="text-[14px] leading-[1.45] tracking-[-0.01em] text-[#111110]">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function PricingBand() {
  const { t, href } = useLang();
  const band = t.pricingBand;

  const openContact = () => window.dispatchEvent(new CustomEvent("open-contact-modal"));

  return (
    <section id="offre" className="bg-white px-4 py-14 md:px-6 md:py-[72px]">
      <div className="mx-auto w-full max-w-7xl">
        <motion.div {...fadeUp(0)} className="mb-8 md:mb-10">
          <h2 className="font-display text-[20px] font-normal leading-[1.2] tracking-[-0.02em] text-[#111110] md:text-[26px]">
            {band.title}
          </h2>
          <p className="mt-0 max-w-xl text-[20px] font-normal leading-[1.2] tracking-[-0.02em] text-[#6B6A67] md:text-[26px]">
            {band.subtitle}
          </p>
        </motion.div>

        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          {/* Gallery OS — the offer, as a filled card */}
          <motion.article
            {...fadeUp(0.05)}
            className="flex flex-col rounded-[12px] bg-[#F5F5F3] p-6 md:p-10"
          >
            <div className="flex flex-col gap-3 md:block md:min-h-[81px]">
              <div className="flex items-start justify-between gap-6">
                <h3 className="font-display text-[20px] font-normal leading-snug tracking-[-0.01em] text-[#111110] md:text-[22px]">
                  {band.base.title}
                </h3>
                <a
                  href={href("/pricing#pilot")}
                  className="hidden w-fit shrink-0 items-center gap-2 rounded-full border border-[#E1E1DE] bg-white px-2.5 py-1 text-[11px] font-normal leading-none text-[#6B6A67] transition-colors hover:border-[#ADADAA] hover:text-[#111110] md:inline-flex"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#168044]" aria-hidden />
                  50% off for early galleries
                </a>
              </div>
              <p className="mt-1.5 text-[14px] leading-[1.5] text-[#6B6A67] md:text-[15px]">
                {band.base.description}
              </p>
              <a
                href={href("/pricing#pilot")}
                className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-[#E1E1DE] bg-white px-2.5 py-1 text-[11px] font-normal leading-none text-[#6B6A67] transition-colors hover:border-[#ADADAA] hover:text-[#111110] md:hidden"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#168044]" aria-hidden />
                50% off for early galleries
              </a>
            </div>

            <div className="mt-6">
              <p className="font-display text-[18px] font-normal tracking-[-0.01em] text-[#111110] md:text-[20px]">
                {band.base.price}
              </p>
              <p className="mt-1 text-[13px] text-[#6B6A67]">{band.base.priceDetail}</p>
            </div>

            <div className="my-6 border-t border-dashed border-[#E1E1DE]" aria-hidden />

            <FeatureList items={band.base.features} />

            <p className="mt-5 text-[12px] text-[#ADADAA]">{band.base.note}</p>

            <Button size="md" variant="primary" onClick={openContact} className="mt-6 w-full">
              {band.base.cta}
            </Button>
          </motion.article>

          {/* Partner — the option, as open counter-form (no card, no stroke) */}
          <motion.div {...fadeUp(0.1)} className="flex flex-col px-0 py-2 md:py-10">
            <div className="md:min-h-[81px]">
              <h3 className="font-display text-[20px] font-normal leading-snug tracking-[-0.01em] text-[#111110] md:text-[22px]">
                {band.partner.title}
              </h3>
              <p className="mt-1.5 text-[14px] leading-[1.5] text-[#6B6A67] md:text-[15px]">
                {band.partner.description}
              </p>
            </div>

            <div className="mt-6">
              <p className="font-display text-[18px] font-normal tracking-[-0.01em] text-[#111110] md:text-[20px]">
                {band.partner.price}
              </p>
              <p className="mt-1 text-[13px] text-[#6B6A67]">{band.partner.priceDetail}</p>
            </div>

            <div className="my-6 border-t border-dashed border-[#E1E1DE]" aria-hidden />

            <FeatureList items={band.partner.features} />

            <p className="mt-6">
              <a
                href={href("/pricing")}
                className="text-[13px] text-[#6B6A67] underline-offset-4 transition-colors hover:text-[#111110] hover:underline"
              >
                {band.pricingLink}
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
