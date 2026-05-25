import type { Product, ProductVariant } from "@/lib/types";

const INVENTORY_API = process.env.NEXT_PUBLIC_INVENTORY_API_URL ?? "http://localhost:3000";

type ApiVariant = {
  sku: string;
  flavor: string | null;
  stock: number;
  weightG: number | null;
  priceEffective: number | null;
  priceTransfer: number | null;
  priceList: number | null;
  image: string | null;
  promoPrice: number | null;
  promoLabel: string | null;
};

type ApiProduct = {
  id: string;
  name: string;
  brand: string | null;
  category: string | null;
  image: string | null;
  visible: boolean;
  salesCount: number;
  variants: ApiVariant[];
  description: string | null;
  badge: string | null;
  featured: boolean;
  bannerName: string | null;
  bannerColor: string | null;
  bannerTextColor: string | null;
  bannerPosition: string | null;
};

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${INVENTORY_API}/api/catalog`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Catalog API failed: ${res.status}`);

  const data: ApiProduct[] = await res.json();

  return data.map((p) => ({
    id: p.id,
    name: p.name,
    brand: p.brand ?? "",
    category: p.category ?? "",
    image: p.image ?? "",
    visible: p.visible,
    salesCount: p.salesCount ?? 0,
    ...(p.description ? { description: p.description } : {}),
    ...(p.badge ? { badge: p.badge } : {}),
    ...(p.featured ? { featured: p.featured } : {}),
    ...(p.bannerName ? { bannerName: p.bannerName } : {}),
    ...(p.bannerColor ? { bannerColor: p.bannerColor } : {}),
    ...(p.bannerTextColor ? { bannerTextColor: p.bannerTextColor } : {}),
    ...(p.bannerPosition ? { bannerPosition: p.bannerPosition } : {}),
    variants: p.variants.map((v): ProductVariant => ({
      sku: v.sku,
      stock: v.stock,
      priceEffective: v.priceEffective ?? 0,
      priceTransfer: v.priceTransfer ?? 0,
      priceList: v.priceList ?? 0,
      ...(v.image ? { image: v.image } : {}),
      ...(v.weightG ? { size: `${v.weightG}g` } : {}),
      ...(p.category === "Accesorios"
        ? { color: v.flavor ?? "" }
        : { flavor: v.flavor ?? "" }),
      ...(v.promoPrice ? { promoPrice: v.promoPrice } : {}),
      ...(v.promoLabel ? { promoLabel: v.promoLabel } : {}),
    })),
  }));
}
