"use client";

import { GlintLink } from "@/components/GlintLink";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { STAGGER_STEP, type RevealMode } from "@/lib/motion";
import { signals, signalsSection } from "@/content/copy";

export type SignalsVariant = "rows" | "dense" | "plaques";

/**
 * Signals (blueprint §5): the compact pedigree block. Ruled hairline rows,
 * mono labels, Sentient detail — the quiet page of the exhibition
 * catalogue. All rows are PLACEHOLDER slots, pending Shama's intake.
 */
export function Signals({
  variant = "rows",
  mode = "scroll",
}: {
  variant?: SignalsVariant;
  mode?: RevealMode;
}) {
  return (
    <Section id="signals" heading={signalsSection.heading} mode={mode}>
      {variant === "dense" ? (
        <Reveal mode={mode}>
          <p className="max-w-prose font-mono text-mono text-moon">
            {signals.map((s, i) => (
              <span key={s.label}>
                {i > 0 ? <span className="text-violet-ink"> · </span> : null}
                {s.href ? <GlintLink href={s.href}>{s.label}</GlintLink> : s.label}{" "}
                <span className="text-violet-ink">{s.figure}</span>
              </span>
            ))}
          </p>
        </Reveal>
      ) : variant === "plaques" ? (
        <div className="grid gap-6 md:grid-cols-3">
          {signals.map((s, i) => (
            <Reveal key={s.label} mode={mode} delay={i * STAGGER_STEP}>
              <div className="h-full border border-rule-faint bg-card p-6">
                <p className="font-mono text-plaque text-violet-ink">{s.label}</p>
                <p className="mt-3 text-body-sm text-moon">{s.detail}</p>
                {s.href ? (
                  <p className="mt-3">
                    <GlintLink href={s.href} className="font-mono text-plaque">
                      {s.figure}
                    </GlintLink>
                  </p>
                ) : (
                  <p className="mt-3 font-mono text-plaque text-violet-ink">{s.figure}</p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      ) : (
        <dl className="border-b border-rule">
          {signals.map((s, i) => (
            <Reveal key={s.label} mode={mode} delay={i * STAGGER_STEP}>
              <div className="grid gap-2 border-t border-rule py-6 md:grid-cols-[11rem_minmax(0,1fr)_auto] md:gap-8">
                <dt className="font-mono text-mono text-violet-ink">{s.label}</dt>
                <dd className="max-w-prose text-body-sm text-moon">{s.detail}</dd>
                <dd className="font-mono text-plaque text-violet-ink md:text-right">
                  {s.href ? (
                    <GlintLink href={s.href} className="font-mono text-plaque">
                      {s.figure}
                    </GlintLink>
                  ) : (
                    s.figure
                  )}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      )}
    </Section>
  );
}
