/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  output: 'standalone',
  poweredByHeader: false,
  swcMinify: true,
  experimental: {
    // Desativar recursos experimentais que podem causar problemas
    serverComponentsExternalPackages: [],
  },
}

module.exports = nextConfig 