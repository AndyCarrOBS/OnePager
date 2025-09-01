/** @type {import('next').NextConfig} */
const nextConfig = {
  // Custom headers for admin routes
  async headers() {
    return [
      {
        source: '/admin/:path*',
        headers: [
          {
            key: 'X-Admin-Route',
            value: 'true',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
