import type { Metadata } from "next";
import AboutPage from "@/components/AboutPage";
import PageStructuredData from "@/components/PageStructuredData";
import { pageMetadata } from "@/lib/seo";

const seo = {
  lang: "en",
  path: "/about",
  title: "About Vitreen",
  description:
    "Vitreen gives galleries a connected website, structured artwork records and a digital assistant for their daily work.",
} as const;

export const metadata: Metadata = pageMetadata(seo);

export default function Page() {
  return (
    <>
      <PageStructuredData {...seo} />
      <AboutPage />
    </>
  );
}
