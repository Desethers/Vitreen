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
    <section className="py-16 md:py-24 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp(0)} className="mb-10 md:mb-14">
          <h2 className="font-display text-[26px] md:text-[26px] font-normal text-[#111110] leading-[1.3] tracking-[-0.02em] max-w-3xl">
            Amplifiez l&apos;influence de votre galerie.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5 lg:gap-6 items-stretch">
          <motion.div
            {...fadeUp(0.06)}
            className="group rounded-3xl min-h-[320px] sm:min-h-[400px] lg:min-h-[560px] bg-white flex flex-col justify-between overflow-hidden border border-[#E5E7EB] p-10 sm:p-12 md:p-14 lg:p-16 transition-[background-color,border-color] duration-300 ease-out hover:bg-[#000000] hover:border-white/10"
          >
            {/* Une seule carte : fond blanc partout (padding + grille), puis survol → noir d’un bloc */}
            <div className="flex flex-1 min-h-0 w-full items-center justify-center">
              <div className="w-full grid grid-cols-2 grid-rows-2 gap-px bg-[#E5E7EB] transition-colors duration-300 ease-out group-hover:bg-white/12">
                {marketStats.map((m) => (
                  <div
                    key={m.value}
                    className="bg-white transition-colors duration-300 ease-out group-hover:bg-[#000000] flex items-center justify-center min-h-[9rem] sm:min-h-[10.5rem] md:min-h-[11.5rem] px-3 py-8 sm:px-4 sm:py-10"
                  >
                    <div className="inline-flex max-w-full flex-col items-start gap-2 text-left">
                      <span className="font-display text-[clamp(1.75rem,4.2vw,2rem)] sm:text-[2rem] font-normal text-black leading-[1.05] tracking-[-0.03em] transition-colors duration-300 group-hover:text-white">
                        {m.value}
                      </span>
                      <span className="text-xs sm:text-[13px] font-normal text-black leading-snug tracking-[-0.02em] max-w-[13rem] transition-colors duration-300 group-hover:text-white">
                        {m.label}
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-normal leading-snug text-[#737373] tracking-[-0.01em] transition-colors duration-300 group-hover:text-white/55">
                        {m.sub}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[9px] sm:text-[10px] text-[#ADADAA] mt-8 tracking-wide text-center sm:text-left leading-relaxed transition-colors duration-300 group-hover:text-white/40">
              Source : Art Basel & UBS Global Art Market Report 2026
            </p>
          </motion.div>

          <motion.article
            {...fadeUp(0.12)}
            className="rounded-3xl p-8 md:p-10 lg:p-12 xl:p-14 bg-white border border-[#F3EAEA] flex flex-col justify-center"
          >
            <h2 className="font-display font-normal text-2xl md:text-[26px] leading-[1.2] tracking-[-0.03em] text-[#000000] max-w-xl">
              L&apos;extension digitale de votre espace physique.
            </h2>

            <div className="mt-8 space-y-5 text-[15px] md:text-base leading-[1.65] text-[#000000]/88 tracking-[-0.01em] max-w-xl">
              <p>
                Avec 10,5 milliards de dollars de transactions annuelles, la
                vente en ligne est un standard : ne plus y être, c&apos;est
                s&apos;effacer. Nous concevons des stratégies où la technique
                disparaît pour fluidifier la découverte des œuvres et déclencher
                un engagement immédiat.
              </p>
              <p>
                Une plateforme pensée pour les usages sociaux devient un outil
                de croissance : elle optimise la visibilité des artistes et
                consolide les relations avec les collectionneurs.
              </p>
              <p>
                Vitreen transpose l&apos;exigence de la galerie physique vers le
                digital. Chaque interface est architecturée pour fluidifier le
                parcours utilisateur et favoriser des échanges authentiques
                entre l&apos;œuvre et son public.
              </p>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
