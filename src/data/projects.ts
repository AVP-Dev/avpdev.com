// src/data/projects.ts

export interface Project {
    id: number;
    category: 'apps' | 'sites';
    img: string;
    titleKey: string;
    link: string;
    tags: string[];
}

// ИСПРАВЛЕНО: Добавлены слеши в конец всех ссылок для соответствия настройке trailingSlash: 'always'
export const allProjects: Project[] = [
    { id: 1, category: 'apps',  img: '/images/terra-forma-hero.webp',   titleKey: 'portfolio_card1_h3', link: '/project/project-furniture/', tags: ['Next.js', 'Chakra UI', 'Prisma'] },
    { id: 2, category: 'apps',  img: '/images/project-travel.webp',     titleKey: 'portfolio_card2_h3', link: '/project/project-travel/',    tags: ['Next.js', 'Chakra UI', 'Prisma', 'GSAP'] },
    { id: 3, category: 'sites', img: '/images/cars-hero-portfolio.webp', titleKey: 'case_cars_h1_portfolio', link: '/project/project-cars/',      tags: ['HTML', 'CSS', 'JavaScript'] },
    { id: 4, category: 'sites', img: '/images/tow-truck-hero.webp',     titleKey: 'case_tow_h1',        link: '/project/project-tow-truck/', tags: ['HTML', 'CSS', 'JS', 'Telegram API'] },
    { id: 5, category: 'sites', img: '/images/project-3d-model.webp',   titleKey: 'case_3d_h1',         link: '/project/project-3d-modeling/', tags: ['JavaScript', 'Three.js', 'HTML', 'CSS'] },
    { id: 6, category: 'sites',  img: '/images/project-mekohaus-hero.webp', titleKey: 'case_mekohaus_h1',   link: '/project/project-mekohaus/',  tags: ['HTML', 'CSS', 'PHP'] },
];
