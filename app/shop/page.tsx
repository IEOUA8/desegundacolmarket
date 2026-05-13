import { FilterBar } from "@/components/FilterBar";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { getCategories, getProducts } from "@/lib/products";

type ShopPageProps = {
  searchParams: Promise<{
    category?: string;
  }>;
};

export const metadata = {
  title: "Marketplace | De Segunda",
  description: "Explora prendas y accesorios curados de segunda mano."
};

export const dynamic = "force-dynamic";

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const [{ category }, products, categories] = await Promise.all([
    searchParams,
    getProducts(),
    getCategories()
  ]);
  const selectedCategory = category ?? "all";
  const visibleProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.categorySlug === selectedCategory);

  return (
    <main>
      <Header />
      <section className="border-b border-[color:var(--line)] bg-white py-12">
        <div className="container-shell flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--accent)]">
              Marketplace
            </p>
            <h1 className="mt-2 font-serif text-5xl">Prendas curadas</h1>
            <p className="mt-4 max-w-2xl leading-7 text-[color:var(--muted)]">
              Compra piezas seleccionadas con inventario real desde Supabase y Prisma.
            </p>
          </div>
          <p className="text-sm text-[color:var(--muted)]">
            {visibleProducts.length} productos
          </p>
        </div>
      </section>

      <FilterBar />

      <section className="container-shell py-10">
        <div className="mb-8 flex gap-2 overflow-x-auto">
          <a
            className={`focus-ring h-10 shrink-0 border px-4 pt-2 text-sm ${
              selectedCategory === "all"
                ? "border-[color:var(--ink)] bg-[color:var(--ink)] text-white"
                : "border-[color:var(--line)] bg-white"
            }`}
            href="/shop"
          >
            Todo
          </a>
          {categories.map((item) => (
            <a
              className={`focus-ring h-10 shrink-0 border px-4 pt-2 text-sm ${
                selectedCategory === item.slug
                  ? "border-[color:var(--ink)] bg-[color:var(--ink)] text-white"
                  : "border-[color:var(--line)] bg-white"
              }`}
              href={`/shop?category=${item.slug}`}
              key={item.id}
            >
              {item.name}
            </a>
          ))}
        </div>

        {visibleProducts.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="border border-[color:var(--line)] bg-white p-8 text-[color:var(--muted)]">
            No hay productos activos en esta categoria.
          </div>
        )}
      </section>
    </main>
  );
}
