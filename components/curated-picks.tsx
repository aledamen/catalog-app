import { CuratedPickCard } from "@/components/curated-pick-card";
import type { CuratedPick } from "@/lib/curated-picks";

type CuratedPicksProps = {
  picks: CuratedPick[];
  title: string;
  subtitle: string;
};

export function CuratedPicks({ picks, title, subtitle }: CuratedPicksProps) {
  if (picks.length === 0) {
    return null;
  }

  return (
    <section className="container-shell pt-10">
      <h2 className="text-xl font-bold tracking-tight text-ink">{title}</h2>
      {subtitle && (
        <p className="mt-1 text-sm text-zinc-500 dark:text-slate-400">
          {subtitle}
        </p>
      )}
      <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {picks.map((pick) => (
          <CuratedPickCard key={pick.product.id} pick={pick} />
        ))}
      </div>
    </section>
  );
}
