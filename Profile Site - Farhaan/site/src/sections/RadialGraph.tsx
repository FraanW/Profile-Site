"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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
      // edges still drawn (blueprint §6.5 mobile reflow).
      x = i % 2 === 0 ? -120 : 90;
      y = 110 + i * 96;
    }
    nodes.push({
      id: p.slug,
      type: "graphNode",
      position: { x, y },
      data: {
        title: p.name.toLowerCase(),
        note: p.graphNote,
        href: `/projects#${p.slug}`,
        variant: nodeVariant,
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
  layout = "radial",
  nodeVariant = "ring",
  mode = "scroll",
}: {
  layout?: RadialGraphLayout;
  nodeVariant?: GraphNodeVariant;
  mode?: RevealMode;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const { nodes, edges } = buildGraph(layout, nodeVariant);

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
    // graph rebuilds on layout/variant change; ready flips back via key remount
  }, [ready, mode, layout, nodeVariant]);

  return (
    <Section id="graph" heading={graphSection.heading} mode={mode}>
      <p className="max-w-narrow text-body text-ink">{graphSection.intro}</p>

      <div
        ref={wrapRef}
        className={layout === "constellation" ? "mx-auto mt-6 h-[900px] max-w-sm" : "mt-6 h-[560px]"}
      >
        <ReactFlow
          key={`${layout}-${nodeVariant}`}
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          nodeOrigin={[0.5, 0.5]}
          fitView
          fitViewOptions={{ padding: 0.12 }}
          onInit={() => requestAnimationFrame(() => setReady(true))}
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
