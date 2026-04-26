'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const inputCls = 'w-full px-3 py-2 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 transition-colors'

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

export function SetupForm() {
  const router = useRouter()
  const [galleryName, setGalleryName] = useState('')
  const [title, setTitle] = useState('')
  const [recipientName, setRecipientName] = useState('')
  const [recipientEmail, setRecipientEmail] = useState('')
  const [introText, setIntroText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !galleryName.trim()) return
    sessionStorage.setItem('vr_setup', JSON.stringify({
      galleryName: galleryName.trim(),
      title: title.trim(),
      recipientName: recipientName.trim(),
      recipientEmail: recipientEmail.trim(),
      introText: introText.trim(),
    }))
    router.push('/ovr/editor/images')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Nom de la galerie" required>
          <input
            value={galleryName}
            onChange={e => setGalleryName(e.target.value)}
            placeholder="Vitreen"
            className={inputCls}
            autoFocus
          />
        </Field>
        <Field label="Titre interne" required>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder='ex: "Sélection printemps — Jean Dupont"'
            className={inputCls}
          />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Nom du destinataire">
          <input
            value={recipientName}
            onChange={e => setRecipientName(e.target.value)}
            placeholder="Jean Dupont"
            className={inputCls}
          />
        </Field>
        <Field label="Email">
          <input
            type="email"
            value={recipientEmail}
            onChange={e => setRecipientEmail(e.target.value)}
            placeholder="jean@exemple.com"
            className={inputCls}
          />
        </Field>
      </div>

      <Field label="Texte d'introduction">
        <textarea
          value={introText}
          onChange={e => setIntroText(e.target.value)}
          placeholder="Un mot d'introduction au destinataire…"
          rows={4}
          className={inputCls + ' resize-none'}
        />
      </Field>

      <div className="pt-2">
        <button
          type="submit"
          disabled={!title.trim() || !galleryName.trim()}
          className="px-5 py-2.5 bg-gray-900 dark:bg-white dark:text-gray-900 text-white text-sm hover:bg-gray-700 dark:hover:bg-gray-100 disabled:opacity-40 transition-colors"
        >
          Ajouter les images →
        </button>
      </div>
    </form>
  )
}
