/**
 * ════════════════════════════════════════════════════════════════════════
 *  PLACEHOLDER CONTENT — NOT TRUTH. NEVER DEPLOYABLE.
 * ════════════════════════════════════════════════════════════════════════
 *
 * Shama's intake (context/INTAKE.md) has not happened; context/profile.md
 * does not exist. Per blueprint §9 rule 1, every content value in this file
 * is a placeholder, with ONE exception: the 8 real project titles from
 * context/intake-notes.md (owner-provided 2026-07-11, titles only, scope
 * notes bind). Everything else mirrors the SHAPE of Farhaan's site content
 * with Shama's name in the chrome and visibly generic stand-in text.
 * Nothing here beyond the titles is a claim about Shama.
 *
 * Shama is non-binary: they/them everywhere, including this file.
 *
 * The pipeline that replaces this file: intake → Mimir + Lefler draft
 * context/profile.md → Shama locks it → Mimir maps content → Lefler writes
 * real words here → Dwight audits → only then may Darryl ship.
 *
 * This is the ONLY content file. Components never hardcode visitor-facing
 * words; Lefler and Shama iterate here without touching components.
 */

/* ---- identity chrome (name is real; the rest is pending intake) ---- */

export const identity = {
  name: "Shama Anjum",
  /** Top-bar mono name (blueprint §5). */
  shortName: "shama",
  location: "location pending intake",
  /** PLACEHOLDER: no real address until intake. "#" so nothing mails anyone. */
  email: { label: "email pending intake", href: "#" },
  github: { label: "github pending intake", href: "#" },
  linkedin: { label: "linkedin pending intake", href: "#" },
  /** Footer one-line core stack (mono), from the future truth ledger. */
  stackLine: "core stack pending intake",
} as const;

export const nav = {
  projects: "projects",
  contact: "contact",
  back: "back",
} as const;

/* ---- section copy slots (all placeholder) ---- */

export const hero = {
  /** Headline claim slot, under 10 words. Lefler writes the real one. */
  claims: {
    short: "Placeholder claim: their work, under ten words.",
    long: "Placeholder claim, longer draft: what they build and prove, still one line.",
  },
  /** Support line slot, under 25 words, lede register. */
  support:
    "Placeholder support line: one sentence of proof in their own terms, written by Lefler after Shama's intake locks the truth ledger.",
  scrollCue: "scroll",
} as const;

/**
 * Pull-quote slots (blueprint §6.3): positioning statements in the site's
 * own voice, themed on building business prototypes from scratch to scale.
 * NEVER attributed to anyone (truth rule: no invented attributions).
 * Plain declarative; no exclamation marks. Every line below is a
 * TODO(Lefler) stand-in that only proves the register; Lefler writes the
 * shipped lines after intake, and Dwight prunes any quote that feels
 * forced (a quote under every section is its own slop pattern).
 *
 * Placement (Sindri's prototype call, owner prunes freely): hero, after
 * about, after the constellation, after signals. Case tiles and contact
 * deliberately carry none — the tiles sit close to the constellation, and
 * the finale owns contact's drama.
 */
export const quotes = {
  hero: "Every business begins as a prototype someone refused to abandon.", // TODO(Lefler)
  about: "From scratch is not a constraint. It is the advantage.", // TODO(Lefler)
  constellation: "A prototype earns its place by becoming something people use.", // TODO(Lefler)
  signals: "Scale is a prototype that kept its promises.", // TODO(Lefler)
} as const;

export const about = {
  heading: "About",
  /** 60 to 90 word first-person slot (blueprint §5). */
  body:
    "Placeholder body, sixty to ninety words. This paragraph belongs to Shama: who they are, what they have shipped, and what they want to build next, in first person, written by Lefler from the locked truth ledger. Until intake completes, this text only proves the reading measure, the Sentient voice at eighteen pixels over one point seven five, and the photo-and-paragraph composition. It makes no claim about them, and it never ships.",
  /** Mono plaque caption under the squared photo: name, place, year. */
  photoCaption: "shama anjum · place pending · 2026",
  photoAlt: "Shama Anjum (photo pending intake)", // final alt text is Lefler's
} as const;

export const caseTiles = {
  heading: "Selected work",
  /**
   * TODO(Mimir): tile selection is a Mimir decision after full intake
   * (context/intake-notes.md). The four projects flagged `tile: true` below
   * are an arbitrary prototype pick, marked as such on the page.
   */
  selectionNote: "tile selection pending intake · todo: mimir",
} as const;

export const constellationSection = {
  heading: "The constellation",
  /** One-line intro slot (Lefler writes the real one). */
  intro: "Placeholder line: each star is one of their projects. Open one.",
} as const;

export const signalsSection = {
  heading: "Signals",
} as const;

export const contact = {
  heading: "Contact",
  /** One tiny ask (slot). */
  ask: "Placeholder ask: one sentence inviting one email, written by Lefler.",
  cta: "email shama",
  /**
   * The camera's line, arriving as the capture flash decays. Sentiment and
   * wording are Lefler's after intake; this stand-in only holds the slot.
   */
  finaleLine: "Placeholder finale line: the shutter fires, the ask lands.",
} as const;

export const projectsPage = {
  /** One-sentence intro line slot (blueprint §5). */
  intro: "Placeholder intro: the constellation's stars, grown into cards.",
} as const;

/* ---- projects: REAL TITLES, placeholder everything else ----
   Titles from context/intake-notes.md (owner-provided 2026-07-11). Scope
   notes BIND: Adloom and Shelvefy are Shama's AI-engine work only, never
   the whole product — the scope is baked into the display name so no
   rendering can drop it. Cohorts dashboard is ongoing (present tense).
   No descriptions, stacks, dates, or outcomes are known yet; nothing may
   be invented to fill those slots. */

export type Figure = {
  /** Proof figure slot, mono `figure` step. Real numbers come from the ledger. */
  value: string;
  /** Mono `plaque` step. */
  label: string;
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  /** `fig. NN` plaque number, two digits, lowercase mono. */
  fig: string;
  /** REAL title (intake-notes.md), scope note baked in where one binds. */
  name: string;
  /** Serif one-to-two-line description slot. PLACEHOLDER until intake. */
  oneLiner: string;
  /** Mono stack row, lowercase (tokens.md §2.2). PLACEHOLDER until intake. */
  stack: string[];
  /** Proof figure slots. PLACEHOLDER until intake. */
  figures: Figure[];
  links: ProjectLink[];
  /** One of the four landing case tiles. TODO(Mimir): arbitrary until intake. */
  tile: boolean;
  /** Mono proof/stack fragment for its case tile. PLACEHOLDER until intake. */
  tileLine?: string;
  /** The one Sentient line under its constellation plaque (blueprint §6.1).
      PLACEHOLDER until intake. */
  starLine: string;
};

const PLACEHOLDER_LINE =
  "Placeholder one-liner: what this project is and Shama's exact role, written after intake.";
const PLACEHOLDER_STAR_LINE = "one placeholder line for this star, pending intake";
const PLACEHOLDER_STACK = ["stack row", "pending", "intake"];
const PLACEHOLDER_TILE_LINE = "tile fragment pending intake";

export const projects: Project[] = [
  {
    slug: "hostel-outpass",
    fig: "01",
    name: "Hostel outpass system",
    oneLiner: PLACEHOLDER_LINE,
    stack: PLACEHOLDER_STACK,
    figures: [
      { value: "tbd", label: "proof figure slot, exact number from the ledger" },
      { value: "tbd", label: "second figure slot" },
    ],
    links: [{ label: "link pending", href: "#" }],
    tile: true, // TODO(Mimir)
    tileLine: PLACEHOLDER_TILE_LINE,
    starLine: PLACEHOLDER_STAR_LINE,
  },
  {
    slug: "medibase",
    fig: "02",
    name: "Medibase",
    oneLiner:
      "Placeholder one-liner, a little shorter, so the tile grid shows uneven line counts.",
    stack: ["stack row", "pending"],
    figures: [{ value: "tbd", label: "single figure slot" }],
    links: [
      { label: "link pending", href: "#" },
      { label: "second link", href: "#" },
    ],
    tile: true, // TODO(Mimir)
    tileLine: PLACEHOLDER_TILE_LINE,
    starLine: PLACEHOLDER_STAR_LINE,
  },
  {
    slug: "deals24",
    fig: "03",
    // Shared project with Farhaan's record; Shama's side not yet scoped
    // (intake-notes.md). Their role stays unstated until intake says it.
    name: "Deals24",
    oneLiner: PLACEHOLDER_LINE,
    stack: PLACEHOLDER_STACK.concat("fourth item"),
    figures: [],
    links: [{ label: "link pending", href: "#" }],
    tile: true, // TODO(Mimir)
    tileLine: PLACEHOLDER_TILE_LINE,
    starLine: PLACEHOLDER_STAR_LINE,
  },
  {
    slug: "adloom-ai-engine",
    fig: "04",
    // BINDING SCOPE (intake-notes.md): "just the AI engine" — Shama's part
    // is the AI engine, not the whole product. The suffix is load-bearing;
    // no rendering may show "Adloom" bare.
    name: "Adloom (AI engine)",
    oneLiner: PLACEHOLDER_LINE,
    stack: PLACEHOLDER_STACK,
    figures: [
      { value: "tbd", label: "figure slot one" },
      { value: "tbd", label: "figure slot two" },
      { value: "tbd", label: "figure slot three" },
      { value: "tbd", label: "figure slot four" },
    ],
    links: [{ label: "link pending", href: "#" }],
    tile: true, // TODO(Mimir)
    tileLine: PLACEHOLDER_TILE_LINE,
    starLine: PLACEHOLDER_STAR_LINE,
  },
  {
    slug: "shelvefy-ai-engine",
    fig: "05",
    // BINDING SCOPE (intake-notes.md): "AI engine" — same rule as Adloom.
    name: "Shelvefy (AI engine)",
    oneLiner: PLACEHOLDER_LINE,
    stack: ["stack row", "pending"],
    figures: [{ value: "tbd", label: "figure slot" }],
    links: [],
    tile: false,
    starLine: PLACEHOLDER_STAR_LINE,
  },
  {
    slug: "medulla-ai",
    fig: "06",
    name: "MEDULLA AI",
    oneLiner:
      "Placeholder one-liner for a card with no links row, so that state exists in Storybook.",
    stack: PLACEHOLDER_STACK,
    figures: [],
    links: [],
    tile: false,
    starLine: PLACEHOLDER_STAR_LINE,
  },
  {
    slug: "blockmove",
    fig: "07",
    name: "Blockmove",
    oneLiner: PLACEHOLDER_LINE,
    stack: ["stack row", "pending"],
    figures: [{ value: "tbd", label: "figure slot" }],
    links: [{ label: "link pending", href: "#" }],
    tile: false,
    starLine: PLACEHOLDER_STAR_LINE,
  },
  {
    slug: "cohorts-dashboard",
    fig: "08",
    // BINDING SCOPE (intake-notes.md): ongoing — present-tense framing when
    // real copy is written.
    name: "Cohorts dashboard (ongoing)",
    oneLiner: PLACEHOLDER_LINE,
    stack: ["stack row", "pending"],
    figures: [],
    links: [],
    tile: false,
    starLine: PLACEHOLDER_STAR_LINE,
  },
];

export const tileProjects = projects.filter((p) => p.tile);

export function projectBySlug(slug: string): Project {
  const found = projects.find((p) => p.slug === slug);
  if (!found) throw new Error(`Unknown project slug: ${slug}`);
  return found;
}

/* ---- signals slots (pedigree block, blueprint §5) ---- */

export type Signal = {
  /** Mono row label, lowercase. */
  label: string;
  /** Serif detail. */
  detail: string;
  /** Mono figure/reference. */
  figure: string;
  href?: string;
};

export const signals: Signal[] = [
  {
    label: "signal slot one",
    detail:
      "Placeholder detail: a credential, publication, or proof point from Shama's ledger, one sentence.",
    figure: "ref pending",
    href: "#",
  },
  {
    label: "signal slot two",
    detail: "Placeholder detail: a second pedigree row, holding the ruled-row measure.",
    figure: "ref pending",
  },
  {
    label: "signal slot three",
    detail: "Placeholder detail: a third row, so the rhythm of the rules reads true.",
    figure: "ref pending",
  },
];
