"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { reservationSchema } from "@/lib/validations";
import { requireAdmin } from "@/lib/auth";
import type { FormState } from "@/lib/types";
import type { ReservationStatus } from "@prisma/client";

export async function createReservation(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = reservationSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return {
      status: "error",
      message: "Revisá los datos del formulario.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const data = parsed.data;
  let reservationId: string;
  let categorySlug: string;

  try {
    ({ reservationId, categorySlug } = await prisma.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT id FROM "Category" WHERE id = ${data.categoryId} FOR UPDATE`;

      const category = await tx.category.findUnique({
        where: { id: data.categoryId },
      });

      if (!category || !category.active) {
        throw new Error("CATEGORY_INACTIVE");
      }

      const reservedCount = await tx.reservation.count({
        where: {
          categoryId: category.id,
          status: { in: ["PENDING", "APPROVED"] },
        },
      });

      if (reservedCount >= category.capacity) {
        throw new Error("CATEGORY_FULL");
      }

      const reservation = await tx.reservation.create({
        data: {
          categoryId: category.id,
          fullName: data.fullName,
          dniCuit: data.dniCuit,
          phone: data.phone,
          email: data.email,
          businessName: data.businessName,
          sellsWhat: data.sellsWhat,
          notes: data.notes || null,
        },
      });

      return { reservationId: reservation.id, categorySlug: category.slug };
    }));
  } catch (err) {
    if (err instanceof Error && err.message === "CATEGORY_FULL") {
      return {
        status: "error",
        message:
          "Se acaba de agotar el cupo para esta categoría. Elegí otra categoría o escribinos.",
      };
    }
    if (err instanceof Error && err.message === "CATEGORY_INACTIVE") {
      return {
        status: "error",
        message: "Esta categoría ya no está disponible para reservar.",
      };
    }
    throw err;
  }

  revalidatePath("/");
  revalidatePath(`/categorias/${categorySlug}`);
  redirect(`/reservas/${reservationId}/confirmacion`);
}

export async function setReservationStatus(
  id: string,
  status: ReservationStatus
) {
  await requireAdmin();
  const reservation = await prisma.reservation.update({
    where: { id },
    data: { status },
    include: { category: true },
  });
  revalidatePath("/admin/reservas");
  revalidatePath("/admin/dashboard");
  revalidatePath("/");
  revalidatePath(`/categorias/${reservation.category.slug}`);
}
