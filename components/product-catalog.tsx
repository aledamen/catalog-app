"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/types";

type ProductCatalogProps = {
  products: Product[];
};

export function ProductCatalog({ products }: ProductCatalogProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const categories = useMemo(
    () => ["Todos", ...new Set(products.map((product) => product.category))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (!product.visible) return false;
      const matchesCategory =
        selectedCategory === "Todos" || product.category === selectedCategory;
      const haystack = [
        product.name,
        product.brand,
        ...product.variants.map((variant) =>
          [variant.flavor, variant.size, variant.color, variant.sku]
            .filter(Boolean)
            .join(" ")
        )
      ]
        .join(" ")
        .toLowerCase();

      return matchesCategory && haystack.includes(query.toLowerCase().trim());
    });
  }, [products, query, selectedCategory]);

  return (
    <div className="space-y-8" id="productos">
      <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="panel p-4">
          <label
            className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400"
            htmlFor="search"
          >
            Buscar
          </label>
          <input
            id="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Creatina, whey, shaker, sabor..."
            className="h-12 w-full rounded-lg border border-zinc-200 bg-mist px-4 text-sm outline-none transition-all focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const active = category === selectedCategory;

            return (
              <button
                className={`h-9 rounded-full border px-4 text-sm font-medium transition-all ${
                  active
                    ? "border-transparent bg-gradient-to-r from-accent to-accent-deep text-white shadow-md"
                    : "border-zinc-200 bg-white text-zinc-600 hover:border-accent/40 hover:bg-accent/5 hover:text-ink"
                }`}
                key={category}
                onClick={() => setSelectedCategory(category)}
                type="button"
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="panel px-6 py-10 text-center text-sm text-zinc-500">
          No encontramos productos con ese criterio.
        </div>
      ) : null}
    </div>
  );
}
