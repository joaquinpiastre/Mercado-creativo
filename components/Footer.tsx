import Link from "next/link";
import Image from "next/image";
import { MapPin, ShieldCheck } from "lucide-react";
import { prisma } from "@/lib/prisma";
import logoMark from "@/public/logo-mark.png";

export async function Footer() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });

  return (
    <footer className="bg-ink-gradient mt-24 text-sand-100">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-1 ring-sand-50/20">
              <Image
                src={logoMark}
                alt="Mercado Creativo"
                fill
                sizes="48px"
                className="object-cover"
              />
            </span>
            <div>
              <p className="font-display text-xl font-semibold text-sand-50">
                Mercado Creativo
              </p>
              <p className="mt-1 flex items-start gap-2 text-sm text-sand-200/90">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  {settings?.fairAddress ??
                    "Club de Pescadores, San Rafael, Mendoza"}
                </span>
              </p>
            </div>
          </div>
          <Link
            href="/admin/login"
            className="inline-flex items-center gap-1.5 text-xs text-sand-200/70 transition hover:text-sand-50"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            Administración
          </Link>
        </div>
        <p className="mt-8 border-t border-sand-50/10 pt-6 text-xs text-sand-200/60">
          © {new Date().getFullYear()} Mercado Creativo — San
          Rafael, Mendoza.
        </p>
      </div>
    </footer>
  );
}
