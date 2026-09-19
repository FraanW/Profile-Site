"use client";

import { Reveal } from "@/components/Reveal";
import type { RevealMode } from "@/lib/motion";
import { identity } from "@/content/profile";

export type FooterVariant = "single" | "ruled";

/**
 * Footer (blueprint §6.8): one-line core stack (mono), both emails, GitHub,
 * LinkedIn, location. Nothing else.
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
          className={`mx-auto max-w-site font-mono text-label text-steel ${
            single
              ? "flex flex-wrap items-baseline gap-x-6 gap-y-2"
              : "flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between"
          }`}
        >
          <span>{identity.stackLine}</span>
          <span className="flex flex-wrap gap-x-6 gap-y-2">
            <a
              href={`mailto:${identity.emails.primary}`}
              className="text-emerald underline decoration-rule underline-offset-4"
            >
              {identity.emails.primary}
            </a>
            <a
              href={`mailto:${identity.emails.work}`}
              className="text-emerald underline decoration-rule underline-offset-4"
            >
              {identity.emails.work}
            </a>
            <a
              href={identity.github.href}
              className="text-emerald underline decoration-rule underline-offset-4"
            >
              github
            </a>
            <a
              href={identity.linkedin.href}
              className="text-emerald underline decoration-rule underline-offset-4"
            >
              linkedin
            </a>
            <span>{identity.location}</span>
          </span>
        </div>
      </Reveal>
    </footer>
  );
}
