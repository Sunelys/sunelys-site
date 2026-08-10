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
  redirects: {
    '/blog-actualites': '/blog',
    '/blog-actualites/raccordement-enedis-installation-solaire':
      '/blog/raccordement-enedis-photovoltaique-etapes-delais',
    '/blog-actualites/declaration-prealable-projet-solaire':
      '/declaration-prealable-panneaux-solaires',
    '/contactez-nous': '/contact',
    '/tarifs-1': '/tarifs',
    '/consuel': '/dossier-consuel-photovoltaique',
    '/raccordements': '/raccordement-enedis-photovoltaique',
    '/a-propos-de-nous': '/a-propos',
    '/feed': '/blog',
  },
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
