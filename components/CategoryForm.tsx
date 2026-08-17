"use client";

import { useActionState } from "react";
import { initialFormState, type FormState } from "@/lib/types";
import { SubmitButton } from "@/components/SubmitButton";

type CategoryDefaults = {
  name?: string;
  slug?: string;
  description?: string;
  price?: number;
  capacity?: number;
  features?: string[];
  imageUrl?: string | null;
  active?: boolean;
  order?: number;
};

function Field({
  label,
  name,
  type = "text",
  defaultValue,
  placeholder,
  errors,
  as,
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string | number;
  placeholder?: string;
  errors?: string[];
  as?: "textarea";
  required?: boolean;
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
          rows={4}
          required={required}
          className={baseClass}
        />
      ) : (
        <input
          name={name}
          type={type}
          defaultValue={defaultValue}
          placeholder={placeholder}
          required={required}
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

export function CategoryForm({
  action,
  defaults,
  submitLabel,
}: {
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  defaults?: CategoryDefaults;
  submitLabel: string;
}) {
  const [state, formAction] = useActionState(action, initialFormState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {state.status === "error" && state.message && (
        <p className="rounded-xl bg-gold-500/10 px-4 py-3 text-sm text-gold-700">
          {state.message}
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          label="Nombre"
          name="name"
          defaultValue={defaults?.name}
          placeholder="Estante Gastronómico"
          errors={state.fieldErrors?.name}
        />
        <Field
          label="Slug (para la URL)"
          name="slug"
          defaultValue={defaults?.slug}
          placeholder="estante-gastronomico"
          errors={state.fieldErrors?.slug}
        />
      </div>

      <Field
        label="Descripción"
        name="description"
        as="textarea"
        defaultValue={defaults?.description}
        placeholder="Describí este tipo de estante"
        errors={state.fieldErrors?.description}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          label="Precio (ARS)"
          name="price"
          type="number"
          defaultValue={defaults?.price}
          placeholder="15000"
          errors={state.fieldErrors?.price}
        />
        <Field
          label="Cupo (cantidad de lugares)"
          name="capacity"
          type="number"
          defaultValue={defaults?.capacity}
          placeholder="10"
          errors={state.fieldErrors?.capacity}
        />
      </div>

      <Field
        label="Características (una por línea)"
        name="features"
        as="textarea"
        defaultValue={defaults?.features?.join("\n")}
        placeholder={"Mesa de 2x1 metros\nAcceso a electricidad\nUbicación cubierta"}
        errors={state.fieldErrors?.features}
      />

      <Field
        label="URL de imagen (opcional)"
        name="imageUrl"
        defaultValue={defaults?.imageUrl ?? ""}
        placeholder="https://..."
        errors={state.fieldErrors?.imageUrl}
        required={false}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          label="Orden de aparición"
          name="order"
          type="number"
          defaultValue={defaults?.order ?? 0}
          errors={state.fieldErrors?.order}
          required={false}
        />
        <label className="flex items-center gap-2 self-end pb-2.5 text-sm font-medium text-ink-950">
          <input type="hidden" name="active" value="false" />
          <input
            type="checkbox"
            name="active"
            value="true"
            defaultChecked={defaults?.active ?? true}
            className="h-4 w-4 rounded border-ink-800/30 text-gold-600 focus:ring-gold-500"
          />
          Categoría visible y activa
        </label>
      </div>

      <SubmitButton>{submitLabel}</SubmitButton>
    </form>
  );
}
