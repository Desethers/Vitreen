"use client";

import { useLang } from "@/lib/lang";
import {
  ConnectInventoryMockup,
  GalleryOsSearchWidget,
  WhatsAppPdfMockup,
} from "@/components/shared/ArtworkAddInMocks";

export default function HomeAddIns() {
  const { t } = useLang();
  const cards = [
    {
      key: "gmail",
      logo: "/logos/icon-gmail-96.png",
      logoClassName: "h-9 w-11",
      background:
        "radial-gradient(circle at 72% 34%, rgba(255,255,255,0.62) 0%, rgba(255,255,255,0.28) 24%, transparent 55%), radial-gradient(circle at 20% 14%, rgba(255,255,255,0.26) 0%, transparent 42%), linear-gradient(135deg, #D2E2F7 0%, #CFE0F5 100%)",
      mock: <GalleryOsSearchWidget />,
    },
    {
      key: "whatsapp",
      logo: "/logos/whatsapp.svg",
      logoClassName: "h-10 w-10 rounded-[9px]",
      background:
        "radial-gradient(circle at 72% 34%, rgba(255,255,255,0.58) 0%, rgba(255,255,255,0.24) 24%, transparent 55%), radial-gradient(circle at 20% 14%, rgba(255,255,255,0.24) 0%, transparent 42%), linear-gradient(135deg, #DCE8E1 0%, #D8E5DE 100%)",
      mock: <WhatsAppPdfMockup />,
    },
    {
      key: "excel",
      logo: "/logos/Microsoft_Office_Excel_Logo.svg",
      logoClassName: "h-10 w-10",
      background:
        "radial-gradient(circle at 72% 34%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.26) 24%, transparent 55%), radial-gradient(circle at 20% 14%, rgba(255,255,255,0.24) 0%, transparent 42%), linear-gradient(135deg, #D9E8D7 0%, #D5E6D4 100%)",
      mock: <ConnectInventoryMockup />,
    },
  ] as const;

  return (
    <section className="bg-white px-4 py-14 md:px-6 md:py-[72px]">
      <div className="mx-auto max-w-7xl">
        <h2 className="max-w-3xl font-display text-[20px] font-normal leading-[1.2] tracking-[-0.02em] text-[#111110] md:text-[26px]">
          {t.homeAddIns.title}
        </h2>
        <p className="mt-0 max-w-xl text-[20px] font-normal leading-[1.2] tracking-[-0.02em] text-[#6B6A67] md:text-[26px]">
          {t.homeAddIns.subtitle}
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {cards.map((card) => {
            const copy = t.homeAddIns.cards[card.key];
            return (
              <article
                key={card.key}
                className="relative grid min-h-[520px] grid-rows-[42px_minmax(0,1fr)_auto] overflow-hidden rounded-[8px] p-8"
                style={{ background: card.background }}
              >
                <img src={card.logo} alt="" className={`object-contain ${card.logoClassName}`} />
                <div className="flex min-h-0 items-center justify-center">{card.mock}</div>
                <div>
                  <h3 className="font-display text-[16px] font-medium tracking-[-0.01em] text-[#111110]">
                    {copy.title}
                  </h3>
                  <p className="mt-1.5 max-w-md text-[16px] leading-6 text-[#6B6A67]">
                    {copy.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
