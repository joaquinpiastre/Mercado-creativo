import Link from "next/link";
import Image from "next/image";
import logoMark from "@/public/logo-mark.png";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-800/10 bg-sand-50/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-1 ring-ink-800/10">
            <Image
              src={logoMark}
              alt="Mercado Creativo"
              fill
              sizes="44px"
              className="object-cover"
              priority
            />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-base font-semibold tracking-tight text-ink-950">
              Mercado
            </span>
            <span className="font-script text-xl leading-none text-gold-600">
              Creativo
            </span>
          </span>
        </Link>
        <Link
          href="/#categorias"
          className="rounded-full bg-gold-500 px-4 py-2 text-sm font-semibold text-ink-950 shadow-card transition hover:bg-gold-600 sm:px-5"
        >
          Reservar estante
        </Link>
      </div>
    </header>
  );
}
