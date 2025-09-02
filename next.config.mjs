// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 👉 Static export (generates /out)
  output: 'export',

  // Safer for static hosts; each route ends with a slash.
  trailingSlash: true,

  // Your existing settings
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true }, // required for next/image in static export
};

export default nextConfig;
