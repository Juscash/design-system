import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@design-system/components': resolve(__dirname, '../../packages/components/src'),
      '@ds': resolve(__dirname, '../../packages/components/src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});

