import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { createTimeline } from "animejs";
import { useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";
import { Camera, CameraGlyph, addCaptureFlash } from "./Camera";

/**
 * The rail device (blueprint §6.2, owner decision 2026-07-11: the DSLR from
 * Farhaan's site runs here too, drawn in THIS site's system). An exploded
 * engineering drawing — orthographic, no fills, no labels — in violet-ink
 * with violet-deep receded strokes at 1.25/1 weights, on the black canvas.
 * Parts fade into existence, draw themselves in (trace), and drift together
 * (velvet) under the bidirectional scroll scrub.
 */
const meta = {
  title: "Components/Camera",
  component: Camera,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "The shared-device mitigations, visible here: violet line-work on black vs his emerald on bone, 1.25/1 stroke weights vs his 1.5/1, velvet/trace tempo vs buttery, and a white-and-violet capture flash vs leaf-green. On the landing page the rail hands off to the contact glyph over disjoint scroll bands: one camera on screen at every scroll position.",
      },
    },
  },
  argTypes: {
    progress: { control: { type: "range", min: 0, max: 1, step: 0.01 } },
  },
} satisfies Meta<typeof Camera>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RailScrub: Story = {
  name: "Rail assembly (scrub me)",
  args: { mode: "scrub", progress: 0.55 },
  render: (args) => (
    <div className="flex items-start gap-8">
      <div className="h-[560px] w-sky border border-rule-faint bg-night md:w-sky">
        <Camera {...args} />
      </div>
      <p className="max-w-narrow font-mono text-plaque text-violet-ink">
        the progress control stands in for the page scroll: 0 is an empty rail, ~0.63 is
        the complete silhouette (the signals section on the landing page), 1 holds the
        assembled rest. on the real page the scrub is bidirectional and smoothed with the
        site-wide sync value.
      </p>
    </div>
  ),
};

export const RailAssembled: Story = {
  name: "Assembled (static frame)",
  args: { mode: "static" },
  render: (args) => (
    <div className="h-[560px] w-sky border border-rule-faint bg-night">
      <Camera {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The final frame: every part seated, every stroke drawn. This is also what a reduced-motion visitor never sees on the rail — their camera is parked at the CTA instead (finale-only degradation).",
      },
    },
  },
};

export const GlyphFlash: Story = {
  name: "The capture flash (click to fire)",
  render: function GlyphFlashStory() {
    const stageRef = useRef<HTMLDivElement>(null);
    const fire = () => {
      const glyph = stageRef.current?.querySelector("[data-camera-glyph]");
      if (!glyph || prefersReducedMotion()) return;
      addCaptureFlash(createTimeline(), glyph);
    };
    return (
      <div className="flex items-start gap-8">
        <div ref={stageRef} className="border border-rule-faint bg-night p-16">
          <CameraGlyph width={120} />
        </div>
        <div className="max-w-narrow">
          <button
            type="button"
            onClick={fire}
            className="border border-rule-faint bg-card px-3 py-1.5 font-mono text-plaque text-violet-ink"
          >
            fire the capture flash
          </button>
          <p className="mt-4 font-mono text-plaque text-violet-ink">
            the site&apos;s one finale-scale emission moment: blades snap (kindle), then the
            flash — star-white core, loud-violet rays, ring, corner glints, and the
            bg-emission bloom — pops on kindle and decays on velvet. drawn rays are legal
            here only: a photographic one-shot, not a state (tokens.md §1.4). fires once
            per page visit on the real page.
          </p>
        </div>
      </div>
    );
  },
};

export const InkAndWeights: Story = {
  name: "Ink and weights",
  render: () => (
    <div className="flex items-start gap-8">
      <div className="border border-rule-faint bg-night p-10">
        <CameraGlyph width={160} />
      </div>
      <ul className="max-w-narrow space-y-2 font-mono text-plaque text-violet-ink">
        <li>primary strokes (body, lens, prism): violet-ink at 1.25 — the instrument</li>
        <li>detail strokes (iris blades): violet-ink at 1</li>
        <li>receded strokes (aperture ring): violet-deep at 1, non-text 3:1</li>
        <li>loud violet touches the camera only when it is alive: the blink and the flash</li>
        <li>no fills, no sub-pixel strokes, non-scaling stroke throughout</li>
        <li>1.25 is the ceiling: if the hierarchy compresses, the fix is fewer detail lines, never a fatter primary</li>
      </ul>
    </div>
  ),
};
