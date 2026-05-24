import type { CartItem } from "@/lib/types";
import { formatPrice, getPriceTotals } from "@/lib/utils";

const WHATSAPP_NUMBER = "5491139545945";

export function buildWhatsAppMessage(items: CartItem[]) {
  const lines = items.map(
    (item) =>
      `- ${item.productName} (${item.variantLabel}) x${item.quantity}`
  );
  const totals = getPriceTotals(items);

  return [
    "Hola, quiero confirmar este pedido de Fase-Beta.",
    "",
    ...lines,
    "",
    `Total efectivo: ${formatPrice(totals.effective)}`,
    `Total transferencia: ${formatPrice(totals.transfer)}`,
    `Total lista: ${formatPrice(totals.list)}`
  ].join("\n");
}

export function buildWhatsAppHref(items: CartItem[]) {
  const message = buildWhatsAppMessage(items);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
