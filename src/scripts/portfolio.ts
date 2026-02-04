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

    // Cache categories to avoid repeated DOM queries
    const cardData = allCards.map(wrapper => {
        const card = wrapper.querySelector<HTMLElement>('[data-category]');
        return {
            wrapper,
            category: card ? card.dataset.category : 'all'
        };
    });

    let currentFilter = 'all';
    let visibleCount = PROJECTS_PER_PAGE;

    const updateView = () => {
        const matchingCards = cardData.filter(item =>
            currentFilter === 'all' || item.category === currentFilter
        );

        requestAnimationFrame(() => {
            cardData.forEach(item => {
                item.wrapper.classList.add('is-hidden');
                item.wrapper.style.opacity = '0';
            });

            let visibleInFilter = 0;
            matchingCards.forEach((item, index) => {
                if (index < visibleCount) {
                    item.wrapper.classList.remove('is-hidden');
                    // Small timeout to trigger opacity transition if we add CSS for it
                    setTimeout(() => {
                        item.wrapper.style.opacity = '1';
                    }, 50);
                    visibleInFilter++;
                }
            });

            if (visibleInFilter >= matchingCards.length) {
                showMoreBtn.classList.add('is-hidden');
            } else {
                showMoreBtn.classList.remove('is-hidden');
            }
        });
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