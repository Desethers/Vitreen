"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { ViewingRoomPreview } from "@/components/ovr/ViewingRoomApp";
import type { Block, BlockType, ImageItem, VrSetup } from "@/lib/ovr/buildTypes";

const setup: VrSetup = {
  galleryName: "Maison Vitreen",
  headline: "Recent Acquisitions",
  title: "Spring Selection",
  recipientName: "M. Dupont",
  recipientEmail: "",
  introText:
    "Cher M. Dupont, voici une sélection d'œuvres récemment acquises qui pourraient vous intéresser. Nous restons à votre disposition pour toute information complémentaire.",
  galleryAddress: "12, rue de Seine — 75006 Paris",
  galleryContact: "contact@maison-vitreen.com",
};

const initialImages: ImageItem[] = [
  {
    id: "img-1",
    dataUrl: "/artworks/painting-01.png",
    title: "Painting 10",
    artist: "Sacha Elron",
    year: "2024",
    medium: "Acrylic on canvas",
    dimensions: "180× 180 cm",
    price: "8000 €",
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
    quoteText: "Shared light is the simplest form of friendship—what falls on the wall falls on us both.",
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

  const moveBlock = useCallback((blockId: string, toIndex: number) => {
    setBlocks(prev => {
      const fromIndex = prev.findIndex(b => b.id === blockId);
      if (fromIndex === -1) return prev;
      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      const adjusted = fromIndex < toIndex ? toIndex - 1 : toIndex;
      next.splice(Math.max(0, Math.min(adjusted, next.length)), 0, moved);
      return next;
    });
  }, []);

  const mergeImage = useCallback((srcImageId: string, dstBlockId: string) => {
    setBlocks(prev => {
      const isImg = (t: string) => t === "full" || t === "pair" || t === "trio";
      const dst = prev.find(b => b.id === dstBlockId);
      const src = prev.find(b => b.slots.some(s => s.imageId === srcImageId));
      if (!dst || !src || !isImg(dst.type) || !isImg(src.type)) return prev;
      const dstIds = dst.slots.map(s => s.imageId).filter(Boolean) as string[];
      if (dstIds.includes(srcImageId) || dstIds.length >= 3) return prev;
      const newDstIds = [...dstIds, srcImageId];
      const newDst: Block = { ...dst, type: artBlockType(newDstIds.length), slots: newDstIds.map(id => ({ imageId: id })) };
      const srcRest = (src.slots.map(s => s.imageId).filter(Boolean) as string[]).filter(id => id !== srcImageId);
      return prev.flatMap(b => {
        if (b.id === dst.id) return [newDst];
        if (b.id === src.id) {
          if (srcRest.length === 0) return [];
          return [{ ...b, type: artBlockType(srcRest.length), slots: srcRest.map(id => ({ imageId: id })) }];
        }
        return [b];
      });
    });
  }, []);

  const mergeMoveBlock = useCallback((srcBlockId: string, dstBlockId: string) => {
    setBlocks(prev => {
      const isImg = (t: string) => t === "full" || t === "pair" || t === "trio";
      const src = prev.find(b => b.id === srcBlockId);
      const dst = prev.find(b => b.id === dstBlockId);
      if (!src || !dst || !isImg(src.type) || !isImg(dst.type)) return prev;
      const srcIds = src.slots.map(s => s.imageId).filter(Boolean) as string[];
      const dstIds = dst.slots.map(s => s.imageId).filter(Boolean) as string[];
      if (dstIds.length + srcIds.length > 3) return prev;
      const newIds = [...dstIds, ...srcIds];
      const newDst: Block = { ...dst, type: artBlockType(newIds.length), slots: newIds.map(id => ({ imageId: id })) };
      return prev.flatMap(b => {
        if (b.id === dstBlockId) return [newDst];
        if (b.id === srcBlockId) return [];
        return [b];
      });
    });
  }, []);

  return (
    <section className="relative bg-white px-4 py-24 md:px-8 md:py-32">

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-[12px] uppercase tracking-[0.3em] text-[#6B6A67]">Le produit</p>
          <h2 className="font-display mt-4 text-balance text-[1.65rem] font-normal leading-snug tracking-tight text-[#111110] md:text-[2rem]">
            Une viewing room composée en quelques minutes
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-pretty text-[15px] leading-relaxed text-[#6B6A67]">
            Glissez un bloc pour le réordonner, déposez-le sur un autre pour fusionner les œuvres en
            diptyque ou triptyque. Le rendu reste cohérent à l&rsquo;écran, en PDF et dans l&rsquo;email.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="relative mx-auto mt-16"
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
                <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" className="text-black/30">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                <span className="text-[11px] tracking-tight text-black/40">room.vitreen.art / private</span>
              </div>
              <div className="w-[58px]" />
            </div>

            {/* Preview content — scrollable area, ~3 blocks visible */}
            <div className="relative h-[520px] overflow-y-auto bg-gray-50 md:h-[600px]">
              <ViewingRoomPreview
                setup={setup}
                images={initialImages}
                blocks={blocks}
                isPro
                noOffset
                onUpdateBlock={(id, patch) => setBlocks(prev => prev.map(b => b.id === id ? { ...b, ...patch } as Block : b))}
                onMergeImage={mergeImage}
                onMergeMoveBlock={mergeMoveBlock}
                onMoveBlock={moveBlock}
              />
            </div>
          </div>

          {/* Floating side cards */}
          <div className="pointer-events-none absolute -left-6 top-32 hidden items-center gap-2.5 rounded-md border border-black/[0.06] bg-white px-3 py-2 md:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="text-[11px] tracking-tight text-[#6B6A67]">PDF généré</span>
          </div>

          <div className="pointer-events-none absolute -right-6 top-56 hidden items-center gap-2.5 rounded-md border border-black/[0.06] bg-white px-3 py-2 md:flex">
            <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" className="text-[#8A8986]">
              <path d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
            </svg>
            <span className="text-[11px] tracking-tight text-[#6B6A67]">Lien privé prêt</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
