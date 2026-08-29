"use client";

import { useEffect } from "react";
import { Button } from "@/components/button";
import { CartCheckoutPanel } from "@/components/cart-checkout-panel";
import { CartLineItems } from "@/components/cart-line-items";
import { useCartHydrated, useCartStore } from "@/lib/cart-store";
import { useUiStore } from "@/lib/ui-store";

type CartDrawerProps = {
  whatsappNumber: string | null;
};

export function CartDrawer({ whatsappNumber }: CartDrawerProps) {
  const cartOpen = useUiStore((state) => state.cartOpen);
  const closeCart = useUiStore((state) => state.closeCart);
  const hydrated = useCartHydrated();
  const items = useCartStore((state) => state.items);

  useEffect(() => {
    if (!cartOpen) return;

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen]);

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-ink/40 transition-opacity dark:bg-black/60 ${
          cartOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      <aside
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-panel transition-transform duration-300 dark:bg-dk-surface ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!cartOpen}
      >
        <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-5 dark:border-dk-border">
          <div>
            <p className="section-label">Carrito</p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-ink dark:text-white">
              Tu pedido
            </h2>
          </div>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full text-xl text-zinc-500 transition hover:bg-mist hover:text-ink dark:text-slate-400 dark:hover:bg-dk-elevated dark:hover:text-white"
            onClick={closeCart}
            type="button"
            aria-label="Cerrar carrito"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {!hydrated ? (
            <p className="px-2 py-12 text-center text-sm text-zinc-500 dark:text-slate-400">
              Cargando pedido...
            </p>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
              <p className="text-lg font-semibold text-ink dark:text-white">
                Tu pedido todavía está vacío.
              </p>
              <p className="max-w-xs text-sm text-zinc-600 dark:text-slate-300">
                Volvé al catálogo y elegí las variantes que quieras.
              </p>
              <Button href="/catalogo">
                Ir al catálogo
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              <CartLineItems />
              <CartCheckoutPanel whatsappNumber={whatsappNumber} />
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
