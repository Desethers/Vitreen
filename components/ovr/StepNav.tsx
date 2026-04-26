'use client'
import { usePathname } from 'next/navigation'

const steps = [
  { href: '/ovr/editor/create', label: 'Infos' },
  { href: '/ovr/editor/images', label: 'Images' },
  { href: '/ovr/editor/build',  label: 'Mise en page' },
  { href: '/ovr/editor/export', label: 'Exporter' },
]

export default function StepNav() {
  const pathname = usePathname()
  const current = steps.findIndex(s => pathname.startsWith(s.href))

  return (
    <nav className="flex items-center gap-1 text-sm">
      {steps.map((step, i) => (
        <div key={step.href} className="flex items-center gap-1">
          {i > 0 && <span className="text-gray-300 dark:text-gray-700 mx-1.5">→</span>}
          <span className={`px-2.5 py-1.5 transition-colors ${
            i === current
              ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
              : i < current
              ? 'text-gray-400 dark:text-gray-500'
              : 'text-gray-300 dark:text-gray-700'
          }`}>
            {step.label}
          </span>
        </div>
      ))}
    </nav>
  )
}
