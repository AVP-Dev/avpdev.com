/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
import type { ui } from './i18n/ui';

type TranslationKey = keyof typeof ui['ru'];

interface Project {
	id: number;
	category: 'apps' | 'sites';
	img: string;
	titleKey: TranslationKey;
	link:string;
	techStack: {
		icon: string;
		title: string;
		color?: string;
	}[];
	tags: string[];
}
