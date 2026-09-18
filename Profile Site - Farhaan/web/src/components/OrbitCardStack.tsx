"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Componentry's Orbit Card Stack, rewired.
 *
 * The original fans on hover. Farhaan wanted the deck to scatter as you
 * scroll down and gather back up as you scroll up, so the spread is driven by
 * scroll progress rather than pointer state. Hover no longer moves anything;
 * it only lifts the card you are pointing at, which keeps the deck readable
 * while you decide where to click.
 *
 * Each card is a real link. Nothing here is decorative.
 */

export interface OrbitStackItem {
  label: string;
  handle: string;
  description: string;
  href: string;
  accent: string;
  mark: "github" | "linkedin" | "mail";
}

const marks: Record<OrbitStackItem["mark"], React.ReactNode> = {
  github: (
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
  ),
  linkedin: (
    <>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4v11H3v-11Z" />
      <path d="M10 9.5h3.8v1.5h.05c.53-.95 1.83-1.95 3.76-1.95 4.02 0 4.76 2.5 4.76 5.76v6.19h-4v-5.49c0-1.31-.02-3-1.9-3-1.9 0-2.19 1.42-2.19 2.9v5.59h-4v-11Z" />
    </>
  ),
  mail: (
    <path d="M3 5.5h18a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1Zm.9 2 8.1 5.4 8.1-5.4H3.9Z" />
  ),
};

function StackCard({
  item,
  index,
  total,
  spread,
  progress,
  reduceMotion,
}: {
  item: OrbitStackItem;
  index: number;
  total: number;
  spread: number;
  progress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const midpoint = (total - 1) / 2;
  const orbit = index - midpoint;

  // Closed: a tight deck, barely offset. Open: fanned across the stage.
  const closedX = orbit * 12;
  const closedY = Math.abs(orbit) * 6;
  const closedRotate = orbit * 3;

  // Far enough apart that all three read at once. A fan that still overlaps
  // is just a messier deck.
  const openX = orbit * spread;
  const openY = Math.abs(orbit) * 18;
  const openRotate = orbit * 5.5;

  const x = useTransform(progress, [0, 1], [closedX, reduceMotion ? closedX : openX]);
  const y = useTransform(progress, [0, 1], [closedY, reduceMotion ? closedY : openY]);
  const rotate = useTransform(progress, [0, 1], [closedRotate, reduceMotion ? closedRotate : openRotate]);

  return (
    <motion.a
      href={item.href}
      target={item.href.startsWith("mailto:") ? undefined : "_blank"}
      rel={item.href.startsWith("mailto:") ? undefined : "noreferrer noopener"}
      style={{ x, y, rotate, zIndex: total - Math.abs(orbit) }}
      className={cn(
        "group absolute left-1/2 top-1/2 w-[min(78vw,20rem)] -translate-x-1/2 -translate-y-1/2",
        "border border-ivory/12 bg-plasma-b/85 p-6 backdrop-blur-sm",
        "transition-[border-color,background-color,box-shadow] duration-300",
        "hover:border-signal/45 hover:bg-plasma-b focus-visible:border-signal",
        "shadow-[0_24px_60px_-24px_rgba(0,0,0,0.75)]",
      )}
    >
      <div className="flex items-start justify-between">
        <svg
          viewBox="0 0 24 24"
          width="28"
          height="28"
          fill="currentColor"
          aria-hidden="true"
          style={{ color: item.accent }}
        >
          {marks[item.mark]}
        </svg>
        <svg
          viewBox="0 0 16 16"
          width="15"
          height="15"
          aria-hidden="true"
          className="text-ivory/40 transition-colors group-hover:text-signal"
        >
          <path
            d="M4 12L12 4M12 4H5.5M12 4v6.5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>

      <p className="display mt-10 text-[25px] leading-none text-ivory">{item.label}</p>
      <p className="mt-2.5 text-[13.5px] text-ivory/50">{item.handle}</p>
      <p className="mt-5 border-t border-ivory/12 pt-5 text-[14.5px] leading-relaxed text-ivory/75">
        {item.description}
      </p>
    </motion.a>
  );
}

export function OrbitCardStack({
  items,
  className,
  spread = 306,
}: {
  items: OrbitStackItem[];
  className?: string;
  spread?: number;
}) {
  const reduceMotion = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [fitSpread, setFitSpread] = useState(spread);

  // The deck is stacked when the section enters the viewport and fully fanned
  // by the time it leaves. Scrolling back up runs it in reverse.
  // Stacked when the deck first appears at the bottom of the screen, fully
  // fanned once its top reaches the middle. That completes with plenty of
  // page left, so the deck is never caught half-open at the footer.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start center"],
  });

  // Narrow screens cannot hold a three-card fan. Shrink the spread to fit
  // rather than letting cards sail off the edge.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const measure = () => {
      const stageWidth = stage.clientWidth;
      const cardWidth = Math.min(stageWidth * 0.78, 320);
      const room = (stageWidth - cardWidth) / 2;
      setFitSpread(Math.max(14, Math.min(spread, room)));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    return () => observer.disconnect();
  }, [spread]);

  return (
    <div
      ref={sectionRef}
      className={cn("relative flex w-full items-center justify-center", className)}
    >
      <div ref={stageRef} className="relative h-[380px] w-full max-w-[980px]">
        {items.map((item, index) => (
          <StackCard
            key={item.href}
            item={item}
            index={index}
            total={items.length}
            spread={fitSpread}
            progress={scrollYProgress}
            reduceMotion={reduceMotion}
          />
        ))}
      </div>
    </div>
  );
}

export default OrbitCardStack;
