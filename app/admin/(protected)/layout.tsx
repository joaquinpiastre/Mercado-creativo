import { requireAdmin } from "@/lib/auth";
import { AdminNav } from "@/components/AdminNav";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdmin();

  return (
    <div className="min-h-screen bg-sand-100">
      <AdminNav username={session.username} />
      <main className="mx-auto max-w-6xl px-5 py-10">{children}</main>
    </div>
  );
}
