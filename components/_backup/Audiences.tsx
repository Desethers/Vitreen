"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const bgImage = "/allen14.jpg-preview3.jpg";

type Audience = {
  label: string;
  title: string;
  description: string;
  features: string[];
  video: string;
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
    video: "/demo-galerie.mp4",
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
    video: "/demo-vitreen.mp4",
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
    video: "/demo-vitreen.mp4",
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
    video: "/demo-vitreen.mp4",
  },
];

export default function Audiences() {
  const [active, setActive] = useState(0);
  const current = audiences[active];

  const handleVideoEnd = useCallback(() => {
    setActive((prev) => (prev + 1) % audiences.length);
  }, []);

  return (
    <section className="py-4 px-8 md:px-14">
      <div className="max-w-6xl mx-auto">
      {/* Badges de navigation */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease }}
        className="flex flex-wrap gap-3.5 py-2.5 mb-6"
      >
        {audiences.map((a, i) => (
          <button
            key={a.label}
            onClick={() => setActive(i)}
            className={
              i === active
                ? "inline-flex items-center px-4 py-1 rounded-full text-base font-medium bg-black text-white tracking-[-0.02em] transition-all duration-200"
                : "inline-flex items-center px-4 py-1 rounded-full text-base font-medium border border-black text-black bg-white hover:bg-black hover:text-white tracking-[-0.02em] transition-all duration-200"
            }
          >
            {a.label}
          </button>
        ))}
      </motion.div>

      {/* Image B&W en fond + vidéo incrustée */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease, delay: 0.1 }}
        className="rounded-[10px] p-4 md:px-28 md:py-7"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "140%",
          backgroundPosition: "center 40%",
        }}
      >
        <div className="rounded-[10px] overflow-hidden shadow-2xl" style={{ aspectRatio: "2922 / 1590" }}>
          <video
            key={active}
            src={current.video}
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            className="w-full h-full object-contain"
          />
        </div>
      </motion.div>
      </div>
    </section>
  );
}
