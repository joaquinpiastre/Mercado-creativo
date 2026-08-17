import type { Category, Reservation } from "@prisma/client";

export function buildWhatsAppLink(
  whatsappNumber: string,
  reservation: Reservation,
  category: Category
) {
  const digitsOnly = whatsappNumber.replace(/\D/g, "");
  const message = [
    "Hola! Quiero confirmar mi reserva para el Mercado Creativo.",
    "",
    `N° de reserva: ${reservation.id}`,
    `Nombre: ${reservation.fullName}`,
    `Emprendimiento: ${reservation.businessName}`,
    `Categoría: ${category.name}`,
    `Monto transferido: $${category.price.toLocaleString("es-AR")}`,
    "",
    "Adjunto el comprobante de la transferencia.",
  ].join("\n");

  return `https://wa.me/${digitsOnly}?text=${encodeURIComponent(message)}`;
}
