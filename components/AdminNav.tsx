import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  ClipboardList,
  Store,
  Settings,
  LogOut,
} from "lucide-react";
import { logout } from "@/app/actions/auth";
import logoMark from "@/public/logo-mark.png";

const links = [
  { href: "/admin/dashboard", label: "Resumen", icon: LayoutDashboard },
  { href: "/admin/reservas", label: "Reservas", icon: ClipboardList },
  { href: "/admin/categorias", label: "Categorías", icon: Store },
  { href: "/admin/configuracion", label: "Configuración", icon: Settings },
];

export function AdminNav({ username }: { username?: string }) {
  return (
    <header className="border-b border-ink-800/10 bg-sand-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-1 ring-ink-800/10">
            <Image
              src={logoMark}
              alt="Mercado Creativo"
              fill
              sizes="40px"
              className="object-cover"
            />
          </span>
          <div>
            <p className="font-display text-sm leading-tight font-semibold text-ink-950">
              Mercado Creativo
            </p>
            <p className="text-xs text-ink-950/50">
              Panel de administración{username && ` · Hola, ${username}`}
            </p>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-1">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium text-ink-950/70 transition hover:bg-ink-800/10 hover:text-ink-950"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
          <form action={logout}>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium text-gold-700 transition hover:bg-gold-500/10"
            >
              <LogOut className="h-4 w-4" />
              Salir
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
}
