import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Muhammad Farhaan",
  description:
    "Product thinker and full-stack engineer. I take ideas from first sketch to production, and build security in rather than bolting it on.",
  metadataBase: new URL("https://muhammadfarhaan.dev"),
  openGraph: {
    title: "Muhammad Farhaan",
    description:
      "Product thinker and full-stack engineer. Ideation to product to scale, and open to building something with you.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={playfair.variable}>
      <head>
        {/* Erode, from Indian Type Foundry. Not available through next/font. */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=erode@400,500,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
