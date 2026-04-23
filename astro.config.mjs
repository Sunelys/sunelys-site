// @ts-check
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { defineConfig } from 'astro/config';

const cacheDir = process.env.VITE_CACHE_DIR ?? join(tmpdir(), 'sunelys-site-vite-cache');

// https://astro.build/config
export default defineConfig({
  site: 'https://sunelys.fr',
  vite: {
    cacheDir,
    server: {
      watch: {
        ignored: ['**/._*'],
      },
    },
  },
});
