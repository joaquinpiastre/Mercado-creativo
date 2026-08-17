import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const adminUsername = process.env.ADMIN_SEED_USERNAME;
  const adminPassword = process.env.ADMIN_SEED_PASSWORD;

  if (!adminUsername || !adminPassword) {
    throw new Error(
      "Definí ADMIN_SEED_USERNAME y ADMIN_SEED_PASSWORD en .env antes de sembrar la base."
    );
  }

  const passwordHash = await bcrypt.hash(adminPassword, 10);
  await prisma.adminUser.upsert({
    where: { username: adminUsername },
    create: { username: adminUsername, passwordHash },
    update: { passwordHash },
  });
  console.log(`Admin "${adminUsername}" listo.`);

  await prisma.siteSettings.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      whatsappNumber: "5492604000000",
      paymentAlias: "mercado.creativo.mza",
      paymentBankName: "Completar en el panel de configuración",
      heroSubtitle:
        "Elegí el tipo de estante para tu emprendimiento, completá tus datos y asegurá tu lugar en la feria.",
      fairAddress: "Club de Pescadores, San Rafael, Mendoza",
      fairDescription:
        "Encuentro Nacional de Elaboradores y Productores en el Club de Pescadores.",
    },
    update: {},
  });
  console.log("Configuración del sitio lista (placeholders).");

  const categories = [
    {
      name: "Estante Gastronómico",
      slug: "estante-gastronomico",
      description:
        "Ideal para food trucks, dulces caseros, bebidas y comidas para compartir en la feria.",
      price: 20000,
      capacity: 8,
      features: [
        "Mesa de 2x1 metros",
        "Acceso a electricidad",
        "Ubicación cercana al sector gastronómico",
      ],
      order: 1,
    },
    {
      name: "Estante de Artesanías",
      slug: "estante-artesanias",
      description:
        "Para emprendedores de artesanías, bijouterie, cuero y productos hechos a mano.",
      price: 12000,
      capacity: 15,
      features: ["Mesa de 1.5x1 metros", "Ubicación bajo galería cubierta"],
      order: 2,
    },
    {
      name: "Estante de Indumentaria",
      slug: "estante-indumentaria",
      description:
        "Pensado para marcas de ropa, accesorios y diseño textil independiente.",
      price: 15000,
      capacity: 10,
      features: [
        "Mesa de 2x1 metros",
        "Espacio para percheros",
        "Acceso a electricidad",
      ],
      order: 3,
    },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      create: category,
      update: category,
    });
  }
  console.log(`${categories.length} categorías de ejemplo listas.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
