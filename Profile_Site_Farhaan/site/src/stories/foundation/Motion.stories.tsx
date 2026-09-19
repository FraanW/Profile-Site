import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { animate, svg, utils } from "animejs";
import { useRef } from "react";
import {
  DURATION,
  easeDraw,
  easeGlide,
  prefersReducedMotion,
  springLift,
} from "@/lib/motion";

/**
 * The motion vocabulary, live (tokens.md §4). Three eases, four durations,
 * one engine: anime.js v4. Click a tile to replay its move.
 */
const meta = {
  title: "Foundation/Motion",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "anime.js v4 is the sole engine: no CSS keyframes, no CSS transitions, no Framer Motion. Scroll reveals fire once; hover is the only repeatable motion. prefers-reduced-motion renders final frames and creates no observers (these demos go inert).",
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
      <p className="font-mono text-mono font-medium text-ink">{label}</p>
      <p className="mt-1 font-mono text-label text-steel">{note} · click to replay</p>
      <div ref={stageRef} className="mt-5 h-16">
        {children}
      </div>
    </button>
  );
}

const Box = () => <div data-demo className="h-8 w-8 bg-emerald" />;

export const Eases: Story = {
  name: "Named eases",
  render: () => (
    <div className="grid max-w-site gap-6 md:grid-cols-3">
      <DemoTile
        label="glide"
        note="cubic-bezier(0.22, 1, 0.36, 1) · every entry and reveal"
        onPlay={(stage) => {
          const box = stage.querySelector("[data-demo]");
          if (!box) return;
          utils.set(box, { translateX: 0, opacity: 0.4 });
          animate(box, { translateX: 180, opacity: 1, duration: DURATION.enter * 2, ease: easeGlide });
        }}
      >
        <Box />
      </DemoTile>

      <DemoTile
        label="draw"
        note="cubic-bezier(0.65, 0, 0.35, 1) · svg line drawing only"
        onPlay={(stage) => {
          const line = stage.querySelector("path");
          if (!line) return;
          const [d] = svg.createDrawable(line);
          utils.set(d, { draw: "0 0" });
          animate(d, { draw: "0 1", duration: DURATION.draw, ease: easeDraw });
        }}
      >
        <svg viewBox="0 0 220 40" className="h-full w-full" aria-hidden="true">
          <path
            d="M4 32 C 60 32, 60 8, 110 8 S 176 32, 216 32"
            fill="none"
            stroke="#065F46"
            strokeWidth="1.5"
            style={{ vectorEffect: "non-scaling-stroke" }}
          />
        </svg>
      </DemoTile>

      <DemoTile
        label="lift"
        note="spring 1/80/14 · the camera's finale, nothing else"
        onPlay={(stage) => {
          const box = stage.querySelector("[data-demo]");
          if (!box) return;
          utils.set(box, { translateX: 180, translateY: -34, rotate: -14 });
          animate(box, { translateX: 0, translateY: 0, rotate: 0, ease: springLift() });
        }}
      >
        <Box />
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
          ["micro", DURATION.micro, "hovers: underlines, ring fills, nudges"],
          ["enter", DURATION.enter, "section content reveals"],
          ["draw", DURATION.draw, "a rule, edge set, or ring drawing in"],
          ["flight", DURATION.flight, "hard budget: hero self-draw and finale"],
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
            animate(box, { translateX: 180, duration: ms, ease: easeGlide });
          }}
        >
          <Box />
        </DemoTile>
      ))}
    </div>
  ),
};

export const ReducedMotion: Story = {
  name: "Reduced motion contract",
  render: () => (
    <div className="max-w-prose border border-rule-faint bg-card p-6">
      <p className="font-mono text-mono font-medium text-ink">prefers-reduced-motion: reduce</p>
      <p className="mt-3 text-body-sm text-ink">
        Every animated element has a final-frame static state. Matching users get all final
        frames: rules at full width, edges drawn, the camera at rest by the CTA, and no
        ScrollObservers are created at all. The scopes are gated, not paused.
      </p>
      <p className="mt-3 font-mono text-label text-steel">
        status here: {typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "reduce (demos inert)" : "no-preference (demos live)"}
      </p>
    </div>
  ),
};
