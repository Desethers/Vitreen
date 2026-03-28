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
    cta: "Voir un exemple",
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
    cta: "Voir un exemple",
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
    cta: "Voir un exemple",
  },
];

export default function Services() {
  return (
    <section id="offre" className="py-28 px-8 md:px-14">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          {...fadeUp(0)}
          className="mb-16"
        >
          <p className="text-xs tracking-widest uppercase text-[#ADADAA] mb-4">
            Offres
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-[#111110] leading-tight tracking-tight mb-4">
            Choisissez votre formule.
          </h2>
          <p className="text-[#6B6A67] text-base max-w-xl leading-relaxed">
            Tout ce dont une galerie a besoin. Rien de superflu.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {services.map((service, i) => (
            <motion.article
              key={service.tier}
              {...fadeUp(i * 0.1)}
              className="group border border-[#111110] rounded-[20px] p-6 flex flex-col justify-between min-h-[460px] hover:bg-[#111110] transition-colors duration-300"
            >
              <div className="flex flex-col gap-4">
                <span className="text-xs tracking-[0.15em] uppercase text-[#6B6A67] group-hover:text-[#999]">
                  {service.tier}
                </span>
                <h3 className="font-display text-2xl text-[#111110] group-hover:text-white">
                  {service.name}
                </h3>
                <p className="text-[#6B6A67] text-sm leading-relaxed group-hover:text-[#aaa]">
                  {service.description}
                </p>
                <ul className="flex flex-col gap-1.5 mt-2">
                  {service.features.map((f) => (
                    <li
                      key={f}
                      className="text-sm text-[#111110] leading-relaxed group-hover:text-white/90"
                    >
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-4 mt-8">
                <p className="text-sm text-[#111110] group-hover:text-white">
                  {service.price}
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center bg-[#111110] text-white text-sm px-5 py-2.5 rounded-lg w-fit hover:bg-[#2a2a28] transition-colors duration-200 group-hover:bg-white group-hover:text-[#111110]"
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
