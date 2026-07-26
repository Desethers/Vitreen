"use client";

import { motion } from "framer-motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CtaBand from "@/components/CtaBand";
import { Button } from "@/components/ui/Button";
import HeroCurtainMock from "@/components/HeroCurtainMock";
import ViewingRoomsScrollStory from "@/components/ViewingRoomsScrollStory";
import { PublishingMock } from "@/components/showcase/PillarMocks";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease, delay },
});

export default function ViewingRoomsProductPage() {
  const openContact = () => {
    window.dispatchEvent(new CustomEvent("open-contact-modal"));
  };

  return (
    <main className="relative bg-white">
      <Nav />

      <section className="overflow-hidden px-4 pb-12 pt-32 md:px-6 md:pb-[72px] md:pt-40">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp(0)}>
            <h1 className="font-display text-[30px] font-normal leading-[1.3] tracking-[-0.04em] text-[#111110]">
              Viewing Rooms
            </h1>
            <p className="mt-2 max-w-4xl text-[30px] leading-[1.35] tracking-[-0.02em] text-[#6B6A67]">
              Create private selections to share by link or PDF.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg" onClick={openContact}>
                Prepare a selection
              </Button>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp(0.08)}
            className="relative -mr-4 mt-14 h-[620px] overflow-hidden rounded-[5px] bg-[#D8D2C8] md:mr-0 md:mt-20 md:h-[720px] md:rounded-xl"
            style={{ isolation: "isolate", willChange: "transform" }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/paula-cooper-background.jpg')" }}
            />

            <HeroCurtainMock cropFromBottomOnMobile>
              <PublishingMock />
            </HeroCurtainMock>
          </motion.div>
        </div>
      </section>

      <ViewingRoomsScrollStory />

      <CtaBand />
      <Footer />
    </main>
  );
}
