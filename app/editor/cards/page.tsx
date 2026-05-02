'use client'
import { useState, useRef, useEffect } from 'react'

export const dynamic = 'force-dynamic'

type State = {
  recipientName: string
  recipientEmail: string
  title: string
  subtitle: string
  images: { url: string; title: string }[]
  intro: string
  galleryName: string
  contact: string
}

type Card =
  | { kind: 'welcome' }
  | { kind: 'text'; key: keyof State; question: string; sub?: string; placeholder: string; multiline?: boolean }
  | { kind: 'images' }
  | { kind: 'review' }

const CARDS: Card[] = [
  { kind: 'welcome' },
  { kind: 'text', key: 'recipientName',  question: 'Who is this for?',     sub: 'Their first name is fine.',      placeholder: 'Jean' },
  { kind: 'text', key: 'recipientEmail', question: "What's their email?",   sub: 'Only they will see the room.',  placeholder: 'jean@collector.com' },
  { kind: 'text', key: 'title',          question: 'Name the show.',         sub: 'A few words. Be specific.',     placeholder: 'Spring Selection' },
  { kind: 'text', key: 'subtitle',       question: 'Subtitle?',              sub: 'Optional. Press skip to pass.', placeholder: 'New paintings — 2026' },
  { kind: 'images' },
  { kind: 'text', key: 'intro',          question: 'A note to them.',        sub: 'Write what you would say in person.', placeholder: 'Dear Jean…', multiline: true },
  { kind: 'text', key: 'galleryName',    question: 'Sign it.',               sub: 'Your gallery name.',            placeholder: 'Vitreen' },
  { kind: 'text', key: 'contact',        question: 'Reach you back?',        sub: 'Where they reply.',             placeholder: 'thomas@vitreen.art' },
  { kind: 'review' },
]

const PALETTE = ['#FAFAF8','#0E0D0B','#F4D74E','#A8C99A','#E8423B','#F4EFE7','#2D5BFF','#0E0D0B','#F4EEDC','#FAFAF8']

export default function CardsEditor() {
  const [s, setS] = useState<State>({
    recipientName: '', recipientEmail: '', title: '', subtitle: '',
    images: [], intro: '', galleryName: '', contact: '',
  })
  const [idx, setIdx] = useState(0)
  const [draft, setDraft] = useState('')
  const [sent, setSent] = useState(false)
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null)

  const card = CARDS[idx]
  const dark = ['#0E0D0B','#2D5BFF','#E8423B'].includes(PALETTE[idx])
  const fg = dark ? '#FAFAF8' : '#0E0D0B'
  const muted = dark ? 'rgba(250,250,248,0.6)' : 'rgba(14,13,11,0.5)'

  useEffect(() => {
    setDraft(card.kind === 'text' ? (s[card.key] as string) || '' : '')
    setTimeout(() => inputRef.current?.focus(), 50)
  }, [idx])

  const next = () => {
    if (card.kind === 'text') setS(p => ({ ...p, [card.key]: draft }))
    if (idx < CARDS.length - 1) setIdx(i => i + 1)
  }
  const back = () => idx > 0 && setIdx(i => i - 1)
  const skip = () => { if (card.kind === 'text') setS(p => ({ ...p, [card.key]: '' })); next() }

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (card.kind === 'text' && !card.multiline || card.kind === 'welcome')) { e.preventDefault(); next() }
    if (e.key === 'Escape') back()
  }

  const onFiles = (files: FileList | null) => {
    if (!files) return
    const arr = Array.from(files).map(f => ({ url: URL.createObjectURL(f), title: f.name.replace(/\.[^.]+$/, '') }))
    setS(p => ({ ...p, images: [...p.images, ...arr] }))
  }

  return (
    <div onKeyDown={onKey} tabIndex={-1} className="min-h-screen w-full overflow-hidden focus:outline-none transition-colors duration-500" style={{ background: PALETTE[idx], color: fg, fontFamily: '"Recoleta", "Inter", -apple-system, sans-serif' }}>
      {/* Progress + nav */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="h-[3px] bg-black/5">
          <div className="h-full transition-all duration-300" style={{ width: `${((idx + 1) / CARDS.length) * 100}%`, background: dark ? '#fff' : '#0E0D0B' }} />
        </div>
        <div className="flex justify-between items-center px-8 py-5">
          <div className="text-[10px] uppercase tracking-[0.3em]" style={{ color: muted }}>vitreen · {idx + 1} of {CARDS.length}</div>
          <div className="flex items-center gap-3 text-[11px]" style={{ color: muted }}>
            <button onClick={back} disabled={idx === 0} className="px-2 py-1 disabled:opacity-30 hover:opacity-100 transition">← back</button>
            {card.kind !== 'welcome' && card.kind !== 'review' && card.kind !== 'images' && <button onClick={skip} className="px-2 py-1 hover:opacity-100 transition">skip</button>}
            <span className="opacity-50">esc · enter</span>
          </div>
        </div>
      </div>

      {/* Card content */}
      <div className="min-h-screen flex flex-col items-center justify-center px-8">
        <div className="w-full max-w-[640px]">

          {card.kind === 'welcome' && (
            <div className="text-center">
              <div className="text-[12px] uppercase tracking-[0.4em] mb-8" style={{ color: muted }}>a viewing room in 9 cards</div>
              <div className="text-[88px] leading-[0.95] font-medium tracking-tight mb-8">Let's send something beautiful.</div>
              <button onClick={next} className="text-[14px] uppercase tracking-[0.18em] px-7 py-3.5 border-2 border-current hover:opacity-70 transition">begin →</button>
              <div className="text-[12px] mt-6" style={{ color: muted }}>press enter</div>
            </div>
          )}

          {card.kind === 'text' && (
            <div>
              <div className="text-[12px] uppercase tracking-[0.3em] mb-3" style={{ color: muted }}>{idx === 1 || idx === 2 ? 'Recipient' : idx === 3 || idx === 4 ? 'The show' : idx === 6 ? 'Your message' : 'You'}</div>
              <div className="text-[64px] leading-[1.05] font-medium tracking-tight mb-3">{card.question}</div>
              {card.sub && <div className="text-[18px] mb-10" style={{ color: muted }}>{card.sub}</div>}
              {!card.multiline ? (
                <input
                  ref={r => { inputRef.current = r }}
                  value={draft}
                  onChange={e => setDraft(e.target.value)}
                  placeholder={card.placeholder}
                  className="w-full bg-transparent border-b-2 border-current pb-3 text-[36px] outline-none placeholder:opacity-25"
                  style={{ borderColor: fg }}
                />
              ) : (
                <textarea
                  ref={r => { inputRef.current = r }}
                  value={draft}
                  onChange={e => setDraft(e.target.value)}
                  placeholder={card.placeholder}
                  rows={4}
                  className="w-full bg-transparent border-b-2 border-current pb-3 text-[24px] leading-[1.4] outline-none resize-none placeholder:opacity-25"
                  style={{ borderColor: fg }}
                />
              )}
              <div className="mt-10 flex items-center gap-4">
                <button onClick={next} className="text-[14px] uppercase tracking-[0.18em] px-7 py-3.5 border-2 border-current hover:opacity-70 transition">continue →</button>
                <span className="text-[12px]" style={{ color: muted }}>press enter</span>
              </div>
            </div>
          )}

          {card.kind === 'images' && (
            <div>
              <div className="text-[12px] uppercase tracking-[0.3em] mb-3" style={{ color: muted }}>The artworks</div>
              <div className="text-[64px] leading-[1.05] font-medium tracking-tight mb-10">Drop them in.</div>
              <label className="block w-full border-2 border-dashed border-current py-20 text-center cursor-pointer hover:bg-current/5 transition">
                <input type="file" accept="image/*" multiple className="hidden" onChange={e => onFiles(e.target.files)} />
                <div className="text-[20px]">{s.images.length === 0 ? 'click to choose images' : `+ add more`}</div>
                {s.images.length > 0 && <div className="text-[12px] mt-2" style={{ color: muted }}>{s.images.length} added</div>}
              </label>
              {s.images.length > 0 && (
                <div className="grid grid-cols-4 gap-3 mt-6">
                  {s.images.slice(0, 8).map((img, i) => (
                    <div key={i} className="aspect-square overflow-hidden bg-black/5"><img src={img.url} alt="" className="w-full h-full object-cover" /></div>
                  ))}
                </div>
              )}
              <div className="mt-10 flex items-center gap-4">
                <button onClick={next} disabled={s.images.length === 0} className="text-[14px] uppercase tracking-[0.18em] px-7 py-3.5 border-2 border-current hover:opacity-70 transition disabled:opacity-30">continue →</button>
                <span className="text-[12px]" style={{ color: muted }}>{s.images.length === 0 ? 'add at least one' : 'press enter'}</span>
              </div>
            </div>
          )}

          {card.kind === 'review' && !sent && (
            <div>
              <div className="text-[12px] uppercase tracking-[0.3em] mb-3" style={{ color: muted }}>Final</div>
              <div className="text-[64px] leading-[1.05] font-medium tracking-tight mb-8">Send to {s.recipientName || 'them'}?</div>
              <div className="border border-current/30 p-6 mb-8 space-y-2 text-[15px]">
                <div><span style={{ color: muted }}>To</span> · {s.recipientName} &lt;{s.recipientEmail}&gt;</div>
                <div><span style={{ color: muted }}>Show</span> · {s.title}{s.subtitle ? ` — ${s.subtitle}` : ''}</div>
                <div><span style={{ color: muted }}>Artworks</span> · {s.images.length}</div>
                <div><span style={{ color: muted }}>From</span> · {s.galleryName} ({s.contact})</div>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => setSent(true)} className="text-[14px] uppercase tracking-[0.18em] px-7 py-3.5 bg-current hover:opacity-80 transition" style={{ color: PALETTE[idx] }}>send →</button>
                <button onClick={back} className="text-[12px] uppercase tracking-[0.18em] underline" style={{ color: muted }}>edit</button>
              </div>
            </div>
          )}

          {card.kind === 'review' && sent && (
            <div className="text-center">
              <div className="text-[88px] leading-[0.95] font-medium tracking-tight mb-6">Sent.</div>
              <div className="text-[20px]" style={{ color: muted }}>{s.recipientName} will receive it shortly.</div>
              <a href="/editor/mvp" className="inline-block mt-10 text-[14px] uppercase tracking-[0.18em] underline">all variants</a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
