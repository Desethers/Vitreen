import StudiesLayout, { type Study } from "@/components/studies/StudiesLayout";
import ArtworkSourceSection from "@/components/ArtworkSourceSection";
import ProcessFlow from "@/components/ProcessFlow";

export const metadata = {
  title: "Studies — Landing home",
  robots: { index: false, follow: false },
};

const studies: Study[] = [
  { name: "ArtworkSourceSection", component: <ArtworkSourceSection /> },
  { name: "ProcessFlow", component: <ProcessFlow /> },
];

export default function StudiesLandingHomePage() {
  return (
    <StudiesLayout
      title="Landing home"
      description="A working catalog of the home landing’s sections and components — each one labelled for review."
      studies={studies}
    />
  );
}
