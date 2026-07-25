import ArchiveProductPage from "@/components/ArchiveProductPage";

export const metadata = {
  title: "Artwork management",
  description:
    "Keep artworks, artists and exhibitions in one record — images, dimensions, availability, location and documents.",
  alternates: { canonical: "/products/archive" },
  openGraph: {
    url: "/products/archive",
    title: "Artwork management — Vitreen",
    description:
      "Keep artworks, artists and exhibitions in one record — images, dimensions, availability, location and documents.",
  },
};

export default function Page() {
  return <ArchiveProductPage />;
}
