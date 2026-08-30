// src/scripts/retroAudio.ts
// Authentic Web Audio API 8-Bit & 16-Bit Chiptune Synthesizer, Sequencer, and UI SFX Engine

export interface Track {
    id: number;
    title: string;
    style: string;
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

// 10 Note-accurate, full multi-bar arrangements of legendary 80s/90s game & movie themes
export const RETRO_TRACKS: Track[] = [
    {
        id: 1,
        title: "SUPER MARIO BROS (1985)",
        style: "NES 8-BIT OVERWORLD",
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
        style: "GAME BOY 8-BIT RUSSIAN FOLK",
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
        style: "80s SYNTHWAVE ANTHEM",
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
        style: "16-BIT ARCADE RAVE",
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
        style: "CINEMATIC DARK SCI-FI",
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
        style: "NES 8-BIT HEROIC MARCH",
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
        style: "SEGA GENESIS 16-BIT CLASSIC",
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
        style: "16-BIT CHIPTUNE METAL RIFF",
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
        style: "VINTAGE 8-BIT ARCADE",
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
        style: "ARCADE HEROIC FIGHTER",
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
        style: "PS1 TACTICAL ESPIONAGE",
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
        style: "NEON SYNTHWAVE ACTION",
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
        title: "BATTLE CITY / ТАНЧИКИ (1985)",
        style: "NES 8-BIT TANK MARCH",
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
        title: "TMNT / ЧЕРЕПАШКИ НИНДЗЯ (1989)",
        style: "NES 8-BIT HEROES",
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
        title: "DARKWING DUCK / ЧЁРНЫЙ ПЛАЩ (1992)",
        style: "CAPCOM 8-BIT FUNK",
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
        title: "BATTLETOADS / BATTLE TURTLES (1991)",
        style: "RARE 8-BIT GROOVE",
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
    }
];

class RetroAudioEngine {
    private ctx: AudioContext | null = null;
    private masterGain: GainNode | null = null;
    private isPlaying: boolean = false;
    private isMuted: boolean = false;
    private volume: number = 0.8;
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
    public play(userInitiated: boolean = true) {
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

        document.addEventListener('click', (e) => {
            if (!document.documentElement.classList.contains('retro-mode')) return;
            const target = e.target as HTMLElement;
            if (!target) return;

            // Don't duplicate click beep on player's track play/pause/ribbon buttons
            if (target.closest('#retro-dock-player') || target.closest('#retro-audio-panel')) {
                return;
            }

            // Find clicked interactive element
            const interactive = target.closest('a, button, input, select, textarea, [role="button"], summary, label, .clickable, .card, .portfolio-card, .service-card, .faq-item, .mobile-accordion-trigger, .lang-btn');
            if (interactive) {
                if (interactive.tagName === 'A' || interactive.classList.contains('cta-button') || interactive.classList.contains('btn') || interactive.classList.contains('mode-switcher')) {
                    retroAudio.playNavClick();
                } else {
                    retroAudio.playClick();
                }
            }
        }, { passive: true, capture: true });
    }
}
