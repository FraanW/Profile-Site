"use client";

import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import type { RevealMode } from "@/lib/motion";
import { signalsSection } from "@/content/copy";
import { signals } from "@/content/signals";

export type SignalsVariant = "rows" | "dense" | "cards";

/**
 * Signals (blueprint §6.6): compact pedigree block for the panel scan.
 * Ruled emerald lines, mono labels, serif detail. IEEE DOI is a real link.
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
          <p className="max-w-prose font-mono text-mono text-ink">
            {signals.map((s, i) => (
              <span key={s.label}>
                {i > 0 ? <span className="text-steel"> · </span> : null}
                {s.href ? (
                  <a
                    href={s.href}
                    className="text-emerald underline decoration-rule underline-offset-4"
                  >
                    {s.label}
                  </a>
                ) : (
                  s.label
                )}{" "}
                <span className="text-steel">{s.figure}</span>
              </span>
            ))}
          </p>
        </Reveal>
      ) : variant === "cards" ? (
        <div className="grid gap-6 md:grid-cols-3">
          {signals.map((s, i) => (
            <Reveal key={s.label} mode={mode} delay={i * 60}>
              <div className="h-full border border-rule-faint bg-card p-6">
                <p className="font-mono text-label text-steel">{s.label}</p>
                <p className="mt-3 text-body-sm text-ink">{s.detail}</p>
                {s.href ? (
                  <a
                    href={s.href}
                    className="mt-3 inline-block font-mono text-label text-emerald underline decoration-rule underline-offset-4"
                  >
                    {s.figure}
                  </a>
                ) : (
                  <p className="mt-3 font-mono text-label text-steel">{s.figure}</p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      ) : (
        <dl className="border-b border-rule">
          {signals.map((s, i) => (
            <Reveal key={s.label} mode={mode} delay={i * 60}>
              <div className="grid gap-2 border-t border-rule py-5 md:grid-cols-[10rem_minmax(0,1fr)_auto] md:gap-8">
                <dt className="font-mono text-mono text-steel">{s.label}</dt>
                <dd className="max-w-prose text-body-sm text-ink">{s.detail}</dd>
                <dd className="font-mono text-label text-steel md:text-right">
                  {s.href ? (
                    <a
                      href={s.href}
                      className="text-emerald underline decoration-rule underline-offset-4"
                    >
                      {s.figure}
                    </a>
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
