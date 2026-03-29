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
    <section className="py-6 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Stripe-style */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-6"
        >
          {/* Tabs */}
          <div className="flex flex-wrap gap-2">
            {audiences.map((a, i) => (
              <button
                key={a.label}
                onClick={() => setActive(i)}
                className="inline-flex items-center px-4 py-1.5 rounded-full text-sm transition-all duration-200"
                style={
                  i === active
                    ? {
                        background: "#111110",
                        color: "#fff",
                        fontWeight: 500,
                        letterSpacing: "-0.01em",
                      }
                    : {
                        border: "1px solid #E8E8E6",
                        color: "#6B6A67",
                        background: "transparent",
                        letterSpacing: "-0.01em",
                      }
                }
                onMouseEnter={(e) => {
                  if (i !== active) {
                    e.currentTarget.style.borderColor = "#111110";
                    e.currentTarget.style.color = "#111110";
                  }
                }}
                onMouseLeave={(e) => {
                  if (i !== active) {
                    e.currentTarget.style.borderColor = "#E8E8E6";
                    e.currentTarget.style.color = "#6B6A67";
                  }
                }}
              >
                {a.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Vidéo avec fond B&W */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease, delay: 0.08 }}
          className="rounded-2xl p-4 md:px-28 md:py-7"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "140%",
            backgroundPosition: "center 40%",
          }}
        >
          <div
            className="rounded-xl overflow-hidden shadow-2xl"
            style={{ aspectRatio: "2922 / 1590" }}
          >
            <video
              key={active}
              src={current.video}
              autoPlay
              muted
              playsInline
              loop
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
