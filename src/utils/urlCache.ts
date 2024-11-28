interface CacheEntry {
  url: string;
  timestamp: number;
  data: any;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

class URLCache {
  private cache: Map<string, CacheEntry>;

  constructor() {
    this.cache = new Map();
  }

  set(url: string, data: any): void {
    this.cache.set(url, {
      url,
      timestamp: Date.now(),
      data
    });
  }

  get(url: string): any | null {
    const entry = this.cache.get(url);
    if (!entry) return null;

    if (Date.now() - entry.timestamp > CACHE_DURATION) {
      this.cache.delete(url);
      return null;
    }

    return entry.data;
  }

  clear(): void {
    this.cache.clear();
  }
}

export const urlCache = new URLCache();