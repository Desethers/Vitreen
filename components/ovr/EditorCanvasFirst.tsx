'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { useOptionalUser, clerkEnabled } from '@/lib/useOptionalUser'
import type { Block, ImageItem, VrSetup } from '@/lib/ovr/buildTypes'
import { autoCompose } from '@/lib/ovr/autoCompose'
import ThemeToggle from '@/components/ovr/ThemeToggle'
import { ViewingRoomPreview, ExportPanel, SubscriptionModal } from '@/components/ovr/ViewingRoomApp'

const UserButton = clerkEnabled
  ? dynamic(() => import('@clerk/nextjs').then(m => ({ default: m.UserButton })), { ssr: false })
  : () => null

const DEFAULT_SETUP: VrSetup = {
  galleryName: '', headline: '', title: '', recipientName: '', recipientEmail: '',
  introText: '', galleryAddress: '', galleryContact: '',
}

// ─── Health bar ──────────────────────────────────────────────────────────────

function computeHealth(setup: VrSetup, images: ImageItem[], blocks: Block[]) {
  const checks = [
    { label: 'Recipient', ok: !!setup.recipientName },
    { label: 'Headline', ok: !!setup.headline },
    { label: 'Images', ok: images.length > 0 },
    { label: 'Layout', ok: blocks.length > 0 },
    { label: 'Titles', ok: images.length > 0 && images.every(i => i.title) },
    { label: 'Prices', ok: images.length > 0 && images.every(i => !i.showPrice || i.price) },
  ]
  const done = checks.filter(c => c.ok).length
  return { done, total: checks.length, checks, ratio: done / checks.length }
}

// ─── Hero entry ──────────────────────────────────────────────────────────────

function HeroEntry({ onUpload }: { onUpload: (files: File[]) => void }) {
  const ref = useRef<HTMLInputElement>(null)
  const [over, setOver] = useState(false)

  const handleFiles = (files: File[]) => {
    const imgs = files.filter(f => f.type.startsWith('image/'))
    if (imgs.length) onUpload(imgs)
  }

  return (
    <div
      onDragOver={e => { e.preventDefault(); setOver(true) }}
      onDragLeave={() => setOver(false)}
      onDrop={e => { e.preventDefault(); setOver(false); handleFiles([...e.dataTransfer.files]) }}
      className={`fixed inset-0 flex flex-col items-center justify-center transition-colors duration-300 ${
        over
          ? 'bg-gray-100 dark:bg-[#181818]'
          : 'bg-gray-50 dark:bg-[#111111]'
      }`}
    >
      <input
        ref={ref}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={e => { const fs = [...(e.target.files ?? [])]; handleFiles(fs); e.target.value = '' }}
      />

      {/* Decorative grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.04] dark:opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle at center, currentColor 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          color: 'rgb(17 17 17)',
        }}
      />

      <div className="relative z-10 max-w-xl px-6 text-center">
        <p className="hero-fade-up text-[11px] uppercase tracking-[0.3em] text-gray-400 dark:text-gray-600 mb-6">
          Vitreen Studio
        </p>

        <h1 className="hero-fade-up text-[42px] md:text-[56px] leading-[1.05] tracking-[-0.02em] text-gray-900 dark:text-gray-100 font-normal mb-5">
          Drop your artworks.
          <br />
          <span className="text-gray-400 dark:text-gray-500">We compose the room.</span>
        </h1>

        <p className="hero-fade-up hero-fade-up-delay text-[15px] text-gray-500 dark:text-gray-400 leading-relaxed mb-10 max-w-md mx-auto">
          From <strong className="font-medium text-gray-700 dark:text-gray-300">5 images</strong> to a viewing
          room your collector wants to open — in two seconds.
        </p>

        <button
          type="button"
          onClick={() => ref.current?.click()}
          className="hero-fade-up hero-fade-up-delay group inline-flex items-center gap-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-7 py-3.5 rounded-full text-[14px] font-medium tracking-tight hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-[0_10px_40px_rgba(0,0,0,0.15)]"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 4v16m-8-8h16" />
          </svg>
          Choose images
          <span className="text-[12px] opacity-50 ml-1">or drag them here</span>
        </button>

        <p className="hero-fade-up hero-fade-up-delay text-[12px] text-gray-400 dark:text-gray-600 mt-8">
          JPG · PNG · up to 30 MB each
        </p>
      </div>

      {/* Drop ring overlay */}
      {over && (
        <div className="absolute inset-6 rounded-3xl border-2 border-dashed border-gray-400 dark:border-gray-500 pointer-events-none animate-pulse" />
      )}

      {/* Top-right utilities */}
      <div className="absolute top-5 right-5 flex items-center gap-3 z-20">
        {clerkEnabled ? (
          <UserButton appearance={{ elements: { avatarBox: 'w-7 h-7' } }} />
        ) : null}
        <ThemeToggle />
      </div>
    </div>
  )
}

// ─── Floating action bar ─────────────────────────────────────────────────────

function ActionBar({
  onRegenerate, onAddImages, onOpenSettings, onSend, recipientName, sendDisabled,
}: {
  onRegenerate: () => void
  onAddImages: (files: File[]) => void
  onOpenSettings: () => void
  onSend: () => void
  recipientName: string
  sendDisabled: boolean
}) {
  const fileRef = useRef<HTMLInputElement>(null)

  const sendLabel = recipientName ? `Send to ${recipientName}` : 'Send'

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-30 vr-shell-fade">
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={e => {
          const fs = [...(e.target.files ?? [])].filter(f => f.type.startsWith('image/'))
          if (fs.length) onAddImages(fs)
          e.target.value = ''
        }}
      />
      <div className="flex items-center gap-1 bg-white/90 dark:bg-[#1c1c1c]/90 backdrop-blur-xl border border-gray-200/70 dark:border-gray-800 rounded-full pl-2 pr-1 py-1 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
        <button
          type="button"
          onClick={onRegenerate}
          className="group flex items-center gap-1.5 px-3 py-1.5 text-[12px] text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          title="Régénérer le layout avec les mêmes images"
        >
          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" className="group-hover:rotate-180 transition-transform duration-500">
            <path d="M3 12a9 9 0 0114.85-6.85L21 8m0-5v5h-5M21 12a9 9 0 01-14.85 6.85L3 16m0 5v-5h5"/>
          </svg>
          Regenerate
        </button>

        <span className="w-px h-4 bg-gray-200 dark:bg-gray-700" />

        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
        >
          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path d="M12 4v16m-8-8h16"/>
          </svg>
          Add images
        </button>

        <span className="w-px h-4 bg-gray-200 dark:bg-gray-700" />

        <button
          type="button"
          onClick={onOpenSettings}
          className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
        >
          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
          </svg>
          Settings
        </button>

        <button
          type="button"
          onClick={onSend}
          disabled={sendDisabled}
          className="ml-1 flex items-center gap-1.5 px-4 py-1.5 text-[12px] bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed rounded-full transition-colors font-medium"
        >
          {sendLabel}
          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 12h14m-6-6l6 6-6 6"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

// ─── Health pill (top-left) ──────────────────────────────────────────────────

function HealthPill({ ratio, done, total, checks }: ReturnType<typeof computeHealth>) {
  const [open, setOpen] = useState(false)
  const pct = Math.round(ratio * 100)
  const ready = pct === 100

  return (
    <div className="fixed top-4 left-4 z-30 vr-shell-fade">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="group flex items-center gap-2 bg-white/90 dark:bg-[#1c1c1c]/90 backdrop-blur-xl border border-gray-200/70 dark:border-gray-800 rounded-full px-3 py-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.1)] transition-shadow"
      >
        <div className="relative w-7 h-7">
          <svg viewBox="0 0 28 28" className="w-7 h-7 -rotate-90">
            <circle cx="14" cy="14" r="11" fill="none" className="stroke-gray-200 dark:stroke-gray-700" strokeWidth="2.5" />
            <circle
              cx="14" cy="14" r="11" fill="none"
              className={ready ? 'stroke-emerald-500' : 'stroke-gray-900 dark:stroke-white'}
              strokeWidth="2.5"
              strokeDasharray={`${(ratio * 2 * Math.PI * 11).toFixed(2)} 999`}
              strokeLinecap="round"
              style={{ transition: 'stroke-dasharray 600ms cubic-bezier(0.16, 1, 0.3, 1)' }}
            />
          </svg>
          <span className={`absolute inset-0 flex items-center justify-center text-[9px] font-medium ${ready ? 'text-emerald-600' : 'text-gray-700 dark:text-gray-300'}`}>
            {ready ? '✓' : `${pct}%`}
          </span>
        </div>
        <div className="text-left pr-1">
          <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-none">{ready ? 'Ready to send' : 'Room status'}</p>
          <p className="text-[12px] text-gray-900 dark:text-gray-100 leading-tight font-medium">{done}/{total} complete</p>
        </div>
        <svg className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      {open && (
        <div className="mt-2 w-64 bg-white/95 dark:bg-[#1c1c1c]/95 backdrop-blur-xl border border-gray-200/70 dark:border-gray-800 rounded-2xl p-3 shadow-[0_10px_40px_rgba(0,0,0,0.12)] vr-shell-fade">
          <p className="text-[11px] uppercase tracking-wider text-gray-400 dark:text-gray-600 mb-2 px-1">Checklist</p>
          <ul className="space-y-1">
            {checks.map(c => (
              <li key={c.label} className="flex items-center gap-2 px-1 py-1 text-[12px]">
                <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${c.ok ? 'bg-emerald-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-400'}`}>
                  {c.ok ? <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M2 6l3 3 5-6"/></svg> : null}
                </span>
                <span className={c.ok ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'}>{c.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

// ─── Settings drawer (slide-in from right) ───────────────────────────────────

function SettingsDrawer({
  open, onClose, setup, onChangeSetup, images, onChangeImages,
}: {
  open: boolean
  onClose: () => void
  setup: VrSetup
  onChangeSetup: (s: VrSetup) => void
  images: ImageItem[]
  onChangeImages: (imgs: ImageItem[]) => void
}) {
  const set = (k: keyof VrSetup, v: string) => onChangeSetup({ ...setup, [k]: v })
  const inputCls = 'w-full border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-[13px] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900/8 focus:border-gray-400 transition-colors'

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm vr-shell-fade"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed top-0 right-0 bottom-0 w-[380px] z-50 bg-white dark:bg-[#1c1c1c] border-l border-gray-200 dark:border-gray-800 flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="shrink-0 flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          <span className="text-[15px] font-medium text-gray-900 dark:text-gray-100 tracking-tight">Settings</span>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close"
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 6l12 12M6 18L18 6"/></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          <section>
            <h3 className="text-[11px] uppercase tracking-[0.15em] text-gray-400 dark:text-gray-600 mb-3">Recipient</h3>
            <div className="space-y-2.5">
              <input className={inputCls} placeholder="Name" value={setup.recipientName} onChange={e => set('recipientName', e.target.value)} />
              <input className={inputCls} placeholder="Email" type="email" value={setup.recipientEmail} onChange={e => set('recipientEmail', e.target.value)} />
            </div>
          </section>

          <section>
            <h3 className="text-[11px] uppercase tracking-[0.15em] text-gray-400 dark:text-gray-600 mb-3">Headline</h3>
            <div className="space-y-2.5">
              <input className={inputCls} placeholder="Gallery name" value={setup.galleryName} onChange={e => set('galleryName', e.target.value)} />
              <input className={inputCls} placeholder="Headline" value={setup.headline} onChange={e => set('headline', e.target.value)} />
              <input className={inputCls} placeholder="Subtitle" value={setup.title} onChange={e => set('title', e.target.value)} />
              <textarea className={inputCls} placeholder="Intro message" rows={3} value={setup.introText} onChange={e => set('introText', e.target.value)} />
            </div>
          </section>

          <section>
            <h3 className="text-[11px] uppercase tracking-[0.15em] text-gray-400 dark:text-gray-600 mb-3">Images ({images.length})</h3>
            <div className="grid grid-cols-3 gap-2">
              {images.map(img => (
                <div key={img.id} className="relative group/img aspect-square rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
                  {img.dataUrl ? (
                    <img src={img.dataUrl} alt={img.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-100 dark:bg-gray-800" />
                  )}
                  <button
                    type="button"
                    onClick={() => onChangeImages(images.filter(x => x.id !== img.id))}
                    className="absolute top-1 right-1 w-5 h-5 rounded-full bg-white/90 text-gray-700 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-[10px] shadow"
                    aria-label="Remove image"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-[11px] uppercase tracking-[0.15em] text-gray-400 dark:text-gray-600 mb-3">Footer</h3>
            <div className="space-y-2.5">
              <input className={inputCls} placeholder="Address" value={setup.galleryAddress} onChange={e => set('galleryAddress', e.target.value)} />
              <input className={inputCls} placeholder="Contact" value={setup.galleryContact} onChange={e => set('galleryContact', e.target.value)} />
            </div>
          </section>
        </div>
      </aside>
    </>
  )
}

// ─── Main shell ──────────────────────────────────────────────────────────────

export default function EditorCanvasFirst() {
  const { isPro, isSignedIn } = useOptionalUser()

  const [setup, setSetup] = useState<VrSetup>(DEFAULT_SETUP)
  const [images, setImages] = useState<ImageItem[]>([])
  const [blocks, setBlocks] = useState<Block[]>([])
  const [composeSeed, setComposeSeed] = useState(0)
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [exportOpen, setExportOpen] = useState(false)
  const [paywallOpen, setPaywallOpen] = useState(false)
  const [paywallReason, setPaywallReason] = useState<'template' | 'export_limit'>('template')
  const [hydrated, setHydrated] = useState(false)

  // Hydrate from sessionStorage
  useEffect(() => {
    try {
      const s = sessionStorage.getItem('vr_setup'); if (s) setSetup(JSON.parse(s))
      const i = sessionStorage.getItem('vr_images'); if (i) setImages(JSON.parse(i))
      const b = sessionStorage.getItem('vr_blocks'); if (b) setBlocks(JSON.parse(b))
    } catch { /* ignore */ }
    setHydrated(true)
  }, [])

  const saveSetup = useCallback((s: VrSetup) => {
    setSetup(s)
    try { sessionStorage.setItem('vr_setup', JSON.stringify(s)) } catch { /* ignore */ }
  }, [])
  const saveImages = useCallback((imgs: ImageItem[]) => {
    setImages(imgs)
    try { sessionStorage.setItem('vr_images', JSON.stringify(imgs)) } catch { /* ignore */ }
  }, [])
  const saveBlocks = useCallback((blks: Block[]) => {
    setBlocks(blks)
    try { sessionStorage.setItem('vr_blocks', JSON.stringify(blks)) } catch { /* ignore */ }
  }, [])

  const filesToImages = (files: File[]): Promise<ImageItem[]> =>
    Promise.all(files.map(f => new Promise<ImageItem>(resolve => {
      const r = new FileReader()
      r.onload = e => resolve({
        id: Math.random().toString(36).slice(2),
        dataUrl: e.target?.result as string,
        title: f.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
        artist: '', year: '', medium: '', dimensions: '', price: '', showPrice: false,
      })
      r.readAsDataURL(f)
    })))

  // Initial upload from Hero — auto-compose
  const handleHeroUpload = async (files: File[]) => {
    const newImages = await filesToImages(files)
    saveImages(newImages)
    const composed = autoCompose(newImages, 0)
    saveBlocks(composed)
    setComposeSeed(0)
    setShouldAnimate(true)
    // Clear animation flag after first render so subsequent edits don't re-stagger
    setTimeout(() => setShouldAnimate(false), 1200)
  }

  // Add images later — append, no recompose
  const handleAddImages = async (files: File[]) => {
    const newImages = await filesToImages(files)
    saveImages([...images, ...newImages])
  }

  const regenerate = () => {
    if (images.length === 0) return
    const next = composeSeed + 1
    const composed = autoCompose(images, next)
    setComposeSeed(next)
    saveBlocks(composed)
    setShouldAnimate(true)
    setTimeout(() => setShouldAnimate(false), 1200)
  }

  const health = computeHealth(setup, images, blocks)
  const sendDisabled = blocks.length === 0

  // Don't render hero before hydration to avoid flash
  if (!hydrated) {
    return <div className="min-h-screen bg-gray-50 dark:bg-[#111111]" />
  }

  // Hero state
  if (images.length === 0) {
    return <HeroEntry onUpload={handleHeroUpload} />
  }

  // Canvas state
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#111111] relative">
      <main className="absolute inset-0 overflow-y-auto">
        <ViewingRoomPreview
          setup={setup}
          images={images}
          blocks={blocks}
          isPro={isPro}
          noOffset
          blockEnter={shouldAnimate}
        />
      </main>

      <HealthPill {...health} />

      <ActionBar
        onRegenerate={regenerate}
        onAddImages={handleAddImages}
        onOpenSettings={() => setSettingsOpen(true)}
        onSend={() => setExportOpen(true)}
        recipientName={setup.recipientName}
        sendDisabled={sendDisabled}
      />

      {/* Top-right utilities — auth + theme */}
      <div className="fixed top-4 right-4 z-30 flex items-center gap-2 vr-shell-fade">
        {clerkEnabled && (
          isSignedIn
            ? <UserButton appearance={{ elements: { avatarBox: 'w-7 h-7' } }} />
            : <a href="https://vitreen.art/sign-in" className="text-[12px] text-white bg-gray-900 hover:bg-gray-700 transition-colors px-4 py-2 rounded-full">Sign in</a>
        )}
        <ThemeToggle />
      </div>

      <SettingsDrawer
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        setup={setup}
        onChangeSetup={saveSetup}
        images={images}
        onChangeImages={saveImages}
      />

      <ExportPanel
        open={exportOpen}
        onClose={() => setExportOpen(false)}
        blocks={blocks}
        images={images}
        setup={setup}
        onPaywall={() => { setPaywallReason('export_limit'); setPaywallOpen(true) }}
      />

      {paywallOpen && (
        <SubscriptionModal reason={paywallReason} onClose={() => setPaywallOpen(false)} />
      )}
    </div>
  )
}
