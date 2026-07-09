"use client";

import { createTimeline, onScroll, svg, utils, type Timeline } from "animejs";
import { useCallback, useEffect, useRef } from "react";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import {
  DURATION,
  easeGlide,
  springLift,
  useReducedMotion,
  type RevealMode,
} from "@/lib/motion";
import { contact } from "@/content/copy";
import { identity } from "@/content/profile";

export type ContactVariant = "solid" | "outline" | "bar";

/** The small assembled plane, side profile, nose pointing +x. */
function PlaneGlyph() {
  return (
    <svg width="46" height="30" viewBox="0 0 46 30" aria-hidden="true">
      <g fill="none" stroke="#065F46" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round">
        <path d="M44 17 C 36 12, 18 11, 8 13 L 2 15 C 6 20, 20 22, 32 21 Z" />
        <path d="M22 13 L 12 4 L 17 3 L 28 12 Z" />
        <path d="M9 13 L 4 7 L 8 6 L 13 12 Z" />
        <path d="M20 20 L 16 26 L 21 25 L 26 20 Z" />
      </g>
    </svg>
  );
}

/**
 * The flight is authored at runtime: the stage covers the whole section
 * (its SVG has no viewBox, so user units are pixels, 1:1 at any size) and
 * the path is measured to end exactly on the CTA's top edge. The flight
 * heads right-to-left, so the glyph rides in a scaleY(-1) wrapper: combined
 * with the motion path's ~180° tangent rotation that reads as an upright,
 * nose-left aircraft banking in.
 */
function buildFlightPath(stage: HTMLElement, cta: HTMLElement): string {
  const s = stage.getBoundingClientRect();
  const b = cta.getBoundingClientRect();
  const ex = b.right - s.left - 34; // land near the CTA's right end
  const ey = b.top - s.top - 17; // glyph half-height above the button edge
  const sx = s.width + 60; // enter from beyond the right rail
  const sy = Math.max(10, ey - 170);
  return [
    `M ${sx} ${sy}`,
    `C ${sx - 190} ${sy - 34}, ${ex + 320} ${ey - 190}, ${ex + 210} ${ey - 96}`,
    `S ${ex + 60} ${ey + 2}, ${ex} ${ey}`,
  ].join(" ");
}

/**
 * Contact (blueprint §6.7): one tiny ask, both emails, the plane's finale.
 * The assembled plane banks in along an authored SVG path
 * (svg.createMotionPath + the lift spring, its only sanctioned use) and
 * lands on the CTA, delivering its one line.
 * All copy, including the plane's line, is DRAFT, pending Lefler.
 * Reduced motion: plane pre-landed, line visible, no observers.
 */
export function Contact({
  variant = "solid",
  mode = "scroll",
}: {
  variant?: ContactVariant;
  mode?: RevealMode;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLParagraphElement>(null);
  const tlRef = useRef<Timeline | null>(null);
  const reduced = useReducedMotion();
  // Final frame (plane parked, line readable) for reduced motion / mode none.
  const staticFrame = mode === "none" || reduced;

  const buildTimeline = useCallback((autoplayOnScroll: boolean) => {
    const pathEl = pathRef.current;
    const plane = planeRef.current;
    const line = lineRef.current;
    const stage = stageRef.current;
    const cta = stage?.parentElement?.querySelector<HTMLElement>("[data-cta]");
    if (!pathEl || !plane || !line || !stage || !cta) return null;

    pathEl.setAttribute("d", buildFlightPath(stage, cta));
    const { translateX, translateY, rotate } = svg.createMotionPath(pathEl);
    utils.set(plane, { opacity: 1 });
    utils.set(line, { opacity: 0 });

    const tl = createTimeline({
      autoplay: autoplayOnScroll
        ? onScroll({ target: stage, enter: "bottom top" })
        : true,
    });
    tl.add(plane, { translateX, translateY, rotate, ease: springLift() }, 0);
    tl.add(line, { opacity: 1, duration: DURATION.enter, ease: easeGlide }, "-=350");
    return tl;
  }, []);

  useEffect(() => {
    if (staticFrame) return;
    const tl = buildTimeline(mode === "scroll");
    tlRef.current = tl;
    return () => {
      tl?.revert();
      tlRef.current = null;
    };
  }, [mode, staticFrame, buildTimeline]);

  const replay = () => {
    // Storybook affordance: re-run the finale once.
    tlRef.current?.restart();
  };

  const cta =
    variant === "outline" ? (
      <a
        href={`mailto:${identity.emails.primary}`}
        data-cta
        className="inline-block border-2 border-emerald px-7 py-3.5 font-mono text-mono font-medium text-emerald"
      >
        {contact.cta}
      </a>
    ) : (
      <a
        href={`mailto:${identity.emails.primary}`}
        data-cta
        className={`inline-block bg-emerald px-7 py-3.5 text-center font-mono text-mono font-medium text-bone ${
          variant === "bar" ? "w-full max-w-prose" : ""
        }`}
      >
        {contact.cta}
      </a>
    );

  return (
    <Section id="contact" heading={contact.heading} mode={mode}>
      <div ref={stageRef} className="relative">
        <Reveal mode={mode}>
          <p className="max-w-narrow text-body text-ink">{contact.ask}</p>
        </Reveal>

        {/* The plane's line: real text, present for every reader. DRAFT. */}
        <p
          ref={lineRef}
          className="mt-8 max-w-narrow font-mono text-label text-steel"
          style={staticFrame ? { opacity: 1 } : { opacity: 0 }}
        >
          {contact.planeLine}
        </p>

        <div className={`relative mt-3 ${variant === "bar" ? "" : "inline-block"}`}>
          {cta}
          {staticFrame ? (
            // Reduced-motion final frame: the plane parked on the CTA,
            // nose-left (mirrored), no observers anywhere.
            <div aria-hidden="true" className="absolute -top-8 right-3" style={{ transform: "scaleX(-1)" }}>
              <PlaneGlyph />
            </div>
          ) : null}
        </div>

        <Reveal mode={mode} delay={120}>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 font-mono text-mono">
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
            <span className="text-steel">{identity.location}</span>
          </div>
        </Reveal>

        {/* Flight stage overlay: covers the section, pure choreography,
            never interactive. The path is authored at runtime to land on
            the CTA (see buildFlightPath). */}
        {!staticFrame ? (
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-visible">
            <svg className="absolute inset-0 h-full w-full overflow-visible">
              <path ref={pathRef} d="M 0 0" fill="none" stroke="none" />
            </svg>
            <div ref={planeRef} className="absolute left-0 top-0 -ml-[23px] -mt-[15px] opacity-0">
              <div style={{ transform: "scaleY(-1)" }}>
                <PlaneGlyph />
              </div>
            </div>
          </div>
        ) : null}

        {mode === "mount" ? (
          <button
            type="button"
            onClick={replay}
            className="absolute right-0 top-0 border border-rule-faint bg-card px-3 py-1.5 font-mono text-label text-steel sm:-top-4"
          >
            replay flight
          </button>
        ) : null}
      </div>
    </Section>
  );
}
