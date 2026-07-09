/**
 * Project data for node cards, case tiles, and the radial graph.
 *
 * Facts: context/profile.md (the truth ledger). Exact numbers only, never
 * rounded up. Funding discipline: Adloom.ai "raised seed funding" (documented);
 * Deals24.ai "raising at DIFC", never "raised"; Sanady.ai carries no funding
 * claim. Entopo stays inside the NDA-sayable block.
 *
 * Prose fields (oneLiner, tileLine, graphNote) are DRAFT copy, pending Lefler.
 * Final card selection is Mimir's; this set implements blueprint §7's inventory
 * minus Remedify (conditional on its repo tidy-up) and GradeVault (no blueprint
 * slot).
 */

export type Figure = {
  /** Exact ledger number, mono `stat` step. */
  value: string;
  /** Mono `label` step. */
  label: string;
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  name: string;
  /** Serif one-to-two-line description: what it is, why it's hard. DRAFT. */
  oneLiner: string;
  /** Mono stack row, lowercase (tokens.md §2.2). */
  stack: string[];
  /** Proof figures, exact ledger numbers only. */
  figures: Figure[];
  links: ProjectLink[];
  /** One of the four landing case tiles (blueprint §6.4). */
  tile: boolean;
  /** Mono proof/stack fragment for its case tile. DRAFT. */
  tileLine?: string;
  /** One-line description on its radial-graph node. DRAFT. */
  graphNote: string;
  /** NDA-scoped: copy must stay inside entopo.app's public framing. */
  nda?: boolean;
};

export const projects: Project[] = [
  {
    slug: "adloom",
    name: "Adloom.ai",
    oneLiner:
      "AI-driven billboard advertising platform. I ran the research and the MVP build behind its seed raise, then engineered it against real client campaigns.",
    stack: ["fastapi", "react", "postgresql", "aws ec2 · rds · amplify"],
    figures: [
      { value: "seed", label: "raised; research and decks contributed" },
      { value: "~60%", label: "less manual sdr effort per campaign cycle" },
      { value: "5 h to 5 min", label: "billboard location scouting per campaign" },
    ],
    links: [],
    tile: true,
    tileLine: "seed raised · scouting 5 hours to 5 minutes",
    graphNote: "billboard ad platform, seed raised",
  },
  {
    slug: "upg",
    name: "Unified Product Graph",
    oneLiner:
      "An open-source standard for structured product knowledge, published on npm. I build the MCP server that lets AI agents read and write the graph.",
    stack: ["typescript", "node", "mcp", "npm @unified-product-graph"],
    figures: [{ value: "90+", label: "graph read/write apis exposed over mcp" }],
    links: [
      { label: "github", href: "https://github.com/unified-product-graph" },
      { label: "npm", href: "https://www.npmjs.com/org/unified-product-graph" },
    ],
    tile: true,
    tileLine: "90+ mcp graph apis · open source",
    graphNote: "open-source product graph standard",
  },
  {
    slug: "entopo",
    name: "Entopo",
    // NDA guardrails (profile.md): sayable block only. Nothing beyond
    // entopo.app's public copy; no internals, no metrics.
    oneLiner:
      "An AI-native product creation tool: canvas plus AI plus graph. I am the Core Founding Engineer building its full-stack app.",
    stack: ["typescript", "next.js", "ai agents", "mcp"],
    figures: [],
    links: [{ label: "entopo.app", href: "https://entopo.app" }],
    tile: true,
    tileLine: "typescript · next.js · agents · mcp",
    graphNote: "ai-native product creation tool",
    nda: true,
  },
  {
    slug: "ledgerline",
    name: "LedgerLine",
    oneLiner:
      "A multi-tenant double-entry ledger, hand-built: row-level security, hand-written SQL with no ORM, and an ML canonicalizer that abstains rather than guesses.",
    stack: ["java 21", "spring boot 3.4", "postgres rls", "no orm", "next.js 14"],
    figures: [
      { value: "94.3%", label: "bank-statement classifier accuracy" },
      { value: "100%", label: "abstain recall, zero false accepts" },
      { value: "22", label: "junit test classes on testcontainers" },
      { value: "13", label: "flyway migrations, 8 gradle modules" },
    ],
    links: [
      { label: "github", href: "https://github.com/FraanW/ledgerline-money-tracker" },
    ],
    tile: true,
    tileLine: "java 21 · postgres rls · no orm",
    graphNote: "double-entry ledger, hand-written sql",
  },
  {
    slug: "deals24",
    name: "Deals24.ai",
    oneLiner:
      "Platform for distressed real estate deals. I built the investor, seller and admin dashboards end to end; the venture is raising at DIFC, UAE.",
    stack: ["fastapi", "react", "postgresql", "aws iam"],
    figures: [
      { value: "3", label: "role dashboards, built end to end" },
      { value: "difc", label: "raising, in progress, uae" },
    ],
    // deals24.ai link check still open in the ledger; keep until Dwight verifies.
    links: [{ label: "deals24.ai", href: "https://deals24.ai" }],
    tile: false,
    graphNote: "real estate platform, raising at difc",
  },
  {
    slug: "sanady",
    name: "Sanady.ai",
    // No funding claim on record: architecture story only.
    oneLiner:
      "Fintech for quick small-ticket loans to UAE expatriates. I designed the product flow and a backend architecture aligned with PCI DSS for lending.",
    stack: ["system architecture", "pci dss", "lending lifecycle", "e-wallet flows"],
    figures: [],
    links: [],
    tile: false,
    graphNote: "lending fintech, architecture design",
  },
  {
    slug: "research-orchestrator",
    name: "Research Orchestration Platform",
    oneLiner:
      "Stateful concurrent research workflows with session persistence and checkpointing. Retrieval stays under 400 ms while ten-plus sessions run at once.",
    stack: ["fastapi", "postgres pgvector", "websockets", "cloud ocr"],
    figures: [{ value: "<400 ms", label: "rag retrieval across 10+ concurrent sessions" }],
    links: [{ label: "github", href: "https://github.com/FraanW/Agentic-Research-Tool" }],
    tile: false,
    graphNote: "concurrent research workflows",
  },
  {
    slug: "adcea",
    name: "ADCEA",
    oneLiner:
      "Autonomous data cleaning, feature engineering and AutoML in one pipeline, with async training jobs behind a React SPA.",
    stack: ["pandas", "scikit-learn", "jwt", "react"],
    figures: [],
    links: [{ label: "github", href: "https://github.com/FraanW/ADCEA" }],
    tile: false,
    graphNote: "autonomous data-prep and automl",
  },
];

export const tileProjects = projects.filter((p) => p.tile);

export function projectBySlug(slug: string): Project {
  const found = projects.find((p) => p.slug === slug);
  if (!found) throw new Error(`Unknown project slug: ${slug}`);
  return found;
}
