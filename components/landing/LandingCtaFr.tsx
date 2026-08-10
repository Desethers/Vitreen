"use client";

import { Button } from "@/components/ui/Button";
import { openContact } from "@/components/landing/LandingNav";
import LandingLanguageSwitch from "@/components/landing/LandingLanguageSwitch";

const FOOTER_COLUMNS = [
  {
    title: "Produit",
    links: [
      { label: "Méthode", href: "/fr#how-it-works" },
      { label: "Tarifs", href: "/fr/pricing" },
    ],
  },
  {
    title: "Vitreen",
    links: [
      { label: "À propos", href: "/fr/about" },
      { label: "Contact", href: "#contact", opensContact: true },
    ],
  },
] as const;

export default function LandingCtaFr() {
  return (
    <>
      <section className="bg-white px-6 pb-12 pt-12 md:px-12 md:pb-20 md:pt-20 lg:pb-24 lg:pt-24">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <h2 className="mb-0 max-w-[22ch] font-display text-[30px] font-normal leading-[1.15] tracking-[-0.03em] text-[#111110] md:max-w-none md:text-[44px]">
            Rendez vos informations d’œuvres plus faciles à utiliser.
          </h2>
          <p className="mb-10 mt-0 max-w-3xl text-[30px] font-normal leading-[1.15] tracking-[-0.03em] text-[#6B6A67] md:mb-12 md:text-[44px]">
            Découvrez comment Vitreen connecte vos fiches à Gmail et WhatsApp.
          </p>

          <Button size="lg" onClick={openContact}>
            Réserver une démo
          </Button>

          <p className="mt-4 text-[13px] leading-[1.5] text-[#ADADAA] md:text-[14px]">
            Une présentation de 30 minutes basée sur le fonctionnement actuel de votre galerie.
          </p>
        </div>
      </section>

      <footer id="contact" className="bg-[#111110] text-white">
        <div className="px-4 md:px-6">
          <div className="mx-auto max-w-7xl py-14 md:py-20">
            <div className="grid gap-14 md:grid-cols-[minmax(240px,1fr)_minmax(0,1.5fr)] md:gap-20 lg:gap-28">
              <div>
                <a href="/fr" className="font-display text-[18px] tracking-[-0.025em] text-white">
                  Vitreen
                </a>
                <p className="mt-5 max-w-[23rem] text-[14px] leading-[1.65] text-[#ADADAA]">
                  Outils de vente pour galeries d’art contemporain — construits autour de votre
                  inventaire, dans Gmail et WhatsApp.
                </p>
              </div>

              <nav aria-label="Pied de page" className="grid gap-10 sm:grid-cols-2 sm:gap-8">
                {FOOTER_COLUMNS.map((column) => (
                  <div key={column.title}>
                    <h3 className="text-[12px] font-medium text-[#6B6A67]">{column.title}</h3>
                    <ul className="mt-5 space-y-3">
                      {column.links.map((link) => (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            onClick={"opensContact" in link ? openContact : undefined}
                            className="text-[14px] leading-snug text-[#D5D5D2] transition-colors duration-200 hover:text-white"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </div>

            <div className="mt-16 flex flex-col gap-3 pt-6 text-[12px] text-[#6B6A67] sm:flex-row sm:items-center sm:justify-between md:mt-20">
              <p>© 2026 Vitreen</p>
              <div className="flex items-center gap-4">
                <LandingLanguageSwitch lang="fr" />
                <p>Paris, France</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
