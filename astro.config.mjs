import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Pages that build and resolve but should not be submitted for indexing.
// Everything else Astro builds is public content and is listed automatically,
// so publishing a Feature or an Explore story needs no sitemap edit.
const NOT_INDEXABLE = [
  // The error page. Never a canonical destination.
  '/404',
  // Live and reachable, but deliberately held out of the Explore library
  // until it is rebuilt or retired (see src/data/stories.ts). The sitemap
  // says what the site says.
  '/explore/ai-agent-permissions/',
];

export default defineConfig({
  site: 'https://dekhoyahan.com',
  output: 'static',
  integrations: [
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname;
        return !NOT_INDEXABLE.includes(path);
      },
    }),
  ],
});
