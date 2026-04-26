'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export default function OnboardingPage() {
  const { user } = useUser()
  const router = useRouter()

  const [galleryName, setGalleryName] = useState('')
  const [contactEmail, setContactEmail] = useState(
    (user?.primaryEmailAddress?.emailAddress) ?? ''
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!galleryName.trim()) {
      setError('Le nom de la galerie est requis.')
      return
    }
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ galleryName: galleryName.trim(), contactEmail: contactEmail.trim() }),
      })
      if (!res.ok) throw new Error('Erreur serveur')
      router.push('/ovr')
    } catch {
      setError('Une erreur est survenue. Réessayez.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F5F3] flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl border border-[#E8E8E6] shadow-sm p-8">
        {/* Logo */}
        <p className="text-sm font-medium text-[#111110] mb-1">Vitreen</p>
        <h1 className="text-xl font-semibold text-[#111110] mb-1 tracking-tight">
          Bienvenue 👋
        </h1>
        <p className="text-sm text-[#6B6A67] mb-8">
          Quelques infos pour personnaliser votre espace.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-[#111110] mb-1.5">
              Nom de la galerie <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={galleryName}
              onChange={e => setGalleryName(e.target.value)}
              placeholder="Galerie Fontaine"
              autoFocus
              className="w-full border border-[#E8E8E6] rounded-lg px-3.5 py-2.5 text-sm text-[#111110] placeholder:text-[#ADADAA] focus:outline-none focus:ring-2 focus:ring-[#111110]/10 focus:border-[#111110]/30 transition-colors bg-white"
            />
          </div>

          <div>
            <label className="block text-sm text-[#111110] mb-1.5">
              Email de contact
            </label>
            <input
              type="email"
              value={contactEmail}
              onChange={e => setContactEmail(e.target.value)}
              placeholder="contact@galerie.com"
              className="w-full border border-[#E8E8E6] rounded-lg px-3.5 py-2.5 text-sm text-[#111110] placeholder:text-[#ADADAA] focus:outline-none focus:ring-2 focus:ring-[#111110]/10 focus:border-[#111110]/30 transition-colors bg-white"
            />
            <p className="text-[11px] text-[#ADADAA] mt-1.5">
              Visible sur vos viewing rooms (optionnel)
            </p>
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#111110] text-white text-sm font-medium rounded-full py-3 hover:bg-[#2a2a28] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Enregistrement…' : 'Continuer →'}
          </button>
        </form>
      </div>
    </div>
  )
}
