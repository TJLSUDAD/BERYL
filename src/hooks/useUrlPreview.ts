import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setUrl, setLoading, setError, setSuccess } from '../store/slices/previewSlice';
import { validateUrl } from '../utils/urlValidation';
import { urlCache } from '../utils/urlCache';
import type { PreviewError } from '../types';

export function useUrlPreview() {
  const dispatch = useDispatch();

  const loadUrl = useCallback(async (inputUrl: string) => {
    const { isValid, error } = validateUrl(inputUrl);
    
    if (!isValid && error) {
      dispatch(setError(error));
      return;
    }

    // Check cache first
    const cachedData = urlCache.get(inputUrl);
    if (cachedData) {
      dispatch(setUrl(inputUrl));
      dispatch(setSuccess('URL loaded from cache'));
      return;
    }

    dispatch(setLoading(true));

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

      const response = await fetch(inputUrl, {
        method: 'HEAD',
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      urlCache.set(inputUrl, {
        status: response.status,
        headers: Object.fromEntries(response.headers),
      });
      
      dispatch(setUrl(inputUrl));
      dispatch(setSuccess('URL loaded successfully'));
    } catch (err) {
      const error: PreviewError = {
        message: err instanceof Error 
          ? err.message 
          : 'Failed to load URL. Please check the address and try again.',
        code: 'FETCH_ERROR'
      };
      dispatch(setError(error));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  return { loadUrl };
}