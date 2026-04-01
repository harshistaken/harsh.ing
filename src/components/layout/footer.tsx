"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { GithubIcon, Linkedin01Icon, NewTwitterIcon, Mail01Icon, Sun03Icon, Moon02Icon } from "@hugeicons/core-free-icons";
import { FooterRunner } from "@/components/sections/footer-runner";

const socials = [
    { icon: GithubIcon, href: "https://github.com/harshistaken", label: "GitHub" },
    { icon: Linkedin01Icon, href: "https://linkedin.com/in/harshistaken", label: "LinkedIn" },
    { icon: NewTwitterIcon, href: "https://x.com/justharshbtw", label: "X" },
];

function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => setMounted(true), []);

    if (!mounted) return <div className="h-8 w-8" />;

    const isDark = resolvedTheme === "dark";

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="flex h-8 w-8 cursor-pointer items-center justify-center border border-white/20 text-white/50 transition-colors duration-200 hover:text-white"
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        >
            <HugeiconsIcon icon={isDark ? Sun03Icon : Moon02Icon} size={14} />
        </button>
    );
}

export function Footer() {
    return (
        <footer className="mt-24">
            {/* Runner game */}
            <FooterRunner />

            {/* Accent block — negative margin to cancel parent px-6 */}
            <div className="-mx-6 mt-6 bg-accent-primary px-6 pt-8 pb-6 min-[480px]:px-8 min-[480px]:pt-10">
                {/* GET IN TOUCH */}
                <p className="font-jetbrains text-xs font-semibold uppercase tracking-widest text-white/80">get in touch</p>

                <p className="mt-3 max-w-md font-fragment text-sm leading-relaxed text-white/60">
                    whether you need a developer, a design partner, or someone to ship your next project, I&apos;m open to the right collaboration.
                </p>

                {/* Contact links */}
                <div className="mt-5 flex flex-wrap items-center gap-2">
                    <a
                        href="mailto:harshyadav.build@gmail.com"
                        className="flex items-center gap-2 border border-white/30 bg-white/10 px-4 py-2 font-fragment text-xs text-white transition-colors duration-200 hover:bg-white/20"
                    >
                        <HugeiconsIcon icon={Mail01Icon} size={14} />
                        Email ↗
                    </a>
                    {socials.map((s) => (
                        <a
                            key={s.label}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={s.label}
                            className="flex h-9 w-9 items-center justify-center border border-white/20 text-white/60 transition-colors duration-200 hover:bg-white/10 hover:text-white"
                        >
                            <HugeiconsIcon icon={s.icon} size={14} />
                        </a>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="mt-10 flex items-center justify-between">
                    <span className="font-fragment text-[11px] text-white/40">© 2026 harsh. all rights reserved.</span>
                    <ThemeToggle />
                </div>

                {/* Big HARSH text — fills container width */}
                <div className="mt-4 overflow-hidden">
                    <p className="w-full select-none font-micro leading-none text-bg-primary" style={{ fontSize: "min(22vw, 160px)" }}>
                        HARSH
                    </p>
                </div>
            </div>
        </footer>
    );
}
