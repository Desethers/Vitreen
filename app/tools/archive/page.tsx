import ToolPage from "@/components/ToolPage";

export const metadata = {
  title: "Archive",
  description: "Œuvres, artistes et expositions organisés autour de votre workflow.",
  alternates: { canonical: "/tools/archive" },
  openGraph: {
    url: "/tools/archive",
    title: "Archive — Vitreen",
    description: "Œuvres, artistes et expositions organisés autour de votre workflow.",
  },
};

export default function Page() {
  return <ToolPage slug="archive" />;
}
