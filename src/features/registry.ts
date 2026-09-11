/**
 * Features — the interactive stories DekhoYahan tells.
 *
 * A Feature is one self-contained experience: one component that owns its
 * markup, copy, scenes, animation, accessibility behaviour and replay. This
 * file is the only place that knows which Features exist and what each one
 * says about itself to search engines, answer engines and people sharing
 * the link.
 *
 * To add a Feature:
 *   1. build it as a component under src/components/features/;
 *   2. add an entry below with its slug, headline, description and the
 *      short editorial answer fields.
 * It gets its permanent page at /<slug>/ and its Explore card automatically.
 *
 * `featuredSlug` only orders this list for the Explore library (the
 * Feature it names leads; see `featuresByProminence`) — it no longer
 * decides what the homepage hero renders. That is `featuredHeroComponent`
 * below, deliberately independent of this array: the homepage hero can be
 * a story whose permanent, canonical, indexed address lives elsewhere (see
 * AI Stack, whose permanent story is /explore/ai-stack/, not a /<slug>/
 * route here) without that story ever entering `features[]` or gaining a
 * second, duplicate permanent route. Every entry that *is* in `features[]`
 * still keeps its own /<slug>/ route regardless of homepage status, so an
 * address that has been shared once keeps working after the homepage
 * moves on.
 */

import type { ImageMetadata } from 'astro';
import ZeroTrustFeature from '../components/features/ZeroTrustFeature.astro';
import AiStackFeature from '../components/features/AiStackFeature.astro';
import securityDome from '../assets/security-dome.png';
import { ORGANIZATION_ID, SITE, SITE_URL } from '../config/site';

export type Feature = {
  /** The story's permanent address: /<slug>/ */
  slug: string;
  /**
   * The story's own sentence. Rendered as the page's <h1> and used to
   * build the <title>, so it is written once and never restated.
   */
  headline: string;
  /** Meta and social description for the story's own page. */
  description: string;
  /**
   * The question the story answers, in the words someone would actually
   * ask it. Rendered as the <h2> of the page's short reference note.
   */
  question: string;
  /** A few sentences answering that question plainly, in prose. */
  shortAnswer: string;
  /** The one line worth carrying away. */
  keyTakeaway: string;
  /**
   * The picture the story is known by. One source image serves both the
   * 1200x630 share card and the 720x480 Explore card — the crops are
   * generated, so there is nothing to keep in sync.
   */
  socialImage: { src: ImageMetadata; alt: string };
  /** ISO date the story first went live. */
  publishedAt: string;
  /** ISO date it last changed in a way a reader would notice. */
  updatedAt: string;
  /** The component that renders the experience itself. */
  Component: typeof ZeroTrustFeature;
};

export const features: Feature[] = [
  {
    slug: 'zero-trust',
    headline: 'Zero Trust is older than Zero Trust.',
    description:
      'See how security moved from broad network boundaries toward decisions about each access request — and why Zero Trust was an evolution before it became a name.',
    question: 'What actually changed when security became Zero Trust?',
    shortAnswer:
      'Zero Trust didn’t replace the boundaries that protected company networks. It changed what being inside those boundaries was allowed to mean. As people, apps and data moved beyond one company network, access increasingly had to depend on the person, device and resource involved — not simply where the request came from.',
    keyTakeaway: 'The boundary still matters. Being inside it is no longer enough.',
    socialImage: {
      src: securityDome,
      alt: 'The open internet on the left, a firewall in the middle, and a company network under a protective dome on the right.',
    },
    publishedAt: '2026-09-02',
    updatedAt: '2026-09-02',
    Component: ZeroTrustFeature,
  },
];

/** Orders `featuresByProminence` below; no longer what selects the homepage hero. */
export const featuredSlug = 'zero-trust';

/**
 * The component the homepage hero currently renders. Set independently of
 * `features[]` and `featuredSlug` on purpose: swapping this one line is
 * the entire homepage handover, and it never requires the story to join
 * `features[]` or receive a /<slug>/ route here — AI Stack's own permanent,
 * canonical, sitemapped address is /explore/ai-stack/ (see
 * src/data/stories.ts and src/pages/explore/ai-stack.astro), and stays
 * that way regardless of what the homepage is currently showing.
 */
export const featuredHeroComponent = AiStackFeature;

/** The canonical URL of a Feature's own page. */
export const canonicalUrl = (feature: Feature) => `${SITE_URL}/${feature.slug}/`;

/** The full <title>. Built from the headline so the sentence lives in one place. */
export const pageTitle = (feature: Feature) => `${feature.headline} | ${SITE.name}`;

export const getFeature = (slug: string) => features.find((feature) => feature.slug === slug);

/**
 * A Feature described as structured data.
 *
 * Every claim below has a counterpart a visitor can read: the name is the
 * question the page asks in its own <h2>, the abstract is the answer printed
 * under it, and what it teaches is the line the page closes on. Nothing is
 * asserted that is not on the page, and the publisher is named by reference
 * so the site says who it is exactly once.
 */
export const featureLearningResource = (feature: Feature, imageUrl: string) => ({
  '@type': 'LearningResource',
  '@id': `${canonicalUrl(feature)}#learning-resource`,
  name: feature.question,
  url: canonicalUrl(feature),
  abstract: feature.shortAnswer,
  teaches: feature.keyTakeaway,
  learningResourceType: 'interactive explainer',
  inLanguage: SITE.language,
  isAccessibleForFree: true,
  datePublished: feature.publishedAt,
  dateModified: feature.updatedAt,
  image: imageUrl,
  publisher: { '@id': ORGANIZATION_ID },
});

/**
 * Every Feature, with the one currently on the homepage first. Explore
 * lists them in this order, so the featured story leads the library and
 * the ones before it stay discoverable underneath.
 */
export const featuresByProminence = (): Feature[] => [
  ...features.filter((feature) => feature.slug === featuredSlug),
  ...features.filter((feature) => feature.slug !== featuredSlug),
];

const featured = getFeature(featuredSlug);

if (!featured) {
  throw new Error(`featuredSlug "${featuredSlug}" does not match any Feature in the registry.`);
}

export const featuredFeature: Feature = featured;
