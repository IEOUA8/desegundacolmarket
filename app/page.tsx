import { ArrowRight, BadgeCheck, Leaf, Sparkles } from "lucide-react";
import Image from "next/image";
import { FilterBar } from "@/components/FilterBar";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { getCategories, getFeaturedProducts, getProducts } from "@/lib/products";

const valueProps = [
  {
    title: "Curaduria",
    copy: "Piezas revisadas por estado, estilo y potencial de combinacion.",
    Icon: Sparkles
  },
  {
    title: "Confianza",
    copy: "Perfiles, favoritos, pagos seguros y ordenes trazables desde el MVP.",
    Icon: BadgeCheck
  },
  {
    title: "Sostenibilidad",
    copy: "Moda circular con descubrimiento visual y menor friccion de compra.",
    Icon: Leaf
  }
];

export default async function Home() {
  const [products, featuredProducts, categories] = await Promise.all([
    getProducts(),
    getFeaturedProducts(4),
    getCategories()
  ]);
  const heroProducts = featuredProducts.length > 0 ? featuredProducts : products.slice(0, 4);

  return (
    <main>
      <Header />
      <section className="bg-[color:var(--ink)] text-white">
        <div className="container-shell grid min-h-[620px] gap-10 py-12 md:grid-cols-[1fr_0.82fr] md:items-center">
          <div className="max-w-2xl">
            <p className="mb-5 text-xs uppercase tracking-[0.24em] text-[#cdbfb1]">
              Marketplace premium de moda circular
            </p>
            <h1 className="font-serif text-5xl leading-tight md:text-7xl">
              De Segunda
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#e8e1d7]">
              Descubre piezas curadas, publica prendas con confianza y compra moda de segunda mano con una experiencia editorial, rapida y mobile-first.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                className="focus-ring inline-flex h-12 items-center gap-2 bg-white px-5 text-sm font-semibold text-[color:var(--ink)]"
                href="/shop"
              >
                Explorar prendas
                <ArrowRight size={17} />
              </a>
              <a
                className="focus-ring inline-flex h-12 items-center border border-white/30 px-5 text-sm font-semibold"
                href="#vender"
              >
                Publicar producto
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 self-end">
            {heroProducts.slice(0, 4).map((product, index) => (
              <div
                className={`relative h-64 w-full overflow-hidden ${index % 2 === 0 ? "translate-y-6" : ""}`}
                key={product.id}
              >
                <Image
                  alt={product.name}
                  className="object-cover"
                  fill
                  sizes="(min-width: 768px) 22vw, 50vw"
                  src={product.image}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <FilterBar />

      <section className="container-shell py-14" id="marketplace">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--accent)]">
              Tendencias seleccionadas
            </p>
            <h2 className="mt-2 font-serif text-4xl">Marketplace</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <a
                className="focus-ring h-10 border border-[color:var(--line)] bg-white px-4 text-sm"
                href={`/shop?category=${category.slug}`}
                key={category.id}
              >
                {category.name}
              </a>
            ))}
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="border-y border-[color:var(--line)] bg-white py-14" id="curaduria">
        <div className="container-shell grid gap-8 md:grid-cols-3">
          {valueProps.map(({ title, copy, Icon }) => (
            <article className="border-l border-[color:var(--line)] pl-5" key={title}>
              <Icon className="mb-5 text-[color:var(--forest)]" size={24} />
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-3 leading-7 text-[color:var(--muted)]">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-shell grid gap-8 py-14 md:grid-cols-[0.8fr_1fr]" id="vender">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--accent)]">
            Panel seller listo para crecer
          </p>
          <h2 className="mt-2 font-serif text-4xl">Publica, mide y vende</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {["Crear productos", "Gestionar inventario", "Ver ventas", "Analizar conversion"].map((item) => (
            <div className="border border-[color:var(--line)] bg-white p-5 text-sm font-medium" key={item}>
              {item}
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-[color:var(--line)] py-8">
        <div className="container-shell flex flex-col justify-between gap-4 text-sm text-[color:var(--muted)] md:flex-row">
          <span>De Segunda Marketplace</span>
          <span>Next.js · Tailwind CSS · Prisma · PostgreSQL ready</span>
        </div>
      </footer>
    </main>
  );
}
