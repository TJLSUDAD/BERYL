import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedAgent, updateApiKey } from '../store/slices/agentSlice';
import { validateApiKey } from '../utils/apiKeyValidator';
import { saveApiKey, saveSelectedAgent } from '../utils/storage';
import type { Agent } from '../types';

export function useAgentManager() {
  const dispatch = useDispatch();

  const selectAgent = useCallback((agent: Agent) => {
    dispatch(setSelectedAgent(agent));
    saveSelectedAgent(agent);
  }, [dispatch]);

  const updateAgentKey = useCallback(async (agentId: string, apiKey: string) => {
    const isValid = await validateApiKey(agentId, apiKey);
    
    if (isValid) {
      dispatch(updateApiKey({ agentId, apiKey }));
      saveApiKey(agentId, apiKey);
      return true;
    }
    
    return false;
  }, [dispatch]);

  return {
    selectAgent,
    updateAgentKey
  };
}