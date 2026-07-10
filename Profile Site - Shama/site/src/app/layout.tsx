import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

/* Faces per design/tokens.md §2.1-2.3: Fraunces variable (wght axis plus
   opsz auto; SOFT and WONK deliberately not loaded, pinning their defaults
   of 0), IBM Plex Mono 400 + 500, and Playfair Display 500 italic ONLY —
   the roman is never loaded, so a stray font-quote heading falls to the
   Georgia fallback and fails review on sight (the register lock is
   structural). The variables feed the @theme inline wiring in globals.css. */
const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-plex-mono",
  display: "swap",
});

const playfair = Playfair_Display({
  weight: "500",
  style: "italic",
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shama Anjum",
  // PLACEHOLDER description, pending intake and Lefler. Never deployable.
  description: "Profile site prototype. Content placeholder, pending intake.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${plexMono.variable} ${playfair.variable} antialiased`}
    >
      <body className="min-h-screen">
        {/* Sentient via Fontshare CDN, hoisted to <head> by React 19
            (tokens.md §2.1, Erode precedent on Farhaan's site).
            PRODUCTION TODO: self-host woff2 via next/font/local. */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          precedence="default"
          href="https://api.fontshare.com/v2/css?f[]=sentient@400,500&display=swap"
        />
        {children}
      </body>
    </html>
  );
}
