/**
 * AVPDEV Interactive Retro Digital World Background Engine (Canvas)
 * 
 * Inspired by TRON, 16-bit arcade circuits, and synthwave aesthetics.
 * Lightweight, non-intrusive, 60fps, zero dependencies.
 */

interface LightTrail {
    x: number;
    y: number;
    vx: number;
    vy: number;
    speed: number;
    color: string;
    glowColor: string;
    trail: { x: number; y: number; alpha: number }[];
    maxTrailLen: number;
    turnTimer: number;
}

interface PixelEntity {
    x: number;
    y: number;
    vx: number;
    vy: number;
    type: 'glider' | 'sentinel' | 'bit';
    color: string;
    size: number;
    animFrame: number;
    fearTimer: number;
}

interface DataPulse {
    x: number;
    y: number;
    length: number;
    speed: number;
    isVertical: boolean;
    color: string;
    alpha: number;
}

interface ClickRipple {
    x: number;
    y: number;
    radius: number;
    maxRadius: number;
    color: string;
    alpha: number;
    particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number; color: string }[];
}

export class RetroBackgroundManager {
    private canvas: HTMLCanvasElement | null = null;
    private ctx: CanvasRenderingContext2D | null = null;
    private isRunning: boolean = false;
    private animFrameId: number | null = null;
    private lastTime: number = 0;

    // Viewport & Scaling
    private width: number = 0;
    private height: number = 0;
    private dpr: number = 1;
    private isMobile: boolean = false;
    private prefersReducedMotion: boolean = false;

    // Grid State
    private gridOffset: number = 0;
    private gridSpeed: number = 18; // base px per second
    private scrollVelocity: number = 0;

    // Entities & Effects
    private lightTrails: LightTrail[] = [];
    private pixelEntities: PixelEntity[] = [];
    private dataPulses: DataPulse[] = [];
    private clickRipples: ClickRipple[] = [];

    // Interaction State
    private mouse = {
        x: -9999,
        y: -9999,
        targetX: -9999,
        targetY: -9999,
        active: false
    };

    // Glitch Timer
    private glitchTimer: number = 14;
    private isGlitching: boolean = false;
    private glitchDuration: number = 0;

    // Event Cleanup Registry
    private cleanupFns: (() => void)[] = [];

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        const context = this.canvas.getContext('2d', { alpha: true });
        if (!context) return;
        this.ctx = context;

        this.checkReducedMotion();
        this.resize();
        this.initPools();
        this.bindEvents();
    }

    private checkReducedMotion() {
        if (typeof window !== 'undefined') {
            this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        }
    }

    private resize = () => {
        if (!this.canvas || !this.ctx) return;

        const w = window.innerWidth;
        const h = window.innerHeight;
        this.isMobile = w < 768;
        // Cap DPR to 1.0 on mobile, 1.5 on desktop for optimal battery and thermals
        this.dpr = this.isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);

        this.width = w;
        this.height = h;

        this.canvas.width = Math.floor(w * this.dpr);
        this.canvas.height = Math.floor(h * this.dpr);
        this.canvas.style.width = `${w}px`;
        this.canvas.style.height = `${h}px`;

        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.scale(this.dpr, this.dpr);

        if (!this.isRunning && this.prefersReducedMotion) {
            this.renderStaticGrid();
        }
    };

    private initPools() {
        this.lightTrails = [];
        this.pixelEntities = [];
        this.dataPulses = [];
        this.clickRipples = [];

        const trailCount = this.isMobile ? 3 : 6;
        const entityCount = this.isMobile ? 3 : 6;

        const neonPalette = [
            { main: '#00f0ff', glow: 'rgba(0, 240, 255, 0.4)' },
            { main: '#ff007f', glow: 'rgba(255, 0, 127, 0.4)' },
            { main: '#9d00ff', glow: 'rgba(157, 0, 255, 0.4)' },
            { main: '#ffe600', glow: 'rgba(255, 230, 0, 0.4)' }
        ];

        // 1. Light Trails (Autonomous 90-degree orthogonal paths)
        for (let i = 0; i < trailCount; i++) {
            const pal = neonPalette[i % neonPalette.length];
            const isHoriz = Math.random() > 0.5;
            this.lightTrails.push({
                x: Math.random() * (this.width || 800),
                y: Math.random() * (this.height || 600),
                vx: isHoriz ? (Math.random() > 0.5 ? 1 : -1) : 0,
                vy: !isHoriz ? (Math.random() > 0.5 ? 1 : -1) : 0,
                speed: 1.2 + Math.random() * 1.0,
                color: pal.main,
                glowColor: pal.glow,
                trail: [],
                maxTrailLen: this.isMobile ? 18 : 32,
                turnTimer: 2 + Math.random() * 4
            });
        }

        // 2. Pixel Entities (Cyber Fauna)
        const types: ('glider' | 'sentinel' | 'bit')[] = ['glider', 'sentinel', 'bit', 'glider', 'sentinel', 'bit'];
        for (let i = 0; i < entityCount; i++) {
            const pal = neonPalette[i % neonPalette.length];
            const type = types[i % types.length];
            this.pixelEntities.push({
                x: Math.random() * (this.width || 800),
                y: Math.random() * (this.height || 600),
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                type,
                color: pal.main,
                size: type === 'glider' ? 6 : type === 'sentinel' ? 8 : 4,
                animFrame: Math.random() * 10,
                fearTimer: 0
            });
        }
    }

    private bindEvents() {
        // Resize Listener
        let resizeTimeout: any = null;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.resize();
            }, 120);
        };
        window.addEventListener('resize', handleResize, { passive: true });
        this.cleanupFns.push(() => window.removeEventListener('resize', handleResize));

        // Visibility API (Pause when tab is hidden to save 0% CPU)
        const handleVisibilityChange = () => {
            if (document.hidden) {
                this.pause();
            } else if (document.documentElement.classList.contains('retro-mode')) {
                this.start();
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange, { passive: true });
        this.cleanupFns.push(() => document.removeEventListener('visibilitychange', handleVisibilityChange));

        // Passive Mouse Movement Listener
        const handleMouseMove = (e: MouseEvent) => {
            if (this.prefersReducedMotion) return;
            this.mouse.targetX = e.clientX;
            this.mouse.targetY = e.clientY;
            this.mouse.active = true;
        };

        const handleMouseLeave = () => {
            this.mouse.active = false;
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('mouseleave', handleMouseLeave, { passive: true });
        this.cleanupFns.push(() => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
        });

        // Click Ripple Reaction
        const handlePointerDown = (e: PointerEvent) => {
            if (!this.isRunning || this.prefersReducedMotion) return;

            // Only spawn if click didn't happen inside modal or active interactive input
            const target = e.target as HTMLElement | null;
            if (target && target.closest('#retro-arcade-modal')) return;

            this.createClickRipple(e.clientX, e.clientY);
        };
        window.addEventListener('pointerdown', handlePointerDown, { passive: true });
        this.cleanupFns.push(() => window.removeEventListener('pointerdown', handlePointerDown));

        // Scroll Velocity Reaction
        let lastScrollY = window.scrollY;
        const handleScroll = () => {
            if (this.prefersReducedMotion) return;
            const currentScrollY = window.scrollY;
            const delta = currentScrollY - lastScrollY;
            lastScrollY = currentScrollY;
            this.scrollVelocity = Math.max(-40, Math.min(40, delta * 0.8));
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        this.cleanupFns.push(() => window.removeEventListener('scroll', handleScroll));
    }

    private createClickRipple(x: number, y: number) {
        if (this.clickRipples.length > 4) {
            this.clickRipples.shift();
        }

        const colors = ['#00f0ff', '#ff007f', '#ffe600'];
        const chosenColor = colors[Math.floor(Math.random() * colors.length)];

        const particles = [];
        const pCount = this.isMobile ? 4 : 8;
        for (let i = 0; i < pCount; i++) {
            const angle = (i / pCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
            const spd = 1.5 + Math.random() * 2.5;
            particles.push({
                x,
                y,
                vx: Math.cos(angle) * spd,
                vy: Math.sin(angle) * spd,
                size: 2 + Math.random() * 2,
                alpha: 0.85,
                color: chosenColor
            });
        }

        this.clickRipples.push({
            x,
            y,
            radius: 4,
            maxRadius: this.isMobile ? 50 : 85,
            color: chosenColor,
            alpha: 0.7,
            particles
        });
    }

    public start() {
        if (this.isRunning) return;
        this.checkReducedMotion();
        if (this.prefersReducedMotion) {
            this.renderStaticGrid();
            return;
        }

        this.isRunning = true;
        this.lastTime = performance.now();
        this.loop(performance.now());
    }

    public pause() {
        this.isRunning = false;
        if (this.animFrameId) {
            cancelAnimationFrame(this.animFrameId);
            this.animFrameId = null;
        }
    }

    public destroy() {
        this.pause();
        this.cleanupFns.forEach(fn => fn());
        this.cleanupFns = [];
        if (this.ctx && this.canvas) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    private loop = (time: number) => {
        if (!this.isRunning) return;

        const dt = Math.min((time - this.lastTime) / 1000, 0.05);
        this.lastTime = time;

        this.update(dt);
        this.render();

        this.animFrameId = requestAnimationFrame(this.loop);
    };

    private update(dt: number) {
        const step = dt * 60; // 60fps multiplier

        // 1. Grid Motion & Scroll Decay
        this.scrollVelocity *= 0.92;
        const currentSpeed = (this.gridSpeed + this.scrollVelocity * 2) * dt;
        this.gridOffset = (this.gridOffset + currentSpeed) % 40;

        // 2. Smooth Cursor Lerp
        if (this.mouse.active) {
            this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.12 * step;
            this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.12 * step;
        } else {
            this.mouse.x = -9999;
            this.mouse.y = -9999;
        }

        // 3. Update Light Trails
        for (const trail of this.lightTrails) {
            trail.turnTimer -= dt;

            // Turn randomly at intervals
            if (trail.turnTimer <= 0) {
                trail.turnTimer = 2.5 + Math.random() * 4.0;
                if (Math.random() > 0.5) {
                    // Switch between horizontal and vertical direction
                    if (trail.vx !== 0) {
                        trail.vy = Math.random() > 0.5 ? 1 : -1;
                        trail.vx = 0;
                    } else {
                        trail.vx = Math.random() > 0.5 ? 1 : -1;
                        trail.vy = 0;
                    }
                }
            }

            // Mouse Avoidance (Subtle nudge)
            if (this.mouse.active) {
                const dx = trail.x - this.mouse.x;
                const dy = trail.y - this.mouse.y;
                const distSq = dx * dx + dy * dy;
                if (distSq < 10000 && distSq > 1) { // within 100px
                    const dist = Math.sqrt(distSq);
                    trail.x += (dx / dist) * 1.5 * step;
                    trail.y += (dy / dist) * 1.5 * step;
                }
            }

            // Move
            trail.x += trail.vx * trail.speed * step;
            trail.y += trail.vy * trail.speed * step;

            // Wrap edges
            if (trail.x < -40) trail.x = this.width + 30;
            if (trail.x > this.width + 40) trail.x = -30;
            if (trail.y < -40) trail.y = this.height + 30;
            if (trail.y > this.height + 40) trail.y = -30;

            // Record trail points
            trail.trail.unshift({ x: trail.x, y: trail.y, alpha: 0.85 });
            if (trail.trail.length > trail.maxTrailLen) {
                trail.trail.pop();
            }
        }

        // 4. Update Pixel Entities (Cyber Fauna)
        for (const ent of this.pixelEntities) {
            ent.animFrame += dt * 4;

            // Mouse awareness
            if (this.mouse.active) {
                const dx = ent.x - this.mouse.x;
                const dy = ent.y - this.mouse.y;
                const distSq = dx * dx + dy * dy;
                if (distSq < 14400 && distSq > 1) { // 120px radius
                    const dist = Math.sqrt(distSq);
                    ent.fearTimer = 1.2;
                    ent.vx = (dx / dist) * 2.2;
                    ent.vy = (dy / dist) * 2.2;
                }
            }

            if (ent.fearTimer > 0) {
                ent.fearTimer -= dt;
            } else {
                // Return to gentle drifting
                ent.vx += (Math.random() - 0.5) * 0.05 * step;
                ent.vy += (Math.random() - 0.5) * 0.05 * step;
                ent.vx = Math.max(-0.9, Math.min(0.9, ent.vx));
                ent.vy = Math.max(-0.9, Math.min(0.9, ent.vy));
            }

            ent.x += ent.vx * step;
            ent.y += ent.vy * step;

            // Wrap edges
            if (ent.x < -20) ent.x = this.width + 10;
            if (ent.x > this.width + 20) ent.x = -10;
            if (ent.y < -20) ent.y = this.height + 10;
            if (ent.y > this.height + 20) ent.y = -10;
        }

        // 5. Spawn Random Data Pulses
        if (this.dataPulses.length < 3 && Math.random() < 0.015) {
            const isVert = Math.random() > 0.6;
            this.dataPulses.push({
                x: isVert ? Math.floor(Math.random() * (this.width / 40)) * 40 : -50,
                y: !isVert ? Math.floor(Math.random() * (this.height / 40)) * 40 : -50,
                length: 30 + Math.random() * 50,
                speed: 4 + Math.random() * 4,
                isVertical: isVert,
                color: Math.random() > 0.5 ? '#00f0ff' : '#ff007f',
                alpha: 0.6
            });
        }

        // Update Data Pulses
        for (let i = this.dataPulses.length - 1; i >= 0; i--) {
            const dp = this.dataPulses[i];
            if (dp.isVertical) {
                dp.y += dp.speed * step;
                if (dp.y > this.height + 80) this.dataPulses.splice(i, 1);
            } else {
                dp.x += dp.speed * step;
                if (dp.x > this.width + 80) this.dataPulses.splice(i, 1);
            }
        }

        // 6. Update Click Ripples
        for (let i = this.clickRipples.length - 1; i >= 0; i--) {
            const r = this.clickRipples[i];
            r.radius += 2.8 * step;
            r.alpha -= 0.035 * step;

            for (const p of r.particles) {
                p.x += p.vx * step;
                p.y += p.vy * step;
                p.alpha -= 0.03 * step;
            }

            if (r.alpha <= 0 || r.radius >= r.maxRadius) {
                this.clickRipples.splice(i, 1);
            }
        }

        // 7. Micro Digital Glitch Timer (Rare aesthetic event)
        this.glitchTimer -= dt;
        if (this.glitchTimer <= 0) {
            this.isGlitching = true;
            this.glitchDuration = 0.09; // 90ms
            this.glitchTimer = 12 + Math.random() * 10; // next in 12-22s
        }

        if (this.isGlitching) {
            this.glitchDuration -= dt;
            if (this.glitchDuration <= 0) {
                this.isGlitching = false;
            }
        }
    }

    private render() {
        if (!this.ctx) return;
        const ctx = this.ctx;
        const w = this.width;
        const h = this.height;

        ctx.clearRect(0, 0, w, h);

        // 1. Digital Perspective Grid (TRON Arena / Cyber Horizon)
        this.drawTronGrid(ctx, w, h);

        // 2. Data Pulses
        this.drawDataPulses(ctx);

        // 3. Light Trails
        this.drawLightTrails(ctx);

        // 4. Pixel Entities (Cyber Fauna)
        this.drawPixelEntities(ctx);

        // 5. Cursor Soft Ambient Aura
        if (this.mouse.active) {
            const radGrad = ctx.createRadialGradient(this.mouse.x, this.mouse.y, 0, this.mouse.x, this.mouse.y, 90);
            radGrad.addColorStop(0, 'rgba(0, 240, 255, 0.07)');
            radGrad.addColorStop(1, 'rgba(0, 240, 255, 0)');
            ctx.fillStyle = radGrad;
            ctx.beginPath();
            ctx.arc(this.mouse.x, this.mouse.y, 90, 0, Math.PI * 2);
            ctx.fill();
        }

        // 6. Click Ripples & Digital Sparks
        this.drawClickRipples(ctx);

        // 7. Rare Micro Glitch Slice
        if (this.isGlitching) {
            this.drawMicroGlitch(ctx, w, h);
        }
    }

    private drawTronGrid(ctx: CanvasRenderingContext2D, w: number, h: number) {
        const horizonY = h * 0.45;

        // Background Ambient Depth Gradient
        const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
        bgGrad.addColorStop(0, 'rgba(4, 2, 10, 0)');
        bgGrad.addColorStop(0.45, 'rgba(12, 6, 26, 0.15)');
        bgGrad.addColorStop(1, 'rgba(18, 4, 32, 0.35)');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, w, h);

        ctx.lineWidth = 1;

        // Horizontal Grid Lines with Perspective Spacing
        const numHines = 14;
        for (let i = 0; i < numHines; i++) {
            // Logarithmic perspective distribution from horizon down to bottom
            const ratio = (i + (this.gridOffset / 40)) / numHines;
            const y = horizonY + Math.pow(ratio, 2.2) * (h - horizonY);

            if (y >= horizonY && y <= h) {
                const alpha = Math.min(0.18, ratio * 0.22);
                ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(w, y);
                ctx.stroke();
            }
        }

        // Perspective Rays from Horizon Center
        const centerX = w / 2;
        const numRays = this.isMobile ? 12 : 22;
        for (let i = 0; i <= numRays; i++) {
            const bottomX = (i / numRays) * (w * 1.8) - (w * 0.4);
            const rayGrad = ctx.createLinearGradient(centerX, horizonY, bottomX, h);
            rayGrad.addColorStop(0, 'rgba(0, 240, 255, 0.01)');
            rayGrad.addColorStop(0.3, 'rgba(0, 240, 255, 0.06)');
            rayGrad.addColorStop(1, 'rgba(255, 0, 127, 0.14)');

            ctx.strokeStyle = rayGrad;
            ctx.beginPath();
            ctx.moveTo(centerX + (i - numRays / 2) * 8, horizonY);
            ctx.lineTo(bottomX, h);
            ctx.stroke();
        }

        // Top Subtle Ambient Matrix Grid
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.035)';
        const topGridSize = 48;
        for (let x = 0; x < w; x += topGridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, horizonY);
            ctx.stroke();
        }
        for (let y = 0; y < horizonY; y += topGridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
            ctx.stroke();
        }
    }

    private drawDataPulses(ctx: CanvasRenderingContext2D) {
        for (const dp of this.dataPulses) {
            ctx.fillStyle = dp.color;
            ctx.globalAlpha = dp.alpha;
            if (dp.isVertical) {
                ctx.fillRect(dp.x - 1, dp.y, 2, dp.length);
            } else {
                ctx.fillRect(dp.x, dp.y - 1, dp.length, 2);
            }
        }
        ctx.globalAlpha = 1.0;
    }

    private drawLightTrails(ctx: CanvasRenderingContext2D) {
        ctx.lineWidth = 2;
        for (const t of this.lightTrails) {
            if (t.trail.length < 2) continue;

            ctx.strokeStyle = t.color;
            for (let i = 0; i < t.trail.length - 1; i++) {
                const p1 = t.trail[i];
                const p2 = t.trail[i + 1];
                const alpha = (1 - i / t.trail.length) * 0.45;
                ctx.strokeStyle = t.color;
                ctx.globalAlpha = alpha;
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }

            // Head Light Dot
            ctx.globalAlpha = 0.9;
            ctx.fillStyle = t.color;
            ctx.fillRect(t.x - 2, t.y - 2, 4, 4);
        }
        ctx.globalAlpha = 1.0;
    }

    private drawPixelEntities(ctx: CanvasRenderingContext2D) {
        for (const ent of this.pixelEntities) {
            ctx.fillStyle = ent.color;
            ctx.globalAlpha = 0.75;

            const x = Math.round(ent.x);
            const y = Math.round(ent.y);

            if (ent.type === 'glider') {
                // Mini 8-bit triangular glider
                ctx.fillRect(x, y - 3, 2, 6);
                ctx.fillRect(x - 2, y - 1, 6, 2);
                ctx.fillRect(x - 4, y, 10, 2);
            } else if (ent.type === 'sentinel') {
                // Mini 8-bit cube sentinel
                ctx.fillRect(x - 3, y - 3, 6, 6);
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(x - 1, y - 1, 2, 2);
            } else {
                // 3x3 Bit Spark
                ctx.fillRect(x - 1, y - 1, 3, 3);
            }
        }
        ctx.globalAlpha = 1.0;
    }

    private drawClickRipples(ctx: CanvasRenderingContext2D) {
        for (const r of this.clickRipples) {
            // Ripple Ring
            ctx.strokeStyle = r.color;
            ctx.globalAlpha = Math.max(0, r.alpha);
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
            ctx.stroke();

            // Ripple Sparks
            for (const p of r.particles) {
                ctx.fillStyle = p.color;
                ctx.globalAlpha = Math.max(0, p.alpha);
                ctx.fillRect(p.x, p.y, p.size, p.size);
            }
        }
        ctx.globalAlpha = 1.0;
    }

    private drawMicroGlitch(ctx: CanvasRenderingContext2D, w: number, h: number) {
        const sliceY = Math.random() * (h - 40);
        const sliceH = 8 + Math.random() * 16;
        const shiftX = (Math.random() - 0.5) * 12;

        ctx.save();
        ctx.fillStyle = 'rgba(0, 240, 255, 0.08)';
        ctx.fillRect(0, sliceY, w, sliceH);
        ctx.fillStyle = 'rgba(255, 0, 127, 0.06)';
        ctx.fillRect(shiftX, sliceY + 2, w, sliceH - 4);
        ctx.restore();
    }

    private renderStaticGrid() {
        if (!this.ctx) return;
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.drawTronGrid(this.ctx, this.width, this.height);
    }
}
