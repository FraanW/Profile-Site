"use client";

import { Reveal } from "@/components/Reveal";
import { StarCard } from "@/components/StarCard";
import { TopBar } from "@/components/TopBar";
import { Footer } from "@/sections/Footer";
import { STAGGER_STEP } from "@/lib/motion";
import { projects, projectsPage } from "@/content/copy";

/**
 * /projects (blueprint §5): every star grown into a plaque card. 2-up at
 * md+, 1-up below. Same top bar plus the back affordance; no camera here,
 * so no rail margin. Reveal delays cap at the sixth step (tokens.md §4.2:
 * stagger groups stay ~6 so late cards aren't forgotten).
 */
export function ProjectsPage() {
  return (
    <div>
      <TopBar back />
      <main className="px-6 py-16">
        <div className="mx-auto max-w-site">
          <Reveal mode="mount">
            {/* Intro line: PLACEHOLDER, pending intake and Lefler. */}
            <p className="max-w-narrow text-lede text-moon">{projectsPage.intro}</p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {projects.map((p, i) => (
              <Reveal key={p.slug} mode="mount" delay={Math.min(i, 5) * STAGGER_STEP}>
                <StarCard project={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </main>
      <Footer mode="mount" />
    </div>
  );
}
