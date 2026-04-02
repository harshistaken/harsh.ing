"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
    { href: "/work", label: "/WORK" },
    { href: "/blogs", label: "/BLOGS" },
    { href: "/about", label: "/ABOUT" },
] as const;

export function Navbar() {
    const pathname = usePathname();
    const isHome = pathname === "/";

    return (
        <nav className="sticky top-0 z-50 w-full bg-bg-primary/80 backdrop-blur-lg backdrop-saturate-180">
            <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-2">
                <Link href="/" className="group outline-none focus-visible:text-accent-primary">
                    <span className={cn("font-micro text-[40px] leading-none transition-colors duration-200", isHome ? "text-accent-primary" : "text-text-primary group-hover:text-accent-primary")}>
                        <span className="hidden min-[360px]:inline">HARSH</span>
                        <span className="inline min-[360px]:hidden">H</span>
                    </span>
                </Link>

                <div className="flex items-center gap-6">
                    {NAV_LINKS.map((link) => {
                        const isActive = pathname === link.href;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                aria-current={isActive ? "page" : undefined}
                                className={cn(
                                    "font-jetbrains text-[12px] font-medium uppercase leading-none outline-none transition-colors duration-200 focus-visible:text-accent-primary",
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
