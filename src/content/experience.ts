export interface ExperienceEntry {
    type: "work" | "milestone";
    company: string;
    role?: string;
    logo?: string;
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
        role: "Frontend Engineer",
        logo: "/icons/Hammurabi.svg",
        startDate: { month: 9, year: 2024 },
        badges: ["FRONTEND ENGINEER", "REMOTE", "CLOSED SOURCE"],
        active: true,
        barColor: "accent",
        bullets: [
            "sole frontend engineer on a 15-person team — owned the entire UI layer for a legal AI SaaS serving 22K+ users",
            "reverse-engineered UDF binary format with zero documentation — built the only public UDF viewer on the internet",
            "built ProseMirror-based legal document editor with smart templates, custom commands, and collaborative editing — 50% reduction in drafting time",
            "integrated UYAP Turkish judiciary system — eliminated credential sharing across law firms, resolved a critical security vulnerability",
            "implemented transparent AI tool-calling UX — step-by-step execution visualization for non-technical lawyers",
            "30% performance improvement via SSR, Next.js server actions, React Query caching layers, and WebSocket optimization",
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
        bullets: [
            "designed the product end-to-end in Figma, then implemented pixel-perfect UI with Next.js and TailwindCSS",
            "led full JavaScript → TypeScript migration across the entire codebase",
            "implemented React Query deduplication and smart invalidation — 30% reduction in redundant API calls",
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
        bullets: [
            "shipped production websites for international agencies — CMS integrations, WordPress builds, frontend revamps",
            "end-to-end delivery: client scoping, Figma design, development, SEO optimization, deployment",
            "debugged and refactored legacy codebases, resolved cross-browser issues, improved Core Web Vitals",
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
