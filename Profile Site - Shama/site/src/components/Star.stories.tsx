import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { animate, stagger, utils } from "animejs";
import { useRef } from "react";
import { DURATION, STAGGER_STEP, easeKindle, prefersReducedMotion } from "@/lib/motion";
import { VIOLET } from "@/lib/palette";
import { StarMark, starGlint } from "./Star";

/**
 * The point of light (tokens.md §3.3): the site's one circle, minted in one
 * place. Star-white at rest, always — the violet is what a star emits,
 * never what it is.
 */
const meta = {
  title: "Components/Star",
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const PointsOfLight: Story = {
  render: () => (
    <div className="flex items-end gap-10 bg-night p-8">
      {[4, 6, 8, 10, 12].map((size) => (
        <div key={size} className="flex flex-col items-center gap-3">
          <StarMark size={size} />
          <span className="font-mono text-plaque text-violet-ink">{size}px</span>
        </div>
      ))}
    </div>
  ),
};

export const HoverGlint: Story = {
  name: "The glint (hover me)",
  parameters: {
    docs: {
      description: {
        story:
          "starGlint: loud violet PLUS a scale pop (two channels), kindle ease at glint duration. Hover is the only repeatable motion on the site.",
      },
    },
  },
  render: () => (
    <div
      className="inline-flex cursor-pointer items-center gap-4 border border-rule-faint bg-card p-8"
      onMouseEnter={(e) => {
        const star = e.currentTarget.querySelector("[data-demo-star]");
        if (star) starGlint(star, true);
      }}
      onMouseLeave={(e) => {
        const star = e.currentTarget.querySelector("[data-demo-star]");
        if (star) starGlint(star, false);
      }}
    >
      <StarMark data-demo-star="" size={10} />
      <span className="font-mono text-mono text-moon">
        hover this plaque: the star emits violet
      </span>
    </div>
  ),
};

export const KindleOnDemand: Story = {
  name: "The kindle (click to replay)",
  render: function KindleStory() {
    const stageRef = useRef<HTMLDivElement>(null);
    const play = () => {
      const stage = stageRef.current;
      if (!stage || prefersReducedMotion()) return;
      const stars = stage.querySelectorAll("[data-demo-star]");
      utils.set(stars, { opacity: 0, scale: 0.4 });
      animate(stars, {
        opacity: 1,
        scale: 1,
        duration: DURATION.enter,
        ease: easeKindle,
        delay: stagger(STAGGER_STEP),
      });
    };
    return (
      <button
        type="button"
        onClick={play}
        className="border border-rule-faint bg-card p-8 text-left"
      >
        <p className="font-mono text-plaque text-violet-ink">
          stars kindle one by one · kindle ease, enter duration, 110ms stagger · click to replay
        </p>
        <div ref={stageRef} className="mt-6 flex items-center gap-8">
          {[7, 5, 9, 6, 8, 5].map((s, i) => (
            <StarMark key={i} data-demo-star="" size={s} />
          ))}
        </div>
      </button>
    );
  },
};

export const WhiteNotViolet: Story = {
  name: "White, not violet",
  parameters: {
    docs: {
      description: {
        story:
          "The dosage law applied to stars (tokens.md §1.3 rule 1): stars are white, full stop; a glinted star returns to star-white. Loud violet touches a star only while it is emitting — hover, the shimmer's halo, the finale — and leaves with the moment.",
      },
    },
  },
  render: () => (
    <div className="flex max-w-prose flex-col gap-6 bg-night p-8">
      <div className="flex items-center gap-4">
        <StarMark size={9} />
        <span className="font-mono text-plaque text-violet-ink">
          at rest: star-white — the star&apos;s permanent state
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span
          className="rounded-star block shrink-0"
          style={{ width: 11, height: 11, backgroundColor: VIOLET }}
        />
        <span className="font-mono text-plaque text-violet-ink">
          emitting: loud violet + scale pop, transient only (static render for inspection)
        </span>
      </div>
    </div>
  ),
};
