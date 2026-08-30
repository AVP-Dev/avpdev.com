// src/scripts/easterEggs.ts
// AVPDEV Cybernetic Easter Eggs Suite:
// 1. Konami Code (30 Lives / Coin Shower / God Mode)
// 2. Header Logo 3x Click (Overclock Mode)
// 3. DevTools Console API (window.avp)
// 4. Footer 8-Bit Pixel Mascot
// 5. Fullscreen Matrix Rain
import { retroAudio } from './retroAudio';

// Mascot Dialogue Pool
const MASCOT_QUOTES = [
    "100% organic TypeScript, 0% bugs found! 🚀",
    "Beep boop! Anton is currently deploying to production... ✨",
    "You found me! Here is a virtual espresso ☕",
    "Psst... press [ ~ ] to open the hacker terminal!",
    "Secret cheat: try ↑ ↑ ↓ ↓ ← → ← → B A on keyboard 🕹️",
    "CSS is awesome! (until you touch vertical-align) 😉",
    "All systems nominal. Ready for high-load projects! 🛡️",
    "Lighthouse score: 100/100. Fast as light! ⚡"
];

// --- 1. KONAMI CODE DETECTOR ---
export function initKonamiCode() {
    const sequence = [
        'ArrowUp', 'ArrowUp',
        'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight',
        'ArrowLeft', 'ArrowRight',
        'b', 'a'
    ];
    let currentIndex = 0;

    window.addEventListener('keydown', (e) => {
        const key = e.key.toLowerCase();
        const expected = sequence[currentIndex].toLowerCase();

        // Support RU keyboard layout for B and A ('и' and 'ф')
        const matches = (key === expected) || 
                        (expected === 'b' && (key === 'и' || key === 'b')) ||
                        (expected === 'a' && (key === 'ф' || key === 'a'));

        if (matches) {
            currentIndex++;
            if (currentIndex === sequence.length) {
                currentIndex = 0;
                triggerGodMode();
            }
        } else {
            currentIndex = 0;
            // check if current key is start of sequence
            if (key === 'arrowup') currentIndex = 1;
        }
    });
}

export function triggerGodMode() {
    retroAudio.play1Up();
    setTimeout(() => retroAudio.playVictory(), 200);

    spawnPixelCoinShower();
    showCyberToast("★ 30 CREDITS UNLOCKED! GOD MODE ENGAGED ★", "#ffe600");

    // Enable retro mode if not already active
    if (!document.documentElement.classList.contains('retro-mode')) {
        document.dispatchEvent(new CustomEvent('theme:mode-changed', { detail: { isRetro: true } }));
    }
}

// --- 2. PIXEL COIN & STAR SHOWER ---
function spawnPixelCoinShower() {
    const canvas = document.createElement('canvas');
    canvas.id = 'konami-coin-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '999999';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const coins: Array<{
        x: number;
        y: number;
        vx: number;
        vy: number;
        size: number;
        color: string;
        type: 'coin' | 'star' | 'heart';
        rotation: number;
        rotSpeed: number;
    }> = [];

    const colors = ['#ffe600', '#ff007f', '#00f0ff', '#00ff88', '#ffffff'];
    const types: Array<'coin' | 'star' | 'heart'> = ['coin', 'star', 'heart'];

    for (let i = 0; i < 90; i++) {
        coins.push({
            x: Math.random() * canvas.width,
            y: -20 - Math.random() * canvas.height * 0.5,
            vx: (Math.random() - 0.5) * 4,
            vy: 3 + Math.random() * 6,
            size: 10 + Math.random() * 12,
            color: colors[Math.floor(Math.random() * colors.length)],
            type: types[Math.floor(Math.random() * types.length)],
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.15
        });
    }

    let frameCount = 0;
    function animate() {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let activeCount = 0;
        for (const c of coins) {
            c.x += c.vx;
            c.y += c.vy;
            c.rotation += c.rotSpeed;

            if (c.y < canvas.height + 40) {
                activeCount++;
                ctx.save();
                ctx.translate(c.x, c.y);
                ctx.rotate(c.rotation);

                ctx.fillStyle = c.color;
                ctx.shadowColor = c.color;
                ctx.shadowBlur = 8;

                if (c.type === 'coin') {
                    // Pixel Coin
                    ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size);
                    ctx.fillStyle = '#000000';
                    ctx.fillRect(-c.size * 0.2, -c.size * 0.2, c.size * 0.4, c.size * 0.4);
                } else if (c.type === 'heart') {
                    // Pixel Heart
                    ctx.fillRect(-c.size / 2, -c.size / 4, c.size, c.size / 2);
                    ctx.fillRect(-c.size / 4, -c.size / 2, c.size / 2, c.size * 0.75);
                } else {
                    // Pixel Star
                    ctx.fillRect(-c.size / 2, -c.size / 6, c.size, c.size / 3);
                    ctx.fillRect(-c.size / 6, -c.size / 2, c.size / 3, c.size);
                }

                ctx.restore();
            }
        }

        frameCount++;
        if (activeCount > 0 && frameCount < 300) {
            requestAnimationFrame(animate);
        } else {
            canvas.remove();
        }
    }
    requestAnimationFrame(animate);
}

// --- 3. OVERCLOCK LOGO MODE (3x Click on Logo with navigation prevention) ---
export function initLogoOverclock() {
    if ((window as any).__logoOverclockInit) return;
    (window as any).__logoOverclockInit = true;

    let clickCount = 0;
    let clickTimer: any = null;

    document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const logo = target?.closest('.logo, .footer-logo, .site-logo, .site-header .logo') as HTMLAnchorElement | null;
        if (!logo) return;

        clickCount++;

        if (clickCount >= 3) {
            e.preventDefault();
            e.stopPropagation();
            if (clickTimer) clearTimeout(clickTimer);
            clickCount = 0;
            triggerOverclockMode();
            return;
        }

        // Delay single navigation by 340ms to detect rapid 3x click
        e.preventDefault();
        e.stopPropagation();

        if (clickTimer) clearTimeout(clickTimer);
        const destination = logo.href;

        clickTimer = setTimeout(() => {
            if (clickCount > 0 && clickCount < 3 && destination) {
                clickCount = 0;
                window.location.href = destination;
            }
            clickCount = 0;
        }, 340);
    }, true);
}

export function triggerOverclockMode() {
    retroAudio.playWarp();
    setTimeout(() => retroAudio.playCarBoost(), 250);

    document.body.classList.add('overclock-active');
    showCyberToast("⚡ OVERCLOCK MODE: 200% SPEED ACTIVATED! ⚡", "#00f0ff");

    // Revert overclock after 10s
    setTimeout(() => {
        document.body.classList.remove('overclock-active');
    }, 10000);
}

// --- 4. BARREL ROLL FLIP ---
export function triggerBarrelRoll() {
    retroAudio.playWarp();
    document.body.style.transition = 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
    document.body.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        document.body.style.transform = '';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 1200);
    }, 1200);
}

// --- 5. FULLSCREEN MATRIX DIGITAL RAIN ---
let activeMatrixCanvas: HTMLCanvasElement | null = null;
export function toggleFullscreenMatrix() {
    if (activeMatrixCanvas) {
        activeMatrixCanvas.remove();
        activeMatrixCanvas = null;
        return;
    }

    retroAudio.playLaserShoot();
    const canvas = document.createElement('canvas');
    canvas.id = 'fullscreen-matrix-rain';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = '999990';
    canvas.style.background = 'rgba(0, 5, 2, 0.9)';
    canvas.style.cursor = 'pointer';
    document.body.appendChild(canvas);
    activeMatrixCanvas = canvas;

    showCyberToast("MATRIX RAIN ACTIVE (Click anywhere to exit)", "#00ff88");

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '0123456789ABCDEF$#@%&*+=~日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    const interval = setInterval(() => {
        if (!activeMatrixCanvas) {
            clearInterval(interval);
            return;
        }

        ctx.fillStyle = 'rgba(0, 5, 2, 0.08)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00ff66';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }, 45);

    canvas.addEventListener('click', () => {
        clearInterval(interval);
        canvas.remove();
        activeMatrixCanvas = null;
    });
}

// --- 6. FOOTER 8-BIT PIXEL MASCOT ---
export function initFooterMascot() {
    const mascotBtn = document.getElementById('footer-mascot-btn');
    const bubble = document.getElementById('mascot-speech-bubble');
    if (!mascotBtn || !bubble) return;

    let bubbleTimeout: any = null;
    let mascotClicks = 0;
    let mascotTimer: any = null;

    mascotBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        mascotClicks++;
        if (mascotTimer) clearTimeout(mascotTimer);
        mascotTimer = setTimeout(() => { mascotClicks = 0; }, 800);

        if (mascotClicks >= 3) {
            mascotClicks = 0;
            triggerGodMode();
            return;
        }

        retroAudio.play1Up();

        // Bounce jump animation
        mascotBtn.classList.remove('jump');
        void mascotBtn.offsetWidth; // trigger reflow
        mascotBtn.classList.add('jump');

        // Pick random witty dialogue
        const quote = MASCOT_QUOTES[Math.floor(Math.random() * MASCOT_QUOTES.length)];
        bubble.textContent = quote;
        bubble.classList.add('visible');
        bubble.setAttribute('aria-hidden', 'false');

        if (bubbleTimeout) clearTimeout(bubbleTimeout);
        bubbleTimeout = setTimeout(() => {
            bubble.classList.remove('visible');
            bubble.setAttribute('aria-hidden', 'true');
        }, 4000);
    });
}

// --- 7. DEVTOOLS CONSOLE API (window.avp) ---
export function initDevToolsApi() {
    if (typeof window === 'undefined') return;

    (window as any).avp = {
        help: () => {
            console.log(
                "%c[ AVPDEV INTERACTIVE CONSOLE API ]\n" +
                "------------------------------------\n" +
                "avp.godmode()   - Unlock 30 Lives & Pixel Coin Shower\n" +
                "avp.turbo()     - Activate 200% Overclock Mode\n" +
                "avp.arcade()    - Launch Retro Arcade Modal (3 Games)\n" +
                "avp.terminal()  - Open Cyber CLI Terminal\n" +
                "avp.matrix()    - Toggle Fullscreen Digital Matrix Rain\n" +
                "avp.flip()      - Do a 360° Barrel Roll\n" +
                "avp.retro()     - Toggle Retro CRT Mode\n" +
                "avp.hire()      - Instant Telegram Uplink @AVP_Dev\n",
                "color: #00f0ff; font-weight: bold; font-family: monospace; font-size: 12px;"
            );
            return "✨ Explore the cyber deck!";
        },
        godmode: () => { triggerGodMode(); return "★ GOD MODE ENGAGED ★"; },
        turbo: () => { triggerOverclockMode(); return "⚡ OVERCLOCK ACTIVATED ⚡"; },
        arcade: () => {
            document.dispatchEvent(new CustomEvent('open-retro-arcade'));
            return "🎮 Launching Arcade Cabinet...";
        },
        terminal: () => {
            document.dispatchEvent(new CustomEvent('open-retro-terminal'));
            return "💻 Launching Cyber Terminal...";
        },
        matrix: () => { toggleFullscreenMatrix(); return "🕶️ Matrix Rain Toggled"; },
        flip: () => { triggerBarrelRoll(); return "🌀 Doing a barrel roll!"; },
        retro: () => {
            const isRetro = document.documentElement.classList.contains('retro-mode');
            document.dispatchEvent(new CustomEvent('theme:mode-changed', { detail: { isRetro: !isRetro } }));
            return `🕹️ Retro mode ${!isRetro ? 'ON' : 'OFF'}`;
        },
        hire: () => {
            window.open('https://t.me/AVP_Dev', '_blank');
            return "💼 Transmitting uplink to Telegram @AVP_Dev...";
        }
    };
}

// --- CYBER TOAST HELPER ---
function showCyberToast(text: string, color: string = '#00f0ff') {
    const existing = document.getElementById('cyber-toast-banner');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'cyber-toast-banner';
    toast.style.position = 'fixed';
    toast.style.bottom = '28px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    toast.style.background = 'rgba(10, 6, 22, 0.94)';
    toast.style.border = `2px solid ${color}`;
    toast.style.boxShadow = `0 0 25px ${color}, inset 0 0 10px ${color}`;
    toast.style.color = color;
    toast.style.padding = '12px 24px';
    toast.style.fontFamily = '"Press Start 2P", monospace, system-ui';
    toast.style.fontSize = '11px';
    toast.style.borderRadius = '8px';
    toast.style.zIndex = '9999999';
    toast.style.letterSpacing = '1px';
    toast.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    toast.style.opacity = '0';
    toast.style.textAlign = 'center';
    toast.textContent = text;

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(20px)';
        setTimeout(() => toast.remove(), 400);
    }, 4500);
}
