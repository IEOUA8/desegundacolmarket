import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { getOrderById } from "@/lib/checkout";
import { currencyFormatter } from "@/lib/products";

type OrderPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function OrderPage({ params }: OrderPageProps) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) {
    notFound();
  }

  return (
    <main>
      <Header />
      <section className="container-shell py-12">
        <div className="border border-[color:var(--line)] bg-white p-8">
          <CheckCircle2 className="text-[color:var(--forest)]" size={34} />
          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-[color:var(--accent)]">
            Orden creada
          </p>
          <h1 className="mt-2 font-serif text-5xl">Gracias por tu compra</h1>
          <p className="mt-4 text-[color:var(--muted)]">
            Orden <span className="font-semibold text-[color:var(--ink)]">{order.id}</span> en estado {order.status}.
          </p>

          <div className="mt-8 divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
            {order.items.map((item) => (
              <div className="flex items-center justify-between gap-4 py-4" key={item.id}>
                <div>
                  <p className="font-semibold">{item.productName}</p>
                  <p className="mt-1 text-sm text-[color:var(--muted)]">
                    {item.quantity} x {currencyFormatter.format(item.price)}
                  </p>
                </div>
                <p className="font-semibold">
                  {currencyFormatter.format(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between text-xl font-semibold">
            <span>Total</span>
            <span>{currencyFormatter.format(order.total)}</span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              className="focus-ring inline-flex h-12 items-center bg-[color:var(--ink)] px-5 text-sm font-semibold text-white"
              href="/shop"
            >
              Seguir explorando
            </Link>
            <Link
              className="focus-ring inline-flex h-12 items-center border border-[color:var(--line)] px-5 text-sm font-semibold"
              href="/cart"
            >
              Ver carrito
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
