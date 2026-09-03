/**
 * Who DekhoYahan is, in one place.
 *
 * These are the facts the site already states about itself in public — the
 * name in the header, the line in the footer, the LinkedIn address on the
 * Contact page. Nothing here is asserted that a visitor cannot also read.
 *
 * The `@id` values are permanent identifiers, not URLs to fetch. Schema
 * nodes across the site point at them so that the publisher of a story and
 * the owner of the site are understood to be the same organisation rather
 * than two that happen to share a name. Do not change them once published.
 */

export const SITE_URL = 'https://dekhoyahan.com';

export const SITE = {
  name: 'DekhoYahan',
  url: `${SITE_URL}/`,
  /** The line the footer carries on every page. */
  description: 'Make sense of the technology shaping everyday life.',
  locale: 'en_US',
  language: 'en',
  /**
   * Only profiles the site itself already links to publicly. The LinkedIn
   * company page is on /contact/; there is nothing else, and nothing else
   * belongs here until it is genuinely published somewhere on the site.
   */
  sameAs: ['https://www.linkedin.com/company/dekhoyahan/'],
} as const;

/** Stable identifiers for the site-wide schema nodes. */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
