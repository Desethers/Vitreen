"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExportPanel, ViewingRoomPreview } from "@/components/ovr/ViewingRoomApp";
import type { Block, BlockType, ImageItem, VrSetup } from "@/lib/ovr/buildTypes";

const setup: VrSetup = {
  galleryName: "Gallery of the Day",
  headline: "Recent Acquisitions",
  title: "Spring Selection",
  recipientName: "Mr. Dupont",
  recipientEmail: "",
  introText:
    "Dear Mr. Dupont, here is a selection of recently acquired works that may interest you. We remain at your disposal for any additional information.",
  galleryAddress: "12 Seine Street — 75006 Paris",
  galleryContact: "contact@viewingroom.studio",
};

const initialImages: ImageItem[] = [
  {
    id: "img-1",
    dataUrl: "/artworks/painting-01.png",
    title: "",
    artist: "",
    year: "",
    medium: "",
    dimensions: "180× 180 cm",
    price: "",
    showPrice: true,
  },
  {
    id: "img-2",
    dataUrl: "/artworks/painting-03.jpg",
    title: "Painting 12",
    artist: "Sacha Elron",
    year: "2025",
    medium: "Acrylic on canvas",
    dimensions: "180× 180 cm",
    price: "8000 €",
    showPrice: true,
  },
  {
    id: "img-3",
    dataUrl: "/artworks/painting-05.jpg",
    title: "Painting 11",
    artist: "Sacha Elron",
    year: "2024",
    medium: "Acrylic on canvas",
    dimensions: "180× 200 cm",
    price: "9000 €",
    showPrice: true,
  },
  {
    id: "img-4",
    dataUrl: "/artworks/painting-06.png",
    title: "Untitled (Red)",
    artist: "Mark Rothko",
    year: "1968",
    medium: "Acrylique sur toile",
    dimensions: "203 × 175 cm",
    price: "Sur demande",
    showPrice: true,
  },
  {
    id: "img-5",
    dataUrl: "/artworks/painting-07.jpg",
    title: "Painting 10",
    artist: "Sacha Elron",
    year: "2024",
    medium: "Acrylic on canvas",
    dimensions: "180× 180 cm",
    price: "8000 €",
    showPrice: true,
  },
];

const captionDemoFields: Partial<ImageItem> = {
  artist: "Sacha Elron",
  title: "Painting 10",
  year: "2024",
  medium: "Acrylic on canvas",
  dimensions: "180 × 180 cm",
  price: "8 000 €",
};

const initialBlocks: Block[] = [
  {
    id: "b1",
    type: "full",
    slots: [{ imageId: "img-1" }],
    quoteText: "",
    quoteAuthor: "",
    showInquire: true,
  },
  {
    id: "b4",
    type: "side",
    slots: [{ imageId: "img-5" }],
    quoteText:
      "Shared light is the simplest form of friendship—what falls on the wall falls on us both.",
    quoteAuthor: "Sacha Elron",
    showInquire: true,
  },
  {
    id: "b2",
    type: "pair",
    slots: [{ imageId: "img-2" }, { imageId: "img-3" }],
    quoteText: "",
    quoteAuthor: "",
    showInquire: true,
  },
];

function artBlockType(count: number): BlockType {
  return count >= 3 ? "trio" : count === 2 ? "pair" : "full";
}

export function PreviewMockup() {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);
  const [vrSetup, setVrSetup] = useState<VrSetup>(setup);
  const [vrImages, setVrImages] = useState<ImageItem[]>(initialImages);
  const [exportOpen, setExportOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    let animationFrame = 0;
    const animateScroll = (to: number, duration = 5200) => {
      const from = scroller.scrollTop;
      const start = performance.now();
      const step = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        scroller.scrollTop = from + (to - from) * eased;
        if (progress < 1) animationFrame = requestAnimationFrame(step);
      };
      animationFrame = requestAnimationFrame(step);
    };

    let started = false;
    const startSequence = () => {
      if (started) return;
      started = true;
      scroller.scrollTo({ top: 0 });
      const typeField = (key: keyof ImageItem, value: string, startDelay: number) => {
        Array.from(value).forEach((_, charIndex) => {
          timers.push(
            setTimeout(
              () => {
                setVrImages((prev) =>
                  prev.map((img) =>
                    img.id === "img-1" ? { ...img, [key]: value.slice(0, charIndex + 1) } : img
                  )
                );
              },
              startDelay + charIndex * 64
            )
          );
        });
      };

      timers.push(
        setTimeout(() => {
          animateScroll(Math.min(scroller.scrollHeight - scroller.clientHeight, 600), 4200);
        }, 450)
      );
      typeField("artist", captionDemoFields.artist ?? "", 5050);
      typeField("title", captionDemoFields.title ?? "", 6200);
      typeField("year", captionDemoFields.year ?? "", 7300);
      typeField("medium", captionDemoFields.medium ?? "", 7900);
      typeField("dimensions", captionDemoFields.dimensions ?? "", 9500);
      typeField("price", captionDemoFields.price ?? "", 10800);
    };

    window.addEventListener("wheel", startSequence, { passive: true });

    return () => {
      window.removeEventListener("wheel", startSequence);
      timers.forEach(clearTimeout);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const moveBlock = useCallback((blockId: string, toIndex: number) => {
    setBlocks((prev) => {
      const fromIndex = prev.findIndex((b) => b.id === blockId);
      if (fromIndex === -1) return prev;
      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      const adjusted = fromIndex < toIndex ? toIndex - 1 : toIndex;
      next.splice(Math.max(0, Math.min(adjusted, next.length)), 0, moved);
      return next;
    });
  }, []);

  const mergeImage = useCallback((srcImageId: string, dstBlockId: string) => {
    setBlocks((prev) => {
      const isImg = (t: string) => t === "full" || t === "pair" || t === "trio";
      const dst = prev.find((b) => b.id === dstBlockId);
      const src = prev.find((b) => b.slots.some((s) => s.imageId === srcImageId));
      if (!dst || !src || !isImg(dst.type) || !isImg(src.type)) return prev;
      const dstIds = dst.slots.map((s) => s.imageId).filter(Boolean) as string[];
      if (dstIds.includes(srcImageId) || dstIds.length >= 3) return prev;
      const newDstIds = [...dstIds, srcImageId];
      const newDst: Block = {
        ...dst,
        type: artBlockType(newDstIds.length),
        slots: newDstIds.map((id) => ({ imageId: id })),
      };
      const srcRest = (src.slots.map((s) => s.imageId).filter(Boolean) as string[]).filter(
        (id) => id !== srcImageId
      );
      return prev.flatMap((b) => {
        if (b.id === dst.id) return [newDst];
        if (b.id === src.id) {
          if (srcRest.length === 0) return [];
          return [
            {
              ...b,
              type: artBlockType(srcRest.length),
              slots: srcRest.map((id) => ({ imageId: id })),
            },
          ];
        }
        return [b];
      });
    });
  }, []);

  const mergeMoveBlock = useCallback((srcBlockId: string, dstBlockId: string) => {
    setBlocks((prev) => {
      const isImg = (t: string) => t === "full" || t === "pair" || t === "trio";
      const src = prev.find((b) => b.id === srcBlockId);
      const dst = prev.find((b) => b.id === dstBlockId);
      if (!src || !dst || !isImg(src.type) || !isImg(dst.type)) return prev;
      const srcIds = src.slots.map((s) => s.imageId).filter(Boolean) as string[];
      const dstIds = dst.slots.map((s) => s.imageId).filter(Boolean) as string[];
      if (dstIds.length + srcIds.length > 3) return prev;
      const newIds = [...dstIds, ...srcIds];
      const newDst: Block = {
        ...dst,
        type: artBlockType(newIds.length),
        slots: newIds.map((id) => ({ imageId: id })),
      };
      return prev.flatMap((b) => {
        if (b.id === dstBlockId) return [newDst];
        if (b.id === srcBlockId) return [];
        return [b];
      });
    });
  }, []);

  return (
    <section className="relative bg-white px-4 pt-6 pb-20 md:px-8 md:pt-10 md:pb-28">
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="relative mx-auto"
        >
          {/* Browser window frame */}
          <div className="relative mx-auto overflow-hidden rounded-xl border border-black/[0.08] bg-white">
            {/* Title bar */}
            <div className="flex items-center gap-3 border-b border-black/[0.06] bg-white px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="mx-auto flex max-w-md flex-1 items-center gap-2 rounded-md border border-black/[0.06] bg-white px-3 py-1">
                <svg
                  width="11"
                  height="11"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                  className="text-black/30"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                <span className="text-[11px] tracking-tight text-black/40">
                  viewing room / private
                </span>
              </div>
              <div className="w-[58px]" />
            </div>

            {/* Preview content — scrollable area, ~3 blocks visible */}
            <div
              ref={scrollRef}
              className="relative h-[520px] overflow-y-auto bg-gray-50 md:h-[600px]"
            >
              {/* Mock action bar */}
              <div className="sticky top-4 z-30 mx-auto flex w-fit items-center gap-1 rounded-[2px] border border-gray-200/70 bg-white/95 px-1 py-[1.5px] shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl">
                <button
                  type="button"
                  className="rounded-[2px] px-3 py-1.5 text-[12px] text-gray-700 transition-colors hover:bg-gray-100"
                >
                  + Add images
                </button>
                <span className="h-4 w-px bg-gray-200" />
                <button
                  type="button"
                  className="rounded-[2px] px-3 py-1.5 text-[12px] text-gray-700 transition-colors hover:bg-gray-100"
                >
                  + Add text
                </button>
                <button
                  type="button"
                  onClick={() => setExportOpen(true)}
                  className="ml-1 inline-flex items-center gap-1.5 rounded-[2px] bg-gray-900 px-4 py-1.5 text-[12px] font-medium text-white transition-all hover:bg-gray-700"
                >
                  Send to {vrSetup.recipientName || "recipient"}
                  <svg
                    width="12"
                    height="12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14m-6-6l6 6-6 6" />
                  </svg>
                </button>
              </div>
              <div className="-mt-9">
                <ViewingRoomPreview
                  setup={vrSetup}
                  images={vrImages}
                  blocks={blocks}
                  isPro
                  noOffset
                  wide
                  onUpdateSetup={setVrSetup}
                  onUpdateImage={(id, patch) =>
                    setVrImages((prev) =>
                      prev.map((i) => (i.id === id ? ({ ...i, ...patch } as ImageItem) : i))
                    )
                  }
                  onUpdateBlock={(id, patch) =>
                    setBlocks((prev) =>
                      prev.map((b) => (b.id === id ? ({ ...b, ...patch } as Block) : b))
                    )
                  }
                  onMergeImage={mergeImage}
                  onMergeMoveBlock={mergeMoveBlock}
                  onMoveBlock={moveBlock}
                />
              </div>
            </div>

            <ExportPanel
              open={exportOpen}
              onClose={() => setExportOpen(false)}
              blocks={blocks}
              images={vrImages}
              setup={vrSetup}
              onPaywall={() => setExportOpen(false)}
              onChangeSetup={setVrSetup}
              embedded
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
