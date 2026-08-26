"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const VARIANTS = [
    {
        gray: "/banners/banner-dither-halftone.gif",
        color: "/banners/banner-color-fine.gif",
    },
    {
        gray: "/banners/banner-dither-darkdots.gif",
        color: "/banners/banner-color-chunky.gif",
    },
    {
        gray: "/banners/banner-dither-cross.gif",
        color: "/banners/banner-color-cross.gif",
    },
] as const;

export function HeroBanner() {
    const [active, setActive] = useState(0);
    const [revealed, setRevealed] = useState(false);
    const [tapped, setTapped] = useState(false);
    // The colour banner is 1.5MB and sits invisible under the grey one until
    // hover. Mounting it on load costs every visitor that download for
    // something most never reveal, and lazy does not help because it is
    // inside the viewport. Mount it the first time it is actually wanted.
    const [colorWanted, setColorWanted] = useState(false);
    // The grey layer must not fade until the colour image has actually decoded,
    // otherwise the reveal is an empty box while 1.5MB downloads.
    const [colorLoaded, setColorLoaded] = useState(false);

    // Warm the colour banner once the browser is idle. Keeps it off the
    // critical path but ready before most people reach for it.
    useEffect(() => {
        const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
        const start = () => setColorWanted(true);
        if (w.requestIdleCallback) {
            const id = w.requestIdleCallback(start);
            return () => (window as Window & { cancelIdleCallback?: (h: number) => void }).cancelIdleCallback?.(id);
        }
        const t = setTimeout(start, 2500);
        return () => clearTimeout(t);
    }, []);
    const bannerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!revealed) return;

        function handleTapOutside(e: PointerEvent) {
            if (bannerRef.current && !bannerRef.current.contains(e.target as Node)) {
                setRevealed(false);
            }
        }

        document.addEventListener("pointerdown", handleTapOutside);
        return () => document.removeEventListener("pointerdown", handleTapOutside);
    }, [revealed]);

    function handleBannerTap() {
        setColorWanted(true);
        setRevealed((prev) => !prev);
        setTapped(true);
    }

    return (
        <div
            ref={bannerRef}
            className="relative cursor-pointer overflow-hidden border border-border-strong h-[118px] md:h-[134px]"
            onPointerEnter={(e) => {
                setColorWanted(true);
                if (e.pointerType === "mouse") setRevealed(true);
            }}
            onPointerLeave={(e) => {
                if (e.pointerType === "mouse") setRevealed(false);
            }}
            onClick={handleBannerTap}
        >
            {colorWanted && (
                <Image src={VARIANTS[active].color} alt="" width={540} height={230} unoptimized loading="eager" onLoad={() => setColorLoaded(true)} className="block h-full w-full object-cover" />
            )}

            <Image
                src={VARIANTS[active].gray}
                alt=""
                width={540}
                height={230}
                unoptimized
                className={cn(
                    "absolute inset-0 block h-full w-full object-cover motion-safe:transition-opacity motion-safe:duration-700 motion-safe:ease-in-out",
                    revealed && colorLoaded ? "opacity-0" : "opacity-100",
                )}
            />

            {!tapped && !revealed && (
                <span className="pointer-events-none absolute bottom-2 left-2 font-space text-[10px] uppercase tracking-wider text-text-secondary md:hidden">tap to see color</span>
            )}

            <div className="absolute bottom-1 right-1 flex flex-col">
                {VARIANTS.map((_, i) => (
                    <button
                        key={i}
                        onClick={(e) => {
                            e.stopPropagation();
                            setActive(i);
                        }}
                        aria-label={`Banner variant ${i + 1}`}
                        className={cn(
                            "flex h-5 w-6 items-center justify-center font-jetbrains text-[10px] font-semibold leading-none motion-safe:transition-colors motion-safe:duration-700 motion-safe:ease-in-out",
                            active === i ? "text-accent-tertiary" : revealed ? "text-text-primary/80 hover:text-accent-tertiary" : "text-accent-primary hover:text-accent-tertiary",
                        )}
                    >
                        [{i + 1}]
                    </button>
                ))}
            </div>
        </div>
    );
}
