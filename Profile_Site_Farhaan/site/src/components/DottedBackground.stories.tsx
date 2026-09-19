import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DottedBackground, type DottedBackgroundVariant } from "./DottedBackground";
import { about } from "@/content/copy";

/**
 * Full-page dotted field prototypes (owner request): judged against plain
 * bone. Each story overlays real serif body text so legibility is judged,
 * not just texture. Palette strictly from tokens; if a variant reads as a
 * particle background instead of drafting paper, it gets toned down or cut.
 */
const meta = {
  title: "Components/DottedBackground",
  component: DottedBackground,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Drafting-paper dot field in rule-faint on bone (bone-muted on emerald). Motion, where present, is anime.js-orchestrated: layered tweens for drift, a createTimer-driven canvas for the cursor ripple. prefers-reduced-motion renders the static frame everywhere.",
      },
    },
  },
} satisfies Meta<typeof DottedBackground>;

export default meta;
type Story = StoryObj<typeof meta>;

function Stage({
  variant,
  onEmerald = false,
}: {
  variant: DottedBackgroundVariant;
  onEmerald?: boolean;
}) {
  return (
    <div className="relative min-h-svh">
      <DottedBackground variant={variant} />
      <div className="relative mx-auto max-w-site px-6 py-24">
        <h2 className={`font-display text-display ${onEmerald ? "text-bone" : "text-ink"}`}>
          Legibility check
        </h2>
        <p className={`mt-6 max-w-prose text-body ${onEmerald ? "text-bone" : "text-ink"}`}>
          {about.body}
        </p>
        <p className={`mt-4 font-mono text-mono ${onEmerald ? "text-bone-muted" : "text-steel"}`}>
          java 21 · spring boot 3.4 · postgres rls · no orm
        </p>
      </div>
    </div>
  );
}

export const DraftingPaper: Story = {
  render: () => <Stage variant="paper" />,
  parameters: {
    docs: { description: { story: "Static control sample: fine rule-faint grid, no motion." } },
  },
};

export const FluidDrift: Story = {
  render: () => <Stage variant="drift" />,
  parameters: {
    docs: {
      description: {
        story:
          "Two layers breathe at ±5px over 16 to 21 seconds. Deliberately ambient: imperceptible unless you look for it. This is the owner's call on the 'nothing floats idle' rule; if it ships, the blueprint gets an amendment note.",
      },
    },
  },
};

export const CursorRipple: Story = {
  render: () => <Stage variant="ripple" />,
  parameters: {
    docs: {
      description: {
        story:
          "Dots lift near the pointer and settle after (canvas, anime.js createTimer loop; the timer pauses once settled). Fine-pointer devices only; touch devices get the static grid.",
      },
    },
  },
};

export const EmeraldField: Story = {
  render: () => <Stage variant="emerald" onEmerald />,
  parameters: {
    docs: {
      description: {
        story: "The hero-ground adaptation: bone-muted dots at half opacity on emerald.",
      },
    },
  },
};
