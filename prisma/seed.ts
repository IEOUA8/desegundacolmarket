import { UserRole } from "@prisma/client";
import { prisma } from "../lib/prisma";


const categories = [
  { name: "Chaquetas", slug: "chaquetas" },
  { name: "Denim", slug: "denim" },
  { name: "Accesorios", slug: "accesorios" },
  { name: "Camisas", slug: "camisas" },
  { name: "Zapatos", slug: "zapatos" }
];

const products = [
  {
    name: "Blazer lana vintage",
    slug: "blazer-lana-vintage",
    description: "Silueta estructurada, forro intacto y botones originales.",
    price: 189000,
    stock: 1,
    brand: "Massimo Dutti",
    size: "M",
    colors: ["Negro", "Gris"],
    images: [
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80"
    ],
    condition: "Muy bueno",
    location: "Bogota",
    featured: true,
    categorySlug: "chaquetas"
  },
  {
    name: "Bolso cuero mini",
    slug: "bolso-cuero-mini",
    description: "Cuero granulado, formato compacto y correa ajustable.",
    price: 245000,
    stock: 1,
    brand: "Coach",
    size: "Unica",
    colors: ["Cafe"],
    images: [
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=80"
    ],
    condition: "Como nuevo",
    location: "Medellin",
    featured: true,
    categorySlug: "accesorios"
  },
  {
    name: "Camisa lino relajada",
    slug: "camisa-lino-relajada",
    description: "Lino liviano con caida suave para looks de verano.",
    price: 79000,
    stock: 2,
    brand: "Zara",
    size: "S",
    colors: ["Blanco"],
    images: [
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=900&q=80"
    ],
    condition: "Bueno",
    location: "Cali",
    featured: false,
    categorySlug: "camisas"
  },
  {
    name: "Denim recto premium",
    slug: "denim-recto-premium",
    description: "Corte recto, tiro alto y desgaste natural.",
    price: 132000,
    stock: 1,
    brand: "Levi's",
    size: "28",
    colors: ["Azul"],
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=80"
    ],
    condition: "Muy bueno",
    location: "Bogota",
    featured: true,
    categorySlug: "denim"
  }
];

async function main() {
  const seller = await prisma.user.upsert({
    where: { email: "seller@desegunda.co" },
    update: {},
    create: {
      email: "seller@desegunda.co",
      name: "De Segunda Curaduria",
      role: UserRole.SELLER
    }
  });

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category
    });
  }

  for (const product of products) {
    const { categorySlug, ...data } = product;

    await prisma.product.upsert({
      where: { slug: product.slug },
      update: data,
      create: {
        ...data,
        seller: { connect: { id: seller.id } },
        category: { connect: { slug: categorySlug } }
      }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
