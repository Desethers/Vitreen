'use client'
import { useState, useEffect, useRef } from 'react'

export const dynamic = 'force-dynamic'

type Img = { id: string; url: string; title: string; artist: string; durationSec: number; recorded: boolean }
type State = {
  recipientName: string
  recipientEmail: string
  showTitle: string
  galleryName: string
  contact: string
  images: Img[]
}

const SEED: State = {
  recipientName: 'Jean Dupont',
  recipientEmail: 'jean@collector.com',
  showTitle: 'Spring Selection',
  galleryName: 'Vitreen',
  contact: 'thomas@vitreen.art',
  images: [
    { id: '1', url: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=1200&q=80', title: 'Untitled (Hour 3)', artist: 'Anna Levy', durationSec: 47, recorded: true },
    { id: '2', url: 'https://images.unsplash.com/photo-1577720580479-7d839d829c73?w=1200&q=80', title: 'Reverie', artist: 'Etienne Marot', durationSec: 32, recorded: true },
    { id: '3', url: 'https://images.unsplash.com/photo-1578321709636-3df8d52a3f00?w=1200&q=80', title: 'Garden, after rain', artist: 'Claire Renard', durationSec: 0, recorded: false },
  ],
}

const fmtTime = (n: number) => `${Math.floor(n / 60)}:${(n % 60).toString().padStart(2, '0')}`

export default function StudioEditor() {
  const [s, setS] = useState<State>(SEED)
  const [active, setActive] = useState<string>(SEED.images[0].id)
  const [recording, setRecording] = useState(false)
  const [recTime, setRecTime] = useState(0)
  const [showSettings, setShowSettings] = useState(false)
  const [sent, setSent] = useState(false)
  const intervalRef = useRef<any>(null)

  const set = <K extends keyof State>(k: K, v: State[K]) => setS(p => ({ ...p, [k]: v }))
  const setImg = (id: string, k: keyof Img, v: any) => setS(p => ({ ...p, images: p.images.map(i => i.id === id ? { ...i, [k]: v } : i) }))

  useEffect(() => {
    if (recording) intervalRef.current = setInterval(() => setRecTime(t => t + 1), 1000)
    else clearInterval(intervalRef.current)
    return () => clearInterval(intervalRef.current)
  }, [recording])

  const onFiles = (files: FileList | null) => {
    if (!files) return
    const arr: Img[] = Array.from(files).map(f => ({ id: Math.random().toString(36).slice(2), url: URL.createObjectURL(f), title: f.name.replace(/\.[^.]+$/, ''), artist: '', durationSec: 0, recorded: false }))
    setS(p => ({ ...p, images: [...p.images, ...arr] }))
  }

  const toggleRec = () => {
    if (!recording) {
      setRecording(true); setRecTime(0)
    } else {
      setRecording(false)
      setImg(active, 'durationSec', recTime)
      setImg(active, 'recorded', true)
    }
  }

  const activeImg = s.images.find(i => i.id === active)
  const totalDuration = s.images.reduce((a, b) => a + b.durationSec, 0)
  const recordedCount = s.images.filter(i => i.recorded).length
  const allRecorded = recordedCount === s.images.length

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-zinc-100" style={{ fontFamily: '-apple-system, "SF Pro Text", "Inter", sans-serif' }}>
      {/* Top bar */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-zinc-800 bg-[#101012]">
        <div className="flex items-baseline gap-3">
          <div className="text-[10px] tracking-[0.32em] uppercase text-zinc-500">Vitreen</div>
          <div className="text-zinc-700">·</div>
          <div className="text-[14px] font-medium">Studio</div>
          <div className="text-zinc-700">·</div>
          <div className="text-[12px] text-zinc-500">Voice walk-through for <span className="text-white">{s.recipientName}</span></div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-[11px] text-zinc-500 tabular-nums">
            <span className={`w-2 h-2 rounded-full ${allRecorded ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
            {recordedCount} of {s.images.length} recorded · {fmtTime(totalDuration)} total
          </div>
          <button onClick={() => setShowSettings(true)} className="px-3 py-1.5 text-[12px] text-zinc-400 border border-zinc-800 rounded-md hover:border-zinc-600">Details</button>
          <button onClick={() => setSent(true)} disabled={!allRecorded || s.images.length === 0}
            className="px-5 py-2 bg-rose-500 text-white text-[12px] font-semibold uppercase tracking-[0.16em] rounded-md hover:bg-rose-400 disabled:opacity-30 disabled:cursor-not-allowed transition">
            Send walk-through →
          </button>
        </div>
      </header>

      {sent && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center px-6">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-8">
              <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
            </div>
            <div className="text-[40px] font-medium tracking-tight mb-2">Sent to {s.recipientName}.</div>
            <div className="text-[14px] text-zinc-500 mb-10">{recordedCount} works · {fmtTime(totalDuration)} of audio · delivered to {s.recipientEmail}</div>
            <a href="/editor/mvp" className="text-[11px] uppercase tracking-[0.2em] text-zinc-500 underline hover:text-white">return to all variants</a>
          </div>
        </div>
      )}

      {/* MAIN STAGE */}
      <main className="grid grid-cols-[1fr_360px] gap-0 h-[calc(100vh-65px)]">
        {/* LEFT — active artwork + record */}
        <div className="relative flex flex-col items-center justify-center px-12 py-10 bg-[#0A0A0B]">
          {activeImg ? (
            <>
              <div className="text-[10px] uppercase tracking-[0.32em] text-zinc-500 mb-4">
                Now recording over · {s.images.findIndex(i => i.id === active) + 1} / {s.images.length}
              </div>

              {/* Artwork */}
              <div className="relative max-h-[55vh] max-w-[68vw] flex items-center justify-center mb-8">
                <img src={activeImg.url} alt="" className={`max-h-[55vh] max-w-full object-contain shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] transition ${recording ? 'ring-2 ring-rose-500/60' : ''}`} />
                {recording && <div className="absolute -top-3 -right-3 px-2.5 py-1 bg-rose-500 text-white text-[10px] uppercase tracking-[0.2em] rounded-md flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> Rec
                </div>}
              </div>

              {/* Caption */}
              <div className="text-center mb-10">
                <input value={activeImg.artist} onChange={e => setImg(active, 'artist', e.target.value)} placeholder="Artist"
                  className="bg-transparent text-[18px] font-medium text-white outline-none text-center placeholder:text-zinc-600" />
                <span className="text-zinc-600 mx-2">·</span>
                <input value={activeImg.title} onChange={e => setImg(active, 'title', e.target.value)} placeholder="Title"
                  className="bg-transparent text-[16px] italic text-zinc-300 outline-none placeholder:text-zinc-600" />
              </div>

              {/* Record control */}
              <button onClick={toggleRec}
                className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${recording ? 'bg-rose-500 scale-110' : 'bg-rose-500/10 border-2 border-rose-500 hover:scale-105'}`}>
                <span className={`block transition-all ${recording ? 'w-7 h-7 bg-white rounded-[3px]' : 'w-12 h-12 rounded-full bg-rose-500'}`} />
                {recording && (<>
                  <span className="absolute inset-0 rounded-full border-2 border-rose-500 animate-ping opacity-50" />
                  <span className="absolute inset-[-12px] rounded-full border border-rose-500/40 animate-pulse" />
                </>)}
              </button>

              <div className="mt-6 tabular-nums text-[14px] text-zinc-400">
                {recording ? fmtTime(recTime) : activeImg.recorded ? `${fmtTime(activeImg.durationSec)} recorded` : 'Press to record · hold spacebar'}
              </div>

              {/* Waveform — pure visual */}
              {(recording || activeImg.recorded) && (
                <div className="w-[480px] h-[44px] mt-6 flex items-center justify-center gap-[2px]">
                  {Array.from({ length: 80 }).map((_, i) => {
                    const h = recording ? 8 + Math.sin(Date.now()/200 + i) * 12 + Math.random() * 24 : 6 + ((i * 7) % 28)
                    return <span key={i} className={`w-[3px] rounded-full ${recording ? 'bg-rose-400' : 'bg-zinc-600'}`} style={{ height: `${h}px` }} />
                  })}
                </div>
              )}
            </>
          ) : (
            <div className="text-zinc-500 text-[14px] italic">Add artworks on the right →</div>
          )}
        </div>

        {/* RIGHT — track list */}
        <aside className="border-l border-zinc-800 bg-[#101012] overflow-y-auto">
          <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between">
            <div className="text-[10px] tracking-[0.24em] uppercase text-zinc-500">Tracks</div>
            <label className="text-[11px] text-zinc-400 hover:text-white cursor-pointer">
              <input type="file" accept="image/*" multiple className="hidden" onChange={e => onFiles(e.target.files)} />
              + add
            </label>
          </div>
          <div className="divide-y divide-zinc-800">
            {s.images.map((img, i) => {
              const isActive = img.id === active
              return (
                <button key={img.id} onClick={() => !recording && setActive(img.id)}
                  disabled={recording}
                  className={`w-full px-4 py-3 flex items-center gap-3 text-left transition ${isActive ? 'bg-zinc-800/50' : 'hover:bg-zinc-900/50'} ${recording ? 'cursor-not-allowed opacity-50' : ''}`}>
                  <div className="font-mono text-[10px] tabular-nums text-zinc-600 w-6">{(i + 1).toString().padStart(2, '0')}</div>
                  <div className="w-12 h-12 rounded overflow-hidden bg-zinc-900 shrink-0 relative">
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                    {img.recorded && <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-medium text-white truncate">{img.artist || 'Unnamed artist'}</div>
                    <div className="text-[11px] italic text-zinc-500 truncate">{img.title || 'Untitled'}</div>
                  </div>
                  <div className="text-[11px] tabular-nums text-right">
                    {img.recorded
                      ? <span className="text-zinc-400">{fmtTime(img.durationSec)}</span>
                      : <span className="text-rose-400 uppercase tracking-wider text-[9px]">No audio</span>}
                  </div>
                </button>
              )
            })}
          </div>

          <div className="px-5 py-5 border-t border-zinc-800 mt-2">
            <div className="text-[10px] tracking-[0.24em] uppercase text-zinc-500 mb-3">How it works</div>
            <p className="text-[12px] text-zinc-400 leading-relaxed">
              Walk through the gallery, point at the work, talk like you would in person. Each track becomes a 30–90s narration the collector listens to with the image, on their phone. No typing — your voice is the room.
            </p>
          </div>
        </aside>
      </main>

      {/* Details modal — recipient/show metadata */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 flex items-center justify-center px-4" onClick={() => setShowSettings(false)}>
          <div className="bg-[#101012] border border-zinc-800 rounded-xl max-w-[440px] w-full p-7 space-y-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-2">
              <div className="text-[10px] uppercase tracking-[0.24em] text-zinc-500">Walk-through details</div>
              <button onClick={() => setShowSettings(false)} className="text-zinc-500 hover:text-white">×</button>
            </div>
            {[
              { k: 'showTitle',     l: 'Title' },
              { k: 'recipientName', l: 'Recipient name' },
              { k: 'recipientEmail',l: 'Recipient email' },
              { k: 'galleryName',   l: 'Gallery name' },
              { k: 'contact',       l: 'Contact' },
            ].map(f => (
              <label key={f.k} className="block">
                <span className="text-[11px] text-zinc-500 mb-1 block">{f.l}</span>
                <input value={(s as any)[f.k]} onChange={e => set(f.k as any, e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-[13px] text-white outline-none focus:border-rose-500" />
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
