"use client";

import { animate, createTimeline, onScroll, svg, utils, type Timeline } from "animejs";
import { useCallback, useEffect, useRef } from "react";
import { CameraGlyph, addCaptureFlash } from "@/components/Camera";
import { GlintLink } from "@/components/GlintLink";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import {
  DURATION,
  SCROLL_SYNC,
  easeVelvet,
  prefersReducedMotion,
  useReducedMotion,
  type RevealMode,
} from "@/lib/motion";
import { contact, identity } from "@/content/copy";

export type ContactVariant = "outline" | "bar" | "quiet";

/**
 * The glide is authored at runtime: the stage covers the whole section
 * (its SVG has no viewBox, so user units are pixels, 1:1 at any size) and
 * the path is measured to end with the glyph settled beside the CTA's
 * right edge, level with the button — clear of the line text above it.
 * It starts beyond the stage's right edge, where the rail carries the
 * assembled camera, and descends in a gentle S.
 */
function buildGlidePath(stage: HTMLElement, cta: HTMLElement): string {
  const s = stage.getBoundingClientRect();
  const b = cta.getBoundingClientRect();
  // Beside the button, clamped so a full-measure CTA never pushes the
  // glyph off the stage (it rests on the bar's right end instead).
  const ex = Math.min(b.right - s.left + 44, s.width - 34);
  const ey = b.top - s.top + b.height / 2 - 4; // level with the button, slight optical lift
  const sx = s.width + 60; // enter from beyond the right rail
  const sy = Math.max(10, ey - 200);
  return [
    `M ${sx} ${sy}`,
    `C ${sx - 150} ${sy - 8}, ${ex + 260} ${ey - 150}, ${ex + 140} ${ey - 72}`,
    `S ${ex + 36} ${ey - 4}, ${ex} ${ey}`,
  ].join(" ");
}

/**
 * Contact (blueprint §5 + §6.2): one tiny ask, the links row, the camera's
 * finale. The assembled camera glides in along an authored SVG path on
 * VELVET — no spring on this site (tokens.md §4.1 ruling: the drama is the
 * catch, not the landing) — settles beside the CTA, and fires once: the
 * aperture blinks and the capture flash bursts, star-white core with
 * loud-violet rays on kindle, the site's one finale-scale emission moment.
 * Everything completes inside --duration-finale (glide 1400 + fire ~1080).
 *
 * One camera only: the finale is a hand-off from the rail. The glide
 * overlay fades in over a scroll band that starts AFTER the rail's
 * fade-out band ends (see LandingPage), both scrubbed, so at no scroll
 * position do two cameras render.
 *
 * All copy, including the camera's line, is PLACEHOLDER, pending intake.
 * Reduced motion: camera parked assembled beside the CTA, line visible,
 * no rail, no flash, no observers.
 */
export function Contact({
  variant = "outline",
  mode = "scroll",
}: {
  variant?: ContactVariant;
  mode?: RevealMode;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLParagraphElement>(null);
  const tlRef = useRef<Timeline | null>(null);
  const reduced = useReducedMotion();
  // Final frame (camera at rest, line readable) for reduced motion / mode none.
  const staticFrame = mode === "none" || reduced;

  const buildTimeline = useCallback((autoplayOnScroll: boolean) => {
    const pathEl = pathRef.current;
    const camera = cameraRef.current;
    const line = lineRef.current;
    const stage = stageRef.current;
    const cta = stage?.querySelector<HTMLElement>("[data-cta]");
    if (!pathEl || !camera || !line || !stage || !cta) return null;

    pathEl.setAttribute("d", buildGlidePath(stage, cta));
    // The path's translate tweens carry the glide; its tangent rotation is
    // discarded on purpose (that is aircraft language, and it would tumble
    // the camera). A hand-authored tilt settles to upright instead.
    const { translateX, translateY } = svg.createMotionPath(pathEl);
    utils.set(camera, { opacity: 1, rotate: -8 });
    utils.set(line, { opacity: 0 });

    const tl = createTimeline({
      autoplay: autoplayOnScroll
        ? onScroll({ target: stage, enter: "bottom top" })
        : true,
    });
    // The glide: a dolly move on velvet, the site finishing its sentence
    // (tokens.md §4.1: no spring exists on this site). Draw-length beat.
    tl.add(
      camera,
      { translateX, translateY, rotate: 0, duration: DURATION.draw, ease: easeVelvet },
      0
    );
    // The camera fires once: blink, capture flash, blades reopen.
    addCaptureFlash(tl, camera);
    // The line arrives with the flash decay, ending with the timeline.
    tl.add(
      line,
      { opacity: 1, duration: DURATION.enter, ease: easeVelvet },
      tl.duration - DURATION.enter
    );
    return tl;
  }, []);

  useEffect(() => {
    // Static / reduced motion: set the line's final frame EXPLICITLY and
    // build nothing. The gate must be synchronous (prefersReducedMotion()
    // at effect time), not the render-gate alone: hydration's server
    // snapshot assumes motion, so a motion-first pass would dim the line
    // and its cleanup revert() would restore that dimmed opacity AFTER
    // React re-renders the static frame (see shared/playbook.md). The
    // explicit set also repairs the live motion→reduce toggle.
    if (staticFrame || prefersReducedMotion()) {
      if (lineRef.current) utils.set(lineRef.current, { opacity: 1 });
      return;
    }
    const tl = buildTimeline(mode === "scroll");
    tlRef.current = tl;
    return () => {
      tl?.revert();
      tlRef.current = null;
    };
  }, [mode, staticFrame, buildTimeline]);

  // The hand-off (blueprint §6.2: one camera only): the glide overlay stays
  // invisible until the rail camera has fully faded (LandingPage fades it
  // over an earlier, disjoint band). Scrubbed with the site-wide sync so
  // scrolling back up hands cleanly back: finale camera out, rail back in.
  useEffect(() => {
    // Same synchronous gate as the timeline effect: no observers may exist
    // for reduced-motion visitors, including hydration's motion-first pass.
    if (staticFrame || mode !== "scroll" || prefersReducedMotion()) return;
    const overlay = overlayRef.current;
    const stage = stageRef.current;
    if (!overlay || !stage) return;
    const section = stage.closest("section") ?? stage;
    utils.set(overlay, { opacity: 0 });
    const anim = animate(overlay, {
      opacity: 1,
      ease: easeVelvet,
      autoplay: onScroll({
        target: section,
        sync: SCROLL_SYNC,
        enter: "bottom top-=200",
        leave: "bottom top",
      }),
    });
    return () => {
      anim.revert();
    };
  }, [mode, staticFrame]);

  const replay = () => {
    // Storybook affordance: re-run the finale once.
    tlRef.current?.restart();
  };

  const cta =
    variant === "quiet" ? (
      // The quiet variant: the CTA as a bare underlined mono line.
      <a
        href={identity.email.href}
        data-cta
        className="font-mono text-mono font-medium text-star underline decoration-violet-deep underline-offset-4"
      >
        {contact.cta}
      </a>
    ) : (
      <a
        href={identity.email.href}
        data-cta
        className={`inline-block border border-violet-ink px-7 py-3.5 text-center font-mono text-mono font-medium text-star ${
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
          <p className="max-w-narrow text-body text-moon">{contact.ask}</p>
        </Reveal>

        {/* The camera's line: real text, present for every reader. */}
        <p
          ref={lineRef}
          className="mt-10 max-w-narrow font-mono text-plaque text-violet-ink"
          style={staticFrame ? { opacity: 1 } : { opacity: 0 }}
        >
          {contact.finaleLine}
        </p>

        <div className={`relative mt-4 ${variant === "bar" ? "" : "inline-block"}`}>
          {cta}
          {staticFrame ? (
            // Reduced-motion final frame: the camera parked assembled
            // beside the CTA (matching the glide's settle), no observers,
            // no flash (every flash element rests at opacity 0).
            <div
              aria-hidden="true"
              className="absolute -right-19 top-1/2 -translate-y-1/2"
            >
              <CameraGlyph />
            </div>
          ) : null}
        </div>

        <Reveal mode={mode} delay={110}>
          <div className="mt-12 flex flex-wrap items-baseline gap-x-8 gap-y-2 font-mono text-mono">
            <GlintLink href={identity.email.href}>{identity.email.label}</GlintLink>
            <GlintLink href={identity.github.href}>{identity.github.label}</GlintLink>
            <GlintLink href={identity.linkedin.href}>{identity.linkedin.label}</GlintLink>
            <span className="text-moon">{identity.location}</span>
          </div>
        </Reveal>

        {/* Glide stage overlay: covers the section, pure choreography,
            never interactive. The path is authored at runtime to settle
            beside the CTA (see buildGlidePath); the overlay itself carries
            the one-camera hand-off fade. */}
        {!staticFrame ? (
          <div
            ref={overlayRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-visible"
          >
            <svg className="absolute inset-0 h-full w-full overflow-visible">
              <path ref={pathRef} d="M 0 0" fill="none" stroke="none" />
            </svg>
            <div ref={cameraRef} className="absolute left-0 top-0 -ml-[32px] -mt-[26px] opacity-0">
              <CameraGlyph />
            </div>
          </div>
        ) : null}

        {mode === "mount" ? (
          <button
            type="button"
            onClick={replay}
            className="absolute right-0 top-0 border border-rule-faint bg-card px-3 py-1.5 font-mono text-plaque text-violet-ink"
          >
            replay finale
          </button>
        ) : null}
      </div>
    </Section>
  );
}
