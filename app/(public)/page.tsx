import { prisma } from "@/lib/prisma";
import { CategoryCard } from "@/components/CategoryCard";
import { MapPin, Lightbulb } from "lucide-react";

export default async function HomePage() {
  const [settings, categories, counts] = await Promise.all([
    prisma.siteSettings.findUnique({ where: { id: 1 } }),
    prisma.category.findMany({
      where: { active: true },
      orderBy: { order: "asc" },
    }),
    prisma.reservation.groupBy({
      by: ["categoryId"],
      where: { status: { in: ["PENDING", "APPROVED"] } },
      _count: true,
    }),
  ]);

  const reservedByCategory = new Map(
    counts.map((c) => [c.categoryId, c._count])
  );

  return (
    <>
      <section className="bg-ink-gradient relative overflow-hidden">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-20 sm:py-28">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-sand-50/10 px-4 py-1.5 text-xs font-medium tracking-wide text-gold-400 uppercase">
            <Lightbulb className="h-3.5 w-3.5" />
            ¿Lo hacés vos? Este es tu lugar
          </span>
          <h1 className="text-balance font-display max-w-2xl text-5xl font-semibold text-sand-50 sm:text-6xl">
            Mercado{" "}
            <span className="font-script text-gold-400 text-6xl sm:text-7xl">
              Creativo
            </span>
          </h1>
          <p className="text-sm font-medium tracking-[0.2em] text-sand-100/70 uppercase">
            Encuentro Nacional de Elaboradores &amp; Productores
          </p>
          <p className="max-w-xl text-balance text-lg text-sand-100/85">
            {settings?.heroSubtitle ??
              "Elegí el tipo de estante para tu emprendimiento, completá tus datos y asegurá tu lugar en la feria."}
          </p>
          <a
            href="#categorias"
            className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-ink-950 shadow-card transition hover:bg-gold-600"
          >
            Ver categorías de estantes
          </a>
        </div>
        <svg
          viewBox="0 0 1440 80"
          className="absolute -bottom-1 left-0 w-full text-sand-50"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,32 C240,80 480,0 720,24 C960,48 1200,88 1440,40 L1440,80 L0,80 Z"
          />
        </svg>
      </section>

      <section id="categorias" className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <div className="mb-10 max-w-2xl">
          <h2 className="font-display text-3xl font-semibold text-ink-950">
            Tipos de estantes
          </h2>
          <p className="mt-2 text-ink-950/70">
            Cada categoría tiene su propio cupo y características. Reservá el
            que mejor se adapte a tu emprendimiento — la confirmación final
            queda a cargo de la organización.
          </p>
        </div>

        {categories.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-ink-800/20 p-8 text-center text-ink-950/60">
            Todavía no hay categorías publicadas. Volvé a visitarnos pronto.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                reservedCount={reservedByCategory.get(category.id) ?? 0}
              />
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="flex flex-col items-start gap-4 rounded-3xl border border-ink-800/10 bg-sand-100 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <MapPin className="mt-1 h-6 w-6 shrink-0 text-gold-600" />
            <div>
              <p className="font-display text-lg font-semibold text-ink-950">
                ¿Dónde es la feria?
              </p>
              <p className="text-ink-950/70">
                {settings?.fairAddress ??
                  "Club de Pescadores, San Rafael, Mendoza"}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
