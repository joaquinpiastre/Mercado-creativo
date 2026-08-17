import { notFound } from "next/navigation";
import { CheckCircle2, MessageCircle, Landmark } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/format";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { CopyButton } from "@/components/CopyButton";

export default async function ReservationConfirmationPage({
  params,
}: PageProps<"/reservas/[id]/confirmacion">) {
  const { id } = await params;

  const reservation = await prisma.reservation.findUnique({
    where: { id },
    include: { category: true },
  });
  if (!reservation) {
    notFound();
  }

  const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  const whatsappLink = settings
    ? buildWhatsAppLink(settings.whatsappNumber, reservation, reservation.category)
    : null;

  return (
    <div className="mx-auto max-w-2xl px-5 py-16">
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ink-800/10">
          <CheckCircle2 className="h-7 w-7 text-ink-700" />
        </span>
        <h1 className="font-display text-3xl font-semibold text-ink-950">
          ¡Reserva registrada!
        </h1>
        <p className="max-w-md text-ink-950/70">
          Tu solicitud para <strong>{reservation.category.name}</strong> quedó
          pendiente de aprobación. Para confirmar tu lugar, seguí estos pasos:
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-6 rounded-3xl border border-ink-800/10 bg-sand-50 p-6 shadow-card sm:p-8">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-sm font-semibold text-gold-700">
            1
          </span>
          <div className="flex-1">
            <p className="font-medium text-ink-950">
              Transferí {formatPrice(reservation.category.price)}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2 rounded-xl bg-ink-800/5 px-4 py-3">
              <Landmark className="h-4 w-4 text-ink-700" />
              <span className="font-mono text-sm text-ink-950">
                {settings?.paymentAlias ?? "Alias no configurado todavía"}
              </span>
              {settings?.paymentAlias && (
                <CopyButton value={settings.paymentAlias} />
              )}
            </div>
            {settings?.paymentBankName && (
              <p className="mt-1.5 text-xs text-ink-950/60">
                {settings.paymentBankName}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-sm font-semibold text-gold-700">
            2
          </span>
          <div className="flex-1">
            <p className="font-medium text-ink-950">
              Enviá el comprobante por WhatsApp
            </p>
            <p className="mt-1 text-sm text-ink-950/70">
              Te vamos a pedir que confirmes los datos de tu reserva y
              adjuntes el comprobante de pago en el chat.
            </p>
            {whatsappLink ? (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-card transition hover:brightness-95"
              >
                <MessageCircle className="h-4 w-4" />
                Enviar comprobante por WhatsApp
              </a>
            ) : (
              <p className="mt-3 text-sm text-gold-700">
                El número de WhatsApp todavía no está configurado.
              </p>
            )}
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-sm font-semibold text-gold-700">
            3
          </span>
          <div className="flex-1">
            <p className="font-medium text-ink-950">
              Esperá la aprobación
            </p>
            <p className="mt-1 text-sm text-ink-950/70">
              La organización revisa cada reserva y te confirma tu lugar por
              WhatsApp. La aprobación queda a criterio del administrador de
              la feria.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
