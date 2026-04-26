import StepNav from '@/components/ovr/StepNav'
import ThemeToggle from '@/components/ovr/ThemeToggle'
import { SetupForm } from '@/components/ovr/SetupForm'

export default function CreatePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
      <header className="sticky top-0 z-10 bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur border-b border-gray-100 dark:border-gray-800 px-8 py-4 flex items-center justify-between">
        <h1 className="text-sm font-medium tracking-widest uppercase text-gray-500 dark:text-gray-400">OVR Studio</h1>
        <StepNav />
        <div className="w-32 flex justify-end">
          <ThemeToggle />
        </div>
      </header>
      <main className="px-8 py-10 max-w-3xl mx-auto">
        <h2 className="text-xl font-serif text-gray-900 dark:text-gray-100 mb-8">Nouveau viewing room</h2>
        <SetupForm />
      </main>
    </div>
  )
}
