import type { Metadata } from "next";
import WhatsAppPage from "@/components/whatsapp/WhatsAppPage";

export const metadata: Metadata = {
  title: { absolute: "Vitreen — The sales assistant in your WhatsApp" },
  description:
    "Sell what doesn’t sell like everything else, on WhatsApp. Vitreen knows your stock, remembers every client and writes every reply. You just hit send.",
};

export default function Page() {
  return <WhatsAppPage lang="en" />;
}
