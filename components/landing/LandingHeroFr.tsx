"use client";

import AskAgentPanel from "@/components/shared/AskAgentPanel";
import { Button } from "@/components/ui/Button";
import { openContact } from "@/components/landing/LandingNav";

const WORKS = [
  { title: "Evening Field", meta: "2023 · 18 000 €", image: "/artworks/painting-03.jpg" },
  { title: "Low Tide", meta: "2024 · 16 500 €", image: "/artworks/painting-06.png" },
];

export default function LandingHeroFr() {
  return (
    <section className="relative flex flex-col overflow-hidden bg-white px-4 pb-14 pt-36 md:px-6 md:pb-20 md:pt-44">
      <div className="relative mx-auto grid w-full max-w-7xl gap-10 md:grid-cols-[1.05fr_1fr] md:items-center md:gap-12">
        <div className="text-[22px] leading-[1.3] md:text-[30px]">
          <p className="hero-fade-up mb-3 text-[12px] font-medium uppercase tracking-[0.14em] text-[#ADADAA] md:mb-4">
            Outils de vente pour galeries d’art contemporain
          </p>

          <h1
            className="hero-fade-up m-0 max-w-xl text-balance leading-[inherit] tracking-[-0.04em] font-display"
            style={{ color: "#111110" }}
          >
            Donnez des superpouvoirs à votre galerie.
          </h1>

          <p className="hero-fade-up hero-fade-up-delay mt-[16px] max-w-lg leading-[inherit] tracking-[-0.02em] text-[#6B6A67]">
            Connectez des agents IA à votre inventaire d’œuvres et transformez vos données
            existantes en emails, sélections et PDF prêts pour vos collectionneurs, dans Gmail et
            WhatsApp.
          </p>

          <div className="hero-fade-up hero-fade-up-delay mt-[18px] flex flex-wrap items-center gap-3 md:mt-[22px]">
            <Button size="lg" onClick={openContact}>
              Réserver une démo
            </Button>
            <Button
              size="lg"
              href="#how-it-works"
              variant="inverse"
              className="border border-[#E8E8E6]"
            >
              Voir comment ça marche
            </Button>
          </div>

          <p className="hero-fade-up hero-fade-up-delay mt-5 text-[13px] leading-[1.5] tracking-[-0.01em] text-[#ADADAA] md:text-[14px]">
            Fonctionne avec Artlogic, vos tableurs et vos bases d’œuvres existantes.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <AskAgentPanel
            channelLabel="Gmail"
            question="Œuvres disponibles de Marina Perez à moins de 20 000 €"
            resultsLabel="2 œuvres · depuis votre inventaire"
            works={WORKS}
            draftLabel="Brouillon de réponse"
            draftText="Chère Marie, deux œuvres de Marina Perez sont actuellement disponibles dans cette gamme. Je vous les présente ci-dessous — je peux organiser une visite cette semaine."
            footnote="Rien ne part sans vous"
            ctaLabel="Relire et envoyer"
          />
          <p className="mt-4 text-[12px] leading-[1.5] text-[#ADADAA]">
            Fonctionne dans Gmail et WhatsApp Business
          </p>
        </div>
      </div>
    </section>
  );
}
