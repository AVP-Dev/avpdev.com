import { initPortfolio } from './portfolio';

function initializePage() {
    // --- THEME SWITCHER ---
    let currentTheme = localStorage.getItem('theme') || 'light-theme';
    const themeSwitchers = document.querySelectorAll('.theme-switcher');

    function switchTheme(theme: string) {
        currentTheme = theme;
        document.body.className = theme;
        localStorage.setItem('theme', theme);

        themeSwitchers.forEach(switcher => {
            switcher.innerHTML = theme === 'dark-theme' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        });

        document.dispatchEvent(new CustomEvent('theme:changed'));
    }

    themeSwitchers.forEach(switcher => switcher.addEventListener('click', () => switchTheme(document.body.classList.contains('dark-theme') ? 'light-theme' : 'dark-theme')));
    switchTheme(currentTheme);

    // --- MOBILE MENU ---
    const burger = document.querySelector('.burger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
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

    // --- CONTACT FORM ---
    const contactForm = document.getElementById('contact-form') as HTMLFormElement;
    if (contactForm && !contactForm.dataset.initialized) {
        contactForm.dataset.initialized = 'true';

        contactForm.addEventListener("submit", async function(e) {
            e.preventDefault();

            const form = e.target as HTMLFormElement;
            const submitButton = form.querySelector('#submit-button') as HTMLButtonElement;
            const spinner = form.querySelector('#form-spinner') as HTMLElement;

            // Reset errors
            form.querySelectorAll('.error-field').forEach(el => el.classList.remove('error-field'));

            let isValid = true;
            // Basic client-side check
            form.querySelectorAll('[required]').forEach(el => {
                const input = el as HTMLInputElement | HTMLTextAreaElement;
                if (!input.value.trim()) {
                    input.classList.add('error-field');
                    isValid = false;
                }
            });
            if (!isValid) return;

            if(submitButton) submitButton.style.display = 'none';
            if(spinner) spinner.style.display = 'block';

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('/api/sendMessage/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    document.dispatchEvent(new CustomEvent('modal:open', { detail: { modalId: 'success-modal' } }));
                    form.reset();
                } else {
                    const errorData = await response.json();
                    if (response.status === 400 && errorData.errors) {
                        // Server-side validation errors
                        for (const [field, messages] of Object.entries(errorData.errors)) {
                            const input = form.querySelector(`[name="${field}"]`);
                            if (input) input.classList.add('error-field');
                        }
                    } else {
                        throw new Error('Server response was not ok.');
                    }
                }
            } catch (error) {
                console.error('Fetch error:', error);
                document.dispatchEvent(new CustomEvent('modal:open', { detail: { modalId: 'error-modal' } }));
            } finally {
                if(submitButton) submitButton.style.display = 'block';
                if(spinner) spinner.style.display = 'none';
            }
        });
    }

    // --- FOOTER YEAR ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear().toString();
    }
}

document.addEventListener("astro:page-load", initializePage);