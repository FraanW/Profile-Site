"use client";

import { animate, onScroll, utils } from "animejs";
import { useEffect, useRef } from "react";
import {
  DURATION,
  REVEAL_RISE,
  easeGlide,
  prefersReducedMotion,
  type RevealMode,
} from "@/lib/motion";

/**
 * Fade-and-rise entry per tokens.md §4: transform/opacity only, fires once,
 * then stillness. mode="scroll" plays on scroll-into-view (landing page),
 * mode="mount" plays immediately (Storybook stories). Reduced motion or
 * mode="none" renders the final frame with no observers created.
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

  useEffect(() => {
    const el = ref.current;
    if (!el || mode === "none" || prefersReducedMotion()) return;

    utils.set(el, { opacity: 0, translateY: REVEAL_RISE });
    const anim = animate(el, {
      opacity: 1,
      translateY: 0,
      duration: DURATION.enter,
      ease: easeGlide,
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
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
