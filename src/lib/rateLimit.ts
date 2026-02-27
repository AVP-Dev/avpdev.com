// src/lib/rateLimit.ts
export const rateLimit = {
    // A simple in-memory store for IP addresses and their request timestamps
    store: new Map<string, number[]>(),

    // Config: number of requests allowed per window time (in ms)
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5, // 5 requests per 15 minutes per IP

    check: function (ip: string) {
        const now = Date.now();
        const timestamps = this.store.get(ip) || [];

        // Filter out timestamps that are older than the window
        const recentTimestamps = timestamps.filter(timestamp => now - timestamp < this.windowMs);

        if (recentTimestamps.length >= this.maxRequests) {
            return false; // Rate limit exceeded
        }

        // Add current timestamp and save
        recentTimestamps.push(now);
        this.store.set(ip, recentTimestamps);

        return true; // Allowed
    }
};
