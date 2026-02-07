// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/t/p/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
      // PERBAIKAN DI SINI:
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',  // ← tempat.com bukan tempat.co
        pathname: '/**',
      }
    ],
  },
}

module.exports = nextConfig