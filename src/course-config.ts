import type { CourseMetaInput } from "astro-course-university";
import { z } from "astro/zod";

// The level digits ANU uses: 1000--4000 undergraduate, 6000 and 8000
// postgraduate. Both the code pattern and the level field derive from this.
const LEVELS = [1, 2, 3, 4, 6, 8] as const;
const allowedCode = new RegExp(`^SLOP[${LEVELS.join("")}]\\d{3}$`);

export const slopCourseMetaSchema = z
  .strictObject({
    code: z.string().regex(allowedCode, {
      message: "use SLOP plus a 1000–4000, 6000 or 8000 level code",
    }),
    title: z.string().trim().min(1).max(100),
    session: z.string().trim().min(1).max(40),
    year: z.number().int().min(2026).max(2200),
    level: z.literal(LEVELS),
    startDate: z.iso.date(),
    endDate: z.iso.date(),
    description: z.string().trim().min(80).max(300),
    tags: z.array(z.string().trim().min(2).max(24)).min(1).max(3),
  })
  .superRefine((course, ctx) => {
    const codeLevel = Number(course.code.at(4));
    if (course.level !== codeLevel) {
      ctx.addIssue({
        code: "custom",
        path: ["level"],
        message: `must match ${course.code}'s first digit (${codeLevel})`,
      });
    }
    if (course.startDate > course.endDate) {
      ctx.addIssue({
        code: "custom",
        path: ["startDate"],
        message: "must not be after endDate",
      });
    }
  });

// The single source of truth for the course record. The generated homepage,
// navigation label and /api/index.json all read this object.
//
// The code's last three digits (814) were assigned to this repo when it was
// provisioned; COURSE-SPEC.md uses the same code.
export const courseMeta = slopCourseMetaSchema.parse({
  code: "SLOP8814",
  title: "Designing the Sham: Placebo Controls for Invasive Procedures",
  session: "Semester 2",
  year: 2026,
  level: 8,
  startDate: "2026-07-27",
  endDate: "2026-10-30",
  description:
    "Invasive procedures are rarely tested against placebo. This course treats " +
    "the sham operation as a design object: how it is built, blinded, " +
    "consented, reviewed, and defended.",
  tags: ["trial methodology", "surgical ethics", "blinding"],
}) satisfies CourseMetaInput;
