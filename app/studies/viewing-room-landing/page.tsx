import StudiesLayout, { type Study } from "@/components/studies/StudiesLayout";

export const metadata = {
  title: "Studies — Viewing room landing",
  robots: { index: false, follow: false },
};

const studies: Study[] = [];

export default function StudiesViewingRoomLandingPage() {
  return (
    <StudiesLayout
      title="Viewing room landing"
      description="Sections and components from the Viewing Room Studio landing — to be catalogued here."
      studies={studies}
    />
  );
}
