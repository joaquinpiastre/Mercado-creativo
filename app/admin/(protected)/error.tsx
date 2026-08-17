"use client";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-gold-500/30 bg-gold-500/10 p-6 text-center">
      <p className="font-medium text-gold-700">{error.message || "Ocurrió un error inesperado."}</p>
      <button
        onClick={reset}
        className="mt-4 inline-flex items-center justify-center rounded-full bg-ink-800 px-5 py-2 text-sm font-medium text-sand-50 transition hover:bg-ink-900"
      >
        Reintentar
      </button>
    </div>
  );
}
