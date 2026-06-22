import type { CartItem } from "@/lib/types";
import { formatPrice, getPriceTotals } from "@/lib/utils";

const WHATSAPP_NUMBER = "5491139545945";

type CouponInfo = {
  code: string;
  discountAmount: number;
};

export function buildWhatsAppMessage(items: CartItem[], coupon?: CouponInfo, clientName?: string) {
  const lines = items.map(
    (item) =>
      `- ${item.productName} (${item.variantLabel}) x${item.quantity}`
  );
  const totals = getPriceTotals(items);
  const effectiveTotal = coupon
    ? Math.max(0, totals.effective - coupon.discountAmount)
    : totals.effective;

  return [
    `Hola${clientName ? `, soy ${clientName}` : ""}, quiero confirmar este pedido de Fase-Beta.`,
    "",
    ...lines,
    "",
    ...(coupon ? [
      `Total efectivo: ${formatPrice(totals.effective)}`,
      `Cupón ${coupon.code}: -${formatPrice(coupon.discountAmount)}`,
      `Total con descuento: ${formatPrice(effectiveTotal)}`,
    ] : [
      `Total efectivo: ${formatPrice(totals.effective)}`,
    ]),
    `Total transferencia: ${formatPrice(totals.transfer)}`,
  ].join("\n");
}

export function buildWhatsAppHref(items: CartItem[], coupon?: CouponInfo, clientName?: string) {
  const message = buildWhatsAppMessage(items, coupon, clientName);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
