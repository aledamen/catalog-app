import { ProductCatalog } from "@/components/product-catalog";
import { getProducts } from "@/lib/products";

export const metadata = {
  title: "Catalogo"
};

export default async function CatalogPage() {
  const products = await getProducts();

  return (
    <div className="pb-16">
      <div className="border-b border-line bg-gradient-to-br from-accent/[0.06] via-white to-white">
        <div className="container-shell py-10 sm:py-12">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-deep">
            Catálogo completo
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Todo lo que necesitás.
          </h1>
          <p className="mt-2 max-w-lg text-sm text-zinc-500">
            Elegí los productos, armá tu carrito y enviá el pedido por WhatsApp en segundos.
          </p>
        </div>
      </div>

      <section className="container-shell pt-10">
        <ProductCatalog products={products} />
      </section>
    </div>
  );
}
