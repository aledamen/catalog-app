"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/button";
import { VariantSelector } from "@/components/variant-selector";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice, getVariantLabel } from "@/lib/utils";
import type { CuratedPick } from "@/lib/curated-picks";

type CuratedPickCardProps = {
  pick: CuratedPick;
};

export function CuratedPickCard({ pick }: CuratedPickCardProps) {
  const { product } = pick;
  const defaultVariant = product.variants.find((v) => v.stock > 0) ?? product.variants[0];
  const [selectedSku, setSelectedSku] = useState(defaultVariant?.sku ?? "");
  const addItem = useCartStore((state) => state.addItem);
  const cartItems = useCartStore((state) => state.items);

  const selectedVariant = useMemo(
    () =>
      product.variants.find((variant) => variant.sku === selectedSku) ??
      product.variants[0],
    [product.variants, selectedSku]
  );

  if (!selectedVariant) {
    return null;
  }

  const image = selectedVariant.image || product.image;
  const variantLabel = getVariantLabel(selectedVariant);
  const cartQty = cartItems.find((i) => i.sku === selectedVariant.sku)?.quantity ?? 0;
  const atMaxStock = selectedVariant.stock > 0 && cartQty >= selectedVariant.stock;
  const soldOut = product.availableStock === 0 || selectedVariant.stock === 0;

  return (
    <article className="flex h-full flex-col gap-3 rounded-2xl border border-accent/20 bg-accent/5 p-6 dark:border-accent/30 dark:bg-accent/10">
      <h2 className="text-lg font-bold leading-tight tracking-tight text-ink dark:text-white">
        {pick.headline}
      </h2>
      {pick.subheadline && (
        <p className="-mt-2 text-sm font-medium text-accent-deep">{pick.subheadline}</p>
      )}
      <p className="line-clamp-3 min-h-[4.3rem] text-sm leading-relaxed text-zinc-500 dark:text-slate-400">
        {pick.description}
      </p>
      <p className="text-xs uppercase tracking-[0.18em] text-zinc-400 dark:text-slate-500">
        {product.name}
      </p>

      <div className="mt-2 flex-1">
        {product.variants.length > 1 ? (
          <VariantSelector
            selectedSku={selectedSku}
            setSelectedSku={setSelectedSku}
            variants={product.variants}
          />
        ) : (
          <div>
            <p className="mb-2 block text-xs uppercase tracking-[0.24em] text-zinc-500 dark:text-slate-400">
              Variante
            </p>
            <div className="flex h-12 w-full items-center rounded-lg border border-zinc-200 bg-zinc-50 px-4 text-sm text-zinc-400 dark:border-dk-border dark:bg-dk-elevated dark:text-slate-400">
              {variantLabel || "Sin sabor"}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-xl font-extrabold tracking-tight text-ink dark:text-white">
          {formatPrice(selectedVariant.priceEffective)}
        </span>
        <span className="text-xs text-zinc-500 dark:text-slate-400">efectivo</span>
      </div>

      <Button
        className="w-full"
        onClick={() =>
          addItem({
            productId: product.id,
            productName: product.name,
            brand: product.brand,
            category: product.category,
            sku: selectedVariant.sku,
            variantLabel,
            priceEffective: selectedVariant.priceEffective,
            priceTransfer: selectedVariant.priceTransfer,
            priceList: selectedVariant.priceList,
            stock: selectedVariant.stock,
            image: image || "/products/placeholder.svg",
          })
        }
        variant="secondary"
        disabled={soldOut || atMaxStock}
      >
        {soldOut ? "Sin Stock" : atMaxStock ? "Máximo en carrito" : "Agregar al carrito"}
      </Button>
    </article>
  );
}
