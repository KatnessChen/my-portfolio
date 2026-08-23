import { defineCollection, z } from 'astro:content';
import { sqliteBlogLoader } from './loaders/sqlite-blog';

const work = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    category: z.enum(['fullstack-cloud-ai', 'fullstack-local-ai', 'static']),
    year: z.string(),
    role: z.string(),
    duration: z.string().optional(),
    featured: z.boolean().default(true),
    order: z.number(),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    gallery: z
      .array(z.object({ src: z.string(), alt: z.string(), caption: z.string().optional() }))
      .default([]),
    stack: z.object({
      frontend: z.array(z.string()).default([]),
      backend: z.array(z.string()).default([]),
      ai: z.array(z.string()).default([]),
      infra: z.array(z.string()).default([]),
    }),
    links: z
      .object({
        live: z.string().url().optional(),
        github: z.string().url().optional(),
      })
      .default({}),
    highlights: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    draft: z.boolean().default(false),
  }),
});

const blog = defineCollection({
  loader: sqliteBlogLoader({ dbPath: 'db/blog.sqlite3' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    updatedAt: z.date().optional(),
    excerpt: z.string(),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { work, blog };
