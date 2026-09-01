"use client";

import Image from "next/image";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";

export function CartLineItems() {
  const items = useCartStore((state) => state.items);
  const incrementItem = useCartStore((state) => state.incrementItem);
  const decrementItem = useCartStore((state) => state.decrementItem);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <article
          className="flex flex-col gap-4 rounded-2xl border border-accent/20 bg-accent/5 p-4 dark:border-accent/30 dark:bg-accent/10"
          key={item.sku}
        >
          <div className="flex gap-4">
            <div className="relative aspect-square w-20 shrink-0 overflow-hidden rounded-xl border border-zinc-200 bg-mist dark:border-dk-border dark:bg-dk-elevated">
              <Image
                src={item.image}
                alt={item.productName}
                fill
                className="object-contain p-2"
                sizes="80px"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="section-label">{item.brand}</p>
              <h2 className="mt-1 truncate text-base font-semibold text-ink dark:text-white">
                {item.productName}
              </h2>
              <p className="mt-1 text-sm text-zinc-600 dark:text-slate-300">{item.variantLabel}</p>
              <p className="mt-1 text-xs text-zinc-500 dark:text-slate-400">{item.sku}</p>
            </div>
          </div>

          <div className="text-sm">
            <p className="font-semibold text-ink dark:text-white">
              Efectivo {formatPrice(item.priceEffective * item.quantity)}
            </p>
            <p className="mt-1 text-zinc-500 dark:text-slate-400">
              Transferencia / Lista {formatPrice(item.priceTransfer * item.quantity)}
            </p>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center overflow-hidden rounded-lg border border-zinc-200 dark:border-dk-border">
              <button
                className="h-10 w-10 text-lg text-zinc-600 transition-colors hover:bg-accent/10 hover:text-ink dark:text-slate-300 dark:hover:text-white"
                onClick={() => decrementItem(item.sku)}
                type="button"
              >
                −
              </button>
              <span className="flex h-10 min-w-12 items-center justify-center border-x border-zinc-200 px-3 text-sm font-semibold text-ink dark:border-dk-border dark:text-white">
                {item.quantity}
              </span>
              <button
                className="h-10 w-10 text-lg text-zinc-600 transition-colors hover:bg-accent/10 hover:text-ink disabled:cursor-not-allowed disabled:opacity-30 dark:text-slate-300 dark:hover:text-white"
                onClick={() => incrementItem(item.sku)}
                disabled={item.quantity >= item.stock}
                type="button"
              >
                +
              </button>
            </div>

            <button
              className="text-sm text-zinc-500 transition hover:text-ink dark:text-slate-400 dark:hover:text-white"
              onClick={() => removeItem(item.sku)}
              type="button"
            >
              Quitar
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
