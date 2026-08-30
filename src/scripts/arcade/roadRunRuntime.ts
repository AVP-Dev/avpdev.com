// src/scripts/arcade/roadRunRuntime.ts
// AVP ROAD//RUN 198X — Intuitive, High-Octane Retro Arcade Highway Racer
import { retroAudio } from '../retroAudio';

interface GameOptions {
    canvas: HTMLCanvasElement;
    lang?: 'ru' | 'en';
    onClose?: () => void;
    onGameOver?: (score: number) => void;
}

interface TrafficCar {
    lane: number;       // -1.5, -0.5, 0.5, 1.5 (lanes across road)
    x: number;          // current x position (-1.0 to 1.0)
    targetX: number;    // lane target x
    z: number;          // distance ahead (0 = player, 1000 = horizon)
    speed: number;      // km/h
    type: 'sedan' | 'truck' | 'sports' | 'taxi';
    color: string;
    width: number;
    passed: boolean;
    scoredNearMiss: boolean;
}

interface RoadItem {
    x: number;          // lane position
    z: number;          // distance ahead
    type: 'boost_pad' | 'energy_cell';
    collected: boolean;
}

interface RoadsideObject {
    x: number;          // -1.8 (left side) or +1.8 (right side)
    z: number;
    type: 'palm' | 'lamp' | 'pylon' | 'billboard';
    side: -1 | 1;
}

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    color: string;
    size: number;
}

interface FloatText {
    x: number;
    y: number;
    text: string;
    color: string;
    life: number;
    maxLife: number;
}

interface StageConfig {
    id: number;
    name: string;
    nameRu: string;
    skyTop: string;
    skyBottom: string;
    roadDark: string;
    roadLight: string;
    curbDark: string;
    curbLight: string;
    theme: 'city' | 'night' | 'grid' | 'desert' | 'express';
    trafficDensity: number;
    targetDistance: number;
}

const STAGES: StageConfig[] = [
    {
        id: 1,
        name: "NEON CITY",
        nameRu: "НЕОНОВЫЙ ГОРОД",
        skyTop: "#080418",
        skyBottom: "#2c0b48",
        roadDark: "#100c24",
        roadLight: "#181434",
        curbDark: "#ff007f",
        curbLight: "#00f0ff",
        theme: "city",
        trafficDensity: 0.7,
        targetDistance: 2400
    },
    {
        id: 2,
        name: "NIGHT HIGHWAY",
        nameRu: "НОЧНОЕ ШОССЕ",
        skyTop: "#020514",
        skyBottom: "#0b1a38",
        roadDark: "#0c1222",
        roadLight: "#121a2e",
        curbDark: "#00ff88",
        curbLight: "#00f0ff",
        theme: "night",
        trafficDensity: 1.0,
        targetDistance: 3000
    },
    {
        id: 3,
        name: "TRON GRID",
        nameRu: "ЦИФРОВАЯ СЕТКА",
        skyTop: "#01080d",
        skyBottom: "#031e24",
        roadDark: "#04161a",
        roadLight: "#08242a",
        curbDark: "#00f0ff",
        curbLight: "#ffe600",
        theme: "grid",
        trafficDensity: 1.3,
        targetDistance: 3600
    },
    {
        id: 4,
        name: "DESERT RUN",
        nameRu: "ПУСТЫННЫЙ ЗАЕЗД",
        skyTop: "#1c0410",
        skyBottom: "#4d1508",
        roadDark: "#22110a",
        roadLight: "#331a0e",
        curbDark: "#ff5500",
        curbLight: "#ffe600",
        theme: "desert",
        trafficDensity: 1.5,
        targetDistance: 4000
    },
    {
        id: 5,
        name: "AVP EXPRESS",
        nameRu: "AVP ЭКСПРЕСС (ФИНАЛ)",
        skyTop: "#0c021a",
        skyBottom: "#380838",
        roadDark: "#160528",
        roadLight: "#22083c",
        curbDark: "#ff007f",
        curbLight: "#ffe600",
        theme: "express",
        trafficDensity: 2.0,
        targetDistance: 4800
    }
];

export class RoadRunRuntime {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private lang: 'ru' | 'en';
    private onClose?: () => void;
    private onGameOver?: (score: number) => void;

    private isRunning = false;
    private isPaused = false;
    private animFrameId: number | null = null;
    private lastTime = 0;

    // Viewport Virtual Dimensions
    private readonly V_WIDTH = 480;
    private readonly V_HEIGHT = 460;
    private readonly HORIZON_Y = 160;

    // Game Core State
    private score = 0;
    private hiScore = 0;
    private currentStageIndex = 0;
    private lives = 3;
    private maxLives = 3;
    private stageDistance = 0;
    private timeRemaining = 60;
    private gameState: 'ready' | 'racing' | 'gameover' | 'victory' = 'ready';

    // Player Vehicle & Physics
    private playerX = 0;        // -0.85 (left lane) to +0.85 (right lane)
    private playerSpeed = 0;    // km/h (0 to 280)
    private steerSpeed = 2.6;
    private steerTilt = 0;      // visual tilt angle
    private readonly CRUISE_SPEED = 150;
    private readonly MAX_GAS_SPEED = 220;
    private readonly MAX_BOOST_SPEED = 290;

    // Boost Mechanism
    private boostGauge = 100;   // 0 to 100
    private isBoosting = false;

    // Track Animation State
    private roadScroll = 0;
    private roadCurve = 0;
    private targetCurve = 0;
    private curveTimer = 0;

    // Entities
    private traffic: TrafficCar[] = [];
    private roadItems: RoadItem[] = [];
    private roadside: RoadsideObject[] = [];
    private particles: Particle[] = [];
    private floatTexts: FloatText[] = [];

    // Collision FX
    private invulnerableTimer = 0;
    private screenShake = 0;

    // Input States
    private keys: Record<string, boolean> = {
        left: false,
        right: false,
        accelerate: false,
        brake: false,
        boost: false
    };

    constructor(options: GameOptions) {
        this.canvas = options.canvas;
        this.ctx = this.canvas.getContext('2d')!;
        this.lang = options.lang || 'ru';
        this.onClose = options.onClose;
        this.onGameOver = options.onGameOver;

        this.loadHighScore();
        this.initCanvasSize();
        this.bindEvents();
        this.resetGame();
    }

    private loadHighScore() {
        try {
            const saved = localStorage.getItem('retro_road_run_high_score');
            if (saved) this.hiScore = parseInt(saved, 10) || 0;
            else this.hiScore = 15000;
        } catch (e) {
            this.hiScore = 15000;
        }
    }

    private saveHighScore() {
        if (this.score > this.hiScore) {
            this.hiScore = this.score;
            try {
                localStorage.setItem('retro_road_run_high_score', this.hiScore.toString());
            } catch (e) {}
        }
    }

    private initCanvasSize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        this.canvas.width = this.V_WIDTH * dpr;
        this.canvas.height = this.V_HEIGHT * dpr;
        this.ctx.scale(dpr, dpr);
    }

    private bindEvents() {
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('keyup', this.handleKeyUp);
        this.canvas.addEventListener('touchstart', this.handleTouchStart, { passive: false });
        this.canvas.addEventListener('touchmove', this.handleTouchMove, { passive: false });
        this.canvas.addEventListener('touchend', this.handleTouchEnd, { passive: false });
    }

    private unbindEvents() {
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('keyup', this.handleKeyUp);
        this.canvas.removeEventListener('touchstart', this.handleTouchStart);
        this.canvas.removeEventListener('touchmove', this.handleTouchMove);
        this.canvas.removeEventListener('touchend', this.handleTouchEnd);
    }

    private handleKeyDown = (e: KeyboardEvent) => {
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
            e.preventDefault();
        }

        switch (e.key) {
            case 'ArrowLeft':
            case 'a':
            case 'A':
            case 'ф':
            case 'Ф':
                this.keys.left = true;
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
            case 'в':
            case 'В':
                this.keys.right = true;
                break;
            case 'ArrowUp':
            case 'w':
            case 'W':
            case 'ц':
            case 'Ц':
                this.keys.accelerate = true;
                break;
            case 'ArrowDown':
            case 's':
            case 'S':
            case 'ы':
            case 'Ы':
                this.keys.brake = true;
                break;
            case ' ':
            case 'Shift':
                this.keys.boost = true;
                break;
            case 'p':
            case 'P':
            case 'з':
            case 'З':
                this.togglePause();
                break;
            case 'Escape':
                if (this.onClose) this.onClose();
                break;
        }

        if (this.gameState === 'ready') {
            this.gameState = 'racing';
            retroAudio.playPressStart();
        } else if ((this.gameState === 'gameover' || this.gameState === 'victory') && e.key === ' ') {
            this.resetGame();
            this.gameState = 'racing';
            retroAudio.playPressStart();
        }
    };

    private handleKeyUp = (e: KeyboardEvent) => {
        switch (e.key) {
            case 'ArrowLeft':
            case 'a':
            case 'A':
            case 'ф':
            case 'Ф':
                this.keys.left = false;
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
            case 'в':
            case 'В':
                this.keys.right = false;
                break;
            case 'ArrowUp':
            case 'w':
            case 'W':
            case 'ц':
            case 'Ц':
                this.keys.accelerate = false;
                break;
            case 'ArrowDown':
            case 's':
            case 'S':
            case 'ы':
            case 'Ы':
                this.keys.brake = false;
                break;
            case ' ':
            case 'Shift':
                this.keys.boost = false;
                break;
        }
    };

    private handleTouchStart = (e: TouchEvent) => {
        e.preventDefault();
        if (this.gameState === 'ready' || this.gameState === 'gameover' || this.gameState === 'victory') {
            this.resetGame();
            this.gameState = 'racing';
            retroAudio.playPressStart();
            return;
        }
        this.processTouch(e);
    };

    private handleTouchMove = (e: TouchEvent) => {
        e.preventDefault();
        this.processTouch(e);
    };

    private handleTouchEnd = (e: TouchEvent) => {
        e.preventDefault();
        if (e.touches.length === 0) {
            this.keys.left = false;
            this.keys.right = false;
            this.keys.brake = false;
            this.keys.boost = false;
        }
    };

    private processTouch(e: TouchEvent) {
        const rect = this.canvas.getBoundingClientRect();
        const touch = e.touches[0];
        if (!touch) return;

        const touchX = (touch.clientX - rect.left) / rect.width;
        const touchY = (touch.clientY - rect.top) / rect.height;

        this.keys.left = touchX < 0.38;
        this.keys.right = touchX > 0.62;
        this.keys.boost = touchY < 0.4;
        this.keys.brake = touchY > 0.75;
    }

    public setTouchKey(key: string, state: boolean) {
        if (key === 'left') this.keys.left = state;
        if (key === 'right') this.keys.right = state;
        if (key === 'shoot' || key === 'boost' || key === 'accelerate') this.keys.boost = state;
        if (key === 'shield' || key === 'brake') this.keys.brake = state;
        if (key === 'emp') this.keys.boost = state;

        if (this.gameState === 'ready' && state) {
            this.gameState = 'racing';
            retroAudio.playPressStart();
        } else if ((this.gameState === 'gameover' || this.gameState === 'victory') && state) {
            this.resetGame();
            this.gameState = 'racing';
            retroAudio.playPressStart();
        }
    }

    public start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.isPaused = false;
        this.lastTime = performance.now();
        this.animFrameId = requestAnimationFrame(this.gameLoop);
    }

    public stop() {
        this.isRunning = false;
        if (this.animFrameId !== null) {
            cancelAnimationFrame(this.animFrameId);
            this.animFrameId = null;
        }
        this.unbindEvents();
    }

    public togglePause() {
        this.isPaused = !this.isPaused;
        if (!this.isPaused) {
            this.lastTime = performance.now();
            this.animFrameId = requestAnimationFrame(this.gameLoop);
        }
    }

    private resetGame() {
        this.score = 0;
        this.lives = this.maxLives;
        this.currentStageIndex = 0;
        this.initStage(0);
        this.gameState = 'ready';
    }

    private initStage(stageIdx: number) {
        this.currentStageIndex = stageIdx;
        const stage = STAGES[this.currentStageIndex];
        this.stageDistance = 0;
        this.timeRemaining = 65;
        this.playerX = 0;
        this.playerSpeed = this.CRUISE_SPEED;
        this.roadCurve = 0;
        this.targetCurve = 0;
        this.boostGauge = 100;
        this.isBoosting = false;
        this.traffic = [];
        this.roadItems = [];
        this.roadside = [];
        this.particles = [];
        this.floatTexts = [];
        this.invulnerableTimer = 0;

        // Seed initial roadside props
        for (let i = 0; i < 18; i++) {
            this.roadside.push({
                x: (i % 2 === 0 ? -1.85 : 1.85),
                z: 100 + i * 65,
                type: stage.theme === 'desert' ? 'palm' : stage.theme === 'grid' ? 'pylon' : 'lamp',
                side: i % 2 === 0 ? -1 : 1
            });
        }
    }

    private nextStage() {
        if (this.currentStageIndex + 1 < STAGES.length) {
            this.currentStageIndex++;
            this.score += 5000 + Math.floor(this.timeRemaining * 100);
            this.saveHighScore();
            retroAudio.playStageClear();
            this.initStage(this.currentStageIndex);
            this.gameState = 'racing';
        } else {
            this.score += 15000 + Math.floor(this.timeRemaining * 200);
            this.saveHighScore();
            this.gameState = 'victory';
            retroAudio.playVictory();
            if (this.onGameOver) this.onGameOver(this.score);
        }
    }

    private triggerGameOver() {
        this.gameState = 'gameover';
        this.saveHighScore();
        retroAudio.playGameOver();
        if (this.onGameOver) this.onGameOver(this.score);
    }

    // --- MAIN GAME LOOP ---
    private gameLoop = (currentTime: number) => {
        if (!this.isRunning) return;

        const dt = Math.min((currentTime - this.lastTime) / 1000, 0.1);
        this.lastTime = currentTime;

        if (!this.isPaused) {
            this.update(dt);
        }
        this.render();

        this.animFrameId = requestAnimationFrame(this.gameLoop);
    };

    // --- GAME UPDATE ---
    private update(dt: number) {
        if (this.gameState !== 'racing') {
            this.updateParticles(dt);
            return;
        }

        const stage = STAGES[this.currentStageIndex];

        // 1. Time countdown
        this.timeRemaining -= dt;
        if (this.timeRemaining <= 0) {
            this.triggerGameOver();
            return;
        }

        // 2. Speed and Boost Logic
        const wantsBoost = this.keys.boost && this.boostGauge > 5;
        if (wantsBoost) {
            this.isBoosting = true;
            this.boostGauge = Math.max(0, this.boostGauge - dt * 32);
            if (Math.random() < 0.35) retroAudio.playCarBoost();
        } else {
            this.isBoosting = false;
            this.boostGauge = Math.min(100, this.boostGauge + dt * 8); // passive regen
        }

        // Target speed calculation
        let targetSpeed = this.CRUISE_SPEED;
        if (this.isBoosting) {
            targetSpeed = this.MAX_BOOST_SPEED;
        } else if (this.keys.accelerate) {
            targetSpeed = this.MAX_GAS_SPEED;
        } else if (this.keys.brake) {
            targetSpeed = 70;
        }

        // Smooth acceleration/deceleration
        const accelRate = this.isBoosting ? 260 : this.keys.brake ? 350 : 180;
        if (this.playerSpeed < targetSpeed) {
            this.playerSpeed = Math.min(targetSpeed, this.playerSpeed + accelRate * dt);
        } else if (this.playerSpeed > targetSpeed) {
            this.playerSpeed = Math.max(targetSpeed, this.playerSpeed - accelRate * dt);
        }

        // 3. Player Steering Across Road (Left / Right)
        if (this.keys.left) {
            this.playerX -= this.steerSpeed * dt;
            this.steerTilt = Math.max(-1, this.steerTilt - dt * 8);
        } else if (this.keys.right) {
            this.playerX += this.steerSpeed * dt;
            this.steerTilt = Math.min(1, this.steerTilt + dt * 8);
        } else {
            this.steerTilt *= 0.75; // auto-center tilt
        }

        // Off-road curb friction
        if (Math.abs(this.playerX) > 0.82) {
            this.playerSpeed = Math.max(50, this.playerSpeed - 180 * dt);
            if (Math.random() < 0.3) this.addOffroadDust();
        }
        this.playerX = Math.max(-0.95, Math.min(0.95, this.playerX));

        // 4. Track Progression & Road Curves
        const deltaMeters = (this.playerSpeed / 3.6) * dt;
        this.stageDistance += deltaMeters;
        this.roadScroll += deltaMeters * 3.5;
        this.score += Math.floor(deltaMeters * (this.isBoosting ? 3 : 1));

        if (this.stageDistance >= stage.targetDistance) {
            this.nextStage();
            return;
        }

        // Smooth Road Curve Shifts
        this.curveTimer -= dt;
        if (this.curveTimer <= 0) {
            this.curveTimer = 3.0 + Math.random() * 4.0;
            this.targetCurve = (Math.random() - 0.5) * 1.4;
        }
        this.roadCurve += (this.targetCurve - this.roadCurve) * dt * 1.5;

        // Centrifugal slide
        this.playerX -= this.roadCurve * (this.playerSpeed / this.MAX_GAS_SPEED) * dt * 0.35;

        // 5. Update Traffic, Items, Roadside
        this.updateTraffic(dt);
        this.updateRoadside(dt, deltaMeters);
        this.updateRoadItems(dt, deltaMeters);

        // 6. Collision & Near-Miss Checks
        this.checkCollisions();

        // 7. FX Updates
        if (this.invulnerableTimer > 0) this.invulnerableTimer -= dt;
        if (this.screenShake > 0) this.screenShake = Math.max(0, this.screenShake - dt * 20);

        this.updateParticles(dt);
    }

    private updateTraffic(dt: number) {
        const stage = STAGES[this.currentStageIndex];

        // 4 distinct road lanes (-0.6, -0.2, 0.2, 0.6)
        const LANES = [-0.65, -0.22, 0.22, 0.65];

        // Spawn Traffic Cars ahead at horizon
        if (this.traffic.length < 5 * stage.trafficDensity && Math.random() < 0.04 * stage.trafficDensity) {
            const lane = LANES[Math.floor(Math.random() * LANES.length)];
            const types: Array<'sedan' | 'truck' | 'sports' | 'taxi'> = ['sedan', 'truck', 'sports', 'taxi'];
            const type = types[Math.floor(Math.random() * types.length)];
            const colors = ['#00f0ff', '#ff007f', '#ffe600', '#00ff88', '#ff7700', '#ffffff'];

            let speed = 90 + Math.random() * 40;
            if (type === 'truck') speed = 70 + Math.random() * 20;
            if (type === 'sports') speed = 135 + Math.random() * 30;

            this.traffic.push({
                lane,
                x: lane,
                targetX: lane,
                z: 1000 + Math.random() * 250,
                speed,
                type,
                color: colors[Math.floor(Math.random() * colors.length)],
                width: type === 'truck' ? 0.32 : 0.26,
                passed: false,
                scoredNearMiss: false
            });
        }

        // Move traffic relative to player
        for (let i = this.traffic.length - 1; i >= 0; i--) {
            const car = this.traffic[i];
            const relSpeed = (this.playerSpeed - car.speed) / 3.6; // m/s
            car.z -= relSpeed * dt * 28;

            // Remove traffic behind player or too far
            if (car.z < -40 || car.z > 1400) {
                this.traffic.splice(i, 1);
            }
        }
    }

    private updateRoadside(dt: number, deltaMeters: number) {
        const stage = STAGES[this.currentStageIndex];
        for (let i = this.roadside.length - 1; i >= 0; i--) {
            const obj = this.roadside[i];
            obj.z -= deltaMeters * 3.5;
            if (obj.z < 10) {
                obj.z = 1000 + Math.random() * 100;
                obj.side = Math.random() > 0.5 ? 1 : -1;
                obj.x = obj.side * 1.85;
                obj.type = stage.theme === 'desert' ? 'palm' : stage.theme === 'grid' ? 'pylon' : 'lamp';
            }
        }
    }

    private updateRoadItems(dt: number, deltaMeters: number) {
        const LANES = [-0.65, -0.22, 0.22, 0.65];

        if (this.roadItems.length < 2 && Math.random() < 0.02) {
            this.roadItems.push({
                x: LANES[Math.floor(Math.random() * LANES.length)],
                z: 950 + Math.random() * 200,
                type: Math.random() > 0.5 ? 'boost_pad' : 'energy_cell',
                collected: false
            });
        }

        for (let i = this.roadItems.length - 1; i >= 0; i--) {
            const item = this.roadItems[i];
            item.z -= deltaMeters * 3.5;
            if (item.z < -20 || item.collected) {
                this.roadItems.splice(i, 1);
            }
        }
    }

    private checkCollisions() {
        const playerZ = 30; // player distance base

        // 1. Check Traffic Collisions & Near-Misses
        for (const car of this.traffic) {
            const dz = Math.abs(car.z - playerZ);
            const dx = Math.abs(car.x - this.playerX);

            if (dz < 35 && dx < 0.26) {
                // Direct Hit!
                if (this.invulnerableTimer <= 0) {
                    this.handleCrash();
                    break;
                }
            } else if (dz < 40 && dx >= 0.26 && dx < 0.55 && !car.scoredNearMiss && car.z <= playerZ) {
                // Near Miss Reward!
                car.scoredNearMiss = true;
                const points = 250 * (this.isBoosting ? 2 : 1);
                this.score += points;
                this.boostGauge = Math.min(100, this.boostGauge + 20);
                retroAudio.playNearMiss();
                this.addFloatText(this.V_WIDTH / 2, this.V_HEIGHT * 0.65, `NEAR MISS +${points}!`, '#ffe600');
            }
        }

        // 2. Check Item Pickups
        for (const item of this.roadItems) {
            if (item.collected) continue;
            const dz = Math.abs(item.z - playerZ);
            const dx = Math.abs(item.x - this.playerX);

            if (dz < 35 && dx < 0.32) {
                item.collected = true;
                if (item.type === 'boost_pad') {
                    this.boostGauge = 100;
                    this.isBoosting = true;
                    this.playerSpeed = this.MAX_BOOST_SPEED;
                    retroAudio.playCarBoost();
                    this.addFloatText(this.V_WIDTH / 2, this.V_HEIGHT * 0.6, '⚡ TURBO NITRO! ⚡', '#00ff88');
                } else {
                    this.score += 500;
                    this.boostGauge = Math.min(100, this.boostGauge + 35);
                    retroAudio.play1Up();
                    this.addFloatText(this.V_WIDTH / 2, this.V_HEIGHT * 0.6, '+500 DATA CELL', '#00f0ff');
                }
            }
        }
    }

    private handleCrash() {
        this.lives--;
        this.invulnerableTimer = 2.0;
        this.screenShake = 16;
        this.playerSpeed = 60;
        this.isBoosting = false;

        retroAudio.playExplosion();
        this.addCrashExplosion();

        if (this.lives <= 0) {
            this.triggerGameOver();
        }
    }

    private addCrashExplosion() {
        const carScreenX = this.getScreenX(this.playerX, 30);
        const carScreenY = this.getScreenY(30);

        for (let i = 0; i < 40; i++) {
            const angle = Math.random() * Math.PI * 2;
            const spd = 50 + Math.random() * 160;
            this.particles.push({
                x: carScreenX,
                y: carScreenY,
                vx: Math.cos(angle) * spd,
                vy: Math.sin(angle) * spd,
                life: 0.6 + Math.random() * 0.4,
                maxLife: 1.0,
                color: ['#ff007f', '#ffe600', '#00f0ff', '#ffffff'][Math.floor(Math.random() * 4)],
                size: 3 + Math.random() * 5
            });
        }
    }

    private addOffroadDust() {
        const carScreenX = this.getScreenX(this.playerX, 30);
        const carScreenY = this.getScreenY(30) + 15;

        this.particles.push({
            x: carScreenX + (this.playerX > 0 ? 20 : -20),
            y: carScreenY,
            vx: (this.playerX > 0 ? 1 : -1) * (20 + Math.random() * 40),
            vy: -20 - Math.random() * 30,
            life: 0.35,
            maxLife: 0.35,
            color: '#ff5500',
            size: 4 + Math.random() * 4
        });
    }

    private addFloatText(x: number, y: number, text: string, color: string) {
        this.floatTexts.push({ x, y, text, color, life: 0.85, maxLife: 0.85 });
    }

    private updateParticles(dt: number) {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.life -= dt;
            if (p.life <= 0) this.particles.splice(i, 1);
        }

        for (let i = this.floatTexts.length - 1; i >= 0; i--) {
            const ft = this.floatTexts[i];
            ft.y -= dt * 45;
            ft.life -= dt;
            if (ft.life <= 0) this.floatTexts.splice(i, 1);
        }
    }

    // --- PROJECTION GEOMETRY ---
    // Maps track distance (z: 0 to 1000) and lane offset (x: -1 to 1) directly to screen coords
    private getScreenY(z: number): number {
        const progress = Math.max(0, Math.min(1, 1 - z / 1000));
        return this.HORIZON_Y + (this.V_HEIGHT - this.HORIZON_Y) * Math.pow(progress, 1.6);
    }

    private getRoadWidth(screenY: number): number {
        const progress = (screenY - this.HORIZON_Y) / (this.V_HEIGHT - this.HORIZON_Y);
        return 35 + (this.V_WIDTH * 0.88 - 35) * Math.pow(Math.max(0, progress), 1.5);
    }

    private getRoadCenterX(screenY: number): number {
        const progress = (screenY - this.HORIZON_Y) / (this.V_HEIGHT - this.HORIZON_Y);
        const curveOffset = Math.sin(progress * Math.PI) * this.roadCurve * 65;
        return this.V_WIDTH / 2 + curveOffset;
    }

    private getScreenX(laneX: number, z: number): number {
        const sy = this.getScreenY(z);
        const cx = this.getRoadCenterX(sy);
        const rw = this.getRoadWidth(sy);
        return cx + laneX * (rw * 0.45);
    }

    // --- RENDER ENGINE ---
    private render() {
        this.ctx.save();

        if (this.screenShake > 0) {
            const dx = (Math.random() - 0.5) * this.screenShake;
            const dy = (Math.random() - 0.5) * this.screenShake;
            this.ctx.translate(dx, dy);
        }

        // Clear background
        this.ctx.fillStyle = '#06040d';
        this.ctx.fillRect(0, 0, this.V_WIDTH, this.V_HEIGHT);

        const stage = STAGES[this.currentStageIndex];

        // 1. Sky & Parallax Skyline
        this.renderSky(stage);

        // 2. 3D Perspective Highway with distinct 4 lanes
        this.renderRoad(stage);

        // 3. Roadside Scenery (Lamps / Palms / Pylons)
        this.renderRoadside();

        // 4. Boost Pads & Data Cells
        this.renderRoadItems();

        // 5. Traffic Vehicles (Sorted by distance)
        this.renderTraffic();

        // 6. Player Cyber-Car (Visibly moves left/right across lanes)
        this.renderPlayer();

        // 7. Particles & Popups
        this.renderParticles();

        // 8. Speed lines during boost
        if (this.isBoosting) {
            this.renderSpeedLines();
        }

        // 9. HUD Overlay
        this.renderHUD(stage);

        // 10. Start / Game Over Overlays
        this.renderScreenOverlays(stage);

        this.ctx.restore();
    }

    private renderSky(stage: StageConfig) {
        const grad = this.ctx.createLinearGradient(0, 0, 0, this.HORIZON_Y);
        grad.addColorStop(0, stage.skyTop);
        grad.addColorStop(1, stage.skyBottom);
        this.ctx.fillStyle = grad;
        this.ctx.fillRect(0, 0, this.V_WIDTH, this.HORIZON_Y);

        const shiftX = this.roadCurve * 35;

        if (stage.theme === 'desert') {
            // Neon Sun
            const sunX = this.V_WIDTH / 2 + shiftX * 0.5;
            const sunY = this.HORIZON_Y - 20;
            const r = 50;

            const sunGrad = this.ctx.createLinearGradient(0, sunY - r, 0, sunY + r);
            sunGrad.addColorStop(0, '#ffe600');
            sunGrad.addColorStop(0.7, '#ff007f');
            sunGrad.addColorStop(1, '#6600cc');

            this.ctx.fillStyle = sunGrad;
            this.ctx.beginPath();
            this.ctx.arc(sunX, sunY, r, 0, Math.PI * 2);
            this.ctx.fill();

            // Horizontal stripes
            this.ctx.fillStyle = stage.skyBottom;
            for (let i = 0; i < 5; i++) {
                const sy = sunY + 6 + i * 7;
                this.ctx.fillRect(sunX - r, sy, r * 2, 2.5 + i * 0.8);
            }
        } else {
            // City Skyline / Mountains
            this.ctx.fillStyle = '#0f0722';
            const buildings = [
                { x: 30, w: 40, h: 65 }, { x: 80, w: 45, h: 95 }, { x: 135, w: 35, h: 50 },
                { x: 180, w: 55, h: 105 }, { x: 245, w: 40, h: 75 }, { x: 295, w: 35, h: 60 },
                { x: 340, w: 60, h: 90 }, { x: 410, w: 45, h: 70 }
            ];
            for (const b of buildings) {
                const bx = b.x + shiftX * 0.6;
                this.ctx.fillRect(bx, this.HORIZON_Y - b.h, b.w, b.h);
                this.ctx.fillStyle = '#00f0ff';
                this.ctx.fillRect(bx + b.w / 2 - 1, this.HORIZON_Y - b.h - 6, 2, 6);
                this.ctx.fillStyle = '#0f0722';
            }
        }

        // Horizon Line
        this.ctx.fillStyle = '#00f0ff';
        this.ctx.shadowColor = '#00f0ff';
        this.ctx.shadowBlur = 8;
        this.ctx.fillRect(0, this.HORIZON_Y - 1, this.V_WIDTH, 2);
        this.ctx.shadowBlur = 0;
    }

    private renderRoad(stage: StageConfig) {
        const totalScanlines = this.V_HEIGHT - this.HORIZON_Y;

        for (let i = 0; i < totalScanlines; i += 2) {
            const y = this.HORIZON_Y + i;
            const rw = this.getRoadWidth(y);
            const cx = this.getRoadCenterX(y);

            const progress = i / totalScanlines;
            const stripeIdx = Math.floor(this.roadScroll * 0.4 + Math.pow(progress, 0.45) * 18) % 2;
            const isAlt = stripeIdx === 0;

            // Ground Shoulder
            this.ctx.fillStyle = isAlt ? '#06030c' : '#0b0617';
            this.ctx.fillRect(0, y, this.V_WIDTH, 2);

            // Rumble Strips / Curbs
            const curbW = Math.max(3, rw * 0.08);
            this.ctx.fillStyle = isAlt ? stage.curbLight : stage.curbDark;
            this.ctx.fillRect(cx - rw / 2 - curbW, y, curbW, 2);
            this.ctx.fillRect(cx + rw / 2, y, curbW, 2);

            // Road Asphalt
            this.ctx.fillStyle = isAlt ? stage.roadLight : stage.roadDark;
            this.ctx.fillRect(cx - rw / 2, y, rw, 2);

            // 4 Distinct Lanes: 3 Dashed White/Yellow Dividers
            if (isAlt && progress > 0.12) {
                const dashW = Math.max(1.5, rw * 0.012);
                this.ctx.fillStyle = '#ffe600';
                // Center lane divider
                this.ctx.fillRect(cx - dashW / 2, y, dashW, 2);
                // Left lane divider
                this.ctx.fillRect(cx - rw * 0.23 - dashW / 2, y, dashW * 0.8, 2);
                // Right lane divider
                this.ctx.fillRect(cx + rw * 0.23 - dashW / 2, y, dashW * 0.8, 2);
            }
        }
    }

    private renderRoadside() {
        const sorted = [...this.roadside].sort((a, b) => b.z - a.z);

        for (const obj of sorted) {
            if (obj.z < 20 || obj.z > 950) continue;
            const sy = this.getScreenY(obj.z);
            const cx = this.getRoadCenterX(sy);
            const rw = this.getRoadWidth(sy);
            const sx = cx + obj.x * (rw * 0.5);

            const scale = (1 - obj.z / 1000);
            const size = Math.max(8, 48 * scale);

            this.ctx.save();
            this.ctx.translate(sx, sy);

            if (obj.type === 'lamp') {
                this.ctx.strokeStyle = '#00f0ff';
                this.ctx.lineWidth = Math.max(1, 2.5 * scale);
                this.ctx.beginPath();
                this.ctx.moveTo(0, 0);
                this.ctx.lineTo(0, -size);
                this.ctx.lineTo(obj.side * (size * 0.35), -size);
                this.ctx.stroke();

                this.ctx.fillStyle = '#ffe600';
                this.ctx.beginPath();
                this.ctx.arc(obj.side * (size * 0.35), -size, Math.max(2, 4 * scale), 0, Math.PI * 2);
                this.ctx.fill();
            } else {
                this.ctx.fillStyle = '#ff007f';
                this.ctx.fillRect(-size * 0.2, -size, size * 0.4, size);
            }

            this.ctx.restore();
        }
    }

    private renderRoadItems() {
        for (const item of this.roadItems) {
            if (item.collected || item.z < 20 || item.z > 950) continue;
            const sx = this.getScreenX(item.x, item.z);
            const sy = this.getScreenY(item.z);
            const scale = (1 - item.z / 1000);
            const size = Math.max(10, 36 * scale);

            this.ctx.save();
            this.ctx.translate(sx, sy);

            if (item.type === 'boost_pad') {
                // Bright Green Turbo Arrow
                this.ctx.fillStyle = '#00ff88';
                this.ctx.shadowColor = '#00ff88';
                this.ctx.shadowBlur = 10 * scale;
                this.ctx.beginPath();
                this.ctx.moveTo(0, -size * 0.7);
                this.ctx.lineTo(size * 0.5, size * 0.3);
                this.ctx.lineTo(-size * 0.5, size * 0.3);
                this.ctx.closePath();
                this.ctx.fill();
            } else {
                // Spinning Cyan Data Orb
                this.ctx.fillStyle = '#00f0ff';
                this.ctx.shadowColor = '#00f0ff';
                this.ctx.shadowBlur = 12 * scale;
                this.ctx.beginPath();
                this.ctx.arc(0, -size * 0.4, size * 0.3, 0, Math.PI * 2);
                this.ctx.fill();
            }

            this.ctx.restore();
        }
    }

    private renderTraffic() {
        const sorted = [...this.traffic].sort((a, b) => b.z - a.z);

        for (const car of sorted) {
            if (car.z < 10 || car.z > 950) continue;
            const sx = this.getScreenX(car.x, car.z);
            const sy = this.getScreenY(car.z);
            const scale = Math.pow(1 - car.z / 1000, 1.3);

            const w = Math.max(14, 52 * scale);
            const h = Math.max(9, 30 * scale);

            this.ctx.save();
            this.ctx.translate(sx, sy);

            // Car Shadow
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.fillRect(-w * 0.55, -2, w * 1.1, 6 * scale);

            // Chassis
            this.ctx.fillStyle = car.color;
            this.ctx.fillRect(-w / 2, -h, w, h);

            // Cockpit Roof
            this.ctx.fillStyle = '#0a0518';
            this.ctx.fillRect(-w * 0.32, -h * 1.35, w * 0.64, h * 0.45);

            // Taillights
            this.ctx.fillStyle = '#ff0033';
            this.ctx.shadowColor = '#ff0033';
            this.ctx.shadowBlur = 8 * scale;
            this.ctx.fillRect(-w * 0.44, -h * 0.7, w * 0.28, h * 0.32);
            this.ctx.fillRect(w * 0.16, -h * 0.7, w * 0.28, h * 0.32);

            // License plate
            this.ctx.fillStyle = '#ffe600';
            this.ctx.shadowBlur = 0;
            this.ctx.fillRect(-w * 0.15, -h * 0.45, w * 0.3, h * 0.25);

            this.ctx.restore();
        }
    }

    private renderPlayer() {
        if (this.invulnerableTimer > 0 && Math.floor(this.invulnerableTimer * 10) % 2 === 0) {
            return;
        }

        // Exact Player Screen Position: mapped directly from playerX (-0.85 to +0.85)
        const carScreenX = this.getScreenX(this.playerX, 30);
        const carScreenY = this.getScreenY(30);

        const w = 64;
        const h = 34;
        const tilt = this.steerTilt * 8;

        this.ctx.save();
        this.ctx.translate(carScreenX, carScreenY);
        this.ctx.rotate((tilt * Math.PI) / 180);

        // Boost Motion Ghost Trail
        if (this.isBoosting) {
            this.ctx.fillStyle = 'rgba(0, 240, 255, 0.35)';
            this.ctx.fillRect(-w / 2 - 5, -h + 6, w + 10, h);
            this.ctx.fillStyle = 'rgba(255, 0, 127, 0.35)';
            this.ctx.fillRect(-w / 2 + 5, -h + 12, w - 10, h);
        }

        // 1. Neon Underglow
        this.ctx.shadowColor = this.isBoosting ? '#00f0ff' : '#ff007f';
        this.ctx.shadowBlur = this.isBoosting ? 24 : 14;
        this.ctx.fillStyle = this.isBoosting ? 'rgba(0, 240, 255, 0.45)' : 'rgba(255, 0, 127, 0.35)';
        this.ctx.fillRect(-w * 0.55, -4, w * 1.1, 10);
        this.ctx.shadowBlur = 0;

        // 2. Red Synthwave Chassis
        const carGrad = this.ctx.createLinearGradient(0, -h, 0, 0);
        carGrad.addColorStop(0, '#ff0055');
        carGrad.addColorStop(0.5, '#d40047');
        carGrad.addColorStop(1, '#990033');
        this.ctx.fillStyle = carGrad;
        this.ctx.fillRect(-w / 2, -h, w, h);

        // 3. Wide Fenders & Spoiler
        this.ctx.fillStyle = '#ffe600';
        this.ctx.fillRect(-w / 2 - 3, -h * 0.75, 4, h * 0.7);
        this.ctx.fillRect(w / 2 - 1, -h * 0.75, 4, h * 0.7);

        // 4. Cockpit Roof & Cyber Tint
        this.ctx.fillStyle = '#06030c';
        this.ctx.fillRect(-w * 0.32, -h - 10, w * 0.64, 12);
        this.ctx.fillStyle = '#00f0ff';
        this.ctx.fillRect(-w * 0.26, -h - 8, w * 0.52, 7);

        // 5. Dual Neon Tail Lights
        this.ctx.fillStyle = '#ff0033';
        this.ctx.shadowColor = '#ff0033';
        this.ctx.shadowBlur = 10;
        this.ctx.fillRect(-w * 0.44, -h * 0.65, w * 0.32, 7);
        this.ctx.fillRect(w * 0.12, -h * 0.65, w * 0.32, 7);

        // 6. Plate
        this.ctx.fillStyle = '#ffe600';
        this.ctx.shadowBlur = 0;
        this.ctx.font = '7px monospace';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('AVP-99', 0, -h * 0.25);

        // 7. Exhaust Flames
        if (this.playerSpeed > 40) {
            const flameLen = this.isBoosting ? 28 + Math.random() * 12 : 8 + Math.random() * 6;
            this.ctx.fillStyle = this.isBoosting ? '#00f0ff' : '#ffe600';
            this.ctx.shadowColor = this.ctx.fillStyle;
            this.ctx.shadowBlur = 12;

            this.ctx.beginPath();
            this.ctx.moveTo(-w * 0.3, 0);
            this.ctx.lineTo(-w * 0.22, 0);
            this.ctx.lineTo(-w * 0.26, flameLen);
            this.ctx.fill();

            this.ctx.beginPath();
            this.ctx.moveTo(w * 0.22, 0);
            this.ctx.lineTo(w * 0.3, 0);
            this.ctx.lineTo(w * 0.26, flameLen);
            this.ctx.fill();
        }

        this.ctx.restore();
    }

    private renderParticles() {
        for (const p of this.particles) {
            this.ctx.fillStyle = p.color;
            this.ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
        }

        this.ctx.font = '10px "Press Start 2P", monospace';
        this.ctx.textAlign = 'center';
        for (const ft of this.floatTexts) {
            this.ctx.fillStyle = ft.color;
            this.ctx.shadowColor = ft.color;
            this.ctx.shadowBlur = 8;
            this.ctx.fillText(ft.text, ft.x, ft.y);
        }
        this.ctx.shadowBlur = 0;
    }

    private renderSpeedLines() {
        this.ctx.strokeStyle = 'rgba(0, 240, 255, 0.45)';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        for (let i = 0; i < 18; i++) {
            const angle = Math.random() * Math.PI * 2;
            const r1 = 80 + Math.random() * 60;
            const r2 = r1 + 70 + Math.random() * 90;
            const cx = this.V_WIDTH / 2;
            const cy = this.HORIZON_Y + 40;
            this.ctx.moveTo(cx + Math.cos(angle) * r1, cy + Math.sin(angle) * r1);
            this.ctx.lineTo(cx + Math.cos(angle) * r2, cy + Math.sin(angle) * r2);
        }
        this.ctx.stroke();
    }

    private renderHUD(stage: StageConfig) {
        this.ctx.font = '8px "Press Start 2P", monospace';

        // Top Bar
        this.ctx.fillStyle = 'rgba(8, 6, 16, 0.88)';
        this.ctx.fillRect(0, 0, this.V_WIDTH, 26);
        this.ctx.fillStyle = '#00f0ff';
        this.ctx.fillRect(0, 26, this.V_WIDTH, 1);

        // Score
        this.ctx.fillStyle = '#ffe600';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(`SCORE: ${this.score.toLocaleString()}`, 10, 16);

        // High Score
        this.ctx.fillStyle = '#ff007f';
        this.ctx.textAlign = 'right';
        this.ctx.fillText(`HI: ${Math.max(this.score, this.hiScore).toLocaleString()}`, this.V_WIDTH - 10, 16);

        // Stage
        this.ctx.fillStyle = '#00f0ff';
        this.ctx.textAlign = 'center';
        const stageLabel = this.lang === 'ru' ? `STG 0${stage.id}: ${stage.nameRu}` : `STG 0${stage.id}: ${stage.name}`;
        this.ctx.fillText(stageLabel, this.V_WIDTH / 2, 16);

        // Lower HUD
        const hudY = this.V_HEIGHT - 12;

        // Speed
        this.ctx.textAlign = 'left';
        this.ctx.fillStyle = this.isBoosting ? '#00ff88' : '#ffffff';
        this.ctx.fillText(`SPD: ${Math.floor(this.playerSpeed)} KM/H`, 10, hudY);

        // Time
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = this.timeRemaining < 15 ? '#ff0044' : '#ffe600';
        this.ctx.fillText(`TIME: ${Math.ceil(this.timeRemaining)}S`, this.V_WIDTH / 2, hudY);

        // Armor
        this.ctx.textAlign = 'right';
        let hearts = '';
        for (let i = 0; i < this.maxLives; i++) {
            hearts += i < this.lives ? '♥' : '♡';
        }
        this.ctx.fillStyle = '#ff0055';
        this.ctx.fillText(`ARMOR: ${hearts}`, this.V_WIDTH - 10, hudY);

        // Boost Gauge
        this.ctx.fillStyle = 'rgba(10, 8, 22, 0.85)';
        this.ctx.fillRect(10, 32, 110, 12);
        this.ctx.strokeStyle = '#00f0ff';
        this.ctx.strokeRect(10, 32, 110, 12);

        const boostGrad = this.ctx.createLinearGradient(12, 0, 118, 0);
        boostGrad.addColorStop(0, '#ff007f');
        boostGrad.addColorStop(1, '#00f0ff');
        this.ctx.fillStyle = boostGrad;
        this.ctx.fillRect(12, 34, (this.boostGauge / 100) * 106, 8);

        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '6px "Press Start 2P", monospace';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`BOOST ${Math.floor(this.boostGauge)}%`, 65, 41);

        // Progress Distance
        const progressPct = Math.min(100, Math.floor((this.stageDistance / stage.targetDistance) * 100));
        this.ctx.fillStyle = 'rgba(10, 8, 22, 0.85)';
        this.ctx.fillRect(this.V_WIDTH - 120, 32, 110, 12);
        this.ctx.strokeStyle = '#ffe600';
        this.ctx.strokeRect(this.V_WIDTH - 120, 32, 110, 12);

        this.ctx.fillStyle = '#ffe600';
        this.ctx.fillRect(this.V_WIDTH - 118, 34, (progressPct / 100) * 106, 8);

        this.ctx.fillStyle = '#000000';
        this.ctx.fillText(`FINISH ${progressPct}%`, this.V_WIDTH - 65, 41);
    }

    private renderScreenOverlays(stage: StageConfig) {
        if (this.gameState === 'ready') {
            this.ctx.fillStyle = 'rgba(8, 6, 18, 0.88)';
            this.ctx.fillRect(35, 90, this.V_WIDTH - 70, 245);
            this.ctx.strokeStyle = '#00f0ff';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(35, 90, this.V_WIDTH - 70, 245);

            this.ctx.font = '13px "Press Start 2P", monospace';
            this.ctx.fillStyle = '#ff007f';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('AVP ROAD//RUN 198X', this.V_WIDTH / 2, 120);

            this.ctx.font = '8px "Press Start 2P", monospace';
            this.ctx.fillStyle = '#00f0ff';
            this.ctx.fillText(`STAGE 01: ${stage.nameRu}`, this.V_WIDTH / 2, 142);

            this.ctx.fillStyle = '#ffffff';
            this.ctx.fillText(this.lang === 'ru' ? '◀ A / D ▶  РУЛИТЬ ПО ПОЛОСАМ' : '◀ A / D ▶  STEER BETWEEN LANES', this.V_WIDTH / 2, 175);
            this.ctx.fillText(this.lang === 'ru' ? '▲ W / ↑    ГАЗ (СКОРОСТЬ)' : '▲ W / UP   THROTTLE (SPEED)', this.V_WIDTH / 2, 198);
            this.ctx.fillText(this.lang === 'ru' ? '⚡ SPACE   НИТРО BOOST' : '⚡ SPACE   NITRO BOOST', this.V_WIDTH / 2, 221);
            this.ctx.fillText(this.lang === 'ru' ? '▼ S / ↓    ТОРМОЗ' : '▼ S / DOWN BRAKE', this.V_WIDTH / 2, 244);
            this.ctx.fillText(this.lang === 'ru' ? '★ ОБГОНЯЙ ВПЛОТНУЮ ДЛЯ NEAR MISS!' : '★ PASS CLOSE FOR NEAR MISS BONUS!', this.V_WIDTH / 2, 270);

            this.ctx.fillStyle = '#ffe600';
            this.ctx.fillText(this.lang === 'ru' ? '▶ НАЖМИ ГАЗ ИЛИ SPACE ДЛЯ СТАРТА ◀' : '▶ PRESS GAS OR SPACE TO START ◀', this.V_WIDTH / 2, 305);
        } else if (this.gameState === 'gameover') {
            this.ctx.fillStyle = 'rgba(14, 4, 12, 0.92)';
            this.ctx.fillRect(40, 110, this.V_WIDTH - 80, 200);
            this.ctx.strokeStyle = '#ff0055';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(40, 110, this.V_WIDTH - 80, 200);

            this.ctx.font = '14px "Press Start 2P", monospace';
            this.ctx.fillStyle = '#ff0055';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('GAME OVER', this.V_WIDTH / 2, 150);

            this.ctx.font = '9px "Press Start 2P", monospace';
            this.ctx.fillStyle = '#ffe600';
            this.ctx.fillText(`FINAL SCORE: ${this.score.toLocaleString()}`, this.V_WIDTH / 2, 185);

            this.ctx.fillStyle = '#00f0ff';
            this.ctx.fillText(`HI-SCORE: ${this.hiScore.toLocaleString()}`, this.V_WIDTH / 2, 210);

            this.ctx.fillStyle = '#ffffff';
            this.ctx.fillText(this.lang === 'ru' ? '▶ SPACE — ПОПРОБОВАТЬ СНОВА' : '▶ PRESS SPACE TO RETRY', this.V_WIDTH / 2, 260);
        } else if (this.gameState === 'victory') {
            this.ctx.fillStyle = 'rgba(4, 14, 20, 0.94)';
            this.ctx.fillRect(40, 95, this.V_WIDTH - 80, 230);
            this.ctx.strokeStyle = '#00ff88';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(40, 95, this.V_WIDTH - 80, 230);

            this.ctx.font = '13px "Press Start 2P", monospace';
            this.ctx.fillStyle = '#00ff88';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('🏆 RACE COMPLETE! 🏆', this.V_WIDTH / 2, 130);

            this.ctx.font = '8px "Press Start 2P", monospace';
            this.ctx.fillStyle = '#ffe600';
            this.ctx.fillText('AVP EXPRESS CHAMPION', this.V_WIDTH / 2, 155);

            this.ctx.fillStyle = '#ffffff';
            this.ctx.fillText(`FINAL SCORE: ${this.score.toLocaleString()}`, this.V_WIDTH / 2, 185);
            this.ctx.fillText(`TIME BONUS: +${Math.floor(this.timeRemaining * 200)}`, this.V_WIDTH / 2, 205);

            this.ctx.fillStyle = '#00f0ff';
            this.ctx.fillText(`HI-SCORE: ${this.hiScore.toLocaleString()}`, this.V_WIDTH / 2, 230);

            this.ctx.fillStyle = '#ff007f';
            this.ctx.fillText(this.lang === 'ru' ? '▶ SPACE — ИГРАТЬ СНОВА' : '▶ PRESS SPACE TO RESTART', this.V_WIDTH / 2, 275);
        }
    }
}
