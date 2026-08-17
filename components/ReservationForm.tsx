"use client";

import { useActionState } from "react";
import { createReservation } from "@/app/actions/reservations";
import { initialFormState } from "@/lib/types";
import { SubmitButton } from "@/components/SubmitButton";

function Field({
  label,
  name,
  type = "text",
  placeholder,
  errors,
  as,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  errors?: string[];
  as?: "textarea";
}) {
  const baseClass =
    "w-full rounded-xl border border-ink-800/15 bg-sand-50 px-4 py-2.5 text-sm text-ink-950 placeholder:text-ink-950/35 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/25 focus:outline-none";

  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium text-ink-950">{label}</span>
      {as === "textarea" ? (
        <textarea
          name={name}
          placeholder={placeholder}
          rows={3}
          className={baseClass}
        />
      ) : (
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          required={name !== "notes"}
          className={baseClass}
        />
      )}
      {errors?.map((error) => (
        <span key={error} className="text-xs text-gold-700">
          {error}
        </span>
      ))}
    </label>
  );
}

export function ReservationForm({ categoryId }: { categoryId: string }) {
  const [state, formAction] = useActionState(
    createReservation,
    initialFormState
  );

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="categoryId" value={categoryId} />

      {state.status === "error" && state.message && (
        <p className="rounded-xl bg-gold-500/10 px-4 py-3 text-sm text-gold-700">
          {state.message}
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          label="Nombre completo"
          name="fullName"
          placeholder="Juan Pérez"
          errors={state.fieldErrors?.fullName}
        />
        <Field
          label="DNI o CUIT"
          name="dniCuit"
          placeholder="20-12345678-9"
          errors={state.fieldErrors?.dniCuit}
        />
        <Field
          label="Teléfono"
          name="phone"
          type="tel"
          placeholder="260 4123456"
          errors={state.fieldErrors?.phone}
        />
        <Field
          label="Email"
          name="email"
          type="email"
          placeholder="tu@email.com"
          errors={state.fieldErrors?.email}
        />
        <Field
          label="Nombre del emprendimiento"
          name="businessName"
          placeholder="Mi Emprendimiento"
          errors={state.fieldErrors?.businessName}
        />
        <Field
          label="¿Qué productos vendés?"
          name="sellsWhat"
          placeholder="Artesanías en cuero, dulces caseros, etc."
          errors={state.fieldErrors?.sellsWhat}
        />
      </div>

      <Field
        label="Notas adicionales (opcional)"
        name="notes"
        as="textarea"
        placeholder="Contanos algo más sobre tu emprendimiento o necesidades especiales"
        errors={state.fieldErrors?.notes}
      />

      <SubmitButton>Reservar este estante</SubmitButton>
    </form>
  );
}
