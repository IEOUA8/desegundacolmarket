import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { getCart } from "@/lib/cart";
import { currencyFormatter } from "@/lib/products";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Carrito | De Segunda",
  description: "Revisa las piezas agregadas a tu carrito."
};

export default async function CartPage() {
  const cart = await getCart();

  return (
    <main>
      <Header />
      <section className="border-b border-[color:var(--line)] bg-white py-10">
        <div className="container-shell">
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--accent)]">
            Carrito
          </p>
          <h1 className="mt-2 font-serif text-5xl">Tu seleccion</h1>
        </div>
      </section>

      <section className="container-shell grid gap-8 py-10 lg:grid-cols-[1fr_360px]">
        {cart.items.length > 0 ? (
          <div className="space-y-3">
            {cart.items.map((item) => (
              <article
                className="grid gap-4 border border-[color:var(--line)] bg-white p-4 sm:grid-cols-[120px_1fr_auto]"
                key={item.id}
              >
                <Link className="relative aspect-square overflow-hidden bg-[#e8e1d7]" href={`/product/${item.slug}`}>
                  <Image
                    alt={item.name}
                    className="object-cover"
                    fill
                    sizes="120px"
                    src={item.image}
                  />
                </Link>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                    {item.brand}
                  </p>
                  <Link className="mt-1 block text-lg font-semibold" href={`/product/${item.slug}`}>
                    {item.name}
                  </Link>
                  <p className="mt-2 text-sm text-[color:var(--muted)]">
                    {item.size} · {item.condition}
                  </p>
                  <p className="mt-3 text-sm">Cantidad: {item.quantity}</p>
                </div>
                <p className="font-semibold">
                  {currencyFormatter.format(item.price * item.quantity)}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <div className="border border-[color:var(--line)] bg-white p-8 text-[color:var(--muted)]">
            Tu carrito esta vacio.
          </div>
        )}

        <aside className="h-fit border border-[color:var(--line)] bg-white p-6">
          <div className="flex items-center justify-between text-sm text-[color:var(--muted)]">
            <span>Productos</span>
            <span>{cart.itemCount}</span>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-[color:var(--line)] pt-4 text-lg font-semibold">
            <span>Subtotal</span>
            <span>{currencyFormatter.format(cart.subtotal)}</span>
          </div>
          <button
            className="focus-ring mt-6 h-12 w-full bg-[color:var(--ink)] text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
            disabled={cart.items.length === 0}
            type="button"
          >
            Continuar compra
          </button>
          <Link
            className="focus-ring mt-3 flex h-12 items-center justify-center border border-[color:var(--line)] text-sm font-semibold"
            href="/shop"
          >
            Seguir explorando
          </Link>
        </aside>
      </section>
    </main>
  );
}
