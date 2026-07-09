"use client";

import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import type { RevealMode } from "@/lib/motion";
import { about } from "@/content/copy";

export type AboutVariant = "photo-left" | "photo-right" | "plate";

/** Squared photo slot (blueprint §6.3: document treatment, never a circle).
    Placeholder until the owner delivers the asset. */
function PhotoSlot({ plate = false }: { plate?: boolean }) {
  return (
    <figure className={`relative ${plate ? "mb-3 mr-3" : ""}`}>
      {plate ? (
        <div aria-hidden="true" className="absolute -bottom-3 -right-3 h-full w-full bg-emerald" />
      ) : null}
      <div className="relative flex aspect-square w-full items-center justify-center border border-rule-faint bg-card">
        {/* Owner supplies the photo before build (profile.md, resolved item 6). */}
        <span className="font-mono text-label text-steel">photo · owner asset pending</span>
      </div>
      <figcaption className="relative mt-2 font-mono text-label text-steel">
        {about.photoCaption}
      </figcaption>
    </figure>
  );
}

/**
 * About (blueprint §6.3): photo as document, 60 to 90 words of first-person
 * serif. Body copy is DRAFT, pending Lefler.
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
      <div className="grid items-start gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <Reveal mode={mode} delay={80} className={photoRight ? "md:order-2" : ""}>
          <div className="max-w-72">
            <PhotoSlot plate={variant === "plate"} />
          </div>
        </Reveal>
        <Reveal mode={mode} delay={160} className={photoRight ? "md:order-1" : ""}>
          <p className="max-w-prose text-body text-ink">{about.body}</p>
        </Reveal>
      </div>
    </Section>
  );
}
