"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import type { CartLine, CartSummary } from "@/lib/cart";
import { useMarketplaceStore } from "@/store/useMarketplaceStore";

type CartItemControlsProps = {
  item: CartLine;
};

export function CartItemControls({ item }: CartItemControlsProps) {
  const [pending, setPending] = useState(false);
  const hydrateCart = useMarketplaceStore((state) => state.hydrateCart);
  const updateLocalQuantity = useMarketplaceStore((state) => state.updateCartItemQuantity);
  const removeLocalItem = useMarketplaceStore((state) => state.removeCartItem);

  async function syncQuantity(nextQuantity: number) {
    setPending(true);
    updateLocalQuantity(item.productId, nextQuantity);

    try {
      const response = await fetch(`/api/cart/items/${item.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          quantity: nextQuantity
        })
      });

      if (!response.ok) {
        throw new Error("Unable to update cart item.");
      }

      const cart = (await response.json()) as CartSummary;
      hydrateCart(cart.items);
    } finally {
      setPending(false);
    }
  }

  async function removeItem() {
    setPending(true);
    removeLocalItem(item.productId);

    try {
      const response = await fetch(`/api/cart/items/${item.id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error("Unable to remove cart item.");
      }

      const cart = (await response.json()) as CartSummary;
      hydrateCart(cart.items);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mt-4 flex flex-wrap items-center gap-3">
      <div className="grid h-10 grid-cols-[40px_48px_40px] border border-[color:var(--line)]">
        <button
          aria-label={`Reducir cantidad de ${item.name}`}
          className="focus-ring grid place-items-center disabled:cursor-not-allowed disabled:opacity-50"
          disabled={pending || item.quantity <= 1}
          onClick={() => syncQuantity(item.quantity - 1)}
          type="button"
        >
          <Minus size={16} />
        </button>
        <span className="grid place-items-center border-x border-[color:var(--line)] text-sm font-semibold">
          {item.quantity}
        </span>
        <button
          aria-label={`Aumentar cantidad de ${item.name}`}
          className="focus-ring grid place-items-center disabled:cursor-not-allowed disabled:opacity-50"
          disabled={pending || item.quantity >= item.stock}
          onClick={() => syncQuantity(item.quantity + 1)}
          type="button"
        >
          <Plus size={16} />
        </button>
      </div>

      <button
        className="focus-ring inline-flex h-10 items-center gap-2 border border-[color:var(--line)] px-3 text-sm text-[color:var(--muted)] disabled:cursor-not-allowed disabled:opacity-50"
        disabled={pending}
        onClick={removeItem}
        type="button"
      >
        <Trash2 size={16} />
        Eliminar
      </button>
    </div>
  );
}
