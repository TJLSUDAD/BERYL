import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Agent } from '../../types';

interface AgentState {
  agents: Agent[];
  selectedAgent: Agent | null;
}

const initialState: AgentState = {
  agents: [
    { id: 'gpt4', name: 'GPT-4' },
    { id: 'gemini', name: 'Gemini' },
    { id: 'claude', name: 'Claude' },
    { id: 'groq', name: 'Groq' }
  ],
  selectedAgent: null
};

const agentSlice = createSlice({
  name: 'agent',
  initialState,
  reducers: {
    setSelectedAgent: (state, action: PayloadAction<Agent>) => {
      state.selectedAgent = action.payload;
    },
    updateApiKey: (state, action: PayloadAction<{ agentId: string; apiKey: string }>) => {
      const agent = state.agents.find(a => a.id === action.payload.agentId);
      if (agent) {
        agent.apiKey = action.payload.apiKey;
      }
    }
  }
});

export const { setSelectedAgent, updateApiKey } = agentSlice.actions;
export default agentSlice.reducer;