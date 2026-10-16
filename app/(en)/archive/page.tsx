import type { Metadata } from "next";
import ArchiveGallery from "@/components/archive/ArchiveGallery";

export const metadata: Metadata = {
  title: "Archive des sections",
  robots: { index: false, follow: false },
};

export default function ArchivePage() {
  return <ArchiveGallery />;
}
