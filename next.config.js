/** @type {import("next").NextConfig} */
const nextConfig = {
  output: "export", // `npm run build` creates a static site in the `out/` folder
  images: { unoptimized: true },
};
module.exports = nextConfig;
