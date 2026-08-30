// src/scripts/retroAudio.ts
// Authentic Web Audio API 8-Bit & 16-Bit Chiptune Synthesizer, Sequencer, and UI SFX Engine

export interface Track {
    id: number;
    title: string;
    titleEn: string;
    titleRu: string;
    style: string;
    styleEn: string;
    styleRu: string;
    bpm: number;
    lead: number[];
    bass: number[];
    drums?: number[];
}

// Generate complete equal temperament chromatic frequency map (A4 = 440Hz, octaves 1 to 7)
export const N: Record<string, number> = { REST: 0 };
const A4 = 440;
const SEMITONES: Record<string, number> = {
    'C': -9, 'Cs': -8, 'Db': -8, 'D': -7, 'Ds': -6, 'Eb': -6,
    'E': -5, 'F': -4, 'Fs': -3, 'Gb': -3, 'G': -2, 'Gs': -1, 'Ab': -1,
    'A': 0, 'As': 1, 'Bb': 1, 'B': 2
};

for (let octave = 1; octave <= 7; octave++) {
    for (const [note, semi] of Object.entries(SEMITONES)) {
        const n = semi + (octave - 4) * 12;
        const freq = Math.round(A4 * Math.pow(2, n / 12) * 100) / 100;
        N[`${note}${octave}`] = freq;
    }
}

// 20 Note-accurate, full multi-bar arrangements of legendary 80s/90s game & movie themes
export const RETRO_TRACKS: Track[] = [
    {
        id: 1,
        title: "SUPER MARIO BROS (1985)",
        titleEn: "SUPER MARIO BROS (1985)",
        titleRu: "СУПЕР МАРИО (1985)",
        style: "NES 8-BIT OVERWORLD",
        styleEn: "NES 8-BIT OVERWORLD",
        styleRu: "NES 8-БИТ КЛАССИКА",
        bpm: 180,
        lead: [
            // Bar 1-2: Iconic opening fanfare
            N.E5, N.E5, N.REST, N.E5, N.REST, N.C5, N.E5, N.REST, N.G5, N.REST, N.REST, N.REST, N.G4, N.REST, N.REST, N.REST,
            // Bar 3-4: Main bounce melody (A phrase)
            N.C5, N.REST, N.REST, N.G4, N.REST, N.REST, N.E4, N.REST, N.REST, N.A4, N.REST, N.B4, N.REST, N.Bb4, N.A4, N.REST,
            // Bar 5-6: Continuation
            N.G4, N.E5, N.G5, N.A5, N.REST, N.F5, N.G5, N.REST, N.E5, N.REST, N.C5, N.D5, N.B4, N.REST, N.REST, N.REST
        ],
        bass: [
            // Fanfare bass
            N.D3, N.D3, N.REST, N.D3, N.REST, N.D3, N.D3, N.REST, N.G3, N.REST, N.REST, N.REST, N.G2, N.REST, N.REST, N.REST,
            // Main bounce walking bass
            N.G2, N.REST, N.REST, N.E2, N.REST, N.REST, N.C2, N.REST, N.REST, N.F2, N.REST, N.G2, N.REST, N.Fs2, N.F2, N.REST,
            N.E2, N.C3, N.E3, N.F3, N.REST, N.D3, N.E3, N.REST, N.C3, N.REST, N.A2, N.B2, N.G2, N.REST, N.REST, N.REST
        ],
        drums: [
            1, 0, 2, 0, 1, 0, 2, 1, 1, 0, 2, 0, 1, 0, 2, 2,
            1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 1,
            1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 0, 1, 1, 2, 2
        ]
    },
    {
        id: 2,
        title: "TETRIS (KOROBEINIKI 1989)",
        titleEn: "TETRIS - KOROBEINIKI (1989)",
        titleRu: "ТЕТРИС — КОРОБЕЙНИКИ (1989)",
        style: "GAME BOY 8-BIT RUSSIAN FOLK",
        styleEn: "GAME BOY 8-BIT FOLK",
        styleRu: "GAME BOY 8-БИТ ФОЛК",
        bpm: 144,
        lead: [
            // Bar 1-2: Main theme (Part A)
            N.E5, N.REST, N.B4, N.C5, N.D5, N.REST, N.C5, N.B4, N.A4, N.REST, N.A4, N.C5, N.E5, N.REST, N.D5, N.C5,
            // Bar 3-4: Cadence
            N.B4, N.REST, N.B4, N.C5, N.D5, N.REST, N.E5, N.REST, N.C5, N.REST, N.A4, N.REST, N.A4, N.REST, N.REST, N.REST,
            // Bar 5-6: High resolution (Part B)
            N.D5, N.REST, N.REST, N.F5, N.A5, N.REST, N.G5, N.F5, N.E5, N.REST, N.REST, N.C5, N.E5, N.REST, N.D5, N.C5,
            // Bar 7-8: Final resolution
            N.B4, N.REST, N.B4, N.C5, N.D5, N.REST, N.E5, N.REST, N.C5, N.REST, N.A4, N.REST, N.A4, N.REST, N.REST, N.REST
        ],
        bass: [
            N.A2, N.E3, N.A2, N.E3, N.D3, N.A3, N.D3, N.A3, N.A2, N.E3, N.A2, N.E3, N.E2, N.B2, N.E2, N.B2,
            N.E2, N.B2, N.E2, N.B2, N.A2, N.E3, N.A2, N.E3, N.A2, N.E3, N.A2, N.E3, N.A2, N.E3, N.A2, N.REST,
            N.D3, N.A3, N.D3, N.A3, N.C3, N.G3, N.C3, N.G3, N.B2, N.Fs3, N.B2, N.Fs3, N.A2, N.E3, N.A2, N.E3,
            N.E2, N.B2, N.E2, N.B2, N.A2, N.E3, N.A2, N.E3, N.A2, N.E3, N.A2, N.E3, N.A2, N.E3, N.A2, N.REST
        ],
        drums: [
            1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 0,
            1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 1,
            1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 0,
            1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 0, 1, 1, 2, 2
        ]
    },
    {
        id: 3,
        title: "AXEL F (BEVERLY HILLS COP 1984)",
        titleEn: "AXEL F - BEVERLY HILLS COP (1984)",
        titleRu: "АКСЕЛЬ Ф — ПОЛИЦЕЙСКИЙ ИЗ БЕВЕРЛИ-ХИЛЛЗ (1984)",
        style: "80s SYNTHWAVE ANTHEM",
        styleEn: "80s SYNTHWAVE ANTHEM",
        styleRu: "СИНТВЕЙВ 80-Х ХИТ",
        bpm: 120,
        lead: [
            // Bar 1-2: Famous Faltermeyer Lead
            N.F4, N.REST, N.Ab4, N.REST, N.F4, N.F4, N.Bb4, N.F4, N.Eb4, N.F4, N.REST, N.C5, N.REST, N.F4, N.F4, N.Db5,
            // Bar 3-4: Descending Synth Turn
            N.C5, N.Ab4, N.F4, N.C5, N.F5, N.F4, N.Eb4, N.Eb4, N.C4, N.G4, N.F4, N.REST, N.REST, N.REST, N.REST, N.REST
        ],
        bass: [
            N.F2, N.F2, N.F2, N.F2, N.Bb2, N.Bb2, N.Eb2, N.Eb2, N.F2, N.F2, N.C3, N.C3, N.F2, N.F2, N.Db3, N.Db3,
            N.C3, N.Ab2, N.F2, N.C3, N.F2, N.F2, N.Eb2, N.Eb2, N.C2, N.G2, N.F2, N.F2, N.F2, N.F2, N.F2, N.REST
        ],
        drums: [
            1, 0, 2, 0, 1, 1, 2, 0, 1, 0, 2, 0, 1, 0, 2, 1,
            1, 0, 2, 0, 1, 0, 2, 1, 1, 0, 2, 0, 1, 1, 2, 2
        ]
    },
    {
        id: 4,
        title: "MORTAL KOMBAT (TECHNO 1993)",
        titleEn: "MORTAL KOMBAT (1993)",
        titleRu: "МОРТАЛ КОМБАТ (1993)",
        style: "16-BIT ARCADE RAVE",
        styleEn: "16-BIT ARCADE RAVE",
        styleRu: "АРКАДА 16-БИТ РЕЙВ",
        bpm: 136,
        lead: [
            // Bar 1-2: Main hook in A minor
            N.A4, N.A4, N.C5, N.A4, N.D5, N.A4, N.E5, N.D5, N.C5, N.C5, N.E5, N.C5, N.G5, N.C5, N.E5, N.C5,
            // Bar 3-4: Sub-hook variation
            N.G4, N.G4, N.B4, N.G4, N.C5, N.G4, N.D5, N.C5, N.A4, N.A4, N.C5, N.A4, N.D5, N.A4, N.E5, N.D5
        ],
        bass: [
            N.A2, N.A2, N.A2, N.A2, N.A2, N.A2, N.A2, N.A2, N.C3, N.C3, N.C3, N.C3, N.C3, N.C3, N.C3, N.C3,
            N.G2, N.G2, N.G2, N.G2, N.G2, N.G2, N.G2, N.G2, N.A2, N.A2, N.A2, N.A2, N.A2, N.A2, N.A2, N.A2
        ],
        drums: [
            1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2,
            1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 2
        ]
    },
    {
        id: 5,
        title: "THE TERMINATOR (1984)",
        titleEn: "THE TERMINATOR (1984)",
        titleRu: "ТЕРМИНАТОР (1984)",
        style: "CINEMATIC DARK SCI-FI",
        styleEn: "CINEMATIC DARK SCI-FI",
        styleRu: "СИНЕМАТИК САЙ-ФАЙ 8-БИТ",
        bpm: 116,
        lead: [
            // Bar 1-2: Opening haunting melody
            N.C4, N.REST, N.Eb4, N.REST, N.G4, N.C5, N.Bb4, N.REST, N.G4, N.F4, N.G4, N.REST, N.Eb4, N.D4, N.C4, N.REST,
            // Bar 3-4: High climax phrase
            N.Eb4, N.F4, N.G4, N.C5, N.D5, N.Eb5, N.D5, N.C5, N.Bb4, N.G4, N.Ab4, N.G4, N.F4, N.D4, N.C4, N.REST
        ],
        bass: [
            // Brad Fiedel metallic rhythmic pulse (dun-dun-dun-dun-dun)
            N.C2, N.REST, N.C2, N.C2, N.REST, N.C2, N.C2, N.REST, N.Ab2, N.REST, N.Ab2, N.Ab2, N.REST, N.Bb2, N.G2, N.REST,
            N.C2, N.REST, N.C2, N.C2, N.REST, N.C2, N.C2, N.REST, N.Ab2, N.REST, N.Ab2, N.Ab2, N.REST, N.Bb2, N.C2, N.REST
        ],
        drums: [
            1, 0, 1, 2, 1, 0, 1, 2, 1, 0, 1, 2, 1, 0, 2, 2,
            1, 0, 1, 2, 1, 0, 1, 2, 1, 0, 1, 2, 1, 1, 2, 2
        ]
    },
    {
        id: 6,
        title: "ZELDA (OVERWORLD THEME 1986)",
        titleEn: "THE LEGEND OF ZELDA (1986)",
        titleRu: "ЛЕГЕНДА О ЗЕЛЬДЕ (1986)",
        style: "NES 8-BIT HEROIC MARCH",
        styleEn: "NES 8-BIT HEROIC MARCH",
        styleRu: "NES 8-БИТ ГЕРОИЧЕСКИЙ МАРШ",
        bpm: 150,
        lead: [
            // Bar 1-2: Triumphant Fanfare
            N.Bb4, N.REST, N.F4, N.REST, N.Bb4, N.Bb4, N.C5, N.D5, N.Eb5, N.F5, N.REST, N.REST, N.F5, N.F5, N.Fs5, N.Ab5,
            // Bar 3-4: Epic theme continuation
            N.Bb5, N.REST, N.REST, N.Ab5, N.Fs5, N.Ab5, N.Fs5, N.F5, N.REST, N.REST, N.Eb5, N.Eb5, N.F5, N.Fs5, N.F5, N.REST
        ],
        bass: [
            N.Bb2, N.F3, N.Bb2, N.F3, N.Bb2, N.F3, N.Bb2, N.F3, N.Eb3, N.Bb2, N.Eb3, N.Bb2, N.F3, N.C3, N.F3, N.C3,
            N.Bb2, N.F3, N.Bb2, N.F3, N.Fs2, N.Cs3, N.Fs2, N.Cs3, N.Eb3, N.Bb2, N.Eb3, N.Bb2, N.F3, N.C3, N.F3, N.REST
        ],
        drums: [
            1, 0, 2, 1, 1, 0, 2, 0, 1, 0, 2, 1, 1, 0, 2, 1,
            1, 0, 2, 1, 1, 0, 2, 0, 1, 0, 2, 1, 1, 1, 2, 2
        ]
    },
    {
        id: 7,
        title: "SONIC (GREEN HILL ZONE 1991)",
        titleEn: "SONIC THE HEDGEHOG (1991)",
        titleRu: "ЁЖИК СОНИК (1991)",
        style: "SEGA GENESIS 16-BIT CLASSIC",
        styleEn: "SEGA GENESIS 16-BIT CLASSIC",
        styleRu: "SEGA 16-БИТ КЛАССИКА",
        bpm: 132,
        lead: [
            // Bar 1-2: Breezy tropical melody
            N.C5, N.A4, N.Bb4, N.C5, N.F5, N.E5, N.D5, N.C5, N.D5, N.Bb4, N.C5, N.D5, N.G5, N.F5, N.E5, N.D5,
            // Bar 3-4: Resolving phrase
            N.C5, N.A4, N.Bb4, N.C5, N.F5, N.E5, N.D5, N.C5, N.D5, N.F5, N.E5, N.D5, N.C5, N.REST, N.REST, N.REST
        ],
        bass: [
            N.F2, N.C3, N.F2, N.C3, N.D2, N.A2, N.D2, N.A2, N.Bb2, N.F3, N.Bb2, N.F3, N.C3, N.G3, N.C3, N.G3,
            N.F2, N.C3, N.F2, N.C3, N.D2, N.A2, N.D2, N.A2, N.Bb2, N.F3, N.C3, N.G3, N.F2, N.C3, N.F2, N.REST
        ],
        drums: [
            1, 0, 2, 0, 1, 0, 2, 1, 1, 0, 2, 0, 1, 0, 2, 0,
            1, 0, 2, 0, 1, 0, 2, 1, 1, 0, 2, 0, 1, 1, 2, 2
        ]
    },
    {
        id: 8,
        title: "DOOM (E1M1 AT DOOM'S GATE 1993)",
        titleEn: "DOOM - AT DOOM'S GATE (1993)",
        titleRu: "ДУМ — AT DOOM'S GATE (1993)",
        style: "16-BIT CHIPTUNE METAL RIFF",
        styleEn: "16-BIT METAL CHIPTUNE",
        styleRu: "16-БИТ МЕТАЛ ЧИПТЮН",
        bpm: 165,
        lead: [
            // Bar 1-2: Master riff in E minor
            N.E3, N.E3, N.E4, N.E3, N.E3, N.D4, N.E3, N.E3, N.C4, N.E3, N.E3, N.Bb3, N.E3, N.E3, N.B3, N.C4,
            // Bar 2-4: Turning metal power chords
            N.E3, N.E3, N.E4, N.E3, N.E3, N.D4, N.E3, N.E3, N.C4, N.E3, N.E3, N.Bb3, N.E3, N.G3, N.A3, N.Bb3
        ],
        bass: [
            N.E2, N.E2, N.E2, N.E2, N.E2, N.E2, N.E2, N.E2, N.E2, N.E2, N.E2, N.E2, N.E2, N.E2, N.E2, N.E2,
            N.E2, N.E2, N.E2, N.E2, N.E2, N.E2, N.E2, N.E2, N.E2, N.E2, N.E2, N.E2, N.G2, N.A2, N.Bb2, N.B2
        ],
        drums: [
            1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2,
            1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2
        ]
    },
    {
        id: 9,
        title: "PAC-MAN & ARCADE (1980)",
        titleEn: "PAC-MAN & ARCADE (1980)",
        titleRu: "ПАК-МАН & АРКАДА (1980)",
        style: "VINTAGE 8-BIT ARCADE",
        styleEn: "VINTAGE 8-BIT ARCADE",
        styleRu: "ВИНТАЖНАЯ 8-БИТ АРКАДА",
        bpm: 172,
        lead: [
            // Bar 1-2: Classic opening maze intro
            N.B4, N.B5, N.Fs5, N.Eb5, N.B5, N.Fs5, N.Eb5, N.C5, N.C6, N.G5, N.E5, N.C6, N.G5, N.E5, N.B4, N.B5,
            // Bar 3-4: Ascending chroma run
            N.Fs5, N.Eb5, N.B5, N.Fs5, N.Eb5, N.Ds5, N.E5, N.F5, N.F5, N.Fs5, N.G5, N.G5, N.Ab5, N.A5, N.Bb5, N.B5
        ],
        bass: [
            N.B2, N.Fs3, N.B2, N.Fs3, N.B2, N.Fs3, N.B2, N.Fs3, N.C3, N.G3, N.C3, N.G3, N.C3, N.G3, N.C3, N.G3,
            N.B2, N.Fs3, N.B2, N.Fs3, N.B2, N.Fs3, N.B2, N.Fs3, N.F2, N.C3, N.G2, N.D3, N.A2, N.E3, N.B2, N.Fs3
        ],
        drums: [
            1, 2, 0, 1, 2, 1, 0, 2, 1, 2, 0, 1, 2, 1, 2, 2,
            1, 2, 0, 1, 2, 1, 0, 2, 1, 2, 1, 2, 1, 1, 2, 2
        ]
    },
    {
        id: 10,
        title: "STREET FIGHTER II (GUILE 1991)",
        titleEn: "STREET FIGHTER II - GUILE (1991)",
        titleRu: "УЛИЧНЫЙ БОЕЦ II — ГАЙЛ (1991)",
        style: "ARCADE HEROIC FIGHTER",
        styleEn: "CAPCOM 16-BIT CPS-1",
        styleRu: "CAPCOM 16-БИТ CPS-1",
        bpm: 134,
        lead: [
            // Bar 1-2: Guile's legendary theme
            N.A4, N.B4, N.Cs5, N.E5, N.D5, N.Cs5, N.B4, N.A4, N.B4, N.Cs5, N.D5, N.Fs5, N.E5, N.D5, N.Cs5, N.B4,
            // Bar 3-4: High triumphant response
            N.Cs5, N.D5, N.E5, N.A5, N.Gs5, N.Fs5, N.E5, N.D5, N.E5, N.Fs5, N.Gs5, N.B5, N.A5, N.Gs5, N.Fs5, N.E5
        ],
        bass: [
            N.A2, N.E3, N.A2, N.E3, N.Fs2, N.Cs3, N.Fs2, N.Cs3, N.D3, N.A3, N.D3, N.A3, N.E3, N.B3, N.E3, N.B3,
            N.A2, N.E3, N.A2, N.E3, N.Fs2, N.Cs3, N.Fs2, N.Cs3, N.D3, N.A3, N.D3, N.A3, N.E3, N.B3, N.E3, N.REST
        ],
        drums: [
            1, 0, 2, 0, 1, 0, 2, 1, 1, 0, 2, 0, 1, 1, 2, 0,
            1, 0, 2, 0, 1, 0, 2, 1, 1, 0, 2, 0, 1, 1, 2, 2
        ]
    },
    {
        id: 11,
        title: "METAL GEAR SOLID (1998)",
        titleEn: "METAL GEAR SOLID (1998)",
        titleRu: "МЕТАЛ ГИР СОЛИД (1998)",
        style: "PS1 TACTICAL ESPIONAGE",
        styleEn: "TACTICAL ESPIONAGE CHIPTUNE",
        styleRu: "ШПИОНСКИЙ ЧИПТЮН 16-БИТ",
        bpm: 138,
        lead: [
            N.E4, N.G4, N.A4, N.B4, N.C5, N.B4, N.A4, N.G4, N.E4, N.G4, N.A4, N.G4, N.E4, N.D4, N.E4, N.REST,
            N.E4, N.G4, N.A4, N.B4, N.C5, N.D5, N.E5, N.D5, N.C5, N.B4, N.A4, N.B4, N.E4, N.REST, N.REST, N.REST
        ],
        bass: [
            N.E2, N.E2, N.E2, N.E2, N.C3, N.C3, N.C3, N.C3, N.D3, N.D3, N.D3, N.D3, N.E2, N.E2, N.E2, N.E2,
            N.E2, N.E2, N.E2, N.E2, N.C3, N.C3, N.C3, N.C3, N.D3, N.D3, N.D3, N.D3, N.E2, N.E2, N.E2, N.REST
        ],
        drums: [
            1, 0, 1, 2, 1, 0, 1, 2, 1, 0, 1, 2, 1, 1, 2, 2,
            1, 0, 1, 2, 1, 0, 1, 2, 1, 0, 1, 2, 1, 1, 2, 2
        ]
    },
    {
        id: 12,
        title: "HOTLINE MIAMI (HYDROGEN)",
        titleEn: "HOTLINE MIAMI - HYDROGEN",
        titleRu: "ХОТЛАЙН МАЙАМИ — HYDROGEN",
        style: "NEON SYNTHWAVE ACTION",
        styleEn: "NEON SYNTHWAVE ACTION",
        styleRu: "НЕОНОВЫЙ СИНТВЕЙВ ЭКШЕН",
        bpm: 140,
        lead: [
            N.F4, N.Ab4, N.C5, N.Eb5, N.F5, N.Eb5, N.C5, N.Ab4, N.F4, N.Ab4, N.C5, N.Eb5, N.Db5, N.C5, N.Bb4, N.Ab4,
            N.F4, N.Ab4, N.C5, N.Eb5, N.F5, N.Eb5, N.C5, N.Ab4, N.Eb4, N.G4, N.Bb4, N.Eb5, N.C5, N.Bb4, N.Ab4, N.G4
        ],
        bass: [
            N.F2, N.F2, N.F2, N.F2, N.F2, N.F2, N.F2, N.F2, N.Db2, N.Db2, N.Db2, N.Db2, N.Eb2, N.Eb2, N.Eb2, N.Eb2,
            N.F2, N.F2, N.F2, N.F2, N.F2, N.F2, N.F2, N.F2, N.Eb2, N.Eb2, N.Eb2, N.Eb2, N.C2, N.C2, N.C2, N.C2
        ],
        drums: [
            1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2,
            1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 2
        ]
    },
    {
        id: 13,
        title: "BATTLE CITY (1985)",
        titleEn: "BATTLE CITY (1985)",
        titleRu: "ТАНЧИКИ / BATTLE CITY (1985)",
        style: "NES 8-BIT TANK MARCH",
        styleEn: "NES 8-BIT TANK MARCH",
        styleRu: "NES 8-БИТ ТАНКОВЫЙ МАРШ",
        bpm: 160,
        lead: [
            N.C4, N.E4, N.G4, N.C5, N.G4, N.E4, N.C4, N.REST, N.G3, N.B3, N.D4, N.G4, N.D4, N.B3, N.G3, N.REST,
            N.C4, N.E4, N.G4, N.C5, N.E5, N.D5, N.C5, N.B4, N.C5, N.REST, N.C5, N.REST, N.C5, N.REST, N.REST, N.REST
        ],
        bass: [
            N.C3, N.G2, N.C3, N.G2, N.C3, N.G2, N.C3, N.REST, N.G2, N.D2, N.G2, N.D2, N.G2, N.D2, N.G2, N.REST,
            N.C3, N.G2, N.C3, N.G2, N.C3, N.G2, N.C3, N.G2, N.C3, N.REST, N.C3, N.REST, N.C3, N.REST, N.REST, N.REST
        ],
        drums: [
            1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 0,
            1, 0, 2, 0, 1, 0, 2, 0, 1, 1, 2, 2, 1, 1, 2, 2
        ]
    },
    {
        id: 14,
        title: "TMNT (1989)",
        titleEn: "TMNT - NINJA TURTLES (1989)",
        titleRu: "ЧЕРЕПАШКИ-НИНДЗЯ (1989)",
        style: "NES 8-BIT HEROES",
        styleEn: "NES 8-BIT HEROES",
        styleRu: "NES 8-БИТ ГЕРОИ В ПАНЦИРЕ",
        bpm: 165,
        lead: [
            N.D4, N.D4, N.F4, N.G4, N.Ab4, N.G4, N.F4, N.D4, N.C4, N.D4, N.F4, N.D4, N.C4, N.A3, N.C4, N.REST,
            N.D4, N.D4, N.F4, N.G4, N.Ab4, N.G4, N.F4, N.G4, N.A4, N.REST, N.A4, N.REST, N.D5, N.REST, N.REST, N.REST
        ],
        bass: [
            N.D2, N.D2, N.D3, N.D2, N.F2, N.F2, N.G2, N.Ab2, N.G2, N.G2, N.F2, N.F2, N.D2, N.D2, N.C2, N.REST,
            N.D2, N.D2, N.D3, N.D2, N.F2, N.F2, N.G2, N.G2, N.A2, N.REST, N.A2, N.REST, N.D3, N.REST, N.REST, N.REST
        ],
        drums: [
            1, 0, 2, 1, 1, 0, 2, 0, 1, 0, 2, 1, 1, 0, 2, 0,
            1, 0, 2, 1, 1, 0, 2, 0, 1, 1, 2, 2, 1, 1, 2, 2
        ]
    },
    {
        id: 15,
        title: "DARKWING DUCK (1992)",
        titleEn: "DARKWING DUCK (1992)",
        titleRu: "ЧЁРНЫЙ ПЛАЩ (1992)",
        style: "CAPCOM 8-BIT FUNK",
        styleEn: "CAPCOM 8-BIT FUNK",
        styleRu: "CAPCOM 8-БИТ ФАНК",
        bpm: 145,
        lead: [
            N.E4, N.REST, N.G4, N.A4, N.Bb4, N.B4, N.REST, N.D5, N.E5, N.REST, N.B4, N.A4, N.G4, N.E4, N.D4, N.REST,
            N.E4, N.REST, N.G4, N.A4, N.Bb4, N.B4, N.D5, N.E5, N.G5, N.E5, N.D5, N.B4, N.E5, N.REST, N.REST, N.REST
        ],
        bass: [
            N.E2, N.E2, N.G2, N.A2, N.Bb2, N.B2, N.REST, N.D3, N.E2, N.E2, N.B2, N.A2, N.G2, N.E2, N.D2, N.REST,
            N.E2, N.E2, N.G2, N.A2, N.Bb2, N.B2, N.D3, N.E3, N.G2, N.E2, N.D2, N.B1, N.E2, N.REST, N.REST, N.REST
        ],
        drums: [
            1, 2, 0, 1, 1, 2, 0, 2, 1, 2, 0, 1, 1, 2, 0, 2,
            1, 2, 0, 1, 1, 2, 0, 2, 1, 1, 2, 2, 1, 1, 2, 2
        ]
    },
    {
        id: 16,
        title: "BATTLETOADS (1991)",
        titleEn: "BATTLETOADS (1991)",
        titleRu: "БОЕВЫЕ ЖАБЫ / BATTLETOADS (1991)",
        style: "RARE 8-BIT GROOVE",
        styleEn: "RARE 8-BIT GROOVE",
        styleRu: "RARE 8-БИТ ДРАЙВ",
        bpm: 140,
        lead: [
            N.A4, N.C5, N.D5, N.Ds5, N.E5, N.REST, N.G5, N.E5, N.D5, N.C5, N.A4, N.REST, N.G4, N.A4, N.C5, N.REST,
            N.A4, N.C5, N.D5, N.Ds5, N.E5, N.G5, N.A5, N.REST, N.G5, N.E5, N.D5, N.C5, N.A4, N.REST, N.REST, N.REST
        ],
        bass: [
            N.A2, N.A2, N.C3, N.D3, N.Ds3, N.E3, N.REST, N.G2, N.D3, N.C3, N.A2, N.REST, N.G2, N.A2, N.C3, N.REST,
            N.A2, N.A2, N.C3, N.D3, N.Ds3, N.E3, N.G3, N.REST, N.G2, N.E2, N.D2, N.C2, N.A2, N.REST, N.REST, N.REST
        ],
        drums: [
            1, 0, 2, 0, 1, 2, 2, 0, 1, 0, 2, 0, 1, 2, 2, 0,
            1, 0, 2, 0, 1, 2, 2, 0, 1, 1, 2, 2, 1, 1, 2, 2
        ]
    },
    {
        id: 17,
        title: "DUCKTALES (THE MOON THEME 1989)",
        titleEn: "DUCKTALES - THE MOON (1989)",
        titleRu: "УТИНЫЕ ИСТОРИИ — ТЕМА ЛУНЫ (1989)",
        style: "CAPCOM 8-BIT MASTERPIECE",
        styleEn: "CAPCOM 8-BIT MASTERPIECE",
        styleRu: "CAPCOM 8-БИТ ШЕДЕВР",
        bpm: 150,
        lead: [
            N.A4, N.C5, N.E5, N.B4, N.D5, N.Fs5, N.C5, N.E5, N.G5, N.D5, N.Fs5, N.A5, N.E5, N.G5, N.B5, N.REST,
            N.A5, N.G5, N.Fs5, N.E5, N.D5, N.C5, N.B4, N.A4, N.B4, N.C5, N.D5, N.E5, N.Fs5, N.REST, N.REST, N.REST
        ],
        bass: [
            N.A2, N.E3, N.A2, N.B2, N.Fs3, N.B2, N.C3, N.G3, N.C3, N.D3, N.A3, N.D3, N.E3, N.B3, N.E3, N.REST,
            N.A2, N.E3, N.A2, N.B2, N.Fs3, N.B2, N.C3, N.G3, N.C3, N.D3, N.A3, N.D3, N.E3, N.REST, N.REST, N.REST
        ],
        drums: [
            1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 1,
            1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 0, 1, 1, 2, 2
        ]
    },
    {
        id: 18,
        title: "CHIP 'N DALE (RESCUE RANGERS 1990)",
        titleEn: "CHIP 'N DALE - RESCUE RANGERS (1990)",
        titleRu: "ЧИП И ДЕЙЛ СПЕШАТ НА ПОМОЩЬ (1990)",
        style: "CAPCOM 8-BIT CARTOON FUNK",
        styleEn: "CAPCOM 8-BIT CARTOON FUNK",
        styleRu: "CAPCOM 8-БИТ МУЛЬТ-ФАНК",
        bpm: 160,
        lead: [
            N.C5, N.REST, N.C5, N.D5, N.E5, N.REST, N.G5, N.E5, N.D5, N.C5, N.A4, N.REST, N.A4, N.C5, N.D5, N.REST,
            N.C5, N.REST, N.C5, N.D5, N.E5, N.REST, N.G5, N.A5, N.G5, N.E5, N.D5, N.C5, N.C5, N.REST, N.REST, N.REST
        ],
        bass: [
            N.C3, N.G2, N.C3, N.D3, N.E3, N.B2, N.E3, N.G3, N.F3, N.C3, N.F3, N.REST, N.F2, N.A2, N.G2, N.REST,
            N.C3, N.G2, N.C3, N.D3, N.E3, N.B2, N.E3, N.G3, N.G2, N.D3, N.G2, N.B2, N.C3, N.REST, N.REST, N.REST
        ],
        drums: [
            1, 0, 2, 1, 1, 0, 2, 0, 1, 0, 2, 1, 1, 0, 2, 0,
            1, 0, 2, 1, 1, 0, 2, 0, 1, 1, 2, 2, 1, 1, 2, 2
        ]
    },
    {
        id: 19,
        title: "CONTRA (JUNGLE STAGE 1987)",
        titleEn: "CONTRA - JUNGLE STAGE (1987)",
        titleRu: "КОНТРА — ДЖУНГЛИ (1987)",
        style: "KONAMI 8-BIT MILITARY HEAVY",
        styleEn: "KONAMI 8-BIT MILITARY HEAVY",
        styleRu: "KONAMI 8-БИТ БОЕВИК",
        bpm: 152,
        lead: [
            N.D4, N.F4, N.G4, N.Ab4, N.G4, N.F4, N.D4, N.REST, N.D4, N.F4, N.G4, N.Ab4, N.A4, N.Ab4, N.G4, N.F4,
            N.D4, N.F4, N.G4, N.Ab4, N.A4, N.C5, N.D5, N.REST, N.D5, N.C5, N.A4, N.F4, N.D4, N.REST, N.REST, N.REST
        ],
        bass: [
            N.D2, N.D2, N.D2, N.D2, N.F2, N.F2, N.G2, N.REST, N.D2, N.D2, N.D2, N.D2, N.A2, N.A2, N.G2, N.F2,
            N.D2, N.D2, N.D2, N.D2, N.F2, N.F2, N.G2, N.REST, N.D2, N.C2, N.A1, N.F1, N.D2, N.REST, N.REST, N.REST
        ],
        drums: [
            1, 2, 1, 2, 1, 2, 2, 1, 1, 2, 1, 2, 1, 1, 2, 2,
            1, 2, 1, 2, 1, 2, 2, 1, 1, 1, 2, 2, 1, 1, 2, 2
        ]
    },
    {
        id: 20,
        title: "MEGA MAN 2 (DR. WILY STAGE 1 1988)",
        titleEn: "MEGA MAN 2 - DR. WILY (1988)",
        titleRu: "МЕГА МЭН 2 — ЗАМОК ВАЙЛИ (1988)",
        style: "CAPCOM 8-BIT SPEED METAL",
        styleEn: "CAPCOM 8-BIT SPEED METAL",
        styleRu: "CAPCOM 8-БИТ СПИД-МЕТАЛ",
        bpm: 172,
        lead: [
            N.D4, N.E4, N.F4, N.G4, N.A4, N.D5, N.C5, N.Bb4, N.A4, N.F4, N.G4, N.A4, N.Bb4, N.A4, N.G4, N.E4,
            N.F4, N.G4, N.A4, N.Bb4, N.C5, N.F5, N.E5, N.D5, N.C5, N.A4, N.Bb4, N.C5, N.D5, N.REST, N.REST, N.REST
        ],
        bass: [
            N.D2, N.D2, N.D3, N.D2, N.D2, N.D3, N.D2, N.D2, N.Bb2, N.Bb2, N.Bb3, N.Bb2, N.C3, N.C3, N.C4, N.C3,
            N.F2, N.F2, N.F3, N.F2, N.A2, N.A2, N.A3, N.A2, N.Bb2, N.Bb2, N.C3, N.C3, N.D3, N.REST, N.REST, N.REST
        ],
        drums: [
            1, 0, 2, 0, 1, 0, 2, 1, 1, 0, 2, 0, 1, 1, 2, 2,
            1, 0, 2, 0, 1, 0, 2, 1, 1, 1, 2, 2, 1, 1, 2, 2
        ]
    },
    {
        id: 21,
        title: "CASTLEVANIA (VAMPIRE KILLER 1986)",
        titleEn: "CASTLEVANIA - VAMPIRE KILLER (1986)",
        titleRu: "КАСТЛВАНИЯ — УБИЙЦА ВАМПИРОВ (1986)",
        style: "KONAMI 8-BIT GOTHIC METAL",
        styleEn: "KONAMI 8-BIT GOTHIC METAL",
        styleRu: "KONAMI 8-БИТ ТЁМНЫЙ МЕТАЛ",
        bpm: 160,
        lead: [
            // Bar 1-2: Main riff — aggressive and dark
            N.E4, N.G4, N.A4, N.C5, N.A4, N.G4, N.E4, N.REST, N.E4, N.Fs4, N.G4, N.B4, N.G4, N.Fs4, N.E4, N.REST,
            // Bar 3-4: High response
            N.E4, N.G4, N.A4, N.C5, N.E5, N.D5, N.C5, N.B4, N.A4, N.G4, N.A4, N.B4, N.E4, N.REST, N.REST, N.REST
        ],
        bass: [
            N.A2, N.A2, N.E3, N.A2, N.C3, N.A2, N.E3, N.REST, N.B2, N.B2, N.Fs3, N.B2, N.D3, N.B2, N.Fs3, N.REST,
            N.A2, N.A2, N.E3, N.A2, N.C3, N.E3, N.A3, N.G3, N.F3, N.E3, N.D3, N.C3, N.A2, N.REST, N.REST, N.REST
        ],
        drums: [
            1, 0, 2, 0, 1, 0, 2, 1, 1, 0, 2, 0, 1, 0, 2, 0,
            1, 0, 2, 0, 1, 0, 2, 0, 1, 1, 2, 2, 1, 1, 2, 2
        ]
    },
    {
        id: 22,
        title: "FINAL FANTASY (PRELUDE 1987)",
        titleEn: "FINAL FANTASY - PRELUDE (1987)",
        titleRu: "ФИНАЛ ФЭНТЕЗИ — ПРЕЛЮДИЯ (1987)",
        style: "SQUARE 8-BIT CRYSTAL ARPEGGIO",
        styleEn: "SQUARE 8-BIT CRYSTAL ARPEGGIO",
        styleRu: "SQUARE 8-БИТ КРИСТАЛЛЬНОЕ АРПЕДЖИО",
        bpm: 100,
        lead: [
            // Ascending crystal arpeggio — C major → A minor
            N.C4, N.E4, N.G4, N.C5, N.E5, N.G5, N.E5, N.C5, N.G4, N.E4, N.C4, N.E4, N.G4, N.C5, N.E5, N.G5,
            // A minor resolve
            N.A4, N.C5, N.E5, N.A5, N.E5, N.C5, N.A4, N.C5, N.E5, N.A5, N.C6, N.A5, N.E5, N.C5, N.A4, N.REST
        ],
        bass: [
            N.C3, N.REST, N.G3, N.REST, N.C3, N.REST, N.G3, N.REST, N.F3, N.REST, N.C3, N.REST, N.G3, N.REST, N.C3, N.REST,
            N.A3, N.REST, N.E3, N.REST, N.A3, N.REST, N.E3, N.REST, N.A3, N.REST, N.E3, N.REST, N.A2, N.REST, N.REST, N.REST
        ],
        drums: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ]
    },
    {
        id: 23,
        title: "OUTRUN (MAGICAL SOUND SHOWER 1986)",
        titleEn: "OUTRUN - MAGICAL SOUND SHOWER (1986)",
        titleRu: "АУТРАН — MAGICAL SOUND SHOWER (1986)",
        style: "SEGA ARCADE FM SYNTHWAVE",
        styleEn: "SEGA ARCADE FM SYNTHWAVE",
        styleRu: "SEGA АРКАДА FM СИНТВЕЙВ",
        bpm: 130,
        lead: [
            // Smooth cruising jazz-funk melody
            N.E4, N.Fs4, N.G4, N.A4, N.Cs5, N.B4, N.A4, N.Fs4, N.E4, N.Fs4, N.G4, N.B4, N.A4, N.REST, N.REST, N.REST,
            N.E4, N.Fs4, N.G4, N.A4, N.B4, N.Cs5, N.D5, N.E5, N.Cs5, N.B4, N.A4, N.Fs4, N.E4, N.REST, N.REST, N.REST
        ],
        bass: [
            N.A2, N.E3, N.Cs3, N.A3, N.A2, N.E3, N.A2, N.E3, N.G2, N.D3, N.B2, N.G3, N.Fs2, N.Cs3, N.Fs2, N.REST,
            N.A2, N.E3, N.Cs3, N.A3, N.A2, N.E3, N.A2, N.E3, N.D3, N.A3, N.Fs3, N.D3, N.A2, N.E3, N.A2, N.REST
        ],
        drums: [
            1, 0, 2, 0, 1, 0, 2, 1, 1, 0, 2, 0, 1, 0, 2, 0,
            1, 0, 2, 0, 1, 0, 2, 1, 1, 0, 2, 0, 1, 1, 2, 2
        ]
    },
    {
        id: 24,
        title: "PRINCE OF PERSIA (MAIN THEME 1989)",
        titleEn: "PRINCE OF PERSIA - MAIN THEME (1989)",
        titleRu: "ПРИНЦ ПЕРСИИ — ГЛАВНАЯ ТЕМА (1989)",
        style: "APPLEII/DOS ARABIAN ADVENTURE",
        styleEn: "DOS 8-BIT ARABIAN ADVENTURE",
        styleRu: "DOS 8-БИТ АРАБСКОЕ ПРИКЛЮЧЕНИЕ",
        bpm: 112,
        lead: [
            // Exotic minor descending motif — Jordandous style
            N.A4, N.G4, N.F4, N.E4, N.D4, N.E4, N.F4, N.G4, N.A4, N.REST, N.Bb4, N.A4, N.G4, N.F4, N.E4, N.REST,
            N.D4, N.E4, N.F4, N.G4, N.A4, N.B4, N.C5, N.D5, N.E5, N.D5, N.C5, N.B4, N.A4, N.REST, N.REST, N.REST
        ],
        bass: [
            N.A2, N.E3, N.A2, N.E2, N.D3, N.A2, N.E3, N.A2, N.A2, N.REST, N.Bb2, N.A2, N.G2, N.F2, N.E2, N.REST,
            N.D2, N.A2, N.D3, N.A2, N.A2, N.E3, N.A2, N.E2, N.A2, N.E3, N.A2, N.E3, N.A2, N.REST, N.REST, N.REST
        ],
        drums: [
            1, 0, 0, 2, 1, 0, 0, 2, 1, 0, 0, 2, 1, 0, 0, 2,
            1, 0, 0, 2, 1, 0, 0, 2, 1, 1, 0, 2, 1, 1, 2, 2
        ]
    }
];

class RetroAudioEngine {
    private ctx: AudioContext | null = null;
    private masterGain: GainNode | null = null;
    private isPlaying: boolean = false;
    private isMuted: boolean = false;
    private volume: number = 0.65;
    private currentTrackIndex: number = 0;
    private stepIndex: number = 0;
    private timerId: number | null = null;
    private listeners: Array<(state: { isPlaying: boolean; isMuted: boolean; volume: number; currentTrack: Track; step: number }) => void> = [];

    constructor() {
        if (typeof window !== 'undefined') {
            const savedTrack = localStorage.getItem('retro_audio_track');
            if (savedTrack) {
                const idx = parseInt(savedTrack, 10);
                if (idx >= 0 && idx < RETRO_TRACKS.length) {
                    this.currentTrackIndex = idx;
                }
            }
            this.isMuted = localStorage.getItem('retro_audio_muted') === 'true';
            const savedVol = localStorage.getItem('retro_audio_volume');
            if (savedVol) {
                const v = parseFloat(savedVol);
                if (!isNaN(v) && v >= 0 && v <= 1) {
                    this.volume = v;
                }
            } else {
                this.volume = 0.65;
            }
        }
    }

    private initContext() {
        if (!this.ctx && typeof window !== 'undefined') {
            const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
            this.ctx = new AudioCtx();
            this.masterGain = this.ctx.createGain();
            this.updateGain();
            this.masterGain.connect(this.ctx.destination);
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    private updateGain() {
        if (!this.masterGain || !this.ctx) return;
        const targetGain = this.isMuted ? 0 : this.volume * 0.28;
        this.masterGain.gain.setValueAtTime(targetGain, this.ctx.currentTime);
    }

    // --- SFX GENERATOR ---
    public playClick() {
        if (!this.isRetroModeActive()) return;
        this.initContext();
        if (!this.ctx || !this.masterGain || this.isMuted) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // Authentic dual-tone 8-bit blip (B5 -> E6)
        osc.type = 'square';
        osc.frequency.setValueAtTime(987.77, now);
        osc.frequency.setValueAtTime(1318.51, now + 0.025);

        gain.gain.setValueAtTime(0.12 * (this.volume || 0.8), now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 0.06);
    }

    public playNavClick() {
        if (!this.isRetroModeActive()) return;
        this.initContext();
        if (!this.ctx || !this.masterGain || this.isMuted) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // 3-note arcade power select chime (E5 -> A5 -> E6)
        osc.type = 'square';
        osc.frequency.setValueAtTime(659.25, now);
        osc.frequency.setValueAtTime(880.00, now + 0.035);
        osc.frequency.setValueAtTime(1318.51, now + 0.075);

        gain.gain.setValueAtTime(0.14 * (this.volume || 0.8), now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.13);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 0.13);
    }

    public playHover() {
        if (!this.isRetroModeActive()) return;
        this.initContext();
        if (!this.ctx || !this.masterGain || this.isMuted) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1200, now);

        gain.gain.setValueAtTime(0.05 * this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 0.03);
    }

    public playWarp() {
        this.initContext();
        if (!this.ctx || !this.masterGain || this.isMuted) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(1760, now + 0.25);

        gain.gain.setValueAtTime(0.15 * this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 0.25);
    }

    public playPressStart() {
        this.initContext();
        if (!this.ctx || !this.masterGain || this.isMuted) return;

        const now = this.ctx.currentTime;
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
            if (!this.ctx || !this.masterGain) return;
            const noteTime = now + idx * 0.06;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'square';
            osc.frequency.setValueAtTime(freq, noteTime);

            gain.gain.setValueAtTime(0.15 * this.volume, noteTime);
            gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.08);

            osc.connect(gain);
            gain.connect(this.masterGain);

            osc.start(noteTime);
            osc.stop(noteTime + 0.08);
        });
    }

    public play1Up() {
        this.initContext();
        if (!this.ctx || !this.masterGain || this.isMuted) return;

        const now = this.ctx.currentTime;
        // Classic 1-UP arpeggio: E5 -> G5 -> E6 -> C6 -> D6 -> G6
        const notes = [659.25, 783.99, 1318.51, 1046.50, 1174.66, 1567.98];
        notes.forEach((freq, idx) => {
            if (!this.ctx || !this.masterGain) return;
            const noteTime = now + idx * 0.075;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'square';
            osc.frequency.setValueAtTime(freq, noteTime);

            gain.gain.setValueAtTime(0.18 * (this.volume || 0.8), noteTime);
            gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.12);

            osc.connect(gain);
            gain.connect(this.masterGain);

            osc.start(noteTime);
            osc.stop(noteTime + 0.12);
        });
    }

    // --- ARCADE GAME SOUND EFFECTS ---
    public playLaserShoot() {
        this.initContext();
        if (!this.ctx || !this.masterGain || this.isMuted) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(110, now + 0.09);

        gain.gain.setValueAtTime(0.12 * (this.volume || 0.8), now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.09);
    }

    public playExplosion() {
        this.initContext();
        if (!this.ctx || !this.masterGain || this.isMuted) return;
        const now = this.ctx.currentTime;

        // Procedural 8-bit Noise Explosion Buffer
        const bufferSize = Math.floor(this.ctx.sampleRate * 0.18);
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1200, now);
        filter.frequency.exponentialRampToValueAtTime(80, now + 0.18);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.22 * (this.volume || 0.8), now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        noise.start(now);
        noise.stop(now + 0.18);
    }

    public playUfoBonus() {
        this.initContext();
        if (!this.ctx || !this.masterGain || this.isMuted) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // 8-bit ascending chime
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.exponentialRampToValueAtTime(1318.51, now + 0.15);

        gain.gain.setValueAtTime(0.18 * (this.volume || 0.8), now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.15);
    }

    public playShieldParry() {
        this.initContext();
        if (!this.ctx || !this.masterGain || this.isMuted) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // 8-bit metallic deflection ping
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1480, now);
        osc.frequency.exponentialRampToValueAtTime(2600, now + 0.06);
        osc.frequency.exponentialRampToValueAtTime(900, now + 0.14);

        gain.gain.setValueAtTime(0.2 * (this.volume || 0.8), now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.14);
    }

    public playEmpBlast() {
        this.initContext();
        if (!this.ctx || !this.masterGain || this.isMuted) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // Sci-Fi EMP Shockwave
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(1800, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.35);

        gain.gain.setValueAtTime(0.25 * (this.volume || 0.8), now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.35);
    }

    public playBossHit() {
        this.initContext();
        if (!this.ctx || !this.masterGain || this.isMuted) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.setValueAtTime(300, now + 0.04);
        osc.frequency.setValueAtTime(100, now + 0.08);

        gain.gain.setValueAtTime(0.2 * (this.volume || 0.8), now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.12);
    }

    public playVictory() {
        this.initContext();
        if (!this.ctx || !this.masterGain || this.isMuted) return;
        const now = this.ctx.currentTime;
        // Fanfare: C5 -> E5 -> G5 -> C6
        const fanfare = [523.25, 659.25, 783.99, 1046.50];
        fanfare.forEach((freq, idx) => {
            if (!this.ctx || !this.masterGain) return;
            const noteTime = now + idx * 0.1;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'square';
            osc.frequency.setValueAtTime(freq, noteTime);

            gain.gain.setValueAtTime(0.18 * (this.volume || 0.8), noteTime);
            gain.gain.exponentialRampToValueAtTime(0.001, noteTime + (idx === 3 ? 0.35 : 0.09));

            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(noteTime);
            osc.stop(noteTime + (idx === 3 ? 0.35 : 0.09));
        });
    }

    public playCoinInsert() {
        this.initContext();
        if (!this.ctx || !this.masterGain || this.isMuted) return;
        const now = this.ctx.currentTime;
        const vol = this.volume || 0.65;

        // First bell tone (B5 = 987.77 Hz)
        const osc1 = this.ctx.createOscillator();
        const gain1 = this.ctx.createGain();
        osc1.type = 'square';
        osc1.frequency.setValueAtTime(987.77, now);

        gain1.gain.setValueAtTime(0, now);
        gain1.gain.linearRampToValueAtTime(0.18 * vol, now + 0.01);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc1.connect(gain1);
        gain1.connect(this.masterGain);
        osc1.start(now);
        osc1.stop(now + 0.35);

        // Second resonant higher chime (E6 = 1318.51 Hz) - arcade classic coin chime
        const osc2 = this.ctx.createOscillator();
        const gain2 = this.ctx.createGain();
        osc2.type = 'square';
        osc2.frequency.setValueAtTime(1318.51, now + 0.08);

        gain2.gain.setValueAtTime(0, now + 0.08);
        gain2.gain.linearRampToValueAtTime(0.24 * vol, now + 0.09);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

        osc2.connect(gain2);
        gain2.connect(this.masterGain);
        osc2.start(now + 0.08);
        osc2.stop(now + 0.55);
    }

    public playGameOver() {
        this.initContext();
        if (!this.ctx || !this.masterGain || this.isMuted) return;
        const now = this.ctx.currentTime;
        // Sad NES descending tone: B4 -> G#4 -> F4 -> D4
        const tones = [493.88, 415.30, 349.23, 293.66];
        tones.forEach((freq, idx) => {
            if (!this.ctx || !this.masterGain) return;
            const noteTime = now + idx * 0.14;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(freq, noteTime);

            gain.gain.setValueAtTime(0.16 * (this.volume || 0.8), noteTime);
            gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.16);

            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(noteTime);
            osc.stop(noteTime + 0.16);
        });
    }

    public playCarBoost() {
        this.initContext();
        if (!this.ctx || !this.masterGain || this.isMuted) return;
        const now = this.ctx.currentTime;
        const vol = this.volume || 0.8;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(720, now + 0.35);

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.22 * vol, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.45);
    }

    public playCarBrake() {
        this.initContext();
        if (!this.ctx || !this.masterGain || this.isMuted) return;
        const now = this.ctx.currentTime;
        const vol = this.volume || 0.8;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.22);

        gain.gain.setValueAtTime(0.12 * vol, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.25);
    }

    public playNearMiss() {
        this.initContext();
        if (!this.ctx || !this.masterGain || this.isMuted) return;
        const now = this.ctx.currentTime;
        const vol = this.volume || 0.8;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1046.50, now); // C6
        osc.frequency.setValueAtTime(1318.51, now + 0.06); // E6
        osc.frequency.setValueAtTime(1567.98, now + 0.12); // G6

        gain.gain.setValueAtTime(0.18 * vol, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.24);
    }

    public playStageClear() {
        this.initContext();
        if (!this.ctx || !this.masterGain || this.isMuted) return;
        const now = this.ctx.currentTime;
        const vol = this.volume || 0.8;
        const fanfareNotes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        fanfareNotes.forEach((freq, i) => {
            if (!this.ctx || !this.masterGain) return;
            const t = now + i * 0.12;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(freq, t);
            gain.gain.setValueAtTime(0.18 * vol, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + (i === 3 ? 0.6 : 0.16));
            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(t);
            osc.stop(t + (i === 3 ? 0.6 : 0.16));
        });
    }

    private loopCount: number = 0;

    // --- CHIPTUNE SEQUENCER ---
    private scheduleStep() {
        if (!this.isPlaying || !this.ctx || !this.masterGain) return;

        const track = RETRO_TRACKS[this.currentTrackIndex];
        const stepDuration = 60 / track.bpm / 2; // Eighth notes
        const now = this.ctx.currentTime;
        const totalSteps = Math.max(track.lead.length, track.bass.length);

        // 1. Lead channel (Square Wave)
        const leadFreq = track.lead[this.stepIndex % track.lead.length];
        if (leadFreq > 0) {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(leadFreq, now);

            gain.gain.setValueAtTime(0.13, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + stepDuration * 0.88);

            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(now);
            osc.stop(now + stepDuration);
        }

        // 2. Bass channel (Triangle Wave)
        const bassFreq = track.bass[this.stepIndex % track.bass.length];
        if (bassFreq > 0) {
            const bassOsc = this.ctx.createOscillator();
            const bassGain = this.ctx.createGain();
            bassOsc.type = 'triangle';
            bassOsc.frequency.setValueAtTime(bassFreq, now);

            bassGain.gain.setValueAtTime(0.22, now);
            bassGain.gain.exponentialRampToValueAtTime(0.001, now + stepDuration * 0.95);

            bassOsc.connect(bassGain);
            bassGain.connect(this.masterGain);
            bassOsc.start(now);
            bassOsc.stop(now + stepDuration);
        }

        // 3. Noise / Drum channel
        if (track.drums && track.drums.length > 0) {
            const drumType = track.drums[this.stepIndex % track.drums.length];
            if (drumType === 1) {
                // Kick
                const kickOsc = this.ctx.createOscillator();
                const kickGain = this.ctx.createGain();
                kickOsc.type = 'sine';
                kickOsc.frequency.setValueAtTime(160, now);
                kickOsc.frequency.exponentialRampToValueAtTime(30, now + 0.08);

                kickGain.gain.setValueAtTime(0.25, now);
                kickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

                kickOsc.connect(kickGain);
                kickGain.connect(this.masterGain);
                kickOsc.start(now);
                kickOsc.stop(now + 0.08);
            } else if (drumType === 2) {
                // Snare
                const bufferSize = Math.floor(this.ctx.sampleRate * 0.05);
                const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
                const data = buffer.getChannelData(0);
                for (let i = 0; i < bufferSize; i++) {
                    data[i] = Math.random() * 2 - 1;
                }
                const noise = this.ctx.createBufferSource();
                noise.buffer = buffer;
                const noiseGain = this.ctx.createGain();
                noiseGain.gain.setValueAtTime(0.08, now);
                noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

                noise.connect(noiseGain);
                noiseGain.connect(this.masterGain);
                noise.start(now);
            }
        }

        this.notifyState();

        // Advance step & check track completion (play 2 full cycles then advance to next track)
        this.stepIndex++;
        if (this.stepIndex >= totalSteps) {
            this.loopCount++;
            if (this.loopCount >= 2) {
                this.loopCount = 0;
                this.stepIndex = 0;
                this.nextTrack();
                return;
            } else {
                this.stepIndex = 0;
            }
        }

        this.timerId = window.setTimeout(() => this.scheduleStep(), stepDuration * 1000);
    }

    // --- CONTROLS ---
    public isUserPaused(): boolean {
        return typeof window !== 'undefined' && localStorage.getItem('retro_audio_user_paused') === 'true';
    }

    public play(userInitiated: boolean = true) {
        if (!userInitiated && this.isUserPaused()) {
            return; // Strict guard: will NEVER resume if user paused it
        }
        this.initContext();
        if (userInitiated) {
            localStorage.setItem('retro_audio_user_paused', 'false');
        }
        if (this.isPlaying) return;
        this.isPlaying = true;
        this.scheduleStep();
        this.notifyState();
    }

    public pause(userInitiated: boolean = true) {
        this.isPlaying = false;
        if (userInitiated) {
            localStorage.setItem('retro_audio_user_paused', 'true');
        }
        if (this.timerId) {
            clearTimeout(this.timerId);
            this.timerId = null;
        }
        this.notifyState();
    }

    public togglePlay() {
        if (this.isPlaying) {
            this.pause(true);
        } else {
            this.play(true);
        }
    }

    public nextTrack() {
        this.currentTrackIndex = (this.currentTrackIndex + 1) % RETRO_TRACKS.length;
        localStorage.setItem('retro_audio_track', this.currentTrackIndex.toString());
        this.stepIndex = 0;
        this.loopCount = 0;
        this.notifyState();
        if (this.isPlaying) {
            if (this.timerId) {
                clearTimeout(this.timerId);
                this.timerId = null;
            }
            this.scheduleStep();
        }
    }

    public prevTrack() {
        this.currentTrackIndex = (this.currentTrackIndex - 1 + RETRO_TRACKS.length) % RETRO_TRACKS.length;
        localStorage.setItem('retro_audio_track', this.currentTrackIndex.toString());
        this.stepIndex = 0;
        this.loopCount = 0;
        this.notifyState();
        if (this.isPlaying) {
            if (this.timerId) {
                clearTimeout(this.timerId);
                this.timerId = null;
            }
            this.scheduleStep();
        }
    }

    public selectTrack(index: number) {
        if (index >= 0 && index < RETRO_TRACKS.length) {
            this.currentTrackIndex = index;
            localStorage.setItem('retro_audio_track', this.currentTrackIndex.toString());
            this.stepIndex = 0;
            this.loopCount = 0;
            this.notifyState();
            if (this.isPlaying) {
                if (this.timerId) {
                    clearTimeout(this.timerId);
                    this.timerId = null;
                }
                this.scheduleStep();
            } else {
                this.play(true);
            }
        }
    }

    public setVolume(val: number) {
        this.volume = Math.max(0, Math.min(1, val));
        localStorage.setItem('retro_audio_volume', this.volume.toString());
        this.updateGain();
        this.notifyState();
    }

    public toggleMute() {
        this.initContext();
        this.isMuted = !this.isMuted;
        localStorage.setItem('retro_audio_muted', this.isMuted.toString());
        this.updateGain();
        this.notifyState();
    }

    public isRetroModeActive(): boolean {
        return typeof document !== 'undefined' && document.documentElement.classList.contains('retro-mode');
    }

    public getTrackTitle(track: Track, lang?: string): string {
        const currentLang = lang || (typeof document !== 'undefined' ? document.documentElement.lang : 'ru');
        return currentLang === 'en' ? (track.titleEn || track.title) : (track.titleRu || track.title);
    }

    public getTrackStyle(track: Track, lang?: string): string {
        const currentLang = lang || (typeof document !== 'undefined' ? document.documentElement.lang : 'ru');
        return currentLang === 'en' ? (track.styleEn || track.style) : (track.styleRu || track.style);
    }

    public getState() {
        return {
            isPlaying: this.isPlaying,
            isMuted: this.isMuted,
            volume: this.volume,
            currentTrack: RETRO_TRACKS[this.currentTrackIndex],
            step: this.stepIndex
        };
    }

    public subscribe(fn: (state: ReturnType<typeof this.getState>) => void) {
        this.listeners.push(fn);
        fn(this.getState());
        return () => {
            this.listeners = this.listeners.filter(l => l !== fn);
        };
    }

    private notifyState() {
        const state = this.getState();
        this.listeners.forEach(l => l(state));
    }
}

// Global Singleton
export const retroAudio = new RetroAudioEngine();

// Universal Retro Mode UI Click & Navigation Sound Effects
if (typeof document !== 'undefined') {
    if (!(window as any).__retroGlobalAudioListenerReady) {
        (window as any).__retroGlobalAudioListenerReady = true;

        let lastClickSoundTime = 0;
        document.addEventListener('click', (e) => {
            if (!document.documentElement.classList.contains('retro-mode')) return;
            if (Date.now() - lastClickSoundTime < 180) return;

            const target = e.target as HTMLElement;
            if (!target) return;

            // Don't duplicate click beep on player controls or mode switchers which have custom sounds
            if (target.closest('#retro-dock-player') || target.closest('#retro-audio-panel') || target.closest('.mode-switcher')) {
                return;
            }

            // Find clicked interactive element
            const interactive = target.closest('a, button, input, select, textarea, [role="button"], summary, label, .clickable, .card, .portfolio-card, .service-card, .faq-item, .mobile-accordion-trigger, .lang-btn');
            if (interactive) {
                lastClickSoundTime = Date.now();
                if (interactive.tagName === 'A' || interactive.classList.contains('cta-button') || interactive.classList.contains('btn')) {
                    retroAudio.playNavClick();
                } else {
                    retroAudio.playClick();
                }
            }
        }, { passive: true });

        // Hover SFX: Crisp 8-bit tick on hovering over buttons, cards and navigation
        let lastHoverEl: HTMLElement | null = null;
        let lastHoverTime = 0;
        document.addEventListener('mouseover', (e) => {
            if (!document.documentElement.classList.contains('retro-mode')) return;
            const target = (e.target as HTMLElement)?.closest('a, button, .service-card, .portfolio-card, .arcade-game-card, .retro-hero-chip, .lang-btn, .theme-switcher') as HTMLElement | null;
            if (!target || target === lastHoverEl) return;
            if (Date.now() - lastHoverTime < 70) return;

            lastHoverEl = target;
            lastHoverTime = Date.now();
            retroAudio.playClick();
        }, { passive: true });
    }

    // Konami Code Easter Egg (↑ ↑ ↓ ↓ ← → ← → B A) & Mobile 5-Tap / Click Trigger
    if (!(window as any).__retroKonamiListenerReady) {
        (window as any).__retroKonamiListenerReady = true;

        const KONAMI_SEQUENCE = [
            'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
            'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
            'KeyB', 'KeyA'
        ];
        let konamiIndex = 0;
        let tapCount = 0;
        let tapTimer: number | null = null;

        // 1. Keyboard sequence detector
        document.addEventListener('keydown', (e) => {
            if (!document.documentElement.classList.contains('retro-mode')) return;

            // Don't trigger if user is typing in form inputs
            const activeTag = document.activeElement?.tagName?.toLowerCase();
            if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') {
                return;
            }

            const code = e.code;
            const key = e.key.toLowerCase();
            const expectedCode = KONAMI_SEQUENCE[konamiIndex];

            const isUp = (expectedCode === 'ArrowUp' && (code === 'ArrowUp' || key === 'arrowup'));
            const isDown = (expectedCode === 'ArrowDown' && (code === 'ArrowDown' || key === 'arrowdown'));
            const isLeft = (expectedCode === 'ArrowLeft' && (code === 'ArrowLeft' || key === 'arrowleft'));
            const isRight = (expectedCode === 'ArrowRight' && (code === 'ArrowRight' || key === 'arrowright'));
            const isB = (expectedCode === 'KeyB' && (code === 'KeyB' || key === 'b' || key === 'и'));
            const isA = (expectedCode === 'KeyA' && (code === 'KeyA' || key === 'a' || key === 'ф'));

            if (isUp || isDown || isLeft || isRight || isB || isA) {
                konamiIndex++;
                if (konamiIndex === KONAMI_SEQUENCE.length) {
                    konamiIndex = 0;
                    triggerGodMode();
                }
            } else {
                konamiIndex = (isUp) ? 1 : 0;
            }
        }, { capture: true });

        // 2. Mobile 5-Tap gesture on [ 1P: READY ] and Direct Tap on [ ЧИТ / CHEAT ]
        document.addEventListener('click', (e) => {
            if (!document.documentElement.classList.contains('retro-mode')) return;
            const target = e.target as HTMLElement;
            if (!target) return;

            // Direct tap on Cheat Chip
            const cheatChip = target.closest('.retro-hero-chip.secret-hint');
            if (cheatChip) {
                e.preventDefault();
                triggerGodMode();
                return;
            }

            // 5-Tap gesture on 1P Chip
            const p1Chip = target.closest('.retro-hero-chip.p1');
            if (p1Chip) {
                tapCount++;
                if (tapTimer) clearTimeout(tapTimer);
                tapTimer = window.setTimeout(() => {
                    tapCount = 0;
                }, 2000);

                if (tapCount >= 5) {
                    tapCount = 0;
                    triggerGodMode();
                }
            }
        }, { capture: true });

        function triggerGodMode() {
            retroAudio.play1Up();

            // Remove existing banner if any
            document.getElementById('retro-godmode-banner')?.remove();

            const isRu = document.documentElement.lang === 'ru';
            const banner = document.createElement('div');
            banner.id = 'retro-godmode-banner';
            banner.className = 'retro-godmode-banner';
            banner.innerHTML = `
                <div class="godmode-box">
                    <div class="godmode-stars">⭐ ⭐ ⭐</div>
                    <div class="godmode-title">${isRu ? 'КОНАМИ-КОД РАЗБЛОКИРОВАН!' : 'KONAMI CODE UNLOCKED!'}</div>
                    <div class="godmode-desc">${isRu ? 'РЕЖИМ БОГА АКТИВИРОВАН: 99 ЖИЗНЕЙ И БЕСКОНЕЧНЫЕ КРЕДИТЫ' : 'GOD MODE ACTIVATED: 99 LIVES & INFINITE CREDITS'}</div>
                    <div class="godmode-badge">⚡ 30 EXTRA LIVES • RETRO OVERDRIVE ⚡</div>
                </div>
            `;
            document.body.appendChild(banner);

            // Spawn neon retro particle fireworks
            for (let i = 0; i < 40; i++) {
                const p = document.createElement('div');
                p.className = 'retro-godmode-spark';
                const colors = ['#00f0ff', '#ff007f', '#ffe600', '#00ff66'];
                const color = colors[Math.floor(Math.random() * colors.length)];
                const startX = window.innerWidth / 2;
                const startY = window.innerHeight / 2;
                const angle = Math.random() * Math.PI * 2;
                const dist = 120 + Math.random() * 280;
                const endX = startX + Math.cos(angle) * dist;
                const endY = startY + Math.sin(angle) * dist;

                p.style.cssText = `
                    position: fixed;
                    left: ${startX}px;
                    top: ${startY}px;
                    width: ${6 + Math.random() * 6}px;
                    height: ${6 + Math.random() * 6}px;
                    background: ${color};
                    box-shadow: 0 0 12px ${color};
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 999999999;
                    transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease;
                `;
                document.body.appendChild(p);

                requestAnimationFrame(() => {
                    p.style.transform = `translate(${endX - startX}px, ${endY - startY}px) scale(0)`;
                    p.style.opacity = '0';
                });

                setTimeout(() => p.remove(), 900);
            }

            // Update Hero HUD chips
            const p1Chip = document.querySelector('.retro-hero-chip.p1');
            if (p1Chip) {
                p1Chip.innerHTML = `<span class="hud-dot godmode"></span> <span>${isRu ? '1P: РЕЖИМ БОГА (99)' : '1P: GOD MODE (99)'}</span>`;
                p1Chip.classList.add('godmode-active');
            }

            const creditsChip = document.querySelector('.retro-hero-chip.credits');
            if (creditsChip) {
                creditsChip.innerHTML = `<span>${isRu ? 'КРЕДИТЫ: 999999' : 'CREDITS: 999999'}</span>`;
                creditsChip.classList.add('godmode-active');
            }

            setTimeout(() => {
                banner.classList.add('fade-out');
                setTimeout(() => banner.remove(), 600);
            }, 4500);
        }
    }
}
