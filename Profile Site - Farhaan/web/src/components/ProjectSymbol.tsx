import type { SymbolId } from "@/content/projects";

/**
 * One drawn mark per project, stamped at the head of the left leaf.
 *
 * These are emblems, not icons: each one encodes the thing that made the
 * project hard, so the mark carries information rather than decoration.
 * Drawn on a 48 unit grid, stroked, never filled.
 */

const marks: Record<SymbolId, { paths: React.ReactNode; title: string }> = {
  // A hoarding on posts, throwing a signal. Adloom placed ads in space.
  billboard: {
    title: "A billboard broadcasting into the space around it",
    paths: (
      <>
        <rect x="8" y="10" width="32" height="18" rx="1" />
        <path d="M16 28v12M32 28v12" />
        <path d="M24 4.5v3M15.5 6.5l1.4 2.2M32.5 6.5l-1.4 2.2" />
      </>
    ),
  },
  // Two pans that must agree. Double-entry made visible.
  balance: {
    title: "A balance whose two pans must agree",
    paths: (
      <>
        <path d="M24 8v30" />
        <path d="M10 14h28" />
        <path d="M10 14 4 26h12zM38 14l-6 12h12z" />
        <path d="M17 38h14" />
      </>
    ),
  },
  // Three cuts on one shank: one deal, three roles.
  keys: {
    title: "One key cut three ways, for three kinds of user",
    paths: (
      <>
        <circle cx="14" cy="17" r="7" />
        <path d="M19.5 21.5 39 41" />
        <path d="M33 35l-4 4M28.5 30.5l-4 4M37 39l-3 3" />
      </>
    ),
  },
  // Nodes and edges. The graph is the product.
  graph: {
    title: "A graph of connected entities",
    paths: (
      <>
        <circle cx="24" cy="10" r="3.5" />
        <circle cx="10" cy="30" r="3.5" />
        <circle cx="38" cy="30" r="3.5" />
        <circle cx="24" cy="40" r="3.5" />
        <path d="M22 13 11.5 26.5M26 13l10.5 13.5M12.5 32.5 21 38M35.5 32.5 27 38" />
        <path d="M13.5 30h21" />
      </>
    ),
  },
  // A run that saves its place and resumes.
  checkpoint: {
    title: "A long run that saves its place and resumes",
    paths: (
      <>
        <path d="M5 24h38" />
        <path d="M14 19v10M24 19v10M34 19v10" />
        <circle cx="24" cy="24" r="6.5" />
        <path d="M38 24l-4-3.5v7z" />
      </>
    ),
  },
  // Raw in the top, clean out the bottom.
  sieve: {
    title: "Raw data in, cleaned features out",
    paths: (
      <>
        <path d="M7 10h34L28 26v12l-8 5V26z" />
        <path d="M13 17h22" />
      </>
    ),
  },
  // A vessel and the heat that made it: craft, then reach.
  kiln: {
    title: "A vessel, and the craft behind it",
    paths: (
      <>
        <path d="M17 14h14l2.5 5c2.5 5 1.5 12-3 16.5L28 40h-8l-2.5-4.5C13 31 12 24 14.5 19z" />
        <path d="M17 14c0-2.5 3-4 7-4s7 1.5 7 4" />
        <path d="M20.5 24.5c2.5 2 4.5 2 7 0" />
      </>
    ),
  },
  // Two loops at different speeds, one inside the other.
  dualLoop: {
    title: "A fast inner loop inside a slower supervising loop",
    paths: (
      <>
        <circle cx="24" cy="24" r="18" />
        <circle cx="24" cy="24" r="8" />
        <path d="M24 6l3.5 3.5L24 13zM24 35l-3.5-3.5L24 28z" />
      </>
    ),
  },
  // A strongroom door: money held safely, which was the whole design problem.
  vault: {
    title: "A vault door, for money that has to be held safely",
    paths: (
      <>
        <rect x="7" y="8" width="34" height="32" rx="2" />
        <circle cx="24" cy="24" r="9" />
        <circle cx="24" cy="24" r="2.5" />
        <path d="M24 15v-3M24 36v-3M15 24h-3M36 24h-3" />
      </>
    ),
  },
  // Speech, heard and answered.
  waveform: {
    title: "A voice, heard and answered",
    paths: (
      <>
        <path d="M6 24h4M38 24h4" />
        <path d="M14 17v14M20 11v26M26 15v18M32 20v8" />
      </>
    ),
  },
};

export function ProjectSymbol({
  symbol,
  size = 48,
  className,
}: {
  symbol: SymbolId;
  size?: number;
  className?: string;
}) {
  const mark = marks[symbol];

  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      role="img"
      aria-label={mark.title}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {mark.paths}
    </svg>
  );
}

export default ProjectSymbol;
