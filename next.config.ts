import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pixiv.re",
      },
      {
        protocol: "https",
        hostname: "hanabri.oss-cn-beijing.aliyuncs.com",
      },
      {
        protocol: "https",
        hostname: "img.hongyoubizhi.com",
      }
    ],
  },
};

export default nextConfig;
