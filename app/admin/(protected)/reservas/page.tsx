import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ReservationTable } from "@/components/ReservationTable";
import type { ReservationStatus } from "@prisma/client";

const filters: { label: string; value: ReservationStatus | "ALL" }[] = [
  { label: "Todas", value: "ALL" },
  { label: "Pendientes", value: "PENDING" },
  { label: "Aprobadas", value: "APPROVED" },
  { label: "Rechazadas", value: "REJECTED" },
];

export default async function AdminReservationsPage({
  searchParams,
}: {
  searchParams: Promise<{ estado?: string }>;
}) {
  const { estado } = await searchParams;
  const activeFilter = filters.some((f) => f.value === estado)
    ? (estado as ReservationStatus)
    : "ALL";

  const reservations = await prisma.reservation.findMany({
    where: activeFilter === "ALL" ? {} : { status: activeFilter },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-950">
          Reservas
        </h1>
        <p className="mt-1 text-ink-950/60">
          Aprobá o rechazá las reservas recibidas. La decisión queda a tu
          criterio.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <Link
            key={filter.value}
            href={
              filter.value === "ALL"
                ? "/admin/reservas"
                : `/admin/reservas?estado=${filter.value}`
            }
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              activeFilter === filter.value
                ? "bg-ink-800 text-sand-50"
                : "bg-ink-800/10 text-ink-800 hover:bg-ink-800/20"
            }`}
          >
            {filter.label}
          </Link>
        ))}
      </div>

      <ReservationTable reservations={reservations} />
    </div>
  );
}
