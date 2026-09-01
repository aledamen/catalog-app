import { CuratedPicks } from "@/components/curated-picks";
import { ProductCatalog } from "@/components/product-catalog";
import { ProductCard } from "@/components/product-card";
import { getCuratedPicks } from "@/lib/curated-picks";
import { getProducts } from "@/lib/products";
import { getSiteConfig } from "@/lib/site-config";
import { trackView } from "@/lib/track";
import { buildQuestionHref } from "@/lib/whatsapp";

export const metadata = {
  title: "Catalogo"
};

export default async function CatalogPage() {
  await trackView('/catalogo')
  const [products, config, curatedPicks] = await Promise.all([
    getProducts(),
    getSiteConfig(),
    getCuratedPicks(),
  ])

  const urgencyEnabled = config.stock_urgency_enabled === 'true'
  const urgencyThreshold = Number(config.stock_urgency_threshold) || 5
  const featuredEnabled = config.featured_section_enabled === 'true'
  const featuredProducts = products.filter(p => p.featured && p.visible)
  const curatedPicksWhatsappHref = buildQuestionHref(
    config.whatsapp_number,
    "Hola! Estoy mirando el catálogo y no sé bien qué combo me conviene, ¿me ayudan a elegir?"
  )

  return (
    <div className="pb-16">
      <div className="border-b border-line bg-gradient-to-br from-accent/[0.06] via-white to-white dark:border-dk-border dark:from-accent/[0.08] dark:via-dk-base dark:to-dk-base">
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

      <CuratedPicks
        picks={curatedPicks}
        eyebrow={config.curated_picks_eyebrow}
        eyebrowColor={config.curated_picks_eyebrow_color}
        title={config.curated_picks_title}
        titleColor={config.curated_picks_title_color}
        subtitle={config.curated_picks_subtitle}
        subtitleColor={config.curated_picks_subtitle_color}
        whatsappHref={curatedPicksWhatsappHref}
      />

      {featuredEnabled && featuredProducts.length > 0 && (
        <section className="container-shell pt-10">
          <h2 className="mb-5 text-xl font-bold tracking-tight text-ink">
            {config.featured_section_title}
          </h2>
          <div className="-mx-4 flex gap-5 overflow-x-auto px-4 pb-4 sm:mx-0 sm:px-0 snap-x snap-mandatory">
            {featuredProducts.map(p => (
              <div key={p.id} className="w-72 shrink-0 snap-start">
                <ProductCard product={p} urgencyEnabled={urgencyEnabled} urgencyThreshold={urgencyThreshold} />
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="container-shell pt-10">
        <ProductCatalog products={products} urgencyEnabled={urgencyEnabled} urgencyThreshold={urgencyThreshold} />
      </section>
    </div>
  );
}
