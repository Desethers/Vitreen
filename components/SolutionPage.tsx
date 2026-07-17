"use client";

import { motion } from "framer-motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CtaBand from "@/components/CtaBand";
import { Button } from "@/components/ui/Button";
import { useLang } from "@/lib/lang";
import { type RoleSlug } from "@/lib/solutions";
import { ArchiveMock } from "@/components/showcase/PillarMocks";
import { ArtistWebsitePage } from "@/components/WebsitePublisherProductPage";
import { SyncVisual } from "@/components/ViewingRoomsScrollStory";
import { ExhibitionPageMock } from "@/components/showcase/ExhibitionPageMock";
import ScrollStory, { type ScrollStoryStep } from "@/components/ScrollStory";

const ease = [0.16, 1, 0.3, 1] as const;

/* One visual per identity — but never the generic admin. Each shows the
 * surface that identity actually sees or touches, so no screen repeats
 * across a solutions → product browsing path. */
function CollectorRoomVisual() {
  return (
    <img
      src="/screenshot-viewingroom.png"
      alt=""
      aria-hidden="true"
      className="h-full w-full object-cover object-top"
    />
  );
}

function AdvisorSelectionVisual() {
  return (
    <div className="flex h-full items-center justify-center bg-[#F7F7F5]">
      <SyncVisual />
    </div>
  );
}

const ROLE_VISUAL: Record<RoleSlug, React.ComponentType> = {
  galleries: ArchiveMock,
  advisors: AdvisorSelectionVisual,
  artists: ArtistWebsitePage,
  collectors: CollectorRoomVisual,
  estates: ExhibitionPageMock,
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease, delay },
});

type SolutionContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  body: string;
  features: readonly string[];
  cta: string;
};

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      className="mt-0.5 shrink-0 text-[#ADADAA]"
      aria-hidden="true"
    >
      <path
        d="M3 8l3.5 3.5L13 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GalleriesEditorialIntro({
  content,
  lang,
  onContact,
}: {
  content: SolutionContent;
  lang: "fr" | "en";
  onContact: () => void;
}) {
  const editorial =
    lang === "fr"
      ? {
          label: "Pour quelles galeries ?",
          titleLines: [
            "Toute galerie qui souhaite une présence en ligne",
            "sans dépendre d’un développeur.",
          ],
          body: "Vitreen part de vos archives, de vos outils et de vos habitudes pour créer une infrastructure plus claire autour des œuvres.",
        }
      : {
          label: "Who is it for?",
          titleLines: [
            "Any gallery that wants an online presence",
            "without depending on a developer.",
          ],
          body: "Vitreen starts from your archives, tools and habits, then builds a clearer operating layer around your artworks.",
        };

  const highlights =
    lang === "fr"
      ? [
          {
            title: "Connectez ce que vous utilisez déjà",
            description:
              "Réunissez archives, inventaires et bases de données dans une couche opérationnelle connectée.",
          },
          {
            title: "Réutilisez chaque fiche œuvre",
            description:
              "Préparez viewing rooms, PDFs et liens privés sans recréer les mêmes informations.",
          },
          {
            title: "Publiez et partagez depuis une seule source",
            description:
              "Passez de la publication publique au partage privé avec les mêmes fiches œuvres.",
          },
        ]
      : [
          {
            title: "Connect what you already use",
            description:
              "Bring archives, inventories and databases into one connected operating layer.",
          },
          {
            title: "Use artwork details everywhere",
            description:
              "Turn one artwork record into website pages, PDFs, viewing rooms and collector replies.",
          },
          {
            title: "Publish and share from one source",
            description:
              "Move between public publishing and private sharing with the same artwork records.",
          },
        ];

  return (
    <section className="bg-white px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 md:grid-cols-[1.08fr_0.92fr] md:gap-12 lg:gap-16">
          <motion.div {...fadeUp(0)}>
            <p className="text-[12px] font-medium tracking-[-0.01em] text-[#858581]">
              {editorial.label}
            </p>
            <h2 className="mt-6 font-display text-[20px] font-normal leading-[1.2] tracking-[-0.02em] text-[#111110] md:text-[26px]">
              {editorial.titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="mt-6 max-w-xl text-[14px] leading-[1.65] tracking-[-0.01em] text-[#6B6A67] md:text-[15px]">
              {editorial.body}
            </p>
            <Button size="lg" onClick={onContact} className="mt-10">
              {content.cta} <span aria-hidden="true">→</span>
            </Button>
          </motion.div>

          <motion.div {...fadeUp(0.08)}>
            <ol className="flex list-none flex-col gap-3 p-0">
              {highlights.map((highlight) => (
                <li
                  key={highlight.title}
                  className="grid grid-cols-[1rem_1fr] items-start gap-4 rounded-[8px] border border-transparent bg-[#F7F7F5] px-6 py-7 transition-colors duration-200 hover:border-[#111110] md:px-7 md:py-8"
                >
                  <CheckIcon />
                  <div>
                    <h3 className="font-display text-[17px] font-normal leading-[1.35] tracking-[-0.02em] text-[#111110] md:text-[18px]">
                      {highlight.title}
                    </h3>
                    <p className="mt-3 text-[14px] leading-[1.5] tracking-[-0.01em] text-[#9A9A96] md:text-[15px]">
                      {highlight.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function GalleriesStickyWorkflow() {
  const steps: ScrollStoryStep[] = [
    {
      title: "Organise the works",
      subtitle: "Keep artwork information clear and ready to use.",
      bullets: [
        "Add images and details",
        "Record price and availability",
        "Keep documents with each work",
      ],
    },
    {
      title: "Put the gallery online",
      subtitle: "Publish artists, exhibitions and available works without rebuilding content.",
      bullets: [
        "Choose the works",
        "Prepare the exhibition page",
        "Publish when everything is ready",
      ],
    },
    {
      title: "Share works privately",
      subtitle: "Prepare the right material for each collector conversation.",
      bullets: ["Private links", "Emails and PDFs", "Control prices and visible details"],
    },
    {
      title: "Keep track of interest",
      subtitle: "Remember what was shared, discussed, reserved or sold.",
      bullets: ["Collector inquiries", "Works already presented", "Availability and next steps"],
    },
  ];

  return (
    <ScrollStory
      title="From inventory to collector follow-up."
      subtitle="The same artwork records keep each step connected."
      steps={steps}
      renderVisual={() => <div className="h-full w-full bg-[#F5F5F3]" />}
    />
  );
}

function GalleriesBuiltAroundSection() {
  const columns = [
    {
      title: "Review your current setup",
      description:
        "We review how artworks, website updates and collector requests are currently handled.",
      points: [
        "Review your existing tools and records",
        "Identify repeated work and missing connections",
      ],
    },
    {
      title: "Connect and build",
      description:
        "We organise your artwork information and create the dashboard and website your gallery needs.",
      points: [
        "Configure the Gallery OS around your workflow",
        "Connect artwork records to the website",
      ],
    },
    {
      title: "Launch and support",
      description:
        "Once the system is live, we stay involved to support the gallery and improve it as its needs evolve.",
      points: ["Ongoing updates and support", "Add new workflows when needed"],
    },
  ];

  return (
    <section className="mt-14 bg-white px-4 py-14 md:mt-[72px] md:px-6 md:py-[72px]">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          {...fadeUp(0)}
          className="max-w-3xl font-display text-[20px] font-normal leading-[1.2] tracking-[-0.02em] text-[#111110] md:text-[26px]"
        >
          How we work with your gallery
        </motion.h2>

        <div className="mt-12 md:mt-16 md:grid md:grid-cols-3 md:gap-10 lg:gap-12">
          {columns.map((column, columnIndex) => (
            <motion.article
              key={column.title}
              {...fadeUp(columnIndex * 0.06)}
              className="py-10 first:pt-0 last:pb-0 md:min-h-[330px] md:py-0"
            >
              <h3 className="font-display text-[18px] font-normal leading-[1.3] tracking-[-0.02em] text-[#111110] md:text-[20px]">
                {column.title}
              </h3>
              <p className="mt-3 max-w-sm text-[14px] leading-[1.6] tracking-[-0.01em] text-[#6B6A67] md:text-[15px]">
                {column.description}
              </p>

              <ul className="mt-8 flex list-none flex-col gap-3 p-0">
                {column.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckIcon />
                    <span className="text-[13px] leading-[1.5] tracking-[-0.01em] text-[#111110] md:text-[14px]">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function SolutionPage({ slug }: { slug: RoleSlug }) {
  const { lang, t } = useLang();
  const solutions = t.solutions as unknown as Record<RoleSlug, SolutionContent> & {
    sectionLabel: string;
    backToHome: string;
  };
  const content = solutions[slug];
  const Visual = ROLE_VISUAL[slug];

  const openContact = () => {
    window.dispatchEvent(new CustomEvent("open-contact-modal"));
  };

  return (
    <main className="relative bg-white">
      <Nav />

      {/* Hero */}
      <section className="overflow-hidden px-4 pb-12 pt-32 md:px-6 md:pb-[72px] md:pt-40">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp(0)}>
            <h1 className="font-display text-[30px] font-normal leading-[1.3] tracking-[-0.04em] text-[#111110]">
              {content.title}
            </h1>
            <p className="mt-2 max-w-4xl text-[30px] leading-[1.35] tracking-[-0.02em] text-[#6B6A67]">
              {content.subtitle}
            </p>
            {slug !== "galleries" && slug !== "artists" ? (
              <p className="mt-5 max-w-2xl text-[14px] leading-[1.65] tracking-[-0.01em] text-[#6B6A67] md:text-[15px]">
                {content.body}
              </p>
            ) : null}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg" onClick={openContact}>
                {content.cta}
              </Button>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp(0.08)}
            className="relative mt-14 h-[420px] overflow-hidden rounded-xl bg-[#F5F5F3] md:mt-20 md:h-[640px]"
          >
            <div className="absolute inset-6 overflow-hidden rounded-lg border border-[#E8E8E6] bg-white md:inset-10">
              <div className="relative h-full">
                <Visual />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {slug === "galleries" ? (
        <>
          <GalleriesEditorialIntro content={content} lang={lang} onContact={openContact} />
          <GalleriesStickyWorkflow />
          <GalleriesBuiltAroundSection />
        </>
      ) : null}

      <CtaBand />
      <Footer />
    </main>
  );
}
