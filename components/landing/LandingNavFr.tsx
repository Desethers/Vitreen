"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import ContactModal from "@/components/ContactModal";
import LandingMobileMenu from "@/components/landing/LandingMobileMenu";
import { DemoCasePreview, openContact, type DemoCaseCopy } from "@/components/landing/LandingNav";

const ease = [0.16, 1, 0.3, 1] as const;

const LINKS = [
  { label: "Tarifs", href: "/fr/pricing" },
  { label: "À propos", href: "/fr/about" },
];

/** Ce que fait le produit, sous « Produit » : les pages /fr/product/* et la section collectionneurs de la home. */
const TOOLS_ITEMS = [
  {
    title: "Inventaire des œuvres",
    desc: "Vos œuvres et artistes, importés depuis CSV ou Excel.",
    href: "/fr/product/artwork-inventory",
  },
  {
    title: "Conversations de vente",
    desc: "Vos fiches d’œuvres dans Gmail et WhatsApp, là où vous vendez.",
    href: "/fr/product/sales-conversations",
  },
  {
    title: "Mémoire des collectionneurs",
    desc: "Qui a reçu quoi, et quand relancer.",
    href: "/fr/product/collectors-memory",
  },
];

/** Le cas de démo : Marie demande, Vitreen prépare, quelqu’un relit et envoie. */
const DEMO_CASE_FR: DemoCaseCopy = {
  channel: "WhatsApp",
  who: "Marie Beaumont",
  question: "Du nouveau chez Sacha Elron ?",
  prepared: "Préparé par Vitreen",
  reply:
    "Bonjour Marie, un nouvel Elron vient d’arriver, le grand format que vous aimiez en mars. Je vous envoie plus d’images ?",
  work: {
    title: "Sacha Elron — Evening Field",
    meta: "120 × 150 cm · 12 000 € · Disponible",
    image: "/artworks/painting-03.jpg",
  },
  edit: "Modifier",
  send: "Relire et envoyer",
  more: "En savoir plus",
};

const TOOLS_FEATURED = {
  eyebrow: "Gmail et WhatsApp",
  title: "Votre inventaire dans chaque conversation",
  desc: "Vos fiches d’œuvres dans les conversations où vous vendez.",
  cta: "En savoir plus",
  image: "/product/conversations-today.webp",
  href: "/fr/product/sales-conversations",
};

/** Mêmes quatre profils que WhoVitreenIsFor sur la home. */
const SOLUTIONS_ITEMS = [
  {
    title: "Galeries d’art",
    desc: "Inventaire d’œuvres, réponses collectionneurs et sélections privées.",
    href: "/fr/solutions/art-galleries",
  },
  {
    title: "Galeries de design",
    desc: "Pièces, disponibilités et présentations clients.",
    href: "/fr/solutions/design-galleries",
  },
  {
    title: "Art advisors",
    desc: "Sélections privées et fiches d’œuvres prêtes pour vos clients.",
    href: "/fr/solutions/art-advisors-dealers",
  },
  {
    title: "Antiquaires et marchands",
    desc: "Pièces uniques, provenance et état, prêts pour chaque client.",
    href: "/fr/solutions/antique-dealers",
  },
];

const SOLUTIONS_FEATURED = {
  eyebrow: "Pour qui",
  title: "Galeries d’art",
  desc: "Inventaire d’œuvres, réponses collectionneurs et sélections privées, construits autour de votre galerie.",
  cta: "En savoir plus",
  image: "/gallery-screen2.png",
  href: "/fr/solutions/art-galleries",
};

/**
 * Version française de LandingNav — même structure, réutilise `openContact`
 * pour piloter le même ContactModal (déjà localisé via useLang).
 */
export default function LandingNavFr() {
  const [scrolled, setScrolled] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [activeToolIndex, setActiveToolIndex] = useState(0);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [activeSolutionIndex, setActiveSolutionIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 2);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 border-b-[0.5px] bg-white px-4 py-2 transition-[border-color] duration-200 md:px-6 ${
          scrolled ? "border-[#E8E8E6]" : "border-transparent"
        }`}
      >
        <div className="relative mx-auto flex h-9 w-full max-w-7xl items-center justify-between">
          <a
            href="/fr"
            className="flex items-center gap-2 font-display text-base tracking-tight text-[#111110] md:text-lg"
          >
            <img src="/favicon.png" alt="" className="h-5 w-5 rounded-[5px]" />
            Vitreen
          </a>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 md:flex">
            <div
              onMouseEnter={() => {
                setToolsOpen(true);
                setSolutionsOpen(false);
              }}
              onMouseLeave={() => setToolsOpen(false)}
            >
              <button
                type="button"
                onClick={() => {
                  setToolsOpen(true);
                  setSolutionsOpen(false);
                }}
                aria-expanded={toolsOpen}
                className="text-sm text-[#858581] transition-colors duration-200 hover:text-[#111110]"
              >
                Produit
              </button>
            </div>
            <div
              onMouseEnter={() => {
                setSolutionsOpen(true);
                setToolsOpen(false);
              }}
              onMouseLeave={() => setSolutionsOpen(false)}
            >
              <button
                type="button"
                onClick={() => {
                  setSolutionsOpen(true);
                  setToolsOpen(false);
                }}
                aria-expanded={solutionsOpen}
                className="text-sm text-[#858581] transition-colors duration-200 hover:text-[#111110]"
              >
                Solutions
              </button>
            </div>
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-[#858581] transition-colors duration-200 hover:text-[#111110]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <Button
            size="sm"
            onClick={openContact}
            className="shrink-0 !px-3 !py-[7px] !text-[12px] max-md:!hidden"
          >
            Réserver une démo
          </Button>
          <LandingMobileMenu
            groups={[
              { title: "Produit", items: TOOLS_ITEMS },
              { title: "Solutions", items: SOLUTIONS_ITEMS },
            ]}
            links={LINKS}
            cta="Réserver une démo"
            label="Menu"
          />
        </div>

        <AnimatePresence>
          {toolsOpen && (
            <motion.div
              key="tools-menu"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease }}
              className="pointer-events-none fixed inset-x-0 top-[44px] z-40 hidden justify-center px-6 md:flex"
            >
              {/* The padding bridges the gap under the nav, so the card stays open on the way down. */}
              <div
                className="pointer-events-auto w-full max-w-[760px] pt-3"
                onMouseEnter={() => setToolsOpen(true)}
                onMouseLeave={() => setToolsOpen(false)}
              >
                <div className="grid grid-cols-[minmax(0,320px)_minmax(0,1fr)] gap-10 rounded-[12px] border border-[#E8E8E6] bg-white p-3 shadow-[0_12px_32px_rgba(0,0,0,0.05)]">
                  <div className="flex flex-col py-2">
                    <span className="px-4 text-[12px] text-[#ADADAA]">Produit</span>
                    <div className="mt-2 flex flex-col gap-1">
                      {TOOLS_ITEMS.map((item, index) => (
                        <a
                          key={item.title}
                          href={item.href}
                          onClick={() => setToolsOpen(false)}
                          onMouseEnter={() => setActiveToolIndex(index)}
                          onFocus={() => setActiveToolIndex(index)}
                          className={`block rounded-[8px] px-4 py-3 transition-colors duration-200 ${
                            activeToolIndex === index ? "bg-[#F5F5F3]" : "hover:bg-[#F8F8F6]"
                          }`}
                        >
                          <span className="font-display text-[15px] text-[#111110]">
                            {item.title}
                          </span>
                          <p className="mt-0.5 text-[12px] leading-snug text-[#6B6A67]">
                            {item.desc}
                          </p>
                        </a>
                      ))}
                    </div>
                  </div>
                  <a
                    href={TOOLS_FEATURED.href}
                    onClick={() => setToolsOpen(false)}
                    className="group relative block overflow-hidden rounded-[8px] bg-[#F5F5F3]"
                  >
                    {/* For now the demo case; later this slot can open something else (an article, a story). */}
                    <DemoCasePreview c={DEMO_CASE_FR} />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {solutionsOpen && (
            <motion.div
              key="solutions-menu"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease }}
              className="pointer-events-none fixed inset-x-0 top-[44px] z-40 hidden justify-center px-6 md:flex"
            >
              {/* The padding bridges the gap under the nav, so the card stays open on the way down. */}
              <div
                className="pointer-events-auto w-full max-w-[760px] pt-3"
                onMouseEnter={() => setSolutionsOpen(true)}
                onMouseLeave={() => setSolutionsOpen(false)}
              >
                <div className="grid grid-cols-[minmax(0,320px)_minmax(0,1fr)] gap-10 rounded-[12px] border border-[#E8E8E6] bg-white p-3 shadow-[0_12px_32px_rgba(0,0,0,0.05)]">
                  <div className="flex flex-col py-2">
                    <span className="px-4 text-[12px] text-[#ADADAA]">Solutions</span>
                    <div className="mt-2 flex flex-col gap-1">
                      {SOLUTIONS_ITEMS.map((item, index) => (
                        <a
                          key={item.title}
                          href={item.href}
                          onClick={() => setSolutionsOpen(false)}
                          onMouseEnter={() => setActiveSolutionIndex(index)}
                          onFocus={() => setActiveSolutionIndex(index)}
                          className={`block rounded-[8px] px-4 py-3 transition-colors duration-200 ${
                            activeSolutionIndex === index ? "bg-[#F5F5F3]" : "hover:bg-[#F8F8F6]"
                          }`}
                        >
                          <span className="font-display text-[15px] text-[#111110]">
                            {item.title}
                          </span>
                          <p className="mt-0.5 text-[12px] leading-snug text-[#6B6A67]">
                            {item.desc}
                          </p>
                        </a>
                      ))}
                    </div>
                  </div>
                  <a
                    href={SOLUTIONS_FEATURED.href}
                    onClick={() => setSolutionsOpen(false)}
                    className="group relative block overflow-hidden rounded-[8px] bg-[#F5F5F3]"
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-[center_42%] transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                      style={{ backgroundImage: `url(${SOLUTIONS_FEATURED.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                      <h4 className="font-display text-[17px]">{SOLUTIONS_FEATURED.title}</h4>
                      <p className="mt-1 max-w-sm text-[12px] leading-snug text-white/75">
                        {SOLUTIONS_FEATURED.desc}
                      </p>
                      <p className="mt-3 flex items-center gap-1 text-[12px] font-medium text-white">
                        {SOLUTIONS_FEATURED.cta}
                        <span
                          aria-hidden="true"
                          className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <ContactModal />
    </>
  );
}
