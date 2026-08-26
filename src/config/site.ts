import { SITE_URL, SOCIAL } from "./links";

export const SITE = {
    name: "Harsh Yadav",
    url: SITE_URL,
    domain: "harsh.ing",
    title: "Harsh Yadav, Design Engineer",
    description: "Design engineer. I design software, then write the code that ships it. Design systems, interfaces, and the production code underneath. Next.js, React, TypeScript, Node. Open to new opportunities.",
    descriptionShort: "Design engineer. I design software, then write the code that ships it. Open to new opportunities.",
    locale: "en_US",
    jobTitle: "Design Engineer",
    employer: "Hammurabi AI",
    location: { city: "Pune", country: "IN" },
    // X is deliberately not listed: the account is public but Harsh does not
    // link it from the site, and sameAs would tell search engines to associate
    // the identities anyway.
    sameAs: [SOCIAL.github, SOCIAL.linkedin],
} as const;
