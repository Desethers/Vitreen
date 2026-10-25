"use client";

import type { Lang } from "@/lib/lang";
import { SEO_PAGES, type SeoPageId, type SeoVisual } from "@/lib/seoPages";
import LandingNav, { openContact } from "@/components/landing/LandingNav";
import LandingNavFr from "@/components/landing/LandingNavFr";
import LandingCta from "@/components/landing/LandingCta";
import LandingCtaFr from "@/components/landing/LandingCtaFr";
import { Button } from "@/components/ui/Button";
import { ArchiveMock } from "@/components/showcase/PillarMocks";
import { ArtworkFormMock } from "@/components/showcase/ArtworkFormMock";
import { InquiryDraftsFrame } from "@/components/SalesAssistantProductPage";
import AdvisorsSelectionWorkflowVisual from "@/components/AdvisorsSelectionWorkflow";
import { BODY, CONTAINER, EYEBROW, H3, SECTION } from "@/components/landing/styles";

/** One product visual, framed the same way on every page. */
function Visual({ visual }: { visual: SeoVisual }) {
  if (visual.kind === "photo") {
    return (
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[12px] border border-[#E8E8E6] bg-[#F5F5F3]">
        <img src={visual.src} alt={visual.alt} className="h-full w-full object-cover" />
      </div>
    );
  }
  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-[12px] border border-[#E8E8E6] bg-[#F5F5F3] md:h-[540px]">
      {visual.kind === "artworkList" && <ArchiveMock interactive={false} />}
      {visual.kind === "artworkForm" && <ArtworkFormMock />}
      {/* No entrance animation: the draft must be readable as soon as the page loads. */}
      {visual.kind === "inquiryDraft" && <InquiryDraftsFrame />}
      {visual.kind === "advisorSelection" && <AdvisorsSelectionWorkflowVisual step={1} />}
    </div>
  );
}

/**
 * The template of every secondary page: hero with the page's search phrase,
 * one visual, three or four blocks (or running text for About), then the
 * shared CTA and footer of the home.
 */
export default function SeoPage({ id, lang }: { id: SeoPageId; lang: Lang }) {
  const c = SEO_PAGES[id][lang];
  const Nav = lang === "fr" ? LandingNavFr : LandingNav;
  const Cta = lang === "fr" ? LandingCtaFr : LandingCta;

  return (
    <>
      <Nav />
      <main className="bg-white">
        <section className="px-4 pb-12 pt-32 text-center md:px-6 md:pb-16 md:pt-40">
          <div className="mx-auto max-w-3xl">
            <p className={EYEBROW}>{c.eyebrow}</p>
            <h1 className="mt-5 text-balance font-display text-[34px] font-medium leading-[1.1] tracking-[-0.035em] text-[#111110] md:text-[52px]">
              {c.title}
            </h1>
            <p className={`mx-auto mt-5 max-w-2xl text-balance ${BODY}`}>{c.sub}</p>
            <div className="mt-8">
              <Button size="lg" onClick={openContact}>
                {c.cta}
              </Button>
            </div>
          </div>
        </section>

        {c.visual ? (
          <section className="px-4 pb-16 md:px-6 md:pb-20">
            <div className="mx-auto max-w-6xl">
              <Visual visual={c.visual} />
            </div>
          </section>
        ) : null}

        {c.blocks ? (
          <section className={`${SECTION} border-t border-[#E8E8E6] bg-[#F5F5F3]`}>
            <div className={`${CONTAINER} grid gap-x-12 gap-y-10 md:grid-cols-2`}>
              {c.blocks.map((block) => (
                <div key={block.title} className="min-w-0">
                  <h2 className={H3}>{block.title}</h2>
                  <ul className="mt-4 flex flex-col gap-2">
                    {block.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-[15px] leading-[1.5] tracking-[-0.01em] text-[#6B6A67]"
                      >
                        <span aria-hidden="true" className="text-[#111110]">
                          ✓
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {c.prose ? (
          <section className={`${SECTION} border-t border-[#E8E8E6]`}>
            <div className="mx-auto flex max-w-2xl flex-col gap-5">
              {c.prose.map((line, i) =>
                i === c.prose!.length - 1 ? (
                  <p key={line} className="mt-4 text-[15px] text-[#111110]">
                    {line}
                  </p>
                ) : (
                  <p key={line} className={BODY}>
                    {line}
                  </p>
                )
              )}
            </div>
          </section>
        ) : null}
      </main>
      <Cta />
    </>
  );
}
