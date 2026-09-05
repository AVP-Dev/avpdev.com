// src/scripts/particles.ts
// Фоновый паттерн главной: частицы. Инициализирует #particles-js,
// если он есть на странице. Подключается из Hero.astro и GeoHero.astro.

let scriptLoading = false;

function ensureParticlesScript(callback: () => void): void {
    if (typeof particlesJS !== 'undefined') {
        callback();
        return;
    }
    if (scriptLoading) {
        setTimeout(() => ensureParticlesScript(callback), 100);
        return;
    }
    scriptLoading = true;
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
    script.async = true;
    script.onload = () => {
        scriptLoading = false;
        callback();
    };
    document.head.appendChild(script);
}

function loadParticlesConfig(): void {
    const target = document.getElementById('particles-js');
    if (!target) return; // На этой странице частиц нет

    // Skip for small mobile screens or if user prefers reduced motion
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isMobile || prefersReducedMotion) {
        return;
    }

    ensureParticlesScript(() => {
        if (typeof particlesJS === 'undefined') return;

        const bodyStyles = getComputedStyle(document.body);
        const particleColor =
            bodyStyles.getPropertyValue('--particle-color').trim().replace(/"/g, '') || '#888888';
        const particleLineColor =
            bodyStyles.getPropertyValue('--particle-line-color').trim().replace(/"/g, '') || '#888888';

        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 40,
                    density: { enable: true, value_area: 1200 },
                },
                color: { value: particleColor },
                shape: { type: 'circle' },
                opacity: { value: 0.3, random: false },
                size: { value: 2, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: particleLineColor,
                    opacity: 0.15,
                    width: 1,
                },
                move: {
                    enable: true,
                    speed: 0.8,
                    direction: 'none',
                    out_mode: 'out',
                },
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: false },
                    onclick: { enable: false },
                    resize: true,
                },
            },
            retina_detect: false,
        });
    });
}

// Инициализация при загрузке страницы с задержкой (освобождает основной поток, улучшает LCP/TTI)
document.addEventListener('astro:page-load', () => {
    if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => setTimeout(loadParticlesConfig, 500));
    } else {
        setTimeout(loadParticlesConfig, 1500);
    }
});

// Пересоздание при смене темы
document.addEventListener('theme:changed', () => {
    if (typeof particlesJS !== 'undefined') {
        const el = document.getElementById('particles-js');
        if (el) el.innerHTML = '';
    }
    loadParticlesConfig();
});

export {};
