"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { useRef } from "react";

/**
 * Componentry's Scroll Split Card, with the demo copy replaced and the
 * shadcn colour tokens swapped for this site's own.
 *
 * One image splits into three panels and flips to reveal what Farhaan
 * actually does. The image is a placeholder and gets replaced with a
 * starry night.
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

  const cardsY = useTransform(scrollYProgress, [0.8, 1], [0, -200]);
  const textOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.8, 1], [40, 0]);
  const startTextOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const startTextY = useTransform(scrollYProgress, [0, 0.1], [0, 20]);

  return (
    <div ref={containerRef} className={cn("relative h-[500vh] w-full", className)}>
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden [perspective:1200px]">
        <motion.div
          className="absolute left-0 right-0 top-[18%] text-center"
          style={{ opacity: startTextOpacity, y: startTextY }}
        >
          <p className="smallcaps text-[14px] text-muted">{cue}</p>
        </motion.div>

        <motion.div
          style={{ scale, y: cardsY, transformStyle: "preserve-3d" }}
          className="relative flex h-[400px] w-full max-w-4xl px-4"
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
                <div
                  className="absolute inset-0 h-full w-[300%]"
                  style={{
                    left: `${-100 * i}%`,
                    backgroundImage: `url(${imageSrc})`,
                    backgroundSize: "100% 100%",
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
                {card.icon && <div className="relative z-10 mb-auto">{card.icon}</div>}
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
            className="absolute bottom-[16%] left-0 right-0 px-6 text-center"
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
