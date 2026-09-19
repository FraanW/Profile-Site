"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * The discovery loop as UPG actually models it: typed entities joined by typed
 * edges, rather than a decorative node cloud.
 *
 * The layout is fixed and deliberate. Persona leads to Need leads to
 * Opportunity and so on around to Insight, which feeds back into Product. The
 * two cross-links are the ones that matter in practice: Product speaks directly
 * to Opportunity, and a Need can be tested as a Hypothesis without waiting for
 * the loop to come round.
 *
 * Motion is CSS only, so it runs off the main thread, and it is paused outright
 * whenever the graph is scrolled away or the viewer asked for less motion.
 */

type Node = { id: string; label: string; x: number; y: number; anchor?: boolean };

const NODES: Node[] = [
  { id: "product", label: "Product", x: 96, y: 196, anchor: true },
  { id: "persona", label: "Persona", x: 246, y: 86 },
  { id: "need", label: "Need", x: 392, y: 58 },
  { id: "opportunity", label: "Opportunity", x: 546, y: 118 },
  { id: "solution", label: "Solution", x: 678, y: 208 },
  { id: "hypothesis", label: "Hypothesis", x: 592, y: 312 },
  { id: "experiment", label: "Experiment", x: 424, y: 344 },
  { id: "insight", label: "Insight", x: 258, y: 300 },
];

const EDGES: [string, string][] = [
  ["product", "persona"],
  ["persona", "need"],
  ["need", "opportunity"],
  ["opportunity", "solution"],
  ["solution", "hypothesis"],
  ["hypothesis", "experiment"],
  ["experiment", "insight"],
  ["insight", "product"],
  ["product", "opportunity"],
  ["need", "hypothesis"],
];

const byId = Object.fromEntries(NODES.map((n) => [n.id, n]));

export function ProductGraph({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(Boolean(entry?.isIntersecting)),
      { rootMargin: "100px" },
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={hostRef}
      className={cn("upg-graph", className)}
      data-active={active ? "true" : "false"}
    >
      <svg
        viewBox="0 0 760 400"
        className="h-auto w-full"
        role="img"
        aria-label="A product graph: Product, Persona, Need, Opportunity, Solution, Hypothesis, Experiment and Insight, joined as a loop of typed relationships."
      >
        <g>
          {EDGES.map(([fromId, toId], index) => {
            const from = byId[fromId]!;
            const to = byId[toId]!;
            const length = Math.hypot(to.x - from.x, to.y - from.y);
            return (
              <g key={`${fromId}-${toId}`}>
                {/* The relationship itself, drawn once as the section arrives. */}
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  className="upg-edge"
                  style={
                    {
                      "--len": length,
                      "--delay": `${index * 90}ms`,
                    } as React.CSSProperties
                  }
                />
                {/* Context moving along it, which is the whole point. */}
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  className="upg-pulse"
                  style={
                    {
                      "--len": length,
                      "--delay": `${index * 420}ms`,
                    } as React.CSSProperties
                  }
                />
              </g>
            );
          })}
        </g>

        <g>
          {NODES.map((node, index) => (
            <g
              key={node.id}
              className="upg-node"
              style={{ "--delay": `${420 + index * 80}ms` } as React.CSSProperties}
            >
              <circle
                cx={node.x}
                cy={node.y}
                r={node.anchor ? 13 : 7}
                className={node.anchor ? "upg-dot upg-dot-anchor" : "upg-dot"}
              />
              <text
                x={node.x}
                y={node.y - (node.anchor ? 26 : 19)}
                textAnchor="middle"
                className={node.anchor ? "upg-label upg-label-anchor" : "upg-label"}
              >
                {node.label}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

export default ProductGraph;
