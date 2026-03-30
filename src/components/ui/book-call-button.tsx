"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

const CAL_URL = "https://cal.com/harshistaken";
const TARGET_TEXT = "BOOK A MEETING";
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*!?<>{}[]";

export function BookCallButton() {
    const [hovered, setHovered] = useState(false);
    const [displayText, setDisplayText] = useState(TARGET_TEXT);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const scramble = useCallback(() => {
        let iteration = 0;

        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setDisplayText(
                TARGET_TEXT
                    .split("")
                    .map((char, i) => {
                        if (char === " ") return " ";
                        if (i < iteration) return TARGET_TEXT[i];
                        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
                    })
                    .join("")
            );

            iteration += 1 / 2;

            if (iteration > TARGET_TEXT.length) {
                if (intervalRef.current) clearInterval(intervalRef.current);
                setDisplayText(TARGET_TEXT);
            }
        }, 30);
    }, []);

    const unscramble = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(TARGET_TEXT);
    }, []);

    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    return (
        <a
            href={CAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 overflow-hidden border border-accent-primary px-5 py-3 font-jetbrains text-[13px] uppercase tracking-wide text-accent-primary outline-none focus-visible:text-bg-primary"
            onPointerEnter={(e) => {
                if (e.pointerType === "mouse") {
                    setHovered(true);
                    scramble();
                }
            }}
            onPointerLeave={(e) => {
                if (e.pointerType === "mouse") {
                    setHovered(false);
                    unscramble();
                }
            }}
            onClick={() => {
                setHovered(true);
                scramble();
            }}
        >
            <span
                className="absolute inset-0 origin-left bg-accent-primary motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out"
                style={{ transform: hovered ? "scaleX(1)" : "scaleX(0)" }}
            />
            <span className={cn(
                "relative motion-safe:transition-colors motion-safe:duration-500",
                hovered ? "text-bg-primary" : "text-accent-primary"
            )}>{displayText}</span>
            <span className={cn(
                "relative motion-safe:transition-all motion-safe:duration-300",
                hovered ? "translate-x-1 text-bg-primary" : "translate-x-0 text-accent-primary"
            )}>→</span>
        </a>
    );
}
