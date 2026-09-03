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
import { storyBySlug, storyTitle, type Story } from './stories';

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

export type StoryPageMeta = {
  story: Story;
  title: string;
  description: string;
  image: { src: string; alt: string; width: number; height: number };
};

export async function storyPageMeta(
  slug: string,
  site: URL | undefined
): Promise<StoryPageMeta | undefined> {
  const story = storyBySlug(slug);
  if (!story) return undefined;

  const share = await getImage({ src: story.image.src, ...SHARE_CARD });

  return {
    story,
    title: storyTitle(story),
    description: story.description,
    image: {
      src: new URL(share.src, site).href,
      alt: story.image.alt,
      width: SHARE_CARD.width,
      height: SHARE_CARD.height,
    },
  };
}
