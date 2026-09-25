import { defineConfig } from 'astro/config'

import mdx from '@astrojs/mdx'
import icon from 'astro-icon'
import yaml from '@rollup/plugin-yaml'

// https://astro.build/config
export default defineConfig({
  site: 'https://agutierrezr.github.io',
  // v7 defaults to 'jsx' whitespace handling; keep the previous HTML-aware
  // compression so inline elements keep their separating spaces
  compressHTML: true,
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
  integrations: [icon(), mdx()],
})
