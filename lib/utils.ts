import type { ProductVariant } from "@/lib/types";

export function formatPrice(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0
  }).format(value);
}

export function getVariantLabel(variant: ProductVariant) {
  return [variant.flavor, variant.color].filter(Boolean).join(" · ");
}

export function getPriceTotals(items: Array<{
  quantity: number;
  priceEffective: number;
  priceTransfer: number;
  priceList: number;
}>) {
  return items.reduce(
    (acc, item) => ({
      effective: acc.effective + item.priceEffective * item.quantity,
      transfer: acc.transfer + item.priceTransfer * item.quantity,
      list: acc.list + item.priceList * item.quantity
    }),
    { effective: 0, transfer: 0, list: 0 }
  );
}
