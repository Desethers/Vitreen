import ToolPage from "@/components/ToolPage";

export const metadata = {
  title: "Artworks Management",
  description: "Œuvres, artistes et expositions organisés autour de votre workflow.",
  alternates: { canonical: "/products/archive" },
  openGraph: {
    url: "/products/archive",
    title: "Artworks Management — Vitreen",
    description: "Œuvres, artistes et expositions organisés autour de votre workflow.",
  },
};

export default function Page() {
  return <ToolPage slug="archive" />;
}
