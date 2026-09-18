/**
 * One drawn mark per skill card, in the same language as the project emblems
 * on the shelf: a 48 unit grid, stroked, never filled, currentColor so each
 * mark inherits its card's ink.
 *
 * Each encodes the thing that makes that skill hard, not a generic glyph for
 * the category. A lightbulb for ideas and a rocket for shipping would say
 * nothing that the heading does not already say.
 */

export type SkillMarkId = "graph" | "compass" | "pipeline";

const marks: Record<SkillMarkId, { paths: React.ReactNode; title: string }> = {
  /**
   * An agent sitting at the centre of a typed graph, reading and writing along
   * the edges. The same shape as the product graph further down the page, which
   * is deliberate: it is the same argument.
   */
  graph: {
    title: "An agent at the centre of a typed graph",
    paths: (
      <>
        <circle cx="24" cy="24" r="4.5" fill="currentColor" stroke="none" />
        <circle cx="24" cy="7" r="3.2" />
        <circle cx="41" cy="24" r="3.2" />
        <circle cx="24" cy="41" r="3.2" />
        <circle cx="7" cy="24" r="3.2" />
        <path d="M24 10.2v9.3M28.5 24h9.3M24 28.5v9.3M10.2 24h9.3" />
        <path d="M26.5 10.5 37.5 21.5M37.5 26.5 26.5 37.5M21.5 37.5 10.5 26.5M10.5 21.5 21.5 10.5" />
      </>
    ),
  },

  /**
   * A pair of drafting compasses, mid-arc. The instrument you decide a shape
   * with before anything gets built, which is what this card is about.
   */
  compass: {
    title: "A drafting compass, drawing the shape before it is built",
    paths: (
      <>
        <circle cx="24" cy="7" r="2.6" />
        <path d="M22.7 9.4 13 37M25.3 9.4 35 37" />
        <path d="M17.5 24h13" />
        <path d="M35 37l-2.6 4" />
        <path d="M10.5 41c4.5-4.2 8.9-6.3 13.5-6.3s9 2.1 13.5 6.3" />
      </>
    ),
  },

  /**
   * Crates moving along a rail, with a return arc above them. The arc is the
   * point: shipping once is the easy half, and the card is about what happens
   * after launch.
   */
  pipeline: {
    title: "Crates on a rail, and the loop back that keeps them moving",
    paths: (
      <>
        <rect x="8" y="22" width="13" height="13" rx="1" />
        <rect x="26" y="22" width="13" height="13" rx="1" />
        <path d="M8 28.5h13M26 28.5h13" />
        <path d="M4 40h36" />
        <path d="M40 40l-4-2.6v5.2z" fill="currentColor" stroke="none" />
        <path d="M37 16c-3.6-5-9.4-7.2-15.4-5.7-4 1-7.3 3.6-9.3 7" />
        <path d="M12.3 17.3 11 11.2l6.1 1.1" />
      </>
    ),
  },
};

export function SkillMark({
  mark,
  size = 52,
  className,
}: {
  mark: SkillMarkId;
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

export default SkillMark;
