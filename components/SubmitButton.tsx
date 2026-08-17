"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

export function SubmitButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={
        className ??
        "inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-ink-950 shadow-card transition hover:bg-gold-600 disabled:cursor-not-allowed disabled:opacity-60"
      }
    >
      {pending && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}
