/**
 * Features — the interactive stories DekhoYahan tells.
 *
 * A Feature is one self-contained experience: one component that owns its
 * markup, copy, scenes, animation, accessibility behaviour and replay. This
 * file is the only place that knows which Features exist and which one the
 * homepage is currently showing.
 *
 * To add a Feature:
 *   1. build it as a component under src/components/features/;
 *   2. add an entry below with its slug, title and description.
 * It gets its permanent page at /<slug>/ automatically.
 *
 * To change what the homepage shows:
 *   3. point `featuredSlug` at the new entry.
 * Nothing else moves. Every Feature keeps its own route whether or not it
 * is the one on the homepage, so an address that has been shared once keeps
 * working after the homepage moves on.
 */

import ZeroTrustFeature from '../components/features/ZeroTrustFeature.astro';

export type Feature = {
  /** The story's permanent address: /<slug>/ */
  slug: string;
  /** Full <title> for the story's own page. */
  title: string;
  /** Meta and social description for the story's own page. */
  description: string;
  /** The component that renders the experience itself. */
  Component: typeof ZeroTrustFeature;
};

const SITE = 'https://dekhoyahan.com';

export const features: Feature[] = [
  {
    slug: 'zero-trust',
    title: 'Zero Trust is older than Zero Trust. | DekhoYahan',
    description:
      'See how security moved from broad network boundaries toward decisions about each access request — and why Zero Trust was an evolution before it became a name.',
    Component: ZeroTrustFeature,
  },
];

/** The Feature the homepage is currently showing. */
export const featuredSlug = 'zero-trust';

/** The canonical URL of a Feature's own page. */
export const canonicalUrl = (feature: Feature) => `${SITE}/${feature.slug}/`;

export const getFeature = (slug: string) => features.find((feature) => feature.slug === slug);

const featured = getFeature(featuredSlug);

if (!featured) {
  throw new Error(`featuredSlug "${featuredSlug}" does not match any Feature in the registry.`);
}

export const featuredFeature: Feature = featured;
