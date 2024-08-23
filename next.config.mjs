/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["search.pstatic.net", "t1.daumcdn.net"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "kr.object.ncloudstorage.com",
      },
    ],
  },
};

export default nextConfig;
