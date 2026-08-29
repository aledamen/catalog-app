"use client";

import { create } from "zustand";

type UiStore = {
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
};

export const useUiStore = create<UiStore>()((set) => ({
  cartOpen: false,
  openCart: () => set({ cartOpen: true }),
  closeCart: () => set({ cartOpen: false }),
  toggleCart: () => set((state) => ({ cartOpen: !state.cartOpen }))
}));
