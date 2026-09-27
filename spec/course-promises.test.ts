// Course promises for SLOP8814 Designing the Sham.
// Each test protects something the course says about itself that the build
// cannot check. Source of truth: COURSE-SPEC.md. Change a test only when
// COURSE-SPEC changes, and say so in the commit.
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";

interface ApiNode {
  id: string;
  type: string;
  meta?: Record<string, unknown>;
  body?: string;
}
interface CourseApi {
  course: { startDate: string; endDate: string };
  nodes: ApiNode[];
}

const api = JSON.parse(readFileSync(resolve("dist/api/index.json"), "utf8")) as CourseApi;
const day = (v: unknown): string => String(v).slice(0, 10);
const addDays = (iso: string, n: number): string => {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};
const of = (type: string) => api.nodes.filter((n) => n.type === type);
const m = (n: ApiNode) => n.meta ?? {};
const whenOf = (n: ApiNode): string => day(n.type === "assessments" ? m(n).due : m(n).date);
const weightOf = (n: ApiNode): number =>
  Number(m(n).weight ?? m(n).weighting ?? m(n).percent ?? m(n).percentage);

const sessions = of("sessions");
const lectures = of("lectures");
const assessments = of("assessments");
const sessionByWeek = new Map(sessions.map((s) => [Number(m(s).week), s]));
const byCode = (code: string) => assessments.find((a) => m(a).code === code);

// COURSE-SPEC §11. The only trials the site may name.
const REGISTRY = new Set([
  "cobb-1959", "dimond-1960", "moseley-2002", "buchbinder-2009", "kallmes-2009",
  "orbita-2017", "orbita2-2023", "symplicity-htn3-2014", "spyral-2020", "freed-2001",
  "fidelity-2013", "csaw-2018", "vapour-2016", "vertos4-2018",
]);
// The five landmark trials the home page promises (vertebroplasty is two papers).
const LANDMARKS = [
  "moseley-2002", "buchbinder-2009", "kallmes-2009",
  "orbita-2017", "symplicity-htn3-2014", "freed-2001",
];
const PHASE_OF = (w: number) => (w <= 4 ? "Pre-op" : w <= 9 ? "Theatre" : "Debrief");

describe("twelve Rounds that progress", () => {
  it("has exactly one Round for each of weeks 1 to 12, in date order", () => {
    const weeks = sessions.map((s) => Number(m(s).week)).sort((a, b) => a - b);
    expect(weeks).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    for (let w = 2; w <= 12; w++) {
      expect(whenOf(sessionByWeek.get(w)!) > whenOf(sessionByWeek.get(w - 1)!),
        `Week ${w} is not dated after Week ${w - 1}`).toBe(true);
    }
  });

  it("puts each Round in its phase: Pre-op 1–4, Theatre 5–9, Debrief 10–12", () => {
    for (const s of sessions) {
      const w = Number(m(s).week);
      expect(m(s).phase, `${s.id}`).toBe(PHASE_OF(w));
    }
  });

  it("adds a different protocol section every week (no two weeks repeat)", () => {
    const sections = sessions.map((s) => String(m(s).protocolSection ?? "").trim());
    for (const [i, sec] of sections.entries()) {
      expect(sec.length, `${sessions[i].id} has no protocolSection`).toBeGreaterThan(0);
    }
    expect(new Set(sections).size).toBe(12);
  });

  it("resolves every prereq to an earlier Round", () => {
    for (const s of sessions) {
      const prereqs = (m(s).prereqs ?? []) as number[];
      for (const p of prereqs) {
        const target = sessionByWeek.get(Number(p));
        expect(target, `${s.id} requires missing week ${p}`).toBeDefined();
        expect(whenOf(target!) < whenOf(s), `${s.id} requires week ${p}, which is not earlier`).toBe(true);
      }
    }
  });
});

describe("the Fidelity Ladder", () => {
  const definers = [...sessions, ...lectures, ...assessments].filter((n) => m(n).definesLadder === true);

  it("is defined exactly once, in the Week 4 lecture", () => {
    expect(definers.length).toBe(1);
    expect(definers[0].type).toBe("lectures");
    expect(Number(m(definers[0]).week)).toBe(4);
  });

  it("is never used before it is defined", () => {
    const defined = whenOf(definers[0]);
    const users = [...sessions, ...lectures, ...assessments].filter((n) => m(n).usesLadder === true);
    expect(users.length).toBeGreaterThan(0);
    for (const u of users) {
      expect(whenOf(u) > defined, `${u.id} uses the Ladder before Week 4 defines it`).toBe(true);
    }
  });

  it("is carried by the Week 4 lecture's deck, which was built", () => {
    const deck = String(m(definers[0]).deck ?? "");
    expect(deck).toMatch(/^\/decks\/[a-z0-9-]+\/$/);
    const name = deck.split("/")[2];
    const built = [join("dist", "decks", name, "index.html"), join("dist", "decks", `${name}.html`)];
    expect(built.some((p) => existsSync(p)), `deck ${deck} not found in dist/`).toBe(true);
  });
});

describe("assessment grows out of the weeks", () => {
  it("adds up to 100%", () => {
    const total = assessments.reduce((sum, a) => sum + weightOf(a), 0);
    expect(total).toBe(100);
  });

  it("is due only after every week it draws on has been taught", () => {
    for (const a of assessments) {
      const weeks = (m(a).requiresWeeks ?? []) as number[];
      expect(weeks.length, `${a.id} names no weeks`).toBeGreaterThan(0);
      for (const w of weeks) {
        const s = sessionByWeek.get(Number(w));
        expect(s, `${a.id} requires missing week ${w}`).toBeDefined();
        expect(whenOf(s!) <= whenOf(a), `${a.id} is due before week ${w} is taught`).toBe(true);
      }
    }
  });

  it("teaches the consent form before the protocol that must contain one is due", () => {
    const consent = sessionByWeek.get(8)!;
    expect(String(m(consent).protocolSection)).toMatch(/consent/i);
    expect(whenOf(consent) < whenOf(byCode("A2")!)).toBe(true);
  });

  it("gives reviewers at least 7 days with the protocols they review", () => {
    const a2 = byCode("A2")!;
    const a3 = byCode("A3")!;
    expect(m(a3).reviews).toBe("A2");
    expect(whenOf(a3) >= addDays(whenOf(a2), 7)).toBe(true);
  });
});

describe("no invented evidence", () => {
  const cited = [...sessions, ...lectures].flatMap((n) =>
    ((m(n).trials ?? []) as string[]).map((t) => ({ id: n.id, t })));

  it("names only trials in the course registry", () => {
    for (const { id, t } of cited) expect(REGISTRY.has(t), `${id} cites unregistered trial "${t}"`).toBe(true);
  });

  it("actually teaches every landmark trial the home page promises", () => {
    const taught = new Set(cited.map((c) => c.t));
    for (const t of LANDMARKS) expect(taught.has(t), `landmark ${t} is never taught`).toBe(true);
  });
});

describe("voice", () => {
  const BANNED = [
    /\bdelv(e|es|ing)\b/i, /\btapestry\b/i, /\bembark/i, /\bjourney\b/i, /\bunlock/i,
    /in today['’]s/i, /rapidly evolving/i, /it['’]s important to note/i,
    /navigate the complexities/i, /game[- ]changer/i, /cutting[- ]edge/i,
    /\bdive into\b/i, /\bdeep dive\b/i, /a testament to/i, /whether you['’]re/i,
  ];
  const files: string[] = [];
  const walk = (dir: string) => {
    if (!existsSync(dir)) return;
    for (const f of readdirSync(dir)) {
      const p = join(dir, f);
      if (statSync(p).isDirectory()) walk(p);
      else if (/\.(md|mdx|astro)$/.test(p)) files.push(p);
    }
  };
  walk("src/content");
  walk("src/pages");
  walk("src/decks");

  it("contains none of the banned filler phrases", () => {
    for (const f of files) {
      const text = readFileSync(f, "utf8");
      for (const re of BANNED) expect(re.test(text), `${f} contains ${re}`).toBe(false);
    }
  });
});
