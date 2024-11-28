import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { KeyManager } from '../utils/keyManager';
import { updateApiKey } from '../store/slices/agentSlice';
import { validateApiKey } from '../utils/apiKeyValidator';

export function useKeyManager() {
  const dispatch = useDispatch();
  const keyManager = KeyManager.getInstance();

  const setApiKey = useCallback(async (agentId: string, apiKey: string) => {
    try {
      const isValid = await validateApiKey(agentId, apiKey);
      if (!isValid) {
        throw new Error('Invalid API key');
      }

      await keyManager.setKey(agentId, apiKey);
      dispatch(updateApiKey({ agentId, apiKey }));
      return true;
    } catch (error) {
      console.error('Error setting API key:', error);
      throw error;
    }
  }, [dispatch]);

  const getApiKey = useCallback((agentId: string) => {
    return keyManager.getKey(agentId);
  }, []);

  const removeApiKey = useCallback((agentId: string) => {
    keyManager.removeKey(agentId);
    dispatch(updateApiKey({ agentId, apiKey: '' }));
  }, [dispatch]);

  return {
    setApiKey,
    getApiKey,
    removeApiKey,
    hasKey: keyManager.hasKey.bind(keyManager),
    getAllKeys: keyManager.getAllKeys.bind(keyManager)
  };
}