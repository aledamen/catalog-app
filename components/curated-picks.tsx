import { CuratedPickCard } from "@/components/curated-pick-card";
import type { CuratedPick } from "@/lib/curated-picks";

type CuratedPicksProps = {
  picks: CuratedPick[];
};

export function CuratedPicks({ picks }: CuratedPicksProps) {
  if (picks.length === 0) {
    return null;
  }

  return (
    <section className="container-shell pt-10">
      <h2 className="text-xl font-bold tracking-tight text-ink">Empezá por acá</h2>
      <p className="mt-1 text-sm text-zinc-500 dark:text-slate-400">
        Combos armados para arrancar sin vueltas.
      </p>
      <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {picks.map((pick) => (
          <CuratedPickCard key={pick.product.id} pick={pick} />
        ))}
      </div>
    </section>
  );
}
