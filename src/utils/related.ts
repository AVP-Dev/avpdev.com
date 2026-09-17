// src/utils/related.ts
// Тематический подбор related-материалов (детерминированный — стабилен между билдами,
// в отличие от getRandomItems). SEO: усиливает перелинковку каталога.
import type { CollectionEntry } from 'astro:content';

type BlogEntry = CollectionEntry<'blog'>;
type ProjectEntry = CollectionEntry<'projects'>;

/** Похожие статьи: по числу общих тегов, при равенстве — свежее. Без общих тегов — свежие. */
export function getRelatedPosts(current: BlogEntry, all: BlogEntry[], count = 2): BlogEntry[] {
	const tags = new Set(current.data.tags ?? []);
	return all
		.filter((p) => p.id !== current.id)
		.map((p) => ({
			post: p,
			score: (p.data.tags ?? []).filter((tag) => tags.has(tag)).length,
		}))
		.sort(
			(a, b) =>
				b.score - a.score ||
				b.post.data.pubDate.getTime() - a.post.data.pubDate.getTime() ||
				(a.post.id < b.post.id ? -1 : 1),
		)
		.slice(0, count)
		.map((s) => s.post);
}

/** Услуга → категории кейсов (для блока «Кейсы по услуге»). */
export const SERVICE_PROJECT_CATEGORIES: Record<string, string[]> = {
	websites: ['web-site'],
	shop: ['web-site'],
	tma: ['tg-mini-app'],
	ai: ['crm-erp', 'app'],
	bots: ['app', 'tg-mini-app'],
	saas: ['app', 'crm-erp'],
};

/** Категория кейса → ближайшая услуга (обратная ссылка «Услуга» на странице кейса). */
export const CATEGORY_SERVICE: Record<string, string> = {
	'web-site': 'websites',
	'tg-mini-app': 'tma',
	'crm-erp': 'ai',
	app: 'saas',
};

/** Кейсы по услуге: сначала featured, затем новые. */
export function getServiceProjects(
	serviceId: string,
	all: ProjectEntry[],
	count = 2,
): ProjectEntry[] {
	const categories = SERVICE_PROJECT_CATEGORIES[serviceId] ?? [];
	return all
		.filter((p) => categories.includes(p.data.category))
		.sort(
			(a, b) =>
				Number(b.data.featured) - Number(a.data.featured) ||
				b.data.publishDate.getTime() - a.data.publishDate.getTime() ||
				(a.id < b.id ? -1 : 1),
		)
		.slice(0, count);
}

/** Похожие кейсы: та же категория + пересечение стека. */
export function getRelatedProjects(
	current: ProjectEntry,
	all: ProjectEntry[],
	count = 2,
): ProjectEntry[] {
	const stack = new Set(current.data.stack ?? []);
	return all
		.filter((p) => p.id !== current.id)
		.map((p) => ({
			project: p,
			score:
				(p.data.category === current.data.category ? 100 : 0) +
				(p.data.stack ?? []).filter((tech) => stack.has(tech)).length * 10,
		}))
		.sort(
			(a, b) =>
				b.score - a.score ||
				Number(b.project.data.featured) - Number(a.project.data.featured) ||
				(a.project.id < b.project.id ? -1 : 1),
		)
		.slice(0, count)
		.map((s) => s.project);
}
