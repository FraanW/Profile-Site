"use client";

import { useRef } from "react";
import { GlintLink } from "@/components/GlintLink";
import { figCaption } from "@/components/Plaque";
import { StarMark, starGlint } from "@/components/Star";
import type { Project } from "@/content/copy";

export type StarCardVariant = "plaque" | "compact" | "unframed";

/**
 * The /projects star card (blueprint §5): a constellation star grown into a
 * museum plaque. Anatomy, top to bottom: mono `fig. NN` caption (the
 * art-book move: the label comes first) → star point + Fraunces title →
 * Sentient one-liner → mono stack row → quiet hairline → mono proof figures
 * → links row. Hovering the card kindles its star: loud violet plus a scale
 * pop (two channels), through anime.js only.
 * Titles are real (intake-notes.md, scope notes baked in); every other slot
 * is PLACEHOLDER, pending Shama's intake.
 */
export function StarCard({
  project,
  variant = "plaque",
}: {
  project: Project;
  variant?: StarCardVariant;
}) {
  const ref = useRef<HTMLElement>(null);
  const compact = variant === "compact";

  const glint = (on: boolean) => {
    const star = ref.current?.querySelector("[data-card-star]");
    if (star) starGlint(star, on);
  };

  return (
    <article
      ref={ref}
      id={project.slug}
      onMouseEnter={() => glint(true)}
      onMouseLeave={() => glint(false)}
      className={
        variant === "unframed"
          ? "relative border-t border-rule pt-6"
          : `relative border border-rule-faint bg-card ${compact ? "p-5" : "p-7"}`
      }
    >
      <p className="font-mono text-plaque text-violet-ink">
        {figCaption(project.fig, project.name)}
      </p>

      <div className={`flex items-center gap-3 ${compact ? "mt-2" : "mt-3"}`}>
        <StarMark data-card-star="" size={compact ? 8 : 10} />
        <h3 className="font-display text-title text-star">{project.name}</h3>
      </div>

      <p className={`${compact ? "mt-2 text-body-sm" : "mt-3 text-body"} max-w-prose text-moon`}>
        {project.oneLiner}
      </p>

      <p className="mt-4 font-mono text-mono text-moon">{project.stack.join(" · ")}</p>

      <hr className="mt-4 border-0 border-t border-rule" />

      {project.figures.length > 0 ? (
        <dl className={`mt-4 flex flex-wrap ${compact ? "gap-x-6 gap-y-2" : "gap-x-8 gap-y-3"}`}>
          {project.figures.map((f) => (
            <div key={f.label}>
              <dt className="sr-only">{f.label}</dt>
              <dd>
                <span className="block font-mono text-figure text-star">{f.value}</span>
                <span aria-hidden="true" className="block font-mono text-plaque text-violet-ink">
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
            <GlintLink key={l.label} href={l.href}>
              {l.label}
            </GlintLink>
          ))}
        </p>
      ) : null}
    </article>
  );
}
