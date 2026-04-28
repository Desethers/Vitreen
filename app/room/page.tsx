"use client";

import { useState } from "react";
import { useOptionalUser, clerkEnabled } from "@/lib/useOptionalUser";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const ease = [0.16, 1, 0.3, 1] as const;

const features = [
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 20.25h18M21 7.5H3" />
      </svg>
    ),
    title: "Mise en page libre",
    desc: "Assemblez vos œuvres en blocs — pleine page, duo, trio, texte. Glissez, réordonnez.",
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    title: "Export PDF haute résolution",
    desc: "Générez un document imprimable en un clic. Prêt à envoyer par email.",
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    ),
    title: "Lien de partage privé",
    desc: "Envoyez un lien personnalisé à votre collecteur. Accessible sur mobile et desktop.",
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    title: "Personnalisé pour chaque collecteur",
    desc: "Nom, message d'introduction, galerie. Chaque viewing room est unique.",
  },
];

export default function RoomLandingPage() {
  const { isSignedIn, isPro } = useOptionalUser();
  const router = useRouter();
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  const stripeConfigured = process.env.NEXT_PUBLIC_STRIPE_CONFIGURED === "true";

  const handleCta = async () => {
    if (clerkEnabled && !isSignedIn) {
      window.location.href = "https://vitreen.art/sign-in";
      return;
    }
    if (!stripeConfigured || isPro) {
      window.location.href = "https://room.vitreen.art/editor";
      return;
    }
    setLoadingCheckout(true);
    try {
      const res = await fetch("/api/stripe/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      setLoadingCheckout(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white/90 backdrop-blur border-b border-[#E8E8E6]">
        <Link href="/" className="font-display text-base tracking-tight text-[#111110]">Vitreen</Link>
        <span className="text-sm text-[#6B6A67]">Viewing Room Studio</span>
        <Button onClick={handleCta} size="sm" disabled={loadingCheckout}>
          {isPro ? "Éditeur" : "Essayer gratuitement"}
        </Button>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease }}
          className="max-w-2xl mx-auto"
        >
          <span className="inline-block text-xs uppercase tracking-[0.18em] text-[#6B6A67] mb-6 border border-[#E8E8E6] px-3 py-1 rounded-full">
            Viewing Room Studio · 19 €/mois
          </span>
          <h1 className="font-display text-[36px] md:text-[52px] text-[#111110] leading-tight tracking-tight mb-6">
            Vos sélections d&rsquo;œuvres prêtes à envoyer en 2 minutes
          </h1>
          <p className="text-[#6B6A67] text-lg leading-relaxed max-w-xl mx-auto mb-10">
            Fini les mises en page PDF interminables. Organisez vos œuvres librement dans votre Viewing Room et partagez-les instantanément à vos contacts privilégiés.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Button onClick={handleCta} size="lg" disabled={loadingCheckout}>
              {loadingCheckout ? "Redirection..." : isPro ? "Ouvrir l'éditeur" : "Essayer gratuitement"}
            </Button>
            <Link
              href="https://vitreen.art"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-[#E8E8E6] text-[#111110] text-sm font-medium hover:bg-[#F5F5F3] transition-colors"
            >
              Retour à Vitreen
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Preview image placeholder */}
      <section className="px-4 md:px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease, delay: 0.15 }}
          className="max-w-4xl mx-auto rounded-lg overflow-hidden border border-[#E8E8E6] shadow-[0_8px_40px_rgba(0,0,0,0.08)] bg-[#F5F5F3]"
        >
          <div className="h-12 bg-white border-b border-[#E8E8E6] flex items-center px-4 gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#E8E8E6]" />
              <div className="w-3 h-3 rounded-full bg-[#E8E8E6]" />
              <div className="w-3 h-3 rounded-full bg-[#E8E8E6]" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="flex items-center gap-2 text-xs text-[#6B6A67]">
                <span className="px-3 py-1 bg-[#111110] text-white text-[10px] uppercase tracking-widest">Infos</span>
                <span className="text-[#ADADAA]">→</span>
                <span className="text-[#ADADAA] text-[10px] uppercase tracking-widest">Images</span>
                <span className="text-[#ADADAA]">→</span>
                <span className="text-[#ADADAA] text-[10px] uppercase tracking-widest">Mise en page</span>
                <span className="text-[#ADADAA]">→</span>
                <span className="text-[#ADADAA] text-[10px] uppercase tracking-widest">Exporter</span>
              </div>
            </div>
          </div>
          <div className="h-72 md:h-96 flex items-center justify-center">
            <p className="text-[#ADADAA] text-sm">Aperçu de l&rsquo;éditeur</p>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="px-4 md:px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {features.map((f) => (
              <div key={f.title} className="flex gap-4">
                <div className="shrink-0 w-9 h-9 flex items-center justify-center rounded-lg border border-[#E8E8E6] text-[#6B6A67]">
                  {f.icon}
                </div>
                <div>
                  <p className="text-[#111110] text-sm font-medium mb-1">{f.title}</p>
                  <p className="text-[#6B6A67] text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="px-4 md:px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease }}
          className="max-w-md mx-auto text-center border border-[#E8E8E6] rounded-lg p-8 md:p-10"
        >
          <p className="text-[#6B6A67] text-xs uppercase tracking-[0.18em] mb-3">Abonnement mensuel</p>
          <div className="flex items-end justify-center gap-1 mb-2">
            <span className="font-display text-[48px] text-[#111110] leading-none">19</span>
            <span className="text-[#6B6A67] text-lg mb-2">€/mois</span>
          </div>
          <p className="text-[#6B6A67] text-sm mb-8">
            Viewing rooms illimités. PDF illimités.<br />
            Liens de partage privés. Annulez à tout moment.
          </p>
          <Button onClick={handleCta} size="lg" className="w-full justify-center" disabled={loadingCheckout}>
            {loadingCheckout ? "Redirection..." : isPro ? "Ouvrir l'éditeur" : "S'abonner — 19 €/mois"}
          </Button>
          <p className="text-[#ADADAA] text-xs mt-4">Annulez à tout moment · Paiement sécurisé par Stripe</p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E8E8E6] py-8 px-4 md:px-6 flex items-center justify-center text-xs text-[#ADADAA]">
        <p>Vitreen · Viewing Room Studio</p>
      </footer>
    </div>
  );
}
