import type { Metadata } from "next";
import SayVariants from "@/components/whatsapp/SayVariants";

export const metadata: Metadata = {
  title: { absolute: "Say — variantes" },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <SayVariants />;
}
