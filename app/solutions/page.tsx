'use client'

import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/Button'
import { useLang } from '@/lib/lang'
import { SOLUTIONS } from '@/lib/solutions'

export const dynamic = 'force-dynamic'

export default function SolutionsIndex() {
  const { lang } = useLang()
  const fr = lang === 'fr'

  return (
    <main className="relative bg-white text-[#111110]">
      <Nav />

      {/* Hero */}
      <section className="relative px-4 md:px-6 pt-36 md:pt-44 pb-12 md:pb-16">
        <div className="max-w-7xl w-full mx-auto">
          <div className="text-[11px] uppercase tracking-[0.32em] text-[#6B6A67] mb-5">
            {fr ? 'Vitreen / Solutions' : 'Vitreen / Solutions'}
          </div>
          <h1 className="font-display tracking-[-0.04em] text-[32px] md:text-[48px] leading-[1.05] max-w-5xl text-balance">
            {fr
              ? 'Six audiences. Le même système, vu sous l’angle de votre métier.'
              : 'Six audiences. Same system, viewed through your craft.'}
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] md:text-[16px] text-[#6B6A67] leading-relaxed">
            {fr
              ? 'Une galerie n’a pas les mêmes besoins qu’un advisor ou qu’un estate. Chaque audience a ses jobs-to-be-done, et chaque job a ses outils.'
              : 'A gallery doesn’t need the same things as an advisor or an estate. Each audience has its jobs-to-be-done, and each job has its tools.'}
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="px-4 md:px-6 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {SOLUTIONS.map(s => (
            <a key={s.slug} href={`/solutions/${s.slug}`}
              className="group rounded-2xl overflow-hidden border border-[#E8E8E6] bg-white hover:border-[#111110] hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.18)] transition-all">
              <div className="h-44 flex items-center justify-center px-6 text-center"
                style={{ background: s.swatchBg, color: s.swatchFg, fontFamily: s.swatchSerif ? '"EB Garamond", Georgia, serif' : undefined }}>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.32em] opacity-60 mb-2">{fr ? 'Solution' : 'Solution'}</div>
                  <div className="text-[40px] leading-none" style={{ fontStyle: s.swatchSerif ? 'italic' : 'normal', fontWeight: s.swatchSerif ? 400 : 600 }}>{fr ? s.nameFr : s.nameEn}</div>
                </div>
              </div>
              <div className="p-6">
                <h2 className="font-display text-[20px] tracking-[-0.02em] text-[#111110] leading-tight">{fr ? s.heroFr : s.heroEn}</h2>
                <p className="text-[13px] text-[#6B6A67] leading-relaxed mt-3">{fr ? s.shortFr : s.shortEn}</p>
                <div className="mt-4 pt-4 border-t border-[#F0F0EE]">
                  <div className="text-[10px] uppercase tracking-wider text-[#ADADAA] mb-1.5">{fr ? 'Jobs principaux' : 'Top jobs'}</div>
                  <ul className="space-y-1">
                    {(fr ? s.jobsFr : s.jobsEn).slice(0, 3).map(j => (
                      <li key={j.title} className="text-[12px] text-[#6B6A67] flex items-baseline gap-2">
                        <span className="text-[#ADADAA]">·</span>{j.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="px-4 md:px-6 py-16 md:py-24 bg-[#F5F5F3]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-2xl">
            <div className="text-[11px] uppercase tracking-[0.32em] text-[#6B6A67] mb-4">
              {fr ? 'Vous ne vous reconnaissez pas ?' : 'Don’t see yourself?'}
            </div>
            <h2 className="font-display tracking-[-0.03em] text-[28px] md:text-[36px] leading-[1.1]">
              {fr ? 'Décrivez votre métier. On voit ensemble si Vitreen vous convient.' : 'Describe your craft. We’ll see together if Vitreen fits.'}
            </h2>
          </div>
          <Button size="lg" onClick={() => window.dispatchEvent(new Event('open-contact-modal'))}>
            {fr ? 'Nous écrire' : 'Write to us'}
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  )
}
