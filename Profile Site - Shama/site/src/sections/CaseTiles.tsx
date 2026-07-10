"use client";

import { animate, onScroll, stagger, utils } from "animejs";
import { useRef } from "react";
import { GlintLink } from "@/components/GlintLink";
import { Section } from "@/components/Section";
import {
  DURATION,
  REVEAL_RISE,
  STAGGER_STEP,
  easeVelvet,
  prefersReducedMotion,
  useIsomorphicLayoutEffect,
  type RevealMode,
} from "@/lib/motion";
import { caseTiles, tileProjects } from "@/content/copy";

export type CaseTilesVariant = "open" | "hairline" | "numbered";

/**
 * Case tiles (blueprint §5): four project slots in a minimal 2×2 at sm and
 * up, one column below (legibility beats layout fidelity, tokens.md §3.5).
 * Fraunces title in star-white, one Sentient line, one mono fragment, a
 * link into /projects. Staggered velvet entry, fires once.
 * Titles are real (intake-notes.md); which four appear is TODO(Mimir) — the
 * selection note under the heading says so on the page. Everything else is
 * PLACEHOLDER, pending Shama's intake.
 */
export function CaseTiles({
  variant = "open",
  mode = "scroll",
}: {
  variant?: CaseTilesVariant;
  mode?: RevealMode;
}) {
  const gridRef = useRef<HTMLDivElement>(null);

  // Layout effect: the pre-reveal hide lands before first paint (no flash);
  // server HTML keeps tiles visible for no-JS visitors.
  useIsomorphicLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid || mode === "none" || prefersReducedMotion()) return;

    const tiles = grid.querySelectorAll("[data-tile]");
    utils.set(tiles, { opacity: 0, translateY: REVEAL_RISE });
    const anim = animate(tiles, {
      opacity: 1,
      translateY: 0,
      duration: DURATION.enter,
      ease: easeVelvet,
      delay: stagger(STAGGER_STEP),
      ...(mode === "scroll"
        ? { autoplay: onScroll({ target: grid, enter: "bottom top" }) }
        : {}),
    });

    return () => {
      anim.revert();
    };
  }, [mode, variant]);

  return (
    <Section id="work" heading={caseTiles.heading} mode={mode}>
      {/* TODO(Mimir): tile selection is not a decision yet (intake-notes.md);
          the note stays visible until Mimir picks the four. */}
      <p className="-mt-6 mb-10 font-mono text-plaque text-violet-ink">
        {caseTiles.selectionNote}
      </p>
      <div
        ref={gridRef}
        className={`grid grid-cols-1 sm:grid-cols-2 ${
          variant === "hairline" ? "gap-px bg-rule-faint" : "gap-x-14 gap-y-16"
        }`}
      >
        {tileProjects.map((p) => (
          <article
            key={p.slug}
            data-tile
            className={variant === "hairline" ? "bg-night p-8" : "relative"}
          >
            {variant === "numbered" ? (
              <p aria-hidden="true" className="font-mono text-plaque text-violet-ink">
                fig. {p.fig}
              </p>
            ) : null}
            <h3
              className={`font-display text-title text-star ${
                variant === "numbered" ? "mt-2" : ""
              }`}
            >
              {p.name}
            </h3>
            <p className="mt-3 max-w-narrow text-body-sm text-moon">{p.oneLiner}</p>
            <p className="mt-4 font-mono text-plaque text-violet-ink">{p.tileLine}</p>
            <p className="mt-5">
              <GlintLink href={`/projects#${p.slug}`} className="font-mono text-mono">
                full card
              </GlintLink>
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
