"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function HeroIntro() {
    const [revealed, setRevealed] = useState(false);

    return (
        <div className="flex flex-col items-center gap-6 min-[560px]:flex-row min-[560px]:items-start min-[560px]:gap-6">
            {/* Avatar — always 200x200, never shrinks */}
            <div
                className="relative h-[200px] w-[200px] shrink-0 cursor-pointer overflow-hidden border border-border-default max-[559px]:h-auto max-[559px]:w-full"
                onPointerEnter={(e) => {
                    if (e.pointerType === "mouse") setRevealed(true);
                }}
                onPointerLeave={(e) => {
                    if (e.pointerType === "mouse") setRevealed(false);
                }}
                onClick={() => setRevealed((prev) => !prev)}
            >
                <Image src="/avatars/avatar-neon.png" alt="" width={640} height={640} className="block h-full w-full object-cover" />
                <Image
                    src="/avatars/avatar-orange.png"
                    alt="harsh yadav — dithered portrait"
                    width={640}
                    height={640}
                    className={cn(
                        "absolute inset-0 block h-full w-full object-cover motion-safe:transition-opacity motion-safe:duration-700 motion-safe:ease-in-out",
                        revealed ? "opacity-0" : "opacity-100",
                    )}
                />
            </div>

            {/* Text — wraps and folds, triggers column switch when too narrow */}
            <div className="flex min-w-0 flex-1 flex-col justify-start gap-4">
                <p className="font-fragment text-[14px] leading-[1.7] tracking-normal text-text-secondary">
                    i&apos;m <span className="text-text-primary underline decoration-border-strong underline-offset-2">Harsh Yadav</span>. i design and build things for the web, full-stack, start to
                    ship. currently building legal ai tools at{" "}
                    <span className="inline-flex items-baseline gap-1.5">
                        <Image src="/logos/hammurabi.svg" alt="" width={16} height={16} className="relative top-[2px] inline-block h-auto w-4" />
                        <span className="text-text-primary underline decoration-border-strong underline-offset-2">Hammurabi</span>
                    </span>
                    . before that, freelancing and shipping fast on{" "}
                    <span className="inline-flex items-baseline gap-1.5">
                        <Image src="/logos/upwork.svg" alt="" width={16} height={16} className="relative top-[2px] inline-block h-auto w-4" />
                        <span className="text-text-primary underline decoration-border-strong underline-offset-2">Upwork</span>
                    </span>
                    .
                </p>

                <p className="font-fragment text-[14px] leading-[1.7] tracking-normal text-text-secondary">
                    based in <span className="text-text-primary underline decoration-border-strong underline-offset-2">Pune, India</span>. open for{" "}
                    <span className="text-text-primary underline decoration-border-strong underline-offset-2">freelance/contract work</span>.
                </p>

            </div>
        </div>
    );
}
