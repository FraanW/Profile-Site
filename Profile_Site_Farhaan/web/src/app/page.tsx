"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ClosingPlasma } from "@/components/ClosingPlasma";
import { OrbitCardStack, type OrbitStackItem } from "@/components/OrbitCardStack";
import { OrgMark } from "@/components/OrgMark";
import { ProcessMorph } from "@/components/ProcessMorph";
import { ProductGraph } from "@/components/ProductGraph";
import { ScrollSplitCard } from "@/components/ScrollSplitCard";
import { StackRibbon } from "@/components/StackRibbon";
import { SkillMark } from "@/components/SkillMark";
import { Starfield } from "@/components/Starfield";
import {
  about,
  contact,
  experience,
  harness,
  hero,
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

  return (
    <main className="relative">
      {/* Hero: the plasma you arrive through. */}
      <section className="relative z-10 h-dvh w-full overflow-hidden bg-plasma-a">
        <ClosingPlasma
          className="absolute inset-0"
          mode="dark"
          speed={0.85}
          turbulence={1.05}
        />
        <div className="relative h-full">
          <div className="relative mx-auto flex h-full max-w-6xl flex-col px-6 sm:px-10">
            <header className="flex items-baseline justify-between pt-8">
              <span className="display text-[19px] text-ivory">{identity.name}</span>
              <Link
                href="/projects"
                className="smallcaps text-[14px] text-ivory/70 transition-colors hover:text-ivory"
              >
                Projects
              </Link>
            </header>

            <div className="flex flex-1 flex-col justify-center pb-24">
              <h1
                className="display-tight settle max-w-[16ch] text-[clamp(2.75rem,8vw,6.25rem)] text-ivory"
                style={{ animationDelay: "120ms" }}
              >
                {hero.headline}
              </h1>

              <p
                className="settle prose-serif mt-8 text-ivory/80"
                style={{ animationDelay: "320ms" }}
              >
                {hero.support}
              </p>

              <div
                className="settle mt-10 flex flex-wrap items-center gap-x-7 gap-y-3"
                style={{ animationDelay: "480ms" }}
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

            <p
              className="settle mx-auto max-w-[46ch] pb-[150px] text-center text-[14px] leading-relaxed text-ivory/55 sm:pb-10"
              style={{ animationDelay: "640ms" }}
            >
              {hero.now}
            </p>

            {/*
              Pixel art, so it must not be resampled: image-rendering pixelated
              keeps the blocks hard instead of letting the browser smear them.
              Mirrored, so that sitting on the right edge he faces into the page
              rather than off it. A portrait looking out of the frame pulls the
              eye away from everything the hero is trying to say.

              On phones he sits at the bottom edge and the line above clears him
              with extra padding, rather than being hidden: he is the only human
              thing in the hero and dropping him on the smallest screens is
              exactly backwards.
            */}
            <Image
              src="/farhaan-pixel.png"
              alt="Muhammad Farhaan, drawn as pixel art"
              width={491}
              height={512}
              priority
              className="settle pointer-events-none absolute bottom-0 right-4 h-[140px] w-auto -scale-x-100 select-none sm:right-10 sm:h-[190px] lg:h-[250px]"
              style={{ imageRendering: "pixelated", animationDelay: "760ms" }}
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

      {/* How the work actually goes. */}
      <section className="relative z-10 py-28 sm:py-40">
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

      {/* How a small team holds a whole product. */}
      <section className="relative z-10 pb-28 sm:pb-40">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[1fr_1.05fr] lg:items-start">
            <div>
              <h2 className="display max-w-[18ch] text-[clamp(1.75rem,4vw,2.9rem)] text-ivory">
                {harness.heading}
              </h2>
              <div className="mt-8 space-y-5">
                {harness.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 30)} className="prose-serif text-ivory/85">
                    {paragraph}
                  </p>
                ))}
              </div>
              <a
                href={harness.link.href}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-8 inline-block border-b border-signal pb-1 text-[15px] text-ivory transition-colors hover:text-signal"
              >
                {harness.link.label}
              </a>
            </div>

            {/* Sticky, so the graph is still moving while the text is read. */}
            <ProductGraph className="lg:sticky lg:top-28 lg:-mr-6" />
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

      {/* Where the work happened. */}
      <section className="relative z-10 pb-28 sm:pb-40">
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

      {/* The shelf, previewed. */}
      <section className="relative z-10 pb-28 sm:pb-40">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-rule pb-5">
            <h2 className="display text-[clamp(1.75rem,4vw,2.75rem)] text-ivory">
              Things I have built.
            </h2>
            <Link
              href="/projects"
              className="smallcaps border-b border-signal pb-1 text-[14px] text-ivory transition-colors hover:text-signal"
            >
              Open the shelf
            </Link>
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

      {/* Pedigree, for the reader who scans. */}
      <section className="relative z-10 pb-28 sm:pb-40">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <h2 className="display border-b border-rule pb-5 text-[clamp(1.75rem,4vw,2.75rem)] text-ivory">
            Credentials.
          </h2>
          <div className="mt-8 grid gap-x-12 gap-y-10 sm:grid-cols-3">
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

      </div>

      {/* Contact: the plasma you leave through. */}
      <section className="relative z-10 w-full overflow-hidden bg-plasma-a">
        <ClosingPlasma
          className="absolute inset-0"
          mode="dark"
          speed={0.55}
          turbulence={0.9}
        />
        <div className="relative">
          <div className="mx-auto flex min-h-dvh max-w-6xl flex-col justify-center px-6 pb-24 pt-32 sm:px-10">
            {/* Wider and a touch looser: a longer line at 0.94 leading crowds. */}
            <h2 className="display max-w-[20ch] text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.04] text-ivory">
              Bring me something half-formed, and let&rsquo;s build it together.
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
