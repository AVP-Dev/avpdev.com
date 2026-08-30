// src/scripts/retroAchievements.ts
// Retro Mode Achievements Engine for AVPdev

export interface Achievement {
    id: string;
    titleRu: string;
    titleEn: string;
    descRu: string;
    descEn: string;
    icon: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export const ACHIEVEMENTS: Record<string, Achievement> = {
    'retro_pilot': {
        id: 'retro_pilot',
        titleRu: 'РЕТРО-ПИЛОТ',
        titleEn: 'RETRO PILOT',
        descRu: 'Активирован визуальный кибер-режим Retro Mode',
        descEn: 'Activated Retro Mode cyber experience',
        icon: '👾',
        rarity: 'common'
    },
    'chiptune_lover': {
        id: 'chiptune_lover',
        titleRu: 'ЧИПТЮН-ЗНАТОК',
        titleEn: 'CHIPTUNE CONNOISSEUR',
        descRu: 'Прослушано 3 разных 8-битных трека',
        descEn: 'Listened to 3 different 8-bit tracks',
        icon: '🎵',
        rarity: 'rare'
    },
    'terminal_hacker': {
        id: 'terminal_hacker',
        titleRu: 'ROOT ХАКЕР',
        titleEn: 'ROOT HACKER',
        descRu: 'Выполнено 3 команды в терминале AVP-OS',
        descEn: 'Executed 3 commands in AVP-OS terminal',
        icon: '💻',
        rarity: 'rare'
    },
    'space_ace': {
        id: 'space_ace',
        titleRu: 'АС КОСМОСА',
        titleEn: 'GALAXY DEFENDER',
        descRu: 'Набрано 3 000+ очков в ретро-аркаде',
        descEn: 'Scored 3,000+ points in retro arcade',
        icon: '🚀',
        rarity: 'epic'
    },
    'god_mode': {
        id: 'god_mode',
        titleRu: 'РЕЖИМ БОГА',
        titleEn: 'GOD MODE UNLOCKED',
        descRu: 'Активирован секретный код Konami (↑↑↓↓←→←→BA)',
        descEn: 'Activated legendary Konami cheat code',
        icon: '⭐',
        rarity: 'legendary'
    },
    'caffeine': {
        id: 'caffeine',
        titleRu: 'КОФЕЙНЫЙ ОВЕРДРАЙВ',
        titleEn: 'JAVA OVERDRIVE',
        descRu: 'Сварен кофе в терминале (команда coffee)',
        descEn: 'Brewed artisan coffee in CLI terminal',
        icon: '☕',
        rarity: 'common'
    },
    'insert_coin': {
        id: 'insert_coin',
        titleRu: 'ВСТАВЬТЕ МОНЕТКУ',
        titleEn: 'INSERT COIN',
        descRu: 'Спасён таймер на странице 404 и получен промокод',
        descEn: 'Rescued countdown on 404 and claimed secret bonus',
        icon: '🪙',
        rarity: 'rare'
    },
    'quest_accepted': {
        id: 'quest_accepted',
        titleRu: 'КВЕСТ ПРИНЯТ',
        titleEn: 'QUEST ACCEPTED',
        descRu: 'Открыт конфигуратор проекта /brief/',
        descEn: 'Opened online project configurator /brief/',
        icon: '📜',
        rarity: 'common'
    }
};

const STORAGE_KEY = 'avp_retro_achievements';
const TRACKS_KEY = 'avp_retro_tracks_played';
const CMDS_KEY = 'avp_retro_cmds_count';

export class RetroAchievementManager {
    private static instance: RetroAchievementManager | null = null;
    private unlocked: Set<string> = new Set();
    private toastQueue: Achievement[] = [];
    private isShowingToast: boolean = false;

    private constructor() {
        this.loadUnlocked();
    }

    public static getInstance(): RetroAchievementManager {
        if (!RetroAchievementManager.instance) {
            RetroAchievementManager.instance = new RetroAchievementManager();
        }
        return RetroAchievementManager.instance;
    }

    private loadUnlocked() {
        try {
            if (typeof localStorage !== 'undefined') {
                const raw = localStorage.getItem(STORAGE_KEY);
                if (raw) {
                    const parsed = JSON.parse(raw);
                    if (Array.isArray(parsed)) {
                        this.unlocked = new Set(parsed);
                    }
                }
            }
        } catch (e) {}
    }

    private saveUnlocked() {
        try {
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(this.unlocked)));
            }
        } catch (e) {}
    }

    public isUnlocked(id: string): boolean {
        return this.unlocked.has(id);
    }

    public getUnlockedCount(): number {
        return this.unlocked.size;
    }

    public getTotalCount(): number {
        return Object.keys(ACHIEVEMENTS).length;
    }

    public getUnlockedList(): string[] {
        return Array.from(this.unlocked);
    }

    public unlock(id: string) {
        if (this.unlocked.has(id)) return;
        const ach = ACHIEVEMENTS[id];
        if (!ach) return;

        this.unlocked.add(id);
        this.saveUnlocked();

        // Dispatch custom event for UI updates
        if (typeof document !== 'undefined') {
            document.dispatchEvent(new CustomEvent('retro:achievement-unlocked', {
                detail: { achievement: ach, totalUnlocked: this.unlocked.size, max: this.getTotalCount() }
            }));
        }

        this.toastQueue.push(ach);
        this.processQueue();
    }

    private async processQueue() {
        if (this.isShowingToast || this.toastQueue.length === 0) return;
        this.isShowingToast = true;

        const ach = this.toastQueue.shift()!;
        await this.showToast(ach);
        this.isShowingToast = false;
        this.processQueue();
    }

    private showToast(ach: Achievement): Promise<void> {
        return new Promise((resolve) => {
            if (typeof document === 'undefined') {
                resolve();
                return;
            }

            const container = document.getElementById('retro-achievement-container');
            if (!container) {
                resolve();
                return;
            }

            const isRu = document.documentElement.lang === 'ru';
            const title = isRu ? ach.titleRu : ach.titleEn;
            const desc = isRu ? ach.descRu : ach.descEn;

            const toast = document.createElement('div');
            toast.className = `retro-achievement-toast rarity-${ach.rarity}`;
            toast.innerHTML = `
                <div class="ach-icon-box">
                    <span class="ach-icon">${ach.icon}</span>
                </div>
                <div class="ach-text-box">
                    <div class="ach-headline">
                        <span class="ach-badge">★ ACHIEVEMENT UNLOCKED ★</span>
                        <span class="ach-rarity">${ach.rarity.toUpperCase()}</span>
                    </div>
                    <div class="ach-title">${title}</div>
                    <div class="ach-desc">${desc}</div>
                </div>
                <button type="button" class="ach-close-btn" aria-label="Close">&times;</button>
            `;

            container.appendChild(toast);

            // Play fanfare audio if retroAudio is available
            try {
                (window as any).__retroAudioInstance?.playVictory?.();
            } catch (e) {}

            const removeToast = () => {
                toast.classList.add('fade-out');
                setTimeout(() => {
                    toast.remove();
                    resolve();
                }, 350);
            };

            const closeBtn = toast.querySelector('.ach-close-btn');
            if (closeBtn) {
                closeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    removeToast();
                });
            }

            // Auto dismiss after 5 seconds
            setTimeout(removeToast, 5000);
        });
    }

    // Helper progress trackers
    public trackTrackPlayed(trackId: number) {
        try {
            if (typeof localStorage === 'undefined') return;
            const raw = localStorage.getItem(TRACKS_KEY);
            const set = new Set<number>(raw ? JSON.parse(raw) : []);
            set.add(trackId);
            localStorage.setItem(TRACKS_KEY, JSON.stringify(Array.from(set)));
            if (set.size >= 3) {
                this.unlock('chiptune_lover');
            }
        } catch (e) {}
    }

    public trackCommandExecuted() {
        try {
            if (typeof localStorage === 'undefined') return;
            const raw = localStorage.getItem(CMDS_KEY);
            const count = (raw ? parseInt(raw, 10) : 0) + 1;
            localStorage.setItem(CMDS_KEY, count.toString());
            if (count >= 3) {
                this.unlock('terminal_hacker');
            }
        } catch (e) {}
    }
}

export const retroAchievements = RetroAchievementManager.getInstance();
