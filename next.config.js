/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    runtime: 'experimental-edge',
  },
  reactStrictMode: true,
  experimental: {
    appDir: true,
  }
};

module.exports = nextConfig;
