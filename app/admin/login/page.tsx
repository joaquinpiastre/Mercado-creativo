import { Lightbulb } from "lucide-react";
import { LoginForm } from "@/components/LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="bg-ink-gradient flex min-h-screen items-center justify-center px-5">
      <div className="w-full max-w-sm rounded-3xl bg-sand-50 p-8 shadow-card">
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink-900 text-gold-400">
            <Lightbulb className="h-6 w-6" strokeWidth={2.25} />
          </span>
          <h1 className="font-display text-xl font-semibold text-ink-950">
            Panel de administración
          </h1>
          <p className="text-sm text-ink-950/60">Mercado Creativo</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
