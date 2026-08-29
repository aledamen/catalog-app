import type { Product } from "@/lib/types";
import { mapApiProduct, type ApiProduct } from "@/lib/products";

const INVENTORY_API = process.env.NEXT_PUBLIC_INVENTORY_API_URL ?? "http://localhost:3000";

type ApiCuratedPick = {
  position: number;
  headline: string;
  description: string | null;
  product: ApiProduct;
};

export type CuratedPick = {
  position: number;
  headline: string;
  description: string | null;
  product: Product;
};

export async function getCuratedPicks(): Promise<CuratedPick[]> {
  try {
    const res = await fetch(`${INVENTORY_API}/api/curated-picks`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("curated picks fetch failed");

    const data: ApiCuratedPick[] = await res.json();

    return data.map((pick) => ({
      position: pick.position,
      headline: pick.headline,
      description: pick.description,
      product: mapApiProduct(pick.product),
    }));
  } catch {
    return [];
  }
}
