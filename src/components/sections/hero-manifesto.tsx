"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const SCRAMBLE_CHARS = "abcdefghijklmnopqrstuvwxyz@#$%&*!?";

const SLOTS = {
    rotating_1: {
        words: ["edge cases", "weird bugs", "missing docs", "broken APIs", "late-night deploys", "undocumented formats"],
        interval: 2500,
        offset: 0,
    },
    rotating_2: {
        words: ["impossible deadlines", "legacy codebases", "real-time sync issues", "websocket edge cases", "production fires", "pixel-perfect details"],
        interval: 3000,
        offset: 800,
    },
    rotating_3: {
        words: ["shipping", "debugging", "reverse-engineering", "architecting", "obsessing", "caffeinating"],
        interval: 3500,
        offset: 1500,
    },
} as const;

function useScrambleSlot(words: readonly string[], interval: number, offset: number) {
    const [, setIndex] = useState(0);
    const [display, setDisplay] = useState(words[0]);
    const scrambleRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const scrambleTo = useCallback((target: string) => {
        let iteration = 0;
        if (scrambleRef.current) clearInterval(scrambleRef.current);

        scrambleRef.current = setInterval(() => {
            setDisplay(
                target
                    .split("")
                    .map((char, i) => {
                        if (char === " ") return " ";
                        if (i < iteration) return target[i];
                        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
                    })
                    .join(""),
            );

            iteration += 0.5;

            if (iteration > target.length) {
                if (scrambleRef.current) clearInterval(scrambleRef.current);
                setDisplay(target);
            }
        }, 25);
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const tick = setInterval(() => {
                setIndex((prev) => {
                    const next = (prev + 1) % words.length;
                    scrambleTo(words[next]);
                    return next;
                });
            }, interval);

            return () => clearInterval(tick);
        }, offset);

        return () => {
            clearTimeout(timeout);
            if (scrambleRef.current) clearInterval(scrambleRef.current);
        };
    }, [words, interval, offset, scrambleTo]);

    return display;
}

export function HeroManifesto() {
    const slot1 = useScrambleSlot(SLOTS.rotating_1.words, SLOTS.rotating_1.interval, SLOTS.rotating_1.offset);
    const slot2 = useScrambleSlot(SLOTS.rotating_2.words, SLOTS.rotating_2.interval, SLOTS.rotating_2.offset);
    const slot3 = useScrambleSlot(SLOTS.rotating_3.words, SLOTS.rotating_3.interval, SLOTS.rotating_3.offset);

    return (
        <p className="font-fragment text-[14px] leading-[1.7] tracking-normal text-text-secondary">
            i care about the things most people skip. the <span className="text-accent-primary">{slot1}</span>, the <span className="text-accent-primary">{slot2}</span>, the parts of a codebase nobody
            wants to touch. i&apos;m currently <span className="text-accent-primary">{slot3}</span> my way through building things that matter.
        </p>
    );
}
