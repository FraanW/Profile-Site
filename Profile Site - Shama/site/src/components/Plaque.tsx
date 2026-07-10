/**
 * The art-book caption (blueprint §6.1, tokens.md §2.4): `fig. NN · name` in
 * lowercase Plex Mono at the plaque step, violet-ink, with an optional
 * single Sentient support line. Used beneath constellation stars, on star
 * cards, and anywhere a figure needs naming.
 *
 * Separator ruled `·` on 2026-07-11 (blueprint §6.1): the em dash this
 * format originally specified collides with the repo-wide em dash ban on
 * visitor-facing copy; the writing law wins. Centralized here so any future
 * ruling stays a one-character fix.
 */
export const FIG_SEPARATOR = " · ";

export function figCaption(fig: string, name: string): string {
  return `fig. ${fig}${FIG_SEPARATOR}${name.toLowerCase()}`;
}

/**
 * Both inks hold their checks on both grounds (violet-ink 5.51 night / 5.09
 * card — the binding checks of tokens.md §1.2; moon 17.04 / 15.75), so one
 * Plaque serves the night ground and card surfaces alike.
 */
export function Plaque({
  fig,
  name,
  support,
  className = "",
}: {
  fig: string;
  name: string;
  /** The one Sentient line under the caption. */
  support?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="font-mono text-plaque text-violet-ink">{figCaption(fig, name)}</p>
      {support ? <p className="mt-1 text-body-sm text-moon">{support}</p> : null}
    </div>
  );
}
