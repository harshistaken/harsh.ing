import { SITE_URL, SOCIAL } from "./links";

export const SITE = {
    name: "Harsh Yadav",
    url: SITE_URL,
    domain: "harsh.ing",
    title: "Harsh Yadav",
    description: "Design engineer. I design software, then write the code that ships it. Design systems, interfaces, and the production code underneath. Next.js, React, TypeScript, Node. Open to new opportunities.",
    descriptionShort: "Design engineer. I design software, then write the code that ships it. Open to new opportunities.",
    locale: "en_US",
    jobTitle: "Design Engineer",
    employer: "Hammurabi AI",
    location: { city: "Pune", country: "IN" },
    sameAs: [SOCIAL.github, SOCIAL.linkedin, SOCIAL.x],
} as const;
