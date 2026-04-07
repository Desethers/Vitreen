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
  badge?: string;
  subtitle?: string;
  description: string;
  featuresHeading?: string;
  features: string[];
  delivery?: string;
  price: string;
  priceNote?: string;
  cta: string;
  highlight: boolean;
  footerNote?: string;
};

const services: Service[] = [
  {
    tier: "PORTFOLIO",
    name: "Artist Portfolio",
    description: "Un site portfolio élégant et professionnel pour artistes indépendants.",
    featuresHeading: "Inclus :",
    features: [
      "Site rapide & responsive",
      "Jusqu'à 50 œuvres",
      "Pages essentielles",
      "Contact sur chaque œuvre",
      "SEO de base",
    ],
    delivery: "Livraison : 5 jours ouvrés",
    price: "À partir de 990 €",
    priceNote: "Paiement unique (one-time)",
    cta: "Commencer",
    highlight: false,
  },
  {
    tier: "SITE GALERIE",
    name: "Gallery Growth",
    description: "Un site galerie clair, structuré et prêt à être utilisé.",
    featuresHeading: "Inclus :",
    features: [
      "Catalogue illimité",
      "Artistes, œuvres, expositions",
      "Parcours orienté collectionneur",
      "Inquiry system optimisé",
      "SEO marché de l'art",
    ],
    delivery: "Livraison : 3 semaines",
    price: "À partir de 3 000 €",
    priceNote: "Paiement unique (one-time)",
    cta: "Commencer",
    highlight: false,
  },
  {
    tier: "PARTNER",
    name: "Partner",
    description: "Un responsable digital externalisé pour votre galerie.",
    featuresHeading: "Inclus :",
    features: [
      "Gestion continue du site",
      "Publication & mise à jour",
      "Newsletter stratégique",
      "Structuration des contacts",
      "Diffusion sur plateformes",
      "Tracking & analyse",
    ],
    price: "1 200 € / mois",
    priceNote: "Sans engagement. Résiliable à tout moment.",
    cta: "Discuter du projet",
    highlight: true,
  },
];

export default function Services() {
  return (
    <section id="offre" className="pt-12 md:pt-[60px] pb-12 md:pb-[60px] px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div {...fadeUp(0)} className="mb-8 md:mb-[48px]">
          <h2 className="font-display text-[20px] md:text-[26px] font-normal text-[#111110] leading-[1.2] tracking-[-0.02em]">
            Choisissez votre formule
          </h2>
          <p className="mt-0 text-[#6B6A67] text-[20px] md:text-[26px] font-normal max-w-xl leading-[1.2] tracking-[-0.02em]">
            Recrutez votre partenaire de croissance digitale.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <motion.article
              key={service.tier}
              {...fadeUp(i * 0.1)}
              className={`relative rounded-[5px] p-7 flex flex-col justify-between min-h-[420px] transition-[border-color] duration-200 ${
                service.highlight
                  ? ""
                  : "border border-[#E8E8E6] bg-white hover:border-[#111110]"
              }`}
              style={
                service.highlight
                  ? { border: "1px solid #111110", background: "#111110" }
                  : undefined
              }
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 min-h-[clamp(7rem,9vw,11rem)]">
                  <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
                    <span
                      className="text-[10px] tracking-[0.15em] uppercase"
                      style={{ color: service.highlight ? "rgba(255,255,255,0.4)" : "#ADADAA" }}
                    >
                      {service.tier}
                    </span>
                    {service.badge ? (
                      <span
                        className="text-[10px] tracking-[0.06em] uppercase shrink-0 px-2 py-0.5 rounded-full border font-medium"
                        style={{
                          color: service.highlight ? "rgba(255,255,255,0.55)" : "#6B6A67",
                          borderColor: service.highlight ? "rgba(255,255,255,0.2)" : "#E8E8E6",
                        }}
                      >
                        {service.badge}
                      </span>
                    ) : null}
                  </div>
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
                </div>

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
                <p
                  className="text-sm font-medium"
                  style={{ color: service.highlight ? "rgba(255,255,255,0.7)" : "#111110", visibility: service.delivery ? "visible" : "hidden" }}
                >
                  {service.delivery ?? "\u00a0"}
                </p>
                <div className="flex flex-col gap-1.5">
                  <p
                    className="text-sm font-medium"
                    style={{ color: service.highlight ? "rgba(255,255,255,0.7)" : "#111110" }}
                  >
                    {service.price}
                  </p>
                  {service.priceNote ? (
                    <p
                      className="text-xs leading-relaxed min-h-[2.5rem]"
                      style={{
                        color: service.highlight ? "rgba(255,255,255,0.45)" : "#6B6A67",
                      }}
                    >
                      {service.priceNote}
                    </p>
                  ) : null}
                </div>
                {service.footerNote ? (
                  <p
                    className="text-xs leading-relaxed text-center"
                    style={{
                      color: service.highlight ? "rgba(255,255,255,0.4)" : "#ADADAA",
                    }}
                  >
                    {service.footerNote}
                  </p>
                ) : null}
                <a
                  href="#contact"
                  className={`inline-flex items-center justify-center text-sm px-5 py-2.5 rounded-full w-full font-medium transition-colors duration-200 ${
                    service.highlight
                      ? "bg-white text-[#111110] hover:bg-[#F5F5F3]"
                      : "bg-[#111110] text-white hover:bg-[#2a2a28]"
                  }`}
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
