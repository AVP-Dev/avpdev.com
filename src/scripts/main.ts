// src/scripts/main.ts

// Extend the global Window interface for TypeScript
declare global {
    interface Window {
        translations: {
            [lang: string]: {
                [key: string]: string;
            };
        };
    }
}

// --- НОВАЯ ФУНКЦИЯ ДЛЯ УПРАВЛЕНИЯ ПОРТФОЛИО ---
function portfolioManager() {
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

// --- ГЛАВНАЯ ФУНКЦИЯ ИНИЦИАЛИЗАЦИИ ---
function initializePage() {
    let currentLang = localStorage.getItem('language') || 'ru';
    let currentTheme = localStorage.getItem('theme') || 'light-theme';

    const themeSwitchers = document.querySelectorAll('.theme-switcher');
    const langSwitchers = document.querySelectorAll('.lang-switcher');
    const burger = document.querySelector('.burger-menu');
    const mobileNav = document.querySelector('.mobile-nav');

    function switchLanguage(lang: string) {
        if (typeof window.translations === 'undefined') {
            console.warn('Translations object not found.');
            return;
        }

        currentLang = lang;
        document.documentElement.lang = lang;
        localStorage.setItem('language', lang);

        langSwitchers.forEach(switcher => {
            switcher.querySelectorAll('.lang-btn').forEach(btn => {
                btn.classList.toggle('active', (btn as HTMLElement).dataset.langSet === lang);
            });
        });

        document.querySelectorAll<HTMLElement>('[data-lang]').forEach(el => {
            const key = el.dataset.lang;
            if (key && window.translations[lang]?.[key]) {
                el.innerHTML = window.translations[lang][key];
            }
        });

        document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[data-lang-placeholder]').forEach(el => {
            const key = el.dataset.langPlaceholder;
            if (key && window.translations[lang]?.[key]) {
                el.placeholder = window.translations[lang][key];
            }
        });
        
        document.querySelectorAll<HTMLElement>('[data-lang-content]').forEach(el => {
            const key = el.dataset.langContent;
            if (key && window.translations[lang]?.[key]) {
                const translation = window.translations[lang][key];
                if (el.tagName === 'META') {
                    el.setAttribute('content', translation);
                } else {
                    el.textContent = translation;
                }
            }
        });

        document.dispatchEvent(new CustomEvent('language:switched', { detail: { lang } }));
    }

    function switchTheme(theme: string) {
        currentTheme = theme;
        document.body.className = theme;
        localStorage.setItem('theme', theme);

        themeSwitchers.forEach(switcher => {
            switcher.innerHTML = theme === 'dark-theme' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        });
        
        document.dispatchEvent(new CustomEvent('theme:changed'));
    }

    if (burger && mobileNav) {
        const toggleMenu = () => {
            const isOpen = mobileNav.classList.toggle('open');
            burger.classList.toggle('active', isOpen);
            document.body.classList.toggle('modal-open', isOpen);
        };
        burger.addEventListener('click', (e) => { e.stopPropagation(); toggleMenu(); });
        mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { if (mobileNav.classList.contains('open')) toggleMenu(); }));
        document.addEventListener('click', (e) => {
            if (mobileNav.classList.contains('open') && !mobileNav.contains(e.target as Node) && !burger.contains(e.target as Node)) {
                toggleMenu();
            }
        });
    }

    function setupModals() {
        const modals = document.querySelectorAll('.feedback-modal-overlay');
        
        const openModal = (modalId: string) => {
            const modal = document.getElementById(modalId);
            if (!modal) return;
            document.body.classList.add('modal-open');
            modal.classList.add('visible');
        };

        const closeModal = (modal: HTMLElement) => {
            document.body.classList.remove('modal-open');
            modal.classList.remove('visible');
        };

        document.addEventListener('modal:open', ((e: CustomEvent) => {
            if (e.detail && e.detail.modalId) {
                openModal(e.detail.modalId);
            }
        }) as EventListener);

        modals.forEach(modal => {
            modal.addEventListener('click', (e) => {
                const target = e.target as HTMLElement;
                if (target === modal || target.closest('.close-modal-btn') || target.closest('.cta-button')) {
                    closeModal(modal as HTMLElement);
                }
            });
        });
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    themeSwitchers.forEach(switcher => switcher.addEventListener('click', () => switchTheme(document.body.classList.contains('dark-theme') ? 'light-theme' : 'dark-theme')));
    langSwitchers.forEach(switcher => switcher.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains('lang-btn')) switchLanguage(target.dataset.langSet || 'ru');
    }));

    // Primary initialization on page load
    switchTheme(currentTheme);
    switchLanguage(currentLang);
    setupModals();
    
    // ВЫЗЫВАЕМ СКРИПТ ПОРТФОЛИО ЗДЕСЬ
    portfolioManager();
}

// Главный обработчик, который запускает всю логику
document.addEventListener("astro:page-load", initializePage);
