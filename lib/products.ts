import type { Product, ProductVariant } from "@/lib/types";

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1I2jiVxGU1ePyrYlWVZMTLhhjANtFoGQ52c9jRJuqsY8/export?format=csv";

function parseCSV(csv: string): Product[] {
  const lines = csv.trim().split("\n").slice(1);
  const groups = new Map<string, { meta: Omit<Product, "variants">; variants: ProductVariant[] }>();

  for (const line of lines) {
    if (!line.trim()) continue;
    const cols = line.split(",").map((c) => c.trim().replace(/\r$/, ""));
    const [id, imagen, sku, categoria, marca, nombre, sabor, stock, size, ef, tr, li, visible] = cols;

    const variant: ProductVariant = {
      sku,
      stock: parseInt(stock, 10),
      size,
      priceEffective: Math.round(parseFloat(ef)),
      priceTransfer: Math.round(parseFloat(tr)),
      priceList: Math.round(parseFloat(li)),
      image: imagen,
      ...(categoria === "Accesorios" ? { color: sabor } : { flavor: sabor }),
    };

    if (!groups.has(id)) {
      groups.set(id, {
        meta: { id, name: nombre, brand: marca, category: categoria, image: imagen, visible: visible === "si" },
        variants: [],
      });
    }
    groups.get(id)!.variants.push(variant);
  }

  return Array.from(groups.values()).map(({ meta, variants }) => ({
    ...meta,
    variants: variants.sort((a, b) => b.stock - a.stock),
  }));
}

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(SHEET_URL, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`Sheet fetch failed: ${res.status}`);
  return parseCSV(await res.text());
}
