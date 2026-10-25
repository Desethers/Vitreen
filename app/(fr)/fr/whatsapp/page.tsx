import type { Metadata } from "next";
import WhatsAppPage from "@/components/whatsapp/WhatsAppPage";

export const metadata: Metadata = {
  title: { absolute: "Vitreen — L’assistant de vente dans votre WhatsApp" },
  description:
    "Vendez ce qui ne se vend pas comme le reste, sur WhatsApp. Vitreen connaît votre stock, se souvient de chaque client et rédige chaque réponse. Vous n’avez plus qu’à envoyer.",
};

export default function Page() {
  return <WhatsAppPage lang="fr" />;
}
