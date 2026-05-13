import { ProductStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export type MarketplaceProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  brand: string;
  category: string;
  categorySlug: string;
  size: string;
  colors: string[];
  image: string;
  images: { url: string; alt: string | null }[];
  condition: string;
  location: string | null;
  featured: boolean;
  sellerName: string;
  sellerSlug: string | null;
};

export const currencyFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0
});

const productInclude = {
  category: true,
  images: {
    orderBy: {
      position: "asc" as const
    }
  },
  seller: {
    include: {
      sellerProfile: true
    }
  }
};

type ProductRecord = Awaited<ReturnType<typeof getRawProducts>>[number];

function toMarketplaceProduct(product: ProductRecord): MarketplaceProduct {
  const fallbackImage = "/window.svg";
  const images = product.images.map((image) => ({
    url: image.url,
    alt: image.alt
  }));

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.price,
    stock: product.stock,
    brand: product.brand,
    category: product.category.name,
    categorySlug: product.category.slug,
    size: product.size,
    colors: product.colors,
    image: images[0]?.url ?? fallbackImage,
    images,
    condition: product.condition,
    location: product.location,
    featured: product.featured,
    sellerName: product.seller.sellerProfile?.storeName ?? product.seller.name ?? "Vendedor",
    sellerSlug: product.seller.sellerProfile?.slug ?? null
  };
}

async function getRawProducts() {
  return prisma.product.findMany({
    where: {
      status: ProductStatus.ACTIVE
    },
    include: productInclude,
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }]
  });
}

export async function getProducts() {
  const products = await getRawProducts();
  return products.map(toMarketplaceProduct);
}

export async function getFeaturedProducts(limit = 4) {
  const products = await prisma.product.findMany({
    where: {
      status: ProductStatus.ACTIVE,
      featured: true
    },
    include: productInclude,
    orderBy: {
      createdAt: "desc"
    },
    take: limit
  });

  return products.map(toMarketplaceProduct);
}

export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findUnique({
    where: {
      slug
    },
    include: productInclude
  });

  if (!product || product.status !== ProductStatus.ACTIVE) {
    return null;
  }

  return toMarketplaceProduct(product);
}

export async function getCategories() {
  return prisma.category.findMany({
    orderBy: {
      name: "asc"
    },
    select: {
      id: true,
      name: true,
      slug: true
    }
  });
}
