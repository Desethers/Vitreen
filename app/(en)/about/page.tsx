import type { Metadata } from "next";
import AboutPage from "@/components/AboutPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  lang: "en",
  path: "/about",
  title: "About",
  description:
    "Vitreen gives galleries a connected website, structured artwork records and a digital assistant for their daily work.",
});

export default function Page() {
  return <AboutPage />;
}
