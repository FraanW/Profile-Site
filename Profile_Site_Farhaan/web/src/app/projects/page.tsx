"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { ClosingPlasma } from "@/components/ClosingPlasma";
import { Bookshelf, type ShelfItem } from "@/components/Bookshelf";
import { ProjectBook } from "@/components/ProjectBook";
import { projectBooks } from "@/content/projects";

/**
 * The shelf page. The site inverts here: light plasma, dark ink.
 *
 * The plasma sits fixed behind everything, the shelf floats in it, and a
 * project opens as a book rather than as another page.
 */

const shelfItems: ShelfItem[] = projectBooks.map((project) => ({
  id: project.id,
  title: project.title,
  date: project.date,
  subtitle: project.summary,
  color: project.color,
  foil: project.foil,
}));

export default function ProjectsPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  const handleOpen = useCallback((item: ShelfItem) => {
    setOpenId(item.id);
  }, []);

  const open = openId ? (projectBooks.find((p) => p.id === openId) ?? null) : null;

  return (
    <main className="relative min-h-dvh text-ink">
      <div className="fixed inset-0 -z-10">
        <ClosingPlasma
          mode="light"
          speed={0.6}
          turbulence={0.85}
          grain={0.7}
          sparkle={0.35}
          vignette={0.8}
        />
      </div>

      <header className="mx-auto flex max-w-6xl items-baseline justify-between px-6 pt-8 sm:px-10">
        <Link
          href="/"
          className="display text-[19px] text-ink transition-opacity hover:opacity-65"
        >
          Muhammad Farhaan
        </Link>
        <Link
          href="/"
          className="smallcaps text-[14px] text-ink-muted transition-colors hover:text-ink"
        >
          Back
        </Link>
      </header>

      <div className="mx-auto max-w-6xl px-6 pt-16 sm:px-10 sm:pt-24">
        <h1 className="display max-w-[22ch] text-[clamp(2.6rem,7vw,5rem)]">
          Take one off the shelf to see what I&rsquo;ve built.
        </h1>
        <p className="prose-serif mt-6 text-ink/80">
          Hover over a spine to read it, click to pull the book out, and click again to open it.
          Each one explains the problem and what I chose to do about it, including what that cost.
          The ones that didn&rsquo;t work out are here too.
        </p>
      </div>

      <div className="mt-6 sm:mt-10">
        <Bookshelf items={shelfItems} height={640} onOpen={handleOpen} />
      </div>

      {/* The shelf is a pointer device. This is the same content, reachable without one. */}
      <section className="mx-auto max-w-6xl px-6 pb-24 sm:px-10">
        <h2 className="display border-b border-ink/20 pb-4 text-[clamp(1.4rem,3vw,1.9rem)] text-ink/80">
          Or read them without the shelf.
        </h2>
        <ul className="mt-6 grid gap-x-10 gap-y-7 sm:grid-cols-2">
          {projectBooks.map((project) => (
            <li key={project.id}>
              <button
                type="button"
                onClick={() => setOpenId(project.id)}
                className="group block w-full text-left"
              >
                <span className="display text-[21px] underline decoration-ink/25 underline-offset-[6px] transition-colors group-hover:decoration-ink">
                  {project.title}
                </span>
                <span className="tabular ml-2.5 text-[13px] text-ink-faint">{project.year}</span>
                <span className="mt-1.5 block text-[14.5px] leading-relaxed text-ink/75">
                  {project.summary}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <ProjectBook project={open} onClose={() => setOpenId(null)} />
    </main>
  );
}
