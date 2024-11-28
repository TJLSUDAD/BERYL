import { PreviewError } from '../types';

const URL_PATTERNS = {
  protocol: /^https?:\/\//,
  domain: /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/,
};

export class URLValidationError extends Error implements PreviewError {
  code: string;
  
  constructor(message: string, code: string) {
    super(message);
    this.code = code;
  }
}

export function validateUrl(url: string): { isValid: boolean; error?: URLValidationError } {
  const trimmedUrl = url.trim();
  
  if (!trimmedUrl) {
    return {
      isValid: false,
      error: new URLValidationError('URL cannot be empty', 'EMPTY_URL'),
    };
  }

  if (!URL_PATTERNS.protocol.test(trimmedUrl)) {
    return {
      isValid: false,
      error: new URLValidationError(
        'URL must start with http:// or https://',
        'INVALID_PROTOCOL'
      ),
    };
  }

  try {
    const urlObject = new URL(trimmedUrl);
    if (!URL_PATTERNS.domain.test(urlObject.hostname)) {
      return {
        isValid: false,
        error: new URLValidationError(
          'Invalid domain name format',
          'INVALID_DOMAIN'
        ),
      };
    }
    return { isValid: true };
  } catch {
    return {
      isValid: false,
      error: new URLValidationError(
        'Invalid URL format',
        'INVALID_URL'
      ),
    };
  }
}