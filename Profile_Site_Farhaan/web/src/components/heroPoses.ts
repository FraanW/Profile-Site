/**
 * The hero avatar, in three poses, one per title the hero cycles through.
 *
 * Owner brief, 2026-09-19:
 *   - Full Stack Engineer: a zen pose, full-stack symbols round him.
 *   - Product Thinker: thinking, one arm folded, a hand on the chin.
 *   - AI and Cyber Systems Engineer: fixing a bot in one hand, code in the other.
 *   - Glasses, because he wears them.
 *
 * Built on his own portrait (public/farhaan-pixel.png), traced cell for cell
 * from its 47 by 48 grid and mirrored so he faces into the page, as the hero
 * always showed him. A first attempt redrew him from scratch and was rejected
 * the same day: boxy, outlined, and not him. So the portrait stays exactly as
 * drawn, in its own flat two-tone style with no outline, and each pose only
 * changes what it has to: the eyes, brows and mouth, and hands that come up
 * from below the frame.
 *
 * Pure data and drawing, no React, so the poses can be rendered and checked
 * on their own.
 */

export type PoseId = "zen" | "think" | "fix";

export const HERO_PALETTE: Record<string, string> = {
  H: "#1e201d", // hair, pupils, moustache: the portrait's dark
  S: "#516353", // skin: the portrait's own tone
  D: "#2a342c", // nose, lids, mouth, the edges of the hands
  K: "#44564a", // the creases between fingers: a step darker than the skin
  W: "#e2f9e5", // the catchlight in each eye
  T: "#a5bea9", // shirt
  U: "#879e8b", // the edge of a sleeve, where an arm crosses the shirt
  F: "#0d0f0d", // glasses frames
  L: "#5d7361", // lenses: a shade lighter than the skin behind them
  B: "#8a6b70", // tongue
  A: "#7fd4d0", // code, sparks, the bot's eyes
  I: "#f4efe2", // the bot's plating
  M: "#8e93a8", // the bot's frame
};

/* The portrait, mirrored. 47 wide; rows 0 to 6 are empty sky above the hair. */
const PORTRAIT = [
  "...............................................",
  "...............................................",
  "...............................................",
  "...............................................",
  "...............................................",
  "...............................................",
  "...............................................",
  ".....................HHHHHHHHH.................",
  "...................HHHHHHHHHHHHH...............",
  "..............HHHHHHHHHHHHHHHHHHH..............",
  ".............HHHHHHHHHHHHHHHHHHHHHH............",
  ".............HHHHHHHHHHHHHHHHHHHHHH............",
  "............HHHHHHHHHHHHHHHHHHHHHHHHH..........",
  "............HHHHHHSHHHHHHHHHHHHHHHHHHH.........",
  "............HHHHHSSSSSSSSSSSSSSHHHHHHH.........",
  "............HHHSSSSSSSSSSSSSSSSSHHHHHH.........",
  "............HHHSSSSSSSSSSSSSSSSSHHHHHH.........",
  ".............HHSSSSSSSSSSSSSSSSSHHHHHH.........",
  ".............HHSSHHHSSSSSSHHHHSSHHHHHH.........",
  ".............HHSHHHSHSSSSHHHHHHSHHHHHH.........",
  ".............HHSSSSSSSSSSSSSSSSSHHHHH..........",
  "..............HSSDDDSSSSSSSDDDSSSHHHH..........",
  "..............HSSHHWSDDDSSSHHWSSSHHSSS.........",
  "..............SSSHHWSDDDSSSHHWSSSHHSSS.........",
  "..............SSSHHWSDDDSSSHHWSSSSHSSS.........",
  "..............SSSSSSSDDDSSSSSSSSSSHSSS.........",
  "..............SSSSSSDDDDDDSSSSSSSSSSSS.........",
  "..............SSSSSSDDDDDDSSSSSSSSSSSS.........",
  "..............SSSSSSSDDDSSSSSSSSSSSSSS.........",
  "..............SSSSSHHHHHHSHSSSSSSSS............",
  "..............SSSSHSHHHHHHSHHSSSSSS............",
  "..............SSSSSSSSSSSSSSSSSSSSS............",
  "...............SSSSSDDDDDDSSSSSSSSS............",
  "...............SSSSSSSSSSSSSSSSSSS.............",
  "................SSSSSSSSSSSSSSSSS..............",
  ".................SSSSSSSSSSSSSSS...............",
  "......................SSSSSSSSSS...............",
  "......................SSSSSSSSSS...............",
  "......................SSSSSSSSSS...............",
  "......................SSSSSSSSSS...............",
  "......................SSSSSSSSSS...............",
  ".............TTTTTTSSSSSSSSSSSSSSSTTTTTTT......",
  "..........TTTTTTTTTTSSSSSSSSSSSSSTTTTTTTTTT....",
  ".........TTTTTTTTTTTTSSSSSSSSSSSSTTTTTTTTTTT...",
  "........TTTTTTTTTTTTTTTSSSSSSSSTTTTTTTTTTTTTT..",
  "........TTTTTTTTTTTTTTTTTTSSSTTTTTTTTTTTTTTTTT.",
  ".......TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT.",
  ".......TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT",
];

/* The canvas adds room either side for the props, and ten rows of chest below. */
const PAD_LEFT = 4;
const PAD_RIGHT = 5;
const EXTRA_ROWS = 10;
const WIDTH = PORTRAIT[0].length + PAD_LEFT + PAD_RIGHT;
const HEIGHT = PORTRAIT.length + EXTRA_ROWS;

/* Eyes are three wide and three tall, on rows 22 to 24. */
const EYES = [17, 27];

/* The far lens (his right, on our left) is narrower: he is turned three quarters. */
const LENSES = [
  { left: 15, right: 20 },
  { left: 25, right: 31 },
];

type Face = {
  eyes: "open" | "up" | "down" | "closed";
  brows: "rest" | "raised" | "knit";
  mouth: "rest" | "smile" | "hmm" | "tongue";
};

const FACES: Record<PoseId, Face> = {
  zen: { eyes: "closed", brows: "rest", mouth: "smile" },
  think: { eyes: "up", brows: "raised", mouth: "hmm" },
  fix: { eyes: "down", brows: "knit", mouth: "tongue" },
};

/* Props. */
const BOT = [
  "....AA....",
  ".....M....",
  ".MMMMMMMM.",
  ".MIIIIIIM.",
  "MMIAIIAIMM",
  ".MIIIIIIM.",
  ".MIAAAAIM.",
  ".MIIIIIIM.",
  ".MMMMMMMM.",
];

const CODE = [
  "...A...A.A...",
  "..A....A..A..",
  ".A....A....A.",
  "A.....A.....A",
  ".A...A.....A.",
  "..A..A....A..",
  "...AA....A...",
];

/* Palms pressed together, fingers up, thumbs in front. A dark edge makes them
   read against the neck behind; the creases are a quieter skin shadow. */
const PRAYER = [
  ".....D.....",
  "....DSD....",
  "....DSKD...",
  "...DSSKSD..",
  "...DSSKSD..",
  "..DSSSKSSD.",
  "..DSSSKSSD.",
  "..DSSSKSSD.",
  ".DSSSSKSSSD",
  ".DSKSSKSSKD",
  ".DSKSSKSSKD",
  ".DSSSSKSSSD",
  "..DSSSKSSD.",
  "..DDDDDDDD.",
];

/* A loose fist under the chin: fingers curled, their creases running across. */
const FIST = [
  ".DDDDDDD.",
  "DSSSSSSSD",
  "DKKKKKKSD",
  "DSSSSSSSD",
  "DKKKKKKSD",
  "DSSSSSSSD",
  ".DSSSSSD.",
  "..DSSSD..",
];

/* A cupped hand from the front: thumb up on one side, fingertips on the
   other, the palm under whatever it holds. */
const HOLD = [
  "DD.......DD",
  "DSD.....DSD",
  "DSSDDDDDSSD",
  "DSSSSSSSSSD",
  "DSKSSKSSKSD",
  ".DSSSSSSSD.",
  "..DDDDDDD..",
];

class Canvas {
  grid: string[][];

  constructor() {
    this.grid = Array.from({ length: HEIGHT }, (_, y) => {
      // Below the portrait the shirt simply continues down.
      const row = PORTRAIT[Math.min(y, PORTRAIT.length - 1)];
      return [...".".repeat(PAD_LEFT), ...row, ...".".repeat(PAD_RIGHT)];
    });
  }

  /** Portrait coordinates: x as in PORTRAIT, before the left pad. */
  set(x: number, y: number, ch: string) {
    const cx = x + PAD_LEFT;
    if (y >= 0 && y < HEIGHT && cx >= 0 && cx < WIDTH) this.grid[y][cx] = ch;
  }

  get(x: number, y: number) {
    return this.grid[y]?.[x + PAD_LEFT];
  }

  rect(x0: number, y0: number, x1: number, y1: number, ch: string) {
    for (let y = y0; y <= y1; y += 1) for (let x = x0; x <= x1; x += 1) this.set(x, y, ch);
  }

  stamp(rows: readonly string[], left: number, top: number) {
    rows.forEach((row, y) =>
      [...row].forEach((ch, x) => {
        if (ch !== ".") this.set(left + x, top + y, ch);
      }),
    );
  }

  /** A forearm: a sleeve with shaded edges, walked from one point to another. */
  sleeve(x0: number, y0: number, x1: number, y1: number, width = 5) {
    const steps = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0), 1);
    for (const [ch, w] of [
      ["U", width],
      ["T", width - 2],
    ] as const) {
      const r = Math.floor(w / 2);
      for (let i = 0; i <= steps; i += 1) {
        const x = Math.round(x0 + ((x1 - x0) * i) / steps);
        const y = Math.round(y0 + ((y1 - y0) * i) / steps);
        this.rect(x - r, y - r, x - r + w - 1, y - r + w - 1, ch);
      }
    }
  }

  rows() {
    return this.grid.map((row) => row.join(""));
  }
}

function drawEyes(c: Canvas, mode: Face["eyes"]) {
  for (const left of EYES) {
    // Clear the eye to skin, then draw it back in the pose's shape.
    c.rect(left, 22, left + 2, 24, "S");
    if (mode === "closed") {
      c.rect(left, 23, left + 2, 23, "D");
    } else {
      // Pupil two wide on the side he faces, catchlight beside it.
      const rows = mode === "up" ? [22, 23] : mode === "down" ? [23, 24] : [22, 23, 24];
      for (const y of rows) {
        c.set(left, y, "H");
        c.set(left + 1, y, "H");
        c.set(left + 2, y, "W");
      }
      if (mode === "down") c.rect(left, 22, left + 2, 22, "D");
    }
  }
}

function drawBrows(c: Canvas, mode: Face["brows"]) {
  if (mode === "rest") return;
  // Clear both brows back to skin first.
  c.rect(16, 18, 20, 19, "S");
  c.rect(25, 18, 30, 19, "S");
  if (mode === "raised") {
    // The near brow lifts; the far one stays put.
    c.rect(17, 18, 19, 18, "H");
    c.rect(16, 19, 18, 19, "H");
    c.rect(26, 17, 29, 17, "H");
    c.rect(25, 18, 30, 18, "H");
  } else {
    // Knitted: both slope down toward the nose.
    c.rect(16, 18, 17, 18, "H");
    c.rect(17, 19, 20, 19, "H");
    c.rect(29, 18, 30, 18, "H");
    c.rect(25, 19, 29, 19, "H");
  }
}

function drawMouth(c: Canvas, mode: Face["mouth"]) {
  if (mode === "rest") return;
  c.rect(19, 31, 26, 33, "S");
  if (mode === "smile") {
    c.rect(21, 32, 24, 32, "D");
    c.set(20, 31, "D");
    c.set(25, 31, "D");
  } else if (mode === "hmm") {
    c.rect(22, 32, 25, 32, "D");
    c.set(26, 31, "D");
  } else {
    c.rect(20, 32, 25, 32, "D");
    c.set(21, 33, "B");
    c.set(22, 33, "B");
  }
}

function drawGlasses(c: Canvas) {
  for (const { left, right } of LENSES) {
    for (let y = 22; y <= 24; y += 1) {
      for (let x = left + 1; x < right; x += 1) if (c.get(x, y) === "S") c.set(x, y, "L");
    }
    c.rect(left, 21, right, 21, "F");
    c.rect(left, 25, right, 25, "F");
    c.rect(left, 21, left, 25, "F");
    c.rect(right, 21, right, 25, "F");
  }
  // Bridge over the nose, and the near arm back to the ear.
  c.rect(21, 22, 24, 22, "F");
  c.rect(32, 22, 33, 22, "F");
}

function drawPoseBody(c: Canvas, pose: PoseId) {
  if (pose === "zen") {
    c.sleeve(25, 53, 15, 57);
    c.sleeve(29, 53, 39, 57);
    c.stamp(PRAYER, 21, 40);
    return;
  }

  if (pose === "think") {
    // The folded arm, straight across the chest, its hand tucked at the far end.
    c.rect(11, 50, 43, 55, "U");
    c.rect(11, 51, 43, 54, "T");
    // The other arm rises from it to a fist under the chin.
    c.sleeve(20, 50, 20, 42, 6);
    c.stamp(FIST, 15, 34);
    return;
  }

  // fix: a bot on one palm, code over the other.
  c.sleeve(5, 53, 13, 57);
  c.stamp(BOT, 0, 39);
  c.stamp(HOLD, -1, 46);
  c.sleeve(41, 53, 34, 57);
  c.stamp(CODE, 35, 38);
  c.stamp(HOLD, 36, 46);
  for (const [x, y] of [
    [11, 36],
    [12, 38],
    [10, 34],
  ]) {
    c.set(x, y, "A");
  }
}

export function drawPose(pose: PoseId, blink = false): string[] {
  const c = new Canvas();
  const face = FACES[pose];
  drawEyes(c, blink && face.eyes !== "closed" ? "closed" : face.eyes);
  drawBrows(c, face.brows);
  drawMouth(c, face.mouth);
  drawGlasses(c);
  drawPoseBody(c, pose);
  return c.rows();
}

/* Where the ring centres, as fractions of the sprite: the top of his hair, so
   planets at the front of the orbit cross his hair and never his glasses. */
export const HEAD_CENTRE = { x: (26 + PAD_LEFT) / WIDTH, y: 8 / HEIGHT };
export const SPRITE_ROWS = HEIGHT;
