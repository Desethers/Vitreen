'use client'
import { useState, useRef, useEffect } from 'react'

export const dynamic = 'force-dynamic'

type Img = { id: string; url: string; title: string; artist: string; year: string; medium: string }
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

// Seeded sample so the empty state already looks like a real room.
const SEED: State = {
  galleryName: 'Vitreen',
  showTitle: 'Spring Selection',
  showSubtitle: 'New paintings — Anna Levy, Etienne Marot, Claire Renard',
  recipientName: 'Jean Dupont',
  recipientEmail: 'jean@collector.com',
  intro: 'Dear Jean — three new bodies of work arrived this week. I thought of your taste for the figurative-spectral when I unpacked the Levys. Take your time. I am here for any question.',
  contact: 'thomas@vitreen.art · +33 1 42 00 00 00',
  address: '12 rue Debelleyme, 75003 Paris',
  images: [
    { id: '1', url: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=1200&q=80', title: 'Untitled (Hour 3)', artist: 'Anna Levy', year: '2026', medium: 'Oil on linen, 160 × 120 cm' },
    { id: '2', url: 'https://images.unsplash.com/photo-1577720580479-7d839d829c73?w=1200&q=80', title: 'Reverie', artist: 'Etienne Marot', year: '2026', medium: 'Acrylic and pigment, 100 × 80 cm' },
    { id: '3', url: 'https://images.unsplash.com/photo-1578321709636-3df8d52a3f00?w=1200&q=80', title: 'Garden, after rain', artist: 'Claire Renard', year: '2025', medium: 'Oil on canvas, 90 × 70 cm' },
  ],
}

function Edit({ value, onChange, placeholder, className = '', as: Tag = 'span', multiline = false }: any) {
  const ref = useRef<any>(null)
  const [editing, setEditing] = useState(false)
  // Sync external value into DOM only when not editing (keeps caret stable while typing)
  useEffect(() => { if (!editing && ref.current && ref.current.textContent !== value) ref.current.textContent = value || '' }, [value, editing])
  return (
    <Tag
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      onFocus={() => setEditing(true)}
      onBlur={(e: any) => { setEditing(false); onChange(e.currentTarget.textContent || '') }}
      onKeyDown={(e: any) => { if (!multiline && e.key === 'Enter') { e.preventDefault(); e.currentTarget.blur() } }}
      data-placeholder={placeholder}
      className={`outline-none cursor-text rounded-[3px] px-1 -mx-1 transition-all duration-150 hover:bg-[#F1ECE0] focus:bg-[#F4EFE2] focus:shadow-[inset_0_-2px_0_#A87C2A] empty:before:content-[attr(data-placeholder)] empty:before:text-stone-400 empty:before:italic ${className}`}
    />
  )
}

export default function CanvasEditor() {
  const [s, setS] = useState<State>(SEED)
  const [showSend, setShowSend] = useState(false)
  const [sent, setSent] = useState(false)
  const [hint, setHint] = useState(true)

  const set = <K extends keyof State>(k: K, v: State[K]) => setS(p => ({ ...p, [k]: v }))
  const setImg = (id: string, k: keyof Img, v: string) => setS(p => ({ ...p, images: p.images.map(i => i.id === id ? { ...i, [k]: v } : i) }))
  const removeImg = (id: string) => setS(p => ({ ...p, images: p.images.filter(i => i.id !== id) }))

  const onFiles = (files: FileList | null) => {
    if (!files) return
    const arr: Img[] = Array.from(files).map(f => ({
      id: Math.random().toString(36).slice(2),
      url: URL.createObjectURL(f),
      title: f.name.replace(/\.[^.]+$/, ''),
      artist: '', year: '', medium: '',
    }))
    setS(p => ({ ...p, images: [...p.images, ...arr] }))
  }
  const onDrop = (e: React.DragEvent) => { e.preventDefault(); if (e.dataTransfer.files.length) onFiles(e.dataTransfer.files) }

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-stone-900"
      style={{ fontFamily: '"EB Garamond", "Cormorant Garamond", Georgia, serif' }}
      onDragOver={e => e.preventDefault()} onDrop={onDrop}>

      {/* Top recipient strip — makes "you are sending to" inescapably clear */}
      <div className="sticky top-0 z-40 bg-[#FAF6EE]/90 backdrop-blur border-b border-stone-200">
        <div className="max-w-[1080px] mx-auto px-10 py-3 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3 text-[12px] tracking-[0.18em] uppercase text-stone-500">
            <span className="font-semibold text-stone-800">Vitreen</span>
            <span className="text-stone-300">·</span>
            <span>Canvas</span>
            <span className="text-stone-300">·</span>
            <span className="italic normal-case tracking-normal text-[13px] text-stone-500">private viewing for </span>
            <Edit value={s.recipientName} onChange={(v: string) => set('recipientName', v)} placeholder="recipient name" className="font-semibold text-stone-900 text-[13px] tracking-normal normal-case" />
            <span className="text-stone-300">›</span>
            <Edit value={s.recipientEmail} onChange={(v: string) => set('recipientEmail', v)} placeholder="email" className="text-stone-500 text-[12px] tracking-normal normal-case" />
          </div>
          <button onClick={() => setShowSend(true)} disabled={s.images.length === 0 || !s.showTitle}
            className="px-5 py-2 bg-stone-900 text-[#FAF6EE] text-[11px] tracking-[0.2em] uppercase hover:bg-stone-700 disabled:opacity-40 transition shrink-0">
            Send →
          </button>
        </div>
      </div>

      {hint && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-[#FAF6EE] text-[12px] px-4 py-2.5 rounded-full shadow-lg flex items-center gap-3">
          <span>Click anything to edit · drop images on the page</span>
          <button onClick={() => setHint(false)} className="opacity-50 hover:opacity-100">×</button>
        </div>
      )}

      {/* The viewing room — composes itself, the editor IS the artifact */}
      <article className="max-w-[1080px] mx-auto px-10 py-20">
        {/* Mast */}
        <header className="text-center mb-24 relative">
          <Edit value={s.galleryName} onChange={(v: string) => set('galleryName', v)} placeholder="Gallery"
            className="block text-[10px] tracking-[0.4em] uppercase text-stone-500" />
          <Edit as="h1" value={s.showTitle} onChange={(v: string) => set('showTitle', v)} placeholder="Title of the show"
            className="block text-[88px] leading-[0.95] font-normal italic mt-7 text-stone-900" />
          <Edit value={s.showSubtitle} onChange={(v: string) => set('showSubtitle', v)} placeholder="Subtitle"
            className="block text-[18px] text-stone-600 mt-5 max-w-[640px] mx-auto leading-snug" />
          <div className="mt-10 inline-flex items-center gap-3 text-[10px] tracking-[0.32em] uppercase text-stone-400">
            <span className="block w-12 h-px bg-stone-300" />
            <span>{new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</span>
            <span className="block w-12 h-px bg-stone-300" />
          </div>
        </header>

        {/* Intro letter */}
        <div className="max-w-[640px] mx-auto mb-28">
          <div className="text-[10px] tracking-[0.32em] uppercase text-stone-400 mb-4">A note</div>
          <Edit multiline as="p" value={s.intro} onChange={(v: string) => set('intro', v)}
            placeholder="Write a personal note to them. The collector reads this first."
            className="block text-[20px] leading-[1.55] text-stone-800 italic" />
        </div>

        {/* Artworks */}
        {s.images.length === 0 ? (
          <label className="block max-w-[760px] mx-auto py-32 text-center cursor-pointer border-2 border-dashed border-stone-300 hover:border-stone-900 hover:bg-[#F4EFE2] transition group">
            <input type="file" accept="image/*" multiple className="hidden" onChange={e => onFiles(e.target.files)} />
            <div className="text-[44px] italic text-stone-400 group-hover:text-stone-900 transition mb-2">Drop artworks here</div>
            <div className="text-[13px] uppercase tracking-[0.24em] text-stone-400">or click to browse</div>
          </label>
        ) : (
          <div className="space-y-32">
            {s.images.map((img, i) => {
              const layout = i % 3 === 0 ? 'full' : i % 3 === 1 ? 'centered' : 'right'
              const wrap = layout === 'full' ? '' : layout === 'centered' ? 'max-w-[720px] mx-auto' : 'max-w-[520px] ml-auto'
              return (
                <figure key={img.id} className={`group relative ${wrap}`}>
                  <button onClick={() => removeImg(img.id)}
                    className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 bg-stone-900 text-[#FAF6EE] w-7 h-7 rounded-full text-[14px] leading-none transition">×</button>
                  <img src={img.url} alt={img.title} className="w-full h-auto block" />
                  <figcaption className="mt-6 text-center text-[14px] leading-relaxed">
                    <Edit value={img.artist} onChange={(v: string) => setImg(img.id, 'artist', v)} placeholder="Artist" className="font-medium text-stone-900" />
                    <span className="text-stone-400 mx-2">·</span>
                    <Edit value={img.title} onChange={(v: string) => setImg(img.id, 'title', v)} placeholder="Title" className="italic text-stone-700" />
                    <span className="text-stone-400 mx-2">·</span>
                    <Edit value={img.year} onChange={(v: string) => setImg(img.id, 'year', v)} placeholder="2026" className="text-stone-500 tabular-nums" />
                    <div className="mt-1">
                      <Edit value={img.medium} onChange={(v: string) => setImg(img.id, 'medium', v)} placeholder="Medium and dimensions" className="text-[13px] text-stone-500" />
                    </div>
                  </figcaption>
                </figure>
              )
            })}
            {/* Add more — sits inline like a slot */}
            <label className="block max-w-[480px] mx-auto py-12 text-center cursor-pointer border border-dashed border-stone-300 hover:border-stone-900 hover:bg-[#F4EFE2] transition">
              <input type="file" accept="image/*" multiple className="hidden" onChange={e => onFiles(e.target.files)} />
              <div className="text-[14px] italic text-stone-500">＋ add another artwork</div>
            </label>
          </div>
        )}

        {/* Footer / colophon */}
        <footer className="mt-40 pt-12 border-t border-stone-300 text-center space-y-2">
          <div className="text-[10px] tracking-[0.32em] uppercase text-stone-500">{s.galleryName || 'Gallery'}</div>
          <Edit value={s.address} onChange={(v: string) => set('address', v)} placeholder="Gallery address" className="text-[13px] italic text-stone-600 block" />
          <Edit value={s.contact} onChange={(v: string) => set('contact', v)} placeholder="Contact" className="text-[12px] text-stone-500 block tabular-nums" />
        </footer>
      </article>

      {/* Send modal */}
      {showSend && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center z-[60] px-4" onClick={() => !sent && setShowSend(false)}>
          <div className="bg-[#FAF6EE] max-w-[480px] w-full p-10 shadow-2xl" onClick={e => e.stopPropagation()}>
            {!sent ? (
              <>
                <div className="text-[10px] tracking-[0.4em] uppercase text-stone-500 mb-4">Confirm</div>
                <div className="text-[32px] italic leading-tight mb-6">Send to {s.recipientName || 'recipient'}?</div>
                <div className="text-[14px] text-stone-700 leading-relaxed mb-6 space-y-1">
                  <div><span className="text-stone-500">To · </span>{s.recipientEmail || 'no email yet'}</div>
                  <div><span className="text-stone-500">Show · </span>{s.showTitle}</div>
                  <div><span className="text-stone-500">Artworks · </span>{s.images.length}</div>
                </div>
                <div className="text-[12px] italic text-stone-500 mb-8 leading-relaxed">A private link will be sent to their inbox. Only they can open it. You will be notified when they do.</div>
                <div className="flex gap-3">
                  <button onClick={() => setSent(true)} className="flex-1 py-3 bg-stone-900 text-[#FAF6EE] text-[11px] uppercase tracking-[0.2em] hover:bg-stone-700 transition">Send now</button>
                  <button onClick={() => setShowSend(false)} className="px-5 py-3 border border-stone-300 text-[11px] uppercase tracking-[0.2em] text-stone-600 hover:bg-stone-100 transition">Cancel</button>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="text-[56px] italic text-emerald-700 mb-4">Sent.</div>
                <div className="text-[14px] text-stone-600 mb-8">{s.recipientName} will be notified.</div>
                <a href="/editor/mvp" className="text-[11px] uppercase tracking-[0.2em] text-stone-500 underline">return to all variants</a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
