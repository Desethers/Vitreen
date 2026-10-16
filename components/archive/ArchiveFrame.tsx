"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/* Monte son contenu seulement quand il approche de l’écran : la page
 * recense des dizaines de sections animées, toutes ensemble ce serait lourd.
 * `transform` crée un bloc contenant pour les éléments `position: fixed`
 * (la nav, par exemple) : ils restent dans le cadre au lieu de coller à l’écran. */
export default function ArchiveFrame({
  children,
  minHeight = 240,
}: {
  children: ReactNode;
  minHeight?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative isolate overflow-hidden rounded-[12px] border border-[#E8E8E6] bg-white"
      style={{ transform: "translateZ(0)", minHeight }}
    >
      {mounted ? children : null}
    </div>
  );
}
