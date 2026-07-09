"use client";

import { animate } from "animejs";
import { useRef } from "react";
import { DURATION, easeGlide, prefersReducedMotion } from "@/lib/motion";
import type { Project } from "@/content/projects";

export type NodeCardVariant = "ring" | "numbered" | "compact";

const LEAF_OFF = "rgba(52, 204, 115, 0)";
const LEAF_ON = "rgba(52, 204, 115, 1)";

/**
 * The emerald ring marker ◉. Hover fills it leaf-green AND thickens the ring
 * (tokens.md §1.3 rule 2: leaf states always carry a second channel).
 * Leaf fill is bounded by the emerald ring, per the leaf prohibition.
 */
export function RingMark({
  size = 14,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
    >
      <circle
        data-ring
        cx="8"
        cy="8"
        r="5.5"
        fill={LEAF_OFF}
        stroke="#065F46"
        strokeWidth="1.5"
        style={{ vectorEffect: "non-scaling-stroke" }}
      />
    </svg>
  );
}

/**
 * The /projects node card (blueprint §7 anatomy, top to bottom):
 * ring ◉ + Josefin title → serif one-liner → mono stack row → thin emerald
 * rule → mono proof figures → links row. Ring fill on hover runs through
 * anime.js only.
 */
export function NodeCard({
  project,
  variant = "ring",
  index,
}: {
  project: Project;
  variant?: NodeCardVariant;
  index?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const compact = variant === "compact";

  const ring = (on: boolean) => {
    if (prefersReducedMotion()) return;
    const circle = ref.current?.querySelector("[data-ring]");
    if (!circle) return;
    animate(circle, {
      fill: on ? LEAF_ON : LEAF_OFF,
      strokeWidth: on ? 2.5 : 1.5,
      duration: DURATION.micro,
      ease: easeGlide,
    });
  };

  return (
    <article
      ref={ref}
      id={project.slug}
      onMouseEnter={() => ring(true)}
      onMouseLeave={() => ring(false)}
      className={`relative border border-rule-faint bg-card ${compact ? "p-5" : "p-7"}`}
    >
      {variant === "numbered" && index !== undefined ? (
        <span
          aria-hidden="true"
          className="absolute right-5 top-5 font-mono text-label text-steel"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      ) : null}

      <div className="flex items-center gap-3">
        <RingMark />
        <h3 className="font-display text-title text-ink">{project.name}</h3>
      </div>

      <p className={`${compact ? "mt-2 text-body-sm" : "mt-3 text-body"} max-w-prose text-ink`}>
        {project.oneLiner}
      </p>

      <p className="mt-4 font-mono text-mono text-steel">{project.stack.join(" · ")}</p>

      <hr className="mt-4 border-0 border-t border-emerald" />

      {project.figures.length > 0 ? (
        <dl className={`mt-4 flex flex-wrap ${compact ? "gap-x-6 gap-y-2" : "gap-x-8 gap-y-3"}`}>
          {project.figures.map((f) => (
            <div key={f.label}>
              <dt className="sr-only">{f.label}</dt>
              <dd>
                <span className="block font-mono text-stat text-ink">{f.value}</span>
                <span aria-hidden="true" className="block font-mono text-label text-steel">
                  {f.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      ) : null}

      {project.links.length > 0 ? (
        <p className="mt-5 flex flex-wrap gap-x-6 gap-y-1 font-mono text-mono">
          {project.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-emerald underline decoration-rule underline-offset-4"
            >
              ▸ {l.label}
            </a>
          ))}
        </p>
      ) : null}
    </article>
  );
}
