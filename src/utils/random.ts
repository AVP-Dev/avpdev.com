/**
 * Returns a random selection of items from an array.
 * NOTE: non-deterministic — use getDeterministicItems() when the
 * result must be stable across builds (e.g. per-city blog post
 * selection).
 */
export function getRandomItems<T>(arr: T[], count: number): T[] {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

/**
 * FNV-1a 32-bit hash. Stable across builds and platforms.
 * Used to seed the deterministic shuffle on city pages.
 */
export function hashSlug(slug: string): number {
    let h = 0x811c9dc5;
    for (let i = 0; i < slug.length; i++) {
        h ^= slug.charCodeAt(i);
        h = Math.imul(h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24)), 0x01000193);
        h >>>= 0;
    }
    return h >>> 0;
}

/**
 * mulberry32 — small fast seeded PRNG.
 */
function mulberry32(seed: number): () => number {
    let s = seed >>> 0;
    return () => {
        s = (s + 0x6d2b79f5) | 0;
        let t = s;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

/**
 * Returns `count` items from `arr` in a shuffled order that is fully
 * determined by `seed`. Same input + same seed → same output on every
 * build, every machine. Different seeds → different shuffles.
 *
 * Use case: city pages need a stable, per-city random selection of
 * blog posts that does NOT reshuffle on every rebuild.
 */
export function getDeterministicItems<T>(arr: T[], count: number, seed: number): T[] {
    const rand = mulberry32(seed);
    const shuffled = [...arr];
    // Fisher–Yates with seeded PRNG (replaces non-deterministic
    // .sort(() => 0.5 - Math.random()) pattern).
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
}
