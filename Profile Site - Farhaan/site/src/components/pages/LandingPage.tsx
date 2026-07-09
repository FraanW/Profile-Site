"use client";

import { useRef } from "react";
import { useReducedMotion } from "@/lib/motion";
import { Airplane } from "@/components/Airplane";
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
 * radial graph → signals → contact → footer, with the airplane assembling
 * along the right rail across the whole scroll (blueprint §8) and every
 * section revealing once via anime.js ScrollObservers.
 *
 * `background` is a prototype toggle (owner request): the dotted fluid
 * field behind the whole page, for judging against plain bone.
 */
export function LandingPage({ background = "none" }: { background?: LandingBackground }) {
  const scrollSpanRef = useRef<HTMLDivElement>(null);
  // Reduced motion: the rail shows the finished plane, nothing observes.
  const railStatic = useReducedMotion();

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
          <RadialGraph layout="radial" mode="scroll" />
          <Signals mode="scroll" />
          <Contact mode="scroll" />
        </main>
        <Footer mode="scroll" />
      </div>

      {/* The airplane's rail: slim edge below md, full rail at md+
          (blueprint §8 mobile rule; sections pad right via the Section
          shell so text never collides with the device). Layered UNDER the
          content plane (z-[5] < z-10) so the opaque emerald hero covers it;
          the device belongs to the bone scroll, not the statement field. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed right-0 top-0 z-[5] h-svh w-rail-sm md:w-rail"
      >
        <Airplane
          variant="fighter"
          mode={railStatic ? "static" : "scroll"}
          scrollTarget={scrollSpanRef}
        />
      </div>
    </div>
  );
}
