/**
 * Pixel art, drawn from strings.
 *
 * A sprite is a list of equal-length rows. Each character is one pixel and maps
 * to a colour through a palette; "." and any unmapped character stay
 * transparent. Rows are merged into horizontal runs before rendering, so a
 * 16 by 16 icon is a few dozen rects rather than 256, and crispEdges keeps
 * the blocks hard at any size instead of letting the browser smear them.
 *
 * The step icons for the playbook live here too. They share one palette with
 * the rest of the page: ivory for the drawing, the signal accent for the one
 * detail that says what the icon is about.
 */

export type Palette = Record<string, string>;

type Run = { x: number; y: number; w: number; fill: string };

export function toRuns(rows: readonly string[], palette: Palette): Run[] {
  const runs: Run[] = [];
  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const fill = palette[row[x]];
      if (!fill) {
        x += 1;
        continue;
      }
      let end = x + 1;
      while (end < row.length && row[end] === row[x]) end += 1;
      runs.push({ x, y, w: end - x, fill });
      x = end;
    }
  });
  return runs;
}

export function PixelArt({
  rows,
  palette,
  scale = 4,
  className,
  style,
}: {
  rows: readonly string[];
  palette: Palette;
  /** Screen pixels per sprite pixel. Whole numbers keep every block the same size. */
  scale?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const width = rows[0]?.length ?? 0;
  const height = rows.length;
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width * scale}
      height={height * scale}
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={className}
      style={style}
    >
      {toRuns(rows, palette).map((run, index) => (
        <rect key={index} x={run.x} y={run.y} width={run.w} height={1} fill={run.fill} />
      ))}
    </svg>
  );
}

export const ICON_PALETTE: Palette = {
  I: "#f4efe2",
  A: "#7fd4d0",
  M: "#8e93a8",
};

/*
  The team, built from one person in two poses rather than drawn three times.
  Frame A: everyone's arms straight up, the middle one mid-jump. Frame B: arms
  bent, the outer two jumping. Swapped on a hard step, it reads as a crowd
  cheering in turns. The smiles are U-shaped holes, so they read at 16 rows.
*/
const CHEER_UP = [
  "I.........I",
  "A.........A",
  "A...III...A",
  "A..IIIII..A",
  "A.II.I.II.A",
  "A.IIIIIII.A",
  "A.I.III.I.A",
  ".A.I...I.A.",
  "..A.III.A..",
  "...AAAAA...",
  "..AAAAAAA..",
  "..AAAAAAA..",
  "..AAAAAAA..",
];

const CHEER_BENT = [
  "...........",
  "...........",
  "....III....",
  "I..IIIII..I",
  "A.II.I.II.A",
  "A.IIIIIII.A",
  ".AI.III.IA.",
  "..AI...IA..",
  "...AIIIA...",
  "...AAAAA...",
  "..AAAAAAA..",
  "..AAAAAAA..",
  "..AAAAAAA..",
];

function team(people: { pose: readonly string[]; lift: number }[]): string[] {
  const width = people.length * 12 - 1;
  const grid = Array.from({ length: 16 }, () => Array<string>(width).fill("."));
  people.forEach(({ pose, lift }, i) => {
    const top = 2 - lift;
    pose.forEach((row, y) =>
      [...row].forEach((ch, x) => {
        if (ch !== ".") grid[top + y][i * 12 + x] = ch;
      }),
    );
  });
  return grid.map((row) => row.join(""));
}

export const TEAM_FRAMES: readonly (readonly string[])[] = [
  team([
    { pose: CHEER_UP, lift: 0 },
    { pose: CHEER_UP, lift: 1 },
    { pose: CHEER_UP, lift: 0 },
  ]),
  team([
    { pose: CHEER_BENT, lift: 1 },
    { pose: CHEER_BENT, lift: 0 },
    { pose: CHEER_BENT, lift: 1 },
  ]),
];

/* One icon per playbook step. Each says the step without needing the word. */
export const STEP_ICONS = {
  // Identify the problem: a magnifier over a question mark.
  magnifier: [
    "................",
    "....IIIII.......",
    "...I.....I......",
    "..I..AAA..I.....",
    "..I.A...A.I.....",
    "..I.....A.I.....",
    "..I....A..I.....",
    "..I...A...I.....",
    "..I.......I.....",
    "...I..A..I......",
    "....IIIIIII.....",
    ".........III....",
    "..........III...",
    "...........III..",
    "............III.",
    ".............II.",
  ],
  // Think: a thought bubble, still working.
  thought: [
    "................",
    "....IIII.III....",
    "...I....I...I...",
    ".III.........I..",
    "I.............I.",
    "I..A...A...A..I.",
    "I..A...A...A..I.",
    "I.............I.",
    ".II.........II..",
    "...III...IIII...",
    "......III.......",
    "................",
    "...II...........",
    "...II...........",
    ".I..............",
    "................",
  ],
  // Ideate: a lit bulb.
  bulb: [
    "..A...IIII...A..",
    "....II....II....",
    "A..I........I..A",
    "..I..........I..",
    "..I...A..A...I..",
    "A.I...AAAA...I.A",
    "..I....AA....I..",
    "...I...AA...I...",
    "....I..AA..I....",
    ".....I.AA.I.....",
    ".....IIIIII.....",
    ".....MMMMMM.....",
    "......MMMM......",
    ".....MMMMMM.....",
    "......MMMM......",
    ".......MM.......",
  ],
  // Plan: a treasure map, route dashed, X marks the spot.
  map: [
    "................",
    "................",
    ".IIIIIIIIIIIIII.",
    ".I............I.",
    ".I.AA.........I.",
    ".I.....A......I.",
    ".I......A.....I.",
    ".I............I.",
    ".I.......A....I.",
    ".I........A.A.I.",
    ".I.........A..I.",
    ".I........A.A.I.",
    ".I............I.",
    ".IIIIIIIIIIIIII.",
    "................",
    "................",
  ],
  // Validate: a ticked box.
  check: [
    "................",
    ".IIIIIIIIIIIIII.",
    ".I............I.",
    ".I............I.",
    ".I..........A.I.",
    ".I.........AA.I.",
    ".I........AA..I.",
    ".I.A.....AA...I.",
    ".I.AA...AA....I.",
    ".I..AA.AA.....I.",
    ".I...AAA......I.",
    ".I....A.......I.",
    ".I............I.",
    ".I............I.",
    ".IIIIIIIIIIIIII.",
    "................",
  ],
  // Build: a claw hammer, grip wrapped.
  hammer: [
    "................",
    "..IIIIIIIII.....",
    "..IIIIIIIIIIII..",
    "..IIIIIIIII..II.",
    "......MM........",
    "......MM........",
    "......MM........",
    "......MM........",
    "......MM........",
    "......MM........",
    "......MM........",
    "......AA........",
    "......AA........",
    "......AA........",
    "......AA........",
    "................",
  ],
  // Ship: a rocket, lit.
  rocket: [
    ".......II.......",
    "......IIII......",
    ".....IIIIII.....",
    ".....IIAAII.....",
    ".....IIAAII.....",
    ".....IIIIII.....",
    ".....IIIIII.....",
    "....IIIIIIII....",
    "...II.IIII.II...",
    "..II..IIII..II..",
    "..I...IIII...I..",
    "......AAAA......",
    ".......AA.......",
    "......A..A......",
    ".......AA.......",
    "................",
  ],
  // Scale: a team, cheering. Frame A of TEAM_FRAMES, which animates it.
  team: TEAM_FRAMES[0],
} as const;

export type StepIconId = keyof typeof STEP_ICONS;

/* A four-point glint, for the moment the bar reaches 100%. */
export const SPARKLE = [
  "..A..",
  "..A..",
  "AAIAA",
  "..A..",
  "..A..",
] as const;
