'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import StepNav from '@/components/ovr/StepNav'
import ThemeToggle from '@/components/ovr/ThemeToggle'
import type { Block, ImageItem, VrSetup } from '@/lib/ovr/buildTypes'

export default function ExportClient() {
  const router = useRouter()
  const [blocks, setBlocks] = useState<Block[]>([])
  const [images, setImages] = useState<ImageItem[]>([])
  const [setup, setSetup] = useState<VrSetup | null>(null)
  const [generating, setGenerating] = useState(false)
  const [saving, setSaving] = useState(false)
  const [shareUrl, setShareUrl] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const b = sessionStorage.getItem('vr_blocks')
    const imgs = sessionStorage.getItem('vr_images')
    const s = sessionStorage.getItem('vr_setup')
    if (b) { try { setBlocks(JSON.parse(b)) } catch { /* ignore */ } }
    if (imgs) { try { setImages(JSON.parse(imgs)) } catch { /* ignore */ } }
    if (s) { try { setSetup(JSON.parse(s)) } catch { /* ignore */ } }
  }, [])

  const handlePDF = async () => {
    setGenerating(true); setError(null)
    try {
      const res = await fetch('/api/ovr/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blocks, images, setup }),
      })
      if (!res.ok) throw new Error('Génération échouée')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a'); a.href = url
      a.download = `viewing-room-${Date.now()}.pdf`; a.click()
      URL.revokeObjectURL(url)
    } catch { setError('Erreur lors de la génération du PDF.') }
    finally { setGenerating(false) }
  }

  const handleShare = async () => {
    setSaving(true); setError(null)
    try {
      const res = await fetch('/api/ovr/viewing-rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blocks, images, setup }),
      })
      if (!res.ok) throw new Error('Sauvegarde échouée')
      const data = await res.json()
      setShareUrl(`${window.location.origin}/vr/${data.token}`)
    } catch { setError('Erreur lors de la sauvegarde.') }
    finally { setSaving(false) }
  }

  const copyLink = async () => {
    if (!shareUrl) return
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }

  const whatsappHref = shareUrl
    ? `https://wa.me/?text=${encodeURIComponent(`Voici votre Viewing Room : ${shareUrl}`)}`
    : null

  const emailHref = shareUrl && setup
    ? `mailto:${setup.recipientEmail}?subject=${encodeURIComponent(`Viewing Room — ${setup.galleryName}`)}&body=${encodeURIComponent(
        `Bonjour${setup.recipientName ? ` ${setup.recipientName}` : ''},\n\n${setup.introText ? setup.introText + '\n\n' : ''}Voici votre viewing room :\n${shareUrl}\n\nCordialement,\n${setup.galleryName}`
      )}`
    : null

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
      <header className="sticky top-0 z-10 bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur border-b border-gray-100 dark:border-gray-800 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-sm font-medium tracking-widest uppercase text-gray-500 dark:text-gray-400">Viewing Room</h1>
          <ThemeToggle />
        </div>
        <StepNav />
        <button onClick={() => router.push('/ovr/editor/build')}
          className="text-sm text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
          ← Modifier
        </button>
      </header>

      <main className="px-8 py-10 max-w-2xl mx-auto">
        <h2 className="text-xl font-serif text-gray-900 dark:text-gray-100 mb-1">Exporter</h2>
        {setup && (
          <p className="text-sm text-gray-400 mb-10">
            {setup.title}{setup.recipientName ? ` · pour ${setup.recipientName}` : ''} · {blocks.length} bloc{blocks.length !== 1 ? 's' : ''}
          </p>
        )}

        {error && (
          <div className="mb-6 px-4 py-3 border border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-800 text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {/* PDF */}
          <div className="border border-gray-100 dark:border-gray-800 p-6 flex items-center justify-between gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">Télécharger en PDF</h3>
              <p className="text-xs text-gray-400">Document haute résolution, prêt à partager</p>
            </div>
            <button onClick={handlePDF} disabled={generating || blocks.length === 0}
              className="shrink-0 px-4 py-2 bg-gray-900 dark:bg-white dark:text-gray-900 text-white text-sm hover:bg-gray-700 dark:hover:bg-gray-100 disabled:opacity-40 transition-colors flex items-center gap-2">
              {generating ? (
                <><svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Génération…</>
              ) : (
                <><svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>PDF</>
              )}
            </button>
          </div>

          {/* Share link */}
          <div className="border border-gray-100 dark:border-gray-800 p-6">
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">Lien de partage</h3>
            <p className="text-xs text-gray-400 mb-4">Page web accessible au destinataire, partageable par WhatsApp ou email</p>

            {!shareUrl ? (
              <button onClick={handleShare} disabled={saving || blocks.length === 0}
                className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 disabled:opacity-40 transition-colors">
                {saving ? 'Sauvegarde…' : 'Générer le lien'}
              </button>
            ) : (
              <div className="space-y-3">
                {/* URL bar */}
                <div className="flex gap-2">
                  <input readOnly value={shareUrl}
                    className="flex-1 px-3 py-2 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 focus:outline-none" />
                  <button onClick={copyLink}
                    className="px-3 py-2 border border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-400 hover:border-gray-400 transition-colors whitespace-nowrap">
                    {copied ? '✓ Copié' : 'Copier'}
                  </button>
                </div>

                {/* Share buttons */}
                <div className="flex gap-2 flex-wrap">
                  {whatsappHref && (
                    <a href={whatsappHref} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white text-sm hover:bg-[#1ebe5d] transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      WhatsApp
                    </a>
                  )}
                  {emailHref && (
                    <a href={emailHref}
                      className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                      </svg>
                      Email
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
