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

// Use 'astro:page-load' so scripts work with View Transitions
// This ensures that the code will execute on each new page transition
document.addEventListener("astro:page-load", function() {
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
        
        // This block updates SEO tags and page title
        document.querySelectorAll<HTMLElement>('[data-lang-content]').forEach(el => {
            const key = el.dataset.langContent;
            if (key && window.translations[lang]?.[key]) {
                const translation = window.translations[lang][key];
                if (el.tagName === 'META') {
                    el.setAttribute('content', translation);
                } else { // For <title>
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
});

