import { Agent } from '../types';

// Predefined API keys
export const DEFAULT_KEYS = {
  groq: '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',
  gemini: 'AIzaSyD5ayLcLvEiOhKsgFEDAti55S3pRpmq2Q4'
} as const;

export const STORAGE_PREFIX = 'beryl_';

export const STORAGE_KEYS = {
  API_KEYS: `${STORAGE_PREFIX}api_keys`,
  SELECTED_AGENT: `${STORAGE_PREFIX}selected_agent`,
  RECENT_URLS: `${STORAGE_PREFIX}recent_urls`
} as const;