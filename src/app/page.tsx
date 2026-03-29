import { HeroBanner } from "@/components/sections/hero-banner";
import { HeroPlayer } from "@/components/sections/hero-player";

export default function Home() {
    return (
        <main className="mx-auto w-full max-w-2xl px-6">
            <section className="flex flex-col gap-2 pt-12">
                <HeroPlayer />
                <HeroBanner />
            </section>
        </main>
    );
}
