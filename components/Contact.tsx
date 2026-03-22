"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Contact() {
  const [form, setForm] = useState({ nom: "", galerie: "", email: "", projet: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass =
    "w-full bg-transparent border-b border-[#E8E8E6] py-3 text-[#111110] text-sm placeholder-[#ADADAA] focus:outline-none focus:border-[#111110] transition-colors duration-200";

  return (
    <section id="contact" className="py-28 px-6 border-t border-[#E8E8E6]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="inline-block text-xs tracking-widest uppercase text-[#6B6A67] glass px-3 py-1.5 rounded-full mb-5">
              Contact
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-[#111110] leading-tight tracking-tight mb-5">
              Parlons de votre galerie.
            </h2>
            <p className="text-[#6B6A67] text-base leading-relaxed">
              Décrivez votre projet en quelques mots. Je vous réponds sous 48 heures.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
          >
            {submitted ? (
              <div className="h-full flex items-center">
                <p className="font-display text-xl text-[#111110] leading-relaxed">
                  Merci. Je reviens vers vous très prochainement.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <input type="text" name="nom" placeholder="Nom" value={form.nom} onChange={handleChange} required className={inputClass} />
                <input type="text" name="galerie" placeholder="Galerie" value={form.galerie} onChange={handleChange} required className={inputClass} />
                <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required className={inputClass} />
                <textarea name="projet" placeholder="Votre projet" value={form.projet} onChange={handleChange} required rows={4} className={`${inputClass} resize-none`} />
                <div>
                  <button type="submit" className="bg-[#111110] text-white px-7 py-3 rounded-full text-sm font-medium hover:bg-[#2a2a28] transition-colors duration-200">
                    Envoyer →
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
