/** @type {import('next').NextConfig} */
const nextConfig = {
  optimizeCss: false,
  enableBabelRuntime: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakeimg.pl',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
    ],
  },
};

export default nextConfig;
