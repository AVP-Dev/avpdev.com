// src/data/trust-pages.ts
// ЕДИНЫЙ ИСТОЧНИК мета-данных трастовых страниц (RU + EN).
// Факты ниже дословно соответствуют: services.ts (цены/сроки/гарантия),
// i18n/ui.ts (faq_q/a, contact_p), legal-документам (договор/оферта).
// ВАЖНО: выдуманных отзывов и рейтингов здесь нет — страница /reviews/
// не содержит AggregateRating, пока нет реальных текстовых отзывов.
import type { Lang } from './services';

export type TrustPageId = 'faq' | 'reviews' | 'contacts' | 'guarantee' | 'payment';

export interface TrustPageMeta {
	seoTitle: Record<Lang, string>;
	seoDescription: Record<Lang, string>;
	/** H1 страницы (plain text) */
	h1: Record<Lang, string>;
	/** Подзаголовок-интро под H1 */
	intro: Record<Lang, string>;
	/** Название в хлебных крошках */
	crumb: Record<Lang, string>;
}

export const TRUST_PAGE_IDS: TrustPageId[] = ['faq', 'reviews', 'contacts', 'guarantee', 'payment'];

export const TRUST_PAGES: Record<TrustPageId, TrustPageMeta> = {
	faq: {
		seoTitle: {
			ru: 'Частые вопросы о разработке сайтов и AI | AVPdev',
			en: 'FAQ: Web Development & AI Questions | AVPdev',
		},
		seoDescription: {
			ru: 'Сроки от 24 часов, цены от $150, договор, гарантия от 1 месяца. Ответы на частые вопросы + вопросы по каждой услуге. Не нашли ответ — напишите, решим за 24 часа.',
			en: 'Timelines from 24 hours, prices from $150, contract, 1-month+ warranty. General answers plus per-service FAQs. Ask us — solution within 24 hours.',
		},
		h1: { ru: 'Частые вопросы', en: 'Frequently Asked Questions' },
		intro: {
			ru: 'Собрали главное: сроки, цены, процесс и гарантии. Детали по направлениям — в вопросах на страницах услуг.',
			en: 'The essentials: timelines, pricing, process and warranty. Service-specific details live on each service page.',
		},
		crumb: { ru: 'FAQ', en: 'FAQ' },
	},
	reviews: {
		seoTitle: {
			ru: 'Отзывы клиентов о разработке | AVPdev',
			en: 'Client Reviews of Our Development Work | AVPdev',
		},
		seoDescription: {
			ru: 'Как мы собираем обратную связь и где смотреть подтверждение качества: кейсы с блоками отзывов, договор и гарантия от 1 месяца.',
			en: 'How we collect feedback and where to verify quality: case studies with review blocks, contract and 1-month+ warranty.',
		},
		h1: { ru: 'Отзывы клиентов', en: 'Client Reviews' },
		intro: {
			ru: 'Мы не публикуем выдуманные цитаты. Ниже — где проверить нашу работу: кейсы с блоками отзывов и как оставить свой отзыв.',
			en: 'We publish no invented quotes. Below — where to verify our work: case studies with review blocks, and how to leave yours.',
		},
		crumb: { ru: 'Отзывы', en: 'Reviews' },
	},
	contacts: {
		seoTitle: {
			ru: 'Контакты — связаться с AVPdev | AVPdev',
			en: 'Contact AVPdev — Get in Touch | AVPdev',
		},
		seoDescription: {
			ru: 'Telegram, WhatsApp, email. Опишите задачу — предложим решение в течение 24 часов.',
			en: 'Telegram, WhatsApp, email. Describe your task — solution within 24 hours.',
		},
		h1: { ru: 'Контакты', en: 'Contact Us' },
		intro: {
			ru: 'Удобный канал на выбор. Опишите задачу — предложим решение в течение 24 часов.',
			en: 'Pick any convenient channel. Describe your task — we will propose a solution within 24 hours.',
		},
		crumb: { ru: 'Контакты', en: 'Contact' },
	},
	guarantee: {
		seoTitle: {
			ru: 'Гарантии: договор, оплата 50/50, код ваш | AVPdev',
			en: 'Guarantee: Contract, 50/50 Payment, Your Code | AVPdev',
		},
		seoDescription: {
			ru: 'Работаем по договору: схема оплаты под проект, гарантия от 1 месяца, исходный код и доступы — ваши на 100%.',
			en: 'Contract-based work: per-project payment schedule, 1-month+ warranty, source code and credentials 100% yours.',
		},
		h1: { ru: 'Гарантии', en: 'Our Guarantee' },
		intro: {
			ru: 'Четыре вещи, которые защищают вас в каждом проекте — одинаково для сайтов, ботов, AI и SaaS.',
			en: 'Four things protecting you in every project — same for websites, bots, AI and SaaS.',
		},
		crumb: { ru: 'Гарантии', en: 'Guarantee' },
	},
	payment: {
		seoTitle: {
			ru: 'Способы оплаты: карты, СБП, ЕРИП, крипта | AVPdev',
			en: 'Payment Methods: Cards, SBP, ERIP, Crypto | AVPdev',
		},
		seoDescription: {
			ru: 'Visa, Mastercard, МИР, Белкарт, PayPal, СБП, ЕРИП, USDT/BTC/ETH. Валюты RUB, BYN, USD, EUR. Схема оплаты — по договору, под проект.',
			en: 'Visa, Mastercard, MIR, Belkart, PayPal, SBP, ERIP, USDT/BTC/ETH. Currencies RUB, BYN, USD, EUR. Schedule agreed per project.',
		},
		h1: { ru: 'Способы оплаты', en: 'Payment Methods' },
		intro: {
			ru: 'Карты, быстрые платежи и крипта. Все платежи — официально по договору, схема оплаты обсуждается в зависимости от проекта.',
			en: 'Cards, fast payments and crypto. All payments are contract-based; the schedule is agreed depending on the project.',
		},
		crumb: { ru: 'Оплата', en: 'Payment' },
	},
};
