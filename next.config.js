/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['botinterior.s3.eu-north-1.amazonaws.com', 'replicate.delivery'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'botinterior.s3.eu-north-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
