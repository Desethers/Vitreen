"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "@/lib/lang";
import { Button } from "@/components/ui/Button";

const ease = [0.16, 1, 0.3, 1] as const;

const inputClass =
  "w-full bg-transparent border-b border-[#E8E8E6] py-3 text-[#111110] text-sm placeholder-[#ADADAA] focus:outline-none focus:border-[#111110] transition-colors duration-200";

/**
 * Contact form modal, opened from anywhere by dispatching the
 * `open-contact-modal` window event. Extracted from Nav so headers that are
 * not the main navigation (the landing's minimal header) can offer the same
 * CTA without duplicating the form.
 */
export default function ContactModal() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ nom: "", galerie: "", email: "", projet: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    setSubmitted(false);
    setSending(false);
    setSendError(null);
    setForm({ nom: "", galerie: "", email: "", projet: "" });
  }, []);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-contact-modal", onOpen);
    return () => window.removeEventListener("open-contact-modal", onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

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

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
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
            if (e.target === e.currentTarget) close();
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
              onClick={close}
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
              <p className="py-4 font-display text-lg leading-relaxed text-[#111110]">
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
  );
}
