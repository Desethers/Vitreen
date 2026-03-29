"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease, delay },
});

type Service = {
  tier: string;
  name: string;
  subtitle?: string;
  description: string;
  featuresHeading?: string;
  features: string[];
  delivery?: string;
  price: string;
  priceNote?: string;
  cta: string;
  highlight: boolean;
};

const services: Service[] = [
  {
    tier: "SITE GALERIE",
    name: "Gallery Website Package",
    description: "Un site galerie clair, structuré et prêt à être utilisé.",
    featuresHeading: "Inclus :",
    features: [
      "Catalogue Dynamique : Structure illimitée (Artistes, Œuvres, Expositions).",
      "Site responsive",
      "Images optimisées",
      "SEO Art Market : Indexation optimisée pour les collectionneurs.",
      "Inquiry System : Contact direct sur chaque œuvre pour capturer l'achat.",
    ],
    delivery: "Livraison : 2 semaines",
    price: "À partir de 2 000 €",
    cta: "Commencer",
    highlight: false,
  },
  {
    tier: "PARTNER",
    name: "Partner",
    subtitle: "Un responsable digital externalisé pour votre galerie.",
    description:
      "Vous déléguez la gestion de votre site et de votre diffusion.\n\nNous assurons la continuité, les mises à jour et la communication.",
    featuresHeading: "Inclus :",
    features: [
      "Création du site (incluse)",
      "Publication du catalogue (œuvres et expositions)",
      "Newsletter stratégique (conception, segmentation et envoi)",
      "Formation aux outils IA (optimisation du workflow et rédaction assistée)",
      "Structuration des emails",
      "Stratégie d'Acquisition : Aide à la diffusion sur les plateformes tierces (Artsy, Artnet, etc.).",
      "Data & Tracking : Analyse précise du parcours des collectionneurs sur le site.",
    ],
    price: "800 € / mois",
    priceNote: "Sans engagement. Résiliable à tout moment.",
    cta: "Discuter du projet",
    highlight: true,
  },
];

export default function Services() {
  return (
    <section id="offre" className="py-16 md:py-24 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div {...fadeUp(0)} className="mb-16">
          <h2 className="font-display text-[26px] md:text-[26px] font-normal text-[#111110] leading-[1.3] tracking-[-0.02em]">
            Choisissez votre formule.
          </h2>
          <p className="mt-1 text-[#6B6A67] text-[26px] font-normal max-w-xl leading-[1.3] tracking-[-0.02em]">
            Recrutez votre partenaire de croissance digitale.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                {service.subtitle ? (
                  <p
                    className="text-sm font-semibold leading-snug tracking-[-0.01em]"
                    style={{ color: service.highlight ? "#fff" : "#111110" }}
                  >
                    {service.subtitle}
                  </p>
                ) : null}
                <p
                  className="text-sm leading-relaxed whitespace-pre-line"
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

                {service.featuresHeading ? (
                  <p
                    className="text-xs font-medium uppercase tracking-[0.08em]"
                    style={{
                      color: service.highlight ? "rgba(255,255,255,0.45)" : "#ADADAA",
                    }}
                  >
                    {service.featuresHeading}
                  </p>
                ) : null}

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
                {service.delivery ? (
                  <p
                    className="text-sm font-medium"
                    style={{ color: service.highlight ? "rgba(255,255,255,0.7)" : "#111110" }}
                  >
                    {service.delivery}
                  </p>
                ) : null}
                <div className="flex flex-col gap-1.5">
                  <p
                    className="text-sm font-medium"
                    style={{ color: service.highlight ? "rgba(255,255,255,0.7)" : "#111110" }}
                  >
                    {service.price}
                  </p>
                  {service.priceNote ? (
                    <p
                      className="text-xs leading-relaxed"
                      style={{
                        color: service.highlight ? "rgba(255,255,255,0.45)" : "#6B6A67",
                      }}
                    >
                      {service.priceNote}
                    </p>
                  ) : null}
                </div>
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
