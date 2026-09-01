import { CuratedPickCard } from "@/components/curated-pick-card";
import type { CuratedPick } from "@/lib/curated-picks";

type CuratedPicksProps = {
  picks: CuratedPick[];
  eyebrow: string;
  eyebrowColor: string;
  title: string;
  titleColor: string;
  subtitle: string;
  subtitleColor: string;
  whatsappHref: string;
};

export function CuratedPicks({
  picks,
  eyebrow,
  eyebrowColor,
  title,
  titleColor,
  subtitle,
  subtitleColor,
  whatsappHref,
}: CuratedPicksProps) {
  if (picks.length === 0) {
    return null;
  }

  return (
    <section className="container-shell pt-10">
      <div className="panel overflow-hidden">
        <div className="px-6 py-6 sm:px-8">
          {eyebrow && (
            <p className="section-label" style={{ color: eyebrowColor }}>
              {eyebrow}
            </p>
          )}
          <h2 className="mt-2 text-xl font-bold tracking-tight" style={{ color: titleColor }}>
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1 text-sm" style={{ color: subtitleColor }}>
              {subtitle}
            </p>
          )}
          <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {picks.map((pick) => (
              <CuratedPickCard key={pick.product.id} pick={pick} />
            ))}
          </div>
        </div>
        {whatsappHref && (
          <div className="flex flex-wrap items-center gap-2 border-t border-line bg-mist/60 px-6 py-4 dark:border-[#2D3A5C] dark:bg-[#232B42]/40 sm:px-8">
            <p className="text-sm text-zinc-500 dark:text-slate-400">¿Ninguno te cierra?</p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-accent-deep hover:underline"
            >
              Preguntanos por WhatsApp &rarr;
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
