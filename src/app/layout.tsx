import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { spaceGrotesk, jetbrainsMono, micro5 } from "@/lib/fonts";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { ThemeKeys } from "@/components/layout/theme-keys";
import { ThemePicker } from "@/components/ui/theme-picker";
import { SITE } from "@/config/site";
import "./globals.css";

export const metadata: Metadata = {
    title: SITE.title,
    description: SITE.description,
    metadataBase: new URL(SITE.url),
    applicationName: SITE.name,
    authors: [{ name: SITE.name, url: SITE.url }],
    creator: SITE.name,
    icons: {
        icon: [
            { url: "/favicon.ico", sizes: "any" },
            { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
            { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
        ],
        apple: "/apple-icon.png",
    },
    openGraph: {
        title: SITE.title,
        description: SITE.descriptionShort,
        url: SITE.url,
        siteName: SITE.domain,
        locale: SITE.locale,
        type: "website",
        images: [{ url: "/og.png", width: 1200, height: 630, alt: `${SITE.name}, ${SITE.jobTitle}` }],
    },
    twitter: {
        card: "summary_large_image",
        title: SITE.title,
        description: SITE.descriptionShort,
        images: ["/og.png"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    alternates: { canonical: SITE.url },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    url: SITE.url,
    jobTitle: SITE.jobTitle,
    worksFor: { "@type": "Organization", name: SITE.employer },
    address: { "@type": "PostalAddress", addressLocality: SITE.location.city, addressCountry: SITE.location.country },
    sameAs: SITE.sameAs,
    description: SITE.descriptionShort,
    image: `${SITE.url}/og.png`,
    knowsAbout: [
        "Design systems",
        "Product design",
        "Frontend engineering",
        "React",
        "Next.js",
        "TypeScript",
        "Web performance",
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${micro5.variable}`} suppressHydrationWarning>
            <body className="flex min-h-screen flex-col" suppressHydrationWarning>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
                <ThemeProvider>
                    <a
                        href="#main"
                        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-60 focus:rounded focus:bg-accent-primary focus:px-3 focus:py-1.5 focus:font-space focus:text-[14px] focus:text-bg-primary"
                    >
                        skip → main
                    </a>
                    <Navbar />
                    <ThemeKeys />
                    <div id="main" className="flex-1">{children}</div>
                    <ThemePicker />
                </ThemeProvider>
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
