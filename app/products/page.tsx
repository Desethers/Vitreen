'use client'

import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/Button'
import { useLang } from '@/lib/lang'
import { PRODUCTS, CATEGORIES, productsByCategory } from '@/lib/products'

export const dynamic = 'force-dynamic'

export default function ProductsIndex() {
  const { lang } = useLang()
  const fr = lang === 'fr'

  return (
    <main className="relative bg-white text-[#111110]">
      <Nav />

      {/* Hero */}
      <section className="relative px-4 md:px-6 pt-36 md:pt-44 pb-12 md:pb-16">
        <div className="max-w-7xl w-full mx-auto">
          <div className="text-[11px] uppercase tracking-[0.32em] text-[#6B6A67] mb-5">
            {fr ? 'Vitreen / Produits' : 'Vitreen / Products'}
          </div>
          <h1 className="font-display tracking-[-0.04em] text-[32px] md:text-[48px] leading-[1.05] max-w-5xl text-balance" style={{ color: '#111110' }}>
            {fr
              ? 'Quinze produits. Un seul système d’exploitation pour les galeries d’art contemporain.'
              : 'Fifteen products. One operating system for contemporary art galleries.'}
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] md:text-[16px] text-[#6B6A67] leading-relaxed">
            {fr
              ? 'Choisissez les outils dont vous avez besoin maintenant — une viewing room, un site, un inventaire — et ajoutez le reste à votre rythme. Tout se parle.'
              : 'Pick the tools you need now — a viewing room, a site, an inventory — and add the rest at your pace. Everything talks to everything.'}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" onClick={() => window.dispatchEvent(new Event('open-contact-modal'))}>
              {fr ? 'Réserver une démo' : 'Book a demo'}
            </Button>
            <a href="/solutions" className="text-[14px] text-[#6B6A67] hover:text-[#111110] transition">
              {fr ? 'Voir les solutions par audience →' : 'See solutions by audience →'}
            </a>
          </div>
        </div>
      </section>

      {/* Sticky category nav */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur border-y border-[#E8E8E6]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center gap-1 overflow-x-auto py-3">
          {CATEGORIES.map(cat => (
            <a key={cat.id} href={`#cat-${cat.id}`}
              className="text-[12px] text-[#6B6A67] hover:text-[#111110] hover:bg-[#F5F5F3] px-3 py-1.5 rounded-full transition whitespace-nowrap">
              {fr ? cat.labelFr : cat.labelEn}
              <span className="ml-1.5 tabular-nums text-[#ADADAA]">{productsByCategory(cat.id).length}</span>
            </a>
          ))}
          <span className="ml-auto text-[11px] text-[#ADADAA] tabular-nums hidden md:block">{PRODUCTS.length} {fr ? 'produits' : 'products'}</span>
        </div>
      </div>

      {/* Categories */}
      {CATEGORIES.map(cat => {
        const items = productsByCategory(cat.id)
        return (
          <section key={cat.id} id={`cat-${cat.id}`} className="px-4 md:px-6 py-14 md:py-20 border-b border-[#E8E8E6] scroll-mt-20">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 md:gap-10 mb-8 md:mb-10">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.32em] text-[#6B6A67] mb-3">{fr ? cat.labelFr : cat.labelEn}</div>
                  <h2 className="font-display text-[26px] md:text-[32px] tracking-[-0.03em] text-[#111110] leading-[1.1]">{fr ? cat.descFr : cat.descEn}</h2>
                </div>
                <div className="md:pt-2 text-[13px] text-[#6B6A67]">
                  <span className="tabular-nums">{items.length}</span> {fr ? `produits dans ${cat.labelFr.toLowerCase()}` : `products in ${cat.labelEn.toLowerCase()}`}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {items.map(p => (
                  <a key={p.slug} href={`/products/${p.slug}`}
                    className="group relative overflow-hidden rounded-2xl border border-[#E8E8E6] bg-white hover:border-[#111110] hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.18)] transition-all">
                    <div className="relative h-36 overflow-hidden flex items-center justify-center"
                      style={{ background: p.swatchBg, color: p.swatchFg, fontFamily: p.swatchSerif ? '"EB Garamond", Georgia, serif' : undefined }}>
                      <div className="text-center px-6">
                        <div className="text-[9px] uppercase tracking-[0.32em] opacity-60 mb-1">{p.tag}</div>
                        <div className="text-[36px] leading-none" style={{ fontStyle: p.swatchSerif ? 'italic' : 'normal', fontWeight: p.swatchSerif ? 400 : 600 }}>{p.name}</div>
                      </div>
                      <span className="absolute top-2.5 right-2.5 text-[9px] uppercase tracking-[0.18em] px-2 py-0.5 rounded-full bg-white/90 text-[#111110]">
                        {p.comingSoon ? (fr ? 'Bientôt' : 'Soon') : (fr ? 'Démo live' : 'Live demo')}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-[17px] tracking-[-0.01em] text-[#111110] leading-tight mb-1.5">
                        {fr ? p.heroFr : p.heroEn}
                      </h3>
                      <p className="text-[13px] text-[#6B6A67] leading-snug">{fr ? p.shortFr : p.shortEn}</p>
                      <div className="mt-4 pt-3 border-t border-[#F0F0EE] flex items-center justify-between">
                        <span className="flex flex-wrap gap-1">
                          {(fr ? p.highlightFr : p.highlightEn).slice(0, 2).map(h => (
                            <span key={h} className="text-[10px] text-[#6B6A67] border border-[#E8E8E6] rounded-full px-1.5 py-0.5">{h}</span>
                          ))}
                        </span>
                        <span className="text-[12px] text-[#6B6A67] group-hover:text-[#111110] transition">→</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )
      })}

      {/* CTA */}
      <section className="px-4 md:px-6 py-16 md:py-24 bg-[#F5F5F3]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-2xl">
            <div className="text-[11px] uppercase tracking-[0.32em] text-[#6B6A67] mb-4">
              {fr ? 'Pas sûr de ce qu’il vous faut ?' : 'Not sure what you need?'}
            </div>
            <h2 className="font-display tracking-[-0.03em] text-[28px] md:text-[36px] leading-[1.1] text-[#111110]">
              {fr
                ? 'Démo guidée. On comprend votre flux, on vous oriente vers les bons produits.'
                : 'Guided demo. We understand your flow, point you to the right products.'}
            </h2>
          </div>
          <Button size="lg" onClick={() => window.dispatchEvent(new Event('open-contact-modal'))}>
            {fr ? 'Réserver une démo' : 'Book a demo'}
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  )
}
