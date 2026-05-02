'use client'

import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/Button'
import { useLang } from '@/lib/lang'
import { PRODUCTS, type Product } from '@/lib/products'

export default function ProductClient({ product }: { product: Product }) {
  const { lang } = useLang()
  const fr = lang === 'fr'
  const others = PRODUCTS.filter(p => p.slug !== product.slug)

  return (
    <main className="relative bg-white text-[#111110]">
      <Nav />

      {/* Hero */}
      <section className="relative px-4 md:px-6 pt-36 md:pt-44 pb-14 md:pb-20">
        <div className="max-w-7xl w-full mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <a href="/products" className="text-[11px] uppercase tracking-[0.32em] text-[#6B6A67] hover:text-[#111110] transition-colors">
              {fr ? '← Produits' : '← Products'}
            </a>
            <span className="text-[#E8E8E6]">/</span>
            <span className="text-[11px] uppercase tracking-[0.32em] text-[#111110]">{product.name}</span>
          </div>
          <h1 className="font-display tracking-[-0.04em] text-[34px] md:text-[52px] leading-[1.05] max-w-5xl text-balance" style={{ color: '#111110' }}>
            {fr ? product.heroFr : product.heroEn}
          </h1>
          <p className="mt-7 max-w-2xl text-[15px] md:text-[17px] text-[#6B6A67] leading-relaxed">
            {fr ? product.pitchFr : product.pitchEn}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            {product.comingSoon ? (
              <>
                <Button size="lg" onClick={() => window.dispatchEvent(new Event('open-contact-modal'))}>
                  {fr ? 'Demander un accès anticipé →' : 'Request early access →'}
                </Button>
                <span className="text-[12px] uppercase tracking-[0.18em] text-[#6B6A67] px-3 py-2 border border-[#E8E8E6] rounded-full">
                  {fr ? 'Bientôt disponible' : 'Coming soon'}
                </span>
              </>
            ) : (
              <>
                <Button size="lg" href={`/editor/${product.slug}`}>
                  {fr ? 'Essayer la démo →' : 'Try the demo →'}
                </Button>
                <Button size="lg" variant="inverse" onClick={() => window.dispatchEvent(new Event('open-contact-modal'))}>
                  {fr ? 'Réserver une démo guidée' : 'Book a guided demo'}
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Showcase swatch — full bleed visual sample of the product's aesthetic */}
      <section className="px-4 md:px-6 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-2xl overflow-hidden border border-[#E8E8E6] aspect-[16/9] md:aspect-[16/8] flex items-center justify-center relative"
            style={{ background: product.swatchBg, color: product.swatchFg, fontFamily: product.swatchSerif ? '"EB Garamond", Georgia, serif' : undefined }}>
            <div className="text-center px-8">
              <div className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] opacity-60 mb-4">{product.tag}</div>
              <div className="text-[88px] md:text-[140px] leading-[0.9]" style={{ fontStyle: product.swatchSerif ? 'italic' : 'normal', fontWeight: product.swatchSerif ? 400 : 600 }}>
                {product.name}
              </div>
              <div className="text-[14px] md:text-[16px] opacity-70 mt-6 max-w-xl mx-auto leading-snug">
                {fr ? product.shortFr : product.shortEn}
              </div>
            </div>
            {product.comingSoon ? (
              <span className="absolute bottom-5 right-5 px-4 py-2 rounded-full bg-white/90 text-[#111110] text-[12px] font-medium tracking-tight">
                {fr ? 'Bientôt disponible' : 'Coming soon'}
              </span>
            ) : (
              <a href={`/editor/${product.slug}`}
                className="absolute bottom-5 right-5 px-4 py-2 rounded-full bg-white/90 hover:bg-white text-[#111110] text-[12px] font-medium tracking-tight transition">
                {fr ? 'Ouvrir la démo →' : 'Open demo →'}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Trois temps : avant / pendant / après — rythme home page */}
      <section className="px-4 md:px-6 py-16 md:py-24 border-t border-[#E8E8E6]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-baseline justify-between mb-10 md:mb-14">
            <h2 className="font-display text-[24px] md:text-[32px] tracking-[-0.03em] text-[#111110] max-w-3xl leading-tight">
              {fr ? 'Avant. Pendant. Après.' : 'Before. During. After.'}
            </h2>
            <span className="text-[12px] text-[#ADADAA] hidden md:block">{fr ? 'Le parcours utilisateur entier' : 'The full user journey'}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-7">
            {[
              { label: fr ? 'Avant' : 'Before', body: fr ? product.beforeFr : product.beforeEn },
              { label: fr ? 'Pendant' : 'During', body: fr ? product.duringFr : product.duringEn },
              { label: fr ? 'Après' : 'After', body: fr ? product.afterFr : product.afterEn },
            ].map(b => (
              <div key={b.label} className="rounded-2xl border border-[#E8E8E6] p-7 md:p-8 bg-white">
                <div className="text-[10px] uppercase tracking-[0.32em] text-[#6B6A67] mb-4">{b.label}</div>
                <p className="font-display text-[18px] md:text-[20px] tracking-[-0.01em] text-[#111110] leading-[1.4]">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights & target audience */}
      <section className="px-4 md:px-6 py-16 md:py-24 bg-[#F5F5F3] border-t border-[#E8E8E6]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-10 md:gap-16">
          <div>
            <div className="text-[11px] uppercase tracking-[0.32em] text-[#6B6A67] mb-4">
              {fr ? 'Pour qui ?' : 'For whom?'}
            </div>
            <p className="font-display text-[24px] md:text-[30px] tracking-[-0.03em] text-[#111110] leading-[1.2]">
              {fr ? product.forWhoFr : product.forWhoEn}
            </p>
            <p className="mt-6 text-[14px] md:text-[15px] text-[#6B6A67] leading-relaxed">
              {fr ? product.whyFr : product.whyEn}
            </p>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.32em] text-[#6B6A67] mb-4">
              {fr ? 'Points clés' : 'Highlights'}
            </div>
            <ul className="divide-y divide-[#E8E8E6] border-y border-[#E8E8E6]">
              {(fr ? product.highlightFr : product.highlightEn).map((h, i) => (
                <li key={h} className="flex items-baseline gap-4 py-4">
                  <span className="font-mono text-[11px] tabular-nums text-[#ADADAA] w-6">{(i + 1).toString().padStart(2, '0')}</span>
                  <span className="font-display text-[18px] tracking-[-0.01em] text-[#111110] flex-1">{h}</span>
                </li>
              ))}
            </ul>
            {product.comingSoon ? (
              <Button size="md" onClick={() => window.dispatchEvent(new Event('open-contact-modal'))} className="mt-7">
                {fr ? `Demander un accès anticipé` : `Request early access`} →
              </Button>
            ) : (
              <Button size="md" href={`/editor/${product.slug}`} className="mt-7">
                {fr ? `Essayer ${product.name}` : `Try ${product.name}`} →
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Other products */}
      <section className="px-4 md:px-6 py-16 md:py-24 border-t border-[#E8E8E6]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-baseline justify-between mb-8 md:mb-10">
            <h2 className="font-display text-[24px] md:text-[28px] tracking-[-0.02em] text-[#111110]">
              {fr ? 'Autres produits' : 'Other products'}
            </h2>
            <a href="/products" className="text-[13px] text-[#6B6A67] hover:text-[#111110]">{fr ? 'Voir tout' : 'See all'} →</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {others.map(p => (
              <a key={p.slug} href={`/products/${p.slug}`}
                className="group rounded-xl overflow-hidden border border-[#E8E8E6] hover:border-[#111110] transition">
                <div className="aspect-[4/3] flex items-center justify-center text-center px-3"
                  style={{ background: p.swatchBg, color: p.swatchFg, fontFamily: p.swatchSerif ? '"EB Garamond", Georgia, serif' : undefined }}>
                  <div>
                    <div className="text-[9px] uppercase tracking-[0.3em] opacity-60 mb-1">{p.tag}</div>
                    <div className="text-[28px] md:text-[34px] leading-none" style={{ fontStyle: p.swatchSerif ? 'italic' : 'normal', fontWeight: p.swatchSerif ? 400 : 600 }}>{p.name}</div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-[12px] text-[#6B6A67] leading-snug line-clamp-2">{fr ? p.shortFr : p.shortEn}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="px-4 md:px-6 py-14 md:py-20 bg-[#111110] text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-2xl">
            <div className="text-[11px] uppercase tracking-[0.32em] text-white/60 mb-4">{product.name}</div>
            <h2 className="font-display tracking-[-0.03em] text-[28px] md:text-[36px] leading-[1.1]">
              {fr
                ? `Voyez ${product.name} en mouvement. La démo charge avec un exemple complet.`
                : `See ${product.name} in motion. The demo loads with a full sample.`}
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {product.comingSoon ? (
              <Button size="lg" variant="inverse" onClick={() => window.dispatchEvent(new Event('open-contact-modal'))}>
                {fr ? 'Demander un accès anticipé' : 'Request early access'} →
              </Button>
            ) : (
              <Button size="lg" variant="inverse" href={`/editor/${product.slug}`}>
                {fr ? 'Ouvrir la démo' : 'Open the demo'} →
              </Button>
            )}
            <Button size="lg" onClick={() => window.dispatchEvent(new Event('open-contact-modal'))} className="!bg-transparent !text-white border border-white/30 hover:!bg-white/10">
              {fr ? 'Parler à un humain' : 'Talk to a human'}
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
