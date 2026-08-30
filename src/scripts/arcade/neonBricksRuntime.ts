import { retroAudio } from '../retroAudio';

interface GameOptions {
    canvas: HTMLCanvasElement;
    lang?: 'ru' | 'en';
    onClose?: () => void;
    onGameOver?: (score: number) => void;
}

interface Brick {
    x: number;
    y: number;
    w: number;
    h: number;
    color: string;
    hp: number;
    maxHp: number;
    points: number;
}

interface PowerUp {
    x: number;
    y: number;
    vy: number;
    type: 'multiball' | 'laser' | 'expand' | 'life';
    color: string;
    label: string;
}

interface Ball {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    speed: number;
}

export class NeonBricksRuntime {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private lang: 'ru' | 'en';
    private onClose?: () => void;
    private onGameOver?: (score: number) => void;

    private isRunning = false;
    private isPaused = false;
    private animFrameId: number | null = null;
    private lastTime = 0;

    // Game state
    private score = 0;
    private lives = 3;
    private level = 1;
    private gameState: 'ready' | 'playing' | 'gameover' | 'victory' = 'ready';

    // Paddle
    private paddle = {
        x: 200,
        y: 420,
        w: 80,
        h: 12,
        speed: 400,
        laserActive: false,
        laserTimer: 0
    };

    // Balls
    private balls: Ball[] = [];
    private bricks: Brick[] = [];
    private powerups: PowerUp[] = [];
    private particles: Array<{ x: number; y: number; vx: number; vy: number; life: number; maxLife: number; color: string; size: number }> = [];

    // Keys
    private keys: Record<string, boolean> = {};

    constructor(options: GameOptions) {
        this.canvas = options.canvas;
        this.ctx = this.canvas.getContext('2d')!;
        this.lang = options.lang || 'ru';
        this.onClose = options.onClose;
        this.onGameOver = options.onGameOver;

        this.initCanvasSize();
        this.bindEvents();
        this.resetGame();
    }

    private initCanvasSize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        this.canvas.width = 480 * dpr;
        this.canvas.height = 460 * dpr;
        this.ctx.scale(dpr, dpr);
    }

    private bindEvents() {
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('keyup', this.handleKeyUp);
        this.canvas.addEventListener('touchmove', this.handleTouchMove, { passive: false });
        this.canvas.addEventListener('touchstart', this.handleTouchStart, { passive: false });
        this.canvas.addEventListener('click', this.handleClick);
    }

    private unbindEvents() {
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('keyup', this.handleKeyUp);
        this.canvas.removeEventListener('touchmove', this.handleTouchMove);
        this.canvas.removeEventListener('touchstart', this.handleTouchStart);
        this.canvas.removeEventListener('click', this.handleClick);
    }

    private handleKeyDown = (e: KeyboardEvent) => {
        this.keys[e.code] = true;
        if (e.code === 'Space' || e.code === 'Enter') {
            if (this.gameState === 'ready') {
                this.gameState = 'playing';
                retroAudio.playLaserShoot();
            } else if (this.gameState === 'gameover' || this.gameState === 'victory') {
                this.resetGame();
                this.gameState = 'playing';
            }
        }
        if (e.code === 'KeyP') {
            this.togglePause();
        }
    };

    private handleKeyUp = (e: KeyboardEvent) => {
        this.keys[e.code] = false;
    };

    private handleTouchMove = (e: TouchEvent) => {
        e.preventDefault();
        if (e.touches.length > 0) {
            const rect = this.canvas.getBoundingClientRect();
            const touchX = e.touches[0].clientX - rect.left;
            const scale = 480 / rect.width;
            this.paddle.x = Math.max(0, Math.min(480 - this.paddle.w, touchX * scale - this.paddle.w / 2));
        }
    };

    private handleTouchStart = (e: TouchEvent) => {
        if (this.gameState === 'ready') {
            this.gameState = 'playing';
            retroAudio.playLaserShoot();
        } else if (this.gameState === 'gameover' || this.gameState === 'victory') {
            this.resetGame();
            this.gameState = 'playing';
        }
        this.handleTouchMove(e);
    };

    private handleClick = () => {
        if (this.gameState === 'ready') {
            this.gameState = 'playing';
            retroAudio.playLaserShoot();
        } else if (this.gameState === 'gameover' || this.gameState === 'victory') {
            this.resetGame();
            this.gameState = 'playing';
        }
    };

    public setTouchKey(key: 'left' | 'right' | 'shoot', pressed: boolean) {
        if (key === 'left') this.keys['ArrowLeft'] = pressed;
        if (key === 'right') this.keys['ArrowRight'] = pressed;
        if (key === 'shoot' && pressed) {
            if (this.gameState === 'ready' || this.gameState === 'gameover' || this.gameState === 'victory') {
                this.handleClick();
            }
        }
    }

    public togglePause() {
        this.isPaused = !this.isPaused;
    }

    public start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.lastTime = performance.now();
        this.loop();
    }

    public stop() {
        this.isRunning = false;
        if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
        this.unbindEvents();
    }

    private resetGame() {
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        this.paddle.w = 80;
        this.paddle.x = (480 - this.paddle.w) / 2;
        this.paddle.y = 420;
        this.loadLevel(1);
    }

    private loadLevel(lvl: number) {
        this.level = lvl;
        this.gameState = 'ready';
        this.powerups = [];
        this.particles = [];

        // Center ball on paddle
        this.balls = [{
            x: this.paddle.x + this.paddle.w / 2,
            y: this.paddle.y - 10,
            vx: 180 * (Math.random() > 0.5 ? 1 : -1),
            vy: -240 - lvl * 20,
            radius: 5,
            speed: 300 + lvl * 20
        }];

        // Build bricks
        this.bricks = [];
        const rows = 4 + lvl;
        const cols = 8;
        const brickW = 50;
        const brickH = 16;
        const startX = (480 - cols * (brickW + 6)) / 2;
        const startY = 45;

        const colors = ['#ff007f', '#00f0ff', '#ffe600', '#00ff66', '#a020f0'];

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const color = colors[r % colors.length];
                const hp = r === 0 ? 2 : 1;
                this.bricks.push({
                    x: startX + c * (brickW + 6),
                    y: startY + r * (brickH + 6),
                    w: brickW,
                    h: brickH,
                    color,
                    hp,
                    maxHp: hp,
                    points: (rows - r) * 50
                });
            }
        }
    }

    private loop = () => {
        if (!this.isRunning) return;
        const now = performance.now();
        const dt = Math.min((now - this.lastTime) / 1000, 0.05);
        this.lastTime = now;

        if (!this.isPaused) {
            this.update(dt);
        }
        this.render();

        this.animFrameId = requestAnimationFrame(this.loop);
    };

    private update(dt: number) {
        // Paddle movement
        const moveSpeed = this.paddle.speed * dt;
        if (this.keys['ArrowLeft'] || this.keys['KeyA']) {
            this.paddle.x = Math.max(0, this.paddle.x - moveSpeed);
        }
        if (this.keys['ArrowRight'] || this.keys['KeyD']) {
            this.paddle.x = Math.min(480 - this.paddle.w, this.paddle.x + moveSpeed);
        }

        if (this.gameState === 'ready') {
            if (this.balls.length > 0) {
                this.balls[0].x = this.paddle.x + this.paddle.w / 2;
                this.balls[0].y = this.paddle.y - 10;
            }
            return;
        }

        if (this.gameState !== 'playing') return;

        // Update Balls
        for (let i = this.balls.length - 1; i >= 0; i--) {
            const b = this.balls[i];
            b.x += b.vx * dt;
            b.y += b.vy * dt;

            // Walls collision
            if (b.x - b.radius <= 0) {
                b.x = b.radius;
                b.vx = Math.abs(b.vx);
                retroAudio.playLaserShoot();
            } else if (b.x + b.radius >= 480) {
                b.x = 480 - b.radius;
                b.vx = -Math.abs(b.vx);
                retroAudio.playLaserShoot();
            }

            if (b.y - b.radius <= 0) {
                b.y = b.radius;
                b.vy = Math.abs(b.vy);
                retroAudio.playLaserShoot();
            }

            // Paddle collision
            if (
                b.y + b.radius >= this.paddle.y &&
                b.y - b.radius <= this.paddle.y + this.paddle.h &&
                b.x >= this.paddle.x - b.radius &&
                b.x <= this.paddle.x + this.paddle.w + b.radius &&
                b.vy > 0
            ) {
                b.y = this.paddle.y - b.radius;
                // Calculate bounce angle based on hit position
                const hitOffset = (b.x - (this.paddle.x + this.paddle.w / 2)) / (this.paddle.w / 2);
                const angle = hitOffset * (Math.PI / 3); // Max 60 deg
                const speed = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
                b.vx = speed * Math.sin(angle);
                b.vy = -speed * Math.cos(angle);
                retroAudio.playLaserShoot();
            }

            // Brick collision
            for (let j = this.bricks.length - 1; j >= 0; j--) {
                const br = this.bricks[j];
                if (
                    b.x + b.radius >= br.x &&
                    b.x - b.radius <= br.x + br.w &&
                    b.y + b.radius >= br.y &&
                    b.y - b.radius <= br.y + br.h
                ) {
                    br.hp--;
                    b.vy = -b.vy;
                    retroAudio.playExplosion();

                    // Sparks
                    for (let k = 0; k < 6; k++) {
                        this.particles.push({
                            x: b.x,
                            y: b.y,
                            vx: (Math.random() - 0.5) * 120,
                            vy: (Math.random() - 0.5) * 120,
                            life: 0.35,
                            maxLife: 0.35,
                            color: br.color,
                            size: 2.5
                        });
                    }

                    if (br.hp <= 0) {
                        this.score += br.points;
                        // Chance for powerup
                        if (Math.random() < 0.22) {
                            const types: Array<'multiball' | 'expand' | 'life'> = ['multiball', 'expand', 'life'];
                            const pt = types[Math.floor(Math.random() * types.length)];
                            this.powerups.push({
                                x: br.x + br.w / 2,
                                y: br.y,
                                vy: 90,
                                type: pt,
                                color: pt === 'multiball' ? '#00f0ff' : pt === 'expand' ? '#ffe600' : '#ff007f',
                                label: pt === 'multiball' ? '●●' : pt === 'expand' ? '↔' : '♥'
                            });
                        }
                        this.bricks.splice(j, 1);
                    }
                    break;
                }
            }

            // Fall below screen
            if (b.y - b.radius > 460) {
                this.balls.splice(i, 1);
            }
        }

        // Check if all balls lost
        if (this.balls.length === 0) {
            this.lives--;
            retroAudio.playExplosion();
            if (this.lives > 0) {
                this.gameState = 'ready';
                this.balls = [{
                    x: this.paddle.x + this.paddle.w / 2,
                    y: this.paddle.y - 10,
                    vx: 180,
                    vy: -240,
                    radius: 5,
                    speed: 300
                }];
            } else {
                this.gameState = 'gameover';
                retroAudio.playGameOver();
                if (this.onGameOver) this.onGameOver(this.score);
            }
        }

        // Check level clear
        if (this.bricks.length === 0) {
            if (this.level < 3) {
                retroAudio.playVictory();
                this.loadLevel(this.level + 1);
            } else {
                this.gameState = 'victory';
                retroAudio.playVictory();
                if (this.onGameOver) this.onGameOver(this.score);
            }
        }

        // Update Powerups
        for (let i = this.powerups.length - 1; i >= 0; i--) {
            const p = this.powerups[i];
            p.y += p.vy * dt;

            // Catch powerup
            if (
                p.y >= this.paddle.y &&
                p.y <= this.paddle.y + this.paddle.h &&
                p.x >= this.paddle.x &&
                p.x <= this.paddle.x + this.paddle.w
            ) {
                retroAudio.play1Up();
                if (p.type === 'multiball' && this.balls.length > 0) {
                    const primary = this.balls[0];
                    this.balls.push({ ...primary, vx: primary.vx + 60, vy: -Math.abs(primary.vy) });
                    this.balls.push({ ...primary, vx: primary.vx - 60, vy: -Math.abs(primary.vy) });
                } else if (p.type === 'expand') {
                    this.paddle.w = Math.min(130, this.paddle.w + 20);
                } else if (p.type === 'life') {
                    this.lives = Math.min(5, this.lives + 1);
                }
                this.powerups.splice(i, 1);
                continue;
            }

            if (p.y > 460) {
                this.powerups.splice(i, 1);
            }
        }

        // Update Particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.life -= dt;
            if (p.life <= 0) this.particles.splice(i, 1);
        }
    }

    private render() {
        const ctx = this.ctx;
        const w = 480;
        const h = 460;

        // Clear background
        ctx.fillStyle = '#06040c';
        ctx.fillRect(0, 0, w, h);

        // Cyber Grid Lines
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.05)';
        ctx.lineWidth = 1;
        for (let x = 0; x < w; x += 30) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, h);
            ctx.stroke();
        }
        for (let y = 0; y < h; y += 30) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
            ctx.stroke();
        }

        // Render Bricks
        for (const br of this.bricks) {
            ctx.fillStyle = br.color;
            ctx.shadowColor = br.color;
            ctx.shadowBlur = 8;
            ctx.fillRect(br.x, br.y, br.w, br.h);

            // Brick inner highlight
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.fillRect(br.x + 2, br.y + 2, br.w - 4, 3);

            if (br.hp > 1) {
                ctx.fillStyle = '#000';
                ctx.fillRect(br.x + br.w / 2 - 3, br.y + br.h / 2 - 3, 6, 6);
            }
        }
        ctx.shadowBlur = 0;

        // Render Powerups
        for (const p of this.powerups) {
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 9, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#000';
            ctx.font = 'bold 9px monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(p.label, p.x, p.y);
        }

        // Render Paddle
        ctx.fillStyle = '#ff007f';
        ctx.shadowColor = '#ff007f';
        ctx.shadowBlur = 12;
        ctx.fillRect(this.paddle.x, this.paddle.y, this.paddle.w, this.paddle.h);
        ctx.fillStyle = '#00f0ff';
        ctx.fillRect(this.paddle.x + 4, this.paddle.y + 3, this.paddle.w - 8, 4);
        ctx.shadowBlur = 0;

        // Render Balls
        for (const b of this.balls) {
            ctx.fillStyle = '#00f0ff';
            ctx.shadowColor = '#00f0ff';
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.shadowBlur = 0;

        // Render Particles
        for (const p of this.particles) {
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.life / p.maxLife;
            ctx.fillRect(p.x, p.y, p.size, p.size);
        }
        ctx.globalAlpha = 1.0;

        // HUD
        ctx.font = '8px "Press Start 2P", monospace';
        ctx.fillStyle = '#00f0ff';
        ctx.textAlign = 'left';
        ctx.fillText(`SCORE: ${this.score}`, 12, 20);

        ctx.fillStyle = '#ffe600';
        ctx.textAlign = 'center';
        ctx.fillText(`LEVEL: ${this.level}/3`, w / 2, 20);

        ctx.fillStyle = '#ff007f';
        ctx.textAlign = 'right';
        ctx.fillText(`LIVES: ${'♥ '.repeat(Math.max(0, this.lives))}`, w - 12, 20);

        // State overlays
        if (this.gameState === 'ready') {
            ctx.fillStyle = 'rgba(6, 4, 12, 0.75)';
            ctx.fillRect(0, h / 2 - 30, w, 60);
            ctx.fillStyle = '#ffe600';
            ctx.font = '10px "Press Start 2P", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(this.lang === 'en' ? 'CLICK OR TAP TO LAUNCH' : 'КЛИКНИТЕ ЧТОБЫ ЗАПУСТИТЬ', w / 2, h / 2 + 4);
        } else if (this.gameState === 'gameover') {
            ctx.fillStyle = 'rgba(6, 4, 12, 0.88)';
            ctx.fillRect(0, 0, w, h);
            ctx.fillStyle = '#ff007f';
            ctx.font = '14px "Press Start 2P", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(this.lang === 'en' ? 'GAME OVER' : 'ИГРА ОКОНЧЕНА', w / 2, h / 2 - 30);
            ctx.fillStyle = '#00f0ff';
            ctx.font = '10px "Press Start 2P", monospace';
            ctx.fillText(`SCORE: ${this.score}`, w / 2, h / 2 + 5);
            ctx.fillStyle = '#ffe600';
            ctx.font = '8px "Press Start 2P", monospace';
            ctx.fillText(this.lang === 'en' ? 'PRESS FIRE TO RESTART' : 'НАЖМИТЕ ОГОНЬ ДЛЯ ПОВТОРА', w / 2, h / 2 + 45);
        } else if (this.gameState === 'victory') {
            ctx.fillStyle = 'rgba(6, 4, 12, 0.88)';
            ctx.fillRect(0, 0, w, h);
            ctx.fillStyle = '#00ff66';
            ctx.font = '14px "Press Start 2P", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(this.lang === 'en' ? 'VICTORY! ALL BRICKS CLEARED' : 'ПОБЕДА! ВСЕ БЛОКИ СЛОМАНЫ', w / 2, h / 2 - 30);
            ctx.fillStyle = '#ffe600';
            ctx.font = '10px "Press Start 2P", monospace';
            ctx.fillText(`FINAL SCORE: ${this.score}`, w / 2, h / 2 + 5);
            ctx.fillStyle = '#00f0ff';
            ctx.font = '8px "Press Start 2P", monospace';
            ctx.fillText(this.lang === 'en' ? 'PRESS FIRE TO PLAY AGAIN' : 'НАЖМИТЕ ОГОНЬ ДЛЯ ИГРЫ ЗАНОВО', w / 2, h / 2 + 45);
        }
    }
}
