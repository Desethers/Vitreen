'use client'

import { use } from 'react'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/Button'
import { useLang } from '@/lib/lang'
import { SOLUTIONS, getSolution } from '@/lib/solutions'
import { getProduct } from '@/lib/products'

export const dynamic = 'force-dynamic'

export default function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const sol = getSolution(slug)
  if (!sol) notFound()
  const { lang } = useLang()
  const fr = lang === 'fr'
  const jobs = fr ? sol.jobsFr : sol.jobsEn
  const others = SOLUTIONS.filter(s => s.slug !== slug)

  return (
    <main className="relative bg-white text-[#111110]">
      <Nav />

      {/* Hero */}
      <section className="relative px-4 md:px-6 pt-36 md:pt-44 pb-14 md:pb-20">
        <div className="max-w-7xl w-full mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <a href="/solutions" className="text-[11px] uppercase tracking-[0.32em] text-[#6B6A67] hover:text-[#111110] transition-colors">
              {fr ? '← Solutions' : '← Solutions'}
            </a>
            <span className="text-[#E8E8E6]">/</span>
            <span className="text-[11px] uppercase tracking-[0.32em] text-[#111110]">{fr ? sol.nameFr : sol.nameEn}</span>
          </div>
          <h1 className="font-display tracking-[-0.04em] text-[34px] md:text-[56px] leading-[1.05] max-w-5xl text-balance">
            {fr ? sol.heroFr : sol.heroEn}
          </h1>
          <p className="mt-7 max-w-2xl text-[15px] md:text-[17px] text-[#6B6A67] leading-relaxed">
            {fr ? sol.pitchFr : sol.pitchEn}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button size="lg" onClick={() => window.dispatchEvent(new Event('open-contact-modal'))}>
              {fr ? 'Réserver une démo guidée' : 'Book a guided demo'}
            </Button>
            <a href="#jobs" className="text-[14px] text-[#6B6A67] hover:text-[#111110] transition">
              {fr ? 'Voir les jobs et outils →' : 'See jobs and tools →'}
            </a>
          </div>
        </div>
      </section>

      {/* Swatch */}
      <section className="px-4 md:px-6 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-2xl overflow-hidden border border-[#E8E8E6] aspect-[16/9] md:aspect-[16/7] flex items-center justify-center"
            style={{ background: sol.swatchBg, color: sol.swatchFg, fontFamily: sol.swatchSerif ? '"EB Garamond", Georgia, serif' : undefined }}>
            <div className="text-center px-8">
              <div className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] opacity-60 mb-4">{fr ? 'Pour qui' : 'For whom'}</div>
              <div className="text-[64px] md:text-[112px] leading-[0.9]" style={{ fontStyle: sol.swatchSerif ? 'italic' : 'normal', fontWeight: sol.swatchSerif ? 400 : 600 }}>
                {fr ? sol.nameFr : sol.nameEn}
              </div>
              <div className="text-[14px] md:text-[16px] opacity-70 mt-6 max-w-2xl mx-auto leading-snug">
                {fr ? sol.whoFr : sol.whoEn}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Jobs grid */}
      <section id="jobs" className="px-4 md:px-6 py-16 md:py-24 border-t border-[#E8E8E6] scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-baseline justify-between mb-10 md:mb-14">
            <h2 className="font-display text-[24px] md:text-[36px] tracking-[-0.03em] text-[#111110] max-w-3xl leading-tight">
              {fr ? 'Vos jobs-to-be-done, et les outils qui les font.' : 'Your jobs-to-be-done, and the tools that do them.'}
            </h2>
            <span className="text-[12px] text-[#ADADAA] hidden md:block tabular-nums">{jobs.length} {fr ? 'jobs' : 'jobs'}</span>
          </div>

          <div className="space-y-5 md:space-y-6">
            {jobs.map((job, i) => (
              <div key={job.title} className="rounded-2xl border border-[#E8E8E6] bg-white p-6 md:p-8 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 md:gap-10 hover:border-[#111110] transition-colors">
                <div>
                  <div className="font-mono text-[11px] tabular-nums text-[#ADADAA] mb-2">JOB {(i + 1).toString().padStart(2, '0')}</div>
                  <h3 className="font-display text-[22px] md:text-[26px] tracking-[-0.02em] text-[#111110] leading-tight">{job.title}</h3>
                  <p className="text-[14px] text-[#6B6A67] leading-relaxed mt-3">{job.description}</p>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.24em] text-[#ADADAA] mb-3">{fr ? 'Outils Vitreen' : 'Vitreen tools'}</div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {job.products.map(slug => {
                      const p = getProduct(slug)
                      if (!p) return null
                      return (
                        <a key={slug} href={`/products/${p.slug}`}
                          className="group/p flex items-center gap-2.5 p-2.5 rounded-lg border border-[#E8E8E6] hover:border-[#111110] hover:bg-[#F5F5F3] transition">
                          <span className="block w-8 h-8 rounded-md shrink-0 flex items-center justify-center text-[13px]"
                            style={{ background: p.swatchBg, color: p.swatchFg, fontFamily: p.swatchSerif ? '"EB Garamond", Georgia, serif' : undefined, fontStyle: p.swatchSerif ? 'italic' : 'normal', fontWeight: p.swatchSerif ? 400 : 600 }}>{p.name[0]}</span>
                          <span className="min-w-0 flex-1">
                            <span className="block font-display text-[13px] text-[#111110] tracking-tight leading-tight">{p.name}</span>
                            <span className="block text-[10px] text-[#6B6A67] truncate">{p.tag}</span>
                          </span>
                        </a>
                      )
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other audiences */}
      <section className="px-4 md:px-6 py-16 md:py-20 border-t border-[#E8E8E6] bg-[#F5F5F3]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="font-display text-[22px] md:text-[26px] tracking-[-0.02em] text-[#111110]">
              {fr ? 'Autres audiences' : 'Other audiences'}
            </h2>
            <a href="/solutions" className="text-[13px] text-[#6B6A67] hover:text-[#111110]">{fr ? 'Voir tout' : 'See all'} →</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {others.map(s => (
              <a key={s.slug} href={`/solutions/${s.slug}`}
                className="group rounded-xl overflow-hidden border border-[#E8E8E6] bg-white hover:border-[#111110] transition">
                <div className="aspect-[5/4] flex items-center justify-center text-center px-2"
                  style={{ background: s.swatchBg, color: s.swatchFg, fontFamily: s.swatchSerif ? '"EB Garamond", Georgia, serif' : undefined }}>
                  <div className="text-[18px] md:text-[22px] leading-tight" style={{ fontStyle: s.swatchSerif ? 'italic' : 'normal', fontWeight: s.swatchSerif ? 400 : 600 }}>{fr ? s.nameFr : s.nameEn}</div>
                </div>
                <div className="p-3">
                  <p className="text-[11px] text-[#6B6A67] leading-snug line-clamp-2">{fr ? s.shortFr : s.shortEn}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 md:px-6 py-14 md:py-20 bg-[#111110] text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-2xl">
            <div className="text-[11px] uppercase tracking-[0.32em] text-white/60 mb-4">{fr ? sol.nameFr : sol.nameEn}</div>
            <h2 className="font-display tracking-[-0.03em] text-[28px] md:text-[36px] leading-[1.1]">
              {fr ? 'Voyez Vitreen depuis votre métier. Démo de 30 minutes, vraiment ciblée.' : 'See Vitreen from your craft. 30-minute demo, genuinely targeted.'}
            </h2>
          </div>
          <Button size="lg" variant="inverse" onClick={() => window.dispatchEvent(new Event('open-contact-modal'))}>
            {fr ? 'Réserver la démo' : 'Book the demo'} →
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  )
}
