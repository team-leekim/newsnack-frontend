import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'team-leekim-assets.s3.ap-northeast-2.amazonaws.com',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
