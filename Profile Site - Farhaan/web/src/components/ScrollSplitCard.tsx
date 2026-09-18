"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { useRef } from "react";

/**
 * Componentry's Scroll Split Card, with the demo copy replaced and the
 * shadcn colour tokens swapped for this site's own.
 *
 * Van Gogh's The Starry Night splits into three panels and turns over to reveal
 * what Farhaan actually does. The painting's own cobalt and indigo happen to
 * sit inside the site's plasma palette, so the section reads as part of the
 * page rather than as an image dropped into it.
 */

interface ScrollSplitCardItem {
  title: string;
  description: string;
  bgColor: string;
  textColor: string;
  icon?: React.ReactNode;
}

interface ScrollSplitCardProps {
  className?: string;
  imageSrc: string;
  cards: ScrollSplitCardItem[];
  /** Shown before the split begins. */
  cue?: string;
  /** Shown once the cards have turned. */
  closing?: string;
  containerRef?: React.RefObject<HTMLElement | null>;
}

export function ScrollSplitCard({
  className,
  imageSrc,
  cards,
  cue = "Keep scrolling",
  closing,
  containerRef: externalContainerRef,
}: ScrollSplitCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: externalContainerRef,
    offset: ["start start", "end end"],
  });

  // Separate (0 to 0.4), then draw back together while turning (0.4 to 0.8).
  const leftX = useTransform(scrollYProgress, [0, 0.4, 0.8], [0, -48, -24]);
  const rightX = useTransform(scrollYProgress, [0, 0.4, 0.8], [0, 48, 24]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.9]);

  const rotateY = useTransform(scrollYProgress, [0.4, 0.8], [0, 180]);
  const rotateZLeft = useTransform(scrollYProgress, [0.4, 0.8], [0, 6]);
  const rotateZRight = useTransform(scrollYProgress, [0.4, 0.8], [0, -6]);

  // Corners stay square where panels meet, so it reads as one image at rest.
  const borderRadiusLeft = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["16px 0px 0px 16px", "16px 16px 16px 16px"],
  );
  const borderRadiusMiddle = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["0px 0px 0px 0px", "16px 16px 16px 16px"],
  );
  const borderRadiusRight = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["0px 16px 16px 0px", "16px 16px 16px 16px"],
  );
  const borderOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 0.2]);
  const shadowOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 0.4]);
  const boxShadow = useMotionTemplate`inset 0 1px 1px rgba(255, 255, 255, ${borderOpacity}), inset 0 -24px 48px rgba(0, 0, 0, ${shadowOpacity}), 0 25px 50px -12px rgba(0, 0, 0, ${shadowOpacity})`;

  // Less lift than the original: the card is taller now, so the old travel
  // pushed the turned panels off the top of the screen.
  const cardsY = useTransform(scrollYProgress, [0.8, 1], [0, -110]);
  const textOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.8, 1], [40, 0]);
  const startTextOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const startTextY = useTransform(scrollYProgress, [0, 0.1], [0, 20]);

  return (
    <div ref={containerRef} className={cn("relative h-[500vh] w-full", className)}>
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden [perspective:1200px]">
        <motion.div
          className="absolute left-0 right-0 top-[4%] text-center"
          style={{ opacity: startTextOpacity, y: startTextY }}
        >
          <p className="smallcaps text-[14px] text-muted">{cue}</p>
        </motion.div>

        {/*
          Sized to the painting rather than to a convenient rectangle. Starry
          Night is about 1.26:1, so a 400px-tall card at max-w-4xl would have
          squashed it to just over half its proper height.
        */}
        <motion.div
          style={{ scale, y: cardsY, transformStyle: "preserve-3d" }}
          className="relative flex h-[min(64vh,620px)] w-full max-w-3xl px-4"
        >
          {cards.slice(0, 3).map((card, i) => (
            <motion.div
              key={card.title}
              className="relative h-full flex-1"
              style={{
                x: i === 0 ? leftX : i === 2 ? rightX : 0,
                rotateY,
                rotateZ: i === 0 ? rotateZLeft : i === 2 ? rotateZRight : 0,
                zIndex: i,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Front: this panel's slice of the single image. */}
              <motion.div
                className="absolute inset-0 overflow-hidden [backface-visibility:hidden]"
                style={{
                  zIndex: 2,
                  borderRadius:
                    i === 0 ? borderRadiusLeft : i === 2 ? borderRadiusRight : borderRadiusMiddle,
                  boxShadow,
                }}
              >
                {/*
                  This sheet is three panels wide and slid so each panel shows
                  its own third. `cover`, not `100% 100%`: the original stretched
                  the image to whatever shape the card happened to be, which is
                  fine for an abstract gradient and ruinous for a painting.
                */}
                <div
                  className="absolute inset-0 h-full w-[300%]"
                  style={{
                    left: `${-100 * i}%`,
                    backgroundImage: `url(${imageSrc})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </motion.div>

              {/* Back: the skill. */}
              <motion.div
                className={cn(
                  "absolute inset-0 flex flex-col justify-end overflow-hidden p-8 [backface-visibility:hidden] will-change-transform",
                  "border border-white/5 bg-gradient-to-br from-white/10 to-transparent",
                )}
                style={{
                  backgroundColor: card.bgColor,
                  color: card.textColor,
                  transform: "rotateY(180deg)",
                  zIndex: 1,
                  borderRadius:
                    i === 0 ? borderRadiusLeft : i === 2 ? borderRadiusRight : borderRadiusMiddle,
                  boxShadow,
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay"
                  style={{
                    backgroundImage: `url("https://framerusercontent.com/images/6mcf62RlDfRfU61Yg5vb2pefpi4.png?width=256&height=256")`,
                    backgroundRepeat: "repeat",
                  }}
                />
                {card.icon && (
                  // my-auto centres the mark in whatever space the text leaves.
                  <div className="relative z-10 my-auto flex w-full justify-center">
                    {card.icon}
                  </div>
                )}
                <h3 className="display relative z-10 mb-3.5 text-[26px] leading-tight">
                  {card.title}
                </h3>
                <p className="relative z-10 text-[14.5px] leading-relaxed opacity-80">
                  {card.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {closing && (
          <motion.div
            className="absolute bottom-[5%] left-0 right-0 px-6 text-center"
            style={{ opacity: textOpacity, y: textY }}
          >
            <p className="display mx-auto max-w-[24ch] text-[clamp(1.35rem,3vw,2rem)] text-ivory/85">
              {closing}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default ScrollSplitCard;
