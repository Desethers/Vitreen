"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import ContactModal from "@/components/ContactModal";
import { openContact } from "@/components/landing/LandingNav";

const LINKS = [
  { label: "Méthode", href: "#how-it-works" },
  { label: "Tarifs", href: "/fr/pricing" },
  { label: "À propos", href: "/fr/about" },
  { label: "Studio", href: "/studio" },
];

/**
 * Version française de LandingNav — même structure, réutilise `openContact`
 * pour piloter le même ContactModal (déjà localisé via useLang).
 */
export default function LandingNavFr() {
  const [scrolled, setScrolled] = useState(false);

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
            className="font-display text-[15px] tracking-tight text-[#111110] md:text-base"
          >
            Vitreen
          </a>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 md:flex">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-[#6B6A67] transition-colors duration-200 hover:text-[#111110]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <Button size="sm" onClick={openContact} className="shrink-0 !px-3 !py-[7px] !text-[12px]">
            Réserver une démo
          </Button>
        </div>
      </header>

      <ContactModal />
    </>
  );
}
