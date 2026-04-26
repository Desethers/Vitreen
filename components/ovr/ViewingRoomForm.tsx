'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

interface ArtworkResult {
  _id: string
  title: string
  year?: string
  imageUrl?: string
  artistName?: string
}

interface SelectedArtwork extends ArtworkResult {
  showPrice: boolean
}

export function ViewingRoomForm() {
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [recipientName, setRecipientName] = useState('')
  const [recipientEmail, setRecipientEmail] = useState('')
  const [message, setMessage] = useState('')
  const [expiresIn, setExpiresIn] = useState('30')

  const [artworkQuery, setArtworkQuery] = useState('')
  const [artworkResults, setArtworkResults] = useState<ArtworkResult[]>([])
  const [selectedArtworks, setSelectedArtworks] = useState<SelectedArtwork[]>([])
  const [showArtworkDrop, setShowArtworkDrop] = useState(false)
  const artworkTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchArtwork = (q: string) => {
    setArtworkQuery(q)
    if (artworkTimeout.current) clearTimeout(artworkTimeout.current)
    if (!q.trim()) { setArtworkResults([]); setShowArtworkDrop(false); return }
    artworkTimeout.current = setTimeout(async () => {
      const res = await fetch(`/api/ovr/artworks/search?q=${encodeURIComponent(q)}`)
      const data = await res.json()
      setArtworkResults(data.filter((a: ArtworkResult) => !selectedArtworks.find(s => s._id === a._id)))
      setShowArtworkDrop(true)
    }, 250)
  }

  const addArtwork = (artwork: ArtworkResult) => {
    setSelectedArtworks(prev => [...prev, { ...artwork, showPrice: true }])
    setArtworkQuery('')
    setArtworkResults([])
    setShowArtworkDrop(false)
  }

  const removeArtwork = (id: string) => setSelectedArtworks(prev => prev.filter(a => a._id !== id))
  const togglePrice = (id: string) => setSelectedArtworks(prev => prev.map(a => a._id === id ? { ...a, showPrice: !a.showPrice } : a))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) { setError('Le titre est requis'); return }
    if (selectedArtworks.length === 0) { setError('Ajoutez au moins une œuvre'); return }
    setSubmitting(true)
    setError(null)

    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + Number(expiresIn))

    // Save to session for compose/preview flow
    const artworksForSession = selectedArtworks.map(a => ({
      _id: a._id,
      title: a.title,
      year: a.year,
      artist: a.artistName ? { name: a.artistName } : undefined,
      image: a.imageUrl ? { _sanityUrl: a.imageUrl } : undefined,
    }))
    sessionStorage.setItem('vr_artworks', JSON.stringify(artworksForSession))
    sessionStorage.setItem('vr_gallery', title)
    sessionStorage.setItem('vr_showPrice', String(selectedArtworks.some(a => a.showPrice)))

    // Save to Sanity (non-blocking — proceed even if it fails)
    try {
      await fetch('/api/viewing-rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          recipientName: recipientName.trim(),
          recipientEmail: recipientEmail.trim(),
          personalMessage: message.trim(),
          artworks: selectedArtworks.map(a => ({ _id: a._id, showPrice: a.showPrice })),
          expiresAt: expiresAt.toISOString().split('T')[0],
        }),
      })
    } catch {
      // Sanity save failure is non-blocking
    }

    setSubmitting(false)
    router.push('/ovr/editor/compose')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">

      <Field label="Titre interne" required>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder='ex: "Sélection printemps — Jean Dupont"'
          className={inputCls}
          autoFocus
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Nom du destinataire">
          <input
            value={recipientName}
            onChange={e => setRecipientName(e.target.value)}
            placeholder="Nom du collectionneur"
            className={inputCls}
          />
        </Field>
        <Field label="Email">
          <input
            type="email"
            value={recipientEmail}
            onChange={e => setRecipientEmail(e.target.value)}
            placeholder="email@exemple.com"
            className={inputCls}
          />
        </Field>
      </div>

      <Field label="Œuvres" required>
        <div className="space-y-2">
          {selectedArtworks.length > 0 && (
            <div className="border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-800">
              {selectedArtworks.map((a, i) => (
                <div key={a._id} className="flex items-center gap-3 px-3 py-2.5 bg-white dark:bg-gray-900">
                  <span className="text-xs text-gray-300 w-4 tabular-nums">{i + 1}</span>
                  <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 overflow-hidden shrink-0">
                    {a.imageUrl
                      ? <img src={a.imageUrl} alt="" className="w-full h-full object-cover" />
                      : <div className="w-full h-full bg-gray-200 dark:bg-gray-700" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{a.title}{a.year && `, ${a.year}`}</p>
                    {a.artistName && <p className="text-xs text-gray-400 truncate">{a.artistName}</p>}
                  </div>
                  <label className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={a.showPrice}
                      onChange={() => togglePrice(a._id)}
                      className="border-gray-300"
                    />
                    Prix
                  </label>
                  <button
                    type="button"
                    onClick={() => removeArtwork(a._id)}
                    className="text-gray-300 hover:text-gray-600 transition-colors ml-1"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="relative">
            <input
              value={artworkQuery}
              onChange={e => searchArtwork(e.target.value)}
              onFocus={() => artworkResults.length > 0 && setShowArtworkDrop(true)}
              onBlur={() => setTimeout(() => setShowArtworkDrop(false), 150)}
              placeholder="Rechercher une œuvre…"
              className={inputCls}
              autoComplete="off"
            />
            {showArtworkDrop && artworkResults.length > 0 && (
              <ul className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden max-h-60 overflow-y-auto">
                {artworkResults.map(a => (
                  <li
                    key={a._id}
                    onMouseDown={() => addArtwork(a)}
                    className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                  >
                    <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 overflow-hidden shrink-0">
                      {a.imageUrl
                        ? <img src={a.imageUrl} alt="" className="w-full h-full object-cover" />
                        : <div className="w-full h-full bg-gray-200 dark:bg-gray-700" />
                      }
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{a.title}{a.year && `, ${a.year}`}</p>
                      {a.artistName && <p className="text-xs text-gray-400">{a.artistName}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {showArtworkDrop && artworkResults.length === 0 && artworkQuery.length > 1 && (
              <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg px-3 py-3 text-sm text-gray-400">
                Aucune œuvre trouvée
              </div>
            )}
          </div>
        </div>
      </Field>

      <Field label="Message personnalisé">
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Un message privé affiché en haut du viewing room…"
          rows={3}
          className={inputCls + ' resize-none'}
        />
      </Field>

      <Field label="Expire dans">
        <div className="flex gap-2">
          {['7', '14', '30', '60', '90'].map(d => (
            <button
              key={d}
              type="button"
              onClick={() => setExpiresIn(d)}
              className={[
                'px-3 py-1.5 text-sm border transition-all',
                expiresIn === d
                  ? 'bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-gray-900 dark:border-white'
                  : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500',
              ].join(' ')}
            >
              {d}j
            </button>
          ))}
        </div>
      </Field>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-3">{error}</p>
      )}

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="px-5 py-2.5 bg-gray-900 dark:bg-white dark:text-gray-900 text-white text-sm hover:bg-gray-700 dark:hover:bg-gray-100 disabled:opacity-50 transition-colors"
        >
          {submitting ? 'Création…' : 'Créer le viewing room →'}
        </button>
      </div>
    </form>
  )
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1.5">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  )
}

const inputCls = 'w-full px-3 py-2 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 transition-colors'
