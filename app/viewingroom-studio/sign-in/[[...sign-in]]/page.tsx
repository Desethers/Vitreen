import { redirect } from "next/navigation";

const clerkEnabled = process.env.NEXT_PUBLIC_CLERK_ENABLED === "true";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect_url?: string }>;
}) {
  if (!clerkEnabled) redirect("/");

  const { redirect_url } = await searchParams;
  const { SignIn } = await import("@clerk/nextjs");
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F3]">
      <SignIn
        routing="path"
        path="/viewingroom-studio/sign-in"
        forceRedirectUrl={redirect_url ?? "/viewingroom-studio/editor"}
      />
    </div>
  );
}
