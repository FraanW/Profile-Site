import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { quotes } from "@/content/copy";
import { PullQuote } from "./PullQuote";

/**
 * The pull-quote (blueprint §6.3): the between-sections editorial voice.
 * Playfair Display 500 italic, dim ink, 40ch, night ground only. Every line
 * is a TODO(Lefler) stand-in themed on building business prototypes from
 * scratch to scale; never an attributed testimonial.
 */
const meta = {
  title: "Components/PullQuote",
  component: PullQuote,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Fades into existence once on scroll-into-view — opacity only, velvet, then still. No sliding, no letter-by-letter reveals, no loops, no attribution, ever.",
      },
    },
  },
  args: { mode: "mount", children: quotes.hero },
} satisfies Meta<typeof PullQuote>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: { description: { story: "The hero's line, fading in on mount." } },
  },
};

export const AllFourSlots: Story = {
  name: "All four slots",
  render: () => (
    <div className="space-y-16 py-8">
      {(
        [
          ["hero", quotes.hero],
          ["after about", quotes.about],
          ["after the constellation", quotes.constellation],
          ["after signals", quotes.signals],
        ] as const
      ).map(([slot, line]) => (
        <div key={slot}>
          <p className="mb-3 font-mono text-plaque text-violet-ink">{slot} · todo: lefler</p>
          <PullQuote mode="none">{line}</PullQuote>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The prototype's four placements (case tiles and contact deliberately carry none). Dwight prunes any quote that feels forced; a quote under every section is its own slop pattern.",
      },
    },
  },
};

export const InTheBlackspace: Story = {
  name: "In the blackspace",
  render: () => (
    <div className="bg-night">
      <div className="border-b border-rule px-6 py-16">
        <p className="max-w-prose text-body text-moon">
          ...the tail of one section&apos;s reading text, ending where the section ends.
        </p>
      </div>
      <div className="px-6 py-14">
        <PullQuote mode="mount">{quotes.constellation}</PullQuote>
      </div>
      <div className="border-t border-rule px-6 py-16">
        <p className="max-w-prose text-body text-moon">
          ...and the head of the next section. The quote lives in the walk between rooms.
        </p>
      </div>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story: "The device in context: a murmur between sections, not a headline.",
      },
    },
  },
};
