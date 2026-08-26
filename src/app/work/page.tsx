import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Work",
    robots: { index: false, follow: true },
};

export default function Work() {
    return (
        <main className="flex min-h-[calc(100vh-56px)] items-center justify-center px-6">
            <h1 className="font-jetbrains text-[14px] font-medium uppercase tracking-widest text-text-secondary">
                COMING SOON
            </h1>
        </main>
    );
}
