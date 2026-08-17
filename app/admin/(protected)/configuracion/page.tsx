import { prisma } from "@/lib/prisma";
import { SettingsForm } from "@/components/SettingsForm";

export default async function AdminSettingsPage() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-950">
          Configuración
        </h1>
        <p className="mt-1 text-ink-950/60">
          Datos de pago, WhatsApp y textos que se muestran en el sitio
          público.
        </p>
      </div>

      <div className="max-w-2xl rounded-3xl border border-ink-800/10 bg-sand-50 p-6 shadow-card sm:p-8">
        <SettingsForm settings={settings} />
      </div>
    </div>
  );
}
