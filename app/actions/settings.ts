"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { settingsSchema } from "@/lib/validations";
import { requireAdmin } from "@/lib/auth";
import type { FormState } from "@/lib/types";

export async function updateSettings(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  await requireAdmin();

  const parsed = settingsSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      status: "error",
      message: "Revisá los datos del formulario.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const data = parsed.data;

  await prisma.siteSettings.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      whatsappNumber: data.whatsappNumber,
      paymentAlias: data.paymentAlias,
      paymentBankName: data.paymentBankName || null,
      heroSubtitle: data.heroSubtitle || null,
      fairAddress: data.fairAddress,
      fairDescription: data.fairDescription || null,
    },
    update: {
      whatsappNumber: data.whatsappNumber,
      paymentAlias: data.paymentAlias,
      paymentBankName: data.paymentBankName || null,
      heroSubtitle: data.heroSubtitle || null,
      fairAddress: data.fairAddress,
      fairDescription: data.fairDescription || null,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/configuracion");

  return { status: "idle", message: "Configuración guardada correctamente." };
}
