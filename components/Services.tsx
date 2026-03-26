"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease, delay },
});

const services = [
  {
    tier: "BASE",
    name: "Présence",
    description: "Un site structuré pour présenter vos artistes et vos œuvres",
    features: [
      "Pages artistes, œuvres, expositions",
      "CMS simple",
      "Images optimisées",
      "Mobile et SEO",
    ],
    price: "À partir de 3 000€",
    cta: "Commencer",
    highlight: false,
  },
  {
    tier: "DIFFUSION",
    name: "Communication",
    description:
      "Un système pour publier et rester en lien avec vos collectionneurs",
    features: [
      "Tout le pack Base",
      "Templates emails (HTML)",
      "Newsletter réutilisable",
      "Viewing rooms",
    ],
    price: "À partir de 4 000€",
    cta: "Commencer",
    highlight: true,
  },
  {
    tier: "PARTNER",
    name: "Évolution",
    description: "Un site qui évolue avec votre galerie dans le temps",
    features: [
      "Ajout et mise à jour de contenus",
      "Ajustements design",
      "Nouvelles pages",
      "Support et conseils",
    ],
    price: "À partir de 300€/mois",
    cta: "Commencer",
    highlight: false,
  },
];

export default function Services() {
  return (
    <section id="offre" className="py-20 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div {...fadeUp(0)} className="mb-16">
          <h2 className="font-display text-[26px] md:text-[26px] font-normal text-[#111110] leading-[1.3] tracking-[-0.02em]">
            Choisissez votre formule.
          </h2>
          <p className="mt-1 text-[#6B6A67] text-[26px] font-normal max-w-xl leading-[1.3] tracking-[-0.02em]">
            Tout ce dont une galerie a besoin. Rien de superflu.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <motion.article
              key={service.tier}
              {...fadeUp(i * 0.1)}
              className="relative rounded-2xl p-7 flex flex-col justify-between min-h-[420px]"
              style={{
                border: service.highlight
                  ? "1px solid #111110"
                  : "1px solid #E8E8E6",
                background: service.highlight ? "#111110" : "#fff",
              }}
            >
              {service.highlight && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] tracking-widest uppercase"
                  style={{
                    background: "#fff",
                    color: "#111110",
                    border: "1px solid #E8E8E6",
                    whiteSpace: "nowrap",
                  }}
                >
                  Populaire
                </div>
              )}

              <div className="flex flex-col gap-4">
                <span
                  className="text-[10px] tracking-[0.15em] uppercase"
                  style={{ color: service.highlight ? "rgba(255,255,255,0.4)" : "#ADADAA" }}
                >
                  {service.tier}
                </span>
                <h3
                  className="font-display text-2xl tracking-tight"
                  style={{ color: service.highlight ? "#fff" : "#111110" }}
                >
                  {service.name}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: service.highlight ? "rgba(255,255,255,0.5)" : "#6B6A67" }}
                >
                  {service.description}
                </p>

                <div
                  className="h-px w-full"
                  style={{
                    background: service.highlight
                      ? "rgba(255,255,255,0.1)"
                      : "#E8E8E6",
                  }}
                />

                <ul className="flex flex-col gap-2">
                  {service.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-sm leading-relaxed"
                      style={{ color: service.highlight ? "rgba(255,255,255,0.75)" : "#111110" }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="mt-0.5 shrink-0"
                        style={{
                          color: service.highlight
                            ? "rgba(255,255,255,0.4)"
                            : "#ADADAA",
                        }}
                      >
                        <path
                          d="M3 8l3.5 3.5L13 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-4 mt-8">
                <p
                  className="text-sm font-medium"
                  style={{ color: service.highlight ? "rgba(255,255,255,0.7)" : "#111110" }}
                >
                  {service.price}
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center text-sm px-5 py-2.5 rounded-full w-full font-medium transition-all duration-200"
                  style={
                    service.highlight
                      ? { background: "#fff", color: "#111110" }
                      : { background: "#111110", color: "#fff" }
                  }
                >
                  {service.cta}
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
