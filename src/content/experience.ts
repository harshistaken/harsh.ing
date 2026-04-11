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
            "sole frontend engineer; owned the complete UI for a TUBITAK-backed AI legal research and drafting platform serving 1,000+ users",
            "reverse-engineered UDF binary format with zero documentation and built a web-based viewer — replacing the government's desktop-only app with a browser-based alternative",
            "built TipTap-based legal document editor with custom extensions for section-by-section generation with version diffs, reducing lawyer drafting time by 50%",
            "integrated UYAP Turkish judiciary system. eliminated credential sharing across law firms and resolved a critical security vulnerability",
            "architected a real-time AI research interface with custom SSE streaming protocol handling 15+ concurrent event types, reducing research time by 40%",
            "built and maintained the full frontend platform: 94 custom hooks, 378 components, 8 Zustand stores, 12 Zod schemas, full TR/EN i18n, and performance optimizations (~30% load improvement)",
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
        bullets: [
            "shipped production websites for international clients. Full design, Next.js frontend, WordPress CMS integration, technical SEO",
            "handled everything from client scoping and Figma design to development and deployment",
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
