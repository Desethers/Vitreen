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

          <div className="relative mx-auto aspect-[4/5] w-full overflow-hidden rounded bg-[#FAFAF8] md:ml-auto md:mr-0" style={{ maxWidth: 520 }}>
            <Image
              src="/screenshot-viewingroom.png"
              alt=""
              fill
              quality={92}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 520px"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
