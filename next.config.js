/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: process.env.NODE_ENV === 'production' ? '/v2' : '',
  output: 'export',
  images: {
    unoptimized: true,
  },
  distDir: 'dist',
}

module.exports = nextConfig