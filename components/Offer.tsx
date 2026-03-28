"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const plans = [
  {
    name: "Essentiel",
    price: "1 900 €",
    description: "Pour les galeries qui démarrent leur présence en ligne.",
    features: [
      "Site jusqu'à 5 pages",
      "Pages artistes",
      "Pages expositions",
      "Site mobile",
      "CMS simple",
      "Formation incluse",
    ],
    cta: "Démarrer",
    highlighted: false,
  },
  {
    name: "Galerie",
    price: "3 500 €",
    description: "La solution complète pour une galerie active.",
    features: [
      "Site jusqu'à 15 pages",
      "Pages artistes & œuvres",
      "Pages expositions archivées",
      "Site mobile",
      "CMS avancé",
      "SEO optimisé",
      "Formation & accompagnement",
    ],
    cta: "Choisir Galerie",
    highlighted: true,
  },
  {
    name: "Sur-mesure",
    price: "Sur devis",
    description: "Pour les projets complexes ou les besoins spécifiques.",
    features: [
      "Pages illimitées",
      "Fonctionnalités personnalisées",
      "Intégrations spécifiques",
      "Design entièrement sur-mesure",
      "Support prioritaire",
      "Accompagnement long terme",
    ],
    cta: "Nous contacter",
    highlighted: false,
  },
];

export default function Offer() {
  return (
    <section id="offre" className="py-20 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-16"
        >
          <h2 className="font-display text-[26px] md:text-[26px] font-normal text-[#111110] leading-[1.3] tracking-[-0.02em]">
            Choisissez votre formule.
          </h2>
          <p className="mt-0.5 text-[#6B6A67] text-[26px] font-normal max-w-xl leading-[1.3] tracking-[-0.02em]">
            Tout ce dont une galerie a besoin. Rien de superflu.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: i * 0.1 }}
              className={`relative flex flex-col p-8 rounded-2xl ${
                plan.highlighted
                  ? "bg-[#111110]"
                  : "glass"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute top-6 right-6 text-[10px] tracking-widest uppercase text-white/30">
                  Recommandé
                </span>
              )}

              <div className="mb-8">
                <p className={`text-xs tracking-widest uppercase mb-4 ${plan.highlighted ? "text-white/40" : "text-[#ADADAA]"}`}>
                  {plan.name}
                </p>
                <p className={`font-display text-4xl mb-3 ${plan.highlighted ? "text-white" : "text-[#111110]"}`}>
                  {plan.price}
                </p>
                <p className={`text-sm leading-relaxed ${plan.highlighted ? "text-white/50" : "text-[#6B6A67]"}`}>
                  {plan.description}
                </p>
              </div>

              <ul className="flex flex-col gap-3 mb-10 flex-1">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-3">
                    <span className={`text-xs mt-0.5 shrink-0 ${plan.highlighted ? "text-white/25" : "text-[#ADADAA]"}`}>—</span>
                    <span className={`text-sm ${plan.highlighted ? "text-white/60" : "text-[#6B6A67]"}`}>{feat}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                  plan.highlighted
                    ? "bg-white text-[#111110] hover:bg-white/90"
                    : "bg-[#111110] text-white hover:bg-[#2a2a28]"
                }`}
              >
                {plan.cta} →
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
