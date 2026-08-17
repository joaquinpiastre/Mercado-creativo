import Link from "next/link";
import { Clock, CheckCircle2, XCircle, Store } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [pending, approved, rejected, categories, counts] = await Promise.all([
    prisma.reservation.count({ where: { status: "PENDING" } }),
    prisma.reservation.count({ where: { status: "APPROVED" } }),
    prisma.reservation.count({ where: { status: "REJECTED" } }),
    prisma.category.findMany({ orderBy: { order: "asc" } }),
    prisma.reservation.groupBy({
      by: ["categoryId"],
      where: { status: { in: ["PENDING", "APPROVED"] } },
      _count: true,
    }),
  ]);

  const reservedByCategory = new Map(
    counts.map((c) => [c.categoryId, c._count])
  );

  const stats = [
    {
      label: "Pendientes de revisión",
      value: pending,
      icon: Clock,
      accent: "text-gold-700 bg-gold-500/10",
    },
    {
      label: "Aprobadas",
      value: approved,
      icon: CheckCircle2,
      accent: "text-ink-700 bg-ink-800/10",
    },
    {
      label: "Rechazadas",
      value: rejected,
      icon: XCircle,
      accent: "text-ink-950/50 bg-ink-950/5",
    },
  ];

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-950">
          Resumen
        </h1>
        <p className="mt-1 text-ink-950/60">
          Estado general de las reservas de la feria.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map(({ label, value, icon: Icon, accent }) => (
          <div
            key={label}
            className="flex items-center gap-4 rounded-2xl border border-ink-800/10 bg-sand-50 p-5 shadow-card"
          >
            <span className={`flex h-11 w-11 items-center justify-center rounded-full ${accent}`}>
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-2xl font-semibold text-ink-950">{value}</p>
              <p className="text-sm text-ink-950/60">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {pending > 0 && (
        <Link
          href="/admin/reservas?estado=PENDING"
          className="inline-flex w-fit items-center gap-2 rounded-full bg-ink-800 px-5 py-2.5 text-sm font-medium text-sand-50 transition hover:bg-ink-900"
        >
          Revisar {pending} reserva{pending === 1 ? "" : "s"} pendiente
          {pending === 1 ? "" : "s"}
        </Link>
      )}

      <div>
        <h2 className="font-display mb-4 text-lg font-semibold text-ink-950">
          Ocupación por categoría
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const reserved = reservedByCategory.get(category.id) ?? 0;
            const pct = category.capacity
              ? Math.min((reserved / category.capacity) * 100, 100)
              : 0;
            return (
              <div
                key={category.id}
                className="rounded-2xl border border-ink-800/10 bg-sand-50 p-5 shadow-card"
              >
                <div className="flex items-center justify-between">
                  <p className="flex items-center gap-1.5 font-medium text-ink-950">
                    <Store className="h-4 w-4 text-ink-700" />
                    {category.name}
                  </p>
                  {!category.active && (
                    <span className="rounded-full bg-ink-950/10 px-2 py-0.5 text-xs text-ink-950/50">
                      Inactiva
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-ink-950/60">
                  {reserved} / {category.capacity} lugares ocupados
                </p>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-ink-950/10">
                  <div
                    className="h-full rounded-full bg-gold-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
