import type { CartItem } from "@/lib/types";
import { formatPrice, getPriceTotals } from "@/lib/utils";

const WHATSAPP_NUMBER = "5491139545945";

type CouponInfo = {
  code: string;
  discountAmount: number;
  influencerHandle?: string | null;
  influencerName?: string | null;
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
  const transferTotal = coupon && totals.effective > 0
    ? Math.max(0, Math.round(totals.transfer * effectiveTotal / totals.effective))
    : totals.transfer;

  const couponLine = coupon
    ? (coupon.influencerHandle || coupon.influencerName)
      ? `Cupón ${coupon.code} · @${coupon.influencerHandle ?? coupon.influencerName}`
      : `Cupón ${coupon.code}`
    : null;

  return [
    `Hola${clientName ? `, soy ${clientName}` : ""}, quiero confirmar este pedido de Fase-Beta.`,
    "",
    ...lines,
    "",
    `Total efectivo: ${formatPrice(effectiveTotal)}`,
    `Total transferencia: ${formatPrice(transferTotal)}`,
    ...(couponLine ? [couponLine] : []),
  ].join("\n");
}

export function buildWhatsAppHref(items: CartItem[], coupon?: CouponInfo, clientName?: string) {
  const message = buildWhatsAppMessage(items, coupon, clientName);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
