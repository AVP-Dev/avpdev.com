// src/data/caseStudies.ts

export interface CaseStudy {
	slug: string;
	titleKey: string;
	descriptionKey: string;
	ogImage: string;
	clientKey: string;
	servicesKey: string;
	year: number;
	heroImage: string;
	heroImageAlt: string;
	header: {
		titleKey: string;
		descriptionKey: string;
	};
	content: {
		task: {
			titleKey: string;
			pKey: string;
		};
		solution?: {
			titleKey: string;
			pKey: string;
		};
		keyFeatures: {
			titleKey: string;
			pKey?: string;
			listKeys: string[];
		};
		techStack: {
			icon: string;
			title: string;
		}[];
		deployment: {
			titleKey: string;
			pKey: string;
		};
		gallery?: {
			titleKey: string;
			items: {
				img: string;
				captionKey: string;
			}[];
		};
	};
}

export const caseStudies: CaseStudy[] = [
	// 1. Проект: Мебель (Terra Forma)
	{
		slug: 'project-furniture',
		titleKey: 'case_furniture_title_short',
		descriptionKey: 'case_furniture_desc_short',
		ogImage: '/images/terra-forma-hero.webp',
		clientKey: 'case_furniture_client_short',
		servicesKey: 'case_furniture_services_short',
		year: 2025,
		heroImage: '/images/terra-forma-hero.webp',
		heroImageAlt: 'Главный экран сайта Terra Forma',
		header: {
			titleKey: 'case_furniture_h1_short',
			descriptionKey: 'case_furniture_desc_short',
		},
		content: {
			task: { titleKey: 'case_task', pKey: 'case_furniture_task_p_short' },
			solution: {
				titleKey: 'case_furniture_solution_title',
				pKey: 'case_furniture_solution_p',
			},
			keyFeatures: {
				titleKey: 'case_key_features',
				listKeys: [
					'case_furniture_features_li1_short',
					'case_furniture_features_li2_short',
					'case_furniture_features_li3_short',
					'case_furniture_features_li4_short',
					'case_furniture_features_li5_short',
					'case_furniture_features_li6_short',
				],
			},
			techStack: [
				{ icon: 'fab fa-react', title: 'Next.js - React' },
				{ icon: 'fab fa-node-js', title: 'Node.js' },
				{ icon: 'fas fa-database', title: 'PostgreSQL' },
				{ icon: 'fab fa-docker', title: 'Docker' },
				{ icon: 'fas fa-bolt', title: 'Chakra UI' },
			],
			deployment: {
				titleKey: 'case_deployment_title',
				pKey: 'case_furniture_deployment_text',
			},
			gallery: {
				titleKey: 'project_fragments_title',
				items: [
					{ img: '/images/terra-forma-hero.webp', captionKey: 'gallery_caption_furniture_hero' },
					{ img: '/images/terra-forma-collection.webp', captionKey: 'gallery_caption_collection' },
					{ img: '/images/terra-forma-philosophy.webp', captionKey: 'gallery_caption_philosophy' },
					{ img: '/images/terra-forma-journal.webp', captionKey: 'gallery_caption_journal' },
					{ img: '/images/terra-forma-workshop.webp', captionKey: 'gallery_caption_workshop' },
					{ img: '/images/terra-forma-contact.webp', captionKey: 'gallery_caption_contact' },
				],
			},
		},
	},
	// 2. Проект: Туризм (Happy Tour)
	{
		slug: 'project-travel',
		titleKey: 'case_travel_title',
		descriptionKey: 'case_travel_desc',
		ogImage: '/images/project-travel.webp',
		clientKey: 'case_travel_client',
		servicesKey: 'case_travel_services',
		year: 2025,
		heroImage: '/images/project-travel.webp',
		heroImageAlt: 'Главное изображение проекта Happy Tour',
		header: { titleKey: 'case_travel_h1', descriptionKey: 'case_travel_desc' },
		content: {
			task: { titleKey: 'case_task', pKey: 'case_travel_task_p' },
			solution: {
				titleKey: 'case_travel_solution_title',
				pKey: 'case_travel_solution_p',
			},
			keyFeatures: {
				titleKey: 'case_key_features',
				listKeys: [
					'case_travel_solution_li1',
					'case_travel_solution_li2',
					'case_travel_solution_li3',
					'case_travel_solution_li4',
				],
			},
			techStack: [
				{ icon: 'fab fa-react', title: 'Next.js - React' },
				{ icon: 'fas fa-bolt', title: 'Chakra UI' },
				{ icon: 'fas fa-database', title: 'Prisma ORM' },
				{ icon: 'fas fa-shield-alt', title: 'NextAuth.js' },
				{ icon: 'fas fa-sync-alt', title: 'SWR' },
				{ icon: 'fab fa-docker', title: 'Docker' },
				{ icon: 'fas fa-server', title: 'VPS' },
				{ icon: 'fab fa-telegram-plane', title: 'Telegram and Bitrix24 Integration' },
			],
			deployment: {
				titleKey: 'case_deployment_title',
				pKey: 'case_deployment_text',
			},
			gallery: {
				titleKey: 'project_fragments_title',
				items: [
					{ img: '/images/project-travel.webp', captionKey: 'gallery_caption_travel_hero' },
					{ img: '/images/travel-gallery-hot-tours.webp', captionKey: 'gallery_caption_travel_hot_tours' },
					{ img: '/images/travel-gallery-search.webp', captionKey: 'gallery_caption_travel_search' },
					{ img: '/images/travel-gallery-reviews.webp', captionKey: 'gallery_caption_travel_reviews' },
					{ img: '/images/travel-gallery-faq.webp', captionKey: 'gallery_caption_travel_faq' },
					{ img: '/images/travel-gallery-contacts.webp', captionKey: 'gallery_caption_travel_contacts' },
				],
			},
		},
	},
	// 3. Проект: Авто (АвтоМир Импорт)
	{
		slug: 'project-cars',
		titleKey: 'case_cars_title_portfolio',
		descriptionKey: 'case_cars_desc_portfolio',
		ogImage: '/images/cars-hero-portfolio.webp',
		clientKey: 'case_cars_client_portfolio',
		servicesKey: 'case_cars_services_portfolio',
		year: 2024,
		heroImage: '/images/cars-hero-portfolio.webp',
		heroImageAlt: 'Главный экран сайта АвтоМир Импорт',
		header: {
			titleKey: 'case_cars_h1_portfolio',
			descriptionKey: 'case_cars_desc_portfolio',
		},
		content: {
			task: { titleKey: 'case_task', pKey: 'case_cars_task_p_portfolio' },
			solution: {
				titleKey: 'case_cars_solution_title',
				pKey: 'case_cars_solution_p',
			},
			keyFeatures: {
				titleKey: 'case_key_features',
				listKeys: [
					'case_cars_solution_li1_portfolio',
					'case_cars_solution_li2_portfolio',
					'case_cars_solution_li3_portfolio',
					'case_cars_solution_li4_portfolio',
					'case_cars_solution_li5_portfolio',
					'case_cars_solution_li6_portfolio',
				],
			},
			techStack: [
				{ icon: 'fab fa-html5', title: 'HTML5' },
				{ icon: 'fab fa-css3-alt', title: 'CSS3' },
				{ icon: 'fab fa-js-square', title: 'JavaScript' },
			],
			deployment: {
				titleKey: 'case_deployment_title',
				pKey: 'case_cars_deployment_text',
			},
			gallery: {
				titleKey: 'project_fragments_title',
				items: [
					{ img: '/images/cars-hero-portfolio.webp', captionKey: 'gallery_caption_cars_hero' },
					{ img: '/images/cars-about-portfolio.webp', captionKey: 'gallery_caption_cars_about' },
					{ img: '/images/cars-services-portfolio.webp', captionKey: 'gallery_caption_cars_services' },
					{ img: '/images/cars-inspiration-portfolio.webp', captionKey: 'gallery_caption_cars_inspiration' },
					{ img: '/images/cars-calculator-portfolio.webp', captionKey: 'gallery_caption_cars_calculator' },
					{ img: '/images/cars-testimonials-portfolio.webp', captionKey: 'gallery_caption_cars_testimonials' },
					{ img: '/images/cars-contact-portfolio.webp', captionKey: 'gallery_caption_cars_contact' },
				],
			},
		},
	},
	// 4. Проект: Эвакуатор
	{
		slug: 'project-tow-truck',
		titleKey: 'case_tow_title',
		descriptionKey: 'case_tow_meta_desc',
		ogImage: '/images/tow-truck-hero.webp',
		clientKey: 'case_tow_client',
		servicesKey: 'case_tow_services',
		year: 2023,
		heroImage: '/images/tow-truck-hero.webp',
		heroImageAlt: 'Главный экран сайта службы эвакуации',
		header: { titleKey: 'case_tow_h1', descriptionKey: 'case_tow_desc' },
		content: {
			task: { titleKey: 'case_task', pKey: 'case_tow_task_p' },
			solution: {
				titleKey: 'case_tow_solution_title',
				pKey: 'case_tow_solution_p',
			},
			keyFeatures: {
				titleKey: 'case_key_features',
				pKey: 'case_tow_features_p',
				listKeys: [
					'case_tow_solution_li1',
					'case_tow_solution_li2',
					'case_tow_solution_li3',
				],
			},
			techStack: [
				{ icon: 'fab fa-html5', title: 'HTML5' },
				{ icon: 'fab fa-css3-alt', title: 'CSS3' },
				{ icon: 'fab fa-js-square', title: 'JavaScript' },
			],
			deployment: {
				titleKey: 'case_deployment_title',
				pKey: 'case_tow_deployment_text',
			},
			gallery: {
				titleKey: 'project_fragments_title',
				items: [
					{ img: '/images/tow-truck-hero.webp', captionKey: 'gallery_caption_tow_hero' },
					{ img: '/images/tow-truck-services.webp', captionKey: 'gallery_caption_tow_services' },
					{ img: '/images/tow-truck-about.webp', captionKey: 'gallery_caption_tow_about' },
					{ img: '/images/tow-truck-equipment.webp', captionKey: 'gallery_caption_tow_equipment' },
					{ img: '/images/tow-truck-map.webp', captionKey: 'gallery_caption_tow_map' },
					{ img: '/images/tow-truck-testimonials.webp', captionKey: 'gallery_caption_tow_testimonials' },
					{ img: '/images/tow-truck-contacts-form.webp', captionKey: 'gallery_caption_tow_contacts_form' },
				],
			},
		},
	},
	// 5. Проект: 3D-моделирование
	{
		slug: 'project-3d-modeling',
		titleKey: 'case_3d_title',
		descriptionKey: 'case_3d_meta_desc',
		ogImage: '/images/project-3d-model.webp',
		clientKey: 'case_3d_client',
		servicesKey: 'case_3d_services',
		year: 2024,
		heroImage: '/images/project-3d-model.webp',
		heroImageAlt: 'Изображение проекта по 3D-моделированию',
		header: { titleKey: 'case_3d_h1', descriptionKey: 'case_3d_desc' },
		content: {
			task: { titleKey: 'case_task', pKey: 'case_3d_task_p' },
			keyFeatures: {
				titleKey: 'case_key_features',
				pKey: 'case_3d_features_p',
				listKeys: [
					'case_3d_solution_li1',
					'case_3d_solution_li2',
					'case_3d_solution_li3',
					'case_3d_solution_li4',
					'case_3d_solution_li5',
					'case_3d_solution_li6',
					'case_3d_solution_li7',
				],
			},
			techStack: [
				{ icon: 'fab fa-html5', title: 'HTML5' },
				{ icon: 'fab fa-css3-alt', title: 'CSS3' },
				{ icon: 'fab fa-js-square', title: 'Vanilla JavaScript' },
				{ icon: 'fab fa-node-js', title: 'Node.js - Express.js' },
				{ icon: 'fab fa-docker', title: 'Docker' },
				{ icon: 'fas fa-server', title: 'Coolify and VPS' },
				{ icon: 'fab fa-telegram-plane', title: 'Telegram Bot API' },
			],
			deployment: {
				titleKey: 'case_deployment_title',
				pKey: 'case_deployment_text',
			},
			gallery: {
				titleKey: 'project_fragments_title',
				items: [
					{ img: '/images/project-3d-model.webp', captionKey: 'gallery_caption_3d_hero' },
					{ img: '/images/3d-about-us.webp', captionKey: 'gallery_caption_3d_about_us' },
					{ img: '/images/3d-services-section.webp', captionKey: 'gallery_caption_3d_services_section' },
					{ img: '/images/3d-our-works.webp', captionKey: 'gallery_caption_3d_our_works' },
					{ img: '/images/3d-faq.webp', captionKey: 'gallery_caption_3d_faq' },
					{ img: '/images/3d-contact-form.webp', captionKey: 'gallery_caption_3d_contact_form' },
				],
			},
		},
	},
	// 6. Проект: Mekohaus
	{
		slug: 'project-mekohaus',
		titleKey: 'case_mekohaus_title',
		descriptionKey: 'case_mekohaus_desc',
		ogImage: '/images/project-mekohaus-hero.webp',
		clientKey: 'case_mekohaus_client',
		servicesKey: 'case_mekohaus_services',
		year: 2025,
		heroImage: '/images/project-mekohaus-hero.webp',
		heroImageAlt: 'Главный экран сайта Mekohaus',
		header: {
			titleKey: 'case_mekohaus_h1',
			descriptionKey: 'case_mekohaus_desc',
		},
		content: {
			task: { titleKey: 'case_task', pKey: 'case_mekohaus_task_p' },
			keyFeatures: {
				titleKey: 'case_key_features',
				listKeys: [
					'case_mekohaus_solution_li1',
					'case_mekohaus_solution_li2',
					'case_mekohaus_solution_li3',
					'case_mekohaus_solution_li4',
					'case_mekohaus_solution_li5',
				],
			},
			techStack: [
				{ icon: 'fab fa-html5', title: 'HTML5' },
				{ icon: 'fab fa-css3-alt', title: 'CSS3' },
				{ icon: 'fab fa-js-square', title: 'Vanilla JavaScript' },
				{ icon: 'fab fa-php', title: 'PHP' },
				{ icon: 'fab fa-telegram-plane', title: 'Telegram Bot API' },
			],
			deployment: {
				titleKey: 'case_deployment_title',
				pKey: 'case_deployment_text',
			},
			gallery: {
				titleKey: 'project_fragments_title',
				items: [
					{ img: '/images/project-mekohaus-hero.webp', captionKey: 'gallery_caption_mekohaus_hero' },
					{ img: '/images/mekohaus-gallery-catalog.webp', captionKey: 'gallery_caption_mekohaus_catalog' },
					{ img: '/images/mekohaus-gallery-about.webp', captionKey: 'gallery_caption_mekohaus_about' },
					{ img: '/images/mekohaus-gallery-form.webp', captionKey: 'gallery_caption_mekohaus_form' },
				],
			},
		},
	},
];

