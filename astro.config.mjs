// @ts-check
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

const cacheDir = process.env.VITE_CACHE_DIR ?? join(tmpdir(), 'sunelys-site-vite-cache');

// https://astro.build/config
export default defineConfig({
  site: 'https://sunelys.fr',
  adapter: vercel(),
  security: {
    checkOrigin: false,
  },
  vite: {
    cacheDir,
    server: {
      watch: {
        ignored: ['**/._*'],
      },
    },
  },
});
