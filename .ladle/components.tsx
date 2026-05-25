import type { GlobalProvider } from "@ladle/react";
import "./fonts.css";
import "../app/globals.css";
import { LangProvider } from "../components/LangProvider";

/**
 * Global wrapper for every story.
 * Loads Tailwind, Inter (via Google Fonts CDN since next/font is a
 * Next-only build feature) and the i18n provider so stories render
 * exactly like in the real app.
 */
export const Provider: GlobalProvider = ({ children }) => (
  <div className="bg-white font-sans antialiased">
    <LangProvider>{children}</LangProvider>
  </div>
);
