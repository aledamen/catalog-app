import type { ProductVariant } from "@/lib/types";
import { getVariantLabel } from "@/lib/utils";

type VariantSelectorProps = {
  variants: ProductVariant[];
  selectedSku: string;
  setSelectedSku: (sku: string) => void;
};

export function VariantSelector({
  variants,
  selectedSku,
  setSelectedSku
}: VariantSelectorProps) {
  const stockedVariants = variants.filter(v => v.stock > 0);
  const displayVariants = stockedVariants.length > 0 ? stockedVariants : variants;

  return (
    <div>
      <label
        className="mb-2 block text-xs uppercase tracking-[0.24em] text-zinc-500 dark:text-slate-400"
        htmlFor={`variant-${selectedSku}`}
      >
        Variante
      </label>
      <select
        id={`variant-${selectedSku}`}
        className="h-12 w-full rounded-lg border border-zinc-200 bg-white px-4 text-sm outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/10 dark:border-dk-border dark:bg-dk-elevated dark:text-white"
        value={selectedSku}
        onChange={(event) => setSelectedSku(event.target.value)}
      >
        {displayVariants.map((variant) => (
          <option key={variant.sku} value={variant.sku}>
            {getVariantLabel(variant) || 'Sin sabor'}
          </option>
        ))}
      </select>
    </div>
  );
}
