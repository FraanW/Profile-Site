"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  ReactFlow,
  type Edge,
  type EdgeTypes,
  type NodeTypes,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { animate, onScroll, stagger, svg, utils } from "animejs";
import { Section } from "@/components/Section";
import {
  EmeraldEdge,
  FlowGraphNode,
  type FlowNode,
  type GraphNodeVariant,
} from "@/components/GraphNode";
import {
  DURATION,
  STAGGER_STEP,
  easeDraw,
  prefersReducedMotion,
  type RevealMode,
} from "@/lib/motion";
import { graphSection } from "@/content/copy";
import { identity } from "@/content/profile";
import { projects } from "@/content/projects";

export type RadialGraphLayout = "radial" | "constellation";

const nodeTypes: NodeTypes = { graphNode: FlowGraphNode };
const edgeTypes: EdgeTypes = { emerald: EmeraldEdge };

/* Breakpoint mapping (tokens.md §3.5): radial >= lg, constellation below.
   A layout choice, not motion, so it is not gated by reduced-motion. The
   server snapshot assumes lg (radial); a mobile client corrects during
   hydration and the ReactFlow `key` remounts with a fresh fitView, well
   before the section scrolls into view. */
const LG_QUERY = "(min-width: 1024px)";

function subscribeLg(callback: () => void) {
  const mql = window.matchMedia(LG_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function useIsLg(): boolean {
  return useSyncExternalStore(
    subscribeLg,
    () => window.matchMedia(LG_QUERY).matches,
    () => true
  );
}

function buildGraph(layout: RadialGraphLayout, nodeVariant: GraphNodeVariant) {
  const center: FlowNode = {
    id: "farhaan",
    type: "graphNode",
    position: { x: 0, y: 0 },
    data: { title: "farhaan", center: true, variant: nodeVariant },
    draggable: false,
    selectable: false,
  };

  const nodes: FlowNode[] = [center];
  const edges: Edge[] = [];

  projects.forEach((p, i) => {
    let x: number;
    let y: number;
    if (layout === "radial") {
      // Radial (>= lg): projects radiate from the center (blueprint §6.5).
      const angle = (-90 + (360 / projects.length) * i) * (Math.PI / 180);
      x = Math.cos(angle) * 340;
      y = Math.sin(angle) * 220;
    } else {
      // Constellation (< lg): center node top, nodes cascading down,
      // edges still drawn (blueprint §6.5 mobile reflow). Symmetric rails
      // plus clamped text (title and note, GraphNode noteClamp) keep every
      // ring near its rail, so the edge fan runs between the rails, clear
      // of all text. Rails +-90 (was +-140): with the clamped card measure
      // (~161px) the whole cascade fits a 360px viewport at fitView zoom
      // ~0.75 instead of hitting the minZoom clamp and clipping cards
      // off-screen; box edges stay short of x=0 so the fan corridor
      // survives the narrower rails.
      x = i % 2 === 0 ? -90 : 90;
      y = 110 + i * 96;
    }
    // Text sits on the outward side: left-hemisphere (radial) and
    // left-column (constellation) nodes flip their labels left so the
    // edges, which run toward the center, never cross the text.
    const labelSide: "left" | "right" = x < -1 ? "left" : "right";
    nodes.push({
      id: p.slug,
      type: "graphNode",
      position: { x, y },
      data: {
        title: p.name.toLowerCase(),
        note: p.graphNote,
        href: `/projects#${p.slug}`,
        variant: nodeVariant,
        labelSide,
        noteClamp: layout === "constellation",
      },
      draggable: false,
      selectable: false,
    });
    edges.push({
      id: `farhaan-${p.slug}`,
      source: "farhaan",
      target: p.slug,
      type: "emerald",
      focusable: false,
    });
  });

  return { nodes, edges };
}

/**
 * The signature section (blueprint §6.5): static React Flow — no pan, no
 * zoom, no drag, no dotted background. Farhaan at the center, projects
 * radiating, every node a real link into /projects. Edges draw in once on
 * scroll-into-view via anime.js svg.createDrawable.
 */
export function RadialGraph({
  layout = "auto",
  nodeVariant = "ring",
  mode = "scroll",
}: {
  /** "auto" (default) follows tokens.md §3.5: radial >= lg, constellation
      below. Explicit values pin a layout (Storybook variants). */
  layout?: RadialGraphLayout | "auto";
  nodeVariant?: GraphNodeVariant;
  mode?: RevealMode;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  // Counts ReactFlow inits (0 = none yet). A counter, not a boolean: the
  // layout `key` remounts ReactFlow, and each new instance must re-trigger
  // the edge draw-in effect against its own freshly rendered paths.
  const [ready, setReady] = useState(0);
  const isLg = useIsLg();
  const resolved: RadialGraphLayout =
    layout === "auto" ? (isLg ? "radial" : "constellation") : layout;
  const { nodes, edges } = buildGraph(resolved, nodeVariant);

  useEffect(() => {
    if (!ready || mode === "none" || prefersReducedMotion()) return;
    const wrap = wrapRef.current;
    if (!wrap) return;

    const paths = wrap.querySelectorAll<SVGPathElement>(".react-flow__edge-path");
    if (paths.length === 0) return;

    const drawables = svg.createDrawable(paths);
    utils.set(drawables, { draw: "0 0" });
    const anim = animate(drawables, {
      draw: "0 1",
      duration: DURATION.draw,
      ease: easeDraw,
      delay: stagger(STAGGER_STEP),
      ...(mode === "scroll"
        ? { autoplay: onScroll({ target: wrap, enter: "bottom top" }) }
        : {}),
    });

    return () => {
      anim.revert();
    };
    // graph rebuilds on layout/variant change; each remounted instance
    // re-triggers this effect through the `ready` init counter
  }, [ready, mode, resolved, nodeVariant]);

  return (
    <Section id="graph" heading={graphSection.heading} mode={mode}>
      <p className="max-w-narrow text-body text-ink">{graphSection.intro}</p>

      {/* Constellation heights: h-[760px] keeps fitView width-constrained at
          phone widths (no dead vertical band); md:h-[900px] lets tablets
          render the cascade near token-true zoom 1. Deliberate arbitrary
          values: the wrap is sized to the graph's drawing, no spacing token
          applies. */}
      <div
        ref={wrapRef}
        className={
          resolved === "constellation"
            ? "mx-auto mt-6 h-[760px] max-w-sm md:h-[900px]"
            : "mt-6 h-[560px]"
        }
      >
        <ReactFlow
          key={`${resolved}-${nodeVariant}`}
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          nodeOrigin={[0.5, 0.5]}
          fitView
          // Constellation: tighter padding spends the scarce phone width on
          // the drawing; maxZoom 1 pins text at token size (never inflated).
          fitViewOptions={
            resolved === "constellation"
              ? { padding: 0.06, maxZoom: 1 }
              : { padding: 0.12 }
          }
          onInit={() => requestAnimationFrame(() => setReady((n) => n + 1))}
          nodesDraggable={false}
          nodesConnectable={false}
          nodesFocusable={false}
          edgesFocusable={false}
          elementsSelectable={false}
          panOnDrag={false}
          panOnScroll={false}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          preventScrolling={false}
          minZoom={0.4}
          maxZoom={1.6}
          proOptions={{ hideAttribution: true }}
          style={{ background: "transparent" }}
        />
      </div>

      {/* The graph's content, as plain links (blueprint §9.4: keyboard and
          screen-reader paths never depend on the graph). */}
      <nav aria-label="Projects on the graph" className="sr-only">
        <ul>
          {projects.map((p) => (
            <li key={p.slug}>
              <Link href={`/projects#${p.slug}`}>
                {p.name}: {p.graphNote}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <p className="mt-6 font-mono text-mono">
        <Link
          href="/projects"
          className="text-emerald underline decoration-rule underline-offset-4"
        >
          ▸ all projects, as cards
        </Link>
        <span className="ml-4 text-steel">{identity.stackLine}</span>
      </p>
    </Section>
  );
}
