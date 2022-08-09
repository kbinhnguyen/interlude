/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      dns: false,
      net: false,
      tls: false,
      'pg-native': false,
    };
    return config;
  },
};

module.exports = nextConfig;
