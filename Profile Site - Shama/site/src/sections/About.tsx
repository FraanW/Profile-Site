"use client";

import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import type { RevealMode } from "@/lib/motion";
import { about } from "@/content/copy";

export type AboutVariant = "photo-left" | "photo-right" | "mounted";

/** Squared photo slot (tokens.md §3.3: every rectangle is square; the only
    circles are points of light). Placeholder until Shama delivers the
    asset. The "mounted" variant sets the print on a card surface, like a
    gallery mat. */
function PhotoSlot({ mounted = false }: { mounted?: boolean }) {
  const frame = (
    <div className="relative flex aspect-square w-full items-center justify-center border border-rule-faint bg-card">
      {/* Owner asset pending intake (blueprint §9 rule 1). */}
      <span className="px-4 text-center font-mono text-plaque text-violet-ink">
        photo · owner asset pending
      </span>
    </div>
  );
  return (
    <figure>
      {mounted ? <div className="border border-rule-faint bg-card p-4">{frame}</div> : frame}
      <figcaption className="mt-2 font-mono text-plaque text-violet-ink">
        {about.photoCaption}
      </figcaption>
    </figure>
  );
}

/**
 * About (blueprint §5): photo slot plus 60 to 90 words of first-person
 * Sentient on the night ground. Body copy is PLACEHOLDER, pending Shama's
 * intake; it makes no claim about them.
 */
export function About({
  variant = "photo-left",
  mode = "scroll",
}: {
  variant?: AboutVariant;
  mode?: RevealMode;
}) {
  const photoRight = variant === "photo-right";

  return (
    <Section id="about" heading={about.heading} mode={mode}>
      <div className="grid items-start gap-12 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <Reveal mode={mode} delay={110} className={photoRight ? "md:order-2" : ""}>
          <div className="max-w-72">
            <PhotoSlot mounted={variant === "mounted"} />
          </div>
        </Reveal>
        <Reveal mode={mode} delay={220} className={photoRight ? "md:order-1" : ""}>
          <p className="max-w-prose text-body text-moon">{about.body}</p>
        </Reveal>
      </div>
    </Section>
  );
}
