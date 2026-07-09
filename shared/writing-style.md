# Writing Style — the anti-slop law

Every word a visitor reads on either site follows this file. Lefler writes by it; Dwight audits
by it. It exists because the sites' whole argument is "we ship without AI slop," and prose is where
slop shows first.

## The standard

Write like a sharp engineer describing work they're proud of to someone whose time they respect.
The test for every sentence: **could this exact sentence appear on a stranger's portfolio?** If
yes, it says nothing about this person. Rewrite it or delete it.

## Hard bans (Dwight flags these as BLOCKERs)

**Punctuation & mechanics**
- Em dashes (—). Anywhere in visitor-facing copy. Use commas, colons, periods. Ranges use "to".
- Title Case Headlines That Capitalize Every Word. Sentence case everywhere.
- Emoji in body copy or section headers. (One in a footer easter egg is negotiable with the owner.)
- Exclamation marks. The facts are exciting; the punctuation doesn't need to be.

**Vocabulary** — the words below are banned outright:
> passionate, driven, motivated, dynamic, innovative, cutting-edge, state-of-the-art, seamless,
> robust, scalable (as a bare adjective; "scaled to X" with a number is fine), leverage (verb),
> utilize, delve, dive deep, deep dive, journey, craft/crafting (as verb for code), elevate,
> empower, unlock, unleash, supercharge, streamline, game-changing, next-level, world-class,
> best-in-class, mission-critical, synergy, holistic, meticulous, spearheaded, honed, showcasing,
> boasting, a testament to, stands as, serves as, in the realm of, landscape (metaphorical),
> ecosystem (unless literally about a platform ecosystem), solutions (bare plural), impactful

**Constructions**
- Triads: "fast, reliable, and scalable." Two items or four; never the rhythmic three.
- Mirrored contrast: "not just X, but Y", "It's not about X. It's about Y."
- Fake-profound fragments: "The result? A 40% improvement."
- Participle tails: "...reducing costs and improving outcomes" bolted onto every bullet.
- "Whether you're a founder or an enterprise..." (the audience-menu construction)
- Rhetorical questions as section openers. ("So what does forward-deployed actually mean?")
- Self-narrating headers: "What I Do", "My Journey", "Let's Connect", "About Me" (plain "About"
  is fine; better headers say something: "Work that raised money")

## Positive rules (what good looks like)

- **Numbers over adjectives.** "20,000+ live advertising assets" not "a large-scale platform."
  Every metric must trace to `context/profile.md`; never round up.
- **Decisions over descriptions.** The impressive part of a case study is the constraint and the
  call: what was hard, what was chosen, what it cost. Outcomes without decisions read as vibes.
- **Vary the rhythm.** Human paragraphs have a pulse: short sentence, longer one, a fragment
  maybe. If five sentences in a row have the same shape, an AI wrote them. Break it.
- **Specific nouns.** "FastAPI services on EC2 behind RDS" beats "cloud-deployed backend
  services." Named things are credible; categories are wallpaper.
- **First person, active voice.** "I built", "I convinced", "I got it wrong, then...". Owning a
  mistake in a case study is worth three achievements; it reads as human like nothing else.
- **Let dryness carry the humor.** One understated aside per page, maximum. Never wacky.

## Length discipline

- Hero: one headline under 10 words + one supporting line under 25.
- Section intros: 2 sentences max.
- Case studies: 150–300 words each. If it needs more, it needs cutting, not room.
- The whole site should be readable, fully, in under 4 minutes.

## The read-aloud gate

Before any copy is handed over: read it aloud (mentally counts, barely). Anywhere you stumble,
rewrite. Anything you'd be embarrassed to say to a senior engineer's face, delete. Then run the
banned-list grep. Then hand it to Dwight anyway.
