"use client";

import { useEffect, useState } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { CartItem } from "@/lib/types";

type AddItemInput = Omit<CartItem, "quantity">;

type CartStore = {
  items: CartItem[];
  addItem: (item: AddItemInput) => void;
  incrementItem: (sku: string) => void;
  decrementItem: (sku: string) => void;
  removeItem: (sku: string) => void;
  clearCart: () => void;
  getTotals: () => { effective: number; transfer: number; list: number };
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((entry) => entry.sku === item.sku);

          if (existing) {
            if (existing.quantity >= existing.stock) return state;
            return {
              items: state.items.map((entry) =>
                entry.sku === item.sku
                  ? { ...entry, quantity: entry.quantity + 1 }
                  : entry
              )
            };
          }

          return {
            items: [...state.items, { ...item, quantity: 1 }]
          };
        }),
      incrementItem: (sku) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.sku === sku && item.quantity < item.stock
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        })),
      decrementItem: (sku) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.sku === sku ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter((item) => item.quantity > 0)
        })),
      removeItem: (sku) =>
        set((state) => ({
          items: state.items.filter((item) => item.sku !== sku)
        })),
      clearCart: () => set({ items: [] }),
      getTotals: () =>
        get().items.reduce(
          (acc, item) => ({
            effective: acc.effective + item.priceEffective * item.quantity,
            transfer: acc.transfer + item.priceTransfer * item.quantity,
            list: acc.list + item.priceList * item.quantity
          }),
          { effective: 0, transfer: 0, list: 0 }
        )
    }),
    {
      name: "fase-beta-cart",
      version: 3,
      storage: createJSONStorage(() => localStorage),
      migrate: () => ({ items: [] })
    }
  )
);

export function useCartHydrated() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(useCartStore.persist.hasHydrated());
    const unsubscribe = useCartStore.persist.onFinishHydration(() =>
      setHydrated(true)
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return hydrated;
}
