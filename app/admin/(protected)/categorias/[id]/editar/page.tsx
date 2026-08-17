import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateCategory } from "@/app/actions/categories";
import { CategoryForm } from "@/components/CategoryForm";

export default async function EditCategoryPage({
  params,
}: PageProps<"/admin/categorias/[id]/editar">) {
  const { id } = await params;

  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-950">
          Editar categoría
        </h1>
        <p className="mt-1 text-ink-950/60">{category.name}</p>
      </div>

      <div className="max-w-2xl rounded-3xl border border-ink-800/10 bg-sand-50 p-6 shadow-card sm:p-8">
        <CategoryForm
          action={updateCategory.bind(null, category.id)}
          defaults={{
            name: category.name,
            slug: category.slug,
            description: category.description,
            price: category.price,
            capacity: category.capacity,
            features: category.features,
            imageUrl: category.imageUrl,
            active: category.active,
            order: category.order,
          }}
          submitLabel="Guardar cambios"
        />
      </div>
    </div>
  );
}
