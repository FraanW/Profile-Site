"use client";

import Link from "next/link";
import { GlintLink } from "@/components/GlintLink";
import { identity, nav } from "@/content/copy";

export type TopBarVariant = "ruled" | "floating";

/**
 * Thin persistent top bar (blueprint §5): mono name left, "projects ·
 * contact" right, lowercase Plex Mono throughout (this site has no caps
 * branch; the mono IS the caption voice). Variants: "ruled" (default,
 * hairline bottom rule), "floating" (no rule). `back` adds the ◂ affordance
 * for /projects. The camera rail passes beneath the bar's opaque night
 * ground, so no rail padding is needed here.
 */
export function TopBar({
  variant = "ruled",
  back = false,
}: {
  variant?: TopBarVariant;
  back?: boolean;
}) {
  return (
    <header
      className={`sticky top-0 z-40 bg-night ${
        variant === "floating" ? "" : "border-b border-rule-faint"
      }`}
    >
      <nav
        aria-label="Site"
        className="mx-auto flex h-12 max-w-site items-center justify-between px-6"
      >
        <div className="flex items-baseline gap-5">
          {back ? (
            <GlintLink href="/" className="font-mono text-mono">
              ◂ {nav.back}
            </GlintLink>
          ) : null}
          <Link href="/" className="font-mono text-mono font-medium text-star">
            {identity.shortName}
          </Link>
        </div>
        <div className="flex items-baseline gap-2">
          <GlintLink href="/projects" className="font-mono text-mono">
            {nav.projects}
          </GlintLink>
          <span aria-hidden="true" className="font-mono text-mono text-violet-ink">
            ·
          </span>
          <GlintLink href="/#contact" className="font-mono text-mono">
            {nav.contact}
          </GlintLink>
        </div>
      </nav>
    </header>
  );
}
