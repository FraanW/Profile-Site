"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { stackLogos, type StackLogo } from "@/content/stack";

/**
 * Componentry's Scroll Based Velocity, carrying brand marks rather than text.
 *
 * The row drifts on its own, and scrolling pushes it: scroll down and it runs
 * faster, scroll up and it reverses. The effect only reads if the content is
 * repeated seamlessly, so each row renders its marks four times and wraps at
 * a quarter of its own width.
 *
 * Marks are monochrome by default and take their brand colour on hover. Nearly
 * thirty logos at full saturation would be a fruit salad sitting next to a
 * palette this disciplined; muted, they read as one material.
 */

/** Keeps a value inside [min, max) by wrapping rather than clamping. */
function wrap(min: number, max: number, value: number) {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
}

function LogoRow({
  logos,
  baseVelocity,
  paused,
}: {
  logos: StackLogo[];
  baseVelocity: number;
  paused: boolean;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });

  // Four copies, so wrapping a quarter of the way is seamless.
  const x = useTransform(baseX, (value) => `${wrap(-25, 0, value)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (paused) return;
    let moveBy = direction.current * baseVelocity * (delta / 1000);

    const factor = velocityFactor.get();
    if (factor < 0) direction.current = -1;
    else if (factor > 0) direction.current = 1;

    moveBy += direction.current * moveBy * Math.abs(factor);
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="flex w-full overflow-hidden pt-12 pb-1">
      <motion.div className="flex flex-nowrap gap-x-12 sm:gap-x-16" style={{ x }}>
        {[0, 1, 2, 3].map((copy) => (
          <div key={copy} className="flex flex-nowrap items-center gap-x-12 sm:gap-x-16">
            {logos.map((logo) => (
              <span
                key={`${copy}-${logo.slug}`}
                className="stack-logo relative flex shrink-0 items-center"
                // Only the first copy is read out; the rest are duplicates.
                aria-hidden={copy > 0 ? "true" : undefined}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-7 w-7 shrink-0 sm:h-8 sm:w-8"
                  role="img"
                  aria-label={copy === 0 ? logo.title : undefined}
                  aria-hidden={copy > 0 ? "true" : undefined}
                >
                  <path d={logo.path} fill="currentColor" />
                </svg>
                {/*
                  A plain element rather than a title attribute: the native
                  tooltip waits about a second, which is longer than a logo
                  stays under the cursor in a moving row.
                */}
                <span className="stack-tip" aria-hidden="true">
                  {logo.title}
                </span>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function ScrollVelocityLogos({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const [onScreen, setOnScreen] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const observer = new IntersectionObserver(
      ([entry]) => setOnScreen(Boolean(entry?.isIntersecting)),
      { rootMargin: "120px" },
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  // Split so the two rows carry different things and run opposite ways.
  const half = Math.ceil(stackLogos.length / 2);
  const top = stackLogos.slice(0, half);
  const bottom = stackLogos.slice(half);

  if (reduceMotion) {
    // No drift: a plain, wrapped, complete set.
    return (
      <div ref={hostRef} className={cn("flex flex-wrap gap-6", className)}>
        {stackLogos.map((logo) => (
          <span key={logo.slug} className="stack-logo relative flex items-center">
            <svg viewBox="0 0 24 24" className="h-7 w-7" role="img" aria-label={logo.title}>
              <path d={logo.path} fill="currentColor" />
            </svg>
            <span className="stack-tip" aria-hidden="true">
              {logo.title}
            </span>
          </span>
        ))}
      </div>
    );
  }

  return (
    <div ref={hostRef} className={cn("space-y-1", className)}>
      <LogoRow logos={top} baseVelocity={2.2} paused={!onScreen} />
      <LogoRow logos={bottom} baseVelocity={-2.2} paused={!onScreen} />
    </div>
  );
}

export default ScrollVelocityLogos;
