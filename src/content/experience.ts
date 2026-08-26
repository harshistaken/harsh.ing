export interface ExperienceEntry {
    type: "work" | "milestone";
    company: string;
    role?: string;
    logo?: string;
    /** intrinsic dimensions of the logo asset, used for the aspect ratio */
    logoW?: number;
    logoH?: number;
    startDate: { month: number; year: number };
    endDate?: { month: number; year: number };
    badges?: string[];
    active?: boolean;
    bullets?: string[];
    barColor: "accent" | "gray" | "green";
    barLabel?: string;
}

export const TIMELINE_START_YEAR = 2018;
export const TIMELINE_END_YEAR = 2026;
export const YEAR_HEIGHT = 80;

export const experience: ExperienceEntry[] = [
    {
        type: "work",
        company: "Hammurabi AI",
        role: "Design Engineer",
        logo: "/icons/Hammurabi.svg",
        startDate: { month: 8, year: 2026 },
        badges: ["DESIGN ENGINEER", "DESIGN SYSTEMS", "REMOTE"],
        active: true,
        barColor: "accent",
        barLabel: "CONTRACT",
        bullets: [
            "own the design system for a legal AI product live in the Turkish market, covering the existing Next.js web app and a new mobile app now being designed. the work runs from token architecture in Figma through the pipeline that generates the stylesheets",
            "rebuilt the token layer as five Figma collections so every semantic token aliases a primitive in one hop, removing the vendor kit's middle theme layer. 64 variable pairs deleted and 134 bindings repointed",
            "wrote a deterministic OKLCH palette generator in Python that derives the color ramps from six measured brand anchors and emits the contrast report alongside them, so the locked palette document is generated rather than hand written",
            "built a three-part Figma to CSS token pipeline because the kit's own plugin could not be used: a dump script, an exporter, and a verifier that round-trips all 220 values back against the source. the exporter fails loudly on count drift and the generated stylesheets carry a do-not-edit header",
            "held all text to AA 4.5:1 with no large-text relaxation, since the product's dominant text size is 12px. the palette carries 182 automated contrast checks with zero failures, and the focus indicator is an opaque 1px ring verified across all 15 focus variants",
            "added a Desktop/Touch density collection and built the first mobile components against it. uppercase text-transform is banned system wide because Turkish distinguishes i/\u0130 and \u0131/I, so labels are authored in their intended case",
        ],
    },
    {
        type: "work",
        company: "CureMeAbroad",
        role: "Design Engineer",
        logo: "/icons/CureMeAbroad.png",
        logoW: 180,
        logoH: 180,
        startDate: { month: 4, year: 2026 },
        endDate: { month: 8, year: 2026 },
        badges: ["DESIGN ENGINEER", "ON-SITE", "CLOSED SOURCE"],
        barColor: "gray",
        barLabel: "FULLTIME",
        bullets: [
            "designed and built across two surfaces: the public site on Next.js 16, React 19 and TypeScript, and an in-house CRM, owning work from the database schema through the API layer to the interface. componentized the React codebase, centralized the design system and cleared out dead code",
            "drove the page-side Core Web Vitals work on the public site with ISR, React Server Components and first-window code splitting. CLS on the doctors route went from 0.85 to near zero, and the destinations route moved from 3.6s to 2.0s LCP with Lighthouse performance from 81 to 93",
            "cut first-window JavaScript by evicting axios from the critical path (57KB) and lazy loading the auth menu (26KB)",
            "built the in-house CRM from schema to UI: PostgreSQL tables, Express and Prisma REST endpoints, React screens, a hospital and doctor directory with full CRUD, presigned S3 uploads, Zod request validation and pagination, plus real-time dashboard components over Socket.IO and React Query",
            "designed the hospital document layouts in Figma and built the renderer behind them, generating PDFs on demand from live data with Puppeteer",
            "moved site assets to S3 behind a CDN and reworked the image pipeline around it. tightened the public API with response payload projection, Cache-Control headers and PostgreSQL indexes on hot query paths",
        ],
    },
    {
        type: "work",
        company: "Hammurabi AI",
        role: "Frontend Engineer",
        logo: "/icons/Hammurabi.svg",
        startDate: { month: 7, year: 2024 },
        endDate: { month: 3, year: 2026 },
        badges: ["FRONTEND ENGINEER", "REMOTE", "CLOSED SOURCE"],
        barColor: "gray",
        barLabel: "FULLTIME",
        bullets: [
            "sole frontend engineer on a TUBITAK-backed AI legal research and drafting platform. owned the whole UI, the design system, TR/EN localisation and the state architecture underneath it",
            "reverse-engineered UYAP's undocumented UDF format by decompressing the container and working out its XML formatting model, then built a web viewer that renders those documents in the browser with their formatting intact",
            "designed and built the real-time research interface. a custom client-side protocol handles 15+ SSE event types into the React Query cache, so a lawyer follows each reasoning and retrieval step with its citations instead of waiting on a spinner",
            "built the AI drafting flow on TipTap with custom extensions for section-by-section generation, version diffs and contextual mentions. in an internal survey, lawyers reported it cut their drafting time roughly in half",
            "shipped the frontend of the UYAP judiciary integration to production, where lawyers use it on the platform",
        ],
    },
    {
        type: "work",
        company: "Kleenestar LTD",
        role: "Frontend Engineer",
        logo: "/icons/Kleenestar.svg",
        startDate: { month: 5, year: 2024 },
        endDate: { month: 7, year: 2024 },
        badges: ["FRONTEND ENGINEER", "REMOTE", "CLOSED SOURCE"],
        barColor: "gray",
        barLabel: "CONTRACT",
        bullets: [
            "designed the full product in Figma and built it out in Next.js + Tailwind CSS",
            "led full JavaScript → TypeScript migration across the entire codebase",
            "configured React Query with smart cache invalidation, reducing redundant API calls by 30-40%",
            "built social media integrations, onboarding flows, and modular Recharts dashboards",
            "improved Lighthouse performance score from 70 → 95",
        ],
    },
    {
        type: "work",
        company: "Freelance (Upwork)",
        role: "Freelance Developer & Designer",
        logo: "/icons/Upwork.svg",
        startDate: { month: 1, year: 2024 },
        endDate: { month: 4, year: 2024 },
        badges: ["FREELANCE", "REMOTE"],
        barColor: "gray",
        barLabel: "FREELANCE",
        bullets: [
            "took on small freelance work while finishing the last semester of my b.tech. a small client list, plus one project i built on my own to learn from",
            "worked solo, so the design and the build were the same job. scoping what the client actually needed, drawing the screens in figma, then building and shipping the front end",
            "learned the parts of the work that are not code. writing the scope before starting, and getting a site reviewed, deployed and live",
        ],
    },
    {
        type: "milestone",
        company: "B.Tech in Computer Science",
        startDate: { month: 11, year: 2020 },
        endDate: { month: 5, year: 2024 },
        barColor: "green",
        barLabel: "Education",
    },
    {
        type: "milestone",
        company: "Higher Secondary",
        startDate: { month: 5, year: 2020 },
        endDate: { month: 5, year: 2020 },
        barColor: "green",
    },
    {
        type: "milestone",
        company: "High School",
        startDate: { month: 5, year: 2018 },
        endDate: { month: 5, year: 2018 },
        barColor: "green",
    },
];

export function dateToY(month: number, year: number): number {
    const totalMonths = (year - TIMELINE_START_YEAR) * 12 + (month - 1);
    const totalTimelineMonths = (TIMELINE_END_YEAR - TIMELINE_START_YEAR) * 12;
    return ((totalTimelineMonths - totalMonths) / 12) * YEAR_HEIGHT;
}

export function getBarHeight(start: { month: number; year: number }, end?: { month: number; year: number }): number {
    const endDate = end ?? { month: new Date().getMonth() + 1, year: new Date().getFullYear() };
    const months = (endDate.year - start.year) * 12 + (endDate.month - start.month);
    return Math.max(8, (months / 12) * YEAR_HEIGHT);
}

export function formatDate(d: { month: number; year: number }): string {
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    return `${months[d.month - 1]} ${d.year}`;
}
