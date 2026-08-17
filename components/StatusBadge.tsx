import type { ReservationStatus } from "@prisma/client";

const styles: Record<ReservationStatus, string> = {
  PENDING: "bg-gold-500/15 text-gold-700",
  APPROVED: "bg-ink-800/10 text-ink-700",
  REJECTED: "bg-ink-950/10 text-ink-950/50",
};

const labels: Record<ReservationStatus, string> = {
  PENDING: "Pendiente",
  APPROVED: "Aprobada",
  REJECTED: "Rechazada",
};

export function StatusBadge({ status }: { status: ReservationStatus }) {
  return (
    <span
      className={`inline-flex w-fit items-center rounded-full px-2.5 py-1 text-xs font-medium ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}
