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
};

export function ProductCard({ product }: ProductCardProps) {
  const [selectedSku, setSelectedSku] = useState(product.variants[0]?.sku ?? "");
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
      <div className="relative aspect-[5/4] border-b border-zinc-200 bg-mist">
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
          <div className="absolute inset-0 flex items-center justify-center bg-white/60">
            <span className="bg-zinc-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
              Sin Stock
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="section-label">{product.brand}</p>
            <h2 className="mt-2 text-xl font-bold tracking-tight text-ink">{product.name}</h2>
            <p className="mt-1 text-sm text-zinc-500">{product.category}</p>
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
              <div className="flex h-12 w-full items-center rounded-lg border border-zinc-200 bg-zinc-50 px-4 text-sm text-zinc-400">
                {variantLabel || "Sin sabor"}
              </div>
            </div>
          )}
        </div>

        <div className="mt-5 grid gap-3 border-t border-zinc-200 pt-4 text-sm text-zinc-600 sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">SKU</p>
            <p className="mt-2 font-medium text-ink">{selectedVariant.sku}</p>
          </div>
          {variantLabel && (
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
                Variante
              </p>
              <p className="mt-2 font-medium text-ink">{variantLabel}</p>
            </div>
          )}
        </div>

        <div className="mt-5 space-y-3 rounded-xl border border-accent/20 bg-accent/5 p-4 text-sm">
          <div className="flex items-center justify-between gap-4">
            <span className="text-zinc-500">Efectivo</span>
            <span className="font-bold text-accent-deep">
              {formatPrice(selectedVariant.priceEffective)}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-zinc-500">Transferencia</span>
            <span className="font-medium text-ink">
              {formatPrice(selectedVariant.priceTransfer)}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-zinc-500">Lista</span>
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
