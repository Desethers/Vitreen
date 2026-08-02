"use client";

import { GalleryOsSearchWidget, WhatsAppPdfMockup } from "@/components/shared/ArtworkAddInMocks";
import { Button } from "@/components/ui/Button";
import { openContact } from "@/components/landing/LandingNav";

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

        <div className="relative mx-auto h-[340px] w-full max-w-md md:h-[420px] md:max-w-none">
          <div className="absolute inset-x-4 bottom-0 top-6 rounded-[16px] bg-[#F5F5F3] md:inset-x-10" />
          <div className="absolute right-0 top-0 w-[220px] rounded-[12px] border border-[#E8E8E6] bg-white p-4 shadow-[0_24px_60px_rgba(0,0,0,0.08)] md:w-[240px] md:p-5">
            <GalleryOsSearchWidget
              insertLabel="Insérer une œuvre"
              searchLabel="Recherche Vitreen"
              searchCta="Chercher"
              galleryViewCta="Vue galerie"
            />
          </div>
          <div className="absolute bottom-0 left-0 w-[230px] rounded-[16px] border border-[#E8E8E6] bg-white p-4 shadow-[0_24px_60px_rgba(0,0,0,0.08)] md:w-[260px] md:p-5">
            <WhatsAppPdfMockup
              incomingLabel="Constitution de votre sélection..."
              readyLabel="Sélection prête · 1 page"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
