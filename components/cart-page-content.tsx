"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/button";
import { useCartHydrated, useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";

export function CartPageContent() {
  const hydrated = useCartHydrated();
  const items = useCartStore((state) => state.items);
  const incrementItem = useCartStore((state) => state.incrementItem);
  const decrementItem = useCartStore((state) => state.decrementItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const totals = useCartStore((state) => state.getTotals());

  if (!hydrated) {
    return (
      <div className="panel px-6 py-12 text-center text-sm text-zinc-500 dark:text-slate-400">
        Cargando pedido...
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="panel p-8">
          <p className="section-label">Carrito</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink dark:text-white">
            Tu pedido todavía está vacío.
          </h1>
          <p className="mt-4 max-w-xl text-zinc-600 dark:text-slate-300">
            Volvé al catálogo, elegí las variantes que quieras y armamos el
            checkout en un paso.
          </p>
          <Button className="mt-8" href="/catalogo">
            Ir al catálogo
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-4">
        <div className="panel p-6">
          <p className="section-label">Carrito</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink dark:text-white">
            Revisá tu pedido antes de enviarlo.
          </h1>
        </div>

        {items.map((item) => (
          <article
            className="panel grid gap-4 p-4 sm:grid-cols-[132px_1fr_auto] sm:items-center"
            key={item.sku}
          >
            <div className="relative aspect-square overflow-hidden rounded-xl border border-zinc-200 bg-mist dark:border-dk-border dark:bg-dk-elevated">
              <Image
                src={item.image}
                alt={item.productName}
                fill
                className="object-contain p-3"
                sizes="132px"
              />
            </div>

            <div>
              <p className="section-label">{item.brand}</p>
              <h2 className="mt-2 text-lg font-semibold text-ink dark:text-white">
                {item.productName}
              </h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-slate-300">{item.variantLabel}</p>
              <p className="mt-1 text-sm text-zinc-500 dark:text-slate-400">{item.sku}</p>
            </div>

            <div className="flex flex-col gap-4 sm:items-end">
              <div className="text-right text-sm">
                <p className="font-semibold text-ink dark:text-white">
                  Efectivo {formatPrice(item.priceEffective * item.quantity)}
                </p>
                <p className="mt-1 text-zinc-500 dark:text-slate-400">
                  Transferencia {formatPrice(item.priceTransfer * item.quantity)}
                </p>
                <p className="mt-1 text-zinc-500 dark:text-slate-400">
                  Lista {formatPrice(item.priceList * item.quantity)}
                </p>
              </div>

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

      <aside className="panel h-fit p-6">
        <p className="section-label">Resumen</p>
        <div className="mt-6 space-y-4 border-y border-zinc-200 py-5 text-sm text-zinc-600 dark:border-dk-border dark:text-slate-300">
          <div className="flex items-center justify-between">
            <span>Items</span>
            <span>{items.reduce((acc, item) => acc + item.quantity, 0)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Efectivo</span>
            <span className="text-lg font-semibold text-ink dark:text-white">
              {formatPrice(totals.effective)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>Transferencia</span>
            <span>{formatPrice(totals.transfer)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Lista</span>
            <span>{formatPrice(totals.list)}</span>
          </div>
        </div>
        <div className="mt-6 space-y-3">
          <Button className="w-full" href="/checkout" variant="secondary">
            Continuar al checkout
          </Button>
          <Link
            className="block text-center text-sm text-zinc-500 transition hover:text-ink dark:text-slate-400 dark:hover:text-white"
            href="/catalogo"
          >
            Seguir comprando
          </Link>
        </div>
      </aside>
    </div>
  );
}
