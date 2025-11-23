import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  transpilePackages: ['@juscash/design-system'],
  outputFileTracingRoot: path.join(__dirname, '../../'),
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@juscash/design-system': path.resolve(__dirname, '../../packages/ui'),
    };
    return config;
  },
};

export default nextConfig;


