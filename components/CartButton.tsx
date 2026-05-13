"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { CartSummary } from "@/lib/cart";
import { useMarketplaceStore } from "@/store/useMarketplaceStore";

export function CartButton() {
  const [mounted, setMounted] = useState(false);
  const count = useMarketplaceStore((state) => state.cartItemCount());
  const hydrateCart = useMarketplaceStore((state) => state.hydrateCart);

  useEffect(() => {
    let cancelled = false;
    window.setTimeout(() => {
      if (!cancelled) {
        setMounted(true);
      }
    }, 0);

    async function loadCart() {
      const response = await fetch("/api/cart");

      if (cancelled) {
        return;
      }

      if (!response.ok) {
        hydrateCart([]);
        return;
      }

      const cart = (await response.json()) as CartSummary;
      hydrateCart(cart.items);
    }

    loadCart();

    return () => {
      cancelled = true;
    };
  }, [hydrateCart]);

  return (
    <Link
      className="focus-ring relative grid h-10 w-10 place-items-center bg-[color:var(--ink)] text-white"
      aria-label={`Carrito con ${mounted ? count : 0} productos`}
      href="/cart"
    >
      <ShoppingBag size={19} />
      {mounted && count > 0 ? (
        <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center bg-[color:var(--accent)] px-1 text-xs font-semibold text-white">
          {count}
        </span>
      ) : null}
    </Link>
  );
}
