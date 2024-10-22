// https://nuxt.com/docs/api/configuration/nuxt-config
import { vite as vidstack } from 'vidstack/plugins';

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
  ],
  i18n: {
    langDir: 'locales',
    locales: [
      { code: 'en', file: 'en.json' },
      { code: 'tr', file: 'tr.json' },
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
  },
  vite: {
    plugins: [vidstack()],
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith('media-'),
    },
  },
  build: {
    transpile: ['vidstack', 'sqlite3'],
  },
  nitro: {
    externals: {
      inline: ['knex', 'sqlite3'],
    }
  },
});