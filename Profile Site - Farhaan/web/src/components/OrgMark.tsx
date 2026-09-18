/**
 * A drawn mark per organisation, in the same language as the project emblems
 * and the skill marks.
 *
 * These are NOT the companies' logos, deliberately. Fiserv, Venture Cube and
 * UPG have no mark in any open icon set, and reproducing an employer's or a
 * client's trademark on a personal site risks implying endorsement, which is
 * exactly what a large regulated fintech objects to. Drawing a mark for what
 * each place does is legally clean, visually consistent with the rest of the
 * page, and says more than a wordmark would.
 *
 * If Farhaan gets written permission for any of these, swapping a real logo in
 * is a one-line change at the call site.
 */

export type OrgMarkId = "access" | "graph" | "cube";

const marks: Record<OrgMarkId, { paths: React.ReactNode; title: string }> = {
  /**
   * A key crossing a boundary: identity and access, which is the day job.
   * The boundary sits right of centre and stops short of the edges, so at
   * 34px it reads as a threshold rather than as noise through the middle.
   */
  access: {
    title: "A key crossing a boundary",
    paths: (
      <>
        <path d="M32 11v26" strokeDasharray="3 4.5" />
        <circle cx="12" cy="24" r="7" />
        <path d="M19 24h22" />
        <path d="M36 24v6M41 24v5" />
      </>
    ),
  },
  /** Entities joined by typed edges: the standard itself. */
  graph: {
    title: "Entities joined by typed edges",
    paths: (
      <>
        <circle cx="11" cy="13" r="3.4" />
        <circle cx="37" cy="13" r="3.4" />
        <circle cx="24" cy="35" r="3.4" />
        <path d="M14.4 13h19.2M12.9 16.1 22.1 32M36.1 16.1 25.9 32" />
      </>
    ),
  },
  /** A cube, because the name says so, drawn open to read as a thing being built. */
  cube: {
    title: "A cube, drawn open",
    paths: (
      <>
        <path d="M24 6 40 15v18l-16 9-16-9V15z" />
        <path d="M24 24 40 15M24 24 8 15M24 24v18" />
      </>
    ),
  },
};

export function OrgMark({
  mark,
  size = 34,
  className,
}: {
  mark: OrgMarkId;
  size?: number;
  className?: string;
}) {
  const drawn = marks[mark];

  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      role="img"
      aria-label={drawn.title}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {drawn.paths}
    </svg>
  );
}

export default OrgMark;
