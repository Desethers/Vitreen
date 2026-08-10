"use client";

import { EYEBROW } from "@/components/landing/styles";

function ScatteredFilesIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M14 2v5a1 1 0 0 0 1 1h5" />
      <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8l6 6v12a2 2 0 0 1-2 2z" />
      <path d="M9 13h6" />
      <path d="M9 17h4" />
    </svg>
  );
}

function RepeatSearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M3 12a9 9 0 0 1 15.3-6.5L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-15.3 6.5L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  );
}

function RebuildDocumentIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M14 2v5a1 1 0 0 0 1 1h5" />
      <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8l6 6v12a2 2 0 0 1-2 2z" />
      <path d="m9.5 18 1.2-3.6a2 2 0 0 1 .5-.8l4-4a1.5 1.5 0 0 1 2.1 2.1l-4 4a2 2 0 0 1-.8.5z" />
    </svg>
  );
}

const PROBLEMS = [
  {
    icon: ScatteredFilesIcon,
    title: "Éparpillé dans les fichiers",
    text: "Les informations d’œuvres vivent dans des dossiers, des tableurs et d’anciens PDF, jamais au même endroit.",
  },
  {
    icon: RepeatSearchIcon,
    title: "Chaque demande repart de zéro",
    text: "Chaque question d’un collectionneur oblige à retrouver les images et revérifier les détails.",
  },
  {
    icon: RebuildDocumentIcon,
    title: "Des documents refaits à la main",
    text: "Rouvrir InDesign pour préparer un PDF de plus, à chaque fois.",
  },
];

export default function LandingProblemStatementFr() {
  return (
    <section className="bg-white px-4 py-16 md:px-6 md:py-20">
      <div className="mx-auto w-full max-w-7xl">
        <div className="rounded-[20px] bg-[#F5F5F3] p-8 md:p-14">
          <div className="grid gap-10 md:grid-cols-2 md:items-start md:gap-24">
            <div>
              <p className={EYEBROW}>Le problème</p>
              <h2 className="mt-4 max-w-lg text-balance font-display text-[26px] font-normal leading-[1.2] tracking-[-0.04em] text-[#111110] md:text-[30px]">
                Vendre de l’art, c’est encore refaire le même document encore et encore.
              </h2>
              <p className="mt-6 max-w-md text-[16px] leading-[1.65] tracking-[-0.01em] text-[#6B6A67]">
                Les informations d’œuvres sont éparpillées entre dossiers, tableurs et anciens PDF.
              </p>
              <p className="mt-4 max-w-md text-[16px] leading-[1.65] tracking-[-0.01em] text-[#6B6A67]">
                Chaque demande d’un collectionneur oblige à retrouver les images, vérifier les
                détails et rouvrir InDesign pour préparer un document de plus.
              </p>
            </div>

            <div>
              {PROBLEMS.map((item, index) => (
                <div
                  key={item.title}
                  className={`border-t border-[#DCDCD8] py-6 ${
                    index === PROBLEMS.length - 1 ? "border-b" : ""
                  }`}
                >
                  <h3 className="flex items-center gap-2.5 font-display text-[18px] font-normal tracking-[-0.02em] text-[#111110]">
                    <item.icon />
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.6] tracking-[-0.01em] text-[#6B6A67]">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
