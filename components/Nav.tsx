"use client";

import { useState, useEffect, useCallback } from "react";
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

  const [form, setForm] = useState({ nom: "", galerie: "", email: "", projet: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const closeContactModal = useCallback(() => {
    setContactModalOpen(false);
    setSubmitted(false);
    setSending(false);
    setSendError(null);
    setForm({ nom: "", galerie: "", email: "", projet: "" });
  }, []);

  useEffect(() => {
    const onOpenContact = () => setContactModalOpen(true);
    window.addEventListener("open-contact-modal", onOpenContact);
    return () => window.removeEventListener("open-contact-modal", onOpenContact);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 2);
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

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b-[0.5px] bg-white py-2 px-4 transition-[border-color] duration-200 md:px-6 ${
          scrolled ? "border-[#E8E8E6]" : "border-transparent"
        }`}
      >
        <div className="relative mx-auto flex h-9 w-full max-w-7xl items-center justify-between">
          {/* Gauche : burger (mobile) + logo */}
          <div className="relative z-10 flex shrink-0 items-center">
            <button
              type="button"
              className="-ml-2 mr-1 flex shrink-0 flex-col justify-center gap-[5px] p-2 md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Fermer le menu" : "Menu"}
              aria-expanded={menuOpen}
            >
              <span
                className={`block h-px w-5 origin-center bg-[#111110] transition-all duration-300 ${
                  menuOpen ? "translate-y-[3px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-5 origin-center bg-[#111110] transition-all duration-300 ${
                  menuOpen ? "-translate-y-[3px] -rotate-45" : ""
                }`}
              />
            </button>
            <a href="#" className="w-32 shrink-0 font-display text-[15px] tracking-tight text-[#111110] md:text-base">
              Vitreen
            </a>
          </div>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 md:flex">
            {navLinks.map((link) => {
              const badge = "badge" in link && (link as { badge: string }).badge;
              const inner = (
                <>
                  {link.label}
                  {badge && (
                    <span className="rounded-full bg-[#111110] px-1.5 py-0.5 text-[10px] font-medium leading-none text-white">
                      {badge}
                    </span>
                  )}
                </>
              );
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-1.5 text-sm text-[#6B6A67] transition-colors duration-200 hover:text-[#111110]"
                >
                  {inner}
                </a>
              );
            })}
          </nav>

          <Button size="sm" onClick={() => setContactModalOpen(true)} className="z-20 shrink-0 !py-[7px] !px-3 !text-[12px]">
            {t.nav.cta}
          </Button>
        </div>

        {menuOpen && (
          <div className="absolute left-0 right-0 top-full z-40 mx-4 mt-2 flex flex-col gap-5 rounded border border-[#E8E8E6] bg-white px-6 py-6 shadow-sm md:hidden">
            {navLinks.map((link) => {
              const badge = "badge" in link && (link as { badge: string }).badge;
              const inner = (
                <>
                  {link.label}
                  {badge && (
                    <span className="rounded-full bg-[#111110] px-1.5 py-0.5 text-[10px] font-medium leading-none text-white">
                      {badge}
                    </span>
                  )}
                </>
              );
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-base text-[#111110]"
                >
                  {inner}
                </a>
              );
            })}
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                setContactModalOpen(true);
              }}
              className="rounded-full bg-[#111110] px-4 py-2.5 text-center text-sm text-white"
            >
              {t.nav.cta}
            </button>
          </div>
        )}
      </header>

      {typeof document !== "undefined" &&
        createPortal(
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
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#111110]/40 p-4 backdrop-blur-sm"
                onClick={(e) => {
                  if (e.target === e.currentTarget) closeContactModal();
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.98 }}
                  transition={{ duration: 0.35, ease }}
                  className="relative w-full max-w-md rounded border border-[#E8E8E6] bg-white p-6 shadow-[0_24px_80px_rgba(0,0,0,0.12)] md:p-8"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={closeContactModal}
                    className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-[#6B6A67] transition-colors hover:bg-[#F5F5F3] hover:text-[#111110]"
                    aria-label={t.nav.modal.close}
                  >
                    <span className="text-lg leading-none">×</span>
                  </button>

                  <h2 id="contact-modal-title" className="mb-2 pr-10 font-display text-xl text-[#111110]">
                    {t.nav.modal.title}
                  </h2>
                  <p className="mb-6 text-sm text-[#6B6A67]">{t.nav.modal.subtitle}</p>

                  {submitted ? (
                    <p className="py-4 font-display text-lg leading-relaxed text-[#111110]">{t.nav.modal.success}</p>
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
                      {sendError && <p className="-mt-2 text-sm text-red-500">{sendError}</p>}
                      <Button type="submit" size="md" disabled={sending} className="mt-1 w-fit">
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
