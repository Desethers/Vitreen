import type { Metadata } from 'next'
import { PRODUCTS } from '@/lib/products'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://vitreen.art'

export const metadata: Metadata = {
  title: 'Produits — 15 outils pour les galeries d\'art contemporain',
  description:
    'Quinze produits pensés pour les galeries d\'art : viewing rooms privées, site web, inventaire d\'œuvres, CRM collectionneurs, gestion des foires, consignations. Modulaire, intégré, bilingue.',
  alternates: { canonical: '/products' },
  openGraph: {
    title: 'Produits Vitreen — 15 outils pour les galeries d\'art contemporain',
    description:
      'Viewing rooms, sites, inventaire, CRM, foires, consignations — tous les outils d\'une galerie, dans un seul environnement.',
    url: '/products',
    type: 'website',
    siteName: 'Vitreen',
    locale: 'fr_FR',
    alternateLocale: ['en_US'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Produits Vitreen — 15 outils pour galeries d\'art',
    description:
      'Viewing rooms, sites, inventaire, CRM, foires, consignations — tous les outils d\'une galerie.',
  },
}

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Produits Vitreen',
    description: 'Catalogue complet des outils Vitreen pour galeries d\'art contemporain.',
    numberOfItems: PRODUCTS.length,
    itemListElement: PRODUCTS.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE}/products/${p.slug}`,
      name: p.name,
      description: p.shortFr,
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
