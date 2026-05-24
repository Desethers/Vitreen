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
        { label: "Outils", href: "#tools", menu: "product" as const },
        { label: "Workflows", href: "#solutions", menu: "solutions" as const },
        { label: "Déploiement", href: "#offre" },
        { label: "Blog", href: "#blog" },
        { label: "À propos", href: "#approche" },
      ],
      productMenu: {
        sectionLabel: "Outils",
        items: [
          { title: "Overview", desc: "Outils connectés pour expositions, publication et communication collectionneurs.", href: "/tools/overview" },
          { title: "Archive", desc: "Œuvres, artistes et expositions organisés autour de votre workflow.", href: "/tools/archive" },
          { title: "Viewing Rooms", desc: "Présentations privées pour collectionneurs et expositions.", href: "/tools/viewing-rooms", badge: "Bientôt" },
          { title: "Previews", desc: "Présentations privées d’œuvres pour collectionneurs.", href: "/tools/previews" },
          { title: "Publishing", desc: "Pages web, PDFs et communication collectionneurs depuis la même structure d’œuvres.", href: "/tools/publishing" },
          { title: "Inquiries", desc: "Suivez l’intérêt collectionneur à travers œuvres et partages privés.", href: "/tools/inquiries" },
          { title: "Mobile", desc: "Publication galerie, même en déplacement.", href: "/tools/mobile" },
          { title: "Custom Operations", desc: "Workflows sur mesure adaptés à votre galerie.", href: "/tools/custom-operations" },
        ],
        featured: {
          eyebrow: "Nouveautés",
          title: "Viewing Room Studio",
          cta: "Découvrir",
          image: "/paula-cooper-background.jpg",
          href: "#viewing",
        },
      },
      solutionsMenu: {
        ctaAll: "Tous les workflows →",
        ctaAllHref: "#solutions",
        featured: {
          eyebrow: "À la une",
          title: "Composer une sélection privée",
          cta: "Découvrir les viewing rooms",
          image: "/krea/frieze-newyork-booth.png",
          href: "#viewing",
        },
        columns: [
          {
            label: "By role",
            items: [
              { title: "Galeries", desc: "Œuvres, expositions, demandes", href: "#galeries" },
              { title: "Conseillers & Marchands", desc: "Sélections privées et suivi client", href: "#conseil" },
              { title: "Artistes", desc: "Archive, séries, présentation", href: "#artistes" },
              { title: "Collectionneurs", desc: "Acquisitions et documents", href: "#collectionneurs" },
              { title: "Successions d’artistes", desc: "Corpus, provenance, transmission", href: "#estates" },
            ],
          },
          {
            label: "By area",
            items: [
              { title: "Workflow galerie", desc: "Œuvres, contacts, statuts", href: "#gallery-management" },
              { title: "Sites web", desc: "Artistes et expositions", href: "#websites" },
              { title: "Contenu social", desc: "Formats prêts à publier", href: "#social-content" },
              { title: "Marketing", desc: "Invitations et newsletters", href: "#marketing" },
            ],
          },
        ],
      },
      cta: "Discuter de votre setup",
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
        "Conçu pour la réalité opérationnelle des galeries. Des workflows connectés pour les expositions, la relation collectionneur et la diffusion des œuvres.",
      subtitle: "",
      ctaPrimary: "Discuter de votre setup",
      ctaSecondary: "Voir les outils",
    },
    viewingRoomStudio: {
      eyebrow: "Produit d’entrée · Conçu par Vitreen",
      title: "Viewing Room Studio",
      subtitle: "Présentations privées d’œuvres pour les galeries.",
      body:
        "Composez des sélections collector-ready, générez des liens privés, exportez en PDF et diffusez vos présentations par email ou WhatsApp.",
      cta: "Essayer Viewing Room Studio",
      mock: {
        label: "Private selection",
        artist: "Sacha Elron",
        title: "Untitled (Horizon)",
        year: "2024",
        medium: "Oil on canvas",
        dimensions: "152 × 122 cm",
        inquire: "Inquire",
      },
    },
    artworkSource: {
      kicker: "Couche opérationnelle",
      title: "Connecter ce que la galerie utilise déjà.",
      body:
        "Une couche légère entre les sources d’œuvres, les partages privés et les demandes collectionneurs.",
      connectedLabel: "Côté archive",
      connectedTitle: "Gardez vos sources existantes",
      connectedBody:
        "Fonctionne avec Artlogic, les fichiers CSV, les archives internes et les dossiers partagés.",
      orLabel: "→",
      nativeLabel: "Côté collectionneurs",
      nativeTitle: "Activez chaque œuvre",
      nativeBody:
        "Diffusez via Gmail, WhatsApp, liens privés et PDFs, sans ajouter une nouvelle plateforme à apprendre pour l’équipe.",
      note:
        "Vitreen est conçu pour se placer entre l’archive et les conversations collectionneurs. La galerie garde son workflow actuel ; Vitreen rend les œuvres, les échanges et les demandes plus faciles à activer.",
      features: [
        {
          label: "01",
          title: "Artwork Sync",
          copy: "Importez les œuvres sélectionnées depuis la base existante de la galerie, un CSV ou un ajout manuel.",
          image: "/gallery hero mock/artwork-02.png",
        },
        {
          label: "02",
          title: "Private Materials",
          copy: "Générez des PDFs soignés, liens privés ou viewing rooms à partir des œuvres sélectionnées.",
          image: "/viewing-room-share.png",
        },
        {
          label: "03",
          title: "Collector Sharing",
          copy: "Envoyez les œuvres par email, WhatsApp ou lien privé sans changer le workflow de la galerie.",
          image: "/gallery hero mock/shoes-exhibition.png",
        },
        {
          label: "04",
          title: "Inquiry Capture",
          copy: "Permettez aux collectionneurs de répondre, demander des détails ou faire une demande depuis le support partagé.",
          image: "/artworks/painting-06.png",
        },
        {
          label: "05",
          title: "Sales Routing",
          copy: "Redirigez les signaux collectionneurs vers la bonne personne dans l’équipe galerie.",
          image: "/gallery hero mock/frieze-newyork-booth.png",
        },
      ],
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
      title: "Et en coulisses, un espace de travail connecté aux galeries.",
      subtitle:
        "Demandes, expositions, œuvres. Le nécessaire pour publier, partager et suivre.",
      cards: [
        {
          title: "Les demandes, reliées aux œuvres.",
          desc: "Chaque demande arrive avec le contexte utile : artiste, œuvre, sélection privée ou viewing room.",
        },
        {
          title: "Préparez les expositions une seule fois.",
          desc: "Les œuvres sélectionnées alimentent les pages, les viewing rooms et les présentations collectionneurs.",
        },
        {
          title: "Des données prêtes à circuler.",
          desc: "Prix, statut, médium et informations artistes restent disponibles pour les surfaces collector-facing.",
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
      title: "Transformez les œuvres en outils collector-facing.",
      subtitle:
        "Un même artwork source alimente les pages, les sélections privées et les demandes.",
      cards: [
        {
          title: "Publishing Workspace",
          desc: "Transformez les données d’œuvres en pages, expositions, viewing rooms, PDFs et emails collectionneurs.",
        },
        {
          title: "Private Selections",
          desc: "Préparez des sélections adaptées pour collectionneurs, advisors ou previews de foires.",
        },
        {
          title: "Inquiry Layer",
          desc: "Rattachez l’intérêt collectionneur aux œuvres, viewing rooms et sélections privées sans changer vos outils clients.",
        },
      ],
    },
    viewingRoomStudioOptions: {
      kicker: "Start here · 19€/mois",
      title: "Viewing Room Studio by Vitreen.",
      subtitle:
        "Composez, partagez, convertissez. Votre premier pas avec Vitreen.",
      option: {
        label: "Produit d’entrée",
        title: "Commencer par une viewing room.",
        body:
          "Composez une sélection privée, ajoutez le contexte juste, envoyez un lien soigné et transformez l’échange en demande concrète.",
        cta: "Créer une room",
        price: "19€/mois · 110€/an",
      },
      stepper: {
        stats: ["4 étapes", "Lien privé", "Inquiry intégré"],
        steps: [
          {
            eyebrow: "Composer",
            title: "Curated selection",
            image: "",
          },
          {
            eyebrow: "Contextualiser",
            title: "Artwork details",
            image: "",
          },
          {
            eyebrow: "Partager",
            title: "Private link",
            image: "/viewing-room-share.png",
          },
          {
            eyebrow: "Convertir",
            title: "Collector inquiry",
            image: "",
          },
        ],
      },
    },
    processFlow: {
      title: "De l’archive d’œuvres au workflow collectionneur.",
      subtitle:
        "Vitreen transforme les matériaux fragmentés de la galerie en système opérationnel vivant.",
      steps: [
        {
          number: "01",
          title: "Audit",
          desc: "Nous clarifions comment votre galerie fonctionne déjà.",
          tags: ["Œuvres", "Artistes", "Collectionneurs", "Expositions", "CRM", "Email"],
          week: "Avant de reconstruire quoi que ce soit, nous identifions comment l’information, les documents et les conversations circulent déjà dans la galerie.",
        },
        {
          number: "02",
          title: "Connecter et construire",
          desc: "Vitreen transforme des sources fragmentées en workflows galerie connectés.",
          tags: ["Sélections privées", "Viewing rooms", "PDF collectionneur", "Routage des demandes", "Suivi"],
          week: "Une œuvre peut circuler entre publication, partage et relation collectionneur sans travail manuel dupliqué.",
        },
        {
          number: "03",
          title: "Déployer",
          desc: "Votre galerie reçoit une couche opérationnelle active, intégrée à son environnement de vente réel.",
          tags: ["Distribution", "Conversations collectionneurs", "Coordination commerciale", "Workflows de publication"],
          week: "Pas de remplacement de plateforme. Pas de migration lourde. Juste une infrastructure plus nette pour faire circuler les œuvres et gérer les relations collectionneurs.",
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
      title: "Tarification par déploiement",
      subtitle:
        "Vitreen est configuré autour du workflow, des outils et des besoins collector-facing de chaque galerie.",
      items: [
        {
          tier: "EXISTING SETUP",
          name: "Connected Deployment",
          description:
            "Connect Vitreen to your existing gallery workflow.",
          featuresHeading: "Inclus :",
          features: [
            "Inventory connector",
            "Viewing rooms",
            "Private selections",
            "PDF generation",
            "Inquiry layer",
            "Connected website publishing",
            "Gallery onboarding",
          ],
          delivery: undefined as string | undefined,
          price: "Custom",
          priceNote: "Configured around your current setup.",
          cta: "Discuss your setup",
          highlight: false as const,
        },
        {
          tier: "STRUCTURED SETUP",
          name: "Structured Deployment",
          description:
            "For galleries that need a cleaner structure for artworks, exhibitions and collector communication.",
          featuresHeading: "Inclus :",
          features: [
            "Custom artwork structure",
            "Structured exhibitions",
            "Viewing rooms",
            "Private selections",
            "PDF generation",
            "Inquiry layer",
            "Connected website publishing",
            "Gallery onboarding",
          ],
          delivery: undefined as string | undefined,
          price: "Custom",
          priceNote: "Structured around your publishing workflow.",
          cta: "Plan a deployment",
          highlight: false as const,
        },
        {
          tier: "CUSTOM OPERATIONS",
          name: "Custom Deployment",
          description:
            "Build a tailored structure for artworks, exhibitions, collector communication and publishing workflows.",
          featuresHeading: "Inclus :",
          features: [
            "Workflow mapping",
            "Artlogic / CSV / spreadsheet connector",
            "Private sales workflows",
            "Advanced publishing structure",
            "Custom outputs",
            "Ongoing operational support",
          ],
          delivery: undefined as string | undefined,
          price: "Custom",
          priceNote: "Adapted to your gallery.",
          cta: "Request a custom setup",
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
            "Vitreen relie vos œuvres, sélections et demandes pour rendre chaque échange plus lisible et plus facile à suivre.",
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
          a: "Non. Vitreen peut se connecter à un inventaire existant ou utiliser la Vitreen Artwork Library comme source d’œuvres.",
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
    tools: {
      sectionLabel: "Outils",
      backToHome: "Retour à l’accueil",
      featuresLabel: "Inclus",
      overview: {
        eyebrow: "Outils · Overview",
        title: "Une vue connectée des outils Vitreen.",
        subtitle: "Outils connectés pour expositions, publication et communication collectionneurs.",
        body:
          "Vitreen rassemble les outils dont une galerie a besoin pour publier des œuvres, préparer des présentations privées, partager des sélections et suivre les demandes — sans changer les habitudes de l’équipe.",
        features: [
          "Une seule source d’œuvres",
          "Publication web, PDFs et viewing rooms",
          "Partage privé pour collectionneurs",
          "Suivi des demandes par œuvre",
        ],
        cta: "Discuter de votre setup",
      },
      archive: {
        eyebrow: "Outils · Archive",
        title: "Œuvres, artistes et expositions, organisés.",
        subtitle: "Œuvres, artistes et expositions organisés autour de votre workflow.",
        body:
          "Archive sert de base structurée pour les œuvres de la galerie : artistes, expositions, médiums, dimensions, statuts. Les données restent disponibles pour les pages publiques, les viewing rooms et les supports envoyés aux collectionneurs.",
        features: [
          "Fiches œuvres, artistes et expositions",
          "Statuts, prix et disponibilités",
          "Médiums, dimensions et provenance",
          "Connexion possible à un inventaire existant",
        ],
        cta: "Structurer l’archive",
      },
      "viewing-rooms": {
        eyebrow: "Outils · Viewing Rooms",
        title: "Présentations privées pour collectionneurs.",
        subtitle: "Présentations privées pour collectionneurs et expositions.",
        body:
          "Préparez une sélection d’œuvres dans un espace privé : contexte d’exposition, fiches détaillées et lien partageable. Les viewing rooms s’ouvrent sur invitation, dans une interface lisible et confidentielle.",
        features: [
          "Sélection privée par collectionneur",
          "Contexte d’exposition et fiches œuvres",
          "Lien à durée et accès limités",
          "Demande directe depuis chaque œuvre",
        ],
        cta: "Découvrir les viewing rooms",
        badge: "Bientôt",
      },
      previews: {
        eyebrow: "Outils · Previews",
        title: "Présentations privées d’œuvres.",
        subtitle: "Présentations privées d’œuvres pour collectionneurs.",
        body:
          "Composez rapidement un aperçu d’œuvres à envoyer avant une foire, une exposition ou une rencontre. Une mise en page sobre, partagée par lien privé, email ou WhatsApp.",
        features: [
          "Sélection rapide d’œuvres",
          "Fiches d’œuvre soignées",
          "Partage par lien, email ou WhatsApp",
          "Export PDF prêt à envoyer",
        ],
        cta: "Préparer une preview",
      },
      publishing: {
        eyebrow: "Outils · Publishing",
        title: "Publier depuis une seule source.",
        subtitle: "Pages web, PDFs et communication collectionneurs depuis la même structure d’œuvres.",
        body:
          "Publishing transforme les données d’œuvres en pages publiques, archives d’expositions, PDFs et emails envoyés aux collectionneurs — sans saisir les informations deux fois.",
        features: [
          "Pages œuvres, artistes et expositions",
          "Archives d’expositions",
          "Exports PDF et présentations imprimables",
          "Emails collectionneurs construits depuis les œuvres",
        ],
        cta: "Voir le publishing",
      },
      inquiries: {
        eyebrow: "Outils · Inquiries",
        title: "Suivre l’intérêt collectionneur.",
        subtitle: "Suivez l’intérêt collectionneur à travers œuvres et partages privés.",
        body:
          "Inquiries rattache chaque demande à une œuvre, une viewing room ou une sélection privée. La galerie garde le contexte utile pour répondre : qui, sur quoi, depuis quel partage.",
        features: [
          "Demandes liées aux œuvres",
          "Contexte de viewing room ou sélection",
          "Statut, suivi et notes internes",
          "Compatible avec les outils clients existants",
        ],
        cta: "Activer les demandes",
      },
      mobile: {
        eyebrow: "Outils · Mobile",
        title: "La galerie publie depuis son téléphone.",
        subtitle: "Publication galerie, même en déplacement.",
        body:
          "Mobile permet à la galerie de publier une œuvre, mettre à jour une fiche ou préparer un partage privé depuis son téléphone — sur un stand, en transit ou pendant un accrochage.",
        features: [
          "Ajout d’une œuvre depuis le téléphone",
          "Mise à jour rapide d’une fiche",
          "Partage privé en quelques pressions",
          "Suivi des demandes en mobilité",
        ],
        cta: "Essayer Mobile",
      },
      "custom-operations": {
        eyebrow: "Outils · Custom Operations",
        title: "Adapter Vitreen au workflow de la galerie.",
        subtitle: "Workflows sur mesure adaptés à votre galerie.",
        body:
          "Custom Operations permet d’ajuster Vitreen aux opérations propres à la galerie : champs spécifiques, intégrations à des outils existants, automatisations internes ou modèles de partage propres au programme.",
        features: [
          "Champs et statuts personnalisés",
          "Intégrations avec outils existants",
          "Automatisations internes",
          "Modèles de partage propres à la galerie",
        ],
        cta: "Discuter du workflow",
      },
    },
    ctaBand: {
      title: "Commencez avec votre workflow actuel",
      subtitle: "Ajoutez les outils dont votre galerie a besoin",
      cta: "Discuter de votre setup",
    },
    footer: {
      copy: "© 2025 — Outils collector-facing pour galeries d’art contemporain",
      switchTo: "EN",
      currentLang: "FR",
    },
  },
  en: {
    nav: {
      links: [
        { label: "Tools", href: "#tools", menu: "product" as const },
        { label: "Workflows", href: "#solutions", menu: "solutions" as const },
        { label: "Deployment", href: "#offre" },
        { label: "Blog", href: "#blog" },
        { label: "About", href: "#approche" },
      ],
      productMenu: {
        sectionLabel: "Tools",
        items: [
          { title: "Overview", desc: "Connected tools for exhibitions, publishing and collector communication.", href: "/tools/overview" },
          { title: "Archive", desc: "Artworks, artists and exhibitions organized around your workflow.", href: "/tools/archive" },
          { title: "Viewing Rooms", desc: "Private presentations for collectors and exhibitions.", href: "/tools/viewing-rooms", badge: "Soon" },
          { title: "Previews", desc: "Private artwork presentations for collectors.", href: "/tools/previews" },
          { title: "Publishing", desc: "Website pages, PDFs and collector communication from the same artwork structure.", href: "/tools/publishing" },
          { title: "Inquiries", desc: "Track collector interest across artworks and private sharing.", href: "/tools/inquiries" },
          { title: "Mobile", desc: "Gallery publishing, on the go.", href: "/tools/mobile" },
          { title: "Custom Operations", desc: "Tailored workflows adapted to your gallery.", href: "/tools/custom-operations" },
        ],
        featured: {
          eyebrow: "What's new",
          title: "Viewing Room Studio",
          cta: "Discover",
          image: "/paula-cooper-background.jpg",
          href: "#viewing",
        },
      },
      solutionsMenu: {
        ctaAll: "All workflows →",
        ctaAllHref: "#solutions",
        featured: {
          eyebrow: "Featured",
          title: "Build a private selection",
          cta: "Explore viewing rooms",
          image: "/krea/frieze-newyork-booth.png",
          href: "#viewing",
        },
        columns: [
          {
            label: "By role",
            items: [
              { title: "Galleries", desc: "Artworks, shows, inquiries", href: "#galleries" },
              { title: "Advisors and dealers", desc: "Private selections and client follow-up", href: "#conseil" },
              { title: "Artists", desc: "Archive, series, presentation", href: "#artistes" },
              { title: "Collectors", desc: "Acquisitions and documents", href: "#collectionneurs" },
              { title: "Artist Estates", desc: "Corpus, provenance, stewardship", href: "#estates" },
            ],
          },
          {
            label: "By area",
            items: [
              { title: "Gallery workflow", desc: "Works, contacts, statuses", href: "#gallery-management" },
              { title: "Websites", desc: "Artists and exhibitions", href: "#websites" },
              { title: "Social content", desc: "Ready-to-publish formats", href: "#social-content" },
              { title: "Marketing", desc: "Invites and newsletters", href: "#marketing" },
            ],
          },
        ],
      },
      cta: "Discuss your setup",
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
        "Built for the operational reality of galleries. Connected workflows for exhibitions, collector outreach and artwork distribution",
      subtitle: "",
      ctaPrimary: "Discuss your setup",
      ctaSecondary: "View tools",
    },
    viewingRoomStudio: {
      eyebrow: "Entry product · Built by Vitreen",
      title: "Viewing Room Studio",
      subtitle: "Private artwork presentations for galleries.",
      body:
        "Create collector-ready artwork selections, generate private links, export PDFs and distribute presentations instantly by email or WhatsApp.",
      cta: "Try Viewing Room Studio",
      mock: {
        label: "Private selection",
        artist: "Sacha Elron",
        title: "Untitled (Horizon)",
        year: "2024",
        medium: "Oil on canvas",
        dimensions: "152 × 122 cm",
        inquire: "Inquire",
      },
    },
    artworkSource: {
      kicker: "Operational layer",
      title: "Connect what the gallery already uses.",
      body:
        "A lightweight layer between artwork sources, private sharing and collector inquiries.",
      connectedLabel: "Archive side",
      connectedTitle: "Keep your existing sources",
      connectedBody:
        "Works with Artlogic, CSV files, internal archives and shared folders.",
      orLabel: "→",
      nativeLabel: "Collector side",
      nativeTitle: "Activate every artwork",
      nativeBody:
        "Distribute through Gmail, WhatsApp, private links and PDFs, without adding a new platform for the team to learn.",
      note:
        "Designed to sit between the archive and collector conversations. The gallery keeps its current workflow; Vitreen makes it easier to activate artworks, conversations and inquiries.",
      features: [
        {
          label: "01",
          title: "Artwork Sync",
          copy: "Pull selected works from the gallery’s existing database, CSV, or manual upload.",
          image: "/gallery hero mock/artwork-02.png",
        },
        {
          label: "02",
          title: "Private Materials",
          copy: "Generate polished PDFs, private links, or viewing rooms from the selected works.",
          image: "/viewing-room-share.png",
        },
        {
          label: "03",
          title: "Collector Sharing",
          copy: "Send works through email, WhatsApp, or a private link without changing the gallery’s workflow.",
          image: "/gallery hero mock/shoes-exhibition.png",
        },
        {
          label: "04",
          title: "Inquiry Capture",
          copy: "Let collectors reply, ask for details, or inquire directly from the shared material.",
          image: "/artworks/painting-06.png",
        },
        {
          label: "05",
          title: "Sales Routing",
          copy: "Route collector signals back to the right person in the gallery team.",
          image: "/gallery hero mock/frieze-newyork-booth.png",
        },
      ],
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
      title: "And behind the scenes, a workspace connected to galleries.",
      subtitle:
        "Inquiries, exhibitions, artworks. The tools needed to publish, share and follow up.",
      cards: [
        {
          title: "Inquiries linked to artworks.",
          desc: "Every inquiry arrives with useful context: artist, artwork, private selection or viewing room.",
        },
        {
          title: "Prepare exhibitions once.",
          desc: "Selected artworks feed pages, viewing rooms and collector presentations.",
        },
        {
          title: "Artwork data ready to move.",
          desc: "Price, status, medium and artist information stay available for collector-facing surfaces.",
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
      title: "Turn artwork data into collector-facing tools.",
      subtitle:
        "One artwork source feeds pages, private selections and inquiries.",
      cards: [
        {
          title: "Publishing Workspace",
          desc: "Turn artwork data into website pages, exhibitions, viewing rooms, PDFs and collector emails.",
        },
        {
          title: "Private Selections",
          desc: "Prepare tailored selections for collectors, advisors or fair previews.",
        },
        {
          title: "Inquiry Layer",
          desc: "Attach collector interest to artworks, viewing rooms and private selections without changing your client tools.",
        },
      ],
    },
    viewingRoomStudioOptions: {
      kicker: "Start here · €19/month",
      title: "Viewing Room Studio by Vitreen.",
      subtitle:
        "Compose, share, convert. Your first step with Vitreen.",
      option: {
        label: "Entry product",
        title: "Start with a viewing room.",
        body:
          "Build a private selection, add the right context, send a polished link, and turn the exchange into a concrete inquiry.",
        cta: "Create a room",
        price: "€19/month · €110/year",
      },
      stepper: {
        stats: ["4 steps", "Private link", "Built-in inquiry"],
        steps: [
          {
            eyebrow: "Compose",
            title: "Curated selection",
            image: "",
          },
          {
            eyebrow: "Context",
            title: "Artwork details",
            image: "",
          },
          {
            eyebrow: "Share",
            title: "Private link",
            image: "/viewing-room-share.png",
          },
          {
            eyebrow: "Convert",
            title: "Collector inquiry",
            image: "",
          },
        ],
      },
    },
    processFlow: {
      title: "From artwork archive to collector workflow",
      subtitle:
        "Vitreen connects what galleries already use",
      steps: [
        {
          number: "01",
          title: "Audit",
          desc: "We review how artworks and information already move across the gallery.",
          tags: ["Artworks", "Artists", "Collectors", "Exhibitions", "CRM", "Email"],
          week: "",
        },
        {
          number: "02",
          title: "Connect & build",
          desc: "Vitreen connects artwork files, selections and collector communication into one flow.",
          tags: ["Private selections", "Viewing rooms", "Collector PDFs", "Inquiry routing", "Follow-up systems"],
          week: "",
        },
        {
          number: "03",
          title: "Deploy",
          desc: "Your gallery receives a live operational layer embedded into its real sales environment.",
          tags: ["Distribution", "Collector conversations", "Sales coordination", "Publishing workflows"],
          week: "No platform replacement. No heavy migration process. Just a sharper infrastructure for circulating artworks and managing collector relationships.",
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
      title: "Deployment-based pricing",
      subtitle:
        "Vitreen is configured around each gallery’s existing workflow, tools and collector-facing needs.",
      items: [
        {
          tier: "EXISTING SETUP",
          name: "Connected Deployment",
          description:
            "Connect Vitreen to your existing gallery workflow.",
          featuresHeading: "Included:",
          features: [
            "Inventory connector",
            "Viewing rooms",
            "Private selections",
            "PDF generation",
            "Inquiry layer",
            "Connected website publishing",
            "Gallery onboarding",
          ],
          delivery: undefined as string | undefined,
          price: "Custom",
          priceNote: "Configured around your current setup.",
          cta: "Discuss your setup",
          highlight: false as const,
        },
        {
          tier: "STRUCTURED SETUP",
          name: "Structured Deployment",
          description:
            "For galleries that need a cleaner structure for artworks, exhibitions and collector communication.",
          featuresHeading: "Included:",
          features: [
            "Custom artwork structure",
            "Structured exhibitions",
            "Viewing rooms",
            "Private selections",
            "PDF generation",
            "Inquiry layer",
            "Connected website publishing",
            "Gallery onboarding",
          ],
          delivery: undefined as string | undefined,
          price: "Custom",
          priceNote: "Structured around your publishing workflow.",
          cta: "Plan a deployment",
          highlight: false as const,
        },
        {
          tier: "CUSTOM OPERATIONS",
          name: "Custom Deployment",
          description:
            "Build a tailored structure for artworks, exhibitions, collector communication and publishing workflows.",
          featuresHeading: "Included:",
          features: [
            "Workflow mapping",
            "Artlogic / CSV / spreadsheet connector",
            "Private sales workflows",
            "Advanced publishing structure",
            "Custom outputs",
            "Ongoing operational support",
          ],
          delivery: undefined as string | undefined,
          price: "Custom",
          priceNote: "Adapted to your gallery.",
          cta: "Request a custom setup",
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
            "Vitreen connects artworks, selections and inquiries so every exchange is clearer and easier to follow.",
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
          a: "No. Vitreen can connect to an existing inventory or use the Vitreen Artwork Library as your artwork source.",
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
    tools: {
      sectionLabel: "Tools",
      backToHome: "Back to home",
      featuresLabel: "Included",
      overview: {
        eyebrow: "Tools · Overview",
        title: "A connected view of Vitreen tools.",
        subtitle: "Connected tools for exhibitions, publishing and collector communication.",
        body:
          "Vitreen brings together the tools a gallery needs to publish artworks, prepare private presentations, share selections and follow inquiries — without changing how the team already works.",
        features: [
          "A single artwork source",
          "Web pages, PDFs and viewing rooms",
          "Private sharing for collectors",
          "Inquiry tracking per artwork",
        ],
        cta: "Discuss your setup",
      },
      archive: {
        eyebrow: "Tools · Archive",
        title: "Artworks, artists and exhibitions, organized.",
        subtitle: "Artworks, artists and exhibitions organized around your workflow.",
        body:
          "Archive provides a structured base for the gallery's artworks: artists, exhibitions, mediums, dimensions, status. The data stays available for public pages, viewing rooms and collector materials.",
        features: [
          "Artwork, artist and exhibition records",
          "Status, prices and availability",
          "Mediums, dimensions and provenance",
          "Connects to an existing inventory",
        ],
        cta: "Structure the archive",
      },
      "viewing-rooms": {
        eyebrow: "Tools · Viewing Rooms",
        title: "Private presentations for collectors.",
        subtitle: "Private presentations for collectors and exhibitions.",
        body:
          "Prepare a selection of artworks in a private space: exhibition context, detailed records and a shareable link. Viewing rooms open by invitation, in a readable and confidential interface.",
        features: [
          "Private selection per collector",
          "Exhibition context and artwork records",
          "Time-limited and access-limited links",
          "Direct inquiry from each artwork",
        ],
        cta: "Explore viewing rooms",
        badge: "Soon",
      },
      previews: {
        eyebrow: "Tools · Previews",
        title: "Private artwork presentations.",
        subtitle: "Private artwork presentations for collectors.",
        body:
          "Quickly assemble a preview of artworks to send ahead of a fair, an exhibition or a meeting. A calm layout, shared by private link, email or WhatsApp.",
        features: [
          "Fast artwork selection",
          "Refined artwork records",
          "Sharing by link, email or WhatsApp",
          "PDF export ready to send",
        ],
        cta: "Prepare a preview",
      },
      publishing: {
        eyebrow: "Tools · Publishing",
        title: "Publish from a single source.",
        subtitle: "Website pages, PDFs and collector communication from the same artwork structure.",
        body:
          "Publishing turns artwork data into public pages, exhibition archives, PDFs and emails sent to collectors — without entering the information twice.",
        features: [
          "Artwork, artist and exhibition pages",
          "Exhibition archives",
          "PDF exports and printable presentations",
          "Collector emails built from artworks",
        ],
        cta: "See publishing",
      },
      inquiries: {
        eyebrow: "Tools · Inquiries",
        title: "Track collector interest.",
        subtitle: "Track collector interest across artworks and private sharing.",
        body:
          "Inquiries attaches each request to an artwork, a viewing room or a private selection. The gallery keeps the context needed to respond: who, on what, from which share.",
        features: [
          "Inquiries linked to artworks",
          "Viewing room or selection context",
          "Status, follow-up and internal notes",
          "Works with existing client tools",
        ],
        cta: "Activate inquiries",
      },
      mobile: {
        eyebrow: "Tools · Mobile",
        title: "The gallery publishes from its phone.",
        subtitle: "Gallery publishing, on the go.",
        body:
          "Mobile lets the gallery publish an artwork, update a record or prepare a private share from a phone — on a booth, in transit or during a hang.",
        features: [
          "Add an artwork from the phone",
          "Quick record updates",
          "Private sharing in a few taps",
          "Inquiry follow-up on the move",
        ],
        cta: "Try Mobile",
      },
      "custom-operations": {
        eyebrow: "Tools · Custom Operations",
        title: "Adapt Vitreen to the gallery's workflow.",
        subtitle: "Tailored workflows adapted to your gallery.",
        body:
          "Custom Operations adjusts Vitreen to a gallery's specific operations: dedicated fields, integrations with existing tools, internal automations or sharing templates tied to the programme.",
        features: [
          "Custom fields and statuses",
          "Integrations with existing tools",
          "Internal automations",
          "Sharing templates tied to the gallery",
        ],
        cta: "Discuss the workflow",
      },
    },
    ctaBand: {
      title: "Start with your current workflow",
      subtitle: "Add the tools your gallery needs",
      cta: "Discuss your setup",
    },
    footer: {
      copy: "\u00a9 2025 \u2014 Collector-facing tools for contemporary art galleries",
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
