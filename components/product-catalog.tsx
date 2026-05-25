"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/types";

type SortOption = "popular" | "price-asc" | "price-desc" | "name-asc" | "name-desc";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "popular", label: "Más vendidos" },
  { value: "price-asc", label: "Menor precio" },
  { value: "price-desc", label: "Mayor precio" },
  { value: "name-asc", label: "Nombre A-Z" },
  { value: "name-desc", label: "Nombre Z-A" },
];

function minPrice(product: Product): number {
  const inStock = product.variants.filter(v => v.stock > 0);
  const pool = inStock.length > 0 ? inStock : product.variants;
  return Math.min(...pool.map(v => v.priceEffective));
}

function hasStock(product: Product): boolean {
  return product.variants.some(v => v.stock > 0);
}

function sortProducts(products: Product[], sort: SortOption): Product[] {
  return [...products].sort((a, b) => {
    const aStock = hasStock(a);
    const bStock = hasStock(b);
    if (aStock && !bStock) return -1;
    if (!aStock && bStock) return 1;

    switch (sort) {
      case "popular":    return b.salesCount - a.salesCount;
      case "price-asc":  return minPrice(a) - minPrice(b);
      case "price-desc": return minPrice(b) - minPrice(a);
      case "name-asc":   return a.name.localeCompare(b.name, "es");
      case "name-desc":  return b.name.localeCompare(a.name, "es");
    }
  });
}

type ProductCatalogProps = {
  products: Product[];
};

export function ProductCatalog({ products }: ProductCatalogProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [sort, setSort] = useState<SortOption>("popular");

  const categories = useMemo(
    () => ["Todos", ...new Set(products.map((product) => product.category))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    const q = query.toLowerCase().trim();
    const filtered = products.filter((product) => {
      if (!product.visible) return false;
      const matchesCategory =
        selectedCategory === "Todos" || product.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!q) return true;
      const haystack = [
        product.name,
        product.brand,
        ...product.variants.map((variant) =>
          [variant.flavor, variant.size, variant.color, variant.sku]
            .filter(Boolean)
            .join(" ")
        ),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });

    return sortProducts(filtered, sort);
  }, [products, query, selectedCategory, sort]);

  return (
    <div className="space-y-6" id="productos">
      {/* Search + sort row */}
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
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

        <div className="panel p-4 flex flex-col justify-between gap-2 sm:min-w-[200px]">
          <label className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">
            Ordenar por
          </label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="h-12 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/10"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category filters */}
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
