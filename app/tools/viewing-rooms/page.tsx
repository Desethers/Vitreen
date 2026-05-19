import ToolPage from "@/components/ToolPage";

export const metadata = {
  title: "Viewing Rooms",
  description: "Présentations privées pour collectionneurs et expositions.",
  alternates: { canonical: "/tools/viewing-rooms" },
  openGraph: {
    url: "/tools/viewing-rooms",
    title: "Viewing Rooms — Vitreen",
    description: "Présentations privées pour collectionneurs et expositions.",
  },
};

export default function Page() {
  return <ToolPage slug="viewing-rooms" />;
}
