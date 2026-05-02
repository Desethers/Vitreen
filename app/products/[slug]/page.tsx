import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PRODUCTS, getProduct } from '@/lib/products'
import ProductClient from './ProductClient'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://vitreen.art'

export function generateStaticParams() {
  return PRODUCTS.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const p = getProduct(slug)
  if (!p) return { title: 'Produit introuvable' }
  const titleBare = `${p.name} — ${p.tag}`
  const description = p.shortFr
  const url = `/products/${slug}`
  return {
    title: { absolute: `${titleBare} · Vitreen` },
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${titleBare} · Vitreen`,
      description,
      url,
      type: 'article',
      siteName: 'Vitreen',
      locale: 'fr_FR',
      alternateLocale: ['en_US'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${p.name} · Vitreen`,
      description,
    },
    robots: p.comingSoon
      ? { index: true, follow: true } // still index — coming-soon pages collect demand signals
      : { index: true, follow: true },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) notFound()

  // Schema.org Product/SoftwareApplication
  const productLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `Vitreen ${product.name}`,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: product.tag,
    description: product.pitchFr,
    url: `${SITE}/products/${product.slug}`,
    operatingSystem: 'Web',
    inLanguage: ['fr-FR', 'en-US'],
    offers: {
      '@type': 'Offer',
      availability: product.comingSoon ? 'https://schema.org/PreOrder' : 'https://schema.org/InStock',
      priceCurrency: 'EUR',
      price: '0',
      url: `${SITE}/products/${product.slug}`,
    },
    publisher: { '@type': 'Organization', name: 'Vitreen' },
    audience: {
      '@type': 'BusinessAudience',
      audienceType: product.forWhoFr,
    },
    featureList: product.highlightFr,
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'Produits', item: `${SITE}/products` },
      { '@type': 'ListItem', position: 3, name: product.name, item: `${SITE}/products/${product.slug}` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <ProductClient product={product} />
    </>
  )
}
