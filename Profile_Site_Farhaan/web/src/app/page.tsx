"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ClosingPlasma } from "@/components/ClosingPlasma";
import { OrbitCardStack, type OrbitStackItem } from "@/components/OrbitCardStack";
import { OrgMark } from "@/components/OrgMark";
import { HeroAvatar } from "@/components/HeroAvatar";
import { PixelPirate } from "@/components/PixelPirate";
import { ProcessMorph } from "@/components/ProcessMorph";
import { ProductGraph } from "@/components/ProductGraph";
import { ScrollSplitCard } from "@/components/ScrollSplitCard";
import { StackRibbon } from "@/components/StackRibbon";
import { StrokeText } from "@/components/StrokeText";
import { SkillMark } from "@/components/SkillMark";
import { Starfield } from "@/components/Starfield";
import { TextType } from "@/components/TextType";
import {
  about,
  contact,
  education,
  experience,
  harness,
  hero,
  heroTitles,
  identity,
  process,
  quote,
  signals,
} from "@/content/profile";
import { projectBooks } from "@/content/projects";

/**
 * The landing page.
 *
 * Structure: plasma opens it, plasma closes it, and the argument sits still
 * in the dark between the two. The only other motion on the page is the
 * process sequence and the scroll-driven split card, both of which a person
 * has to scroll to reach.
 */

const skills = [
  {
    title: "AI-native product building",
    description:
      "Agents and retrieval designed into the product from the start. I build MCP servers and graph APIs, and pipelines that abstain when they aren't sure.",
    bgColor: "#1b2340",
    textColor: "#f4efe2",
    icon: <SkillMark mark="graph" size={96} />,
  },
  {
    title: "Product context, research and ideation",
    description:
      "Market research, pitch decks, system architecture, and deciding what's worth building before anyone writes a line of it. Two of the products I researched went on to raise money.",
    bgColor: "#f4efe2",
    textColor: "#101219",
    icon: <SkillMark mark="compass" size={96} />,
  },
  {
    title: "Shipping, deployment and pipelining",
    description:
      "AWS, CI, containers and migrations. Then the unglamorous part, keeping it alive after launch: dependency sweeps, moving between providers, and knowing what's safe to delete.",
    bgColor: "#0b0d16",
    textColor: "#f4efe2",
    icon: <SkillMark mark="pipeline" size={96} />,
  },
];

const findMe: OrbitStackItem[] = [
  {
    label: "GitHub",
    handle: "github.com/FraanW",
    description: "The code for most of what's on this site.",
    href: identity.github,
    accent: "#c3c9da",
    mark: "github",
  },
  {
    label: "Email",
    handle: identity.email,
    description: "The fastest way to reach me.",
    href: `mailto:${identity.email}`,
    accent: "#7fd4d0",
    mark: "mail",
  },
  {
    label: "LinkedIn",
    handle: "in/muhammadfarhaan",
    description: "Roles and dates, written out properly.",
    href: identity.linkedin,
    accent: "#6b7bff",
    mark: "linkedin",
  },
];

export default function Home() {
  const middleRef = useRef<HTMLDivElement>(null);
  const [titleIndex, setTitleIndex] = useState(0);
  const nextTitle = useCallback(
    () => setTitleIndex((i) => (i + 1) % heroTitles.length),
    [],
  );

  return (
    <main className="relative">
      {/* Hero: the plasma you arrive through. */}
      <section className="relative z-10 h-dvh w-full overflow-hidden">
        {/*
          The plasma fades out at the bottom rather than stopping at an edge,
          so the hero dissolves into the night sky behind the next section.
          Owner request, 2026-09-19. The section itself stays transparent so
          the real starfield shows through the fade.
        */}
        <div className="plasma-fade-out absolute inset-0 bg-plasma-a">
          <ClosingPlasma
            className="absolute inset-0"
            mode="dark"
            speed={0.85}
            turbulence={1.05}
          />
        </div>
        <div className="relative h-full">
          <div className="relative mx-auto flex h-full max-w-6xl flex-col px-6 sm:px-10">
            <header className="flex items-baseline justify-between pt-8">
              {/* Up from 19px: owner request, 2026-09-19. */}
              <span className="display text-[clamp(1.45rem,2.4vw,1.95rem)] text-ivory">
                {identity.name}
              </span>
              <Link
                href="/projects"
                className="smallcaps text-[14px] text-ivory/70 transition-colors hover:text-ivory"
              >
                Projects
              </Link>
            </header>

            <div className="flex flex-1 flex-col justify-center pb-44 sm:pb-36 lg:pb-24">
              {/*
                The headline draws itself on (React Bits StrokeText, owner's
                pick, 2026-09-19), in the same face and size it always had.
                SVG text does not wrap, so the breaks are set by hand: three
                lines on phones, two from sm up. The real text is for
                screen readers; the drawing is decoration.

                StrokeText sizes itself in em off its own measured box, so a
                long line makes a wide element rather than a smaller one, and
                this section is overflow-hidden. Too long clips, silently, at
                the right edge. The ceilings are recorded beside the breaks in
                content/profile.ts.
              */}
              <h1 className="display-tight text-[clamp(2.75rem,8vw,6.25rem)] text-ivory">
                <span className="sr-only">{hero.headline}</span>
                <StrokeText lines={hero.lines.narrow} className="sm:hidden" startDelay={0.15} />
                <StrokeText lines={hero.lines.wide} className="hidden sm:block" startDelay={0.15} />
              </h1>

              <p
                className="settle prose-serif mt-8 text-ivory/80"
                style={{ animationDelay: "900ms" }}
              >
                {hero.support}
              </p>

              <div
                className="settle mt-10 flex flex-wrap items-center gap-x-7 gap-y-3"
                style={{ animationDelay: "1100ms" }}
              >
                <a
                  href={`mailto:${identity.email}`}
                  className="border-b border-signal pb-1 text-[15px] text-ivory transition-colors hover:text-signal"
                >
                  Start a conversation
                </a>
                <Link
                  href="/projects"
                  className="border-b border-ivory/25 pb-1 text-[15px] text-ivory/75 transition-colors hover:border-ivory hover:text-ivory"
                >
                  See what I have built
                </Link>
              </div>
            </div>

            {/*
              The titles, typed and retyped (React Bits TextType, owner's pick).
              Each time one is erased the index moves on, which switches the
              avatar's pose and the planets round his head. On phones they sit
              bottom left, clear of him; from lg up, bottom centre.
            */}
            <div className="settle absolute bottom-8 left-6 z-20 max-w-[52%] sm:bottom-10 sm:left-10 lg:bottom-12 lg:left-[44%] lg:max-w-none lg:-translate-x-1/2">
              {/*
                Just the article, owner 2026-09-20. It has to follow the title
                being typed, because "a" in front of "AI and Cyber Systems
                Engineer" is wrong, and once the label is one word on its own
                that error is the whole label.
              */}
              <p className="smallcaps mb-1.5 text-[13px] text-signal/80">
                {heroTitles[titleIndex % heroTitles.length].article}
              </p>
              <TextType
                as="p"
                text={heroTitles.map((t) => t.title)}
                typingSpeed={62}
                deletingSpeed={28}
                pauseDuration={2600}
                initialDelay={400}
                onSentenceComplete={nextTitle}
                cursorCharacter="|"
                cursorClassName="text-signal"
                className="display min-h-[1.2em] text-[clamp(1.3rem,2.6vw,2.05rem)] leading-[1.15] text-ivory"
              />
            </div>

            {/*
              The avatar replaces the static portrait: three poses, one per
              title, a ring round his head and the title's planets on it.
            */}
            <HeroAvatar
              titles={heroTitles}
              index={titleIndex}
              className="settle absolute bottom-0 right-6 sm:right-10 lg:right-14"
            />
          </div>
        </div>
      </section>

      {/* Everything between the two plasma bookends shares one night sky. */}
      <div ref={middleRef} className="relative">
        <Starfield watch={middleRef} />

      {/* The split card: one image becomes three skills. */}
      <section className="relative z-10">
        <ScrollSplitCard
          /* Van Gogh, The Starry Night, 1889. Public domain; self-hosted so it
             cannot break or lag. */
          imageSrc="/starry-night.jpg"
          cards={skills}
          cue="Keep scrolling"
          closing="Three different skills, and I bring them all."
        />
      </section>

      {/* Where the work happened. */}
      <section className="relative z-10 py-28 sm:py-40">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <h2 className="display border-b border-rule pb-5 text-[clamp(1.75rem,4vw,2.75rem)] text-ivory">
            Where I have done it.
          </h2>
          <ol className="mt-4">
            {experience.map((role) => (
              <li
                key={role.org}
                className="grid gap-x-12 gap-y-3 border-b border-rule py-8 lg:grid-cols-[1fr_1.7fr]"
              >
                <div className="flex items-start gap-4">
                  {/*
                    A chip behind each logo. Two of the three ship with a dark
                    background baked in, which would vanish against this page,
                    and the third is bright orange. A common surface makes them
                    read as one set instead of three unrelated stickers.
                  */}
                  <span className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md bg-ivory/[0.07] ring-1 ring-ivory/10">
                    <Image
                      src={role.logo}
                      alt={`${role.org} logo`}
                      width={48}
                      height={48}
                      className="h-9 w-9 object-contain"
                    />
                  </span>
                  <div>
                    <p className="display text-[22px] text-ivory">{role.org}</p>
                    <p className="mt-1.5 text-[14.5px] text-ivory/70">{role.role}</p>
                    <p className="tabular mt-1 text-[13.5px] text-faint">
                      {role.period}, {role.where}
                    </p>
                  </div>
                </div>
                <p className="max-w-[58ch] text-[15.5px] leading-[1.75] text-ivory/75">
                  {role.line}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* How the work actually goes. */}
      <section className="relative z-10 pb-28 sm:pb-40">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <h2 className="display text-[clamp(1.5rem,3vw,2.1rem)] text-ivory/70">
            My playbook for building a good system.
          </h2>
          <div className="mt-10 border-y border-rule py-16">
            <ProcessMorph
              steps={process}
              className="display text-center text-[clamp(2rem,6vw,4.25rem)] text-ivory"
            />
          </div>
          <p className="prose-serif mx-auto mt-10 text-center text-ivory/70">
            Most of the value is decided in the first three, before anyone writes code. That&rsquo;s
            the part I want to be in the room for.
          </p>
        </div>
      </section>

      {/* About. */}
      <section className="relative z-10 pb-28 sm:pb-40">
        <div className="mx-auto grid max-w-6xl gap-x-16 gap-y-8 px-6 sm:px-10 lg:grid-cols-[1fr_1.6fr]">
          <h2 className="display text-[clamp(1.75rem,4vw,2.75rem)] text-ivory">
            How I think about products.
          </h2>
          <div className="space-y-6">
            {about.map((paragraph) => (
              <p key={paragraph.slice(0, 30)} className="prose-serif text-ivory/85">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* The stack, as marks rather than a tag cloud. */}
      <section className="relative z-10 pb-28 sm:pb-40">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <h2 className="display border-b border-rule pb-5 text-[clamp(1.75rem,4vw,2.75rem)] text-ivory">
            What my tech stack is.
          </h2>
          <p className="prose-serif mt-6 text-ivory/85">
            These are the tools I&rsquo;ve worked with, in no particular order. The harder skill is
            knowing which one a problem needs, and how much of it.
          </p>
        </div>
        {/* Full bleed: the ribbon runs off both edges rather than sitting in a box. */}
        <StackRibbon className="mt-6" />
      </section>

      {/* How a small team holds a whole product. */}
      <section className="relative z-10 pb-28 sm:pb-40">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[1fr_1.05fr] lg:items-start">
            <div>
              <h2 className="display max-w-[18ch] text-[clamp(1.75rem,4vw,2.9rem)] text-ivory">
                {harness.heading}
              </h2>
              <div className="mt-8 space-y-5">
                <p className="prose-serif text-ivory/85">{harness.lead}</p>
                {/*
                  The rest is the how, which only earns its length once the lead
                  has convinced someone. A native details rather than React
                  state: it costs no JavaScript and comes keyboard and screen
                  reader correct, which a div and a click handler would not.
                */}
                <details className="group">
                  <summary className="smallcaps inline-block cursor-pointer list-none border-b border-signal/70 pb-1 text-[13px] text-signal/90 transition-colors hover:text-signal [&::-webkit-details-marker]:hidden">
                    <span className="group-open:hidden">Read more</span>
                    <span className="hidden group-open:inline">Read less</span>
                  </summary>
                  <div className="mt-6 space-y-5">
                    {harness.more.map((paragraph) => (
                      <p key={paragraph.slice(0, 30)} className="prose-serif text-ivory/85">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </details>
              </div>
              {/* The link reads as the end of a sentence now, not a bare domain. */}
              <p className="prose-serif mt-8 text-ivory/85">
                {harness.closer}{" "}
                <a
                  href={harness.link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="whitespace-nowrap border-b border-signal text-ivory transition-colors hover:text-signal"
                >
                  {harness.link.label}
                </a>
              </p>
            </div>

            {/* Sticky, so the graph is still moving while the text is read. */}
            <ProductGraph className="lg:sticky lg:top-28 lg:-mr-6" />
          </div>
        </div>
      </section>

      {/* The shelf, previewed. */}
      <section className="relative z-10 pb-28 pt-16 sm:pb-40 lg:pt-0">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          {/*
            The pirate stands on this rule, chin on the line, beside the link
            he is pointing at: the nudge for a reader who has come this far.
            Below lg there is no room for both side by side, so the bubble goes
            above his head and he stands in for the link.
          */}
          <div className="relative flex flex-wrap items-baseline justify-between gap-4 border-b border-rule pb-5">
            <h2 className="display text-[clamp(1.75rem,4vw,2.75rem)] text-ivory">
              Things I have built.
            </h2>
            <Link
              href="/projects"
              className="smallcaps hidden border-b border-signal pb-1 text-[14px] text-ivory transition-colors hover:text-signal lg:inline-block"
            >
              Open the shelf
            </Link>
            <PixelPirate
              href="/projects"
              message="You made it this far. Come see what I've built."
              className="absolute bottom-0 right-0 lg:right-[8.5rem]"
            />
          </div>
          <ul className="mt-8 grid gap-x-12 gap-y-6 sm:grid-cols-2">
            {projectBooks.map((project) => (
              <li key={project.id}>
                <Link href="/projects" className="group block">
                  <span className="display text-[20px] text-ivory">{project.title}</span>
                  <span className="tabular ml-2.5 text-[13px] text-faint">{project.year}</span>
                  <span className="mt-1 block text-[14.5px] leading-relaxed text-ivory/65">
                    {project.summary}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Education, then the two things from those years he is proudest of. */}
      <section className="relative z-10 pb-28 sm:pb-40">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <h2 className="display border-b border-rule pb-5 text-[clamp(1.75rem,4vw,2.75rem)] text-ivory">
            Education.
          </h2>
          <div className="mt-8 grid gap-x-16 gap-y-10 lg:grid-cols-[1.5fr_1fr] lg:items-start">
            <div>
              <p className="display text-[clamp(1.6rem,3.2vw,2.3rem)] leading-[1.08] text-ivory">
                {education.primary.degree}
              </p>
              <p className="mt-3 text-[16px] text-ivory/80">{education.primary.school}</p>
              <p className="tabular mt-1.5 text-[14px] text-faint">{education.primary.detail}</p>
            </div>
            {/* Secondary and unfinished, so it sits smaller and says so. */}
            <div className="border-l border-rule pl-6 sm:pl-8">
              <p className="smallcaps text-[13px] text-signal/80">{education.secondary.status}</p>
              <p className="display mt-2 text-[21px] text-ivory/90">
                {education.secondary.degree}
              </p>
              <p className="mt-1.5 text-[14.5px] text-ivory/70">{education.secondary.school}</p>
              <p className="tabular mt-1 text-[13.5px] text-faint">
                {education.secondary.detail}
              </p>
            </div>
          </div>

          <h3 className="display mt-16 border-b border-rule pb-4 text-[clamp(1.3rem,2.4vw,1.7rem)] text-ivory/80">
            I&rsquo;m proud of these.
          </h3>
          <div className="mt-8 grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {signals.map((signal) => (
              <div key={signal.figure}>
                <p className="display text-[21px] text-ivory">{signal.figure}</p>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-ivory/70">
                  {signal.href ? (
                    <a
                      href={signal.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="border-b border-ivory/30 transition-colors hover:border-signal hover:text-signal"
                    >
                      {signal.label}
                    </a>
                  ) : (
                    signal.label
                  )}
                </p>
                {signal.note && (
                  <p className="mt-2 text-[13.5px] leading-relaxed text-faint">{signal.note}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The invitation. */}
      <section className="relative z-10 pb-28 sm:pb-40">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <figure className="border-l-2 border-signal/60 py-2 pl-8 sm:pl-12">
            {/*
              The one all-caps label on the site. Everywhere else they were
              removed as template chrome, but this one carries information the
              reader cannot get otherwise: that the quote is his, chosen, and
              not decoration. Tracked out hard so it reads as a plate rather
              than as a heading.
            */}
            <p className="mb-7 text-[11px] uppercase tracking-[0.42em] text-muted">Motto</p>
            {/* Gargantua, since the line reaches this page by way of Interstellar. */}
            <OrgMark mark="blackhole" size={68} className="mb-8 text-signal/75" />
            {/*
              .display sets 0.94, which is right for a headline and too tight
              for three lines of italic: the descenders on "gentle" and "dying"
              run into the ascenders below them.
            */}
            <blockquote className="display max-w-[24ch] text-[clamp(1.9rem,5vw,3.4rem)] italic leading-[1.18] text-ivory">
              {"“"}
              {quote.text}
              {"”"}
            </blockquote>
            <figcaption className="smallcaps mt-6 text-[14px] text-muted">
              {quote.source}
            </figcaption>
            {/* Why it is here. A famous line with no reason attached is decoration. */}
            <p className="mt-8 max-w-[58ch] text-[14.5px] leading-[1.8] text-ivory/60">
              {quote.note}
            </p>
          </figure>
        </div>
      </section>

      </div>

      {/* Contact: the plasma you leave through. */}
      <section className="relative z-10 w-full overflow-hidden">
        {/* The same fade, mirrored: the sky thickens into the plasma. */}
        <div className="plasma-fade-in absolute inset-0 bg-plasma-a">
          <ClosingPlasma
            className="absolute inset-0"
            mode="dark"
            speed={0.55}
            turbulence={0.9}
          />
        </div>
        <div className="relative">
          <div className="mx-auto flex min-h-dvh max-w-6xl flex-col justify-center px-6 pb-24 pt-32 sm:px-10">
            {/* Wider and a touch looser: a longer line at 0.94 leading crowds. */}
            <h2 className="display max-w-[20ch] text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.04] text-ivory">
              Bring me something challenging, and let&rsquo;s build it together.
            </h2>
            <p className="prose-serif mt-8 text-ivory/80">{contact.invitation}</p>

            <OrbitCardStack items={findMe} className="mt-16" />

            <footer className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-ivory/15 pt-8 text-[14px] text-ivory/60">
              <a
                href={`mailto:${identity.emailAlt}`}
                className="transition-colors hover:text-ivory"
              >
                {identity.emailAlt}
              </a>
              <Link href="/projects" className="transition-colors hover:text-ivory">
                Projects
              </Link>
              <span className="ml-auto">{identity.location}</span>
            </footer>
          </div>
        </div>
      </section>
    </main>
  );
}
