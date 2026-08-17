import Link from "next/link";
import { ArrowRight, Store } from "lucide-react";
import type { Category } from "@prisma/client";
import { formatPrice } from "@/lib/format";

export function CategoryCard({
  category,
  reservedCount,
}: {
  category: Category;
  reservedCount: number;
}) {
  const available = Math.max(category.capacity - reservedCount, 0);
  const isFull = available <= 0;

  return (
    <div className="card-texture group flex flex-col overflow-hidden rounded-3xl border border-ink-800/10 bg-sand-50 shadow-card transition hover:-translate-y-1">
      <div className="bg-ink-gradient flex h-32 items-center justify-center">
        <Store className="h-10 w-10 text-sand-100/80" strokeWidth={1.5} />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-semibold text-ink-950">
            {category.name}
          </h3>
          <span
            className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
              isFull
                ? "bg-ink-950/10 text-ink-950/60"
                : "bg-gold-500/15 text-gold-700"
            }`}
          >
            {isFull ? "Cupo completo" : `${available} disponibles`}
          </span>
        </div>
        <p className="line-clamp-3 text-sm text-ink-950/70">
          {category.description}
        </p>
        {category.features.length > 0 && (
          <ul className="flex flex-wrap gap-1.5">
            {category.features.slice(0, 3).map((feature) => (
              <li
                key={feature}
                className="rounded-full bg-ink-800/5 px-2.5 py-1 text-xs text-ink-800"
              >
                {feature}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto flex items-center justify-between pt-3">
          <p className="font-display text-lg font-semibold text-gold-700">
            {formatPrice(category.price)}
          </p>
          {isFull ? (
            <span className="text-sm font-medium text-ink-950/40">
              Sin cupo
            </span>
          ) : (
            <Link
              href={`/categorias/${category.slug}`}
              className="inline-flex items-center gap-1 text-sm font-medium text-ink-700 transition group-hover:gap-2 group-hover:text-gold-600"
            >
              Reservar
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
