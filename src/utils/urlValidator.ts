export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function sanitizeUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return '';
  
  try {
    const urlObject = new URL(trimmed);
    return urlObject.toString();
  } catch {
    // If it's not a valid URL, return empty string
    return '';
  }
}