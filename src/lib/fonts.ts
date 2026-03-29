import { Fragment_Mono, JetBrains_Mono, Micro_5 } from "next/font/google";
import localFont from "next/font/local";

export const fragmentMono = Fragment_Mono({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fragment",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const micro5 = Micro_5({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-micro",
});

export const nerdFont = localFont({
  src: "../fonts/jb-nerd.woff2",
  display: "swap",
  variable: "--font-nf",
});
