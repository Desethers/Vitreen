"use client";

import type { MouseEvent, ReactNode } from "react";

export default function PortfolioPreviewShell({ children }: { children: ReactNode }) {
  const preventLinkNavigation = (event: MouseEvent<HTMLElement>) => {
    const target = event.target as Element;
    if (target.closest("a")) {
      event.preventDefault();
    }
  };

  return (
    <main
      className="portfolio-preview h-screen overflow-hidden bg-white"
      onClickCapture={preventLinkNavigation}
    >
      {children}
    </main>
  );
}
