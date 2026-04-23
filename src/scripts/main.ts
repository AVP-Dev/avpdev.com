import { initPortfolio } from './portfolio';

function initializePage() {
    // --- THEME SWITCHER ---
    let currentTheme = localStorage.getItem('theme') || 'dark-theme';
    const themeSwitchers = document.querySelectorAll('.theme-switcher');

    function applyThemeClasses(theme: string) {
        if (theme === 'dark-theme') {
            document.documentElement.classList.add('dark-theme');
            document.documentElement.classList.remove('light-theme');
        } else {
            document.documentElement.classList.add('light-theme');
            document.documentElement.classList.remove('dark-theme');
        }

        themeSwitchers.forEach(switcher => {
            // Remove all children
            while (switcher.firstChild) {
                switcher.removeChild(switcher.firstChild);
            }

            // Create icon element safely
            const icon = document.createElement('i');
            icon.className = theme === 'dark-theme' ? 'fas fa-sun' : 'fas fa-moon';
            switcher.appendChild(icon);
        });
    }

    function toggleTheme() {
        const newTheme = document.documentElement.classList.contains('dark-theme') ? 'light-theme' : 'dark-theme';

        // Add class to enable transition only during manual switch
        document.body.classList.add('theme-transitioning');

        localStorage.setItem('theme', newTheme);
        applyThemeClasses(newTheme);
        document.dispatchEvent(new CustomEvent('theme:changed', { detail: { theme: newTheme } }));

        // Remove class after transition completes
        setTimeout(() => {
            document.body.classList.remove('theme-transitioning');
        }, 400);
    }

    themeSwitchers.forEach(switcher => switcher.addEventListener('click', toggleTheme));
    applyThemeClasses(currentTheme);

    // --- MOBILE MENU ---
    const burger = document.querySelector('.burger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileOverlay = document.querySelector('.mobile-nav-overlay');

    if (burger && mobileNav && mobileOverlay) {
        const toggleMenu = () => {
            const isOpen = mobileNav.classList.toggle('open');
            burger.classList.toggle('open', isOpen);
            mobileOverlay.classList.toggle('visible', isOpen);
            document.body.classList.toggle('modal-open', isOpen);
        };

        burger.addEventListener('click', (e) => { e.stopPropagation(); toggleMenu(); });
        mobileOverlay.addEventListener('click', toggleMenu);

        // --- MOBILE ACCORDION ---
        const accordionTrigger = mobileNav.querySelector('.mobile-accordion-trigger');
        if (accordionTrigger) {
            accordionTrigger.addEventListener('click', (e) => {
                e.stopPropagation();
                const isActive = accordionTrigger.classList.toggle('active');
                accordionTrigger.setAttribute('aria-expanded', isActive.toString());
            });
        }

        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mobileNav.classList.contains('open')) toggleMenu();
            });
        });
    }

    // --- MODALS ---
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

        document.addEventListener('modal:open', (e) => {
            if (e.detail && e.detail.modalId) {
                openModal(e.detail.modalId);
            }
        });

        modals.forEach(modal => {
            modal.addEventListener('click', (e) => {
                const target = e.target as HTMLElement;
                if (target === modal || target.closest('.close-modal-btn') || target.closest('.cta-button')) {
                    closeModal(modal as HTMLElement);
                }
            });
        });
    }
    setupModals();

    // --- FADE IN ANIMATION ---
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // --- PORTFOLIO ---
    initPortfolio();

    // --- COOKIE BANNER ---
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept-btn');

    if (cookieBanner && acceptBtn) {
        const setCookie = (name: string, value: string, days: number) => {
            let expires = "";
            if (days) {
                const date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax; Secure";
        };

        const getCookie = (name: string) => {
            const nameEQ = name + "=";
            const ca = document.cookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        };

        if (!getCookie('cookie_consent')) {
            setTimeout(() => {
                cookieBanner.classList.add('show');
            }, 1500);
        }

        acceptBtn.addEventListener('click', () => {
            setCookie('cookie_consent', 'true', 365);
            cookieBanner.classList.remove('show');
        });
    }

    // --- SCROLL TO TOP ---
    const scrollToTopBtn = document.querySelector('.scroll-to-top') as HTMLElement | null;
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            const shouldBeVisible = window.scrollY > window.innerHeight;
            scrollToTopBtn.classList.toggle('visible', shouldBeVisible);
        }, { passive: true });
    }

    // --- HEADER SCROLL ---
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 20);
        }, { passive: true });
    }

    // --- FOOTER YEAR ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear().toString();
    }

    // --- FAQ EXCLUSIVE ACCORDION ---
    const faqs = document.querySelectorAll('.faq-item') as NodeListOf<HTMLDetailsElement>;
    faqs.forEach(faq => {
        faq.addEventListener('toggle', () => {
            if (faq.open) {
                faqs.forEach(otherFaq => {
                    if (otherFaq !== faq && otherFaq.open) {
                        otherFaq.open = false;
                    }
                });
            }
        });
    });
    // --- LIGHTBOX ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img') as HTMLImageElement;
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (lightbox && lightboxImg && lightboxClose) {
        const openLightbox = (src: string, captionText: string) => {
            lightbox.classList.add('loading');
            lightboxImg.style.opacity = '0';

            lightboxImg.onload = () => {
                lightbox.classList.remove('loading');
                lightboxImg.style.opacity = '1';
            };

            lightboxImg.src = src;
            if (lightboxCaption) {
                lightboxCaption.innerHTML = captionText;
            }
            lightbox.classList.add('visible');
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.classList.add('modal-open');
        };

        const closeLightbox = () => {
            lightbox.classList.remove('visible');
            lightbox.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('modal-open');
            setTimeout(() => { lightboxImg.src = ''; }, 300);
        };

        const triggers = document.querySelectorAll('.lightbox-trigger');
        triggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const img = trigger as HTMLImageElement;
                const src = trigger.getAttribute('data-lightbox') || img.src;
                const figure = trigger.closest('figure');
                const caption = figure ? figure.querySelector('figcaption')?.innerHTML : '';
                openLightbox(src, caption || '');
            });
        });

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('visible')) {
                closeLightbox();
            }
        });
    }
}

document.addEventListener("astro:page-load", initializePage);