// The one place a published story's page metadata is assembled.
//
// Every story page calls storyPageMeta() with its own slug and passes the
// result straight to BaseLayout, so the title, the description and the share
// card all come from that story's entry in stories.ts rather than from the
// page source. Changing a description is a one-line edit in the manifest; no
// page has a second copy of it to fall out of step.
//
// Canonical is deliberately not returned here. BaseLayout already defaults it
// to the URL the page was built at, which is correct for every story, and
// leaving that alone is what guarantees these addresses do not move.

import { getImage } from 'astro:assets';
import type { SchemaNode } from '../components/SchemaJsonLd.astro';
import { ORGANIZATION_ID, SITE } from '../config/site';
import { storyBySlug, storyCanonical, storyTitle, type Story } from './stories';

// The share card, generated from each story's own Scene 1 picture rather than
// a second file kept in step by hand — the same transform the Zero Trust
// Feature uses. A centre crop: the artwork sits well inside the 1200x630
// window in every case (the one picture that did not is composed to this size
// before it gets here — see the ai-answered-you entry in stories.ts). JPEG
// because two of the sources carry transparency and several platforms
// composite that onto black; flattening onto the site's own cream avoids it,
// and keeps the file an order of magnitude smaller than PNG.
export const SHARE_CARD = {
  width: 1200,
  height: 630,
  fit: 'cover',
  position: 'center',
  background: '#f8f5ef',
  format: 'jpeg',
  quality: 82,
} as const;

/**
 * The story's own node in the page's schema graph.
 *
 * A plain mapping of the canonical meaning already stored in stories.ts: the
 * question is the resource's name, the short answer its abstract, the key
 * takeaway what it teaches. Nothing here is authored a second time, and no
 * page hand-writes JSON — SchemaJsonLd serialises whatever it is handed.
 *
 * `dateModified` is present only when a story actually carries an
 * `updatedAt`. None of the seven does today, so none of them emits the field;
 * the moment an intentional date is added to an entry, that story starts
 * emitting it and no other story is affected. It is never substituted from
 * publishedAt, git, the build clock or a file's mtime — a date we cannot
 * vouch for is worse than no date.
 *
 * Deliberately not routed through the Feature registry's own
 * featureLearningResource(): that helper emits `dateModified` unconditionally,
 * which is exactly the behaviour a story must not have. The two describe
 * different things and are free to diverge.
 */
export const storyLearningResource = (story: Story, imageUrl: string): SchemaNode => ({
  '@type': 'LearningResource',
  '@id': `${storyCanonical(story)}#learning-resource`,
  name: story.question,
  url: storyCanonical(story),
  abstract: story.shortAnswer,
  teaches: story.keyTakeaway,
  learningResourceType: 'interactive explainer',
  inLanguage: SITE.language,
  isAccessibleForFree: true,
  datePublished: story.publishedAt,
  ...(story.updatedAt ? { dateModified: story.updatedAt } : {}),
  image: imageUrl,
  publisher: { '@id': ORGANIZATION_ID },
});

export type StoryPageMeta = {
  story: Story;
  title: string;
  description: string;
  image: { src: string; alt: string; width: number; height: number };
  /** This page's own schema nodes, ready for BaseLayout. */
  schema: SchemaNode[];
};

export async function storyPageMeta(
  slug: string,
  site: URL | undefined
): Promise<StoryPageMeta | undefined> {
  const story = storyBySlug(slug);
  if (!story) return undefined;

  const share = await getImage({ src: story.image.src, ...SHARE_CARD });
  const imageUrl = new URL(share.src, site).href;

  return {
    story,
    title: storyTitle(story),
    description: story.description,
    image: {
      src: imageUrl,
      alt: story.image.alt,
      width: SHARE_CARD.width,
      height: SHARE_CARD.height,
    },
    // The same absolute URL the page shares, so the picture a person sees in
    // a shared link and the one a machine reads are the same file.
    schema: [storyLearningResource(story, imageUrl)],
  };
}
