import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/format";
import { CategoryActions } from "@/components/CategoryActions";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { order: "asc" },
    include: { _count: { select: { reservations: true } } },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink-950">
            Categorías
          </h1>
          <p className="mt-1 text-ink-950/60">
            Definí los tipos de estantes, sus precios y su cupo.
          </p>
        </div>
        <Link
          href="/admin/categorias/nueva"
          className="inline-flex items-center gap-1.5 rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-ink-950 shadow-card transition hover:bg-gold-600"
        >
          <Plus className="h-4 w-4" />
          Nueva categoría
        </Link>
      </div>

      {categories.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-ink-800/20 p-8 text-center text-ink-950/60">
          Todavía no creaste ninguna categoría.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex flex-col gap-3 rounded-2xl border border-ink-800/10 bg-sand-50 p-5 shadow-card sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium text-ink-950">{category.name}</p>
                  {!category.active && (
                    <span className="rounded-full bg-ink-950/10 px-2 py-0.5 text-xs text-ink-950/50">
                      Inactiva
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-ink-950/60">
                  {formatPrice(category.price)} · Cupo {category.capacity} ·{" "}
                  {category._count.reservations} reserva
                  {category._count.reservations === 1 ? "" : "s"}
                </p>
              </div>
              <CategoryActions id={category.id} active={category.active} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
