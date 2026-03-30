"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { experience, formatDate, type ExperienceEntry } from "@/content/experience";

const ease = [0.16, 1, 0.3, 1] as const;

const BAR_CONFIG: Record<string, { color: string; label: string }> = {
    "Hammurabi AI": { color: "bg-accent-primary", label: "FULLTIME" },
    "Kleenestar LTD": { color: "bg-text-muted/40", label: "CONTRACT" },
    "Freelance (Upwork)": { color: "bg-text-muted/40", label: "FREELANCE" },
};

/* ─── Year label ─── */
function YearTick({ text }: { text: string }) {
    return (
        <div className="flex w-full items-center gap-1">
            <span className="shrink-0 font-jetbrains text-[8px] leading-none text-text-muted">
                {text}
            </span>
            <div className="h-px flex-1 bg-border-subtle" />
        </div>
    );
}

/* ─── Sidebar Bar with year markers ─── */
function SideBar({
    color,
    label,
    active,
    startDate,
    endDate,
}: {
    color: string;
    label: string;
    active?: boolean;
    startDate: { month: number; year: number };
    endDate?: { month: number; year: number };
}) {
    const endLabel = active ? "NOW" : `${endDate?.year ?? ""}`;
    const startLabel = `${startDate.year}`;

    return (
        <div className="hidden w-12 shrink-0 min-[560px]:flex min-[560px]:flex-col min-[560px]:items-end min-[560px]:gap-0">
            {/* End date tick (top) — for active, this is "NOW" */}
            <YearTick text={endLabel} />

            {/* The bar itself */}
            <div className={`relative w-7 flex-1 self-end ${color}`}>
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap font-jetbrains text-[7px] font-semibold uppercase tracking-[0.15em] text-text-primary/50">
                    {label}
                </span>
            </div>

            {/* Start date tick (bottom) */}
            <YearTick text={startLabel} />
        </div>
    );
}

/* ─── Work Card ─── */
function WorkCard({ entry, index }: { entry: ExperienceEntry; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-40px" });
    const isHammurabi = entry.logo?.includes("Hammurabi");

    return (
        <motion.div
            ref={ref}
            className="min-w-0 flex-1 border border-border-default bg-bg-secondary p-5"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1, ease }}
            whileHover={{ borderColor: "var(--accent-primary)", transition: { duration: 0.2 } }}
        >
            {/* Row 1: Logo + Company name | Date */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    {entry.logo && (
                        <Image
                            src={entry.logo}
                            alt=""
                            width={44}
                            height={22}
                            className={isHammurabi ? "h-[14px] w-auto" : "h-[20px] w-auto"}
                        />
                    )}
                    <span className="font-micro text-[24px] leading-none text-text-primary">
                        {entry.company.toUpperCase()}
                    </span>
                </div>
                <span className="shrink-0 font-jetbrains text-[10px] uppercase tracking-wide text-text-tertiary">
                    {formatDate(entry.startDate)} — {entry.endDate ? formatDate(entry.endDate) : "PRESENT"}
                </span>
            </div>

            {/* Row 2: Badges */}
            {entry.badges && entry.badges.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                    {entry.badges.map((badge) => {
                        const isClosedSource = badge.toLowerCase() === "closed source";
                        const isOpenSource = badge.toLowerCase() === "open source";
                        const badgeClass = isClosedSource
                            ? "bg-status-error/10 text-status-error"
                            : isOpenSource
                              ? "bg-accent-tertiary/10 text-accent-tertiary"
                              : "bg-bg-tertiary text-text-secondary";
                        return (
                            <span
                                key={badge}
                                className={`px-2 py-0.5 font-jetbrains text-[10px] uppercase tracking-wide ${badgeClass}`}
                            >
                                {badge}
                            </span>
                        );
                    })}
                </div>
            )}

            {/* Row 3: Bullets */}
            {entry.bullets && entry.bullets.length > 0 && (
                <ul className="mt-6 flex flex-col gap-2">
                    {entry.bullets.map((bullet, i) => (
                        <li key={i} className="flex gap-2 font-fragment text-[11px] leading-[1.6] text-text-secondary">
                            <span className={`mt-1 shrink-0 ${entry.active ? "text-accent-primary" : "text-text-muted"}`}>▪</span>
                            <span>{bullet}</span>
                        </li>
                    ))}
                </ul>
            )}
        </motion.div>
    );
}

/* ─── Milestone Marker ─── */
function MilestoneMarker({ entry, index }: { entry: ExperienceEntry; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-30px" });

    return (
        <motion.div
            ref={ref}
            className="flex items-center gap-2 py-1"
            initial={{ opacity: 0, x: 12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: index * 0.1, ease }}
        >
            <span className="h-2 w-2 shrink-0 bg-accent-tertiary" />
            <span className="font-fragment text-[11px] uppercase tracking-wide text-text-muted">{entry.company}</span>
            <span className="font-jetbrains text-[10px] text-text-muted">
                {entry.startDate.year}{entry.endDate && entry.endDate.year !== entry.startDate.year ? `–${entry.endDate.year}` : ""}
            </span>
        </motion.div>
    );
}

/* ─── Experience Section ─── */
export function Experience() {
    const workEntries = experience.filter((e) => e.type === "work");
    const milestones = experience.filter((e) => e.type === "milestone");
    const eduStart = milestones.length > 0
        ? milestones.reduce((min, e) => (e.startDate.year < min.year ? e.startDate : min), milestones[0].startDate)
        : { month: 1, year: 2018 };
    const eduEnd = milestones.length > 0
        ? milestones.reduce((max, e) => {
            const end = e.endDate ?? e.startDate;
            return end.year > max.year ? end : max;
        }, milestones[0].endDate ?? milestones[0].startDate)
        : { month: 1, year: 2024 };

    return (
        <section className="mt-24">
            <h2 className="font-micro text-[40px] leading-none text-text-primary">EXPERIENCE</h2>

            <div className="mt-10 flex flex-col gap-3">
                {/* Work entries — each with sidebar bar + year ticks */}
                {workEntries.map((entry, i) => {
                    const config = BAR_CONFIG[entry.company] ?? { color: "bg-text-muted/40", label: "" };
                    return (
                        <div key={entry.company} className="flex gap-3">
                            <SideBar
                                color={config.color}
                                label={config.label}
                                active={entry.active}
                                startDate={entry.startDate}
                                endDate={entry.endDate}
                            />
                            <WorkCard entry={entry} index={i} />
                        </div>
                    );
                })}

                {/* Education milestones — with green sidebar + year ticks */}
                <div className="flex gap-3">
                    <div className="hidden w-12 shrink-0 min-[560px]:flex min-[560px]:flex-col min-[560px]:items-end min-[560px]:gap-0">
                        <YearTick text={`${eduEnd.year}`} />
                        <div
                            className="relative w-7 flex-1 self-end bg-accent-tertiary"
                            style={{
                                backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.10) 2px, rgba(0,0,0,0.10) 4px)",
                            }}
                        >
                            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap font-jetbrains text-[7px] font-semibold uppercase tracking-[0.15em] text-text-primary/50">
                                EDUCATION
                            </span>
                        </div>
                        <YearTick text={`${eduStart.year}`} />
                    </div>
                    <div className="flex flex-1 flex-col gap-1 py-2">
                        {milestones.map((entry, i) => (
                            <MilestoneMarker key={entry.company} entry={entry} index={workEntries.length + i} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
