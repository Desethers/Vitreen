"use client";

import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/lang";
import { Button } from "@/components/ui/Button";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Nav() {
  const { t } = useLang();
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
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const closeContactModal = useCallback(() => {
    setContactModalOpen(false);
    setCtaSlideX(0);
    openModalAfterSlideRef.current = false;
    setSubmitted(false);
    setSending(false);
    setSendError(null);
    setForm({ nom: "", galerie: "", email: "", projet: "" });
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onOpenContact = () => setContactModalOpen(true);
    window.addEventListener("open-contact-modal", onOpenContact);
    return () => window.removeEventListener("open-contact-modal", onOpenContact);
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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSendError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Erreur lors de l'envoi");
      }
      setSubmitted(true);
    } catch (err) {
      setSendError(err instanceof Error ? err.message : "Erreur lors de l'envoi");
    } finally {
      setSending(false);
    }
  };

  const navLinks = t.nav.links;

  const inputClass =
    "w-full bg-transparent border-b border-[#E8E8E6] py-3 text-[#111110] text-sm placeholder-[#ADADAA] focus:outline-none focus:border-[#111110] transition-colors duration-200";

  const ctaBase =
    "text-sm rounded-full transition-all duration-500 shrink-0 text-left whitespace-nowrap relative z-20";

  const ctaPillIdleHint = scrolled && ctaSlideX === 0 && !contactModalOpen;

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4 px-4 md:px-6">
      <div
        ref={pillRef}
        className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? "bg-white rounded-full pl-1 pr-0.5 md:pr-2 py-[4px] h-10 md:py-[7px] md:h-12 flex items-center gap-2 shadow-[0_0_0_1px_#E8E8E6,0_1px_3px_rgba(0,0,0,0.06)] min-w-0"
            : "w-full max-w-7xl mx-auto flex items-center justify-between relative h-12"
        }`}
      >
        {/* Gauche : burger 2 traits (mobile, hors scroll) + logo Vitreen */}
        <div className="flex items-center shrink-0 relative z-10">
          {!scrolled && (
            <button
              type="button"
              className="md:hidden flex flex-col justify-center gap-[5px] p-2 -ml-2 mr-1 shrink-0"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Fermer le menu" : "Menu"}
              aria-expanded={menuOpen}
            >
              <span
                className={`block w-5 h-px bg-[#111110] origin-center transition-all duration-300 ${
                  menuOpen ? "translate-y-[3px] rotate-45" : ""
                }`}
              />
              <span
                className={`block w-5 h-px bg-[#111110] origin-center transition-all duration-300 ${
                  menuOpen ? "-translate-y-[3px] -rotate-45" : ""
                }`}
              />
            </button>
          )}
          <motion.a
            ref={logoRef}
            href="#"
            animate={{
              opacity: scrolled && (ctaSlideX !== 0 || contactModalOpen) ? 0 : 1,
            }}
            transition={{ duration: 0.4, ease }}
            className={`font-display text-base tracking-tight shrink-0 transition-all duration-500 text-[#111110] ${
              scrolled ? "pl-1 pr-2" : "w-36"
            }`}
          >
            Vitreen
          </motion.a>
        </div>

        {/* Centre : liens desktop uniquement */}
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

        <Button size="sm" onClick={() => openContactFromNav()} className="shrink-0 z-20">
          {t.nav.cta}
        </Button>
      </div>

      {/* Menu mobile déroulant */}
      {menuOpen && (
        <div className="md:hidden mx-4 mt-2 rounded px-6 py-6 flex flex-col gap-5 absolute top-full left-0 right-0 bg-white border border-[#E8E8E6] shadow-sm z-40">
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
            {t.nav.cta}
          </button>
        </div>
      )}

    </header>

    {typeof document !== "undefined" && createPortal(
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
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#111110]/40 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeContactModal();
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.35, ease }}
              className="relative w-full max-w-md rounded bg-white p-6 md:p-8 shadow-[0_24px_80px_rgba(0,0,0,0.12)] border border-[#E8E8E6]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeContactModal}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-[#6B6A67] hover:bg-[#F5F5F3] hover:text-[#111110] transition-colors"
                aria-label={t.nav.modal.close}
              >
                <span className="text-lg leading-none">×</span>
              </button>

              <h2 id="contact-modal-title" className="font-display text-xl text-[#111110] pr-10 mb-2">
                {t.nav.modal.title}
              </h2>
              <p className="text-sm text-[#6B6A67] mb-6">
                {t.nav.modal.subtitle}
              </p>

              {submitted ? (
                <p className="font-display text-lg text-[#111110] leading-relaxed py-4">
                  {t.nav.modal.success}
                </p>
              ) : (
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
                  <input
                    type="text"
                    name="nom"
                    placeholder={t.nav.modal.fields.nom}
                    value={form.nom}
                    onChange={handleFormChange}
                    required
                    className={inputClass}
                  />
                  <input
                    type="text"
                    name="galerie"
                    placeholder={t.nav.modal.fields.galerie}
                    value={form.galerie}
                    onChange={handleFormChange}
                    required
                    className={inputClass}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder={t.nav.modal.fields.email}
                    value={form.email}
                    onChange={handleFormChange}
                    required
                    className={inputClass}
                  />
                  <textarea
                    name="projet"
                    placeholder={t.nav.modal.fields.projet}
                    value={form.projet}
                    onChange={handleFormChange}
                    required
                    rows={4}
                    className={`${inputClass} resize-none`}
                  />
                  {sendError && (
                    <p className="text-sm text-red-500 -mt-2">{sendError}</p>
                  )}
                  <Button
                    type="submit"
                    size="md"
                    disabled={sending}
                    className="mt-1 w-fit"
                  >
                    {sending ? t.nav.modal.sending : t.nav.modal.submit}
                  </Button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    )}
    </>
  );
}
