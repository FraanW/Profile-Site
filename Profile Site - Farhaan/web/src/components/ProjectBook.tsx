"use client";

import { useEffect, useRef } from "react";
import type { ProjectBook as ProjectBookData } from "@/content/projects";
import { ProjectSymbol } from "@/components/ProjectSymbol";
import { cn } from "@/lib/utils";

/**
 * A project, opened as a book.
 *
 * Two leaves with a gutter between them: the left carries the emblem and the
 * facts, the right carries the writing. Each leaf scrolls on its own, the way
 * facing pages hold their own text.
 *
 * Below 900px the metaphor stops being useful, so the leaves stack into one
 * continuous page rather than shrinking into unreadable columns.
 */

export function ProjectBook({
  project,
  onClose,
}: {
  project: ProjectBookData | null;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreFocusTo = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!project) return;

    restoreFocusTo.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      // Keep tabbing inside the open book.
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      restoreFocusTo.current?.focus?.();
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-book-title"
    >
      <button
        type="button"
        aria-label="Close and put the book back"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-ink/45 backdrop-blur-[3px] motion-safe:animate-[fade_240ms_ease-out]"
      />

      <div
        ref={panelRef}
        className={cn(
          "relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-y-auto",
          "bg-leaf text-ink shadow-[0_40px_90px_-20px_rgba(10,12,24,0.55)]",
          "motion-safe:animate-[book-open_420ms_cubic-bezier(0.16,1,0.3,1)]",
          "lg:flex-row lg:overflow-hidden",
        )}
        style={{ transformOrigin: "center bottom" }}
      >
        {/* The gutter sits where the leaves actually meet, at 38%, not at half. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-[38%] z-10 hidden w-12 -translate-x-1/2 lg:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(90,70,40,0) 0%, rgba(90,70,40,0.12) 36%, rgba(70,54,30,0.2) 50%, rgba(90,70,40,0.12) 64%, rgba(90,70,40,0) 100%)",
          }}
        />

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="sticky left-full top-4 z-30 -mb-9 mr-4 flex h-9 w-9 flex-shrink-0 items-center justify-center border border-ink/20 bg-leaf text-ink/70 transition-colors hover:border-ink/45 hover:text-ink lg:absolute lg:left-auto lg:right-4 lg:top-4 lg:mb-0 lg:mr-0"
        >
          <span className="sr-only">Close</span>
          <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
            <path
              d="M2 2l12 12M14 2L2 14"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Left leaf: the emblem and the facts. */}
        <div className="flex-shrink-0 border-ink/12 px-7 py-8 sm:px-9 lg:w-[38%] lg:overflow-y-auto lg:border-r lg:py-11">
          <ProjectSymbol symbol={project.symbol} size={54} className="text-ink/75" />

          <h2 id="project-book-title" className="display mt-6 text-[30px] sm:text-[34px]">
            {project.title}
          </h2>

          <dl className="mt-7 space-y-4 text-[14px]">
            <div>
              <dt className="smallcaps text-ink-muted">Built</dt>
              <dd className="tabular mt-0.5">{project.year}</dd>
            </div>
            <div>
              <dt className="smallcaps text-ink-muted">Role</dt>
              <dd className="mt-0.5">{project.role}</dd>
            </div>
            <div>
              <dt className="smallcaps text-ink-muted">Where</dt>
              <dd className="mt-0.5">{project.context}</dd>
            </div>
            <div>
              <dt className="smallcaps text-ink-muted">Built with</dt>
              <dd className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
                {project.stack.map((tool) => (
                  <span key={tool} className="border-b border-ink/20 pb-0.5">
                    {tool}
                  </span>
                ))}
              </dd>
            </div>
          </dl>

          <div className="mt-8 border-t border-ink/15 pt-6">
            {project.proof.map((item) => (
              <div key={item.label} className="mb-4 last:mb-0">
                <p className="display tabular text-[23px] leading-none">{item.figure}</p>
                <p className="mt-1.5 text-[13px] leading-snug text-ink-muted">{item.label}</p>
              </div>
            ))}
          </div>

          {project.links.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2.5 border-t border-ink/15 pt-6">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="border border-ink/30 px-4 py-2 text-[13px] transition-colors hover:bg-ink hover:text-leaf"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Right leaf: the writing. */}
        <div className="px-7 pb-10 pt-2 sm:px-9 lg:flex-1 lg:overflow-y-auto lg:py-11 lg:pl-12 lg:pr-16">
          <p className="display max-w-[34ch] text-[21px] leading-snug sm:text-[24px]">
            {project.summary}
          </p>
          <div className="mt-7 space-y-5">
            {project.body.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="text-[15.5px] leading-[1.75] text-ink/85"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectBook;
