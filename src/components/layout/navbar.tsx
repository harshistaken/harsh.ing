"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
    { href: "/work", label: "/WORK", enabled: true },
    { href: "/blogs", label: "/BLOGS", enabled: true },
    { href: "/about", label: "/ABOUT", enabled: true },
] as const;

export function Navbar() {
    const pathname = usePathname();
    const isHome = pathname === "/";

    return (
        <nav className="sticky top-0 z-50 w-full backdrop-blur-lg backdrop-saturate-180">
            <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-2">
                <Link href="/" className="group">
                    <span className={cn("font-micro text-[40px] leading-none transition-colors duration-200", isHome ? "text-accent-primary" : "text-text-primary group-hover:text-accent-primary")}>
                        <span className="hidden min-[360px]:inline">HARSH</span>
                        <span className="inline min-[360px]:hidden">H</span>
                    </span>
                </Link>

                <div className="flex items-center gap-6">
                    {NAV_LINKS.map((link) => {
                        const isActive = pathname === link.href;

                        if (!link.enabled) {
                            return (
                                <span key={link.href} className="cursor-default font-jetbrains text-[14px] font-medium uppercase leading-none text-text-muted">
                                    {link.label}
                                </span>
                            );
                        }

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "font-jetbrains text-[14px] font-medium uppercase leading-none transition-colors duration-200",
                                    isActive ? "text-accent-primary" : "text-text-secondary hover:text-text-primary",
                                )}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
