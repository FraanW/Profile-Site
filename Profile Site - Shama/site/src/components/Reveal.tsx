"use client";

import { animate, onScroll, utils } from "animejs";
import { useRef } from "react";
import {
  DURATION,
  REVEAL_RISE,
  easeVelvet,
  prefersReducedMotion,
  useIsomorphicLayoutEffect,
  type RevealMode,
} from "@/lib/motion";

/**
 * Fade-and-rise entry per tokens.md §4: transform/opacity only, fires once,
 * then stillness. Velvet ease, 700ms, 20px of travel: the section settles
 * like a heavy curtain, never leaps. mode="scroll" plays on scroll-into-view
 * (landing page), mode="mount" plays immediately (Storybook stories).
 * Reduced motion or mode="none" renders the final frame with no observers
 * created.
 *
 * The pre-reveal hide runs in a layout effect, before first paint, so
 * content never flashes; server HTML stays visible for no-JS visitors.
 */
export function Reveal({
  children,
  mode = "scroll",
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  mode?: RevealMode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || mode === "none" || prefersReducedMotion()) return;

    utils.set(el, { opacity: 0, translateY: REVEAL_RISE });
    const anim = animate(el, {
      opacity: 1,
      translateY: 0,
      duration: DURATION.enter,
      ease: easeVelvet,
      delay,
      ...(mode === "scroll"
        ? { autoplay: onScroll({ target: el, enter: "bottom top" }) }
        : {}),
    });

    return () => {
      anim.revert();
    };
  }, [mode, delay]);

  return (
    <div ref={ref} data-reveal="" className={className}>
      {children}
    </div>
  );
}
