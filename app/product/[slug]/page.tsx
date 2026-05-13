import { ArrowLeft, BadgeCheck, Heart, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/AddToCartButton";
import { Header } from "@/components/Header";
import { currencyFormatter, getProductBySlug } from "@/lib/products";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Producto no encontrado | De Segunda"
    };
  }

  return {
    title: `${product.name} | De Segunda`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image]
    }
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const gallery = product.images.length > 0 ? product.images : [{ url: product.image, alt: product.name }];

  return (
    <main>
      <Header />
      <section className="container-shell py-8">
        <Link
          className="focus-ring mb-6 inline-flex items-center gap-2 text-sm text-[color:var(--muted)]"
          href="/shop"
        >
          <ArrowLeft size={17} />
          Volver al marketplace
        </Link>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.75fr]">
          <div className="grid gap-3 sm:grid-cols-2">
            {gallery.map((image, index) => (
              <div
                className={`relative overflow-hidden bg-[#e8e1d7] ${
                  index === 0 ? "aspect-[4/5] sm:row-span-2 sm:aspect-auto" : "aspect-square"
                }`}
                key={`${image.url}-${index}`}
              >
                <Image
                  alt={image.alt ?? product.name}
                  className="object-cover"
                  fill
                  priority={index === 0}
                  sizes={index === 0 ? "(min-width: 1024px) 52vw, 100vw" : "(min-width: 1024px) 24vw, 50vw"}
                  src={image.url}
                />
              </div>
            ))}
          </div>

          <aside className="lg:sticky lg:top-8 lg:self-start">
            <div className="border border-[color:var(--line)] bg-white p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--accent)]">
                {product.brand}
              </p>
              <h1 className="mt-3 font-serif text-4xl leading-tight">{product.name}</h1>
              <p className="mt-4 text-2xl font-semibold">
                {currencyFormatter.format(product.price)}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                <div className="border border-[color:var(--line)] p-3">
                  <span className="block text-[color:var(--muted)]">Talla</span>
                  <strong>{product.size}</strong>
                </div>
                <div className="border border-[color:var(--line)] p-3">
                  <span className="block text-[color:var(--muted)]">Estado</span>
                  <strong>{product.condition}</strong>
                </div>
                <div className="border border-[color:var(--line)] p-3">
                  <span className="block text-[color:var(--muted)]">Categoria</span>
                  <strong>{product.category}</strong>
                </div>
                <div className="border border-[color:var(--line)] p-3">
                  <span className="block text-[color:var(--muted)]">Stock</span>
                  <strong>{product.stock}</strong>
                </div>
              </div>

              <p className="mt-6 leading-7 text-[color:var(--muted)]">
                {product.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <span className="border border-[color:var(--line)] px-3 py-2 text-sm" key={color}>
                    {color}
                  </span>
                ))}
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_auto]">
                <AddToCartButton
                  className="focus-ring inline-flex h-12 items-center justify-center gap-2 bg-[color:var(--ink)] px-5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                  product={product}
                />
                <button
                  className="focus-ring inline-flex h-12 items-center justify-center gap-2 border border-[color:var(--line)] px-5 text-sm font-semibold"
                  type="button"
                >
                  <Heart size={18} />
                  Guardar
                </button>
              </div>
            </div>

            <div className="mt-4 border border-[color:var(--line)] bg-white p-5 text-sm">
              <div className="flex items-center gap-2 font-semibold">
                <BadgeCheck size={18} className="text-[color:var(--forest)]" />
                {product.sellerName}
              </div>
              {product.location ? (
                <div className="mt-3 flex items-center gap-2 text-[color:var(--muted)]">
                  <MapPin size={17} />
                  {product.location}
                </div>
              ) : null}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
