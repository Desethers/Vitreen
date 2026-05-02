'use client'
import { useState, useRef } from 'react'

export const dynamic = 'force-dynamic'

type Img = { id: string; url: string; title: string; artist: string; year: string }
type State = {
  recipientName: string
  recipientEmail: string
  galleryName: string
  showTitle: string
  showSubtitle: string
  intro: string
  images: Img[]
  contact: string
}

const SEED: State = {
  recipientName: 'Jean',
  recipientEmail: 'jean@collector.com',
  galleryName: 'Vitreen',
  showTitle: 'Spring Selection',
  showSubtitle: 'New paintings, 2026',
  intro: 'Dear Jean — three works that thought of you when they arrived. Take your time.',
  contact: 'thomas@vitreen.art',
  images: [
    { id: '1', url: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800&q=80', title: 'Untitled (Hour 3)', artist: 'Anna Levy', year: '2026' },
    { id: '2', url: 'https://images.unsplash.com/photo-1577720580479-7d839d829c73?w=800&q=80', title: 'Reverie', artist: 'Etienne Marot', year: '2026' },
    { id: '3', url: 'https://images.unsplash.com/photo-1578321709636-3df8d52a3f00?w=800&q=80', title: 'Garden, after rain', artist: 'Claire Renard', year: '2025' },
  ],
}

export default function PocketEditor() {
  const [s, setS] = useState<State>(SEED)
  const [activeField, setActiveField] = useState<string | null>(null)
  const [scale, setScale] = useState(1)
  const [sent, setSent] = useState(false)

  const set = <K extends keyof State>(k: K, v: State[K]) => setS(p => ({ ...p, [k]: v }))
  const setImg = (id: string, k: keyof Img, v: string) => setS(p => ({ ...p, images: p.images.map(i => i.id === id ? { ...i, [k]: v } : i) }))
  const removeImg = (id: string) => setS(p => ({ ...p, images: p.images.filter(i => i.id !== id) }))

  const onFiles = (files: FileList | null) => {
    if (!files) return
    const arr: Img[] = Array.from(files).map(f => ({ id: Math.random().toString(36).slice(2), url: URL.createObjectURL(f), title: f.name.replace(/\.[^.]+$/, ''), artist: '', year: '' }))
    setS(p => ({ ...p, images: [...p.images, ...arr] }))
  }

  const now = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })

  return (
    <div className="min-h-screen bg-[#1B1A18] text-zinc-300 grid grid-cols-[280px_1fr_320px]" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif' }}>
      {/* LEFT — section nav */}
      <aside className="border-r border-zinc-800 bg-[#15140F]">
        <div className="px-5 py-5 border-b border-zinc-800">
          <div className="text-[10px] uppercase tracking-[0.32em] text-zinc-500">Vitreen</div>
          <div className="text-[14px] font-semibold text-white mt-1">Pocket</div>
          <div className="text-[11px] text-zinc-500 mt-1.5 leading-relaxed">Compose where they read. <span className="text-zinc-400">87%</span> of collectors open viewing rooms on their phone.</div>
        </div>
        <nav className="p-3 space-y-0.5 text-[13px]">
          {[
            { k: 'recipient', label: 'Recipient', sub: s.recipientName || 'Not set' },
            { k: 'cover', label: 'Cover',     sub: s.showTitle },
            { k: 'note',  label: 'Note',      sub: s.intro ? `${s.intro.length} chars` : 'Empty' },
            { k: 'works', label: 'Artworks',  sub: `${s.images.length} added` },
            { k: 'sign',  label: 'Signature', sub: s.contact },
          ].map(it => (
            <button key={it.k} onClick={() => setActiveField(it.k)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-left transition ${activeField === it.k ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'}`}>
              <div>
                <div className="font-medium">{it.label}</div>
                <div className="text-[11px] text-zinc-500 mt-0.5 truncate max-w-[200px]">{it.sub}</div>
              </div>
              <span className="text-zinc-600">›</span>
            </button>
          ))}
        </nav>
        <div className="px-5 pt-6 mt-2 border-t border-zinc-800">
          <div className="text-[10px] uppercase tracking-[0.24em] text-zinc-500 mb-3">Preview device</div>
          <div className="flex items-center gap-1.5 text-[11px]">
            {[{ k: 0.85, l: '85%' }, { k: 1, l: '100%' }, { k: 1.2, l: '120%' }].map(z => (
              <button key={z.k} onClick={() => setScale(z.k)} className={`px-2 py-1 rounded ${scale === z.k ? 'bg-white text-zinc-900' : 'text-zinc-500 hover:text-white'}`}>{z.l}</button>
            ))}
          </div>
        </div>
      </aside>

      {/* CENTER — phone */}
      <main className="flex items-center justify-center py-14 px-8 overflow-y-auto bg-gradient-to-br from-[#1B1A18] via-[#16161A] to-[#1B1A18]">
        <div className="relative" style={{ transform: `scale(${scale})`, transformOrigin: 'center center', transition: 'transform 0.3s' }}>
          {/* Phone shell */}
          <div className="relative w-[392px] h-[820px] bg-[#0E0D0B] rounded-[55px] border-[12px] border-[#0E0D0B] shadow-[0_50px_120px_-40px_rgba(0,0,0,0.8),inset_0_0_0_1px_rgba(255,255,255,0.05)]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[34px] bg-[#0E0D0B] rounded-b-[18px] z-30" />
            <div className="w-full h-full rounded-[44px] overflow-hidden bg-[#FAF6EE] text-stone-900 relative" style={{ fontFamily: '"EB Garamond", Georgia, serif' }}>
              {/* Status bar */}
              <div className="flex items-center justify-between px-7 pt-3 pb-1 text-[12px] font-semibold text-stone-900 z-20 relative">
                <span>{now}</span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-2.5 rounded-[2px] border border-stone-900 relative"><span className="absolute inset-0.5 bg-stone-900 w-[60%]" /></span>
                </span>
              </div>

              {/* Recipient header — what they see when opening */}
              <div className="px-6 pt-6 pb-4 border-b border-stone-200">
                <div className="text-[10px] uppercase tracking-[0.3em] text-stone-500 mb-1.5">A private viewing for</div>
                <div className="text-[18px] font-medium text-stone-900">{s.recipientName || 'Recipient'}</div>
                <div className="text-[11px] text-stone-500 mt-1 italic">From {s.galleryName}</div>
              </div>

              <div className="overflow-y-auto h-[calc(100%-145px)]">
                {/* Cover */}
                <div className="px-6 py-10 text-center border-b border-stone-200">
                  <div className="text-[9px] uppercase tracking-[0.32em] text-stone-500 mb-3">{s.galleryName}</div>
                  <div className="text-[36px] italic leading-[0.95] mb-2">{s.showTitle}</div>
                  <div className="text-[12px] italic text-stone-600">{s.showSubtitle}</div>
                </div>

                {/* Note */}
                {s.intro && <div className="px-7 py-7 text-[14px] italic leading-[1.55] text-stone-700 border-b border-stone-200">{s.intro}</div>}

                {/* Works */}
                {s.images.map(img => (
                  <div key={img.id} className="border-b border-stone-200">
                    <img src={img.url} alt="" className="w-full block" />
                    <div className="px-6 py-4 text-[11px] text-center">
                      <div className="font-medium">{img.artist}</div>
                      <div className="italic text-stone-600">{img.title}{img.year && `, ${img.year}`}</div>
                    </div>
                  </div>
                ))}

                {/* CTA */}
                <div className="px-6 py-7 text-center border-b border-stone-200">
                  <button className="w-full py-3 bg-stone-900 text-[#FAF6EE] text-[11px] uppercase tracking-[0.2em]">Inquire</button>
                </div>

                {/* Sign */}
                <div className="px-6 py-7 text-center text-[10px] text-stone-500">
                  <div>{s.galleryName}</div>
                  <div className="mt-1 tabular-nums">{s.contact}</div>
                </div>
              </div>

              {/* Home indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[5px] bg-stone-900 rounded-full opacity-30" />
            </div>
          </div>
          <div className="text-center mt-6 text-[11px] text-zinc-500 tracking-[0.2em] uppercase">iPhone 15 Pro · live preview</div>
        </div>
      </main>

      {/* RIGHT — context-sensitive editor */}
      <aside className="border-l border-zinc-800 bg-[#15140F] overflow-y-auto">
        {!activeField ? (
          <div className="p-6 text-[13px] text-zinc-400 leading-relaxed">
            <div className="text-[10px] uppercase tracking-[0.24em] text-zinc-500 mb-4">Idle</div>
            Select a section on the left. Edits apply live to the phone preview in the middle. The recipient sees exactly this.
          </div>
        ) : activeField === 'recipient' ? (
          <Editor title="Recipient">
            <Lab text="First name (or how you address them)"><Inp value={s.recipientName} onChange={(v: string) => set('recipientName', v)} placeholder="Jean" /></Lab>
            <Lab text="Email"><Inp value={s.recipientEmail} onChange={(v: string) => set('recipientEmail', v)} placeholder="jean@collector.com" mono /></Lab>
            <p className="text-[11px] text-zinc-500 leading-relaxed">Visible to them at the top of the viewing room. Phones make headers tiny — keep this short.</p>
          </Editor>
        ) : activeField === 'cover' ? (
          <Editor title="Cover">
            <Lab text="Gallery"><Inp value={s.galleryName} onChange={(v: string) => set('galleryName', v)} placeholder="Vitreen" /></Lab>
            <Lab text="Title of the show"><Inp value={s.showTitle} onChange={(v: string) => set('showTitle', v)} placeholder="Spring Selection" /></Lab>
            <Lab text="Subtitle"><Inp value={s.showSubtitle} onChange={(v: string) => set('showSubtitle', v)} placeholder="New paintings — 2026" /></Lab>
            <p className="text-[11px] text-zinc-500 leading-relaxed">Phone covers fit ~6 words. Yours: <span className="text-amber-400 tabular-nums">{s.showTitle.length}</span> chars in title.</p>
          </Editor>
        ) : activeField === 'note' ? (
          <Editor title="Note to them">
            <Lab text="Personal note"><textarea rows={9} value={s.intro} onChange={e => set('intro', e.target.value)} placeholder="Dear Jean…" className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-[13px] text-white outline-none focus:border-amber-500 resize-none" /></Lab>
            <p className="text-[11px] text-zinc-500 leading-relaxed">Recommended <span className="text-amber-400">240–400 chars</span> · You: <span className="text-white tabular-nums">{s.intro.length}</span></p>
          </Editor>
        ) : activeField === 'works' ? (
          <Editor title="Artworks">
            <label className="block w-full py-3 text-center bg-zinc-900 border border-dashed border-zinc-700 hover:border-amber-500 rounded-md text-[12px] text-zinc-300 cursor-pointer transition">
              <input type="file" accept="image/*" multiple className="hidden" onChange={e => onFiles(e.target.files)} />
              ＋ add artworks
            </label>
            <div className="space-y-2">
              {s.images.map(img => (
                <div key={img.id} className="bg-zinc-900 rounded-md p-2.5 space-y-1.5">
                  <div className="flex gap-2">
                    <img src={img.url} alt="" className="w-12 h-12 object-cover rounded shrink-0" />
                    <div className="flex-1 space-y-1">
                      <input value={img.artist} onChange={e => setImg(img.id, 'artist', e.target.value)} placeholder="Artist" className="w-full bg-transparent text-[12px] text-white outline-none placeholder:text-zinc-600" />
                      <input value={img.title} onChange={e => setImg(img.id, 'title', e.target.value)} placeholder="Title" className="w-full bg-transparent text-[11px] italic text-zinc-300 outline-none placeholder:text-zinc-600" />
                      <input value={img.year} onChange={e => setImg(img.id, 'year', e.target.value)} placeholder="2026" className="w-full bg-transparent text-[11px] text-zinc-500 outline-none placeholder:text-zinc-600 tabular-nums" />
                    </div>
                    <button onClick={() => removeImg(img.id)} className="self-start text-zinc-600 hover:text-red-400 text-[16px] leading-none">×</button>
                  </div>
                </div>
              ))}
            </div>
          </Editor>
        ) : (
          <Editor title="Signature">
            <Lab text="Reply-to address"><Inp value={s.contact} onChange={(v: string) => set('contact', v)} placeholder="thomas@vitreen.art" mono /></Lab>
            <p className="text-[11px] text-zinc-500 leading-relaxed">Inquiries go straight to this inbox.</p>
          </Editor>
        )}

        {/* Sticky send */}
        <div className="sticky bottom-0 bg-[#15140F] border-t border-zinc-800 p-4">
          {sent ? (
            <div className="text-center text-[12px] text-emerald-400 py-2">✓ Sent to {s.recipientName}</div>
          ) : (
            <button onClick={() => setSent(true)} disabled={s.images.length === 0 || !s.recipientEmail}
              className="w-full py-2.5 bg-amber-500 text-stone-900 text-[12px] font-semibold uppercase tracking-[0.18em] rounded-md hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed transition">
              Send to {s.recipientName || 'recipient'}
            </button>
          )}
          <div className="text-[10px] text-zinc-500 mt-2 text-center">Delivers via email · opens on their phone</div>
        </div>
      </aside>
    </div>
  )
}

function Editor({ title, children }: any) {
  return (
    <div className="p-5 space-y-4">
      <div className="text-[10px] uppercase tracking-[0.24em] text-zinc-500">{title}</div>
      {children}
    </div>
  )
}
function Lab({ text, children }: any) { return <label className="block space-y-1.5"><span className="text-[11px] text-zinc-400 font-medium block">{text}</span>{children}</label> }
function Inp({ value, onChange, placeholder, mono }: any) {
  return <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
    className={`w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-[13px] text-white outline-none focus:border-amber-500 placeholder:text-zinc-600 ${mono ? 'font-mono text-[12px]' : ''}`} />
}
