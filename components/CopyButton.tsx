"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable — the value is already visible to select manually.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 rounded-full bg-ink-800/10 px-3 py-1.5 text-xs font-medium text-ink-800 transition hover:bg-ink-800/15"
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5" /> Copiado
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" /> Copiar
        </>
      )}
    </button>
  );
}
