import Image from "next/image";
import { DitherImage } from "@/components/ui/dither-image";
import { BookCallButton } from "@/components/ui/book-call-button";

export function HeroIntro() {
    return (
        <div className="flex flex-col items-center gap-6 min-[560px]:flex-row min-[560px]:gap-6">
            {/* Avatar — interactive dithered particle canvas */}
            <div className="aspect-square w-full shrink-0 min-[560px]:h-[300px] min-[560px]:w-[300px]">
                <DitherImage
                    src="/avatar-suit.webp"
                    colorMode="source"
                    invert="auto"
                    threshold={185}
                    gridSize={235}
                    blur={1.3}
                    contrast={30}
                    gamma={1.0}
                    saturate={0.1}
                    lift={1.0}
                    className="block h-full w-full"
                />
            </div>

            {/* Text + CTA */}
            <div className="flex min-w-0 flex-1 flex-col justify-center gap-4">
                {/* The page had no h1. The visible intro is prose, so the heading is
                    given to assistive tech and search without disturbing the layout. */}
                <h1 className="sr-only">Harsh Yadav, design engineer</h1>
                <p className="font-space text-[16px] leading-normal text-text-secondary">
                    I&apos;m <span className="text-text-primary underline decoration-border-strong underline-offset-2">Harsh Yadav</span>. I design software, then write the code that ships it. Most
                    recently design and frontend at <span className="text-text-primary underline decoration-border-strong underline-offset-2">CureMeAbroad</span>. Before that, sole frontend engineer on
                    legal AI at{" "}
                    <span className="inline-flex items-center gap-1">
                        <Image src="/icons/Hammurabi.svg" alt="" width={28} height={14} className="inline-block h-2.5 w-auto" />
                        <span className="text-text-primary underline decoration-border-strong underline-offset-2">Hammurabi</span>
                    </span>
                    , where I still design the system today. Started out freelancing on{" "}
                    <span className="inline-flex items-center gap-1">
                        <Image src="/icons/Upwork.svg" alt="" width={14} height={14} className="inline-block size-4" />
                        <span className="text-text-primary underline decoration-border-strong underline-offset-2">Upwork</span>
                    </span>
                    .
                </p>

                <p className="font-space text-[16px] leading-normal text-text-secondary">
                    Based in <span className="text-text-primary underline decoration-border-strong underline-offset-2">Pune, India</span>. Open to{" "}
                    <span className="text-text-primary underline decoration-border-strong underline-offset-2">new opportunities</span>.
                </p>

                <div className="pt-1">
                    <BookCallButton />
                </div>
            </div>
        </div>
    );
}
