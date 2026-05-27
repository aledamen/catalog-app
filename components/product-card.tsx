"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Button } from "@/components/button";
import { VariantSelector } from "@/components/variant-selector";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice, getVariantLabel } from "@/lib/utils";
import type { Product } from "@/lib/types";

type ProductCardProps = {
  product: Product;
  urgencyEnabled?: boolean;
  urgencyThreshold?: number;
};

export function ProductCard({ product, urgencyEnabled, urgencyThreshold = 5 }: ProductCardProps) {
  const defaultVariant = product.variants.find(v => v.stock > 0) ?? product.variants[0];
  const [selectedSku, setSelectedSku] = useState(defaultVariant?.sku ?? "");
  const addItem = useCartStore((state) => state.addItem);

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

  return (
    <article className="panel flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-panel-hover hover:-translate-y-0.5">
      <div className="relative aspect-[5/4] border-b border-zinc-200 bg-mist dark:border-dk-border dark:bg-dk-elevated">
{product.badge && (
          <span className={`absolute ${(product.bannerPosition === 'top' || product.bannerPosition === 'diagonal-tl') && product.bannerName ? 'top-9' : 'top-3'} left-3 z-20 rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-white`}>
            {product.badge}
          </span>
        )}
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
        {selectedVariant.stock === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60 dark:bg-dk-base/70">
            <span className="bg-zinc-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
              Sin Stock
            </span>
          </div>
        )}
        {urgencyEnabled && selectedVariant.stock > 0 && selectedVariant.stock <= urgencyThreshold && (
          <div className="absolute bottom-3 right-3 z-10 rounded-full bg-orange-500 px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
            ¡{selectedVariant.stock === 1 ? 'Queda' : 'Quedan'} {selectedVariant.stock}!
          </div>
        )}
        {product.bannerName && (() => {
          const pos = product.bannerPosition ?? 'bottom'
          const bg = product.bannerColor ?? '#EF4444'
          const tc = product.bannerTextColor ?? '#FFFFFF'
          const name = product.bannerName

          if (pos === 'top' || pos === 'bottom') {
            return (
              <div
                className={`absolute left-0 right-0 py-1.5 text-center text-xs font-bold uppercase tracking-widest z-10 ${pos === 'top' ? 'top-0' : 'bottom-0'}`}
                style={{ backgroundColor: bg, color: tc }}
              >
                {name}
              </div>
            )
          }
          if (pos === 'diagonal-tl') {
            return (
              <div className="absolute top-4 left-0 z-10 overflow-hidden w-24 h-24 pointer-events-none">
                <div
                  className="absolute top-5 -left-6 w-28 text-center text-xs font-bold uppercase py-1 -rotate-45"
                  style={{ backgroundColor: bg, color: tc }}
                >
                  {name}
                </div>
              </div>
            )
          }
          if (pos === 'diagonal-tr') {
            return (
              <div className="absolute top-4 right-0 z-10 overflow-hidden w-24 h-24 pointer-events-none">
                <div
                  className="absolute top-5 -right-6 w-28 text-center text-xs font-bold uppercase py-1 rotate-45"
                  style={{ backgroundColor: bg, color: tc }}
                >
                  {name}
                </div>
              </div>
            )
          }
          return null
        })()}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="w-full">
            <p className="section-label">{product.brand}</p>
            <h2 className="mt-2 text-xl font-bold tracking-tight text-ink line-clamp-2 min-h-[3.5rem] dark:text-white">{product.name}</h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-slate-400">{product.category}</p>
            <p className="mt-2 text-sm text-zinc-500 line-clamp-2 min-h-[2.5rem] dark:text-slate-400">
              {product.description ?? ''}
            </p>
          </div>
        </div>

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

        <div className="mt-5 space-y-3 rounded-xl border border-accent/20 bg-accent/5 p-4 text-sm dark:bg-accent/10 dark:border-accent/30">
          {selectedVariant.promoPrice ? (
            <div className="flex items-center justify-between gap-4">
              <span className="text-zinc-500">
                Efectivo{selectedVariant.promoLabel ? ` — ${selectedVariant.promoLabel}` : ''}
              </span>
              <div className="text-right">
                <span className="text-xs line-through text-zinc-400 mr-2">
                  {formatPrice(selectedVariant.priceEffective)}
                </span>
                <span className="font-bold text-red-600">
                  {formatPrice(selectedVariant.promoPrice)}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-4">
              <span className="text-zinc-500 dark:text-slate-400">Efectivo</span>
              <span className="font-bold text-accent-deep">
                {formatPrice(selectedVariant.priceEffective)}
              </span>
            </div>
          )}
          <div className="flex items-center justify-between gap-4">
            <span className="text-zinc-500 dark:text-slate-400">Transferencia</span>
            <span className="font-medium text-ink">
              {formatPrice(selectedVariant.priceTransfer)}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-zinc-500 dark:text-slate-400">Lista</span>
            <span className="font-medium text-ink">
              {formatPrice(selectedVariant.priceList)}
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
              image: image || "/products/placeholder.svg"
            })
          }
          variant="secondary"
          disabled={selectedVariant.stock === 0}
        >
          {selectedVariant.stock === 0 ? "Sin Stock" : "Agregar al carrito"}
        </Button>
      </div>
    </article>
  );
}
