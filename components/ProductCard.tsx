import { Heart, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { currencyFormatter, type MarketplaceProduct } from "@/lib/products";

type ProductCardProps = {
  product: MarketplaceProduct;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group relative overflow-hidden border border-[color:var(--line)] bg-white">
      <Link className="block" href={`/product/${product.slug}`}>
        <div className="relative aspect-[4/5] overflow-hidden bg-[#e8e1d7]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
      </Link>
      <button
        className="focus-ring absolute right-3 top-3 grid h-10 w-10 place-items-center bg-white/90 text-[color:var(--ink)] shadow-sm"
        aria-label={`Guardar ${product.name}`}
        type="button"
      >
        <Heart size={18} />
      </button>
      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
              {product.brand}
            </p>
            <h3 className="mt-1 text-base font-medium">{product.name}</h3>
          </div>
          <p className="whitespace-nowrap text-sm font-semibold">
            {currencyFormatter.format(product.price)}
          </p>
        </div>
        <div className="flex items-center justify-between border-t border-[color:var(--line)] pt-3 text-sm text-[color:var(--muted)]">
          <span>
            {product.size} · {product.condition}
          </span>
          <button
            className="focus-ring grid h-9 w-9 place-items-center bg-[color:var(--ink)] text-white"
            aria-label={`Agregar ${product.name} al carrito`}
            type="button"
          >
            <ShoppingBag size={17} />
          </button>
        </div>
      </div>
    </article>
  );
}
