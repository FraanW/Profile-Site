"use client";

import { GlintLink } from "@/components/GlintLink";
import { Reveal } from "@/components/Reveal";
import type { RevealMode } from "@/lib/motion";
import { identity } from "@/content/copy";

export type FooterVariant = "ruled" | "single";

/**
 * Footer (blueprint §5): one mono line — core stack, email, GitHub,
 * LinkedIn, location. Nothing else. Every value is a PLACEHOLDER slot,
 * pending Shama's intake.
 */
export function Footer({
  variant = "ruled",
  mode = "scroll",
}: {
  variant?: FooterVariant;
  mode?: RevealMode;
}) {
  const single = variant === "single";
  return (
    <footer className={`${single ? "" : "border-t border-rule"} px-6 py-10`}>
      <Reveal mode={mode}>
        <div
          className={`mx-auto max-w-site font-mono text-plaque text-moon ${
            single
              ? "flex flex-wrap items-baseline gap-x-6 gap-y-2"
              : "flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between"
          }`}
        >
          <span>{identity.stackLine}</span>
          <span className="flex flex-wrap gap-x-6 gap-y-2">
            <GlintLink href={identity.email.href} className="font-mono text-plaque">
              {identity.email.label}
            </GlintLink>
            <GlintLink href={identity.github.href} className="font-mono text-plaque">
              github
            </GlintLink>
            <GlintLink href={identity.linkedin.href} className="font-mono text-plaque">
              linkedin
            </GlintLink>
            <span>{identity.location}</span>
          </span>
        </div>
      </Reveal>
    </footer>
  );
}
