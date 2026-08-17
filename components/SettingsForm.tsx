"use client";

import { useActionState } from "react";
import { updateSettings } from "@/app/actions/settings";
import { initialFormState } from "@/lib/types";
import { SubmitButton } from "@/components/SubmitButton";
import type { SiteSettings } from "@prisma/client";

function Field({
  label,
  name,
  defaultValue,
  placeholder,
  errors,
  as,
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  errors?: string[];
  as?: "textarea";
  hint?: string;
}) {
  const baseClass =
    "w-full rounded-xl border border-ink-800/15 bg-sand-50 px-4 py-2.5 text-sm text-ink-950 placeholder:text-ink-950/35 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/25 focus:outline-none";

  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium text-ink-950">{label}</span>
      {as === "textarea" ? (
        <textarea
          name={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          rows={3}
          className={baseClass}
        />
      ) : (
        <input
          name={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={baseClass}
        />
      )}
      {hint && <span className="text-xs text-ink-950/50">{hint}</span>}
      {errors?.map((error) => (
        <span key={error} className="text-xs text-gold-700">
          {error}
        </span>
      ))}
    </label>
  );
}

export function SettingsForm({ settings }: { settings: SiteSettings | null }) {
  const [state, formAction] = useActionState(updateSettings, initialFormState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {state.message && (
        <p
          className={`rounded-xl px-4 py-3 text-sm ${
            state.status === "error"
              ? "bg-gold-500/10 text-gold-700"
              : "bg-ink-800/10 text-ink-700"
          }`}
        >
          {state.message}
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          label="Número de WhatsApp"
          name="whatsappNumber"
          defaultValue={settings?.whatsappNumber}
          placeholder="5492604123456"
          hint="Código de país + área + número, sin + ni espacios"
          errors={state.fieldErrors?.whatsappNumber}
        />
        <Field
          label="Alias de pago"
          name="paymentAlias"
          defaultValue={settings?.paymentAlias}
          placeholder="feria.pescadores.mza"
          errors={state.fieldErrors?.paymentAlias}
        />
      </div>

      <Field
        label="Banco / billetera (opcional)"
        name="paymentBankName"
        defaultValue={settings?.paymentBankName ?? ""}
        placeholder="Banco Nación / Mercado Pago"
        errors={state.fieldErrors?.paymentBankName}
      />

      <Field
        label="Bajada de la portada (opcional)"
        name="heroSubtitle"
        as="textarea"
        defaultValue={settings?.heroSubtitle ?? ""}
        placeholder="Elegí el tipo de estante para tu emprendimiento, completá tus datos y asegurá tu lugar en la feria."
        hint='El nombre "Mercado Creativo" es fijo (viene del logo); esto es el texto debajo.'
        errors={state.fieldErrors?.heroSubtitle}
      />

      <Field
        label="Dirección de la feria"
        name="fairAddress"
        defaultValue={settings?.fairAddress}
        placeholder="Club de Pescadores, San Rafael, Mendoza"
        errors={state.fieldErrors?.fairAddress}
      />

      <Field
        label="Descripción de la feria (opcional)"
        name="fairDescription"
        as="textarea"
        defaultValue={settings?.fairDescription ?? ""}
        errors={state.fieldErrors?.fairDescription}
      />

      <SubmitButton>Guardar configuración</SubmitButton>
    </form>
  );
}
