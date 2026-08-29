"use client";

import { useCartHydrated, useCartStore } from "@/lib/cart-store";
import { useUiStore } from "@/lib/ui-store";

export function FloatingCartButton() {
  const openCart = useUiStore((state) => state.openCart);
  const hydrated = useCartHydrated();
  const itemCount = useCartStore((state) =>
    state.items.reduce((acc, item) => acc + item.quantity, 0)
  );

  return (
    <button
      className="fixed bottom-24 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-accent to-accent-deep text-white shadow-panel transition-transform hover:scale-105"
      onClick={openCart}
      type="button"
      aria-label="Abrir carrito"
    >
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.98-4.706 2.545-7.191a1.125 1.125 0 00-1.11-1.559H5.106M7.5 14.25L5.106 5.25M7.5 14.25L6.144 5.25"
        />
      </svg>
      {hydrated && itemCount > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-ink px-1.5 text-xs font-bold text-white dark:bg-white dark:text-ink">
          {itemCount}
        </span>
      )}
    </button>
  );
}
