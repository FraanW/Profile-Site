import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Deployed as a Render Static Site: `next build` writes plain HTML to `out/`.
  output: "export",
  // Emit `projects/index.html` rather than `projects.html`, so a static host
  // serves `/projects/` without rewrite rules.
  trailingSlash: true,
  // No image server on a static host. The images are small local PNGs, and
  // the pixel-art portrait should not be re-encoded anyway.
  images: { unoptimized: true },
};

export default nextConfig;
