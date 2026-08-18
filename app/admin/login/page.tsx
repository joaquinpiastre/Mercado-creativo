import Image from "next/image";
import { LoginForm } from "@/components/LoginForm";
import logoFull from "@/public/logo-full.png";

export default function AdminLoginPage() {
  return (
    <div className="bg-ink-gradient flex min-h-screen items-center justify-center px-5 py-12">
      <div className="w-full max-w-sm rounded-3xl bg-sand-50 p-8 shadow-card">
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <Image
            src={logoFull}
            alt="Mercado Creativo"
            className="h-44 w-auto"
            priority
          />
          <h1 className="font-display text-xl font-semibold text-ink-950">
            Panel de administración
          </h1>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
