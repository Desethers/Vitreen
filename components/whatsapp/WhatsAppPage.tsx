"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ContactModal from "@/components/ContactModal";
import HeroObjects from "@/components/landing/HeroObjects";
import WaPhone from "@/components/whatsapp/WaPhone";
import { WA, WaThread, type WaMessage } from "@/components/whatsapp/WaChat";
import { whatsappDemoLink } from "@/lib/whatsappDemo";

type Lang = "en" | "fr";

type UseCase = { title: string; body: string; thread: WaMessage[] };

type Copy = {
  nav: { cta: string; switchLabel: string; switchHref: string };
  hero: {
    badge: string;
    /** Title split around the three animated objects (poster, chair, dog). */
    t: [string, string, string, string];
    channel: string;
    subtitle: string;
    primary: string;
    secondary: string;
    proof: string;
  };
  phone: { name: string; status: string; placeholder: string; messages: WaMessage[] };
  say: { eyebrow: string; title: string; phrases: string[] };
  uses: { eyebrow: string; title: string; items: UseCase[] };
  statement: { lines: string[]; body: string };
  promises: { eyebrow: string; title: string; items: { title: string; body: string }[] };
  audience: { eyebrow: string; title: string; items: { title: string; body: string }[] };
  faq: { title: string; items: { q: string; a: string }[] };
  cta: { title: string; subtitle: string; button: string };
};

const IMG = {
  a: "/artworks/painting-03.jpg",
  b: "/artworks/painting-05.jpg",
  c: "/artworks/painting-08.jpg",
};

const COPY: Record<Lang, Copy> = {
  en: {
    nav: { cta: "Get your assistant", switchLabel: "FR", switchHref: "/fr/whatsapp" },
    hero: {
      badge: "Early access · WhatsApp",
      t: ["Sell what", "doesn’t sell like", "everything", "else."],
      channel: "On WhatsApp.",
      subtitle: "Your inventory and sales assistant, directly inside WhatsApp.",
      primary: "Try it on WhatsApp",
      secondary: "See it work",
      proof: "Your inventory and CRM, connected to WhatsApp. Nothing to retype.",
    },
    phone: {
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
            image: IMG.a,
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
    say: {
      eyebrow: "Just talk to it",
      title: "Talk to it like your best colleague.",
      phrases: [
        "Anything new from Elron for Marie?",
        "Elron sold.",
        "Who should see this piece?",
        "What has Thomas already seen?",
        "Make a PDF of the 5 large formats.",
        "Hold Evening Field for Marie until Friday.",
        "Price of the big blue one?",
        "Who haven’t I followed up this month?",
      ],
    },
    uses: {
      eyebrow: "One conversation",
      title: "Your whole sales desk, in one chat.",
      items: [
        {
          title: "Reply in 30 seconds",
          body: "Forward any client message. The reply comes back with the right piece, the right price, the right tone.",
          thread: [
            {
              from: "me",
              time: "18:02",
              forwarded: { label: "Forwarded", name: "Thomas Baur" },
              text: "What’s the price of the big blue one?",
            },
            {
              from: "bot",
              time: "18:02",
              text: "Probably Blue Hour (Elron, 140 × 180 cm): €9,500, available. Draft ready:\n“Dear Thomas, Blue Hour is €9,500…”",
              actions: ["Copy reply"],
            },
          ],
        },
        {
          title: "Add a piece with one photo",
          body: "Snap it, say two words. The record is created — and it asks for what’s missing.",
          thread: [
            { from: "me", time: "09:15", image: IMG.b },
            { from: "me", time: "09:15", voice: "0:12" },
            {
              from: "bot",
              time: "09:16",
              text: "Added: Lina Ores, Untitled (2025), 80 × 100 cm, €4,800. Medium is missing — oil or acrylic?",
            },
          ],
        },
        {
          title: "Remember everything",
          body: "Ask about any client. It knows what they saw, asked and received — without you filling anything in.",
          thread: [
            { from: "me", time: "14:30", text: "What has Thomas already seen?" },
            {
              from: "bot",
              time: "14:30",
              list: [
                { title: "Blue Hour", sub: "asked the price · 12 Sept." },
                { title: "Large formats selection", sub: "PDF opened 3 times" },
                { title: "Evening Field", sub: "sent · 2 Oct." },
              ],
            },
          ],
        },
        {
          title: "Move the piece that sleeps",
          body: "It finds the clients with a real reason to care, and writes a different message for each.",
          thread: [
            { from: "me", time: "11:05", text: "Who could like Evening Field?" },
            {
              from: "bot",
              time: "11:05",
              list: [
                { title: "Marie Beaumont", sub: "loves large Elrons" },
                { title: "Paul Girard", sub: "budget around €12k" },
                { title: "Anna Weiss", sub: "bought Elron in 2024" },
              ],
              actions: ["Write 3 messages"],
            },
          ],
        },
      ],
    },
    statement: {
      lines: ["Your inventory.", "Your CRM.", "Linked to WhatsApp."],
      body: "Your stock and your client records live in Vitreen, connected to your WhatsApp. Every message you forward adds to them: nothing to retype.",
    },
    promises: {
      eyebrow: "Our promises",
      title: "It sells with you. Never instead of you.",
      items: [
        {
          title: "You always send",
          body: "It prepares. You read, you send from your own phone. Nothing reaches a client without you.",
        },
        {
          title: "It never invents",
          body: "Prices, sizes and availability come only from your stock. If it doesn’t know, it says so.",
        },
        {
          title: "It doesn’t read your WhatsApp",
          body: "Your number stays as it is. It only sees what you send it.",
        },
      ],
    },
    audience: {
      eyebrow: "Who it’s for",
      title: "For people who sell rare pieces, one conversation at a time.",
      items: [
        { title: "Art galleries", body: "Collectors who write on WhatsApp, works that move fast." },
        { title: "Art advisors", body: "Clients whose taste and budget you must never forget." },
        { title: "Design & antique dealers", body: "Unique pieces, and clients who come back." },
        {
          title: "Collectible dealers",
          body: "One stock, a hundred conversations, no time to dig.",
        },
      ],
    },
    faq: {
      title: "Questions",
      items: [
        {
          q: "Do I need WhatsApp Business or a new number?",
          a: "No. Keep your WhatsApp as it is, personal or Business. Vitreen is a contact you write to.",
        },
        {
          q: "Is there an app to install?",
          a: "Nothing to install. You work from WhatsApp, and your inventory and client records (the CRM) live in Vitreen on the web, linked to it.",
        },
        {
          q: "Where do the prices come from?",
          a: "Only from your stock. Each draft shows its source so you can check before sending.",
        },
        {
          q: "How does my stock get in?",
          a: "Send us your spreadsheet or Artlogic export, or add pieces by photo straight from WhatsApp.",
        },
        {
          q: "Does it write to my clients?",
          a: "Never. It prepares, you send. Always.",
        },
        {
          q: "Who sees my data?",
          a: "Only you and your team. Your clients’ information is never shared or used for anyone else.",
        },
      ],
    },
    cta: {
      title: "Your best salesperson is one WhatsApp contact away.",
      subtitle: "Early access is open to a small number of dealers.",
      button: "Try it on WhatsApp",
    },
  },
  fr: {
    nav: { cta: "Obtenir mon assistant", switchLabel: "EN", switchHref: "/whatsapp" },
    hero: {
      badge: "Accès anticipé · WhatsApp",
      t: ["Vendez ce qui", "ne se vend pas comme", "tout le", "reste."],
      channel: "Sur WhatsApp.",
      subtitle: "Votre assistant d’inventaire et de vente, directement dans WhatsApp.",
      primary: "Essayer sur WhatsApp",
      secondary: "Le voir en action",
      proof: "Votre inventaire et votre CRM, reliés à WhatsApp. Rien à ressaisir.",
    },
    phone: {
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
            image: IMG.a,
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
    say: {
      eyebrow: "Parlez-lui",
      title: "Parlez-lui comme à votre meilleur collègue.",
      phrases: [
        "Du nouveau chez Elron pour Marie ?",
        "Elron vendu.",
        "Qui devrait voir cette pièce ?",
        "Qu’est-ce que Thomas a déjà vu ?",
        "Fais-moi un PDF des 5 grands formats.",
        "Réserve Evening Field pour Marie jusqu’à vendredi.",
        "Le prix du grand bleu ?",
        "Qui je n’ai pas relancé ce mois-ci ?",
      ],
    },
    uses: {
      eyebrow: "Une conversation",
      title: "Tout votre bureau de vente, dans un seul chat.",
      items: [
        {
          title: "Répondre en 30 secondes",
          body: "Transférez n’importe quel message client. La réponse revient avec la bonne pièce, le bon prix, le bon ton.",
          thread: [
            {
              from: "me",
              time: "18:02",
              forwarded: { label: "Transféré", name: "Thomas Baur" },
              text: "C’est combien le grand bleu ?",
            },
            {
              from: "bot",
              time: "18:02",
              text: "Sans doute Blue Hour (Elron, 140 × 180 cm) : 9 500 €, disponible. Brouillon prêt :\n« Cher Thomas, Blue Hour est à 9 500 €… »",
              actions: ["Copier la réponse"],
            },
          ],
        },
        {
          title: "Ajouter une pièce en une photo",
          body: "Une photo, deux mots. La fiche est créée — et il demande ce qui manque.",
          thread: [
            { from: "me", time: "09:15", image: IMG.b },
            { from: "me", time: "09:15", voice: "0:12" },
            {
              from: "bot",
              time: "09:16",
              text: "Ajouté : Lina Ores, Sans titre (2025), 80 × 100 cm, 4 800 €. Il manque la technique — huile ou acrylique ?",
            },
          ],
        },
        {
          title: "Se souvenir de tout",
          body: "Demandez n’importe quel client. Il sait ce qu’il a vu, demandé, reçu — sans que vous ayez rien rempli.",
          thread: [
            { from: "me", time: "14:30", text: "Qu’est-ce que Thomas a déjà vu ?" },
            {
              from: "bot",
              time: "14:30",
              list: [
                { title: "Blue Hour", sub: "a demandé le prix · 12 sept." },
                { title: "Sélection grands formats", sub: "PDF ouvert 3 fois" },
                { title: "Evening Field", sub: "envoyé · 2 oct." },
              ],
            },
          ],
        },
        {
          title: "Faire sortir la pièce qui dort",
          body: "Il trouve les clients qui ont une vraie raison de l’aimer, et écrit un message différent pour chacun.",
          thread: [
            { from: "me", time: "11:05", text: "Qui pourrait aimer Evening Field ?" },
            {
              from: "bot",
              time: "11:05",
              list: [
                { title: "Marie Beaumont", sub: "adore les grands Elron" },
                { title: "Paul Girard", sub: "budget autour de 12 k€" },
                { title: "Anna Weiss", sub: "a acheté Elron en 2024" },
              ],
              actions: ["Écrire 3 messages"],
            },
          ],
        },
      ],
    },
    statement: {
      lines: ["Votre inventaire.", "Votre CRM.", "Relié à WhatsApp."],
      body: "Votre stock et vos fiches clients vivent dans Vitreen, reliés à votre WhatsApp. Chaque message que vous transférez les enrichit : rien à ressaisir.",
    },
    promises: {
      eyebrow: "Nos engagements",
      title: "Il vend avec vous. Jamais à votre place.",
      items: [
        {
          title: "Vous envoyez, toujours",
          body: "Il prépare. Vous relisez, vous envoyez depuis votre téléphone. Rien n’arrive à un client sans vous.",
        },
        {
          title: "Il n’invente jamais",
          body: "Prix, dimensions et disponibilités viennent uniquement de votre stock. S’il ne sait pas, il le dit.",
        },
        {
          title: "Il ne lit pas votre WhatsApp",
          body: "Votre numéro reste tel quel. Il ne voit que ce que vous lui envoyez.",
        },
      ],
    },
    audience: {
      eyebrow: "Pour qui",
      title: "Pour ceux qui vendent des pièces rares, une conversation à la fois.",
      items: [
        {
          title: "Galeries d’art",
          body: "Des collectionneurs qui écrivent sur WhatsApp, des œuvres qui partent vite.",
        },
        {
          title: "Conseillers en art",
          body: "Des clients dont il ne faut jamais oublier le goût ni le budget.",
        },
        {
          title: "Design & antiquités",
          body: "Des pièces uniques, et des clients qui reviennent.",
        },
        {
          title: "Objets de collection",
          body: "Un stock, cent conversations, pas le temps de chercher.",
        },
      ],
    },
    faq: {
      title: "Questions",
      items: [
        {
          q: "Faut-il WhatsApp Business ou un nouveau numéro ?",
          a: "Non. Gardez votre WhatsApp tel quel, personnel ou Business. Vitreen est un contact à qui vous écrivez.",
        },
        {
          q: "Y a-t-il une application à installer ?",
          a: "Rien à installer. Vous travaillez depuis WhatsApp, et votre inventaire et vos fiches clients (le CRM) vivent dans Vitreen sur le web, reliés à lui.",
        },
        {
          q: "D’où viennent les prix ?",
          a: "Uniquement de votre stock. Chaque brouillon indique sa source pour vérifier avant d’envoyer.",
        },
        {
          q: "Comment mon stock arrive-t-il ?",
          a: "Envoyez-nous votre tableur ou votre export Artlogic, ou ajoutez les pièces en photo directement depuis WhatsApp.",
        },
        {
          q: "Est-ce qu’il écrit à mes clients ?",
          a: "Jamais. Il prépare, vous envoyez. Toujours.",
        },
        {
          q: "Qui voit mes données ?",
          a: "Vous et votre équipe uniquement. Les informations de vos clients ne sont jamais partagées ni utilisées pour quelqu’un d’autre.",
        },
      ],
    },
    cta: {
      title: "Votre meilleur vendeur est à un contact WhatsApp.",
      subtitle: "L’accès anticipé est ouvert à un petit nombre de marchands.",
      button: "Essayer sur WhatsApp",
    },
  },
};

const ease = [0.16, 1, 0.3, 1] as const;
const openContact = () => window.dispatchEvent(new Event("open-contact-modal"));

const SECTION = "px-4 py-20 md:px-6 md:py-28";
const CONTAINER = "mx-auto w-full max-w-6xl";
const EYEBROW = "text-[12px] font-medium uppercase tracking-[0.14em]";
const H2 =
  "mt-4 max-w-3xl text-balance font-display text-[32px] font-medium leading-[1.05] tracking-[-0.035em] text-[#111110] md:text-[56px]";

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function GreenButton({
  children,
  className = "",
  href,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
}) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-medium text-white transition-transform hover:scale-[1.02] active:scale-[0.98] ${className}`;
  const icon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.3Z" />
    </svg>
  );
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        style={{ background: WA.green }}
      >
        {icon}
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={openContact} className={cls} style={{ background: WA.green }}>
      {icon}
      {children}
    </button>
  );
}

export default function WhatsAppPage({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  const phrases = [...c.say.phrases, ...c.say.phrases];

  return (
    <main className="overflow-x-hidden bg-white text-[#111110]">
      <header className="fixed inset-x-0 top-0 z-40 bg-white/85 px-4 backdrop-blur-md md:px-6">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between">
          <Link
            href={lang === "fr" ? "/fr" : "/"}
            className="font-display text-[19px] font-medium tracking-[-0.03em]"
          >
            Vitreen
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href={c.nav.switchHref}
              className="text-[13px] text-[#6B6A67] hover:text-[#111110]"
            >
              {c.nav.switchLabel}
            </Link>
            <button
              type="button"
              onClick={openContact}
              className="rounded-full px-4 py-2 text-[13px] font-medium text-white"
              style={{ background: WA.green }}
            >
              {c.nav.cta}
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="px-4 pb-20 pt-28 md:px-6 md:pb-28 md:pt-36">
        <div
          className={`${CONTAINER} grid items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-10`}
        >
          <div className="text-center lg:text-left">
            <p
              className="hero-soft hero-d-1 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[12px] font-medium"
              style={{ background: "#E7F8F2", color: "#00795E" }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: WA.green }} />
              {c.hero.badge}
            </p>
            <h1 className="mt-6 text-balance font-display text-[clamp(38px,10vw,52px)] font-medium leading-[1.05] tracking-[-0.045em] lg:text-[76px]">
              <span className="hero-reveal hero-d-1">
                {c.hero.t[0]}
                <HeroObjects object="poster" order={0} />
              </span>{" "}
              <span className="hero-reveal hero-d-2">
                {c.hero.t[1]}
                <HeroObjects object="chair" order={1} />
              </span>{" "}
              <span className="hero-reveal hero-d-2">
                {c.hero.t[2]}
                <HeroObjects object="dog" order={2} spaceAfter={false} /> {c.hero.t[3]}
              </span>
              <span className="hero-reveal hero-d-3 mt-1 block" style={{ color: WA.green }}>
                {c.hero.channel}
              </span>
            </h1>
            <p className="hero-soft hero-d-3 mx-auto mt-6 max-w-xl text-balance text-[18px] leading-[1.45] text-[#6B6A67] md:text-[20px] lg:mx-0">
              {c.hero.subtitle}
            </p>
            <div className="hero-soft hero-d-4 mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <GreenButton href={whatsappDemoLink(lang)} className="w-full sm:w-auto">
                {c.hero.primary}
              </GreenButton>
              <a
                href="#uses"
                className="w-full rounded-full border border-[#E8E8E6] px-6 py-3.5 text-center text-[15px] font-medium hover:border-[#ADADAA] sm:w-auto"
              >
                {c.hero.secondary}
              </a>
            </div>
            <p className="hero-soft hero-d-4 mt-6 text-[13px] text-[#ADADAA]">{c.hero.proof}</p>
          </div>

          <div className="hero-soft hero-d-2">
            <WaPhone
              name={c.phone.name}
              status={c.phone.status}
              placeholder={c.phone.placeholder}
              messages={c.phone.messages}
            />
          </div>
        </div>
      </section>

      {/* What you say */}
      <section className="overflow-hidden py-20 md:py-24" style={{ background: WA.wallpaper }}>
        <div className={`${CONTAINER} px-4 md:px-6`}>
          <Reveal>
            <p className={EYEBROW} style={{ color: "#00795E" }}>
              {c.say.eyebrow}
            </p>
            <h2 className={H2}>{c.say.title}</h2>
          </Reveal>
        </div>
        <div className="mt-12 flex flex-col gap-3">
          {[0, 1].map((row) => (
            <motion.div
              key={row}
              className="flex w-max gap-3"
              animate={{ x: row === 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
              transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            >
              {(row === 0 ? phrases : [...phrases].reverse()).map((p, i) => (
                <span
                  key={`${row}-${i}`}
                  className="whitespace-nowrap rounded-[14px] px-5 py-3 text-[16px] shadow-[0_1px_0.5px_rgba(11,20,26,0.13)] md:text-[18px]"
                  style={{ background: i % 3 === 0 ? WA.me : "#FFFFFF", color: WA.ink }}
                >
                  {p}
                </span>
              ))}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Use cases */}
      <section id="uses" className={`${SECTION} scroll-mt-16`}>
        <div className={CONTAINER}>
          <Reveal>
            <p className={EYEBROW} style={{ color: "#00795E" }}>
              {c.uses.eyebrow}
            </p>
            <h2 className={H2}>{c.uses.title}</h2>
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {c.uses.items.map((u, i) => (
              <Reveal key={u.title} delay={(i % 2) * 0.1}>
                <div className="flex h-full flex-col rounded-[20px] border border-[#E8E8E6] p-5 md:p-7">
                  <h3 className="font-display text-[24px] font-medium tracking-[-0.03em] md:text-[28px]">
                    {u.title}
                  </h3>
                  <p className="mt-2 max-w-md text-[15px] leading-[1.55] text-[#6B6A67]">
                    {u.body}
                  </p>
                  <div className="mt-6 flex-1">
                    <WaThread messages={u.thread} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Statement */}
      <section className={`${SECTION} bg-[#111110] text-white`}>
        <Reveal className={CONTAINER}>
          <h2 className="font-display text-[40px] font-medium leading-[1.02] tracking-[-0.045em] md:text-[88px]">
            {c.statement.lines.map((line, i) => (
              <span key={line} className="block" style={{ color: i === 2 ? WA.green : undefined }}>
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-10 max-w-xl text-[17px] leading-[1.55] text-[#ADADAA] md:text-[19px]">
            {c.statement.body}
          </p>
        </Reveal>
      </section>

      {/* Promises */}
      <section className={SECTION}>
        <div className={CONTAINER}>
          <Reveal>
            <p className={EYEBROW} style={{ color: "#00795E" }}>
              {c.promises.eyebrow}
            </p>
            <h2 className={H2}>{c.promises.title}</h2>
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {c.promises.items.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <div className="h-full rounded-[20px] bg-[#F5F5F3] p-7">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full text-[14px] text-white"
                    style={{ background: WA.green }}
                  >
                    ✓
                  </span>
                  <h3 className="mt-5 font-display text-[22px] font-medium tracking-[-0.025em]">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-[1.55] text-[#6B6A67]">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Audience */}
      <section className={`${SECTION} pt-0 md:pt-0`}>
        <div className={CONTAINER}>
          <Reveal>
            <p className={EYEBROW} style={{ color: "#00795E" }}>
              {c.audience.eyebrow}
            </p>
            <h2 className={H2}>{c.audience.title}</h2>
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-[20px] border border-[#E8E8E6] bg-[#E8E8E6] sm:grid-cols-2 lg:grid-cols-4">
            {c.audience.items.map((a) => (
              <div key={a.title} className="bg-white p-7">
                <h3 className="font-display text-[20px] font-medium tracking-[-0.025em]">
                  {a.title}
                </h3>
                <p className="mt-2 text-[14.5px] leading-[1.55] text-[#6B6A67]">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={`${SECTION} border-t border-[#E8E8E6]`}>
        <div className={`${CONTAINER} grid gap-10 md:grid-cols-[1fr_2fr]`}>
          <h2 className="font-display text-[32px] font-medium tracking-[-0.035em] md:text-[48px]">
            {c.faq.title}
          </h2>
          <div className="border-t border-[#E8E8E6]">
            {c.faq.items.map((item) => (
              <details key={item.q} className="group border-b border-[#E8E8E6]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[16px] tracking-[-0.01em] md:text-[17px] [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="shrink-0 text-[22px] leading-none text-[#ADADAA] transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="max-w-2xl pb-5 text-[15px] leading-[1.6] text-[#6B6A67]">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 pb-6 md:px-6">
        <Reveal className={`${CONTAINER} text-center`}>
          <div className="rounded-[28px] px-6 py-20 md:py-24" style={{ background: WA.wallpaper }}>
            <h2 className="mx-auto max-w-3xl text-balance font-display text-[34px] font-medium leading-[1.05] tracking-[-0.04em] md:text-[60px]">
              {c.cta.title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[17px] text-[#6B6A67]">{c.cta.subtitle}</p>
            <GreenButton href={whatsappDemoLink(lang)} className="mt-9">
              {c.cta.button}
            </GreenButton>
          </div>
        </Reveal>
      </section>

      <footer className="px-4 py-10 md:px-6">
        <div
          className={`${CONTAINER} flex items-center justify-between text-[13px] text-[#ADADAA]`}
        >
          <span className="font-display text-[#111110]">Vitreen</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </footer>

      <ContactModal />
    </main>
  );
}
