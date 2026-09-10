import { JetBrains_Mono, Share_Tech_Mono, Source_Sans_3, Syne } from "next/font/google";

/**
 * Self-hosted font definitions.
 *
 * `next/font` downloads and subsets these at build time and serves the
 * woff2 files from our own origin, so the browser never talks to
 * fonts.googleapis.com or fonts.gstatic.com at runtime. Font metrics are
 * inlined with an automatic size-adjusted fallback face, which keeps layout
 * shift (CLS) at or below the previous stylesheet-link setup.
 *
 * `font-display: swap` is applied by `next/font` by default — do not pass it
 * explicitly.
 */

/** Body/UI typeface. Weights mirror the four previously requested from Google. */
export const sourceSans = Source_Sans_3({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-source-sans",
  preload: true,
});

/** Monospace typeface for run IDs, logs and code. Three weights, as before. */
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
  preload: true,
});

/**
 * Display typeface for large headlines — the "Tally & Slate" vibe.
 * Harsh straight lines, structural cutouts, block styling.
 * Used at heavy weights for hero text and section headings.
 */
export const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
  preload: true,
});

/**
 * Digital counter typeface — looks like an old-school odometer readout.
 * Used for stat numbers and the scroll-triggered counting animation.
 */
export const shareTechMono = Share_Tech_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-share-tech-mono",
  preload: true,
});

/** Convenience: all font CSS variables, applied once on `<html>`. */
export const fontVariables = `${sourceSans.variable} ${jetbrainsMono.variable} ${syne.variable} ${shareTechMono.variable}`;
