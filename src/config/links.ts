export const SITE_URL = "https://harsh.ing";

export const GITHUB_USERNAME = "harshistaken";

// LinkedIn and X deliberately live in config/private-links.ts behind
// `server-only`. They are referrer-gated, so they must never be importable
// from a client component or they end up in the JS bundle.
export const SOCIAL = {
    github: `https://github.com/${GITHUB_USERNAME}`,
    email: "harshyadav.build@gmail.com",
    cal: "https://cal.com/harshing",
} as const;
