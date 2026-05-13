"use client";

import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import type { CartProductInput, CartSummary } from "@/lib/cart";
import { useMarketplaceStore } from "@/store/useMarketplaceStore";

type AddToCartButtonProps = {
  product: CartProductInput;
  className?: string;
  compact?: boolean;
};

export function AddToCartButton({
  product,
  className,
  compact = false
}: AddToCartButtonProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "added" | "error">("idle");
  const addCartItem = useMarketplaceStore((state) => state.addCartItem);
  const hydrateCart = useMarketplaceStore((state) => state.hydrateCart);

  async function handleAddToCart() {
    setStatus("loading");
    addCartItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      brand: product.brand,
      size: product.size,
      condition: product.condition,
      price: product.price,
      quantity: 1,
      image: product.image,
      stock: product.stock
    });

    try {
      const response = await fetch("/api/cart/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1
        })
      });

      if (!response.ok) {
        throw new Error("Unable to add product to cart.");
      }

      const cart = (await response.json()) as CartSummary;
      hydrateCart(cart.items);
      setStatus("added");
      window.setTimeout(() => setStatus("idle"), 1400);
    } catch {
      setStatus("error");
      window.setTimeout(() => setStatus("idle"), 1800);
    }
  }

  return (
    <button
      className={className}
      aria-label={`Agregar ${product.name} al carrito`}
      disabled={status === "loading" || product.stock <= 0}
      onClick={handleAddToCart}
      type="button"
    >
      <ShoppingBag size={compact ? 17 : 18} />
      {!compact ? (
        <span>
          {status === "loading"
            ? "Agregando"
            : status === "added"
              ? "Agregado"
              : status === "error"
                ? "Reintentar"
                : product.stock > 0
                  ? "Agregar al carrito"
                  : "Sin stock"}
        </span>
      ) : null}
    </button>
  );
}
