"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white px-6 text-center text-[#111110]">
      <h1 className="text-lg font-medium tracking-tight">Erreur au chargement</h1>
      <p className="max-w-md text-sm text-[#6B6A67]">
        {error.message || "Une erreur inattendue s’est produite."}
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="rounded-full border border-[#E8E8E6] bg-[#111110] px-4 py-2 text-sm text-white hover:bg-[#2a2a28]"
      >
        Réessayer
      </button>
    </div>
  );
}
