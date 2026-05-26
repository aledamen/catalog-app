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
  return (
    <div>
      <label
        className="mb-2 block text-xs uppercase tracking-[0.24em] text-zinc-500"
        htmlFor={`variant-${selectedSku}`}
      >
        Variante
      </label>
      <select
        id={`variant-${selectedSku}`}
        className="h-12 w-full rounded-lg border border-zinc-200 bg-white px-4 text-sm outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/10"
        value={selectedSku}
        onChange={(event) => setSelectedSku(event.target.value)}
      >
        {variants.map((variant) => (
          <option key={variant.sku} value={variant.sku}>
            {getVariantLabel(variant) || 'Sin sabor'}{variant.stock === 0 ? ' (sin stock)' : ''}
          </option>
        ))}
      </select>
    </div>
  );
}
