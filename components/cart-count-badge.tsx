"use client";

import Link from "next/link";
import { useCartHydrated, useCartStore } from "@/lib/cart-store";

export function CartCountBadge() {
  const hydrated = useCartHydrated();
  const itemCount = useCartStore((state) =>
    state.items.reduce((acc, item) => acc + item.quantity, 0)
  );

  return (
    <Link
      className="inline-flex items-center gap-2.5 rounded-full border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-ink shadow-card transition-all hover:border-accent/40 hover:bg-accent/5 hover:shadow-none dark:border-dk-border dark:bg-dk-surface dark:text-white dark:hover:border-accent/40"
      href="/carrito"
    >
      <span className="text-zinc-600 dark:text-slate-400">Pedido</span>
      <span className="flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-gradient-to-r from-accent to-accent-deep px-1.5 text-xs font-bold text-white">
        {hydrated ? itemCount : 0}
      </span>
    </Link>
  );
}
