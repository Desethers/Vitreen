"use client";

import { useState } from "react";
import { GalleryOSContinuousDemo } from "@/components/ArtworkScrollStory";
import { IntegrationsFrame } from "@/components/GalleryAssistantProductPage";
import ScrollStory, { type ScrollStoryStep } from "@/components/ScrollStory";
import { WhatsAppShareWorksMock } from "@/components/SolutionPage";
import { WhatsAppPdfMockup } from "@/components/shared/ArtworkAddInMocks";
import { SourceNotes } from "@/components/landing/LandingSystem";
import { H2, H2_SUB } from "@/components/landing/styles";

type DeliveryChannel = "gmail" | "whatsapp" | "pdf";

const STEPS: ScrollStoryStep[] = [
  {
    title: "Import your inventory",
    subtitle: "Bring your existing artwork information in from CSV, Excel or Artlogic.",
    bullets: [
      "Import from Excel or CSV",
      "Continue from your current system",
      "No need to rebuild your archive",
    ],
    footer: <SourceNotes />,
  },
  {
    title: "Organise every artwork",
    subtitle: "Keep every artwork complete and organised.",
    bullets: ["Images and documents", "Prices and availability", "Artists and exhibitions"],
  },
  {
    title: "Reply to collectors",
    subtitle:
      "Use your artwork cards in Gmail and WhatsApp, or send them as PDFs and private selections.",
    bullets: [
      "Reply while collector interest is active",
      "Choose the right format for every conversation",
      "Send accurate artwork information every time",
    ],
  },
];

const DELIVERY_CHANNELS: { id: DeliveryChannel; label: string; icon?: string }[] = [
  { id: "gmail", label: "Gmail", icon: "/logos/icon-gmail-96.png" },
  { id: "whatsapp", label: "WhatsApp", icon: "/logos/whatsapp.svg" },
  { id: "pdf", label: "PDF" },
];

function DeliveryScreens() {
  const [channel, setChannel] = useState<DeliveryChannel>("gmail");

  return (
    <div>
      <div className="relative h-[300px] overflow-hidden rounded-[12px] border border-[#E8E8E6] bg-white md:h-[380px]">
        {channel === "gmail" ? <IntegrationsFrame /> : null}
        {channel === "whatsapp" ? <WhatsAppShareWorksMock /> : null}
        {channel === "pdf" ? (
          <div className="flex h-full items-center justify-center border border-[#E8E8E6] bg-white p-5">
            <WhatsAppPdfMockup />
          </div>
        ) : null}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-1">
        {DELIVERY_CHANNELS.map(({ id, label, icon }) => {
          const selected = channel === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setChannel(id)}
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] transition-colors ${
                selected
                  ? "bg-[#F5F5F3] text-[#111110]"
                  : "bg-transparent text-[#6B6A67] hover:text-[#111110]"
              }`}
            >
              {icon ? (
                <img src={icon} alt="" aria-hidden="true" className="h-4 w-4 object-contain" />
              ) : (
                <span className="flex h-4 w-3 items-center justify-center rounded-[1px] bg-[#D90B2B] text-[5px] font-bold text-white">
                  PDF
                </span>
              )}
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepVisual({ index }: { index: number }) {
  if (index === 0) {
    return <GalleryOSContinuousDemo step={0} />;
  }

  if (index === 1) {
    return <GalleryOSContinuousDemo step={1} />;
  }

  return <DeliveryScreens />;
}

export default function LandingProblem() {
  return (
    <ScrollStory
      title=""
      subtitle=""
      steps={STEPS}
      compactMobileVisual
      isVisualBare={(index) => index === 2}
      renderHeader={
        <div>
          <h2 className={`${H2} max-w-3xl`}>Bring your artwork inventory into Vitreen.</h2>
          <p className={`${H2_SUB} max-w-4xl`}>Turn your inventory into collector-ready replies.</p>
        </div>
      }
      renderVisual={(index) => <StepVisual index={index} />}
    />
  );
}
