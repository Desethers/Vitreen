import type { WaMessage } from "@/components/whatsapp/WaChat";

/** The demo conversation played in the WhatsApp phone (same scene as the /whatsapp page). */
export type DemoPhone = {
  name: string;
  status: string;
  placeholder: string;
  messages: WaMessage[];
};

const IMAGE = "/artworks/painting-03.jpg";

export const DEMO_PHONE: Record<"en" | "fr", DemoPhone> = {
  en: {
    name: "Vitreen",
    status: "sales assistant",
    placeholder: "Message",
    messages: [
      {
        from: "me",
        time: "10:41",
        forwarded: { label: "Forwarded", name: "Marie Beaumont" },
        text: "Anything new from Sacha Elron?",
      },
      {
        from: "bot",
        time: "10:41",
        text: "Marie got 2 Elrons in March and loves large formats. This one just came in:",
      },
      {
        from: "bot",
        time: "10:41",
        card: {
          image: IMAGE,
          title: "Sacha Elron — Evening Field",
          meta: "Oil on canvas · 120 × 150 cm",
          price: "€12,000 · available",
        },
      },
      {
        from: "bot",
        time: "10:42",
        text: "“Hello Marie, a new Elron just arrived — the large format you liked in March. Evening Field, 120 × 150 cm. Shall I send you more images?”",
        actions: ["Copy reply", "Make it shorter"],
      },
      { from: "me", time: "10:42", text: "Perfect, sent 👌" },
      { from: "bot", time: "10:42", text: "Saved to Marie’s history ✓" },
    ],
  },
  fr: {
    name: "Vitreen",
    status: "assistant de vente",
    placeholder: "Message",
    messages: [
      {
        from: "me",
        time: "10:41",
        forwarded: { label: "Transféré", name: "Marie Beaumont" },
        text: "Du nouveau chez Sacha Elron ?",
      },
      {
        from: "bot",
        time: "10:41",
        text: "Marie a reçu 2 Elron en mars et adore les grands formats. Celui-ci vient d’arriver :",
      },
      {
        from: "bot",
        time: "10:41",
        card: {
          image: IMAGE,
          title: "Sacha Elron — Evening Field",
          meta: "Huile sur toile · 120 × 150 cm",
          price: "12 000 € · disponible",
        },
      },
      {
        from: "bot",
        time: "10:42",
        text: "« Bonjour Marie, un nouvel Elron vient d’arriver — le grand format que vous aviez aimé en mars. Evening Field, 120 × 150 cm. Je vous envoie d’autres images ? »",
        actions: ["Copier la réponse", "Plus court"],
      },
      { from: "me", time: "10:42", text: "Parfait, envoyé 👌" },
      { from: "bot", time: "10:42", text: "Noté dans l’historique de Marie ✓" },
    ],
  },
};
