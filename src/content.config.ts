// src/content.config.ts
// Astro 6: Content Collections with glob() loader
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/blog' }),
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string().max(160, "SEO Description must be <= 160 chars."),
		pubDate: z.date(),
		heroImage: image().optional(),
		tags: z.array(z.string()),
		draft: z.boolean().optional(),
	}),
});

const projectsCollection = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/projects' }),
	schema: ({ image }) =>
		z.object({
			titleKey: z.string(),
			descriptionKey: z.string(),
			ogImage: z.string(),
			clientKey: z.string(),
			servicesKey: z.string(),
			year: z.number(),
			featured: z.boolean().default(false),
			category: z.enum(['web-site', 'app', 'crm-erp', 'tg-mini-app']),
			stack: z.array(z.string()),
			publishDate: z.date(),
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
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/legal' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		lastUpdated: z.string().optional(),
	}),
});

const geo = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/geo" }),
  schema: z.object({
    ru: z.object({
      title: z.string(),
      description: z.string(),
      h1: z.string(),
      p: z.string(),
      benefits: z.array(z.object({
        icon: z.string(),
        title: z.string(),
        desc: z.string()
      })).optional(),
      faq: z.array(z.object({
        q: z.string(),
        a: z.string()
      })).optional()
    }).optional(),
    en: z.object({
      title: z.string(),
      description: z.string(),
      h1: z.string(),
      p: z.string(),
      benefits: z.array(z.object({
        icon: z.string(),
        title: z.string(),
        desc: z.string()
      })).optional(),
      faq: z.array(z.object({
        q: z.string(),
        a: z.string()
      })).optional()
    }).optional(),
  })
});

export const collections = {
	blog: blogCollection,
	projects: projectsCollection,
	legal: legalCollection,
	geo: geo,
};
