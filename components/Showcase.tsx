"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.65, ease, delay },
});

function ExhibitionMock() {
  return (
    <div className="flex gap-3 h-full">
      <div className="w-[45%] bg-[#1a1a2e] rounded-lg flex items-end p-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#111]/40 to-transparent" />
        <div className="w-5 h-5 rounded-full border border-white/40 flex items-center justify-center relative z-10">
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-2.5 py-1">
        <div>
          <p className="text-[11px] font-medium text-[#111110]">Untitled, 2018</p>
          <p className="text-[9px] text-[#ADADAA]">Acrylic on canvas</p>
          <p className="text-[9px] text-[#ADADAA]">220 × 120 cm</p>
        </div>
        <p className="text-[11px] font-medium text-[#111110]">$16,500</p>
        <div className="border border-[#E8E8E6] rounded-md py-1.5 text-center">
          <span className="text-[9px] uppercase tracking-[0.08em] text-[#111110]">Add to cart</span>
        </div>
        <p className="text-[8px] text-[#ADADAA] leading-[1.5] line-clamp-4">
          This monochromatic, large-scale painting explores color, surface, and minimalism. The paintings are not the centre of the discussion; rather, it is the relationship in which they are entwined.
        </p>
        <div className="mt-auto space-y-1.5">
          <div className="flex items-center justify-between border-t border-[#E8E8E6] pt-1.5">
            <span className="text-[8px] uppercase tracking-[0.08em] text-[#111110]">Shipping and taxes</span>
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#ADADAA" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
          </div>
          <div className="flex items-center justify-between border-t border-[#E8E8E6] pt-1.5">
            <span className="text-[8px] uppercase tracking-[0.08em] text-[#111110]">FAQ</span>
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#ADADAA" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShowcaseCard({
  title,
  desc,
  reverse = false,
  delay = 0,
  mockImage,
}: {
  title: string;
  desc: string;
  reverse?: boolean;
  delay?: number;
  mockImage?: string;
}) {
  const imageCol = (
    <div className="relative flex items-center justify-center overflow-hidden min-h-[480px] px-[10px] py-[50px]">
      <div
        className="absolute inset-[10px] rounded-[8px] bg-cover bg-center"
        style={{ backgroundImage: "url('/colin de land.jpg')", filter: "grayscale(100%)" }}
      />
      <div className="absolute inset-[10px] rounded-[8px] bg-[#FAF6F5]/20" />
      <div
        className="relative z-10 bg-white rounded-[8px] shadow-2xl overflow-hidden w-[85%]"
        style={{ aspectRatio: "766 / 523" }}
      >
        {mockImage ? (
          <img src={mockImage} alt={title} className="w-full h-full object-cover object-top" />
        ) : (
          <div className="px-4 py-[20px] h-full">
            <ExhibitionMock />
          </div>
        )}
      </div>
    </div>
  );

  const textCol = (
    <div className="flex flex-col justify-center px-8 md:px-10 py-10 md:py-12">
      <h3 className="font-display text-[22px] font-medium text-[#111110] tracking-[-0.02em] mb-3">
        {title}
      </h3>
      <p className="text-[#6B6A67] text-[22px] font-normal leading-[1.3] tracking-[-0.02em]">
        {desc}
      </p>
    </div>
  );

  return (
    <motion.div
      {...fadeUp(delay)}
      className="rounded-2xl overflow-hidden bg-[#FAF6F5]"
    >
      <div
        className={`grid ${
          reverse ? "md:grid-cols-[1fr_2fr]" : "md:grid-cols-[2fr_1fr]"
        }`}
      >
        {reverse ? (
          <>
            {textCol}
            {imageCol}
          </>
        ) : (
          <>
            {imageCol}
            {textCol}
          </>
        )}
      </div>
    </motion.div>
  );
}

export default function Showcase() {
  return (
    <section className="pt-20 pb-6 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col gap-[30px]">
        <motion.div {...fadeUp(0)}>
          <h2 className="font-display text-[26px] font-normal text-[#111110] leading-[1.3] tracking-[-0.02em] max-w-2xl">
            Des interfaces pensées pour le monde de l&apos;art.
          </h2>
          <p className="mt-1 text-[#6B6A67] text-[26px] font-normal max-w-xl leading-[1.3] tracking-[-0.02em]">
            Galeries, artistes, advisors ou collections privées : publiez et diffusez vos œuvres simplement.
          </p>
        </motion.div>

        <ShowcaseCard
          title="Exhibition Pages"
          desc="Des pages d'exposition claires et structurées, avec textes, images et liste d'œuvres."
          delay={0}
        />
        <ShowcaseCard
          title="Artist Pages"
          desc="Pages artistes complètes. Biographie, œuvres et expositions réunies."
          mockImage="/artist page.png"
          reverse
          delay={0.1}
        />
      </div>
    </section>
  );
}
