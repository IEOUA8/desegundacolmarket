"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  productId: string;
  slug: string;
  name: string;
  brand: string;
  size: string;
  condition: string;
  price: number;
  quantity: number;
  image: string;
  stock: number;
};

type MarketplaceState = {
  savedProductIds: string[];
  cartItems: CartItem[];
  cartHydrated: boolean;
  toggleSavedProduct: (productId: string) => void;
  hydrateCart: (items: CartItem[]) => void;
  addCartItem: (item: CartItem) => void;
  cartItemCount: () => number;
  cartSubtotal: () => number;
};

export const useMarketplaceStore = create<MarketplaceState>()(
  persist(
    (set, get) => ({
      savedProductIds: [],
      cartItems: [],
      cartHydrated: false,
      toggleSavedProduct: (productId) =>
        set((state) => ({
          savedProductIds: state.savedProductIds.includes(productId)
            ? state.savedProductIds.filter((id) => id !== productId)
            : [...state.savedProductIds, productId]
        })),
      hydrateCart: (items) =>
        set({
          cartItems: items,
          cartHydrated: true
        }),
      addCartItem: (item) =>
        set((state) => {
          const existingItem = state.cartItems.find(
            (cartItem) => cartItem.productId === item.productId
          );

          if (!existingItem) {
            return {
              cartItems: [...state.cartItems, item]
            };
          }

          return {
            cartItems: state.cartItems.map((cartItem) =>
              cartItem.productId === item.productId
                ? {
                    ...cartItem,
                    quantity: Math.min(cartItem.quantity + item.quantity, cartItem.stock)
                  }
                : cartItem
            )
          };
        }),
      cartItemCount: () =>
        get().cartItems.reduce((total, item) => total + item.quantity, 0),
      cartSubtotal: () =>
        get().cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    }),
    {
      name: "de-segunda-marketplace"
    }
  )
);
