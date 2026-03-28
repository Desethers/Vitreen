"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.65, ease, delay },
});

const stroke = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function IconExhibition() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden>
      <rect x="2.5" y="4" width="8" height="16" rx="1" {...stroke} />
      <rect x="13.5" y="4" width="8" height="16" rx="1" {...stroke} />
      <path d="M5 14h3M16 14h3" {...stroke} />
    </svg>
  );
}

function IconViewingRoom() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden>
      <path
        d="M2 12s3.5 5 10 5 10-5 10-5-3.5-5-10-5S2 12 2 12Z"
        {...stroke}
      />
      <circle cx="12" cy="12" r="2.5" {...stroke} />
    </svg>
  );
}

function IconEmail() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" {...stroke} />
      <path d="m3 7 9 6 9-6" {...stroke} />
    </svg>
  );
}

function IconArtwork() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="2" {...stroke} />
      <circle cx="8.5" cy="9" r="1.5" fill="currentColor" stroke="none" />
      <path d="m21 15-5-5L5 21" {...stroke} />
    </svg>
  );
}

function IconArtist() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden>
      <circle cx="12" cy="8" r="3.5" {...stroke} />
      <path d="M5 20v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1" {...stroke} />
    </svg>
  );
}

function IconInquiry() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden>
      <path
        d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z"
        {...stroke}
      />
    </svg>
  );
}

const tools: { title: string; desc: string; icon: ReactNode }[] = [
  {
    title: "Exhibition Pages",
    desc: "Des pages d'exposition claires et structurées, avec textes, images et liste d'œuvres.",
    icon: <IconExhibition />,
  },
  {
    title: "Viewing Rooms",
    desc: "Présentez vos œuvres dans un espace privé, partageable à distance avec vos collectionneurs.",
    icon: <IconViewingRoom />,
  },
  {
    title: "Email Diffusion",
    desc: "Diffusion par email. Partagez facilement expositions et œuvres à vos contacts.",
    icon: <IconEmail />,
  },
  {
    title: "Artwork Pages",
    desc: "Présentation claire et œuvres disponibles en ligne.",
    icon: <IconArtwork />,
  },
  {
    title: "Artist Pages",
    desc: "Pages artistes complètes. Biographie, œuvres et expositions réunies.",
    icon: <IconArtist />,
  },
  {
    title: "Direct Inquiry",
    desc: "Contact direct depuis chaque œuvre.",
    icon: <IconInquiry />,
  },
];

export default function Solution() {
  return (
    <section className="pt-8 md:pt-10 pb-16 md:pb-24 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp(0)} className="mb-10 md:mb-14">
          <h2 className="font-display text-[26px] md:text-[26px] font-normal text-[#111110] leading-[1.3] tracking-[-0.02em] max-w-3xl">
            Des outils digitaux au service du monde de l&apos;art.
          </h2>
          <p className="mt-0.5 text-[#6B6A67] text-[26px] font-normal max-w-2xl leading-[1.3] tracking-[-0.02em]">
            Exposez vos œuvres. Engagez des collectionneurs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {tools.map((tool, i) => (
            <motion.article
              key={tool.title}
              {...fadeUp(0.06 + i * 0.05)}
              className="group rounded-2xl p-6 md:p-7 flex flex-col gap-4 bg-[#FFF9F9] transition-[background-color,color] duration-300 ease-out hover:bg-[#000000]"
            >
              <div
                className="w-10 h-10 shrink-0 flex items-center justify-center text-[#000000] transition-colors duration-300 group-hover:text-white"
                aria-hidden
              >
                {tool.icon}
              </div>
              <div>
                <h3 className="font-display font-medium text-[#000000] text-base tracking-[-0.01em] mb-2 transition-colors duration-300 group-hover:text-white">
                  {tool.title}
                </h3>
                <p className="text-base leading-none text-[#000000]/90 transition-colors duration-300 group-hover:text-white/90">
                  {tool.desc}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
