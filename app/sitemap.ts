import type { MetadataRoute } from 'next'
import { PRODUCTS } from '@/lib/products'
import { SOLUTIONS } from '@/lib/solutions'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://vitreen.art'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: `${SITE}/`,         lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${SITE}/products`, lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${SITE}/solutions`,lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    ...PRODUCTS.map(p => ({
      url: `${SITE}/products/${p.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: p.comingSoon ? 0.6 : 0.8,
    })),
    ...SOLUTIONS.map(s => ({
      url: `${SITE}/solutions/${s.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
