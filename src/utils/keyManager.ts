import { DEFAULT_KEYS, STORAGE_KEYS } from '../config/keys';
import type { Agent } from '../types';

interface StoredKeys {
  [key: string]: string;
}

export class KeyManager {
  private static instance: KeyManager;
  private keys: StoredKeys;

  private constructor() {
    this.keys = this.loadKeys();
  }

  public static getInstance(): KeyManager {
    if (!KeyManager.instance) {
      KeyManager.instance = new KeyManager();
    }
    return KeyManager.instance;
  }

  private loadKeys(): StoredKeys {
    try {
      const storedKeys = localStorage.getItem(STORAGE_KEYS.API_KEYS);
      const parsedKeys = storedKeys ? JSON.parse(storedKeys) : {};
      return { ...DEFAULT_KEYS, ...parsedKeys };
    } catch (error) {
      console.error('Error loading API keys:', error);
      return { ...DEFAULT_KEYS };
    }
  }

  public getKey(agentId: string): string | null {
    return this.keys[agentId] || null;
  }

  public async setKey(agentId: string, apiKey: string): Promise<void> {
    this.keys[agentId] = apiKey;
    try {
      localStorage.setItem(STORAGE_KEYS.API_KEYS, JSON.stringify(this.keys));
    } catch (error) {
      console.error('Error saving API key:', error);
      throw new Error('Failed to save API key');
    }
  }

  public getAllKeys(): StoredKeys {
    return { ...this.keys };
  }

  public hasKey(agentId: string): boolean {
    return !!this.keys[agentId];
  }

  public removeKey(agentId: string): void {
    const { [agentId]: removed, ...rest } = this.keys;
    this.keys = rest;
    localStorage.setItem(STORAGE_KEYS.API_KEYS, JSON.stringify(this.keys));
  }

  public clearKeys(): void {
    this.keys = { ...DEFAULT_KEYS };
    localStorage.setItem(STORAGE_KEYS.API_KEYS, JSON.stringify(this.keys));
  }
}