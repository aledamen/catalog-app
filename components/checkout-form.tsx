"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/button";
import { useCartHydrated, useCartStore } from "@/lib/cart-store";
import { buildWhatsAppHref } from "@/lib/whatsapp";
import { formatPrice } from "@/lib/utils";

const INVENTORY_API = process.env.NEXT_PUBLIC_INVENTORY_API_URL ?? "http://localhost:3000";

type CouponResult = {
  couponId: number;
  discountType: string;
  discountValue: number;
  discountAmount: number;
  finalAmount: number;
};

export function CheckoutForm() {
  const hydrated = useCartHydrated();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const totals = useCartStore((state) => state.getTotals());

  const [clientName, setClientName] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [coupon, setCoupon] = useState<CouponResult | null>(null);
  const [couponError, setCouponError] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);

  const discountedEffective = coupon
    ? Math.max(0, totals.effective - coupon.discountAmount)
    : totals.effective;

  const whatsappHref = useMemo(() => {
    if (!items.length) return "";
    return buildWhatsAppHref(items, coupon ? { code: couponCode, discountAmount: coupon.discountAmount } : undefined, clientName || undefined);
  }, [items, coupon, couponCode, clientName]);

  async function handleApplyCoupon() {
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    setCouponError("");
    try {
      const res = await fetch(`${INVENTORY_API}/api/coupons/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode.trim(), amount: totals.effective }),
      });
      const data = await res.json();
      if (!data.valid) {
        setCouponError(data.error ?? "Cupón inválido");
        setCoupon(null);
      } else {
        setCoupon(data);
        setCouponError("");
      }
    } catch {
      setCouponError("Error al validar el cupón");
    } finally {
      setCouponLoading(false);
    }
  }

  function handleRemoveCoupon() {
    setCoupon(null);
    setCouponCode("");
    setCouponError("");
  }

  async function handleSubmit() {
    if (!whatsappHref) return;

    if (coupon) {
      try {
        await fetch(`${INVENTORY_API}/api/coupons/use`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            couponId: coupon.couponId,
            source: "catalog",
            originalAmount: totals.effective,
            discountApplied: coupon.discountAmount,
            finalAmount: discountedEffective,
            clientName: clientName || undefined,
          }),
        });
      } catch {
        // Non-blocking — don't prevent the order
      }
    }

    window.open(whatsappHref, "_blank", "noopener,noreferrer");
  }

  if (!hydrated) {
    return (
      <div className="panel px-6 py-12 text-center text-sm text-zinc-500 dark:text-slate-400">
        Cargando checkout...
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="panel p-8">
        <p className="section-label">Checkout</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink dark:text-white">
          Necesitás sumar productos antes de enviar un pedido.
        </h1>
        <p className="mt-4 max-w-xl text-zinc-600 dark:text-slate-300">
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
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink dark:text-white">
          Confirmá el pedido y envialo directo por WhatsApp.
        </h1>
        <p className="mt-4 max-w-xl text-zinc-600 dark:text-slate-300">
          El mensaje se arma automáticamente con todos los productos guardados
          en el carrito, sus cantidades y el total final.
        </p>

        {/* Nombre */}
        <div className="mt-6">
          <label className="block text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500 dark:text-slate-400 mb-2">
            Tu nombre (opcional)
          </label>
          <input
            type="text"
            value={clientName}
            onChange={e => setClientName(e.target.value)}
            placeholder="¿Cómo te llamás?"
            className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-accent/40 dark:border-dk-border dark:bg-dk-elevated dark:text-white dark:placeholder:text-slate-500"
          />
        </div>

        {/* Cupón */}
        <div className="mt-4">
          <label className="block text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500 dark:text-slate-400 mb-2">
            Cupón de descuento
          </label>
          {coupon ? (
            <div className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 px-4 py-2.5 text-sm dark:border-green-800 dark:bg-green-950/30">
              <span className="font-mono font-semibold text-green-700 dark:text-green-400">
                {couponCode.toUpperCase()}
                <span className="ml-2 font-normal">
                  — {coupon.discountType === "percentage"
                    ? `${coupon.discountValue}% off`
                    : `${formatPrice(coupon.discountAmount)} off`}
                </span>
              </span>
              <button
                type="button"
                onClick={handleRemoveCoupon}
                className="ml-4 text-xs text-zinc-500 hover:text-zinc-700 dark:text-slate-400"
              >
                Quitar
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={e => setCouponCode(e.target.value.toUpperCase())}
                placeholder="Código de cupón"
                onKeyDown={e => e.key === "Enter" && handleApplyCoupon()}
                className="flex-1 rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-mono uppercase tracking-wider text-ink placeholder:normal-case placeholder:tracking-normal placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-accent/40 dark:border-dk-border dark:bg-dk-elevated dark:text-white"
              />
              <button
                type="button"
                onClick={handleApplyCoupon}
                disabled={!couponCode.trim() || couponLoading}
                className="rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-ink transition hover:bg-zinc-50 disabled:opacity-50 dark:border-dk-border dark:bg-dk-elevated dark:text-white"
              >
                {couponLoading ? "..." : "Aplicar"}
              </button>
            </div>
          )}
          {couponError && (
            <p className="mt-1.5 text-xs text-red-500">{couponError}</p>
          )}
        </div>

        <div className="mt-8 rounded-xl border border-accent/20 bg-accent/5 p-5 dark:bg-accent/10 dark:border-accent/30">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-deep">
            Destino del pedido
          </p>
          <p className="mt-3 text-lg font-semibold text-ink dark:text-white">
            +54 9 11 3954-5945
          </p>
          <p className="mt-2 text-sm text-zinc-600 dark:text-slate-300">
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
              className="flex items-start justify-between gap-4 border-b border-zinc-100 pb-4 dark:border-dk-border"
              key={item.sku}
            >
              <div>
                <p className="font-medium text-ink dark:text-white">{item.productName}</p>
                <p className="mt-1 text-sm text-zinc-600 dark:text-slate-300">{item.variantLabel}</p>
                <p className="mt-1 text-sm text-zinc-500 dark:text-slate-400">
                  {item.quantity} x {formatPrice(item.priceEffective)} efectivo
                </p>
              </div>
              <div className="text-right text-sm">
                <p className="font-medium text-ink dark:text-white">
                  {formatPrice(item.quantity * item.priceEffective)}
                </p>
                <p className="mt-1 text-zinc-500 dark:text-slate-400">
                  {formatPrice(item.quantity * item.priceTransfer)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-3 border-t border-zinc-200 pt-4 dark:border-dk-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-500 dark:text-slate-400">Total efectivo</span>
            <span className={coupon ? "text-sm line-through text-zinc-400" : "text-xl font-semibold text-ink dark:text-white"}>
              {formatPrice(totals.effective)}
            </span>
          </div>
          {coupon && (
            <>
              <div className="flex items-center justify-between text-sm">
                <span className="text-green-600 dark:text-green-400">Descuento cupón</span>
                <span className="text-green-600 dark:text-green-400">−{formatPrice(coupon.discountAmount)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-ink dark:text-white">Total con descuento</span>
                <span className="text-xl font-bold text-accent-deep">{formatPrice(discountedEffective)}</span>
              </div>
            </>
          )}
          <div className="flex items-center justify-between text-sm text-zinc-600 dark:text-slate-300">
            <span>Total transferencia</span>
            <span>{formatPrice(totals.transfer)}</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
