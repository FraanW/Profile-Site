"use client";

import Link from "next/link";
import { animate, utils } from "animejs";
import { DURATION, easeKindle, prefersReducedMotion } from "@/lib/motion";
import { VIOLET, VIOLET_DEEP, VIOLET_INK } from "@/lib/palette";

/**
 * The site's one link recipe (tokens.md §1.3 rules 4 and 7). Links are
 * violet-ink and underlined on night and card — the only grounds the site
 * has. Hover is the glint: loud violet PLUS an underline-offset shift (two
 * channels, never hue alone), driven by anime.js with the kindle ease at
 * glint duration — the only way loud violet enters by pointer. Pressed
 * shares the hover violet; the offset returning is the pressed signal (the
 * ramp has no fourth step and does not need one). Reduced motion: the same
 * states apply instantly (a state is not motion). Focus: the token double
 * ring, from the base layer; no JS involved.
 */
type GlintState = "rest" | "hover" | "press";

const STATES: Record<GlintState, Record<string, string>> = {
  rest: { color: VIOLET_INK, textDecorationColor: VIOLET_DEEP, textUnderlineOffset: "4px" },
  hover: { color: VIOLET, textDecorationColor: VIOLET, textUnderlineOffset: "7px" },
  press: { color: VIOLET, textDecorationColor: VIOLET, textUnderlineOffset: "4px" },
};

function glint(el: HTMLElement, state: GlintState) {
  const to = STATES[state];
  if (prefersReducedMotion()) {
    utils.set(el, to);
    return;
  }
  animate(el, { ...to, duration: DURATION.glint, ease: easeKindle });
}

export function GlintLink({
  href,
  className = "",
  children,
  ...rest
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">) {
  const handlers = {
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => glint(e.currentTarget, "hover"),
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => glint(e.currentTarget, "rest"),
    onPointerDown: (e: React.PointerEvent<HTMLElement>) => glint(e.currentTarget, "press"),
    onPointerUp: (e: React.PointerEvent<HTMLElement>) => glint(e.currentTarget, "hover"),
  };

  const face = `text-violet-ink underline decoration-violet-deep underline-offset-4 ${className}`;

  // Internal routes go through next/link; everything else (mailto, external,
  // placeholder "#") is a plain anchor.
  if (href.startsWith("/")) {
    return (
      <Link href={href} {...handlers} {...rest} className={face}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} {...handlers} {...rest} className={face}>
      {children}
    </a>
  );
}
