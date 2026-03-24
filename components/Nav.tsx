"use client";

import { useState, useEffect } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll(); // initialise l'état au mount
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Offres", href: "#offre" },
    { label: "Projets", href: "#projets" },
    { label: "À propos", href: "#approche" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4">
      <div
        className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? "glass rounded-full px-2 py-2 flex items-center gap-2"
            : "w-full max-w-5xl px-8 md:px-14 flex items-center justify-between relative h-12"
        }`}
      >
        {/* Logo */}
        <a
          href="#"
          className={`text-[#111110] font-display text-base tracking-tight shrink-0 transition-all duration-500 ${
            scrolled ? "px-2" : "w-36"
          }`}
        >
          Vitreen
        </a>

        {/* Centre links — masqués au scroll */}
        <nav
          className={`hidden md:flex items-center gap-7 transition-all duration-300 ${
            scrolled
              ? "opacity-0 pointer-events-none w-0 overflow-hidden"
              : "absolute left-1/2 -translate-x-1/2"
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[#6B6A67] hover:text-[#111110] text-sm transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#contact"
          className={`text-sm rounded-full transition-all duration-500 shrink-0 ${
            scrolled
              ? "bg-[#111110] text-white px-4 py-2 hover:bg-[#333]"
              : "glass text-[#111110] px-4 py-2 hover:bg-black/5"
          }`}
        >
          Contactez-nous
        </a>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden glass mx-4 mt-2 rounded-2xl px-6 py-6 flex flex-col gap-5 absolute top-full left-0 right-0">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-[#111110] text-base"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="text-sm bg-[#111110] text-white px-4 py-2.5 rounded-full text-center"
          >
            Contactez-nous
          </a>
        </div>
      )}

      {/* Burger mobile */}
      <button
        className={`md:hidden absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 p-2 ${scrolled ? "hidden" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        <span className={`block w-5 h-px bg-[#111110] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`block w-5 h-px bg-[#111110] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
        <span className={`block w-5 h-px bg-[#111110] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>
    </header>
  );
}
