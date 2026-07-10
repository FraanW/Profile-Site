import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CARD } from "@/lib/palette";

/**
 * Palette v2 — black canvas, white stars, violet light (tokens.md §1).
 * Every swatch shows its computed WCAG contrast pairings; ratios are
 * Riker's audited figures, not estimates.
 */
const meta = {
  title: "Foundation/Colors",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Shama's brief, verbatim: black, white, purple; black being main; the stars are white and emit purple hue sometimes. One black ground, two whites split by duty, one violet family for everything alive or drawn. If a color is not here, it does not exist on the site: the @theme block wipes Tailwind's default palette.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

type Swatch = {
  token: string;
  hex: string;
  role: string;
  pairings: { on: string; ratio: string; verdict: string }[];
  darkText?: boolean;
};

const SWATCHES: Swatch[] = [
  {
    token: "night",
    hex: "#000000",
    role: "ground: literal black, and only the ground. On OLED it is pixels-off, which is what makes the violet burn",
    pairings: [{ on: "as ground for moon", ratio: "17.04:1", verdict: "AAA all sizes" }],
  },
  {
    token: "card",
    hex: "#0D0D10",
    role: "plaque/card surface, the only field the site has; always with a rule-faint border (the 1.08:1 step is deliberately subliminal)",
    pairings: [{ on: "as ground for moon", ratio: "15.75:1", verdict: "AAA all sizes" }],
  },
  {
    token: "star",
    hex: "#F7F5FA",
    role: "stars and display text. White with a whisper-cool cast: starlight, not paper. The brightest thing on the site",
    darkText: true,
    pairings: [
      { on: "night", ratio: "19.40:1", verdict: "AAA all sizes" },
      { on: "card", ratio: "17.92:1", verdict: "AAA all sizes" },
    ],
  },
  {
    token: "moon",
    hex: "#E9E6F0",
    role: "all reading text: a half-step under star, to damp halation over long paragraphs on true black",
    darkText: true,
    pairings: [
      { on: "night", ratio: "17.04:1", verdict: "AAA all sizes" },
      { on: "card", ratio: "15.75:1", verdict: "AAA all sizes" },
    ],
  },
  {
    token: "dim",
    hex: "#C8C1DC",
    role: "the far star: quote register ink ONLY. Not a body text color, not an accent",
    darkText: true,
    pairings: [{ on: "night", ratio: "12.12:1", verdict: "AAA; the register is always large text" }],
  },
  {
    token: "violet",
    hex: "#A886FF",
    role: "the loud violet: ALIVE ONLY. Hover glints, active, focus, emission, flash rays. Never at rest",
    darkText: true,
    pairings: [
      { on: "night", ratio: "7.52:1", verdict: "AA normal text; 2.5x margin on non-text 3:1" },
      { on: "card", ratio: "6.95:1", verdict: "AA normal text" },
    ],
  },
  {
    token: "violet-ink",
    hex: "#9165FF",
    role: "the working violet: drawn or labeled, at rest. Edges, camera strokes, statement rules, plaque labels, links",
    darkText: true,
    pairings: [
      { on: "night", ratio: "5.51:1", verdict: "AA normal text (binding check 1)" },
      { on: "card", ratio: "5.09:1", verdict: "AA normal text (binding check 2; forced the lift from #8B5CF6)" },
    ],
  },
  {
    token: "violet-deep",
    hex: "#7C3AED",
    role: "the deep end: receded line-work only, NEVER text",
    pairings: [
      { on: "night", ratio: "3.69:1", verdict: "non-text 3:1 only" },
      { on: "card", ratio: "3.41:1", verdict: "non-text 3:1 only" },
    ],
  },
  {
    token: "rule",
    hex: "#2B2340",
    role: "quiet ruling: signals rows, structural hairlines. Carries no text, no meaning",
    pairings: [{ on: "night", ratio: "1.42:1", verdict: "decorative only" }],
  },
  {
    token: "rule-faint",
    hex: "#1B1626",
    role: "faintest ruling: card borders, photo border",
    pairings: [{ on: "night", ratio: "1.19:1", verdict: "decorative only" }],
  },
  {
    token: "selection",
    hex: "#2E2452",
    role: "::selection ONLY: transient, user-cast — light the reader casts, not a field the site paints",
    pairings: [{ on: "as ground for star", ratio: "13.01:1", verdict: "AAA all sizes" }],
  },
];

export const Palette: Story = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-2">
      {SWATCHES.map((s) => (
        <div key={s.token} className="border border-rule-faint bg-card">
          <div
            className="flex h-24 items-end justify-between border-b border-rule-faint px-4 py-3"
            style={{ backgroundColor: s.hex }}
          >
            {/* Dark caption ink on the light swatches is the card hex: pure
                black may exist only as the ground token (tokens.md 1.3.2). */}
            <span
              className={`font-mono text-mono font-medium ${s.darkText ? "" : "text-star"}`}
              style={s.darkText ? { color: CARD } : undefined}
            >
              --color-{s.token}
            </span>
            <span
              className={`font-mono text-plaque ${s.darkText ? "" : "text-star"}`}
              style={s.darkText ? { color: CARD } : undefined}
            >
              {s.hex}
            </span>
          </div>
          <div className="p-4">
            <p className="text-body-sm text-moon">{s.role}</p>
            <ul className="mt-2 space-y-1">
              {s.pairings.map((p) => (
                <li key={p.on + p.ratio} className="font-mono text-plaque text-violet-ink">
                  on {p.on}: {p.ratio} · {p.verdict}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  ),
};

export const ContrastPairs: Story = {
  name: "Contrast pairings, live",
  render: () => (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="bg-night p-6">
        <p className="font-display text-title text-star">Star on night, 19.40:1.</p>
        <p className="mt-2 text-body text-moon">moon on night, 17.04:1. The reading voice.</p>
        <p className="mt-2 font-mono text-mono text-violet-ink">
          violet-ink on night, 5.51:1 · labels and line-work at rest
        </p>
        <p className="mt-2 font-quote text-quote italic text-dim">
          Dim on night, 12.12:1. The quote voice.
        </p>
      </div>
      <div className="border border-rule-faint bg-card p-6">
        <p className="text-body text-moon">moon on card, 15.75:1.</p>
        <p className="mt-2 font-mono text-plaque text-violet-ink">
          violet-ink plaque on card, 5.09:1 · the binding check that lifted the ink
        </p>
        <p className="mt-4 font-mono text-plaque text-moon">
          violet-deep never carries text; see it as receded line-work in the constellation
          and the camera.
        </p>
      </div>
    </div>
  ),
};

export const VioletDosage: Story = {
  name: "The violet dosage law",
  parameters: {
    docs: {
      description: {
        story:
          "Three steps, three duties, no leakage (tokens.md §1.3 rule 1). The screenshot test binds: any viewport that reads as a purple site instead of a black site with purple light fails Shama's brief.",
      },
    },
  },
  render: () => (
    <div className="max-w-prose space-y-6">
      <div className="border border-rule-faint bg-card p-6">
        <p className="font-mono text-plaque text-violet-ink">the ramp, by duty</p>
        <p className="mt-3 font-mono text-mono">
          <span className="text-violet">loud violet is alive or absent</span>
          <span className="text-moon"> · hover, active, focus, emission, flash rays (shown here as documentation, never at rest in the UI)</span>
        </p>
        <p className="mt-2 font-mono text-mono">
          <span className="text-violet-ink">violet-ink is drawn or labeled</span>
          <span className="text-moon"> · line-work and small mono labels, at rest is fine, never a paragraph</span>
        </p>
        <p className="mt-2 font-mono text-mono">
          <span className="text-moon">violet-deep is receded line-work only, never text:</span>
        </p>
        <svg viewBox="0 0 300 12" className="mt-1 h-3 w-full" aria-hidden="true">
          <line x1="0" y1="6" x2="300" y2="6" stroke="#7C3AED" strokeWidth="1" />
        </svg>
      </div>
      <div className="border border-rule-faint bg-card p-6">
        <p className="font-mono text-plaque text-violet-ink">
          banned, forever: violet grounds, violet fields, violet paragraphs, violet
          headlines. a star that has glinted returns to star-white. the sole transient
          exception is ::selection, the deep end at surface weight, cast by the reader.
        </p>
      </div>
    </div>
  ),
};
