"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { categorySchema } from "@/lib/validations";
import { requireAdmin } from "@/lib/auth";
import type { FormState } from "@/lib/types";

function parseFeatures(raw: string) {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export async function createCategory(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  await requireAdmin();

  const parsed = categorySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      status: "error",
      message: "Revisá los datos del formulario.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const data = parsed.data;

  const existing = await prisma.category.findUnique({
    where: { slug: data.slug },
  });
  if (existing) {
    return {
      status: "error",
      message: "Ya existe una categoría con ese slug.",
      fieldErrors: { slug: ["Ese slug ya está en uso"] },
    };
  }

  await prisma.category.create({
    data: {
      name: data.name,
      slug: data.slug,
      description: data.description,
      price: data.price,
      capacity: data.capacity,
      features: parseFeatures(data.features),
      imageUrl: data.imageUrl || null,
      active: data.active,
      order: data.order,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/categorias");
  redirect("/admin/categorias");
}

export async function updateCategory(
  id: string,
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  await requireAdmin();

  const parsed = categorySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      status: "error",
      message: "Revisá los datos del formulario.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const data = parsed.data;

  const existing = await prisma.category.findUnique({
    where: { slug: data.slug },
  });
  if (existing && existing.id !== id) {
    return {
      status: "error",
      message: "Ya existe otra categoría con ese slug.",
      fieldErrors: { slug: ["Ese slug ya está en uso"] },
    };
  }

  await prisma.category.update({
    where: { id },
    data: {
      name: data.name,
      slug: data.slug,
      description: data.description,
      price: data.price,
      capacity: data.capacity,
      features: parseFeatures(data.features),
      imageUrl: data.imageUrl || null,
      active: data.active,
      order: data.order,
    },
  });

  revalidatePath("/");
  revalidatePath(`/categorias/${data.slug}`);
  revalidatePath("/admin/categorias");
  redirect("/admin/categorias");
}

export async function toggleCategoryActive(id: string, active: boolean) {
  await requireAdmin();
  await prisma.category.update({ where: { id }, data: { active } });
  revalidatePath("/");
  revalidatePath("/admin/categorias");
}

export async function deleteCategory(id: string) {
  await requireAdmin();

  const reservationCount = await prisma.reservation.count({
    where: { categoryId: id },
  });
  if (reservationCount > 0) {
    throw new Error(
      "No se puede eliminar una categoría con reservas asociadas. Desactivala en su lugar."
    );
  }

  await prisma.category.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/categorias");
}
