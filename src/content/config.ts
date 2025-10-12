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

const projectsCollection = defineCollection({
	type: 'content',
	schema: ({ image }) =>
		z.object({
			titleKey: z.string(),
			descriptionKey: z.string(),
			ogImage: z.string(),
			clientKey: z.string(),
			servicesKey: z.string(),
			year: z.number(),
			heroImage: image(),
			heroImageAlt: z.string(),
			header: z.object({
				titleKey: z.string(),
				descriptionKey: z.string(),
			}),
			content: z.object({
				task: z.object({
					titleKey: z.string(),
					pKey: z.string(),
				}),
				solution: z
					.object({
						titleKey: z.string(),
						pKey: z.string(),
					})
					.optional(),
				keyFeatures: z.object({
					titleKey: z.string(),
					pKey: z.string().optional(),
					listKeys: z.array(z.string()),
				}),
				techStack: z.array(
					z.object({
						icon: z.string(),
						title: z.string(),
						color: z.string().optional(),
					})
				),
				deployment: z.object({
					titleKey: z.string(),
					pKey: z.string(),
				}),
				gallery: z
					.object({
						titleKey: z.string(),
						items: z.array(
							z.object({
								img: image(),
								captionKey: z.string(),
							})
						),
					})
					.optional(),
			}),
		}),
});

const legalCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		lastUpdated: z.string().optional(),
	}),
});

export const collections = {
	blog: blogCollection,
	projects: projectsCollection,
	legal: legalCollection,
};
