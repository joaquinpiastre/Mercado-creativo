import { notFound } from "next/navigation";
import { CheckCircle2, Store } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/format";
import { ReservationForm } from "@/components/ReservationForm";

export default async function CategoryDetailPage({
  params,
}: PageProps<"/categorias/[slug]">) {
  const { slug } = await params;

  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category || !category.active) {
    notFound();
  }

  const reservedCount = await prisma.reservation.count({
    where: {
      categoryId: category.id,
      status: { in: ["PENDING", "APPROVED"] },
    },
  });
  const available = Math.max(category.capacity - reservedCount, 0);
  const isFull = available <= 0;

  return (
    <div className="mx-auto max-w-5xl px-5 py-14">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="bg-ink-gradient flex h-40 items-center justify-center rounded-3xl">
            <Store className="h-12 w-12 text-sand-100/80" strokeWidth={1.5} />
          </div>

          <h1 className="font-display mt-6 text-3xl font-semibold text-ink-950">
            {category.name}
          </h1>
          <p className="mt-3 text-ink-950/70">{category.description}</p>

          <p className="font-display mt-6 text-2xl font-semibold text-gold-700">
            {formatPrice(category.price)}
          </p>
          <p className="mt-1 text-sm text-ink-950/60">
            {isFull
              ? "Cupo completo para esta categoría"
              : `${available} de ${category.capacity} lugares disponibles`}
          </p>

          {category.features.length > 0 && (
            <ul className="mt-6 flex flex-col gap-2.5">
              {category.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 text-sm text-ink-950/80"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-ink-600" />
                  {feature}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="lg:col-span-3">
          <div className="rounded-3xl border border-ink-800/10 bg-sand-50 p-6 shadow-card sm:p-8">
            {isFull ? (
              <div className="flex flex-col items-center gap-2 py-10 text-center">
                <h2 className="font-display text-xl font-semibold text-ink-950">
                  Se agotó el cupo
                </h2>
                <p className="max-w-sm text-sm text-ink-950/70">
                  Ya no quedan lugares disponibles para esta categoría.
                  Volvé a la página principal para ver otras opciones.
                </p>
              </div>
            ) : (
              <>
                <h2 className="font-display text-xl font-semibold text-ink-950">
                  Completá tus datos para reservar
                </h2>
                <p className="mt-1 mb-6 text-sm text-ink-950/60">
                  Todos los campos son obligatorios salvo que se indique lo
                  contrario. La organización revisa cada reserva antes de
                  confirmarla.
                </p>
                <ReservationForm categoryId={category.id} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
