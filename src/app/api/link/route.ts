import { NextResponse } from "next/server";
import { PRIVATE_PROFILES, allowedFor } from "@/config/private-links";

/**
 * Resolves the profile links a visitor is permitted to see.
 *
 * The client passes its own document.referrer rather than the request's Referer
 * header, because by the time this route is called the referrer of the fetch is
 * the site itself. That means the value is client-controlled and forgeable; see
 * the note in private-links.ts. The point is that the URLs are not in the page
 * source or the JS bundle, so they are not there to be stumbled upon.
 */
export const dynamic = "force-dynamic";

export function GET(request: Request) {
    const from = new URL(request.url).searchParams.get("from");
    const allowed = allowedFor(from);

    const links: Partial<Record<string, string>> = {};
    for (const id of allowed) links[id] = PRIVATE_PROFILES[id];

    return NextResponse.json(
        { links },
        { headers: { "Cache-Control": "no-store" } },
    );
}
