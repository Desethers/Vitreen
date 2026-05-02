import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SOLUTIONS, getSolution } from '@/lib/solutions'
import SolutionClient from './SolutionClient'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://vitreen.art'

export function generateStaticParams() {
  return SOLUTIONS.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const sol = getSolution(slug)
  if (!sol) return { title: 'Solution introuvable' }
  const titleBare = `Vitreen pour ${sol.nameFr.toLowerCase()}`
  const description = sol.shortFr
  const url = `/solutions/${slug}`
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
      title: `Vitreen · ${sol.nameFr}`,
      description,
    },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const sol = getSolution(slug)
  if (!sol) notFound()

  // Service schema for the audience-specific solution.
  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Vitreen pour ${sol.nameFr.toLowerCase()}`,
    description: sol.pitchFr,
    provider: { '@type': 'Organization', name: 'Vitreen' },
    serviceType: 'Logiciel pour le marché de l\'art',
    audience: {
      '@type': 'BusinessAudience',
      audienceType: sol.nameFr,
      description: sol.whoFr,
    },
    url: `${SITE}/solutions/${sol.slug}`,
    inLanguage: ['fr-FR', 'en-US'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `Jobs résolus pour ${sol.nameFr.toLowerCase()}`,
      itemListElement: sol.jobsFr.map(job => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: job.title, description: job.description },
      })),
    },
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'Solutions', item: `${SITE}/solutions` },
      { '@type': 'ListItem', position: 3, name: sol.nameFr, item: `${SITE}/solutions/${sol.slug}` },
    ],
  }

  // FAQ-like schema from jobs (each job = a question implicit; treat as FAQ
  // with the job title as question and description as answer).
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: sol.jobsFr.map(job => ({
      '@type': 'Question',
      name: job.title,
      acceptedAnswer: { '@type': 'Answer', text: job.description },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <SolutionClient sol={sol} />
    </>
  )
}
