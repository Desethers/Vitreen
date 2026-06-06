"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { STUDIES_NAV } from "@/lib/studies-nav";

export default function StudiesNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 flex justify-center border-b border-[#E8E8E6] bg-white/85 px-4 py-3 backdrop-blur-md">
      <ul className="flex flex-wrap items-center justify-center gap-1">
        {STUDIES_NAV.map((link) => {
          const active = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-3.5 py-1.5 text-[13px] tracking-tight transition-colors ${
                  active
                    ? "bg-[#111110] text-white"
                    : "text-[#6B6A67] hover:bg-[#F5F5F3] hover:text-[#111110]"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
