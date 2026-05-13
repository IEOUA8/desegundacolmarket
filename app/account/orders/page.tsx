import { PackageCheck } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { getUserOrders } from "@/lib/checkout";
import { currencyFormatter } from "@/lib/products";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Mis ordenes | De Segunda"
};

const dateFormatter = new Intl.DateTimeFormat("es-CO", {
  dateStyle: "medium"
});

export default async function AccountOrdersPage() {
  const orders = await getUserOrders();

  return (
    <main>
      <Header />
      <section className="border-b border-[color:var(--line)] bg-white py-10">
        <div className="container-shell">
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--accent)]">
            Cuenta
          </p>
          <h1 className="mt-2 font-serif text-5xl">Mis ordenes</h1>
        </div>
      </section>

      <section className="container-shell py-10">
        {!orders ? (
          <div className="border border-[color:var(--line)] bg-white p-8">
            <h2 className="font-serif text-3xl">Inicia sesion para ver tus ordenes</h2>
            <Link
              className="focus-ring mt-6 inline-flex h-12 items-center bg-[color:var(--ink)] px-5 text-sm font-semibold text-white"
              href="/login?next=/account/orders"
            >
              Iniciar sesion
            </Link>
          </div>
        ) : orders.length > 0 ? (
          <div className="space-y-3">
            {orders.map((order) => (
              <article
                className="grid gap-4 border border-[color:var(--line)] bg-white p-5 md:grid-cols-[1fr_auto]"
                key={order.id}
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <PackageCheck size={20} className="text-[color:var(--forest)]" />
                    <h2 className="font-semibold">Orden {order.id}</h2>
                  </div>
                  <p className="mt-3 text-sm text-[color:var(--muted)]">
                    {dateFormatter.format(order.createdAt)} · {order.items.length} producto(s) · {order.status}
                  </p>
                </div>
                <div className="flex items-center gap-4 md:justify-end">
                  <p className="font-semibold">{currencyFormatter.format(order.total)}</p>
                  <Link
                    className="focus-ring inline-flex h-10 items-center border border-[color:var(--line)] px-4 text-sm font-semibold"
                    href={`/orders/${order.id}`}
                  >
                    Ver detalle
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="border border-[color:var(--line)] bg-white p-8">
            <h2 className="font-serif text-3xl">Aun no tienes ordenes</h2>
            <p className="mt-3 leading-7 text-[color:var(--muted)]">
              Cuando finalices una compra, aparecera aqui.
            </p>
            <Link
              className="focus-ring mt-6 inline-flex h-12 items-center bg-[color:var(--ink)] px-5 text-sm font-semibold text-white"
              href="/shop"
            >
              Explorar productos
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
