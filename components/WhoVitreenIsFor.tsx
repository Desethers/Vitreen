"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CONTAINER, EYEBROW, H2, SECTION } from "@/components/landing/styles";

type Language = "en" | "fr";

const content = {
  en: {
    eyebrow: "Who it's for",
    title: "Who Vitreen is for?",
    subtitle: "Built for the people who present and sell art.",
    audiences: [
      {
        title: "Art Galleries",
        description:
          "Manage artworks, collector conversations and sales material from one connected system.",
        href: "/solutions/galleries",
        image: "/gallery-screen2.png",
        objectPosition: "55% 50%",
        imageScale: "scale-110",
      },
      {
        title: "Design Galleries",
        description:
          "Organise collectible design, editions, availability and client presentations.",
        href: "/solutions/galleries",
        image: "/Design-gallery.png",
      },
      {
        title: "Art Advisors",
        description: "Build tailored selections and share them privately with each client.",
        href: "/solutions/advisors",
        image: "/artadvisor.png",
      },
      {
        title: "Artist Studios",
        description:
          "Keep the archive organised and prepare professional material for galleries and collectors.",
        href: "/solutions/artists",
        image: "/artiste-studio.png",
        objectPosition: "85% 50%",
      },
    ],
  },
  fr: {
    eyebrow: "Pour qui",
    title: "À qui s’adresse Vitreen ?",
    subtitle: "Pensé pour celles et ceux qui présentent et vendent l’art.",
    audiences: [
      {
        title: "Galeries d’art",
        description:
          "Gérez les œuvres, les échanges avec les collectionneurs et les supports de vente depuis un seul système.",
        href: "/fr/solutions/galleries",
        image: "/gallery-screen2.png",
        objectPosition: "55% 50%",
        imageScale: "scale-110",
      },
      {
        title: "Galeries de design",
        description:
          "Organisez le design de collection, les éditions, les disponibilités et les présentations clients.",
        href: "/fr/solutions/galleries",
        image: "/Design-gallery.png",
      },
      {
        title: "Art advisors",
        description:
          "Composez des sélections sur mesure et partagez-les en privé avec chaque client.",
        href: "/fr/solutions/advisors",
        image: "/artadvisor.png",
      },
      {
        title: "Studios d’artistes",
        description:
          "Gardez les archives organisées et préparez des supports professionnels pour galeries et collectionneurs.",
        href: "/fr/solutions/artists",
        image: "/artiste-studio.png",
        objectPosition: "85% 50%",
      },
    ],
  },
} as const;

export default function WhoVitreenIsFor({ lang = "en" }: { lang?: Language }) {
  const section = content[lang];

  return (
    <section className={`${SECTION} bg-white`}>
      <div className={CONTAINER}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className={EYEBROW}>{section.eyebrow}</p>
          <h2 className={`${H2} mt-4 max-w-2xl`}>{section.title}</h2>
          <p className="mt-1 text-[20px] font-normal leading-[1.2] tracking-[-0.02em] text-[#6B6A67] md:text-[26px]">
            {section.subtitle}
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-12 xl:grid-cols-4 xl:gap-6">
          {section.audiences.map((audience, index) => (
            <motion.a
              key={audience.title}
              href={audience.href}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex min-h-[420px] flex-col overflow-hidden rounded-[12px] bg-[#f5f5f3] p-7 sm:min-h-[460px] xl:min-h-[480px]"
            >
              <h3 className="font-display text-[18px] font-normal leading-[1.25] tracking-[-0.02em] text-[#111110]">
                {audience.title}
              </h3>
              <p className="mt-3 max-w-[220px] text-[14px] leading-[1.48] tracking-[-0.025em] text-[#6B6A67]">
                {audience.description}
              </p>
              <div
                className={`relative -mb-2 -mr-7 mt-auto aspect-[0.9] overflow-hidden rounded-l-[12px] ${"imageScale" in audience ? audience.imageScale : ""}`}
              >
                <Image
                  src={audience.image}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 23vw, (min-width: 640px) 45vw, 90vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                  style={{
                    objectPosition:
                      "objectPosition" in audience ? audience.objectPosition : "72% 50%",
                  }}
                />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
