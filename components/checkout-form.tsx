"use client";

import { useMemo } from "react";
import { Button } from "@/components/button";
import { useCartHydrated, useCartStore } from "@/lib/cart-store";
import { buildWhatsAppHref } from "@/lib/whatsapp";
import { formatPrice } from "@/lib/utils";

export function CheckoutForm() {
  const hydrated = useCartHydrated();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const totals = useCartStore((state) => state.getTotals());

  const whatsappHref = useMemo(() => {
    if (!items.length) {
      return "";
    }

    return buildWhatsAppHref(items);
  }, [items]);

  const handleSubmit = () => {
    if (!whatsappHref) {
      return;
    }

    window.open(whatsappHref, "_blank", "noopener,noreferrer");
  };

  if (!hydrated) {
    return (
      <div className="panel px-6 py-12 text-center text-sm text-zinc-500">
        Cargando checkout...
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="panel p-8">
        <p className="section-label">Checkout</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink">
          Necesitás sumar productos antes de enviar un pedido.
        </h1>
        <p className="mt-4 max-w-xl text-zinc-600">
          El checkout usa el carrito actual para armar el mensaje de WhatsApp.
        </p>
        <Button className="mt-8" href="/catalogo">
          Ir al catálogo
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="panel p-6 sm:p-8">
        <p className="section-label">Checkout</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink">
          Confirmá el pedido y envialo directo por WhatsApp.
        </h1>
        <p className="mt-4 max-w-xl text-zinc-600">
          El mensaje se arma automáticamente con todos los productos guardados
          en el carrito, sus cantidades y el total final.
        </p>

        <div className="mt-8 rounded-xl border border-accent/20 bg-accent/5 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-deep">
            Destino del pedido
          </p>
          <p className="mt-3 text-lg font-semibold text-ink">
            +54 9 11 3954-5945
          </p>
          <p className="mt-2 text-sm text-zinc-600">
            Al confirmar, se abrirá WhatsApp con el pedido completo listo para
            enviar a este número.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button className="flex-1" onClick={handleSubmit} variant="secondary">
            Enviar pedido por WhatsApp
          </Button>
          <Button onClick={clearCart} variant="ghost">
            Vaciar carrito
          </Button>
        </div>
      </div>

      <aside className="panel p-6 sm:p-8">
        <p className="section-label">Resumen del pedido</p>
        <div className="mt-6 space-y-4">
          {items.map((item) => (
            <div
              className="flex items-start justify-between gap-4 border-b border-zinc-100 pb-4"
              key={item.sku}
            >
              <div>
                <p className="font-medium text-ink">{item.productName}</p>
                <p className="mt-1 text-sm text-zinc-600">{item.variantLabel}</p>
                <p className="mt-1 text-sm text-zinc-500">
                  {item.quantity} x {formatPrice(item.priceEffective)} efectivo
                </p>
              </div>
              <div className="text-right text-sm">
                <p className="font-medium text-ink">
                  {formatPrice(item.quantity * item.priceEffective)}
                </p>
                <p className="mt-1 text-zinc-500">
                  {formatPrice(item.quantity * item.priceTransfer)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-3 border-t border-zinc-200 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-500">Total efectivo</span>
            <span className="text-xl font-semibold text-ink">
              {formatPrice(totals.effective)}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm text-zinc-600">
            <span>Total transferencia</span>
            <span>{formatPrice(totals.transfer)}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-zinc-600">
            <span>Total lista</span>
            <span>{formatPrice(totals.list)}</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
