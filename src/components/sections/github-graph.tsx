import { GitHubGraphClient } from "./github-graph-client";
import { GITHUB_USERNAME } from "@/config/links";

interface ContributionDay {
    date: string;
    count: number;
    level: number;
}

interface YearData {
    total: number;
    contributions: ContributionDay[];
}

async function fetchContributions(username: string, year: number): Promise<YearData | null> {
    try {
        const res = await fetch(
            `https://github-contributions-api.jogruber.de/v4/${username}?y=${year}`,
            { next: { revalidate: 3600 } },
        );
        if (!res.ok) return null;
        const data = await res.json();
        return {
            total: data.total[String(year)] ?? 0,
            contributions: data.contributions,
        };
    } catch {
        return null;
    }
}

export async function GitHubGraph() {
    const username = GITHUB_USERNAME;

    // Server component, so this clock read is safe: no hydration surface, and the
    // 1h revalidate on the fetch below re-runs it on every regeneration.
    // One candidate more than we display, because on Jan 1 the newest year is an
    // all-zero grid and gets dropped just below — without the spare the tab strip
    // would silently shrink from three years to two.
    const YEARS_SHOWN = 3;
    const currentYear = new Date().getFullYear();
    const candidateYears = Array.from({ length: YEARS_SHOWN + 1 }, (_, i) => currentYear - i);

    const results = await Promise.all(
        candidateYears.map(async (year) => ({
            year,
            data: await fetchContributions(username, year),
        })),
    );

    // jogruber.de answers HTTP 200 with a full year of zeros for a year that has not
    // happened yet (verified: ?y=2027 returns {"total":{"2027":0}} plus 365 empty days),
    // so a successful fetch is not evidence the year is real. Drop any year with no
    // contributions — otherwise on Jan 1 the empty new year sorts first and becomes
    // the default tab, reading "0 CONTRIBUTIONS IN 2027".
    const shown = results
        .filter((r): r is { year: number; data: YearData } => r.data !== null && r.data.total > 0)
        .slice(0, YEARS_SHOWN);

    // Built from `shown`, not from every result: when the spare candidate does have
    // contributions it must not be serialised into the client payload (~15KB of JSON
    // per year) for a tab that can never be selected.
    const yearData: Record<number, YearData> = {};
    for (const { year, data } of shown) {
        yearData[year] = data;
    }

    const availableYears = shown.map(({ year }) => year);

    if (availableYears.length === 0) {
        return (
            <section className="mt-24">
                <h2 className="font-micro text-[40px] leading-none text-text-primary">GITHUB</h2>
                <p className="mt-4 font-space text-[14px] text-text-tertiary">
                    Could not load contributions.
                </p>
            </section>
        );
    }

    return <GitHubGraphClient yearData={yearData} availableYears={availableYears} />;
}
