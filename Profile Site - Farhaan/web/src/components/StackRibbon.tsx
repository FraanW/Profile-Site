"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { stackLogos } from "@/content/stack";

/**
 * One ribbon of brand marks, drifting at a steady speed.
 *
 * This replaces the scroll-velocity version. Two rows running opposite ways
 * and changing speed with the scroll wheel read as busy rather than as
 * confident, and the marks were small enough to be hard to identify. One large
 * row at a constant pace is calmer and easier to actually read.
 *
 * Pure CSS: a track holding two identical copies, translated by half its width
 * and looping. No requestAnimationFrame, no scroll listener, nothing on the
 * main thread. It pauses on hover so a name can be read, and stops entirely
 * when scrolled away or when the viewer asked for less motion.
 */

export function StackRibbon({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [onScreen, setOnScreen] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const observer = new IntersectionObserver(
      ([entry]) => setOnScreen(Boolean(entry?.isIntersecting)),
      { rootMargin: "150px" },
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={hostRef}
      className={cn("stack-ribbon", className)}
      data-running={onScreen ? "true" : "false"}
    >
      <div className="stack-ribbon-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="stack-ribbon-set">
            {stackLogos.map((logo) => (
              <span
                key={`${copy}-${logo.slug}`}
                className="stack-logo"
                // The second copy exists only to make the loop seamless.
                aria-hidden={copy > 0 ? "true" : undefined}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-11 w-11 sm:h-14 sm:w-14"
                  role="img"
                  aria-label={copy === 0 ? logo.title : undefined}
                  aria-hidden={copy > 0 ? "true" : undefined}
                >
                  <path d={logo.path} fill="currentColor" />
                </svg>
                <span className="stack-tip" aria-hidden="true">
                  {logo.title}
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StackRibbon;
