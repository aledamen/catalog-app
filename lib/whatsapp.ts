import type { CartItem } from "@/lib/types";
import { formatPrice, getPriceTotals } from "@/lib/utils";

type CouponInfo = {
  code: string;
  discountAmount: number;
  influencerHandle?: string | null;
  influencerName?: string | null;
};

function normalizeWhatsAppNumber(whatsappNumber: string | null) {
  return (whatsappNumber ?? "").replace(/\D/g, "");
}

export function hasWhatsAppNumber(whatsappNumber: string | null) {
  return normalizeWhatsAppNumber(whatsappNumber).length > 0;
}

function itemLines(items: CartItem[]) {
  return items.map(
    (item) =>
      `- ${item.productName} (${item.variantLabel}) x${item.quantity}`
  );
}

export function buildWhatsAppMessage(items: CartItem[], coupon?: CouponInfo, clientName?: string) {
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
    ...itemLines(items),
    "",
    `Total efectivo: ${formatPrice(effectiveTotal)}`,
    `Total transferencia: ${formatPrice(transferTotal)}`,
    ...(couponLine ? [couponLine] : []),
  ].join("\n");
}

export function buildWhatsAppHref(
  items: CartItem[],
  whatsappNumber: string | null,
  coupon?: CouponInfo,
  clientName?: string
) {
  const digits = normalizeWhatsAppNumber(whatsappNumber);
  if (!digits) return "";

  const message = buildWhatsAppMessage(items, coupon, clientName);
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function buildQuestionHref(whatsappNumber: string | null, message: string) {
  const digits = normalizeWhatsAppNumber(whatsappNumber);
  if (!digits) return "";

  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function buildDudaHref(items: CartItem[], whatsappNumber: string | null) {
  const digits = normalizeWhatsAppNumber(whatsappNumber);
  if (!digits) return "";

  const message = items.length
    ? [
        "Hola, tengo una duda sobre el pedido que armé.",
        "",
        ...itemLines(items),
      ].join("\n")
    : "Hola, tengo una duda.";

  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
