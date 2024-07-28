import { defineConfig } from 'vitest/config';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [svgr()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest-setup.ts'],
  },
});
