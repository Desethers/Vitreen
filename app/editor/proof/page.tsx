'use client'
import { useState } from 'react'

export const dynamic = 'force-dynamic'

type Img = { id: string; url: string; title: string; artist: string; year: string; medium: string; dimensions: string; price: string }
type State = {
  galleryName: string
  showTitle: string
  showSubtitle: string
  recipientName: string
  recipientEmail: string
  intro: string
  contact: string
  address: string
  images: Img[]
}

const SEED: State = {
  galleryName: 'Vitreen',
  showTitle: 'Spring Selection',
  showSubtitle: 'New paintings — Anna Levy · Etienne Marot · Claire Renard',
  recipientName: 'Jean Dupont',
  recipientEmail: 'jean@collector.com',
  intro: 'Three new bodies of work arrived this week. The Levys, in particular, have a slow figurative quality I felt would speak to your collection — figures that surface and then dissolve. Take your time.',
  contact: 'thomas@vitreen.art · +33 1 42 00 00 00',
  address: '12 rue Debelleyme · 75003 Paris',
  images: [
    { id: '1', url: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=1400&q=80', title: 'Untitled (Hour 3)', artist: 'Anna Levy', year: '2026', medium: 'Oil on linen', dimensions: '160 × 120 cm', price: 'On inquiry' },
    { id: '2', url: 'https://images.unsplash.com/photo-1577720580479-7d839d829c73?w=1400&q=80', title: 'Reverie', artist: 'Etienne Marot', year: '2026', medium: 'Acrylic and pigment on canvas', dimensions: '100 × 80 cm', price: '€ 22,000' },
    { id: '3', url: 'https://images.unsplash.com/photo-1578321709636-3df8d52a3f00?w=1400&q=80', title: 'Garden, after rain', artist: 'Claire Renard', year: '2025', medium: 'Oil on canvas', dimensions: '90 × 70 cm', price: '€ 14,500' },
  ],
}

const SPREADS = ['cover', 'letter', 'plate', 'plate', 'plate', 'colophon'] as const

export default function ProofEditor() {
  const [s, setS] = useState<State>(SEED)
  const [page, setPage] = useState(0)
  const [showCrops, setShowCrops] = useState(true)
  const [exporting, setExporting] = useState<null | 'pdf' | 'send'>(null)
  const [done, setDone] = useState(false)

  const set = <K extends keyof State>(k: K, v: State[K]) => setS(p => ({ ...p, [k]: v }))
  const setImg = (id: string, k: keyof Img, v: string) => setS(p => ({ ...p, images: p.images.map(i => i.id === id ? { ...i, [k]: v } : i) }))

  const totalPlates = s.images.length
  const totalPages = 2 + totalPlates + 1 // cover + letter + plates + colophon
  const onAdd = (files: FileList | null) => {
    if (!files) return
    const arr: Img[] = Array.from(files).map(f => ({ id: Math.random().toString(36).slice(2), url: URL.createObjectURL(f), title: f.name.replace(/\.[^.]+$/, ''), artist: '', year: '', medium: '', dimensions: '', price: '' }))
    setS(p => ({ ...p, images: [...p.images, ...arr] }))
  }

  return (
    <div className="min-h-screen bg-[#1F1B16] text-stone-300" style={{ fontFamily: '"EB Garamond", "Cormorant Garamond", Georgia, serif' }}>
      {/* Top bar — printer's bench */}
      <header className="px-8 py-4 flex items-center justify-between border-b border-stone-800 bg-[#15110D]">
        <div className="flex items-baseline gap-3">
          <div className="text-[10px] tracking-[0.4em] uppercase text-stone-500">Vitreen</div>
          <div className="text-stone-700">·</div>
          <div className="text-[15px] italic text-stone-100">Proof</div>
          <div className="text-stone-700">·</div>
          <div className="text-[11px] text-stone-500 tabular-nums">{totalPages} pages · {totalPlates} plates · 14 pt Adobe Garamond Pro · 90 gsm cream</div>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <label className="flex items-center gap-1.5 cursor-pointer text-stone-500 hover:text-stone-300">
            <input type="checkbox" checked={showCrops} onChange={e => setShowCrops(e.target.checked)} className="accent-amber-600" />
            <span>crop marks</span>
          </label>
          <button onClick={() => setExporting('pdf')} className="px-3 py-1.5 border border-stone-700 hover:border-amber-600 hover:text-amber-400 text-stone-400 transition">Export PDF</button>
          <button onClick={() => setExporting('send')} className="px-4 py-1.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-medium tracking-wider uppercase text-[10px]">Send link</button>
        </div>
      </header>

      <div className="grid grid-cols-[260px_1fr]">
        {/* LEFT — page list / TOC */}
        <aside className="border-r border-stone-800 bg-[#15110D] min-h-[calc(100vh-57px)] py-5">
          <div className="px-5 text-[10px] tracking-[0.32em] uppercase text-stone-500 mb-3">Table of contents</div>
          {[
            { i: 0, label: 'Cover',         meta: s.showTitle },
            { i: 1, label: 'Letter',        meta: 'To ' + s.recipientName },
            ...s.images.map((img, j) => ({ i: 2 + j, label: `Plate ${(j + 1).toString().padStart(2, '0')}`, meta: img.artist + ' — ' + img.title })),
            { i: 2 + s.images.length, label: 'Colophon', meta: s.galleryName + ', ' + new Date().getFullYear() },
          ].map((it: any) => (
            <button key={it.i} onClick={() => setPage(it.i)}
              className={`w-full px-5 py-2 text-left flex items-center gap-3 text-[12px] border-l-2 transition ${page === it.i ? 'border-amber-500 bg-stone-900/40 text-stone-100' : 'border-transparent text-stone-500 hover:text-stone-300'}`}>
              <span className="font-mono text-[10px] tabular-nums w-7 text-stone-600">{(it.i + 1).toString().padStart(2, '0')}</span>
              <div className="min-w-0 flex-1">
                <div className="italic">{it.label}</div>
                <div className="text-[10px] text-stone-600 truncate">{it.meta}</div>
              </div>
            </button>
          ))}
          <div className="px-5 pt-4 mt-4 border-t border-stone-800">
            <label className="block text-center text-[11px] italic text-stone-500 hover:text-stone-300 cursor-pointer">
              <input type="file" accept="image/*" multiple className="hidden" onChange={e => onAdd(e.target.files)} />
              ＋ add a plate
            </label>
          </div>
        </aside>

        {/* CENTER — paper */}
        <div className="py-12 px-12 flex justify-center items-start">
          <div className="relative">
            {showCrops && <CropMarks />}
            <Page page={page} state={s} onSet={set} onSetImg={setImg} />
            {/* Page nav */}
            <div className="mt-8 flex items-center justify-between text-[11px] text-stone-500">
              <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} className="px-3 py-1 hover:text-stone-200 disabled:opacity-30">← prev</button>
              <div className="font-mono tabular-nums">{(page + 1).toString().padStart(2, '0')} / {totalPages.toString().padStart(2, '0')}</div>
              <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1} className="px-3 py-1 hover:text-stone-200 disabled:opacity-30">next →</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {exporting && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4" onClick={() => !done && setExporting(null)}>
          <div className="bg-[#FAF6EE] text-stone-900 max-w-[480px] w-full p-12 shadow-2xl" onClick={e => e.stopPropagation()}>
            {!done ? (
              <>
                <div className="text-[10px] tracking-[0.4em] uppercase text-stone-500 mb-4">{exporting === 'pdf' ? 'Export' : 'Send'}</div>
                <div className="text-[36px] italic leading-tight mb-4">{exporting === 'pdf' ? 'Print proof' : 'Private link'}</div>
                <p className="text-[14px] italic text-stone-700 leading-relaxed mb-8">
                  {exporting === 'pdf'
                    ? `A press-ready PDF of "${s.showTitle}" — 90 gsm cream, 14 pt Garamond, ${totalPlates} plates. Print or share at full fidelity.`
                    : `${s.recipientName} will receive a private digital edition of this catalogue — paginated, animated, on any device.`}
                </p>
                <div className="flex gap-3">
                  <button onClick={() => setDone(true)} className="flex-1 py-3 bg-stone-900 text-[#FAF6EE] text-[11px] uppercase tracking-[0.2em] hover:bg-stone-700 transition">{exporting === 'pdf' ? 'Generate PDF' : 'Send link'}</button>
                  <button onClick={() => setExporting(null)} className="px-5 py-3 border border-stone-300 text-[11px] uppercase tracking-[0.2em] text-stone-600">Cancel</button>
                </div>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="text-[44px] italic text-stone-900 mb-3">{exporting === 'pdf' ? 'Exported.' : 'Sent.'}</div>
                <div className="text-[14px] italic text-stone-600 mb-8">{exporting === 'pdf' ? 'Catalogue.pdf · 4.2 MB' : `${s.recipientName} will be notified.`}</div>
                <button onClick={() => { setExporting(null); setDone(false) }} className="text-[11px] uppercase tracking-[0.2em] text-stone-500 underline">close</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function CropMarks() {
  const M = 'absolute w-[14px] h-[14px] z-10 pointer-events-none'
  return <>
    <div className={`${M} top-[-22px] left-[-22px] border-t border-l border-amber-500/60`} />
    <div className={`${M} top-[-22px] right-[-22px] border-t border-r border-amber-500/60`} />
    <div className={`${M} bottom-[-22px] left-[-22px] border-b border-l border-amber-500/60`} />
    <div className={`${M} bottom-[-22px] right-[-22px] border-b border-r border-amber-500/60`} />
  </>
}

function Page({ page, state, onSet, onSetImg }: any) {
  const PAPER = "bg-[#F4EEDC] text-stone-900 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6),0_8px_24px_-8px_rgba(0,0,0,0.3)] relative"
  const W = 700, H = 980
  const Editable = ({ value, onChange, className = '', as: Tag = 'div', multiline = false, placeholder = '' }: any) => (
    <Tag contentEditable suppressContentEditableWarning data-placeholder={placeholder}
      onBlur={(e: any) => onChange(e.currentTarget.textContent)}
      onKeyDown={(e: any) => { if (!multiline && e.key === 'Enter') { e.preventDefault(); e.currentTarget.blur() } }}
      className={`outline-none focus:bg-amber-100/40 hover:bg-amber-50/40 px-1 -mx-1 rounded transition empty:before:content-[attr(data-placeholder)] empty:before:text-stone-400 empty:before:italic ${className}`}>
      {value}
    </Tag>
  )
  const isPlate = page >= 2 && page < 2 + state.images.length
  const plateIdx = page - 2

  return (
    <div className={PAPER} style={{ width: W, height: H, fontFamily: '"EB Garamond", Georgia, serif' }}>
      {/* Subtle paper grain */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, #000 1px, transparent 1px), radial-gradient(circle at 70% 60%, #000 1px, transparent 1px)', backgroundSize: '4px 4px, 7px 7px' }} />

      {page === 0 && (
        // COVER
        <div className="h-full flex flex-col items-center justify-between py-32 px-20 text-center relative">
          <div className="text-[10px] tracking-[0.5em] uppercase text-stone-700">{state.galleryName}</div>
          <div>
            <Editable as="h1" value={state.showTitle} onChange={(v: string) => onSet('showTitle', v)} placeholder="Title"
              className="text-[72px] italic leading-[0.95] mb-6" />
            <Editable value={state.showSubtitle} onChange={(v: string) => onSet('showSubtitle', v)} placeholder="Subtitle"
              className="text-[16px] text-stone-600 italic max-w-[460px] mx-auto leading-snug" />
            <div className="mt-12 inline-flex items-center gap-4 text-[10px] tracking-[0.32em] uppercase text-stone-500">
              <span className="block w-12 h-px bg-stone-500" />
              <span>{state.images.length.toString().padStart(2, '0')} plates</span>
              <span className="block w-12 h-px bg-stone-500" />
            </div>
          </div>
          <div className="text-[10px] tracking-[0.32em] uppercase text-stone-500">{new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</div>
        </div>
      )}

      {page === 1 && (
        // LETTER
        <div className="h-full px-24 py-28 flex flex-col">
          <div className="text-[10px] tracking-[0.32em] uppercase text-stone-500 mb-8">Letter</div>
          <div className="text-[14px] italic text-stone-700 mb-2">To <Editable as="span" value={state.recipientName} onChange={(v: string) => onSet('recipientName', v)} placeholder="recipient" className="not-italic font-medium" /></div>
          <Editable as="p" multiline value={state.intro} onChange={(v: string) => onSet('intro', v)}
            placeholder="A personal letter…"
            className="text-[19px] leading-[1.65] text-stone-800 italic mt-8 first-letter:text-[64px] first-letter:float-left first-letter:font-normal first-letter:not-italic first-letter:leading-[0.85] first-letter:mt-1.5 first-letter:mr-3" />
          <div className="mt-auto pt-12 text-right text-[14px] italic text-stone-700">
            With my warmest, <br />
            <Editable as="span" value={state.galleryName} onChange={(v: string) => onSet('galleryName', v)} className="not-italic font-medium" />
          </div>
        </div>
      )}

      {isPlate && (
        // PLATE
        <div className="h-full flex flex-col">
          <div className="px-12 py-6 flex items-center justify-between text-[10px] tracking-[0.32em] uppercase text-stone-500 border-b border-stone-300">
            <span>Plate {(plateIdx + 1).toString().padStart(2, '0')}</span>
            <span className="italic normal-case tracking-normal text-[11px]">{state.images[plateIdx]?.artist}</span>
          </div>
          <div className="flex-1 flex items-center justify-center px-12 py-8 bg-[#F4EEDC]">
            <img src={state.images[plateIdx].url} alt="" className="max-h-[480px] max-w-full object-contain shadow-[0_2px_24px_rgba(0,0,0,0.15)]" />
          </div>
          <div className="px-12 py-8 border-t border-stone-300 grid grid-cols-2 gap-6">
            <div>
              <Editable value={state.images[plateIdx].artist} onChange={(v: string) => onSetImg(state.images[plateIdx].id, 'artist', v)} placeholder="Artist" className="text-[16px] font-medium" />
              <Editable value={state.images[plateIdx].title} onChange={(v: string) => onSetImg(state.images[plateIdx].id, 'title', v)} placeholder="Title" className="text-[15px] italic text-stone-700 mt-0.5" />
            </div>
            <div className="text-right text-[12px] text-stone-600 space-y-0.5">
              <Editable value={state.images[plateIdx].year} onChange={(v: string) => onSetImg(state.images[plateIdx].id, 'year', v)} placeholder="2026" className="tabular-nums" />
              <Editable value={state.images[plateIdx].medium} onChange={(v: string) => onSetImg(state.images[plateIdx].id, 'medium', v)} placeholder="Medium" />
              <Editable value={state.images[plateIdx].dimensions} onChange={(v: string) => onSetImg(state.images[plateIdx].id, 'dimensions', v)} placeholder="Dimensions" className="tabular-nums" />
              <Editable value={state.images[plateIdx].price} onChange={(v: string) => onSetImg(state.images[plateIdx].id, 'price', v)} placeholder="Price" className="text-stone-900 mt-2 not-italic font-medium" />
            </div>
          </div>
          <div className="px-12 py-3 text-center text-[10px] tracking-[0.32em] uppercase text-stone-500 border-t border-stone-300">
            {state.galleryName} · {new Date().getFullYear()}
          </div>
        </div>
      )}

      {page === 2 + state.images.length && (
        // COLOPHON
        <div className="h-full flex flex-col items-center justify-between py-32 px-20 text-center">
          <div className="text-[10px] tracking-[0.5em] uppercase text-stone-700">Colophon</div>
          <div className="space-y-6">
            <div className="text-[26px] italic leading-tight">This catalogue was prepared for the private viewing of <span className="not-italic font-medium">{state.recipientName}</span>.</div>
            <div className="text-[13px] italic text-stone-600">Set in Adobe Garamond Pro · printed on 90 gsm cream wove · {state.images.length} plates · {new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</div>
          </div>
          <div className="text-[11px] tracking-[0.32em] uppercase text-stone-500 leading-loose">
            <Editable value={state.galleryName} onChange={(v: string) => onSet('galleryName', v)} placeholder="Gallery" />
            <Editable value={state.address} onChange={(v: string) => onSet('address', v)} placeholder="Address" className="block normal-case tracking-normal italic text-[12px] mt-2" />
            <Editable value={state.contact} onChange={(v: string) => onSet('contact', v)} placeholder="Contact" className="block normal-case tracking-normal text-[12px] mt-1 tabular-nums" />
          </div>
        </div>
      )}
    </div>
  )
}
