// The single list of published stories, and the single description of what
// each one is.
//
// Three surfaces read from here: the homepage renders the entries marked
// `featured` (in this order) as its four discovery cards, /explore/ renders
// every entry as the library, and each story's own page reads its title,
// description and share picture from its entry rather than declaring them in
// the page source. A story is listed once — appearing on the homepage does
// not create a second entry, and nothing is duplicated between the surfaces.
//
// Array order is the display order: featured first, matching the homepage,
// then the Explore-only stories.
//
// `cardTitle` and `cardTeaser` are the two halves of the same sentence pair.
// The homepage sets them on one label with a break between; the library sets
// them as a heading and its supporting line. Keeping them as two fields is
// what lets one entry serve both without either page restating the copy.
//
// `headline` is the page's own editorial framing, which is what the <title>
// is built from — for most stories that is the card's two halves read as one
// sentence, which is exactly what those titles have always said.
//
// `question`, `shortAnswer` and `keyTakeaway` are the approved canonical
// meaning of each story: the plain question it answers, the understanding it
// delivers, and the line worth carrying away. They describe the existing
// experience — every one of them is supported by copy already on the page —
// and none of them is rendered as visible page content. `description` is the
// search and share description, distinct from the curiosity-driven teaser.
//
// `publishedAt` is the date each story went live. `updatedAt` is deliberately
// absent for all seven: none of them has a modification date we can vouch
// for, and a guessed one is worse than none.
//
// Not listed here: `ai-agent-permissions`. It still builds and its route
// still resolves (see /explore/[slug].astro), but it is the only story left
// on the older generic template, so it is held out of the library until it
// is either rebuilt or retired. It has no entry here and therefore takes
// none of this metadata.

import type { ImageMetadata } from 'astro';
import { SITE, SITE_URL } from '../config/site';

// The share pictures are the stories' own Scene 1 artwork, imported so that
// Astro's pipeline can produce the 1200x630 card from them at build time.
// Five are the exact files the stories themselves already display from
// /images/, imported rather than copied so there is one file on disk, not two
// that can drift apart. `laptop1` is the AI Agents story's own imported
// asset. `aiAnsweredShare` is the one exception — see its entry below.
import street1 from '../../public/images/Street1.webp';
import card3 from '../../public/images/Card3.webp';
import card4 from '../../public/images/Card4.webp';
import photoSend1 from '../../public/images/PhotoSend1.webp';
import fiveG from '../../public/images/5G.webp';
import laptop1 from '../assets/laptop1.png';
import aiAnsweredShare from '../assets/social/ai-answered-you-share.webp';

export type Story = {
  /** Route is always `/explore/${slug}/`. */
  slug: string;
  /** First half of the card's sentence pair. */
  cardTitle: string;
  /** Second half — the question or the line under it. */
  cardTeaser: string;
  /** The page's editorial framing; the <title> is built from this. */
  headline: string;
  /** The plain-language question the experience answers. */
  question: string;
  /** The understanding the story delivers, in one to three sentences. */
  shortAnswer: string;
  /** The one line worth carrying away — the reframe. */
  keyTakeaway: string;
  /** Search and share description. Not the teaser, and not the shortAnswer. */
  description: string;
  /** The date the story went live. */
  publishedAt: string;
  /** Only ever set when there is a modification date we can vouch for. */
  updatedAt?: string;
  /** Source for the 1200x630 share card. */
  image: { src: ImageMetadata; alt: string };
  /** 720x480 WebP under /images/thumbs/. */
  thumb: string;
  /** Featured stories are the homepage's four cards. */
  featured: boolean;
};

export const stories: Story[] = [
  {
    slug: 'looks-real-is-it',
    cardTitle: 'Looks real.',
    cardTeaser: 'Is it?',
    headline: 'Looks real. Is it?',
    question: 'How can you tell where a picture came from?',
    shortAnswer:
      "You can't tell just by looking at it. Some pictures can carry a record of where they came from, what tools touched them, and what changed along the way. A digital seal can help show if that record was altered — but it proves the history, not whether the picture itself is true.",
    keyTakeaway: 'It can help prove the history. Not the truth.',
    description:
      "A photo can look completely ordinary and tell you nothing about where it came from. See what provenance and Content Credentials actually record — and what a verified seal can and can't prove.",
    publishedAt: '2026-08-23',
    image: {
      src: street1,
      alt: 'Three people at an outdoor café table, mid-conversation.',
    },
    thumb: '/images/thumbs/street1-card.webp',
    featured: true,
  },
  {
    slug: 'ai-answered-you',
    cardTitle: 'AI answered you.',
    cardTeaser: 'How did it know what to say?',
    headline: 'AI answered you. How did it know what to say?',
    question: 'How does AI know what to say?',
    shortAnswer:
      "It doesn't look up a finished answer. It builds one piece at a time, using patterns learned from huge amounts of text to work out what is likely to come next. Each piece becomes part of what it uses to choose the next one.",
    keyTakeaway: "It didn't pull that answer from a page. It built it, piece by piece.",
    description:
      "It answered in seconds, but it didn't find the answer anywhere. See how a reply gets built one predicted piece at a time — and what training actually left behind.",
    publishedAt: '2026-08-23',
    image: {
      // The one story whose picture cannot become a share card by cropping:
      // the phone runs almost the full height of Card2.webp, so a 1200x630
      // centre crop cuts its frame at the top and bottom. This is that same
      // photograph, whole, resting on the site's own cream — the composition
      // the crop cannot produce, since Astro's pipeline can scale and crop
      // but cannot pad. Nothing added, nothing redrawn, no text. Stored as
      // lossless WebP: bit-for-bit the same picture as a PNG of it, at less
      // than half the weight in the repository.
      src: aiAnsweredShare,
      alt: "A person holding a phone, reading an AI assistant's reply to the question 'Why do we dream?' — the answer already on screen.",
    },
    thumb: '/images/thumbs/card2-card.webp',
    featured: true,
  },
  {
    slug: 'did-your-face-leave-the-phone',
    cardTitle: 'Your face unlocked it.',
    cardTeaser: 'Did your face leave the phone?',
    headline: 'Your face unlocked it. Did your face leave the phone?',
    question: 'When your face unlocks your phone, does your face go anywhere?',
    shortAnswer:
      'For face unlock, your phone can turn details it measures into a mathematical representation instead of keeping a little photo for matching. That representation can stay inside protected hardware on the device, while an app receives only the result of the comparison. Other facial-recognition systems can work very differently.',
    keyTakeaway:
      "Don't just ask whether something uses your face. Ask what happens to the data made from it.",
    description:
      "Face unlock doesn't have to send your face away. See what your phone can actually keep, where it can stay, and why unlocking someone and identifying someone are different jobs.",
    publishedAt: '2026-08-23',
    image: {
      src: card3,
      alt: "A person holding up a phone that has just recognised them — their face framed on screen above the word 'Unlocked'.",
    },
    thumb: '/images/thumbs/card3-card.webp',
    featured: true,
  },
  {
    slug: 'who-said-yes',
    cardTitle: 'You tapped. Approved.',
    cardTeaser: 'Who said yes?',
    headline: 'You tapped. Approved. Who said yes?',
    question: 'When a contactless payment is approved, who actually approved it?',
    shortAnswer:
      'Usually, not the terminal. It sends the request through the payment system to the bank behind your card — the issuer — which checks the card, account, payment and its own risk signals, then sends the answer back. All of that happens between your tap and the word Approved.',
    keyTakeaway: 'The terminal asked. The issuer decided. The answer came back.',
    description:
      "A tap, then Approved — but the terminal wasn't what said yes. Follow the request out to your bank and back, and see what gets checked on the way.",
    publishedAt: '2026-08-24',
    image: {
      src: card4,
      alt: 'A hand holding a phone to a card terminal on a café counter, the terminal already showing APPROVED.',
    },
    thumb: '/images/thumbs/card4-card.webp',
    featured: true,
  },
  {
    slug: 'how-your-photo-travels',
    cardTitle: 'Where does your photo actually go?',
    cardTeaser: "You press send. Seconds later, it's somewhere else.",
    headline: 'Where does your photo actually go?',
    question: 'Where does your photo actually go when you send it?',
    shortAnswer:
      "It stops being a photo and becomes data. That data usually reaches the service you're using before it reaches the person you sent it to, and after the first wireless hop it travels mostly through physical networks — often fibre, and sometimes cables across the ocean floor. There isn't one road: the network finds a way.",
    keyTakeaway: "You choose where it's going. You don't choose every road.",
    description:
      "Press send and it feels wireless. See where a photo's data actually goes — to a service first, then through fibre, and when it crosses continents, along cables on the ocean floor.",
    publishedAt: '2026-08-15',
    image: {
      src: photoSend1,
      alt: "Two phones far apart. The photo is open on the sender's phone at the left, ready to send. The recipient's phone toward the right is smaller and its screen still shows an empty placeholder.",
    },
    thumb: '/images/thumbs/photo-card.webp',
    featured: false,
  },
  {
    slug: 'where-is-the-5g',
    cardTitle: 'Your phone says 5G. Where is the 5G?',
    cardTeaser: 'You see it every day. But where is it?',
    headline: 'Your phone says 5G. Where is the 5G?',
    question: "Where is the 5G your phone says it's using?",
    shortAnswer:
      "5G is the wireless connection between your phone and nearby equipment in the mobile network. That's the first step, not the whole journey. From there, your connection travels through physical networks — often fibre — deeper into the mobile network and on to whatever you're trying to reach.",
    keyTakeaway: "5G gets you into the network. It isn't the whole journey.",
    description:
      'Your phone says 5G — but where is it? Follow the connection from the phone in your hand to the nearby cell site, into fibre, and on through the mobile network.',
    publishedAt: '2026-08-22',
    image: {
      src: fiveG,
      alt: "Close-up of a phone's status bar showing a 5G indicator, full signal bars and the battery icon.",
    },
    thumb: '/images/thumbs/5g-card.webp',
    featured: false,
  },
  {
    slug: 'ai-agents-what-changed',
    cardTitle: 'You gave it one instruction.',
    cardTeaser: 'Why did it keep going?',
    headline: 'You gave it one instruction. Why did it keep going?',
    question: 'Why does an AI agent keep going after one instruction?',
    shortAnswer:
      "You gave it a goal, not every step. An agent can work toward that goal by choosing what to do next, changing course when something doesn't work, and continuing without waiting for each instruction. It can still stop and ask you when a decision needs your approval.",
    keyTakeaway: 'The goal stayed the same. What changed is who — or what — does the work.',
    description:
      "One instruction, and it kept going. See how an AI agent works toward a goal, changes course when something doesn't work, and still stops when it needs your approval.",
    publishedAt: '2026-09-02',
    image: {
      src: laptop1,
      alt: 'A laptop open on a desk beside a passport, a notebook and a coffee — the trip it was asked to plan not yet begun.',
    },
    thumb: '/images/thumbs/ai-agent-card.webp',
    featured: false,
  },
];

/** The homepage's four cards, in homepage order. */
export const featuredStories = stories.filter((story) => story.featured);

/** The published story at a slug, or undefined — `ai-agent-permissions` has no entry. */
export const storyBySlug = (slug: string): Story | undefined =>
  stories.find((story) => story.slug === slug);

/** The page title, built from the headline so it stays one sentence, not two fields. */
export const storyTitle = (story: Story) => `${story.headline} — ${SITE.name}`;

/** The permanent address, apex domain, trailing slash — the same one the page is canonical at. */
export const storyCanonical = (story: Story) => `${SITE_URL}/explore/${story.slug}/`;
