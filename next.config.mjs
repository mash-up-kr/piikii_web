/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["search.pstatic.net"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
};

export default nextConfig;
