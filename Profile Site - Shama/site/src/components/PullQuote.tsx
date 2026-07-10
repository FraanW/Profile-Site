"use client";

import { animate, onScroll, utils } from "animejs";
import { useRef } from "react";
import {
  DURATION,
  easeVelvet,
  prefersReducedMotion,
  useIsomorphicLayoutEffect,
  type RevealMode,
} from "@/lib/motion";

/**
 * The pull-quote (blueprint §6.3, tokens.md §2.3): the between-sections
 * editorial voice. Playfair Display 500 italic — the only Playfair on the
 * site, structurally locked: the roman is never loaded, so any stray
 * font-quote heading falls to Georgia and fails review on sight. Dim ink,
 * night ground only, 40ch measure.
 *
 * These are positioning statements in the site's own voice, NEVER
 * attributed testimonials (truth rule: no invented attribution, ever) —
 * hence a plain <p>, not a <blockquote>, which would claim quotation.
 *
 * Motion: fades into existence once on scroll-into-view — opacity only, on
 * velvet, then still (blueprint §6.3: no sliding, no letter-by-letter
 * reveals, no loops). Reduced motion / no-JS: visible at rest.
 */
export function PullQuote({
  children,
  mode = "scroll",
  className = "",
}: {
  children: React.ReactNode;
  mode?: RevealMode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || mode === "none" || prefersReducedMotion()) return;

    utils.set(el, { opacity: 0 });
    const anim = animate(el, {
      opacity: 1,
      duration: DURATION.enter,
      ease: easeVelvet,
      ...(mode === "scroll"
        ? { autoplay: onScroll({ target: el, enter: "bottom top" }) }
        : {}),
    });

    return () => {
      anim.revert();
    };
  }, [mode]);

  return (
    <div ref={ref} data-quote="" className={className}>
      <p className="font-quote text-quote max-w-narrow italic text-dim">{children}</p>
    </div>
  );
}
