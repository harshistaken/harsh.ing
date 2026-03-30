import { HeroBanner } from "@/components/sections/hero-banner";
import { HeroPlayer } from "@/components/sections/hero-player";
import { HeroIntro } from "@/components/sections/hero-intro";

export default function Home() {
    return (
        <main className="mx-auto flex w-full max-w-2xl flex-col px-6 pt-12">
            <HeroIntro />
            <div className="mt-12 flex flex-col gap-4">
                <HeroPlayer />
                <HeroBanner />
            </div>
        </main>
    );
}
