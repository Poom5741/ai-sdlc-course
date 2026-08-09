// Content collections — Starlight removed, content preserved for migration
// Re-enable when doc pages are rebuilt with custom layouts
import { defineCollection } from 'astro:content';
import { z } from 'astro:content';

export const collections = {
  docs: defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      description: z.string().optional(),
    }),
  }),
};
