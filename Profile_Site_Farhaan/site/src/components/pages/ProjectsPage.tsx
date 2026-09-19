"use client";

import { Reveal } from "@/components/Reveal";
import { NodeCard } from "@/components/NodeCard";
import { TopBar } from "@/components/TopBar";
import { Footer } from "@/sections/Footer";
import { projectsPage } from "@/content/copy";
import { projects } from "@/content/projects";

/**
 * /projects (blueprint §7): every node grown into a card. 2-up at md+,
 * 1-up below. Same top bar plus the back affordance.
 */
export function ProjectsPage() {
  return (
    <div>
      <TopBar back />
      <main className="px-6 py-16">
        <div className="mx-auto max-w-site">
          <Reveal mode="mount">
            {/* Intro line: DRAFT, pending Lefler. */}
            <p className="max-w-narrow text-lede text-ink">{projectsPage.intro}</p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {projects.map((p, i) => (
              <Reveal key={p.slug} mode="mount" delay={i * 60}>
                <NodeCard project={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </main>
      <Footer mode="mount" />
    </div>
  );
}
