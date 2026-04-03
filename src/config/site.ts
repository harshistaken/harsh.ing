import { SITE_URL, SOCIAL } from "./links";

export const SITE = {
    name: "Harsh Yadav",
    url: SITE_URL,
    domain: "harsh.ing",
    title: "Harsh Yadav",
    description: "Full-stack developer building web apps, real-time systems, and AI-powered products. Next.js, React, TypeScript, and Node.js. Available for freelance and contract work.",
    descriptionShort: "Full-stack developer building web apps, real-time systems, and AI-powered products. Available for freelance and contract work.",
    locale: "en_US",
    jobTitle: "Full-Stack Developer",
    employer: "Hammurabi AI",
    location: { city: "Pune", country: "IN" },
    sameAs: [SOCIAL.github, SOCIAL.linkedin, SOCIAL.x],
} as const;
