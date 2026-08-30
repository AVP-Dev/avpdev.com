import { retroAudio } from '../retroAudio';

export interface GameOptions {
    canvas: HTMLCanvasElement;
    lang?: 'ru' | 'en';
    onClose?: () => void;
}

interface Bullet {
    x: number;
    y: number;
    vx: number;
    vy: number;
    isEnemy: boolean;
    isParried?: boolean;
    color: string;
    radius: number;
}

interface Invader {
    x: number;
    y: number;
    width: number;
    height: number;
    type: 1 | 2 | 3 | 4; // 1=Scout, 2=Asteroid, 3=Quantum, 4=Heavy
    hp: number;
    maxHp: number;
    color: string;
    points: number;
    isCloaked?: boolean;
    hasShield?: boolean;
    animFrame: number;
}

interface Boss {
    x: number;
    y: number;
    width: number;
    height: number;
    hp: number;
    maxHp: number;
    phase: number;
    attackTimer: number;
    shieldActive: boolean;
}

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    color: string;
    life: number;
    maxLife: number;
    size: number;
}

export class RetroArcadeRuntime {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private lang: 'ru' | 'en';
    private onClose?: () => void;

    private isRunning: boolean = false;
    private isPaused: boolean = false;
    private isGameOver: boolean = false;
    private isVictory: boolean = false;
    private animFrameId: number | null = null;

    // Game Stats
    private score: number = 0;
    private highScore: number = 0;
    private currentLevel: number = 1;
    private lives: number = 5;
    private comboHits: number = 0;
    private empCharge: number = 0; // 0 to 100
    private isGodMode: boolean = false;

    // Player Entity
    private player = {
        x: 200,
        y: 460,
        width: 32,
        height: 24,
        speed: 5.6,
        shootCooldown: 0,
        shieldActive: false,
        shieldTimer: 0,
        shieldCooldown: 0,
        invincibleTimer: 0
    };

    // Game Objects
    private bullets: Bullet[] = [];
    private invaders: Invader[] = [];
    private particles: Particle[] = [];
    private boss: Boss | null = null;
    private ufo: { x: number; y: number; vx: number; active: boolean; points: number } | null = null;

    // Level & Fleet State
    private fleetDirection: number = 1;
    private levelTransitionTimer: number = 0;
    private levelTitle: string = '';

    // Input States
    private keys = {
        left: false,
        right: false,
        shoot: false,
        shield: false,
        emp: false
    };

    private cleanupListeners: (() => void)[] = [];

    constructor(options: GameOptions) {
        this.canvas = options.canvas;
        const context = this.canvas.getContext('2d');
        if (!context) throw new Error('Could not get 2D canvas context');
        this.ctx = context;
        this.lang = options.lang || (typeof document !== 'undefined' && document.documentElement.lang === 'en' ? 'en' : 'ru');
        this.onClose = options.onClose;

        this.highScore = parseInt(localStorage.getItem('retro_arcade_hi_score') || '0', 10);
        this.isGodMode = localStorage.getItem('retro_konami_unlocked') === 'true';
        if (this.isGodMode) {
            this.lives = 99;
        }

        this.setupCanvas();
        this.setupControls();
    }

    private setupCanvas() {
        this.canvas.width = 440;
        this.canvas.height = 540;
    }

    public start() {
        this.isRunning = true;
        this.isPaused = false;
        this.isGameOver = false;
        this.isVictory = false;
        this.score = 0;
        this.currentLevel = 1;
        this.lives = this.isGodMode ? 99 : 5;
        this.empCharge = 0;
        this.comboHits = 0;
        this.loadLevel(1);
        this.lastTime = 0;
        this.loop(performance.now());
    }

    private lastTime: number = 0;
    private loop = (time: number) => {
        if (!this.isRunning) return;

        if (this.lastTime === 0) {
            this.lastTime = time;
        }
        const dt = Math.min((time - this.lastTime) / 1000, 0.05);
        this.lastTime = time;

        if (!this.isPaused && !this.isGameOver && !this.isVictory) {
            this.update(dt);
        }

        this.render();
        this.animFrameId = requestAnimationFrame(this.loop);
    };

    private loadLevel(lvl: number) {
        this.currentLevel = lvl;
        this.bullets = [];
        this.invaders = [];
        this.particles = [];
        this.boss = null;
        this.ufo = null;
        this.player.x = this.canvas.width / 2 - this.player.width / 2;
        this.player.y = this.canvas.height - 50;
        this.levelTransitionTimer = 2.0; // Show level title for 2.0s

        // Reward player when advancing: +1 Life & EMP boost
        if (lvl > 1 && !this.isGodMode) {
            this.lives = Math.min(5, this.lives + 1);
            this.empCharge = Math.min(100, this.empCharge + 40);
        }

        const titlesRu = [
            'УРОВЕНЬ 1: ОРБИТАЛЬНЫЙ ПРОРЫВ',
            'УРОВЕНЬ 2: ПОЯС АСТЕРОИДОВ',
            'УРОВЕНЬ 3: КВАНТОВЫЙ РОЙ',
            'УРОВЕНЬ 4: КИБЕР-БАСТИОН',
            'УРОВЕНЬ 5: МАТРИЦА СБОЯ - БОСС'
        ];
        const titlesEn = [
            'LEVEL 1: ORBITAL BREACH',
            'LEVEL 2: ASTEROID HAZARD',
            'LEVEL 3: QUANTUM SWARM',
            'LEVEL 4: CYBER BARRICADE',
            'LEVEL 5: GLITCH CORE - FINAL BOSS'
        ];

        this.levelTitle = this.lang === 'en' ? titlesEn[lvl - 1] : titlesRu[lvl - 1];

        if (lvl === 1) {
            // Level 1: Standard Classic Scouts (3 rows of 6, all 1 HP)
            for (let r = 0; r < 3; r++) {
                for (let c = 0; c < 6; c++) {
                    this.invaders.push({
                        x: 60 + c * 54,
                        y: 75 + r * 36,
                        width: 30,
                        height: 22,
                        type: 1,
                        hp: 1,
                        maxHp: 1,
                        color: r === 0 ? '#ff007f' : r === 1 ? '#ffe600' : '#00f0ff',
                        points: (3 - r) * 100,
                        animFrame: 0
                    });
                }
            }
        } else if (lvl === 2) {
            // Level 2: Scouts + 2 Asteroids in front (all 1 HP except 2 Asteroids with 2 HP)
            for (let r = 0; r < 3; r++) {
                for (let c = 0; c < 6; c++) {
                    const isAsteroid = (r === 2 && (c === 2 || c === 3));
                    this.invaders.push({
                        x: 60 + c * 54,
                        y: 75 + r * 36,
                        width: isAsteroid ? 34 : 30,
                        height: isAsteroid ? 28 : 22,
                        type: isAsteroid ? 2 : 1,
                        hp: isAsteroid ? 2 : 1,
                        maxHp: isAsteroid ? 2 : 1,
                        color: isAsteroid ? '#ff9900' : '#00ff66',
                        points: isAsteroid ? 200 : 100,
                        animFrame: 0
                    });
                }
            }
        } else if (lvl === 3) {
            // Level 3: Quantum Swarm (Phasing Invaders, but all die in 1 hit!)
            for (let r = 0; r < 3; r++) {
                for (let c = 0; c < 6; c++) {
                    this.invaders.push({
                        x: 60 + c * 54,
                        y: 75 + r * 36,
                        width: 28,
                        height: 22,
                        type: 3,
                        hp: 1,
                        maxHp: 1,
                        color: '#bd00ff',
                        points: 150,
                        isCloaked: false,
                        animFrame: 0
                    });
                }
            }
        } else if (lvl === 4) {
            // Level 4: Cyber Barricade (Front row has 2 Shield Drones, rest 1 HP)
            for (let r = 0; r < 3; r++) {
                for (let c = 0; c < 6; c++) {
                    const isShieldDrone = (r === 0 && (c === 2 || c === 3));
                    this.invaders.push({
                        x: 60 + c * 54,
                        y: 75 + r * 36,
                        width: isShieldDrone ? 36 : 28,
                        height: 24,
                        type: isShieldDrone ? 4 : 1,
                        hp: isShieldDrone ? 2 : 1,
                        maxHp: isShieldDrone ? 2 : 1,
                        color: isShieldDrone ? '#00f0ff' : '#ffe600',
                        points: isShieldDrone ? 250 : 120,
                        hasShield: isShieldDrone,
                        animFrame: 0
                    });
                }
            }
        } else if (lvl === 5) {
            // Level 5: Mother Mainframe Boss (Fun 25 HP fight)
            this.boss = {
                x: this.canvas.width / 2 - 60,
                y: 70,
                width: 120,
                height: 64,
                hp: 25,
                maxHp: 25,
                phase: 1,
                attackTimer: 0,
                shieldActive: false
            };
        }
    }

    private update(dt: number) {
        // Level Transition Countdown
        if (this.levelTransitionTimer > 0) {
            this.levelTransitionTimer -= dt;
        }

        const step = dt * 60; // Standard 60fps delta multiplier

        // Shield Cooldowns
        if (this.player.shieldActive) {
            this.player.shieldTimer -= dt;
            if (this.player.shieldTimer <= 0) {
                this.player.shieldActive = false;
            }
        }
        if (this.player.shieldCooldown > 0) {
            this.player.shieldCooldown -= dt;
        }
        if (this.player.invincibleTimer > 0) {
            this.player.invincibleTimer -= dt;
        }
        if (this.player.shootCooldown > 0) {
            this.player.shootCooldown -= dt;
        }

        // Player Movement (Delta-scaled)
        if (this.keys.left) {
            this.player.x = Math.max(10, this.player.x - this.player.speed * step);
        }
        if (this.keys.right) {
            this.player.x = Math.min(this.canvas.width - this.player.width - 10, this.player.x + this.player.speed * step);
        }

        // Player Shooting
        if (this.keys.shoot && this.player.shootCooldown <= 0) {
            this.shootPlayerBullet();
        }

        // Player Shield Activation
        if (this.keys.shield && this.player.shieldCooldown <= 0 && !this.player.shieldActive) {
            this.activateShield();
        }

        // EMP Activation
        if (this.keys.emp && this.empCharge >= 100) {
            this.activateEmp();
        }

        // Spawn Random UFO bonus
        if (!this.ufo && Math.random() < 0.002 && this.currentLevel < 5) {
            this.ufo = {
                x: -40,
                y: 35,
                vx: 1.8,
                active: true,
                points: 500
            };
        }

        // Update UFO (Delta-scaled)
        if (this.ufo) {
            this.ufo.x += this.ufo.vx * step;
            if (this.ufo.x > this.canvas.width + 50) {
                this.ufo = null;
            }
        }

        // Update Bullets (Delta-scaled)
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            const b = this.bullets[i];
            b.x += b.vx * step;
            b.y += b.vy * step;

            // Remove out-of-bounds bullets
            if (b.y < -10 || b.y > this.canvas.height + 10 || b.x < -10 || b.x > this.canvas.width + 10) {
                this.bullets.splice(i, 1);
                continue;
            }

            // Check Player bullet vs Invaders
            if (!b.isEnemy) {
                let bulletHit = false;

                // Hit UFO
                if (this.ufo && Math.abs(b.x - (this.ufo.x + 20)) < 24 && Math.abs(b.y - (this.ufo.y + 10)) < 16) {
                    this.addScore(this.ufo.points);
                    this.createExplosion(this.ufo.x + 20, this.ufo.y + 10, '#ffe600', 16);
                    retroAudio.playUfoBonus();
                    this.ufo = null;
                    bulletHit = true;
                }

                // Hit Boss
                if (this.boss && !bulletHit) {
                    if (
                        b.x >= this.boss.x &&
                        b.x <= this.boss.x + this.boss.width &&
                        b.y >= this.boss.y &&
                        b.y <= this.boss.y + this.boss.height
                    ) {
                        bulletHit = true;
                        const dmg = b.isParried ? 4 : (this.isGodMode ? 3 : 1);
                        this.boss.hp -= dmg;
                        this.createExplosion(b.x, b.y, '#00f0ff', 6);
                        retroAudio.playBossHit();

                        if (this.boss.hp <= 0) {
                            this.addScore(5000);
                            this.createExplosion(this.boss.x + 60, this.boss.y + 30, '#ff007f', 40);
                            this.boss = null;
                            this.triggerVictory();
                        }
                    }
                }

                // Hit Invaders
                if (!bulletHit) {
                    for (let j = this.invaders.length - 1; j >= 0; j--) {
                        const inv = this.invaders[j];
                        if (
                            b.x >= inv.x &&
                            b.x <= inv.x + inv.width &&
                            b.y >= inv.y &&
                            b.y <= inv.y + inv.height
                        ) {
                            bulletHit = true;
                            const dmg = b.isParried ? 3 : (this.isGodMode ? 2 : 1);
                            inv.hp -= dmg;
                            this.createExplosion(b.x, b.y, inv.color, 8);

                            if (inv.hp <= 0) {
                                this.addScore(inv.points);
                                this.createExplosion(inv.x + inv.width / 2, inv.y + inv.height / 2, inv.color, 16);
                                retroAudio.playExplosion();
                                this.invaders.splice(j, 1);
                                this.comboHits++;
                                this.empCharge = Math.min(100, this.empCharge + 20); // Faster charge
                            } else {
                                retroAudio.playBossHit();
                            }
                            break;
                        }
                    }
                }

                if (bulletHit) {
                    this.bullets.splice(i, 1);
                    continue;
                }
            } else {
                // Enemy Bullet vs Player & Shield
                // 1. Check Shield Collision (PARRY MECHANIC!)
                if (this.player.shieldActive) {
                    const shieldY = this.player.y - 12;
                    if (
                        Math.abs(b.x - (this.player.x + this.player.width / 2)) < 36 &&
                        Math.abs(b.y - shieldY) < 18
                    ) {
                        // DEFLECT / PARRY SUCCESS!
                        b.isEnemy = false;
                        b.isParried = true;
                        b.vy = -Math.abs(b.vy) * 1.6;
                        b.vx = (Math.random() - 0.5) * 1.5;
                        b.color = '#00ff66';
                        b.radius = 4;
                        this.addScore(150);
                        this.createExplosion(b.x, b.y, '#00ff66', 14);
                        retroAudio.playShieldParry();
                        continue;
                    }
                }

                // 2. Check Hit on Player
                if (
                    this.player.invincibleTimer <= 0 &&
                    b.x >= this.player.x + 4 &&
                    b.x <= this.player.x + this.player.width - 4 &&
                    b.y >= this.player.y + 4 &&
                    b.y <= this.player.y + this.player.height
                ) {
                    this.bullets.splice(i, 1);
                    this.hitPlayer();
                    continue;
                }
            }
        }

        // Update Invaders Movement & Attacks (Progressive shooting per level)
        if (this.invaders.length > 0) {
            let hitEdge = false;
            // 100% constant speed across all levels (stable and predictable)
            const speed = 0.40 * step;

            // Progressive bullet scaling: Level 1: 2 bullets, Level 2: 3, Level 3: 4, Level 4: 5, Level 5: 6
            const activeEnemyBullets = this.bullets.filter(b => b.isEnemy).length;
            const maxEnemyBullets = 1 + this.currentLevel;
            const shootChance = 0.0009 + (this.currentLevel * 0.0004);

            for (const inv of this.invaders) {
                inv.x += speed * this.fleetDirection;
                if (inv.x <= 8 || inv.x + inv.width >= this.canvas.width - 8) {
                    hitEdge = true;
                }

                // Quantum Swarm Cloaking
                if (inv.type === 3 && Math.random() < 0.01) {
                    inv.isCloaked = !inv.isCloaked;
                }

                // Progressive enemy shots
                if (activeEnemyBullets < maxEnemyBullets && Math.random() < shootChance) {
                    const bulletVy = 1.85 + (this.currentLevel - 1) * 0.08;
                    this.shootEnemyBullet(inv.x + inv.width / 2, inv.y + inv.height, 0, bulletVy);
                }

                // Check invasion reaching player zone
                if (inv.y + inv.height >= this.player.y) {
                    this.hitPlayer(false);
                    for (const it of this.invaders) {
                        it.y -= 35;
                    }
                }
            }

            if (hitEdge) {
                this.fleetDirection *= -1;
                for (const inv of this.invaders) {
                    inv.y += 6; // Steady gentle descent
                    inv.x += this.fleetDirection * 4; // Shift away from wall to avoid re-triggering
                }
            }
        } else if (!this.boss && this.levelTransitionTimer <= 0) {
            // Level cleared!
            if (this.currentLevel < 5) {
                this.loadLevel(this.currentLevel + 1);
                retroAudio.playVictory();
            } else {
                this.triggerVictory();
            }
        }

        // Update Boss AI (Comfortable attack pattern)
        if (this.boss) {
            this.boss.x += Math.sin(Date.now() / 900) * 1.5 * step;
            this.boss.attackTimer += dt;

            // Boss Spread Attack (every 2.8s)
            if (this.boss.attackTimer > 2.8) {
                this.boss.attackTimer = 0;
                this.shootEnemyBullet(this.boss.x + 25, this.boss.y + 55, -0.9, 1.9);
                this.shootEnemyBullet(this.boss.x + 95, this.boss.y + 55, 0.9, 1.9);
            }
        }

        // Update Particles (Delta-scaled)
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx * step;
            p.y += p.vy * step;
            p.life -= dt;
            if (p.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }

    private shootPlayerBullet() {
        this.player.shootCooldown = 0.15; // Fast responsive shooting
        const centerX = this.player.x + this.player.width / 2;
        const topY = this.player.y - 2;

        if (this.isGodMode) {
            // Golden Twin Lasers
            this.bullets.push({ x: centerX - 8, y: topY, vx: 0, vy: -10, isEnemy: false, color: '#ffe600', radius: 3 });
            this.bullets.push({ x: centerX + 8, y: topY, vx: 0, vy: -10, isEnemy: false, color: '#ffe600', radius: 3 });
        } else {
            this.bullets.push({ x: centerX, y: topY, vx: 0, vy: -9.5, isEnemy: false, color: '#00f0ff', radius: 2.5 });
        }
        retroAudio.playLaserShoot();
    }

    private shootEnemyBullet(x: number, y: number, vx: number = 0, vy: number = 1.85) {
        this.bullets.push({
            x,
            y,
            vx,
            vy,
            isEnemy: true,
            color: '#ff007f',
            radius: 2.5
        });
    }

    private activateShield() {
        this.player.shieldActive = true;
        this.player.shieldTimer = 0.65; // Forgiving 0.65s parry window
        this.player.shieldCooldown = 1.6; // Low 1.6s cooldown
    }

    private activateEmp() {
        this.empCharge = 0;
        // Wipe all enemy bullets
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            if (this.bullets[i].isEnemy) {
                this.createExplosion(this.bullets[i].x, this.bullets[i].y, '#00f0ff', 6);
                this.bullets.splice(i, 1);
            }
        }
        // Damage all invaders
        for (const inv of this.invaders) {
            inv.hp -= 2;
            this.createExplosion(inv.x + inv.width / 2, inv.y + inv.height / 2, '#00f0ff', 10);
        }
        if (this.boss) {
            this.boss.hp -= 10;
        }
        retroAudio.playEmpBlast();
        this.addScore(300);
    }

    private hitPlayer(instantKill: boolean = false) {
        if (this.isGodMode && !instantKill) return;

        this.lives--;
        this.comboHits = 0;
        this.player.invincibleTimer = 3.0; // 3 seconds invulnerability
        this.createExplosion(this.player.x + this.player.width / 2, this.player.y + this.player.height / 2, '#ff007f', 24);
        retroAudio.playExplosion();

        if (this.lives <= 0) {
            this.triggerGameOver();
        }
    }

    private addScore(pts: number) {
        this.score += pts;
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('retro_arcade_hi_score', this.highScore.toString());
        }
    }

    private createExplosion(x: number, y: number, color: string, count: number) {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const spd = Math.random() * 4 + 1;
            this.particles.push({
                x,
                y,
                vx: Math.cos(angle) * spd,
                vy: Math.sin(angle) * spd,
                color,
                life: Math.random() * 0.4 + 0.2,
                maxLife: 0.6,
                size: Math.random() * 3 + 1.5
            });
        }
    }

    private triggerGameOver() {
        this.isGameOver = true;
        retroAudio.playGameOver();
    }

    private triggerVictory() {
        this.isVictory = true;
        retroAudio.playVictory();
    }

    // --- RENDER PIPELINE ---
    private render() {
        const ctx = this.ctx;
        const w = this.canvas.width;
        const h = this.canvas.height;

        // Background
        ctx.fillStyle = '#06040d';
        ctx.fillRect(0, 0, w, h);

        // Starfield
        ctx.fillStyle = 'rgba(0, 240, 255, 0.4)';
        for (let i = 0; i < 20; i++) {
            const sx = (i * 27 + Date.now() * 0.02) % w;
            const sy = (i * 37 + Date.now() * 0.05) % h;
            ctx.fillRect(sx, sy, 1.5, 1.5);
        }

        // Draw UFO
        if (this.ufo) {
            ctx.fillStyle = '#ffe600';
            ctx.beginPath();
            ctx.ellipse(this.ufo.x + 20, this.ufo.y + 10, 18, 8, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#ff007f';
            ctx.fillRect(this.ufo.x + 12, this.ufo.y + 4, 16, 4);
        }

        // Draw Invaders
        for (const inv of this.invaders) {
            if (inv.isCloaked) {
                ctx.globalAlpha = 0.2;
            } else {
                ctx.globalAlpha = 1.0;
            }

            ctx.fillStyle = inv.color;
            // Draw pixel invader sprite
            this.drawPixelInvader(ctx, inv.x, inv.y, inv.width, inv.height, inv.type);

            // Draw shield if active
            if (inv.hasShield) {
                ctx.strokeStyle = '#00f0ff';
                ctx.lineWidth = 2;
                ctx.strokeRect(inv.x - 2, inv.y - 2, inv.width + 4, inv.height + 4);
            }
        }
        ctx.globalAlpha = 1.0;

        // Draw Boss
        if (this.boss) {
            ctx.fillStyle = '#ff007f';
            ctx.fillRect(this.boss.x, this.boss.y, this.boss.width, this.boss.height);
            ctx.fillStyle = '#ffe600';
            ctx.fillRect(this.boss.x + 15, this.boss.y + 20, this.boss.width - 30, 20);
            ctx.fillStyle = '#00f0ff';
            ctx.fillRect(this.boss.x + 45, this.boss.y + 24, 30, 12);

            // Boss HP Bar
            ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.fillRect(this.boss.x, this.boss.y - 12, this.boss.width, 6);
            ctx.fillStyle = '#00ff66';
            ctx.fillRect(this.boss.x, this.boss.y - 12, (this.boss.hp / this.boss.maxHp) * this.boss.width, 6);
        }

        // Draw Bullets
        for (const b of this.bullets) {
            ctx.fillStyle = b.color;
            ctx.shadowColor = b.color;
            ctx.shadowBlur = 6;
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.shadowBlur = 0;

        // Draw Particles
        for (const p of this.particles) {
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.life / p.maxLife;
            ctx.fillRect(p.x, p.y, p.size, p.size);
        }
        ctx.globalAlpha = 1.0;

        // Draw Player Spaceship
        if (this.player.invincibleTimer <= 0 || Math.floor(Date.now() / 100) % 2 === 0) {
            ctx.fillStyle = this.isGodMode ? '#ffe600' : '#00f0ff';
            this.drawPlayerShip(ctx, this.player.x, this.player.y, this.player.width, this.player.height);
        }

        // Draw Shield Bubble if active
        if (this.player.shieldActive) {
            ctx.strokeStyle = '#00ff66';
            ctx.lineWidth = 3;
            ctx.shadowColor = '#00ff66';
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(
                this.player.x + this.player.width / 2,
                this.player.y + this.player.height / 2,
                this.player.width * 0.9,
                0,
                Math.PI * 2
            );
            ctx.stroke();
            ctx.shadowBlur = 0;
        }

        // Draw Top HUD (Score, Level, Lives, EMP)
        this.renderHud(ctx, w, h);

        // Overlay Messages (Level transition, GameOver, Victory, Pause)
        if (this.levelTransitionTimer > 0) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
            ctx.fillRect(0, h / 2 - 40, w, 80);
            ctx.fillStyle = '#ffe600';
            ctx.font = '12px "Press Start 2P", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(this.levelTitle, w / 2, h / 2 + 5);
        }

        if (this.isGameOver) {
            this.renderGameOverModal(ctx, w, h);
        } else if (this.isVictory) {
            this.renderVictoryModal(ctx, w, h);
        } else if (this.isPaused) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillRect(0, 0, w, h);
            ctx.fillStyle = '#00f0ff';
            ctx.font = '16px "Press Start 2P", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(this.lang === 'en' ? 'PAUSED' : 'ПАУЗА', w / 2, h / 2);
        }
    }

    private drawPlayerShip(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
        ctx.beginPath();
        ctx.moveTo(x + w / 2, y);
        ctx.lineTo(x + w, y + h);
        ctx.lineTo(x + w * 0.75, y + h * 0.75);
        ctx.lineTo(x + w * 0.25, y + h * 0.75);
        ctx.lineTo(x, y + h);
        ctx.closePath();
        ctx.fill();

        // Cockpit
        ctx.fillStyle = '#ff007f';
        ctx.fillRect(x + w / 2 - 2, y + 6, 4, 6);
    }

    private drawPixelInvader(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, type: number) {
        if (type === 2) {
            // Asteroid
            ctx.beginPath();
            ctx.arc(x + w / 2, y + h / 2, w / 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#663300';
            ctx.fillRect(x + 6, y + 6, 6, 6);
        } else {
            // Alien Invader Sprite
            ctx.fillRect(x + 4, y + 2, w - 8, h - 8);
            ctx.fillRect(x, y + 6, w, h - 12);
            ctx.fillRect(x + 2, y + h - 6, 4, 6);
            ctx.fillRect(x + w - 6, y + h - 6, 4, 6);

            // Eyes
            ctx.fillStyle = '#000';
            ctx.fillRect(x + 6, y + 6, 4, 4);
            ctx.fillRect(x + w - 10, y + 6, 4, 4);
        }
    }

    private renderHud(ctx: CanvasRenderingContext2D, w: number, h: number) {
        ctx.font = '8px "Press Start 2P", monospace';
        ctx.fillStyle = '#00f0ff';
        ctx.textAlign = 'left';
        ctx.fillText(`SCORE: ${this.score}`, 12, 18);

        ctx.fillStyle = '#ffe600';
        ctx.textAlign = 'right';
        ctx.fillText(`HI: ${this.highScore}`, w - 12, 18);

        // Lives
        ctx.textAlign = 'left';
        ctx.fillStyle = '#ff007f';
        const livesText = this.isGodMode ? 'LIVES: 99 (GOD)' : `LIVES: ${'♥ '.repeat(Math.max(0, this.lives))}`;
        ctx.fillText(livesText, 12, h - 14);

        // EMP Bar
        const empW = 80;
        const empH = 8;
        const empX = w - empW - 12;
        const empY = h - 22;

        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.fillRect(empX, empY, empW, empH);
        ctx.fillStyle = this.empCharge >= 100 ? '#ffe600' : '#00f0ff';
        ctx.fillRect(empX, empY, (this.empCharge / 100) * empW, empH);
        ctx.strokeStyle = '#00f0ff';
        ctx.lineWidth = 1;
        ctx.strokeRect(empX, empY, empW, empH);

        ctx.fillStyle = '#ffe600';
        ctx.font = '6px "Press Start 2P", monospace';
        ctx.textAlign = 'right';
        ctx.fillText('EMP (Q):', empX - 6, empY + 7);
    }

    private renderGameOverModal(ctx: CanvasRenderingContext2D, w: number, h: number) {
        ctx.fillStyle = 'rgba(8, 6, 18, 0.9)';
        ctx.fillRect(0, 0, w, h);

        ctx.fillStyle = '#ff007f';
        ctx.font = '16px "Press Start 2P", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(this.lang === 'en' ? 'GAME OVER' : 'ИГРА ОКОНЧЕНА', w / 2, h / 2 - 40);

        ctx.fillStyle = '#00f0ff';
        ctx.font = '10px "Press Start 2P", monospace';
        ctx.fillText(`${this.lang === 'en' ? 'FINAL SCORE' : 'ВАШ СЧЁТ'}: ${this.score}`, w / 2, h / 2);

        ctx.fillStyle = '#ffe600';
        ctx.font = '8px "Press Start 2P", monospace';
        ctx.fillText(this.lang === 'en' ? 'PRESS FIRE TO RESTART' : 'НАЖМИТЕ ОГОНЬ ЧТОБЫ НАЧАТЬ ЗАНОВО', w / 2, h / 2 + 50);
    }

    private renderVictoryModal(ctx: CanvasRenderingContext2D, w: number, h: number) {
        ctx.fillStyle = 'rgba(8, 6, 18, 0.9)';
        ctx.fillRect(0, 0, w, h);

        ctx.fillStyle = '#00ff66';
        ctx.font = '16px "Press Start 2P", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(this.lang === 'en' ? 'VICTORY! GALAXY SAVED' : 'ПОБЕДА! ГАЛАКТИКА СПАСЕНА', w / 2, h / 2 - 40);

        ctx.fillStyle = '#ffe600';
        ctx.font = '11px "Press Start 2P", monospace';
        ctx.fillText(`${this.lang === 'en' ? 'CHAMPION SCORE' : 'РЕКОРД'}: ${this.score}`, w / 2, h / 2);

        ctx.fillStyle = '#00f0ff';
        ctx.font = '8px "Press Start 2P", monospace';
        ctx.fillText(this.lang === 'en' ? 'PRESS FIRE TO PLAY AGAIN' : 'НАЖМИТЕ ОГОНЬ ДЛЯ ПОВТОРА', w / 2, h / 2 + 50);
    }

    // --- CONTROLS SETUP ---
    private setupControls() {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'ArrowLeft' || e.code === 'KeyA') this.keys.left = true;
            if (e.code === 'ArrowRight' || e.code === 'KeyD') this.keys.right = true;
            if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
                this.keys.shoot = true;
                if (this.isGameOver || this.isVictory) {
                    this.start();
                }
            }
            if (e.code === 'ShiftLeft' || e.code === 'ShiftRight' || e.code === 'KeyE') this.keys.shield = true;
            if (e.code === 'KeyQ') this.keys.emp = true;
            if (e.code === 'KeyP') this.togglePause();
            if (e.code === 'Escape') this.stop();
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.code === 'ArrowLeft' || e.code === 'KeyA') this.keys.left = false;
            if (e.code === 'ArrowRight' || e.code === 'KeyD') this.keys.right = false;
            if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') this.keys.shoot = false;
            if (e.code === 'ShiftLeft' || e.code === 'ShiftRight' || e.code === 'KeyE') this.keys.shield = false;
            if (e.code === 'KeyQ') this.keys.emp = false;
        };

        // Direct Touch Drag / Tap on Canvas for mobile players
        let isTouchingCanvas = false;
        const handleTouchStart = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                isTouchingCanvas = true;
                const rect = this.canvas.getBoundingClientRect();
                const touchX = e.touches[0].clientX - rect.left;
                const scaleX = this.canvas.width / rect.width;
                const targetX = touchX * scaleX - this.player.width / 2;
                this.player.x = Math.max(10, Math.min(this.canvas.width - this.player.width - 10, targetX));
                this.keys.shoot = true;
                if (this.isGameOver || this.isVictory) {
                    this.start();
                }
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (isTouchingCanvas && e.touches.length > 0) {
                e.preventDefault();
                const rect = this.canvas.getBoundingClientRect();
                const touchX = e.touches[0].clientX - rect.left;
                const scaleX = this.canvas.width / rect.width;
                const targetX = touchX * scaleX - this.player.width / 2;
                this.player.x = Math.max(10, Math.min(this.canvas.width - this.player.width - 10, targetX));
            }
        };

        const handleTouchEnd = () => {
            isTouchingCanvas = false;
            this.keys.shoot = false;
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        this.canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
        this.canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
        this.canvas.addEventListener('touchend', handleTouchEnd);
        this.canvas.addEventListener('touchcancel', handleTouchEnd);

        this.cleanupListeners.push(() => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            this.canvas.removeEventListener('touchstart', handleTouchStart);
            this.canvas.removeEventListener('touchmove', handleTouchMove);
            this.canvas.removeEventListener('touchend', handleTouchEnd);
            this.canvas.removeEventListener('touchcancel', handleTouchEnd);
        });
    }

    // Touch Virtual D-Pad Helpers
    public setTouchKey(key: 'left' | 'right' | 'shoot' | 'shield' | 'emp', active: boolean) {
        this.keys[key] = active;
        if (key === 'shoot' && active && (this.isGameOver || this.isVictory)) {
            this.start();
        }
    }

    public togglePause() {
        this.isPaused = !this.isPaused;
    }

    public stop() {
        this.isRunning = false;
        if (this.animFrameId) {
            cancelAnimationFrame(this.animFrameId);
            this.animFrameId = null;
        }
        this.cleanupListeners.forEach(fn => fn());
        this.cleanupListeners = [];
        if (this.onClose) {
            this.onClose();
        }
    }
}

