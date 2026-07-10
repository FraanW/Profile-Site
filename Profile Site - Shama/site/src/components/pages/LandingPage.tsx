"use client";

import { animate, onScroll } from "animejs";
import { useEffect, useRef } from "react";
import { Camera } from "@/components/Camera";
import { PullQuote } from "@/components/PullQuote";
import { TopBar } from "@/components/TopBar";
import { SCROLL_SYNC, easeVelvet, prefersReducedMotion, useReducedMotion } from "@/lib/motion";
import { quotes } from "@/content/copy";
import { About } from "@/sections/About";
import { CaseTiles } from "@/sections/CaseTiles";
import { Constellation } from "@/sections/Constellation";
import { Contact } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";
import { Hero } from "@/sections/Hero";
import { Signals } from "@/sections/Signals";

/** A pull-quote in the blackspace between sections (blueprint §6.3),
    aligned with the section shell and clear of the camera rail. */
function QuoteBreak({ children }: { children: React.ReactNode }) {
  return (
    <div className="pl-6 pr-sky-sm md:pr-sky">
      <div className="mx-auto max-w-site">
        <PullQuote mode="scroll">{children}</PullQuote>
      </div>
    </div>
  );
}

/**
 * The landing page in blueprint §5 order: hero → about → case tiles →
 * constellation → signals → contact → footer, with the camera assembling
 * along the right rail across the whole scroll (blueprint §6.2, scrubbed
 * both ways), pull-quotes fading into the blackspace between sections
 * (§6.3), and every section revealing once via anime.js ScrollObservers.
 *
 * The rail is fixed in the sky margin (48px below md, 80px at md+,
 * tokens.md §3.1 — deliberately slimmer than Farhaan's 96px) and layered
 * UNDER the content plane (z-[5] < z-10); sections keep clear of it through
 * the Section shell's right padding, so line-work never collides with text.
 *
 * Reduced motion: no rail device at all — the page degrades to finale-only
 * (blueprint §6.2: the one camera rests assembled by the contact CTA; two
 * cameras never render), quotes and sections at rest, no observers, no
 * shimmer.
 */
export function LandingPage() {
  const scrollSpanRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // The hand-off (blueprint §6.2: one camera only): the rail silhouette
  // fades out over a scroll band that ends BEFORE the contact overlay's
  // fade-in band begins (see Contact) — the bands are disjoint, so the two
  // devices never render together. Scrubbed with the site-wide sync, it
  // reverses on scroll-up: the rail fades back in as the finale hands back.
  useEffect(() => {
    // Synchronous gate (shared/playbook.md): hydration's server snapshot
    // assumes motion, so the render-gate alone would let this observer be
    // created for reduced-motion visitors and reverted a beat later. No
    // final frame to set here: the reduced render unmounts the rail
    // entirely (finale-only degradation).
    if (reduced || prefersReducedMotion()) return;
    const rail = railRef.current;
    const contactEl = document.getElementById("contact");
    if (!rail || !contactEl) return;
    const anim = animate(rail, {
      opacity: 0,
      ease: easeVelvet,
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
      <div className="relative z-10">
        <TopBar />
        <main>
          <Hero />
          <About mode="scroll" />
          <QuoteBreak>{quotes.about}</QuoteBreak>
          <CaseTiles mode="scroll" />
          <Constellation mode="scroll" />
          <QuoteBreak>{quotes.constellation}</QuoteBreak>
          <Signals mode="scroll" />
          <QuoteBreak>{quotes.signals}</QuoteBreak>
          <Contact mode="scroll" />
        </main>
        <Footer mode="scroll" />
      </div>

      {/* The camera's rail: slim right edge below md, full rail at md+
          (blueprint §6.2 mobile rule; sections pad right via the Section
          shell so text never collides with the instrument). Layered UNDER
          the content plane; the black ground is the sky it draws on. */}
      {!reduced ? (
        <div
          ref={railRef}
          aria-hidden="true"
          className="pointer-events-none fixed right-0 top-0 z-[5] h-svh w-sky-sm md:w-sky"
        >
          <Camera mode="scroll" scrollTarget={scrollSpanRef} />
        </div>
      ) : null}
    </div>
  );
}
