"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/auth";
import { initialFormState } from "@/lib/types";
import { SubmitButton } from "@/components/SubmitButton";

export function LoginForm() {
  const [state, formAction] = useActionState(login, initialFormState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {state.status === "error" && state.message && (
        <p className="rounded-xl bg-gold-500/10 px-4 py-3 text-sm text-gold-700">
          {state.message}
        </p>
      )}

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-ink-950">Usuario</span>
        <input
          name="username"
          type="text"
          required
          autoFocus
          className="w-full rounded-xl border border-ink-800/15 bg-sand-50 px-4 py-2.5 text-sm text-ink-950 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/25 focus:outline-none"
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-ink-950">Contraseña</span>
        <input
          name="password"
          type="password"
          required
          className="w-full rounded-xl border border-ink-800/15 bg-sand-50 px-4 py-2.5 text-sm text-ink-950 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/25 focus:outline-none"
        />
      </label>

      <SubmitButton className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-ink-800 px-6 py-3 text-sm font-semibold text-sand-50 shadow-card transition hover:bg-ink-900 disabled:cursor-not-allowed disabled:opacity-60">
        Ingresar
      </SubmitButton>
    </form>
  );
}
