import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'

import mdx from '@astrojs/mdx'
import yaml from '@rollup/plugin-yaml'

// https://astro.build/config
export default defineConfig({
  site: 'https://agutierrezr.github.io',
  vite: {
    plugins: [yaml()],
  },
  markdown: {
    shikiConfig: {
      theme: 'dracula',
      langs: [],
      wrap: false,
    },
  },
  experimental: {
    assets: true
  },
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    mdx(),
  ],
})
