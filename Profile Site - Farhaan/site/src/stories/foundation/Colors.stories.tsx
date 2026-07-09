import type { Meta, StoryObj } from "@storybook/nextjs-vite";

/**
 * Emerald ink palette (tokens.md §1). Every swatch shows its computed WCAG
 * contrast pairings; ratios are Riker's audited figures, not estimates.
 */
const meta = {
  title: "Foundation/Colors",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "The four colors and their derived tints (design/tokens.md §1). If a color is not here, it does not exist on the site: the @theme block wipes Tailwind's default palette.",
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
    token: "bone",
    hex: "#F5F6EE",
    role: "ground: page background outside statement fields",
    darkText: true,
    pairings: [{ on: "emerald", ratio: "7.06:1", verdict: "AA normal text, both directions" }],
  },
  {
    token: "card",
    hex: "#FBFBF5",
    role: "card surface; always with a rule-faint border",
    darkText: true,
    pairings: [{ on: "ink", ratio: "15.96:1", verdict: "AAA all sizes" }],
  },
  {
    token: "ink",
    hex: "#16211A",
    role: "all reading text",
    pairings: [
      { on: "bone", ratio: "15.24:1", verdict: "AAA all sizes" },
      { on: "card", ratio: "15.96:1", verdict: "AAA all sizes" },
    ],
  },
  {
    token: "steel",
    hex: "#4C5952",
    role: "muted/secondary text",
    pairings: [
      { on: "bone", ratio: "6.75:1", verdict: "AA normal text" },
      { on: "card", ratio: "7.07:1", verdict: "AA normal text" },
    ],
  },
  {
    token: "emerald",
    hex: "#065F46",
    role: "statement: hero field, edges, rings, rules, links",
    pairings: [
      { on: "bone", ratio: "7.06:1", verdict: "AA normal text" },
      { on: "bone (as ground for bone text)", ratio: "7.06:1", verdict: "AA normal text" },
    ],
  },
  {
    token: "emerald-deep",
    hex: "#044A37",
    role: "hover/active state of emerald elements",
    pairings: [{ on: "bone", ratio: "9.46:1", verdict: "AAA all sizes" }],
  },
  {
    token: "leaf",
    hex: "#34CC73",
    role: "accent: live marks, ring hover fills. NEVER text, never unbounded",
    darkText: true,
    pairings: [
      { on: "emerald", ratio: "3.67:1", verdict: "passes 3:1 non-text UI" },
      { on: "bone", ratio: "1.92:1", verdict: "FAILS: why leaf text is banned" },
    ],
  },
  {
    token: "rule",
    hex: "#C0D5C9",
    role: "quiet ruling: signals rows, structural hairlines",
    darkText: true,
    pairings: [{ on: "bone", ratio: "1.42:1", verdict: "decorative only, carries no meaning" }],
  },
  {
    token: "rule-faint",
    hex: "#D8E4DA",
    role: "faintest ruling: card borders, photo border",
    darkText: true,
    pairings: [{ on: "bone", ratio: "—", verdict: "decorative only" }],
  },
  {
    token: "bone-muted",
    hex: "#B7CFC2",
    role: "secondary text on the emerald field only",
    darkText: true,
    pairings: [{ on: "emerald", ratio: "4.65:1", verdict: "AA normal text" }],
  },
];

export const Palette: Story = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-2">
      {SWATCHES.map((s) => (
        <div key={s.token} className="border border-rule-faint bg-card">
          <div
            className="flex h-24 items-end justify-between px-4 py-3"
            style={{ backgroundColor: s.hex }}
          >
            <span
              className={`font-mono text-mono font-medium ${s.darkText ? "text-ink" : "text-bone"}`}
            >
              --color-{s.token}
            </span>
            <span className={`font-mono text-label ${s.darkText ? "text-ink" : "text-bone"}`}>
              {s.hex}
            </span>
          </div>
          <div className="p-4">
            <p className="text-body-sm text-ink">{s.role}</p>
            <ul className="mt-2 space-y-1">
              {s.pairings.map((p) => (
                <li key={p.on + p.ratio} className="font-mono text-label text-steel">
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
      <div className="bg-bone p-6">
        <p className="text-body text-ink">ink on bone, 15.24:1. The reading voice.</p>
        <p className="mt-2 text-body text-steel">steel on bone, 6.75:1. Captions and meta.</p>
        <p className="mt-2 text-body text-emerald">emerald on bone, 7.06:1. Links and accents.</p>
      </div>
      <div className="bg-emerald p-6">
        <p className="text-body text-bone">bone on emerald, 7.06:1. The hero voice.</p>
        <p className="mt-2 text-body text-bone-muted">bone-muted on emerald, 4.65:1. Hero secondary.</p>
        <p className="mt-2 flex items-center gap-2 font-mono text-mono text-bone">
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
            <circle cx="6" cy="6" r="4" fill="#34CC73" stroke="#F5F6EE" strokeWidth="1.5" />
          </svg>
          leaf mark on emerald, 3.67:1, ringed and labeled (never text)
        </p>
      </div>
    </div>
  ),
};
