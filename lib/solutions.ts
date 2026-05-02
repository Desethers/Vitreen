// Audience-first solutions taxonomy with jobs-to-be-done nested.
// Each solution = a kind of customer; each job = a thing they need to do
// + the products that solve it.

export type Job = {
  title: string
  description: string
  products: string[]  // product slugs from lib/products.ts
}

export type Solution = {
  slug: string
  nameFr: string;       nameEn: string
  shortFr: string;      shortEn: string
  heroFr: string;       heroEn: string
  pitchFr: string;      pitchEn: string
  whoFr: string;        whoEn: string  // who exactly is this for
  jobsFr: Job[]
  jobsEn: Job[]
  swatchBg: string
  swatchFg: string
  swatchSerif?: boolean
}

export const SOLUTIONS: Solution[] = [
  {
    slug: 'galleries',
    nameFr: 'Galeries', nameEn: 'Galleries',
    shortFr: 'Galeries d’art contemporain, de l’émergente à l’établie.',
    shortEn: 'Contemporary art galleries, from emerging to established.',
    heroFr: 'Le système d’exploitation des galeries d’art contemporain.',
    heroEn: 'The operating system for contemporary art galleries.',
    pitchFr: 'Tout ce qu’une galerie fait, dans un seul environnement : représenter des artistes, monter des expositions, vendre des œuvres, suivre les collectionneurs, faire les foires. Modulaire — choisissez les outils dont vous avez besoin maintenant, ajoutez le reste quand vous serez prêt.',
    pitchEn: 'Everything a gallery does, in one environment: representing artists, mounting exhibitions, selling works, tracking collectors, doing fairs. Modular — pick the tools you need now, add the rest when you’re ready.',
    whoFr: 'De la galerie d’une personne avec 4 artistes à la maison internationale avec 30 artistes et 8 foires par an.',
    whoEn: 'From the one-person gallery with 4 artists to the international house with 30 artists and 8 fairs a year.',
    jobsFr: [
      { title: 'Vendre à un collectionneur', description: 'Composer une viewing room privée, l’envoyer, suivre l’ouverture, conclure.', products: ['canvas', 'pocket', 'studio', 'desk', 'bond'] },
      { title: 'Représenter votre programme', description: 'Site public, pages artistes, archives d’expositions — tout l’extérieur de la galerie.', products: ['sites', 'roster', 'archive'] },
      { title: 'Tenir l’inventaire', description: 'Toutes les œuvres, leur statut, leur localisation, leurs photos — la source de vérité.', products: ['vault', 'pact'] },
      { title: 'Faire les foires', description: 'De la présélection au debrief, en passant par la douane et les viewing rooms VIPs.', products: ['booth', 'pocket', 'bond'] },
      { title: 'Communiquer à votre liste', description: 'Vernissages, expositions, présence en foire — sans Mailchimp.', products: ['wire', 'bond'] },
      { title: 'Fermer la vente', description: 'Facture, TVA, commission artiste, paiement — proprement.', products: ['ledger', 'pact'] },
    ],
    jobsEn: [
      { title: 'Sell to a collector', description: 'Compose a private viewing room, send it, track the open, close.', products: ['canvas', 'pocket', 'studio', 'desk', 'bond'] },
      { title: 'Represent your programme', description: 'Public site, artist pages, exhibition archives — everything the outside sees.', products: ['sites', 'roster', 'archive'] },
      { title: 'Hold inventory', description: 'Every work, its status, its location, its photos — the source of truth.', products: ['vault', 'pact'] },
      { title: 'Do the fairs', description: 'From pre-selection to debrief, with customs and VIP viewing rooms in between.', products: ['booth', 'pocket', 'bond'] },
      { title: 'Communicate to your list', description: 'Openings, exhibitions, fair presence — without Mailchimp.', products: ['wire', 'bond'] },
      { title: 'Close the sale', description: 'Invoice, VAT, artist commission, payment — cleanly.', products: ['ledger', 'pact'] },
    ],
    swatchBg: '#FAF6EE', swatchFg: '#1C1814', swatchSerif: true,
  },
  {
    slug: 'artists',
    nameFr: 'Artistes', nameEn: 'Artists',
    shortFr: 'Artistes qui se représentent eux-mêmes ou complètent leur galerie.',
    shortEn: 'Artists who self-represent or complement their gallery.',
    heroFr: 'Votre œuvre mérite un espace à elle, sans dépendre d’un développeur.',
    heroEn: 'Your work deserves a space of its own — without depending on a developer.',
    pitchFr: 'Un portfolio en ligne sérieux, des viewing rooms à envoyer directement à des collectionneurs ou des galeries, le suivi de vos consignations chez vos galeries. Pour les artistes qui prennent leur carrière en main.',
    pitchEn: 'A serious online portfolio, viewing rooms you can send directly to collectors or galleries, tracking your consignments at your galleries. For artists who take charge of their career.',
    whoFr: 'Artistes émergents sans galerie, mid-career qui complètent une galerie, ou established qui veulent contrôler leur image en ligne.',
    whoEn: 'Emerging artists without a gallery, mid-career complementing a gallery, or established wanting to control their online presence.',
    jobsFr: [
      { title: 'Avoir un portfolio en ligne', description: 'Site bilingue, pages séries, CV d’expositions — vous ressemble, pas à un template SaaS.', products: ['sites', 'roster'] },
      { title: 'Envoyer une œuvre à un collectionneur', description: 'Une viewing room privée, sans paraître commercial.', products: ['canvas', 'studio', 'pocket'] },
      { title: 'Démarcher des galeries', description: 'Un dossier propre à envoyer aux galeries qui vous intéressent.', products: ['proof', 'roster'] },
      { title: 'Suivre vos consignations', description: 'Quelle œuvre est où, chez quelle galerie, depuis quand.', products: ['pact', 'vault'] },
    ],
    jobsEn: [
      { title: 'Have a serious online portfolio', description: 'Bilingual site, series pages, exhibition CV — looks like you, not a SaaS template.', products: ['sites', 'roster'] },
      { title: 'Send a work to a collector', description: 'A private viewing room, without sounding commercial.', products: ['canvas', 'studio', 'pocket'] },
      { title: 'Approach galleries', description: 'A clean dossier to send to galleries you’re interested in.', products: ['proof', 'roster'] },
      { title: 'Track your consignments', description: 'Which work is where, at which gallery, since when.', products: ['pact', 'vault'] },
    ],
    swatchBg: '#1F2C24', swatchFg: '#E4DCC2', swatchSerif: true,
  },
  {
    slug: 'advisors',
    nameFr: 'Conseillers & Marchands', nameEn: 'Advisors & Dealers',
    shortFr: 'Conseillers en art, marchands privés, courtiers indépendants.',
    shortEn: 'Art advisors, private dealers, independent brokers.',
    heroFr: 'Curatez pour vos clients comme un galeriste, sans la galerie.',
    heroEn: 'Curate for your clients like a gallerist, without the gallery.',
    pitchFr: 'Vous achetez et vendez sans avoir de mur. Vous avez besoin d’une vitrine professionnelle pour vos sélections, d’un CRM sérieux pour vos clients, et d’une comptabilité propre. Vitreen, sans la partie « représenter un programme ».',
    pitchEn: 'You buy and sell without owning a wall. You need a professional showcase for your selections, a serious CRM for your clients, and clean books. Vitreen, without the "represent a programme" part.',
    whoFr: 'Conseillers privés indépendants, art advisors d’institutions, marchands secondaires.',
    whoEn: 'Independent private advisors, institutional art advisors, secondary-market dealers.',
    jobsFr: [
      { title: 'Présenter une sélection à un client', description: 'Une viewing room privée par client, à votre nom, pas à celui d’une galerie.', products: ['canvas', 'pocket', 'proof'] },
      { title: 'Suivre vos clients', description: 'Préférences, historique d’achats, échanges en cours.', products: ['bond'] },
      { title: 'Tenir vos affaires', description: 'Œuvres en cours, factures, commissions.', products: ['vault', 'ledger'] },
    ],
    jobsEn: [
      { title: 'Present a selection to a client', description: 'A private viewing room per client, in your name, not a gallery’s.', products: ['canvas', 'pocket', 'proof'] },
      { title: 'Track your clients', description: 'Preferences, purchase history, ongoing exchanges.', products: ['bond'] },
      { title: 'Run your business', description: 'Active works, invoices, commissions.', products: ['vault', 'ledger'] },
    ],
    swatchBg: '#15110D', swatchFg: '#D4A04C', swatchSerif: true,
  },
  {
    slug: 'collectors',
    nameFr: 'Collectionneurs', nameEn: 'Collectors',
    shortFr: 'Collections privées, sérieuses, à long terme.',
    shortEn: 'Private collections, serious, long-term.',
    heroFr: 'Votre collection mérite mieux qu’un tableur Excel.',
    heroEn: 'Your collection deserves more than an Excel spreadsheet.',
    pitchFr: 'Cataloguer vos œuvres avec leurs certificats, suivre leur valeur, gérer les prêts aux institutions, archiver les viewing rooms reçues de vos galeries. Pour les collectionneurs qui pensent à long terme — et à la transmission.',
    pitchEn: 'Catalogue your works with their certificates, track their value, manage loans to institutions, archive the viewing rooms received from your galleries. For collectors who think long-term — and about transmission.',
    whoFr: 'Collectionneurs privés au-delà de 30 œuvres. Single-family offices culturels.',
    whoEn: 'Private collectors past 30 works. Cultural single-family offices.',
    jobsFr: [
      { title: 'Cataloguer votre collection', description: 'Toutes vos œuvres, leurs photos, certificats, valeurs, lieux.', products: ['vault'] },
      { title: 'Recevoir et archiver les viewing rooms', description: 'Les propositions de vos galeries, classées et consultables à long terme.', products: ['canvas', 'pocket'] },
      { title: 'Prêter à un musée', description: 'Conventions, transit, retour, condition reports.', products: ['loans'] },
    ],
    jobsEn: [
      { title: 'Catalogue your collection', description: 'All your works, their photos, certificates, values, locations.', products: ['vault'] },
      { title: 'Receive and archive viewing rooms', description: 'Proposals from your galleries, sorted and browsable long-term.', products: ['canvas', 'pocket'] },
      { title: 'Loan to a museum', description: 'Agreements, transit, return, condition reports.', products: ['loans'] },
    ],
    swatchBg: '#2A1418', swatchFg: '#E8B4B8', swatchSerif: true,
  },
  {
    slug: 'estates',
    nameFr: 'Estates d’artistes', nameEn: 'Artist Estates',
    shortFr: 'Successions, ayants droit, fondations artistiques.',
    shortEn: 'Estates, beneficiaries, artist foundations.',
    heroFr: 'Le catalogue raisonné, vivant et tenu à jour.',
    heroEn: 'The catalogue raisonné, living and up to date.',
    pitchFr: 'Pour les estates : tenir le catalogue raisonné de l’œuvre, authentifier les œuvres qui apparaissent sur le marché, gérer les prêts aux institutions, contrôler les expositions et publications. La rigueur scientifique de l’institution avec les outils du XXIᵉ siècle.',
    pitchEn: 'For estates: hold the catalogue raisonné, authenticate works appearing on the market, manage loans to institutions, control exhibitions and publications. Institutional rigour with 21st-century tools.',
    whoFr: 'Estates d’artistes décédés, fondations d’artistes vivants, héritiers gestionnaires.',
    whoEn: 'Estates of deceased artists, foundations of living artists, managing heirs.',
    jobsFr: [
      { title: 'Tenir le catalogue raisonné', description: 'Toutes les œuvres connues, datées, classées, avec provenance.', products: ['vault', 'archive'] },
      { title: 'Gérer les prêts aux institutions', description: 'Conventions, assurance, transit, condition reports.', products: ['loans'] },
      { title: 'Contrôler les expositions', description: 'Suivi des expositions présentes et passées de l’œuvre.', products: ['archive', 'roster'] },
    ],
    jobsEn: [
      { title: 'Hold the catalogue raisonné', description: 'All known works, dated, classified, with provenance.', products: ['vault', 'archive'] },
      { title: 'Manage institutional loans', description: 'Agreements, insurance, transit, condition reports.', products: ['loans'] },
      { title: 'Control exhibitions', description: 'Track all current and past exhibitions of the work.', products: ['archive', 'roster'] },
    ],
    swatchBg: '#1A1F3A', swatchFg: '#E8E1D0', swatchSerif: true,
  },
  {
    slug: 'institutions',
    nameFr: 'Institutions & Foires', nameEn: 'Institutions & Fairs',
    shortFr: 'Musées privés, fondations, organisateurs de foires.',
    shortEn: 'Private museums, foundations, fair organisers.',
    heroFr: 'L’infrastructure invisible des institutions de l’art.',
    heroEn: 'The invisible infrastructure of art institutions.',
    pitchFr: 'Les institutions partagent les besoins des galeries — inventaire, archive, prêts — avec une dimension supplémentaire : la rigueur scientifique et la gouvernance multi-utilisateur. Vitreen sert l’institution comme il sert la galerie.',
    pitchEn: 'Institutions share gallery needs — inventory, archive, loans — with one extra dimension: scientific rigour and multi-user governance. Vitreen serves the institution as it serves the gallery.',
    whoFr: 'Musées privés, fondations d’art, organisateurs de foires régionales et internationales.',
    whoEn: 'Private museums, art foundations, organisers of regional and international fairs.',
    jobsFr: [
      { title: 'Tenir une collection institutionnelle', description: 'Inventaire à plusieurs accès, traçabilité, condition reports.', products: ['vault', 'loans'] },
      { title: 'Archiver les expositions et publications', description: 'Histoire de l’institution, vivante, citable.', products: ['archive', 'sites'] },
      { title: 'Organiser une foire', description: 'Gérer les exposants, les viewing rooms VIPs, les transports collectifs.', products: ['booth', 'pocket'] },
    ],
    jobsEn: [
      { title: 'Hold an institutional collection', description: 'Multi-user inventory, traceability, condition reports.', products: ['vault', 'loans'] },
      { title: 'Archive exhibitions and publications', description: 'Institutional history, living and citable.', products: ['archive', 'sites'] },
      { title: 'Organise a fair', description: 'Manage exhibitors, VIP viewing rooms, collective transit.', products: ['booth', 'pocket'] },
    ],
    swatchBg: '#0F2A4A', swatchFg: '#F0F4FA',
  },
]

export function getSolution(slug: string): Solution | undefined {
  return SOLUTIONS.find(s => s.slug === slug)
}
