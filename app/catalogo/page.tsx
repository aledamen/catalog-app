import { ProductCatalog } from "@/components/product-catalog";
import { getProducts } from "@/lib/products";
import { getSiteConfig } from "@/lib/site-config";
import { trackView } from "@/lib/track";

export const metadata = {
  title: "Catalogo"
};

export default async function CatalogPage() {
  await trackView('/catalogo')
  const [products, config] = await Promise.all([getProducts(), getSiteConfig()])

  return (
    <div className="pb-16">
      <div className="border-b border-line bg-gradient-to-br from-accent/[0.06] via-white to-white">
        <div className="container-shell py-10 sm:py-12">
          {config.hero_overline && (
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-deep">
              {config.hero_overline}
            </p>
          )}
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {config.hero_title}
          </h1>
          {config.hero_subtitle && (
            <p className="mt-2 max-w-lg text-sm text-zinc-500">
              {config.hero_subtitle}
            </p>
          )}
        </div>
      </div>

      <section className="container-shell pt-10">
        <ProductCatalog products={products} />
      </section>
    </div>
  );
}
