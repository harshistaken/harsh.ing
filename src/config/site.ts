import { SITE_URL, SOCIAL } from "./links";

export const SITE = {
    name: "Harsh Yadav",
    url: SITE_URL,
    domain: "harsh.ing",
    title: "Harsh Yadav",
    description: "Software engineer building web apps, real-time systems, and AI-powered products. Next.js, React, TypeScript, and Node.js. Open to new opportunities.",
    descriptionShort: "Software engineer building web apps, real-time systems, and AI-powered products. Open to new opportunities.",
    locale: "en_US",
    jobTitle: "Software Engineer",
    employer: "Hammurabi AI",
    location: { city: "Pune", country: "IN" },
    sameAs: [SOCIAL.github, SOCIAL.linkedin, SOCIAL.x],
} as const;
