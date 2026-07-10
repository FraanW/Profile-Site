"use client";

import { animate, onScroll } from "animejs";
import { useEffect, useRef } from "react";
import { SCROLL_SYNC, easeGlide, prefersReducedMotion, useReducedMotion } from "@/lib/motion";
import { Camera } from "@/components/Camera";
import { DottedBackground, type DottedBackgroundVariant } from "@/components/DottedBackground";
import { TopBar } from "@/components/TopBar";
import { About } from "@/sections/About";
import { CaseTiles } from "@/sections/CaseTiles";
import { Contact } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";
import { Hero } from "@/sections/Hero";
import { RadialGraph } from "@/sections/RadialGraph";
import { Signals } from "@/sections/Signals";

export type LandingBackground = "none" | Extract<DottedBackgroundVariant, "paper" | "drift">;

/**
 * The landing page in blueprint §5 order: hero → about → case tiles →
 * radial graph → signals → contact → footer, with the camera assembling
 * along the right rail across the whole scroll (blueprint §8, scrubbed
 * both ways) and every section revealing once via anime.js ScrollObservers.
 *
 * `background` is a prototype toggle (owner request): the dotted fluid
 * field behind the whole page, for judging against plain bone.
 */
export function LandingPage({ background = "none" }: { background?: LandingBackground }) {
  const scrollSpanRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  // Reduced motion: no rail device at all — the page degrades to
  // finale-only (blueprint §8: the one camera rests by the contact CTA;
  // two cameras never render). No observers are created.
  const reduced = useReducedMotion();

  // The hand-off (blueprint §8: one camera only): the rail silhouette fades
  // out over a scroll band that ends BEFORE the contact overlay's fade-in
  // band begins (see Contact) — the bands are disjoint, so the two devices
  // never render together. Scrubbed with the site-wide sync, it reverses on
  // scroll-up: the rail fades back in as the finale hands back.
  useEffect(() => {
    // Synchronous gate (see Camera.tsx / shared/playbook.md): hydration's
    // server snapshot assumes motion, so the render-gate alone would let
    // this observer be created for reduced-motion visitors and reverted a
    // beat later. No final frame to set here: the reduced render unmounts
    // the rail entirely (finale-only degradation).
    if (reduced || prefersReducedMotion()) return;
    const rail = railRef.current;
    const contactEl = document.getElementById("contact");
    if (!rail || !contactEl) return;
    const anim = animate(rail, {
      opacity: 0,
      ease: easeGlide,
      autoplay: onScroll({
        target: contactEl,
        sync: SCROLL_SYNC,
        enter: "bottom top-=480",
        leave: "bottom top-=260",
      }),
    });
    return () => {
      anim.revert();
    };
  }, [reduced]);

  return (
    <div ref={scrollSpanRef} className="relative">
      {background !== "none" ? (
        <div className="fixed inset-0 z-0">
          <DottedBackground variant={background} className="h-full w-full" />
        </div>
      ) : null}

      <div className="relative z-10">
        <TopBar />
        <main>
          <Hero variant="beside" />
          <About mode="scroll" />
          <CaseTiles mode="scroll" />
          {/* layout follows tokens.md §3.5: radial >= lg, constellation below */}
          <RadialGraph mode="scroll" />
          <Signals mode="scroll" />
          <Contact mode="scroll" />
        </main>
        <Footer mode="scroll" />
      </div>

      {/* The camera's rail: slim edge below md, full rail at md+
          (blueprint §8 mobile rule; sections pad right via the Section
          shell so text never collides with the device). Layered UNDER the
          content layer (z-[5] < z-10) so the opaque emerald hero covers it;
          the device belongs to the bone scroll, not the statement field. */}
      {!reduced ? (
        <div
          ref={railRef}
          aria-hidden="true"
          className="pointer-events-none fixed right-0 top-0 z-[5] h-svh w-rail-sm md:w-rail"
        >
          <Camera mode="scroll" scrollTarget={scrollSpanRef} />
        </div>
      ) : null}
    </div>
  );
}
