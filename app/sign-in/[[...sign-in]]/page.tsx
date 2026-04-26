import { redirect } from 'next/navigation'

const clerkEnabled = process.env.NEXT_PUBLIC_CLERK_ENABLED === 'true'

export default async function SignInPage() {
  if (!clerkEnabled) redirect('/ovr/editor')

  const { SignIn } = await import('@clerk/nextjs')
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F3]">
      <SignIn routing="path" path="/sign-in" />
    </div>
  )
}
