import type { Metadata } from 'next'

// App surfaces — no SEO value, no indexing.
export const metadata: Metadata = {
  title: 'Editor',
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
}

export default function EditorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
