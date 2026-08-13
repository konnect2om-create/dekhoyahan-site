# DekhoYahan — Astro production foundation

## Why this stack

- Astro: static-first pages, strong SEO, minimal JavaScript
- React: only for interactive components
- React Three Fiber + Drei: browser-rendered 3D experiences
- GSAP: available for future scene choreography
- Cloudflare: static deployment from `dist`

## Local setup

```bash
npm install
npm run dev
```

Then open the local URL Astro prints.

## Production build

```bash
npm run build
```

The static site is generated into `dist/`.

## Cloudflare deployment

The repository can remain connected to Cloudflare.

Use:
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Root directory: `/`

`wrangler.jsonc` points Cloudflare Workers Static Assets at `./dist`.

## Current product scope

- Production header/footer
- Homepage
- Around You / Ahead of You discovery cards
- Clickable coming-soon modal
- About
- Privacy
- Terms
- 404
- React Three Fiber hero scene

The first real DekhoYahan experience should be implemented as a new isolated interactive component/page rather than expanding the homepage hero into a full lab.
