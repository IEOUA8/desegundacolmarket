import Link from "next/link";
import { Suspense } from "react";
import { AuthForm } from "@/components/AuthForm";
import { Header } from "@/components/Header";

export const metadata = {
  title: "Iniciar sesion | De Segunda"
};

export default function LoginPage() {
  return (
    <main>
      <Header />
      <section className="container-shell grid min-h-[calc(100vh-80px)] place-items-center py-12">
        <div className="w-full max-w-md border border-[color:var(--line)] bg-white p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--accent)]">
            Cuenta
          </p>
          <h1 className="mt-2 font-serif text-4xl">Iniciar sesion</h1>
          <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
            Accede para guardar tu carrito y continuar compras.
          </p>
          <div className="mt-6">
            <Suspense fallback={null}>
              <AuthForm mode="login" />
            </Suspense>
          </div>
          <p className="mt-5 text-sm text-[color:var(--muted)]">
            No tienes cuenta?{" "}
            <Link className="font-semibold text-[color:var(--ink)]" href="/register">
              Crear cuenta
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
