import "server-only";

/**
 * Profiles that are deliberately not published on the site.
 *
 * These live behind `server-only` on purpose. Importing them into a client
 * component would put the URLs in the JavaScript bundle, where hiding them in
 * the UI achieves nothing: anyone can read the bundle. Keeping them here means
 * the string never reaches the browser unless the gate below allows it.
 */
export const PRIVATE_PROFILE_IDS = ["linkedin", "x"] as const;
export type PrivateProfileId = (typeof PRIVATE_PROFILE_IDS)[number];

/**
 * Read from the environment, never committed.
 *
 * This repository is public. Hardcoding the URLs here would publish them on
 * GitHub, which defeats the whole point: `server-only` keeps a string out of
 * the browser bundle, it does nothing about a public repo. Set these in the
 * Vercel project settings and in .env.local for development.
 *
 * A missing value means the profile is simply never offered, which fails
 * closed rather than open.
 */
export const PRIVATE_PROFILES: Record<PrivateProfileId, string | undefined> = {
    linkedin: process.env.PROFILE_LINKEDIN,
    x: process.env.PROFILE_X,
};

/**
 * Which profiles a visitor is allowed to see, based on where they came from.
 *
 * The rule is that the site must not connect one identity to another. Someone
 * who arrives from X should not leave knowing the LinkedIn, and vice versa.
 * Anyone arriving from anywhere else, including a direct visit or a search
 * result, sees neither.
 *
 * This is deliberately not a security control. The referrer is supplied by the
 * client and can be forged, so treat this as removing casual cross-discovery,
 * not as a guarantee.
 */
export function allowedFor(referrer: string | null | undefined): PrivateProfileId[] {
    if (!referrer) return [];

    let host: string;
    try {
        host = new URL(referrer).hostname.toLowerCase();
    } catch {
        return [];
    }

    // Match the registrable domain, so "evil-linkedin.com" does not pass and
    // "www.linkedin.com" does.
    const from = (domain: string) => host === domain || host.endsWith(`.${domain}`);

    if (from("linkedin.com") || from("lnkd.in")) return ["linkedin"];
    if (from("x.com") || from("twitter.com") || from("t.co")) return ["x"];

    // Discord, Google, direct visits and everything else: neither.
    return [];
}
