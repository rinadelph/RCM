/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... other configurations
  env: {
    DATABASE_URL: "file:./dev.db",
  },
  async rewrites() {
    return [
      {
        source: '/analytics-api/:path*',
        destination: 'https://analyticsdata.googleapis.com/:path*',
      },
    ];
  },
}

module.exports = nextConfig