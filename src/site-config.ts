import { defineSiteConfig } from "astro-theme-university/types";
import { slopBranding } from "astro-theme-slop";
import { courseMeta } from "./course-config";

// The underlying collection and URL remain `sessions`; these labels are the
// language students see.
export const sessionLabels = {
  singular: "Round",
  plural: "Rounds",
} as const;

export const graphCollections = ["sessions", "assessments", "lectures", "people"];

export const courseApiCollections = [
  ...graphCollections.map((key) => ({ key })),
  { key: "policies", dir: "pages/policies" },
];

export const siteConfig = defineSiteConfig({
  ...slopBranding,
  name: "Slop University",

  links: [
    { text: sessionLabels.plural, href: "/sessions/" },
    { text: "Lectures", href: "/lectures/" },
    { text: "Assessments", href: "/assessments/" },
    { text: "People", href: "/people/" },
    { text: "Policies", href: "/policies/" },
  ],

  licence: "CC-BY-NC-SA-4.0",
  socialImage: "/src/assets/images/social-card.png",
  socialImageAlt: `${courseMeta.code} Designing the Sham, with the Sham Fidelity Ladder`,
});
