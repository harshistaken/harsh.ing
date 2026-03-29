import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { fragmentMono, jetbrainsMono, micro5, nerdFont } from "@/lib/fonts";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Harsh Yadav",
  description:
    "full-stack developer building web apps, real-time systems, and ai-powered products. next.js, react, typescript, and node.js. available for freelance and contract work.",
  metadataBase: new URL("https://haarsh.ing"),
  openGraph: {
    title: "Harsh Yadav",
    description:
      "full-stack developer building web apps, real-time systems, and ai-powered products. next.js, react, typescript, and node.js. available for freelance and contract work.",
    url: "https://haarsh.ing",
    siteName: "haarsh.ing",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harsh Yadav",
    description:
      "full-stack developer building web apps, real-time systems, and ai-powered products. next.js, react, typescript, and node.js. available for freelance and contract work.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://haarsh.ing" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fragmentMono.variable} ${jetbrainsMono.variable} ${micro5.variable} ${nerdFont.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
