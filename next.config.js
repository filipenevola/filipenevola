/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'standalone',
  cacheComponents: true,
  partialPrefetching: true,
};

module.exports = nextConfig;
