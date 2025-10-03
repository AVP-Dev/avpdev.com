const PROJECTS_PER_PAGE = 3;

export function initPortfolio() {
  const portfolio = document.getElementById('portfolio');
  // Проверяем, был ли скрипт уже инициализирован для этой секции
  if (!portfolio || portfolio.dataset.jsActive === 'true') {
    return;
  }
  portfolio.dataset.jsActive = 'true';

  const filterContainer = portfolio.querySelector('.portfolio-filters');
  const showMoreBtn = portfolio.querySelector<HTMLButtonElement>('#show-more-btn');
  const allCards = Array.from(portfolio.querySelectorAll<HTMLElement>('.portfolio-card-wrapper'));

  // Если ключевые элементы не найдены, ничего не делаем
  if (!filterContainer || !showMoreBtn || allCards.length === 0) {
    console.warn('Portfolio script: required elements not found. Exiting.');
    return;
  }

  let currentFilter = 'all';
  let visibleCount = PROJECTS_PER_PAGE;

  const updateView = () => {
    // Находим карточки, соответствующие текущему фильтру
    const matchingCards = allCards.filter(cardWrapper => {
      const card = cardWrapper.querySelector<HTMLElement>('[data-category]');
      const category = card ? card.dataset.category : 'all';
      return currentFilter === 'all' || category === currentFilter;
    });

    // Сначала скрываем все карточки
    allCards.forEach(card => card.classList.add('is-hidden'));

    let visibleInFilter = 0;
    // Затем показываем те, которые подходят под фильтр и лимит
    matchingCards.forEach((card, index) => {
      if (index < visibleCount) {
        card.classList.remove('is-hidden');
        visibleInFilter++;
      }
    });
    
    // Прячем или показываем кнопку "Показать еще"
    if (visibleInFilter >= matchingCards.length) {
      showMoreBtn.classList.add('is-hidden');
    } else {
      showMoreBtn.classList.remove('is-hidden');
    }
  };

  // Обработчик для кнопок-фильтров
  filterContainer.addEventListener('click', (e) => {
    const target = (e.target as HTMLElement).closest('button');
    if (!target || !target.dataset.filter) return;

    filterContainer.querySelector('.active')?.classList.remove('active');
    target.classList.add('active');
      
    currentFilter = target.dataset.filter;
    visibleCount = PROJECTS_PER_PAGE; // Сбрасываем счетчик при смене фильтра
    updateView();
  });

  // Обработчик для кнопки "Показать еще"
  showMoreBtn.addEventListener('click', () => {
    visibleCount += PROJECTS_PER_PAGE;
    updateView();
  });

  // Первоначальная отрисовка
  updateView();
}
