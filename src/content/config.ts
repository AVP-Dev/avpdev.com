// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  // Используем `image()` из `schema` helper для обработки изображений
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    // heroImage теперь будет обрабатываться Astro, а не просто строкой
    heroImage: image().optional(),
    tags: z.array(z.string()),
    draft: z.boolean().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};
