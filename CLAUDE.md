# Harness — SLOP8814 Designing the Sham

The platform is fixed and documented in `README.md`. The course is defined in
`COURSE-SPEC.md`, which is the single source of truth for every word, date, key
and link on this site. Read both before you touch anything.

## The course in one sentence

A postgraduate course that spends twelve weeks on one object — the sham
operation — and one instrument, the Sham Fidelity Ladder (defined Week 4, used
in every week after it). Every page must make that visible.

## What a good course means here (the rules this harness enforces)

1. **One idea, held all semester.** Every Round returns to the sham operation.
   No week may be a general lecture on trial design, ethics or surgery.
2. **Progression is visible.** Every Round lists its prereqs and adds exactly one
   distinct section to the student's protocol (`protocolSection`). No two weeks
   add the same thing.
3. **The Ladder is defined before it is used.** Nothing that uses the Ladder may
   be dated before the Week 4 lecture.
4. **Assessment grows out of the weeks.** Each assessment names the weeks it
   draws on, and those weeks happen before it is due. A3 reviews A2, so A3 is due
   at least 7 days after A2.
5. **No invented evidence.** Only trials in the registry (COURSE-SPEC §11) may be
   named. Never add authors, years, sample sizes, p-values, volumes or findings
   that are not in COURSE-SPEC. If a page seems to need a fact that is not there,
   leave it out and tell me.
6. **Voice.** Deadpan and sincere. Short declarative sentences. Precise nouns.
   The humour comes from taking the subject completely seriously, never from
   jokes. No exclamation marks. Second person to students. Do not rewrite the
   copy in COURSE-SPEC; move it.

Rules 2–5 are checked by `spec/course-promises.test.ts`. Rules 1 and 6 are human
judgement — do not try to write a test for "coherent" or "good voice".

## Banned phrasing (also checked in spec)

delve, tapestry, embark, journey, unlock, "in today's", "rapidly evolving",
"it's important to note", "navigate the complexities", game-changer,
cutting-edge, "dive into", "deep dive", "a testament to", "whether you're".

## Platform rules (from README — do not break)

- Do not change the Slop identity: `astro-theme-slop` branding and palette, the
  four collections and their keys, `astro.config.ts` pipeline, generated API.
- Keep the course code's last three digits as the repo arrived with them.
- Collection key = file name = URL = ref. Rename all or none.
- Never hand-write root-absolute hrefs in `.astro` files (`href="/sessions/"`).
  Use Astro's base-aware helpers or markdown links.
- Link the deck from its lecture with a markdown link:
  `[Slides](/decks/week-04-fidelity-ladder/)`.
- Remove each `STARTER_CONTENT` marker when you replace that fragment. Replace
  the starter images in `src/assets/images/` (kit supplies
  `fidelity-ladder.svg` and `social-card.png`) and point `socialImage` /
  `socialImageAlt` at the new card.
- Custom frontmatter keys listed in COURSE-SPEC §3 are contract. Do not rename.

## Visual direction

Reference: `docs/reference/mockup.html` (open it; it is the target layout, not
code to copy). Colours in the mockup are indicative.

- Keep the Slop brand tokens for header, footer, links and body text.
- Add three course accent tokens in the global style block in
  `src/layouts/PageLayout.astro` and use them only inside course components:
  `--sham-drape: #2f6b5c` (surgical-drape green), `--sham-drape-tint:
  color-mix(in srgb, var(--sham-drape) 10%, transparent)`, `--sham-incision:
  #b3261e` (a thin 2px line, used sparingly: under page titles, on the Ladder's
  L5 rung).
- The Ladder figure: `src/assets/images/fidelity-ladder.svg` (wide, with
  descriptors) and `fidelity-ladder-compact.svg` (no descriptors). Serve them
  with `<picture>` so screens under 640px get the compact one; its alt text is
  the six rung names in order. Social card: `src/assets/images/social-card.png`
  (1200x630), alt "SLOP8814 Designing the Sham, with the Sham Fidelity Ladder".
- Image-free by design: the only figure is the Ladder SVG. No stock photos, no
  clinical images, no emoji, no icons for decoration.
- Home: hero (kicker, title, lede) → thesis pull-quote → Ladder figure with
  caption → "What you will make" / "Who this is for" → five trials → schedule
  grouped by phase → footnote.
- Round pages: a meta strip (Week · date · phase · format · prereqs ·
  "Uses the Ladder") then the four fixed headings.
- Must work at both marking viewports (see the course assessment page's marking
  environment; write the two sizes here once you have read them:
  `DESKTOP = 1920×1080`, `MOBILE = 390×844`). No horizontal scroll at mobile
  width. Tables collapse or scroll inside their own container.

## How to work

- Speed over polish. The target is a correct, coherent, shippable site, not a
  perfect one. Do not add features that are not in COURSE-SPEC.
- Run `pnpm check` before every commit. Never commit a red state.
- Commit in the order in the prompt, one commit per step, with the message given.
  Small, honest commits are the process evidence for this assignment.
- If a check fails, read its output and fix the content, not the check. Only
  change a spec test if COURSE-SPEC itself changed, and say so in the commit.
- When you finish a round of work, stop and report: what you committed (hashes),
  `pnpm check` output, anything you left out and why, and anything in
  COURSE-SPEC you think is wrong.

## Scope bans

No new collections unless essential. No search, no comments, no dark-mode
toggle, no animations beyond CSS transitions, no client-side frameworks, no
analytics, no extra decks, no images other than the Ladder. Do not write
PROCESS.md — the student writes it.
