/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@design-system/components'],
  // Next.js 15+ já suporta ESM nativamente
  compiler: {
    // Habilita suporte ao Emotion se usar styled-components
    emotion: true,
  },
};

module.exports = nextConfig;

