"use client";

import Link from "next/link";
import { animate, onScroll, stagger, utils } from "animejs";
import { useRef } from "react";
import { Section } from "@/components/Section";
import {
  DURATION,
  REVEAL_RISE,
  STAGGER_STEP,
  easeGlide,
  prefersReducedMotion,
  useIsomorphicLayoutEffect,
  type RevealMode,
} from "@/lib/motion";
import { caseTiles } from "@/content/copy";
import { tileProjects } from "@/content/projects";

export type CaseTilesVariant = "open" | "hairline" | "numbered";

/**
 * Case tiles (blueprint §6.4): the owner-picked four — Adloom.ai, UPG,
 * Entopo, LedgerLine — in a minimal 2×2. Playfair title, one serif line, one
 * mono fragment, an arrow link. Staggered entry via anime.js stagger().
 * Tile copy is DRAFT, pending Lefler.
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
      ease: easeGlide,
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
      <div
        ref={gridRef}
        className={`grid grid-cols-1 sm:grid-cols-2 ${
          variant === "hairline" ? "gap-px bg-rule-faint" : "gap-x-12 gap-y-14"
        }`}
      >
        {tileProjects.map((p, i) => (
          <article
            key={p.slug}
            data-tile
            className={variant === "hairline" ? "bg-bone p-7" : "relative"}
          >
            {variant === "numbered" ? (
              <span aria-hidden="true" className="font-mono text-label text-steel">
                {String(i + 1).padStart(2, "0")}
              </span>
            ) : null}
            <h3 className={`font-display text-title text-ink ${variant === "numbered" ? "mt-1" : ""}`}>
              {p.name}
            </h3>
            <p className="mt-2 max-w-narrow text-body-sm text-ink">{p.oneLiner}</p>
            <p className="mt-3 font-mono text-label text-steel">{p.tileLine}</p>
            <p className="mt-4">
              <Link
                href={`/projects#${p.slug}`}
                className="font-mono text-mono text-emerald underline decoration-rule underline-offset-4"
              >
                ▸ full card
              </Link>
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
