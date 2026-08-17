import Link from "next/link";
import { Lightbulb } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-800/10 bg-sand-50/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-900 text-gold-400">
            <Lightbulb className="h-5 w-5" strokeWidth={2} />
          </span>
          <span className="flex items-baseline gap-1.5">
            <span className="font-display text-lg font-semibold tracking-tight text-ink-950">
              Mercado
            </span>
            <span className="font-script text-2xl leading-none text-gold-600">
              Creativo
            </span>
          </span>
        </Link>
        <Link
          href="/#categorias"
          className="hidden rounded-full bg-gold-500 px-5 py-2 text-sm font-semibold text-ink-950 shadow-card transition hover:bg-gold-600 sm:inline-block"
        >
          Reservar estante
        </Link>
      </div>
    </header>
  );
}
