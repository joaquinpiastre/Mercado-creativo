"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { loginSchema } from "@/lib/validations";
import type { FormState } from "@/lib/types";

export async function login(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = loginSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      status: "error",
      message: "Ingresá usuario y contraseña.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const { username, password } = parsed.data;

  const admin = await prisma.adminUser.findUnique({ where: { username } });
  const passwordMatches = admin
    ? await bcrypt.compare(password, admin.passwordHash)
    : false;

  if (!admin || !passwordMatches) {
    return { status: "error", message: "Usuario o contraseña incorrectos." };
  }

  const session = await getSession();
  session.adminId = admin.id;
  session.username = admin.username;
  await session.save();

  redirect("/admin/dashboard");
}

export async function logout() {
  const session = await getSession();
  session.destroy();
  redirect("/admin/login");
}
