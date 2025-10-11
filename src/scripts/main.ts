// src/scripts/main.ts
import { initPortfolio } from './portfolio';

// --- ГЛАВНАЯ ФУНКЦИЯ ИНИЦИАЛИЗАЦИИ ---
function initializePage() {
    let currentTheme = localStorage.getItem('theme') || 'light-theme';

    const themeSwitchers = document.querySelectorAll('.theme-switcher');
    const burger = document.querySelector('.burger-menu');
    const mobileNav = document.querySelector('.mobile-nav');

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

    // Primary initialization on page load
    switchTheme(currentTheme);
    setupModals();

    // ВЫЗЫВАЕМ СКРИПТ ПОРТФОЛИО ЗДЕСЬ
    initPortfolio();
}

// Главный обработчик, который запускает всю логику
document.addEventListener("astro:page-load", initializePage);