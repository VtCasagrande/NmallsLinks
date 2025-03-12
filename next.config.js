/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true,
    domains: ['localhost'],
  },
  output: 'standalone',
  poweredByHeader: false,
  swcMinify: false,
}

module.exports = nextConfig 