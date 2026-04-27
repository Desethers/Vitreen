import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OVR Studio — Viewing Room pour galeries d'art",
  description:
    "Créez et partagez vos sélections d'œuvres en 2 minutes. Mise en page libre, export PDF, lien privé. Par Vitreen.",
};

export default function RoomLayout({ children }: { children: React.ReactNode }) {
  return children;
}
