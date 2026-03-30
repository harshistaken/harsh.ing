import { HeroBanner } from "@/components/sections/hero-banner";
import { HeroPlayer } from "@/components/sections/hero-player";
import { HeroIntro } from "@/components/sections/hero-intro";
import { HeroManifesto } from "@/components/sections/hero-manifesto";
import { Experience } from "@/components/sections/experience";
import { GitHubGraph } from "@/components/sections/github-graph";
import { Projects } from "@/components/sections/projects";

export default function Home() {
    return (
        <main className="mx-auto flex w-full max-w-2xl flex-col px-6 pt-12 pb-24">
            <HeroIntro />
            <div className="mt-12 flex flex-col gap-4">
                <HeroPlayer />
                <HeroBanner />
            </div>
            <div className="mt-8">
                <HeroManifesto />
            </div>
            <Experience />
            <GitHubGraph />
            <Projects />
        </main>
    );
}
