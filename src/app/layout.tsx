import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { fragmentMono, jetbrainsMono, micro5, nerdFont } from "@/lib/fonts";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { ThemeKeys } from "@/components/layout/theme-keys";
import "./globals.css";

export const metadata: Metadata = {
    title: "Harsh Yadav",
    description: "Full-stack developer building web apps, real-time systems, and AI-powered products. Next.js, React, TypeScript, and Node.js. Available for freelance and contract work.",
    metadataBase: new URL("https://harsh.ing"),
    icons: {
        icon: "/favicon.ico",
        apple: "/apple-icon.png",
    },
    openGraph: {
        title: "Harsh Yadav",
        description: "Full-stack developer building web apps, real-time systems, and AI-powered products. Available for freelance and contract work.",
        url: "https://harsh.ing",
        siteName: "harsh.ing",
        locale: "en_US",
        type: "website",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Harsh Yadav - Full Stack Developer" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Harsh Yadav",
        description: "Full-stack developer building web apps, real-time systems, and AI-powered products. Available for freelance and contract work.",
        images: ["/og-image.png"],
    },
    robots: { index: true, follow: true },
    alternates: { canonical: "https://harsh.ing" },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Harsh Yadav",
    url: "https://harsh.ing",
    jobTitle: "Full-Stack Developer",
    worksFor: { "@type": "Organization", name: "Hammurabi AI" },
    address: { "@type": "PostalAddress", addressLocality: "Pune", addressCountry: "IN" },
    sameAs: [
        "https://github.com/harshistaken",
        "https://linkedin.com/in/harshistaken",
        "https://x.com/justharshbtw",
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${fragmentMono.variable} ${jetbrainsMono.variable} ${micro5.variable} ${nerdFont.variable}`} suppressHydrationWarning>
            <body className="flex min-h-screen flex-col" suppressHydrationWarning>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
                <ThemeProvider>
                    <a
                        href="#main"
                        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-60 focus:rounded focus:bg-accent-primary focus:px-3 focus:py-1.5 focus:font-fragment focus:text-sm focus:text-bg-primary"
                    >
                        skip → main
                    </a>
                    <Navbar />
                    <ThemeKeys />
                    <div id="main" className="flex-1">{children}</div>
                </ThemeProvider>
                <Analytics />
            </body>
        </html>
    );
}
