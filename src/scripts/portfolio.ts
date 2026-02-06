// src/scripts/portfolio.ts

export function initPortfolio() {
    const portfolio = document.getElementById('portfolio');
    if (!portfolio || portfolio.dataset.jsActive === 'true') {
        return;
    }
    portfolio.dataset.jsActive = 'true';

    const filterContainer = portfolio.querySelector('.portfolio-filters');
    const showMoreBtn = portfolio.querySelector<HTMLButtonElement>('#show-more-btn');
    const allCards = Array.from(portfolio.querySelectorAll<HTMLElement>('.portfolio-card-wrapper'));
    const PROJECTS_PER_PAGE = 3;

    if (!filterContainer || !showMoreBtn || allCards.length === 0) {
        return;
    }

    let currentFilter = 'all';
    let visibleCount = PROJECTS_PER_PAGE;

    const updateView = () => {
        const matchingCards = allCards.filter(cardWrapper => {
            const card = cardWrapper.querySelector<HTMLElement>('[data-category]');
            const category = card ? card.dataset.category : 'all';
            return currentFilter === 'all' || category === currentFilter;
        });

        allCards.forEach(card => card.classList.add('is-hidden'));

        let visibleInFilter = 0;
        matchingCards.forEach((card, index) => {
            if (index < visibleCount) {
                card.classList.remove('is-hidden');
                visibleInFilter++;
            }
        });

        if (visibleInFilter >= matchingCards.length) {
            showMoreBtn.classList.add('is-hidden');
        } else {
            showMoreBtn.classList.remove('is-hidden');
        }
    };

    filterContainer.addEventListener('click', (e) => {
        const target = (e.target as HTMLElement).closest('button');
        if (!target || !target.dataset.filter) return;

        filterContainer.querySelector('.active')?.classList.remove('active');
        target.classList.add('active');

        currentFilter = target.dataset.filter;
        visibleCount = PROJECTS_PER_PAGE;
        updateView();
    });

    showMoreBtn.addEventListener('click', () => {
        visibleCount += PROJECTS_PER_PAGE;
        updateView();
    });

    updateView();
}