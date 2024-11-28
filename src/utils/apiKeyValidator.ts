import { DEFAULT_KEYS } from '../config/keys';

export async function validateApiKey(agent: string, apiKey: string): Promise<boolean> {
  if (!apiKey.trim()) {
    return false;
  }

  // For demo purposes, we'll validate against predefined keys
  // In production, this would make an API call to validate the key
  const defaultKey = DEFAULT_KEYS[agent as keyof typeof DEFAULT_KEYS];
  if (defaultKey === apiKey) {
    return true;
  }

  // Implement basic format validation for each provider
  const keyPatterns: Record<string, RegExp> = {
    groq: /^gsk_[a-zA-Z0-9]{48}$/,
    gemini: /^AIza[a-zA-Z0-9_-]{32}$/,
    gpt4: /^sk-[a-zA-Z0-9]{48}$/,
    claude: /^sk-[a-zA-Z0-9]{40}$/
  };

  const pattern = keyPatterns[agent];
  return pattern ? pattern.test(apiKey) : false;
}