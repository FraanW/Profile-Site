"use client";

import Link from "next/link";
import { animate } from "animejs";
import { Handle, Position, BaseEdge, type EdgeProps, type NodeProps, type Node } from "@xyflow/react";
import { DURATION, easeGlide, prefersReducedMotion } from "@/lib/motion";

export type GraphNodeVariant = "ring" | "pill" | "dot";

export type GraphNodeData = {
  title: string;
  /** One-line description (blueprint §6.5). */
  note?: string;
  /** Real link into a /projects card. */
  href?: string;
  variant?: GraphNodeVariant;
  center?: boolean;
  /**
   * Which side of the ring the text sits on. Left-hemisphere radial nodes
   * (and left-column constellation nodes) use "left" so edges meet the ring
   * without crossing the label text.
   */
  labelSide?: "left" | "right";
  /**
   * Wrap the note to a narrow measure (constellation): keeps node widths
   * small so the rings form clean rails and edges never cross upper text.
   */
  noteClamp?: boolean;
};

const LEAF_OFF = "rgba(52, 204, 115, 0)";
const LEAF_ON = "rgba(52, 204, 115, 1)";

/**
 * The graph node, pure visual (also used standalone in Storybook).
 * Ring fills leaf-green AND thickens on hover via anime.js: leaf never
 * appears without its second channel (tokens.md §1.3).
 */
export function GraphNodeVisual({
  title,
  note,
  href,
  variant = "ring",
  center = false,
  labelSide = "right",
  noteClamp = false,
}: GraphNodeData) {
  const ring = (e: React.MouseEvent<HTMLElement>, on: boolean) => {
    if (prefersReducedMotion()) return;
    const mark = e.currentTarget.querySelector("[data-node-mark]");
    if (!mark) return;
    animate(mark, {
      ...(variant === "pill"
        ? { backgroundColor: on ? "rgba(52,204,115,0.28)" : "rgba(52,204,115,0)" }
        : { fill: on ? LEAF_ON : LEAF_OFF, strokeWidth: on ? 2.5 : 1.5 }),
      duration: DURATION.micro,
      ease: easeGlide,
    });
  };

  const markSize = center ? 26 : 16;
  const textLeft = labelSide === "left";

  const mark =
    variant === "dot" ? (
      <svg width={markSize} height={markSize} viewBox="0 0 16 16" aria-hidden="true">
        <circle data-node-mark cx="8" cy="8" r="4" fill="#065F46" stroke="#065F46" strokeWidth="1.5" />
      </svg>
    ) : (
      <svg width={markSize} height={markSize} viewBox="0 0 16 16" aria-hidden="true">
        <circle
          data-node-mark
          cx="8"
          cy="8"
          r="5.5"
          fill={LEAF_OFF}
          stroke="#065F46"
          strokeWidth={center ? 2.5 : 1.5}
        />
      </svg>
    );

  const titleEl = (
    <span className={`font-mono text-mono ${center ? "font-medium" : ""} text-ink`}>
      {title}
    </span>
  );

  const body =
    variant === "pill" ? (
      <span
        data-node-mark
        className={`inline-block border border-emerald bg-leaf/0 px-3 py-1.5 font-mono text-mono text-ink`}
        style={{ borderRadius: "var(--radius-node)", borderWidth: center ? 2 : 1 }}
      >
        {title}
      </span>
    ) : (
      // Text on the outward side of the ring so edges never cross it.
      <span className="flex items-center gap-2">
        {textLeft ? (
          <>
            {titleEl}
            {mark}
          </>
        ) : (
          <>
            {mark}
            {titleEl}
          </>
        )}
      </span>
    );

  const content = (
    <span className={`inline-flex flex-col gap-1 ${textLeft ? "items-end" : "items-start"}`}>
      {body}
      {note ? (
        // max-w-[19ch]: deliberate arbitrary value (no token for a node-note
        // measure); only active in the constellation via noteClamp.
        <span
          className={`font-mono text-label text-steel ${noteClamp ? "max-w-[19ch]" : ""} ${
            variant === "pill" ? "pl-3" : textLeft ? "pr-6 text-right" : "pl-6"
          }`}
        >
          {note}
        </span>
      ) : null}
    </span>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="group inline-block no-underline"
        onMouseEnter={(e) => ring(e, true)}
        onMouseLeave={(e) => ring(e, false)}
      >
        {content}
      </Link>
    );
  }
  return (
    <span
      className="inline-block"
      onMouseEnter={(e) => ring(e, true)}
      onMouseLeave={(e) => ring(e, false)}
    >
      {content}
    </span>
  );
}

/* ---------------- React Flow integration (blueprint §6.5) ---------------- */

export type FlowNode = Node<GraphNodeData, "graphNode">;

/** Handles are anchor points only: invisible, centered, non-interactive. */
const hiddenHandle: React.CSSProperties = {
  opacity: 0,
  pointerEvents: "none",
  width: 1,
  height: 1,
  minWidth: 0,
  minHeight: 0,
  border: "none",
  background: "transparent",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  position: "absolute",
};

export function FlowGraphNode({ data }: NodeProps<FlowNode>) {
  // Anchor edges on the ring mark itself, not the center of the whole
  // node (which includes labels): edges meet the circles, not the text.
  // With labelSide "left" the ring sits at the node's right edge, so the
  // anchor flips with it.
  const markOffset = data.center ? 13 : 8;
  const anchor: React.CSSProperties =
    data.variant === "pill"
      ? hiddenHandle
      : data.labelSide === "left"
        ? { ...hiddenHandle, left: "auto", right: markOffset, top: markOffset }
        : { ...hiddenHandle, left: markOffset, top: markOffset };
  return (
    <div className="relative">
      <Handle type="target" position={Position.Top} style={anchor} isConnectable={false} />
      <GraphNodeVisual {...data} />
      <Handle type="source" position={Position.Bottom} style={anchor} isConnectable={false} />
    </div>
  );
}

/**
 * Custom straight emerald edge: stroke-draw weight, non-scaling stroke, no
 * flow-chart styling. The `.graph-edge` class is the hook the section uses
 * to draw edges in with anime.js svg.createDrawable.
 */
export function EmeraldEdge({ id, sourceX, sourceY, targetX, targetY }: EdgeProps) {
  // Trim both ends so the line stops at the ring's rim instead of striking
  // through the mark.
  const dx = targetX - sourceX;
  const dy = targetY - sourceY;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const padSource = Math.min(14, len / 3);
  const padTarget = Math.min(11, len / 3);
  const x1 = sourceX + ux * padSource;
  const y1 = sourceY + uy * padSource;
  const x2 = targetX - ux * padTarget;
  const y2 = targetY - uy * padTarget;
  return (
    <BaseEdge
      id={id}
      path={`M ${x1},${y1} L ${x2},${y2}`}
      className="graph-edge"
      interactionWidth={0}
      style={{ stroke: "#065F46", strokeWidth: 1.5, vectorEffect: "non-scaling-stroke" }}
    />
  );
}
