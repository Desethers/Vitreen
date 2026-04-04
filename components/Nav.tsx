"use client";

import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [ctaSlideX, setCtaSlideX] = useState(0);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const openModalAfterSlideRef = useRef(false);
  /** Limite drag gauche (négatif), calculée pour coller au padding sans dépasser le bord. */
  const [dragBoundsLeft, setDragBoundsLeft] = useState(-200);

  const [form, setForm] = useState({ nom: "", galerie: "", email: "", projet: "" });
  const [submitted, setSubmitted] = useState(false);

  const closeContactModal = useCallback(() => {
    setContactModalOpen(false);
    setCtaSlideX(0);
    openModalAfterSlideRef.current = false;
    setSubmitted(false);
    setForm({ nom: "", galerie: "", email: "", projet: "" });
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!contactModalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeContactModal();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [contactModalOpen, closeContactModal]);

  /** Aligné sur les classes pill : `pl-1 pr-2` */
  const PILL_PAD_LEFT = 4;
  const PILL_PAD_RIGHT = 8;
  /** Bord gauche minimal du bouton dans la pill (ne pas dépasser le fond blanc arrondi). */
  const PILL_INNER_LEFT_STOP = 4;
  /**
   * Cible de recouvrement sur le logo ; plafonnée par `PILL_INNER_LEFT_STOP` pour que le bouton
   * ne sorte pas du container pill.
   */
  const CTA_OVERLAP_VITREEN_PX = 12;

  /** Bord gauche minimal du bouton : recouvre un peu « Vitreen » sans sortir de la pill. */
  const getCtaStopLeft = useCallback(() => {
    const pill = pillRef.current;
    const logo = logoRef.current;
    if (!pill) return 0;
    const pr = pill.getBoundingClientRect();
    const innerMin = pr.left + PILL_INNER_LEFT_STOP;
    if (logo) {
      const logoLeft = logo.getBoundingClientRect().left;
      const overlapTarget = logoLeft - CTA_OVERLAP_VITREEN_PX;
      return Math.max(overlapTarget, innerMin);
    }
    return pr.left + PILL_PAD_LEFT;
  }, []);

  const measureDragBounds = useCallback(() => {
    const pill = pillRef.current;
    const btn = ctaRef.current;
    if (!pill || !btn || !scrolled || ctaSlideX !== 0 || contactModalOpen) return;
    const br = btn.getBoundingClientRect();
    const stopLeft = getCtaStopLeft();
    const maxTravel = br.left - stopLeft;
    setDragBoundsLeft(-Math.max(0, maxTravel));
  }, [scrolled, ctaSlideX, contactModalOpen, getCtaStopLeft]);

  useLayoutEffect(() => {
    measureDragBounds();
  }, [measureDragBounds]);

  useEffect(() => {
    window.addEventListener("resize", measureDragBounds);
    return () => window.removeEventListener("resize", measureDragBounds);
  }, [measureDragBounds]);

  /**
   * Slide jusqu’au bord gauche du logo (recouvre « Vitreen »). `rect.left` = position actuelle (drag inclus).
   */
  const openContactFromNav = () => {
    if (!scrolled) {
      setContactModalOpen(true);
      return;
    }
    const pill = pillRef.current;
    const cta = ctaRef.current;
    if (!pill || !cta) {
      setContactModalOpen(true);
      return;
    }
    const pr = pill.getBoundingClientRect();
    const rect = cta.getBoundingClientRect();
    const minLeft = getCtaStopLeft();
    const maxLeft = pr.right - PILL_PAD_RIGHT - rect.width;
    if (minLeft > maxLeft) {
      setContactModalOpen(true);
      return;
    }
    const minDx = minLeft - rect.left;
    const maxDx = maxLeft - rect.left;
    const dx = minDx <= maxDx ? minDx : maxDx;
    if (Math.abs(dx) < 1) {
      setContactModalOpen(true);
      return;
    }
    openModalAfterSlideRef.current = true;
    setCtaSlideX(dx);
  };

  const onCtaAnimationComplete = () => {
    if (openModalAfterSlideRef.current) {
      openModalAfterSlideRef.current = false;
      setContactModalOpen(true);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const navLinks = [
    { label: "Offres", href: "#offre" },
    { label: "Blog", href: "#blog" },
    { label: "À propos", href: "#approche" },
  ];

  const inputClass =
    "w-full bg-transparent border-b border-[#E8E8E6] py-3 text-[#111110] text-sm placeholder-[#ADADAA] focus:outline-none focus:border-[#111110] transition-colors duration-200";

  const ctaBase =
    "text-sm rounded-full transition-all duration-500 shrink-0 text-left whitespace-nowrap relative z-20";

  const ctaPillIdleHint = scrolled && ctaSlideX === 0 && !contactModalOpen;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4 px-4 md:px-6">
      <div
        ref={pillRef}
        className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? "bg-white rounded-full pl-1 pr-2 py-[7px] h-12 flex items-center gap-2 shadow-[0_0_0_1px_#E8E8E6,0_1px_3px_rgba(0,0,0,0.06)] min-w-0"
            : "w-full max-w-7xl mx-auto flex items-center justify-between relative h-12"
        }`}
      >
        {/* Logo */}
        <motion.a
          ref={logoRef}
          href="#"
          animate={{
            opacity: scrolled && (ctaSlideX !== 0 || contactModalOpen) ? 0 : 1,
          }}
          transition={{ duration: 0.4, ease }}
          className={`font-display text-base tracking-tight shrink-0 relative z-10 transition-all duration-500 text-[#111110] ${
            scrolled ? "pl-1 pr-2" : "w-36"
          }`}
        >
          Vitreen
        </motion.a>

        {/* Centre links */}
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
              className="text-sm text-[#6B6A67] hover:text-[#111110] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA — slide over logo (pill) then modal */}
        {scrolled ? (
          <motion.div
            className="relative z-20 shrink-0 min-w-0 max-w-full will-change-transform"
            animate={{ x: ctaSlideX }}
            transition={{
              duration: 0.48,
              ease,
            }}
            onAnimationComplete={onCtaAnimationComplete}
          >
            <motion.button
              key={ctaSlideX !== 0 ? "cta-slide" : "cta-idle"}
              ref={ctaRef}
              type="button"
              drag={ctaPillIdleHint ? "x" : false}
              dragConstraints={{ left: dragBoundsLeft, right: 0 }}
              dragElastic={0}
              dragMomentum={false}
              dragSnapToOrigin="x"
              dragTransition={{
                bounceStiffness: 380,
                bounceDamping: 42,
              }}
              onDragEnd={(_, info) => {
                const commitAt = Math.max(-32, dragBoundsLeft * 0.38);
                if (info.offset.x < commitAt) {
                  openContactFromNav();
                }
              }}
              className={`${ctaBase} group bg-[#111110] text-white pl-3 pr-4 py-2 hover:bg-[#2a2a28] cursor-grab active:cursor-grabbing`}
              style={{ touchAction: "none" }}
              title="Glissez vers la gauche pour nous écrire"
              aria-label="Contactez-nous. Faites glisser le bouton vers la gauche pour ouvrir le formulaire."
            >
              <span className="inline-flex items-center gap-0 transition-[gap] duration-200 ease-out group-hover:gap-1.5 group-focus-visible:gap-1.5 select-none">
                <span
                  aria-hidden
                  className="inline-flex w-0 max-w-0 opacity-0 overflow-hidden text-white/70 shrink-0 transition-[max-width,opacity] duration-200 ease-out group-hover:w-[14px] group-hover:max-w-[14px] group-hover:opacity-100 group-focus-visible:w-[14px] group-focus-visible:max-w-[14px] group-focus-visible:opacity-100"
                >
                  <svg
                    className="shrink-0 w-[14px] h-[14px]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </span>
                <span>Contactez-nous</span>
              </span>
            </motion.button>
          </motion.div>
        ) : (
          <button
            type="button"
            onClick={() => openContactFromNav()}
            className={`${ctaBase} border border-[#E8E8E6] text-[#111110] px-4 py-2 hover:bg-[#F5F5F3] z-20`}
          >
            Contactez-nous
          </button>
        )}
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden mx-4 mt-2 rounded-[10px] px-6 py-6 flex flex-col gap-5 absolute top-full left-0 right-0 bg-white border border-[#E8E8E6] shadow-sm z-40">
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
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              setContactModalOpen(true);
            }}
            className="text-sm bg-[#111110] text-white px-4 py-2.5 rounded-full text-center"
          >
            Contactez-nous
          </button>
        </div>
      )}

      {/* Burger mobile */}
      <button
        className={`md:hidden absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 p-2 ${
          scrolled ? "hidden" : ""
        }`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        <span className={`block w-5 h-px bg-[#111110] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`block w-5 h-px bg-[#111110] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
        <span className={`block w-5 h-px bg-[#111110] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      <AnimatePresence>
        {contactModalOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#111110]/40 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeContactModal();
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.35, ease }}
              className="relative w-full max-w-md rounded-[10px] bg-white p-6 md:p-8 shadow-[0_24px_80px_rgba(0,0,0,0.12)] border border-[#E8E8E6]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeContactModal}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-[#6B6A67] hover:bg-[#F5F5F3] hover:text-[#111110] transition-colors"
                aria-label="Fermer"
              >
                <span className="text-lg leading-none">×</span>
              </button>

              <h2 id="contact-modal-title" className="font-display text-xl text-[#111110] pr-10 mb-2">
                Nous contacter
              </h2>
              <p className="text-sm text-[#6B6A67] mb-6">
                Décrivez votre projet — réponse sous 48 h.
              </p>

              {submitted ? (
                <p className="font-display text-lg text-[#111110] leading-relaxed py-4">
                  Merci. Je reviens vers vous très prochainement.
                </p>
              ) : (
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
                  <input
                    type="text"
                    name="nom"
                    placeholder="Nom"
                    value={form.nom}
                    onChange={handleFormChange}
                    required
                    className={inputClass}
                  />
                  <input
                    type="text"
                    name="galerie"
                    placeholder="Galerie"
                    value={form.galerie}
                    onChange={handleFormChange}
                    required
                    className={inputClass}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleFormChange}
                    required
                    className={inputClass}
                  />
                  <textarea
                    name="projet"
                    placeholder="Votre projet"
                    value={form.projet}
                    onChange={handleFormChange}
                    required
                    rows={4}
                    className={`${inputClass} resize-none`}
                  />
                  <button
                    type="submit"
                    className="mt-1 bg-[#111110] text-white px-7 py-3 rounded-full text-sm font-medium hover:bg-[#2a2a28] transition-colors duration-200 w-fit"
                  >
                    Envoyer →
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
