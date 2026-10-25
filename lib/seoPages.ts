import type { Metadata } from "next";
import type { Lang } from "@/lib/lang";
import { pageMetadata } from "@/lib/seo";

/*
 * Content of the secondary pages (product, solutions, about), one entry per
 * page and per language. Every page uses the same template (SeoPage): a hero
 * that carries the page's search phrase, one product visual, three or four
 * blocks, then the shared CTA and footer. Only what Vitreen does today.
 */

export type SeoPageId =
  | "inventory"
  | "conversations"
  | "art-galleries"
  | "design-galleries"
  | "advisors"
  | "antique-dealers"
  | "about";

/** Product visuals reused from the existing pages, or a photo for the audiences that have none yet. */
export type SeoVisual =
  | { kind: "artworkList" }
  | { kind: "artworkForm" }
  | { kind: "inquiryDraft" }
  | { kind: "advisorSelection" }
  | { kind: "photo"; src: string; alt: string };

export type SeoPageCopy = {
  /** <title> and meta description. */
  meta: { title: string; description: string };
  eyebrow: string;
  title: string;
  sub: string;
  cta: string;
  visual?: SeoVisual;
  blocks?: { title: string; items: string[] }[];
  /** Running text instead of blocks (about page). The last line is the signature. */
  prose?: string[];
};

export const SEO_PAGES: Record<SeoPageId, Record<Lang, SeoPageCopy>> = {
  inventory: {
    en: {
      meta: {
        title: "Artwork inventory software for galleries",
        description:
          "Every artwork in one record: images, documents, price and availability, imported from your spreadsheet and ready to use in Gmail and WhatsApp.",
      },
      eyebrow: "Artwork inventory",
      title: "All your artworks, in one place.",
      sub: "Images, prices, availability and documents in one clear record, ready to use in Gmail and WhatsApp.",
      cta: "Book a demo",
      visual: { kind: "artworkList" },
      blocks: [
        {
          title: "Bring what you already have",
          items: ["An Excel or CSV file", "From your Artlogic exports", "Nothing to retype"],
        },
        {
          title: "One complete record per work",
          items: [
            "Images and documents (certificate, condition report)",
            "Price and availability",
            "Artists and exhibitions",
          ],
        },
        {
          title: "Find anything in seconds",
          items: [
            "Search by artist or title",
            "Filter by availability",
            "Sold, reserved, on consignment, on loan",
          ],
        },
        {
          title: "Your data stays yours",
          items: [
            "A database of your own",
            "Encrypted in transit and at rest",
            "Never used to train an AI",
          ],
        },
      ],
    },
    fr: {
      meta: {
        title: "Inventaire des œuvres pour galeries",
        description:
          "Chaque œuvre dans une fiche : images, documents, prix et disponibilité, repris de votre tableur et prêts à servir dans Gmail et WhatsApp.",
      },
      eyebrow: "Inventaire des œuvres",
      title: "Toutes vos œuvres, au même endroit.",
      sub: "Images, prix, disponibilité et documents dans une fiche claire, prête à servir dans Gmail et WhatsApp.",
      cta: "Réserver une démo",
      visual: { kind: "artworkList" },
      blocks: [
        {
          title: "Importez ce que vous avez déjà",
          items: [
            "Un fichier Excel ou CSV",
            "À partir de vos exports Artlogic",
            "Rien à ressaisir",
          ],
        },
        {
          title: "Une fiche complète par œuvre",
          items: [
            "Images et documents (certificat, constat d’état)",
            "Prix et disponibilité",
            "Artistes et expositions",
          ],
        },
        {
          title: "Retrouvez tout en quelques secondes",
          items: [
            "Recherche par artiste ou par titre",
            "Filtres par disponibilité",
            "Vendu, réservé, en dépôt, en prêt",
          ],
        },
        {
          title: "Vos données restent les vôtres",
          items: [
            "Une base propre à votre galerie",
            "Chiffrées en transit et au repos",
            "Jamais utilisées pour entraîner une IA",
          ],
        },
      ],
    },
  },

  conversations: {
    en: {
      meta: {
        title: "Sales conversations in Gmail and WhatsApp",
        description:
          "Your artwork records inside Gmail and WhatsApp: collector replies prepared from your own inventory, reviewed before anything is sent.",
      },
      eyebrow: "Sales conversations",
      title: "Your inventory in Gmail and WhatsApp.",
      sub: "Answer a collector with the right work, its image and its price, without leaving the conversation.",
      cta: "Book a demo",
      visual: { kind: "inquiryDraft" },
      blocks: [
        {
          title: "In Gmail",
          items: [
            "Search a work while you write",
            "Add its image, caption and price",
            "Without leaving the thread",
          ],
        },
        {
          title: "On WhatsApp",
          items: [
            "Pick works from your phone",
            "A clean PDF in a few taps",
            "You choose which details show",
          ],
        },
        {
          title: "Prepared by AI, sent by you",
          items: [
            "Each inquiry becomes a draft",
            "The work’s details are already in it",
            "Nothing goes out without your review",
          ],
        },
        {
          title: "Every exchange remembered",
          items: [
            "Who received which work",
            "The follow-ups to make",
            "The context, at every message",
          ],
        },
      ],
    },
    fr: {
      meta: {
        title: "Conversations de vente dans Gmail et WhatsApp",
        description:
          "Vos fiches d’œuvres dans Gmail et WhatsApp : réponses collectionneurs préparées depuis votre inventaire, relues avant tout envoi.",
      },
      eyebrow: "Conversations de vente",
      title: "Votre inventaire dans Gmail et WhatsApp.",
      sub: "Répondez à un collectionneur avec la bonne œuvre, son image et son prix, sans quitter la conversation.",
      cta: "Réserver une démo",
      visual: { kind: "inquiryDraft" },
      blocks: [
        {
          title: "Dans Gmail",
          items: [
            "Cherchez une œuvre pendant que vous écrivez",
            "Ajoutez image, légende et prix",
            "Sans quitter le fil",
          ],
        },
        {
          title: "Sur WhatsApp",
          items: [
            "Choisissez des œuvres depuis votre téléphone",
            "Un PDF propre en quelques gestes",
            "Vous choisissez les détails affichés",
          ],
        },
        {
          title: "Préparé par l’IA, envoyé par vous",
          items: [
            "Chaque demande devient un brouillon",
            "Les infos de l’œuvre sont déjà dedans",
            "Rien ne part sans votre validation",
          ],
        },
        {
          title: "Chaque échange en mémoire",
          items: [
            "Qui a reçu quelle œuvre",
            "Les prochaines relances",
            "Le contexte retrouvé à chaque message",
          ],
        },
      ],
    },
  },

  "art-galleries": {
    en: {
      meta: {
        title: "Sales software for art galleries",
        description:
          "Your inventory connected to Gmail and WhatsApp, and every collector relationship kept in memory. Set up in about a week.",
      },
      eyebrow: "For art galleries",
      title: "Sell more simply, with what you already have.",
      sub: "Your inventory connected to Gmail and WhatsApp, and every collector relationship kept in memory.",
      cta: "Book a demo",
      visual: { kind: "artworkForm" },
      blocks: [
        {
          title: "Your works, organised",
          items: [
            "Images, prices and availability",
            "Documents attached to each work",
            "Taken from your spreadsheet",
          ],
        },
        {
          title: "Reply where collectors write",
          items: [
            "In Gmail, with the work and its price",
            "On WhatsApp, with a PDF",
            "Reviewed and sent by your team",
          ],
        },
        {
          title: "Every exchange remembered",
          items: ["Who saw what, and when", "The follow-ups to make", "Context for the whole team"],
        },
        {
          title: "Set up in about a week",
          items: [
            "We take over your spreadsheet",
            "We connect Gmail and WhatsApp",
            "Nothing to retype on your side",
          ],
        },
      ],
    },
    fr: {
      meta: {
        title: "Logiciel de vente pour galeries d’art",
        description:
          "Votre inventaire relié à Gmail et WhatsApp, et chaque relation collectionneur gardée en mémoire. Installé en une semaine environ.",
      },
      eyebrow: "Pour les galeries d’art",
      title: "Vendez plus simplement, avec ce que vous avez déjà.",
      sub: "Votre inventaire relié à Gmail et WhatsApp, et chaque relation avec vos collectionneurs gardée en mémoire.",
      cta: "Réserver une démo",
      visual: { kind: "artworkForm" },
      blocks: [
        {
          title: "Vos œuvres, organisées",
          items: [
            "Images, prix et disponibilité",
            "Documents attachés à chaque œuvre",
            "Repris depuis votre tableur",
          ],
        },
        {
          title: "Répondre là où on vous écrit",
          items: [
            "Dans Gmail, avec l’œuvre et son prix",
            "Sur WhatsApp, avec un PDF",
            "Relu et envoyé par votre équipe",
          ],
        },
        {
          title: "Chaque échange en mémoire",
          items: [
            "Qui a vu quoi, et quand",
            "Les relances à faire",
            "Le contexte pour toute l’équipe",
          ],
        },
        {
          title: "Installé en une semaine environ",
          items: [
            "On reprend votre tableur",
            "On branche Gmail et WhatsApp",
            "Rien à ressaisir de votre côté",
          ],
        },
      ],
    },
  },

  "design-galleries": {
    en: {
      meta: {
        title: "Sales software for design galleries",
        description:
          "Pieces, editions, dimensions and availability in one place, ready to share in Gmail and WhatsApp when a client writes.",
      },
      eyebrow: "For design galleries",
      title: "Every piece, ready to present.",
      sub: "Editions, dimensions and availability in one place, at hand when a client writes.",
      cta: "Book a demo",
      visual: { kind: "photo", src: "/Design-gallery.png", alt: "A design gallery" },
      blocks: [
        {
          title: "Pieces and editions",
          items: ["Designer, year, edition", "Dimensions and materials", "Images and documents"],
        },
        {
          title: "Clear availability",
          items: ["Available, reserved, sold", "On consignment or on loan", "Found in seconds"],
        },
        {
          title: "Client presentations",
          items: [
            "One selection per client",
            "As a private link or a PDF",
            "Price shown or hidden",
          ],
        },
        {
          title: "Reply in Gmail and WhatsApp",
          items: [
            "The piece and its price in your reply",
            "Reviewed and sent by you",
            "The exchange kept in memory",
          ],
        },
      ],
    },
    fr: {
      meta: {
        title: "Logiciel de vente pour galeries de design",
        description:
          "Pièces, éditions, dimensions et disponibilité au même endroit, prêtes à partager dans Gmail et WhatsApp quand un client écrit.",
      },
      eyebrow: "Pour les galeries de design",
      title: "Chaque pièce, prête à être présentée.",
      sub: "Éditions, dimensions et disponibilité au même endroit, à portée de main quand un client écrit.",
      cta: "Réserver une démo",
      visual: { kind: "photo", src: "/Design-gallery.png", alt: "Une galerie de design" },
      blocks: [
        {
          title: "Pièces et éditions",
          items: ["Designer, année, édition", "Dimensions et matériaux", "Images et documents"],
        },
        {
          title: "Disponibilité claire",
          items: [
            "Disponible, réservée, vendue",
            "En dépôt ou en prêt",
            "Retrouvée en quelques secondes",
          ],
        },
        {
          title: "Présentations clients",
          items: ["Une sélection par client", "En lien privé ou en PDF", "Prix affiché ou non"],
        },
        {
          title: "Répondre dans Gmail et WhatsApp",
          items: [
            "La pièce et son prix dans la réponse",
            "Relu et envoyé par vous",
            "L’échange gardé en mémoire",
          ],
        },
      ],
    },
  },

  advisors: {
    en: {
      meta: {
        title: "Software for art advisors and dealers",
        description:
          "Find, curate and share artworks from one inventory, and keep track of what each client received.",
      },
      eyebrow: "For art advisors and dealers",
      title: "Answer your clients faster.",
      sub: "Find, curate and share artworks from one inventory.",
      cta: "Book a demo",
      visual: { kind: "advisorSelection" },
      blocks: [
        {
          title: "Find the right works",
          items: [
            "Search by artist or title",
            "Filter by availability",
            "All your sources in one place",
          ],
        },
        {
          title: "Build the selection",
          items: [
            "Straight from your inventory",
            "In the order you want",
            "With a note for the client",
          ],
        },
        {
          title: "Share it privately",
          items: ["A private link or a PDF", "Price shown or hidden", "From Gmail or WhatsApp"],
        },
        {
          title: "Keep the thread",
          items: ["What each client received", "What they asked for", "The next follow-up"],
        },
      ],
    },
    fr: {
      meta: {
        title: "Outil pour conseillers en art et marchands",
        description:
          "Trouvez, composez et partagez des œuvres depuis un seul inventaire, et gardez la trace de ce que chaque client a reçu.",
      },
      eyebrow: "Pour les conseillers et marchands",
      title: "Répondez à vos clients plus vite.",
      sub: "Trouvez, composez et partagez des œuvres depuis un seul inventaire.",
      cta: "Réserver une démo",
      visual: { kind: "advisorSelection" },
      blocks: [
        {
          title: "Trouvez les bonnes œuvres",
          items: [
            "Recherche par artiste ou titre",
            "Filtre par disponibilité",
            "Toutes vos sources au même endroit",
          ],
        },
        {
          title: "Composez la sélection",
          items: [
            "Directement depuis l’inventaire",
            "Dans l’ordre que vous voulez",
            "Avec une note pour le client",
          ],
        },
        {
          title: "Partagez-la en privé",
          items: ["Lien privé ou PDF", "Prix affiché ou non", "Depuis Gmail ou WhatsApp"],
        },
        {
          title: "Gardez le fil",
          items: ["Ce que chaque client a reçu", "Ce qu’il a demandé", "La prochaine relance"],
        },
      ],
    },
  },

  "antique-dealers": {
    en: {
      meta: {
        title: "Software for antique and collectibles dealers",
        description:
          "Photos, condition, documents and prices in one place, and a memory of which client showed interest in which piece.",
      },
      eyebrow: "For antique dealers",
      title: "Unique pieces, and the memory of every client.",
      sub: "Photos, condition, documents and prices in one place, and who showed interest in which piece.",
      cta: "Book a demo",
      visual: {
        kind: "photo",
        src: "https://images.unsplash.com/photo-1667916468910-d310ec444154?w=1600&q=80",
        alt: "An antique dealer’s shop",
      },
      blocks: [
        {
          title: "Every piece documented",
          items: [
            "Photos from every angle",
            "Provenance documents and condition report",
            "Price and location",
          ],
        },
        {
          title: "Find a piece in an instant",
          items: [
            "Search by period, maker or title",
            "Available, reserved, sold",
            "On consignment or on loan",
          ],
        },
        {
          title: "Reply on WhatsApp",
          items: ["Photos, dimensions and price", "A clean PDF in a few taps", "Sent by you"],
        },
        {
          title: "Who saw what",
          items: [
            "Every exchange kept in memory",
            "The clients interested in a piece",
            "The right moment to follow up",
          ],
        },
      ],
    },
    fr: {
      meta: {
        title: "Logiciel pour antiquaires et marchands d’objets de collection",
        description:
          "Photos, état, documents et prix au même endroit, et la mémoire de quel client s’est intéressé à quelle pièce.",
      },
      eyebrow: "Pour les antiquaires",
      title: "Des pièces uniques, et la mémoire de chaque client.",
      sub: "Photos, état, documents et prix au même endroit, et qui s’est intéressé à quelle pièce.",
      cta: "Réserver une démo",
      visual: {
        kind: "photo",
        src: "https://images.unsplash.com/photo-1667916468910-d310ec444154?w=1600&q=80",
        alt: "La boutique d’un antiquaire",
      },
      blocks: [
        {
          title: "Chaque pièce documentée",
          items: [
            "Photos sous tous les angles",
            "Documents de provenance et constat d’état",
            "Prix et emplacement",
          ],
        },
        {
          title: "Retrouvez une pièce en un instant",
          items: [
            "Recherche par époque, auteur ou titre",
            "Disponible, réservée, vendue",
            "En dépôt ou en prêt",
          ],
        },
        {
          title: "Répondre sur WhatsApp",
          items: [
            "Photos, dimensions et prix",
            "Un PDF propre en quelques gestes",
            "Envoyé par vous",
          ],
        },
        {
          title: "Qui a vu quoi",
          items: [
            "Chaque échange en mémoire",
            "Les clients intéressés par une pièce",
            "Le bon moment pour relancer",
          ],
        },
      ],
    },
  },

  about: {
    en: {
      meta: {
        title: "About Vitreen",
        description:
          "Vitreen keeps artwork information moving and collector conversations in memory, because in art and design, the relationship is the business.",
      },
      eyebrow: "About",
      title: "In art and design, the relationship is the business.",
      sub: "Vitreen keeps artwork information moving and collector conversations in memory.",
      cta: "Book a demo",
      prose: [
        "Galleries have always been built on artists, judgment and relationships. That should not change.",
        "But the work behind a gallery has become heavier. Even a small team now has to track its works, prepare selections and answer collectors across several channels.",
        "Vitreen started from a simple idea: an artwork’s information is entered once, then used everywhere, in Gmail, on WhatsApp, in a PDF. And every exchange with a collector is remembered.",
        "Technology replaces neither judgment nor relationships. It supports them: Vitreen prepares, your team reviews and sends.",
        "Raphaël Rossi, founder of Vitreen",
      ],
    },
    fr: {
      meta: {
        title: "À propos de Vitreen",
        description:
          "Vitreen garde l’information des œuvres en mouvement et les conversations avec les collectionneurs en mémoire, parce que dans l’art et le design, la relation est le business.",
      },
      eyebrow: "À propos",
      title: "Dans l’art et le design, la relation est le business.",
      sub: "Vitreen garde l’information des œuvres en mouvement et les conversations avec les collectionneurs en mémoire.",
      cta: "Réserver une démo",
      prose: [
        "Les galeries se sont toujours construites sur des artistes, un regard et des relations. Ça ne doit pas changer.",
        "Mais le travail derrière une galerie est devenu plus lourd. Même une petite équipe doit suivre ses œuvres, préparer des sélections et répondre aux collectionneurs sur plusieurs canaux.",
        "Vitreen est né d’une idée simple : l’information d’une œuvre se saisit une fois, puis sert partout, dans Gmail, sur WhatsApp, dans un PDF. Et chaque échange avec un collectionneur reste en mémoire.",
        "La technologie ne remplace ni le regard ni la relation. Elle les soutient : Vitreen prépare, votre équipe relit et envoie.",
        "Raphaël Rossi, fondateur de Vitreen",
      ],
    },
  },
};

/** Metadata and structured-data props for one page in one language. */
export function seoPageProps(id: SeoPageId, lang: Lang, path: string) {
  const { title, description } = SEO_PAGES[id][lang].meta;
  const seo = { lang, path, title, description };
  return { seo, metadata: pageMetadata(seo) as Metadata };
}
