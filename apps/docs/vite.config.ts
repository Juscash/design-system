import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// Usar src durante o dev para HMR; em build, resolver via pacote (dist/exports)
export default defineConfig(({ command }) => ({
  plugins: [react()],
  resolve: {
    alias:
      command === 'serve'
        ? {
            '@design-system/components': resolve(__dirname, '../../packages/components/src'),
            '@ds': resolve(__dirname, '../../packages/components/src'),
          }
        : {
            // Em build, resolvemos para o pacote (que aponta para dist via exports)
            '@design-system/components': resolve(__dirname, '../../packages/components'),
          },
  },
  server: {
    port: 3000,
    open: true,
  },
}));
