export interface Agent {
  id: string;
  name: string;
  apiKey?: string;
}

export interface PreviewError {
  message: string;
  code: string;
}

export interface PreviewState {
  url: string;
  isLoading: boolean;
  error: PreviewError | null;
  successMessage: string;
  lastUpdated: string | null;
}

export interface URLValidationResult {
  isValid: boolean;
  error?: PreviewError;
}