"use client";

import Image from "next/image";
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
    <article className="panel flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-panel-hover hover:-translate-y-0.5">
      <div className="relative aspect-[5/4] border-b border-zinc-200 bg-mist dark:border-dk-border dark:bg-dk-elevated">
        {image ? (
          <Image
            src={image}
            alt={`${product.name} ${variantLabel}`}
            fill
            className="object-contain p-6"
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 40vw, 100vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-ink">
            <span className="text-xs uppercase tracking-[0.24em] text-white/70">
              Sin imagen
            </span>
          </div>
        )}
        {soldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60 dark:bg-dk-base/70">
            <span className="bg-zinc-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
              Sin Stock
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="section-label">{pick.headline}</p>
        <h2 className="mt-2 text-xl font-bold tracking-tight text-ink line-clamp-2 dark:text-white">
          {product.name}
        </h2>
        {pick.description && (
          <p className="mt-2 text-sm text-zinc-500 line-clamp-2 dark:text-slate-400">
            {pick.description}
          </p>
        )}

        <div className="mt-5">
          {product.variants.length > 1 ? (
            <VariantSelector
              selectedSku={selectedSku}
              setSelectedSku={setSelectedSku}
              variants={product.variants}
            />
          ) : (
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.24em] text-zinc-500">Variante</p>
              <div className="flex h-12 w-full items-center rounded-lg border border-zinc-200 bg-zinc-50 px-4 text-sm text-zinc-400 dark:border-dk-border dark:bg-dk-elevated dark:text-slate-400">
                {variantLabel || "Sin sabor"}
              </div>
            </div>
          )}
        </div>

        <div className="mt-5 rounded-xl border border-accent/20 bg-accent/5 p-4 text-sm dark:bg-accent/10 dark:border-accent/30">
          <div className="flex items-center justify-between gap-4">
            <span className="text-zinc-500 dark:text-slate-400 font-medium">Efectivo</span>
            <span className="text-lg font-bold text-accent-deep">
              {formatPrice(selectedVariant.priceEffective)}
            </span>
          </div>
        </div>

        <Button
          className="mt-6 w-full"
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
      </div>
    </article>
  );
}
