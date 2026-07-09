import type { Metadata } from "next";
import { Josefin_Sans, Spline_Sans_Mono } from "next/font/google";
import "./globals.css";

/* Faces per design/tokens.md §2.1: Josefin Sans 600 only, Spline Sans Mono
   400 + 500. The variables feed the @theme inline wiring in globals.css. */
const josefin = Josefin_Sans({
  weight: "600",
  subsets: ["latin"],
  variable: "--font-josefin",
  display: "swap",
});

const splineMono = Spline_Sans_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-spline-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Muhammad Farhaan",
  // DRAFT copy, pending Lefler.
  description:
    "AI-native full-stack engineer. Research and MVP builds behind funded ventures in the UAE; builder of the open-source Unified Product Graph.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${josefin.variable} ${splineMono.variable} antialiased`}>
      <body className="min-h-screen">
        {/* Erode via Fontshare CDN, hoisted to <head> by React 19.
            PRODUCTION TODO: self-host woff2 via next/font/local (tokens.md §2.1). */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          precedence="default"
          href="https://api.fontshare.com/v2/css?f[]=erode@400,500&display=swap"
        />
        {children}
      </body>
    </html>
  );
}
