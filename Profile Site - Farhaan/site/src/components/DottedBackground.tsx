"use client";

import { animate, createTimer, type Timer } from "animejs";
import { useEffect, useId, useRef } from "react";
import { easeDraw, prefersReducedMotion } from "@/lib/motion";

export type DottedBackgroundVariant = "paper" | "drift" | "ripple" | "emerald";

/* Palette strictly from tokens: dots must read as drafting paper, never as a
   particle background. Densities and amplitudes are deliberately subliminal. */
const DOT_BONE = "#D8E4DA"; // rule-faint on bone
const DOT_BONE_STRONG = "#C0D5C9"; // rule, for the cursor lift only
const DOT_EMERALD = "#B7CFC2"; // bone-muted tint on the emerald field
const SPACING = 24;
const RADIUS = 1;

function DotPattern({
  id,
  fill,
  opacity = 1,
}: {
  id: string;
  fill: string;
  opacity?: number;
}) {
  return (
    <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <pattern id={id} width={SPACING} height={SPACING} patternUnits="userSpaceOnUse">
          <circle cx={SPACING / 2} cy={SPACING / 2} r={RADIUS} fill={fill} opacity={opacity} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/**
 * Full-page dotted field, four variants (owner request, 2026-07-10):
 *
 * - "paper":   static drafting-paper dot grid. The control sample.
 * - "drift":   two pattern layers breathe at very low amplitude, driven by
 *              anime.js. Ambient on purpose: the one sanctioned exception to
 *              "nothing floats idle", prototyped for the owner to judge.
 * - "ripple":  dots lift near the pointer and settle after. Canvas field;
 *              the draw loop is timed by anime.js createTimer, pointer decay
 *              eased per frame. Fine-pointer devices only; others get "paper".
 * - "emerald": the same paper grid tinted bone-muted for the hero field.
 *
 * prefers-reduced-motion: every variant renders the static frame, no timers.
 * Performance: 3 tweened layers (drift) or one canvas loop (ripple); never
 * a tween per dot.
 */
export function DottedBackground({
  variant = "paper",
  className = "",
}: {
  variant?: DottedBackgroundVariant;
  className?: string;
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* ---- drift: layered pattern translation, anime.js loop ---- */
  useEffect(() => {
    if (variant !== "drift") return;
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const layers = Array.from(root.querySelectorAll<HTMLElement>("[data-drift-layer]"));
    const anims = [
      animate(layers[0], {
        translateX: [-4, 4],
        translateY: [3, -3],
        duration: 16000,
        alternate: true,
        loop: true,
        ease: easeDraw,
      }),
      animate(layers[1], {
        translateX: [5, -5],
        translateY: [-4, 4],
        opacity: [0.45, 0.85],
        duration: 21000,
        alternate: true,
        loop: true,
        ease: easeDraw,
      }),
    ];
    return () => anims.forEach((a) => a.revert());
  }, [variant]);

  /* ---- ripple: canvas grid, draw loop timed by anime.js createTimer ---- */
  useEffect(() => {
    if (variant !== "ripple") return;
    const canvas = canvasRef.current;
    const root = rootRef.current;
    if (!canvas || !root) return;
    if (prefersReducedMotion() || !window.matchMedia("(pointer: fine)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    let energy = 0;
    let targetEnergy = 0;
    let timer: Timer | null = null;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const { width, height } = root.getBoundingClientRect();
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      draw();
    };

    const SIGMA = 70;
    const draw = () => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // opaque bone ground: the canvas replaces the static fallback while live
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#F5F6EE";
      ctx.fillRect(0, 0, w, h);
      for (let x = SPACING / 2; x < w; x += SPACING) {
        for (let y = SPACING / 2; y < h; y += SPACING) {
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const lift = energy * Math.exp(-(dx * dx + dy * dy) / (2 * SIGMA * SIGMA));
          const r = RADIUS + 1.1 * lift;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fillStyle = lift > 0.08 ? DOT_BONE_STRONG : DOT_BONE;
          ctx.globalAlpha = 0.85 + 0.15 * lift;
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const stopIfSettled = () => {
      if (timer && targetEnergy === 0 && energy < 0.01) {
        energy = 0;
        draw();
        timer.pause();
      }
    };

    const ensureTimer = () => {
      if (!timer) {
        timer = createTimer({
          onUpdate: (self) => {
            const dt = Math.min(self.deltaTime || 16, 48);
            const k = 1 - Math.exp(-dt * 0.008);
            pointer.x += (pointer.tx - pointer.x) * k;
            pointer.y += (pointer.ty - pointer.y) * k;
            energy += (targetEnergy - energy) * k;
            draw();
            stopIfSettled();
          },
        });
      } else {
        timer.play();
      }
    };

    // The field itself is pointer-events-none (it must never intercept the
    // page), so pointer proximity is read from the window.
    const onMove = (e: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      pointer.tx = e.clientX - rect.left;
      pointer.ty = e.clientY - rect.top;
      targetEnergy = inside ? 1 : 0;
      ensureTimer();
    };
    const onLeave = () => {
      targetEnergy = 0;
      ensureTimer();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(root);
    resize();
    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      timer?.cancel();
    };
  }, [variant]);

  const emerald = variant === "emerald";

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${
        emerald ? "bg-emerald" : "bg-bone"
      } ${className}`}
    >
      {variant === "paper" || variant === "emerald" ? (
        <DotPattern
          id={`dots-${uid}`}
          fill={emerald ? DOT_EMERALD : DOT_BONE}
          opacity={emerald ? 0.5 : 1}
        />
      ) : null}

      {variant === "drift" ? (
        <>
          <div data-drift-layer className="absolute -inset-4">
            <DotPattern id={`dots-a-${uid}`} fill={DOT_BONE} />
          </div>
          <div data-drift-layer className="absolute -inset-4" style={{ opacity: 0.6 }}>
            {/* second layer offset half a cell for a finer weave */}
            <div className="absolute inset-0" style={{ transform: `translate(${SPACING / 2}px, ${SPACING / 2}px)` }}>
              <DotPattern id={`dots-b-${uid}`} fill={DOT_BONE} opacity={0.7} />
            </div>
          </div>
        </>
      ) : null}

      {variant === "ripple" ? (
        <>
          {/* static fallback under the canvas: coarse pointers and reduced
              motion read this; the canvas only paints for fine pointers */}
          <DotPattern id={`dots-fallback-${uid}`} fill={DOT_BONE} />
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        </>
      ) : null}
    </div>
  );
}
