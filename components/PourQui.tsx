"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const audiences = [
  {
    label: "Galeries",
    headline: "Un site à la hauteur de votre programme.",
    body: "Gérez vos artistes, documentez vos expositions et constituez une archive vivante de votre galerie — sans dépendre d'un développeur.",
    points: [
      "Pages artistes & œuvres",
      "Archives d'expositions",
      "CMS autonome",
    ],
    cta: "Voir l'offre galerie",
    href: "#offre",
  },
  {
    label: "Artistes",
    headline: "Votre portfolio, entre vos mains.",
    body: "Un site personnel que vous gérez directement, indépendant de votre galerie. Votre travail présenté selon vos termes.",
    points: [
      "Portfolio sur-mesure",
      "Mise à jour en autonomie",
      "Séries & œuvres organisées",
    ],
    cta: "Voir l'offre artiste",
    href: "#offre",
  },
  {
    label: "Art Advisors",
    headline: "Présentez vos sélections avec élégance.",
    body: "Une interface dédiée pour partager des sélections d'œuvres à vos clients. Sobre, rapide, mémorable.",
    points: [
      "Sélections par client",
      "Interface de présentation",
      "Mise à jour à la demande",
    ],
    cta: "Voir l'offre advisor",
    href: "#offre",
  },
];

export default function PourQui() {
  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-8 md:mb-16"
        >
          <h2 className="font-display text-[20px] md:text-[26px] font-normal text-[#111110] leading-[1.3] tracking-[-0.02em] max-w-xl">
            Trois métiers — une même exigence
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {audiences.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: i * 0.1 }}
              className="glass rounded-[10px] p-8 flex flex-col"
            >
              <p className="text-xs tracking-widest uppercase text-[#ADADAA] mb-6">
                {a.label}
              </p>
              <h3 className="font-display text-xl text-[#111110] leading-snug tracking-tight mb-4">
                {a.headline}
              </h3>
              <p className="text-[#6B6A67] text-sm leading-relaxed mb-8">
                {a.body}
              </p>
              <ul className="space-y-2 mb-10 flex-1">
                {a.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-2 text-sm text-[#6B6A67]"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#ADADAA] shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
              <a
                href={a.href}
                className="text-sm text-[#111110] font-medium hover:opacity-60 transition-opacity duration-200"
              >
                {a.cta} →
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
