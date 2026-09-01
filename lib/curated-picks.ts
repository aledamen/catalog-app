import type { Product } from "@/lib/types";
import { mapApiProduct, type ApiProduct } from "@/lib/products";

const INVENTORY_API = process.env.NEXT_PUBLIC_INVENTORY_API_URL ?? "http://localhost:3000";

type ApiCuratedPick = {
  position: number;
  headline: string;
  subheadline: string | null;
  description: string | null;
  product: ApiProduct;
};

export type CuratedPick = {
  position: number;
  headline: string;
  subheadline: string | null;
  description: string | null;
  product: Product;
};

export async function getCuratedPicks(): Promise<CuratedPick[]> {
  try {
    const res = await fetch(`${INVENTORY_API}/api/curated-picks`, {
      cache: "no-store",
    });
    if (!res.ok) {
      console.error(`[getCuratedPicks] fetch to ${INVENTORY_API}/api/curated-picks failed: ${res.status} ${res.statusText}`);
      return [];
    }

    const data: ApiCuratedPick[] = await res.json();
    console.error(`[getCuratedPicks] fetched ${data.length} picks from ${INVENTORY_API}/api/curated-picks`);

    return data.map((pick) => ({
      position: pick.position,
      headline: pick.headline,
      subheadline: pick.subheadline,
      description: pick.description,
      product: mapApiProduct(pick.product),
    }));
  } catch (err) {
    console.error(`[getCuratedPicks] threw while fetching ${INVENTORY_API}/api/curated-picks:`, err);
    return [];
  }
}
