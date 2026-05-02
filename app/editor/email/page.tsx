'use client'
import { useState, useRef } from 'react'

export const dynamic = 'force-dynamic'

type Img = { id: string; url: string; title: string; artist: string; price: string }
type State = {
  from: string
  to: string
  toName: string
  subject: string
  body: string
  images: Img[]
}

export default function EmailEditor() {
  const [s, setS] = useState<State>({
    from: '', to: '', toName: '', subject: '', body: '', images: [],
  })
  const [sent, setSent] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const set = <K extends keyof State>(k: K, v: State[K]) => setS(p => ({ ...p, [k]: v }))

  const addFiles = (files: FileList | null) => {
    if (!files) return
    const arr: Img[] = Array.from(files).map(f => ({
      id: Math.random().toString(36).slice(2),
      url: URL.createObjectURL(f),
      title: f.name.replace(/\.[^.]+$/, ''),
      artist: '',
      price: '',
    }))
    setS(p => ({ ...p, images: [...p.images, ...arr] }))
  }

  const removeImg = (id: string) => setS(p => ({ ...p, images: p.images.filter(i => i.id !== id) }))
  const editImg = (id: string, k: keyof Img, v: string) => setS(p => ({ ...p, images: p.images.map(i => i.id === id ? { ...i, [k]: v } : i) }))

  const ready = s.from && s.to && s.subject && s.body && s.images.length > 0

  if (sent) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif' }}>
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
          </div>
          <div className="text-[28px] font-semibold text-zinc-900 tracking-tight">Sent to {s.toName || s.to}</div>
          <div className="text-[14px] text-zinc-500 mt-2 mb-8">"{s.subject}" · {s.images.length} artwork{s.images.length === 1 ? '' : 's'}</div>
          <button onClick={() => { setSent(false); setS({ from: s.from, to: '', toName: '', subject: '', body: '', images: [] }) }}
            className="px-5 py-2.5 bg-zinc-900 text-white text-[13px] rounded-lg hover:bg-zinc-700 transition">
            Compose another
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] py-12 px-6" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif' }}>
      <div className="max-w-[760px] mx-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2 text-[12px] text-zinc-500">
            <span className="font-mono uppercase tracking-wider">vitreen</span>
            <span>·</span>
            <span>compose viewing room</span>
          </div>
          <div className="text-[11px] text-zinc-400">draft auto-saved</div>
        </div>

        {/* Compose card */}
        <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_32px_-12px_rgba(0,0,0,0.08)] overflow-hidden">
          {/* Headers */}
          <div className="px-6 py-3 border-b border-zinc-100 grid grid-cols-[60px_1fr] gap-x-3 items-center">
            <span className="text-[12px] text-zinc-400 font-mono">From</span>
            <input value={s.from} onChange={e => set('from', e.target.value)} placeholder="thomas@vitreen.art"
              className="bg-transparent outline-none text-[14px] text-zinc-900 placeholder:text-zinc-300" />
          </div>
          <div className="px-6 py-3 border-b border-zinc-100 grid grid-cols-[60px_1fr] gap-x-3 items-center">
            <span className="text-[12px] text-zinc-400 font-mono">To</span>
            <div className="flex gap-2">
              <input value={s.toName} onChange={e => set('toName', e.target.value)} placeholder="Jean Dupont"
                className="bg-transparent outline-none text-[14px] text-zinc-900 placeholder:text-zinc-300 w-[180px]" />
              <span className="text-zinc-300">&lt;</span>
              <input value={s.to} onChange={e => set('to', e.target.value)} placeholder="jean@collector.com"
                className="bg-transparent outline-none text-[14px] text-zinc-900 placeholder:text-zinc-300 flex-1" />
              <span className="text-zinc-300">&gt;</span>
            </div>
          </div>
          <div className="px-6 py-3 border-b border-zinc-100 grid grid-cols-[60px_1fr] gap-x-3 items-center">
            <span className="text-[12px] text-zinc-400 font-mono">Subject</span>
            <input value={s.subject} onChange={e => set('subject', e.target.value)} placeholder="Spring selection — new paintings"
              className="bg-transparent outline-none text-[15px] font-medium text-zinc-900 placeholder:text-zinc-300" />
          </div>

          {/* Body */}
          <div className="px-6 py-5">
            <textarea value={s.body} onChange={e => set('body', e.target.value)}
              placeholder={`Dear ${s.toName || 'Jean'},\n\nI thought of you when I saw these new works arriving at the gallery. Three pieces in particular felt like they belonged in your collection…`}
              rows={10}
              className="w-full bg-transparent outline-none resize-none text-[15px] leading-[1.65] text-zinc-800 placeholder:text-zinc-300" />

            {/* Inline artwork cards */}
            {s.images.length > 0 && (
              <div className="mt-4 space-y-3">
                {s.images.map(img => (
                  <div key={img.id} className="flex gap-4 p-3 rounded-xl border border-zinc-200/80 hover:border-zinc-300 transition group">
                    <div className="w-24 h-24 bg-zinc-100 rounded-lg overflow-hidden shrink-0">
                      <img src={img.url} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <input value={img.title} onChange={e => editImg(img.id, 'title', e.target.value)}
                        placeholder="Title"
                        className="w-full bg-transparent outline-none text-[14px] font-medium text-zinc-900 placeholder:text-zinc-300" />
                      <input value={img.artist} onChange={e => editImg(img.id, 'artist', e.target.value)}
                        placeholder="Artist · 2026 · oil on linen"
                        className="w-full bg-transparent outline-none text-[13px] text-zinc-500 placeholder:text-zinc-300" />
                      <input value={img.price} onChange={e => editImg(img.id, 'price', e.target.value)}
                        placeholder="€ on inquiry"
                        className="w-full bg-transparent outline-none text-[12px] text-zinc-600 font-mono placeholder:text-zinc-300" />
                    </div>
                    <button onClick={() => removeImg(img.id)}
                      className="self-start opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-red-500 text-[18px] leading-none transition">×</button>
                  </div>
                ))}
              </div>
            )}

            {/* Add artwork button */}
            <label className="inline-flex items-center gap-2 mt-4 px-3 py-2 text-[13px] text-zinc-600 border border-dashed border-zinc-300 rounded-lg hover:border-zinc-900 hover:text-zinc-900 cursor-pointer transition">
              <span className="text-[16px]">＋</span> attach artwork
              <input type="file" accept="image/*" multiple className="hidden" onChange={e => addFiles(e.target.files)} />
            </label>
          </div>

          {/* Send bar */}
          <div className="px-6 py-4 border-t border-zinc-100 bg-zinc-50/50 flex items-center justify-between">
            <div className="text-[12px] text-zinc-500">
              {s.images.length === 0 ? 'no artworks attached' : `${s.images.length} artwork${s.images.length === 1 ? '' : 's'} · viewing room link will be embedded`}
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 text-[13px] text-zinc-600 hover:text-zinc-900 transition">Save draft</button>
              <button onClick={() => ready && setSent(true)} disabled={!ready}
                className="px-5 py-2 bg-zinc-900 text-white text-[13px] font-medium rounded-lg hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition">
                Send →
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-6 text-[11px] text-zinc-400">
          The collector receives a beautiful HTML email — no login, no account, just the artworks. Inquiries go straight to your inbox.
        </div>
      </div>
    </div>
  )
}
