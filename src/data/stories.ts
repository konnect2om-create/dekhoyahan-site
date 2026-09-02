// The single list of published stories.
//
// Both surfaces read from here: the homepage renders the entries marked
// `featured` (in this order) as its four discovery cards, and /explore/
// renders every entry as the library. A story is listed once — appearing on
// the homepage does not create a second entry, and nothing is duplicated
// between the two pages.
//
// Array order is the display order: featured first, matching the homepage,
// then the Explore-only stories.
//
// `title` and `line` are the two halves of the same sentence pair. The
// homepage sets them on one label with a break between; the library sets
// them as a heading and its supporting line. Keeping them as two fields is
// what lets one entry serve both without either page restating the copy.
//
// Not listed here: `ai-agent-permissions`. It still builds and its route
// still resolves (see /explore/[slug].astro), but it is the only story left
// on the older generic template, so it is held out of the library until it
// is either rebuilt or retired.

export type Story = {
  /** Route is always `/explore/${slug}/`. */
  slug: string;
  /** First half of the card's sentence pair. */
  title: string;
  /** Second half — the question or the line under it. */
  line: string;
  /** 720x480 WebP under /images/thumbs/. */
  thumb: string;
  /** Featured stories are the homepage's four cards. */
  featured: boolean;
};

export const stories: Story[] = [
  {
    slug: 'looks-real-is-it',
    title: 'Looks real.',
    line: 'Is it?',
    thumb: '/images/thumbs/street1-card.webp',
    featured: true,
  },
  {
    slug: 'ai-answered-you',
    title: 'AI answered you.',
    line: 'How did it know what to say?',
    thumb: '/images/thumbs/card2-card.webp',
    featured: true,
  },
  {
    slug: 'did-your-face-leave-the-phone',
    title: 'Your face unlocked it.',
    line: 'Did your face leave the phone?',
    thumb: '/images/thumbs/card3-card.webp',
    featured: true,
  },
  {
    slug: 'who-said-yes',
    title: 'You tapped. Approved.',
    line: 'Who said yes?',
    thumb: '/images/thumbs/card4-card.webp',
    featured: true,
  },
  {
    slug: 'how-your-photo-travels',
    title: 'Where does your photo actually go?',
    line: "You press send. Seconds later, it's somewhere else.",
    thumb: '/images/thumbs/photo-card.webp',
    featured: false,
  },
  {
    slug: 'where-is-the-5g',
    title: 'Your phone says 5G. Where is the 5G?',
    line: 'You see it every day. But where is it?',
    thumb: '/images/thumbs/5g-card.webp',
    featured: false,
  },
  {
    slug: 'ai-agents-what-changed',
    title: 'You gave it one instruction.',
    line: 'Why did it keep going?',
    thumb: '/images/thumbs/ai-agent-card.webp',
    featured: false,
  },
];

/** The homepage's four cards, in homepage order. */
export const featuredStories = stories.filter((story) => story.featured);
