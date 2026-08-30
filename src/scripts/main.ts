import { initPortfolio } from './portfolio';
import { retroAudio } from './retroAudio';

// Делегирование событий мобильного меню.
// Вешаем один раз на document — работает при View Transitions (DOM пересоздаётся),
// а повторные вызовы initializePage() не создают дубликатов обработчиков.
let mobileMenuReady = false;
function setupMobileMenu() {
    if (mobileMenuReady) return;
    mobileMenuReady = true;

    const toggleMenu = (open?: boolean) => {
        const mobileNav = document.querySelector('.mobile-nav');
        const mobileOverlay = document.querySelector('.mobile-nav-overlay');
        if (!mobileNav || !mobileOverlay) return;

        const isOpen = open ?? !mobileNav.classList.contains('open');
        mobileNav.classList.toggle('open', isOpen);
        document.querySelectorAll('.burger-menu').forEach(b => {
            b.classList.toggle('open', isOpen);
            b.setAttribute('aria-expanded', String(isOpen));
        });
        mobileOverlay.classList.toggle('visible', isOpen);
        document.body.classList.toggle('modal-open', isOpen);
    };

    document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;

        // Бургер: открыть/закрыть меню
        if (target.closest('.burger-menu')) {
            e.stopPropagation();
            toggleMenu();
            return;
        }

        // Оверлей: закрыть
        if (target.closest('.mobile-nav-overlay')) {
            toggleMenu(false);
            return;
        }

        // Ссылка в мобильном меню: закрыть после перехода
        const mobileNav = document.querySelector('.mobile-nav');
        if (mobileNav?.classList.contains('open') && mobileNav.contains(target)) {
            const link = target.closest('a');
            if (link && !target.closest('.mobile-accordion-trigger')) {
                toggleMenu(false);
            }
        }
    });

    // Esc — закрыть мобильное меню и вернуть фокус на бургер
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const mobileNav = document.querySelector('.mobile-nav');
            if (mobileNav?.classList.contains('open')) {
                toggleMenu(false);
                (document.querySelector('.burger-menu') as HTMLElement | null)?.focus();
            }
        }
    });

    // Focus trap — удержание Tab внутри открытого мобильного меню
    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;
        const mobileNav = document.querySelector('.mobile-nav.open') as HTMLElement | null;
        if (!mobileNav) return;
        const focusables = mobileNav.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey) {
            if (active === first) {
                e.preventDefault();
                last.focus();
            }
        } else {
            if (active === last) {
                e.preventDefault();
                first.focus();
            }
        }
    });

    // --- DESKTOP NAV DROPDOWN: keyboard support (Enter/Space + aria-expanded) ---
    document.addEventListener('keydown', (e) => {
        const btn = (e.target as HTMLElement).closest('.nav-dropbtn');
        if (!btn) return;
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
            e.preventDefault();
            const dropdown = btn.closest('.nav-dropdown');
            const isExpanded = btn.getAttribute('aria-expanded') === 'true';
            const newState = !isExpanded;
            btn.setAttribute('aria-expanded', String(newState));
            dropdown?.classList.toggle('open', newState);
        }
    });

    // Close desktop dropdown on Escape (global)
    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        // also handle mobile logic already above; this closes desktop dropdown
        document.querySelectorAll('.nav-dropdown.open').forEach(dd => {
            dd.classList.remove('open');
            const b = dd.querySelector('.nav-dropbtn');
            if (b) b.setAttribute('aria-expanded', 'false');
        });
    });

    // Close desktop dropdown on click outside
    document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.closest('.nav-dropdown')) return;
        document.querySelectorAll('.nav-dropdown.open').forEach(dd => {
            dd.classList.remove('open');
            const b = dd.querySelector('.nav-dropbtn');
            if (b) b.setAttribute('aria-expanded', 'false');
        });
    });

    // --- MOBILE ACCORDION (делегирование) ---
    document.addEventListener('click', (e) => {
        const trigger = (e.target as HTMLElement).closest('.mobile-accordion-trigger');
        if (!trigger) return;
        e.stopPropagation();
        const isActive = trigger.classList.toggle('active');
        trigger.setAttribute('aria-expanded', isActive.toString());
    });
}

function initializePage() {
    if ((document as any).__avpInitDone) return;
    (document as any).__avpInitDone = true;

    // --- THEME & RETRO MODE SWITCHER ---
    let currentTheme = localStorage.getItem('theme') || 'dark-theme';
    let currentMode = localStorage.getItem('theme_mode') || 'modern';

    function updateModeSwitcherButtons(isRetro: boolean) {
        const isRu = document.documentElement.lang === 'ru';
        document.querySelectorAll('.mode-switcher').forEach(btn => {
            const labelDefault = btn.querySelector('.label-default') as HTMLElement | null;
            const labelEl = btn.querySelector('.mode-toggle-label') as HTMLElement | null;
            const iconEl = btn.querySelector('i');
            const targetText = isRetro 
                ? (isRu ? 'ОБЫЧНЫЙ' : 'MODERN') 
                : (isRu ? 'РЕТРО' : 'RETRO');

            if (labelDefault) {
                labelDefault.textContent = targetText;
            } else if (labelEl) {
                labelEl.textContent = targetText;
            }

            if (iconEl) {
                iconEl.className = isRetro 
                    ? 'fa-solid fa-cube' 
                    : 'fa-solid fa-gamepad';
            }
        });
    }

    function applyThemeClasses(theme: string, isRetro: boolean) {
        if (isRetro) {
            document.documentElement.classList.add('retro-mode', 'dark-theme');
            document.documentElement.classList.remove('light-theme');
            document.documentElement.style.colorScheme = 'dark';
        } else {
            document.documentElement.classList.remove('retro-mode');
            if (theme === 'dark-theme') {
                document.documentElement.classList.add('dark-theme');
                document.documentElement.classList.remove('light-theme');
                document.documentElement.style.colorScheme = 'dark';
            } else {
                document.documentElement.classList.add('light-theme');
                document.documentElement.classList.remove('dark-theme');
                document.documentElement.style.colorScheme = 'light';
            }
        }

        document.querySelectorAll('.theme-switcher').forEach(switcher => {
            while (switcher.firstChild) {
                switcher.removeChild(switcher.firstChild);
            }
            const icon = document.createElement('i');
            icon.className = theme === 'dark-theme' ? 'fas fa-sun' : 'fas fa-moon';
            switcher.appendChild(icon);
        });

        updateModeSwitcherButtons(isRetro);
    }

    applyThemeClasses(currentTheme, currentMode === 'retro');

    if (!(document as any).__themeListenerReady) {
        (document as any).__themeListenerReady = true;

        // Modern Light / Dark Theme Switcher
        document.addEventListener('click', (e) => {
            if (!(e.target as HTMLElement).closest('.theme-switcher')) return;
            const newTheme = document.documentElement.classList.contains('dark-theme') ? 'light-theme' : 'dark-theme';
            const isRetro = document.documentElement.classList.contains('retro-mode');

            document.body.classList.add('theme-transitioning');
            localStorage.setItem('theme', newTheme);
            applyThemeClasses(newTheme, isRetro);
            document.dispatchEvent(new CustomEvent('theme:changed', { detail: { theme: newTheme } }));

            setTimeout(() => {
                document.body.classList.remove('theme-transitioning');
            }, 400);
        });

        // Retro Mode Switcher (with tactile press, CRT Glitch / Flash effect & SFX)
        document.addEventListener('click', (e) => {
            const btn = (e.target as HTMLElement).closest('.mode-switcher') as HTMLElement | null;
            if (!btn) return;
            const isCurrentlyRetro = document.documentElement.classList.contains('retro-mode');
            const targetRetro = !isCurrentlyRetro;
            const savedTheme = localStorage.getItem('theme') || 'dark-theme';

            // Tactile Inset Press effect (120ms)
            btn.classList.add('is-pressed');
            setTimeout(() => btn.classList.remove('is-pressed'), 140);

            // Add CRT screen glitch / flash transition & SFX
            document.documentElement.classList.add('crt-mode-transition');
            retroAudio.playWarp();

            localStorage.setItem('theme_mode', targetRetro ? 'retro' : 'modern');
            applyThemeClasses(savedTheme, targetRetro);
            document.dispatchEvent(new CustomEvent('theme:mode-changed', { detail: { isRetro: targetRetro } }));

            setTimeout(() => {
                document.documentElement.classList.remove('crt-mode-transition');
            }, 350);
        });
    }

    // --- MOBILE MENU (event delegation: устойчив к View Transitions и двойной инициализации) ---
    setupMobileMenu();

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
    // Fallback: если observer не сработает (гонка с module-скриптом), показываем всё сразу
    document.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
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
                // Use textContent to prevent XSS via figcaption content
                lightboxCaption.textContent = captionText;
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
                // Use textContent to prevent XSS via innerHTML
                const caption = figure ? figure.querySelector('figcaption')?.textContent : '';
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

let arcadeSignalInterval: any = null;
let arcadeSignalInitialTimeout: any = null;

function triggerArcadeSignal() {
    const isRetro = document.documentElement.classList.contains('retro-mode');
    if (isRetro || document.hidden) return;

    document.querySelectorAll('.retro-mode-toggle').forEach(btn => {
        if (btn.matches(':hover') || btn.classList.contains('is-pressed')) return;
        btn.classList.add('arcade-signal-active');
        setTimeout(() => {
            btn.classList.remove('arcade-signal-active');
        }, 1800);
    });
}

function setupArcadeButtonSignal() {
    if (arcadeSignalInterval) clearInterval(arcadeSignalInterval);
    if (arcadeSignalInitialTimeout) clearTimeout(arcadeSignalInitialTimeout);

    arcadeSignalInitialTimeout = setTimeout(() => {
        triggerArcadeSignal();
    }, 2000);

    arcadeSignalInterval = setInterval(() => {
        triggerArcadeSignal();
    }, 6000);
}

function run() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initializePage();
            setupArcadeButtonSignal();
        }, { once: true });
    } else {
        initializePage();
        setupArcadeButtonSignal();
    }
}

document.addEventListener("astro:page-load", () => {
    (document as any).__avpInitDone = false;
    initializePage();
    setupArcadeButtonSignal();
});
run();