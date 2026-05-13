"use client";

import type { Route } from "next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMarketplaceStore } from "@/store/useMarketplaceStore";

type CheckoutFormProps = {
  defaultName?: string | null;
};

export function CheckoutForm({ defaultName }: CheckoutFormProps) {
  const router = useRouter();
  const hydrateCart = useMarketplaceStore((state) => state.hydrateCart);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      fullName: String(formData.get("fullName") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      line1: String(formData.get("line1") ?? ""),
      line2: String(formData.get("line2") ?? ""),
      city: String(formData.get("city") ?? ""),
      state: String(formData.get("state") ?? ""),
      postalCode: String(formData.get("postalCode") ?? ""),
      country: "CO"
    };

    try {
      const response = await fetch("/api/checkout/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const result = (await response.json()) as { orderId?: string; error?: string };

      if (!response.ok || !result.orderId) {
        if (response.status === 401) {
          router.push("/login?next=/checkout");
          return;
        }

        throw new Error(result.error ?? "No se pudo crear la orden.");
      }

      hydrateCart([]);
      router.push(`/orders/${result.orderId}` as Route);
      router.refresh();
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "No se pudo crear la orden.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          Nombre completo
          <input
            className="focus-ring mt-2 h-11 w-full border border-[color:var(--line)] px-3"
            defaultValue={defaultName ?? ""}
            name="fullName"
            required
            type="text"
          />
        </label>
        <label className="block text-sm font-medium">
          Telefono
          <input
            className="focus-ring mt-2 h-11 w-full border border-[color:var(--line)] px-3"
            name="phone"
            required
            type="tel"
          />
        </label>
      </div>
      <label className="block text-sm font-medium">
        Direccion
        <input
          className="focus-ring mt-2 h-11 w-full border border-[color:var(--line)] px-3"
          name="line1"
          required
          type="text"
        />
      </label>
      <label className="block text-sm font-medium">
        Apartamento, torre o referencia
        <input
          className="focus-ring mt-2 h-11 w-full border border-[color:var(--line)] px-3"
          name="line2"
          type="text"
        />
      </label>
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block text-sm font-medium">
          Ciudad
          <input
            className="focus-ring mt-2 h-11 w-full border border-[color:var(--line)] px-3"
            name="city"
            required
            type="text"
          />
        </label>
        <label className="block text-sm font-medium">
          Departamento
          <input
            className="focus-ring mt-2 h-11 w-full border border-[color:var(--line)] px-3"
            name="state"
            type="text"
          />
        </label>
        <label className="block text-sm font-medium">
          Codigo postal
          <input
            className="focus-ring mt-2 h-11 w-full border border-[color:var(--line)] px-3"
            name="postalCode"
            type="text"
          />
        </label>
      </div>
      <button
        className="focus-ring h-12 w-full bg-[color:var(--ink)] text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
        disabled={pending}
        type="submit"
      >
        {pending ? "Creando orden" : "Crear orden"}
      </button>
      {error ? <p className="text-sm text-[color:var(--accent)]">{error}</p> : null}
    </form>
  );
}
