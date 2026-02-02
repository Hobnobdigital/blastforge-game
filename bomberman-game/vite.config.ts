import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@core': resolve(__dirname, 'src/core'),
      '@systems': resolve(__dirname, 'src/systems'),
      '@entities': resolve(__dirname, 'src/entities'),
      '@input': resolve(__dirname, 'src/input'),
      '@audio': resolve(__dirname, 'src/audio'),
      '@rendering': resolve(__dirname, 'src/rendering'),
      '@ui': resolve(__dirname, 'src/ui'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@themes': resolve(__dirname, 'src/themes'),
    },
  },
  build: {
    target: 'ES2022',
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
