"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.7, ease, delay },
});

const marketStats = [
  { value: "$10,5Mds", label: "Ventes en ligne en 2024", sub: "Marché mondial" },
  { value: "18%", label: "Du marché total", sub: "Part du digital" },
  { value: "+76%", label: "Vs avant-pandémie", sub: "Depuis 2019" },
  { value: "40,5M", label: "Transactions en 2024", sub: "+3% sur un an" },
] as const;

export default function StatementSplit() {
  return (
    <section className="px-4 md:px-6 bg-white">
      <div className="bg-gradient-to-b from-[#F9FAFD] to-white pt-12 md:pt-[80px] pb-10 md:pb-[51px]">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp(0)} className="mb-8 md:mb-14">
          <h2 style={{ fontSize: "32px" }} className="font-display font-normal text-[#111110] leading-[1.3] tracking-[-0.02em] text-center">
            L&apos;économie de la vente d&apos;art en ligne explose
          </h2>
        </motion.div>

        <motion.div {...fadeUp(0.06)} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {marketStats.map((m) => (
            <div
              key={m.value}
              className="flex flex-col justify-between min-h-[260px] md:min-h-[320px] px-6 py-8 md:px-8 md:py-10 border border-[#E5E7EB] rounded-[5px] transition-all duration-200 hover:border-[#111110] hover:bg-white"
            >
              <span className="font-display text-[1.75rem] md:text-[2rem] font-normal text-[#111110] leading-[1.05] tracking-[-0.03em]">
                {m.value}
              </span>
              <div className="flex flex-col gap-1">
                <span className="text-[13px] font-normal text-[#111110] leading-snug tracking-[-0.02em]">
                  {m.label}
                </span>
                <span className="text-[11px] font-normal leading-snug text-[#ADADAA] tracking-[-0.01em]">
                  {m.sub}
                </span>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div {...fadeUp(0.09)} className="mt-14 md:mt-20">
          <h2 className="font-display text-[20px] md:text-[26px] font-normal text-[#111110] leading-[1.3] tracking-[-0.02em] max-w-3xl mb-5 md:mb-[48px]">
            Amplifiez l&apos;influence de votre galerie
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {/* Block 1 */}
            <div className="flex flex-col gap-4">
              <div className="w-10 h-10 rounded-[8px] border border-[#E8E8E6] flex items-center justify-center shrink-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 11L6 7L9 10L14 4" stroke="#111110" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M11 4H14V7" stroke="#111110" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-[15px] text-[#425466] leading-relaxed tracking-[-0.01em]">
                <span className="font-medium text-[#111110]">Standardisez votre présence en ligne.</span>
                {" "}
                Sans canal d&apos;achat à la hauteur, vous restez hors du champ des collectionneurs qui décident déjà en ligne — partout dans le monde.
              </p>
              <p className="text-[15px] text-[#425466] leading-relaxed tracking-[-0.01em]">
                Vitreen déploie une distribution native, permettant d&apos;exposer, diffuser et rendre accessibles vos œuvres en continu, sans dépendre des circuits traditionnels.
              </p>
            </div>
            {/* Block 2 */}
            <div className="flex flex-col gap-4">
              <div className="w-10 h-10 rounded-[8px] border border-[#E8E8E6] flex items-center justify-center shrink-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6" stroke="#111110" strokeWidth="1.5"/>
                  <path d="M8 2C8 2 6 5 6 8C6 11 8 14 8 14" stroke="#111110" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M2 8H14" stroke="#111110" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <p className="text-[15px] text-[#425466] leading-relaxed tracking-[-0.01em]">
                <span className="font-medium text-[#111110]">Transformez l&apos;attention en transactions.</span>
                {" "}
                Des parcours pensés pour faire passer l&apos;intérêt à l&apos;achat : moins de friction, des choix plus nets, des actions qui comptent.
              </p>
              <p className="text-[15px] text-[#425466] leading-relaxed tracking-[-0.01em]">
                Chaque interaction est optimisée pour convertir la découverte en engagement réel, et l&apos;intérêt en relation commerciale.
              </p>
            </div>
            {/* Block 3 */}
            <div className="flex flex-col gap-4">
              <div className="w-10 h-10 rounded-[8px] border border-[#E8E8E6] flex items-center justify-center shrink-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2L3 4.5V8C3 11.5 5.5 13.8 8 14.5C10.5 13.8 13 11.5 13 8V4.5L8 2Z" stroke="#111110" strokeWidth="1.5" strokeLinejoin="round"/>
                  <path d="M5.5 8L7 9.5L10.5 6" stroke="#111110" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-[15px] text-[#425466] leading-relaxed tracking-[-0.01em]">
                <span className="font-medium text-[#111110]">Reprenez le contrôle de votre relation.</span>
                {" "}
                Données, échanges et historique avec chaque collectionneur se retrouvent au même endroit — fini les informations éparpillées entre mails et outils.
              </p>
              <p className="text-[15px] text-[#425466] leading-relaxed tracking-[-0.01em]">
                Vitreen centralise et structure votre écosystème, transformant votre audience en actif stratégique plutôt qu&apos;en dépendance externe.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      </div>

      <div className="max-w-7xl mx-auto px-0 pb-16 md:pb-24">
        <motion.blockquote
          {...fadeUp(0.15)}
          className="mt-16 font-display text-[20px] md:text-[26px] text-[#111110] leading-relaxed tracking-tight max-w-4xl mx-auto"
        >
          "The digital space is a natural extension of the gallery's storefront.{" "}
          <span>
            In the current era, a robust online program and dedicated strategy is
            essential in the art world."
          </span>
          <footer className="mt-8 flex items-center gap-4 not-italic">
            <img
              src="https://res.cloudinary.com/dqzqcuqf9/image/upload/v1772530245/vip-benefits-images/bztubujvn9fb0hhxyaxh.png"
              alt="Elena Soboleva"
              className="w-11 h-11 rounded-full object-cover flex-shrink-0 grayscale"
            />
            <div className="font-sans">
              <p className="text-sm font-normal text-[#111110] leading-tight">Elena Soboleva</p>
              <p className="text-xs text-[#ADADAA] mt-0.5">Global Head of Audience Growth & Intelligence, Art Basel</p>
            </div>
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
