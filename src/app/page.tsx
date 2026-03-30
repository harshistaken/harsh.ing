import { HeroBanner } from "@/components/sections/hero-banner";
import { HeroPlayer } from "@/components/sections/hero-player";
import { HeroIntro } from "@/components/sections/hero-intro";
import { HeroCta } from "@/components/sections/hero-cta";

export default function Home() {
    return (
        <main className="mx-auto flex w-full max-w-2xl flex-col gap-4 px-6 pt-12">
            <HeroPlayer />
            <HeroBanner />
            <HeroIntro />
            <HeroCta />
        </main>
    );
}
