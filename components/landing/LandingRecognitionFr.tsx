"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { openContact } from "@/components/landing/LandingNav";
import { CONTAINER, EYEBROW, H2, H2_SUB, SECTION } from "@/components/landing/styles";

const MESSAGES = [
  {
    initials: "MC",
    color: "#6B7FD7",
    name: "Marie Chen",
    subject: "Disponibilité — Night Garden IV",
    time: "10:24",
    body: "Est-ce que Night Garden IV est toujours disponible ?",
  },
  {
    initials: "TB",
    color: "#C97B4A",
    name: "Thomas Baur",
    subject: "Soft Power I",
    time: "Hier",
    body: "Pourriez-vous m’envoyer le prix et les dimensions de Soft Power I ?",
  },
  {
    initials: "LM",
    color: "#4E9C82",
    name: "Léa Morin",
    subject: "Œuvres disponibles",
    time: "Il y a 2 jours",
    body: "Avez-vous d’autres œuvres de cet artiste disponibles en ce moment ?",
  },
] as const;

const CYCLE_MS = 3600;

/** Pile droite, sans éventail — la profondeur vient du y + scale + une légère inclinaison rotateX. */
const STACK_POSITIONS = [
  { y: 0, scale: 1, rotateX: 0, zIndex: 3, opacity: 1 },
  { y: 12, scale: 0.965, rotateX: 6, zIndex: 2, opacity: 0.85 },
  { y: 24, scale: 0.93, rotateX: 11, zIndex: 1, opacity: 0.6 },
];

function GmailCard({
  message,
  position,
}: {
  message: (typeof MESSAGES)[number];
  position: number;
}) {
  const target = STACK_POSITIONS[position];

  return (
    <div
      style={{
        transform: `translateY(${target.y}px) scale(${target.scale}) rotateX(${target.rotateX}deg)`,
        transformOrigin: "center top",
        zIndex: target.zIndex,
        opacity: target.opacity,
        transition: "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.7s ease-out",
      }}
      className="absolute inset-x-0 top-0 h-[154px] overflow-hidden rounded-[8px] border border-[#E1E3E6] bg-white"
    >
      <div className="flex items-center gap-2 border-b border-[#E8E8E6] bg-[#F0F4F9] px-3 py-2">
        <img
          src="/logos/icon-gmail-96.png"
          alt=""
          aria-hidden="true"
          className="h-3.5 w-3.5 object-contain"
        />
        <span className="truncate text-[12px] font-medium text-[#202124]">{message.subject}</span>
      </div>

      <div className="px-3 pb-4 pt-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-medium text-white"
              style={{ backgroundColor: message.color }}
              aria-hidden="true"
            >
              {message.initials}
            </div>
            <div>
              <p className="text-[12.5px] font-medium text-[#202124]">{message.name}</p>
              <p className="text-[10.5px] text-[#5F6368]">à moi</p>
            </div>
          </div>
          <span className="shrink-0 text-[10.5px] text-[#5F6368]">{message.time}</span>
        </div>
        <p className="mt-3 text-[13px] leading-[1.45] text-[#202124]">{message.body}</p>
      </div>
    </div>
  );
}

export default function LandingRecognitionFr() {
  const [active, setActive] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % MESSAGES.length);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <section className={`${SECTION} bg-white`}>
      <div
        className={`${CONTAINER} grid gap-10 md:grid-cols-[0.7fr_1fr] md:items-center md:gap-16`}
      >
        <div className="max-w-xl">
          <p className={EYEBROW}>Chaque conversation</p>
          <h2 className={`${H2} mt-4`}>Chaque vente commence par une conversation.</h2>
          <p className={H2_SUB}>Vitreen amène tout dans la conversation, prêt à être envoyé.</p>

          <p className="mt-6 text-[16px] leading-[1.65] tracking-[-0.01em] text-[#6B6A67]">
            Un collectionneur demande d’autres œuvres d’un artiste — dans Gmail, sur WhatsApp, après
            une visite d’atelier ou au téléphone.
          </p>
          <p className="mt-4 text-[16px] leading-[1.65] tracking-[-0.01em] text-[#6B6A67]">
            Les images, prix, dimensions et disponibilités nécessaires pour répondre sont souvent
            ailleurs. Quelqu’un doit les retrouver, les vérifier et refaire le document avant de
            l’envoyer.
          </p>

          <div className="mt-7">
            <Button size="lg" onClick={openContact}>
              Réserver une démo
            </Button>
          </div>
        </div>

        <div className="ml-auto w-full">
          <div
            className="relative flex h-[420px] items-center justify-center overflow-hidden rounded-[12px]"
            style={{ border: "0.1px solid #D4D4D0" }}
          >
            <Image
              src="/modernize_the_reference_image_subtly_without_changing_its_original_composition_or_atmosphere_preser_w3lsj3fu9hejewoam93p_1.png"
              alt=""
              fill
              sizes="(min-width: 768px) 60vw, 100vw"
              className="object-cover"
            />

            <div className="relative h-[178px] w-[340px]" style={{ perspective: 900 }}>
              {MESSAGES.map((message, index) => {
                const position = (index - active + MESSAGES.length) % MESSAGES.length;
                return <GmailCard key={message.name} message={message} position={position} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
