"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

// Image B&W galerie — remplacer par un asset local si besoin
const bgImage =
  "https://www.figma.com/api/mcp/asset/1f67bc89-16f3-4279-b35b-fcfe2e74b8fc";

type Audience = {
  label: string;
  title: string;
  description: string;
  features: string[];
};

const audiences: Audience[] = [
  {
    label: "Galeries",
    title: "Une vitrine à la hauteur de votre programme.",
    description:
      "Présentez vos artistes, archivez vos expositions, gérez votre catalogue en ligne — sans compétences techniques.",
    features: [
      "Catalogue d'œuvres",
      "Pages artistes",
      "Archives d'expositions",
      "Formulaire de contact",
    ],
  },
  {
    label: "Artistes",
    title: "Votre œuvre mérite un espace à elle.",
    description:
      "Un portfolio conçu pour vous — biographie, CV d'exposition, séries d'œuvres — mis à jour par vous, sans intermédiaire.",
    features: [
      "Portfolio en ligne",
      "Séries et œuvres",
      "CV d'exposition",
      "Prise de contact directe",
    ],
  },
  {
    label: "Art Advisors",
    title: "Partagez des sélections, pas des fichiers.",
    description:
      "Présentez vos recommandations à vos clients dans un espace professionnel, confidentiel et facile à naviguer.",
    features: [
      "Partage de sélections",
      "Espaces clients",
      "Fiches d'œuvres détaillées",
      "Interface confidentielle",
    ],
  },
  {
    label: "Collection Privée",
    title: "Votre collection, organisée et accessible.",
    description:
      "Centralisez l'ensemble de vos œuvres dans un espace privé : fiches, documents, historique — tout en un lieu.",
    features: [
      "Inventaire complet",
      "Fiches détaillées",
      "Documents associés",
      "Accès sécurisé",
    ],
  },
];

export default function Audiences() {
  const [active, setActive] = useState(0);
  const current = audiences[active];

  return (
    <section className="py-28 px-8 md:px-16 border-t border-[#E8E8E6]">
      <div className="max-w-6xl mx-auto">
        {/* Badges de navigation */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="flex flex-wrap gap-2.5 mb-10"
        >
          {audiences.map((a, i) => (
            <button
              key={a.label}
              onClick={() => setActive(i)}
              className={
                i === active
                  ? "inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-[#111110] text-white transition-all duration-200"
                  : "inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border border-[#111110] text-[#111110] bg-transparent hover:bg-[#F5F5F3] transition-all duration-200"
              }
            >
              {a.label}
            </button>
          ))}
        </motion.div>

        {/* Image + Carte de contenu */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="relative rounded-2xl overflow-hidden h-[480px] md:h-[580px]"
        >
          {/* Image de fond B&W */}
          <img
            src={bgImage}
            alt="Espace d'art contemporain"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Voile sombre */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Carte de contenu (change selon le badge actif) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease }}
              className="absolute inset-x-6 md:inset-x-12 bottom-6 md:bottom-10 bg-white rounded-2xl p-8 md:p-10"
            >
              <h3 className="font-display text-xl md:text-2xl text-[#111110] leading-tight tracking-tight mb-3">
                {current.title}
              </h3>
              <p className="text-[#6B6A67] text-sm leading-relaxed mb-6 max-w-2xl">
                {current.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {current.features.map((f) => (
                  <span
                    key={f}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-xs border border-[#E8E8E6] text-[#6B6A67] bg-[#F9F9F8]"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
