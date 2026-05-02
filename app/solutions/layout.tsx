import type { Metadata } from 'next'
import { SOLUTIONS } from '@/lib/solutions'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://vitreen.art'

export const metadata: Metadata = {
  title: 'Solutions — pour galeries, artistes, advisors, collectionneurs',
  description:
    'Vitreen au service de votre métier : galeries d\'art contemporain, artistes auto-représentés, art advisors, collectionneurs privés, estates d\'artistes, institutions et foires.',
  alternates: { canonical: '/solutions' },
  openGraph: {
    title: 'Solutions Vitreen — par audience',
    description:
      'Le même système, vu sous l\'angle de votre métier. Six audiences, jobs-to-be-done identifiés, outils croisés.',
    url: '/solutions',
    type: 'website',
    siteName: 'Vitreen',
    locale: 'fr_FR',
    alternateLocale: ['en_US'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solutions Vitreen — par audience',
    description: 'Le même système, vu sous l\'angle de votre métier.',
  },
}

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Solutions Vitreen par audience',
    description: 'Vitreen vu depuis chaque métier du marché de l\'art.',
    numberOfItems: SOLUTIONS.length,
    itemListElement: SOLUTIONS.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE}/solutions/${s.slug}`,
      name: s.nameFr,
      description: s.shortFr,
    })),
  }
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
      {children}
    </>
  )
}
