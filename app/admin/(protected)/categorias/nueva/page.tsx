import { createCategory } from "@/app/actions/categories";
import { CategoryForm } from "@/components/CategoryForm";

export default function NewCategoryPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-950">
          Nueva categoría
        </h1>
        <p className="mt-1 text-ink-950/60">
          Definí un nuevo tipo de estante para la feria.
        </p>
      </div>

      <div className="max-w-2xl rounded-3xl border border-ink-800/10 bg-sand-50 p-6 shadow-card sm:p-8">
        <CategoryForm action={createCategory} submitLabel="Crear categoría" />
      </div>
    </div>
  );
}
