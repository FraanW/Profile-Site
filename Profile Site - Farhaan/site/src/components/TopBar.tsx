"use client";

import Link from "next/link";
import { animate } from "animejs";
import { DURATION, easeGlide, prefersReducedMotion } from "@/lib/motion";
import { identity } from "@/content/profile";
import { nav, projectsPage } from "@/content/copy";

export type TopBarVariant = "ruled" | "floating" | "caps";

const EMERALD = "#065F46";
const EMERALD_DEEP = "#044A37";

/** Hover color shift via anime.js (the sole engine; no CSS transitions). */
function useHover() {
  const to = (el: HTMLElement, color: string) => {
    if (prefersReducedMotion()) return;
    animate(el, { color, duration: DURATION.micro, ease: easeGlide });
  };
  return {
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => to(e.currentTarget, EMERALD_DEEP),
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => to(e.currentTarget, EMERALD),
  };
}

function NavLink({
  href,
  children,
  caps,
}: {
  href: string;
  children: React.ReactNode;
  caps?: boolean;
}) {
  const hover = useHover();
  const face = caps
    ? "font-display text-eyebrow uppercase"
    : "font-mono text-mono";
  return (
    <Link
      href={href}
      {...hover}
      className={`${face} text-emerald underline decoration-rule underline-offset-4`}
    >
      {children}
    </Link>
  );
}

/**
 * Thin persistent top bar (blueprint §6.1): mono name left, "projects ·
 * contact" right. Variants: "ruled" (default, hairline bottom rule),
 * "floating" (no rule), "caps" (eyebrow-caps links, the Playfair caps branch).
 */
export function TopBar({
  variant = "ruled",
  back = false,
}: {
  variant?: TopBarVariant;
  back?: boolean;
}) {
  const caps = variant === "caps";
  return (
    <header
      className={`sticky top-0 z-40 bg-bone ${
        variant === "floating" ? "" : "border-b border-rule-faint"
      }`}
    >
      <nav
        aria-label="Site"
        className="mx-auto flex h-12 max-w-site items-center justify-between px-6"
      >
        <div className="flex items-baseline gap-5">
          {back ? <NavLink href="/">◂ {projectsPage.back}</NavLink> : null}
          <Link href="/" className="font-mono text-mono font-medium text-ink">
            {identity.shortName}
          </Link>
        </div>
        <div className={`flex items-baseline ${caps ? "gap-6" : "gap-2"}`}>
          <NavLink href="/projects" caps={caps}>
            {nav.projects}
          </NavLink>
          {!caps && <span aria-hidden="true" className="font-mono text-mono text-steel">·</span>}
          <NavLink href="/#contact" caps={caps}>
            {nav.contact}
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
