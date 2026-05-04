"use client";

import { useState, type ReactNode } from "react";
import { useOptionalUser, clerkEnabled } from "@/lib/useOptionalUser";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const ease = [0.16, 1, 0.3, 1] as const;

type Feature = {
  title: string;
  desc: string;
  tag: string;
  icon: ReactNode;
};

const features: Feature[] = [
  {
    tag: "Layout",
    title: "Mise en page libre",
    desc: "Pleine page, diptyque, triptyque, image + texte ou citation. Réordonnez par glisser-déposer jusqu’au rendu final.",
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden>
        <path d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 20.25h18M21 7.5H3" />
      </svg>
    ),
  },
  {
    tag: "PDF",
    title: "Export PDF haute résolution",
    desc: "Un document imprimable, typographié comme votre preview. Idéal pour les dossiers ou les archives.",
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden>
        <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    tag: "Email",
    title: "Email HTML prêt à envoyer",
    desc: "Même identité visuelle que la room : compatible Gmail & clients mail, lien « voir en ligne », légendes et CTA soignés.",
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden>
        <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.815a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    tag: "Partage",
    title: "Lien de partage privé",
    desc: "Une URL dédiée par envoi : vos contacts ouvrent la room sur mobile ou bureau, sans pièce jointe lourde.",
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden>
        <path d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    ),
  },
  {
    tag: "Sur-mesure",
    title: "Une room par collectionneur",
    desc: "Destinataire, accroche, texte d’introduction, pied de page galerie : chaque envoi raconte une histoire ciblée.",
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden>
        <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    tag: "Studio",
    title: "Workflow tout-en-un",
    desc: "Import d’images, composition automatique possible, puis ajustements fins — sans changer d’outil.",
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden>
        <path d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.075-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function OvrLandingPage() {
  const { isSignedIn, isPro } = useOptionalUser();
  const router = useRouter();
  const pathname = usePathname();
  const [loadingCheckout, setLoadingCheckout] = useState<false | "monthly" | "yearly">(false);

  const stripeConfigured = process.env.NEXT_PUBLIC_STRIPE_CONFIGURED === "true";
  const [yearlyError, setYearlyError] = useState<string | null>(null);

  const goToEditor = () => {
    window.location.href = "https://room.vitreen.art/editor";
  };

  const handleSubscribe = async (billing: "monthly" | "yearly") => {
    if (isPro) {
      goToEditor();
      return;
    }
    if (clerkEnabled && !isSignedIn) {
      router.push(`/sign-in?redirect_url=${encodeURIComponent(pathname || "/room")}`);
      return;
    }
    if (!stripeConfigured) {
      goToEditor();
      return;
    }
    setYearlyError(null);
    setLoadingCheckout(billing);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ billing }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      if (billing === "yearly" && res.status === 400 && data.error === "yearly_not_configured") {
        setYearlyError("Paiement annuel : ajoutez STRIPE_PRICE_ID_YEARLY sur le serveur.");
      }
      setLoadingCheckout(false);
    } catch {
      setLoadingCheckout(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#111110]">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#E8E8E6] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 md:px-6">
          <Link href="/" className="font-display text-[15px] tracking-tight text-[#111110]">
            Vitreen
          </Link>
          <span className="hidden text-[13px] text-[#6B6A67] sm:inline">Viewing Room Studio</span>
          <Button onClick={goToEditor} size="sm">
            {isPro ? "Éditeur" : "Essayer gratuitement"}
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative border-b border-[#E8E8E6] bg-white px-4 pb-20 pt-28 md:px-6 md:pb-28 md:pt-36">
        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
            >
              <h1 className="font-display text-balance text-[2.1rem] font-normal leading-[1.08] tracking-tight text-[#111110] sm:text-5xl md:text-[3.25rem]">
                Des sélections d&rsquo;œuvres prêtes à envoyer en quelques minutes
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-pretty text-[17px] leading-relaxed text-[#6B6A67] md:text-lg">
                Une présentation nette et cohérente pour vos œuvres : mise en page fluide, PDF haute définition, email
                HTML et lien privé — sans refaire la mise en page à la main dans InDesign ou PowerPoint.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button onClick={goToEditor} size="lg">
                  {isPro ? "Ouvrir l'éditeur" : "Essayer gratuitement"}
                </Button>
                <Button href="/" variant="inverse" size="lg" className="border border-[#E8E8E6] bg-white shadow-sm">
                  Retour à Vitreen
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Quick value row */}
          <motion.ul
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease, delay: 0.08 }}
            className="mx-auto mt-14 flex max-w-3xl flex-wrap items-center justify-center gap-2 sm:gap-3"
          >
            {["Mise en page libre", "PDF & email", "Lien privé", "Personnalisé"].map((label) => (
              <li
                key={label}
                className="rounded-full border border-[#E8E8E6] bg-white px-3.5 py-1.5 text-[12px] font-medium text-[#111110]"
              >
                {label}
              </li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* Product preview mock */}
      <section className="border-b border-[#E8E8E6] bg-white px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease }}
            className="mb-10 text-center md:mb-14"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#6B6A67]">Aperçu</p>
            <h2 className="mt-2 font-display text-2xl tracking-tight text-[#111110] md:text-3xl">
              Le rendu que vos collectionneurs voient
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-[#6B6A67]">
              Même hiérarchie visuelle dans le navigateur, le PDF et l&rsquo;email — cohérence de bout en bout.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease }}
            className="mx-auto max-w-5xl overflow-hidden rounded-[20px] border border-[#E8E8E6] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.07)]"
          >
            <div className="flex h-9 items-center gap-3 border-b border-[#E8E8E6] bg-white px-4">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-[#E0DFDC]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#E0DFDC]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#E0DFDC]" />
              </div>
              <div className="flex flex-1 justify-center">
                <div className="rounded border border-[#E8E8E6] bg-white px-3 py-0.5 text-[10px] tracking-tight text-[#6B6A67]">
                  room.vitreen.art/editor
                </div>
              </div>
            </div>
            <div className="relative h-[380px] overflow-hidden bg-white md:h-[460px]">
              <div className="absolute inset-0 overflow-hidden">
                <div className="mx-auto max-w-2xl px-10 pt-10 text-center md:px-20 md:pt-14">
                  <p className="mb-2 text-[9px] uppercase tracking-[0.22em] text-[#6B6A67] md:text-[10px]">
                    Galerie Solène — Pour Marie Laurent
                  </p>
                  <h3 className="font-display text-[17px] leading-tight text-[#111110] md:text-[21px]">Hiver intérieur</h3>
                  <p className="mt-1 text-[10px] italic text-[#6B6A67] md:text-[11px]">
                    Une sélection de cinq œuvres pour votre collection.
                  </p>
                </div>
                <div className="mx-auto max-w-3xl space-y-3 px-10 md:px-20">
                  <div className="aspect-[16/8] rounded-sm bg-gradient-to-br from-[#E8E4DC] to-[#D9D4C8]" />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="aspect-[4/5] rounded-sm bg-gradient-to-br from-[#D4C8B8] to-[#B8A88E]" />
                    <div className="aspect-[4/5] rounded-sm bg-gradient-to-br from-[#C8BCA8] to-[#A89880]" />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-3 left-3 top-3 hidden w-[260px] flex-col overflow-hidden rounded-[18px] border border-[#E8E8E6] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] md:flex md:w-[280px]">
                <div className="flex shrink-0 items-center justify-between border-b border-[#F0EFEC] px-4 py-3">
                  <span className="text-[12px] font-medium text-[#111110]">Studio</span>
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border border-[#E8E8E6]">
                    <svg className="h-3 w-3 text-[#6B6A67]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden>
                      <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 space-y-0 overflow-hidden text-left">
                  {["Content", "Media", "Layout"].map((label, i) => (
                    <div key={label} className="flex items-center justify-between border-b border-[#F0EFEC] px-4 py-2.5">
                      <span className="text-[11px] font-medium text-[#111110]">{label}</span>
                      <span className="text-[9px] text-[#ADADAA]">{i === 0 ? "−" : "+"}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute right-4 top-3">
                <span className="rounded-md bg-[#111110] px-3 py-1.5 text-[10px] text-white">Sign in</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features grid */}
      <section className="border-b border-[#E8E8E6] bg-white px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease }}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#6B6A67]">Fonctionnalités</p>
            <h2 className="mt-2 font-display text-2xl tracking-tight text-[#111110] md:text-3xl">
              Tout pour une présentation irréprochable
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#6B6A67]">
              Chaque bloc sert votre discours : œuvres, textes, citations — puis export professionnel.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {features.map((f, i) => (
              <motion.article
                key={f.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, ease, delay: i * 0.04 }}
                className="group flex flex-col rounded-2xl border border-[#E8E8E6] bg-white p-6 transition-shadow duration-300 hover:border-[#D4D3D0] hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)]"
              >
                <span className="mb-4 inline-flex w-fit rounded-full border border-[#E8E8E6] bg-white px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#6B6A67]">
                  {f.tag}
                </span>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-[#E8E8E6] bg-white text-[#111110] transition-colors group-hover:border-[#111110]/15">
                  {f.icon}
                </div>
                <h3 className="font-display text-lg tracking-tight text-[#111110]">{f.title}</h3>
                <p className="mt-2 flex-1 text-[14px] leading-relaxed text-[#6B6A67]">{f.desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-white px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease }}
            className="text-center"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#6B6A67]">Tarifs</p>
            <h2 className="mt-2 font-display text-2xl tracking-tight text-[#111110] md:text-3xl">Simple et transparent</h2>
            <p className="mx-auto mt-3 max-w-md text-[15px] text-[#6B6A67]">
              Viewing rooms illimités, exports PDF et partage. Annulation à tout moment.
            </p>
          </motion.div>

          <div className="mx-auto mt-12 grid max-w-3xl gap-5 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease }}
              className="flex flex-col rounded-2xl border border-[#E8E8E6] bg-white p-8 shadow-sm"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6B6A67]">Mensuel</p>
              <div className="mt-4 flex items-end gap-1">
                <span className="font-display text-5xl leading-none text-[#111110]">19</span>
                <span className="pb-1.5 text-lg text-[#6B6A67]">€ / mois</span>
              </div>
              <p className="mt-4 flex-1 text-[14px] leading-relaxed text-[#6B6A67]">
                Facturation mensuelle flexible. Idéal pour tester ou pour des campagnes ponctuelles.
              </p>
              <Button
                onClick={() => handleSubscribe("monthly")}
                size="lg"
                className="mt-8 w-full justify-center"
                disabled={!!loadingCheckout}
              >
                {loadingCheckout === "monthly" ? "Redirection…" : isPro ? "Ouvrir l'éditeur" : "S'abonner — 19 €/mois"}
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease, delay: 0.06 }}
              className="relative flex flex-col rounded-2xl border-2 border-[#111110] bg-[#111110] p-8 text-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
            >
              <span className="absolute right-5 top-5 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                −52 % vs mensuel
              </span>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">Annuel</p>
              <div className="mt-4 flex items-end gap-1">
                <span className="font-display text-5xl leading-none">110</span>
                <span className="pb-1.5 text-lg text-white/75">€ / an</span>
              </div>
              <p className="mt-1 text-[13px] text-white/65">Soit environ 9,17 € / mois, facturé une fois par an.</p>
              <p className="mt-4 flex-1 text-[14px] leading-relaxed text-white/75">
                Même accès complet : gardez votre studio actif toute l&rsquo;année pour moins que deux mois au tarif
                mensuel.
              </p>
              <Button
                onClick={() => handleSubscribe("yearly")}
                size="lg"
                variant="inverse"
                className="mt-8 w-full justify-center border-0 bg-white text-[#111110] hover:bg-[#F5F5F3]"
                disabled={!!loadingCheckout}
              >
                {loadingCheckout === "yearly"
                  ? "Redirection…"
                  : isPro
                    ? "Ouvrir l'éditeur"
                    : "S'abonner — 110 €/an"}
              </Button>
              {yearlyError && (
                <p className="mt-3 text-center text-[11px] text-amber-200/90">{yearlyError}</p>
              )}
            </motion.div>
          </div>

          <p className="mx-auto mt-8 max-w-lg text-center text-[12px] text-[#ADADAA]">
            Paiement sécurisé par Stripe · Annulation à tout moment depuis votre espace
          </p>
        </div>
      </section>

      <footer className="border-t border-[#E8E8E6] bg-white py-8 text-[12px] text-[#ADADAA]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 sm:flex-row md:px-6">
          <Link href="/" className="transition-colors hover:text-[#111110]">
            ← Vitreen
          </Link>
          <p>Viewing Room Studio · Vitreen</p>
        </div>
      </footer>
    </div>
  );
}
