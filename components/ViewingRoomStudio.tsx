"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLang } from "@/lib/lang";
import { Button } from "@/components/ui/Button";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease, delay },
});

export default function ViewingRoomStudio() {
  const { t } = useLang();
  const content = t.viewingRoomStudio;
  const mock = content.mock;

  return (
    <section
      id="viewing-room-studio"
      className="bg-white px-4 pt-12 pb-12 md:px-6 md:pt-[60px] md:pb-[60px]"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          {...fadeUp(0)}
          className="grid gap-8 md:grid-cols-[0.78fr_1.22fr] md:gap-14"
        >
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.12em] text-[#ADADAA]">
              {content.eyebrow}
            </p>
            <h2 className="font-display text-[20px] font-normal leading-[1.2] tracking-[-0.02em] text-[#111110] md:text-[26px]">
              {content.title}
            </h2>
            <p className="mt-1 font-display text-[20px] font-normal leading-[1.2] tracking-[-0.02em] text-[#6B6A67] md:text-[26px]">
              {content.subtitle}
            </p>
            <p className="mt-4 max-w-xl text-[14px] leading-[1.6] tracking-[-0.01em] text-[#6B6A67] md:text-[15px]">
              {content.body}
            </p>
            <div className="mt-6">
              <Button
                size="md"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("open-contact-modal"))
                }
              >
                {content.cta}
              </Button>
            </div>
          </div>

          <div className="rounded bg-[#FAFAF8] p-5 md:p-6">
            <div className="grid gap-5 md:grid-cols-[1.05fr_1fr] md:items-center">
              <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-[#F5F5F3]">
                <Image
                  src="/artworks/painting-02.png"
                  alt=""
                  fill
                  quality={92}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 360px"
                />
              </div>

              <div className="flex flex-col">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#ADADAA]">
                  {mock.label}
                </p>
                <h3 className="mt-3 font-display text-[18px] font-normal leading-[1.2] tracking-[-0.02em] text-[#111110] md:text-[22px]">
                  {mock.artist}
                </h3>
                <p className="mt-1 text-[14px] italic leading-[1.4] tracking-[-0.01em] text-[#6B6A67] md:text-[15px]">
                  {mock.title},{" "}
                  <span className="not-italic">{mock.year}</span>
                </p>
                <div className="mt-3 h-px w-full bg-[#E8E8E6]" />
                <p className="mt-3 text-[12px] leading-[1.5] text-[#6B6A67] md:text-[13px]">
                  {mock.medium}
                </p>
                <p className="text-[12px] leading-[1.5] text-[#6B6A67] md:text-[13px]">
                  {mock.dimensions}
                </p>
                <div className="mt-5">
                  <Button size="sm" variant="primary">
                    {mock.inquire}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
