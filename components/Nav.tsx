"use client";

import { useState, useEffect } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Offres", href: "#offre" },
    { label: "Projets", href: "#projets" },
    { label: "À propos", href: "#approche" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}>
      <div className={`max-w-5xl mx-auto transition-all duration-500 ${scrolled ? "glass rounded-2xl mx-6" : ""}`}>
        <div className="h-12 flex items-center justify-between px-4">
          <a href="#" className="text-[#111110] font-display text-base tracking-tight">
            Vitreen
          </a>

          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[#6B6A67] hover:text-[#111110] text-sm transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="text-sm glass text-[#111110] px-4 py-2 rounded-full hover:bg-black/5 transition-colors duration-200"
            >
              Contactez-nous
            </a>
          </nav>

          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className={`block w-5 h-px bg-[#111110] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-px bg-[#111110] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-px bg-[#111110] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden glass mx-4 mt-2 rounded-2xl px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="text-[#111110] text-base">
              {link.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setMenuOpen(false)} className="text-sm bg-[#111110] text-white px-4 py-2.5 rounded-full text-center">
            Contactez-nous
          </a>
        </div>
      )}
    </header>
  );
}
