import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const topics = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/topics' }),
  schema: z.object({
    title: z.string(),
    // "See It" — the familiar, everyday moment the topic starts from.
    hook: z.string(),
    category: z.enum([
      'identity-security',
      'networks',
      'ai-agents',
      'money-payments',
      'everyday-tech',
    ]),
    difficulty: z.enum(['starter', 'intermediate', 'advanced']),
    summary: z.string(),
    heroImage: z.string().optional(),
    // "Reveal It" — the layers a reader peels back, in order.
    layers: z
      .array(
        z.object({
          question: z.string(),
          title: z.string(),
          description: z.string(),
          symbol: z.string().optional(),
        }),
      )
      .default([]),
    // "Control It" — a small decision that makes the concept felt, not just read.
    decision: z
      .object({
        prompt: z.string(),
        options: z.array(
          z.object({
            label: z.string(),
            outcome: z.string(),
            isRecommended: z.boolean().optional(),
          }),
        ),
      })
      .optional(),
    // Presence of `featured` puts a topic in the homepage "Featured now"
    // slot. When a newer one is published it takes the slot automatically —
    // the older topic keeps living under /explore, nothing else changes.
    featured: z
      .object({
        headline: z.string(),
        teaser: z.string(),
        // A supplied render. Falls back to the topic's built-in scene.
        image: z.string().optional(),
      })
      .optional(),
    // Optional named scene rendered on the topic page.
    scene: z.string().optional(),
    relatedTopics: z.array(z.string()).default([]),
    sources: z
      .array(
        z.object({
          label: z.string(),
          url: z.string().url(),
        }),
      )
      .default([]),
    publishedDate: z.coerce.date(),
    status: z.enum(['draft', 'published']).default('draft'),
  }),
});

export const collections = { topics };
