/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
  experimental: {
    serverComponentsExternalPackages: ['stellar-sdk']
  }
};

module.exports = nextConfig;