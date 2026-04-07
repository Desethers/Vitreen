"use client";
import { useLang } from "@/lib/lang";

export default function Footer() {
  const { t, lang, setLang } = useLang();
  return (
    <footer id="contact" className="py-10 px-4 md:px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <span className="font-display text-[#111110] text-base">Vitreen</span>
        <div className="flex items-center gap-6">
          <p className="text-[#ADADAA] text-xs">{t.footer.copy}</p>
          <button
            type="button"
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
            className="text-xs font-medium text-[#6B6A67] hover:text-[#111110] transition-colors duration-200 tracking-[0.04em]"
          >
            {t.footer.switchTo}
          </button>
        </div>
      </div>
    </footer>
  );
}
