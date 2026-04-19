"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

export type Lang = "fr" | "en";

export const translations = {
  fr: {
    nav: {
      links: [
        { label: "Offres", href: "#offre" },
        { label: "Blog", href: "#blog" },
        { label: "À propos", href: "#approche" },
      ],
      cta: "Réserver une démo",
      modal: {
        title: "Nous contacter",
        subtitle: "Décrivez votre projet. Réponse sous 48 h.",
        fields: {
          nom: "Nom",
          galerie: "Galerie",
          email: "Email",
          projet: "Votre projet",
        },
        submit: "Envoyer",
        sending: "Envoi…",
        success: "Merci. Je reviens vers vous très prochainement.",
        close: "Fermer",
        dragHint: "Glissez vers la gauche pour nous écrire",
        ariaLabel:
          "Contactez-nous. Faites glisser le bouton vers la gauche pour ouvrir le formulaire.",
      },
    },
    hero: {
      title:
        "Conçu pour piloter toute votre galerie, Vitreen réunit expositions, viewing rooms, ventes et relation collectionneurs.",
      ctaPrimary: "Réserver une démo",
      ctaSecondary: "Voir les tarifs",
    },
    audiences: {
      tabs: ["Galeries", "Artistes", "Art Advisors", "Collection Privée"],
      soon: "Soon",
      items: [
        {
          title: "Une vitrine à la hauteur de votre programme.",
          description:
            "Présentez vos artistes, archivez vos expositions, gérez votre catalogue en ligne — sans compétences techniques.",
          features: [
            "Catalogue d\u2019œuvres",
            "Pages artistes",
            "Archives d\u2019expositions",
            "Formulaire de contact",
          ],
        },
        {
          title: "Votre œuvre mérite un espace à elle.",
          description:
            "Un portfolio conçu pour vous — biographie, CV d\u2019exposition, séries d\u2019œuvres — mis à jour par vous, sans intermédiaire.",
          features: [
            "Portfolio en ligne",
            "Séries et œuvres",
            "CV d\u2019exposition",
            "Prise de contact directe",
          ],
        },
        {
          title: "Partagez des sélections, pas des fichiers.",
          description:
            "Présentez vos recommandations à vos clients dans un espace professionnel, confidentiel et facile à naviguer.",
          features: [
            "Partage de sélections",
            "Espaces clients",
            "Fiches d\u2019œuvres détaillées",
            "Interface confidentielle",
          ],
        },
        {
          title: "Votre collection, organisée et accessible.",
          description:
            "Centralisez l\u2019ensemble de vos œuvres dans un espace privé : fiches, documents, historique — tout en un lieu.",
          features: [
            "Inventaire complet",
            "Fiches détaillées",
            "Documents associés",
            "Accès sécurisé",
          ],
        },
      ],
    },
    showcase: {
      title: "Et en coulisses, un back office pensé pour les galeries.",
      subtitle:
        "Demandes, expositions, inventaire. Tout ce qu'il faut pour la faire tourner.",
      cards: [
        {
          title: "Les demandes, classées.",
          desc: "Chaque demande d\u2019œuvre arrive dans une seule boîte — reliée à l\u2019artiste, à l\u2019œuvre et au collectionneur.",
        },
        {
          title: "Planifiez l\u2019année sur une seule vue.",
          desc: "Glissez pour programmer les expositions. Les œuvres liées et les pages se publient toutes seules.",
        },
        {
          title: "Un inventaire toujours à jour.",
          desc: "Prix, statut, provenance et fiches artistes — une seule source de vérité.",
        },
      ],
      bio: [
        "Sacha Elron (né en 1960 à Oklahoma City, Oklahoma) est un peintre américain reconnu pour ses paysages méditatifs à grande échelle. Formé à la peinture figurative à l\u2019Art Students League de New York, il développe rapidement un langage visuel personnel, oscillant entre représentation et abstraction pure.",
        "Son œuvre prend racine dans la contemplation de la nature — ciels vastes, horizons lumineux, arbres solitaires — qu\u2019il distille en champs de couleur saturés, denses et silencieux. Travaillant principalement à l\u2019huile sur toile, Sacha Elron construit ses tableaux par couches successives de pigments, laissant parfois transparaître les strates sous-jacentes comme autant de traces du temps.",
        "Ses expositions personnelles se sont tenues dans des galeries majeures à New York, Los Angeles, Paris et Berlin. Ses œuvres figurent dans de nombreuses collections publiques et privées, notamment au Whitney Museum of American Art, au Musée d\u2019Art Moderne de Paris, et dans plusieurs fondations européennes dédiées à la peinture contemporaine.",
        "En 2008, il reçoit le Prix de la Fondation Pollock-Krasner, récompense majeure du monde de l\u2019art américain. En 2015, une rétrospective lui est consacrée à la Fondation Beyeler à Bâle, rassemblant plus de 80 œuvres couvrant trente ans de pratique.",
        "Sacha Elron vit et travaille à Brooklyn, New York, dans un atelier qu\u2019il occupe depuis 1994.",
      ],
      readBio: "Lire la biographie complète",
    },
    solution: {
      title: "Transformez les visiteurs en collectionneurs.",
      subtitle:
        "Chaque page d'œuvre invite à une demande, un viewing privé ou un partage.",
      cards: [
        {
          title: "Direct Inquiry",
          desc: "Achat ou demande depuis la page œuvre.",
        },
        {
          title: "Private Viewing",
          desc: "Envoyez une sélection à vos collectionneurs.",
        },
        {
          title: "One-tap Share",
          desc: "Publiez en story, envoyez un lien, relancez la conversation.",
        },
      ],
    },
    processFlow: {
      title: "Passez à une nouvelle génération de site galerie",
      subtitle: "Site livré en 3 semaines.",
      steps: [
        {
          number: "01",
          title: "Discovery",
          desc: "Nous commençons par comprendre vos contenus et votre fonctionnement. Artistes, œuvres, expositions : tout est structuré avant de concevoir.",
          week: "SEMAINE 1",
        },
        {
          number: "02",
          title: "Design & intégration.",
          desc: "Un design précis, adapté à votre identité et propulsé par un CMS intuitif, conçu pour engager durablement collectionneurs et professionnels.",
          week: "SEMAINE 2",
        },
        {
          number: "03",
          title: "Mise en ligne.",
          desc: "Site livré, formation à l\u2019outil incluse. Vous êtes autonome dès le premier jour. Un système simple et durable pour faire évoluer vos contenus en toute indépendance.",
          week: "SEMAINE 3",
        },
      ],
    },
    stepper: {
      title: "Publier du contenu, sans effort",
      subtitle:
        "Vous publiez en autonomie. Ajoutez vos œuvres, elles apparaissent instantanément sur votre site.",
      steps: [
        {
          title: "Ajoutez une œuvre",
          desc: "Formulaire simple, publié en un clic.",
        },
        {
          title: "Site mis à jour",
          desc: "L\u2019œuvre apparaît instantanément, sans code.",
        },
        {
          title: "Partagez",
          desc: "Lien, Viewing Room privé, email collectionneurs.",
        },
      ],
      mock: {
        admin: {
          workspace: "Mon espace galerie",
          online: "En ligne",
          sidebar: ["Œuvres", "Artistes", "Expositions", "Viewing Rooms"],
          newArtwork: "Nouvelle œuvre",
          publish: "Publier",
          titleField: "Titre",
          artistField: "Artiste",
          imageField: "Image",
          dragClick: "Glissez ou cliquez",
          priceField: "Prix",
          priceValue: "Sur demande",
          dimField: "Dimensions",
        },
        livesite: {
          navItems: ["Œuvres", "Artistes", "Expositions", "Contact"],
          technique: "Technique",
          techniqueValue: "Huile sur toile",
          dimensions: "Dimensions",
          price: "Prix",
          priceValue: "Sur demande",
          inquire: "Demander le prix",
          liveStatus: "Visible en ligne — mis à jour il y a 2 secondes",
        },
        share: {
          newMessage: "Nouveau message",
          notifyCollector: "Notifier un collectionneur",
          from: "De",
          to: "À",
          subject: "Objet",
          artworkSub: "Claire Fontaine · Sur demande",
          send: "Envoyer",
          sent: "Envoyé",
          recipientsCount: "1 sur 3 collectionneurs",
        },
      },
    },
    services: {
      title: "Choisissez votre formule",
      subtitle: "Recrutez votre partenaire de croissance digitale.",
      items: [
        {
          tier: "PORTFOLIO",
          name: "Artist Studio",
          description:
            "Un studio digital raffiné pour artistes indépendants — présentez votre travail, gérez votre archive, connectez-vous avec vos collectionneurs.",
          featuresHeading: "Inclus :",
          features: [
            "Site rapide & responsive",
            "Pages essentielles",
            "Contact sur chaque œuvre",
            "SEO de base",
            "Dashboard privé archive & demandes",
          ],
          delivery: "Livraison : 5 jours ouvrés",
          price: "À partir de 1 500 €",
          priceNote: "Paiement unique (one-time)",
          cta: "Commencer",
          highlight: false as const,
        },
        {
          tier: "SITE GALERIE",
          name: "Gallery Growth",
          description:
            "Un site galerie clair, structuré et prêt à être utilisé.",
          featuresHeading: "Inclus :",
          features: [
            "Catalogue illimité",
            "Structure galerie complète",
            "Parcours orienté collectionneur",
            "Inquiry system optimisé",
            "SEO marché de l\u2019art",
            "Gallery OS privé : base de données & ventes",
          ],
          delivery: "Livraison : 3 semaines",
          price: "À partir de 4 000 €",
          priceNote: "Paiement unique (one-time)",
          cta: "Commencer",
          highlight: false as const,
        },
        {
          tier: "PARTNER",
          name: "Partner",
          description: "Un responsable digital externalisé pour votre galerie.",
          featuresHeading: "Inclus :",
          features: [
            "Gestion continue du site",
            "Publication & mise à jour",
            "Newsletter stratégique",
            "Structuration des contacts",
            "Diffusion sur plateformes",
            "Tracking & analyse",
          ],
          delivery: undefined as string | undefined,
          price: "1 200 € / mois",
          priceNote: "Sans engagement. Résiliable à tout moment.",
          cta: "Discuter du projet",
          highlight: true as const,
        },
      ],
    },
    statementSplit: {
      statTitle:
        "L\u2019art en ligne red\u00e9finit l\u2019\u00e9conomie du march\u00e9 de l\u2019art",
      stats: [
        {
          value: "$10,5Mds",
          label: "Ventes en ligne en 2024",
          sub: "Marché mondial",
        },
        { value: "18%", label: "Du marché total", sub: "Part du digital" },
        { value: "+76%", label: "Vs avant-pandémie", sub: "Depuis 2019" },
        { value: "40,5M", label: "Transactions en 2024", sub: "+3% sur un an" },
      ],
      amplifyTitle: "Amplifiez l\u2019influence de votre galerie",
      blocks: [
        {
          heading: "Standardisez votre présence en ligne.",
          body1:
            "Sans canal d\u2019achat à la hauteur, vous restez hors du champ des collectionneurs qui décident déjà en ligne — partout dans le monde.",
          body2:
            "Vitreen déploie une distribution native, permettant d\u2019exposer, diffuser et rendre accessibles vos œuvres en continu, sans dépendre des circuits traditionnels.",
        },
        {
          heading: "Transformez l\u2019attention en engagement durable.",
          body1:
            "Des parcours pensés pour faire passer l\u2019intérêt à l\u2019achat : moins de friction, des choix plus nets, des actions qui comptent.",
          body2:
            "Chaque interaction accompagne un glissement progressif — de la découverte vers l\u2019engagement, et de l\u2019attention vers une relation durable avec le travail de l\u2019artiste.",
        },
        {
          heading: "Reprenez le contrôle de votre relation.",
          body1:
            "Données, échanges et historique avec chaque collectionneur se retrouvent au même endroit — fini les informations éparpillées entre mails et outils.",
          body2:
            "Vitreen centralise et structure votre écosystème, transformant votre audience en actif stratégique plutôt qu\u2019en dépendance externe.",
        },
      ],
    },
    quoteSection: {
      quote:
        "L\u2019espace num\u00e9rique est le prolongement naturel de la vitrine de la galerie. \u00c0 l\u2019heure actuelle, un programme en ligne solide et une strat\u00e9gie d\u00e9di\u00e9e sont essentiels dans le monde de l\u2019art.",
      name: "Elena Soboleva",
      role: "Global Head of Audience Growth & Intelligence, Art Basel",
    },
    faq: {
      title: "Questions fréquentes",
      items: [
        {
          q: "Puis-je modifier le site moi-même ?",
          a: "Oui, via une interface simple. Pas besoin de compétences techniques — vous gérez vos contenus en autonomie.",
        },
        {
          q: "Combien de temps prend la mise en ligne ?",
          a: "Environ 2 semaines, du premier échange à la mise en ligne.",
        },
        {
          q: "Dois-je utiliser un logiciel spécifique ?",
          a: "Non. Tout se gère depuis votre navigateur, sans installation.",
        },
        {
          q: "Que se passe-t-il si je veux arrêter ?",
          a: "La formule Partner est sans engagement — vous pouvez résilier à tout moment, sans frais ni pénalité. Vos contenus restent accessibles.",
        },
        {
          q: "Est-ce que Vitreen s\u2019occupe du contenu ?",
          a: "Oui, dans la formule Partner. Nous gérons la publication du catalogue, la rédaction des newsletters et la structuration de vos emails. Pour les formules site, vous gardez la main sur vos contenus.",
        },
        {
          q: "Mon site sera-t-il visible sur Google ?",
          a: "Oui. Chaque site est optimisé pour le SEO dès le départ : structure sémantique, balises meta, images optimisées et indexation adaptée au marché de l\u2019art.",
        },
      ],
    },
    ctaBand: {
      title: "Donnez une nouvelle dimension à votre galerie",
      subtitle: "Discutons de votre projet, sans engagement",
      cta: "Réserver une démo",
    },
    footer: {
      copy: "© 2025 — Sites web pour galeries d\u2019art contemporain",
      switchTo: "EN",
      currentLang: "FR",
    },
  },
  en: {
    nav: {
      links: [
        { label: "Offers", href: "#offre" },
        { label: "Blog", href: "#blog" },
        { label: "About", href: "#approche" },
      ],
      cta: "Book a demo",
      modal: {
        title: "Get in touch",
        subtitle:
          "Tell us about your project. We\u2019ll reply within 48 hours.",
        fields: {
          nom: "Name",
          galerie: "Gallery",
          email: "Email",
          projet: "Your project",
        },
        submit: "Send",
        sending: "Sending\u2026",
        success: "Thank you. I\u2019ll get back to you shortly.",
        close: "Close",
        dragHint: "Swipe left to get in touch",
        ariaLabel: "Contact us. Swipe the button to the left to open the form.",
      },
    },
    hero: {
      title:
        "Built to run every part of your gallery, Vitreen unifies exhibitions, viewing rooms, sales, and collector outreach.",
      ctaPrimary: "Book a demo",
      ctaSecondary: "See pricing",
    },
    audiences: {
      tabs: ["Galleries", "Artists", "Art Advisors", "Private Collection"],
      soon: "Soon",
      items: [
        {
          title: "A showcase worthy of your programme.",
          description:
            "Present your artists, archive your exhibitions, manage your online catalogue — no technical skills required.",
          features: [
            "Artwork catalogue",
            "Artist pages",
            "Exhibition archive",
            "Contact form",
          ],
        },
        {
          title: "Your work deserves its own space.",
          description:
            "A portfolio built for you — biography, exhibition CV, work series — updated by you, without any intermediary.",
          features: [
            "Online portfolio",
            "Series & works",
            "Exhibition CV",
            "Direct contact",
          ],
        },
        {
          title: "Share selections, not files.",
          description:
            "Present your recommendations to clients in a professional, confidential and easy-to-navigate space.",
          features: [
            "Selection sharing",
            "Client spaces",
            "Detailed artwork sheets",
            "Confidential interface",
          ],
        },
        {
          title: "Your collection, organised and accessible.",
          description:
            "Centralise all your works in a private space — records, documents, history — everything in one place.",
          features: [
            "Full inventory",
            "Detailed records",
            "Associated documents",
            "Secure access",
          ],
        },
      ],
    },
    showcase: {
      title: "And behind the scenes, a back office built for galleries.",
      subtitle:
        "Inquiries, exhibitions, inventory. Everything you need to run it.",
      cards: [
        {
          title: "Collector inquiries, organised.",
          desc: "Every artwork inquiry lands in one inbox — tied to the artist, the work, and the collector.",
        },
        {
          title: "Plan your year on one canvas.",
          desc: "Drag to schedule exhibitions. Linked artworks and pages publish themselves.",
        },
        {
          title: "Inventory, always up to date.",
          desc: "Price, status, provenance and artist records — a single source of truth.",
        },
      ],
      bio: [
        "Sacha Elron (born 1960 in Oklahoma City, Oklahoma) is an American painter celebrated for his large-scale meditative landscapes. Trained in figurative painting at the Art Students League of New York, he quickly developed a distinctive visual language oscillating between representation and pure abstraction.",
        "His work is rooted in the contemplation of nature — vast skies, luminous horizons, solitary trees — which he distils into saturated, dense and silent colour fields. Working primarily in oil on canvas, Sacha Elron builds his paintings through successive layers of pigment, occasionally allowing underlying strata to show through as traces of time.",
        "His solo exhibitions have been held at major galleries in New York, Los Angeles, Paris and Berlin. His works are held in numerous public and private collections, including the Whitney Museum of American Art, the Mus\u00e9e d\u2019Art Moderne de Paris, and several European foundations dedicated to contemporary painting.",
        "In 2008, he received the Pollock-Krasner Foundation Award, one of the most prestigious honours in the American art world. In 2015, a retrospective was dedicated to him at the Fondation Beyeler in Basel, bringing together more than 80 works spanning thirty years of practice.",
        "Sacha Elron lives and works in Brooklyn, New York, in a studio he has occupied since 1994.",
      ],
      readBio: "Read full biography",
    },
    solution: {
      title: "Turn viewers into collectors.",
      subtitle:
        "Every artwork page invites collectors to inquire, view privately, or share.",
      cards: [
        { title: "Direct Inquiry", desc: "Buy or ask from the artwork page." },
        {
          title: "Private Viewing",
          desc: "Send a curated selection to your collectors.",
        },
        {
          title: "One-tap Share",
          desc: "Post to stories, send a link, spark a reply.",
        },
      ],
    },
    processFlow: {
      title: "Move to a new generation of gallery website",
      subtitle: "Website delivered in 3 weeks.",
      steps: [
        {
          number: "01",
          title: "Discovery",
          desc: "We start by understanding your content and workflow. Artists, works, exhibitions — everything is structured before we begin designing.",
          week: "WEEK 1",
        },
        {
          number: "02",
          title: "Design & build.",
          desc: "Precise design tailored to your identity, powered by an intuitive CMS, built to engage collectors and professionals over the long term.",
          week: "WEEK 2",
        },
        {
          number: "03",
          title: "Launch.",
          desc: "Site delivered, training included. You are self-sufficient from day one. A simple, lasting system to evolve your content independently.",
          week: "WEEK 3",
        },
      ],
    },
    stepper: {
      title: "Publishing content, effortlessly",
      subtitle:
        "You publish independently. Add your works and they appear instantly on your website.",
      steps: [
        {
          title: "Add an artwork",
          desc: "Simple form, published in one click.",
        },
        {
          title: "Site updated",
          desc: "The artwork appears instantly, no code required.",
        },
        {
          title: "Share",
          desc: "Link, private Viewing Room, collector email.",
        },
      ],
      mock: {
        admin: {
          workspace: "My gallery space",
          online: "Online",
          sidebar: ["Works", "Artists", "Exhibitions", "Viewing Rooms"],
          newArtwork: "New artwork",
          publish: "Publish",
          titleField: "Title",
          artistField: "Artist",
          imageField: "Image",
          dragClick: "Drag or click",
          priceField: "Price",
          priceValue: "On request",
          dimField: "Dimensions",
        },
        livesite: {
          navItems: ["Works", "Artists", "Exhibitions", "Contact"],
          technique: "Medium",
          techniqueValue: "Oil on canvas",
          dimensions: "Dimensions",
          price: "Price",
          priceValue: "On request",
          inquire: "Price on request",
          liveStatus: "Live \u2014 updated 2 seconds ago",
        },
        share: {
          newMessage: "New message",
          notifyCollector: "Notify a collector",
          from: "From",
          to: "To",
          subject: "Subject",
          artworkSub: "Claire Fontaine \u00b7 On request",
          send: "Send",
          sent: "Sent",
          recipientsCount: "1 of 3 collectors",
        },
      },
    },
    services: {
      title: "Choose your plan",
      subtitle: "Hire your digital growth partner.",
      items: [
        {
          tier: "PORTFOLIO",
          name: "Artist Studio",
          description:
            "A refined digital studio for independent artists — present your work, manage your archive, connect with collectors.",
          featuresHeading: "Included:",
          features: [
            "Fast & responsive website",
            "Core pages (artist, exhibitions, texts)",
            "Contact on each artwork",
            "Basic SEO",
            "Private dashboard for archive & enquiries",
          ],
          delivery: "Delivery: 5 business days",
          price: "From \u20ac1,500",
          priceNote: "One-time payment",
          cta: "Get started",
          highlight: false as const,
        },
        {
          tier: "GALLERY SITE",
          name: "Gallery Growth",
          description:
            "A clear, structured gallery website ready to use from day one.",
          featuresHeading: "Included:",
          features: [
            "Unlimited catalogue",
            "Complete gallery structure",
            "Collector-oriented journey",
            "Optimised inquiry system",
            "Art market SEO",
            "Private gallery OS for database & enquiries",
          ],
          delivery: "Delivery: 3 weeks",
          price: "From \u20ac4,000",
          priceNote: "One-time payment",
          cta: "Get started",
          highlight: false as const,
        },
        {
          tier: "PARTNER",
          name: "Partner",
          description: "An outsourced digital manager for your gallery.",
          featuresHeading: "Included:",
          features: [
            "Ongoing site management",
            "Publishing & updates",
            "Strategic newsletter",
            "Contact structuring",
            "Platform distribution",
            "Tracking & analytics",
          ],
          delivery: undefined as string | undefined,
          price: "\u20ac1,200 / month",
          priceNote: "No commitment. Cancel anytime.",
          cta: "Discuss the project",
          highlight: true as const,
        },
      ],
    },
    statementSplit: {
      statTitle: "Online art is redefining the economics of the art market",
      stats: [
        {
          value: "$10.5B",
          label: "Online sales in 2024",
          sub: "Global market",
        },
        { value: "18%", label: "Of the total market", sub: "Digital share" },
        { value: "+76%", label: "Vs pre-pandemic", sub: "Since 2019" },
        {
          value: "40.5M",
          label: "Transactions in 2024",
          sub: "+3% year-on-year",
        },
      ],
      amplifyTitle: "Amplify your gallery\u2019s influence",
      blocks: [
        {
          heading: "Establish your online presence.",
          body1:
            "Without a credible purchasing channel, you remain invisible to collectors who are already making decisions online \u2014 from anywhere in the world.",
          body2:
            "Vitreen deploys native distribution, enabling you to exhibit, share and make your works continuously accessible, independent of traditional circuits.",
        },
        {
          heading: "Turn curiosity into collecting.",
          body1:
            "Journeys designed to move interest into purchase: less friction, clearer choices, actions that count.",
          body2:
            "Every interaction supports a gradual shift from discovery to engagement, and from attention to a sustained relationship with the work.",
        },
        {
          heading: "Take back control of your relationships.",
          body1:
            "Data, exchanges and history with each collector brought together in one place \u2014 no more information scattered across emails and tools.",
          body2:
            "Vitreen centralises and structures your ecosystem, turning your audience into a strategic asset rather than an external dependency.",
        },
      ],
    },
    quoteSection: {
      quote:
        "The digital space is a natural extension of the gallery\u2019s storefront. In the current era, a robust online program and dedicated strategy is essential in the art world.",
      name: "Elena Soboleva",
      role: "Global Head of Audience Growth & Intelligence, Art Basel",
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        {
          q: "Can I edit the website myself?",
          a: "Yes, through a simple interface. No technical skills required \u2014 you manage your content independently.",
        },
        {
          q: "How long does it take to go live?",
          a: "Around 2 weeks, from the first conversation to launch.",
        },
        {
          q: "Do I need to use specific software?",
          a: "No. Everything is managed from your browser, with no installation required.",
        },
        {
          q: "What happens if I want to stop?",
          a: "The Partner plan has no commitment \u2014 you can cancel at any time, with no fees or penalties. Your content remains accessible.",
        },
        {
          q: "Does Vitreen handle the content?",
          a: "Yes, in the Partner plan. We manage catalogue publishing, newsletter writing and email structuring. For website plans, you retain full control over your content.",
        },
        {
          q: "Will my website be visible on Google?",
          a: "Yes. Every website is SEO-optimised from the start: semantic structure, meta tags, optimised images and indexing tailored to the art market.",
        },
      ],
    },
    ctaBand: {
      title: "Give your gallery a new dimension",
      subtitle: "Let\u2019s talk about your project \u2014 no commitment",
      cta: "Book a demo",
    },
    footer: {
      copy: "\u00a9 2025 \u2014 Websites for contemporary art galleries",
      switchTo: "FR",
      currentLang: "EN",
    },
  },
} as const;

type LangContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (typeof translations)[Lang];
};

const LangContext = createContext<LangContextType>({
  lang: "en",
  setLang: () => {},
  t: translations.en,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = localStorage.getItem("vitreen-lang") as Lang | null;
    if (stored === "fr" || stored === "en") setLangState(stored);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("vitreen-lang", l);
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
