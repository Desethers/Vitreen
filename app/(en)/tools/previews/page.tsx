import ToolPage from "@/components/ToolPage";

export const metadata = {
  title: "Previews",
  description: "Présentations privées d’œuvres pour collectionneurs.",
  /* Templated offshoot that restates viewing-rooms / publishing and is not
   * linked from the site. Keep it reachable but out of the index until it
   * carries a subject of its own. */
  robots: { index: false, follow: true },
  alternates: { canonical: "/tools/previews" },
  openGraph: {
    url: "/tools/previews",
    title: "Previews — Vitreen",
    description: "Présentations privées d’œuvres pour collectionneurs.",
  },
};

export default function Page() {
  return <ToolPage slug="previews" />;
}
