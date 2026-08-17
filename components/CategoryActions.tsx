"use client";

import { Eye, EyeOff, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { toggleCategoryActive, deleteCategory } from "@/app/actions/categories";

export function CategoryActions({
  id,
  active,
}: {
  id: string;
  active: boolean;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <Link
        href={`/admin/categorias/${id}/editar`}
        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-ink-800 transition hover:bg-ink-800/10"
        title="Editar"
      >
        <Pencil className="h-4 w-4" />
      </Link>
      <form action={toggleCategoryActive.bind(null, id, !active)}>
        <button
          type="submit"
          title={active ? "Desactivar" : "Activar"}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-ink-800 transition hover:bg-ink-800/10"
        >
          {active ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </form>
      <form
        action={deleteCategory.bind(null, id)}
        onSubmit={(event) => {
          if (!confirm("¿Eliminar esta categoría? Esta acción no se puede deshacer.")) {
            event.preventDefault();
          }
        }}
      >
        <button
          type="submit"
          title="Eliminar"
          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-gold-700 transition hover:bg-gold-500/10"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
