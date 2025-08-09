document.addEventListener("DOMContentLoaded", function() {

    // --- База данных проектов с тегами технологий ---
    const allProjects = [
        { id: 1, category: 'apps',     img: 'assets/images/terra-forma-hero.webp',   titleKey: 'portfolio_card1_h3', link: 'project-furniture.html', tags: ['Next.js', 'Chakra UI', 'Prisma'] },
        { id: 2, category: 'apps',     img: 'assets/images/project-travel.webp',     titleKey: 'portfolio_card2_h3', link: 'project-travel.html',    tags: ['Next.js', 'Chakra UI', 'Prisma'] },
        { id: 3, category: 'sites',    img: 'assets/images/cars-hero-portfolio.webp', titleKey: 'case_cars_h1_portfolio', link: 'project-cars.html',      tags: ['JavaScript', 'Node.js'] },
        { id: 4, category: 'sites',    img: 'assets/images/tow-truck-hero.webp',     titleKey: 'case_tow_h1',        link: 'project-tow-truck.html', tags: ['HTML', 'CSS', 'JS'] },
        { id: 5, category: 'sites',    img: 'assets/images/project-3d-model.webp',   titleKey: 'case_3d_h1',         link: 'project-3d-modeling.html', tags: ['JavaScript', 'Node.js', 'Docker'] },
        { id: 8, category: 'sites',    img: 'assets/images/project-mekohaus-hero.webp', titleKey: 'case_mekohaus_h1',   link: 'project-mekohaus.html',  tags: ['HTML', 'CSS', 'PHP'] },
    ];

    const themeSwitchers = document.querySelectorAll('.theme-switcher');
    const langSwitchers = document.querySelectorAll('.lang-switcher');
    const mainGrid = document.getElementById('main-portfolio-grid');
    const showMoreBtn = document.getElementById('show-more-btn');
    const mainFilters = document.querySelector('#portfolio .portfolio-filters');
    const contactForm = document.getElementById('contact-form');
    const successModal = document.getElementById('success-modal');
    const errorModal = document.getElementById('error-modal');
    const pageTitle = document.getElementById('page-title');

    let currentLang = localStorage.getItem('language') || 'ru';
    let currentTheme = localStorage.getItem('theme') || 'light-theme';
    
    let currentFilteredProjects = [];
    let projectsCurrentlyDisplayed = 0;
    const projectsPerLoad = 3;

    // --- ИНИЦИАЛИЗАЦИЯ COOKIE БАННЕРА ---
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept-btn');

    if (cookieBanner && acceptBtn) {
        const setCookie = (name, value, days) => {
            let expires = "";
            if (days) {
                const date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
        };

        const getCookie = (name) => {
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
            }, 500);
        }

        acceptBtn.addEventListener('click', () => {
            setCookie('cookie_consent', 'true', 365);
            cookieBanner.classList.remove('show');
        });
    }
    // --- КОНЕЦ ЛОГИКИ COOKIE БАННЕРА ---


    function createProjectCard(project) {
        const title = (typeof translations !== 'undefined' && translations[currentLang] && translations[currentLang][project.titleKey]) ? translations[currentLang][project.titleKey] : 'Project Title';
        const linkText = (typeof translations !== 'undefined' && translations[currentLang] && translations[currentLang].portfolio_card_link) ? translations[currentLang].portfolio_card_link : 'View Case <i class="fas fa-arrow-right"></i>';
        
        const tagsHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

        const card = document.createElement('div');
        card.className = 'portfolio-card';
        card.dataset.category = project.category;
        card.style.opacity = 0;
        card.innerHTML = `
            <div class="portfolio-image" style="background-image: url('${project.img}');"></div>
            <div class="portfolio-info">
                <h3>${title}</h3>
                <div class="portfolio-tags">${tagsHTML}</div>
                <a href="${project.link}" class="case-link">${linkText}</a>
            </div>
        `;
        setTimeout(() => {
            card.style.opacity = 1;
            card.style.transform = 'translateY(0)';
        }, 10);
        return card;
    }

    function displayProjects() {
        const projectsToDisplay = currentFilteredProjects.slice(projectsCurrentlyDisplayed, projectsCurrentlyDisplayed + projectsPerLoad);
        
        projectsToDisplay.forEach(project => {
            const card = createProjectCard(project);
            mainGrid.appendChild(card);
        });

        projectsCurrentlyDisplayed += projectsToDisplay.length;

        if (projectsCurrentlyDisplayed >= currentFilteredProjects.length) {
            showMoreBtn.style.display = 'none';
        } else {
            showMoreBtn.style.display = 'inline-block';
        }
    }

    function setFilter(filter = 'all') {
        mainGrid.innerHTML = '';
        projectsCurrentlyDisplayed = 0;
        
        if (filter === 'all') {
            currentFilteredProjects = [...allProjects];
        } else {
            currentFilteredProjects = allProjects.filter(p => p.category === filter);
        }
        
        displayProjects();
    }

    function switchLanguage(lang) {
        if (typeof translations === 'undefined') return;

        currentLang = lang;
        document.documentElement.lang = lang;
        localStorage.setItem('language', lang);

        langSwitchers.forEach(switcher => {
            switcher.querySelectorAll('.lang-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.langSet === lang);
            });
        });

        document.querySelectorAll('[data-lang]').forEach(el => {
            const key = el.dataset.lang;
            if (translations[lang]?.[key]) {
                el.innerHTML = translations[lang][key];
            }
        });

        document.querySelectorAll('[data-lang-placeholder]').forEach(el => {
            const key = el.dataset.langPlaceholder;
            if (translations[lang]?.[key]) {
                el.placeholder = translations[lang][key];
            }
        });

        if (pageTitle && translations[lang]?.page_title) {
            pageTitle.textContent = translations[lang].page_title;
        }

        if (mainGrid && mainFilters) {
            setFilter(mainFilters.querySelector('.active').dataset.filter);
        }
    }

    function switchTheme(theme) {
        currentTheme = theme;
        document.body.className = theme;
        localStorage.setItem('theme', theme);

        themeSwitchers.forEach(switcher => {
            switcher.innerHTML = theme === 'dark-theme' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        });
        
        if (document.getElementById('particles-js')) {
            const existingCanvas = document.querySelector('#particles-js canvas');
            if (existingCanvas) existingCanvas.remove();
            loadParticles();
        }
    }
    
    function openModal(modal) {
        if (!modal) return;
        document.body.classList.add('modal-open');
        modal.classList.add('visible');
    }

    function closeModal(modal) {
        if (!modal) return;
        document.body.classList.remove('modal-open');
        modal.classList.remove('visible');
    }

    themeSwitchers.forEach(switcher => {
        switcher.addEventListener('click', () => {
            const newTheme = document.body.classList.contains('dark-theme') ? 'light-theme' : 'dark-theme';
            switchTheme(newTheme);
        });
    });

    langSwitchers.forEach(switcher => {
        switcher.addEventListener('click', (e) => {
            if (e.target.classList.contains('lang-btn')) {
                switchLanguage(e.target.dataset.langSet);
            }
        });
    });
    
    if(mainGrid) {
        showMoreBtn.addEventListener('click', displayProjects);
        mainFilters.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                mainFilters.querySelector('.active').classList.remove('active');
                e.target.classList.add('active');
                setFilter(e.target.dataset.filter);
            }
        });
    }

    if (contactForm) {
        contactForm.addEventListener("submit", async function(e) {
            e.preventDefault();
            const form = e.target;
            const emailInput = form.querySelector('[name="email"]');
            const phoneInput = form.querySelector('[name="phone"]');
            const submitButton = form.querySelector('#submit-button');
            const spinner = form.querySelector('#form-spinner');
            const formHint = form.querySelector('.form-hint');

            let isValid = true;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            emailInput.classList.remove('error-field');
            phoneInput.classList.remove('error-field');
            formHint.classList.remove('error-hint');
            formHint.dataset.lang = 'form_hint';
            switchLanguage(currentLang);

            if (!emailInput.value.trim() && !phoneInput.value.trim()) {
                emailInput.classList.add('error-field');
                phoneInput.classList.add('error-field');
                isValid = false;
            }

            if (emailInput.value.trim() && !emailRegex.test(emailInput.value.trim())) {
                emailInput.classList.add('error-field');
                formHint.textContent = translations[currentLang]?.form_error_email || 'Неверный формат Email';
                formHint.classList.add('error-hint');
                isValid = false;
            }
            
            if (!isValid) {
                return;
            }

            submitButton.style.display = 'none';
            spinner.style.display = 'block';

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('https://avpdev.com/api/sendMessage', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });
                if (response.ok) {
                    openModal(successModal);
                    form.reset();
                } else {
                    throw new Error('Server response was not ok.');
                }
            } catch (error) {
                console.error('Fetch error:', error);
                openModal(errorModal);
            } finally {
                submitButton.style.display = 'inline-block';
                spinner.style.display = 'none';
            }
        });
    }

    [successModal, errorModal].forEach(modal => {
        if(modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal || e.target.closest('.cta-button')) {
                    closeModal(modal);
                }
            });
        }
    });

    document.body.style.opacity = 0;
    switchTheme(currentTheme);
    switchLanguage(currentLang);
    if (mainGrid) {
        setFilter('all');
    }
    setTimeout(() => document.body.style.opacity = 1, 50);

    const burger = document.querySelector('.burger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    if (burger && mobileNav) {
        burger.addEventListener('click', () => mobileNav.classList.toggle('open'));
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => mobileNav.classList.remove('open'));
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

    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            scrollToTopBtn.classList.toggle('visible', window.scrollY > window.innerHeight);
        });
    }
    
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    function loadParticles() {
        if(typeof particlesJS === 'undefined') return;

        setTimeout(() => {
            const particleColor = getComputedStyle(document.body).getPropertyValue('--particle-color').trim().replace(/"/g, '');
            const particleLineColor = getComputedStyle(document.body).getPropertyValue('--particle-line-color').trim().replace(/"/g, '');

            if (document.getElementById('particles-js')) {
                particlesJS('particles-js', {
                    particles: {
                        number: { value: 80, density: { enable: true, value_area: 800 } },
                        color: { value: particleColor },
                        shape: { type: "circle" },
                        opacity: { value: 0.5, random: false },
                        size: { value: 3, random: true },
                        line_linked: { enable: true, distance: 150, color: particleLineColor, opacity: 0.4, width: 1 },
                        move: { enable: true, speed: 2, direction: "none", out_mode: "out" }
                    },
                    interactivity: {
                        detect_on: "canvas",
                        events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
                        modes: { repulse: { distance: 150 }, push: { particles_nb: 4 } }
                    },
                    retina_detect: true
                });
            }
        }, 100);
    }

    if (document.getElementById('particles-js')) {
        loadParticles();
    }
});
