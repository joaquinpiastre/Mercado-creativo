import Link from "next/link";
import { Lightbulb } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-ink-gradient flex min-h-screen flex-col items-center justify-center gap-4 px-5 text-center text-sand-50">
      <Lightbulb className="h-10 w-10 text-gold-400" strokeWidth={1.5} />
      <h1 className="font-display text-3xl font-semibold">
        No encontramos esta página
      </h1>
      <p className="max-w-sm text-sand-100/80">
        Puede que el enlace esté vencido o que la categoría ya no esté
        disponible.
      </p>
      <Link
        href="/"
        className="mt-2 inline-flex items-center rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-ink-950 shadow-card transition hover:bg-gold-600"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
