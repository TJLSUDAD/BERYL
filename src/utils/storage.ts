import { Agent } from '../types';

const STORAGE_KEYS = {
  API_KEYS: 'beryl_api_keys',
  SELECTED_AGENT: 'beryl_selected_agent'
} as const;

export function saveApiKey(agentId: string, apiKey: string): void {
  const keys = getStoredApiKeys();
  localStorage.setItem(STORAGE_KEYS.API_KEYS, JSON.stringify({
    ...keys,
    [agentId]: apiKey
  }));
}

export function getApiKey(agentId: string): string | null {
  const keys = getStoredApiKeys();
  return keys[agentId] || null;
}

export function getStoredApiKeys(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.API_KEYS) || '{}');
  } catch {
    return {};
  }
}

export function saveSelectedAgent(agent: Agent): void {
  localStorage.setItem(STORAGE_KEYS.SELECTED_AGENT, JSON.stringify(agent));
}

export function getSelectedAgent(): Agent | null {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.SELECTED_AGENT) || 'null');
  } catch {
    return null;
  }
}