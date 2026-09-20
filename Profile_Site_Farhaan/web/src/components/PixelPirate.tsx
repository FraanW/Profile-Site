"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { PixelArt, type Palette } from "@/components/PixelArt";
import { cn } from "@/lib/utils";

/**
 * The avatar from the hero, redrawn as a head in a captain's tricorn, sitting
 * on the rule under "Things I have built." It is the invitation to the shelf.
 *
 * Owner brief, 2026-09-19: a CTA to the projects for someone who has scrolled
 * this far; orientation follows the mouse; it smiles when the pointer is near
 * and is sad when it is far; a pirate hat. The tricorn was his pick from three.
 * Extended 2026-09-20: when the pointer is near he does not merely smile, he
 * throws an arm out at the link and jabs at it, bouncing on every jab.
 *
 * How it "turns": the head outline and hat stay put while the face (brows,
 * eyes, nose, mouth) slides one sprite pixel toward the pointer, and the whole
 * head tilts a few degrees. At this resolution that reads as a three-quarter
 * turn, which a straight mirror flip of a symmetric face would not.
 *
 * Everything that changes is a small state (mood, look, blink), so the sprite
 * re-renders only when one of them flips. The tilt is continuous, so it is
 * written straight to the element's style instead of going through React.
 */

type Mood = "happy" | "neutral" | "sad";
type Look = -1 | 0 | 1;

/* Pointer distance from the face, in CSS pixels. Between the two is neutral. */
const NEAR = 240;
const FAR = 520;

const PALETTE: Palette = {
  K: "#1b1e27", // hat
  L: "#f4efe2", // hat trim
  X: "#f4efe2", // skull
  H: "#1e201d", // hair, moustache
  S: "#516353", // skin, the hero avatar's own tone
  D: "#2a342c", // brows, nose, mouth
  W: "#dcefe0", // eye whites
  P: "#101210", // pupils
  B: "#86656b", // blush, only when happy
  T: "#a5bea9", // sleeve, the hero avatar's shirt
  F: "#0d0f0d", // glasses frames: he wears them, so every avatar of him does
  O: "#4c6099", // outline, so a dark head survives a dark sky
};

/* The speech bubble's tails: right at the head from lg up, down at it below. */
const TAIL_RIGHT = ["F..", "BF.", "BBF", "BF.", "F.."];
const TAIL_DOWN = ["FBBBF", ".FBF.", "..F.."];
const TAIL_PALETTE: Palette = { F: "#f4efe2", B: "#1b2340" };

/* The head with the features left out. 29 wide, chin on the bottom row. */
const BASE = [
  "..KK.....................KK..",
  "..KKK.......KKKKK.......KKK..",
  "...KKK...KKKKKKKKKKK...KKK...",
  "...KKKKKKKKKKXXXKKKKKKKKKK...",
  "....KKKKKKKKXKXKXKKKKKKKK....",
  "....KKKKKKKKKXXXKKKKKKKKK....",
  ".....KKKKKKKKXKXKKKKKKKK.....",
  "....LLLLLLLLLLLLLLLLLLLLL....",
  "....HHHHHHHHHHHHHHHHHHHHH....",
  "....HHSSSSSSSSSSSSSSSSSHH....",
  "....HHSSSSSSSSSSSSSSSSSHH....",
  "....HHSSSSSSSSSSSSSSSSSHH....",
  "....HSSSSSSSSSSSSSSSSSSSH....",
  "...SSSSSSSSSSSSSSSSSSSSSSS...",
  "...SSSSSSSSSSSSSSSSSSSSSSS...",
  "...SSSSSSSSSSSSSSSSSSSSSSS...",
  "....SSSSSSSSSSSSSSSSSSSSS....",
  "....SSSSSSSSSSSSSSSSSSSSS....",
  ".....SSSSSSSSSSSSSSSSSSS.....",
  ".....SSSSSSSSSSSSSSSSSSS.....",
  "......SSSSSSSSSSSSSSSSS......",
  ".......SSSSSSSSSSSSSSS.......",
  "........SSSSSSSSSSSSS........",
  "..........SSSSSSSSS..........",
];

const BROWS: Record<Mood, [number, number][]> = {
  happy: [[7, 11], [8, 10], [9, 10], [10, 11], [18, 11], [19, 10], [20, 10], [21, 11]],
  neutral: [[7, 11], [8, 11], [9, 11], [10, 11], [18, 11], [19, 11], [20, 11], [21, 11]],
  // Inner ends raised: the worried slope.
  sad: [[7, 11], [8, 11], [9, 10], [10, 10], [18, 10], [19, 10], [20, 11], [21, 11]],
};

/* Two rows, nine columns, under the moustache. */
const MOUTHS: Record<Mood, [string, string]> = {
  happy: ["SDSSSSSDS", "SSDDDDDSS"],
  neutral: ["SSSSSSSSS", "SSDDDDDSS"],
  sad: ["SSDDDDDSS", "SDSSSSSDS"],
};

const NOSE: [number, number][] = [
  [14, 13], [14, 14], [13, 15], [14, 15], [15, 15],
  [12, 16], [13, 16], [14, 16], [15, 16], [16, 16],
];

/*
  Hands, owner's addition 2026-09-19: both rest on the rule while the pointer
  is near, and when it is far the right one goes up and waves for attention.
  Coordinates are in the widened canvas: three columns added on the left and
  seven on the right, where the raised arm needs the room.
*/
const PAD_LEFT = 3;
/*
  The right pad carries the pointing arm, which needs far more room than the
  waving one: a hand big enough to read as a hand is about a third of the head.
  Widening it moves the visible head left of the bubble's tail, so the sprite
  takes a negative right margin of exactly the six columns this grew by (it was
  seven) to put the head back. Change this number and change that margin too.
*/
const PAD_RIGHT = 13;

const HAND_LEFT = [".SSSS.", "SSSSSS", "SDSDSS"];
const HAND_RIGHT = [".SSSS.", "SSSSSS", "SSDSDS"];

const SLEEVE = Array<string>(9).fill("..TTT..");
const ARM_UP: [string[], string[]] = [
  [".S.S.S.", ".S.S.S.", ".SSSSS.", "SSSSSS.", "..SSS..", "..SSS..", ...SLEEVE],
  ["..S.S.S", ".S.S.S.", ".SSSSS.", "SSSSSS.", "..SSS..", "..SSS..", ...SLEEVE],
];

/*
  The pointing arm, owner's addition 2026-09-20, drawn to a reference he gave:
  a forearm up from the rule, a closed fist, and the hand held out at the link.

  Three passes were rejected before this one, and each rejection taught it
  something. The first two kept inside the old seven-column pad, where a hand
  can only be a stub with a nub on it, so it read as a mitten. The third had the
  room but animated the index finger alone, growing and shrinking out of a
  closed fist, which at three screen pixels a block read as something other than
  a hand and could not be unseen.

  So the hand no longer changes shape at all. The thumb stands straight up and
  the index runs straight out, a right angle with the corner at the knuckles,
  which is the one arrangement that can only be read as pointing. What moves is
  the whole arm: the same sprite, stamped two columns apart, jabbing toward the
  link. Owner's call, and the right one.
*/
const ARM_POINT = [
  "..S........", // the thumb: one column, because two read as a block, and it
  "..S........", // takes an outline either side, so it carries three on screen
  "..SS.......", // and only widens where it meets the knuckles
  ".SSSSSSSSSS", // the index, straight out at the link, level with his eyes
  ".SSSSS.....", // the curled fingers
  ".SSSSD.....", // and the crease across them
  ".SSSSS.....",
  "..SSS......", // the heel of the hand, narrowing into the wrist
  ...Array<string>(5).fill("..TTT......"), // the forearm, down to the rule
];
/* Where the arm stands on each frame. Two columns is the whole jab. */
const POINT_X = [30, 32] as const;

function compose(mood: Mood, look: Look, blink: boolean, wave: 0 | 1): string[] {
  const grid = BASE.map((row) => row.split(""));
  const set = (x: number, y: number, ch: string) => {
    if (grid[y]?.[x] !== undefined) grid[y][x] = ch;
  };
  const at = (x: number) => x + look;

  for (const [x, y] of BROWS[mood]) set(at(x), y, "D");

  for (const left of [6, 19]) {
    for (let dx = 0; dx < 4; dx += 1) {
      set(at(left + dx), 13, blink ? "S" : "W");
      set(at(left + dx), 14, blink ? "D" : "W");
    }
    if (!blink) {
      // The pupil sits at the edge of the eye it is looking toward.
      const pupil = left + look + 1;
      for (const y of [13, 14]) {
        set(at(pupil), y, "P");
        set(at(pupil + 1), y, "P");
      }
    }
  }

  // Glasses, moving with the face. Frames sit round the eyes, the bridge on
  // the nose and the arms run back into the hair.
  for (const left of [5, 18]) {
    for (let x = left; x <= left + 5; x += 1) {
      set(at(x), 12, "F");
      set(at(x), 15, "F");
    }
    set(at(left), 13, "F");
    set(at(left), 14, "F");
    set(at(left + 5), 13, "F");
    set(at(left + 5), 14, "F");
  }
  for (let x = 11; x <= 17; x += 1) set(at(x), 13, "F");
  set(at(4), 13, "F");
  set(at(24), 13, "F");

  for (const [x, y] of NOSE) if (y > 13) set(at(x), y, "D");
  if (mood === "happy") for (const x of [7, 8, 20, 21]) set(at(x), 16, "B");
  for (let x = 10; x <= 18; x += 1) set(at(x), 18, "H");
  MOUTHS[mood].forEach((row, i) => {
    row.split("").forEach((ch, dx) => set(at(10 + dx), 19 + i, ch));
  });

  // Widen for the hands. A gap column is left between each hand and the face,
  // so the outline runs between them instead of the two merging into one blob.
  const wide = grid.map((row) => [
    ...Array<string>(PAD_LEFT).fill("."),
    ...row,
    ...Array<string>(PAD_RIGHT).fill("."),
  ]);
  const stamp = (rows: readonly string[], left: number, top: number) =>
    rows.forEach((row, y) =>
      [...row].forEach((ch, x) => {
        if (ch !== ".") wide[top + y][left + x] = ch;
      }),
    );
  const bottom = wide.length - 1;
  stamp(HAND_LEFT, 3, bottom - 2);
  if (mood === "sad") stamp(ARM_UP[wave], 29, bottom - 14);
  // Even drawn back, the fist leaves two clear columns to the cheek, so the
  // outline runs between them instead of welding the hand to the face.
  else if (mood === "happy") stamp(ARM_POINT, POINT_X[wave], bottom - 12);
  else stamp(HAND_RIGHT, 26, bottom - 2);

  // Pad the top and sides by one, then ring the silhouette with the outline.
  // No pad at the bottom: the chin and the hands sit flat on the rule.
  const padded = [
    Array(wide[0].length + 2).fill("."),
    ...wide.map((row) => [".", ...row, "."]),
  ];
  const outlined = padded.map((row) => [...row]);
  padded.forEach((row, y) =>
    row.forEach((ch, x) => {
      if (ch !== ".") return;
      const touches = [
        padded[y - 1]?.[x],
        padded[y + 1]?.[x],
        row[x - 1],
        row[x + 1],
      ].some((n) => n !== undefined && n !== ".");
      if (touches) outlined[y][x] = "O";
    }),
  );
  return outlined.map((row) => row.join(""));
}

export function PixelPirate({
  href,
  message,
  scale = 3,
  className,
}: {
  href: string;
  message: string;
  scale?: number;
  className?: string;
}) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const faceRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const hopRef = useRef<HTMLDivElement>(null);

  const [mood, setMood] = useState<Mood>("happy");
  const [look, setLook] = useState<Look>(0);
  const [blink, setBlink] = useState(false);
  const [wave, setWave] = useState<0 | 1>(0);
  const [onScreen, setOnScreen] = useState(false);
  const [finePointer, setFinePointer] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setFinePointer(fine.matches);
      setReduced(motion.matches);
    };
    sync();
    fine.addEventListener("change", sync);
    motion.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      motion.removeEventListener("change", sync);
    };
  }, []);

  // Nothing tracks the pointer while he is off screen.
  useEffect(() => {
    const link = linkRef.current;
    if (!link) return;
    const observer = new IntersectionObserver(
      ([entry]) => setOnScreen(Boolean(entry?.isIntersecting)),
      { rootMargin: "200px" },
    );
    observer.observe(link);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!onScreen || !finePointer) return;
    let frame = 0;
    let pointer: { x: number; y: number } | null = null;

    const update = () => {
      frame = 0;
      const face = faceRef.current;
      if (!pointer || !face) return;
      const box = face.getBoundingClientRect();
      const dx = pointer.x - (box.left + box.width / 2);
      const dy = pointer.y - (box.top + box.height * 0.6);
      const distance = Math.hypot(dx, dy);
      setMood(distance < NEAR ? "happy" : distance > FAR ? "sad" : "neutral");
      setLook(dx < -36 ? -1 : dx > 36 ? 1 : 0);
      if (tiltRef.current) {
        const tilt = Math.max(-1, Math.min(1, dx / 360)) * 7;
        tiltRef.current.style.transform = `rotate(${tilt.toFixed(2)}deg)`;
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onMove = (event: PointerEvent) => {
      pointer = { x: event.clientX, y: event.clientY };
      schedule();
    };
    // A pointer that has left the window is as far away as it gets.
    const onLeave = () => {
      pointer = null;
      setMood("sad");
      setLook(0);
      if (tiltRef.current) tiltRef.current.style.transform = "rotate(0deg)";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", schedule, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", schedule);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [onScreen, finePointer]);

  // The raised hand runs off one two-frame toggle: waving for attention while
  // he is ignored, jabbing at the link once the pointer is near. The jab is the
  // quicker of the two, because he is pleased rather than patient.
  useEffect(() => {
    if (mood === "neutral" || !onScreen || reduced) return;
    const id = window.setInterval(
      () => setWave((w) => (w === 0 ? 1 : 0)),
      mood === "happy" ? 230 : 280,
    );
    return () => window.clearInterval(id);
  }, [mood, onScreen, reduced]);

  /*
    The frame the arm is actually drawn on. Read through here rather than reset
    when the toggle stops, so a stilled arm always lands on the first frame
    instead of keeping whichever one it was on: under reduced motion he holds a
    steady point, not a half-finished jab.
  */
  const frame: 0 | 1 = reduced ? 0 : wave;

  // An occasional blink, at uneven intervals so it never looks mechanical.
  useEffect(() => {
    if (!onScreen) return;
    let open = 0;
    let shut = 0;
    const next = () => {
      shut = window.setTimeout(() => {
        setBlink(true);
        open = window.setTimeout(() => {
          setBlink(false);
          next();
        }, 140);
      }, 2400 + Math.random() * 3600);
    };
    next();
    return () => {
      window.clearTimeout(shut);
      window.clearTimeout(open);
    };
  }, [onScreen]);

  // A small hop whenever he cheers up. Stepped, so it moves like a sprite.
  const previousMood = useRef<Mood>(mood);
  useEffect(() => {
    const was = previousMood.current;
    previousMood.current = mood;
    if (mood !== "happy" || was === "happy" || reduced) return;
    hopRef.current?.animate(
      [
        { transform: "translateY(0)" },
        { transform: `translateY(-${scale * 2}px)` },
        { transform: "translateY(0)" },
      ],
      { duration: 300, easing: "steps(4, end)" },
    );
  }, [mood, reduced, scale]);

  const rows = useMemo(() => compose(mood, look, blink, frame), [mood, look, blink, frame]);

  return (
    <Link
      ref={linkRef}
      href={href}
      aria-label={message}
      className={cn("group flex flex-col items-end lg:flex-row lg:gap-2", className)}
      onFocus={() => setMood("happy")}
    >
      {/*
        Above the head on narrow screens, beside it from lg up. Each layout
        has its own tail; the first row or column of each sits over the
        bubble's frame and opens it.
      */}
      <span className="pixel-bubble mx-[3px] mb-[20px] max-w-[210px] text-[13.5px] leading-snug text-ivory transition-colors group-hover:text-signal group-focus-visible:text-signal lg:mb-[34px] lg:mr-[13px] lg:max-w-[230px] lg:text-[14.5px]">
        {message}
        <PixelArt
          rows={TAIL_RIGHT}
          palette={TAIL_PALETTE}
          scale={3}
          className="absolute bottom-[10px] left-full hidden lg:block"
        />
        <PixelArt
          rows={TAIL_DOWN}
          palette={TAIL_PALETTE}
          scale={3}
          className="absolute right-[20px] top-full sm:right-[36px] lg:hidden"
        />
      </span>
      <div ref={faceRef} className="shrink-0">
        <div
          ref={tiltRef}
          className="origin-bottom"
          style={{ transition: reduced ? "none" : "transform 220ms cubic-bezier(0.16,1,0.3,1)" }}
        >
          <div ref={hopRef}>
            {/*
              He leans toward the link on the reaching frame. Together with the
              finger's own two pixels that is a nudge of five, off one counter,
              so the lean and the reach cannot drift apart.
            */}
            <div
              style={{
                transform:
                  mood === "happy" && frame === 1 ? `translateX(${scale}px)` : undefined,
              }}
            >
              {/*
                Two sprite pixels per block on phones, three from sm up: whole
                numbers stay crisp. The sprite is 25 rows, so those heights are
                exactly 2px and 3px a block, and the negative margins are
                PAD_GROWTH blocks at each: 6x2 and 6x3. They cancel the room the
                pointing arm needs, so the head sits where it did before the arm
                existed and the bubble's tail still meets it. Literals, because
                Tailwind only emits classes it can read in the source.
              */}
              <PixelArt
                rows={rows}
                palette={PALETTE}
                scale={scale}
                className="-mr-[12px] block h-[50px] w-auto sm:-mr-[18px] sm:h-[75px]"
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PixelPirate;
