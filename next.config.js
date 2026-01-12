/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tambahkan output mode sesuai kebutuhan
  output: 'standalone', // atau 'export' jika full static
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        // Lebih fleksibel untuk semua path
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
    ],
    // Optional: optimize untuk Cloudflare
    formats: ['image/avif', 'image/webp'],
  },
  
  // Pindahkan dari experimental ke sini (sesuai warning)
  serverExternalPackages: [],
  
  // Untuk menghindari error pada Cloudflare
  typescript: {
    ignoreBuildErrors: false, // set true jika ada error typescript
  },
  eslint: {
    ignoreDuringBuilds: false, // set true jika ada warning eslint
  },
  
  // Optional: Kompresi untuk Cloudflare Pages
  compress: true,
  
  // Optional: Mengaktifkan React strict mode (rekomendasi untuk production)
  reactStrictMode: true,
};

// Jika menggunakan Turbopack untuk development (sesuai build command)
if (process.env.NODE_ENV === 'development') {
  console.log('Development mode: Turbopack enabled');
}

module.exports = nextConfig;