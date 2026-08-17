import { z } from "zod";

export const reservationSchema = z.object({
  categoryId: z.string().min(1, "Falta la categoría"),
  fullName: z.string().trim().min(3, "Ingresá tu nombre completo"),
  dniCuit: z.string().trim().min(6, "Ingresá un DNI o CUIT válido"),
  phone: z.string().trim().min(6, "Ingresá un teléfono de contacto"),
  email: z.string().trim().email("Ingresá un email válido"),
  businessName: z
    .string()
    .trim()
    .min(2, "Ingresá el nombre de tu emprendimiento"),
  sellsWhat: z
    .string()
    .trim()
    .min(3, "Contanos qué productos vas a vender"),
  notes: z.string().trim().optional().or(z.literal("")),
});

export type ReservationInput = z.infer<typeof reservationSchema>;

export const loginSchema = z.object({
  username: z.string().trim().min(1, "Ingresá tu usuario"),
  password: z.string().min(1, "Ingresá tu contraseña"),
});

export const categorySchema = z.object({
  name: z.string().trim().min(2, "Ingresá un nombre"),
  slug: z
    .string()
    .trim()
    .min(2, "Ingresá un slug")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "El slug solo puede tener minúsculas, números y guiones"
    ),
  description: z.string().trim().min(10, "Agregá una descripción"),
  price: z.coerce.number().int().positive("El precio debe ser mayor a 0"),
  capacity: z.coerce
    .number()
    .int()
    .positive("El cupo debe ser mayor a 0"),
  features: z
    .string()
    .trim()
    .min(1, "Agregá al menos una característica"),
  imageUrl: z.string().trim().optional().or(z.literal("")),
  active: z
    .enum(["true", "false"])
    .transform((value) => value === "true")
    .default(true),
  order: z.coerce.number().int().default(0),
});

export const settingsSchema = z.object({
  whatsappNumber: z
    .string()
    .trim()
    .min(8, "Ingresá el número de WhatsApp con código de país, sin +"),
  paymentAlias: z.string().trim().min(3, "Ingresá el alias de pago"),
  paymentBankName: z.string().trim().optional().or(z.literal("")),
  heroSubtitle: z.string().trim().optional().or(z.literal("")),
  fairAddress: z.string().trim().min(3, "Ingresá la dirección"),
  fairDescription: z.string().trim().optional().or(z.literal("")),
});
