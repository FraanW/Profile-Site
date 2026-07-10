import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { animate, svg, utils } from "animejs";
import { useRef } from "react";
import {
  DURATION,
  SCROLL_SYNC,
  SHIMMER,
  easeKindle,
  easeTrace,
  easeVelvet,
  prefersReducedMotion,
} from "@/lib/motion";
import { STAR, VIOLET_INK } from "@/lib/palette";

/**
 * The motion vocabulary, live (tokens.md §4). Three eases, the duration
 * scale, one engine: anime.js v4, luxe tempo. Click a tile to replay its
 * move.
 */
const meta = {
  title: "Foundation/Motion",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "anime.js v4 is the sole engine: no CSS keyframes, no CSS transitions, no Framer Motion, and no spring (tokens.md §4.1 ruling: the camera's finale glides on velvet; identical spring physics on a shared device is the same-template failure the mitigations exist to prevent). Scroll reveals fire once; hover is the only repeatable motion; the idle shimmer is the one caged loop. prefers-reduced-motion renders final frames and creates no observers (these demos go inert).",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function DemoTile({
  label,
  note,
  onPlay,
  children,
}: {
  label: string;
  note: string;
  onPlay: (el: HTMLDivElement) => void;
  children: React.ReactNode;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  return (
    <button
      type="button"
      onClick={() => {
        if (prefersReducedMotion() || !stageRef.current) return;
        onPlay(stageRef.current);
      }}
      className="border border-rule-faint bg-card p-6 text-left"
    >
      <p className="font-mono text-mono font-medium text-moon">{label}</p>
      <p className="mt-1 font-mono text-plaque text-violet-ink">{note} · click to replay</p>
      <div ref={stageRef} className="mt-5 h-16">
        {children}
      </div>
    </button>
  );
}

const Box = () => <div data-demo className="h-8 w-8 border border-violet-ink" />;
const Star = () => (
  <div
    data-demo
    className="rounded-star h-3 w-3"
    style={{ backgroundColor: STAR, transformOrigin: "center" }}
  />
);

export const Eases: Story = {
  name: "Named eases",
  render: () => (
    <div className="grid max-w-site gap-6 md:grid-cols-3">
      <DemoTile
        label="velvet"
        note="cubic-bezier(0.45, 0.05, 0.15, 1) · entries, reveals, quote fades, the finale glide, the shimmer swell · heavy curtains, not spring hinges"
        onPlay={(stage) => {
          const box = stage.querySelector("[data-demo]");
          if (!box) return;
          utils.set(box, { translateX: 0, opacity: 0.3 });
          animate(box, {
            translateX: 180,
            opacity: 1,
            duration: DURATION.enter * 2,
            ease: easeVelvet,
          });
        }}
      >
        <Box />
      </DemoTile>

      <DemoTile
        label="trace"
        note="cubic-bezier(0.6, 0.05, 0.25, 1) · svg line drawing only · a hand laying a line"
        onPlay={(stage) => {
          const line = stage.querySelector("path");
          if (!line) return;
          const [d] = svg.createDrawable(line);
          utils.set(d, { draw: "0 0" });
          animate(d, { draw: "0 1", duration: DURATION.draw, ease: easeTrace });
        }}
      >
        <svg viewBox="0 0 220 40" className="h-full w-full" aria-hidden="true">
          <path
            d="M4 32 C 60 32, 60 8, 110 8 S 176 32, 216 32"
            fill="none"
            stroke={VIOLET_INK}
            strokeWidth="1"
            style={{ vectorEffect: "non-scaling-stroke" }}
          />
        </svg>
      </DemoTile>

      <DemoTile
        label="kindle"
        note="cubic-bezier(0.3, 1.35, 0.45, 1) · triggered emission + stars ONLY · ~6% overshoot, light catching"
        onPlay={(stage) => {
          const star = stage.querySelector("[data-demo]");
          if (!star) return;
          utils.set(star, { opacity: 0, scale: 0.4, backgroundColor: STAR });
          animate(star, {
            opacity: 1,
            scale: 1,
            duration: DURATION.enter,
            ease: easeKindle,
          });
        }}
      >
        <div className="flex h-full items-center pl-4">
          <Star />
        </div>
      </DemoTile>
    </div>
  ),
};

export const Durations: Story = {
  name: "Duration scale",
  render: () => (
    <div className="grid max-w-site gap-6 md:grid-cols-2">
      {(
        [
          ["glint", DURATION.glint, "hovers: link glints, star pops, underline shifts"],
          ["enter", DURATION.enter, "section content reveals, quote fades (velvet)"],
          ["draw", DURATION.draw, "an edge set or statement rule tracing in; the finale glide"],
          ["finale", DURATION.finale, "hard budget: camera glide + aperture blink + capture flash"],
        ] as const
      ).map(([name, ms, duty]) => (
        <DemoTile
          key={name}
          label={`${name} · ${ms}ms`}
          note={duty}
          onPlay={(stage) => {
            const box = stage.querySelector("[data-demo]");
            if (!box) return;
            utils.set(box, { translateX: 0 });
            animate(box, { translateX: 180, duration: ms, ease: easeVelvet });
          }}
        >
          <Box />
        </DemoTile>
      ))}
      <div className="border border-rule-faint bg-card p-6">
        <p className="font-mono text-mono font-medium text-moon">
          shimmer · {SHIMMER.swell}ms swell · {SHIMMER.lull}ms ±{SHIMMER.jitter * 100}% lull
        </p>
        <p className="mt-1 font-mono text-plaque text-violet-ink">
          the idle shimmer&apos;s clock (tokens.md §4.4); live in Sections/Constellation,
          documented in Foundation/Emission
        </p>
      </div>
    </div>
  ),
};

export const ScrollScrub: Story = {
  name: "The scroll-sync scalar",
  render: () => (
    <div className="max-w-prose border border-rule-faint bg-card p-6">
      <p className="font-mono text-mono font-medium text-moon">--scroll-sync: {SCROLL_SYNC}</p>
      <p className="mt-3 text-body-sm text-moon">
        The camera&apos;s assembly scrub is the one scroll-synced motion on the site:
        bidirectional, smoothed with this single site-wide value, so the drifting parts
        trail the scroll like a heavier hand. 0.15 against Farhaan&apos;s 0.2 — on a shared
        device this gap is load-bearing: same scrub mechanics, measurably different weight.
        Never below 0.1, never per-section overrides.
      </p>
      <p className="mt-3 font-mono text-plaque text-violet-ink">
        the finale is NOT scroll-synced: a triggered timeline, once, inside 2600ms — glide
        on velvet, blink and flash on kindle. see Components/Camera and Sections/Contact.
      </p>
    </div>
  ),
};

export const ReducedMotion: Story = {
  name: "Reduced motion contract",
  render: () => (
    <div className="max-w-prose border border-rule-faint bg-card p-6">
      <p className="font-mono text-mono font-medium text-moon">prefers-reduced-motion: reduce</p>
      <p className="mt-3 text-body-sm text-moon">
        Every animated element has a final-frame static state. Matching users get all final
        frames: rules at full width, all stars lit star-white, the constellation fully
        drawn, no shimmer (the scope is never created), the camera parked assembled beside
        the CTA (no rail, no scrub, no flash), and no ScrollObservers are created at all.
        The scopes are gated synchronously, not paused.
      </p>
      <p className="mt-3 font-mono text-plaque text-violet-ink">
        status here:{" "}
        {typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "reduce (demos inert)"
          : "no-preference (demos live)"}
      </p>
    </div>
  ),
};
