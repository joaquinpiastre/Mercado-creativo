import { Check, X } from "lucide-react";
import type { Category, Reservation } from "@prisma/client";
import { setReservationStatus } from "@/app/actions/reservations";
import { formatPrice } from "@/lib/format";
import { StatusBadge } from "@/components/StatusBadge";
import { SubmitButton } from "@/components/SubmitButton";

type ReservationWithCategory = Reservation & { category: Category };

export function ReservationTable({
  reservations,
}: {
  reservations: ReservationWithCategory[];
}) {
  if (reservations.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-ink-800/20 p-8 text-center text-ink-950/60">
        No hay reservas para mostrar.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {reservations.map((reservation) => (
        <div
          key={reservation.id}
          className="flex flex-col gap-4 rounded-2xl border border-ink-800/10 bg-sand-50 p-5 shadow-card sm:flex-row sm:items-start sm:justify-between"
        >
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-medium text-ink-950">
                {reservation.fullName}
              </p>
              <StatusBadge status={reservation.status} />
            </div>
            <p className="mt-1 text-sm text-ink-950/70">
              {reservation.businessName} — {reservation.category.name} (
              {formatPrice(reservation.category.price)})
            </p>
            <p className="mt-1 text-sm text-ink-950/60">
              Vende: {reservation.sellsWhat}
            </p>
            <p className="mt-2 text-xs text-ink-950/50">
              DNI/CUIT: {reservation.dniCuit} · Tel: {reservation.phone} ·{" "}
              {reservation.email}
            </p>
            {reservation.notes && (
              <p className="mt-2 rounded-lg bg-ink-800/5 px-3 py-2 text-xs text-ink-950/70">
                {reservation.notes}
              </p>
            )}
            <p className="mt-2 text-xs text-ink-950/40">
              Recibida el{" "}
              {reservation.createdAt.toLocaleDateString("es-AR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          <div className="flex shrink-0 gap-2">
            <form
              action={setReservationStatus.bind(null, reservation.id, "APPROVED")}
            >
              <SubmitButton
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60 ${
                  reservation.status === "APPROVED"
                    ? "bg-ink-800 text-sand-50"
                    : "bg-ink-800/10 text-ink-800 hover:bg-ink-800/20"
                }`}
              >
                <Check className="h-4 w-4" />
                Aprobar
              </SubmitButton>
            </form>
            <form
              action={setReservationStatus.bind(null, reservation.id, "REJECTED")}
            >
              <SubmitButton
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60 ${
                  reservation.status === "REJECTED"
                    ? "bg-ink-700 text-sand-50"
                    : "bg-gold-500/10 text-gold-700 hover:bg-gold-500/20"
                }`}
              >
                <X className="h-4 w-4" />
                Rechazar
              </SubmitButton>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}
