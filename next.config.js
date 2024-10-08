/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  reactStrictMode: false,
  transpilePackages: ['@mui/x-charts'],
  images: {
    domains: [
      'encrypted-tbn0.gstatic.com',
      'media-cdn.tripadvisor.com',
      'dynamic-media-cdn.tripadvisor.com',
      'avatars.mds.yandex.net',
    ],
  },
}

module.exports = nextConfig
