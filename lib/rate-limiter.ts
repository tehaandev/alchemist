interface RateLimitRecord {
  attempts: number;
  resetAt: number;
}

export class RateLimiter {
  private readonly store: Map<string, RateLimitRecord> = new Map();
  private readonly maxAttempts: number;
  private readonly windowMs: number;

  constructor(maxAttempts = 5, windowMs = 15 * 60 * 1000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;

    // Clean up expired entries periodically
    setInterval(() => this.cleanup(), 5 * 60 * 1000);
  }

  isRateLimited(key: string): boolean {
    this.cleanup();
    const record = this.store.get(key);

    if (!record) return false;

    return record.attempts >= this.maxAttempts && record.resetAt > Date.now();
  }

  increment(key: string): void {
    const now = Date.now();
    const record = this.store.get(key) || {
      attempts: 0,
      resetAt: now + this.windowMs,
    };

    record.attempts += 1;

    // If this is first failed attempt, set the reset time
    if (record.attempts === 1) {
      record.resetAt = now + this.windowMs;
    }

    this.store.set(key, record);
  }

  getRemainingAttempts(key: string): number {
    const record = this.store.get(key);
    if (!record) return this.maxAttempts;

    return Math.max(0, this.maxAttempts - record.attempts);
  }

  getTimeRemaining(key: string): number {
    const record = this.store.get(key);
    if (!record) return 0;

    return Math.max(0, record.resetAt - Date.now());
  }

  reset(key: string): void {
    this.store.delete(key);
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, record] of this.store.entries()) {
      if (record.resetAt <= now) {
        this.store.delete(key);
      }
    }
  }
}

// Create a singleton instance for the application
export const loginRateLimiter = new RateLimiter(3, 1000 * 60 * 60); // 5 attempts per 15 minutes
