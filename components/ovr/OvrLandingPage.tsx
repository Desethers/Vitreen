"use client";

import { useState, type ReactNode } from "react";
import { useOptionalUser } from "@/lib/useOptionalUser";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { PreviewMockup } from "@/components/ovr/PreviewMockup";

const ease = [0.16, 1, 0.3, 1] as const;

type Feature = { title: string; desc: string; icon: ReactNode };

const features: Feature[] = [
  {
    title: "Mise en page libre",
    desc: "Pleine page, diptyque, triptyque, image avec texte ou citation. Réordonnez par glisser-déposer.",
    icon: (
      <svg
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 20.25h18M21 7.5H3" />
      </svg>
    ),
  },
  {
    title: "Export PDF",
    desc: "Document haute résolution, aligné sur la preview — prêt à imprimer ou à archiver.",
    icon: (
      <svg
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    title: "Email HTML",
    desc: "Rendu soigné dans les messageries (dont Gmail), lien « voir en ligne », légendes et appels à l’action.",
    icon: (
      <svg
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.815a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    title: "Lien privé",
    desc: "Une URL par envoi : ouverture sur mobile ou bureau, sans pièces jointes lourdes.",
    icon: (
      <svg
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    ),
  },
  {
    title: "Personnalisation",
    desc: "Destinataire, accroche, introduction, pied de page : chaque room est pensée pour un contact.",
    icon: (
      <svg
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    title: "Parcours unique",
    desc: "Import, composition, retouches — le tout dans le navigateur, sans changer d’outil.",
    icon: (
      <svg
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path d="M3.75 6A2.25 2.25 0 016 3.75h12A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6z" />
        <path d="M8.25 9.75h7.5M8.25 12.75h4.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

/** Lignes communes aux deux formules (même produit, facturation différente). */
const planIncludes = [
  "Envois illimités",
  "Éditeur dans le navigateur : images, textes, citations, glisser-déposer",
  "Exports PDF haute définition alignés sur la prévisualisation",
  "Emails HTML soignés + lien privé « voir en ligne » pour vos contacts",
  "Personnalisation par destinataire (accroche, intro, légendes, INQUIRE)",
] as const;

const mockupStories = [
  {
    title: "Images",
    desc: "Importez vos oeuvres et composez une sequence claire, prete a etre reorganisee dans la room.",
    visual: "image",
  },
  {
    title: "Quotes",
    desc: "Ajoutez une citation seule, puis associez-la a une oeuvre pour creer un bloc image + texte.",
    visual: "quote",
  },
  {
    title: "Layouts",
    desc: "Transformez une selection en pleine page, diptyque, triptyque ou composition editoriale.",
    visual: "layout",
  },
  {
    title: "Exports",
    desc: "La room finalisee devient un lien prive, un email HTML ou un PDF haute definition.",
    visual: "export",
  },
] as const;

export default function OvrLandingPage() {
  const { isPro } = useOptionalUser();
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

  const sectionKicker = "text-[13px] text-[#6B6A67] tracking-wide";
  const sectionTitle =
    "font-display mt-2 text-[1.65rem] font-normal leading-snug tracking-tight text-[#111110] md:text-[1.85rem]";

  return (
    <div className="min-h-screen bg-white text-[#111110]">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-[inset_0_-1px_0_0_rgba(0,0,0,0.06)]">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-5 py-4 md:px-8">
          <Link href="/" className="font-display text-[15px] tracking-tight text-[#111110]">
            Vitreen
          </Link>
          <span className="hidden flex-1 text-center text-[13px] text-[#6B6A67] sm:block">
            Viewing Room Studio
          </span>
          <Button onClick={goToEditor} size="sm">
            {isPro ? "Éditeur" : "Essayer gratuitement"}
          </Button>
        </div>
      </header>

      <section className="px-5 pb-16 pt-28 md:px-8 md:pb-24 md:pt-32">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="mx-auto max-w-2xl text-center"
          >
            <h1 className="font-display text-balance text-[2rem] font-normal leading-[1.12] tracking-tight text-[#111110] sm:text-[2.35rem] md:text-[2.65rem]">
              Une viewing room online composée en quelques minutes
            </h1>
            <p className="mx-auto mt-5 max-w-lg text-pretty text-[16px] leading-[1.65] text-[#6B6A67]">
              Une présentation nette et cohérente : mise en page fluide, PDF haute définition, email
              HTML et lien privé — sans refaire la mise en page à la main dans InDesign ou
              PowerPoint.
            </p>
            <div className="mt-9 flex flex-col items-stretch justify-center gap-2.5 sm:flex-row sm:items-center sm:justify-center">
              <Button onClick={goToEditor} size="lg">
                {isPro ? "Ouvrir l'éditeur" : "Essayer gratuitement"}
              </Button>
              <Button href="/" variant="inverse" size="lg" className="bg-white">
                Retour à Vitreen
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <PreviewMockup />

      <section className="px-5 pb-16 pt-4 md:px-8 md:pb-24 md:pt-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {mockupStories.map((card, index) => (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, ease, delay: index * 0.08 }}
                className="group"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[#F0F0ED]">
                  {card.visual === "image" && (
                    <div className="absolute inset-8 rounded-sm bg-white p-5 shadow-[0_22px_70px_rgba(0,0,0,0.08)] transition-transform duration-500 group-hover:-translate-y-2">
                      <div className="h-3 w-28 rounded-full bg-[#E2E1DD]" />
                      <div className="mt-8 space-y-2">
                        <span className="block h-1.5 w-full rounded-full bg-[#D2D0CB]" />
                        <span className="block h-1.5 w-5/6 rounded-full bg-[#DAD8D3]" />
                        <span className="block h-1.5 w-4/6 rounded-full bg-[#E3E1DC]" />
                      </div>
                      <div className="absolute bottom-5 left-5 h-12 w-12 rounded-sm bg-[#D8D9D4]" />
                    </div>
                  )}
                  {card.visual === "quote" && (
                    <div className="absolute inset-0 bg-[#DCE2DE]">
                      <div className="absolute left-8 right-8 top-16 rounded-sm bg-white/70 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.08)] backdrop-blur-sm transition-transform duration-500 group-hover:translate-y-3">
                        <div className="h-2 w-20 rounded-full bg-[#AEB8B2]" />
                        <div className="mt-5 space-y-2">
                          <span className="block h-2 w-full rounded-full bg-[#C2CBC5]" />
                          <span className="block h-2 w-4/5 rounded-full bg-[#C8D0CB]" />
                          <span className="block h-2 w-3/5 rounded-full bg-[#D1D8D4]" />
                        </div>
                      </div>
                    </div>
                  )}
                  {card.visual === "layout" && (
                    <div className="absolute inset-0 bg-[#E9E6DF]">
                      <img
                        src="/artworks/painting-03.jpg"
                        alt=""
                        className="h-full w-full object-cover opacity-75"
                      />
                      <div className="absolute bottom-12 left-8 right-8 rounded-sm bg-white/65 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.12)] backdrop-blur-sm transition-transform duration-500 group-hover:-translate-y-2">
                        <p className="text-[11px] text-[#111110]">Image + citation</p>
                        <div className="mt-3 h-8 w-28 rounded-sm bg-white" />
                      </div>
                    </div>
                  )}
                  {card.visual === "export" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#DF9659]">
                      <div className="text-center">
                        <p className="text-[13px] text-[#111110]">Destinations</p>
                        <div className="mt-5 space-y-2">
                          <span className="mx-auto block w-fit rounded-sm bg-white px-5 py-2 text-[13px] text-[#111110] shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
                            Private link
                          </span>
                          <span className="mx-auto block w-fit rounded-sm bg-white/25 px-5 py-2 text-[13px] text-[#9B653B]">
                            PDF
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="pt-4">
                  <h3 className="font-display text-[1.05rem] font-normal tracking-tight text-[#111110]">
                    {card.title}
                  </h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-[#6B6A67]">{card.desc}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-xl text-left md:mx-0 md:max-w-lg">
            <p className={sectionKicker}>Fonctionnalités</p>
            <h2 className={sectionTitle}>Le nécessaire, sans surcharge</h2>
          </div>

          <ul className="mx-auto mt-14 max-w-3xl space-y-10 md:mt-16 md:space-y-12">
            {features.map((f) => (
              <li key={f.title} className="flex gap-5 md:gap-6">
                <div className="mt-0.5 shrink-0 text-[#8A8986]" aria-hidden>
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-display text-[1.05rem] font-normal tracking-tight text-[#111110] md:text-[1.125rem]">
                    {f.title}
                  </h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-[#6B6A67]">{f.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className={sectionKicker}>Tarifs</p>
            <h2 className={`${sectionTitle} mx-auto max-w-md`}>Mensuel ou annuel</h2>
            <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-[#6B6A67]">
              Rooms illimitées, exports et partage. Résiliable à tout moment.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-3xl gap-6 md:grid-cols-2 md:gap-8">
            <div className="flex h-full min-h-0 flex-col rounded-sm border border-black/[0.06] bg-white p-7 md:p-8">
              <p className="text-[12px] font-medium text-[#6B6A67]">Mensuel</p>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="font-display text-4xl text-[#111110]">19</span>
                <span className="text-[15px] text-[#6B6A67]">€ / mois</span>
              </div>
              <p className="mt-4 text-[14px] leading-relaxed text-[#6B6A67]">
                Facturation flexible, adaptée aux envois ponctuels.
              </p>
              <ul className="mt-5 flex-1 space-y-2.5" aria-label="Inclus dans l’abonnement mensuel">
                {planIncludes.map((line) => (
                  <li key={line} className="flex gap-2.5 text-[13px] leading-snug text-[#454543]">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      aria-hidden
                    >
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => handleSubscribe("monthly")}
                size="lg"
                className="mt-8 w-full justify-center"
                disabled={!!loadingCheckout}
              >
                {loadingCheckout === "monthly"
                  ? "Redirection…"
                  : isPro
                    ? "Ouvrir l'éditeur"
                    : "S'abonner — 19 €/mois"}
              </Button>
            </div>

            <div className="flex h-full min-h-0 flex-col rounded-sm bg-[#111110] p-7 text-white md:p-8">
              <p className="text-[12px] font-medium text-white/65">Annuel</p>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="font-display text-4xl">110</span>
                <span className="text-[15px] text-white/70">€ / an</span>
              </div>
              <p className="mt-1 text-[13px] text-white/55">
                Environ 9,17 € / mois · ~52 % moins cher que 12 mois au tarif mensuel
              </p>
              <p className="mt-4 text-[14px] leading-relaxed text-white/70">
                Même accès, engagement annuel.
              </p>
              <ul className="mt-5 flex-1 space-y-2.5" aria-label="Inclus dans l’abonnement annuel">
                {planIncludes.map((line) => (
                  <li key={line} className="flex gap-2.5 text-[13px] leading-snug text-white/85">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      aria-hidden
                    >
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => handleSubscribe("yearly")}
                size="lg"
                variant="inverse"
                className="mt-8 w-full justify-center border-0 bg-white text-[#111110] hover:bg-neutral-100"
                disabled={!!loadingCheckout}
              >
                {loadingCheckout === "yearly"
                  ? "Redirection…"
                  : isPro
                    ? "Ouvrir l'éditeur"
                    : "S'abonner — 110 €/an"}
              </Button>
              {yearlyError && (
                <p className="mt-3 text-center text-[12px] text-amber-200/90">{yearlyError}</p>
              )}
            </div>
          </div>

          <p className="mx-auto mt-8 max-w-md text-center text-[12px] text-[#ADADAA]">
            Paiement sécurisé par Stripe
          </p>
        </div>
      </section>

      <footer className="px-5 py-10 md:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 text-[12px] text-[#ADADAA] sm:flex-row sm:items-center">
          <Link href="/" className="text-[#6B6A67] transition-colors hover:text-[#111110]">
            Vitreen
          </Link>
          <p>Viewing Room Studio</p>
        </div>
      </footer>
    </div>
  );
}
