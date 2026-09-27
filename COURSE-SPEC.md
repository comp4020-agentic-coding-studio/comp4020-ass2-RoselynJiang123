# COURSE-SPEC — SLOP8982 Designing the Sham

This file is the single source of truth for the course. Every page on the site is
built from it. If the site and this file disagree, the site is wrong. If this file
is silent, ask; do not invent.

Prose in this file is **final copy**, not a brief. Move it into the site with
light formatting only. Do not paraphrase it, pad it, or "improve" its voice.

---

## 0. Course record (`src/course-config.ts`, `src/site-config.ts`)

| Field | Value |
|---|---|
| Code | `SLOP8982` (keep the three digits the repo arrived with; if they are not `982`, keep the repo's and change every mention here) |
| Level | 8 (postgraduate) |
| Title | Designing the Sham: Placebo Controls for Invasive Procedures |
| Description (80–300 chars) | Invasive procedures are rarely tested against placebo. This course treats the sham operation as a design object: how it is built, blinded, consented, reviewed, and defended. |
| Tags | `trial methodology`, `surgical ethics`, `blinding` |
| Session label | singular **Round**, plural **Rounds** (`sessionLabels` in `site-config.ts`) |
| Year / period | 2026, Semester 2 |
| Teaching starts | 2026-07-27 (Mon, Week 1) |
| Teaching ends | 2026-10-30 (Fri, Week 12) |
| Mid-semester break | 2026-09-07 to 2026-09-18 (no Rounds, no lectures) |

If `course-config.ts` stores the period differently (e.g. an enum), keep its
shape and make the start/end dates above true.

---

## 1. The idea (use on the home page, verbatim)

**Kicker:** SLOP8982 · Postgraduate · Semester 2, 2026

**Lede:**
Every other treatment has to beat a placebo. Surgery mostly doesn't. This course
spends twelve weeks on the operation that makes the comparison possible: the one
where nothing is done, carefully.

**Thesis (pull-quote):**
A sham procedure is not the absence of an operation. It is an operation —
designed, rehearsed, consented and reviewed — whose only job is to leave the real
one nothing to hide behind.

**What you will make:**
By Week 12 you will have written a complete sham-controlled protocol for a
procedure that is performed today without one. You build it one section per
Round. Nobody is operated on. The protocol is the operation.

**Who this is for:**
Surgical trainees, trial methodologists, perioperative and research nurses,
biostatisticians, ethicists, and anyone who has said "well, it obviously works"
about a procedure and would like to find out whether that is true.

**The one tool:**
The Sham Fidelity Ladder, introduced in Round 4 and used in every Round after it.
(Render the Ladder figure here — see §2.)

**Five trials you will know by heart:**
- Moseley et al., 2002 — arthroscopic surgery for knee osteoarthritis
- Buchbinder et al. and Kallmes et al., 2009 — vertebroplasty for osteoporotic fractures
- ORBITA (Al-Lamee et al.), 2017 — PCI for stable angina
- SYMPLICITY HTN-3 (Bhatt et al.), 2014 — renal denervation for resistant hypertension
- Freed et al., 2001 — embryonic dopamine-neuron transplantation for Parkinson's disease

**Footnote (small type, bottom of home):**
No patients will be operated on in this course, sham or otherwise.

Then: the schedule, grouped by phase (§4), each row linking to its Round.

---

## 2. The Sham Fidelity Ladder (course invention — the spine of the site)

The Ladder is this course's own tool. Say so plainly wherever it is introduced:
"The Ladder is a teaching instrument invented for this course, not a published
standard."

Fidelity is measured **from the patient's side of the drape**.

| Rung | Name | What the sham includes |
|---|---|---|
| L0 | Told | The patient is told a procedure took place. Nothing else happens. It is here so the Ladder has a floor. You will not propose it. |
| L1 | Staged | The room, the gown, the monitoring, the drapes, the waiting. No skin is breached. |
| L2 | Breached | Local anaesthetic, a puncture or a skin incision. Nothing goes deeper. |
| L3 | Approached | Instruments travel towards the target and stop short of treating it: a needle resting on bone, a catheter in the renal arteries, a burr hole that does not go all the way through. |
| L4 | Mimicked | L3, plus the sensory signature of the real procedure: its sounds, smells, pressures and duration. |
| L5 | Indistinguishable | L4, plus matched anaesthesia, matched recovery, matched dressing and scar, and a team whose behaviour afterwards has been scripted as carefully as the procedure itself. |

Two sentences that must appear with the Ladder (home page caption and Week 4):
1. "Every rung up buys blinding with risk."
2. "Round 7 is about who is allowed to make that purchase."

Figure: `src/assets/images/fidelity-ladder.svg` (supplied in the kit). Rungs L0
at the bottom, L5 at the top.

---

## 3. Custom frontmatter keys (the spec tests read these — do not rename)

Keep every key the schema in `src/content.config.ts` requires. Add these custom
keys (they pass through into the API `meta`):

**sessions** — `week` (int 1–12), `phase` (`"Pre-op"` | `"Theatre"` | `"Debrief"`),
`format` (string), `prereqs` (int[] of earlier weeks), `usesLadder` (bool),
`protocolSection` (string, unique per week), `trials` (string[] of registry keys, may be empty)

**lectures** — `week` (int), `usesLadder` (bool), `definesLadder` (bool, `true`
only on the Week 4 lecture), `trials` (string[]), `deck` (string, Week 4 only:
`/decks/week-04-fidelity-ladder/`)

**assessments** — `code` (`"A1"` | `"A2"` | `"A3"`), weight (use the schema's own
weight key), due (schema's own key), `usesLadder` (bool), `requiresWeeks` (int[]),
`reviews` (A3 only: `"A2"`)

Also add `related:` edges from each session to its prereq sessions and to its
lecture (the build validates these), and from each assessment to the sessions in
`requiresWeeks`.

---

## 4. Schedule

Phases: **Pre-op** (Weeks 1–4: why and what), **Theatre** (Weeks 5–9: building
the trial), **Debrief** (Weeks 10–12: what happens after).

| Wk | Lecture (Mon) | Round (Wed) | Slug | Phase | Prereqs | Protocol section |
|---|---|---|---|---|---|---|
| 1 | 2026-07-27 | 2026-07-29 | `week-01-surgical-exceptionalism` | Pre-op | — | §1 The procedure and its claim |
| 2 | — | 2026-08-05 | `week-02-decomposing-the-surgical-effect` | Pre-op | 1 | §2 The threats list |
| 3 | 2026-08-10 | 2026-08-12 | `week-03-five-trials-one-structure` | Pre-op | 2 | §3 Precedent |
| 4 | 2026-08-17 | 2026-08-19 | `week-04-the-fidelity-ladder` | Pre-op | 3 | §4 Fidelity level |
| 5 | 2026-08-24 | 2026-08-26 | `week-05-four-channels-of-blinding` | Theatre | 4 | §5 Blinding plan |
| 6 | — | 2026-09-02 | `week-06-outcomes-that-believe-you` | Theatre | 5 | §6 Primary outcome and sample size |
| — | *Mid-semester break, 7–18 September* | | | | | |
| 7 | 2026-09-21 | 2026-09-23 | `week-07-equipoise-and-acceptable-risk` | Theatre | 4 | §7 Risk justification |
| 8 | — | 2026-09-30 | `week-08-the-consent-form` | Theatre | 7 | §8 Consent form |
| 9 | — | 2026-10-07 | `week-09-if-the-sham-wins` | Theatre | 6, 8 | §9 Stopping rules and post-trial access |
| 10 | 2026-10-12 | 2026-10-14 | `week-10-after-the-trial` | Debrief | 3 | §10 What would change practice |
| 11 | — | 2026-10-21 | `week-11-where-you-cannot-blind` | Debrief | 5 | §11 Limits statement |
| 12 | — | 2026-10-28 | `week-12-protocol-defence` | Debrief | 8, 9 | §12 Defence notes |

Assessments: **A1** due Fri 2026-10-02 · **A2** due Fri 2026-10-23 · **A3** due Fri 2026-10-30.

---

## 5. Rounds (sessions collection) — final copy

Every Round page uses the same four headings, in this order:
**The claim** · **Before the Round** · **In the room** · **Protocol log**.
Show at the top of each page: week, date, phase, format, prereqs as links, and a
"Uses the Ladder" marker when `usesLadder` is true.

### Week 1 — Surgical exceptionalism
`format: Seminar` · `prereqs: []` · `usesLadder: false` · `trials: [cobb-1959, dimond-1960]`
description: Why "it obviously works" was never tested, and what happened the one time it was.

**The claim.** Drugs have had to beat a placebo for most of a century. Surgery
entered evidence-based medicine by a side door: precedent, the surgeon's judgment,
and the fact that it is hard to argue with a scar. In 1959 a popular operation
for angina — ligating the internal mammary arteries — was tested against a skin
incision alone. The incision did about as well. The operation was abandoned. The
method was not taken up for decades.

**Before the Round.** Read Cobb et al. (1959) and Beecher's "Surgery as placebo"
(1961). Skim Wartolowska et al. (2014) for the numbers; you will need them all
semester.

**In the room.** Bring one procedure performed today whose evidence you trust.
For each one we ask a single question: what was it compared with? Most lists get
shorter.

**Protocol log — §1 The procedure and its claim.** Name the procedure you will
design a sham for. Write the claim it makes in one sentence a patient could repeat
back to you.

### Week 2 — Decomposing the surgical effect
`format: Workshop` · `prereqs: [1]` · `usesLadder: false` · `trials: []`
description: A patient who improves after surgery improved for several reasons at once. The operation is one of them.

**The claim.** Improvement after an operation is a sum. Natural history: many
conditions get better on their own. Regression to the mean: people present at
their worst. Expectation. The ritual of care. Co-interventions — the rest, the
physiotherapy, the analgesia. The surgeon's enthusiasm, and the fact that the
person asking "how is your pain?" is often the person who operated. The knife is
credited with the whole sum. A sham exists to subtract everything that is not the
knife.

**Before the Round.** Read Barnett et al. (2005) on regression to the mean and
Kaptchuk et al. (2006) on why a sham device outperformed an inert pill.

**In the room.** The Improvement Budget. You are given a case series: 40 patients,
knee pain falls from 7.1 to 3.4 at six weeks after surgery. Allocate the 3.7
points across every cause on the list above, and justify each allocation. Only
what remains can be credited to the operation. Compare budgets across tables.

**Protocol log — §2 The threats list.** List every non-specific effect your sham
must hold constant, ranked by how much of the improvement you think it explains.

### Week 3 — Five trials, one structure
`format: Workshop` · `prereqs: [2]` · `usesLadder: false` · `trials: [moseley-2002, buchbinder-2009, kallmes-2009, orbita-2017, symplicity-htn3-2014, freed-2001]`
description: Read side by side, the landmark sham-controlled trials turn out to be the same trial five times.

**The claim.** The five landmark trials look like five different specialties.
Read together they share one structure: a procedure in wide use, a plausible
mechanism, a sham arm built to carry the ritual without the mechanism, and a
result the field then had to live with. The shape is the lesson. The specialty
is detail.

**Before the Round.** Read the abstracts and methods sections of all five. Read
the sham description in each twice.

**In the room.** The trial table. Each table takes one trial and fills the same
eight columns: procedure, participants, what the sham did, who was blinded,
primary outcome, timepoint, result, what happened next. The five rows go on one
wall. We read across the columns, not down the rows.

**Protocol log — §3 Precedent.** Name the published trial your design most
resembles, and one thing you will do differently.

### Week 4 — The Sham Fidelity Ladder
`format: Workshop` · `prereqs: [3]` · `usesLadder: true` · `trials: [moseley-2002, buchbinder-2009, kallmes-2009, orbita-2017, symplicity-htn3-2014, freed-2001]`
description: How much of an operation do you have to perform in order not to perform it?

**The claim.** Every sham is a list of things the patient must not be able to
tell. The Ladder orders that list into six rungs, from being told (L0) to being
unable to tell (L5). It is measured from the patient's side of the drape. Every
rung up buys blinding with risk. This Round introduces the instrument; every Round
after it uses it.

**Before the Round.** Attend the lecture or work through the slides. Bring your
Week 3 trial table.

**In the room.** Rate the five. Each table places all five landmark trials on the
Ladder independently, then defends its placements to the room. Disagreements are
recorded, not resolved. They are the raw material for A1.

**Protocol log — §4 Fidelity level.** The rung you will build to, and the reason
you are not building one rung higher.

### Week 5 — Four channels of blinding
`format: Workshop` · `prereqs: [4]` · `usesLadder: true` · `trials: [orbita-2017]`
description: Blinding is not one switch. It is four, and the surgeon is always holding one of them.

**The claim.** A trial can blind the patient, the operator, the outcome assessor
and the analyst. In surgical trials the operator can almost never be blinded, so
the real design problem is stopping the operator's knowledge leaking into the
other three channels. A rung on the Ladder protects only the patient's channel.
The rest is logistics.

**Before the Round.** Read Schulz and Grimes (2002) on blinding. Read the ORBITA
methods on sedation and auditory isolation. Look up the Bang blinding index
(Bang et al., 2004).

**In the room.** Leak audit. Follow one fictional patient from consent to
twelve-month follow-up and mark every point where allocation could leak: the
theatre list, the post-operative instructions, the dressing, the nurse who was in
the room, the two-week phone call. Then decide how you would ask patients to
guess which arm they were in, and when.

**Protocol log — §5 Blinding plan.** Who is blind, who cannot be, and how you
stop the second group telling the first.

### Week 6 — Outcomes that believe you
`format: Studio` · `prereqs: [5]` · `usesLadder: false` · `trials: [moseley-2002, orbita-2017, symplicity-htn3-2014]`
description: The outcomes patients care about most are the ones most moved by expectation. That is the reason for the sham, not an argument against it.

**The claim.** Pain, function and "feeling better" are what patients want from an
operation, and they are the outcomes most responsive to belief. Objective measures
are not a hiding place: exercise time and blood pressure move with expectation and
attention too. The choice of outcome, and of when to measure it, is where a sham
earns or loses its cost.

**Before the Round.** Compare the primary outcomes of Moseley, ORBITA and
SYMPLICITY HTN-3. Note the timepoint each chose and what it would have missed.

**In the room.** Choose a primary outcome for your protocol and defend its
timepoint to a table that has been told to disagree. Then work through a
back-of-envelope sample size from a supplied minimal clinically important
difference and standard deviation.

**Protocol log — §6 Primary outcome and sample size.** The outcome, the
timepoint, and the arithmetic, with every assumption named.

### Week 7 — Equipoise and acceptable risk
`format: Seminar` · `prereqs: [4]` · `usesLadder: true` · `trials: [freed-2001]`
description: Ethics committees read the Ladder upside down.

**The claim.** To a methodologist the Ladder climbs towards better evidence. To
an ethics committee it climbs towards more risk, offered to someone who, by
design, cannot benefit. Both readings are correct. A sham trial is justified only
when there is real uncertainty about the procedure, the knowledge is worth having,
and the risk of the chosen rung is as small as the question allows.

**Before the Round.** Read Macklin (1999) against placebo surgery, Freeman et al.
(1999) in its defence, and Horng and Miller (2002) on the conditions under which
it can be acceptable.

**In the room.** The committee sits. The class reviews three anonymised proposals,
at L2, L4 and L5, and must approve, approve with conditions, or decline each one.
Minutes are taken.

**Protocol log — §7 Risk justification.** Your rung, the risks it adds over the
rung below it, and why the answer is worth them.

### Week 8 — The consent form
`format: Workshop` · `prereqs: [7]` · `usesLadder: false` · `trials: [kallmes-2009]`
description: Tell a patient they may receive an operation that does nothing, without turning the trial into a guessing game.

**The claim.** The consent form is the only part of the protocol the patient
reads. It must say plainly that they may receive a procedure with no active
element, and it must say it without teaching them how to work out which arm they
are in. Most failed sentences fail in one of two ways: they are too frightening
to sign, or too detailed to stay blind.

**Before the Round.** Read the consent and crossover arrangements in Kallmes et
al. (2009). Bring a draft of your own consent form.

**In the room.** A sentence-level workshop. Each draft is read aloud to someone
from outside the course, who then explains back what they agreed to. We mark the
gap between the two.

**Protocol log — §8 Consent form.** The full text, at a reading level you have
checked.

### Week 9 — If the sham wins
`format: Studio` · `prereqs: [6, 8]` · `usesLadder: false` · `trials: []`
description: Decide in advance what happens if the sham arm does better, and who is allowed to know.

**The claim.** A trial with a sham arm must agree before it starts when it will
stop, who watches the interim data, when a patient is unblinded, and what the
sham arm is offered at the end. These decisions are hardest to make when the
answer is already visible, which is why they are written down first.

**Before the Round.** Read the role of the data monitoring committee in your
precedent trial. Find out what, if anything, its sham arm was offered afterwards.

**In the room.** Tabletop. A data monitoring committee meets three times with
fictional interim results. At each meeting it decides whether to continue, and
the room decides whether that decision was written down before or after the data.

**Protocol log — §9 Stopping rules and post-trial access.** When you stop, who
decides, and what the sham arm is offered.

### Week 10 — After the trial
`format: Seminar` · `prereqs: [3]` · `usesLadder: false` · `trials: [moseley-2002, fidelity-2013, buchbinder-2009, kallmes-2009, vapour-2016, vertos4-2018]`
description: A negative sham-controlled trial ends a question for methodologists. It does not always end the procedure.

**The claim.** After the 2009 vertebroplasty trials, guidance turned against the
procedure. Then VAPOUR (2016) reported benefit in acute fractures, and VERTOS IV
(2018) did not. Knee arthroscopy for degenerative disease followed a similar path,
from Moseley (2002) through FIDELITY (2013) to a strong recommendation against it
in 2017. Practice moved more slowly than the evidence, and for reasons a protocol
can anticipate: payment, training, patient demand, and the argument that the
trial studied the wrong patients.

**Before the Round.** Read VAPOUR and VERTOS IV side by side. Read the 2017 BMJ
Rapid Recommendation on knee arthroscopy.

**In the room.** Write the paragraph a guideline panel would write if your trial
came back null. Swap it with a neighbour, and write the reply an unconvinced
surgeon would send.

**Protocol log — §10 What would change practice.** The result that would make you
stop doing the procedure, and who would need to hear it.

### Week 11 — Where you cannot blind
`format: Seminar` · `prereqs: [5]` · `usesLadder: true` · `trials: [symplicity-htn3-2014, spyral-2020, csaw-2018]`
description: Some procedures cannot be shammed, and some devices change faster than a trial can test them.

**The claim.** Transplantation, trauma surgery and procedures whose effect is
visible have no upper rungs. Devices raise a different problem: SYMPLICITY HTN-3
was negative, a redesigned approach was tested again under sham control in
SPYRAL HTN-OFF MED, and the answer changed. A sham trial tests a device. The
device keeps moving. The alternatives — partial shams, blinded assessment,
expertise-based designs — each give up something specific.

**Before the Round.** Read the design of CSAW (2018), which ran an investigational
arthroscopy arm alongside no treatment. Read SPYRAL HTN-OFF MED (2020).

**In the room.** Each protocol is handed to another table with one instruction:
find what this sham cannot rule out.

**Protocol log — §11 Limits statement.** What your sham cannot rule out, stated
before a reviewer states it for you.

### Week 12 — Protocol defence
`format: Crit` · `prereqs: [8, 9]` · `usesLadder: true` · `trials: []`
description: A sham protocol is finished when someone who wants to stop it cannot.

**The claim.** Everything in the protocol has been written by someone who wants
the trial to happen. This Round gives it to people who do not have to.

**Before the Round.** Submit A2. Read the protocol you have been allocated to
review for A3.

**In the room.** Each protocol goes before a panel of three classmates sitting as
the Ethics Committee, with the convenor in the chair. Ten minutes to present,
fifteen to answer. The panel does not say whether it approves. That is A3.

**Protocol log — §12 Defence notes.** The three questions you expected, the three
you were asked, and the difference.

---

## 6. Lectures (lectures collection) — final copy

Each lecture page: date, week, the outline as a short list, and a link to the
Round it belongs to. Only Week 4 has slides; other lectures say:
"This lecture has no slides. It has a whiteboard."

| Wk | Slug | Date | Title | Flags |
|---|---|---|---|---|
| 1 | `lecture-01-surgery-as-placebo` | 2026-07-27 | Surgery as placebo, 1959 to now | `trials: [cobb-1959, dimond-1960]`, `usesLadder: false` |
| 3 | `lecture-03-five-trials` | 2026-08-10 | Five trials, one structure | all six landmark keys, `usesLadder: false` |
| 4 | `lecture-04-the-fidelity-ladder` | 2026-08-17 | The Sham Fidelity Ladder | `definesLadder: true`, `usesLadder: false`, `deck: /decks/week-04-fidelity-ladder/`, landmark keys |
| 5 | `lecture-05-who-knows-what` | 2026-08-24 | Who knows what: four channels of blinding | `usesLadder: true`, `trials: [orbita-2017]` |
| 7 | `lecture-07-reading-the-ladder-upside-down` | 2026-09-21 | Reading the Ladder upside down | `usesLadder: true`, `trials: [freed-2001]` |
| 10 | `lecture-10-the-procedure-outlived-the-trial` | 2026-10-12 | The trial ended. The procedure didn't. | `usesLadder: false`, `trials: [buchbinder-2009, kallmes-2009, vapour-2016, vertos4-2018, moseley-2002, fidelity-2013]` |

Outlines (render as a short list):

- **L1** — The internal mammary artery ligation trials, 1959–60 · Beecher's
  argument · How surgery acquired its evidence · Wartolowska's count: in most
  placebo-controlled surgical trials the placebo arm improved too.
- **L3** — The shared structure · What each sham actually did · Who was blinded
  in each · What each result changed, and what it didn't.
- **L4** — The question: how much of an operation must you perform in order not
  to perform it? · The six rungs · Measured from the patient's side of the drape ·
  Placing two trials live · Every rung up buys blinding with risk.
  **[Slides](/decks/week-04-fidelity-ladder/)**
- **L5** — Patient, operator, assessor, analyst · Why the operator is the leak ·
  Auditory isolation in ORBITA · Asking patients to guess.
- **L7** — Equipoise · Risk to someone who cannot benefit · Macklin, Freeman,
  Horng and Miller · The burr hole in Freed et al. · Reading the Ladder from the
  committee's side of the table.
- **L10** — Vertebroplasty after 2009 · Knee arthroscopy after 2002 · Why
  practice resists · What a protocol can decide in advance about its own result.

---

## 7. Assessments — final copy

### A1 — Sham Autopsy (35%)
slug `a1-sham-autopsy` · due 2026-10-02 · `code: A1` · `usesLadder: true` · `requiresWeeks: [3, 4, 7]`
description: Take apart one published sham-controlled trial and place it on the Ladder.

Choose one published sham-controlled trial of a procedure. Any trial in the
course registry except the five landmark trials is approved; others need the
convenor's agreement before Week 6.

Submit 1,200 words and a one-page rating sheet. The rating sheet places the
trial on the Sham Fidelity Ladder and lists, for each element of the rung, the
sentence in the paper that shows it was there. The essay defends the rating,
analyses the four blinding channels, and states what the trial could and could
not conclude because of how its sham was built.

Marked on: the rating and its defence (40) · blinding analysis (25) · what the
trial could and could not conclude (25) · writing (10).

### A2 — The Protocol (50%)
slug `a2-the-protocol` · due 2026-10-23 · `code: A2` · `usesLadder: true` · `requiresWeeks: [4, 5, 6, 7, 8, 9]`
description: A complete sham-controlled protocol for a procedure performed today without one.

Submit your protocol log, §1 to §11, as one document of no more than 4,000
words, plus the full consent form (not counted). The sham must be described at
the level of an operation note: a theatre team should be able to perform it
from your text. State its rung on the Ladder and justify it.

Marked on: the sham, as specified (30) · blinding plan (15) · outcome and sample
size (15) · risk justification (15) · consent form (15) · stopping rules and
limits (10).

### A3 — Ethics Committee Response (15%)
slug `a3-ethics-committee-response` · due 2026-10-30 · `code: A3` · `usesLadder: true` · `requiresWeeks: [7, 12]` · `reviews: "A2"`
description: Sit on the committee. Review a classmate's protocol in 400 words.

You are allocated one classmate's A2 at the Week 12 defence. Write 400 words as a
member of the ethics committee. Decide: approve, approve with conditions, or
decline. Refer to the protocol's rung and its risk justification.

Marked on one question: if the author read your review, would the protocol get
better?

---

## 8. Policies page (`src/pages/policies/index.mdx`) — final copy

**The one rule.** No real patients. Every procedure in this course is on paper.

**Rounds.** Rounds are where the protocol gets built. Missing one means writing
that section of the protocol alone. Tell your tutor before, not after.

**Late work.** Five per cent of the available marks per working day, for up to
five working days. After that, the work is not marked.

**Extensions.** Ask before the deadline. An extension request is a protocol
amendment: say what changes, why, and the new date.

**Generative AI.** You may use it to draft, restructure and check your writing.
You may not use it to supply citations. Every reference you give must be to a
paper you have opened. An invented reference is the only sham this course does
not accept.

**Content.** This course describes surgery in words. It uses no clinical images.
You will read about incisions; you will not see one.

**Deception.** Nothing in this course is a sham except the things we tell you are.

**Academic integrity.** SlopU's academic integrity rules apply in full.

---

## 9. People (people collection)

- **A/Prof Maren Tolliver** — Convenor. Trained as a trial statistician. Has
  designed eleven operations that were never performed. Nine were approved.
- **Dr Felix Ansell-Obi** — Tutor, Theatre phase. Former perioperative nurse and
  research coordinator. Has read more consent forms aloud than anyone should.

Both are fictional. Link them from the Rounds they teach if the schema supports
teacher references (Tolliver: all lectures, Weeks 1–4 and 10–12; Ansell-Obi:
Weeks 5–9).

---

## 10. Deck — `src/decks/week-04-fidelity-ladder.deck.mdx`

Astromotion markdown, `---` between slides. Keep text large; one idea per slide.

1. **The Sham Fidelity Ladder** — SLOP8982 · Round 4 · Lecture
2. "Every sham is a list of things the patient must not be able to tell."
3. The question: how much of an operation do you have to perform in order not to perform it?
4. **L0 Told** — The patient is told. Nothing else happens. The floor.
5. **L1 Staged** — Room, gown, monitoring, drapes, waiting. No skin breached.
6. **L2 Breached** — Local anaesthetic, a puncture, an incision. Nothing deeper.
7. **L3 Approached** — Instruments reach towards the target and stop.
8. **L4 Mimicked** — L3 plus the sounds, smells, pressures and duration of the real thing.
9. **L5 Indistinguishable** — L4 plus matched anaesthesia, recovery, dressing, scar, and a scripted team.
10. The whole Ladder on one slide (the SVG figure). Caption: "Measured from the patient's side of the drape."
11. Placing a trial: Buchbinder 2009 — a needle resting on bone, the vertebra tapped, the cement mixed in the room so it could be smelled. Where does it sit? (Our provisional answer: L4. Argue.)
12. Placing a trial: ORBITA — sedation, headphones, the same laboratory, the same time on the table. (Provisional: L5. Note that both arms had angiography.)
13. "Every rung up buys blinding with risk."
14. In the Round: rate the five. Record disagreements. Write §4.
15. Next: Round 5 — four channels of blinding.

Provisional ratings are the course's teaching positions, not published facts. Say so on slide 11.

---

## 11. Trial registry (the only trials the site may name)

Keys are used in `trials:` frontmatter; the spec test rejects any other key.
Do not add trials, author names, years or findings that are not here. Do not add
volume or page numbers.

| Key | Citation | Safe one-line summary |
|---|---|---|
| `cobb-1959` | Cobb LA et al. NEJM 1959 | Internal mammary artery ligation vs skin incision for angina; no meaningful difference. |
| `dimond-1960` | Dimond EG, Kittle CF, Crockett JE. Am J Cardiol 1960 | Same question, same answer. |
| `moseley-2002` | Moseley JB et al. NEJM 2002 | Arthroscopic lavage or debridement vs sham (skin incisions, simulated procedure) for knee osteoarthritis; no difference. |
| `buchbinder-2009` | Buchbinder R et al. NEJM 2009 | Vertebroplasty vs sham for osteoporotic vertebral fractures; no difference. |
| `kallmes-2009` | Kallmes DF et al. NEJM 2009 (INVEST) | Vertebroplasty vs sham (local anaesthetic to bone); no significant difference; crossover allowed after one month. |
| `orbita-2017` | Al-Lamee R et al. Lancet 2018 (online 2017) | PCI vs sham in stable single-vessel angina; no significant difference in exercise time. |
| `orbita2-2023` | Rajkumar CA et al. NEJM 2023 (ORBITA-2) | PCI vs placebo procedure off antianginals; lower angina symptom score with PCI. |
| `symplicity-htn3-2014` | Bhatt DL et al. NEJM 2014 | Renal denervation vs sham (renal angiography); no significant difference in systolic pressure. |
| `spyral-2020` | Böhm M et al. Lancet 2020 (SPYRAL HTN-OFF MED Pivotal) | Redesigned renal denervation vs sham; blood pressure lowered. |
| `freed-2001` | Freed CR et al. NEJM 2001 | Embryonic dopamine-neuron transplantation vs sham surgery (partial burr holes) in Parkinson's disease. |
| `fidelity-2013` | Sihvonen R et al. NEJM 2013 (FIDELITY) | Arthroscopic partial meniscectomy vs sham surgery; no difference. |
| `csaw-2018` | Beard DJ et al. Lancet 2018 (CSAW) | Subacromial decompression vs investigational arthroscopy only vs no treatment. |
| `vapour-2016` | Clark W et al. Lancet 2016 (VAPOUR) | Vertebroplasty vs sham in acute fractures; reported benefit. |
| `vertos4-2018` | Firanescu CE et al. BMJ 2018 (VERTOS IV) | Vertebroplasty vs sham; no significant difference. |

Other readings the site may cite (no key needed): Beecher HK, "Surgery as
placebo", JAMA 1961 · Wartolowska K et al., BMJ 2014 · Barnett AG et al., Int J
Epidemiol 2005 · Kaptchuk TJ et al., BMJ 2006 · Schulz KF & Grimes DA, Lancet
2002 · Bang H et al., Control Clin Trials 2004 · Macklin R, NEJM 1999 · Freeman
TB et al., NEJM 1999 · Horng S & Miller FG, NEJM 2002 · Siemieniuk RAC et al.,
BMJ 2017.

Landmark set (must each appear in at least one Round or lecture `trials:`):
`moseley-2002`, `buchbinder-2009`, `kallmes-2009`, `orbita-2017`,
`symplicity-htn3-2014`, `freed-2001`.
