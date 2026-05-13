import Image from "next/image";
import Link from "next/link";
import { CheckoutForm } from "@/components/CheckoutForm";
import { Header } from "@/components/Header";
import { getCheckoutData } from "@/lib/checkout";
import { currencyFormatter } from "@/lib/products";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Checkout | De Segunda"
};

export default async function CheckoutPage() {
  const checkout = await getCheckoutData();

  return (
    <main>
      <Header />
      <section className="border-b border-[color:var(--line)] bg-white py-10">
        <div className="container-shell">
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--accent)]">
            Checkout
          </p>
          <h1 className="mt-2 font-serif text-5xl">Finalizar compra</h1>
        </div>
      </section>

      <section className="container-shell grid gap-8 py-10 lg:grid-cols-[1fr_380px]">
        {!checkout ? (
          <div className="border border-[color:var(--line)] bg-white p-8">
            <h2 className="font-serif text-3xl">Inicia sesion para continuar</h2>
            <p className="mt-3 leading-7 text-[color:var(--muted)]">
              Necesitas una cuenta para crear tu orden y guardar la direccion de envio.
            </p>
            <Link
              className="focus-ring mt-6 inline-flex h-12 items-center bg-[color:var(--ink)] px-5 text-sm font-semibold text-white"
              href="/login?next=/checkout"
            >
              Iniciar sesion
            </Link>
          </div>
        ) : checkout.cart.items.length === 0 ? (
          <div className="border border-[color:var(--line)] bg-white p-8">
            <h2 className="font-serif text-3xl">Tu carrito esta vacio</h2>
            <Link
              className="focus-ring mt-6 inline-flex h-12 items-center bg-[color:var(--ink)] px-5 text-sm font-semibold text-white"
              href="/shop"
            >
              Explorar productos
            </Link>
          </div>
        ) : (
          <div className="border border-[color:var(--line)] bg-white p-6">
            <h2 className="font-serif text-3xl">Direccion de envio</h2>
            <div className="mt-6">
              <CheckoutForm defaultName={checkout.user.name} />
            </div>
          </div>
        )}

        <aside className="h-fit border border-[color:var(--line)] bg-white p-6">
          <h2 className="font-serif text-2xl">Resumen</h2>
          <div className="mt-5 space-y-4">
            {checkout?.cart.items.map((item) => (
              <div className="grid grid-cols-[64px_1fr] gap-3" key={item.id}>
                <div className="relative aspect-square overflow-hidden bg-[#e8e1d7]">
                  <Image alt={item.name} className="object-cover" fill sizes="64px" src={item.image} />
                </div>
                <div className="text-sm">
                  <p className="font-semibold">{item.name}</p>
                  <p className="mt-1 text-[color:var(--muted)]">
                    {item.quantity} x {currencyFormatter.format(item.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-[color:var(--line)] pt-4 font-semibold">
            <span>Subtotal</span>
            <span>{currencyFormatter.format(checkout?.cart.subtotal ?? 0)}</span>
          </div>
        </aside>
      </section>
    </main>
  );
}
