import { create } from "zustand";

type MarketplaceState = {
  savedProductIds: string[];
  toggleSavedProduct: (productId: string) => void;
};

export const useMarketplaceStore = create<MarketplaceState>((set) => ({
  savedProductIds: [],
  toggleSavedProduct: (productId) =>
    set((state) => ({
      savedProductIds: state.savedProductIds.includes(productId)
        ? state.savedProductIds.filter((id) => id !== productId)
        : [...state.savedProductIds, productId]
    }))
}));
